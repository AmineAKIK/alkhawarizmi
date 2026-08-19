import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AudioPlayerBar } from "./AudioPlayerBar";
import type { SpeechReader } from "../../audio/useSpeechReader";

afterEach(() => cleanup());

function makeVoice(overrides: Partial<SpeechSynthesisVoice> = {}): SpeechSynthesisVoice {
  return {
    default: false,
    lang: "fr-FR",
    localService: true,
    name: "Marie - French",
    voiceURI: "voice-fr",
    ...overrides,
  } as SpeechSynthesisVoice;
}

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

    expect(screen.getByTitle("Section précédente")).toBeDisabled();
    expect(screen.getByTitle("Section suivante")).toBeDisabled();
  });

  it("calls stop when the close button is clicked", () => {
    const stop = vi.fn();
    render(<AudioPlayerBar reader={makeReader({ status: "playing", stop })} />);

    fireEvent.click(screen.getByTitle("Fermer le lecteur"));
    expect(stop).toHaveBeenCalledTimes(1);
  });

  it("selects a named voice and closes the menu", () => {
    const setVoiceURI = vi.fn();
    const voice = makeVoice();
    render(<AudioPlayerBar reader={makeReader({ availableVoices: [voice], setVoiceURI })} />);

    fireEvent.click(screen.getByRole("button", { name: /voix auto/i }));
    const voiceButton = screen.getByRole("menuitemradio", { name: /marie/i });
    expect(voiceButton).toHaveAttribute("aria-checked", "false");
    fireEvent.click(voiceButton);

    expect(setVoiceURI).toHaveBeenCalledWith("voice-fr");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("can switch a selected voice back to automatic selection", () => {
    const setVoiceURI = vi.fn();
    const voice = makeVoice();
    render(
      <AudioPlayerBar
        reader={makeReader({
          availableVoices: [voice],
          selectedVoiceURI: voice.voiceURI,
          setVoiceURI,
        })}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /marie/i }));
    const automaticVoice = screen.getByRole("menuitemradio", { name: /voix auto recommandée/i });
    expect(automaticVoice).toHaveAttribute("aria-checked", "false");
    fireEvent.click(automaticVoice);

    expect(setVoiceURI).toHaveBeenCalledWith(null);
  });

  it("normalizes slider values before forwarding reader settings", () => {
    const setRate = vi.fn();
    const setBreathMs = vi.fn();
    render(<AudioPlayerBar reader={makeReader({ setRate, setBreathMs })} />);

    fireEvent.change(screen.getByLabelText("Vitesse de lecture"), { target: { value: "1.35" } });
    fireEvent.change(screen.getByLabelText("Respiration entre les segments"), {
      target: { value: "350" },
    });

    expect(setRate).toHaveBeenCalledWith(1.35);
    expect(setBreathMs).toHaveBeenCalledWith(350);
  });

  it("supports keyboard navigation inside the voice menu", () => {
    const voices = [
      makeVoice({ name: "Marie", voiceURI: "marie" }),
      makeVoice({ name: "Thomas", voiceURI: "thomas" }),
    ];
    render(<AudioPlayerBar reader={makeReader({ availableVoices: voices })} />);

    fireEvent.click(screen.getByRole("button", { name: /voix auto/i }));
    const menu = screen.getByRole("menu");
    const options = screen.getAllByRole("menuitemradio");

    options[0]?.focus();
    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(options[options.length - 1]);

    fireEvent.keyDown(menu, { key: "Home" });
    expect(document.activeElement).toBe(options[0]);
  });

  it("restores focus to the trigger when Escape closes the voice menu", async () => {
    const voice = makeVoice();
    render(<AudioPlayerBar reader={makeReader({ availableVoices: [voice] })} />);

    const trigger = screen.getByRole("button", { name: /voix auto/i });
    fireEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
