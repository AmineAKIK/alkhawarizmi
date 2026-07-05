import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReadableSection } from "./readableContent";

export type SpeechReaderStatus = "idle" | "playing" | "paused" | "unsupported" | "error";
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
  status: SpeechReaderStatus;
  stop: () => void;
  toggle: () => void;
};

const minSpeechRate = 0.75;
const maxSpeechRate = 1.6;
const minBreathMs = 0;
const maxBreathMs = 700;

export function useSpeechReader(): SpeechReader {
  const isSupported = typeof window !== "undefined"
    && "speechSynthesis" in window
    && typeof SpeechSynthesisUtterance !== "undefined";
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
  const speakSectionRef = useRef<(sectionIndex: number, startChunkIndex?: number) => void>(() => undefined);

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

  const resetState = useCallback((nextStatus: SpeechReaderStatus = isSupported ? "idle" : "unsupported") => {
    queueRef.current = [];
    activeIndexRef.current = -1;
    chunksRef.current = [];
    chunkIndexRef.current = 0;
    utteranceRef.current = null;
    setQueue([]);
    setActiveIndex(-1);
    setActiveSection(null);
    setStatus(nextStatus);
  }, [isSupported]);

  const speakChunk = useCallback((chunkIndex: number) => {
    if (!isSupported) {
      setStatus("unsupported");
      return;
    }

    const synth = window.speechSynthesis;
    const chunks = chunksRef.current;
    const section = queueRef.current[activeIndexRef.current];

    if (!section || chunkIndex >= chunks.length) {
      const nextIndex = activeIndexRef.current + 1;
      if (nextIndex >= queueRef.current.length) {
        synth.cancel();
        resetState();
        return;
      }

      activeIndexRef.current = nextIndex;
      chunkIndexRef.current = 0;
      setActiveIndex(nextIndex);
      setActiveSection(queueRef.current[nextIndex]);
      speakSectionRef.current(nextIndex, 0);
      return;
    }

    chunkIndexRef.current = chunkIndex;

    const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
    utterance.lang = "fr-FR";
    utterance.rate = rateRef.current;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.voice = selectBestVoice(voicesRef.current, selectedVoiceURIRef.current);

    utterance.onend = () => {
      if (utteranceRef.current !== utterance) return;
      window.setTimeout(() => speakChunk(chunkIndex + 1), breathMsRef.current);
    };

    utterance.onerror = () => {
      if (intentionalCancelRef.current || utteranceRef.current !== utterance) return;
      setError("La lecture audio a ete interrompue par le navigateur.");
      resetState("error");
    };

    utteranceRef.current = utterance;
    setStatus("playing");
    synth.speak(utterance);
    window.setTimeout(() => {
      if (utteranceRef.current === utterance && synth.paused) synth.resume();
    }, 60);
  }, [isSupported, resetState]);

  const speakSection = useCallback((sectionIndex: number, startChunkIndex = 0) => {
    const section = queueRef.current[sectionIndex];
    if (!section) {
      resetState();
      return;
    }

    const chunks = splitIntoSpeechChunks(`${section.title}. ${section.text}`);
    chunksRef.current = chunks.length > 0 ? chunks : [section.title];
    activeIndexRef.current = sectionIndex;
    chunkIndexRef.current = startChunkIndex;
    setActiveIndex(sectionIndex);
    setActiveSection(section);
    speakChunk(startChunkIndex);
  }, [resetState, speakChunk]);

  useEffect(() => {
    speakSectionRef.current = speakSection;
  }, [speakSection]);

  const cancelSilently = useCallback((afterCancel?: () => void) => {
    if (!isSupported) return;
    const synth = window.speechSynthesis;
    const wasActive = synth.speaking || synth.pending || synth.paused;
    intentionalCancelRef.current = true;

    synth.cancel();

    const finishCancel = () => {
      intentionalCancelRef.current = false;
      afterCancel?.();
    };

    if (wasActive) {
      window.setTimeout(finishCancel, 80);
      return;
    }

    finishCancel();
  }, [isSupported]);

  const playQueue = useCallback((sections: ReadableSection[], startIndex = 0) => {
    if (!isSupported) {
      setStatus("unsupported");
      return;
    }

    const readableQueue = sections.filter((section) => section.text.trim().length > 0);
    if (readableQueue.length === 0) return;

    const safeIndex = Math.min(Math.max(startIndex, 0), readableQueue.length - 1);
    setError(null);
    setQueue(readableQueue);
    queueRef.current = readableQueue;

    cancelSilently(() => speakSection(safeIndex, 0));
  }, [cancelSilently, isSupported, speakSection]);

  const playSection = useCallback((section: ReadableSection) => {
    playQueue([section], 0);
  }, [playQueue]);

  const stop = useCallback(() => {
    if (isSupported) {
      intentionalCancelRef.current = true;
      window.speechSynthesis.cancel();
      window.setTimeout(() => {
        intentionalCancelRef.current = false;
      }, 80);
    }
    resetState();
  }, [isSupported, resetState]);

  const pause = useCallback(() => {
    if (!isSupported || status !== "playing") return;
    window.speechSynthesis.pause();
    setStatus("paused");
  }, [isSupported, status]);

  const resume = useCallback(() => {
    if (!isSupported || status !== "paused") return;
    window.speechSynthesis.resume();
    setStatus("playing");
  }, [isSupported, status]);

  const toggle = useCallback(() => {
    if (status === "playing") {
      pause();
      return;
    }
    if (status === "paused") resume();
  }, [pause, resume, status]);

  const speakAtIndex = useCallback((nextIndex: number) => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), queueRef.current.length - 1);
    if (safeIndex < 0) return;
    setError(null);
    cancelSilently(() => speakSection(safeIndex, 0));
  }, [cancelSilently, speakSection]);

  const next = useCallback(() => {
    if (activeIndexRef.current >= queueRef.current.length - 1) return;
    speakAtIndex(activeIndexRef.current + 1);
  }, [speakAtIndex]);

  const previous = useCallback(() => {
    if (activeIndexRef.current <= 0) return;
    speakAtIndex(activeIndexRef.current - 1);
  }, [speakAtIndex]);

  const setRate = useCallback((nextRate: SpeechReaderRate) => {
    const safeRate = normalizeSpeechRate(nextRate);
    rateRef.current = safeRate;
    setRateState(safeRate);
  }, []);

  const setBreathMs = useCallback((nextBreathMs: number) => {
    const safeBreathMs = normalizeBreathMs(nextBreathMs);
    breathMsRef.current = safeBreathMs;
    setBreathMsState(safeBreathMs);
  }, []);

  const setVoiceURI = useCallback((voiceURI: string | null) => {
    setSelectedVoiceURI(voiceURI);
    selectedVoiceURIRef.current = voiceURI;

    if (activeIndexRef.current < 0 || queueRef.current.length === 0) return;
    cancelSilently(() => speakSection(activeIndexRef.current, chunkIndexRef.current));
  }, [cancelSilently, speakSection]);

  const availableVoices = useMemo(() => getManualVoices(voices), [voices]);

  useEffect(() => () => {
    if (!isSupported) return;
    intentionalCancelRef.current = true;
    window.speechSynthesis.cancel();
  }, [isSupported]);

  return useMemo(() => ({
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
    setBreathMs,
    setRate,
    selectedVoiceURI,
    setVoiceURI,
    status,
    stop,
    toggle,
  }), [
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
    setBreathMs,
    setRate,
    selectedVoiceURI,
    setVoiceURI,
    status,
    stop,
    toggle,
  ]);
}

function readStoredRate(): SpeechReaderRate {
  if (typeof localStorage === "undefined") return 1;
  const stored = Number(localStorage.getItem("speech-reader-rate"));
  return normalizeSpeechRate(stored);
}

function storeRate(rate: SpeechReaderRate) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("speech-reader-rate", String(normalizeSpeechRate(rate)));
}

function normalizeSpeechRate(rate: number) {
  if (!Number.isFinite(rate)) return 1;
  return Math.min(maxSpeechRate, Math.max(minSpeechRate, Math.round(rate * 20) / 20));
}

function readStoredBreathMs() {
  if (typeof localStorage === "undefined") return 0;
  return normalizeBreathMs(Number(localStorage.getItem("speech-reader-breath-ms")));
}

function storeBreathMs(breathMs: number) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("speech-reader-breath-ms", String(normalizeBreathMs(breathMs)));
}

function normalizeBreathMs(breathMs: number) {
  if (!Number.isFinite(breathMs)) return 0;
  return Math.min(maxBreathMs, Math.max(minBreathMs, Math.round(breathMs / 50) * 50));
}

function readStoredVoiceURI() {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem("speech-reader-voice-uri");
}

function storeVoiceURI(voiceURI: string | null) {
  if (typeof localStorage === "undefined") return;
  if (voiceURI) {
    localStorage.setItem("speech-reader-voice-uri", voiceURI);
  } else {
    localStorage.removeItem("speech-reader-voice-uri");
  }
}

function getManualVoices(voices: SpeechSynthesisVoice[]) {
  const frenchVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("fr"));
  const preferredVoices = frenchVoices.length > 0 ? frenchVoices : voices;
  return [...preferredVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a) || a.name.localeCompare(b.name));
}

function selectBestVoice(voices: SpeechSynthesisVoice[], selectedVoiceURI: string | null) {
  const manualVoices = getManualVoices(voices);

  if (selectedVoiceURI) {
    const selectedVoice = manualVoices.find((voice) => voice.voiceURI === selectedVoiceURI);
    if (selectedVoice) return selectedVoice;
  }

  return getAutoVoices(voices)[0] ?? manualVoices[0] ?? null;
}

function getAutoVoices(voices: SpeechSynthesisVoice[]) {
  const manualVoices = getManualVoices(voices);
  const reliableVoices = manualVoices.filter(isReliableVoice);
  return reliableVoices.length > 0 ? reliableVoices : manualVoices;
}

function scoreVoice(voice: SpeechSynthesisVoice) {
  const label = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;

  if (lang === "fr-fr") score += 30;
  else if (lang.startsWith("fr")) score += 20;

  if (label.includes("natural") || label.includes("neural") || label.includes("premium")) score += 32;
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
