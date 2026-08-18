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

    const link = screen.getByRole("link", { name: "Technique" });
    // jsdom cannot perform cross-document navigation. Prevent the browser
    // default in the test harness while still exercising RouteLink's modified
    // click branch, which must not invoke SPA navigation.
    link.addEventListener("click", (event) => event.preventDefault());

    fireEvent.click(link, { ctrlKey: true });
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
