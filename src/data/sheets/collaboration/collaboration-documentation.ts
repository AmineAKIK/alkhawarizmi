import { coNode, coSheet } from "./collaboration-common";

export const collaborationDocumentation = coSheet({
  id: "collaboration-documentation",
  number: 3,
  title: "Documentation Vivante",
  subtitle:
    "Capturer le pourquoi, maintenir la mémoire collective et éviter que la doc devienne une dette.",
  badge: "Fiche Co03",
  meta: ["5 nœuds"],
  readingTime: "35 min",
  description: "Documentation utile, maintenue, proche du code et portée par une culture d'équipe.",
  accent: "communication",
  nodes: {
    pourquoiDocumenter: coNode({
      id: "pourquoiDocumenter",
      label: "Pourquoi documenter",
      icon: "📝",
      kind: "communication",
      niveau: "Fondation",
      why: "La documentation n'est pas une archive morte. Elle aide le développeur de demain, souvent soi-même dans six mois, à retrouver le raisonnement perdu.",
      system:
        "Elle rend l'onboarding possible, préserve les décisions, soutient les runbooks et sert de mémoire organisationnelle quand les personnes changent.",
      choice:
        "Documenter pour soi futur, pour l'équipe et pour l'extérieur. Chaque audience demande un niveau de contexte différent.",
      senior:
        "Il ne demande pas seulement ce qui manque dans la doc; il demande quelle décision serait impossible si la personne clé partait demain. Il applique le test du bus aux raisonnements, pas aux fichiers: pourquoi cette architecture, pourquoi ce contournement, pourquoi cette dette acceptée. Il documente ce qui est non évident, contre-intuitif ou justifié par un contexte invisible.",
      errors: `<p><strong>Pattern 1 — Documentation exhaustive :</strong> l'équipe documente tout pour se rassurer. Conséquence: le bruit masque les informations rares et personne ne sait quoi lire.</p><p><strong>Pattern 2 — Le code se documente lui-même :</strong> on confond lisibilité de l'implémentation et mémoire du raisonnement. Conséquence: le quoi reste visible, mais le pourquoi disparaît.</p><p><strong>Pattern 3 — Doc après coup :</strong> on attend la fin pour documenter parce que livrer paraît plus urgent. Conséquence: les alternatives rejetées, contraintes et arbitrages sont déjà oubliés.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> outils et formats. <strong>Ce qui ne change pas :</strong> la connaissance non capturée se perd avec le temps et les départs.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Identifier les priorités de documentation",
            etapes: [
              "Applique le test du bus au projet.",
              "Liste 3 connaissances critiques non documentées.",
              "Estime leur coût de reconstruction.",
              "Priorise par coût de reconstruction divisé par temps de documentation.",
            ],
            output: "Top 3 des connaissances à documenter.",
            critere: "La documentation prioritaire est celle qui serait coûteuse à reconstruire.",
          },
        ],
        piege: "Documenter ce qui est confortable plutôt que ce qui est difficile à retrouver.",
      },
      verification: [
        "Qu'est-ce que le test du bus ?",
        "Le seul développeur qui connaît le système de paiement part dans deux semaines. Quelles trois connaissances documentes-tu avant les détails d'implémentation ?",
        "Différence entre doc pour soi, équipe et extérieur ?",
      ],
    }),
    docCommeDette: coNode({
      id: "docCommeDette",
      label: "La doc comme dette",
      icon: "📊",
      kind: "processus",
      niveau: "Fondation",
      why: "Une documentation obsolète est pire qu'une absence de documentation: elle donne confiance à une information fausse.",
      system:
        "La dette documentaire suit la dette technique. Elle doit être traitée dans les reviews, la Definition of Done et les processus d'équipe.",
      choice:
        "Inclure la doc dans la Definition of Done, la co-localiser avec le code, et tester les exemples quand c'est possible.",
      senior:
        "Il rend la fraîcheur visible: propriétaire, dernière révision, zone de validité. Une doc sans signal de fraîcheur devient suspecte même quand elle est vraie. Il préfère supprimer une page trompeuse plutôt que laisser une équipe perdre deux heures à suivre une procédure morte.",
      errors: `<p><strong>Pattern 1 — Wiki fantôme :</strong> les pages s'accumulent sans propriétaire parce que créer une page est plus gratifiant que la maintenir. Conséquence: personne ne sait si l'information est vraie.</p><p><strong>Pattern 2 — Documenter après merge :</strong> on sort la doc du flux de livraison pour aller plus vite. Conséquence: le PR de documentation n'arrive jamais ou arrive sans le contexte vivant.</p><p><strong>Pattern 3 — Trop de doc :</strong> on documente des évidences par peur d'oublier. Conséquence: le coût de maintenance dépasse la valeur et toute la doc perd en crédibilité.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> doc-as-code, wiki ou Notion. <strong>Ce qui ne change pas :</strong> toute information non maintenue dérive vers l'obsolescence.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Auditer la santé documentaire",
            etapes: [
              "Choisis 5 pages de doc.",
              "Vérifie date, exactitude et exemples.",
              "Identifie les pages obsolètes ou ambiguës.",
              "Planifie les 3 corrections les plus critiques.",
            ],
            output: "Audit de 5 pages + plan de correction.",
            critere: "Plus de 2 pages obsolètes sur 5 signalent un problème de processus.",
          },
        ],
        piege: "Corriger les pages sans changer le processus qui les a laissées pourrir.",
      },
      verification: [
        "Pourquoi une doc obsolète est-elle dangereuse ?",
        "Tu suis une page d'onboarding vieille de 18 mois et trois commandes ne fonctionnent plus. Que fais-tu de la page, du processus de review et de la Definition of Done ?",
        "Pourquoi co-localiser doc et code ?",
      ],
    }),
    quoiDocumenter: coNode({
      id: "quoiDocumenter",
      label: "Quoi documenter",
      icon: "❓",
      kind: "communication",
      niveau: "Fondation",
      why: "Les équipes documentent souvent le quoi visible dans le code, et oublient le pourquoi: alternatives rejetées, contraintes et contexte.",
      system:
        "Ce nœud guide ADRs, runbooks, post-mortems, commentaires utiles et documentation d'API.",
      choice:
        "Priorité aux décisions et raisonnements, puis processus non évidents, contexte/contraintes, et enfin interfaces/API.",
      senior:
        "Il documente les décisions plus que les implémentations, surtout les décisions négatives. Quand l'équipe a déjà rejeté une option séduisante, il capture pourquoi; sinon le prochain nouveau la reproposera avec la même énergie. Un commentaire utile explique pourquoi une solution étrange existe, pas ce que chaque ligne fait.",
      errors: `<p><strong>Pattern 1 — Commenter le lisible :</strong> on paraphrase le code parce que c'est facile à produire. Conséquence: les commentaires ajoutent du volume sans réduire l'incertitude.</p><p><strong>Pattern 2 — Oublier les décisions négatives :</strong> on documente seulement ce qui a été choisi. Conséquence: les débats rejetés reviennent à chaque arrivée ou changement de contexte.</p><p><strong>Pattern 3 — FIXME sans contexte :</strong> on signale une dette sans impact, propriétaire ni condition de remboursement. Conséquence: la dette devient impossible à prioriser.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> formats. <strong>Ce qui ne change pas :</strong> les informations rares et coûteuses à reconstruire valent plus que les informations visibles.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Écrire un ADR",
            etapes: [
              "Choisis une décision technique récente.",
              "Écris le contexte.",
              "Liste les options considérées et rejetées.",
              "Note la décision et ses conséquences.",
            ],
            output: "ADR complet dans docs/decisions.",
            critere:
              "Quelqu'un qui arrive dans 2 ans doit comprendre pourquoi le système est ainsi.",
          },
        ],
        piege:
          "Réserver les ADRs aux très grandes décisions. Les petites conventions répétées méritent aussi mémoire.",
      },
      verification: [
        "Pourquoi documenter le pourquoi ?",
        "L'équipe a choisi REST au lieu de GraphQL après débat. Six mois plus tard, un nouveau propose GraphQL. Que doit contenir l'ADR pour éviter de rejouer le débat ?",
        "Pourquoi documenter les options rejetées ?",
      ],
    }),
    documentationCode: coNode({
      id: "documentationCode",
      label: "Documentation dans le code",
      icon: "💬",
      kind: "processus",
      niveau: "Fondation",
      why: "La documentation proche du code est la plus consultée naturellement et la plus susceptible d'être maintenue.",
      system:
        "Elle vit dans commentaires, commits, descriptions de PR, docstrings et conventions de review.",
      choice:
        "Commentaires pour le pourquoi, commits pour le changement, PR pour la décision, docstrings pour l'interface publique.",
      senior:
        "Il traite commit, description de PR et commentaire inline comme trois couches de mémoire. Le commit explique le changement durable, la PR explique le contexte de décision, le commentaire explique le pourquoi local que le code ne peut pas porter. Il supprime les commentaires qui mentent avec autant d'énergie qu'il corrige un test rouge.",
      errors: `<p><strong>Pattern 1 — Commentaires menteurs :</strong> le code change mais le commentaire reste parce que personne ne le teste. Conséquence: le lecteur fait confiance à l'information la plus fausse.</p><p><strong>Pattern 2 — PR sans description :</strong> l'auteur pense que le diff suffit parce que le contexte est frais dans sa tête. Conséquence: le reviewer devine l'intention et l'historique devient inutile.</p><p><strong>Pattern 3 — TODO sans tracking :</strong> on écrit une promesse dans le code pour soulager sa conscience. Conséquence: la dette n'a ni propriétaire, ni priorité, ni condition de sortie.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> langages et conventions. <strong>Ce qui ne change pas :</strong> la documentation co-localisée est mieux maintenue que la documentation lointaine.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Améliorer un fichier réel",
            etapes: [
              "Choisis un fichier récemment modifié.",
              "Identifie 3 endroits non évidents.",
              "Ajoute un commentaire qui répond à pourquoi c'est ainsi.",
              "Vérifie que le commentaire ne paraphrase pas le code.",
            ],
            output: "3 commentaires utiles centrés sur le pourquoi.",
            critere:
              "Si un meilleur nommage remplace le commentaire, corrige le code plutôt que d'ajouter du texte.",
          },
        ],
        piege: "Utiliser les commentaires pour compenser un code illisible.",
      },
      verification: [
        "Règle d'or d'un commentaire inline ?",
        "Tu tombes sur un commentaire qui contredit le comportement actuel du code. Que vérifies-tu avant de le supprimer ou le réécrire ?",
        "Pourquoi un commentaire qui ment est pire que rien ?",
      ],
    }),
    culturedoc: coNode({
      id: "culturedoc",
      label: "Culture de documentation",
      icon: "🌱",
      kind: "organisation",
      niveau: "Avancé",
      why: "La documentation est d'abord une culture. Les outils réduisent la friction, mais ne créent pas la motivation.",
      system:
        "La culture documentaire dépend de la confiance, du leadership, de la Definition of Done et du temps réellement alloué.",
      choice:
        "Traiter la doc comme first-class citizen, voir les leaders documenter, valoriser publiquement les contributions à la documentation.",
      senior:
        "Il regarde les signaux réels, pas les slogans: est-ce que les estimations incluent la doc, est-ce que les reviews bloquent une décision non documentée, est-ce qu'une contribution doc est célébrée comme une contribution produit ? La culture change quand le comportement attendu coûte ou rapporte quelque chose dans le système.",
      errors: `<p><strong>Pattern 1 — Attendre la stabilité :</strong> on reporte la doc parce que le code bouge encore. Conséquence: le code ne devient jamais assez stable et la mémoire disparaît pendant l'évolution.</p><p><strong>Pattern 2 — Changer d'outil :</strong> on migre vers Notion ou Confluence pour éviter de traiter les comportements. Conséquence: le nouveau wiki devient l'ancien wiki avec une meilleure interface.</p><p><strong>Pattern 3 — Forcer la doc :</strong> on impose une case à cocher sans valeur claire. Conséquence: l'équipe produit du remplissage qui satisfait le processus et n'aide personne.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> outils et templates. <strong>Ce qui ne change pas :</strong> une culture change par comportements répétés, pas par décret.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Évaluer la culture doc",
            etapes: [
              "Vérifie si la doc est estimée, reviewée et dans la Definition of Done.",
              "Liste les deux dernières contributions doc valorisées publiquement.",
              "Identifie un signal implicite que tu envoies contre la doc.",
              "Définis une action observable sur deux semaines.",
            ],
            output: "Diagnostic culturel + action observable.",
            critere:
              "Une action doit être spécifique: par exemple ajouter une question doc à chaque review cette semaine.",
          },
        ],
        piege: "Traiter un problème culturel comme un problème d'outil.",
      },
      verification: [
        "Pourquoi la doc est-elle culturelle ?",
        "Ton équipe dit valoriser la documentation, mais les PRs sans doc passent toujours et personne ne remercie les corrections de doc. Quels signaux corriges-tu en premier ?",
        "Pourquoi punir l'absence de doc produit du remplissage ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "pourquoiDocumenter", x: 10, y: 100, w: 165, h: 65 },
        { id: "docCommeDette", x: 225, y: 100, w: 155, h: 65 },
        { id: "quoiDocumenter", x: 435, y: 40, w: 140, h: 65 },
        { id: "documentationCode", x: 435, y: 165, w: 160, h: 65 },
        { id: "culturedoc", x: 660, y: 100, w: 150, h: 65 },
      ],
      edges: [
        { x1: 175, y1: 132, x2: 223, y2: 132, label: "alimente" },
        { x1: 380, y1: 112, x2: 433, y2: 72, label: "clarifie" },
        { x1: 380, y1: 150, x2: 433, y2: 188, label: "structure" },
        { x1: 575, y1: 73, x2: 658, y2: 118, label: "construit" },
        { x1: 595, y1: 200, x2: 658, y2: 152, label: "construit" },
      ],
    },
  },
});
