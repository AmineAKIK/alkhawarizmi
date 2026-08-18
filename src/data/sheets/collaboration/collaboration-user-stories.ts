import { coSheet } from "./collaboration-common";

export const collaborationUserStories = coSheet({
  id: "collaboration-user-stories",
  number: 11,
  title: "Les User Stories",
  subtitle:
    "Traduire la compréhension des utilisateurs en unités de travail que l'équipe peut construire, tester et livrer",
  badge: "Fiche Co11",
  meta: ["5 nœuds"],
  readingTime: "25 min",
  description:
    "Une user story n'est pas une spec technique ni une description de feature. C'est une promesse de conversation entre le produit, l'équipe et l'utilisateur — formulée du point de vue de ce que l'utilisateur veut accomplir, pas de ce que le système doit faire. Cette fiche couvre ce qu'est vraiment une user story, comment la structurer, quels critères la rendent terminée, et les erreurs qui la transforment en pseudo-spec inutile.",
  accent: "modele",

  nodes: {
    defUserStory: {
      id: "defUserStory",
      label: "Qu'est-ce qu'une user story ?",
      icon: "📖",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Sans user story, une équipe reçoit des specs techniques qui décrivent des systèmes à construire, pas des besoins à satisfaire. Résultat : elle livre ce qui a été demandé, pas ce qui était voulu. Le coût de ce malentendu se voit en recette : des fonctionnalités conformes à la spec que personne n'utilise parce que la spec décrivait une solution sans comprendre le problème.</p>`,
        system: `<p>Une user story est l'unité de base du backlog agile. Elle situe chaque unité de travail dans la perspective de l'utilisateur <span class="ref-fiche">→ C02</span> et découle directement de la compréhension du problème réel <span class="ref-fiche">→ C01</span>. Elle prépare la pratique de raffinement et d'intégration aux specs techniques décrites en <span class="ref-fiche">→ Co12</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Une user story suit une définition stable mais peut prendre plusieurs formes selon le contexte :</p>
<p><strong>Format canonique (Connextra) :</strong> "En tant que [qui], je veux [quoi], afin de [pourquoi]." Simple, universel, adapté à tous les contextes.</p>
<p><strong>Format orienté résultat :</strong> "Quand [contexte], je veux [action], pour [bénéfice mesurable]." Utile quand le contexte d'usage est critique (mobile, offline, rush).</p>
<p><strong>Job story (JTBD) :</strong> "Quand [situation], je veux [motivation], pour [résultat attendu]." Évite le persona figé, centre sur le comportement réel plutôt que sur un profil imaginé.</p>
<p><strong>Règle de choix :</strong> utilise le format canonique pour les équipes qui débutent. Passe aux job stories quand les personas deviennent des caricatures qui ne disent plus rien de réel sur les comportements.</p>`,
        },
        senior: `<p>Un product manager expérimenté sait qu'une user story n'est pas un livrable — c'est une invitation à une conversation. La vraie valeur n'est pas dans le texte écrit, c'est dans la discussion qu'il génère entre le PM, les développeurs et le QA avant que le code soit écrit. Une story sur laquelle tout le monde est d'accord sans discussion est soit trop simple soit trop floue pour avoir été vraiment comprise.</p>`,
        errors: `<p><strong>Pattern 1 — La story technique :</strong> "En tant que système, je dois stocker les tokens JWT en base de données." Il n'y a pas d'utilisateur, pas de besoin, pas de bénéfice — c'est une tâche technique déguisée en story. Conséquence : l'équipe perd le fil de ce qu'elle construit vraiment et pour qui.</p>
<p><strong>Pattern 2 — La story fourre-tout :</strong> une story couvre plusieurs comportements distincts dans une seule phrase. "En tant qu'utilisateur, je veux gérer mon profil" peut cacher dix features différentes. Conséquence : impossible à estimer, impossible à tester, impossible à livrer en un sprint.</p>
<p><strong>Pattern 3 — La story sans utilisateur réel :</strong> on invente un persona générique ("en tant qu'utilisateur") qui ne correspond à personne de spécifique. Conséquence : l'équipe prend des décisions d'implémentation arbitraires parce qu'elle ne sait pas vraiment pour qui elle construit.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le format exact (Connextra, job story, outcome story), les outils (Jira, Linear, post-its), la granularité selon la maturité du produit. <strong>Ce qui ne change pas :</strong> une user story doit ancrer le travail dans la perspective d'un utilisateur réel avec un besoin réel — si on peut enlever le "en tant que" et que ça ne change rien, la story n'est pas une user story.</p>`,
        practice: {
          exercices: [
            {
              titre: "Distinguer une vraie user story d'une pseudo-story",
              etapes: [
                "Prends 5 tickets ou demandes de ton projet actuel (ou inventes-en 5 pour une app fictive).",
                "Pour chacun, teste : y a-t-il un utilisateur identifiable ? Un besoin formulé en termes de comportement ? Un bénéfice explicite ?",
                "Classe chaque ticket : vraie user story, tâche technique, bug, ou demande de feature sans contexte utilisateur.",
                "Pour les faux positifs, réécris-les en vrai format story en remontant au besoin utilisateur sous-jacent.",
              ],
              output: "5 tickets classifiés + les faux positifs réécrits en format story valide.",
              critere:
                "Une vraie story doit survivre à la question : 'Est-ce qu'un utilisateur réel a ce besoin, dans quel contexte, et qu'est-ce qu'il peut faire maintenant qu'il ne pouvait pas faire avant ?'",
            },
          ],
          piege:
            "Croire que la forme ('En tant que...') suffit à faire une bonne story. Un texte bien formaté peut être aussi vide qu'une spec technique si le besoin utilisateur sous-jacent n'a jamais été compris.",
        },
        verification: [
          "Quelle est la différence entre une user story et une spécification technique, et pourquoi cette différence change la façon dont l'équipe travaille ?",
          "Ton PM écrit : 'En tant qu'administrateur, je veux un endpoint REST /api/users/delete qui accepte un tableau d'IDs.' Qu'est-ce qui ne va pas dans cette story et comment la réécris-tu ?",
          "Pourquoi une user story est-elle décrite comme une 'invitation à une conversation' plutôt qu'un livrable, et qu'est-ce que ça implique pour la façon de la rédiger ?",
        ],
      },
    },

    structureStory: {
      id: "structureStory",
      label: "Structure : qui, quoi, pourquoi",
      icon: "🔺",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le "qui, quoi, pourquoi" n'est pas une formule magique — c'est un filtre qui force à répondre à trois questions que les équipes évitent naturellement : qui est vraiment l'utilisateur de cette feature ? Quel comportement exact est-ce qu'on lui permet ? Quel bénéfice réel est-ce que ça lui apporte ? Sans cette structure, les stories deviennent des listes de features sans ancrage dans la réalité des utilisateurs.</p>`,
        system: `<p>La structure qui/quoi/pourquoi découle directement de la compréhension des utilisateurs <span class="ref-fiche">→ C02</span> (le "qui") et des jobs-to-be-done (le "pourquoi"). Elle prépare les critères d'acceptation <span class="ref-fiche">→ defCriteres</span> : un "pourquoi" bien formulé rend les critères d'acceptation évidents. Sans "pourquoi" clair, les critères d'acceptation testent l'implémentation plutôt que le bénéfice utilisateur.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les trois parties de la structure ne sont pas équivalentes — elles ne se rédigent pas avec le même effort :</p>
<p><strong>Le "qui" (rôle/persona) :</strong> doit être suffisamment précis pour orienter des décisions d'implémentation. "En tant qu'utilisateur" est trop vague. "En tant que chef de projet qui coordonne une équipe distribuée" oriente le design et le comportement. Attention aux personas fantômes : si le "qui" ne correspond à aucune personne réelle dans vos recherches utilisateurs, il est inutile.</p>
<p><strong>Le "quoi" (fonctionnalité/action) :</strong> doit décrire ce que l'utilisateur fait ou peut faire, pas ce que le système fait. "Je veux voir" plutôt que "le système affiche". "Je veux filtrer" plutôt que "le backend applique des filtres SQL". Le quoi doit être un comportement observable par l'utilisateur.</p>
<p><strong>Le "pourquoi" (bénéfice/objectif) :</strong> c'est la partie la plus importante et la plus souvent omise. Il doit décrire le bénéfice réel pour l'utilisateur, pas l'intention du product manager. "Afin de ne pas perdre de contexte entre mes sessions" est un vrai bénéfice. "Afin d'améliorer l'expérience utilisateur" est une intention générique sans valeur.</p>`,
        },
        senior: `<p>Un product manager expérimenté commence toujours par le "pourquoi" avant d'écrire le reste. Si le bénéfice n'est pas clair, le "quoi" sera arbitraire. Il sait aussi que le "pourquoi" est la partie de la story que les développeurs lisent en dernier — et c'est précisément pourquoi ils font parfois des choix d'implémentation qui cassent le bénéfice attendu. Il le met en gras dans sa rédaction.</p>`,
        errors: `<p><strong>Pattern 1 — Le "pourquoi" générique :</strong> "afin d'améliorer l'expérience", "afin d'être plus efficace", "afin de mieux gérer". Ces formules sont vides — elles ne disent rien sur le bénéfice réel et ne permettent pas de tester si la story a été réussie. Conséquence : l'équipe ne sait pas si ce qu'elle a livré atteint l'objectif.</p>
<p><strong>Pattern 2 — Le "quoi" d'implémentation :</strong> "je veux qu'une tâche cron s'exécute toutes les heures" ou "je veux que l'API retourne un 204". Ce sont des détails d'implémentation, pas des comportements utilisateurs. Conséquence : l'équipe est enfermée dans une solution avant d'avoir compris le problème.</p>
<p><strong>Pattern 3 — Le "qui" fantôme :</strong> le rôle ne correspond à aucun segment d'utilisateurs réels identifiés dans la recherche. "En tant qu'utilisateur premium international avec des droits d'administrateur délégués" — un profil si spécifique qu'il ne correspond à personne ou si vague que tout le monde s'y retrouve. Conséquence : les décisions d'implémentation sont prises dans le vide.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la granularité du "qui" selon la maturité du produit et la richesse de la recherche utilisateurs. <strong>Ce qui ne change pas :</strong> les trois parties du format servent chacune une question distincte — le "qui" oriente les décisions UX, le "quoi" définit le périmètre, le "pourquoi" définit le critère de succès. Omettre l'une de ces parties crée une story incomplète, quelle que soit sa longueur.</p>`,
        practice: {
          exercices: [
            {
              titre: "Réécrire des stories mal structurées",
              etapes: [
                "Prends ces trois stories mal rédigées et identifie ce qui manque dans chacune :",
                "Story A : 'En tant qu'utilisateur, je veux me connecter avec Google.'",
                "Story B : 'Je veux que le système envoie un email de confirmation dans les 5 minutes.'",
                "Story C : 'En tant qu'administrateur, je veux pouvoir supprimer des utilisateurs afin d'améliorer la sécurité.'",
                "Pour chacune, réécris la story en ajoutant ou corrigeant la partie manquante ou mal formée.",
              ],
              output: "Trois stories réécrites avec qui/quoi/pourquoi complets et pertinents.",
              critere:
                "Chaque story réécrite doit permettre à un développeur de prendre au moins une décision d'implémentation différente de ce qu'il aurait fait sans le contexte fourni.",
            },
          ],
          piege:
            "Passer trop de temps à perfectionner la formulation textuelle. La story est un outil de communication, pas un contrat légal — 80% bien formulée et discutée vaut mieux que 100% parfaite mais jamais challengée.",
        },
        verification: [
          "Quelle partie du 'qui/quoi/pourquoi' est la plus souvent omise ou mal rédigée, et pourquoi c'est précisément celle qui cause le plus de problèmes d'implémentation ?",
          "Réécris cette story en améliorant chaque partie : 'En tant qu'utilisateur, je veux réinitialiser mon mot de passe afin de pouvoir me reconnecter.' Quelles informations manquent et quelles hypothèses doit-on lever ?",
          "Pourquoi le 'pourquoi' d'une user story est-il plus important pour les développeurs que pour le PM qui l'a écrite ?",
        ],
      },
    },

    criteresAcceptation: {
      id: "criteresAcceptation",
      label: "Critères d'acceptation",
      icon: "✅",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une user story sans critères d'acceptation est une promesse sans définition de ce que "tenu" signifie. Chaque développeur implémente selon sa propre interprétation, chaque testeur vérifie selon la sienne. En fin de sprint, la story est "terminée" mais personne n'est d'accord sur ce que "terminé" veut dire. Le coût : des retours de QA qui auraient pu être des discussions de 10 minutes au début, et une vélocité qui ressemble à du progrès mais cache des incompréhensions non résolues.</p>`,
        system: `<p>Les critères d'acceptation traduisent le "pourquoi" de la story en conditions vérifiables. Ils s'appuient sur la compréhension des utilisateurs <span class="ref-fiche">→ C02</span> et des scénarios d'usage réels. Ils alimentent directement les tests <span class="ref-fiche">→ T09</span> : un critère d'acceptation bien rédigé devient naturellement un scénario de test d'intégration ou end-to-end.</p>`,
        choice: {
          kind: "free",
          html: `<p>Deux formats principaux coexistent :</p>
<p><strong>Format Gherkin (Given/When/Then) :</strong><br>
<em>Given</em> [contexte initial]<br>
<em>When</em> [action de l'utilisateur]<br>
<em>Then</em> [résultat attendu observable]<br>
Adapté quand l'équipe pratique le BDD (Behavior-Driven Development) ou quand les scénarios sont complexes avec de multiples variantes. Facilite la traduction directe en tests automatisés.</p>
<p><strong>Format liste de conditions :</strong> une liste de conditions que la feature doit satisfaire pour être considérée terminée. Plus rapide à rédiger, moins rigoureux sur les cas limites. Adapté pour les stories simples ou les équipes qui débutent.</p>
<p><strong>Règle de choix :</strong> utilise Gherkin pour les flows critiques (auth, paiement, onboarding) et les scénarios avec cas d'erreur complexes. Utilise les listes pour les features plus simples. Ne mélange pas les deux formats sur la même story.</p>`,
        },
        senior: `<p>Un product manager expérimenté sait que la valeur des critères d'acceptation se révèle lors de leur rédaction, pas lors de la vérification. Formuler un critère précis force à penser aux cas limites : que se passe-t-il si le champ est vide ? si l'utilisateur est déconnecté ? si la réponse de l'API prend 30 secondes ? Ces questions, posées avant le développement, coûtent quelques minutes de réflexion. Posées après, elles coûtent des jours de refactoring.</p>`,
        errors: `<p><strong>Pattern 1 — Critère d'implémentation :</strong> "L'API retourne un code 200 avec le payload JSON correct." C'est un test technique, pas un critère d'acceptation utilisateur. Conséquence : on peut passer tous les critères et avoir une feature inutilisable du point de vue de l'utilisateur.</p>
<p><strong>Pattern 2 — Critère subjectif :</strong> "L'interface est rapide et intuitive." Impossible à vérifier objectivement. Conséquence : chaque testeur décide selon ses propres standards, et la story ne peut jamais être réellement fermée.</p>
<p><strong>Pattern 3 — Critères insuffisants :</strong> on couvre uniquement le happy path et on oublie les cas d'erreur, les états vides, les limites de taille, les comportements offline. Conséquence : la feature passe les critères en environnement de test mais casse en production sur des cas réels.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le format (Gherkin vs liste), le niveau de détail selon la criticité de la feature, les outils (Jira, Notion, fichiers .feature). <strong>Ce qui ne change pas :</strong> un critère d'acceptation doit être vérifiable par une personne qui n'a pas écrit le code — si ça nécessite de lire le code pour savoir si le critère est atteint, c'est un critère d'implémentation, pas d'acceptation.</p>`,
        practice: {
          exercices: [
            {
              titre: "Rédiger les critères d'acceptation en Gherkin",
              etapes: [
                "Prends cette story : 'En tant qu'utilisateur mobile, je veux recevoir une notification push quand ma commande est expédiée, afin de savoir quand me préparer à la recevoir sans avoir à ouvrir l'app.'",
                "Identifie le happy path : le scénario de base où tout fonctionne normalement.",
                "Identifie au moins 3 cas alternatifs ou d'erreur : notifications désactivées, commande annulée, utilisateur déconnecté, etc.",
                "Rédige chaque scénario en Given/When/Then.",
                "Vérifie que chaque 'Then' décrit un résultat observable par l'utilisateur, pas un état système interne.",
              ],
              output: "4 à 6 scénarios Gherkin couvrant le happy path et les cas alternatifs.",
              critere:
                "Un testeur QA doit pouvoir exécuter chaque scénario manuellement sans demander de clarification au PM ou au développeur.",
            },
          ],
          piege:
            "Écrire les critères après l'implémentation 'pour la forme'. Les critères rédigés après le développement décrivent ce qui a été construit, pas ce qui devait être construit — ils ne servent à rien.",
        },
        verification: [
          "Quelle est la différence entre un critère d'acceptation et un cas de test, et pourquoi cette différence est-elle importante pour la collaboration entre PM, développeur et QA ?",
          "Voici un critère d'acceptation : 'Quand l'utilisateur clique sur Sauvegarder, le système enregistre les données.' Identifie les problèmes de ce critère et réécris-le pour qu'il soit vérifiable et centré utilisateur.",
          "Pourquoi rédiger les critères d'acceptation avant l'implémentation est-il plus important que les rédiger avec précision après ?",
        ],
      },
    },

    agileEtStories: {
      id: "agileEtStories",
      label: "Méthodes agiles et user stories",
      icon: "🔄",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Les user stories ont émergé dans le contexte de l'Extreme Programming (XP) en 1999 comme alternative aux specs fonctionnelles exhaustives qui devenaient obsolètes dès la deuxième semaine de développement. Dans un contexte agile, la story n'est pas la spec — c'est l'unité minimale de valeur livrable à un utilisateur réel. Sans comprendre cette origine, les équipes traitent les stories comme des mini-specs et reproduisent exactement les problèmes que l'agilité cherchait à résoudre.</p>`,
        system: `<p>Les user stories s'intègrent dans la mécanique agile à plusieurs niveaux. Elles alimentent le backlog produit <span class="ref-fiche">→ Co10</span> et le sprint planning. Elles découlent des épics et des thèmes qui structurent la roadmap. Elles préparent les tests <span class="ref-fiche">→ T09</span> via les critères d'acceptation et le BDD. En Scrum, c'est le PO qui les rédige ; en Shape Up, c'est l'équipe qui les découvre pendant le pitch ; en Kanban, elles coexistent avec les bugs et les tâches techniques dans un flux continu.</p>`,
        choice: {
          kind: "free",
          html: `<p>La place des user stories varie selon le framework agile :</p>
<p><strong>Scrum :</strong> les stories constituent le product backlog, estimées en points (Fibonacci), organisées en sprints de 1-4 semaines. La taille d'une story doit permettre sa complétion dans un sprint. Les stories "trop grandes" sont découpées avant le sprint planning.</p>
<p><strong>Kanban :</strong> pas de sprint — les stories entrent dans le flux au fur et à mesure. La granularité est plus libre mais les WIP limits forcent à les garder petites. Les critères d'acceptation deviennent la définition of done qui permet de passer la colonne.</p>
<p><strong>Shape Up (Basecamp) :</strong> pas de stories au sens classique — le "pitch" décrit un appétit (temps alloué) et des éléments de solution à découvrir. L'équipe dérive ses propres tâches pendant le cycle de 6 semaines. Plus adapté aux features complexes à fort risque de découverte.</p>
<p><strong>Règle de choix :</strong> utilise des stories formelles avec Gherkin pour les équipes cross-fonctionnelles avec plusieurs personas. Simplifie vers des listes de tâches pour les petites équipes mono-produit où tout le monde partage le contexte.</p>`,
        },
        senior: `<p>Un product manager expérimenté sait que les user stories sont un outil de communication, pas un processus à suivre. Il adapte la granularité au contexte : une story de 1 point pour une feature connue de tous, une story de 13 points comme signal que quelque chose n'est pas encore compris et mérite d'être découpée. Il distingue la vélocité (vitesse à laquelle les stories sont terminées) du progrès réel (valeur livrée aux utilisateurs) — les deux ne sont corrélés que si les stories sont bien découpées.</p>`,
        errors: `<p><strong>Pattern 1 — Cargo cult agile :</strong> l'équipe adopte le format story et les rituels (planning poker, vélocité) sans comprendre pourquoi. Les stories sont rédigées pour remplir le backlog, pas pour guider le travail. Conséquence : le cérémoniel agile consomme du temps sans améliorer la qualité des décisions.</p>
<p><strong>Pattern 2 — Stories sans priorité explicite :</strong> le backlog contient 200 stories toutes marquées "haute priorité". Sans ordre clair, l'équipe choisit ce qui l'intéresse ou ce qui est facile. Conséquence : les features à forte valeur utilisateur restent en bas de backlog pendant que les features techniques avancent.</p>
<p><strong>Pattern 3 — Vélocité comme fin en soi :</strong> l'équipe optimise pour fermer des stories rapidement, au détriment de la qualité et du vrai bénéfice utilisateur. Les stories sont découpées artificiellement pour gonfler la vélocité. Conséquence : la vélocité monte, la satisfaction utilisateur stagne.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le framework (Scrum, Kanban, Shape Up, SAFe), les rituels, la granularité des stories selon la maturité de l'équipe. <strong>Ce qui ne change pas :</strong> une story doit représenter une unité de valeur pour un utilisateur réel, livrable et testable indépendamment. Sans cette propriété, ce n'est pas une story agile — c'est une tâche technique dans un format story.</p>`,
        practice: {
          exercices: [
            {
              titre: "Découper une épic en stories livrables",
              etapes: [
                "Prends cette épic : 'Permettre aux utilisateurs de gérer leur profil sur l'application mobile.'",
                "Liste tous les comportements qui pourraient entrer dans cette épic (modifier email, changer photo, gérer notifications, supprimer le compte, voir l'historique...).",
                "Pour chaque comportement, formule une story complète (qui/quoi/pourquoi) et estime sa complexité relative (S/M/L).",
                "Identifie lesquelles peuvent être livrées indépendamment (valeur même sans les autres) et lesquelles sont des dépendances.",
                "Ordonne-les selon la valeur utilisateur, pas la facilité d'implémentation.",
              ],
              output:
                "5 à 8 stories découpées depuis l'épic, ordonnées par valeur utilisateur avec estimation de complexité.",
              critere:
                "Chaque story doit pouvoir être livrée en production et apporter de la valeur à un utilisateur réel, même si les autres stories de l'épic ne sont pas faites.",
            },
          ],
          piege:
            "Découper les stories selon les couches techniques (front, back, base de données) plutôt que selon la valeur utilisateur. Un découpage technique produit des 'stories' qui n'apportent aucune valeur seules — elles ne sont livrables qu'ensemble, ce qui annule tout le bénéfice de l'itératif.",
        },
        verification: [
          "Pourquoi les user stories ont-elles émergé comme alternative aux specs fonctionnelles exhaustives, et quel problème spécifique elles cherchaient à résoudre ?",
          "Ton équipe utilise Scrum et sa vélocité est passée de 30 à 50 points par sprint en 3 mois. Le PM est ravi, mais les retours utilisateurs n'ont pas changé. Que s'est-il probablement passé et comment le détectes-tu ?",
          "Quelle propriété une story doit-elle avoir pour être 'agile' au sens de l'agilité logicielle, au-delà du format textuel ?",
        ],
      },
    },

    investCriteria: {
      id: "investCriteria",
      label: "Les critères INVEST",
      icon: "⚖",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Comment savoir si une user story est bien rédigée avant de la mettre en sprint ? Sans critère explicite, la décision est subjective — "ça a l'air bon" ou "on verra en planning". INVEST est un acronyme qui fournit un checklist en six dimensions permettant de détecter une story problématique avant qu'elle ne bloque une itération entière.</p>`,
        system: `<p>INVEST est le filtre qualité qui s'applique sur les stories avant leur entrée en sprint. Il s'appuie sur la structure qui/quoi/pourquoi <span class="ref-fiche">→ structureStory</span> (I, V, S dépendent d'un bon "pourquoi") et sur les critères d'acceptation <span class="ref-fiche">→ criteresAcceptation</span> (T et E dépendent de critères bien rédigés). Il alimente le raffinement agile décrit en <span class="ref-fiche">→ Co12</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les six dimensions d'INVEST, avec leur sens pratique :</p>
<p><strong>I — Independant :</strong> peut être développée et livrée sans dépendre d'une autre story non terminée. Si deux stories sont toujours faites ensemble, fusionnez-les ou identifiez la vraie story commune.</p>
<p><strong>N — Negotiable :</strong> la solution n'est pas figée — l'équipe peut proposer une implémentation différente qui satisfait le même besoin. Si le "quoi" impose une solution technique, la story n'est pas négociable.</p>
<p><strong>V — Valuable :</strong> apporte de la valeur à un utilisateur réel seule, sans attendre les autres stories. Si la valeur n'existe qu'une fois plusieurs stories terminées, c'est une épic, pas une story.</p>
<p><strong>E — Estimable :</strong> l'équipe peut estimer l'effort sans avoir besoin de plus de 10 minutes de discussion. Si l'estimation prend une heure, c'est le signal que la story est trop floue ou trop grande.</p>
<p><strong>S — Small :</strong> tient dans un sprint (ou une itération). Une story qui prend plus de 3-4 jours doit être découpée. La taille maximale dépend de la durée du sprint.</p>
<p><strong>T — Testable :</strong> on peut écrire des critères d'acceptation vérifiables par une personne externe au développement. Si on ne peut pas tester la story sans accès au code source, elle n'est pas testable.</p>`,
        },
        senior: `<p>Un product manager expérimenté utilise INVEST non pas comme une checklist rigide mais comme un diagnostic. Quand une story résiste, il identifie quelle dimension est en cause : si elle n'est pas Estimable, c'est souvent qu'elle n'est pas Negotiable (trop de détails d'implémentation figés). Si elle n'est pas Testable, c'est souvent que le "pourquoi" est trop vague. Chaque violation d'INVEST pointe vers un problème de compréhension qui ressortira pendant le développement si on ne le résout pas avant.</p>`,
        errors: `<p><strong>Pattern 1 — L'interdépendance cachée :</strong> deux stories semblent indépendantes mais partagent une base de données ou un composant UI qui sera modifié par l'une avant que l'autre soit terminée. Conséquence : conflit de merge en fin de sprint, retard sur les deux stories.</p>
<p><strong>Pattern 2 — La story non découpable :</strong> l'équipe résiste au découpage parce que "ça n'a pas de sens de livrer une moitié de feature". C'est souvent un manque d'imagination sur le découpage vertical (par scénario utilisateur) plutôt que horizontal (par couche technique). Conséquence : des stories de 20 points qui durent tout le sprint et sont "terminées à 90%" en fin de sprint.</p>
<p><strong>Pattern 3 — Le cargo cult INVEST :</strong> l'équipe coche les six cases mécaniquement sans réfléchir au fond. Une story peut cocher toutes les cases et être quand même inutile si le besoin utilisateur sous-jacent n'a jamais été compris. Conséquence : les stories passent le filtre INVEST mais ne génèrent pas de valeur utilisateur réelle.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le poids relatif des six dimensions selon le contexte (une startup early-stage priorisera V et S ; une grande organisation priorisera I et T). <strong>Ce qui ne change pas :</strong> une story qui viole plusieurs dimensions d'INVEST est une story qui n'a pas été suffisamment comprise avant d'entrer en développement — la violation est un symptôme, pas le problème.</p>`,
        practice: {
          exercices: [
            {
              titre: "Appliquer INVEST à un backlog réel",
              etapes: [
                "Prends le backlog de ton projet actuel (ou utilise ces 3 stories fictives pour une app de livraison mobile).",
                "Story 1 : 'En tant qu'utilisateur, je veux gérer mon adresse et mes préférences de paiement afin de commander plus rapidement.'",
                "Story 2 : 'En tant que livreur, je veux une carte en temps réel des commandes à proximité afin de choisir celles qui correspondent à mon trajet.'",
                "Story 3 : 'En tant que système, je veux que la base de données soit optimisée pour réduire le temps de requête en dessous de 100ms.'",
                "Pour chaque story, évalue chaque dimension INVEST (1 = problème, 3 = OK) et identifie la dimension la plus critique à corriger.",
              ],
              output:
                "Tableau INVEST pour 3 stories avec score par dimension et reformulation de la story la plus problématique.",
              critere:
                "La reformulation doit améliorer au moins deux dimensions sans en dégrader une autre.",
            },
          ],
          piege:
            "Traiter INVEST comme un test de conformité plutôt que comme un outil de diagnostic. Une story qui viole INVEST n'est pas 'invalide' — c'est un signal qu'elle nécessite plus de travail de compréhension ou de découpage avant d'entrer en sprint.",
        },
        verification: [
          "Parmi les six dimensions d'INVEST, laquelle est la plus difficile à respecter en pratique dans un contexte de développement web fullstack, et pourquoi ?",
          "Une story de votre backlog est évaluée à 13 points par l'équipe. Selon INVEST, que doit-il se passer, et comment décidez-vous de la découper sans créer des stories techniquement dépendantes qui annulent le bénéfice du découpage ?",
          "Pourquoi une story qui respecte tous les critères INVEST peut-elle quand même être inutile, et quelle dimension supplémentaire (non incluse dans INVEST) permettrait de le détecter ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "defUserStory", x: 10, y: 100, w: 160, h: 65 },
        { id: "structureStory", x: 230, y: 40, w: 145, h: 65 },
        { id: "criteresAcceptation", x: 230, y: 165, w: 165, h: 65 },
        { id: "agileEtStories", x: 470, y: 100, w: 150, h: 65 },
        { id: "investCriteria", x: 690, y: 100, w: 120, h: 65 },
      ],
      edges: [
        { x1: 170, y1: 120, x2: 228, y2: 72, label: "structure" },
        { x1: 170, y1: 148, x2: 228, y2: 197, label: "conditionne" },
        { x1: 375, y1: 72, x2: 468, y2: 120, label: "alimente" },
        { x1: 395, y1: 197, x2: 468, y2: 148, label: "teste" },
        { x1: 620, y1: 132, x2: 688, y2: 132, label: "valide" },
      ],
    },
  },
});
