import { Sparkles } from "lucide-react";
import { buildCategoryPath, sheetCategories, type AppPath } from "../../data/catalog";
import { RouteLink } from "./RouteLink";

export function Home({ onNavigate }: { onNavigate: (path: AppPath) => void }) {
  return (
    <main className="home-shell">
      <section className="home-hero">
        <div>
          <a
            className="eyebrow"
            href="https://www.akiksystems.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Sparkles size={14} />
            AkikSystems
          </a>
          <h1 className="home-title">Al-Khawarizmi</h1>
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
