import { coNode, coSheet } from "./collaboration-common";

export const collaborationDefisCollaboration = coSheet({
  id: "collaboration-defis-collaboration",
  number: 16,
  title: "Défis et évolution des ressources collaboratives",
  subtitle:
    "Gouvernance, durabilité, burnout des mainteneurs et tendances — ce qui menace et transforme le collaboratif",
  badge: "Fiche Co16",
  meta: ["5 nœuds"],
  readingTime: "30 min",
  description:
    "Les ressources collaboratives ne sont pas pérennes par nature — elles reposent sur des personnes qui donnent du temps, des organisations qui contribuent, et des modèles économiques qui tiennent rarement sur le long terme. Cette fiche couvre les défis structurels (burnout, gouvernance, financement) et les évolutions qui redessinent le paysage collaboratif en informatique.",
  accent: "humain",
  nodes: {
    burnoutMainteneurs: coNode({
      id: "burnoutMainteneurs",
      label: "Burnout des mainteneurs",
      icon: "🔥",
      kind: "humain",
      niveau: "Intermédiaire",
      why: "En 2022, le développeur seul de colors.js et faker.js a délibérément sabordé ses propres projets — utilisés par des millions de développeurs — après des années de maintenance gratuite sans aucune aide. En 2021, la vulnérabilité log4shell a exposé que log4j, utilisé dans des centaines de milliers de systèmes critiques, était maintenu par une poignée de bénévoles. Le burnout des mainteneurs n'est pas un problème individuel — c'est une défaillance structurelle du modèle open source qui crée des risques systémiques pour l'écosystème entier.",
      system:
        'Le burnout des mainteneurs est la manifestation humaine du déséquilibre entre consommation et contribution dans les ressources collaboratives. <span class="ref-fiche">→ Co14</span> : l\'audit de santé des dépendances (mainteneurs actifs, fréquence des commits) permet de détecter les projets à risque avant qu\'ils ne s\'effondrent. <span class="ref-fiche">→ Co15</span> : les bonnes pratiques de contribution (reports de bugs bien formés, PRs ciblées, sponsoring) sont les réponses concrètes que chaque équipe peut apporter à ce problème.',
      choice:
        "Réponses individuelles vs. réponses systémiques. Individuellement : sponsoriser financièrement les projets critiques (GitHub Sponsors, Open Collective), contribuer du code ou de la documentation, réduire le bruit (issues bien formées, pas de 'quand est-ce que ça sort ?'). Systémiquement : encourager les entreprises qui s'appuient sur l'open source à allouer du temps de développement à la contribution (modèle de Red Hat, Google, Microsoft avec des dizaines d'employés contributeurs open source). La décision pour une petite équipe : identifier les 3 dépendances les plus critiques et les sponsoriser même modestement — 10€/mois par projet est réaliste et a un impact réel pour un mainteneur solo.",
      senior:
        "Le signe qu'un projet est en burnout avant l'effondrement : les issues restent sans réponse plus de 3 mois, les PRs mergent de plus en plus lentement, le ton du mainteneur dans les issues devient plus sec. Ces signaux précèdent l'abandon de 6 à 12 mois. Un développeur expérimenté surveille ces signaux sur ses dépendances critiques et prépare des alternatives avant que l'urgence ne s'impose. La migration planifiée coûte 10 fois moins cher que la migration forcée.",
      errors: `<p><strong>Pattern 1 — Prise sans retour :</strong> L'équipe utilise des dépendances open source critiques depuis des années sans jamais contribuer, signaler de bug correctement, ni sponsoriser financièrement. Conséquence : elle contribue structurellement au burnout des mainteneurs qu'elle rend responsables de la qualité de ses propres livrables.</p><p><strong>Pattern 2 — Pression des issues :</strong> Des utilisateurs ouvrent des issues avec 'pourquoi ce bug n'est pas corrigé ?' ou 'quand sort la prochaine version ?' de façon agressive. Conséquence : le mainteneur bénévole consacre son énergie limitée à gérer l'agressivité plutôt qu'à corriger des bugs — l'attitude des utilisateurs dégrade directement la qualité du projet.</p><p><strong>Pattern 3 — Dépendance sans alternative :</strong> L'équipe ne prépare jamais d'alternative à ses dépendances critiques. Conséquence : quand le mainteneur abandonne le projet, l'équipe se retrouve à migrer en urgence depuis une lib abandonnée vers une alternative, sous pression temporelle et avec un risque de régression élevé.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les modèles de financement (GitHub Sponsors, Open Collective, Tidelift, fondations), les plateformes de contribution, la visibilité donnée aux mainteneurs selon les époques. <strong>Ce qui ne change pas :</strong> la maintenance d'un bien commun — qu'il soit un parc, une infrastructure ou une bibliothèque logicielle — requiert des ressources proportionnelles à son usage. Quand ces ressources ne suivent pas l'usage, l'effondrement est prévisible.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Identifier et soutenir les dépendances critiques à risque",
            etapes: [
              "Identifiez vos 5 dépendances les plus critiques (celles dont l'abandon bloquerait votre projet).",
              "Pour chacune, vérifiez : nombre de mainteneurs actifs (commits dans les 3 derniers mois), présence d'un lien de sponsoring, dernière release.",
              "Identifiez celle avec le plus petit nombre de mainteneurs actifs — c'est votre dépendance la plus fragile.",
              "Cherchez si cette dépendance a un compte GitHub Sponsors ou Open Collective. Si oui, soumettez une demande de sponsoring à votre responsable (même 10€/mois).",
              "Identifiez une alternative maintenue activement pour cette dépendance et documentez-la comme plan B.",
            ],
            output:
              "Audit de 5 dépendances critiques + plan de sponsoring soumis + alternative documentée pour la plus fragile.",
            critere:
              "Le plan B doit être assez détaillé pour être exécutable en une semaine — 'migrer vers X' n'est pas un plan ; 'remplacer les 3 points d'intégration A, B, C par l'API de X selon la doc de migration' en est un.",
          },
        ],
        piege:
          "Ne considérer que les dépendances directes — les dépendances transitives (dépendances de vos dépendances) sont souvent encore moins maintenues et tout aussi critiques.",
      },
      verification: [
        "Pourquoi le burnout d'un mainteneur d'une lib open source populaire crée-t-il un risque systémique pour des milliers de projets, et pas seulement un problème individuel ?",
        "Votre dépendance principale (authentification, 800k téléchargements/semaine) a un seul mainteneur actif. Les derniers commits datent de 4 mois. Il y a 23 issues ouvertes dont 2 marquées 'security'. La lib n'a pas de sponsor. Décrivez votre plan d'action sur les 30 prochains jours.",
        "En quoi le modèle de contribution de grandes entreprises (Google, Microsoft) aux projets open source qu'elles utilisent est-il dans leur intérêt propre, et pas seulement de la philanthropie ?",
      ],
    }),
    gouvernanceOuvertes: coNode({
      id: "gouvernanceOuvertes",
      label: "Gouvernance des projets ouverts",
      icon: "⚖",
      kind: "processus",
      niveau: "Intermédiaire",
      why: "Un projet open source sans gouvernance explicite est dirigé par celui qui parle le plus fort ou qui a le plus de temps. Quand le projet grandit — plus de contributeurs, plus d'utilisateurs, plus d'enjeux — l'absence de règles claires sur 'qui décide quoi' génère des conflits, des forks hostiles et des abandons. La gouvernance n'est pas de la bureaucratie — c'est le système qui permet à un projet de survivre au départ de son créateur.",
      system:
        'La gouvernance structure les prises de décision dans les ressources collaboratives, déterminant qui peut contribuer, qui peut merger, qui peut décider de la direction. <span class="ref-fiche">→ Co04</span> : les processus de décision (DACI, RFC, consentement) utilisés en équipe interne s\'appliquent aussi aux projets open source — la différence est l\'échelle et le caractère public des décisions. <span class="ref-fiche">→ Co09</span> : les pratiques agiles (RFC, rétros, décisions explicites) peuvent être adaptées à la gouvernance open source pour structurer l\'évolution des projets sans bureaucratie excessive.',
      choice:
        "Governance benevolent dictator vs. comité de mainteneurs vs. fondation. Benevolent Dictator For Life (BDFL) : une personne décide en dernier ressort (Linux/Torvalds, Python/Van Rossum jusqu'en 2018). Simple, rapide, mais fragile — que se passe-t-il si le BDFL part ? Comité de mainteneurs : un groupe restreint décide par consensus ou vote. Plus résilient, mais potentiellement lent. Fondation (Apache, Linux Foundation, CNCF) : structure légale qui gère les ressources, protège la marque et garantit la neutralité. Appropriée pour les projets à fort enjeu commercial. Pour un petit projet : documenter explicitement 'qui peut merger' est suffisant. Pour un projet avec des utilisateurs en production : un CONTRIBUTING.md avec le processus de décision est minimum.",
      senior:
        "Les projets qui forkent sont souvent le signe d'une gouvernance insuffisante — des contributeurs qui n'ont pas pu influencer la direction ont finalement créé leur propre version. Node.js / io.js en 2014 est l'exemple canonical : io.js a forké parce que les contributeurs n'avaient pas leur mot à dire dans les décisions. La réunification en 2015 a nécessité la création de la Node.js Foundation avec une gouvernance ouverte. Leçon : les forks coûtent cher à tout l'écosystème. Une gouvernance inclusive coûte moins cher à long terme.",
      errors: `<p><strong>Pattern 1 — Décisions implicites :</strong> Le projet prend des décisions importantes (changement de licence, breaking change majeur) sans processus documenté. Conséquence : les utilisateurs et contributeurs se sentent trahis, la confiance s'érode, certains forkent ou abandonnent le projet.</p><p><strong>Pattern 2 — Accès de merge non révisé :</strong> Des mainteneurs inactifs depuis 2 ans conservent les droits de merge. Conséquence : si leur compte est compromis (credential leak), un acteur malveillant peut injecter du code dans un projet utilisé par des millions de développeurs — ce scénario s'est produit plusieurs fois dans l'histoire open source.</p><p><strong>Pattern 3 — RFC sans deadline :</strong> Les propositions de changements importants restent ouvertes indéfiniment 'pour plus de discussion'. Conséquence : la paralysie par la discussion bloque l'évolution du projet pendant que l'écosystème avance — les utilisateurs migrent vers des alternatives plus dynamiques.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> le modèle de gouvernance (BDFL, comité, fondation), les outils de vote et de discussion, la formalité du processus selon la taille du projet. <strong>Ce qui ne change pas :</strong> tout projet collaboratif a besoin d'un processus explicite pour répondre à 'qui décide quoi quand les gens ne sont pas d'accord'. Sans ce processus, les conflits de gouvernance consomment l'énergie qui devrait aller au code.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Documenter la gouvernance d'un projet interne",
            etapes: [
              "Choisissez un projet ou une lib interne partagée entre plusieurs équipes.",
              "Documentez en une page : qui peut proposer des changements, qui peut les approuver, quel processus pour les breaking changes, comment les conflits sont résolus.",
              "Identifiez les décisions prises dans les 6 derniers mois qui auraient bénéficié d'un processus explicite.",
              "Pour chacune, reformulez comment le processus documenté aurait structuré la décision.",
            ],
            output:
              "Document de gouvernance d'une page + analyse de 3 décisions passées reformulées avec le processus.",
            critere:
              "Le document doit être opérationnel : une personne qui rejoint le projet doit pouvoir comprendre comment proposer et faire accepter un changement sans demander à quelqu'un.",
          },
        ],
        piege:
          "Sur-formaliser pour un petit projet — une page de CONTRIBUTING.md est suffisante pour un projet de 3 contributeurs ; une fondation ne l'est pas.",
      },
      verification: [
        "Quels sont les trois modèles de gouvernance open source et dans quels contextes chacun est-il approprié ?",
        "Un projet open source populaire (2M téléchargements/semaine) décide de changer sa licence de MIT à BUSL (Business Source License, non open source) sans consultation préalable de la communauté. Quelles sont les conséquences probables et comment une gouvernance transparente aurait-elle pu réduire le choc ?",
        "Pourquoi supprimer régulièrement les droits de merge des contributeurs inactifs est-il une pratique de sécurité autant qu'une pratique de gouvernance ?",
      ],
    }),
    financementDurable: coNode({
      id: "financementDurable",
      label: "Financement durable de l'open source",
      icon: "💰",
      kind: "organisation",
      niveau: "Avancé",
      why: "La valeur totale des logiciels open source utilisés dans le monde est estimée à des dizaines de milliards de dollars par an. La majorité de ceux qui le produisent ne sont pas rémunérés pour ce travail. Ce déséquilibre est soutenable tant que les mainteneurs sont jeunes, enthousiastes et sans contraintes familiales. Il devient insoutenable à mesure que leurs vies évoluent. Le financement durable n'est pas un problème philanthropique — c'est un problème d'infrastructure numérique dont toutes les entreprises qui utilisent l'open source sont parties prenantes.",
      system:
        'Le financement durable est la réponse systémique au burnout des mainteneurs et à la fragilité de la gouvernance bénévole. <span class="ref-fiche">→ Co15</span> : le calcul du ROI des dépendances open source est l\'argument économique pour justifier leur financement — si une lib vous économise 200h/an de développement, 10€/mois de sponsoring représente un retour de 2400% sur investissement. <span class="ref-fiche">→ Co16</span> (burnoutMainteneurs) : le financement durable est la solution structurelle au problème du burnout — il permet aux mainteneurs de traiter leur projet comme un travail rémunéré avec des limites saines.',
      choice:
        "GitHub Sponsors vs. Open Collective vs. Tidelift vs. embauche directe. GitHub Sponsors : direct, faible friction, intégré à la plateforme, mais sans structure légale (le mainteneur reçoit l'argent directement). Open Collective : transparence totale des finances, structure légale, adapté aux projets collectifs. Tidelift : modèle B2B — les entreprises paient Tidelift qui redistribue aux mainteneurs des libs qu'elles utilisent. Embauche directe : certaines grandes entreprises emploient directement des mainteneurs de leurs dépendances critiques (Google avec Chrome V8, Meta avec React). Pour une startup : GitHub Sponsors sur les 3-5 dépendances critiques. Pour une entreprise établie : Tidelift ou contribution de temps de développement.",
      senior:
        "La décision de financement la plus impactante pour une équipe n'est pas le montant — c'est la régularité. Un mainteneur préfère 20 sponsors à 10€/mois qu'un seul à 200€/mois et disparu 3 mois plus tard. La régularité permet de planifier, d'engager des co-mainteneurs, de traiter la maintenance comme un projet avec un budget. La façon de soumettre cette décision en interne : montrer que 3 dépendances critiques sont maintenues par des bénévoles, calculer le coût de remplacement si elles s'effondrent, proposer 50€/mois par projet comme assurance infrastructure.",
      errors: `<p><strong>Pattern 1 — Financement ponctuel :</strong> L'entreprise fait un don unique important lors d'un incident de sécurité médiatisé, puis oublie. Conséquence : le don résout le problème immédiat mais pas la cause — le mainteneur continue à travailler sans rémunération durable et le risque revient dans 18 mois.</p><p><strong>Pattern 2 — Attente de réciprocité :</strong> L'entreprise sponsor attend des features prioritaires, une réponse rapide à ses issues ou une visibilité dans le README en échange du financement. Conséquence : le modèle de financement crée une dépendance de favoritisme qui fragilise la neutralité du projet et décourage les autres contributeurs.</p><p><strong>Pattern 3 — Financement sans signal :</strong> L'équipe sponsorise discrètement mais ne le communique pas. Conséquence : l'effet d'entraînement (d'autres entreprises qui s'inspirent) ne se produit pas, et l'impact reste individuel plutôt que systémique.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les plateformes de financement, les modèles économiques (donation, abonnement, licence commerciale, fondation), les montants selon les contextes. <strong>Ce qui ne change pas :</strong> le travail de maintenance a une valeur économique réelle indépendante du modèle de distribution (gratuit vs. payant). Ignorer cette valeur ne la fait pas disparaître — elle se manifeste sous forme de dette de maintenance jusqu'à l'effondrement.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Construire le cas pour sponsoriser des dépendances critiques",
            etapes: [
              "Identifiez vos 3 dépendances open source les plus critiques (celles dont l'abandon vous forcerait à migrer en urgence).",
              "Pour chacune, calculez le coût de migration estimé (heures × taux journalier) si le projet était abandonné.",
              "Cherchez si elles ont un compte GitHub Sponsors ou Open Collective et quel montant de sponsoring mensuel est suggéré.",
              "Rédigez un email interne de 5 lignes qui présente : le risque (coût de migration), la solution (sponsoring), le montant proposé et le retour sur investissement.",
              "Envoyez l'email à votre responsable ou portez-le en réunion d'équipe.",
            ],
            output:
              "Calcul de ROI de 3 dépendances critiques + email de demande de sponsoring rédigé et envoyé.",
            critere:
              "Le calcul de ROI doit être suffisamment documenté pour être présenté à quelqu'un qui ne connaît pas le sujet — hypothèses explicites, chiffres justifiés.",
          },
        ],
        piege:
          "Attendre que quelqu'un d'autre prenne l'initiative — la proposition de financement doit venir de quelqu'un qui comprend la valeur de la dépendance, c'est-à-dire vous.",
      },
      verification: [
        "Pourquoi le financement régulier (mensuel, modeste) est-il structurellement plus utile pour un mainteneur qu'un don ponctuel important ?",
        "Votre entreprise utilise 8 dépendances open source critiques. Le budget total pour les sponsoriser serait de 300€/mois. Le PDG demande 'pourquoi payer pour quelque chose de gratuit ?' Construisez l'argument économique en 3 points.",
        "En quoi les licences commerciales (comme BUSL ou SSPL) sont-elles une réponse de marché au problème du financement durable, et quels problèmes elles-mêmes créent-elles pour l'écosystème ?",
      ],
    }),
    evolutionsTendances: coNode({
      id: "evolutionsTendances",
      label: "Évolution des ressources collaboratives",
      icon: "🔭",
      kind: "organisation",
      niveau: "Avancé",
      why: "Le paysage des ressources collaboratives évolue plus vite que la plupart des technologies. GitHub n'existait pas en 2007. npm n'existait pas en 2009. Stack Overflow n'existait pas en 2008. En moins de 20 ans, toute l'infrastructure sociale du développement logiciel a été reconstruite. Comprendre les tendances actuelles (IA générative, fédération, nouveaux modèles de financement) permet d'anticiper les changements qui redessinneront le paysage dans les 5 prochaines années — et d'être prêt plutôt que surpris.",
      system:
        'Les évolutions des ressources collaboratives redéfinissent les pratiques de développement à chaque cycle. <span class="ref-fiche">→ Co14</span> : les nouvelles plateformes de partage (JSR, Deno Deploy) et les nouvelles formes de documentation (générée par IA, interactive) émergent et challengent les modèles établis. <span class="ref-fiche">→ Co04</span> : l\'évolution des outils de collaboration (IA assistante dans les reviews, documentation générée, tests automatiques par IA) modifie les dynamiques d\'équipe et les rôles — anticiper ces changements permet d\'adapter sa façon de travailler.',
      choice:
        "Adopter les nouvelles tendances tôt vs. attendre la maturité. Adoption précoce : avantage compétitif, contribution à l'écosystème naissant, apprentissage des patterns avant qu'ils ne soient établis. Risque : instabilité, breaking changes fréquents, documentation insuffisante, communauté trop petite pour aider. Attente de maturité : documentation abondante, communauté large, patterns établis, moins de risque. Risque : dette de transition si la technologie s'impose. Critère de décision : adopter tôt pour les outils qui touchent votre workflow de développement (IA assistant, nouveaux gestionnaires de paquets), attendre pour les libs qui touchent votre production (nouvelles bases de données, nouveaux runtimes).",
      senior:
        "Les évolutions qui semblent révolutionnaires au moment de leur annonce se révèlent souvent incrémentales — et les évolutions incrémentales qui s'accumulent sont parfois plus transformatrices. L'IA générative dans le code (GitHub Copilot, Claude) semble révolutionnaire mais s'intègre dans des workflows existants. La vraie révolution silencieuse est peut-être le déplacement du temps de développement de 'écrire du code' vers 'reviewer du code généré' — une compétence différente qui valorise différemment les développeurs expérimentés.",
      errors: `<p><strong>Pattern 1 — FOMO technologique :</strong> L'équipe adopte chaque nouvelle tendance (Deno, Bun, edge computing, IA dans les tests) dès son annonce, sans évaluer la maturité ou la pertinence pour son contexte. Conséquence : maintenance de technologies en alpha, migrations fréquentes, dette d'apprentissage accumulée sans valeur proportionnelle.</p><p><strong>Pattern 2 — Résistance au changement :</strong> L'équipe refuse d'adopter des outils qui amélioreraient leur workflow (tests automatisés par IA, documentation interactive) parce que 'on a toujours fait comme ça'. Conséquence : productivité stagnante pendant que les équipes concurrentes accélèrent, recrutement difficile pour des développeurs qui cherchent des environnements modernes.</p><p><strong>Pattern 3 — Centralisation ignorée :</strong> L'équipe continue à dépendre de plateformes centralisées (npm, GitHub) sans réflexion sur les risques de concentration — une panne npm en 2021 a mis hors ligne des milliers de builds CI dans le monde. Conséquence : vulnérabilité aux pannes et aux politiques des plateformes sans plan de continuité.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les plateformes, les outils, les modèles économiques, les formats de collaboration (pair programming avec IA, documentation générée, review assistée). <strong>Ce qui ne change pas :</strong> les principes fondamentaux — la collaboration produit de meilleurs logiciels que le travail isolé, la confiance se construit par la réciprocité, la qualité d'une ressource commune dépend de la qualité de ses contributeurs. Ces principes ont traversé toutes les évolutions technologiques depuis les premières mailing lists.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Analyser une tendance émergente et son impact sur votre workflow",
            etapes: [
              "Choisissez une tendance émergente dans l'écosystème des ressources collaboratives (IA dans les reviews, registres de paquets décentralisés, documentation interactive, WebAssembly components).",
              "Trouvez 3 projets ou équipes qui utilisent déjà cette tendance en production et lisez leurs retours d'expérience.",
              "Identifiez les 2 avantages concrets et les 2 risques concrets pour votre contexte spécifique.",
              "Définissez un critère de maturité : 'j'adopterai cette tendance quand X' (ex: 'quand la lib principale a une version stable et plus de 500 contributeurs').",
            ],
            output:
              "Analyse de la tendance avec retours d'expérience réels + critère de maturité documenté.",
            critere:
              "Le critère de maturité doit être vérifiable objectivement — 'quand c'est assez stable' n'est pas un critère, 'quand la lib a une version 1.0 et 6 mois d'historique de releases' en est un.",
          },
        ],
        piege:
          "Évaluer une tendance sur ses promesses plutôt que sur les retours d'expérience de ceux qui l'utilisent en production — les annonces et les retours réels divergent souvent significativement.",
      },
      verification: [
        "Comment distinguer une évolution structurelle des ressources collaboratives (qui redessinera les pratiques sur 10 ans) d'un effet de mode (qui disparaîtra en 2-3 ans) — quels critères objectifs utilisez-vous ?",
        "GitHub centralise une partie significative de l'infrastructure sociale du développement open source mondial (hébergement, reviews, CI, packages). Quels scénarios de risque cette centralisation crée-t-elle, et quelles alternatives décentralisées existent actuellement ?",
        "Pourquoi les principes fondamentaux de la collaboration (réciprocité, confiance, qualité collective) ont-ils traversé toutes les évolutions technologiques sans changer, alors que les outils et les plateformes ont été complètement remplacés plusieurs fois ?",
      ],
    }),
    problematiquesSurmonter: coNode({
      id: "problematiquesSurmonter",
      label: "Problématiques à surmonter",
      icon: "🧩",
      kind: "processus",
      niveau: "Intermédiaire",
      why: "Les ressources collaboratives souffrent de problèmes récurrents qui ne se résolvent pas d'eux-mêmes : barrières à l'entrée pour les nouveaux contributeurs, harcèlement dans les communautés, exclusion systémique de certains groupes, documentation en anglais uniquement qui exclut une majorité des développeurs mondiaux. Ces problèmes ne sont pas des bugs à corriger — ce sont des choix de design communautaire qui favorisent ou découragent des catégories entières de participants.",
      system:
        'Les problématiques structurelles des ressources collaboratives déterminent qui peut y contribuer et qui en bénéficie. <span class="ref-fiche">→ Co01</span> : la confiance et la sécurité psychologique nécessaires pour contribuer dans une équipe interne sont les mêmes que pour contribuer dans une communauté open source — les communautés qui ne les cultivent pas perdent des contributeurs potentiels. <span class="ref-fiche">→ Co15</span> : les bonnes pratiques de contribution (CONTRIBUTING.md clair, \'good first issues\' bien sélectionnées, réponses bienveillantes) sont les outils concrets pour réduire les barrières à l\'entrée.',
      choice:
        "Investir dans l'accessibilité de la contribution vs. maintenir des standards élevés. Tension réelle : un processus de contribution trop strict décourage les nouveaux contributeurs ; un processus trop laxiste génère du bruit et épuise les mainteneurs. La solution n'est pas de choisir un extrême — c'est de distinguer les voies de contribution selon leur complexité. 'Good first issues' : faible barrière, accompagnement actif. Issues normales : standards habituels. Décisions architecturales : RFC, discussion, vote. Cette hiérarchie permet d'accueillir les débutants sans abaisser les standards pour les contributions critiques.",
      senior:
        "La barrière invisible la plus commune à la contribution : la peur du jugement. Un développeur junior qui veut contribuer à un projet important hésite par peur de faire 'une mauvaise PR' et d'être humilié publiquement. Cette peur est souvent justifiée par des expériences passées — des communautés où les critiques sont sans ménagement. Les mainteneurs qui veulent des contributeurs diversifiés investissent dans la bienveillance de leurs reviews, pas seulement dans la qualité technique. Un 'merci pour la PR, voici ce qui manque et comment l'améliorer' attire plus de contributeurs qu'un 'ce code est mauvais, refais-le'.",
      errors: `<p><strong>Pattern 1 — CONTRIBUTING.md inexistant :</strong> Le projet n'a aucune documentation sur comment contribuer — pas de convention de code, pas de processus de review, pas d'indication sur les types de contributions souhaitées. Conséquence : les contributeurs potentiels ne savent pas par où commencer, les PRs arrivent dans des formats incompatibles, et le mainteneur passe son temps à réorienter plutôt qu'à coder.</p><p><strong>Pattern 2 — Monoculture de contributeurs :</strong> La communauté est dominée par un groupe homogène (même pays, même background, même genre) et ses dynamiques sociales implicites excluent les différences. Conséquence : les angles morts du groupe dominant ne sont jamais questionés, des problèmes réels pour d'autres groupes ne sont jamais adressés, et la communauté se prive de perspectives qui rendraient le logiciel meilleur.</p><p><strong>Pattern 3 — Revue comme tribunal :</strong> Les reviews de PRs sont formulées comme des jugements de valeur sur le code et implicitement sur le développeur ('ce code est horrible', 'comment as-tu pu penser que c'était une bonne idée'). Conséquence : les contributeurs sensibles abandonnent, la communauté ne garde que ceux qui tolèrent l'agressivité, réduisant la diversité des perspectives.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les formes spécifiques d'exclusion selon les époques et les technologies, les outils pour les adresser (code of conduct, processus d'escalade, programmes de mentorat). <strong>Ce qui ne change pas :</strong> une communauté qui n'investit pas activement dans l'inclusion exclut par défaut — l'inclusion requiert un effort délibéré, l'exclusion se produit naturellement sans effort.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Évaluer l'accessibilité d'un projet open source",
            etapes: [
              "Choisissez un projet open source que vous utilisez et simulez le parcours d'un nouveau contributeur.",
              "Vérifiez la présence et la clarté de : CONTRIBUTING.md, Code of Conduct, 'good first issues' étiquetées, réponses aux issues récentes (ton, délai, suivi).",
              "Lisez les 10 dernières reviews de PRs fermées (acceptées et refusées). Notez le ton et la constructivité des commentaires.",
              "Identifiez 3 barrières concrètes qui rendraient votre première contribution difficile.",
              "Proposez une amélioration concrète à l'une de ces barrières sous forme d'issue ou de PR (documentation, étiquetage d'issues, clarification du processus).",
            ],
            output:
              "Audit d'accessibilité du projet + une contribution concrète (issue ou PR) pour réduire une barrière identifiée.",
            critere:
              "La contribution doit s'attaquer à une barrière mesurable — pas 'la communauté pourrait être plus accueillante' (non mesurable) mais 'le CONTRIBUTING.md ne dit pas comment lancer les tests en local' (spécifique et corrigeable).",
          },
        ],
        piege:
          "Confondre 'la communauté est gentille avec moi' avec 'la communauté est accessible à tous' — votre expérience peut être non représentative de celle d'un contributeur venant d'un contexte différent.",
      },
      verification: [
        "Pourquoi l'existence d'un Code of Conduct seul est insuffisante pour garantir une communauté inclusive, et quelles pratiques concrètes le complètent ?",
        "Vous êtes mainteneur d'un projet avec 50 contributeurs. Une PR de bonne qualité technique est soumise par quelqu'un dont le style de communication est différent du standard habituel de la communauté (formulation directe perçue comme agressive). Comment gérez-vous la review pour ne pas perdre un contributeur de valeur tout en maintenant le standard de la communauté ?",
        "En quoi la diversité des contributeurs d'un projet open source est-elle un facteur de qualité technique, et pas seulement une question de valeurs sociales ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "burnoutMainteneurs", x: 10, y: 100, w: 145, h: 65 },
        { id: "gouvernanceOuvertes", x: 215, y: 40, w: 145, h: 65 },
        { id: "problematiquesSurmonter", x: 215, y: 165, w: 155, h: 65 },
        { id: "financementDurable", x: 440, y: 100, w: 145, h: 65 },
        { id: "evolutionsTendances", x: 655, y: 100, w: 145, h: 65 },
      ],
      edges: [
        { x1: 155, y1: 120, x2: 213, y2: 72, label: "exige" },
        { x1: 155, y1: 145, x2: 213, y2: 197, label: "révèle" },
        { x1: 360, y1: 72, x2: 438, y2: 120, label: "stabilise" },
        { x1: 370, y1: 197, x2: 438, y2: 145, label: "légitime" },
        { x1: 585, y1: 132, x2: 653, y2: 132, label: "transforme" },
      ],
    },
  },
});
