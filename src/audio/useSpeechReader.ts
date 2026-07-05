import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReadableSection } from "./readableContent";

export type SpeechReaderStatus = "idle" | "playing" | "paused" | "unsupported" | "error";
export type SpeechReaderRate = 0.9 | 1 | 1.15 | 1.3;

export type SpeechReader = {
  activeIndex: number;
  activeSection: ReadableSection | null;
  canGoNext: boolean;
  canGoPrevious: boolean;
  error: string | null;
  isSupported: boolean;
  queue: ReadableSection[];
  rate: SpeechReaderRate;
  setRate: (rate: SpeechReaderRate) => void;
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

const rates: SpeechReaderRate[] = [0.9, 1, 1.15, 1.3];

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
  const [error, setError] = useState<string | null>(null);

  const queueRef = useRef<ReadableSection[]>([]);
  const activeIndexRef = useRef(-1);
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intentionalCancelRef = useRef(false);
  const rateRef = useRef(rate);
  const voicesRef = useRef(voices);
  const speakSectionRef = useRef<(sectionIndex: number, startChunkIndex?: number) => void>(() => undefined);

  useEffect(() => {
    rateRef.current = rate;
    storeRate(rate);
  }, [rate]);

  useEffect(() => {
    voicesRef.current = voices;
  }, [voices]);

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
      window.setTimeout(() => speakSectionRef.current(nextIndex, 0), 80);
      return;
    }

    chunkIndexRef.current = chunkIndex;

    const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
    utterance.lang = "fr-FR";
    utterance.rate = rateRef.current;
    utterance.pitch = 1;
    utterance.voice = selectFrenchVoice(voicesRef.current);

    utterance.onend = () => {
      if (utteranceRef.current !== utterance) return;
      speakChunk(chunkIndex + 1);
    };

    utterance.onerror = () => {
      if (intentionalCancelRef.current || utteranceRef.current !== utterance) return;
      setError("La lecture audio a ete interrompue par le navigateur.");
      resetState("error");
    };

    utteranceRef.current = utterance;
    setStatus("playing");
    synth.speak(utterance);
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
    intentionalCancelRef.current = true;
    window.speechSynthesis.cancel();
    window.setTimeout(() => {
      intentionalCancelRef.current = false;
      afterCancel?.();
    }, 80);
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
    setRateState(rates.includes(nextRate) ? nextRate : 1);
  }, []);

  useEffect(() => () => {
    if (!isSupported) return;
    intentionalCancelRef.current = true;
    window.speechSynthesis.cancel();
  }, [isSupported]);

  return useMemo(() => ({
    activeIndex,
    activeSection,
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
    setRate,
    status,
    stop,
    toggle,
  }), [
    activeIndex,
    activeSection,
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
    setRate,
    status,
    stop,
    toggle,
  ]);
}

function readStoredRate(): SpeechReaderRate {
  if (typeof localStorage === "undefined") return 1;
  const stored = Number(localStorage.getItem("speech-reader-rate"));
  return rates.includes(stored as SpeechReaderRate) ? stored as SpeechReaderRate : 1;
}

function storeRate(rate: SpeechReaderRate) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("speech-reader-rate", String(rate));
}

function selectFrenchVoice(voices: SpeechSynthesisVoice[]) {
  const frenchVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("fr"));
  return frenchVoices.find((voice) => voice.default) ?? frenchVoices[0] ?? null;
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
