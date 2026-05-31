export type NodeKind =
  | "tool" | "infra" | "runtime" | "vcs"
  | "diagnostic" | "decision" | "validation" | "modele"
  | "fondement" | "visuel" | "pattern" | "systeme"
  | "observabilite" | "securite" | "performance" | "processus"
  | "humain" | "communication" | "organisation";

export type NodeLevel = "Fondation" | "Intermédiaire" | "Avancé";
export type NodeOs = "all" | "universel" | "windows" | "macos" | "linux" | "macos+linux" | "js" | "python";
export const sheetTabs = ["universel", "windows", "macos", "linux", "js", "python", "workflow", "frontend"] as const;
export type SheetTab = (typeof sheetTabs)[number];
export type SheetPart = "T" | "C" | "D" | "P" | "Co" | "F";
export type CategoryName = "Technique" | "Conception" | "Design" | "Production" | "Collaboration" | "Culture";
export type SheetLevel = "Tout niveau" | "Débutant" | "Débutant → Junior" | "Junior" | "Intermédiaire" | "Avancé" | "Junior → Confirmé";

export type SheetTabDefinition = {
  id: SheetTab;
  label: string;
};

export type ChoiceSection =
  | { kind: "structured"; main: string; alternatives: Array<{ name: string; description: string }> }
  | { kind: "free"; html: string };

export type PracticeSection = {
  commands: Array<{
    type: "comment" | "cmd" | "snippet";
    value: string;
  }>;
  verification?: string;
  debt: string;
};

export type PracticeExercise = {
  titre: string;
  etapes: string[];
  output: string;
  critere: string;
};

export type PracticeConception = {
  exercices: PracticeExercise[];
  piege: string;
};

export type SheetNode = {
  id: string;
  label: string;
  icon: string;
  kind: NodeKind;
  os?: NodeOs;
  osLabel: string;
  niveau?: NodeLevel;
  sections: {
    why: string;
    system: string;
    choice: ChoiceSection;
    senior: string;
    errors: string;
    invariants: string;
    practice: PracticeSection | PracticeConception;
    verification: [string, string, string];
  };
};

export type MapNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type MapEdge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
};

export type SystemMap = {
  viewBox: string;
  nodes: MapNode[];
  edges: MapEdge[];
};

export type DevSheet = {
  id: string;
  part: SheetPart;
  number: number;
  displayNumber?: string;
  title: string;
  titleLines?: [string, string];
  subtitle: string;
  badge: string;
  meta: string[];
  category: CategoryName;
  level: SheetLevel;
  readingTime: string;
  description: string;
  accent: NodeKind;
  tabs: SheetTabDefinition[];
  nodes: Record<string, SheetNode>;
  maps: Partial<Record<SheetTab, SystemMap>>;
};
