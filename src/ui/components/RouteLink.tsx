import type { ReactNode } from "react";
import type { AppPath } from "../../data/catalog";

const appBase = import.meta.env.BASE_URL;

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
  const resolvedHref = `${appBase === "/" ? "" : appBase.slice(0, -1)}${href}`;

  return (
    <a
      className={className}
      href={resolvedHref}
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
