import { coNode, coSheet } from "./collaboration-common";

export const collaborationCommunication = coSheet({
  id: "collaboration-communication-externe",
  number: 2,
  title: "Communiquer Hors de l'Équipe Technique",
  subtitle: "Traduire, cadrer les attentes, présenter et aligner sans perdre la nuance technique.",
  badge: "Fiche Co02",
  meta: ["5 nœuds"],
  readingTime: "35 min",
  description:
    "La communication qui transforme une expertise technique en décisions comprises hors de l'équipe.",
  accent: "communication",
  nodes: {
    translationTechnique: coNode({
      id: "translationTechnique",
      label: "Traduire le technique",
      icon: "↔",
      kind: "communication",
      niveau: "Fondation",
      why: "Un développeur qui ne parle qu'aux développeurs limite son impact. Traduire le technique, ce n'est pas simplifier bêtement: c'est choisir le bon niveau d'abstraction.",
      system:
        "Cette compétence alimente la gestion des attentes, les présentations, les mauvaises nouvelles et l'alignement stakeholder.",
      choice:
        "Pour un PM, parler impact feature et timeline. Pour un dirigeant, parler risque et ROI. Pour un designer, parler contraintes, alternatives et coût d'implémentation.",
      senior:
        "Avant d'expliquer, il identifie la décision que l'autre personne doit prendre. Un PM a besoin d'impact scope/délai, un dirigeant de risque/ROI, un designer de contraintes et alternatives. Il ne traduit pas tout: il choisit le niveau d'abstraction qui permet à l'interlocuteur d'agir sans croire comprendre plus qu'il ne comprend.",
      errors: `<p><strong>Pattern 1 — Dumbing down :</strong> on simplifie jusqu'à devenir faux pour éviter l'effort de pédagogie. Conséquence: l'interlocuteur prend une décision confiante sur une représentation incorrecte.</p><p><strong>Pattern 2 — Jargon non traduit :</strong> on garde p99, SLO ou latence parce que ce vocabulaire est naturel dans l'équipe. Conséquence: les non-techniciens acquiescent sans comprendre, puis sont surpris par les impacts.</p><p><strong>Pattern 3 — Solution avant problème :</strong> on annonce une migration ou refactor sans expliquer la douleur. Conséquence: le stakeholder voit un coût technique, pas une décision de risque.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les sujets techniques. <strong>Ce qui ne change pas :</strong> celui qui communique porte la responsabilité d'adapter le message.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Traduire un sujet pour 3 interlocuteurs",
            etapes: [
              "Choisis une migration, dette ou décision technique.",
              "Explique-la en 3 phrases pour un PM.",
              "Explique-la en 3 phrases pour un dirigeant.",
              "Explique-la avec une analogie pour une personne non-tech.",
            ],
            output: "3 traductions du même sujet.",
            critere: "La personne cible doit pouvoir reformuler correctement l'enjeu.",
          },
        ],
        piege:
          "Confondre acquiescement et compréhension. La vraie mesure est la décision qui suit.",
      },
      verification: [
        "Différence entre simplifier et rendre faux ?",
        "Ton PM te demande pourquoi une refactorisation de deux semaines est nécessaire alors qu'aucune feature visible ne sortira. Comment traduis-tu le risque technique en impact produit ?",
        "Donne une analogie simple pour expliquer le cache.",
      ],
    }),
    gererAttentes: coNode({
      id: "gererAttentes",
      label: "Gérer les attentes",
      icon: "⏱",
      kind: "communication",
      niveau: "Fondation",
      why: "La frustration naît souvent de l'écart entre attente et réalité. Gérer les attentes transforme les surprises en décisions anticipées.",
      system:
        "Cela dépend de bonnes estimations, de risques communiqués et d'un suivi régulier même quand tout va bien.",
      choice:
        "Under-promise avec prudence, communiquer les risques tôt, donner des mises à jour courtes et régulières pour réduire l'anxiété.",
      senior:
        "Il annonce l'incertitude avant qu'elle ne devienne une excuse. Il distingue estimation et engagement dans la même phrase: probabilité, hypothèses, signaux d'alerte et date de révision. Il sait qu'un retard annoncé tôt ressemble à du professionnalisme; le même retard annoncé à la deadline ressemble à une trahison.",
      errors: `<p><strong>Pattern 1 — Optimisme sans marge :</strong> on annonce le scénario idéal pour paraître efficace ou rassurer. Conséquence: la première surprise devient une rupture de confiance.</p><p><strong>Pattern 2 — Silence en retard :</strong> on attend la deadline par honte ou espoir que le problème se résolve. Conséquence: les autres perdent toute capacité d'ajuster leurs plans.</p><p><strong>Pattern 3 — Promettre pour faire plaisir :</strong> on évite un conflit maintenant en transformant une estimation en promesse. Conséquence: le conflit revient plus tard, avec moins d'options et plus d'émotion.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> outils et reporting. <strong>Ce qui ne change pas :</strong> la confiance vient d'engagements prévisibles et tenus.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Communiquer les risques proactivement",
            etapes: [
              "Choisis une tâche actuelle.",
              "Liste les 3 risques principaux.",
              "Formule pour chacun impact, signal d'alerte et prochaine action.",
              "Identifie qui doit être prévenu.",
            ],
            output: "3 messages de risque prêts à envoyer.",
            critere: "Le message doit permettre à l'interlocuteur de décider ou ajuster ses plans.",
          },
        ],
        piege:
          "Sur-communiquer chaque micro-incertitude. Un risque communiqué doit avoir un impact réel.",
      },
      verification: [
        "Différence estimation/engagement ?",
        "Mercredi, tu sais que la livraison promise vendredi a 60% de chances de glisser à mardi. Qu'écris-tu au PM aujourd'hui, et que gardes-tu pour plus tard ?",
        "Limites de under-promise, over-deliver ?",
      ],
    }),
    presentationTech: coNode({
      id: "presentationTech",
      label: "Présenter un sujet technique",
      icon: "📊",
      kind: "communication",
      niveau: "Intermédiaire",
      why: "Une bonne présentation technique conduit une audience d'une question à une décision. Elle multiplie l'impact d'une idée technique.",
      system:
        "Elle s'appuie sur la traduction technique et sert les décisions collectives, RFC, ADR et arbitrages.",
      choice:
        "SCQA pour les décisions, Pyramid principle pour les audiences pressées, demo-first pour ancrer dans le concret.",
      senior:
        "Il commence par la tension que l'audience reconnaît, puis révèle seulement les détails nécessaires à la décision. Il prépare la dernière slide avant la première: décision demandée, option recommandée, risque accepté. Si personne ne sait quoi faire après la présentation, ce n'était pas une présentation technique, c'était un transfert d'anxiété.",
      errors: `<p><strong>Pattern 1 — Bottom-up :</strong> on raconte tout le chemin parce qu'on veut prouver le sérieux du travail. Conséquence: l'audience décroche avant de comprendre la décision attendue.</p><p><strong>Pattern 2 — Sans call-to-action :</strong> on termine par "des questions ?" au lieu d'une demande claire. Conséquence: la décision reste implicite et revient dans un autre meeting.</p><p><strong>Pattern 3 — Slides denses :</strong> on met le document entier sur les slides par peur d'oublier. Conséquence: l'audience lit, n'écoute plus, et retient moins.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> PowerPoint, Notion, vidéo ou demo. <strong>Ce qui ne change pas :</strong> une audience écoute mieux quand elle comprend vite ce qu'elle gagne.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Structurer avec SCQA",
            etapes: [
              "Choisis une décision technique à présenter.",
              "Écris la Situation partagée.",
              "Écris la Complication.",
              "Formule la Question et la Réponse.",
            ],
            output: "Squelette SCQA en 6 à 10 phrases.",
            critere: "Sans les slides, on doit comprendre problème, question et réponse.",
          },
        ],
        piege:
          "Faire un hybride document/présentation. Un slide accompagne la parole; un document doit vivre seul.",
      },
      verification: [
        "Pourquoi SCQA bat souvent le chronologique ?",
        "Tu présentes à 8 personnes une migration d'authentification qui demande une décision budget/risque. Quelle est ta première slide et quelle décision demandes-tu à la fin ?",
        "Différence entre slide et document ?",
      ],
    }),
    direBonneNouvelle: coNode({
      id: "direBonneNouvelle",
      label: "Annoncer bonnes et mauvaises nouvelles",
      icon: "📢",
      kind: "communication",
      niveau: "Intermédiaire",
      why: "Un projet a toujours des hauts et des bas. Savoir communiquer clairement les deux construit une crédibilité durable.",
      system:
        "Cette compétence complète la gestion des attentes et nourrit l'alignement stakeholder, surtout en contexte de tension.",
      choice:
        "Mauvaise nouvelle: directe, tôt, contextualisée, avec proposition. Bonne nouvelle: exacte, prouvée par des données, sans exagération.",
      senior:
        "Il prépare toujours la question implicite: qu'est-ce qu'on fait maintenant ? Il donne la mauvaise nouvelle assez tôt pour préserver des options, et assez directement pour éviter que l'autre doive la deviner. Il ne compense pas une mauvaise nouvelle par du flou positif: il compense par un plan.",
      errors: `<p><strong>Pattern 1 — Mauvaise nouvelle enterrée :</strong> on la cache à la fin d'un email positif pour éviter l'inconfort. Conséquence: l'interlocuteur se sent manipulé et relit tout le message avec méfiance.</p><p><strong>Pattern 2 — Sans proposition :</strong> on annonce le problème sans prochaine étape parce qu'on n'a pas encore tout résolu. Conséquence: l'anxiété augmente et le stakeholder remplit les blancs avec le pire scénario.</p><p><strong>Pattern 3 — Bonne nouvelle exagérée :</strong> on amplifie un succès pour regagner du crédit. Conséquence: la crédibilité future baisse quand la réalité rattrape le récit.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> canal et format. <strong>Ce qui ne change pas :</strong> une mauvaise nouvelle tôt et claire cause moins de dégâts qu'une surprise tardive.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Formuler une mauvaise nouvelle",
            etapes: [
              "Choisis un retard, bug ou scope réduit.",
              "Écris le fait directement.",
              "Ajoute le contexte sans excuse.",
              "Ajoute une proposition d'action concrète.",
            ],
            output: "Message prêt à envoyer: fait, contexte, proposition.",
            critere: "Le message doit être compréhensible sans réunion d'explication.",
          },
        ],
        piege: "Attendre d'avoir la solution complète avant d'annoncer le problème.",
      },
      verification: [
        "Structure d'une mauvaise nouvelle efficace ?",
        "Un bug critique force à retirer une feature annoncée en démo client demain. Rédige l'ordre des informations dans ton message au stakeholder.",
        "Différence entre responsabilité et excuse ?",
      ],
    }),
    alignementStakeholders: coNode({
      id: "alignementStakeholders",
      label: "Aligner les stakeholders",
      icon: "🎯",
      kind: "communication",
      niveau: "Avancé",
      why: "Un projet peut échouer malgré un bon code si les parties prenantes ne partagent pas le problème, les contraintes et la direction.",
      system:
        "L'alignement synthétise traduction, attentes, présentation, processus de décision et compréhension des parties prenantes.",
      choice:
        "Pré-alignement avant réunion, communication en cercles concentriques, et DACI pour clarifier les rôles décisionnels : Driver (coordonne le processus), Approver (décide finalement — une seule personne), Contributors (consultés pour leur expertise), Informed (notifiés du résultat).",
      senior:
        "Il sait que les grandes décisions se prennent rarement pendant la réunion finale. Avant, il cartographie intérêts, peurs et veto possibles, puis parle aux personnes clés une par une. La réunion sert à rendre visible un alignement déjà travaillé, pas à découvrir en public la première objection majeure.",
      errors: `<p><strong>Pattern 1 — Stakeholder oublié :</strong> on consulte les personnes visibles et on oublie une équipe affectée. Conséquence: une décision techniquement juste échoue à l'exécution.</p><p><strong>Pattern 2 — Alignement par email :</strong> on demande une validation froide sur un sujet politique pour gagner du temps. Conséquence: les objections sortent tard, sans nuance, et durcissent les positions.</p><p><strong>Pattern 3 — Aligner sans écouter :</strong> on confond alignement et persuasion parce qu'on veut défendre sa solution. Conséquence: les gens se sentent utilisés plutôt qu'impliqués et résistent après la décision.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> taille et politique de l'organisation. <strong>Ce qui ne change pas :</strong> une décision co-construite s'exécute mieux qu'une décision imposée.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Cartographier les stakeholders",
            etapes: [
              "Choisis une décision technique importante.",
              "Liste toutes les personnes ou équipes affectées.",
              "Identifie leurs intérêts et objections possibles.",
              "Planifie l'ordre et le format de consultation.",
            ],
            output: "Carte stakeholder + objections + plan de pré-alignement.",
            critere:
              "Aucune objection majeure ne doit apparaître pour la première fois en réunion finale.",
          },
        ],
        piege:
          "Confondre consultation et vote. Tout le monde peut être entendu sans avoir un veto.",
      },
      verification: [
        "Pourquoi les décisions importantes se préparent avant la réunion ?",
        "Tu dois arrêter une intégration utilisée par Sales mais coûteuse pour l'équipe technique. Qui consultes-tu avant la réunion finale, et que cherches-tu à apprendre ?",
        "Pourquoi les cercles concentriques réduisent les malentendus ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "translationTechnique", x: 10, y: 100, w: 175, h: 65 },
        { id: "gererAttentes", x: 235, y: 100, w: 140, h: 65 },
        { id: "presentationTech", x: 430, y: 40, w: 155, h: 65 },
        { id: "direBonneNouvelle", x: 430, y: 165, w: 165, h: 65 },
        { id: "alignementStakeholders", x: 655, y: 100, w: 155, h: 65 },
      ],
      edges: [
        { x1: 185, y1: 132, x2: 233, y2: 132, label: "facilite" },
        { x1: 375, y1: 112, x2: 428, y2: 72, label: "structure" },
        { x1: 375, y1: 150, x2: 428, y2: 188, label: "clarifie" },
        { x1: 585, y1: 73, x2: 653, y2: 118, label: "construit" },
        { x1: 595, y1: 200, x2: 653, y2: 152, label: "construit" },
      ],
    },
  },
});
