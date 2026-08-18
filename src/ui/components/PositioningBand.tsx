import { useState } from "react";
import { positioningText } from "../../data/presentation";

export function PositioningBand() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("positioning-band-dismissed") === "1",
  );

  if (dismissed) return null;

  return (
    <section className="positioning-band">
      <p>{positioningText}</p>
      <button
        className="positioning-band-close"
        aria-label="Fermer"
        onClick={() => {
          localStorage.setItem("positioning-band-dismissed", "1");
          setDismissed(true);
        }}
      >
        ✕
      </button>
    </section>
  );
}
