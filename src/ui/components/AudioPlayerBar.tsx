import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Check, ChevronDown, Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import type { SpeechReader, SpeechReaderRate } from "../../audio/useSpeechReader";

export function AudioPlayerBar({ reader }: { reader: SpeechReader }) {
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false);
  const voiceMenuRef = useRef<HTMLDivElement | null>(null);
  const voiceTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeVoiceMenu = useCallback((restoreFocus = false) => {
    setVoiceMenuOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => voiceTriggerRef.current?.focus({ preventScroll: true }), 0);
    }
  }, []);

  useEffect(() => {
    if (!voiceMenuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!voiceMenuRef.current?.contains(event.target as Node)) {
        closeVoiceMenu();
      }
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeVoiceMenu(true);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeVoiceMenu, voiceMenuOpen]);

  useEffect(() => {
    if (!voiceMenuOpen) return;

    const focusActiveVoice = window.setTimeout(() => {
      const options = getVoiceMenuOptions(voiceMenuRef.current);
      const activeOption = options.find((option) => option.classList.contains("active"));
      (activeOption ?? options[0])?.focus({ preventScroll: true });
    }, 0);

    return () => window.clearTimeout(focusActiveVoice);
  }, [voiceMenuOpen]);

  if (reader.status === "idle" || reader.status === "unsupported") return null;

  const activeTitle = reader.activeSection?.title ?? "Lecture audio";
  const selectedVoice = reader.availableVoices.find(
    (voice) => voice.voiceURI === reader.selectedVoiceURI,
  );
  const voiceLabel = selectedVoice ? getShortVoiceLabel(selectedVoice) : "Voix auto";
  const isReaderRunning = reader.status === "playing" || reader.status === "starting";
  const primaryLabel =
    reader.status === "error" ? "Réessayer" : isReaderRunning ? "Pause" : "Reprendre";
  const primaryAction = reader.status === "error" ? reader.retry : reader.toggle;

  const handleVoiceMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const options = getVoiceMenuOptions(voiceMenuRef.current);
    if (options.length === 0) return;

    event.preventDefault();
    const currentIndex = Math.max(0, options.indexOf(document.activeElement as HTMLButtonElement));
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? options.length - 1
          : event.key === "ArrowDown"
            ? Math.min(options.length - 1, currentIndex + 1)
            : Math.max(0, currentIndex - 1);

    options[nextIndex]?.focus();
  };

  return (
    <aside
      className={`audio-player-bar ${reader.status === "error" ? "is-error" : ""}`}
      aria-label="Lecteur audio"
    >
      <div className="audio-player-main">
        <span className="audio-player-eyebrow">Audio</span>
        <span className="audio-player-title">{reader.error ?? activeTitle}</span>
      </div>
      <div className="audio-player-controls">
        <button
          className="audio-icon-button"
          disabled={!reader.canGoPrevious}
          onClick={reader.previous}
          title="Carte précédente"
          aria-label="Carte précédente"
          type="button"
        >
          <SkipBack size={17} />
        </button>
        <button
          className="audio-icon-button primary"
          onClick={primaryAction}
          title={primaryLabel}
          aria-label={primaryLabel}
          type="button"
        >
          {isReaderRunning ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button
          className="audio-icon-button"
          disabled={!reader.canGoNext}
          onClick={reader.next}
          title="Carte suivante"
          aria-label="Carte suivante"
          type="button"
        >
          <SkipForward size={17} />
        </button>
      </div>
      <div className="audio-voice-picker" ref={voiceMenuRef}>
        <button
          className="audio-voice-trigger"
          onClick={() => setVoiceMenuOpen((open) => !open)}
          aria-expanded={voiceMenuOpen}
          aria-haspopup="menu"
          ref={voiceTriggerRef}
          type="button"
        >
          <span>{voiceLabel}</span>
          <ChevronDown size={15} />
        </button>
        {voiceMenuOpen && (
          <div className="audio-voice-menu" onKeyDown={handleVoiceMenuKeyDown} role="menu">
            <button
              className={`audio-voice-option ${reader.selectedVoiceURI === null ? "active" : ""}`}
              onClick={() => {
                reader.setVoiceURI(null);
                closeVoiceMenu(true);
              }}
              role="menuitem"
              type="button"
            >
              <span>
                <strong>Voix auto recommandée</strong>
                <small>Priorise les voix françaises fiables</small>
              </span>
              {reader.selectedVoiceURI === null && <Check size={15} />}
            </button>
            {reader.availableVoices.length > 0 ? (
              reader.availableVoices.map((voice) => (
                <button
                  className={`audio-voice-option ${reader.selectedVoiceURI === voice.voiceURI ? "active" : ""}`}
                  onClick={() => {
                    reader.setVoiceURI(voice.voiceURI);
                    closeVoiceMenu(true);
                  }}
                  key={voice.voiceURI}
                  role="menuitem"
                  type="button"
                >
                  <span>
                    <strong>{getShortVoiceLabel(voice)}</strong>
                    <small>{getVoiceMetaLabel(voice)}</small>
                  </span>
                  {reader.selectedVoiceURI === voice.voiceURI && <Check size={15} />}
                </button>
              ))
            ) : (
              <div className="audio-voice-empty">Aucune voix disponible</div>
            )}
          </div>
        )}
      </div>
      <label className="audio-setting-slider audio-rate-slider">
        <span>{formatSpeechRate(reader.rate)}</span>
        <input
          type="range"
          min="0.75"
          max="1.6"
          step="0.05"
          value={reader.rate}
          onChange={(event) => reader.setRate(parseSpeechReaderRate(event.target.value))}
          aria-label="Vitesse de lecture"
        />
      </label>
      <label className="audio-setting-slider audio-breath-slider" title="Respiration">
        <span>{formatBreathMs(reader.breathMs)}</span>
        <input
          type="range"
          min="0"
          max="700"
          step="50"
          value={reader.breathMs}
          onChange={(event) => reader.setBreathMs(parseBreathMs(event.target.value))}
          aria-label="Respiration entre les segments"
        />
      </label>
      <button
        className="audio-icon-button audio-close-button"
        onClick={reader.stop}
        title="Fermer le lecteur"
        aria-label="Fermer le lecteur"
        type="button"
      >
        <X size={17} />
      </button>
    </aside>
  );
}

function getVoiceMenuOptions(root: HTMLDivElement | null) {
  return Array.from(root?.querySelectorAll<HTMLButtonElement>(".audio-voice-option") ?? []);
}

function parseSpeechReaderRate(value: string): SpeechReaderRate {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 1;
  return Math.min(1.6, Math.max(0.75, Math.round(numericValue * 20) / 20));
}

function formatSpeechRate(rate: number) {
  return `${rate.toFixed(2)}x`;
}

function parseBreathMs(value: string) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.min(700, Math.max(0, Math.round(numericValue / 50) * 50));
}

function formatBreathMs(breathMs: number) {
  return `${breathMs}ms`;
}

function getShortVoiceLabel(voice: SpeechSynthesisVoice) {
  return voice.name
    .replace(/\s*-\s*French\s*/gi, " ")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getVoiceMetaLabel(voice: SpeechSynthesisVoice) {
  const online = `${voice.name} ${voice.voiceURI}`.toLowerCase().includes("online");
  return `${voice.lang}${voice.localService ? " · locale" : online ? " · en ligne" : ""}`;
}
