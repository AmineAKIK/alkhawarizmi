import type { DevSheet, SheetNode } from "../../schema";
import { buildPractice, universalSheet, type ExercisePracticeInput } from "../common";

type CollaborationKind = "humain" | "processus" | "communication" | "organisation";

export function coNode({
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
  kind: CollaborationKind;
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
    os: "all",
    osLabel: "Universel",
    niveau,
    sections: {
      why: `<p>${why}</p>`,
      system: normalizeCollaborationSystem(system),
      choice: { kind: "free", html: `<p>${choice}</p>` },
      senior: `<p>${senior}</p>`,
      errors,
      invariants,
      practice: buildPractice(practice),
      verification,
    },
  };
}

function normalizeCollaborationSystem(system: string) {
  if ((system.match(/ref-fiche/g) ?? []).length >= 2) return `<p>${system}</p>`;
  return `<p>${system}</p><p>Dans la progression Collaboration, cette pratique relie les dynamiques internes d'équipe <span class="ref-fiche">→ Co01</span>, la communication hors équipe <span class="ref-fiche">→ Co02</span>, la mémoire documentaire <span class="ref-fiche">→ Co03</span> et l'organisation du travail <span class="ref-fiche">→ Co04</span>. Elle prolonge aussi les workflows techniques <span class="ref-fiche">→ T05</span> et les arbitrages de conception <span class="ref-fiche">→ C05</span> quand le travail devient collectif.</p>`;
}

export function coSheet(data: Omit<DevSheet, "part" | "status" | "category" | "level" | "tabs">): DevSheet {
  return universalSheet("Co", "Collaboration", data);
}
