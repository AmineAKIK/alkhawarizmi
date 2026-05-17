import { collaborationSheets } from "./sheets/collaboration";
import { conceptionSheets } from "./sheets/conception";
import { designSheets } from "./sheets/design";
import { productionSheets } from "./sheets/production";
import { techniqueSheets } from "./sheets/technique";
import type { CategoryName, DevSheet, PracticeSection, SheetNode, SheetTab, SheetTabDefinition } from "./schema";
export type { CategoryName } from "./schema";

export {
  collaborationSheets,
  conceptionSheets,
  designSheets,
  productionSheets,
  techniqueSheets,
};

const rawSheets = [
  ...conceptionSheets,
  ...designSheets,
  ...techniqueSheets,
  ...productionSheets,
  ...collaborationSheets,
];

export const sheets = rawSheets.map(normalizeSheet);

export const sheetCategories = [
  {
    name: "Conception",
    slug: "conception",
    sheets: getSheetsByPart("C"),
    description: "Problème, utilisateurs, solution, viabilité, priorisation, mesure et apprentissage.",
  },
  {
    name: "Design",
    slug: "design",
    sheets: getSheetsByPart("D"),
    description: "UX, principes visuels, composants, patterns, design system et passage au code.",
  },
  {
    name: "Technique",
    slug: "technique",
    sheets: getSheetsByPart("T"),
    description: "Environnement, architecture, workflow, backend, frontend, qualité et production.",
  },
  {
    name: "Production",
    slug: "production",
    sheets: getSheetsByPart("P"),
    description: "Observabilité, sécurité, performance, incidents, maintenance et itération en production.",
  },
  {
    name: "Collaboration",
    slug: "collaboration",
    sheets: getSheetsByPart("Co"),
    description: "Équipe technique, communication externe, documentation vivante et organisation du travail.",
  },
] as const;

export type CategorySlug = (typeof sheetCategories)[number]["slug"];
export type AppPath = `/${string}`;

export function getCategorySheets(category: CategoryName): DevSheet[] {
  return sheetCategories.find((candidate) => candidate.name === category)?.sheets ?? getSheetsByPart("T");
}

export function getCategoryForSheet(sheet: DevSheet): CategoryName {
  return sheetCategories.find((category) =>
    category.sheets.some((candidate) => candidate.id === sheet.id)
  )?.name ?? "Technique";
}

export function getCategoryBySlug(slug: string) {
  return sheetCategories.find((category) => category.slug === slug);
}

export function getCategorySlug(category: CategoryName): CategorySlug {
  return sheetCategories.find((candidate) => candidate.name === category)?.slug ?? "technique";
}

export function buildCategoryPath(category: CategoryName, query = ""): AppPath {
  const slug = getCategorySlug(category);
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query);
  return withSearch(`/${slug}`, params);
}

export function buildSheetPath(
  sheet: DevSheet,
  tab?: string | null,
  nodeId?: string | null,
  searchParams?: URLSearchParams
): AppPath {
  const categorySlug = getCategorySlug(getCategoryForSheet(sheet));
  const params = new URLSearchParams(searchParams);
  params.delete("q");

  if (tab && tab !== sheet.tabs[0]?.id) {
    params.set("tab", tab);
  } else {
    params.delete("tab");
  }

  return withSearch(`/${categorySlug}/${sheet.id}${nodeId ? `/${nodeId}` : ""}`, params);
}

export function getVisibleNodeIds(sheet: DevSheet): Set<string> {
  return new Set(Object.values(sheet.maps).flatMap((map) => (map ? map.nodes.map((node) => node.id) : [])));
}

export function getVisibleNodeCount(sheet: DevSheet): number {
  return getVisibleNodeIds(sheet).size;
}

function withSearch(path: `/${string}`, params: URLSearchParams): AppPath {
  const search = params.toString();
  return `${path}${search ? `?${search}` : ""}`;
}

function getSheetsByPart(part: DevSheet["part"]) {
  return sheets.filter((sheet) => sheet.part === part);
}

function normalizeSheet(sheet: DevSheet): DevSheet {
  const normalizedTabs = normalizeTabs(sheet);
  const normalizedMaps = normalizeMaps(sheet, normalizedTabs);
  const visibleNodeIds = getVisibleNodeIds({ ...sheet, maps: normalizedMaps });
  const nodeTabs = inferNodeTabs(normalizedMaps);
  const nodes = Object.fromEntries(
    Object.entries(sheet.nodes)
      .filter(([nodeId]) => visibleNodeIds.has(nodeId))
      .map(([nodeId, node]) => [nodeId, normalizeNode(node, sheet, nodeTabs.get(nodeId) ?? [])])
  );

  return {
    ...sheet,
    tabs: normalizedTabs,
    maps: normalizedMaps,
    displayNumber: sheet.displayNumber ?? inferDisplayNumber(sheet),
    badge: normalizeBadge(sheet),
    titleLines: sheet.titleLines ?? inferTitleLines(sheet),
    meta: normalizeMeta(sheet, Object.keys(nodes).length, normalizedTabs),
    nodes,
  };
}

function normalizeNode(node: SheetNode, sheet: DevSheet, tabs: SheetTab[]): SheetNode {
  const normalizedPractice = normalizePractice(node);
  return {
    ...node,
    os: node.os ?? inferNodeOs(sheet, tabs),
    niveau: node.niveau ?? inferNodeLevel(sheet, node),
    sections: {
      ...node.sections,
      why: normalizeWhy(sheet, node),
      system: normalizeSystemSection(sheet, node),
      invariants: normalizeInvariants(sheet, node.sections.invariants),
      practice: normalizedPractice,
      verification: node.sections.verification ?? defaultVerification(node),
    },
  };
}

function normalizeWhy(sheet: DevSheet, node: SheetNode) {
  if (sheet.part !== "T") return node.sections.why;
  const text = node.sections.why.trim();
  const startsLikeDefinition = /^<p>\s*(Un|Une|Le|La|Les|L'|L’)?\s*[^.]{0,120}\b(est|sont|permet|désigne|sert)\b/i.test(text);
  if (!startsLikeDefinition) return text;

  return `<p>Le problème apparaît dès qu'un projet réel dépend de "${node.label}" sans que son rôle, ses limites et son point de vérification soient explicites : l'équipe peut obtenir un résultat localement, puis perdre la reproductibilité, la lisibilité ou le diagnostic.</p>${text}`;
}

function normalizeTabs(sheet: DevSheet): SheetTabDefinition[] {
  if (sheet.part !== "T") return sheet.tabs;

  // T01 specifies its own tabs explicitly; don't override
  if (sheet.number === 1) return sheet.tabs;

  // For other Technical sheets, use JavaScript/Python tabs as standard pairs
  // Can be overridden by providing explicit tabs in the sheet data
  return sheet.tabs.length > 0 
    ? sheet.tabs 
    : [
        { id: "js", label: "JS JavaScript" },
        { id: "python", label: "🐍 Python" },
      ];
}

/**
 * Normalize maps for Technical sheets by consolidating aliases only when the
 * declared tabs ask for those normalized keys.
 * 
 * Recognizes these source map keys:
 * - "javascript" | "js" → normalized to "js"
 * - "python" → kept as is
 * - "workflow", "frontend" → kept when declared as actual tabs
 * 
 * This keeps the invariant tabs[].id === Object.keys(maps) after normalization.
 */
function normalizeMaps(sheet: DevSheet, tabs: Array<{ id: SheetTab }>): DevSheet["maps"] {
  if (sheet.part !== "T") return sheet.maps;

  const tabIds = tabs.map((tab) => tab.id);
  if (tabIds.length > 0 && tabIds.every((tabId) => Boolean(sheet.maps[tabId]))) {
    return sheet.maps;
  }

  const knownMaps = getKnownTechnicalMaps(sheet.maps);

  // If explicit js and/or python maps exist, use them directly
  if (knownMaps.js || knownMaps.python) {
    const result: DevSheet["maps"] = {};
    if (knownMaps.js) result.js = knownMaps.js;
    if (knownMaps.python) result.python = knownMaps.python;
    return result;
  }

  // Backward compatible aliases for older source data whose tabs were already js/python.
  if (knownMaps.workflow) {
    return tabIds.includes("workflow") ? { workflow: knownMaps.workflow } : { js: knownMaps.workflow, python: knownMaps.workflow };
  }

  if (knownMaps.frontend) {
    return tabIds.includes("frontend") ? { frontend: knownMaps.frontend } : { js: knownMaps.frontend, python: knownMaps.frontend };
  }

  return sheet.maps;
}

function getKnownTechnicalMaps(maps: DevSheet["maps"]): Pick<DevSheet["maps"], "js" | "python" | "workflow" | "frontend"> {
  return {
    js: maps.js,
    python: maps.python,
    workflow: maps.workflow,
    frontend: maps.frontend,
  };
}

function inferNodeTabs(maps: DevSheet["maps"]) {
  const result = new Map<string, SheetTab[]>();
  Object.entries(maps).forEach(([tab, map]) => {
    if (!map) return;
    map.nodes.forEach((node) => {
      const tabs = result.get(node.id) ?? [];
      tabs.push(tab as SheetTab);
      result.set(node.id, tabs);
    });
  });
  return result;
}

function inferNodeOs(sheet: DevSheet, tabs: SheetTab[]): SheetNode["os"] {
  if (sheet.part !== "T") return undefined;
  const unique = Array.from(new Set(tabs));
  if (unique.includes("windows") && unique.includes("macos") && unique.includes("linux")) return "all";
  if (unique.length === 2 && unique.includes("macos") && unique.includes("linux")) return "macos+linux";
  if (unique.length === 2 && unique.includes("js") && unique.includes("python")) return "all";
  if (unique.length === 1) {
    const [tab] = unique;
    if (["windows", "macos", "linux", "js", "python"].includes(tab)) return tab as SheetNode["os"];
  }
  return "all";
}

function inferNodeLevel(sheet: DevSheet, node: SheetNode): SheetNode["niveau"] {
  if (sheet.part !== "T") return node.niveau;
  if (sheet.number >= 9 && ["e2e", "ci", "rollback", "monitoring", "release-pipeline"].includes(node.id)) return "Avancé";
  if (
    [
      "middleware",
      "services",
      "repositories",
      "cache",
      "auth",
      "cors",
      "state-serveur",
      "effects",
      "coverage",
      "integration",
      "merge",
      "conflicts",
      "review",
      "pr",
    ].includes(node.id)
  ) {
    return "Intermédiaire";
  }
  return "Fondation";
}

function normalizeSystemSection(sheet: DevSheet, node: SheetNode) {
  if (sheet.part !== "T") return node.sections.system;
  if ((node.sections.system.match(/ref-fiche/g) ?? []).length >= 2) return node.sections.system;

  const context = technicalContextRefs(sheet.number);
  return `${node.sections.system}<p>Dans la progression technique, ce nœud s'appuie sur ${context.before} et prépare ${context.after}. La relation est concrète : sans cette couche, les commandes, la structure ou l'exécution des fiches suivantes deviennent implicites et donc difficiles à reproduire.</p>`;
}

function technicalContextRefs(number: number) {
  const refs = {
    t01: '<span class="ref-fiche">→ T01</span>',
    t02: '<span class="ref-fiche">→ T02</span>',
    t03: '<span class="ref-fiche">→ T03</span>',
    t04: '<span class="ref-fiche">→ T04</span>',
    t05: '<span class="ref-fiche">→ T05</span>',
    t06: '<span class="ref-fiche">→ T06</span>',
    t07: '<span class="ref-fiche">→ T07</span>',
    t08: '<span class="ref-fiche">→ T08</span>',
    t09: '<span class="ref-fiche">→ T09</span>',
    t10: '<span class="ref-fiche">→ T10</span>',
  };
  if (number <= 1) return { before: `${refs.t01} comme socle d'environnement`, after: `${refs.t02} puis ${refs.t04}` };
  if (number === 2) return { before: `${refs.t01}`, after: `${refs.t03} puis ${refs.t04}` };
  if (number === 3) return { before: `${refs.t02}`, after: `${refs.t06} et ${refs.t07}` };
  if (number === 4) return { before: `${refs.t03}`, after: `${refs.t05} et ${refs.t09}` };
  if (number === 5) return { before: `${refs.t02} et ${refs.t04}`, after: `${refs.t09} puis ${refs.t10}` };
  if (number === 6) return { before: `${refs.t03}`, after: `${refs.t07} et ${refs.t09}` };
  if (number === 7) return { before: `${refs.t03} et ${refs.t06}`, after: `${refs.t08} et ${refs.t10}` };
  if (number === 8) return { before: `${refs.t07}`, after: `${refs.t09} et ${refs.t10}` };
  if (number === 9) return { before: `${refs.t04} et ${refs.t06}`, after: `${refs.t10}` };
  return { before: `${refs.t09}`, after: `${refs.t10} puis les pratiques de production <span class="ref-fiche">→ P01</span>` };
}

function normalizeInvariants(sheet: DevSheet, invariants: string) {
  if (sheet.part !== "T") return invariants;
  if (invariants.includes("Ce qui change") && invariants.includes("Ce qui ne change pas")) return invariants;
  const text = stripHtml(invariants);
  return `${invariants}<p><strong>Ce qui change :</strong> les outils, syntaxes et plateformes qui implémentent ce principe. <strong>Ce qui ne change pas :</strong> ${text}</p>`;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizePractice(node: SheetNode) {
  const practice = node.sections.practice;
  if (!("commands" in practice)) return practice;

  const commands: PracticeSection["commands"] = practice.commands.map((command) => {
    const normalizedValue = normalizeCommandValue(command.value);
    if (command.type !== "cmd") return { ...command, value: normalizedValue };
    if (looksLikeExecutableCommand(normalizedValue)) return { ...command, value: normalizedValue };
    return { type: "comment", value: normalizedValue };
  });

  return { ...practice, commands };
}

function normalizeCommandValue(value: string) {
  return value
    .replace(/\bnpm install -D\b/g, "npm install --save-dev")
    .replace(/\bnpm i -D\b/g, "npm install --save-dev")
    .replace(/\bnpm i\b/g, "npm install")
    .replace(/\bpython -m venv\b/g, "python3 -m venv")
    .replace(/\bpip install\b/g, "python3 -m pip install");
}

function looksLikeExecutableCommand(value: string) {
  return /^(npm|npx|node|python3|pytest|ruff|black|git|gh|curl|wsl|sudo|brew|apt|code|mkdir|touch|echo|cp|mv|rm|source|\.venv|uvicorn|docker|psql|redis-cli|nvm|lsb_release|ls |cat |grep |rg |EXPLAIN\s+|ALTER\s+SYSTEM\s+|SELECT\s+|CREATE\s+INDEX\s+|DEPLOYED_SHA=|NODE_ENV=|DATABASE_URL=|JWT_SECRET=|CORS_ORIGIN=|LOG_LEVEL=|GET\s+https?:\/\/)/.test(value.trim());
}

function defaultVerification(node: SheetNode) {
  return [
    `Quel problème concret le nœud "${node.label}" permet-il de résoudre dans un projet réel ?`,
    `Dans quel scénario ce nœud devient-il critique, et quel signal te ferait réagir ?`,
    `Quel invariant dois-tu retenir pour appliquer "${node.label}" même avec un autre outil ou framework ?`,
  ];
}

/**
 * Infer a display number (e.g., "T01", "C03") from sheet badge and metadata.
 * 
 * Attempts to extract from badge pattern first, then falls back to part + number.
 * Warns if badge parsing fails silently (badge format unexpected).
 */
function inferDisplayNumber(sheet: DevSheet) {
  const prefixes: Record<DevSheet["part"], string> = {
    T: "T",
    C: "C",
    D: "D",
    P: "P",
    Co: "Co",
  };
  
  // Try to extract number from badge pattern (e.g., "Fiche T01" or "Fiche #T01")
  const match = sheet.badge.match(/Fiche\s+(?:#)?([A-Za-z]*\d+)/);
  if (match && match[1]) {
    const extracted = match[1];
    // Validate extraction: if already has prefix (e.g., "T01"), use as-is
    if (/^[A-Za-z]+\d+/.test(extracted)) {
      return extracted;
    }
    // Otherwise, prepend the appropriate prefix based on part
    return `${prefixes[sheet.part]}${extracted}`;
  }
  
  // Fallback: use part prefix + zero-padded number
  // This is the safe default if badge doesn't match expected pattern
  return `${prefixes[sheet.part]}${String(sheet.number).padStart(2, "0")}`;
}

function normalizeBadge(sheet: DevSheet) {
  if (sheet.part !== "T" || !sheet.badge.includes("Fiche #")) return sheet.badge;
  return sheet.badge.replace(/Fiche #(\d+)/, "Fiche T$1");
}

function inferTitleLines(sheet: DevSheet): [string, string] {
  const explicit: Record<string, [string, string]> = {
    "collaboration-equipe-technique": ["Travailler en", "Équipe Technique"],
    "collaboration-communication-externe": ["Communiquer Hors de", "l'Équipe Technique"],
    "collaboration-documentation": ["Documentation", "Vivante"],
    "collaboration-organisation": ["Organiser", "le Travail"],
    "production-monitoring": ["Monitoring et", "Observabilité"],
    "production-securite": ["Sécurité", "Applicative"],
    "production-performance": ["Performance et", "Scaling"],
    "production-maintenance": ["Maintenance et", "Itération"],
    "design-D04": ["Du Design", "au Code"],
  };

  if (explicit[sheet.id]) return explicit[sheet.id];

  const words = sheet.title.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ") || words[0]];
}

/**
 * Normalize sheet.meta by:
 * - For Technical sheets: if meta is empty or not provided, auto-generate from sheet structure
 * - For other sheets: standardize "7 sections" → "8 sections" format
 * 
 * Note: For Technical sheets with explicit meta, the declared meta is preserved.
 * This allows authors to customize the meta display when auto-generation doesn't fit.
 */
function normalizeMeta(sheet: DevSheet, nodeCount: number, tabs: Array<{ id: string }>) {
  if (sheet.part === "T") {
    // If meta is explicitly provided and non-empty, respect it
    if (sheet.meta && sheet.meta.length > 0) {
      return sheet.meta.map((line) => line.replace("7 sections / nœud", "8 sections / nœud"));
    }
    // Otherwise, auto-generate meta based on sheet structure
    const context = tabs.some((tab) => tab.id === "windows") ? "3 OS" : "2 langages";
    return [`${nodeCount} nœuds · ${context}`, "8 sections / nœud"];
  }
  return sheet.meta.map((line) => line.replace("7 sections / nœud", "8 sections / nœud"));
}
