import type { DevSheet, SheetNode } from "../../schema";
import { buildFreeNodeSections, universalSheet, type ExercisePracticeInput } from "../common";

type DesignKind = "fondement" | "visuel" | "pattern" | "systeme";

export function designNode({
  id,
  label,
  icon,
  kind,
  niveau,
  why,
  system,
  choice,
  senior,
  errors,
  invariants,
  practice,
  verification,
}: {
  id: string;
  label: string;
  icon: string;
  kind: DesignKind;
  niveau: SheetNode["niveau"];
  why: string;
  system: string;
  choice: string;
  senior: string;
  errors: string;
  invariants: string;
  practice: ExercisePracticeInput;
  verification: string[];
}): SheetNode {
  return {
    id,
    label,
    icon,
    kind,
    osLabel: "Universel",
    niveau,
    sections: buildFreeNodeSections({ why, system, choice, senior, errors, invariants, practice, verification }),
  };
}

export function designSheet(data: Omit<DevSheet, "part" | "status" | "category" | "level" | "tabs">): DevSheet {
  return universalSheet("D", "Design", data);
}
