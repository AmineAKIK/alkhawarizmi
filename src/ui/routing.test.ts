import { describe, expect, it } from "vitest";
import { resolveAppHref } from "./routing";

describe("resolveAppHref", () => {
  it("keeps root-hosted paths unchanged", () => {
    expect(resolveAppHref("/technique", "/")).toBe("/technique");
  });

  it("prefixes repository-hosted paths with the Vite base", () => {
    expect(resolveAppHref("/technique/git-workflow?tab=python", "/alkhawarizmi/")).toBe(
      "/alkhawarizmi/technique/git-workflow?tab=python",
    );
  });

  it("does not duplicate slashes when the base has a trailing slash", () => {
    expect(resolveAppHref("/culture", "/alkhawarizmi/")).toBe("/alkhawarizmi/culture");
  });
});
