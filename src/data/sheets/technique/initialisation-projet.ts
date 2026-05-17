import type { DevSheet } from "../../schema";

export const initialisationProjet: DevSheet = {
  id: "initialisation-projet",
  part: "T",
  number: 2,
  title: "Initialisation du Projet",
  subtitle: "Poser les fondations avant la première fonctionnalité",
  badge: "Fiche T02",
  meta: ["9 nœuds · 2 types"],
  category: "Technique",
  level: "Débutant → Junior",
  readingTime: "30 min",
  description:
    "Une carte interactive pour initialiser proprement un projet JavaScript ou Python : Git, structure, dépendances, environnement, qualité et commits.",
  accent: "vcs",
  tabs: [
    { id: "js", label: "JS JavaScript" },
    { id: "python", label: "Python" }
  ],
  nodes: {
    "git-init": {
      id: "git-init",
      label: "Git Init",
      icon: "⎇",
      kind: "vcs",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un projet sans contrôle de version, c'est du code sans filet. Chaque modification peut en détruire une autre sans possibilité de revenir en arrière. Git init crée le dépôt local — la première étape avant d'écrire une seule ligne de code. L'ordre est non-négociable : on initialise Git avant tout le reste, pas après.</p>`,
        system: `<p>Git init est le point de départ de la chaîne entière. Le .gitignore dépend de lui. Le README.md est le premier fichier commité. Les conventions de commit s'appliquent dès le premier commit. GitHub (remote) est connecté après l'init local. C'est la fondation structurelle sur laquelle tout le reste repose.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Deux cas d'usage : <code>init</code> (nouveau projet local) ou <code>clone</code> (projet existant sur GitHub). Si le projet existe déjà sur GitHub, toujours clone, jamais init + remote add — c'est une étape inutile. Alternatives au workflow mono-repo classique : monorepo (Turborepo, Nx) pour plusieurs projets liés, multi-repo pour des services indépendants. Pour débuter : un projet = un dépôt.</p>`,
          alternatives: [
            { name: "git init", description: "Nouveau projet local à créer depuis zéro." },
            { name: "git clone", description: "Projet existant sur GitHub. À privilégier dès qu'un remote existe déjà." },
            { name: "Monorepo", description: "Plusieurs projets liés dans un seul dépôt, utile quand l'écosystème grandit." }
          ]
        },
        senior: `<p>Il initialise Git avant d'écrire du code, pas après. Il crée immédiatement le .gitignore et le README.md avant le premier commit — pour ne jamais commiter des fichiers qui n'auraient pas dû l'être. Il configure la branche principale sur "main" dès le départ (<code>git init -b main</code>). Il fait un premier commit propre avec juste la structure de base, avant d'ajouter la moindre dépendance.</p>`,
        errors: `<p><strong>Pattern 1 — L'init tardif :</strong> commencer à coder, puis initialiser Git. Résultat : premier commit géant de 50 fichiers, historique illisible dès le départ, impossible à isoler les responsabilités.</p><p><strong>Pattern 2 — Le clone HTTPS :</strong> cloner en HTTPS au lieu de SSH quand GitHub est déjà configuré en SSH → saisir le mot de passe ou token à chaque push. Toujours SSH.</p><p><strong>Pattern 3 — Le git add . prématuré :</strong> faire <code>git add .</code> avant d'avoir créé le .gitignore → node_modules, .env, fichiers compilés dans l'historique pour toujours. Irréversible proprement.</p>`,
        invariants: `<p>Tout projet de code sérieux vit dans un dépôt versionné. Le moment de l'init n'est pas négociable : avant le premier fichier de code. <strong>Ce qui change : l'hébergeur, GitHub ou GitLab, et le workflow de branches. Ce qui ne change pas : l'init en premier, le .gitignore avant le premier add, et un historique lisible dès le départ.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "git init -b main                                    # nouveau projet, branche main" },
            { type: "cmd", value: "git clone git@github.com:user/repo.git              # projet existant (SSH)" },
            { type: "cmd", value: "git remote add origin git@github.com:user/repo.git  # lier un init local à GitHub" },
            { type: "cmd", value: "git remote -v                                       # vérifier la connexion remote" },
            { type: "comment", value: "Vérification : ls -la → doit voir un dossier .git/" }
          ],
          verification: "ls -la doit montrer un dossier .git/, et git remote -v doit afficher le remote dès qu'il est connecté.",
          debt: "Un dépôt sans remote = pas de backup. Connecter GitHub immédiatement après l'init."
        },
        verification: [
          "Pourquoi Git doit-il être initialisé avant le premier vrai fichier de code ?",
          "Tu fais git add . avant de créer .gitignore : quel type de fichiers peut entrer dans l'historique pour longtemps ?",
          "Ce qui change entre git init, git clone et un monorepo, et ce qui ne change pas dans le besoin de versionner ?"
        ]
      }
    },
    gitignore: {
      id: "gitignore",
      label: ".gitignore",
      icon: "🚫",
      kind: "infra",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Git traque tout par défaut. Mais un projet contient des fichiers qui ne doivent jamais être versionnés : les dépendances (node_modules — des centaines de MB), les secrets (.env avec API keys), les fichiers compilés (dist/, __pycache__), les configurations locales (.DS_Store, .idea/). Le .gitignore dit à Git quoi ignorer. Sans lui, le premier <code>git add .</code> est un désastre silencieux dont on hérite pour toute la vie du dépôt.</p>`,
        system: `<p>Le .gitignore doit être le deuxième fichier créé après git init, avant le premier commit. Il protège tout le reste du système : empêche que node_modules soit commité, que .env soit exposé, que les fichiers de build polluent l'historique. C'est un gardien passif mais critique — il ne fait rien d'actif, mais son absence crée des dégâts permanents.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Écrire son .gitignore manuellement ou partir d'un template (gitignore.io, ou sélection GitHub à la création du repo). Toujours partir d'un template adapté au stack et l'ajuster. La règle de décision : si un fichier peut être régénéré (node_modules depuis package.json, dist depuis le build, .venv depuis requirements.txt), il n'appartient pas au dépôt. Un .gitignore global personnel (<code>~/.gitignore_global</code>) pour les fichiers système qui ne concernent pas le projet (.DS_Store, .idea/).</p>`,
          alternatives: [
            { name: "Template stack", description: "Base sûre pour JavaScript, Python, IDE et OS courants." },
            { name: "Manuel", description: "Possible, mais plus risqué au début." },
            { name: "Global personnel", description: "Pour les fichiers de machine qui ne concernent pas le projet." }
          ]
        },
        senior: `<p>Il crée le .gitignore avant le premier <code>git add</code> — jamais après. Il sait que si un fichier est déjà commité, l'ajouter au .gitignore ne le supprime pas de l'historique (il faut <code>git rm --cached</code>). Il versionne toujours un <code>.env.example</code> avec des valeurs vides pour documenter les variables nécessaires, sans exposer de vraies valeurs.</p>`,
        errors: `<p><strong>Pattern 1 — Le .gitignore tardif :</strong> <code>git add .</code> avant le .gitignore → node_modules ou .env dans le dépôt. Récupérer nécessite <code>git rm -r --cached</code> + commit + réécriture de l'historique si des secrets sont en jeu.</p><p><strong>Pattern 2 — Le secret commité :</strong> pousser un .env avec de vraies API keys → invalider toutes les clés immédiatement. Elles sont exposées même en dépôt "privé" — les accès futurs, les forks, les collaborateurs voient l'historique.</p><p><strong>Pattern 3 — Le .gitignore trop permissif :</strong> ignorer des dossiers entiers par paresse → fichiers de configuration importants ignorés accidentellement, absents du dépôt.</p>`,
        invariants: `<p>Les fichiers régénérables ne se committent pas. Les secrets ne se committent jamais. <strong>Ce qui change : les patterns spécifiques au stack, Node, Python, IDE ou OS. Ce qui ne change pas : la séparation entre ce qui appartient au dépôt et ce qui n'y appartient pas.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript minimum" },
            { type: "snippet", value: "node_modules/" },
            { type: "snippet", value: "dist/" },
            { type: "snippet", value: ".env" },
            { type: "snippet", value: "coverage/" },
            { type: "comment", value: "Python minimum" },
            { type: "snippet", value: ".venv/" },
            { type: "snippet", value: "__pycache__/" },
            { type: "snippet", value: "*.pyc" },
            { type: "snippet", value: "*.egg-info/" },
            { type: "comment", value: "Commandes" },
            { type: "cmd", value: "touch .gitignore" },
            { type: "cmd", value: "git check-ignore -v nomfichier" },
            { type: "cmd", value: "git rm --cached nomfichier" }
          ],
          verification: "git status ne doit pas lister node_modules, .venv, .env ou des fichiers de build comme fichiers non suivis.",
          debt: "Fichiers sensibles déjà dans l'historique → BFG Repo Cleaner ou git filter-repo pour nettoyer."
        },
        verification: [
          "Pourquoi un .gitignore créé après le premier git add arrive-t-il trop tard ?",
          "Tu as déjà commité .env puis tu l'ajoutes au .gitignore : qu'est-ce que cela corrige, et qu'est-ce que cela ne corrige pas ?",
          "Ce qui change entre un .gitignore JavaScript et Python, et ce qui ne change pas dans la logique d'exclusion ?"
        ]
      }
    },
    structure: {
      id: "structure",
      label: "Structure",
      icon: "🗂",
      kind: "infra",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un projet sans structure explicite devient ingérable passé quelques fichiers. Quand tout est à la racine ou organisé arbitrairement, retrouver un fichier, comprendre où ajouter du code, onboarder un nouveau dev — tout devient coûteux. La structure de dossiers est une décision d'architecture, pas de rangement. Elle encode les intentions du projet.</p>`,
        system: `<p>La structure est le conteneur de tout le reste. Elle détermine où vivent le code source (src/), les tests (tests/), la configuration (à la racine ou config/), les assets (public/). Les outils cherchent leurs fichiers de config à des emplacements conventionnels — ESLint à la racine, pytest dans tests/, TypeScript dans tsconfig.json. Une structure qui respecte ces conventions évite la friction avec le tooling.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Deux philosophies : organisation par type de fichier (tous les composants ensemble, tous les services ensemble — simple, prévisible pour les petits projets) vs organisation par feature (tout ce qui concerne une feature ensemble — scalable, meilleur pour les grands projets). Pour débuter : par type. La structure doit aussi suivre les conventions du framework — React, Express, Django, FastAPI ont chacun leurs idiomes. Lutter contre ces conventions coûte cher.</p>`,
          alternatives: [
            { name: "Par type", description: "Simple et prévisible pour démarrer." },
            { name: "Par feature", description: "Plus scalable quand le produit grandit." },
            { name: "Convention framework", description: "À suivre par défaut pour éviter la friction." }
          ]
        },
        senior: `<p>Il ne sur-architecture pas dès le départ. Un projet de 3 fichiers n'a pas besoin de 8 dossiers. Il crée la structure minimale qui reflète l'intention, et laisse évoluer organiquement. Il documente les conventions dans le README (où va quoi, pourquoi). Il anticipe les exigences du framework plutôt que d'inventer une structure maison qui devra être refactorisée.</p>`,
        errors: `<p><strong>Pattern 1 — La sur-architecture prématurée :</strong> créer une structure de grande entreprise pour un projet solo → overhead cognitif, dossiers vides qui attendent du code qui ne viendra peut-être pas, paralysie.</p><p><strong>Pattern 2 — Tout à la racine :</strong> 50 fichiers à la racine → navigation impossible, pas de séparation des responsabilités, impossible de comprendre le projet d'un regard.</p><p><strong>Pattern 3 — Ignorer les conventions du framework :</strong> React attend src/components, Express attend routes/, Django impose son propre layout. Inventer une structure alternative crée une friction permanente avec les outils et la documentation.</p>`,
        invariants: `<p>La structure doit répondre à une question : "où dois-je chercher X ?" Si la réponse n'est pas évidente, la structure est insuffisante. <strong>Ce qui change : les dossiers spécifiques au langage, au framework et à la taille du projet. Ce qui ne change pas : l'exigence de lisibilité intentionnelle.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript/Node" },
            { type: "snippet", value: "project/src/index.js" },
            { type: "snippet", value: "project/tests/" },
            { type: "snippet", value: "project/public/" },
            { type: "snippet", value: "project/package.json" },
            { type: "comment", value: "Python" },
            { type: "snippet", value: "project/src/__init__.py" },
            { type: "snippet", value: "project/src/main.py" },
            { type: "snippet", value: "project/tests/" },
            { type: "snippet", value: "project/requirements.txt" },
            { type: "comment", value: "Commandes" },
            { type: "cmd", value: "mkdir -p src tests public" },
            { type: "cmd", value: "touch src/index.js README.md .gitignore .env.example" }
          ],
          verification: "La racine doit rester lisible, et un nouveau fichier doit avoir un emplacement évident sans demander au hasard.",
          debt: "Structure trop rigide trop tôt → refactoring coûteux. Documenter les conventions dans le README dès le départ."
        },
        verification: [
          "Pourquoi la structure d'un projet est-elle une décision d'architecture plutôt qu'un simple rangement ?",
          "Tu as 50 fichiers à la racine : quelles questions deviennent coûteuses pour un nouveau développeur ?",
          "Ce qui change entre une structure par type et par feature, et ce qui ne change pas dans le besoin de lisibilité ?"
        ]
      }
    },
    readme: {
      id: "readme",
      label: "README.md",
      icon: "📄",
      kind: "tool",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un projet sans README est un projet fermé. La première question de n'importe qui qui arrive sur le dépôt — y compris soi-même dans 3 mois — est : "qu'est-ce que c'est et comment ça marche ?". Le README est la porte d'entrée. Sans lui, le projet n'existe pas vraiment pour les autres. Il est affiché automatiquement sur GitHub, c'est la première chose que tout le monde voit.</p>`,
        system: `<p>Le README est le premier fichier commité avec le .gitignore. Il documente les prérequis (versions de Node ou Python requises — renvoi à la fiche #01), les commandes pour installer et lancer le projet, la structure du code, les conventions. Il est vivant : il évolue avec le projet et doit rester à jour. Un README obsolète est activement nuisible — plus trompeur qu'une absence.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Markdown est le standard incontesté sur GitHub. La vraie décision est sur la profondeur : minimaliste (juste assez pour lancer le projet) vs exhaustif (architecture, décisions techniques, API reference). Pour débuter : minimaliste mais complet — description, prérequis, installation, lancement, variables d'environnement. Pour une documentation plus poussée : un dossier docs/ avec MkDocs (Python) ou Docusaurus (JS).</p>`,
          alternatives: [
            { name: "Minimaliste complet", description: "Description, prérequis, installation, lancement, env vars." },
            { name: "docs/", description: "Documentation longue séparée du README." },
            { name: "Site docs", description: "MkDocs ou Docusaurus quand la doc devient un produit." }
          ]
        },
        senior: `<p>Il écrit le README avant d'écrire du code — pas après. Rédiger le README en premier force à clarifier les intentions du projet et les prérequis. Il inclut toujours une section "Prérequis" (versions exactes) et "Démarrage rapide" (commandes dans l'ordre exact, sans rien omettre). Il traite le README comme du code : une PR qui change le comportement du projet met à jour le README.</p>`,
        errors: `<p><strong>Pattern 1 — Le README fantôme :</strong> créer le fichier vide et ne jamais le remplir → GitHub affiche un fichier vide, le projet semble abandonné ou inachevé.</p><p><strong>Pattern 2 — Le README gelé :</strong> écrire un bon README au début puis ne jamais le mettre à jour → les instructions deviennent incorrectes, les développeurs suivent une documentation qui ne correspond plus à la réalité.</p><p><strong>Pattern 3 — Le README bavard sans structure :</strong> prose sans titres Markdown, pas de code blocks pour les commandes, pas de section claire → illisible, les infos importantes sont introuvables.</p>`,
        invariants: `<p>Tout projet partagé a besoin d'une porte d'entrée textuelle. <strong>Ce qui change : l'outil de documentation, Markdown, reStructuredText, Confluence ou un site docs. Ce qui ne change pas : le besoin de répondre à trois questions — qu'est-ce que c'est, comment ça marche, comment contribuer.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "touch README.md" },
            { type: "comment", value: "# Nom du Projet" },
            { type: "comment", value: "## Prérequis" },
            { type: "comment", value: "## Installation" },
            { type: "comment", value: "## Lancement" },
            { type: "comment", value: "## Variables d'environnement" },
            { type: "comment", value: "## Structure du projet" }
          ],
          verification: "La page GitHub du dépôt doit afficher un README utile avec prérequis, installation, lancement et variables d'environnement.",
          debt: `README non mis à jour = documentation mensongère. Ajouter "mise à jour du README si nécessaire" dans la checklist de PR.`
        },
        verification: [
          "Pourquoi écrire le README tôt force-t-il à clarifier le projet avant même de coder ?",
          "Tu reviens sur ton projet dans trois mois et le README est vide : quelles informations dois-tu reconstruire ?",
          "Ce qui change entre README, docs/ et site de documentation, et ce qui ne change pas dans leur rôle d'entrée ?"
        ]
      }
    },
    "env-vars": {
      id: "env-vars",
      label: ".env",
      icon: "🔐",
      kind: "infra",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une application a besoin de configuration qui varie selon l'environnement (dev, staging, prod) et qui est sensible (API keys, mots de passe, tokens). Hardcoder ces valeurs dans le code est une erreur critique : elles finissent dans Git, elles sont exposées, et elles ne peuvent pas varier selon l'environnement sans modifier le code. Le fichier .env centralise cette configuration hors du code.</p>`,
        system: `<p>Le .env est chargé au démarrage de l'application via une librairie (dotenv en JS, python-dotenv en Python). Il est dans .gitignore — il ne sera jamais commité. Son jumeau <code>.env.example</code> (commité, valeurs vides ou factices) documente quelles variables sont nécessaires. En production, les variables sont injectées via le système de déploiement (Vercel, Railway, Docker, GitHub Actions secrets) — le fichier .env n'existe pas en prod.</p>`,
        choice: {
          kind: "structured",
          main: `<p>dotenv (JS) ou python-dotenv (Python) pour charger le .env en développement. En production : variables d'environnement injectées par la plateforme de déploiement — jamais un fichier .env sur le serveur. Pour les projets avec beaucoup de secrets ou plusieurs environnements : Doppler, HashiCorp Vault, ou AWS Secrets Manager. Pour débuter : .env en dev, variables natives en prod.</p>`,
          alternatives: [
            { name: "dotenv", description: "Simple, local, parfait pour le développement." },
            { name: "Secrets plateforme", description: "Vercel, Railway, Docker, GitHub Actions en production." },
            { name: "Vault / Doppler", description: "Gestion avancée quand les environnements se multiplient." }
          ]
        },
        senior: `<p>Il crée .env.example avec toutes les variables et des valeurs factices dès le début du projet. Il documente chaque variable avec un commentaire inline (à quoi elle sert, où la trouver). Il valide les variables d'environnement au démarrage de l'application — une variable manquante doit faire planter l'app immédiatement avec un message clair, pas créer une erreur obscure 3 niveaux plus bas.</p>`,
        errors: `<p><strong>Pattern 1 — Le secret commité :</strong> pousser .env avec de vraies valeurs → invalider toutes les clés immédiatement. Même en repo privé, l'historique Git est permanent. Les bots qui scannent GitHub trouvent les clés en quelques minutes.</p><p><strong>Pattern 2 — Pas de .env.example :</strong> un nouveau dev clone le projet, rien ne fonctionne, il ne sait pas quelles variables configurer. Onboarding cassé.</p><p><strong>Pattern 3 — Variables hardcodées "provisoirement" :</strong> mettre l'API key directement dans le code "pour aller vite" → toujours là 6 mois plus tard, en production.</p>`,
        invariants: `<p>Configuration ≠ code. Ce qui varie entre les environnements n'appartient pas au code source. <strong>Ce qui change : le mécanisme, .env, Vault, SSM Parameter Store ou secrets de plateforme. Ce qui ne change pas : la séparation entre configuration, secrets et code versionné.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Contenu .env.example" },
            { type: "snippet", value: "DATABASE_URL=postgresql://user:password@localhost:5432/dbname" },
            { type: "snippet", value: "JWT_SECRET=your-secret-key-here" },
            { type: "snippet", value: "PORT=3000" },
            { type: "snippet", value: "NODE_ENV=development" },
            { type: "comment", value: "Installation JS" },
            { type: "cmd", value: "npm install dotenv" },
            { type: "comment", value: "Installation Python" },
            { type: "cmd", value: "pip install python-dotenv" }
          ],
          verification: ".env doit être ignoré par Git, et .env.example doit lister toutes les variables nécessaires sans vraie valeur sensible.",
          debt: "Variables non documentées dans .env.example = dette de connaissance. Validation des env vars au démarrage à implémenter dès que le projet grandit."
        },
        verification: [
          "Pourquoi hardcoder une API key dans le code mélange-t-il deux responsabilités différentes ?",
          "Un nouveau dev clone le projet sans .env.example : où l'onboarding casse-t-il concrètement ?",
          "Ce qui change entre .env local, secrets de plateforme et Vault, et ce qui ne change pas dans la séparation configuration/code ?"
        ]
      }
    },
    commits: {
      id: "commits",
      label: "Commits",
      icon: "✍",
      kind: "vcs",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Un historique Git sans conventions ressemble à : "fix", "wip", "ok", "test2", "vraiment fix cette fois". Impossible de comprendre ce qui a changé, pourquoi, ni de générer un changelog automatique. Les conventions de commit transforment l'historique en documentation navigable et permettent l'automatisation (changelogs générés, versioning sémantique automatique, releases).</p>`,
        system: `<p>Les conventions de commit s'appliquent à chaque <code>git commit</code> du projet. Elles s'intègrent avec commitlint (vérifie le format du message avant validation), husky (exécute commitlint via git hooks), et semantic-release (génère automatiquement versions et changelogs à partir des types de commits). Elles sont aussi lues par GitHub pour l'affichage des PRs et Issues.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Standard dominant : Conventional Commits. Format : <code>type(scope): description</code>. Types courants : <code>feat</code>, <code>fix</code>, <code>docs</code>, <code>chore</code>, <code>refactor</code>, <code>test</code>, <code>ci</code>. Alternatives : Gitmoji, format maison. Conventional Commits est recommandé — outillage, intégration CI, standard industrie largement adopté.</p>`,
          alternatives: [
            { name: "Conventional Commits", description: "Standard recommandé, automatisable et lisible." },
            { name: "Gitmoji", description: "Fun, mais moins lisible pour CI/changelog." },
            { name: "Format maison", description: "Possible, mais demande discipline et outillage." }
          ]
        },
        senior: `<p>Il établit la convention dès le premier commit. Il installe commitlint + husky pour que la convention soit appliquée par des outils — pas par bonne volonté. Il sait que la convention n'a de valeur que si elle est appliquée mécaniquement : laissée au jugement, elle dégénère sous la pression.</p>`,
        errors: `<p><strong>Pattern 1 — Les commits vagues :</strong> "fix", "update", "WIP", "changes" → historique inutile, aucune traçabilité, impossible de comprendre l'évolution du projet.</p><p><strong>Pattern 2 — Le commit fourre-tout :</strong> un commit qui touche 3 features et 2 bug fixes → impossible de revenir sur une seule modification, bisect inutilisable.</p><p><strong>Pattern 3 — La convention déclarée mais non appliquée :</strong> convention dans le README, pas de commitlint → ignorée sous la pression des deadlines après 2 semaines.</p>`,
        invariants: `<p>Un commit = une intention. Un message de commit doit répondre à : "qu'est-ce qui change et pourquoi ?" — pas "qu'est-ce que j'ai fait". <strong>Ce qui change : la syntaxe, Conventional Commits, Gitmoji ou format maison. Ce qui ne change pas : l'exigence d'un historique lisible, atomique et utile pour revenir en arrière.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Exemples valides" },
            { type: "snippet", value: "feat(auth): add JWT refresh token rotation" },
            { type: "snippet", value: "fix(api): handle null response from payment gateway" },
            { type: "snippet", value: "docs(readme): update Node.js version requirement" },
            { type: "snippet", value: "chore(deps): upgrade eslint from 8 to 9" },
            { type: "comment", value: "Installation commitlint + husky" },
            { type: "cmd", value: "npm install --save-dev @commitlint/cli @commitlint/config-conventional husky" },
            { type: "cmd", value: "npx husky init" }
          ],
          verification: "Un commit invalide doit être rejeté si commitlint est configuré, et git log --oneline doit rester lisible.",
          debt: "Pas de git hooks → convention non appliquée → historique dégradé progressivement sous la pression."
        },
        verification: [
          "Pourquoi une convention de commit ne vaut presque rien si elle n'est pas appliquée mécaniquement ?",
          "Tu lis un historique rempli de fix, update et wip : qu'est-ce qui devient impossible à comprendre ?",
          "Ce qui change entre Conventional Commits, Gitmoji et un format maison, et ce qui ne change pas dans le rôle du message ?"
        ]
      }
    },
    "package-json": {
      id: "package-json",
      label: "package.json",
      icon: "{}",
      kind: "tool",
      osLabel: "JavaScript uniquement",
      niveau: "Fondation",
      sections: {
        why: `<p>Un projet JavaScript sans package.json est un projet sans identité et sans gestion reproductible des dépendances. Le package.json est le manifeste : il déclare ce qu'est le projet (nom, version, description), ce dont il a besoin (dépendances), et comment l'utiliser (scripts). Sans lui, partager le projet ou le reproduire sur une autre machine requiert une documentation manuelle exhaustive — ce qui échoue toujours.</p>`,
        system: `<p>package.json est le centre de gravité d'un projet JS. npm/yarn/pnpm le lisent pour installer les dépendances. Les outils (ESLint, Prettier, TypeScript, Jest) y cherchent leur configuration. Les scripts (start, build, test, dev) y sont définis et constituent l'interface standardisée du projet. Le package-lock.json est généré à partir de lui et doit être commité — c'est lui qui garantit la reproductibilité exacte.</p>`,
        choice: {
          kind: "structured",
          main: `<p><code>npm init -y</code> pour générer rapidement, puis modifier manuellement les champs importants. La vraie décision : quel gestionnaire de paquets ? npm, yarn, pnpm. Pour débuter : npm. Le choix doit être cohérent dans le projet — un seul gestionnaire, un seul lock file.</p>`,
          alternatives: [
            { name: "npm", description: "Universel, inclus avec Node, syntaxe de référence." },
            { name: "yarn", description: "Bon pour les workspaces, historiquement plus rapide." },
            { name: "pnpm", description: "Plus strict, plus économe en espace disque." }
          ]
        },
        senior: `<p>Il distingue <code>dependencies</code> (nécessaires en production — Express, React) de <code>devDependencies</code> (dev uniquement — ESLint, Prettier, Jest, TypeScript). Il définit des scripts standards : <code>dev</code>, <code>build</code>, <code>test</code>, <code>lint</code>. Il spécifie la version de Node requise dans le champ <code>engines</code>. Il commit toujours le lock file.</p>`,
        errors: `<p><strong>Pattern 1 — Le lock file ignoré :</strong> mettre package-lock.json dans .gitignore → chaque dev installe des versions potentiellement différentes.</p><p><strong>Pattern 2 — Tout en dependencies :</strong> mettre ESLint, types TypeScript, librairies de test dans <code>dependencies</code> au lieu de <code>devDependencies</code>.</p><p><strong>Pattern 3 — Les scripts absents ou non-standard :</strong> pas de script "dev", chaque dev lance l'app à sa façon.</p>`,
        invariants: `<p>Tout projet avec des dépendances a besoin d'un manifeste déclaratif et versionné. <strong>Ce qui change : le format, package.json, requirements.txt, pyproject.toml, go.mod ou Cargo.toml. Ce qui ne change pas : le besoin de déclarer l'identité du projet, ses dépendances et ses commandes de façon reproductible.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "npm init -y" },
            { type: "cmd", value: "npm install" },
            { type: "cmd", value: "npm install express" },
            { type: "cmd", value: "npm install --save-dev eslint" },
            { type: "comment", value: "Scripts recommandés : dev, start, test, lint, format" }
          ],
          verification: "package.json doit contenir scripts, dependencies/devDependencies, engines si la version Node est importante, et un lock file commité.",
          debt: "Lock file non commité → reproductibilité cassée. Scripts non définis → onboarding difficile."
        },
        verification: [
          "Pourquoi package.json est-il un manifeste du projet, et pas seulement une liste de librairies ?",
          "Tu ignores package-lock.json : pourquoi deux machines peuvent-elles installer des arbres de dépendances différents ?",
          "Ce qui change entre npm, yarn et pnpm, et ce qui ne change pas dans le rôle du manifeste ?"
        ]
      }
    },
    "gestionnaire-paquets": {
      id: "gestionnaire-paquets",
      label: "npm / pnpm",
      icon: "📦",
      kind: "infra",
      osLabel: "JavaScript uniquement",
      niveau: "Fondation",
      sections: {
        why: `<p>JavaScript a plus de 2 millions de packages sur npm. Sans gestionnaire de paquets, intégrer une librairie implique de télécharger manuellement le code, de gérer ses propres dépendances, de maintenir les mises à jour. npm, yarn et pnpm automatisent tout ça : installation, résolution des conflits de dépendances, versioning, mise à jour.</p>`,
        system: `<p>Le gestionnaire de paquets lit package.json, télécharge les dépendances dans node_modules/, génère le lock file (package-lock.json pour npm, pnpm-lock.yaml pour pnpm). node_modules/ ne se commite jamais — c'est le lock file qui garantit la reproductibilité. En CI/CD, on utilise <code>npm ci</code> ou <code>pnpm install --frozen-lockfile</code>.</p>`,
        choice: {
          kind: "structured",
          main: `<p>npm (inclus avec Node, universal, légèrement lent, syntaxe de référence), pnpm (plus rapide, plus strict sur les dépendances fantômes, store partagé), yarn (bon pour les workspaces, PnP mode avancé). Pour débuter : npm. Pour des projets avec de nombreuses dépendances ou un monorepo : pnpm est clairement supérieur. La règle absolue : un seul gestionnaire par projet, ne pas mélanger.</p>`,
          alternatives: [
            { name: "npm", description: "Défaut pour débuter, partout disponible." },
            { name: "pnpm", description: "Plus rapide, strict et efficace en stockage." },
            { name: "yarn", description: "Pertinent pour certains workspaces et projets existants." }
          ]
        },
        senior: `<p>Il utilise <code>npm ci</code> en CI/CD plutôt que <code>npm install</code>. Il fait régulièrement <code>npm audit</code> pour détecter les vulnérabilités dans les dépendances et <code>npm outdated</code> pour voir les mises à jour disponibles.</p>`,
        errors: `<p><strong>Pattern 1 — Le lock file gitignored :</strong> installs différents selon la machine et la date.</p><p><strong>Pattern 2 — npm install en CI :</strong> le CI peut upgrader silencieusement des packages.</p><p><strong>Pattern 3 — Mélanger les gestionnaires :</strong> deux lock files, comportements imprévisibles.</p>`,
        invariants: `<p>Un gestionnaire de paquets résout deux problèmes distincts : accéder aux librairies et garantir la reproductibilité. <strong>Ce qui change : npm, pnpm, yarn, leurs performances et leurs conventions. Ce qui ne change pas : la logique registry + lock file + installation reproductible.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "npm install" },
            { type: "cmd", value: "npm install express" },
            { type: "cmd", value: "npm install --save-dev eslint" },
            { type: "cmd", value: "npm ci" },
            { type: "cmd", value: "npm audit" },
            { type: "cmd", value: "npm outdated" },
            { type: "cmd", value: "npm run dev" },
            { type: "cmd", value: "npm install -g pnpm" },
            { type: "cmd", value: "pnpm install --frozen-lockfile" }
          ],
          verification: "node_modules doit exister localement, le lock file doit être présent, et un seul gestionnaire doit avoir généré un seul lock file.",
          debt: "node_modules/ dans .gitignore obligatoire. npm audit fix régulier. Ne jamais pousser node_modules."
        },
        verification: [
          "Pourquoi npm ci est-il plus fiable que npm install dans une CI ?",
          "Tu lances yarn dans un projet npm et tu obtiens deux lock files : quel signal architectural cela envoie ?",
          "Ce qui change entre npm et pnpm, et ce qui ne change pas dans le besoin de reproductibilité ?"
        ]
      }
    },
    "eslint-prettier": {
      id: "eslint-prettier",
      label: "ESLint + Prettier",
      icon: "✨",
      kind: "tool",
      osLabel: "JavaScript uniquement",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Sans linter, les erreurs mécaniques (variables non utilisées, comparaisons avec == au lieu de ===, imports manquants) sont découvertes à l'exécution ou pas du tout. Sans formatteur automatique, chaque dev a son style → les diffs de PR sont polluées. ESLint détecte les erreurs de logique et enforce les bonnes pratiques. Prettier uniformise le style sans débat.</p>`,
        system: `<p>ESLint et Prettier s'intègrent dans VS Code, dans les scripts npm (<code>lint</code>, <code>format</code>), et dans les git hooks via husky. ESLint lit <code>eslint.config.js</code>. Prettier lit <code>.prettierrc</code>. Ils sont complémentaires : ESLint analyse la sémantique, Prettier gère le style — les deux doivent coexister sans se contredire via <code>eslint-config-prettier</code>.</p>`,
        choice: {
          kind: "structured",
          main: `<p>ESLint + Prettier est la combinaison standard. Alternative émergente : Biome. oxlint existe aussi côté linter Rust ultra-rapide. Pour débuter : ESLint + Prettier — documentation abondante, écosystème complet. Le point essentiel : une seule source de vérité pour le style.</p>`,
          alternatives: [
            { name: "ESLint + Prettier", description: "Standard, riche, très documenté." },
            { name: "Biome", description: "Un seul outil Rust, très rapide, moins de plugins." },
            { name: "oxlint", description: "Linter ultra-rapide, à évaluer selon le projet." }
          ]
        },
        senior: `<p>Il configure Prettier en premier et installe <code>eslint-config-prettier</code> pour désactiver les règles ESLint qui conflictent avec Prettier. Il active "Format on Save" dans VS Code. Il démarre avec un ensemble de règles ESLint minimal et l'enrichit progressivement — pas 200 règles dès le début.</p>`,
        errors: `<p><strong>Pattern 1 — Les conflits ESLint/Prettier :</strong> sans eslint-config-prettier, les deux outils se battent.</p><p><strong>Pattern 2 — Le linter sans CI :</strong> ESLint configuré localement mais absent de la CI.</p><p><strong>Pattern 3 — La config trop stricte dès le début :</strong> 500 erreurs au premier fichier, découragement, règles désactivées.</p>`,
        invariants: `<p>La qualité du code ne repose pas sur la discipline individuelle — elle repose sur des outils automatisés et coercitifs. <strong>Ce qui change : l'outil, ESLint, Prettier, Biome ou oxlint. Ce qui ne change pas : format on save, lint en CI, et zéro débat manuel de style en revue.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "npm install --save-dev eslint prettier eslint-config-prettier @eslint/js" },
            { type: "comment", value: ".prettierrc" },
            { type: "snippet", value: `{ "semi": true, "singleQuote": true, "tabWidth": 2, "trailingComma": "es5", "printWidth": 100 }` },
            { type: "comment", value: "Scripts package.json" },
            { type: "snippet", value: `"lint": "eslint src/"` },
            { type: "snippet", value: `"format": "prettier --write src/"` },
            { type: "cmd", value: "npm run lint" },
            { type: "cmd", value: "npm run format" }
          ],
          verification: "npm run lint doit passer sur un fichier propre, et npm run format doit produire un formatage stable sans conflit ESLint/Prettier.",
          debt: "ESLint sans CI = règles optionnelles. Ajouter npm run lint dans le pipeline CI dès le début du projet."
        },
        verification: [
          "Pourquoi Prettier et ESLint doivent-ils avoir des responsabilités séparées ?",
          "Tu configures ESLint localement mais pas en CI : que se passe-t-il sous pression d'équipe ?",
          "Ce qui change entre ESLint + Prettier et Biome, et ce qui ne change pas dans l'automatisation de la qualité ?"
        ]
      }
    },
    venv: {
      id: "venv",
      label: "venv",
      icon: "🫧",
      kind: "infra",
      osLabel: "Python uniquement",
      niveau: "Fondation",
      sections: {
        why: `<p>Python installe les packages globalement par défaut. Projet A a besoin de Django 3.2, projet B a besoin de Django 4.2. Sans isolation, ils entrent en conflit. Le venv crée un Python isolé par projet avec ses propres packages, totalement indépendant du reste du système et des autres projets.</p>`,
        system: `<p>Le venv est la fondation de tout projet Python. Il doit être créé avant d'installer la première dépendance. Une fois activé, pip installe dans le venv uniquement, pas globalement. Le dossier <code>.venv/</code> est dans .gitignore — il est régénéré via <code>pip install -r requirements.txt</code>. VS Code détecte automatiquement le venv nommé <code>.venv</code>.</p>`,
        choice: {
          kind: "structured",
          main: `<p>venv (inclus dans Python 3, zéro installation, suffisant pour 95% des cas), conda (data science), uv (nouveau gestionnaire en Rust, ultra-rapide, remplace pip + venv + pyenv). Pour débuter : venv. Pour data science : conda. Pour un setup moderne et rapide : uv.</p>`,
          alternatives: [
            { name: "venv", description: "Défaut simple et intégré." },
            { name: "conda", description: "Fort en data science et packages non-Python." },
            { name: "uv", description: "Très rapide, futur probable du tooling Python." }
          ]
        },
        senior: `<p>Il nomme toujours le venv <code>.venv</code>. Il l'active dès qu'il ouvre le terminal du projet. Il vérifie que VS Code utilise l'interpréteur du venv et pas le Python système — sans ça, les imports dans l'éditeur signalent des erreurs qui n'existent pas dans le terminal.</p>`,
        errors: `<p><strong>Pattern 1 — L'install globale :</strong> <code>pip install django</code> sans venv activé.</p><p><strong>Pattern 2 — Le venv commité :</strong> oublier <code>.venv/</code> dans .gitignore.</p><p><strong>Pattern 3 — Le venv non activé :</strong> pip installe globalement ou trouve les mauvaises versions.</p>`,
        invariants: `<p>L'isolation des dépendances par projet est un besoin universel. <strong>Ce qui change : le mécanisme d'isolation, node_modules, venv, conda, uv ou bundler. Ce qui ne change pas : chaque projet doit gérer ses propres versions de dépendances indépendamment des autres projets.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "python3 -m venv .venv" },
            { type: "cmd", value: "source .venv/bin/activate" },
            { type: "cmd", value: ".venv\\Scripts\\activate" },
            { type: "cmd", value: "deactivate" },
            { type: "cmd", value: "which python" },
            { type: "cmd", value: "pip install -r requirements.txt" },
            { type: "comment", value: "VS Code : Python: Select Interpreter → .venv/bin/python" }
          ],
          verification: "which python doit pointer vers .venv après activation, et .venv doit être ignoré par Git.",
          debt: ".venv/ dans .gitignore obligatoire. VS Code avec le mauvais interpréteur → faux positifs d'erreurs."
        },
        verification: [
          "Pourquoi installer des packages Python globalement casse-t-il la séparation entre projets ?",
          "Tu ouvres VS Code sur le mauvais interpréteur : quels faux symptômes peux-tu voir dans l'éditeur ?",
          "Ce qui change entre venv, conda et uv, et ce qui ne change pas dans le besoin d'isolation ?"
        ]
      }
    },
    requirements: {
      id: "requirements",
      label: "requirements.txt",
      icon: "📋",
      kind: "tool",
      osLabel: "Python uniquement",
      niveau: "Fondation",
      sections: {
        why: `<p>Le venv isole les packages, mais ne les liste pas de façon persistante. Si on supprime le venv ou si quelqu'un clone le projet, les packages sont perdus. requirements.txt remplit ce rôle : il déclare toutes les dépendances avec leurs versions, permettant de reproduire l'environnement exactement. C'est l'équivalent Python du package.json + lock file.</p>`,
        system: `<p>requirements.txt est commité dans le dépôt. <code>pip install -r requirements.txt</code> reproduit l'environnement sur n'importe quelle machine. En production, le même fichier est utilisé dans le Dockerfile ou le système de déploiement. Son pendant moderne est pyproject.toml.</p>`,
        choice: {
          kind: "structured",
          main: `<p>requirements.txt (simple, universel, pip natif), pip-tools, Poetry, uv. Pour débuter : requirements.txt. Pour un projet sérieux en production : Poetry ou uv pour le lock file et la gestion des dépendances directes vs transitives.</p>`,
          alternatives: [
            { name: "requirements.txt", description: "Simple, universel, parfait pour démarrer." },
            { name: "pip-tools", description: "Sépare dépendances directes et versions compilées." },
            { name: "Poetry / uv", description: "Gestion moderne avec lock file." }
          ]
        },
        senior: `<p>Il sépare les dépendances de production (requirements.txt) des dépendances de développement (requirements-dev.txt — pytest, ruff, black). Il met à jour requirements.txt après chaque <code>pip install</code>. Il pin les versions exactes en production pour la reproductibilité.</p>`,
        errors: `<p><strong>Pattern 1 — Le requirements.txt oublié :</strong> installer des packages sans les documenter.</p><p><strong>Pattern 2 — pip freeze sans discernement :</strong> fichier de 50 packages dont 40 ne sont pas des dépendances directes.</p><p><strong>Pattern 3 — Pas de versioning :</strong> <code>django</code> au lieu de <code>django==4.2.7</code>.</p>`,
        invariants: `<p>Déclarer les dépendances de façon versionnée et reproductible est un invariant de tout projet logiciel. <strong>Ce qui change : requirements.txt, pyproject.toml, Poetry, uv ou pip-tools. Ce qui ne change pas : quelqu'un d'autre doit pouvoir reproduire ton environnement exactement, sur n'importe quelle machine, à n'importe quelle date future.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "pip install django" },
            { type: "cmd", value: "pip freeze > requirements.txt" },
            { type: "cmd", value: "pip install -r requirements.txt" },
            { type: "comment", value: "requirements-dev.txt" },
            { type: "snippet", value: "-r requirements.txt" },
            { type: "snippet", value: "pytest==7.4.3" },
            { type: "snippet", value: "ruff==0.1.6" },
            { type: "snippet", value: "black==23.11.0" },
            { type: "cmd", value: "pip list" },
            { type: "cmd", value: "pip show django" }
          ],
          verification: "pip install -r requirements.txt dans un venv vierge doit installer le projet sans dépendance manquante.",
          debt: "requirements.txt non mis à jour après chaque pip install → dépendances non documentées. Envisager pip-tools ou uv."
        },
        verification: [
          "Pourquoi le venv seul ne suffit-il pas à rendre un projet Python reproductible ?",
          "Tu installes un package mais tu oublies requirements.txt : que va vivre la prochaine personne qui clone le dépôt ?",
          "Ce qui change entre requirements.txt, Poetry et uv, et ce qui ne change pas dans le besoin de déclarer les dépendances ?"
        ]
      }
    },
    "linter-python": {
      id: "linter-python",
      label: "Ruff + Black",
      icon: "✨",
      kind: "tool",
      osLabel: "Python uniquement",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Python a une culture de style forte formalisée dans PEP 8. Sans linter, le code d'une équipe diverge rapidement. Sans formatteur automatique, les diffs de PR sont polluées de changements de style. Ruff détecte les erreurs et violations de bonnes pratiques avec une vitesse extrême (Rust). Black formate le code automatiquement et sans configuration.</p>`,
        system: `<p>Ruff et Black s'intègrent dans VS Code via l'extension officielle Ruff, dans les scripts du projet, et dans les git hooks via pre-commit. Leur configuration vit dans <code>pyproject.toml</code>. Black gère le formatage, Ruff gère tout ce que Black ne touche pas (imports, variables non utilisées, violations PEP 8 logiques).</p>`,
        choice: {
          kind: "structured",
          main: `<p>Black (formatteur, zéro configuration volontaire), Ruff (linter ultra-rapide en Rust, remplace flake8 + isort + plusieurs plugins). Alternative moderne : Ruff seul peut maintenant aussi formatter (<code>ruff format</code>). L'ancienne approche flake8 + autopep8 + isort est à éviter pour un nouveau projet.</p>`,
          alternatives: [
            { name: "Ruff + Black", description: "Combinaison moderne et très robuste." },
            { name: "Ruff seul", description: "Simplifie encore le tooling avec ruff format." },
            { name: "flake8 + autopep8 + isort", description: "Ancienne approche, plus fragmentée." }
          ]
        },
        senior: `<p>Il centralise la configuration dans <code>pyproject.toml</code>. Il active "Format on Save" avec Black dans VS Code. Il ajoute <code>ruff check</code> et <code>black --check</code> dans la CI pour bloquer les PRs non conformes. Il s'assure que la longueur de ligne est cohérente partout (88 caractères — défaut Black).</p>`,
        errors: `<p><strong>Pattern 1 — Le linter sans CI :</strong> Ruff configuré localement mais absent de la CI.</p><p><strong>Pattern 2 — Black et isort en conflit :</strong> utiliser Ruff pour les imports plutôt qu'isort séparé.</p><p><strong>Pattern 3 — Configuration dispersée :</strong> config dans setup.cfg ET pyproject.toml ET .flake8.</p>`,
        invariants: `<p>Automatiser la qualité du code est toujours plus efficace que la faire respecter manuellement en revue de code. <strong>Ce qui change : Ruff, Black, ruff format, flake8 ou autopep8. Ce qui ne change pas : un formatteur sur save + un linter en CI évitent les débats de style et les erreurs mécaniques.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "pip install ruff black" },
            { type: "comment", value: "pyproject.toml" },
            { type: "snippet", value: "[tool.ruff]" },
            { type: "snippet", value: "line-length = 88" },
            { type: "snippet", value: `[tool.black]` },
            { type: "snippet", value: `target-version = ["py311"]` },
            { type: "cmd", value: "ruff check src/" },
            { type: "cmd", value: "ruff check src/ --fix" },
            { type: "cmd", value: "black src/" },
            { type: "cmd", value: "black src/ --check" }
          ],
          verification: "ruff check . et black --check . doivent passer sur un code propre, avec une configuration centralisée dans pyproject.toml.",
          debt: "Pas de CI → qualité dégradée progressivement. Ajouter ruff check et black --check dans le pipeline CI dès le début."
        },
        verification: [
          "Pourquoi Ruff et Black doivent-ils être automatisés plutôt que laissés à la discipline individuelle ?",
          "Tu as une config dans setup.cfg, pyproject.toml et .flake8 : quel type de bug de tooling peux-tu créer ?",
          "Ce qui change entre Ruff + Black et Ruff seul, et ce qui ne change pas dans le rôle du linter/formatteur ?"
        ]
      }
    }
  },
  maps: {
    js: {
      viewBox: "0 0 920 280",
      nodes: [
        { id: "git-init", x: 20, y: 80, w: 110, h: 65 },
        { id: "gitignore", x: 170, y: 80, w: 110, h: 65 },
        { id: "structure", x: 320, y: 80, w: 110, h: 65 },
        { id: "readme", x: 320, y: 185, w: 110, h: 65 },
        { id: "env-vars", x: 470, y: 185, w: 110, h: 65 },
        { id: "package-json", x: 470, y: 80, w: 120, h: 65 },
        { id: "gestionnaire-paquets", x: 635, y: 80, w: 120, h: 65 },
        { id: "eslint-prettier", x: 635, y: 185, w: 130, h: 65 },
        { id: "commits", x: 790, y: 130, w: 110, h: 65 }
      ],
      edges: [
        { x1: 130, y1: 112, x2: 168, y2: 112, label: "protège" },
        { x1: 280, y1: 112, x2: 318, y2: 112, label: "cadre" },
        { x1: 375, y1: 145, x2: 375, y2: 183, label: "documente" },
        { x1: 430, y1: 112, x2: 468, y2: 112, label: "manifeste" },
        { x1: 430, y1: 217, x2: 468, y2: 217, label: "configure" },
        { x1: 590, y1: 112, x2: 633, y2: 112, label: "installe" },
        { x1: 695, y1: 145, x2: 700, y2: 183, label: "qualité" },
        { x1: 755, y1: 112, x2: 788, y2: 150, label: "stabilise" },
        { x1: 765, y1: 217, x2: 788, y2: 175, label: "bloque" }
      ]
    },
    python: {
      viewBox: "0 0 920 280",
      nodes: [
        { id: "git-init", x: 20, y: 80, w: 110, h: 65 },
        { id: "gitignore", x: 170, y: 80, w: 110, h: 65 },
        { id: "structure", x: 320, y: 80, w: 110, h: 65 },
        { id: "readme", x: 320, y: 185, w: 110, h: 65 },
        { id: "env-vars", x: 470, y: 185, w: 110, h: 65 },
        { id: "venv", x: 470, y: 80, w: 100, h: 65 },
        { id: "requirements", x: 615, y: 80, w: 140, h: 65 },
        { id: "linter-python", x: 615, y: 185, w: 140, h: 65 },
        { id: "commits", x: 800, y: 130, w: 110, h: 65 }
      ],
      edges: [
        { x1: 130, y1: 112, x2: 168, y2: 112, label: "protège" },
        { x1: 280, y1: 112, x2: 318, y2: 112, label: "cadre" },
        { x1: 375, y1: 145, x2: 375, y2: 183, label: "documente" },
        { x1: 430, y1: 112, x2: 468, y2: 112, label: "isole" },
        { x1: 430, y1: 217, x2: 468, y2: 217, label: "configure" },
        { x1: 570, y1: 112, x2: 613, y2: 112, label: "déclare" },
        { x1: 685, y1: 145, x2: 685, y2: 183, label: "qualité" },
        { x1: 755, y1: 112, x2: 798, y2: 150, label: "stabilise" },
        { x1: 755, y1: 217, x2: 798, y2: 175, label: "bloque" }
      ]
    }
  }
};
