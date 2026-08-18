import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RouteLink } from "./RouteLink";

describe("RouteLink", () => {
  it("renders a real href and delegates a normal click to client navigation", () => {
    const onNavigate = vi.fn();
    render(
      <RouteLink className="link" href="/technique" onNavigate={onNavigate}>
        Technique
      </RouteLink>,
    );

    const link = screen.getByRole("link", { name: "Technique" });
    expect(link).toHaveAttribute("href", "/technique");

    fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledWith("/technique");
  });

  it("does not hijack a modified click intended for a new tab", () => {
    const onNavigate = vi.fn();
    render(
      <RouteLink className="link" href="/technique" onNavigate={onNavigate}>
        Technique
      </RouteLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Technique" }), { ctrlKey: true });
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
