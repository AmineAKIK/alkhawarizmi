import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { App } from "./App";
import { sheets } from "../data/catalog";

afterEach(() => {
  cleanup();
  window.history.pushState(null, "", "/");
});

describe("App routing", () => {
  it("renders the home page at the root path", () => {
    window.history.pushState(null, "", "/");
    render(<App />);
    expect(screen.getByText("Al-Khawarizmi")).toBeInTheDocument();
  });

  it("renders a not-found page for an unknown category slug", () => {
    window.history.pushState(null, "", "/does-not-exist");
    render(<App />);
    expect(screen.getByText("Cette catégorie n'existe pas.")).toBeInTheDocument();
  });

  it("renders a not-found page for a route with too many segments", () => {
    window.history.pushState(null, "", "/technique/some-sheet/some-node/extra");
    render(<App />);
    expect(screen.getByText(/trop de segments/i)).toBeInTheDocument();
  });

  it("renders a known category page", () => {
    window.history.pushState(null, "", "/technique");
    render(<App />);
    expect(screen.getByText("Technique")).toBeInTheDocument();
  });

  it("renders a known sheet directly from its URL", async () => {
    const sheet = sheets.find((s) => s.part === "T");
    if (!sheet) throw new Error("Expected at least one Technique sheet for this test.");
    window.history.pushState(null, "", `/technique/${sheet.id}`);
    render(<App />);
    // SheetView is lazy-loaded (see App.tsx), so its content appears after a
    // microtask/Suspense boundary — findByText waits for it instead of
    // asserting on the initial synchronous render.
    expect(await screen.findByText(sheet.badge)).toBeInTheDocument();
  });
});
