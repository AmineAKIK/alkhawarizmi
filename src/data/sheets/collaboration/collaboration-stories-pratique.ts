import { coSheet } from "./collaboration-common";

export const collaborationStoriesPratique = coSheet({
  id: "collaboration-stories-pratique",
  number: 12,
  title: "User Stories en Pratique",
  subtitle: "Raffiner, intégrer aux specs techniques, cartographier les flows et gérer la dette de compréhension en contexte fullstack et mobile",
  badge: "Fiche Co12",
  meta: ["5 nœuds"],
  readingTime: "30 min",
  description: "Écrire une bonne user story est une chose ; l'intégrer au travail réel de développement fullstack et mobile en est une autre. Cette fiche couvre le raffinement agile, l'articulation avec les specs techniques, la story map comme outil de vision, et la gestion de la dette de compréhension qui s'accumule quand les stories ne sont pas assez comprises avant d'entrer en sprint.",
  accent: "modele",

  nodes: {
    raffinement: {
      id: "raffinement",
      label: "Raffinement et grooming",
      icon: "🔬",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une story écrite en 5 minutes par un PM seul et mise directement en sprint produit quasi-systématiquement des malentendus. Le raffinement — ou grooming — est la séance de travail collectif qui transforme une intention produit en compréhension partagée. Sans raffinement, le développeur découvre les ambiguïtés en codant, le QA les découvre en testant, et le PM les découvre en démo. Chaque découverte tardive coûte dix fois plus que la même discussion en amont.</p>`,
        system: `<p>Le raffinement est le rituel qui connecte les user stories <span class="ref-fiche">→ Co11</span> au sprint planning. Il produit des stories "ready" — comprises, estimées, critères d'acceptation validés — qui peuvent entrer en sprint sans blocage. Il alimente aussi la story map <span class="ref-fiche">→ storyMap</span> en révélant les dépendances et les stories manquantes qui n'apparaissent pas quand chaque story est lue isolément.</p>`,
        choice: {
          kind: "free",
          html: `<p>Deux modèles de raffinement selon la maturité de l'équipe :</p>
<p><strong>Three Amigos :</strong> le PM, un développeur et un testeur QA lisent la story ensemble et challengent chaque hypothèse. Chacun apporte sa perspective : le PM défend le besoin utilisateur, le développeur challenge la faisabilité et explore les cas limites techniques, le QA identifie les scenarios de test manquants. 30 à 45 minutes par story complexe. C'est le format le plus efficace parce qu'il réunit exactement les personnes qui feront les mauvais choix si elles ne se parlent pas.</p>
<p><strong>Backlog grooming collectif :</strong> toute l'équipe revoit ensemble les stories à venir. Plus long, mais construit la compréhension partagée pour les features qui touchent plusieurs domaines. Adapté aux décisions d'architecture qui impactent plusieurs stories à la fois.</p>
<p><strong>Definition of Ready (DoR) :</strong> une checklist que chaque story doit satisfaire avant d'entrer en sprint : story rédigée en qui/quoi/pourquoi, critères d'acceptation présents, dépendances identifiées, maquettes disponibles si nécessaire, estimation faite. Utilisée comme filtre au sprint planning pour éviter les stories "trop vertes".</p>`,
        },
        senior: `<p>Un product manager expérimenté sait que le raffinement échoue quand il devient une lecture silencieuse suivie d'un vote. La valeur est dans les questions que les développeurs posent — ce sont elles qui révèlent les cas non couverts et les hypothèses implicites. Il prépare chaque session de raffinement en anticipant les trois questions que l'équipe va probablement poser, et en ayant les réponses prêtes. S'il ne peut pas anticiper ces questions, c'est qu'il n'a pas assez réfléchi à la story lui-même.</p>`,
        errors: `<p><strong>Pattern 1 — Raffinement sans questions :</strong> l'équipe passe rapidement sur chaque story parce que "ça a l'air clair". Les vraies ambiguïtés ne sont pas posées par timidité ou par habitude. Conséquence : les stories entrent en sprint "vertes" mais bloquent après 2 jours de développement sur des détails non couverts.</p>
<p><strong>Pattern 2 — PM absent du raffinement :</strong> le raffinement devient une session technique entre développeurs sans le PM. Les décisions de scope et de priorité sont prises par défaut. Conséquence : les features livrées sont techniquement solides mais ne répondent pas au vrai besoin, et le PM découvre les dérives en démo.</p>
<p><strong>Pattern 3 — Raffinement = estimation seulement :</strong> l'équipe utilise le raffinement uniquement pour le planning poker et oublie la compréhension partagée. Conséquence : les estimations sont précises mais les stories ne sont pas comprises — on sait combien de temps ça prend mais pas ce qu'on fait exactement.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la fréquence du raffinement (hebdomadaire, avant chaque sprint, continu), les participants (Three Amigos vs équipe entière), les outils (Jira, Notion, whiteboard). <strong>Ce qui ne change pas :</strong> la compréhension partagée ne se construit pas par la lecture individuelle de textes — elle se construit par la conversation. Un raffinement où personne ne pose de question n'a pas rempli sa fonction.</p>`,
        practice: {
          exercices: [
            {
              titre: "Simuler un Three Amigos sur une story complexe",
              etapes: [
                "Prends cette story : 'En tant qu'utilisateur mobile iOS et Android, je veux recevoir une notification push personnalisée selon mes préférences de catégorie de produit, afin de découvrir des offres pertinentes sans être submergé.'",
                "Joue le rôle du PM : liste toutes les décisions de scope implicites dans cette story (quelles catégories ? quelle fréquence max ? personnalisée comment ?).",
                "Joue le rôle du développeur : liste les ambiguïtés techniques et les cas limites (offline, permissions refusées, plusieurs appareils, désabonnement).",
                "Joue le rôle du QA : liste les scénarios de test qui ne sont pas couverts par le texte de la story.",
                "Réécris la story et ses critères d'acceptation après cette session simulée.",
              ],
              output: "Story réécrite + 6 à 8 critères d'acceptation Gherkin issus du Three Amigos simulé.",
              critere: "La story réécrite doit avoir éliminé toutes les décisions de scope implicites identifiées en étape 2 — chacune doit être soit incluse explicitement, soit explicitement exclue.",
            },
          ],
          piege: "Confondre raffinement et sprint planning. Le raffinement prépare les stories pour qu'elles soient 'ready' ; le sprint planning choisit lesquelles entrent dans le sprint. Faire les deux en même temps crée une pression temporelle qui court-circuite la compréhension.",
        },
        verification: [
          "Qu'est-ce qu'une story 'ready' selon la Definition of Ready, et pourquoi cette notion est-elle plus utile que 'le PM dit qu'elle est prête' ?",
          "Lors d'une session de raffinement, un développeur senior dit : 'Cette story va beaucoup plus vite si on fait ça directement dans la base de données sans passer par l'API.' Comment le PM doit-il réagir à cette proposition et qu'est-ce que cela révèle sur la story ?",
          "Pourquoi le Three Amigos fonctionne-t-il mieux avec exactement ces trois rôles (PM, dev, QA) et qu'est-ce qui se perd quand l'un des trois est absent ?",
        ],
      },
    },

    specsFullstack: {
      id: "specsFullstack",
      label: "Intégration aux specs techniques fullstack",
      icon: "⚙",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une user story décrit ce que l'utilisateur doit pouvoir faire. Elle ne dit pas comment l'API doit être structurée, quelles tables de base de données sont impactées, ou comment le state management frontend doit gérer la réponse. Cette distinction est saine — mais en contexte fullstack, l'absence de pont explicite entre la story et les décisions techniques génère des incohérences entre le frontend et le backend qui apparaissent en intégration, au pire moment possible.</p>`,
        system: `<p>L'intégration des stories aux specs techniques s'appuie sur les critères d'acceptation <span class="ref-fiche">→ Co11</span> comme contrat entre produit et technique, et sur l'architecture applicative <span class="ref-fiche">→ T03</span> pour situer les décisions d'implémentation. Elle produit les ADRs et RFCs décrits en <span class="ref-fiche">→ Co07</span> pour les décisions techniques structurantes qui dépassent une seule story.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs approches pour articuler story et specs techniques :</p>
<p><strong>BDD (Behavior-Driven Development) :</strong> les critères d'acceptation Gherkin deviennent directement des tests automatisés (Cucumber, Behave, Playwright). Le "Then" d'un scénario est exactement ce que le test vérifie. Le code métier est écrit pour faire passer ces tests. Avantage : le code et les specs restent synchronisés. Coût : setup initial important, maintenance des fichiers .feature.</p>
<p><strong>Contract-first API :</strong> la story décrit le comportement utilisateur, l'équipe définit le contrat d'API (OpenAPI/Swagger) avant d'implémenter. Le frontend et le backend peuvent travailler en parallèle contre le même contrat. Adapté aux équipes fullstack découpées en spécialités.</p>
<p><strong>Story + tâches techniques :</strong> la story reste au niveau utilisateur, et l'équipe dérive des tâches techniques pendant le sprint planning ou le raffinement (API endpoint, migration de schéma, composant UI, service backend). Les tâches techniques sont liées à la story parente dans le tracker. Plus simple à mettre en place, mais risque de dérive si les tâches techniques perdent le lien avec la valeur utilisateur.</p>`,
        },
        senior: `<p>Un product manager expérimenté sait que son rôle s'arrête au "quoi" et au "pourquoi" — pas au "comment". Mais il comprend assez les enjeux techniques pour détecter quand un "comment" choisi par l'équipe va contraindre les prochaines stories. Exemple : si l'équipe décide de stocker les préférences utilisateur en cookie plutôt qu'en base de données pour "aller plus vite", il sait que la story "préférences synchronisées entre appareils" sera bloquée par ce choix. Il anticipe ces dépendances sans dicter l'implémentation.</p>`,
        errors: `<p><strong>Pattern 1 — Story = spec technique :</strong> le PM écrit les endpoints, les schémas de base de données et les états UI directement dans la story. Conséquence : les développeurs perdent leur autonomie technique, les choix d'implémentation sont figés avant la réflexion, et les stories deviennent impossibles à maintenir quand l'architecture évolue.</p>
<p><strong>Pattern 2 — Déconnexion story/implémentation :</strong> les développeurs implémentent les features sans relire la story ou les critères d'acceptation. La tâche technique devient la vraie spec. Conséquence : l'implémentation diverge subtilement du besoin et personne ne le détecte jusqu'à la démo.</p>
<p><strong>Pattern 3 — Dette de compréhension accumulée :</strong> l'équipe entre des stories en sprint sans les comprendre complètement "pour avancer". Les ambiguïtés sont résolues en cours de développement par chaque développeur séparément. Conséquence : des inconsistances entre le frontend et le backend sur les cas d'erreur, les états vides, les permissions — visibles seulement en intégration.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le framework technique (React/Node, Vue/Django, Flutter/Firebase), le style architectural (REST, GraphQL, tRPC), les outils de collaboration (Jira + Confluence, Linear + Notion, GitHub Issues + wiki). <strong>Ce qui ne change pas :</strong> les specs techniques qui ne sont pas dérivées de stories utilisateurs produisent du code qui ne sert personne. Les stories qui ne descendent pas jusqu'aux specs techniques produisent des ambiguïtés qui se résolvent individuellement et incohéremment.</p>`,
        practice: {
          exercices: [
            {
              titre: "Dériver les tâches techniques d'une story fullstack",
              etapes: [
                "Prends cette story : 'En tant qu'utilisateur authentifié, je veux ajouter un produit à ma liste de souhaits depuis la page produit, afin de le retrouver facilement sans devoir le rechercher à nouveau.'",
                "Identifie les critères d'acceptation minimaux (happy path + 2 cas d'erreur).",
                "Liste les tâches techniques backend nécessaires : endpoints, schéma de données, validations.",
                "Liste les tâches techniques frontend nécessaires : composant, state management, feedback visuel, cas d'erreur.",
                "Identifie les décisions techniques qui doivent être partagées entre frontend et backend avant que chacun commence (contrat d'API, format des IDs, gestion des erreurs).",
              ],
              output: "Story avec critères d'acceptation + liste de tâches backend + liste de tâches frontend + décisions de contrat partagées.",
              critere: "Les tâches frontend et backend doivent être implémentables en parallèle à partir du contrat partagé, sans que les deux équipes aient besoin de se synchroniser en permanence.",
            },
          ],
          piege: "Créer des tâches techniques pour chaque couche (DB, API, cache, frontend, tests) et perdre le lien avec la story parente. Chaque tâche technique doit pouvoir répondre à la question 'pourquoi cette tâche existe-t-elle ?' en pointant vers le bénéfice utilisateur de la story.",
        },
        verification: [
          "Quelle est la bonne granularité pour une spec technique dérivée d'une user story : au niveau de la story entière, de chaque critère d'acceptation, ou de chaque tâche technique ?",
          "Ton équipe fullstack (2 devs frontend, 2 devs backend) doit implémenter une story d'authentification OAuth en 5 jours. Comment organises-tu la découverte des tâches et la définition du contrat d'API pour permettre le travail parallèle sans bloquer les deux équipes sur les mêmes décisions ?",
          "Pourquoi une story bien rédigée (qui/quoi/pourquoi + critères d'acceptation) réduit-elle le risque de déconnexion entre le frontend et le backend sur les cas d'erreur et les états vides ?",
        ],
      },
    },

    storiesMobile: {
      id: "storiesMobile",
      label: "User stories en contexte mobile",
      icon: "📱",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une user story rédigée sans penser au contexte mobile produit systématiquement des features qui fonctionnent sur desktop et cassent sur mobile. "En tant qu'utilisateur, je veux rechercher un restaurant" cache des dizaines de questions spécifiques au mobile : le comportement offline, les permissions de géolocalisation refusées, l'expérience avec un clavier virtuel qui masque 40% de l'écran, la gestion du retour arrière natif, la taille de la zone cliquable sur un écran de 4 pouces. Ces questions doivent être dans les critères d'acceptation, pas découvertes en QA.</p>`,
        system: `<p>Les stories mobiles s'appuient sur les mêmes fondamentaux que les stories web <span class="ref-fiche">→ Co11</span> mais ajoutent des dimensions de contexte propres au mobile. Elles s'articulent avec les contraintes techniques du frontend mobile <span class="ref-fiche">→ T08</span> (state management offline, navigation native, performances sur réseau lent) et les pratiques de déploiement mobile <span class="ref-fiche">→ T10</span> (releases App Store/Play Store, versions en production simultanées).</p>`,
        choice: {
          kind: "free",
          html: `<p>Les dimensions supplémentaires à couvrir dans les stories mobiles :</p>
<p><strong>Contexte réseau :</strong> comportement en offline (cache ? message d'erreur ? retry auto ?), comportement en réseau lent (loader ? optimistic update ? timeout ?), synchronisation au retour de connectivité. Ces scénarios doivent être dans les critères d'acceptation, pas dans la définition of done générique.</p>
<p><strong>Permissions système :</strong> géolocalisation, caméra, notifications, contacts — la story doit préciser le comportement quand la permission est refusée, accordée une première fois seulement, ou révoquée après accord. Le cas "permission refusée" est souvent traité comme un edge case alors que c'est le cas médian sur iOS.</p>
<p><strong>Contexte d'usage :</strong> one hand use sur un trajet de métro, plein soleil, une seule main libre. Ces contextes changent les décisions de taille de zone cliquable, de contraste, de durée de loading acceptable. À préciser dans le "qui" ou le contexte d'usage de la story.</p>
<p><strong>Versions et backward compatibility :</strong> sur mobile, tous les utilisateurs n'ont pas la dernière version. La story doit préciser si le comportement s'applique à toutes les versions en production ou nécessite une migration de données.</p>`,
        },
        senior: `<p>Un product manager expérimenté en mobile sait que le "qui" d'une story mobile doit inclure le contexte d'usage physique, pas seulement le persona. "En tant qu'utilisateur qui commande en déplacement avec une main libre et un réseau 3G" est une description de contexte qui change radicalement les décisions d'implémentation comparé à "en tant qu'utilisateur". Il priorise les stories qui fonctionnent dans le pire contexte réseau et matériel raisonnable — si ça marche sur un Android 3G, ça marche partout.</p>`,
        errors: `<p><strong>Pattern 1 — Story web copiée pour le mobile :</strong> la story est rédigée pour un comportement desktop et "adaptée" au mobile en ajoutant "sur mobile" dans le titre. Aucune des spécificités mobile (offline, permissions, navigation native) n'est couverte. Conséquence : l'app mobile est une version dégradée de l'expérience desktop au lieu d'une expérience adaptée au contexte.</p>
<p><strong>Pattern 2 — Happy path seulement :</strong> les critères d'acceptation couvrent uniquement le flux normal avec permissions accordées et réseau disponible. Conséquence : l'app casse pour 30 à 40% des utilisateurs réels qui ont des permissions partielles, un réseau instable ou une version ancienne de l'OS.</p>
<p><strong>Pattern 3 — Oubli des versions simultanées :</strong> la story modifie un format de données ou un comportement d'API sans considérer les utilisateurs encore sur l'ancienne version de l'app. Conséquence : les utilisateurs sur l'ancienne version voient des bugs ou des données corrompues pendant la période de transition, parfois pendant plusieurs semaines.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les APIs mobiles spécifiques (iOS Core Data, Android Room, React Native AsyncStorage, Flutter Hive), les stores de distribution (App Store, Play Store, TestFlight), les cycles de release selon la plateforme. <strong>Ce qui ne change pas :</strong> une story mobile sans critères d'acceptation pour les scénarios offline, permissions refusées, et versions multiples en production est incomplète — ces scénarios sont la réalité du mobile, pas des edge cases.</p>`,
        practice: {
          exercices: [
            {
              titre: "Enrichir une story web pour le contexte mobile",
              etapes: [
                "Prends cette story web : 'En tant qu'utilisateur authentifié, je veux filtrer les articles par catégorie afin de trouver rapidement ce qui m'intéresse sans parcourir tout le catalogue.'",
                "Identifie les trois scénarios spécifiques au mobile qui ne sont pas couverts : offline, permissions, contexte d'usage physique.",
                "Ajoute au moins 3 critères d'acceptation spécifiques au mobile que la version web n'avait pas.",
                "Identifie les décisions de design qui changent pour le mobile (taille des zones cliquables, ordre des filtres, geste natif de retour).",
                "Reformule le 'qui' pour inclure le contexte d'usage mobile pertinent.",
              ],
              output: "Story enrichie avec 3+ critères d'acceptation spécifiques mobile + 'qui' reformulé avec contexte d'usage.",
              critere: "Un développeur mobile qui lit la story enrichie doit pouvoir estimer les cas techniques sans avoir besoin de demander 'et qu'est-ce qui se passe si le réseau coupe ?'",
            },
          ],
          piege: "Traiter les spécificités mobiles comme des tâches techniques à gérer par le développeur sans les inclure dans les critères d'acceptation. Le comportement offline ou les permissions refusées sont des comportements utilisateur, pas des détails d'implémentation.",
        },
        verification: [
          "Pourquoi le scénario 'permission de géolocalisation refusée' est-il considéré comme un cas médian sur iOS et non comme un edge case, et qu'est-ce que ça implique pour la rédaction des critères d'acceptation ?",
          "Tu as une story mobile : 'En tant qu'utilisateur, je veux voir ma commande en cours sur la carte en temps réel.' L'équipe a 3 jours. Le réseau 3G est courant chez vos utilisateurs. Quels critères d'acceptation spécifiques au contexte mobile ajoutez-vous que la version desktop n'aurait pas ?",
          "Pourquoi le fait d'avoir plusieurs versions de l'app mobile en production simultanément change-t-il fondamentalement la façon dont une story doit être rédigée comparé au web où une seule version est en production ?",
        ],
      },
    },

    storyMap: {
      id: "storyMap",
      label: "Story mapping et vision produit",
      icon: "🗺",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Avancé",
      sections: {
        why: `<p>Un backlog de 150 stories sans structure est un cimetière de fonctionnalités. Il est impossible de voir comment les stories s'articulent pour former une expérience utilisateur cohérente, d'identifier ce qui est indispensable pour un premier lancement, ou de comprendre quelles stories peuvent être livrées dans quel ordre sans casser le flow utilisateur. La story map répare ce problème en organisant les stories selon le parcours de l'utilisateur plutôt que selon la priorité du PM.</p>`,
        system: `<p>La story map est l'outil de vision qui connecte les stories individuelles <span class="ref-fiche">→ Co11</span> à la roadmap produit. Elle s'appuie sur la compréhension des utilisateurs <span class="ref-fiche">→ C02</span> pour définir le parcours principal (backbone), et sur les décisions produit <span class="ref-fiche">→ C05</span> pour arbitrer les niveaux de release. Elle produit des releases cohérentes plutôt que des listes de features.</p>`,
        choice: {
          kind: "free",
          html: `<p>La structure d'une story map :</p>
<p><strong>Backbone (ligne du haut) :</strong> les activités principales de l'utilisateur dans leur ordre chronologique. Ce sont les grandes étapes du parcours — "découvrir", "s'inscrire", "configurer", "utiliser", "partager". Elles correspondent aux épics ou aux user journeys. Elles ne changent pas souvent.</p>
<p><strong>Walking skeleton (ligne du milieu) :</strong> la version minimale de chaque activité qui permet à un utilisateur de réaliser son objectif de bout en bout. C'est le MVP au sens littéral — pas la version la plus réduite possible, mais la version la plus simple qui délivre de la valeur réelle. Les stories du walking skeleton forment la release 1.0.</p>
<p><strong>Stories supplémentaires (lignes du bas) :</strong> les enrichissements, les cas alternatifs, les optimisations. Organisées sous l'activité à laquelle elles appartiennent. Découpées en releases selon la valeur et la complexité.</p>
<p><strong>Usages pratiques :</strong> la story map est particulièrement utile pour identifier le "slice" minimum viable (une colonne verticale complète = un flow complet), pour communiquer le périmètre à des non-techniques, et pour détecter les stories orphelines (sans activité parente dans le backbone).</p>`,
        },
        senior: `<p>Un product manager expérimenté utilise la story map comme outil de conversation, pas comme document. Il la construit avec l'équipe et les stakeholders en temps réel — sur un mur ou dans Miro — parce que le débat sur où placer une story révèle des incompréhensions sur le parcours utilisateur qu'un backlog Jira ne montrerait jamais. Il sait aussi que la ligne du walking skeleton est la décision la plus difficile : inclure trop de stories dans le MVP, et le produit n'est jamais livré ; en inclure trop peu, et le flow utilisateur est cassé.</p>`,
        errors: `<p><strong>Pattern 1 — Backbone fonctionnel plutôt qu'utilisateur :</strong> le backbone est organisé selon les modules techniques (auth, profil, dashboard, settings) plutôt que selon le parcours utilisateur. Conséquence : la story map décrit l'architecture du système, pas l'expérience, et il est impossible d'identifier un slice minimal cohérent du point de vue utilisateur.</p>
<p><strong>Pattern 2 — Walking skeleton trop ambitieux :</strong> toutes les stories semblent indispensables pour le MVP, et la ligne du milieu finit par contenir 80% du backlog. Conséquence : le MVP ne sort jamais, ou sort si tard que les hypothèses initiales sont périmées.</p>
<p><strong>Pattern 3 — Story map statique :</strong> la map est construite une fois et jamais mise à jour. Les nouvelles stories sont ajoutées directement au backlog sans être intégrées à la map. Conséquence : la map devient obsolète et inutile, le backlog redevient un cimetière sans structure.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> l'outil (Miro, FigJam, StoriesOnBoard, post-its physiques), la granularité du backbone selon la complexité du produit, la fréquence de mise à jour. <strong>Ce qui ne change pas :</strong> une story map est structurée selon le parcours de l'utilisateur, pas selon l'architecture du système ni la priorité du PM. Cette orientation utilisateur est ce qui la rend utile pour identifier des releases cohérentes.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire une story map pour une app mobile",
              etapes: [
                "Imagine une app mobile de suivi de dépenses personnelles. Définis le parcours utilisateur principal en 4 à 6 activités (backbone).",
                "Pour chaque activité, liste les stories indispensables pour que l'activité soit utilisable (walking skeleton).",
                "Pour chaque activité, liste les stories d'enrichissement (release 2, release 3).",
                "Identifie le slice minimal : quelle colonne verticale (une activité de bout en bout) permettrait de valider l'hypothèse principale du produit ?",
                "Identifie 3 stories qui semblent importantes mais qui ne sont pas dans le walking skeleton et justifie pourquoi.",
              ],
              output: "Story map avec backbone (4-6 activités), walking skeleton pour chaque activité, et 3 stories justifiées comme non-MVP.",
              critere: "Le walking skeleton doit permettre à un utilisateur de réaliser l'objectif principal de l'app de bout en bout — même de façon rudimentaire — sans les stories des releases suivantes.",
            },
          ],
          piege: "Construire la story map seul en tant que PM. La valeur de la story map est dans la conversation qu'elle génère — un backbone construit seul reflète la vision du PM, pas la compréhension partagée de l'équipe.",
        },
        verification: [
          "Quelle est la différence entre le 'backbone' et le 'walking skeleton' dans une story map, et pourquoi cette distinction est-elle critique pour définir un MVP cohérent ?",
          "Ton équipe a une story map avec 12 activités dans le backbone et 80 stories au total. Le sprint 1 doit livrer quelque chose de déployable. Comment identifies-tu le 'slice' minimal qui représente une valeur complète pour l'utilisateur, et quel critère utilises-tu pour décider quelles stories en font partie ?",
          "Pourquoi organiser le backbone d'une story map selon les modules techniques (auth, profil, settings) est-il moins utile que l'organiser selon les activités utilisateur, même si les deux produisent des colonnes similaires ?",
        ],
      },
    },

    detteComprehension: {
      id: "detteComprehension",
      label: "Dette de compréhension",
      icon: "⚠",
      kind: "diagnostic",
      os: "universel",
      osLabel: "Universel",
      niveau: "Avancé",
      sections: {
        why: `<p>La dette technique est bien documentée. La dette de compréhension — les stories entrées en sprint sans être réellement comprises — l'est beaucoup moins. Elle s'accumule silencieusement : le développeur fait des choix d'implémentation sur des cas non couverts, le QA invente des comportements attendus pour tester, le PM découvre l'écart en démo. La somme de ces décisions non coordonnées produit un produit incohérent que personne n'a voulu, et qu'il faudra documenter et corriger sprint après sprint.</p>`,
        system: `<p>La dette de compréhension est la conséquence directe de stories mal rédigées <span class="ref-fiche">→ Co11</span>, de raffinements insuffisants <span class="ref-fiche">→ raffinement</span> et de critères d'acceptation trop vagues ou absents. Elle se manifeste dans les retrospectives <span class="ref-fiche">→ Co09</span> sous forme de "on a pas compris la même chose" et dans les métriques <span class="ref-fiche">→ C06</span> sous forme de vélocité élevée mais de satisfaction utilisateur stagnante.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois stratégies pour réduire la dette de compréhension :</p>
<p><strong>Definition of Ready stricte :</strong> aucune story n'entre en sprint sans critères d'acceptation couvrant le happy path ET au moins deux cas d'erreur. La rigueur en amont réduit les découvertes coûteuses en cours de sprint. Coût : plus de temps de préparation. Bénéfice : moins de blocages, moins de retours de QA, moins de divergences entre devs.</p>
<p><strong>Example Mapping :</strong> technique de raffinement structuré qui dérive des exemples concrets directement depuis la story. Pour chaque critère d'acceptation, on imagine un exemple concret (un utilisateur précis, dans un contexte précis, qui fait une action précise, avec un résultat précis). Les exemples révèlent rapidement les cas non couverts et les désaccords de compréhension. 30 minutes d'Example Mapping remplacent souvent 2 heures de réunion.</p>
<p><strong>Spike de découverte :</strong> quand une story est trop floue pour être estimée, on alloue un timebox de recherche (1 à 2 jours) pour lever les incertitudes avant de la mettre en sprint. Le spike produit une décision, pas du code livrable. Adapté aux features à forte incertitude technique ou UX.</p>`,
        },
        senior: `<p>Un product manager expérimenté détecte la dette de compréhension avant qu'elle ne devienne visible. Les signaux : des estimations qui varient du simple au triple selon le développeur qui lit la story ; des questions posées en sprint planning sur des sujets qui auraient dû être dans les critères d'acceptation ; des choix d'implémentation contradictoires entre le frontend et le backend sur les cas d'erreur. Ces signaux sont des opportunités de correction, pas des erreurs à blâmer.</p>`,
        errors: `<p><strong>Pattern 1 — Velocité faussée :</strong> l'équipe ferme des stories vite mais accumule une dette de compréhension qui se matérialise en bugs et en retours au sprint suivant. La vélocité semble élevée, mais le ratio "stories livrées / stories réellement terminées sans retour" est faible. Conséquence : fausse impression de productivité qui cache un problème de qualité de compréhension.</p>
<p><strong>Pattern 2 — Résolution individuelle des ambiguïtés :</strong> chaque développeur résout les cas non couverts selon son propre jugement. Le résultat final est incohérent : le frontend gère une erreur d'API d'une façon, le backend d'une autre, et les deux ne correspondent pas aux attentes du PM. Conséquence : refactoring d'alignement coûteux en fin de sprint ou de release.</p>
<p><strong>Pattern 3 — Déni de la dette :</strong> l'équipe sait que les stories sont floues mais continue à les entrer en sprint parce que "le PM dit que c'est urgent". La dette s'accumule jusqu'à ce qu'une feature importante révèle l'incohérence sous-jacente. Conséquence : une session de désendettement douloureuse qui ressemble à une refonte partielle.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils de détection (Example Mapping, Three Amigos, Definition of Ready), les métriques de suivi (ratio retours QA / stories livrées, temps moyen de blocage par story), la culture de l'équipe sur la gestion de l'ambiguïté. <strong>Ce qui ne change pas :</strong> une ambiguïté non résolue avant le développement sera résolue pendant ou après — avec un coût dix fois supérieur. La dette de compréhension est toujours payée ; la question est seulement quand et par qui.</p>`,
        practice: {
          exercices: [
            {
              titre: "Détecter et mesurer la dette de compréhension",
              etapes: [
                "Prends les 10 dernières stories livrées dans ton projet (ou simule avec un projet fictif).",
                "Pour chacune, note : combien de questions ont été posées pendant le sprint (pas pendant le raffinement) ? Combien de retours QA ont nécessité une correction ? Y a-t-il eu des incohérences entre frontend et backend ?",
                "Calcule le ratio dette : (questions sprint + retours QA + incohérences) / nombre de stories.",
                "Identifie la story avec le ratio le plus élevé — réécris-la avec les critères d'acceptation qui auraient évité les problèmes.",
                "Identifie la cause racine : story trop vague, raffinement absent, critères d'acceptation manquants, cas mobile non couverts ?",
              ],
              output: "Tableau de 10 stories avec ratio de dette + story la plus problématique réécrite + cause racine identifiée.",
              critere: "La story réécrite doit couvrir explicitement chaque cas qui a généré une question ou un retour pendant le sprint précédent.",
            },
          ],
          piege: "Traiter la dette de compréhension comme un problème de process ('il faut suivre la méthode') plutôt que comme un problème de communication ('est-ce que tout le monde comprend la même chose ?'). Les checklists ne remplacent pas la conversation.",
        },
        verification: [
          "Comment distinguer une vélocité élevée saine d'une vélocité élevée qui masque de la dette de compréhension, et quelle métrique complémentaire utilises-tu ?",
          "Ton équipe livre 40 points par sprint mais reçoit systématiquement 8 à 12 tickets de bug ou de correction au sprint suivant. Diagnostique le problème et propose deux actions concrètes à mettre en place avant le prochain sprint pour réduire ces retours sans diminuer la vélocité.",
          "Pourquoi l'Example Mapping est-il plus efficace qu'une session de raffinement classique pour détecter la dette de compréhension, et dans quelle situation préfères-tu quand même le raffinement classique ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "raffinement", x: 10, y: 100, w: 130, h: 65 },
        { id: "specsFullstack", x: 200, y: 40, w: 155, h: 65 },
        { id: "storiesMobile", x: 200, y: 165, w: 155, h: 65 },
        { id: "storyMap", x: 430, y: 100, w: 140, h: 65 },
        { id: "detteComprehension", x: 640, y: 100, w: 165, h: 65 },
      ],
      edges: [
        { x1: 140, y1: 120, x2: 198, y2: 72, label: "prépare" },
        { x1: 140, y1: 148, x2: 198, y2: 197, label: "ancre" },
        { x1: 355, y1: 72, x2: 428, y2: 120, label: "structure" },
        { x1: 355, y1: 197, x2: 428, y2: 148, label: "enrichit" },
        { x1: 570, y1: 132, x2: 638, y2: 132, label: "révèle" },
      ],
    },
  },
});
