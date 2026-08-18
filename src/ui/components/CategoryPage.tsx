import { ArrowLeft, Clock, Layers3, Search, Sparkles } from "lucide-react";
import {
  buildSheetPath,
  getVisibleNodeCount,
  getVisibleNodeIds,
  sheetCategories,
  type CategoryName,
} from "../../data/catalog";
import type { DevSheet } from "../../data/schema";
import { RouteLink } from "./RouteLink";

export function CategoryPage({
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
        .map((node) => node.label),
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
              Al-Khawarizmi
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
            <h2>
              {filteredSheets.length} fiche{filteredSheets.length > 1 ? "s" : ""}
            </h2>
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

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
