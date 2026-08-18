import { describe, expect, it } from "vitest";
import {
  buildCategoryPath,
  buildSheetPath,
  collaborationSheets,
  conceptionSheets,
  cultureSheets,
  designSheets,
  getCategoryBySlug,
  getCategoryForSheet,
  getCategorySheets,
  getCategorySlug,
  getVisibleNodeCount,
  productionSheets,
  sheetCategories,
  sheets,
  techniqueSheets,
} from "./catalog";
import type { CategoryName, DevSheet } from "./schema";

const authoredSheets: DevSheet[] = [
  ...conceptionSheets,
  ...designSheets,
  ...techniqueSheets,
  ...productionSheets,
  ...collaborationSheets,
  ...cultureSheets,
];

const activeMarkupPattern = /<\s*\/?\s*(script|iframe|object|embed|style|link|meta)\b/i;
const eventHandlerPattern = /\son[a-z]+\s*=/i;
const javascriptUrlPattern = /\b(?:href|src)\s*=\s*["']\s*javascript:/i;
const inlineCodePattern = /`[^`\n]+`/g;

describe("sheets", () => {
  it("is not empty and every sheet has normalized titleLines", () => {
    expect(sheets.length).toBeGreaterThan(0);
    for (const sheet of sheets) {
      expect(sheet.titleLines).toHaveLength(2);
      expect(sheet.titleLines[0].length).toBeGreaterThan(0);
    }
  });

  it("has unique ids across the whole catalog", () => {
    const ids = sheets.map((sheet) => sheet.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("assigns every sheet to exactly one category", () => {
    for (const sheet of sheets) {
      expect(() => getCategoryForSheet(sheet)).not.toThrow();
    }
  });
});

describe("authored catalog integrity", () => {
  it("keeps record keys and node ids identical", () => {
    for (const sheet of authoredSheets) {
      for (const [nodeKey, node] of Object.entries(sheet.nodes)) {
        expect(node.id, `${sheet.id}: node key ${nodeKey}`).toBe(nodeKey);
      }
    }
  });

  it("references only declared nodes from maps", () => {
    for (const sheet of authoredSheets) {
      for (const [tab, map] of Object.entries(sheet.maps)) {
        if (!map) continue;
        for (const mapNode of map.nodes) {
          expect(
            sheet.nodes[mapNode.id],
            `${sheet.id}/${tab}: map references missing node ${mapNode.id}`,
          ).toBeDefined();
        }
      }
    }
  });

  it("does not repeat a node id inside the same map", () => {
    for (const sheet of authoredSheets) {
      for (const [tab, map] of Object.entries(sheet.maps)) {
        if (!map) continue;
        const ids = map.nodes.map((node) => node.id);
        expect(new Set(ids).size, `${sheet.id}/${tab}: duplicate map node id`).toBe(ids.length);
      }
    }
  });

  it("keeps authored rich text free of executable markup outside inline code", () => {
    for (const sheet of authoredSheets) {
      for (const text of collectStrings(sheet)) {
        const liveMarkup = text.replace(inlineCodePattern, "");
        expect(liveMarkup, `${sheet.id}: active HTML element`).not.toMatch(activeMarkupPattern);
        expect(liveMarkup, `${sheet.id}: inline event handler`).not.toMatch(eventHandlerPattern);
        expect(liveMarkup, `${sheet.id}: javascript URL`).not.toMatch(javascriptUrlPattern);
      }
    }
  });
});

describe("getCategorySheets / getCategorySlug", () => {
  it("returns the sheets for a known category", () => {
    const result = getCategorySheets("Technique");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((sheet) => sheet.part === "T")).toBe(true);
  });

  it("throws instead of silently falling back for an unknown category", () => {
    expect(() => getCategorySheets("NotACategory" as CategoryName)).toThrow();
    expect(() => getCategorySlug("NotACategory" as CategoryName)).toThrow();
  });

  it("round-trips every real category through its slug", () => {
    for (const category of sheetCategories) {
      expect(getCategorySlug(category.name)).toBe(category.slug);
      expect(getCategoryBySlug(category.slug)?.name).toBe(category.name);
    }
  });

  it("returns undefined (not a throw) for an unknown slug from the URL", () => {
    expect(getCategoryBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("buildCategoryPath / buildSheetPath", () => {
  it("builds a category path with and without a query", () => {
    expect(buildCategoryPath("Technique")).toBe("/technique");
    expect(buildCategoryPath("Technique", "git")).toBe("/technique?q=git");
  });

  it("builds a sheet path rooted under its real category", () => {
    const [sheet] = sheets;
    if (!sheet) throw new Error("Expected at least one sheet in the catalog.");
    const path = buildSheetPath(sheet);
    const slug = getCategorySlug(getCategoryForSheet(sheet));
    expect(path).toBe(`/${slug}/${sheet.id}`);
  });

  it("appends the node id when provided", () => {
    const [sheet] = sheets;
    if (!sheet) throw new Error("Expected at least one sheet in the catalog.");
    const path = buildSheetPath(sheet, null, "some-node");
    expect(path.endsWith("/some-node")).toBe(true);
  });
});

describe("getVisibleNodeCount", () => {
  it("matches the number of unique node ids referenced across all maps", () => {
    for (const sheet of sheets) {
      const count = getVisibleNodeCount(sheet);
      const idsFromMaps = new Set(
        Object.values(sheet.maps).flatMap((map) => (map ? map.nodes.map((n) => n.id) : [])),
      );
      expect(count).toBe(idsFromMaps.size);
    }
  });
});

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap(collectStrings);
}
