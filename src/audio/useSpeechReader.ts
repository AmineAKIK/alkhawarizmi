import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReadableSection } from "./readableContent";

export type SpeechReaderStatus =
  "idle" | "starting" | "playing" | "paused" | "unsupported" | "error";
// Named alias (rather than bare `number`) so the reader's public API documents
// intent at call sites and can later gain a stricter range type without
// touching every consumer.
export type SpeechReaderRate = number;

export type SpeechReader = {
  activeIndex: number;
  activeSection: ReadableSection | null;
  availableVoices: SpeechSynthesisVoice[];
  breathMs: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  error: string | null;
  isSupported: boolean;
  queue: ReadableSection[];
  rate: SpeechReaderRate;
  setBreathMs: (breathMs: number) => void;
  setRate: (rate: SpeechReaderRate) => void;
  selectedVoiceURI: string | null;
  setVoiceURI: (voiceURI: string | null) => void;
  next: () => void;
  pause: () => void;
  playQueue: (sections: ReadableSection[], startIndex?: number) => void;
  playSection: (section: ReadableSection) => void;
  previous: () => void;
  resume: () => void;
  retry: () => void;
  status: SpeechReaderStatus;
  stop: () => void;
  toggle: () => void;
};

const minSpeechRate = 0.75;
const maxSpeechRate = 1.6;
const minBreathMs = 0;
const maxBreathMs = 700;
const startTimeoutMs = 2200;

type SpeakChunkOptions = {
  fallbackVoiceURI?: string;
  fallbackAttempted?: boolean;
};

export function useSpeechReader(): SpeechReader {
  const isSupported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined";
  const [status, setStatus] = useState<SpeechReaderStatus>(isSupported ? "idle" : "unsupported");
  const [queue, setQueue] = useState<ReadableSection[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeSection, setActiveSection] = useState<ReadableSection | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [rate, setRateState] = useState<SpeechReaderRate>(readStoredRate);
  const [breathMs, setBreathMsState] = useState(readStoredBreathMs);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(readStoredVoiceURI);
  const [error, setError] = useState<string | null>(null);

  const queueRef = useRef<ReadableSection[]>([]);
  const activeIndexRef = useRef(-1);
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intentionalCancelRef = useRef(false);
  const rateRef = useRef(rate);
  const breathMsRef = useRef(breathMs);
  const voicesRef = useRef(voices);
  const selectedVoiceURIRef = useRef(selectedVoiceURI);
  const statusRef = useRef<SpeechReaderStatus>(status);
  const playbackIdRef = useRef(0);
  const timeoutsRef = useRef<Array<ReturnType<typeof window.setTimeout>>>([]);
  const speakSectionRef = useRef<
    (sectionIndex: number, startChunkIndex: number, playbackId: number) => void
  >(() => undefined);

  const setReaderStatus = useCallback((nextStatus: SpeechReaderStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  }, []);

  const clearReaderTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  const scheduleReaderTimeout = useCallback(
    (callback: () => void, delayMs: number, playbackId: number) => {
      const timeoutId = window.setTimeout(() => {
        timeoutsRef.current = timeoutsRef.current.filter((candidate) => candidate !== timeoutId);
        if (playbackIdRef.current !== playbackId) return;
        callback();
      }, delayMs);

      timeoutsRef.current.push(timeoutId);
      return timeoutId;
    },
    [],
  );

  const beginPlayback = useCallback(() => {
    playbackIdRef.current += 1;
    clearReaderTimeouts();
    return playbackIdRef.current;
  }, [clearReaderTimeouts]);

  const cancelSpeech = useCallback(() => {
    if (!isSupported) return false;
    const synth = window.speechSynthesis;
    const wasActive = synth.speaking || synth.pending || synth.paused;
    intentionalCancelRef.current = true;
    utteranceRef.current = null;
    synth.cancel();
    return wasActive;
  }, [isSupported]);

  const finishIntentionalCancel = useCallback(() => {
    intentionalCancelRef.current = false;
  }, []);

  const resetState = useCallback(
    (nextStatus: SpeechReaderStatus = isSupported ? "idle" : "unsupported") => {
      beginPlayback();
      cancelSpeech();
      queueRef.current = [];
      activeIndexRef.current = -1;
      chunksRef.current = [];
      chunkIndexRef.current = 0;
      utteranceRef.current = null;
      setQueue([]);
      setActiveIndex(-1);
      setActiveSection(null);
      setError(null);
      setReaderStatus(nextStatus);
      window.setTimeout(finishIntentionalCancel, 80);
    },
    [beginPlayback, cancelSpeech, finishIntentionalCancel, isSupported, setReaderStatus],
  );

  const failPlayback = useCallback(
    (message: string, playbackId: number) => {
      if (playbackIdRef.current !== playbackId) return;
      clearReaderTimeouts();
      cancelSpeech();
      setError(message);
      setReaderStatus("error");
      window.setTimeout(finishIntentionalCancel, 80);
    },
    [cancelSpeech, clearReaderTimeouts, finishIntentionalCancel, setReaderStatus],
  );

  const retryCurrent = useCallback(() => {
    if (!isSupported || activeIndexRef.current < 0 || queueRef.current.length === 0) return;
    const playbackId = beginPlayback();
    const wasActive = cancelSpeech();
    const restart = () => {
      if (playbackIdRef.current !== playbackId) return;
      finishIntentionalCancel();
      setError(null);
      speakSectionRef.current(
        activeIndexRef.current,
        Math.max(0, chunkIndexRef.current),
        playbackId,
      );
    };

    if (wasActive) {
      scheduleReaderTimeout(restart, 80, playbackId);
    } else {
      restart();
    }
  }, [beginPlayback, cancelSpeech, finishIntentionalCancel, isSupported, scheduleReaderTimeout]);

  const speakChunk = useCallback(
    (chunkIndex: number, playbackId: number, options: SpeakChunkOptions = {}) => {
      if (!isSupported || playbackIdRef.current !== playbackId) {
        if (!isSupported) setReaderStatus("unsupported");
        return;
      }

      const synth = window.speechSynthesis;
      const chunks = chunksRef.current;
      const section = queueRef.current[activeIndexRef.current];

      if (!section || chunkIndex >= chunks.length) {
        const nextIndex = activeIndexRef.current + 1;
        if (nextIndex >= queueRef.current.length) {
          clearReaderTimeouts();
          cancelSpeech();
          queueRef.current = [];
          activeIndexRef.current = -1;
          chunksRef.current = [];
          chunkIndexRef.current = 0;
          setQueue([]);
          setActiveIndex(-1);
          setActiveSection(null);
          setError(null);
          setReaderStatus("idle");
          window.setTimeout(finishIntentionalCancel, 80);
          return;
        }

        speakSectionRef.current(nextIndex, 0, playbackId);
        return;
      }

      chunkIndexRef.current = chunkIndex;

      const voice = selectVoiceForPlayback(
        voicesRef.current,
        selectedVoiceURIRef.current,
        options.fallbackVoiceURI,
      );
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      utterance.voice = voice;
      utterance.lang = voice?.lang ?? "fr-FR";
      utterance.rate = rateRef.current;
      utterance.pitch = 1;
      utterance.volume = 1;

      let didStart = false;

      const retryWithFallback = () => {
        if (playbackIdRef.current !== playbackId || utteranceRef.current !== utterance) return;
        const fallbackVoice = selectFallbackVoice(voicesRef.current, voice?.voiceURI);
        if (!fallbackVoice || options.fallbackAttempted) {
          failPlayback(
            "La voix sélectionnée ne répond pas. Choisis une autre voix ou repasse en voix auto.",
            playbackId,
          );
          return;
        }

        clearReaderTimeouts();
        intentionalCancelRef.current = true;
        utteranceRef.current = null;
        synth.cancel();
        scheduleReaderTimeout(
          () => {
            intentionalCancelRef.current = false;
            speakChunk(chunkIndex, playbackId, {
              fallbackAttempted: true,
              fallbackVoiceURI: fallbackVoice.voiceURI,
            });
          },
          80,
          playbackId,
        );
      };

      utterance.onstart = () => {
        if (playbackIdRef.current !== playbackId || utteranceRef.current !== utterance) return;
        didStart = true;
        if (statusRef.current !== "paused") {
          setReaderStatus("playing");
        }
      };

      utterance.onend = () => {
        if (playbackIdRef.current !== playbackId || utteranceRef.current !== utterance) return;
        scheduleReaderTimeout(
          () => speakChunk(chunkIndex + 1, playbackId),
          breathMsRef.current,
          playbackId,
        );
      };

      utterance.onerror = () => {
        if (
          intentionalCancelRef.current ||
          playbackIdRef.current !== playbackId ||
          utteranceRef.current !== utterance
        )
          return;
        retryWithFallback();
      };

      utteranceRef.current = utterance;
      setError(null);
      if (statusRef.current !== "paused") setReaderStatus("starting");
      synth.speak(utterance);
      if (statusRef.current === "paused") {
        synth.pause();
      }

      scheduleReaderTimeout(
        () => {
          if (
            didStart ||
            playbackIdRef.current !== playbackId ||
            utteranceRef.current !== utterance
          )
            return;
          if (statusRef.current === "paused") return;
          retryWithFallback();
        },
        startTimeoutMs,
        playbackId,
      );

      scheduleReaderTimeout(
        () => {
          if (
            playbackIdRef.current === playbackId &&
            utteranceRef.current === utterance &&
            synth.paused &&
            statusRef.current !== "paused"
          ) {
            synth.resume();
          }
        },
        60,
        playbackId,
      );
    },
    [
      cancelSpeech,
      clearReaderTimeouts,
      failPlayback,
      finishIntentionalCancel,
      isSupported,
      scheduleReaderTimeout,
      setReaderStatus,
    ],
  );

  const speakSection = useCallback(
    (sectionIndex: number, startChunkIndex: number, playbackId: number) => {
      if (playbackIdRef.current !== playbackId) return;
      const section = queueRef.current[sectionIndex];
      if (!section) {
        resetState();
        return;
      }

      const chunks = splitIntoSpeechChunks(buildUtteranceText(section));
      chunksRef.current = chunks.length > 0 ? chunks : [section.title];
      activeIndexRef.current = sectionIndex;
      chunkIndexRef.current = startChunkIndex;
      setActiveIndex(sectionIndex);
      setActiveSection(section);
      speakChunk(startChunkIndex, playbackId);
    },
    [resetState, speakChunk],
  );

  useEffect(() => {
    speakSectionRef.current = speakSection;
  }, [speakSection]);

  const restartAtIndex = useCallback(
    (sectionIndex: number, startChunkIndex = 0, preservePaused = false) => {
      if (!isSupported || queueRef.current.length === 0) return;
      const playbackId = beginPlayback();
      const wasActive = cancelSpeech();
      const restart = () => {
        if (playbackIdRef.current !== playbackId) return;
        finishIntentionalCancel();
        setError(null);
        if (preservePaused) setReaderStatus("paused");
        speakSectionRef.current(sectionIndex, startChunkIndex, playbackId);
        if (preservePaused) {
          window.speechSynthesis.pause();
        }
      };

      if (wasActive) {
        scheduleReaderTimeout(restart, 80, playbackId);
      } else {
        restart();
      }
    },
    [
      beginPlayback,
      cancelSpeech,
      finishIntentionalCancel,
      isSupported,
      scheduleReaderTimeout,
      setReaderStatus,
    ],
  );

  const playQueue = useCallback(
    (sections: ReadableSection[], startIndex = 0) => {
      if (!isSupported) {
        setReaderStatus("unsupported");
        return;
      }

      const requestedSection = sections[startIndex];
      const readableQueue = sections.filter((section) => section.text.trim().length > 0);
      if (readableQueue.length === 0) return;

      const requestedReadableIndex = requestedSection
        ? readableQueue.findIndex((section) => section.id === requestedSection.id)
        : -1;
      const safeIndex =
        requestedReadableIndex >= 0
          ? requestedReadableIndex
          : Math.min(Math.max(startIndex, 0), readableQueue.length - 1);
      const playbackId = beginPlayback();
      const wasActive = cancelSpeech();
      queueRef.current = readableQueue;
      setQueue(readableQueue);
      setError(null);

      const start = () => {
        if (playbackIdRef.current !== playbackId) return;
        finishIntentionalCancel();
        speakSectionRef.current(safeIndex, 0, playbackId);
      };

      if (wasActive) {
        scheduleReaderTimeout(start, 80, playbackId);
      } else {
        start();
      }
    },
    [
      beginPlayback,
      cancelSpeech,
      finishIntentionalCancel,
      isSupported,
      scheduleReaderTimeout,
      setReaderStatus,
    ],
  );

  const playSection = useCallback(
    (section: ReadableSection) => {
      playQueue([section], 0);
    },
    [playQueue],
  );

  const stop = useCallback(() => {
    resetState();
  }, [resetState]);

  const pause = useCallback(() => {
    if (!isSupported || (statusRef.current !== "playing" && statusRef.current !== "starting"))
      return;
    window.speechSynthesis.pause();
    setReaderStatus("paused");
  }, [isSupported, setReaderStatus]);

  const resume = useCallback(() => {
    if (!isSupported || statusRef.current !== "paused") return;
    window.speechSynthesis.resume();
    setReaderStatus("playing");
  }, [isSupported, setReaderStatus]);

  const toggle = useCallback(() => {
    if (statusRef.current === "playing" || statusRef.current === "starting") {
      pause();
      return;
    }
    if (statusRef.current === "paused") resume();
  }, [pause, resume]);

  const next = useCallback(() => {
    if (activeIndexRef.current >= queueRef.current.length - 1) return;
    restartAtIndex(activeIndexRef.current + 1, 0, statusRef.current === "paused");
  }, [restartAtIndex]);

  const previous = useCallback(() => {
    if (activeIndexRef.current <= 0) return;
    restartAtIndex(activeIndexRef.current - 1, 0, statusRef.current === "paused");
  }, [restartAtIndex]);

  const setRate = useCallback(
    (nextRate: SpeechReaderRate) => {
      const safeRate = normalizeSpeechRate(nextRate);
      rateRef.current = safeRate;
      setRateState(safeRate);

      if (
        activeIndexRef.current >= 0 &&
        queueRef.current.length > 0 &&
        (statusRef.current === "playing" ||
          statusRef.current === "starting" ||
          statusRef.current === "paused")
      ) {
        restartAtIndex(
          activeIndexRef.current,
          chunkIndexRef.current,
          statusRef.current === "paused",
        );
      }
    },
    [restartAtIndex],
  );

  const setBreathMs = useCallback((nextBreathMs: number) => {
    const safeBreathMs = normalizeBreathMs(nextBreathMs);
    breathMsRef.current = safeBreathMs;
    setBreathMsState(safeBreathMs);
  }, []);

  const setVoiceURI = useCallback(
    (voiceURI: string | null) => {
      setSelectedVoiceURI(voiceURI);
      selectedVoiceURIRef.current = voiceURI;

      if (
        activeIndexRef.current >= 0 &&
        queueRef.current.length > 0 &&
        (statusRef.current === "playing" ||
          statusRef.current === "starting" ||
          statusRef.current === "paused" ||
          statusRef.current === "error")
      ) {
        restartAtIndex(
          activeIndexRef.current,
          chunkIndexRef.current,
          statusRef.current === "paused",
        );
      }
    },
    [restartAtIndex],
  );

  const availableVoices = useMemo(() => getManualVoices(voices), [voices]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    rateRef.current = rate;
    storeRate(rate);
  }, [rate]);

  useEffect(() => {
    breathMsRef.current = breathMs;
    storeBreathMs(breathMs);
  }, [breathMs]);

  useEffect(() => {
    voicesRef.current = voices;
  }, [voices]);

  useEffect(() => {
    selectedVoiceURIRef.current = selectedVoiceURI;
    storeVoiceURI(selectedVoiceURI);
  }, [selectedVoiceURI]);

  useEffect(() => {
    if (!selectedVoiceURI || voices.length === 0) return;
    if (!getManualVoices(voices).some((voice) => voice.voiceURI === selectedVoiceURI)) {
      setSelectedVoiceURI(null);
      selectedVoiceURIRef.current = null;
    }
  }, [selectedVoiceURI, voices]);

  useEffect(() => {
    if (!isSupported) return;

    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());
    updateVoices();
    synth.addEventListener("voiceschanged", updateVoices);

    return () => synth.removeEventListener("voiceschanged", updateVoices);
  }, [isSupported]);

  useEffect(
    () => () => {
      beginPlayback();
      cancelSpeech();
      window.setTimeout(finishIntentionalCancel, 80);
    },
    [beginPlayback, cancelSpeech, finishIntentionalCancel],
  );

  return useMemo(
    () => ({
      activeIndex,
      activeSection,
      availableVoices,
      breathMs,
      canGoNext: activeIndex >= 0 && activeIndex < queue.length - 1,
      canGoPrevious: activeIndex > 0,
      error,
      isSupported,
      next,
      pause,
      playQueue,
      playSection,
      previous,
      queue,
      rate,
      resume,
      retry: retryCurrent,
      setBreathMs,
      setRate,
      selectedVoiceURI,
      setVoiceURI,
      status,
      stop,
      toggle,
    }),
    [
      activeIndex,
      activeSection,
      availableVoices,
      breathMs,
      error,
      isSupported,
      next,
      pause,
      playQueue,
      playSection,
      previous,
      queue,
      rate,
      resume,
      retryCurrent,
      setBreathMs,
      setRate,
      selectedVoiceURI,
      setVoiceURI,
      status,
      stop,
      toggle,
    ],
  );
}

function buildUtteranceText(section: ReadableSection) {
  return section.kind === "title" ? section.text : `${section.title}. ${section.text}`;
}

function readStoredRate(): SpeechReaderRate {
  if (typeof localStorage === "undefined") return 1;
  try {
    const storedRate = localStorage.getItem("speech-reader-rate");
    return storedRate === null ? 1 : normalizeSpeechRate(Number(storedRate));
  } catch {
    return 1;
  }
}

function storeRate(rate: SpeechReaderRate) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem("speech-reader-rate", String(normalizeSpeechRate(rate)));
  } catch {
    // Ignore storage failures; the reader should keep working without persistence.
  }
}

function normalizeSpeechRate(rate: number) {
  if (!Number.isFinite(rate)) return 1;
  return Math.min(maxSpeechRate, Math.max(minSpeechRate, Math.round(rate * 20) / 20));
}

function readStoredBreathMs() {
  if (typeof localStorage === "undefined") return 0;
  try {
    return normalizeBreathMs(Number(localStorage.getItem("speech-reader-breath-ms")));
  } catch {
    return 0;
  }
}

function storeBreathMs(breathMs: number) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem("speech-reader-breath-ms", String(normalizeBreathMs(breathMs)));
  } catch {
    // Ignore storage failures; the reader should keep working without persistence.
  }
}

function normalizeBreathMs(breathMs: number) {
  if (!Number.isFinite(breathMs)) return 0;
  return Math.min(maxBreathMs, Math.max(minBreathMs, Math.round(breathMs / 50) * 50));
}

function readStoredVoiceURI() {
  if (typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem("speech-reader-voice-uri");
  } catch {
    return null;
  }
}

function storeVoiceURI(voiceURI: string | null) {
  if (typeof localStorage === "undefined") return;
  try {
    if (voiceURI) {
      localStorage.setItem("speech-reader-voice-uri", voiceURI);
    } else {
      localStorage.removeItem("speech-reader-voice-uri");
    }
  } catch {
    // Ignore storage failures; the reader should keep working without persistence.
  }
}

function getManualVoices(voices: SpeechSynthesisVoice[]) {
  return [...voices].sort(
    (a, b) =>
      scoreVoice(b) - scoreVoice(a) || a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name),
  );
}

function selectVoiceForPlayback(
  voices: SpeechSynthesisVoice[],
  selectedVoiceURI: string | null,
  forcedVoiceURI?: string,
) {
  const manualVoices = getManualVoices(voices);

  if (forcedVoiceURI) {
    const forcedVoice = manualVoices.find((voice) => voice.voiceURI === forcedVoiceURI);
    if (forcedVoice) return forcedVoice;
  }

  if (selectedVoiceURI) {
    const selectedVoice = manualVoices.find((voice) => voice.voiceURI === selectedVoiceURI);
    if (selectedVoice) return selectedVoice;
  }

  return getAutoVoices(voices)[0] ?? manualVoices[0] ?? null;
}

function selectFallbackVoice(voices: SpeechSynthesisVoice[], failedVoiceURI?: string) {
  return getAutoVoices(voices).find((voice) => voice.voiceURI !== failedVoiceURI) ?? null;
}

function getAutoVoices(voices: SpeechSynthesisVoice[]) {
  const manualVoices = getManualVoices(voices);
  const frenchVoices = manualVoices.filter((voice) => voice.lang.toLowerCase().startsWith("fr"));
  const localFrenchVoices = frenchVoices.filter(isReliableVoice);
  const localVoices = manualVoices.filter(isReliableVoice);

  if (localFrenchVoices.length > 0) return localFrenchVoices;
  if (localVoices.length > 0) return localVoices;
  if (frenchVoices.length > 0) return frenchVoices;
  return manualVoices;
}

function scoreVoice(voice: SpeechSynthesisVoice) {
  const label = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;

  if (lang === "fr-fr") score += 30;
  else if (lang.startsWith("fr")) score += 20;

  if (voice.localService) score += 24;
  if (label.includes("natural") || label.includes("neural") || label.includes("premium"))
    score += 32;
  if (label.includes("google")) score += 18;
  if (label.includes("microsoft")) score += 14;
  if (label.includes("apple") || label.includes("siri")) score += 12;
  if (label.includes("online")) score -= 10;
  if (voice.default) score += 4;

  return score;
}

function isReliableVoice(voice: SpeechSynthesisVoice) {
  return voice.localService || !isOnlineVoice(voice);
}

function isOnlineVoice(voice: SpeechSynthesisVoice) {
  return `${voice.name} ${voice.voiceURI}`.toLowerCase().includes("online");
}

function splitIntoSpeechChunks(text: string) {
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence}` : sentence;
    if (next.length <= 260) {
      current = next;
      continue;
    }

    if (current) chunks.push(current);
    if (sentence.length <= 260) {
      current = sentence;
    } else {
      chunks.push(...splitLongSentence(sentence));
      current = "";
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function splitLongSentence(sentence: string) {
  const words = sentence.split(" ");
  const chunks: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= 220) {
      current = next;
    } else {
      if (current) chunks.push(current);
      current = word;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}
