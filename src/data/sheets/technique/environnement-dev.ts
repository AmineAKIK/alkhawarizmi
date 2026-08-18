import type { DevSheet } from "../../schema";

export const environnementDev: DevSheet = {
  id: "environnement-dev",
  part: "T",
  number: 1,
  title: "Environnement de Développement",
  subtitle: "Comprendre la chaîne d'outils avant d'écrire du code",
  badge: "Fiche T01",
  meta: ["11 nœuds · 3 OS"],
  category: "Technique",
  level: "Débutant → Junior",
  readingTime: "25 min",
  description:
    "Une carte interactive pour comprendre comment VS Code, Git, GitHub, les runtimes, le shell et les gestionnaires de paquets s'articulent selon l'OS.",
  accent: "tool",
  tabs: [
    { id: "windows", label: "🪟 Windows" },
    { id: "macos", label: "🍎 macOS" },
    { id: "linux", label: "🐧 Linux" }
  ],
  nodes: {
    vscode: {
      id: "vscode",
      label: "VS Code",
      icon: "🖊",
      kind: "tool",
      osLabel: "Tous OS",
      niveau: "Fondation",
      sections: {
        why:
          `<p>Avant les éditeurs modernes, on codait dans des éditeurs sans contexte — le fichier, rien d'autre. Pas d'erreurs en temps réel, pas d'autocomplétion, pas d'intégration avec l'environnement. <strong>VS Code est né du constat que l'éditeur doit être un environnement, pas un bloc-notes amélioré.</strong></p>`,
        system:
          `<p>VS Code est le hub central du workflow. Il s'intègre avec <strong>Git</strong> (visualisation des diffs, staging inline), avec le <strong>terminal intégré</strong> (accès direct à WSL, bash, zsh sans changer de fenêtre), et avec le <strong>LSP</strong> (Language Server Protocol) qui alimente l'autocomplétion et les erreurs en temps réel.</p><p>Sur Windows, l'extension "Remote - WSL" fait tourner VS Code dans le contexte Linux, rendant la frontière entre les deux OS transparente.</p>`,
        choice: {
          kind: "structured",
          main: `VS Code domine par son écosystème d'extensions et sa légèreté relative. <strong>Le vrai choix se fait sur le curseur puissance / friction :</strong>`,
          alternatives: [
            { name: "Cursor", description: "Fork de VS Code avec IA intégrée nativement. Recommandé quand tu maîtrises déjà VS Code." },
            { name: "WebStorm / IntelliJ", description: "Plus puissant pour les gros projets Java/Kotlin. Payant, plus lourd. Sens dans un contexte entreprise." },
            { name: "Neovim", description: "Vitesse maximale, entièrement au clavier. Courbe d'apprentissage abrupte. Pour plus tard." }
          ]
        },
        senior:
          `<p>Un senior configure d'abord, code ensuite. Il installe ses extensions critiques (<strong>ESLint, Prettier, GitLens</strong>), active Settings Sync pour retrouver son environnement sur n'importe quelle machine, et configure le terminal intégré pour pointer sur le bon shell (WSL sur Windows, zsh sur macOS).</p><p>Il ne passe pas 3 heures à "personnaliser le thème" avant d'avoir écrit une ligne.</p>`,
        errors:
          `<p><strong>Pattern 1 — L'accumulation aveugle :</strong> accumuler des extensions sans comprendre ce qu'elles font. Résultat : éditeur lent, conflits silencieux, comportements imprévisibles.</p><p><strong>Pattern 2 — Ignorer le formatteur :</strong> ne pas configurer Prettier avec sauvegarde automatique. Le premier PR en équipe sera un enfer de diffs de formatage.</p><p><strong>Pattern 3 — Fuir le terminal :</strong> continuer à utiliser un terminal externe au lieu du terminal intégré. On perd la synchronisation de contexte.</p>`,
        invariants:
          `<p>L'éditeur est un outil de feedback rapide. Peu importe l'outil futur, le besoin reste : <strong>voir les erreurs sans compiler, naviguer vite dans la base de code, intégrer le contrôle de version visuellement.</strong></p><p>Ce qui change : l'interface. Ce qui ne change pas : la nécessité de réduire le temps entre "j'écris une erreur" et "je la vois".</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Téléchargement : code.visualstudio.com" },
            { type: "cmd", value: "code --version" },
            { type: "comment", value: "Extensions essentielles" },
            { type: "cmd", value: "code --install-extension eamodio.gitlens" },
            { type: "cmd", value: "code --install-extension esbenp.prettier-vscode" },
            { type: "cmd", value: "code --install-extension dbaeumer.vscode-eslint" }
          ],
          verification: "code --version doit répondre, et les extensions essentielles doivent être installées dans le bon profil VS Code.",
          debt: `Extensions non maintenues → audit régulier. "Format on Save" à activer dans settings.json.`
        },
        verification: [
          "Pourquoi un éditeur moderne est-il un environnement de feedback, et pas seulement un endroit où écrire du texte ?",
          "Tu installes 25 extensions sans comprendre leur rôle et VS Code devient lent : quel principe systémique tu viens de violer ?",
          "Ce qui change entre VS Code, Cursor et Neovim, et ce qui ne change pas dans le besoin qu'ils couvrent ?"
        ]
      }
    },
    wsl: {
      id: "wsl",
      label: "WSL",
      icon: "🔗",
      kind: "infra",
      osLabel: "Windows uniquement",
      niveau: "Intermédiaire",
      sections: {
        why:
          `<p>Windows et Unix ont des philosophies d'OS radicalement différentes. La majorité des outils de dev (scripts, serveurs, Docker, pipelines CI) sont nés dans l'écosystème Unix et se comportent mal sous Windows — <strong>paths différents (\\ vs /), permissions différentes, scripts shell incompatibles.</strong></p><p>WSL (Windows Subsystem for Linux) fait tourner un vrai noyau Linux dans Windows, sans machine virtuelle dédiée. La frontière s'efface.</p>`,
        system:
          `<p>WSL est <strong>la fondation de tout l'environnement de dev sur Windows.</strong> Git, Node.js, Python — tout tourne à l'intérieur de WSL. VS Code se connecte à WSL via "Remote - WSL", rendant l'expérience transparente. C'est le pont entre l'OS de bureau et l'environnement de dev réel.</p>`,
        choice: {
          kind: "structured",
          main: `WSL2 est la seule option sérieuse aujourd'hui. Les alternatives valent d'être connues :`,
          alternatives: [
            { name: "WSL1", description: "Translation d'appels syscall. Plus lent, pas de noyau complet. À éviter." },
            { name: "Git Bash", description: "Émulation minimale, suffisant pour Git seul. Pas un vrai Linux." },
            { name: "VM dédiée (VirtualBox / VMware)", description: "Isolation totale mais lourde. Sens pour des tests d'OS uniquement." }
          ]
        },
        senior:
          `<p>La règle d'or : <strong>les fichiers projet vivent dans le filesystem Linux</strong> (<code>~/projects/</code>), pas dans <code>/mnt/c/</code>. Accéder aux fichiers Windows depuis WSL via <code>/mnt/c/</code> est 5 à 10× plus lent à cause des appels cross-filesystem.</p><p>Pour accéder à ses projets depuis l'Explorateur Windows : <code>\\\\wsl$\\Ubuntu\\home\\user\\projects</code>.</p>`,
        errors:
          `<p><strong>Pattern 1 — Le double install :</strong> installer Node.js côté Windows ET côté WSL. Les deux entrent en conflit dans le PATH. Règle : tout en WSL, rien côté Windows pour le dev.</p><p><strong>Pattern 2 — Le mauvais filesystem :</strong> mettre ses projets dans <code>C:\\Users\\...</code> puis y accéder via <code>/mnt/c/</code>. Latence I/O qui rend npm install et les watchers désagréables.</p><p><strong>Pattern 3 — Oublier WSL2 :</strong> ne pas vérifier qu'on est bien en WSL2 après installation.</p>`,
        invariants:
          `<p>Quand les outils de dev assument un environnement Unix, l'alternative est toujours : une couche de compatibilité, une VM, ou changer d'OS. <strong>Ce qui change : la technologie de médiation entre Windows et Unix. Ce qui ne change pas : le besoin d'exécuter les outils dans l'environnement qu'ils supposent.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Dans PowerShell en mode Administrateur" },
            { type: "cmd", value: "wsl --install" },
            { type: "cmd", value: "wsl --set-default-version 2" },
            { type: "cmd", value: "wsl --status" },
            { type: "cmd", value: "wsl --update" }
          ],
          verification: "wsl --status doit indiquer WSL2, et les projets doivent vivre dans le filesystem Linux plutôt que dans /mnt/c/.",
          debt: "WSL à mettre à jour après chaque mise à jour majeure de Windows."
        },
        verification: [
          "Pourquoi WSL résout-il un problème de compatibilité systémique plutôt qu'un simple problème d'installation ?",
          "Tu places ton projet dans C:\\Users puis tu l'ouvres depuis WSL : que va-t-il probablement se passer sur npm install ou les watchers ?",
          "Ce qui change entre WSL, une VM et un vrai Linux, et ce qui ne change pas dans le besoin de fond ?"
        ]
      }
    },
    ubuntu: {
      id: "ubuntu",
      label: "Ubuntu",
      icon: "🐧",
      kind: "infra",
      osLabel: "Windows / WSL",
      niveau: "Fondation",
      sections: {
        why: `<p>WSL est le moteur. <strong>Ubuntu est la distribution Linux qui tourne dedans.</strong> Il faut choisir un "OS invité". Ubuntu est le choix dominant car c'est la distribution la plus documentée, avec le plus grand écosystème de tutos, et elle utilise <code>apt</code> — le gestionnaire de paquets le plus commun et le mieux supporté pour débuter.</p>`,
        system: `<p>Ubuntu est l'OS invité dans WSL. C'est lui qui fournit <strong>apt</strong> pour installer des paquets système, le <strong>shell bash</strong> par défaut, et l'environnement complet dans lequel Git, Node.js et Python s'installent. Tout ce que tu lances dans le terminal WSL tourne dans Ubuntu.</p>`,
        choice: {
          kind: "structured",
          main: `Le choix de distribution n'est pas critique pour débuter. Ce qui compte : LTS ou non.`,
          alternatives: [
            { name: "Ubuntu 22.04 LTS", description: "Recommandé. Support 5 ans, documentation abondante, compatibilité maximale." },
            { name: "Debian", description: "Plus léger, ultra-stable. Paquets plus vieux. Bon choix serveur, moins pour dev moderne." },
            { name: "Fedora (WSL)", description: "Utilise dnf à la place d'apt. Paquets plus récents. Si tu connais déjà l'écosystème Red Hat." }
          ]
        },
        senior: `<p>Il installe <strong>Ubuntu LTS (Long Term Support)</strong>, jamais la dernière version. La stabilité prime sur la nouveauté dans un environnement de travail quotidien.</p><p>Et il met à jour <strong>immédiatement</strong> après installation. Une distribution fraîche ≠ une distribution à jour — les paquets du CD d'installation peuvent avoir 6 mois de retard.</p>`,
        errors: `<p><strong>Pattern 1 — La version floue :</strong> installer Ubuntu sans spécifier de version → risque de récupérer une version non-LTS qui ne sera plus maintenue dans 9 mois.</p><p><strong>Pattern 2 — L'install immobile :</strong> ne jamais lancer <code>apt update && apt upgrade</code> → paquets obsolètes, dépendances manquantes, erreurs inexplicables lors d'installations futures.</p><p><strong>Pattern 3 — La distro comme identité :</strong> débattre de distributions avant de comprendre apt, le shell et les permissions. Le choix de distro devient une distraction au lieu d'un support de travail.</p>`,
        invariants: `<p>La distribution n'est qu'un packaging du noyau Linux avec des conventions. <strong>Ce qui change : la distribution et son gestionnaire de paquets. Ce qui ne change pas : le besoin d'un environnement Unix cohérent, maintenu, et capable d'installer les outils système.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Dans PowerShell" },
            { type: "cmd", value: "wsl --install -d Ubuntu-22.04" },
            { type: "comment", value: "Une fois dans Ubuntu" },
            { type: "cmd", value: "sudo apt update && sudo apt upgrade -y" },
            { type: "cmd", value: "lsb_release -a" },
            { type: "cmd", value: "sudo apt install -y curl git build-essential" }
          ],
          verification: "lsb_release -a doit afficher une version LTS attendue, puis apt update/upgrade doit s'exécuter sans erreur bloquante.",
          debt: "Planifier des sessions de mise à jour régulières. `apt` ne met pas à jour automatiquement."
        },
        verification: [
          "Pourquoi Ubuntu est-il présenté comme une distribution de travail, et pas comme le cœur du problème à apprendre ?",
          "Tu installes Ubuntu puis tu ne fais jamais apt update : quels symptômes risquent d'apparaître plus tard ?",
          "Ce qui change entre Ubuntu, Debian et Fedora, et ce qui ne change pas pour un développeur qui installe ses outils ?"
        ]
      }
    },
    git: {
      id: "git",
      label: "Git",
      icon: "⎇",
      kind: "vcs",
      osLabel: "Tous OS",
      niveau: "Fondation",
      sections: {
        why:
          `<p>Avant Git, le versioning se faisait en copiant des dossiers : <code>projet_final</code>, <code>projet_final_v2</code>, <code>projet_VRAIMENT_final</code>. En équipe, c'était un enfer — qui a modifié quoi, quand, pourquoi ? Les fusions étaient manuelles et destructrices.</p><p><strong>Git résout ça en traquant chaque changement comme un delta, en permettant des branches parallèles, et en gérant les fusions de façon reproductible.</strong></p>`,
        system:
          `<p>Git est le tissu conjonctif du workflow entier. Il s'intègre avec <strong>GitHub</strong> (dépôt remote), avec <strong>VS Code</strong> (UI de diff, staging visuel, historique), et avec tous les outils CI/CD dont les pipelines se déclenchent sur des événements Git (push, pull request, tag).</p><p>Sans Git, pas de collaboration structurée possible. Tout le reste assume qu'il existe.</p>`,
        choice: {
          kind: "structured",
          main: `Git est le standard incontesté. La vraie décision est sur l'hébergeur remote :`,
          alternatives: [
            { name: "GitHub", description: "Standard dominant. Plus grand écosystème, GitHub Actions, hiring. Défaut absolu pour commencer." },
            { name: "GitLab", description: "DevOps plus complet intégré, auto-hébergeable. Bon si CI/CD avancé ou besoin de self-hosting." },
            { name: "Bitbucket", description: "Atlassian. Pertinent si l'équipe utilise déjà Jira. Pas de raison de choisir sinon." }
          ]
        },
        senior:
          `<p>Il configure son identité globale en premier, avant tout commit. Il comprend les <strong>3 zones distinctes</strong> : working tree (modifications locales), index/staging (ce qui sera commité), remote (GitHub). <code>git add</code> ≠ <code>git commit</code> ≠ <code>git push</code> — trois opérations, trois effets.</p><p>Il écrit des messages de commit utiles : <em>"fix login form validation"</em>, pas <em>"fix bug"</em>. Et il ne commit jamais directement sur <code>main</code>.</p>`,
        errors:
          `<p><strong>Pattern 1 — Le commit monolithique :</strong> travailler pendant 3 jours et tout commiter d'un coup. Impossible à relire, à revenir en arrière partiellement, à déboguer.</p><p><strong>Pattern 2 — Le .gitignore oublié :</strong> pousser <code>node_modules/</code>, des fichiers <code>.env</code> avec des secrets, des binaires compilés. Le dépôt grossit, les secrets sont exposés.</p><p><strong>Pattern 3 — La confusion push/save :</strong> croire que "commiter" équivaut à "sauvegarder dans le cloud". Il faut aussi push.</p>`,
        invariants:
          `<p>Le contrôle de version est un filet de sécurité cognitif — il te permet de prendre des risques en sachant que tu peux revenir en arrière. <strong>Ce qui change : l'outil, l'hébergeur et le workflow de branches. Ce qui ne change pas : le besoin de tracer les changements, collaborer en parallèle, et revenir à un état antérieur.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Windows/Linux (Ubuntu)" },
            { type: "cmd", value: "sudo apt install -y git" },
            { type: "comment", value: "macOS (via Homebrew ou CLT)" },
            { type: "cmd", value: "brew install git" },
            { type: "comment", value: "Configuration initiale (obligatoire)" },
            { type: "cmd", value: "git config --global user.name \"Ton Nom\"" },
            { type: "cmd", value: "git config --global user.email \"ton@email.com\"" },
            { type: "cmd", value: "git config --global init.defaultBranch main" },
            { type: "cmd", value: "git --version" }
          ],
          verification: "git --version doit répondre, et git config --global --list doit contenir user.name, user.email et init.defaultBranch.",
          debt: "Sans configuration user.name/user.email, les commits ne sont pas identifiés correctement."
        },
        verification: [
          "Pourquoi Git doit-il être configuré avant les premiers commits, et pas quand le projet devient sérieux ?",
          "Tu fais git add sans .gitignore sur un projet Node : quel dommage devient difficile à nettoyer ?",
          "Ce qui change entre GitHub, GitLab ou Bitbucket, et ce qui ne change pas dans le rôle de Git ?"
        ]
      }
    },
    nodejs: {
      id: "nodejs",
      label: "Node.js",
      icon: "⬡",
      kind: "runtime",
      osLabel: "Tous OS - via nvm",
      niveau: "Fondation",
      sections: {
        why:
          `<p>JavaScript était confiné au navigateur — impossible de l'utiliser côté serveur ou pour des scripts système. <strong>Node.js a extrait le moteur V8 de Chrome et l'a rendu exécutable en dehors du navigateur</strong>, créant un runtime JavaScript universel.</p><p>Résultat : le même langage côté client ET côté serveur, un écosystème npm de 2M+ de bibliothèques, et la base de tout projet frontend moderne (bundlers, transpileurs, frameworks).</p>`,
        system:
          `<p>Node.js est le runtime qui fait tourner ton code JS/TS. <strong>npm</strong> (inclus) est le gestionnaire de paquets qui donne accès à l'écosystème. Il est nécessaire pour tout projet frontend moderne — React, Vue, etc. — même si le code final tourne dans le navigateur.</p><p>Il s'installe via <strong>nvm</strong> (Node Version Manager), qui s'intercale entre l'OS et Node.js pour permettre de switcher de version selon le projet.</p>`,
        choice: {
          kind: "structured",
          main: `Node.js vs ses alternatives récentes — le choix du runtime :`,
          alternatives: [
            { name: "nvm (recommandé)", description: "Gestionnaire de versions Node. Obligatoire pour gérer plusieurs projets avec des versions différentes." },
            { name: "Bun", description: "Ultra-rapide (Zig), remplace Node.js + npm + bundler. Compatibilité npm excellente. À considérer pour de nouveaux projets." },
            { name: "Deno", description: "Même créateur que Node, TypeScript natif, plus sécurisé. Écosystème plus petit. Intéressant mais pas le défaut." }
          ]
        },
        senior:
          `<p>Il ne touche jamais à <code>apt install nodejs</code> — les dépôts Ubuntu ont souvent Node 12 alors qu'on est à Node 22. Tout passe par nvm.</p><p>Il utilise un fichier <strong><code>.nvmrc</code></strong> dans chaque projet avec la version requise. Quand il entre dans le projet, <code>nvm use</code> lit ce fichier et switch automatiquement. Zéro "ça marchait sur ma machine".</p><p>Il distingue clairement <code>dependencies</code> et <code>devDependencies</code> dans package.json.</p>`,
        errors:
          `<p><strong>Pattern 1 — L'install directe :</strong> <code>sudo apt install nodejs</code> → version obsolète + conflit avec nvm dans le PATH. Désinstaller et repartir sur nvm.</p><p><strong>Pattern 2 — node_modules dans Git :</strong> oublier <code>node_modules/</code> dans <code>.gitignore</code> → dépôt de 200MB, CI cassé, dépendances sur-committées.</p><p><strong>Pattern 3 — La version instable :</strong> <code>nvm install node</code> sans préciser de version → récupère la latest, pas forcément la LTS.</p>`,
        invariants:
          `<p>Le runtime est distinct du langage. JavaScript peut tourner dans un navigateur, dans Node.js, dans Deno, dans Bun. <strong>Ce qui change : le runtime, son gestionnaire de paquets et ses performances. Ce qui ne change pas : le besoin d'un moteur qui exécute JavaScript hors du navigateur avec des dépendances reproductibles.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Installer nvm d'abord" },
            { type: "cmd", value: "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash" },
            { type: "cmd", value: "source ~/.bashrc  # ou ~/.zshrc" },
            { type: "comment", value: "Installer Node.js LTS" },
            { type: "cmd", value: "nvm install --lts" },
            { type: "cmd", value: "nvm use --lts" },
            { type: "cmd", value: "node --version && npm --version" },
            { type: "comment", value: "Fichier .nvmrc dans chaque projet" },
            { type: "cmd", value: "echo \"lts/*\" > .nvmrc" }
          ],
          verification: "node --version et npm --version doivent répondre depuis le même shell, et nvm current doit correspondre à la version attendue.",
          debt: "node_modules/ dans .gitignore dès le départ. .nvmrc dans chaque projet dès le départ."
        },
        verification: [
          "Pourquoi installer Node via nvm protège-t-il mieux les projets qu'une installation globale via apt ?",
          "Tu clones un projet avec une version Node différente de la tienne : quel rôle joue .nvmrc dans ce scénario ?",
          "Ce qui change entre Node, Bun et Deno, et ce qui ne change pas dans la notion de runtime ?"
        ]
      }
    },
    python: {
      id: "python",
      label: "Python",
      icon: "🐍",
      kind: "runtime",
      osLabel: "Tous OS",
      niveau: "Fondation",
      sections: {
        why:
          `<p>Python s'est imposé comme <strong>lingua franca</strong> du scripting, de la data science, du backend et de l'automatisation. Sa syntaxe lisible, son écosystème (Django, FastAPI, NumPy, Pandas, TensorFlow) et son ubiquité dans les serveurs en font un outil transversal incontournable.</p>`,
        system:
          `<p>Python coexiste avec Node.js — chaque projet choisit son runtime selon le contexte. <strong>pip</strong> est le gestionnaire de paquets. Les <strong>environnements virtuels</strong> (<code>venv</code>) isolent les dépendances projet par projet, comme <code>node_modules/</code> mais stocké en dehors du projet.</p><p>Il s'intègre avec VS Code via l'extension Python (Pylance), qui active l'autocomplétion, le linting, et la gestion des environnements virtuels.</p>`,
        choice: {
          kind: "structured",
          main: `Python 2 est mort depuis 2020 — toujours Python 3. La vraie décision : comment gérer les versions et environnements.`,
          alternatives: [
            { name: "venv (standard)", description: "Intégré à Python 3, léger, suffisant pour 95% des cas." },
            { name: "pyenv", description: "Comme nvm pour Python. Gère plusieurs versions de Python. Recommandé si tu jongle entre des projets Python 3.9 / 3.11 / 3.12." },
            { name: "uv", description: "Nouveau (Rust), ultra-rapide, remplace pip + venv + pyenv en un outil. L'avenir probable. À surveiller." },
            { name: "conda", description: "Standard data science. Gère aussi les environnements. Lourd pour un projet backend classique." }
          ]
        },
        senior:
          `<p>Il crée <strong>toujours un venv par projet</strong>. Il ne pip-installe jamais globalement — c'est une pollution qui crée des conflits invisibles entre projets.</p><p>Il vérifie toujours avec <code>python3 --version</code> — selon le système, <code>python</code> peut pointer sur Python 2. Il pin ses dépendances dans <code>requirements.txt</code> ou <code>pyproject.toml</code> pour la reproductibilité.</p>`,
        errors:
          `<p><strong>Pattern 1 — L'install globale :</strong> <code>pip install django</code> sans activer un venv → le package s'installe globalement, pollue l'environnement système, crée des conflits entre projets.</p><p><strong>Pattern 2 — Le venv oublié :</strong> travailler dans un projet sans activer le venv → les imports trouvent les mauvaises versions ou ne trouvent rien.</p><p><strong>Pattern 3 — La confusion python/python3 :</strong> sur certains systèmes, <code>python</code> pointe sur Python 2. Toujours utiliser <code>python3</code> explicitement.</p>`,
        invariants:
          `<p>La gestion d'environnements isolés par projet est un besoin universel en dev. <strong>Ce qui change : l'outil d'isolation, venv, conda, uv, Docker ou autre. Ce qui ne change pas : les dépendances d'un projet ne doivent pas affecter les autres projets de la machine.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Linux / Windows (Ubuntu/WSL)" },
            { type: "cmd", value: "sudo apt install -y python3 python3-pip python3-venv" },
            { type: "comment", value: "macOS (via Homebrew)" },
            { type: "cmd", value: "brew install python" },
            { type: "cmd", value: "python3 --version" },
            { type: "comment", value: "Créer et activer un venv dans chaque projet" },
            { type: "cmd", value: "python3 -m venv .venv" },
            { type: "cmd", value: "source .venv/bin/activate" },
            { type: "cmd", value: "pip install -r requirements.txt" }
          ],
          verification: "python3 --version doit répondre, et which python après activation doit pointer vers le dossier .venv du projet.",
          debt: "Ajouter .venv/ dans .gitignore et pin les versions."
        },
        verification: [
          "Pourquoi Python exige-t-il une isolation par projet plus tôt qu'on ne le pense ?",
          "Tu installes Django sans venv activé : quel genre de conflit peut apparaître dans un autre projet ?",
          "Ce qui change entre venv, conda et uv, et ce qui ne change pas dans le besoin d'isolation ?"
        ]
      }
    },
    github: {
      id: "github",
      label: "GitHub",
      icon: "⬡",
      kind: "tool",
      osLabel: "Tous OS",
      niveau: "Fondation",
      sections: {
        why:
          `<p>Git est local — il versionne ton code sur ta machine. Sans remote, Git ne sauvegarde pas dans le cloud et ne permet pas la collaboration. <strong>GitHub est le remote : il héberge les dépôts, facilite la collaboration via les Pull Requests, et s'est imposé comme la plateforme sociale du code.</strong></p>`,
        system:
          `<p>GitHub est le bout de la chaîne : Local (Git) → Remote (GitHub). Il s'intègre aussi avec les pipelines CI/CD via <strong>GitHub Actions</strong>, les revues de code (Pull Requests, code review), et la gestion de projet (Issues, Projects, Milestones).</p><p>Il se connecte à Git via SSH — une clé qu'on génère une fois et qui authentifie tous les push/pull ensuite.</p>`,
        choice: {
          kind: "structured",
          main: `GitHub est le défaut incontestable pour commencer. Les alternatives méritent d'être connues :`,
          alternatives: [
            { name: "GitHub", description: "Standard. Plus grand écosystème, GitHub Actions, communauté open source. Défaut absolu." },
            { name: "GitLab", description: "DevOps plus complet intégré nativement. Auto-hébergeable. Bon si l'équipe a des besoins CI/CD avancés." },
            { name: "Bitbucket", description: "Atlassian. Pertinent si l'équipe utilise Jira. Pas de raison de choisir sinon." }
          ]
        },
        senior:
          `<p>Il configure <strong>SSH dès le départ</strong> — pas de HTTP avec mot de passe à chaque push. Une clé <code>ed25519</code> générée une fois, ajoutée sur GitHub, et tous les dépôts sont accessibles sans friction.</p><p>Il sait que <strong>GitHub n'est pas Git</strong>. C'est un service au-dessus de Git, avec ses propres concepts (fork, PR, Actions). Les confondre crée des incompréhensions fondamentales.</p>`,
        errors:
          `<p><strong>Pattern 1 — Les secrets exposés :</strong> pousser un fichier <code>.env</code> avec des tokens ou mots de passe dans un dépôt public. Exposé en secondes, indexé par des bots. Le <code>.gitignore</code> est non-négociable.</p><p><strong>Pattern 2 — Le commit direct sur main :</strong> en équipe, travailler directement sur <code>main</code> sans branches ni Pull Requests → conflits, historique pollué, pas de revue de code.</p><p><strong>Pattern 3 — La confusion push/sauvegardé :</strong> croire que push = code sauvegardé. Si tu n'as pas commité, push ne fait rien.</p>`,
        invariants:
          `<p>La distinction local/remote est fondamentale dans tout système distribué. <strong>Ce qui change : l'hébergeur, ses interfaces et ses automatisations. Ce qui ne change pas : le besoin d'un dépôt central partagé pour coordonner, sauvegarder et relire le travail.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Créer un compte sur github.com, puis configurer SSH" },
            { type: "cmd", value: "ssh-keygen -t ed25519 -C \"ton@email.com\"" },
            { type: "comment", value: "Copier la clé publique et l'ajouter dans GitHub > Settings > SSH Keys" },
            { type: "cmd", value: "cat ~/.ssh/id_ed25519.pub" },
            { type: "comment", value: "Tester la connexion" },
            { type: "cmd", value: "ssh -T git@github.com" },
            { type: "comment", value: "Cloner un dépôt" },
            { type: "cmd", value: "git clone git@github.com:user/repo.git" }
          ],
          verification: "ssh -T git@github.com doit confirmer l'authentification, puis git remote -v doit afficher une URL SSH cohérente.",
          debt: `.env dans .gitignore obligatoire dès le premier commit. Activer "branch protection" sur main.`
        },
        verification: [
          "Pourquoi GitHub n'est-il pas Git, même s'il est souvent le premier endroit où l'on voit Git en équipe ?",
          "Tu as commité localement mais tu n'as pas push : qu'est-ce qui existe sur ta machine et qu'est-ce qui n'existe pas encore sur GitHub ?",
          "Ce qui change entre GitHub, GitLab et Bitbucket, et ce qui ne change pas dans la notion de remote ?"
        ]
      }
    },
    apt: {
      id: "apt",
      label: "apt",
      icon: "📦",
      kind: "infra",
      osLabel: "Linux / WSL",
      niveau: "Fondation",
      sections: {
        why:
          `<p>Linux ne vient pas avec un store pour les outils de dev. <strong>apt (Advanced Package Tool) est le gestionnaire de paquets de Debian/Ubuntu</strong> — il installe, met à jour, supprime des logiciels depuis des dépôts centralisés, avec résolution automatique des dépendances. Sans apt, chaque installation est manuelle et sans garde-fou.</p>`,
        system:
          `<p>apt est l'infrastructure d'installation sur Linux. <strong>Comme Homebrew sur macOS.</strong> Avant d'installer quoi que ce soit, <code>sudo apt update</code> synchronise les listes de paquets disponibles. Il gère les dépendances automatiquement — si git a besoin de libcurl, apt l'installe.</p>`,
        choice: {
          kind: "structured",
          main: `apt est imposé par Ubuntu/Debian. Les alternatives existent selon la distribution :`,
          alternatives: [
            { name: "apt (Debian/Ubuntu)", description: "Standard ici. Large écosystème, documentation abondante." },
            { name: "dnf / yum (Fedora/RHEL)", description: "Équivalent sur les distributions Red Hat." },
            { name: "pacman (Arch)", description: "Paquets plus récents, AUR communautaire. Distributions rolling-release." }
          ]
        },
        senior: `<p>Il connaît la limite d'apt : <strong>les versions dans les dépôts sont souvent très en retard.</strong> <code>sudo apt install nodejs</code> donne Node 12 sur Ubuntu 20.04. Il utilise apt pour les outils système stables (git, curl, build-essential) et des gestionnaires de version dédiés (nvm, pyenv) pour les runtimes.</p><p>Il fait toujours <code>apt update</code> avant <code>apt install</code>.</p>`,
        errors: `<p><strong>Pattern 1 — L'install de runtime via apt :</strong> <code>sudo apt install nodejs</code> → version obsolète, conflit avec nvm. Utiliser nvm pour Node.js, pas apt.</p><p><strong>Pattern 2 — L'install sans update :</strong> <code>sudo apt install X</code> sans <code>sudo apt update</code> d'abord → paquets introuvables ou version pas à jour dans le cache local.</p><p><strong>Pattern 3 — sudo pip sur le système :</strong> <code>sudo pip install</code> interagit avec Python système et peut casser des outils system critiques.</p>`,
        invariants: `<p>Un gestionnaire de paquets centralise et sécurise les installations — la source est auditée, les dépendances sont résolues, la désinstallation est propre. <strong>Ce qui change : le gestionnaire de paquets, apt, dnf, pacman ou Homebrew. Ce qui ne change pas : le besoin d'un registre central et d'une résolution automatique des dépendances système.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Toujours update avant install" },
            { type: "cmd", value: "sudo apt update" },
            { type: "comment", value: "Paquets essentiels pour le dev" },
            { type: "cmd", value: "sudo apt install -y curl git build-essential python3 python3-pip python3-venv" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "apt --version" },
            { type: "comment", value: "Mise à jour du système" },
            { type: "cmd", value: "sudo apt update && sudo apt upgrade -y" }
          ],
          verification: "apt --version doit répondre, et sudo apt update doit synchroniser les dépôts sans erreur critique.",
          debt: "Ne jamais installer Node.js via apt. Utiliser nvm. Ne jamais pip install --system."
        },
        verification: [
          "Pourquoi apt est-il adapté aux paquets système mais pas forcément aux runtimes modernes comme Node.js ?",
          "Tu lances apt install sans apt update depuis longtemps : quel type d'erreur ou de version obsolète peux-tu rencontrer ?",
          "Ce qui change entre apt, dnf et pacman, et ce qui ne change pas dans le rôle d'un gestionnaire de paquets ?"
        ]
      }
    },
    homebrew: {
      id: "homebrew",
      label: "Homebrew",
      icon: "🍺",
      kind: "infra",
      osLabel: "macOS uniquement",
      niveau: "Fondation",
      sections: {
        why: `<p>macOS ne vient pas avec un gestionnaire de paquets système pour les outils en ligne de commande. Installer un CLI impliquait de trouver le binaire, le télécharger, le placer dans le bon PATH... <strong>Homebrew a résolu ça en apportant un gestionnaire de paquets moderne sur macOS</strong> — une commande, un outil, une source de vérité.</p>`,
        system: `<p>Homebrew est <strong>l'infrastructure d'installation sur macOS</strong>. Git, Python, nvm, les CLIs — tout passe par Homebrew. Il gère aussi les applications GUI via <code>--cask</code>. Sans Homebrew, chaque outil s'installe via un process différent, souvent manuel.</p><p>Il dépend des Command Line Tools (CLT) — ils doivent être installés en premier.</p>`,
        choice: {
          kind: "structured",
          main: `Homebrew n'a pas de vraie alternative sérieuse sur macOS aujourd'hui :`,
          alternatives: [
            { name: "Homebrew", description: "Standard absolu. Communauté énorme, formules à jour, intégration propre." },
            { name: "MacPorts", description: "Plus ancien, moins populaire, installe dans /opt/local. Moins de formules. Pas de raison de choisir." },
            { name: "Nix", description: "Gestion fonctionnelle et reproductible des paquets. Puissant, complexe. Pour des setups avancés." }
          ]
        },
        senior: `<p>Il fait la distinction entre <code>brew install</code> (CLIs, outils en ligne de commande) et <code>brew install --cask</code> (applications GUI comme VS Code, Firefox, Docker Desktop).</p><p>Il connaît <code>brew doctor</code> — commande de diagnostic qui révèle les problèmes de configuration. Et il maintient son install avec <code>brew update && brew upgrade</code> régulièrement.</p>`,
        errors: `<p><strong>Pattern 1 — Le mélange des sources :</strong> installer Homebrew ET télécharger manuellement certains outils. Les deux finissent dans le PATH avec des priorités imprévisibles.</p><p><strong>Pattern 2 — L'install sans update :</strong> ne pas lancer <code>brew update</code> depuis longtemps → formules obsolètes, versions trop vieilles, dépendances manquantes lors des nouvelles installations.</p><p><strong>Pattern 3 — Le PATH ignoré :</strong> installer Homebrew correctement mais ne pas appliquer les lignes "Next steps" → brew existe, mais le shell ne le trouve pas.</p>`,
        invariants: `<p>Tout OS de dev sérieux a besoin d'un gestionnaire de paquets. <strong>Ce qui change : l'outil spécifique à l'OS, Homebrew, apt, dnf ou pacman. Ce qui ne change pas : un registre central de logiciels, des dépendances résolues automatiquement, et une source de vérité unique.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` },
            { type: "comment", value: `Après installation, suivre les instructions "Next steps" dans le terminal` },
            { type: "cmd", value: "brew doctor" },
            { type: "cmd", value: "brew --version" },
            { type: "comment", value: "Usage" },
            { type: "cmd", value: "brew install git" },
            { type: "cmd", value: "brew install --cask visual-studio-code" },
            { type: "cmd", value: "brew update && brew upgrade" }
          ],
          verification: "brew doctor doit ne signaler aucun problème bloquant, et brew --version doit répondre depuis un nouveau terminal.",
          debt: "brew update && brew upgrade à lancer régulièrement. brew cleanup pour libérer de l'espace."
        },
        verification: [
          "Pourquoi Homebrew doit-il être la source de vérité principale des outils CLI sur macOS ?",
          "Tu installes un outil à la main puis via brew : quel problème de PATH peux-tu créer ?",
          "Ce qui change entre Homebrew et apt, et ce qui ne change pas dans leur rôle systémique ?"
        ]
      }
    },
    clt: {
      id: "clt",
      label: "CLT Xcode",
      icon: "🛠",
      kind: "infra",
      osLabel: "macOS uniquement",
      niveau: "Fondation",
      sections: {
        why: `<p>macOS ne vient pas avec les compilateurs et outils Unix de base (clang, gcc, make, ld). Apple les sépare dans les "Command Line Tools" pour Xcode. <strong>Sans eux, Homebrew ne peut pas compiler les paquets, et de nombreux outils de dev refusent de s'installer.</strong> C'est la fondation silencieuse de tout l'environnement de dev macOS.</p>`,
        system: `<p>Les CLT sont la couche la plus basse de l'environnement macOS. <strong>Homebrew en dépend. Git en dépend (version Apple fournie). C'est la première chose à installer — tout le reste vient après.</strong> Ils fournissent les toolchains de compilation, les headers système, et les utilitaires de base.</p>`,
        choice: {
          kind: "structured",
          main: `CLT seuls vs Xcode complet — une question de besoin réel :`,
          alternatives: [
            { name: "CLT seuls (recommandé)", description: "Légers (~1GB), suffisants pour 99% du dev web/backend/mobile JS. Téléchargement rapide." },
            { name: "Xcode complet", description: "10GB+. Nécessaire UNIQUEMENT pour dev iOS/macOS natif (Swift, Objective-C). Pas pour le web." }
          ]
        },
        senior: `<p>Après chaque <strong>upgrade majeur de macOS</strong>, les CLT peuvent se retrouver invalides — Apple les lie à la version d'OS. Si des outils de build cessent de fonctionner après une mise à jour macOS, c'est souvent là qu'il faut chercher.</p><p><code>xcode-select --install</code> est une commande à connaître par cœur. Simple, rapide, résout 80% des problèmes de toolchain.</p>`,
        errors: `<p><strong>Pattern 1 — L'Xcode inutile :</strong> installer Xcode complet alors qu'on ne développe pas pour iOS → 10GB occupés, mise à jour longue à chaque macOS, sans bénéfice réel.</p><p><strong>Pattern 2 — L'upgrade OS non suivi :</strong> mettre à jour macOS sans vérifier que les CLT suivent → outils de build cassés silencieusement, erreurs cryptiques lors des installations npm ou brew.</p><p><strong>Pattern 3 — Le diagnostic oublié :</strong> réinstaller des dépendances au hasard alors que <code>xcode-select -p</code> aurait montré que la toolchain Apple est absente ou cassée.</p>`,
        invariants: `<p>Tout OS a besoin d'une couche de compilateurs et d'outils de bas niveau pour construire des logiciels. <strong>Ce qui change : la source de la toolchain, Apple CLT, GCC ou MSVC. Ce qui ne change pas : le besoin d'une toolchain de compilation disponible avant d'installer des paquets qui compilent du natif.</strong></p>`,
        practice: {
          commands: [
            { type: "cmd", value: "xcode-select --install" },
            { type: "comment", value: "Une fenêtre graphique s'ouvre pour confirmer l'installation" },
            { type: "cmd", value: "xcode-select -p" },
            { type: "comment", value: "Si problème après update macOS" },
            { type: "cmd", value: "sudo rm -rf /Library/Developer/CommandLineTools" },
            { type: "cmd", value: "xcode-select --install" }
          ],
          verification: "xcode-select -p doit retourner un chemin existant vers les Command Line Tools.",
          debt: "Vérifier après chaque mise à jour majeure de macOS. xcode-select -p doit retourner un path."
        },
        verification: [
          "Pourquoi les CLT sont-ils une fondation silencieuse plutôt qu'un outil que tu utilises directement chaque jour ?",
          "Après une mise à jour macOS, brew et npm échouent sur des builds natifs : quelle hypothèse dois-tu vérifier en premier ?",
          "Ce qui change entre CLT, GCC et MSVC, et ce qui ne change pas dans le besoin de compilation ?"
        ]
      }
    },
    shell: {
      id: "shell",
      label: "Shell",
      icon: ">_",
      kind: "infra",
      osLabel: "macOS / Linux",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Le shell est l'interface entre le développeur et l'OS. Il interprète les commandes, gère les pipes, les redirections, les variables d'environnement, les scripts. <strong>C'est le langage de la machine — ce que les interfaces graphiques cachent, le shell l'expose directement.</strong></p>`,
        system: `<p>Tout ce qui se passe dans le terminal passe par le shell. Le <strong>PATH</strong> (où l'OS cherche les binaires), les alias, les exports de variables d'environnement — tout est configuré dans le fichier de config du shell (<code>.zshrc</code>, <code>.bashrc</code>).</p><p>nvm, Homebrew, et la plupart des CLIs s'installent en ajoutant des lignes dans ce fichier. <strong>Le shell est le point de convergence de tout le tooling.</strong></p>`,
        choice: {
          kind: "structured",
          main: `Le shell est dicté par l'OS par défaut, mais configurable :`,
          alternatives: [
            { name: "zsh (recommandé macOS)", description: "Défaut sur macOS depuis Catalina. Plus de features que bash, oh-my-zsh, plugins. Standard moderne." },
            { name: "bash", description: "Universel, présent sur tout Unix. Plus compatible, moins de features. Défaut sur Linux." },
            { name: "fish", description: "Syntax différente (non-POSIX), autocomplétion très avancée. Incompatible avec certains scripts bash. Pour plus tard." },
            { name: "nushell", description: "Shell structuré ultra-moderne. Rupture complète avec le paradigme texte. Expérimental en prod." }
          ]
        },
        senior: `<p>Il sait exactement ce qu'il y a dans son <code>.zshrc</code>/<code>.bashrc</code>. <strong>Chaque ligne a une raison d'être documentée.</strong> Il versionne ce fichier (dotfiles dans un repo Git) pour retrouver son environnement sur n'importe quelle machine.</p><p>Il comprend la différence entre <code>.zshrc</code> (shell interactif) et <code>.zprofile</code> (shell de login) — confondre les deux crée des bugs subtils selon comment le terminal est lancé.</p>`,
        errors: `<p><strong>Pattern 1 — Le copier-coller aveugle :</strong> copier des lignes dans <code>.zshrc</code> depuis Stack Overflow sans comprendre. Résultat : PATH corrompu, outils introuvables, shell lent à démarrer.</p><p><strong>Pattern 2 — oh-my-zsh sans entretien :</strong> installer 30 plugins oh-my-zsh et ne jamais les auditer → shell qui met 3 secondes à démarrer. Moins c'est plus.</p><p><strong>Pattern 3 — Modifier PATH sans comprendre :</strong> ajouter des chemins dans le mauvais ordre peut "cacher" des binaires système par d'autres, créant des comportements inattendus.</p>`,
        invariants: `<p>Le shell est la couche d'automatisation fondamentale. <strong>Ce qui change : le shell, bash, zsh, fish ou nushell, et sa syntaxe. Ce qui ne change pas : le besoin d'une interface scriptable avec l'OS, le PATH, les variables d'environnement et les commandes réelles.</strong></p>`,
        practice: {
          commands: [
            { type: "comment", value: "Vérifier le shell actuel" },
            { type: "cmd", value: "echo $SHELL" },
            { type: "comment", value: "Installer zsh (Linux)" },
            { type: "cmd", value: "sudo apt install -y zsh" },
            { type: "cmd", value: "chsh -s $(which zsh)" },
            { type: "comment", value: "Recharger la config après modification" },
            { type: "cmd", value: "source ~/.zshrc" },
            { type: "comment", value: "oh-my-zsh (optionnel)" },
            { type: "cmd", value: `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"` }
          ],
          verification: "echo $SHELL doit afficher le shell attendu, et source ~/.zshrc ne doit pas produire d'erreur.",
          debt: `Versionner .zshrc dans un repo "dotfiles". Documenter chaque ajout avec un commentaire.`
        },
        verification: [
          "Pourquoi modifier le shell sans comprendre le PATH peut-il casser tout l'environnement de dev ?",
          "Tu copies une ligne dans .zshrc et node disparaît du terminal : quelle zone du système dois-tu inspecter ?",
          "Ce qui change entre bash, zsh et fish, et ce qui ne change pas dans le rôle du shell ?"
        ]
      }
    }
  },
  maps: {
    windows: {
      viewBox: "0 0 860 260",
      nodes: [
        { id: "wsl", x: 30, y: 90, w: 110, h: 70 },
        { id: "ubuntu", x: 180, y: 90, w: 110, h: 70 },
        { id: "git", x: 340, y: 30, w: 110, h: 70 },
        { id: "nodejs", x: 340, y: 150, w: 110, h: 70 },
        { id: "python", x: 500, y: 90, w: 110, h: 70 },
        { id: "vscode", x: 660, y: 30, w: 130, h: 70 },
        { id: "github", x: 670, y: 150, w: 110, h: 70 }
      ],
      edges: [
        { x1: 140, y1: 125, x2: 178, y2: 125, label: "héberge" },
        { x1: 290, y1: 105, x2: 338, y2: 75, label: "outils" },
        { x1: 290, y1: 145, x2: 338, y2: 175, label: "runtime" },
        { x1: 450, y1: 65, x2: 498, y2: 110, label: "coexiste" },
        { x1: 450, y1: 185, x2: 498, y2: 140, label: "scripts" },
        { x1: 610, y1: 110, x2: 658, y2: 80, label: "édite" },
        { x1: 610, y1: 120, x2: 668, y2: 170, label: "remote" },
        { x1: 450, y1: 80, x2: 658, y2: 60, label: "intègre" }
      ]
    },
    macos: {
      viewBox: "0 0 900 260",
      nodes: [
        { id: "clt", x: 20, y: 90, w: 100, h: 70 },
        { id: "homebrew", x: 170, y: 90, w: 120, h: 70 },
        { id: "git", x: 340, y: 30, w: 110, h: 70 },
        { id: "nodejs", x: 340, y: 150, w: 110, h: 70 },
        { id: "python", x: 500, y: 90, w: 110, h: 70 },
        { id: "shell", x: 500, y: 175, w: 110, h: 70 },
        { id: "vscode", x: 665, y: 30, w: 120, h: 70 },
        { id: "github", x: 665, y: 150, w: 110, h: 70 }
      ],
      edges: [
        { x1: 120, y1: 125, x2: 168, y2: 125, label: "requiert" },
        { x1: 290, y1: 105, x2: 338, y2: 70, label: "installe" },
        { x1: 290, y1: 140, x2: 338, y2: 178, label: "installe" },
        { x1: 450, y1: 65, x2: 498, y2: 105, label: "coexiste" },
        { x1: 610, y1: 110, x2: 663, y2: 75, label: "édite" },
        { x1: 610, y1: 130, x2: 663, y2: 170, label: "remote" }
      ]
    },
    linux: {
      viewBox: "0 0 820 260",
      nodes: [
        { id: "apt", x: 20, y: 90, w: 100, h: 70 },
        { id: "git", x: 170, y: 30, w: 110, h: 70 },
        { id: "nodejs", x: 170, y: 150, w: 110, h: 70 },
        { id: "python", x: 340, y: 90, w: 110, h: 70 },
        { id: "shell", x: 340, y: 175, w: 110, h: 70 },
        { id: "vscode", x: 510, y: 30, w: 120, h: 70 },
        { id: "github", x: 510, y: 150, w: 110, h: 70 }
      ],
      edges: [
        { x1: 120, y1: 105, x2: 168, y2: 70, label: "installe" },
        { x1: 120, y1: 140, x2: 168, y2: 175, label: "runtime" },
        { x1: 280, y1: 65, x2: 338, y2: 110, label: "coexiste" },
        { x1: 450, y1: 110, x2: 508, y2: 75, label: "édite" },
        { x1: 450, y1: 125, x2: 508, y2: 175, label: "remote" }
      ]
    }
  }
};
