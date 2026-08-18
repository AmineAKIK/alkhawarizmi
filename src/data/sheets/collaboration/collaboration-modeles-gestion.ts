import { coNode, coSheet } from "./collaboration-common";

export const collaborationModelesGestion = coSheet({
  id: "collaboration-modeles-gestion",
  number: 8,
  title: "Les modèles de gestion de projet",
  subtitle: "Choisir et adapter sa méthode selon le contexte réel",
  badge: "Fiche Co08",
  meta: ["5 nœuds"],
  readingTime: "30 min",
  description:
    "Cascade, itératif, spirale, Kanban, hybride : chaque modèle répond à une famille de contraintes. Cette fiche cartographie les forces, les zones de rupture et les critères de choix concrets pour un projet logiciel.",
  accent: "organisation",
  nodes: {
    cascade: coNode({
      id: "cascade",
      label: "Cascade (Waterfall)",
      icon: "⬇",
      kind: "organisation",
      niveau: "Fondation",
      why: "Un projet démarre, tout le monde se met à coder sans savoir si les specs sont stables — six mois plus tard, la moitié du travail est refait parce que le client avait autre chose en tête. Le modèle en cascade existe pour forcer l'ordre : on ne bâtit pas avant d'avoir compris ce qu'on bâtit. Son absence coûte des refontes massives, des budgets explosés et des équipes épuisées par le rework.",
      system:
        'La cascade impose une séquence rigide (analyse → conception → implémentation → test → déploiement) où chaque phase valide la suivante. Cette séquence rend la planification prédictive efficace quand les exigences sont stables et contractuelles. <span class="ref-fiche">→ Co04</span> : la clarté des rôles est un prérequis — sans responsable de phase identifié, la validation ne se fait pas. <span class="ref-fiche">→ Co09</span> : l\'itératif est né en réaction directe aux limites de la cascade sur des domaines à exigences changeantes.',
      choice:
        "Utilisez la cascade quand les exigences sont figées par contrat (marchés publics, systèmes embarqués critiques, normes réglementaires), quand le client ne peut pas s'impliquer tout au long du projet, ou quand le coût du changement tardif est acceptable parce que le domaine est bien connu. Évitez-la pour tout produit dont les usages réels ne sont pas encore validés : vous livrerez parfaitement ce que personne ne voulait vraiment.",
      senior:
        "La cascade n'échoue pas parce qu'elle est mal faite — elle échoue parce que les équipes feignent que les exigences sont stables alors qu'elles ne le sont pas. Dans 80% des projets web, le client ne sait pas ce qu'il veut avant de le voir tourner. La vraie question n'est pas 'quelle méthode ?' mais 'est-ce que mes exigences peuvent être figées avant le premier commit ?' Si la réponse est non, la cascade est une dette organisationnelle déguisée en rigueur.",
      errors: `<p><strong>Pattern 1 — Spécification fantôme :</strong> L'équipe valide un document de 80 pages que personne n'a vraiment lu, puis démarre le dev. Conséquence : les ambiguïtés remontent en phase de test, le planning s'effondre et les phases précédentes sont rejouées à coût double.</p><p><strong>Pattern 2 — Gate sans sortie :</strong> Une phase ne se clôt jamais formellement parce que le responsable de validation est absent ou non désigné. Conséquence : les phases se chevauchent, les livrables intermédiaires deviennent obsolètes avant d'être approuvés, et l'équipe avance dans le flou.</p><p><strong>Pattern 3 — Test en bout de chaîne :</strong> Les tests ne commencent qu'après l'implémentation complète. Conséquence : les bugs critiques d'architecture sont découverts trop tard pour être corrigés sans refonte, et le budget test absorbe les dépassements des phases précédentes.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les outils de documentation, les noms des phases, la durée des cycles, le niveau de formalisme selon le secteur. <strong>Ce qui ne change pas :</strong> une décision prise en amont coûte moins cher à corriger qu'une décision prise en aval. L'ordre des phases n'est pas arbitraire : concevoir avant de coder, tester avant de livrer reste vrai quel que soit le modèle.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Analyser un projet passé à travers le prisme cascade",
            etapes: [
              "Prenez un projet terminé et listez les 5 phases cascade (analyse, conception, implémentation, test, déploiement).",
              "Datez rétrospectivement quand chaque phase a réellement commencé et fini.",
              "Identifiez les chevauchements : là où une phase a démarré avant que la précédente soit close.",
              "Pour chaque chevauchement, estimez le rework généré en heures.",
              "Concluez : les exigences de ce projet auraient-elles pu être figées dès le départ ?",
            ],
            output: "Chronologie annotée avec chevauchements et coût de rework estimé.",
            critere:
              "Les chevauchements doivent avoir une cause identifiée (exigences floues, validation absente, etc.) — pas juste une durée.",
          },
        ],
        piege:
          "Confondre 'on avait un brief' avec 'les exigences étaient stables' — un brief n'est pas une spec validée.",
      },
      verification: [
        "Quelles sont les deux conditions nécessaires pour qu'un modèle en cascade soit viable sur un projet logiciel ?",
        "Un client public vous confie un portail de gestion de subventions : exigences contractualisées, budget fixe à 120 k€, client disponible deux jours par mois, 4 mois de dev estimés. Quel modèle choisissez-vous et pourquoi la cascade est-elle ici plus défendable qu'un itératif pur ?",
        "En quoi le coût de la découverte tardive d'une erreur est-il structurellement différent entre la cascade et un modèle itératif ?",
      ],
    }),
    iteratif: coNode({
      id: "iteratif",
      label: "Développement itératif",
      icon: "🔁",
      kind: "processus",
      niveau: "Fondation",
      why: "Vous avez livré une fonctionnalité après trois semaines de travail, et le client vous dit 'c'est bien mais ce n'est pas tout à fait ça'. Trois semaines perdues. Le développement itératif réduit cette perte en découpant le travail en cycles courts où le feedback arrive avant que le mauvais cap soit pris trop loin. Son absence génère des projets qui avancent vite dans la mauvaise direction.",
      system:
        'L\'itératif repose sur la boucle courte : planifier → construire → évaluer → ajuster. Chaque itération produit quelque chose de fonctionnel, même partiel. <span class="ref-fiche">→ Co04</span> : le feedback itératif exige une communication structurée entre l\'équipe et le product owner — sans ce rôle clairement tenu, les revues de sprint deviennent des démonstrations sans décision. <span class="ref-fiche">→ Co09</span> : Scrum et XP sont les instanciations les plus connues de ce paradigme, avec des rituels précis pour fermer la boucle feedback.',
      choice:
        "L'itératif est adapté quand les exigences évoluent, quand le produit doit s'ajuster aux retours utilisateurs, ou quand l'équipe ne peut pas prédire l'entièreté du travail à l'avance. Il est moins adapté quand le client ne peut pas s'engager à des revues régulières, quand le périmètre est contractuellement fixe, ou quand les dépendances techniques imposent un ordre strict non négociable.",
      senior:
        "L'itératif ne résout pas les problèmes de priorisation — il les rend visibles plus vite. Une équipe sans product owner décisionnaire va faire des sprints parfaitement exécutés sur les mauvaises fonctionnalités. Le piège senior : confondre 'on fait des sprints de deux semaines' avec 'on fait du développement itératif'. La cadence n'est pas la méthode — ce qui compte c'est que chaque cycle produise un livrable évaluable et déclenche une vraie décision d'ajustement.",
      errors: `<p><strong>Pattern 1 — Mini-cascade déguisée :</strong> Chaque sprint reproduit le cycle analyse → dev → test en interne, sans livrable fonctionnel en sortie. Conséquence : le feedback client n'arrive qu'à la fin, et les bénéfices de l'itératif sont annulés.</p><p><strong>Pattern 2 — Backlog sans priorité :</strong> Le backlog contient 200 tickets tous marqués priorité haute. L'équipe négocie chaque sprint ce qu'elle prend. Conséquence : les décisions de priorisation sont prises à la dernière minute, le sprint planning dure trois heures, et la valeur livrée est aléatoire.</p><p><strong>Pattern 3 — Revue sans décision :</strong> La démo de fin de sprint est regardée, applaudie, et rien ne change dans le backlog. Conséquence : l'équipe perd confiance dans la valeur du feedback, les revues deviennent des formalités, et le processus se ritualise sans produire d'ajustement.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> la durée des itérations (1 à 4 semaines), les rituels associés, le niveau de formalisme des revues, le nombre de personnes impliquées. <strong>Ce qui ne change pas :</strong> chaque cycle doit produire un livrable évaluable et déclencher une décision d'ajustement réelle. Sans ces deux éléments, c'est une cascade avec des checkpoints.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Simuler une itération courte",
            etapes: [
              "Définissez une itération de 5 jours avec un seul objectif formulé comme 'l'utilisateur peut faire X'.",
              "Listez les tâches nécessaires et estimez-les en heures.",
              "À J+5, faites une démo de 15 minutes à quelqu'un qui n'a pas travaillé dessus.",
              "Notez les 3 retours les plus importants.",
              "Décidez quoi ajuster pour l'itération suivante sous forme de critères d'acceptation.",
            ],
            output:
              "Liste de tâches estimées + 3 retours documentés + ajustements pour la prochaine itération.",
            critere:
              "Les ajustements doivent être formulés en critères vérifiables, pas en intentions ('améliorer la UI' n'est pas un critère).",
          },
        ],
        piege:
          "Vouloir que la fonctionnalité soit 'finie' avant de montrer — l'itératif fonctionne sur du partiel fonctionnel, pas sur du parfait caché.",
      },
      verification: [
        "Quelle est la différence fondamentale entre une itération et une phase dans un modèle en cascade ?",
        "Votre équipe fait des sprints de 2 semaines. À la revue du sprint 4, le client dit 'la priorisation des 3 dernières semaines ne correspond pas à ce dont on a besoin pour le lancement'. Comment l'itératif aurait dû permettre d'éviter ce problème, et qu'est-ce qui a dysfonctionné ?",
        "Quelles conditions doivent être réunies côté client pour que le développement itératif tienne ses promesses ?",
      ],
    }),
    spirale: coNode({
      id: "spirale",
      label: "Modèle en spirale",
      icon: "🌀",
      kind: "processus",
      niveau: "Intermédiaire",
      why: "Vous avez démarré un projet sans évaluer si la technologie choisie pouvait tenir la charge, ou si l'intégration avec le système legacy était faisable. À mi-projet, vous découvrez que ce n'est pas possible. Tout est à refaire. Le modèle en spirale place l'analyse de risque au centre de chaque cycle pour que ces découvertes arrivent tôt, quand elles coûtent encore peu.",
      system:
        'Le modèle en spirale organise le projet en cycles de quatre quadrants : définir les objectifs → identifier et réduire les risques → développer et tester → planifier le cycle suivant. <span class="ref-fiche">→ Co04</span> : chaque cycle spirale implique une revue de risque avec les parties prenantes — la communication structurée y est critique. <span class="ref-fiche">→ Co09</span> : les méthodes agiles ont absorbé l\'esprit de la spirale (feedback, itération, adaptation) sans en conserver le formalisme de l\'analyse de risque explicite.',
      choice:
        "La spirale est adaptée aux projets à haute incertitude technique (nouveaux algorithmes, intégrations inconnues, systèmes critiques), aux grands projets où les risques non traités coûtent très cher, ou quand le client accepte un processus formel de validation par cycle. Elle est surdimensionnée pour des projets web classiques de 3 mois — son overhead de documentation et de revue de risque dépasse les bénéfices.",
      senior:
        "La spirale est souvent mal comprise comme 'une cascade avec des tours'. Son cœur c'est : 'qu'est-ce qui peut tuer ce projet, et comment le valider au plus tôt ?' Un senior applique l'esprit de la spirale sans le formalisme : dans les deux premières semaines de tout projet, il identifie les 3 risques techniques qui pourraient tout faire capoter, et il crée des spikes (prototypes d'investigation) pour les réduire avant de planifier quoi que ce soit d'autre.",
      errors: `<p><strong>Pattern 1 — Spirale sans résolution :</strong> Les risques sont identifiés à chaque cycle mais jamais activement réduits — on les 'surveille'. Conséquence : les mêmes risques apparaissent cycle après cycle, grossissent, et finissent par devenir des incidents en production.</p><p><strong>Pattern 2 — Overhead documentaire :</strong> L'équipe consacre plus de temps à rédiger les analyses de risque qu'à les traiter. Conséquence : le modèle est perçu comme bureaucratique, les équipes contournent les revues, et la spirale devient une cascade avec des livrables supplémentaires.</p><p><strong>Pattern 3 — Cycles sans critère de sortie :</strong> On passe au cycle suivant sans avoir validé que les risques du cycle précédent sont réellement réduits. Conséquence : les risques s'accumulent, la confiance dans les estimations s'effondre, et le projet grossit sans livrer.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> la granularité des cycles, le niveau de formalisme des revues de risque, les outils de suivi, la durée de chaque quadrant. <strong>Ce qui ne change pas :</strong> planifier sans traiter les risques majeurs en premier est une illusion de contrôle. Quelle que soit la méthode, les risques non adressés deviennent des crises.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Spirale minimale : cartographier les risques d'un projet",
            etapes: [
              "Listez tous les points d'incertitude technique en 20 minutes (intégration, perfs, dépendances externes, compétences manquantes).",
              "Notez pour chacun : probabilité (1-3) × impact (1-3) = score de risque.",
              "Prenez les 2 scores les plus élevés.",
              "Pour chacun, définissez un spike de 4h maximum pour réduire l'incertitude (prototype, test de charge, appel API).",
              "Après les spikes, réévaluez les scores et décidez si vous pouvez planifier ou si un nouveau cycle d'investigation est nécessaire.",
            ],
            output:
              "Matrice de risques avec scores avant/après spikes et décision de planification.",
            critere:
              "Les scores doivent avoir baissé ou la décision de reporter doit être argumentée — 'on a fait le spike et le risque reste rouge' est un résultat valide.",
          },
        ],
        piege:
          "Traiter tous les risques au lieu des deux ou trois qui peuvent vraiment tuer le projet.",
      },
      verification: [
        "Quel est le quadrant central du modèle en spirale qui le différencie fondamentalement des autres modèles itératifs ?",
        "Vous démarrez un projet d'API temps réel avec WebSockets pour 10 000 connexions simultanées. Votre équipe n'a jamais travaillé à cette échelle. Comment appliqueriez-vous l'esprit du modèle en spirale dans les deux premières semaines, et quel livrable concret attendez-vous en sortie ?",
        "Pourquoi le modèle en spirale est-il inadapté à la majorité des projets web de taille moyenne, et quel principe de ce modèle reste pertinent quel que soit le contexte ?",
      ],
    }),
    kanban: coNode({
      id: "kanban",
      label: "Kanban (flux continu)",
      icon: "⬡",
      kind: "organisation",
      niveau: "Intermédiaire",
      why: "L'équipe a un backlog de 150 tickets, tout le monde travaille sur tout, des tâches sont bloquées depuis deux semaines sans que personne ne le sache, et les priorités changent tous les jours. Résultat : le sentiment d'être occupé sans rien finir. Kanban rend visible ce qui est en cours, limite le travail simultané, et force la finition avant le démarrage d'autre chose. Son absence dans un flux continu génère du multitasking chronique et des délais de livraison imprévisibles.",
      system:
        'Kanban repose sur trois pratiques fondamentales : visualiser le flux de travail (tableau avec colonnes d\'état), limiter le WIP par colonne, et gérer activement le flux pour identifier les goulots. <span class="ref-fiche">→ Co04</span> : le tableau Kanban est un artefact de communication — il rend visible à toute l\'équipe ce qui est bloqué, ce qui est en cours, ce qui attend. <span class="ref-fiche">→ Co09</span> : Kanban et Scrum s\'hybrident souvent en Scrumban — les sprints de Scrum fournissent le rythme, Kanban fournit la visualisation et les limites WIP.',
      choice:
        "Kanban est adapté aux équipes en flux continu (support, maintenance, ops), aux équipes dont les demandes arrivent de façon imprévisible, ou en transition vers l'agile. Il est moins adapté aux projets avec une date de livraison fixe et un périmètre connu — Scrum avec ses sprints planifiés gère mieux la prédictibilité dans ce cas. Kanban optimise le débit, pas la prédiction.",
      senior:
        "La limite WIP est la règle la plus difficile à faire respecter et la plus puissante. Une colonne 'En cours' avec 8 tickets pour une équipe de 3 personnes, c'est du multitasking institutionnalisé. Le vrai test d'un Kanban qui fonctionne : est-ce que l'équipe bloque de nouveaux tickets au profit de finir ce qui est déjà commencé ? Si la colonne 'En cours' déborde malgré une limite affichée, la limite n'est pas réellement appliquée.",
      errors: `<p><strong>Pattern 1 — Tableau sans WIP limit :</strong> Le tableau est beau, les colonnes sont bien nommées, mais n'importe quel nombre de tickets peut être dans n'importe quelle colonne. Conséquence : le tableau décrit l'état du chaos sans le réduire, et l'équipe continue à jongler entre 15 tâches simultanées.</p><p><strong>Pattern 2 — Tickets trop gros :</strong> Une tâche 'Refonte du module paiement' reste en 'En cours' pendant trois semaines. Conséquence : le flux est invisible, les blocages sont noyés dans la tâche géante, et le cycle time devient inexploitable.</p><p><strong>Pattern 3 — Kanban sans synchronisation :</strong> Le tableau est mis à jour sporadiquement, les blocages ne sont pas signalés activement. Conséquence : un ticket bloqué peut rester sans action pendant une semaine entière, et la promesse de Kanban — rendre visible les blocages — n'est pas tenue.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> le nombre de colonnes, les noms des états, les outils (Trello, Jira, tableau physique), les règles de WIP par équipe. <strong>Ce qui ne change pas :</strong> le débit d'un système est limité par son goulot. Limiter le WIP force à identifier et résoudre le goulot au lieu de l'ignorer en démarrant de nouvelles tâches.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Auditer et corriger le flux de votre équipe",
            etapes: [
              "Listez toutes les tâches en cours en ce moment et notez depuis combien de jours chacune est en cours.",
              "Identifiez celle qui dure le plus longtemps — c'est votre goulot probable.",
              "Découpez cette tâche en sous-tâches de 1-2 jours maximum et replacez-les sur le tableau.",
              "Définissez une limite WIP pour la colonne 'En cours' : taille de l'équipe + 1.",
              "Respectez-la pendant une semaine et mesurez combien de tickets sont complétés.",
            ],
            output:
              "Tableau avec WIP limit définie + nombre de tickets complétés semaine 1 vs semaine avant.",
            critere:
              "Moins de tickets complétés après une semaine est un signal valide — ça révèle un goulot, pas un échec de la méthode.",
          },
        ],
        piege: "Augmenter la limite WIP quand ça bloque au lieu d'investiguer pourquoi ça bloque.",
      },
      verification: [
        "Quel est le mécanisme par lequel la limite WIP améliore le débit d'une équipe, et pas seulement la visibilité ?",
        "Votre équipe de 4 développeurs a un tableau Kanban avec 12 tickets en 'En cours'. Le cycle time moyen est de 18 jours. Vous imposez une limite WIP de 5. Décrivez les tensions que cela va créer et comment les résoudre sans augmenter la limite.",
        "Dans quels contextes Kanban est-il structurellement moins adapté que Scrum, et pourquoi ?",
      ],
    }),
    hybride: coNode({
      id: "hybride",
      label: "Modèles hybrides",
      icon: "⚖",
      kind: "organisation",
      niveau: "Avancé",
      why: "Votre organisation a des contraintes contractuelles (périmètre fixé, jalons contractuels) mais aussi des exigences de qualité qui nécessitent des retours utilisateurs fréquents. Ni la cascade pure ni l'itératif pur ne fonctionnent. Le modèle hybride est la réponse pragmatique à la réalité organisationnelle : la plupart des équipes n'ont pas le luxe de choisir une méthode pure et doivent composer avec des contraintes contradictoires.",
      system:
        "Un modèle hybride articule typiquement une phase de cadrage cascade (exigences, architecture, contrat) suivie d'une exécution itérative (sprints, livraisons partielles, feedback), avec des jalons de validation formels entre les deux modes. <span class=\"ref-fiche\">→ Co04</span> : l'hybride amplifie les problèmes de communication — les équipes opèrent en mode itératif pendant que le management pilote en mode cascade, créant des désalignements sur l'avancement réel. <span class=\"ref-fiche\">→ Co09</span> : SAFe est l'exemple le plus documenté d'hybridation à grande échelle, avec ses PI Planning trimestriels (cascade) et ses sprints bihebdomadaires (itératif).",
      choice:
        "L'hybride est adapté quand les contraintes organisationnelles (contrats, gouvernance, reporting) imposent de la prédictibilité, mais que l'exécution bénéficie de la flexibilité itérative. Il est aussi pertinent pour des équipes qui transitionnent progressivement vers l'agile. Le risque principal : hériter des défauts des deux modèles (rigidité de la cascade + coût de coordination de l'itératif) sans leurs bénéfices.",
      senior:
        "Les hybrides fonctionnent quand la frontière entre les deux modes est explicite et respectée. Le signe qu'un hybride dégénère : le management utilise la visibilité itérative (tableau Kanban, burndown) pour micro-manager les décisions quotidiennes, tout en maintenant des jalons contractuels figés. L'équipe est alors soumise à la double contrainte : livrer à date fixe ET s'adapter aux retours. C'est la situation la plus épuisante qui soit pour une équipe de dev.",
      errors: `<p><strong>Pattern 1 — Cascade avec tickets Jira :</strong> L'organisation adopte les outils agiles (Jira, sprints, vélocité) mais maintient un plan projet figé avec des jalons immuables. Conséquence : l'équipe simule de l'agilité en réorganisant les sprints pour coller au plan initial, et le feedback utilisateur n'impacte jamais les priorités réelles.</p><p><strong>Pattern 2 — Transition sans décision :</strong> L'entreprise dit 'on fait de l'agile' mais n'a pas décidé quels processus cascade elle abandonne. Conséquence : l'équipe produit les livrables des deux méthodes, le surcoût documentaire devient insupportable.</p><p><strong>Pattern 3 — Hybride asymétrique :</strong> La phase itérative est soumise aux contraintes de la phase cascade (scope figé, budget épuisé en cadrage) sans en avoir les bénéfices (exigences claires). Conséquence : les sprints exécutent un périmètre mal défini avec aucune marge d'ajustement.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> le ratio cascade/itératif, le moment de la bascule entre les deux modes, le niveau de formalisme des jalons, les outils utilisés dans chaque phase. <strong>Ce qui ne change pas :</strong> un hybride implicite est une source de conflits permanents sur ce qui est 'normal' dans le processus. La frontière entre les deux modes doit être explicite et connue de toute l'équipe.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Cartographier les modes d'un projet hybride",
            etapes: [
              "Analysez un projet récent et identifiez les moments de logique cascade (décisions figées, jalons contractuels, specs validées).",
              "Identifiez les moments de logique itérative (sprints, retours utilisateurs, réajustements).",
              "Dessinez une timeline et colorez les moments de tension entre les deux logiques.",
              "Pour chaque tension, formulez la règle implicite qui aurait dû s'appliquer.",
              "Proposez une charte de 5 règles qui définissent 'quand on est en mode cascade' et 'quand on est en mode itératif'.",
            ],
            output: "Timeline annotée + charte de 5 règles de bascule entre les deux modes.",
            critere:
              "Les règles doivent être binaires et applicables sans ambiguïté — 'si un jalon contractuel est dans les 3 semaines, on gèle le scope' est une règle ; 'on s'adapte au contexte' n'en est pas une.",
          },
        ],
        piege:
          "Croire qu'une bonne charte suffit — les conflits de mode viennent des incitations organisationnelles, pas du manque de documentation.",
      },
      verification: [
        "Quelles sont les deux conditions nécessaires pour qu'un modèle hybride soit viable plutôt que chaotique ?",
        "Vous travaillez sur un projet pour une collectivité : contrat signé avec périmètre fixé, 8 mois de réalisation, 3 jalons contractuels à M2, M5 et M8. L'équipe veut faire des sprints de 2 semaines. Décrivez comment articuler les deux modes et où se situent les risques principaux.",
        "En quoi un hybride peut-il produire un résultat pire que cascade pure ou itératif pur, et quelle condition organisationnelle est nécessaire pour éviter cet écueil ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "cascade", x: 10, y: 100, w: 110, h: 65 },
        { id: "iteratif", x: 175, y: 40, w: 110, h: 65 },
        { id: "spirale", x: 175, y: 165, w: 110, h: 65 },
        { id: "kanban", x: 350, y: 100, w: 110, h: 65 },
        { id: "hybride", x: 530, y: 100, w: 110, h: 65 },
      ],
      edges: [
        { x1: 120, y1: 120, x2: 173, y2: 72, label: "évolue" },
        { x1: 120, y1: 145, x2: 173, y2: 197, label: "intègre" },
        { x1: 285, y1: 72, x2: 348, y2: 120, label: "fluidifie" },
        { x1: 285, y1: 197, x2: 348, y2: 145, label: "encadre" },
        { x1: 460, y1: 132, x2: 528, y2: 132, label: "alimente" },
      ],
    },
  },
});
