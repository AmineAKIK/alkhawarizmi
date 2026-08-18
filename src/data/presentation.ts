import type { NodeKind, NodeLevel, SheetPart } from "./schema";

export const nodeKindLabels: Record<NodeKind, string> = {
  tool: "Outil / Service",
  infra: "Infrastructure / Platform",
  runtime: "Runtime",
  vcs: "Contrôle de version",
  diagnostic: "Comprendre la réalité",
  decision: "Choisir et délimiter",
  validation: "Vérifier et valider",
  modele: "Cadre de pensée",
  fondement: "Fondement conceptuel",
  visuel: "Principe visuel",
  pattern: "Pattern d'interface",
  systeme: "Système et outil",
  observabilite: "Observabilité",
  securite: "Sécurité",
  performance: "Performance",
  processus: "Processus",
  humain: "Dynamique humaine",
  communication: "Communication",
  organisation: "Organisation",
};

export const nodeKindColors: Record<NodeKind, string> = {
  tool: "#6366f1",
  infra: "#f59e0b",
  runtime: "#3b82f6",
  vcs: "#10b981",
  diagnostic: "#f43f5e",
  decision: "#a855f7",
  validation: "#10b981",
  modele: "#3b82f6",
  fondement: "#f59e0b",
  visuel: "#8b5cf6",
  pattern: "#6366f1",
  systeme: "#3b82f6",
  observabilite: "#06b6d4",
  securite: "#f43f5e",
  performance: "#f59e0b",
  processus: "#10b981",
  humain: "#a855f7",
  communication: "#06b6d4",
  organisation: "#10b981",
};

export const nodeLevelColors: Record<NodeLevel, string> = {
  Fondation: "#10b981",
  Intermédiaire: "#f59e0b",
  Avancé: "#f43f5e",
};

export const positioningText =
  'Ces fiches sont des outils de navigation systémique — elles te donnent la carte, les modèles mentaux, et le raisonnement d\'un expert. Elles ne remplacent pas la pratique. Lis, comprends chaque nœud, réponds aux questions — puis va appliquer. La section "Vérifie ta compréhension" à la fin de chaque nœud est la partie la plus importante.';

export const section4Titles: Record<SheetPart, string> = {
  C: "Ce qu'un product manager expérimenté anticipe",
  D: "Ce qu'un designer expérimenté anticipe",
  T: "Ce qu'un senior anticipe",
  P: "Ce qu'un ingénieur de garde anticipe",
  Co: "Ce qu'un tech lead expérimenté anticipe",
  F: "Ce qu'un développeur expérimenté anticipe",
};

export const svgTextConfig = {
  charWidthPx: 6.7,
  widthDivisor: 7,
  lineHeightPx: 14,
} as const;
