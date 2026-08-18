import type { ReactNode } from "react";
import type { AppPath } from "../../data/catalog";
import { resolveAppHref } from "../routing";

export function RouteLink({
  href,
  className,
  children,
  onNavigate,
}: {
  href: AppPath;
  className: string;
  children: ReactNode;
  onNavigate: (path: AppPath) => void;
}) {
  return (
    <a
      className={className}
      href={resolveAppHref(href)}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
          return;
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
}
