import { designNode, designSheet } from "./design-common";

export const designCode = designSheet({
  id: "design-D04",
  number: 24,
  title: "Du Design au Code",
  subtitle: "Transformer les décisions de design en systèmes maintenables et implémentables",
  badge: "Fiche D04 — Vision Systémique",
  meta: ["5 nœuds · universel"],
  readingTime: "20 min",
  description: "Design system, Figma, design tokens, handoff et itération design-dev comme continuité entre intention et produit réel.",
  accent: "systeme",
  nodes: {
    designSystem: designNode({
      id: "designSystem",
      label: "Le design system",
      icon: "⬡",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Au début, chaque écran peut être ajusté à la main. Puis l'équipe grossit, les boutons divergent, les espacements changent, les messages d'erreur n'ont plus le même ton, et personne ne sait quelle version est la bonne. Un design system existe pour empêcher la cohérence de dépendre de la mémoire individuelle.",
      system: "Le design system synthétise les principes visuels <span class=\"ref-fiche\">→ D02</span>, les composants et états <span class=\"ref-fiche\">→ D03</span>, puis les relie au code via tokens <span class=\"ref-fiche\">→ D04</span> et handoff <span class=\"ref-fiche\">→ D04</span>. Il sert aussi la maintenance technique <span class=\"ref-fiche\">→ P04</span> : les décisions répétées deviennent un système plutôt qu'une série d'exceptions.",
      choice: "Une bibliothèque de composants documente des éléments réutilisables ; un design system ajoute règles d'usage, principes, tokens, accessibilité, gouvernance et contribution ; des brand guidelines cadrent surtout l'identité visuelle. Le bon niveau dépend de la taille de l'équipe, du nombre de produits et du coût de l'incohérence.",
      senior: "Un designer expérimenté commence par les composants les plus fréquents et les plus risqués, pas par un système complet abstrait. Il redoute le design system musée : beau, documenté, mais non utilisé en production. Son modèle mental : un système n'existe vraiment que si modifier une décision partagée change les écrans réels et le code réel.",
      errors: "<p><strong>Pattern 1 — Le musée de composants :</strong> l'équipe construit une bibliothèque parfaite hors du produit, puis personne ne l'utilise. La cause est l'envie de système avant d'avoir observé les usages répétés.</p><p><strong>Pattern 2 — La règle sans gouvernance :</strong> le système décrit des règles mais personne ne décide des exceptions, contributions et dépréciations. Ce pattern vient de la confusion entre documentation et fonctionnement organisationnel.</p><p><strong>Pattern 3 — Le composant sans contexte :</strong> le système montre l'apparence du composant mais pas quand l'utiliser, quand l'éviter, ni quels contenus sont acceptés. La cause est une focalisation sur l'objet visuel plutôt que sur la décision d'usage.</p>",
      invariants: "<p>Les outils de système changent, mais la cohérence à grande échelle nécessite toujours une source de vérité maintenue. <strong>Ce qui change :</strong> les plateformes, formats de documentation et bibliothèques UI. <strong>Ce qui ne change pas :</strong> sans règles partagées, maintenues et utilisées dans le produit réel, la cohérence se dégrade avec chaque écran ajouté.</p>",
      practice: {
        titre: "Définir un design system minimal",
        etapes: ["Choisis un produit avec au moins trois écrans.", "Repère les cinq décisions répétées les plus visibles : bouton, champ, couleur, espacement, message ou carte.", "Pour chacune, écris la règle actuelle, l'usage prévu et l'exception acceptable.", "Identifie laquelle doit devenir composant, token ou règle documentaire."],
        output: "Inventaire minimal de design system avec cinq décisions répétées, usage, exceptions et type de formalisation.",
        critere: "Le système minimal est utile si au moins une future maquette pourrait réutiliser une règle sans rediscuter la décision.",
        piege: "Créer un système exhaustif avant d'avoir un produit vivant. La bonne première version couvre les répétitions réelles, pas toutes les possibilités imaginables."
      },
      verification: ["Quelle différence fais-tu entre une bibliothèque de composants et un design system complet ?", "Ton équipe a trois styles de boutons primaires en production. Quelle première action de design system prioriserais-tu ?", "Pourquoi un design system non utilisé dans le code n'est-il pas une vraie source de vérité ?"]
    }),
    figma: designNode({
      id: "figma",
      label: "Figma",
      icon: "✦",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Un fichier de design peut vite devenir un grenier : anciennes pistes, maquettes finales, composants cassés, commentaires oubliés, et pages nommées \"final_final\". L'outil de design existe pour collaborer, mais sans structure il devient une source de confusion. Figma est puissant parce qu'il rend le design partagé ; il devient dangereux quand personne ne sait quelle page fait foi.",
      system: "Figma est le lieu où les décisions de D01, D02 et D03 sont rendues visibles avant le code. Il doit rester aligné avec le design system <span class=\"ref-fiche\">→ D04</span>, les tokens <span class=\"ref-fiche\">→ D04</span> et le handoff <span class=\"ref-fiche\">→ D04</span>. Il n'est pas la vérité finale seul : la vérité doit rejoindre le produit développé.",
      choice: "Figma est le standard dominant pour collaboration, composants, variables, prototypes et Dev Mode ; Penpot est une alternative open source intéressante pour souveraineté et formats ouverts ; Sketch reste présent dans certains environnements macOS ; un prototype HTML peut être préférable pour interactions complexes ou contraintes techniques fortes. L'outil se choisit selon collaboration, gouvernance, intégration et nature du prototype.",
      senior: "Un designer expérimenté organise le fichier pour réduire l'ambiguïté : pages séparées pour exploration, ready-for-dev, composants et archive ; composants nommés selon le système ; instances utilisées plutôt que copies détachées ; versioning clair pour les décisions. Il redoute moins le fichier imparfait que le fichier où deux personnes raisonnables ne savent pas quoi implémenter.",
      errors: "<p><strong>Pattern 1 — Le fichier labyrinthe :</strong> les écrans finalisés côtoient explorations et archives sans statut clair. La cause est la vitesse de travail non accompagnée d'hygiène documentaire.</p><p><strong>Pattern 2 — La copie détachée :</strong> au lieu d'utiliser une instance du composant, on copie et modifie visuellement. Ce pattern vient d'un besoin local rapide qui casse la synchronisation globale.</p><p><strong>Pattern 3 — Le prototype théâtre :</strong> le prototype montre une démo fluide mais ignore états d'erreur, contenus longs et contraintes techniques. La cause est la volonté de convaincre avant de vérifier la robustesse.</p>",
      invariants: "<p>Les outils changent, mais la collaboration exige toujours de distinguer exploration, décision et spécification. <strong>Ce qui change :</strong> les fonctionnalités de Figma, Penpot, Sketch ou prototypes code. <strong>Ce qui ne change pas :</strong> un support de design utile doit permettre à l'équipe de savoir ce qui est exploratoire, validé, obsolète et prêt à développer.</p>",
      practice: {
        titre: "Organiser un fichier de design pour le handoff",
        etapes: ["Prends un fichier ou imagine un fichier produit avec plusieurs écrans.", "Définis quatre pages : Exploration, Ready for dev, Components, Archive.", "Écris les règles de passage d'une page à l'autre et le statut attendu de chaque écran.", "Nomme trois composants avec une convention stable, par exemple Button/Primary/Default."],
        output: "Structure de fichier avec pages, règles de statut et convention de nommage de composants.",
        critere: "La structure est claire si une personne nouvelle peut identifier en moins d'une minute quels écrans sont prêts à développer.",
        piege: "Croire que Figma résout la collaboration par défaut. L'outil rend la collaboration possible, mais l'organisation du fichier rend la collaboration fiable."
      },
      verification: ["Pourquoi Figma seul ne suffit-il pas comme source de vérité produit ?", "Un développeur trouve deux versions contradictoires du même écran dans le fichier. Quelle règle d'organisation manque ?", "Dans quel cas un prototype HTML peut-il être plus pertinent qu'un prototype Figma ?"]
    }),
    designTokens: designNode({
      id: "designTokens",
      label: "Design tokens",
      icon: "{}",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Copie une couleur en hex dans vingt fichiers et le prochain changement devient une chasse manuelle. Choisis les espacements à l'œil et chaque écran dérive légèrement. Les tokens transforment une valeur visuelle répétée en décision nommée, portable et synchronisable.",
      system: "Les tokens traduisent les décisions de couleur, typo et espacement de <span class=\"ref-fiche\">→ D02</span> en valeurs utilisables par le code. Ils alimentent le design system <span class=\"ref-fiche\">→ D04</span>, réduisent les ambiguïtés de handoff <span class=\"ref-fiche\">→ D04</span>, et permettent aux composants <span class=\"ref-fiche\">→ D03</span> de rester cohérents entre modes et plateformes.",
      choice: "Les tokens primitifs nomment une valeur brute comme blue-500 ; les tokens sémantiques nomment une intention comme color-action-primary ; les tokens de composant nomment un usage local comme button-primary-background. Les primitifs facilitent l'échelle, les sémantiques protègent le sens, les tokens de composant gèrent les exceptions. Un système mature combine les trois sans exposer les valeurs brutes partout.",
      senior: "Un designer expérimenté refuse les noms comme color1 ou spacing-big parce qu'ils ne survivront pas aux changements. Il anticipe mode sombre, thèmes, états, accessibilité et plateformes. Il sait qu'un bon token décrit pourquoi une valeur existe, pas seulement quelle valeur elle porte aujourd'hui.",
      errors: "<p><strong>Pattern 1 — Le token peinture :</strong> les tokens sont nommés par apparence immédiate, comme purpleButton, puis deviennent absurdes quand la couleur change. La cause est une nomination basée sur le présent plutôt que sur l'intention.</p><p><strong>Pattern 2 — Le hex clandestin :</strong> des valeurs directes continuent d'apparaître dans le code malgré le système de tokens. Ce pattern vient d'un système incomplet ou trop lourd, que les équipes contournent pour avancer.</p><p><strong>Pattern 3 — Le token sans usage :</strong> on crée des dizaines de tokens jamais utilisés. La cause est l'abstraction prématurée : vouloir couvrir tous les futurs possibles avant les besoins réels.</p>",
      invariants: "<p>Les formats de tokens évoluent, mais nommer une décision partagée reste le moyen de la maintenir. <strong>Ce qui change :</strong> les outils de synchronisation, formats JSON, variables Figma et pipelines CSS. <strong>Ce qui ne change pas :</strong> une valeur répétée sans nom finit toujours par diverger, et une valeur nommée sans intention finit par devenir incompréhensible.</p>",
      practice: {
        titre: "Créer une mini-échelle de tokens",
        etapes: ["Choisis trois décisions visuelles répétées : couleur d'action, couleur d'erreur, espacement de section.", "Définis pour chacune un token primitif, un token sémantique et un exemple d'usage composant.", "Vérifie que les noms restent vrais si la valeur change.", "Repère une valeur qui ne mérite pas encore de token parce qu'elle n'est pas répétée."],
        output: "Table de tokens avec primitif, sémantique, usage composant et justification.",
        critere: "Un token est bien nommé si tu peux changer sa valeur sans devoir renommer son intention.",
        piege: "Transformer chaque pixel en token. Un token doit représenter une décision partagée, pas une obsession de granularité."
      },
      verification: ["Quelle différence fais-tu entre token primitif, token sémantique et token de composant ?", "Ton produit passe en mode sombre et un token gray-900 est utilisé pour du texte, des bordures et des fonds. Quel problème cela révèle ?", "Pourquoi le nom d'un token doit-il survivre à un changement de valeur ?"]
    }),
    handoff: designNode({
      id: "handoff",
      label: "Handoff design-dev",
      icon: "↔",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Un développeur reçoit une maquette belle et finale, puis découvre les questions qui n'ont pas été designées : que se passe-t-il en loading, quel texte si le titre déborde, quel comportement au clavier, quel état d'erreur, quelle valeur de token ? Le handoff existe pour transformer une intention visuelle en spécification implémentable.",
      system: "Le handoff relie composants <span class=\"ref-fiche\">→ D03</span>, états d'interface <span class=\"ref-fiche\">→ D03</span>, tokens <span class=\"ref-fiche\">→ D04</span> et contraintes techniques de la partie développement <span class=\"ref-fiche\">→ T03</span>. Il protège l'UX de <span class=\"ref-fiche\">→ D01</span> en évitant que les détails non spécifiés soient résolus au hasard dans le code.",
      choice: "Le handoff final convient aux petits changements très cadrés ; le handoff continu implique les développeurs pendant la conception et réduit les surprises ; Storybook ou une documentation vivante permet de comparer composants design et code ; Dev Mode donne mesures et styles mais ne transmet pas seul l'intention, les règles métier et les edge cases.",
      senior: "Un designer expérimenté ne considère jamais le handoff comme une passation froide. Il anticipe les questions du développement : contenu long, responsive, states, accessibilité, tokens, animation, erreur réseau, permissions. Il préfère une conversation tôt avec un développeur à dix commentaires tardifs sur une maquette déjà vendue.",
      errors: "<p><strong>Pattern 1 — Le handoff lancer de colis :</strong> le designer livre un fichier final et disparaît. La cause est une séparation artificielle entre conception et implémentation, qui transforme les questions normales en interruptions.</p><p><strong>Pattern 2 — Le pixel sans intention :</strong> les dimensions sont fournies mais pas la raison de la décision. Ce pattern vient d'une croyance que le code reproduit des pixels, alors qu'il doit reproduire un comportement sous contraintes.</p><p><strong>Pattern 3 — L'edge case hors champ :</strong> les cas limites ne sont pas spécifiés parce qu'ils rendent la maquette moins propre. La cause est la confusion entre présentation de concept et préparation à la production.</p>",
      invariants: "<p>Les outils de handoff deviennent plus automatiques, mais l'intention ne se déduit jamais entièrement des pixels. <strong>Ce qui change :</strong> Dev Mode, inspecteurs, annotations et outils de documentation. <strong>Ce qui ne change pas :</strong> une implémentation fiable exige toujours de transmettre comportements, contraintes, états et priorités, pas seulement des styles.</p>",
      practice: {
        titre: "Préparer un handoff complet",
        etapes: ["Choisis un écran prêt à développer.", "Liste les composants utilisés et les tokens attendus pour couleurs, typo et espacements.", "Ajoute les états : loading, empty, error, succès, focus clavier et mobile.", "Écris trois questions à poser au développeur avant implémentation."],
        output: "Checklist de handoff avec composants, tokens, états et questions design-dev.",
        critere: "Le handoff est prêt si les questions restantes portent sur des choix techniques, pas sur des intentions UX non spécifiées.",
        piege: "Confondre inspection automatique et compréhension. Un outil peut lire une taille, pas expliquer pourquoi l'élément doit se comporter ainsi."
      },
      verification: ["Pourquoi Dev Mode ne remplace-t-il pas une vraie spécification de handoff ?", "Un titre peut faire 12 ou 120 caractères dans la vraie donnée. Où cette information doit-elle apparaître dans le handoff ?", "Pourquoi le handoff continu réduit-il plus de risque qu'un handoff final ?"]
    }),
    iterationDesignDev: designNode({
      id: "iterationDesignDev",
      label: "Itération design-dev",
      icon: "🔄",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Quand le design attend que tout soit parfait avant de parler au développement, les contraintes arrivent trop tard : animation coûteuse, composant impossible à réutiliser, performance dégradée, responsive fragile. Quand le développement implémente sans retour design, l'intention UX se dilue. L'itération design-dev existe pour faire rencontrer intention et faisabilité avant que les décisions ne soient verrouillées.",
      system: "L'itération design-dev ferme la boucle entre expérience visée <span class=\"ref-fiche\">→ D01</span>, composants conçus <span class=\"ref-fiche\">→ D03</span>, design system <span class=\"ref-fiche\">→ D04</span> et code produit <span class=\"ref-fiche\">→ T04</span>. Elle alimente aussi la mesure et l'apprentissage <span class=\"ref-fiche\">→ C06</span> : le design n'est validé que quand le produit réel produit le comportement attendu.",
      choice: "Le design ahead prépare un ou deux sprints d'avance pour réduire les blocages ; le design en parallèle convient aux petites équipes très synchronisées ; le pairing design-dev résout vite les interactions ambiguës ; la design QA vérifie l'implémentation réelle contre l'intention, sans tomber dans le pixel-perfect aveugle.",
      senior: "Un designer expérimenté sait que \"pixel-perfect\" est souvent une mauvaise question. Il vérifie plutôt si la hiérarchie, les états, l'accessibilité, les comportements et les intentions sont préservés dans le code. Il anticipe les compromis : parfois il faut ajuster le design pour une meilleure maintenabilité, parfois il faut défendre un détail parce qu'il porte la compréhension utilisateur.",
      errors: "<p><strong>Pattern 1 — La maquette intouchable :</strong> toute contrainte technique est vécue comme une dégradation du design. La cause est l'attachement au livrable plutôt qu'à l'intention utilisateur.</p><p><strong>Pattern 2 — Le dev comme exécutant :</strong> le développeur est consulté seulement après validation, donc ses connaissances de performance, responsive et accessibilité arrivent trop tard. Ce pattern vient d'une séparation hiérarchique des métiers.</p><p><strong>Pattern 3 — La QA cosmétique :</strong> la revue se limite à comparer les pixels, sans vérifier les états, le clavier, les données réelles ou les erreurs. La cause est que le visible immédiat attire plus l'attention que le comportement systémique.</p>",
      invariants: "<p>Les méthodes de production changent, mais une interface réelle est toujours le résultat d'un compromis entre intention, contrainte et usage observé. <strong>Ce qui change :</strong> les cycles de sprint, outils de QA, frameworks frontend et modes de collaboration. <strong>Ce qui ne change pas :</strong> design et code doivent itérer ensemble pour préserver l'expérience quand elle rencontre les contraintes du produit réel.</p>",
      practice: {
        titre: "Structurer une revue design-dev",
        etapes: ["Choisis une fonctionnalité en cours ou imagine une fonctionnalité prête à intégrer.", "Prépare une liste de vérification : hiérarchie, états, responsive, accessibilité, tokens, données longues, performance perçue.", "Décide quels points doivent être testés dans le navigateur plutôt que dans la maquette.", "Formule trois compromis acceptables et trois éléments à défendre absolument."],
        output: "Plan de revue design-dev avec checklist, tests navigateur, compromis et points non négociables.",
        critere: "La revue est utile si elle distingue clairement un écart cosmétique, un écart d'intention UX et une contrainte technique légitime.",
        piege: "Utiliser la revue design-dev comme tribunal de conformité. Le but est d'améliorer le produit réel, pas de prouver que la maquette avait toujours raison."
      },
      verification: ["Pourquoi le pixel-perfect strict peut-il être une mauvaise métrique de qualité ?", "Un développeur explique qu'une animation prévue coûte trop cher en performance sur mobile. Comment raisonnes-tu le compromis ?", "Pourquoi l'expérience réelle ne peut-elle pas être validée uniquement dans Figma ?"]
    })
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "designSystem", x: 10, y: 100, w: 140, h: 65 },
        { id: "figma", x: 200, y: 100, w: 100, h: 65 },
        { id: "designTokens", x: 355, y: 40, w: 130, h: 65 },
        { id: "handoff", x: 355, y: 165, w: 120, h: 65 },
        { id: "iterationDesignDev", x: 555, y: 100, w: 175, h: 65 }
      ],
      edges: [
        { x1: 150, y1: 132, x2: 198, y2: 132, label: "structure" },
        { x1: 300, y1: 112, x2: 353, y2: 72, label: "génère" },
        { x1: 300, y1: 150, x2: 353, y2: 188, label: "organise" },
        { x1: 485, y1: 72, x2: 553, y2: 118, label: "alimente" },
        { x1: 475, y1: 200, x2: 553, y2: 150, label: "alimente" }
      ]
    }
  }
});
