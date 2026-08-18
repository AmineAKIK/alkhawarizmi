import { describe, expect, it } from "vitest";
import { prepareRichText } from "./richText";

describe("prepareRichText", () => {
  it("preserves authored HTML outside inline code", () => {
    expect(prepareRichText("<p><strong>Important</strong></p>")).toBe(
      "<p><strong>Important</strong></p>",
    );
  });

  it("escapes HTML-looking inline code before rendering", () => {
    expect(prepareRichText("Utilise `<div onClick={handleDelete}>` ici.")).toBe(
      "Utilise <code>&lt;div onClick={handleDelete}&gt;</code> ici.",
    );
  });

  it("escapes ampersands and quotes inside inline code", () => {
    expect(prepareRichText('Teste `<a href="x&y">`')).toBe(
      "Teste <code>&lt;a href=&quot;x&amp;y&quot;&gt;</code>",
    );
  });
});
