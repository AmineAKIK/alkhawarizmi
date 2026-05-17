import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock, Layers3, Search, Sparkles } from "lucide-react";
import {
  buildCategoryPath,
  buildSheetPath,
  getCategoryBySlug,
  getCategoryForSheet,
  getCategorySheets,
  getVisibleNodeCount,
  getVisibleNodeIds,
  sheetCategories,
  sheets,
  type AppPath,
  type CategoryName,
} from "../data/catalog";
import type { DevSheet } from "../data/schema";
import type { ReactNode } from "react";
import { SheetView } from "./SheetView";

type Route =
  | { name: "home" }
  | { name: "category"; category: CategoryName; query: string }
  | { name: "sheet"; category: CategoryName; sheetId: string; nodeId: string | null; tab: string | null }
  | { name: "not-found"; reason: string };

export function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute());

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const activeSheet = useMemo(
    () => (route.name === "sheet" ? sheets.find((sheet) => sheet.id === route.sheetId) : undefined),
    [route]
  );

  const navigate = (to: AppPath, options: { replace?: boolean } = {}) => {
    if (to === `${window.location.pathname}${window.location.search}`) return;
    if (options.replace) {
      window.history.replaceState(null, "", to);
    } else {
      window.history.pushState(null, "", to);
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
          <RouteLink className="back-link" href={buildCategoryPath(realCategory)} onNavigate={navigate}>
            <ArrowLeft size={16} />
            {realCategory}
          </RouteLink>
        </div>
        <SheetView
          sheet={activeSheet}
          nodeId={route.nodeId}
          tabId={route.tab}
          currentSearch={window.location.search}
          onNavigate={(next) => navigate(next)}
          onReplace={(next) => navigate(next, { replace: true })}
        />
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

function Home({ onNavigate }: { onNavigate: (path: AppPath) => void }) {
  return (
    <main className="home-shell">
      <section className="home-hero">
        <div>
          <a className="eyebrow" href="https://www.akiksystems.com" target="_blank" rel="noopener noreferrer">
            <Sparkles size={14} />
            AkikSystems
          </a>
          <h1 className="home-title">Al-Khwarizmi</h1>
          <p className="home-tagline">Fiches systémiques pour apprendre le développement</p>
          <p>
            Chaque fiche transforme un sujet technique en carte navigable : pourquoi l'outil existe,
            où il se place, quels choix faire, quelles erreurs éviter, et quoi pratiquer.
          </p>
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-grid">
          {sheetCategories.map((category) => (
            <RouteLink
              className="category-card"
              href={buildCategoryPath(category.name)}
              key={category.name}
              onNavigate={onNavigate}
            >
              <div className="section-heading">
                <div>
                  <h2>{category.name}</h2>
                </div>
                <span className="sheet-count">
                  {category.sheets.length} fiche{category.sheets.length > 1 ? "s" : ""}
                </span>
              </div>
              <p className="category-card-description">{category.description}</p>
            </RouteLink>
          ))}
        </div>
      </section>
    </main>
  );
}

function CategoryPage({
  category,
  sheets,
  query,
  onOpenSheet,
  onBack,
  onQueryChange,
}: {
  category: CategoryName;
  sheets: DevSheet[];
  query: string;
  onOpenSheet: (sheet: DevSheet) => void;
  onBack: () => void;
  onQueryChange: (query: string) => void;
}) {
  const normalizedQuery = normalizeText(query);
  const filteredSheets = sheets.filter((sheet) => {
    const visibleNodeIds = getVisibleNodeIds(sheet);
    const searchable = [
      sheet.title,
      sheet.subtitle,
      sheet.description,
      sheet.category,
      sheet.level,
      sheet.badge,
      ...Object.values(sheet.nodes)
        .filter((node) => visibleNodeIds.has(node.id))
        .map((node) => node.label)
    ].join(" ");

    return normalizeText(searchable).includes(normalizedQuery);
  });

  return (
    <main className="home-shell">
      <RouteLink className="back-link" href="/" onNavigate={onBack}>
        <ArrowLeft size={16} />
        Accueil
      </RouteLink>

      <section className="home-hero">
        <div className="home-hero-split">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} />
              Al-Khwarizmi
            </div>
            <h1>{category}</h1>
            <p>{sheetCategories.find((c) => c.name === category)?.description}</p>
          </div>

          <label className="home-search" aria-label="Rechercher une fiche">
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={`Rechercher dans ${category.toLowerCase()}…`}
            />
            {query && <kbd>{filteredSheets.length}</kbd>}
          </label>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <h2>{filteredSheets.length} fiche{filteredSheets.length > 1 ? "s" : ""}</h2>
          </div>
        </div>

        {filteredSheets.length > 0 ? (
          <div className="catalog-grid">
            {filteredSheets.map((sheet) => (
              <RouteLink
                className="sheet-card"
                href={buildSheetPath(sheet)}
                key={sheet.id}
                onNavigate={() => onOpenSheet(sheet)}
              >
                <div className="card-topline">
                  <span className={`kind-dot kind-${sheet.accent}`} />
                  <span>{sheet.displayNumber}</span>
                </div>
                <h3>{sheet.title}</h3>
                <p>{sheet.description}</p>
                <div className="card-meta">
                  <span>
                    <Layers3 size={14} />
                    {getVisibleNodeCount(sheet)} nœuds
                  </span>
                  <span>
                    <Clock size={14} />
                    {sheet.readingTime}
                  </span>
                </div>
                <div className="card-footer">
                  <span>{sheet.level}</span>
                </div>
              </RouteLink>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            Aucune fiche ne correspond à "{query}".{" "}
            <button className="empty-state-reset" onClick={() => onQueryChange("")}>
              Effacer la recherche
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function NotFound({ reason, onHome }: { reason: string; onHome: () => void }) {
  return (
    <main className="home-shell">
      <RouteLink className="back-link" href="/" onNavigate={onHome}>
        <ArrowLeft size={16} />
        Accueil
      </RouteLink>
      <section className="home-hero">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            Route introuvable
          </div>
          <h1>Cette page n'existe pas</h1>
          <p>{reason}</p>
        </div>
      </section>
    </main>
  );
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
  const localPath = base.length > 1 && raw.startsWith(base.slice(0, -1))
    ? raw.slice(base.length - 1)
    : raw;
  const parts = localPath.split("/").filter(Boolean);
  const params = new URLSearchParams(window.location.search);

  if (parts.length === 0) return { name: "home" };

  const category = getCategoryBySlug(parts[0]);
  if (!category) {
    // Use category.slug instead of raw input to avoid XSS reflection
    return { name: "not-found", reason: "Cette catégorie n'existe pas." };
  }

  if (parts.length === 1) {
    return { name: "category", category: category.name, query: params.get("q") ?? "" };
  }

  if (parts.length <= 3) {
    return {
      name: "sheet",
      category: category.name,
      sheetId: parts[1],
      nodeId: parts[2] ?? null,
      tab: params.get("tab"),
    };
  }

  return { name: "not-found", reason: "Cette adresse contient trop de segments." };
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function RouteLink({
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
      href={href}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
}
