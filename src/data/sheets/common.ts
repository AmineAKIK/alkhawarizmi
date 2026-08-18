import type {
  CategoryName,
  DevSheet,
  PracticeExercise,
  PracticeSection,
  SheetNode,
  SheetPart,
  SystemMap,
} from "../schema";

export type NodePracticeInput =
  | { kind: "cmds"; commands: PracticeSection["commands"]; debt: string; verification?: string }
  | ExercisePracticeInput;

export type ExercisePracticeInput =
  | { kind: "exercices"; items: PracticeExercise[]; piege: string }
  | (PracticeExercise & { kind?: "exercices"; piege: string });

export type NodeSectionsInput = {
  why: string;
  system: string;
  choice: string;
  senior: string;
  errors: string;
  invariants: string;
  practice: NodePracticeInput;
  verification: [string, string, string];
};

export function buildPractice(practice: NodePracticeInput): SheetNode["sections"]["practice"] {
  if (practice.kind === "cmds") {
    return {
      commands: practice.commands,
      verification: practice.verification,
      debt: practice.debt,
    };
  }

  if ("items" in practice) {
    return { exercices: practice.items, piege: practice.piege };
  }

  return {
    exercices: [
      {
        titre: practice.titre,
        etapes: practice.etapes,
        output: practice.output,
        critere: practice.critere,
      },
    ],
    piege: practice.piege,
  };
}

export function buildFreeNodeSections({
  why,
  system,
  choice,
  senior,
  errors,
  invariants,
  practice,
  verification,
}: NodeSectionsInput): SheetNode["sections"] {
  return {
    why: `<p>${why}</p>`,
    system: `<p>${system}</p>`,
    choice: { kind: "free", html: `<p>${choice}</p>` },
    senior: `<p>${senior}</p>`,
    errors,
    invariants,
    practice: buildPractice(practice),
    verification,
  };
}

export function dualLanguageMaps(map: SystemMap): Pick<DevSheet["maps"], "js" | "python"> {
  return {
    js: map,
    python: map,
  };
}

export function universalSheet(
  part: Exclude<SheetPart, "T">,
  category: CategoryName,
  data: Omit<DevSheet, "part" | "category" | "level" | "tabs">,
): DevSheet {
  return {
    ...data,
    part,
    category,
    level: "Tout niveau",
    tabs: [{ id: "universel", label: "Universel" }],
  };
}
