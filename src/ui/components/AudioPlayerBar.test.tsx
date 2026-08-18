import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { AudioPlayerBar } from "./AudioPlayerBar";
import type { SpeechReader } from "../../audio/useSpeechReader";

afterEach(() => cleanup());

function makeReader(overrides: Partial<SpeechReader> = {}): SpeechReader {
  return {
    activeIndex: 0,
    activeSection: { id: "s1", kind: "why", nodeId: "n1", title: "Pourquoi", text: "..." },
    availableVoices: [],
    breathMs: 0,
    canGoNext: true,
    canGoPrevious: false,
    error: null,
    isSupported: true,
    queue: [],
    rate: 1,
    setBreathMs: vi.fn(),
    setRate: vi.fn(),
    selectedVoiceURI: null,
    setVoiceURI: vi.fn(),
    next: vi.fn(),
    pause: vi.fn(),
    playQueue: vi.fn(),
    playSection: vi.fn(),
    previous: vi.fn(),
    resume: vi.fn(),
    retry: vi.fn(),
    status: "playing",
    stop: vi.fn(),
    toggle: vi.fn(),
    ...overrides,
  };
}

describe("AudioPlayerBar", () => {
  it("renders nothing when the reader is idle or unsupported", () => {
    const { container: idleContainer } = render(
      <AudioPlayerBar reader={makeReader({ status: "idle" })} />,
    );
    expect(idleContainer).toBeEmptyDOMElement();

    cleanup();

    const { container: unsupportedContainer } = render(
      <AudioPlayerBar reader={makeReader({ status: "unsupported" })} />,
    );
    expect(unsupportedContainer).toBeEmptyDOMElement();
  });

  it("shows the active section title while playing", () => {
    render(<AudioPlayerBar reader={makeReader({ status: "playing" })} />);
    expect(screen.getByText("Pourquoi")).toBeInTheDocument();
  });

  it("shows the error message instead of the title when in error state", () => {
    render(
      <AudioPlayerBar reader={makeReader({ status: "error", error: "La lecture a échoué." })} />,
    );
    expect(screen.getByText("La lecture a échoué.")).toBeInTheDocument();
  });

  it("calls toggle when the primary control is clicked while playing", () => {
    const toggle = vi.fn();
    render(<AudioPlayerBar reader={makeReader({ status: "playing", toggle })} />);

    fireEvent.click(screen.getByTitle("Pause"));
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it("calls retry instead of toggle when the primary control is clicked in error state", () => {
    const retry = vi.fn();
    const toggle = vi.fn();
    render(<AudioPlayerBar reader={makeReader({ status: "error", retry, toggle })} />);

    fireEvent.click(screen.getByTitle("Réessayer"));
    expect(retry).toHaveBeenCalledTimes(1);
    expect(toggle).not.toHaveBeenCalled();
  });

  it("disables previous/next based on canGoPrevious/canGoNext", () => {
    render(
      <AudioPlayerBar
        reader={makeReader({ status: "playing", canGoPrevious: false, canGoNext: false })}
      />,
    );

    expect(screen.getByTitle("Carte précédente")).toBeDisabled();
    expect(screen.getByTitle("Carte suivante")).toBeDisabled();
  });

  it("calls stop when the close button is clicked", () => {
    const stop = vi.fn();
    render(<AudioPlayerBar reader={makeReader({ status: "playing", stop })} />);

    fireEvent.click(screen.getByTitle("Fermer le lecteur"));
    expect(stop).toHaveBeenCalledTimes(1);
  });
});
