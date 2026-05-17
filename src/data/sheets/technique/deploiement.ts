import type { DevSheet } from "../../schema";
import { dualLanguageMaps } from "../common";

const deploymentMap = {
  viewBox: "0 0 940 300",
  nodes: [
    { id: "build", x: 20, y: 115, w: 110, h: 65 },
    { id: "prod-env", x: 180, y: 55, w: 120, h: 65 },
    { id: "hosting", x: 180, y: 175, w: 110, h: 65 },
    { id: "release-pipeline", x: 360, y: 115, w: 120, h: 65 },
    { id: "prod-logs", x: 540, y: 55, w: 110, h: 65 },
    { id: "monitoring", x: 540, y: 175, w: 120, h: 65 },
    { id: "rollback", x: 730, y: 115, w: 110, h: 65 }
  ],
  edges: [
    { x1: 130, y1: 135, x2: 178, y2: 88 },
    { x1: 130, y1: 160, x2: 178, y2: 207 },
    { x1: 300, y1: 88, x2: 358, y2: 135 },
    { x1: 290, y1: 207, x2: 358, y2: 160 },
    { x1: 480, y1: 135, x2: 538, y2: 88 },
    { x1: 480, y1: 160, x2: 538, y2: 207 },
    { x1: 660, y1: 207, x2: 728, y2: 160 },
    { x1: 650, y1: 88, x2: 728, y2: 135 }
  ]
};

export const deploiement: DevSheet = {
  id: "deploiement",
  part: "T",
  number: 10,
  title: "Déploiement",
  subtitle: "Passer d'un projet qui marche localement à un système qui tourne pour de vrais utilisateurs",
  badge: "Fiche T10 — Vision Systémique",
  status: "Modèle stabilisé",
  meta: ["7 nœuds · 2 types", "7 sections / nœud"],
  category: "Technique",
  level: "Junior",
  readingTime: "35 min",
  description:
    "Une carte pour comprendre build, variables de production, hosting, logs prod, monitoring, rollback et pipeline de déploiement.",
  accent: "infra",
  tabs: [
    { id: "js", label: "JS JavaScript" },
    { id: "python", label: "Python" }
  ],
  nodes: {
    build: {
      id: "build",
      label: "Build",
      icon: "⚙",
      kind: "tool",
      osLabel: "JavaScript / Python",
      sections: {
        why: `<p>Le code de développement n'est pas toujours le code qu'on exécute en production. Frontend bundlé, TypeScript compilé, assets optimisés, dépendances installées proprement, migrations prêtes : le build transforme un projet de travail en artefact exécutable. Sans étape de build maîtrisée, on déploie un état implicite de machine locale.</p>`,
        system: `<p>Le build se situe entre le code source et le hosting. Il est lancé en CI ou par la plateforme d'hébergement. Il consomme les dépendances, vérifie parfois les types, exécute lint/tests, puis produit un dossier ou une image déployable : <code>dist/</code>, bundle frontend, image Docker, wheel Python, ou serveur prêt à démarrer.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript frontend : Vite/Next génèrent un bundle optimisé. JavaScript backend : parfois pas de compilation, sauf TypeScript. Python : souvent pas de build applicatif lourd, mais installation des dépendances et image Docker. La vraie décision : déployer le source directement ou un artefact immuable.</p>`,
          alternatives: [
            { name: "Build frontend", description: "Bundle statique optimisé : dist/, .next/, assets hashés." },
            { name: "Build backend", description: "TypeScript compilé, dépendances prod, image Docker." },
            { name: "Artefact immuable", description: "Ce qui est testé est exactement ce qui est déployé." }
          ]
        },
        senior: `<p>Il veut un build reproductible : lock file commité, commande unique, environnement propre. Il ne build pas à la main sur sa machine pour ensuite envoyer des fichiers. Il sait que <code>npm run build</code> ou l'installation Python doit échouer tôt si une variable ou dépendance manque.</p>`,
        errors: `<p><strong>Pattern 1 — Build local manuel :</strong> impossible de savoir ce qui a vraiment été déployé.</p><p><strong>Pattern 2 — Lock file absent :</strong> build différent selon la date.</p><p><strong>Pattern 3 — Build sans tests :</strong> artefact produit même si le projet est cassé.</p>`,
        invariants: `<p>Un déploiement fiable commence par un artefact reproductible. Ce qui change : dist, Docker, wheel, serverless bundle. Ce qui ne change pas : la production ne doit pas dépendre de l'état implicite d'une machine de développeur.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript" },
            { type: "cmd", value: "npm ci" },
            { type: "cmd", value: "npm run lint" },
            { type: "cmd", value: "npm test" },
            { type: "cmd", value: "npm run build" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pip install -r requirements.txt" },
            { type: "cmd", value: "pytest" },
            { type: "cmd", value: "python -m compileall src" }
          ],
          debt: "Build non reproductible → déploiements impossibles à diagnostiquer. Faire construire par CI ou plateforme, jamais à la main."
        }
      }
    },
    "prod-env": {
      id: "prod-env",
      label: "Variables prod",
      icon: "🔐",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>La production n'a pas les mêmes valeurs que le local : vraie base de données, vrais secrets, URLs publiques, mode debug désactivé, niveau de logs différent. Les variables de production existent pour configurer le même code dans un environnement réel sans modifier le code source.</p>`,
        system: `<p>Les variables prod sont injectées par la plateforme de déploiement : GitHub Actions secrets, Vercel, Render, Railway, Fly.io, Docker, Kubernetes. Le code les lit via le module de configuration validé. Elles alimentent DB, auth, services externes, CORS, logs et monitoring.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Pour un petit projet : variables dans le dashboard de la plateforme. Pour une équipe : secrets dans GitHub/plateforme + documentation dans <code>.env.example</code>. Pour systèmes plus critiques : secret manager dédié. Jamais de <code>.env</code> prod commité.</p>`,
          alternatives: [
            { name: "Dashboard hosting", description: "Simple pour Vercel, Render, Railway." },
            { name: "GitHub Secrets", description: "Pour CI/CD et déploiements automatisés." },
            { name: "Secrets manager", description: "Doppler, Vault, AWS SSM pour environnements multiples." }
          ]
        },
        senior: `<p>Il vérifie que <code>NODE_ENV=production</code> ou équivalent est bien positionné. Il désactive debug et stack traces publiques. Il sépare secrets, variables publiques frontend, et configuration interne backend. Il sait que les variables frontend sont souvent injectées dans le bundle et donc visibles.</p>`,
        errors: `<p><strong>Pattern 1 — Secret dans le repo :</strong> irréversible sans rotation.</p><p><strong>Pattern 2 — Variable frontend secrète :</strong> tout ce qui est dans un bundle navigateur est public.</p><p><strong>Pattern 3 — Prod non validée :</strong> l'app démarre avec une variable manquante et casse au premier vrai utilisateur.</p>`,
        invariants: `<p>La production doit être configurée par l'environnement, pas par le code. Les secrets doivent être stockés hors Git, injectés au runtime, validés au démarrage, et rotables.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "NODE_ENV=production" },
            { type: "cmd", value: "DATABASE_URL=postgresql://..." },
            { type: "cmd", value: "JWT_SECRET=..." },
            { type: "cmd", value: "CORS_ORIGIN=https://app.example.com" },
            { type: "cmd", value: "LOG_LEVEL=info" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "node -e \"if (!process.env.DATABASE_URL) process.exit(1)\"" }
          ],
          debt: "Variables prod non documentées → déploiement tribal. Maintenir .env.example et validation stricte."
        }
      }
    },
    hosting: {
      id: "hosting",
      label: "Hosting",
      icon: "☁",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Un projet local ne sert qu'à son développeur. Le hosting donne une adresse, des ressources, un runtime, un réseau, des certificats HTTPS, et un cycle de démarrage. Déployer, c'est confier l'exécution à une plateforme qui doit garder l'application disponible.</p>`,
        system: `<p>Le hosting reçoit un build ou le code source, installe les dépendances, injecte les variables, démarre le processus, expose un domaine, et collecte les logs. Il devient la couche opérationnelle entre l'application et les utilisateurs.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Frontend statique : GitHub Pages, Netlify, Vercel. Fullstack/Node/Python : Render, Railway, Fly.io, Heroku-like, VPS, Docker. Le bon choix dépend du type d'app, de la base de données, du besoin de jobs, du budget et du niveau d'opérations accepté.</p>`,
          alternatives: [
            { name: "Vercel / Netlify", description: "Excellent pour frontend et apps JS orientées edge/serverless." },
            { name: "Render / Railway / Fly.io", description: "Bon défaut pour backend Node/Python avec services managés." },
            { name: "VPS / Docker", description: "Plus de contrôle, plus de responsabilité." }
          ]
        },
        senior: `<p>Il vérifie le modèle d'exécution : processus long-running, serverless, static, worker. Il sait qu'une app serverless ne gère pas les connexions DB comme un serveur permanent. Il configure health checks, région, domaine, HTTPS et redémarrage automatique.</p>`,
        errors: `<p><strong>Pattern 1 — Mauvais modèle de hosting :</strong> backend long-running sur plateforme statique.</p><p><strong>Pattern 2 — Dépendre du filesystem local :</strong> fichiers écrits localement perdus au redémarrage.</p><p><strong>Pattern 3 — Pas de health check :</strong> plateforme pense que l'app tourne alors qu'elle ne répond pas correctement.</p>`,
        invariants: `<p>La production est un environnement avec contraintes. Ce qui marche localement peut échouer si le modèle d'exécution change. Ce qui ne change pas : une app déployée doit pouvoir démarrer seule, être joignable, loguer, et redémarrer.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Frontend statique" },
            { type: "cmd", value: "npm run build" },
            { type: "cmd", value: "ls dist" },
            { type: "comment", value: "Backend Node" },
            { type: "cmd", value: "npm start" },
            { type: "comment", value: "Python ASGI" },
            { type: "cmd", value: "uvicorn src.main:app --host 0.0.0.0 --port $PORT" },
            { type: "comment", value: "Health check" },
            { type: "cmd", value: "curl -i http://localhost:$PORT/health" }
          ],
          debt: "Hosting choisi sans comprendre le runtime → bugs de prod subtils. Documenter commande de démarrage et modèle d'exécution."
        }
      }
    },
    "release-pipeline": {
      id: "release-pipeline",
      label: "Pipeline",
      icon: "→",
      kind: "vcs",
      osLabel: "Universel",
      sections: {
        why: `<p>Déployer à la main fonctionne une fois, puis devient une source d'erreurs : oublier une commande, pousser la mauvaise branche, sauter les tests, déployer depuis une machine sale. Un pipeline formalise l'ordre : installer, vérifier, build, migrer, déployer, vérifier.</p>`,
        system: `<p>Le pipeline relie Git, CI, build, variables, hosting et monitoring. Un push ou merge déclenche un workflow. Le workflow produit un artefact et demande à la plateforme de le publier. Il crée une trace : qui a déployé quoi, quand, depuis quel commit.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Déploiement automatique sur main pour petits projets. Déploiement sur tag/release pour projets plus contrôlés. Environnements preview pour PRs quand l'interface doit être testée visuellement avant merge.</p>`,
          alternatives: [
            { name: "Auto deploy main", description: "Simple, rapide, bon pour petites équipes." },
            { name: "Release tags", description: "Plus contrôlé, utile quand chaque version compte." },
            { name: "Preview environments", description: "Tester une PR sur une URL isolée." }
          ]
        },
        senior: `<p>Il protège main : pas de merge sans CI verte. Il garde les étapes idempotentes. Il sait que les migrations doivent être compatibles avec le code en cours de déploiement. Il conserve le SHA du commit déployé pour rollback et diagnostic.</p>`,
        errors: `<p><strong>Pattern 1 — Déploiement manuel :</strong> aucune traçabilité, erreurs humaines répétées.</p><p><strong>Pattern 2 — CI verte mais build prod cassé :</strong> la commande build n'est pas testée avant déploiement.</p><p><strong>Pattern 3 — Migration dangereuse dans pipeline :</strong> changement destructif sans plan de rollback.</p>`,
        invariants: `<p>Un déploiement est une procédure reproductible. Ce qui change : GitHub Actions, GitLab CI, dashboard hosting. Ce qui ne change pas : chaque release doit être traçable à un commit et validée par des checks automatisés.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "GitHub Actions" },
            { type: "cmd", value: "npm ci" },
            { type: "cmd", value: "npm run lint && npm test && npm run build" },
            { type: "cmd", value: "pip install -r requirements.txt && pytest" },
            { type: "comment", value: "Release" },
            { type: "cmd", value: "git tag v1.0.0 && git push origin v1.0.0" },
            { type: "comment", value: "Trace" },
            { type: "cmd", value: "DEPLOYED_SHA=$(git rev-parse HEAD)" }
          ],
          debt: "Pipeline absent → déploiement artisanal. Pipeline non traçable → impossible de savoir quelle version tourne."
        }
      }
    },
    "prod-logs": {
      id: "prod-logs",
      label: "Logs prod",
      icon: "📋",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>En production, on ne peut pas ouvrir le debugger ni regarder directement dans le processus. Les logs sont la mémoire observable de ce qui s'est passé : requêtes, erreurs, latence, décisions importantes. Sans logs de production, chaque incident devient une enquête sans témoins.</p>`,
        system: `<p>Les logs prod sont produits par l'application et collectés par la plateforme : stdout/stderr, dashboard hosting, Datadog, Logtail, Grafana Loki, CloudWatch. Ils doivent inclure contexte, niveau, timestamp, requestId, mais jamais de secrets.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Logs texte simples suffisent au début. Logs JSON structurés deviennent nécessaires dès qu'on veut filtrer par userId, requestId, status, route. Le choix dépend surtout de la capacité à rechercher et corréler.</p>`,
          alternatives: [
            { name: "stdout plateforme", description: "Défaut simple, souvent suffisant au début." },
            { name: "Logs structurés JSON", description: "Filtrables, corrélables, adaptés production." },
            { name: "Agrégateur dédié", description: "Datadog, Loki, Logtail, CloudWatch." }
          ]
        },
        senior: `<p>Il logue les erreurs avec stack trace, route, requestId et contexte utile. Il ne logue jamais tokens, mots de passe, payloads sensibles ou données personnelles inutiles. Il configure le niveau : debug en dev, info/warn/error en prod.</p>`,
        errors: `<p><strong>Pattern 1 — Logs sans contexte :</strong> "error happened" ne permet aucune enquête.</p><p><strong>Pattern 2 — Secrets dans les logs :</strong> fuite souvent plus grave qu'une erreur en base.</p><p><strong>Pattern 3 — Debug trop verbeux en prod :</strong> bruit, coûts, données exposées.</p>`,
        invariants: `<p>Ce qui n'est pas observé ne peut pas être diagnostiqué. Les logs doivent être utiles, contextualisés, et sûrs. Ce qui change : outil de collecte. Ce qui ne change pas : pas de production sérieuse sans traces.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "LOG_LEVEL=info" },
            { type: "cmd", value: "logger.info({ requestId, method, path, status, duration }, 'request completed')" },
            { type: "cmd", value: "logger.error({ err, requestId }, 'unhandled error')" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "Une erreur volontaire apparaît dans les logs avec stack trace et requestId" }
          ],
          debt: "Logs non structurés ou absents → incidents longs à diagnostiquer. Ajouter requestId et niveaux de logs tôt."
        }
      }
    },
    monitoring: {
      id: "monitoring",
      label: "Monitoring",
      icon: "◉",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Les logs disent ce qui s'est passé quand on cherche. Le monitoring alerte quand quelque chose va mal avant qu'un utilisateur ne le signale : app down, taux d'erreur élevé, latence anormale, CPU/mémoire saturés, jobs bloqués. Sans monitoring, la production peut être cassée pendant des heures dans le silence.</p>`,
        system: `<p>Le monitoring se branche sur l'application et la plateforme. Il collecte métriques, erreurs, traces, uptime checks. Il transforme des signaux techniques en alertes actionnables. Il complète les logs : métriques pour détecter, logs pour comprendre, traces pour suivre un parcours.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Au minimum : uptime check + alertes erreurs. Ensuite : Sentry pour exceptions, métriques plateforme, APM si latence complexe. Pas besoin de tout instrumenter au début, mais il faut savoir si l'application est down et si les erreurs montent.</p>`,
          alternatives: [
            { name: "Uptime monitoring", description: "Vérifie que /health répond régulièrement." },
            { name: "Sentry", description: "Capture exceptions frontend/backend avec contexte." },
            { name: "APM", description: "Datadog/New Relic/OpenTelemetry pour traces et performance." }
          ]
        },
        senior: `<p>Il définit des alertes utiles, pas bruyantes. Une alerte doit appeler une action. Il surveille golden signals : latence, trafic, erreurs, saturation. Il ajoute un endpoint <code>/health</code> qui vérifie les dépendances critiques selon le besoin.</p>`,
        errors: `<p><strong>Pattern 1 — Pas d'alerte :</strong> les utilisateurs deviennent le système de monitoring.</p><p><strong>Pattern 2 — Trop d'alertes :</strong> fatigue, alertes ignorées.</p><p><strong>Pattern 3 — Health check superficiel :</strong> répond 200 alors que la base est inaccessible.</p>`,
        invariants: `<p>Un système en production doit être observable et alerter sur ses défaillances. Ce qui change : outil et profondeur. Ce qui ne change pas : découvrir une panne par hasard est un échec opérationnel.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "curl -i https://app.example.com/health" },
            { type: "cmd", value: "SENTRY_DSN=..." },
            { type: "comment", value: "error_rate > 5% pendant 5 min → alerte" },
            { type: "comment", value: "p95 latency > 1s → investigation" },
            { type: "comment", value: "Golden signals : latency, traffic, errors, saturation" }
          ],
          debt: "Monitoring absent → pannes silencieuses. Alertes bruyantes → personne ne réagit."
        }
      }
    },
    rollback: {
      id: "rollback",
      label: "Rollback",
      icon: "↩",
      kind: "vcs",
      osLabel: "Universel",
      sections: {
        why: `<p>Tout déploiement peut casser : bug non détecté, migration problématique, variable manquante, dépendance externe différente. Le rollback existe pour réduire le temps pendant lequel les utilisateurs subissent l'incident. Il ne remplace pas les tests, il limite les dégâts quand les tests n'ont pas suffi.</p>`,
        system: `<p>Le rollback est lié au pipeline, au hosting, aux migrations et au monitoring. Le monitoring détecte, les logs expliquent, le rollback restaure une version précédente. La plateforme doit savoir quelle version était déployée avant, et l'application doit supporter le retour arrière.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Rollback applicatif simple : redéployer le commit précédent. Rollback plateforme : bouton ou release précédente. Rollback DB : plus difficile, surtout après migrations destructives. Le vrai choix est souvent d'éviter les migrations irréversibles avec des déploiements compatibles en plusieurs étapes.</p>`,
          alternatives: [
            { name: "Redéployer commit précédent", description: "Simple si artefacts et variables sont stables." },
            { name: "Rollback plateforme", description: "Vercel/Render/Fly peuvent garder des releases précédentes." },
            { name: "Forward fix", description: "Corriger en avançant quand rollback DB est risqué." }
          ]
        },
        senior: `<p>Il prépare le rollback avant de déployer. Il sait quelles migrations sont backward compatible. Il évite de supprimer une colonne utilisée par l'ancienne version dans le même déploiement. Il utilise feature flags pour désactiver une fonctionnalité sans redéployer quand c'est pertinent.</p>`,
        errors: `<p><strong>Pattern 1 — Pas de plan rollback :</strong> incident prod, improvisation sous stress.</p><p><strong>Pattern 2 — Migration destructive :</strong> impossible de revenir à l'ancienne version du code.</p><p><strong>Pattern 3 — Rollback non testé :</strong> procédure supposée mais jamais vérifiée.</p>`,
        invariants: `<p>Déployer implique savoir revenir à un état stable. Ce qui change : outil de hosting, stratégie release, type de base. Ce qui ne change pas : une release sans plan de retour augmente le risque opérationnel.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Git" },
            { type: "cmd", value: "git revert <bad_commit>" },
            { type: "cmd", value: "git push origin main" },
            { type: "comment", value: "Platform" },
            { type: "cmd", value: "Redéployer la release précédente depuis le dashboard" },
            { type: "comment", value: "Avant déploiement" },
            { type: "cmd", value: "Identifier commit actuel, migration incluse, procédure rollback" }
          ],
          debt: "Rollback impossible à cause de migrations destructives → downtime prolongé. Penser compatibilité arrière avant toute migration prod."
        }
      }
    }
  },
  maps: dualLanguageMaps(deploymentMap)
};
