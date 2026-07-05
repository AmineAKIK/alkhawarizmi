import { section4Titles } from "../data/presentation";
import type { PracticeConception, PracticeSection, SheetNode, SheetPart } from "../data/schema";

export type ReadableSectionKind =
  | "why"
  | "system"
  | "choice"
  | "senior"
  | "errors"
  | "invariants"
  | "practice"
  | "verification";

export type ReadableSection = {
  id: string;
  nodeId: string;
  kind: ReadableSectionKind;
  title: string;
  text: string;
};

export function buildReadableSections(node: SheetNode, part: SheetPart): ReadableSection[] {
  return [
    makeReadableSection(node, "why", "Pourquoi ça existe", htmlToSpeechText(node.sections.why)),
    makeReadableSection(node, "system", "Sa place dans le système", htmlToSpeechText(node.sections.system)),
    makeReadableSection(node, "choice", "Le choix conscient", choiceToSpeechText(node.sections.choice)),
    makeReadableSection(node, "senior", section4Titles[part], htmlToSpeechText(node.sections.senior)),
    makeReadableSection(node, "errors", "Les erreurs classiques", htmlToSpeechText(node.sections.errors)),
    makeReadableSection(node, "invariants", "Les invariants", htmlToSpeechText(node.sections.invariants)),
    makeReadableSection(node, "practice", "Pratique", practiceToSpeechText(node.sections.practice)),
    makeReadableSection(node, "verification", "Vérifie ta compréhension", verificationToSpeechText(node.sections.verification)),
  ].filter((section) => section.text.length > 0);
}

export function htmlToSpeechText(html: string) {
  if (typeof DOMParser === "undefined") {
    return normalizeSpeechText(stripHtml(html));
  }

  const doc = new DOMParser().parseFromString(`<main>${html}</main>`, "text/html");
  return normalizeSpeechText(readDomNode(doc.body));
}

function makeReadableSection(
  node: SheetNode,
  kind: ReadableSectionKind,
  title: string,
  text: string,
): ReadableSection {
  return {
    id: `${node.id}:${kind}`,
    nodeId: node.id,
    kind,
    title,
    text,
  };
}

function choiceToSpeechText(choice: SheetNode["sections"]["choice"]) {
  if (choice.kind === "free") return htmlToSpeechText(choice.html);

  const alternatives = choice.alternatives
    .map((alternative) => `${alternative.name}. ${alternative.description}`)
    .join(". ");

  return normalizeSpeechText(`${htmlToSpeechText(choice.main)} Alternatives. ${alternatives}`);
}

function practiceToSpeechText(practice: PracticeSection | PracticeConception) {
  if ("commands" in practice) {
    const commands = practice.commands
      .map((command) => {
        const label = command.type === "cmd" ? "Commande" : command.type === "snippet" ? "Extrait" : "Note";
        return `${label}. ${command.value}`;
      })
      .join(". ");
    const verification = practice.verification ? `Vérification. ${practice.verification}` : "";
    return normalizeSpeechText(`${commands}. ${verification}. Dette potentielle. ${practice.debt}`);
  }

  const exercices = practice.exercices
    .map((exercise) => {
      const steps = exercise.etapes.map((step, index) => `Étape ${index + 1}. ${htmlToSpeechText(step)}`).join(". ");
      return `${exercise.titre}. ${steps}. Output attendu. ${htmlToSpeechText(exercise.output)}. Critère. ${htmlToSpeechText(exercise.critere)}`;
    })
    .join(". ");

  return normalizeSpeechText(`${exercices}. Piège commun. ${htmlToSpeechText(practice.piege)}`);
}

function verificationToSpeechText(questions: [string, string, string]) {
  return normalizeSpeechText(
    questions.map((question, index) => `Question ${index + 1}. ${htmlToSpeechText(question)}`).join(". "),
  );
}

function readDomNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (element.classList.contains("ref-fiche")) {
    return ` voir fiche ${normalizeReference(element.textContent ?? "")}. `;
  }

  if (tagName === "br") return ". ";
  if (tagName === "code") return ` ${normalizeCodeForSpeech(element.textContent ?? "")} `;

  const children = Array.from(element.childNodes).map(readDomNode).join(" ");

  if (["p", "li", "div", "section", "article", "h1", "h2", "h3", "h4"].includes(tagName)) {
    return `${children}. `;
  }

  return children;
}

function normalizeReference(value: string) {
  return value.replace(/[→➜]/g, "").trim();
}

function normalizeCodeForSpeech(value: string) {
  return value
    .replace(/--/g, " double tiret ")
    .replace(/\//g, " slash ")
    .replace(/\./g, " point ")
    .replace(/_/g, " underscore ")
    .replace(/-/g, " tiret ")
    .trim();
}

function normalizeSpeechText(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, ", ")
    .replace(/[→➜]/g, " vers ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([,.;:!?])(?=\S)/g, "$1 ")
    .replace(/\s+/g, " ")
    .replace(/\.{2,}/g, ".")
    .trim();
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ");
}
