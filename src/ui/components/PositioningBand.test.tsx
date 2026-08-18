import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { positioningText } from "../../data/presentation";
import { PositioningBand } from "./PositioningBand";

beforeEach(() => localStorage.clear());
afterEach(() => cleanup());

describe("PositioningBand", () => {
  it("persists dismissal and disappears immediately", () => {
    render(<PositioningBand />);
    expect(screen.getByText(positioningText)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fermer" }));

    expect(screen.queryByText(positioningText)).not.toBeInTheDocument();
    expect(localStorage.getItem("positioning-band-dismissed")).toBe("1");
  });

  it("stays hidden when dismissal was previously persisted", () => {
    localStorage.setItem("positioning-band-dismissed", "1");
    const { container } = render(<PositioningBand />);
    expect(container).toBeEmptyDOMElement();
  });
});
