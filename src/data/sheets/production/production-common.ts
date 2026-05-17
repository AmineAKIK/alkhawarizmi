import type { DevSheet, SheetNode } from "../../schema";
import { buildPractice, universalSheet, type NodePracticeInput } from "../common";

type ProductionKind = "observabilite" | "securite" | "performance" | "processus";

export function prodNode({
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
  kind: ProductionKind;
  niveau: SheetNode["niveau"];
  why: string;
  system: string;
  choice: string;
  senior: string;
  errors: string;
  invariants: string;
  practice: NodePracticeInput;
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
      why: normalizeProductionWhy(label, why),
      system: normalizeProductionSystem(system),
      choice: { kind: "free", html: `<p>${choice}</p>` },
      senior: `<p>${senior}</p>`,
      errors,
      invariants,
      practice: buildPractice(practice),
      verification,
    },
  };
}

function normalizeProductionWhy(label: string, why: string) {
  const startsLikeDefinition = /^(Un|Une|Le|La|Les|L'|L')?\s*[^.]{0,120}\b(est|sont|concentre|répond|permet|désigne)\b/i.test(why.trim());
  if (!startsLikeDefinition) return `<p>${why}</p>`;
  return `<p>En production, le problème devient concret quand "${label}" manque ou reste implicite : l'équipe découvre trop tard une panne, une fuite, une lenteur ou une dette qui aurait dû être visible et traitée avant l'urgence.</p><p>${why}</p>`;
}

function normalizeProductionSystem(system: string) {
  if ((system.match(/ref-fiche/g) ?? []).length >= 2) return `<p>${system}</p>`;
  return `<p>${system}</p><p>Dans la chaîne production, ce nœud s'articule avec l'observabilité <span class="ref-fiche">→ P01</span>, la sécurité <span class="ref-fiche">→ P02</span>, la performance <span class="ref-fiche">→ P03</span> et la maintenance continue <span class="ref-fiche">→ P04</span>. Il prolonge aussi les décisions techniques des fiches <span class="ref-fiche">→ T04</span> et <span class="ref-fiche">→ T10</span> quand le code passe du local au réel.</p>`;
}

export function prodSheet(data: Omit<DevSheet, "part" | "status" | "category" | "level" | "tabs">): DevSheet {
  return universalSheet("P", "Production", data);
}
