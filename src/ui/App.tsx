import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  buildCategoryPath,
  buildSheetPath,
  getCategoryBySlug,
  getCategoryForSheet,
  getCategorySheets,
  sheets,
  type AppPath,
  type CategoryName,
} from "../data/catalog";
import { CategoryPage } from "./components/CategoryPage";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import { RouteLink } from "./components/RouteLink";

// Lazy-loaded: SheetView pulls in the SVG map, node panel, and audio player,
// which only matter once a sheet is actually open. Keeping it out of the
// initial bundle means the home/category pages don't pay for it upfront.
const SheetView = lazy(() => import("./SheetView").then((m) => ({ default: m.SheetView })));

type Route =
  | { name: "home" }
  | { name: "category"; category: CategoryName; query: string }
  | {
      name: "sheet";
      category: CategoryName;
      sheetId: string;
      nodeId: string | null;
      tab: string | null;
    }
  | { name: "not-found"; reason: string };

const appBase = import.meta.env.BASE_URL;

export function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute());

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const activeSheet = useMemo(
    () => (route.name === "sheet" ? sheets.find((sheet) => sheet.id === route.sheetId) : undefined),
    [route],
  );

  const resolvePath = (to: AppPath) => `${appBase === "/" ? "" : appBase.slice(0, -1)}${to}`;

  const navigate = (to: AppPath, options: { replace?: boolean } = {}) => {
    const resolved = resolvePath(to);
    if (resolved === `${window.location.pathname}${window.location.search}`) return;
    if (options.replace) {
      window.history.replaceState(null, "", resolved);
    } else {
      window.history.pushState(null, "", resolved);
    }
    setRoute(parseRoute());
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (route.name !== "sheet" || !activeSheet) return;
    const realCategory = getCategoryForSheet(activeSheet);
    if (route.category !== realCategory) {
      navigate(buildSheetPath(activeSheet, null, route.nodeId), { replace: true });
    }
    // `navigate` is intentionally omitted: it's a plain function recreated on
    // every render (not memoized), so including it would re-run this effect
    // on every render instead of only when the route/sheet actually change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSheet, route]);

  if (route.name === "sheet") {
    if (!activeSheet) {
      return (
        <NotFound
          reason="Cette fiche n'existe pas ou a changé d'adresse."
          onHome={() => navigate("/")}
        />
      );
    }

    const realCategory = getCategoryForSheet(activeSheet);
    if (route.category !== realCategory) {
      return null;
    }

    return (
      <main>
        <div className="sheet-nav">
          <RouteLink
            className="back-link"
            href={buildCategoryPath(realCategory)}
            onNavigate={navigate}
          >
            <ArrowLeft size={16} />
            {realCategory}
          </RouteLink>
        </div>
        <Suspense fallback={<div className="sheet-loading">Chargement…</div>}>
          <SheetView
            sheet={activeSheet}
            nodeId={route.nodeId}
            tabId={route.tab}
            currentSearch={window.location.search}
            onNavigate={(next) => navigate(next)}
            onReplace={(next) => navigate(next, { replace: true })}
          />
        </Suspense>
      </main>
    );
  }

  if (route.name === "category") {
    return (
      <CategoryPage
        category={route.category}
        query={route.query}
        sheets={getCategorySheets(route.category)}
        onBack={() => navigate("/")}
        onQueryChange={(query) => {
          const path = buildCategoryPath(route.category, query);
          navigate(path, { replace: true });
        }}
        onOpenSheet={(sheet) => navigate(buildSheetPath(sheet))}
      />
    );
  }

  if (route.name === "not-found") {
    return <NotFound reason={route.reason} onHome={() => navigate("/")} />;
  }

  return <Home onNavigate={navigate} />;
}

function parseRoute(): Route {
  // Handle GitHub Pages 404 redirect: ?redirect=/path
  const searchParams = new URLSearchParams(window.location.search);
  const redirected = searchParams.get("redirect");
  if (redirected) {
    const base = import.meta.env.BASE_URL;
    const restored = base.slice(0, -1) + redirected;
    window.history.replaceState(null, "", restored);
  }

  const base = import.meta.env.BASE_URL; // "/" locally, "/alkhawarizmi/" on GitHub Pages
  const raw = window.location.pathname;
  const localPath =
    base.length > 1 && raw.startsWith(base.slice(0, -1)) ? raw.slice(base.length - 1) : raw;
  const parts = localPath.split("/").filter(Boolean);
  const params = new URLSearchParams(window.location.search);

  const [firstSegment] = parts;
  if (!firstSegment) return { name: "home" };

  const category = getCategoryBySlug(firstSegment);
  if (!category) {
    // Use category.slug instead of raw input to avoid XSS reflection
    return { name: "not-found", reason: "Cette catégorie n'existe pas." };
  }

  if (parts.length === 1) {
    return { name: "category", category: category.name, query: params.get("q") ?? "" };
  }

  const sheetId = parts[1];
  if (parts.length <= 3 && sheetId) {
    return {
      name: "sheet",
      category: category.name,
      sheetId,
      nodeId: parts[2] ?? null,
      tab: params.get("tab"),
    };
  }

  return { name: "not-found", reason: "Cette adresse contient trop de segments." };
}
