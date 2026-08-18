import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NodePanel } from "./NodePanel";
import { sheets } from "../../data/catalog";

afterEach(() => cleanup());

function getFirstNode() {
  const sheet = sheets.find((s) => Object.keys(s.nodes).length > 0);
  if (!sheet) throw new Error("Expected at least one sheet with nodes.");
  const [nodeId] = Object.keys(sheet.nodes);
  if (!nodeId) throw new Error("Expected the sheet to have a node id.");
  const node = sheet.nodes[nodeId];
  if (!node) throw new Error("Expected the looked-up node id to resolve.");
  return { sheet, node };
}

describe("NodePanel", () => {
  it("renders the node's label and all its content sections", () => {
    const { sheet, node } = getFirstNode();
    render(<NodePanel node={node} part={sheet.part} onClose={vi.fn()} />);

    expect(screen.getByText(node.label)).toBeInTheDocument();
    expect(screen.getByText("Pourquoi ça existe")).toBeInTheDocument();
    expect(screen.getByText("Sa place dans le système")).toBeInTheDocument();
    expect(screen.getByText("Le choix conscient")).toBeInTheDocument();
    expect(screen.getByText("Les erreurs classiques")).toBeInTheDocument();
    expect(screen.getByText("Les invariants")).toBeInTheDocument();
  });

  it("calls onClose when the back button is clicked", () => {
    const { sheet, node } = getFirstNode();
    const onClose = vi.fn();
    render(<NodePanel node={node} part={sheet.part} onClose={onClose} />);

    fireEvent.click(screen.getByText("Retour"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows a verification section only when the node has verification questions", () => {
    const nodeWithVerification = sheets
      .flatMap((sheet) => Object.values(sheet.nodes).map((node) => ({ sheet, node })))
      .find(({ node }) => (node.sections.verification?.length ?? 0) > 0);

    if (!nodeWithVerification) return;
    const { sheet, node } = nodeWithVerification;
    render(<NodePanel node={node} part={sheet.part} onClose={vi.fn()} />);

    expect(screen.getByText("Vérifie ta compréhension")).toBeInTheDocument();
  });
});
