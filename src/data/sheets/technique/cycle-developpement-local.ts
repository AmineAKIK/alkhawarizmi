import type { DevSheet } from "../../schema";
import { dualLanguageMaps } from "../common";

const localDevCycleMap = {
  viewBox: "0 0 960 280",
  nodes: [
    { id: "scripts", x: 20, y: 100, w: 110, h: 65 },
    { id: "dev-server", x: 180, y: 100, w: 120, h: 65 },
    { id: "logs", x: 350, y: 40, w: 100, h: 65 },
    { id: "erreurs", x: 350, y: 160, w: 100, h: 65 },
    { id: "debug", x: 500, y: 100, w: 110, h: 65 },
    { id: "lint-format", x: 660, y: 40, w: 120, h: 65 },
    { id: "tests", x: 660, y: 160, w: 110, h: 65 },
    { id: "commit-push", x: 830, y: 100, w: 110, h: 65 }
  ],
  edges: [
    { x1: 130, y1: 132, x2: 178, y2: 132 },
    { x1: 300, y1: 120, x2: 348, y2: 82 },
    { x1: 300, y1: 145, x2: 348, y2: 190 },
    { x1: 450, y1: 72, x2: 498, y2: 120 },
    { x1: 450, y1: 192, x2: 498, y2: 145 },
    { x1: 610, y1: 120, x2: 658, y2: 82 },
    { x1: 610, y1: 145, x2: 658, y2: 190 },
    { x1: 780, y1: 72, x2: 828, y2: 120 },
    { x1: 770, y1: 192, x2: 828, y2: 145 }
  ]
};

export const cycleDeveloppementLocal: DevSheet = {
  id: "cycle-developpement-local",
  part: "T",
  number: 4,
  title: "Cycle de Développement Local",
  subtitle: "Comprendre le flux quotidien d'une session de développement",
  badge: "Fiche T04",
  meta: ["8 nœuds"],
  category: "Technique",
  level: "Débutant → Junior",
  readingTime: "30 min",
  description:
    "Le flux quotidien du développeur : scripts, dev server, logs, erreurs, debug, lint, tests, commit et push.",
  accent: "tool",
  tabs: [
    { id: "js", label: "JS JavaScript" },
    { id: "python", label: "Python" }
  ],
  nodes: {
    scripts: {
      id: "scripts",
      label: "Scripts",
      icon: "▶",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Sans scripts standardisés, chaque développeur lance le projet à sa façon. L'un tape <code>node src/index.js</code>, l'autre <code>nodemon app.js</code>, le troisième a une commande custom qu'il a oubliée. À chaque onboarding, la question "comment je lance le projet ?" prend 20 minutes. Les scripts sont l'interface publique du projet — les commandes standardisées qui font abstraction de la complexité interne. Un projet bien configuré se lance toujours avec la même commande, peu importe qui s'en occupe.</p>`,
        system: `<p>Les scripts sont le point d'entrée de tout le cycle de développement. Ils déclenchent le dev server, les tests, le linter, le formatteur, le build. En JS ils vivent dans <code>package.json</code> sous la clé <code>scripts</code>. En Python ils sont définis dans un <code>Makefile</code> ou dans <code>pyproject.toml</code>. Ils s'intègrent aussi dans la CI/CD — les pipelines appellent les mêmes scripts que les développeurs utilisent localement. Un script local qui marche = un pipeline qui marche.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript : les scripts npm sont le standard. Alternatives — <code>Makefile</code>, <code>just</code>. Pour un projet JS standard : scripts npm suffisent. Python : pas de standard natif équivalent aux scripts npm. Options — <code>Makefile</code>, <code>invoke</code>, <code>taskfile</code>. Recommandation : Makefile pour la compatibilité universelle.</p>`,
          alternatives: [
            { name: "Scripts npm", description: "Standard JavaScript, simple et intégré à package.json." },
            { name: "Makefile", description: "Universel, langage-agnostique, robuste pour JS/Python." },
            { name: "just / taskfile / invoke", description: "Alternatives modernes selon l'écosystème." }
          ]
        },
        senior: `<p>Il définit les scripts standards dès le premier jour et les documente dans le README. Les noms sont conventionnels et prévisibles — <code>dev</code>, <code>start</code>, <code>test</code>, <code>lint</code>, <code>build</code>, <code>format</code>. Quelqu'un qui clone le projet pour la première fois doit pouvoir lancer <code>npm run dev</code> ou <code>make dev</code> sans lire la documentation interne. Il s'assure aussi que les scripts locaux et CI utilisent exactement les mêmes commandes.</p>`,
        errors: `<p><strong>Pattern 1 — Les scripts non documentés :</strong> des scripts existent dans package.json mais ne sont jamais mentionnés dans le README.</p><p><strong>Pattern 2 — Les scripts locaux-only :</strong> commandes avec chemins absolus, variables locales hardcodées, ou outils globaux non déclarés.</p><p><strong>Pattern 3 — Les scripts fourre-tout :</strong> un seul script <code>start</code> qui fait tout — lint, test, build, lancement — dans un ordre arbitraire.</p>`,
        invariants: `<p>L'interface d'un projet doit être standardisée et documentée. Peu importe le langage, peu importe l'outil — quelqu'un de nouveau doit pouvoir cloner et lancer en moins de 5 minutes avec des commandes prévisibles. Ce qui change : l'outil de scripting. Ce qui ne change pas : la nécessité d'une interface standardisée entre le développeur et le projet.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Scripts npm recommandés" },
            { type: "cmd", value: `"dev": "nodemon src/index.js"` },
            { type: "cmd", value: `"start": "node src/index.js"` },
            { type: "cmd", value: `"test": "jest"` },
            { type: "cmd", value: `"lint": "eslint src/"` },
            { type: "cmd", value: `"format": "prettier --write src/"` },
            { type: "comment", value: "Makefile Python recommandé" },
            { type: "cmd", value: "make dev" },
            { type: "cmd", value: "make test" },
            { type: "cmd", value: "make lint" },
            { type: "cmd", value: "make format" }
          ],
          debt: "Scripts qui divergent entre local et CI → bugs impossibles à reproduire. Toujours utiliser les mêmes scripts dans les deux contextes."
        },
        verification: [
          "Qu'est-ce qu'une interface standardisée d'un projet, et pourquoi est-elle aussi importante que le code source lui-même pour un travail en équipe ?",
          "Tu rejoins un projet Node.js. Le README dit 'lance le projet avec node src/app.js'. En examinant package.json tu vois : 'start': 'node src/index.js', 'dev': 'nodemon src/app.js --env-file .env.local'. La CI lance npm run start. Quels sont les 3 problèmes concrets causés par cette situation, et comment tu les corriges ?",
          "Pourquoi l'interface d'un projet (ses commandes de lancement, test, build) doit-elle être identique entre l'environnement local et la CI, quel que soit l'outil de scripting utilisé ?"
        ]
      }
    },
    "dev-server": {
      id: "dev-server",
      label: "Dev Server",
      icon: "⚡",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>Sans serveur de développement, le cycle de travail est : modifier le code → arrêter le processus → relancer → tester → recommencer. Sur un projet actif, c'est des dizaines de fois par heure. Le dev server élimine cette friction — il surveille les fichiers, détecte les modifications, et recharge automatiquement. Il réduit le cycle de feedback à quelques secondes.</p>`,
        system: `<p>Le dev server est le cœur du cycle local. Il maintient le processus en vie, alimente les logs en temps réel, et est le premier endroit où les erreurs apparaissent. En frontend, il inclut souvent le HMR. En backend, il redémarre le processus serveur à chaque modification.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript backend : <code>nodemon</code>, <code>tsx --watch</code>, ou <code>node --watch</code>. JavaScript frontend : <code>Vite</code>. Python : <code>uvicorn --reload</code>, <code>flask run --debug</code>, ou <code>python manage.py runserver</code>.</p>`,
          alternatives: [
            { name: "Vite", description: "Standard moderne frontend, HMR très rapide." },
            { name: "node --watch / nodemon", description: "Rechargement automatique backend Node." },
            { name: "uvicorn --reload / Flask debug", description: "Rechargement automatique Python selon le framework." }
          ]
        },
        senior: `<p>Il configure le dev server pour qu'il corresponde exactement à l'environnement de production — mêmes variables, même port si possible, même comportement des routes. Il configure aussi le proxy des requêtes API en développement pour éviter les problèmes CORS.</p>`,
        errors: `<p><strong>Pattern 1 — Le rechargement ignoré :</strong> modifier <code>.env</code>, package.json ou un fichier de config sans redémarrer manuellement.</p><p><strong>Pattern 2 — Le port en conflit :</strong> <code>Error: address already in use</code> → identifier le processus, ne pas changer de port au hasard.</p><p><strong>Pattern 3 — Le dev server en production :</strong> utiliser nodemon ou reload automatique en prod.</p>`,
        invariants: `<p>La vitesse du cycle feedback est un facteur de productivité fondamental. Plus le temps entre "j'écris du code" et "je vois l'effet" est court, plus le développement est rapide et moins les bugs s'accumulent.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript backend" },
            { type: "cmd", value: "npm install --save-dev nodemon" },
            { type: "comment", value: "JavaScript frontend" },
            { type: "cmd", value: "npm create vite@latest mon-projet" },
            { type: "cmd", value: "npm run dev" },
            { type: "comment", value: "Python FastAPI" },
            { type: "cmd", value: "pip install uvicorn[standard]" },
            { type: "cmd", value: "uvicorn src.main:app --reload --port 8000" },
            { type: "comment", value: "Python Flask" },
            { type: "cmd", value: "flask run --debug --port 5000" }
          ],
          debt: "Nodemon non configuré → surveille trop de fichiers, rechargements inutiles. Configurer watch et ignore explicitement."
        },
        verification: [
          "Quel impact a la durée du cycle entre une modification de code et l'observation de son effet sur la productivité et la qualité du développement ?",
          "Tu lances uvicorn src.main:app --reload --port 8000 et tu constates que le rechargement automatique ne se déclenche pas quand tu modifies src/models/user.py. En revanche, il se déclenche quand tu modifies main.py. Quelle configuration manque et comment tu la corriges ?",
          "Pourquoi un serveur de développement avec rechargement automatique ne doit jamais être utilisé en production, quelle que soit la plateforme de déploiement ?"
        ]
      }
    },
    logs: {
      id: "logs",
      label: "Logs",
      icon: "📋",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Le code s'exécute dans un environnement opaque — on ne peut pas voir ce qui se passe à l'intérieur d'un processus en cours d'exécution. Les logs sont la fenêtre sur ce qui se passe réellement : requêtes reçues, valeurs des variables, temps d'exécution, erreurs, comportements inattendus. Sans logs, déboguer revient à deviner.</p>`,
        system: `<p>Les logs sont produits par le dev server et lus dans le terminal. En développement, on les lit en direct. En production, ils sont collectés par la plateforme d'hébergement ou un système dédié. La discipline de logging en développement détermine la visibilité en production.</p>`,
        choice: {
          kind: "structured",
          main: `<p><code>console.log</code> et <code>print</code> pour déboguer ponctuellement — à retirer avant de commiter. Pour du logging structuré : <code>pino</code> ou <code>winston</code> en JS, <code>loguru</code> ou <code>logging</code> en Python.</p>`,
          alternatives: [
            { name: "console.log / print", description: "Ponctuel, temporaire, utile en dev." },
            { name: "pino / winston", description: "Logging structuré JavaScript." },
            { name: "loguru / logging", description: "Logging structuré Python." }
          ]
        },
        senior: `<p>Il distingue les niveaux : <code>debug</code>, <code>info</code>, <code>warn</code>, <code>error</code>. Il ne logue jamais de données sensibles : mots de passe, tokens, données personnelles.</p>`,
        errors: `<p><strong>Pattern 1 — Le console.log commité :</strong> logs polluants et données sensibles potentielles en production.</p><p><strong>Pattern 2 — Pas de logs du tout :</strong> débogage à l'aveugle au premier incident.</p><p><strong>Pattern 3 — Les logs trop verbeux :</strong> signal noyé dans le bruit.</p>`,
        invariants: `<p>Observer le comportement d'un système opaque nécessite des traces explicites. Ce qui change : l'outil, le format, la destination. Ce qui ne change pas : sans traces, pas de compréhension, pas de débogage possible.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "npm install pino pino-pretty" },
            { type: "cmd", value: "pip install loguru" },
            { type: "comment", value: "Niveaux à retenir" },
            { type: "cmd", value: "debug   → développement uniquement" },
            { type: "cmd", value: "info    → événements normaux" },
            { type: "cmd", value: "warn    → anomalies non bloquantes" },
            { type: "cmd", value: "error   → erreurs à investiguer" }
          ],
          debt: "console.log/print laissés en production → pollution des logs, données exposées. Configurer LOG_LEVEL selon l'environnement."
        },
        verification: [
          "Pourquoi un processus en cours d'exécution est-il opaque, et quel mécanisme permet d'observer ce qui se passe réellement à l'intérieur ?",
          "Tu travailles sur une API Express avec pino. En production tu vois que tous les logs apparaissent, y compris les messages debug qui contiennent des emails d'utilisateurs. La variable LOG_LEVEL n'est pas définie. Quelle valeur de LOG_LEVEL tu définis pour la production afin de n'afficher que les événements normaux et les erreurs, et comment tu t'assures que les console.log oubliés ne passent pas en production ?",
          "Pourquoi ne jamais logger de données sensibles comme les mots de passe ou les tokens est-il un invariant de sécurité qui s'applique quel que soit l'outil de logging ou la plateforme ?"
        ]
      }
    },
    erreurs: {
      id: "erreurs",
      label: "Erreurs",
      icon: "✗",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Les erreurs sont inévitables — la question n'est pas d'en avoir ou non, mais de savoir les lire et les gérer. Un développeur qui panique face à une stack trace n'a pas compris que les erreurs sont de l'information — elles disent exactement ce qui a échoué, où, et souvent pourquoi.</p>`,
        system: `<p>Les erreurs apparaissent dans les logs du dev server, dans la console du navigateur, ou dans le terminal. Elles ont deux natures : erreurs de développement et erreurs d'exécution. Les erreurs non gérées font planter le processus. Les erreurs gérées permettent une réponse gracieuse.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Les erreurs attendues se gèrent avec des structures explicites : return early, codes d'erreur, réponses HTTP appropriées. Les erreurs inattendues se catchent au niveau le plus haut avec un handler global qui log l'erreur et retourne une réponse générique.</p>`,
          alternatives: [
            { name: "Erreurs attendues", description: "Validation, 404, auth invalide, réponses explicites." },
            { name: "Erreurs inattendues", description: "Handler global, log complet, réponse générique." },
            { name: "Monitoring", description: "Sentry ou équivalent quand le projet part en production." }
          ]
        },
        senior: `<p>Il lit la stack trace de bas en haut jusqu'à trouver la première ligne qui pointe vers son propre code. Il ne cherche pas à faire disparaître l'erreur — il cherche à comprendre pourquoi elle se produit.</p>`,
        errors: `<p><strong>Pattern 1 — Le catch vide :</strong> <code>try { ... } catch (e) {}</code> avale l'erreur silencieusement.</p><p><strong>Pattern 2 — La gestion d'erreur en dernier :</strong> les erreurs non gérées rendent le projet instable.</p><p><strong>Pattern 3 — Googler l'erreur sans la lire :</strong> chercher avant d'identifier la ligne de son propre code.</p>`,
        invariants: `<p>Une erreur non gérée qui atteint l'utilisateur final est une erreur de conception, pas de malchance. Tout code qui peut échouer doit avoir une stratégie de gestion d'erreur explicite.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Lire une stack trace" },
            { type: "cmd", value: "1. Lire type d'erreur + message" },
            { type: "cmd", value: "2. Trouver la première ligne de son propre code" },
            { type: "cmd", value: "3. Aller à cette ligne dans l'éditeur" },
            { type: "cmd", value: "4. Comprendre pourquoi la valeur n'est pas celle attendue" }
          ],
          debt: "Pas de error handler global → une erreur non anticipée plante tout le processus en production."
        },
        verification: [
          "Quelle information contient une stack trace, et pourquoi représente-t-elle une aide au diagnostic plutôt qu'un obstacle ?",
          "Tu lances npm run dev et tu vois dans le terminal : TypeError: Cannot read properties of undefined (reading 'email') at UserService.createUser (/src/services/user.service.js:14:32) at async UserRouter.<anonymous> (/src/routes/users.js:8:18). Décris les 4 étapes exactes pour localiser et corriger ce bug, en précisant quelle ligne tu ouvres en premier.",
          "Pourquoi tout code susceptible d'échouer doit avoir une stratégie de gestion d'erreur explicite, quel que soit le langage ou le paradigme utilisé ?"
        ]
      }
    },
    debug: {
      id: "debug",
      label: "Debug",
      icon: "🔍",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p><code>console.log</code> partout est la stratégie de debug par défaut des débutants — et la moins efficace. Le debugger arrête l'exécution à un point précis, permet d'inspecter toutes les variables de la callstack, d'exécuter le code pas à pas, et de modifier les valeurs en direct.</p>`,
        system: `<p>Le debugger s'intègre à VS Code via <code>launch.json</code>. Il intercepte le processus Node.js ou Python en cours d'exécution. Les breakpoints sont posés directement dans l'éditeur. Quand l'exécution atteint le breakpoint, le processus se pause et l'état complet du programme est visible.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Debugger graphique pour comprendre un flux complexe et inspecter des structures imbriquées. Logs ciblés pour les bugs intermittents ou la production. Les deux se complètent : debugger pour le local, logs pour la production.</p>`,
          alternatives: [
            { name: "Debugger VS Code", description: "Pas à pas, breakpoints, callstack, variables." },
            { name: "Logs ciblés", description: "Utile en prod ou pour bugs intermittents." },
            { name: "Logpoints", description: "Logger sans modifier le code ni arrêter l'exécution." }
          ]
        },
        senior: `<p>Il configure <code>launch.json</code> une fois en début de projet. Il utilise les breakpoints conditionnels et les logpoints. Il commence par formuler une hypothèse précise : "je crois que la variable X vaut Y à ce point" — puis il vérifie.</p>`,
        errors: `<p><strong>Pattern 1 — Le console.log de masse :</strong> ajouter des logs partout en espérant tomber sur le problème.</p><p><strong>Pattern 2 — Modifier le code pour faire disparaître l'erreur :</strong> le bug n'est pas compris, il est caché.</p><p><strong>Pattern 3 — Ignorer la callstack :</strong> regarder uniquement la ligne du symptôme sans remonter à la cause.</p>`,
        invariants: `<p>Déboguer c'est formuler et tester des hypothèses sur le comportement d'un système. La méthode ne change pas : observer → hypothèse → vérification → conclusion.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Raccourcis VS Code" },
            { type: "cmd", value: "F5        → lancer / continuer" },
            { type: "cmd", value: "F9        → poser/retirer un breakpoint" },
            { type: "cmd", value: "F10       → step over" },
            { type: "cmd", value: "F11       → step into" },
            { type: "cmd", value: "Shift+F11 → step out" }
          ],
          debt: "launch.json non commité → chaque dev reconfigure son debugger. Commiter .vscode/launch.json dans le dépôt."
        },
        verification: [
          "Quelle différence fondamentale y a-t-il entre insérer des affichages pour tracer l'exécution et arrêter le programme à un point précis pour inspecter son état ?",
          "Tu dois déboguer une fonction calculateDiscount(user, cart) qui retourne 0 au lieu de 15 pour un utilisateur premium avec 3 articles à 50€. Tu poses un breakpoint VS Code sur la première ligne de la fonction avec F9, puis tu lances F5. Quels raccourcis tu utilises ensuite pour inspecter la valeur de user.tier et avancer ligne par ligne jusqu'à trouver la condition incorrecte ?",
          "Pourquoi la méthode 'observer → formuler une hypothèse → vérifier → conclure' s'applique-t-elle au débogage quel que soit le langage, l'outil ou le type de bug ?"
        ]
      }
    },
    "lint-format": {
      id: "lint-format",
      label: "Lint & Format",
      icon: "✨",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>Le lint et le format sont configurés en fiche #02 — ici on parle de les intégrer dans le cycle quotidien. La configuration seule ne sert à rien si elle n'est pas déclenchée automatiquement et systématiquement. Un linter qui tourne manuellement "quand on y pense" est un linter ignoré.</p>`,
        system: `<p>Lint et format s'intègrent à trois niveaux : en temps réel dans VS Code, avant chaque commit via git hooks, et en CI sur chaque PR. VS Code corrige pendant l'écriture, les hooks bloquent les erreurs oubliées, la CI empêche les merges non conformes.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JS : ESLint + Prettier avec extensions VS Code, husky + lint-staged, script npm <code>lint</code> en CI. Python : Ruff + Black avec extension Ruff, pre-commit framework, scripts en CI. Alternative JS : Biome.</p>`,
          alternatives: [
            { name: "VS Code", description: "Feedback immédiat et format on save." },
            { name: "Git hooks", description: "Filet de sécurité avant commit." },
            { name: "CI", description: "Blocage final avant merge." }
          ]
        },
        senior: `<p>Il configure lint-staged plutôt que de lancer le linter sur tout le projet à chaque commit. Il commit aussi <code>.vscode/settings.json</code> avec les settings essentiels : format on save, formatter par défaut, fix on save.</p>`,
        errors: `<p><strong>Pattern 1 — Le hook lent :</strong> linter tout le projet à chaque commit → hooks désactivés.</p><p><strong>Pattern 2 — La config VS Code non partagée :</strong> comportements différents selon la machine.</p><p><strong>Pattern 3 — Lint en CI uniquement :</strong> feedback trop tardif.</p>`,
        invariants: `<p>La qualité du code ne repose pas sur la discipline individuelle. Elle repose sur des outils automatisés qui rendent la bonne pratique le chemin de moindre résistance.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JS" },
            { type: "cmd", value: "npm install --save-dev lint-staged" },
            { type: "cmd", value: "echo 'npx lint-staged' > .husky/pre-commit" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pip install pre-commit" },
            { type: "cmd", value: "pre-commit install" },
            { type: "comment", value: ".vscode/settings.json" },
            { type: "cmd", value: `"editor.formatOnSave": true` }
          ],
          debt: ".vscode/settings.json non commité → configuration divergente. lint-staged non configuré → hooks trop lents."
        },
        verification: [
          "Pourquoi automatiser les vérifications de style de code à plusieurs niveaux du cycle (éditeur, commit, CI) est-il plus efficace que de compter sur la discipline individuelle ?",
          "Tu configures husky + lint-staged sur un projet JS de 400 fichiers. Ton collègue se plaint que le hook pre-commit prend 45 secondes à chaque commit. Tu regardes .husky/pre-commit et tu vois : npx eslint src/ && npx prettier --check src/. Quelle modification précise dans la configuration lint-staged résout le problème, et quelle commande tu lances pour l'installer ?",
          "Pourquoi les outils de qualité de code doivent-ils être configurés pour s'exécuter automatiquement plutôt que manuellement, quel que soit le langage ou le projet ?"
        ]
      }
    },
    tests: {
      id: "tests",
      label: "Tests",
      icon: "✓",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Sans tests, chaque modification du code est un pari. On espère ne pas avoir cassé quelque chose ailleurs — mais on ne sait pas. Les tests transforment cette peur en certitude : une suite de tests qui passe est la preuve que le comportement attendu est préservé.</p>`,
        system: `<p>Les tests sont écrits en parallèle du code, pas après. Ils s'exécutent via le script <code>test</code>, en mode watch pendant le développement, et en CI sur chaque PR. Ils se divisent en unitaires, intégration et E2E.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript : Jest, Vitest, Mocha + Chai. Pour un nouveau projet : Vitest si Vite est utilisé, Jest sinon. Python : pytest est le standard de facto ; unittest est inclus mais plus verbeux.</p>`,
          alternatives: [
            { name: "Vitest", description: "Rapide, moderne, idéal avec Vite." },
            { name: "Jest", description: "Standard historique JS, tout-en-un." },
            { name: "pytest", description: "Standard Python, fixtures puissantes." }
          ]
        },
        senior: `<p>Il commence par tester le comportement observable, pas l'implémentation interne. Il suit AAA : Arrange, Act, Assert. Les tests robustes vérifient ce que le code doit faire, pas comment il le fait.</p>`,
        errors: `<p><strong>Pattern 1 — Les tests après coup :</strong> ils s'adaptent au code existant au lieu de spécifier le comportement attendu.</p><p><strong>Pattern 2 — Tester l'implémentation :</strong> tests fragiles qui cassent à chaque refactoring.</p><p><strong>Pattern 3 — Pas de tests en mode watch :</strong> feedback trop lent.</p>`,
        invariants: `<p>Les tests sont une spécification exécutable du comportement attendu. Un test qui passe prouve un comportement, un test qui échoue détecte une régression.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript" },
            { type: "cmd", value: "npm test" },
            { type: "cmd", value: "npm run test:watch" },
            { type: "cmd", value: "npx vitest --coverage" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pytest tests/" },
            { type: "cmd", value: "pytest --watch" },
            { type: "cmd", value: "pytest --cov=src" }
          ],
          debt: "Tests non lancés en CI → régressions non détectées. Coverage non mesuré → zones non testées invisibles."
        },
        verification: [
          "En quoi les tests transforment-ils l'incertitude d'une modification de code en certitude mesurable ?",
          "Tu as une fonction getActiveUsers(users) testée avec Jest. Après un refactoring, tu lances npm test et tu vois : FAIL src/utils/users.test.js ✕ getActiveUsers should return only active users (2ms) Expected: [{id: 1, name: 'Alice', active: true}] Received: []. La fonction filter a été remplacée par un find. Décris la séquence AAA (Arrange, Act, Assert) telle qu'elle apparaît dans le test, et explique pourquoi ce test a détecté la régression.",
          "Pourquoi un test doit-il vérifier le comportement observable d'une unité de code plutôt que son implémentation interne, quel que soit le framework de test utilisé ?"
        ]
      }
    },
    "commit-push": {
      id: "commit-push",
      label: "Commit & Push",
      icon: "↑",
      kind: "vcs",
      osLabel: "Universel",
      sections: {
        why: `<p>Le commit est le geste fondamental du développement — il cristallise un état du code avec une intention documentée. Mais le commit seul ne suffit pas : le push envoie le travail vers le remote, le rendant accessible aux autres et sauvegardé hors de la machine locale.</p>`,
        system: `<p>Le commit-push est le dernier nœud du cycle. Il arrive après que le lint et les tests passent. Le hook pre-commit s'exécute automatiquement avant chaque commit. Le push déclenche la CI si elle est configurée.</p>`,
        choice: {
          kind: "structured",
          main: `<p>La vraie décision est sur la fréquence et la granularité. Recommandation pour débuter : commit souvent, avec des messages Conventional Commits. On peut toujours squash avant une PR si l'historique est trop granulaire.</p>`,
          alternatives: [
            { name: "Commit souvent", description: "Petits commits atomiques, faciles à relire et revert." },
            { name: "Commit par feature", description: "Moins bruité, mais risque de gros commits." },
            { name: "Squash PR", description: "Historique final propre après travail granulaire." }
          ]
        },
        senior: `<p>Il ne commit que ce qui est intentionnel. <code>git add -p</code> lui permet de sélectionner des hunks spécifiques. Il vérifie toujours <code>git diff --staged</code> avant de commiter. Il ne push jamais sur <code>main</code> directement.</p>`,
        errors: `<p><strong>Pattern 1 — Le commit de fin de journée :</strong> commit géant mélangeant des modifications sans relation.</p><p><strong>Pattern 2 — <code>git add .</code> systématique :</strong> console.log oubliés, fichiers temporaires, contenu non intentionnel.</p><p><strong>Pattern 3 — Push sans tests :</strong> CI cassée et travail des autres bloqué.</p>`,
        invariants: `<p>Un commit est une unité de travail atomique avec une intention documentée. Il doit pouvoir être lu, compris, et revert indépendamment des autres.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "git status" },
            { type: "cmd", value: "git diff" },
            { type: "cmd", value: "git add -p" },
            { type: "cmd", value: "git diff --staged" },
            { type: "cmd", value: "npm test" },
            { type: "cmd", value: "git commit -m \"feat(cart): add quantity validation\"" },
            { type: "cmd", value: "git push origin ma-branche" },
            { type: "comment", value: "Jamais git push origin main" }
          ],
          debt: "Commits géants = historique inutilisable. git add . sans vérification = contenu non intentionnel dans l'historique permanent."
        },
        verification: [
          "Quelle propriété doit avoir une unité de travail enregistrée dans l'historique d'un projet pour qu'elle reste compréhensible et réversible indépendamment des autres ?",
          "Tu fais git diff --staged avant de commiter et tu vois : 3 fichiers modifiés — une correction de bug dans cart.service.js, un refactoring non lié dans user.service.js, et 2 console.log oubliés dans orders.routes.js. Tu avais utilisé git add .. Décris exactement les commandes git que tu utilises pour ne commiter que la correction de bug, en excluant les deux autres modifications.",
          "Pourquoi un commit qui mélange plusieurs intentions distinctes est-il considéré comme une dette technique dans l'historique, quel que soit le système de versioning utilisé ?"
        ]
      }
    }
  },
  maps: dualLanguageMaps(localDevCycleMap)
};
