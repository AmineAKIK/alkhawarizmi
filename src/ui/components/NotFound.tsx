import { ArrowLeft, Sparkles } from "lucide-react";
import { RouteLink } from "./RouteLink";

export function NotFound({ reason, onHome }: { reason: string; onHome: () => void }) {
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
