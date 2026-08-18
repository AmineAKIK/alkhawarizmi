import { afterEach, describe, expect, it, vi } from "vitest";
import { buildReadableNodeQueue, buildReadableSections, htmlToSpeechText } from "./readableContent";
import { sheets } from "../data/catalog";

afterEach(() => vi.unstubAllGlobals());

describe("htmlToSpeechText", () => {
  it("converts semantic markup, references and code into readable text", () => {
    const result = htmlToSpeechText(
      '<p>Consulte <span class="ref-fiche">→ T02</span><br><code>npm --version</code></p>',
    );

    expect(result).toContain("Consulte");
    expect(result).toContain("voir fiche T02");
    expect(result).toContain("npm double tiret version");
  });

  it("falls back to stripping markup when DOMParser is unavailable", () => {
    vi.stubGlobal("DOMParser", undefined);
    expect(htmlToSpeechText("<p>Texte <strong>simple</strong></p>")).toBe("Texte simple");
  });
});

describe("readable section builders", () => {
  it("builds non-empty readable sections from a real normalized node", () => {
    const sheet = sheets.find((candidate) => Object.keys(candidate.nodes).length > 0);
    if (!sheet) throw new Error("Expected at least one sheet with nodes.");
    const node = Object.values(sheet.nodes)[0];
    if (!node) throw new Error("Expected at least one node.");

    const sections = buildReadableSections(node, sheet.part);
    expect(sections.length).toBeGreaterThan(0);
    expect(sections.every((section) => section.text.trim().length > 0)).toBe(true);
  });

  it("prepends the node title when building the full reading queue", () => {
    const sheet = sheets.find((candidate) => Object.keys(candidate.nodes).length > 0);
    if (!sheet) throw new Error("Expected at least one sheet with nodes.");
    const node = Object.values(sheet.nodes)[0];
    if (!node) throw new Error("Expected at least one node.");

    const queue = buildReadableNodeQueue(node, sheet.part);
    expect(queue[0]).toMatchObject({ kind: "title", nodeId: node.id, text: node.label });
  });
});
