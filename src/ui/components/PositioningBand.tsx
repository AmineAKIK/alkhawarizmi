import { useState } from "react";
import { positioningText } from "../../data/presentation";

const storageKey = "positioning-band-dismissed";

export function PositioningBand() {
  const [dismissed, setDismissed] = useState(readDismissedState);

  if (dismissed) return null;

  return (
    <section className="positioning-band">
      <p>{positioningText}</p>
      <button
        className="positioning-band-close"
        aria-label="Fermer"
        onClick={() => {
          storeDismissedState();
          setDismissed(true);
        }}
        type="button"
      >
        ✕
      </button>
    </section>
  );
}

function readDismissedState() {
  try {
    return localStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

function storeDismissedState() {
  try {
    localStorage.setItem(storageKey, "1");
  } catch {
    // Persistence is optional; dismissing the banner must still work.
  }
}
