import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";
import { getCategoryForSheet, getCategorySlug, sheetCategories, sheets } from "../data/catalog";

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

  it("repairs a wrong category without dropping the selected tab", async () => {
    const sheet = sheets.find((candidate) => candidate.tabs.length > 1);
    if (!sheet) throw new Error("Expected at least one sheet with multiple tabs.");

    const realCategory = getCategoryForSheet(sheet);
    const wrongCategory = sheetCategories.find((candidate) => candidate.name !== realCategory);
    const selectedTab = sheet.tabs[1];
    if (!wrongCategory || !selectedTab) {
      throw new Error("Expected a second category and tab for the routing test.");
    }

    window.history.pushState(
      null,
      "",
      `/${wrongCategory.slug}/${sheet.id}?tab=${encodeURIComponent(selectedTab.id)}`,
    );
    render(<App />);

    await waitFor(() => {
      expect(window.location.pathname).toBe(`/${getCategorySlug(realCategory)}/${sheet.id}`);
      expect(new URLSearchParams(window.location.search).get("tab")).toBe(selectedTab.id);
    });
  });
});
