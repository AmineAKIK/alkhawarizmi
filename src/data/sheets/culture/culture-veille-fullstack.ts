import { cultureSheet } from "./culture-common";

export const cultureVeilleFullstack = cultureSheet({
  id: "culture-F15",
  number: 15,
  title: "Veille Technologique Fullstack Web",
  subtitle:
    "Quoi surveiller précisément — UI, langages serveur, bases de données, déploiement et sécurité — en tant que développeur web ou mobile",
  badge: "Fiche F15",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description:
    "Savoir qu'il faut faire de la veille ne suffit pas — il faut savoir sur quoi. Un développeur fullstack web et mobile touche à des domaines très différents : interfaces utilisateur, langages côté serveur, bases de données, architecture, déploiement. Chaque domaine évolue à son rythme, avec ses sources propres et ses signaux spécifiques. Cette fiche cartographie les points de surveillance concrets pour chaque couche de la stack, sans refaire la méthode générale déjà couverte dans la fiche sur la veille informatique.",
  accent: "processus",

  nodes: {
    veilleCertSecurite: {
      id: "veilleCertSecurite",
      label: "CERT-FR et veille sécurité appliquée",
      icon: "🛡",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une CVE (Common Vulnerabilities and Exposures) publiée sur une dépendance critique peut passer de "découverte" à "exploitation active" en moins de 48 heures. Un développeur qui découvre la vulnérabilité via un article de blog 3 semaines après sa publication a laissé une fenêtre d'exposition inutile. Le CERT-FR est l'organisme gouvernemental français qui centralise et publie les alertes de sécurité sur les technologies — c'est une source primaire, officielle et ciblée, qui complète les outils automatisés de surveillance des dépendances.</p>`,
        system: `<p>La veille sécurité s'inscrit dans le système général de veille <span class="ref-fiche">→ F02</span> comme source primaire de premier niveau — elle précède les agrégateurs et ne peut pas être remplacée par eux. Elle alimente directement la sécurité applicative <span class="ref-fiche">→ P02</span> et la protection cybersécurité <span class="ref-fiche">→ F10</span>. Le CERT-FR est l'interlocuteur institutionnel de la CNIL <span class="ref-fiche">→ F13</span> pour les incidents de sécurité impliquant des données personnelles.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le CERT-FR et la veille sécurité pour développeurs :</p>
<p><strong>Le CERT-FR (cert.ssi.gouv.fr) :</strong> le Centre gouvernemental de veille, d'alerte et de réponse aux attaques informatiques, rattaché à l'ANSSI (Agence Nationale de la Sécurité des Systèmes d'Information). Il publie des bulletins de sécurité classés par criticité (critique, élevé, moyen, faible), des alertes de vulnérabilités sur les logiciels et systèmes courants, des avis de sécurité sur les menaces actives, et des guides pratiques de sécurisation. Fréquence de publication : plusieurs fois par semaine. Format : bulletins structurés avec référence CVE, produits affectés, versions concernées, et recommandations. Le flux RSS du CERT-FR est une source primaire de niveau 1 à intégrer dans tout système de veille sécurité professionnel.</p>
<p><strong>NVD et CVE (nvd.nist.gov) :</strong> la National Vulnerability Database américaine recense toutes les CVE avec un score CVSS (Common Vulnerability Scoring System) de 0 à 10. Le score tient compte de la facilité d'exploitation, de l'impact, et de la nécessité d'un accès réseau ou local. Score ≥ 9 : critique. Score 7-8.9 : élevé. Un score CVSS ne dit pas si une vulnérabilité vous affecte — il dit à quel point elle est sévère dans le pire cas. Il faut croiser avec votre stack réelle.</p>
<p><strong>Surveillance automatisée des dépendances :</strong> les outils automatiques (Dependabot sur GitHub, Snyk, socket.dev) détectent les CVE dans les dépendances directes et transitives de vos projets. Ils créent des PRs ou des alertes quand une nouvelle vulnérabilité est publiée. Pour un projet JavaScript : activer GitHub Dependabot alerts (Settings → Security → Dependabot). Pour Python : pip-audit ou Safety. Ces outils ne remplacent pas la veille manuelle mais couvrent le suivi des dépendances directes et transitives de façon continue.</p>
<p><strong>Sources complémentaires pour les développeurs web :</strong> OWASP (owasp.org) : le Top 10 des vulnérabilités web les plus critiques, mis à jour tous les 2-3 ans, avec guides de prévention par technologie. Snyk Vulnerability DB (security.snyk.io) : CVE avec exemples de code vulnérable et correctifs. PortSwigger Web Security Blog (portswigger.net/research) : recherche sur les vulnérabilités web (XSS, SQLi, SSRF) avec proof of concept. HackerOne Hacktivity (hackerone.com/hacktivity) : rapports de bug bounty rendus publics, cas réels de vulnérabilités exploitées sur des services connus.</p>
<p><strong>Ce qu'il faut surveiller selon sa stack :</strong> frameworks frontend (alertes XSS, prototype pollution dans les librairies npm populaires), runtimes serveur (Node.js, Python — alertes sur les versions LTS), bases de données (PostgreSQL, MongoDB — vulnérabilités d'injection et de contournement d'authentification), outils de déploiement (Docker, Kubernetes, GitHub Actions — injections de secrets, escalade de privilèges), infrastructure cloud (AWS, GCP — alertes sur les configurations IAM et les services managés).</p>`,
        },
        senior: `<p>Un développeur expérimenté distingue la veille réactive (surveiller les CVE de son stack) de la veille proactive (comprendre les classes de vulnérabilités avant qu'elles touchent ses outils). Lire les write-ups des CTF (Capture The Flag) et les rapports de bug bounty publics sur HackerOne développe une intuition sur les surfaces d'attaque — ce qui permet d'identifier des vulnérabilités potentielles dans son propre code avant qu'un chercheur ou un attaquant ne les trouve.</p>`,
        errors: `<p><strong>Pattern 1 — Surveiller uniquement les dépendances directes :</strong> ignorer les vulnérabilités dans les dépendances transitives (les dépendances de ses dépendances). Log4Shell (CVE-2021-44228) a touché des milliers d'applications parce que log4j était une dépendance transitive non visible dans le package.json ou requirements.txt de premier niveau. Les outils automatisés comme Dependabot analysent l'arbre complet.</p>
<p><strong>Pattern 2 — Patcher immédiatement toute CVE sans évaluation contextuelle :</strong> déclencher une urgence sur chaque CVE élevée sans vérifier si la configuration expose réellement la fonctionnalité vulnérable. Une CVE CVSS 9.0 sur un module réseau d'une librairie n'est pas urgente si ce module n'est pas utilisé dans votre application. Évaluer l'exposition réelle avant de prioriser.</p>
<p><strong>Pattern 3 — Ne pas tester les patches de sécurité :</strong> appliquer une mise à jour de sécurité en production sans passer par un environnement de test. Les patches de sécurité introduisent parfois des régressions ou des breaking changes. Une procédure de staging avant production reste obligatoire même pour les mises à jour urgentes.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les vulnérabilités spécifiques de chaque année, les outils de surveillance (Snyk, Dependabot, Trivy évoluent), les nouveaux vecteurs d'attaque sur les chaînes CI/CD. <strong>Ce qui ne change pas :</strong> la nécessité d'une source primaire officielle (CERT-FR) pour les alertes de sécurité ; le score CVSS comme métrique de sévérité ; l'évaluation contextuelle avant priorisation d'un patch ; la surveillance des dépendances transitives.</p>`,
        practice: {
          exercices: [
            {
              titre: "Configurer une veille sécurité minimale pour un projet",
              etapes: [
                "Ajoute le flux RSS du CERT-FR (cert.ssi.gouv.fr/feed/rss/) à ton agrégateur de veille. Configure un filtre sur les technologies de ta stack (Node.js, PHP, PostgreSQL, Docker, etc.).",
                "Sur un projet GitHub actif, vérifie que Dependabot est activé : Settings → Security → Dependabot alerts → Enable. Ouvre la liste des alertes actuelles si elles existent.",
                "Sur nvd.nist.gov/vuln/search, cherche le nom d'une de tes dépendances principales et filtre les CVE des 6 derniers mois. Y a-t-il des vulnérabilités que tu n'avais pas détectées via Dependabot ?",
                "Identifie la CVE la plus critique dans tes dépendances actuelles. Évalue : ta configuration expose-t-elle la fonctionnalité vulnérable ? Si oui, quel est le délai de mitigation raisonnable ?",
              ],
              output:
                "Veille sécurité configurée : flux CERT-FR + Dependabot actif + audit NVD manuel + analyse de la CVE la plus critique identifiée.",
              critere:
                "L'analyse de la CVE critique doit conclure sur l'exposition réelle — pas seulement sur le score CVSS. Un score élevé ne justifie pas une urgence si la surface d'attaque n'est pas exposée.",
            },
          ],
          piege:
            "Croire que les outils automatiques de surveillance des dépendances (Dependabot, Snyk) couvrent l'intégralité de la veille sécurité. Ces outils détectent les CVE dans les librairies de code — ils ne couvrent pas les vulnérabilités de configuration, les erreurs d'architecture, ni les menaces émergentes qui n'ont pas encore de CVE. La veille manuelle du CERT-FR et d'OWASP complète ce que les outils ne peuvent pas voir.",
        },
        verification: [
          "Quelle est la différence entre le CERT-FR et Dependabot en termes de ce qu'ils surveillent et de ce qu'ils signalent ? Dans quelle situation l'un est indispensable sans l'autre ?",
          "Une CVE CVSS 9.8 est publiée pour une librairie d'authentification que vous utilisez, affectant la version 2.3.x. Votre application utilise la version 2.3.7 mais vous avez désactivé le endpoint vulnérable via la configuration. Quelle est votre décision de priorisation et comment la justifiez-vous ?",
          "Log4Shell a touché des milliers d'applications qui n'utilisaient pas log4j directement. Expliquez le mécanisme (dépendances transitives) et pourquoi un audit de dépendances de premier niveau aurait manqué cette vulnérabilité.",
        ],
      },
    },

    veilleInterfacesLangages: {
      id: "veilleInterfacesLangages",
      label: "Veille UI et langages serveur",
      icon: "🖥",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les interfaces utilisateur web et les langages côté serveur sont les deux domaines qui évoluent le plus vite dans la stack fullstack — et dans des directions souvent opposées. Côté frontend, le rythme d'émergence de nouveaux frameworks, outils de build et standards CSS force une veille permanente sous peine d'utiliser des approches dépassées. Côté serveur, les évolutions sont plus lentes mais les enjeux de performance, de sécurité et d'outillage sont critiques. Ne pas distinguer ces deux rythmes produit une veille soit épuisante (tout surveiller au même niveau), soit lacunaire.</p>`,
        system: `<p>La veille sur les interfaces et les langages serveur s'inscrit dans le système général de veille <span class="ref-fiche">→ F02</span> comme couche de surveillance spécialisée. Elle informe directement les choix d'environnement de développement <span class="ref-fiche">→ T01</span>, d'architecture applicative <span class="ref-fiche">→ T03</span>, et de frontend <span class="ref-fiche">→ T08</span>. Elle dialogue avec la veille sécurité <span class="ref-fiche">→ veilleCertSecurite</span> pour les vulnérabilités spécifiques aux runtimes.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quoi surveiller côté frontend et interfaces :</p>
<p><strong>Standards web natifs (W3C, WHATWG) :</strong> les navigateurs implémentent régulièrement de nouvelles API et features CSS/HTML. Sources primaires : MDN Web Docs (developer.mozilla.org) — la référence de facto sur les API web avec indication de support navigateur. caniuse.com — compatibilité des features par navigateur. web.dev (blog de l'équipe Chrome) — articles sur les nouvelles API, les performances web, les bonnes pratiques. CSS-Tricks et Smashing Magazine pour les patterns d'interface. Fréquence : mensuelle. Ce qu'on surveille : nouvelles propriétés CSS (container queries, has(), nesting), nouvelles API JavaScript (View Transitions, Web Components, Temporal), évolutions du modèle de performance (LCP, CLS, INP). Pourquoi c'est important : une feature native bien supportée remplace souvent une librairie tierce — réduisant la taille du bundle et la surface d'attaque.</p>
<p><strong>Frameworks et librairies frontend :</strong> React (react.dev), Vue (vuejs.org), Angular (angular.io), Svelte (svelte.dev) — surveiller les release notes des versions majeures, pas chaque patch. Astro, Next.js, Nuxt, SvelteKit pour les méta-frameworks. La source signal/bruit la plus fiable : le blog officiel du framework + les RFC (Request for Comments) pour anticiper les évolutions avant qu'elles n'arrivent. Ce qu'on surveille : ruptures de compatibilité (breaking changes), nouvelles primitives de gestion d'état, évolutions du système de routing, nouveaux paradigmes de rendu (SSR, SSG, ISR, streaming). À éviter : surveiller chaque nouveau "framework CSS révolutionnaire" sans critère de maturité.</p>
<p><strong>Outils de build et DX :</strong> Vite, esbuild, Turbopack, Rspack — la consolidation est en cours après l'ère webpack. Surveiller les sorties majeures de Vite et l'adoption de Turbopack. TypeScript (typescriptlang.org/docs/handbook/release-notes/) — chaque version mineure apporte des features importantes. Node.js LTS releases calendar — les versions LTS ont des cycles de support documentés (nodejs.org/en/about/previous-releases). Biome, ESLint, Prettier — évolutions des outils de qualité de code.</p>
<p><strong>Côté serveur — langages et runtimes :</strong> Node.js : blog officiel (nodejs.org/en/blog) + changelog pour les versions LTS. Les décisions LTS (Long Term Support) déterminent ce qui est utilisable en production avec garantie de support. Python : Python Insider (blog.python.org) pour les releases, PEP (Python Enhancement Proposals) pour les évolutions du langage. PHP (php.watch) pour les évolutions de PHP 8.x. Go, Rust — pour les développeurs qui les utilisent, les changelogs officiels sont suffisamment concis pour être lus intégralement. Deno, Bun — surveiller la progression de la compatibilité avec l'écosystème Node.js avant d'envisager une migration. Ce qu'on surveille : fin de support des versions (EOL — End of Life), nouvelles features de performance (workers, streams, async hooks), vulnérabilités critiques sur les runtimes.</p>`,
        },
        senior: `<p>Un développeur expérimenté fait sa veille frontend en lisant les PR et issues des frameworks qu'il utilise, pas uniquement les annonces officielles. Les discussions sur les RFC de React, les issues de Vue ou les discussions de design de Next.js révèlent les directions prises 6 à 12 mois avant les sorties officielles. C'est là que se trouvent les signaux faibles sur ce qui va changer — et le temps de s'adapter avant que le changement ne soit une urgence.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre popularité et pertinence :</strong> surveiller les frameworks les plus mentionnés sur les réseaux sociaux plutôt que ceux qui résolvent les problèmes de son contexte. Un framework avec 50 000 étoiles GitHub n'est pas forcément adapté à une équipe de 2 développeurs qui maintient une application B2B avec des contraintes d'accessibilité et de SEO.</p>
<p><strong>Pattern 2 — Migrer sur chaque nouvelle version majeure immédiatement :</strong> mettre à jour vers la dernière version majeure d'un framework ou runtime dès sa sortie sans attendre la stabilisation de l'écosystème (plugins, librairies tierces compatibles, retours d'expérience en production). Les premières versions majeures ont souvent des régressions corrigées dans les x.0.1 et x.0.2. Attendre la première version corrective mineure avant de migrer en production est une règle empirique pertinente.</p>
<p><strong>Pattern 3 — Ignorer les dates de fin de support (EOL) :</strong> ne pas surveiller les calendriers de fin de support des runtimes et frameworks utilisés en production. Node.js 16 est EOL depuis septembre 2023 — une application qui tourne sur Node.js 16 en 2024 ne reçoit plus de patches de sécurité. Les dates EOL sont publiées sur endoflife.date pour toutes les technologies majeures.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les frameworks dominants (Angular → React → Vue → Svelte → Astro...), les outils de build (webpack → Vite/esbuild/Turbopack), les paradigmes de rendu (SPA → SSR → SSG → streaming RSC). <strong>Ce qui ne change pas :</strong> la distinction entre standard natif (durable) et framework (volatil) ; la valeur des RFC pour anticiper les évolutions ; l'importance des cycles LTS/EOL pour les décisions de production ; la règle d'attendre la stabilisation avant de migrer.</p>`,
        practice: {
          exercices: [
            {
              titre: "Auditer les versions de sa stack et identifier les risques EOL",
              etapes: [
                "Liste les versions exactes des technologies de ta stack : runtime (Node.js, Python, PHP...), framework principal, 3 à 5 dépendances critiques.",
                "Pour chaque technologie, vérifie sa date EOL sur endoflife.date. Identifie celles qui sont déjà EOL ou dont le support se termine dans les 6 prochains mois.",
                "Pour les technologies encore supportées, identifie la prochaine version LTS ou majeure et sa date de sortie planifiée.",
                "Pour le framework frontend principal de ta stack, lis les dernières release notes (dernière version mineure). Identifie une feature qui aurait simplifié un problème récent.",
              ],
              output:
                "Tableau de la stack : version actuelle, statut LTS/EOL, date de fin de support, prochaine migration à planifier.",
              critere:
                "Toute technologie EOL ou en fin de support dans moins de 6 mois doit avoir une action planifiée, pas seulement identifiée.",
            },
          ],
          piege:
            "Traiter les mises à jour de frameworks comme des tâches d'amélioration optionnelles plutôt que comme des exigences de maintenance. Une dépendance EOL en production est un risque de sécurité immédiat et une dette technique qui s'accumule. Planifier les migrations avant qu'elles ne deviennent urgentes est toujours moins coûteux que de les faire dans l'urgence.",
        },
        verification: [
          "Pourquoi surveiller les RFC d'un framework front-end avant les annonces officielles est-il une stratégie de veille supérieure à suivre les compte-rendus de conférences et d'articles de blog ?",
          "Expliquez la différence entre une version LTS et une version 'Current' de Node.js en termes de durée de support et de contexte d'usage recommandé. Pour un projet de production à durée de vie de 3 ans, quelle politique de version adopter ?",
          "Un site utilise Webpack 4 (EOL), Node.js 16 (EOL), et React 17 (supporté mais ancienne version majeure). Classez ces trois risques par priorité de traitement et justifiez votre ordre.",
        ],
      },
    },

    veilleBasesDeploiement: {
      id: "veilleBasesDeploiement",
      label: "Veille BDD, composants métier et déploiement",
      icon: "🗄",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les bases de données et l'infrastructure de déploiement sont les couches qui changent le moins vite — mais dont les changements ont les conséquences les plus durables. Migrer une base de données ou reconfigurer un pipeline de déploiement prend des semaines ou des mois, pas des heures. La veille sur ces couches n'est pas pour suivre les tendances — c'est pour anticiper les migrations obligatoires (versions EOL), les nouvelles contraintes de sécurité, et les évolutions de pratiques qui améliorent structurellement la fiabilité et les performances d'une architecture.</p>`,
        system: `<p>La veille sur les bases de données et le déploiement s'appuie sur les fondamentaux de la gestion des données <span class="ref-fiche">→ T06</span> et du déploiement <span class="ref-fiche">→ T10</span>. Elle dialogue avec la veille sécurité <span class="ref-fiche">→ veilleCertSecurite</span> pour les vulnérabilités de configuration. Elle informe les choix d'architecture de production <span class="ref-fiche">→ P01</span> <span class="ref-fiche">→ P03</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quoi surveiller pour les bases de données :</p>
<p><strong>SQL — PostgreSQL, MySQL, SQLite :</strong> PostgreSQL release notes (postgresql.org/docs/release/) — nouvelles extensions, optimisations du query planner, évolutions de la réplication. Chaque version majeure apporte des features de performance (parallel query, partition pruning) ou de sécurité (row-level security, logical replication). Les versions majeures ont un cycle de support de 5 ans. La communauté PostgreSQL publie sur planet.postgresql.org. MySQL est davantage suivi via les release notes d'Oracle (blogs.oracle.com). Ce qu'on surveille : nouvelles fonctions SQL utiles (MERGE, JSON, Window functions), évolutions des types de données, changements de comportement par défaut entre versions majeures (ruptures potentielles), vulnérabilités d'injection et de contournement d'authentification.</p>
<p><strong>NoSQL — MongoDB, Redis, Elasticsearch :</strong> MongoDB Changelog (mongodb.com/docs/manual/release-notes/) — évolutions de l'opérateur de requête, nouvelles options d'indexation, atlas search. Redis (redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/) — nouvelles structures de données, évolutions des commandes de cluster. Elasticsearch — évolutions des Kibana, ingest pipelines, et breaking changes entre versions majeures (migration coûteuse). Ce qu'on surveille : nouvelles primitives de requête qui évitent du code applicatif, changements de licensing (MongoDB a changé sa licence en SSPL en 2018, Redis a changé sa licence en 2024 — surveiller ces décisions est critique si votre architecture dépend de ces services).</p>
<p><strong>Composants métier — ORMs, message queues, cache :</strong> ORM : Prisma Changelog (github.com/prisma/prisma/blob/main/CHANGELOG.md), Drizzle ORM, SQLAlchemy (sqlalchemy.org/changelog/changelog_20.html). Message queues : RabbitMQ, Apache Kafka (kafka.apache.org/documentation/#upgrade), Celery pour Python. Cache : Redis (veille de licensing en cours), Memcached. Ce qu'on surveille : évolutions des API qui créent des breaking changes lors des mises à jour, nouvelles fonctionnalités qui simplifient les patterns courants (Prisma Studio, migrations automatiques), et surtout les décisions de licensing qui peuvent affecter l'usage commercial.</p>
<p><strong>Déploiement — conteneurs, orchestration, CI/CD :</strong> Docker (docs.docker.com/engine/release-notes/) — évolutions du format des images, sécurité du daemon. Kubernetes (kubernetes.io/releases/) — cycle de release tous les 4 mois, support de 14 mois par version. Attention aux API dépréciées qui sont supprimées à chaque version majeure. GitHub Actions (github.blog/changelog/) — nouvelles actions officielles, évolutions des runners, prix et limites. Sources signal/bruit : The New Stack (thenewstack.io) pour les tendances cloud-native et Kubernetes. InfoQ Cloud pour les architectures de déploiement. Ce qu'on surveille : évolutions des pratiques de sécurité des pipelines CI/CD (secrets management, SBOM, provenance d'artefacts), nouvelles approches de déploiement (GitOps, progressive delivery), évolutions des coûts cloud selon les providers.</p>
<p><strong>Infrastructure cloud et serverless :</strong> AWS What's New (aws.amazon.com/new/), GCP Release Notes (cloud.google.com/release-notes), Azure Updates (azure.microsoft.com/en-us/updates/). Surveiller : nouvelles régions (impact sur la conformité RGPD et la latence), nouveaux services managés qui remplacent de la complexité opérationnelle, évolutions des prix, et fin de support des services existants. The Last Week in AWS (newsletter de Corey Quinn) — signal/bruit excellent sur AWS. Google Cloud blog pour les annonces GCP.</p>`,
        },
        senior: `<p>Un développeur expérimenté surveille les décisions de licensing des projets open source critiques de son infrastructure. Redis a changé sa licence en mars 2024 (BSL 1.1, non open source). MongoDB a changé en 2018 (SSPL). HashiCorp Terraform a changé en 2023 (BSL). Ces changements ont des conséquences directes sur ce que les organisations peuvent faire avec ces outils commercialement. Avoir une stratégie d'alternative (Valkey pour Redis, OpenTofu pour Terraform) avant que la migration devienne urgente est une décision de veille, pas une décision technique.</p>`,
        errors: `<p><strong>Pattern 1 — Ignorer les breaking changes des versions majeures de base de données :</strong> mettre à jour une base de données de production en lisant uniquement les nouvelles fonctionnalités et en ignorant la section "Incompatible Changes". PostgreSQL 15 a supprimé le schéma public en lecture par défaut — une migration non testée peut bloquer une application entière.</p>
<p><strong>Pattern 2 — Ne pas surveiller les évolutions de Kubernetes avant les mises à jour :</strong> mettre à jour Kubernetes sans vérifier les API dépréciées utilisées dans les manifests. Chaque version majeure de Kubernetes supprime des API dépréciées — une mise à jour sans audit des manifests peut rendre des déploiements non fonctionnels. L'outil kubectl convert et les migrations guides de chaque release note sont indispensables.</p>
<p><strong>Pattern 3 — Découvrir un changement de licensing après avoir intégré un outil :</strong> adopter un outil open source sans surveiller ses décisions de gouvernance et de licensing. La migration d'un outil profondément intégré dans l'architecture coûte bien plus cher qu'une décision anticipée. Surveiller les issues de gouvernance (changement de fondation, rachat, discussions sur le financement) est un signal précoce de risque de licensing.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les versions des bases de données et leurs features, les outils d'orchestration dominants, les pratiques de CI/CD, les prix cloud. <strong>Ce qui ne change pas :</strong> la nécessité de surveiller les calendriers EOL et les breaking changes avant les mises à jour de production ; la valeur des release notes des projets critiques lues avant chaque migration ; le risque de licensing comme critère de choix d'outil durable.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire un tableau de bord de veille pour sa stack de déploiement",
              etapes: [
                "Liste les composants de ton infrastructure de déploiement : base de données, ORM, runtime, conteneur, orchestrateur, CI/CD, provider cloud. Pour chaque composant, note la version en production.",
                "Pour chaque composant, identifie la source officielle des release notes et ajoute-la à ton agrégateur de veille (flux RSS ou newsletter).",
                "Vérifie sur endoflife.date les dates EOL de chaque composant. Identifie ceux dont le support se termine dans moins de 12 mois.",
                "Cherche les breaking changes de la prochaine version majeure de ta base de données principale. Y en a-t-il qui affecteraient ton application actuelle ?",
              ],
              output:
                "Tableau de veille : composant, version production, source de suivi, date EOL, risque de breaking change identifié.",
              critere:
                "Chaque composant doit avoir une source de suivi configurée — pas seulement identifiée. Un composant sans source de suivi active est un angle mort.",
            },
          ],
          piege:
            "Traiter les bases de données et l'infrastructure comme des composants stables qui ne nécessitent pas de veille active. Redis a changé de licence, HashiCorp Terraform a changé de licence, Elasticsearch a changé de licence — ces décisions ont obligé des milliers d'équipes à des migrations imprévues et coûteuses. La veille sur la gouvernance est aussi importante que la veille sur les features.",
        },
        verification: [
          "Pourquoi un changement de licence d'un composant open source (comme Redis BSL en 2024) est-il un signal de veille critique pour une équipe de développement, et quelles actions préventives permettent de gérer ce risque ?",
          "Kubernetes publie une nouvelle version majeure tous les 4 mois et supprime les API dépréciées dans chaque version. Décrivez le processus de veille et de mise à jour qui permet de maintenir un cluster à jour sans risque de régression.",
          "Quelle est la différence entre surveiller les release notes d'une base de données pour les nouvelles fonctionnalités versus les surveiller pour les incompatibilités entre versions, et pourquoi la seconde catégorie est-elle plus critique pour une application en production ?",
        ],
      },
    },

    organiserVeilleFullstack: {
      id: "organiserVeilleFullstack",
      label: "Organiser sa veille fullstack",
      icon: "🗺",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un développeur fullstack web/mobile touche à 8 à 12 domaines technologiques distincts. Surveiller chacun au même niveau de fréquence et d'attention est physiquement impossible. La solution n'est pas de tout ignorer ni de tout lire — c'est de calibrer la fréquence et la profondeur de surveillance selon la nature de chaque couche (rythme de changement, impact des migrations, risque de sécurité) et selon sa stack réelle. Une heure hebdomadaire bien structurée couvre l'essentiel.</p>`,
        system: `<p>Ce nœud synthétise les trois nœuds précédents de cette fiche <span class="ref-fiche">→ veilleCertSecurite</span> <span class="ref-fiche">→ veilleInterfacesLangages</span> <span class="ref-fiche">→ veilleBasesDeploiement</span> en un système opérationnel. Il s'appuie sur la méthode générale de veille <span class="ref-fiche">→ F02</span> pour la structure, et la spécialise pour le profil fullstack. Il complète la veille sécurité <span class="ref-fiche">→ F10</span> côté développement.</p>`,
        choice: {
          kind: "free",
          html: `<p>La grille de veille fullstack calibrée par fréquence et priorité :</p>
<p><strong>Quotidien (5 minutes — automatisé) :</strong> alertes Dependabot/Snyk (CVE sur les dépendances directes et transitives). Ces alertes arrivent par email ou notification GitHub — pas besoin de les chercher. L'objectif est de ne pas les ignorer quand elles arrivent. Flux CERT-FR filtré sur sa stack — scanner les titres des bulletins, lire les détails si les technologies concernées sont dans son périmètre.</p>
<p><strong>Hebdomadaire (30 minutes — manuel) :</strong> scan des agrégateurs : Hacker News "Ask HN" et "Show HN", TLDR Tech (newsletter quotidienne mais lue en digest hebdomadaire), JavaScript Weekly ou Node Weekly selon la stack. Objectif : détecter les signaux émergents qui méritent une investigation plus poussée. Ne pas lire intégralement — scanner les titres, marquer ce qui mérite d'être lu.</p>
<p><strong>Mensuel (2 heures — profond) :</strong> release notes des technologies LTS de sa stack (Node.js, PostgreSQL, framework principal). Breaking changes de la prochaine version majeure si migration prévue. État EOL de la stack complète (endoflife.date). Un post-mortem public ou rapport d'incident d'une équipe comparable. Une RFC ou discussion en cours sur un projet clé de sa stack.</p>
<p><strong>Trimestriel (demi-journée — stratégique) :</strong> State of JavaScript / State of CSS (stateofjs.com) — sondage annuel sur l'adoption des technologies, très utile pour calibrer quelles technologies gagnent ou perdent du terrain. DB-Engines Ranking (db-engines.com/en/ranking) — tendances d'adoption des bases de données. Thoughtworks Technology Radar (thoughtworks.com/radar) — évaluation indépendante des technologies (adopt, trial, assess, hold). Objectif : remettre à jour la liste des technologies en phase d'évaluation ou d'adoption.</p>
<p><strong>Sources essentielles par domaine en synthèse :</strong> Sécurité : CERT-FR, OWASP, CVE NVD, Dependabot. Frontend/UI : MDN, caniuse.com, blog officiel du framework, web.dev. Langages serveur : blog officiel du langage, endoflife.date, release notes LTS. Bases de données : release notes officielles, DB-Engines, changelog de l'ORM. Déploiement : GitHub Actions changelog, blog Docker, Kubernetes release notes, newsletter provider cloud. Généraliste : Hacker News, Thoughtworks Radar, State of JS/CSS annuel.</p>`,
        },
        senior: `<p>Un développeur expérimenté fait sa veille de façon asymétrique : très réactive sur la sécurité (quotidien, automatisé), modérée sur les langages et frameworks (mensuel, en lecture de release notes), et stratégique sur les choix d'infrastructure (trimestriel, avec prise de recul). Cette asymétrie reflète le coût de l'inaction : une CVE non patchée peut créer un incident en 48h, une migration de framework peut être planifiée sur 3 mois, un changement de provider cloud se planifie sur 6 à 18 mois.</p>`,
        errors: `<p><strong>Pattern 1 — Homogénéiser la fréquence pour tous les domaines :</strong> appliquer la même fréquence de surveillance à la sécurité (urgence immédiate) et aux tendances architecturales (horizon de 12 à 24 mois). La conséquence : soit on surveille tout trop souvent (épuisement), soit on surveille tout trop rarement (angles morts critiques sur la sécurité).</p>
<p><strong>Pattern 2 — Ne surveiller que sa stack actuelle :</strong> limiter sa veille aux technologies déjà en production et ignorer les alternatives émergentes. Les meilleures décisions de migration se prennent avec 12 à 18 mois d'avance — cela nécessite de surveiller des technologies qu'on n'utilise pas encore, à faible fréquence mais régulièrement.</p>
<p><strong>Pattern 3 — Veille sans output documenté :</strong> lire des articles et release notes sans jamais traduire les insights en décisions documentées dans l'équipe. La veille qui ne produit pas d'ADR (Architecture Decision Record), de ticket de migration, ou de présentation en revue technique n'impacte pas les projets — elle n'existe que dans la tête du développeur qui l'a faite.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les technologies spécifiques à surveiller selon la stack de chaque développeur, les outils et formats de veille disponibles, les tendances dominantes de chaque période. <strong>Ce qui ne change pas :</strong> le principe d'asymétrie (sécurité → quotidien, langages → mensuel, stratégie → trimestriel) ; la nécessité de calibrer l'attention sur le coût de l'inaction ; la valeur de la documentation des décisions issues de la veille pour qu'elle impacte l'équipe.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire son système de veille fullstack personnalisé",
              etapes: [
                "Dresse la liste complète de ta stack : 3 à 5 technologies frontend, 2 à 3 langages/runtimes serveur, 1 à 2 bases de données, outils de déploiement. Pour chaque technologie, identifie la source officielle de release notes.",
                "Classe chaque technologie en 3 catégories de fréquence : quotidien (sécurité critique), mensuel (LTS, frameworks), trimestriel (tendances, alternatives).",
                "Configure les alertes automatiques (Dependabot, CERT-FR RSS) pour la catégorie quotidienne. Crée un onglet ou dossier de bookmarks pour les sources mensuelles.",
                "Pour la prochaine réunion d'équipe ou revue technique, prépare un point de 5 minutes sur un signal de veille récent qui impacte la stack partagée.",
              ],
              output:
                "Système de veille fullstack documenté : stack + sources + fréquence calibrée par catégorie + première action issue de la veille partagée en équipe.",
              critere:
                "Toute technologie en production sans source de suivi active est un angle mort à combler. La première action partagée en équipe transforme la veille individuelle en décision collective.",
            },
          ],
          piege:
            "Construire un système de veille exhaustif et parfait plutôt qu'un système minimal qui tient dans les contraintes réelles. 20 sources bien triées et lues régulièrement valent 100 sources ignorées. Commencer par l'essentiel (CERT-FR + Dependabot + endoflife.date + release notes de 3 technologies critiques) et enrichir progressivement selon les besoins qui se révèlent en pratique.",
        },
        verification: [
          "Pourquoi la veille sécurité doit-elle être traitée à une fréquence quotidienne alors que la veille sur les tendances architecturales peut être trimestrielle ? Expliquez ce raisonnement en termes de coût de l'inaction pour chaque catégorie.",
          "Un développeur fullstack surveille uniquement les technologies de sa stack actuelle. Identifiez un scénario concret où l'absence de veille sur des technologies alternatives crée un problème lors d'une décision de migration urgente.",
          "Une équipe fait de la veille technologique mais ne documente jamais les insights dans des ADR ou des tickets. Quel problème organisationnel cela crée-t-il, et comment la documentation de la veille transforme-t-elle une connaissance individuelle en décision collective ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 320",
      nodes: [
        { id: "veilleCertSecurite", x: 10, y: 40, w: 195, h: 65 },
        { id: "veilleInterfacesLangages", x: 10, y: 165, w: 195, h: 65 },
        { id: "veilleBasesDeploiement", x: 340, y: 100, w: 195, h: 65 },
        { id: "organiserVeilleFullstack", x: 620, y: 100, w: 185, h: 65 },
      ],
      edges: [
        { x1: 205, y1: 72, x2: 338, y2: 120, label: "alimente" },
        { x1: 205, y1: 197, x2: 338, y2: 148, label: "alimente" },
        { x1: 535, y1: 132, x2: 618, y2: 132, label: "synthétise" },
      ],
    },
  },
});
