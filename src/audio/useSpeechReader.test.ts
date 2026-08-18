import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReadableSection } from "./readableContent";
import { useSpeechReader } from "./useSpeechReader";

class MockUtterance {
  lang = "";
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onstart: (() => void) | null = null;
  pitch = 1;
  rate = 1;
  text: string;
  voice: SpeechSynthesisVoice | null = null;
  volume = 1;

  constructor(text: string) {
    this.text = text;
  }
}

function createSpeechSynthesisMock() {
  const synth = {
    paused: false,
    pending: false,
    speaking: false,
    addEventListener: vi.fn(),
    cancel: vi.fn(() => {
      synth.paused = false;
      synth.pending = false;
      synth.speaking = false;
    }),
    getVoices: vi.fn(() => [] as SpeechSynthesisVoice[]),
    pause: vi.fn(() => {
      synth.paused = true;
    }),
    removeEventListener: vi.fn(),
    resume: vi.fn(() => {
      synth.paused = false;
      synth.speaking = true;
    }),
    speak: vi.fn((utterance: MockUtterance) => {
      synth.speaking = true;
      utterance.onstart?.();
    }),
  };

  return synth;
}

const section: ReadableSection = {
  id: "node:why",
  nodeId: "node",
  kind: "why",
  title: "Pourquoi",
  text: "Une phrase courte à lire.",
};

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("useSpeechReader", () => {
  it("reports unsupported when the Web Speech API is unavailable", () => {
    vi.stubGlobal("SpeechSynthesisUtterance", undefined);
    const { result, unmount } = renderHook(() => useSpeechReader());

    expect(result.current.isSupported).toBe(false);
    expect(result.current.status).toBe("unsupported");

    unmount();
  });

  it("plays, pauses, resumes and stops a readable section", () => {
    const synth = createSpeechSynthesisMock();
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: synth,
    });
    vi.stubGlobal("SpeechSynthesisUtterance", MockUtterance);

    const { result, unmount } = renderHook(() => useSpeechReader());

    act(() => result.current.playSection(section));
    expect(synth.speak).toHaveBeenCalledTimes(1);
    expect(result.current.activeSection?.id).toBe(section.id);
    expect(result.current.status).toBe("playing");

    act(() => result.current.pause());
    expect(synth.pause).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe("paused");

    act(() => result.current.resume());
    expect(synth.resume).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe("playing");

    act(() => result.current.stop());
    expect(synth.cancel).toHaveBeenCalled();
    expect(result.current.activeSection).toBeNull();
    expect(result.current.status).toBe("idle");

    unmount();
  });

  it("normalizes and persists reader settings", () => {
    const synth = createSpeechSynthesisMock();
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: synth,
    });
    vi.stubGlobal("SpeechSynthesisUtterance", MockUtterance);

    const { result, unmount } = renderHook(() => useSpeechReader());

    act(() => {
      result.current.setRate(9);
      result.current.setBreathMs(333);
    });

    expect(result.current.rate).toBe(1.6);
    expect(result.current.breathMs).toBe(350);
    expect(localStorage.getItem("speech-reader-rate")).toBe("1.6");
    expect(localStorage.getItem("speech-reader-breath-ms")).toBe("350");

    unmount();
  });
});
