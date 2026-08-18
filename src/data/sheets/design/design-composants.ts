import { designNode, designSheet } from "./design-common";

export const designComposants = designSheet({
  id: "design-D03",
  number: 23,
  title: "Composants et Patterns",
  subtitle: "Construire des interfaces cohérentes avec des composants, états et patterns robustes",
  badge: "Fiche D03",
  meta: ["5 nœuds"],
  readingTime: "20 min",
  description: "Anatomie des composants, navigation, formulaires, états d'interface et responsive design.",
  accent: "pattern",
  nodes: {
    anatomieComposant: designNode({
      id: "anatomieComposant",
      label: "Anatomie d'un composant",
      icon: "◻",
      kind: "pattern",
      niveau: "Fondation",
      why: "Deux boutons se ressemblent au départ, puis l'un reçoit une icône, l'autre un chargement, un troisième un texte trop long, et le quatrième doit être désactivé. Sans anatomie claire, chaque écran réinvente un morceau d'interface et les développeurs devinent les règles. Un composant existe pour transformer un dessin répété en contrat réutilisable.",
      system: "Le composant matérialise les principes UX de <span class=\"ref-fiche\">→ D01</span> avec les décisions visuelles de <span class=\"ref-fiche\">→ D02</span>. Il devient ensuite une brique de design system <span class=\"ref-fiche\">→ D04</span> et une contrainte de handoff <span class=\"ref-fiche\">→ D04</span> : plus son anatomie est claire, moins le code doit interpréter les intentions.",
      choice: "Trois niveaux de composant coexistent. Un composant local sert un écran précis et évite la sur-ingénierie ; un composant réutilisable possède des variants, états et règles documentées ; un composant composé expose des slots ou sous-parties configurables pour des cas complexes. Atomic Design de Brad Frost aide à penser l'échelle : atomes, molécules, organismes, templates, pages.",
      senior: "Un designer expérimenté teste un composant contre ses limites avant de le valider : texte très long, absence d'icône, état loading, disabled, focus clavier, erreur, thème sombre, largeur mobile. Il redoute le composant qui fonctionne seulement dans la maquette parfaite, parce qu'il deviendra une dette d'interface dès le premier contenu réel.",
      errors: "<p><strong>Pattern 1 — Le composant carte postale :</strong> le composant est dessiné dans son état idéal seulement. La cause est la pression de produire une belle maquette, alors que la robustesse se voit dans les états moins photogéniques.</p><p><strong>Pattern 2 — L'explosion de variants :</strong> chaque léger besoin crée un nouveau variant jusqu'à rendre le composant incompréhensible. Ce pattern vient d'une absence de règles sur ce qui doit être une propriété, un slot ou un nouveau composant.</p><p><strong>Pattern 3 — Le contrat implicite :</strong> le design montre l'apparence mais ne précise pas les comportements, limites et états. Les développeurs comblent les trous, puis l'interface diverge selon les pages.</p>",
      invariants: "<p>Les bibliothèques changent, mais une interface réutilisable a toujours besoin de règles explicites. <strong>Ce qui change :</strong> les frameworks, conventions de composants et outils de documentation. <strong>Ce qui ne change pas :</strong> un composant fiable définit toujours sa structure, ses états, ses variants et ses limites avant d'être réutilisé.</p>",
      practice: {
        titre: "Spécifier un bouton comme composant",
        etapes: ["Choisis un bouton réel d'une interface.", "Décris son anatomie : label, icône, taille, zone tactile, couleur, état de focus.", "Liste ses variants nécessaires : primaire, secondaire, danger, avec ou sans icône, pleine largeur ou contenu.", "Ajoute les états default, hover, focus, active, disabled et loading, avec le comportement attendu."],
        output: "Fiche de composant bouton avec anatomie, variants, états et règles de contenu.",
        critere: "La fiche est suffisante si un développeur peut implémenter le bouton sans demander ce qui se passe en loading, disabled ou texte long.",
        piege: "Créer un composant global trop tôt. Si un pattern n'a qu'un seul usage stable, le transformer en composant réutilisable peut rigidifier inutilement le produit."
      },
      verification: ["Pourquoi un composant est-il un contrat plutôt qu'un simple morceau de maquette ?", "Ton bouton fonctionne en desktop avec un texte court, mais casse avec un texte de 38 caractères sur mobile. Quelle partie de la spécification manquait ?", "Quel trade-off existe entre composant très spécifique et composant très universel ?"]
    }),
    navigation: designNode({
      id: "navigation",
      label: "Patterns de navigation",
      icon: "☰",
      kind: "pattern",
      niveau: "Fondation",
      why: "Un utilisateur perdu ne pense pas que la navigation a un défaut théorique ; il doute de son emplacement, craint d'avoir raté quelque chose, ou conclut que le produit demande trop d'effort. Une bonne navigation répond en permanence à trois questions : où suis-je, où puis-je aller, comment revenir ?",
      system: "La navigation dépend de l'architecture d'information issue de la hiérarchie <span class=\"ref-fiche\">→ D01</span> et du flux utilisateur <span class=\"ref-fiche\">→ D01</span>. Elle influence les composants <span class=\"ref-fiche\">→ D03</span>, le responsive <span class=\"ref-fiche\">→ D03</span> et les choix visuels de repérage <span class=\"ref-fiche\">→ D02</span> comme contraste, position et état actif.",
      choice: "Une barre supérieure convient aux produits avec peu de sections principales ; une sidebar supporte des outils denses et des hiérarchies persistantes ; une bottom navigation sert les actions mobiles fréquentes, souvent 3 à 5 destinations ; un breadcrumb clarifie une profondeur ; la recherche devient navigation quand l'espace informationnel est trop large pour être parcouru manuellement.",
      senior: "Un designer expérimenté ne choisit pas un pattern parce qu'il est tendance : il regarde fréquence d'usage, profondeur, changement de contexte et taille d'écran. Il redoute le menu hamburger utilisé pour cacher une architecture mal priorisée. Sur mobile, il vérifie aussi que les destinations critiques restent accessibles sans chasse au menu.",
      errors: "<p><strong>Pattern 1 — Le hamburger pansement :</strong> on cache la complexité dans un menu au lieu de prioriser les destinations. La cause est l'évitement : il est plus facile de cacher que de décider ce qui compte.</p><p><strong>Pattern 2 — Le labyrinthe profond :</strong> l'utilisateur descend dans plusieurs niveaux sans repère clair pour remonter. Ce pattern vient souvent d'une structure calquée sur l'organisation interne plutôt que sur les tâches utilisateur.</p><p><strong>Pattern 3 — L'état actif muet :</strong> la navigation existe mais ne signale pas où l'utilisateur se trouve. La cause est une vision décorative de la nav, oubliant son rôle d'orientation.</p>",
      invariants: "<p>Les patterns changent avec les devices, mais l'orientation reste un besoin cognitif stable. <strong>Ce qui change :</strong> les formats de navigation, gestes et conventions selon écran. <strong>Ce qui ne change pas :</strong> un utilisateur doit toujours pouvoir comprendre sa position, ses options et son chemin de retour.</p>",
      practice: {
        titre: "Choisir un pattern de navigation",
        etapes: ["Liste les destinations principales d'un produit réel ou imaginé.", "Classe-les par fréquence d'usage et criticité utilisateur.", "Choisis un pattern : top nav, sidebar, bottom nav, breadcrumb, recherche ou combinaison limitée.", "Justifie le choix avec profondeur, fréquence, taille d'écran et besoin de retour."],
        output: "Décision de navigation argumentée avec destinations prioritaires et pattern choisi.",
        critere: "La décision est solide si chaque destination visible a une raison liée à l'usage, pas seulement à l'organisation interne.",
        piege: "Traiter la navigation comme une liste exhaustive. La navigation principale est une sélection, pas un plan complet de l'entreprise."
      },
      verification: ["Quelles trois questions une bonne navigation doit-elle résoudre en continu ?", "Une app mobile bancaire cache \"virement\" dans un hamburger alors que c'est l'action la plus fréquente. Quel pattern proposerais-tu et pourquoi ?", "Pourquoi la navigation dépend-elle davantage des tâches utilisateur que de la structure interne de l'entreprise ?"]
    }),
    formulaires: designNode({
      id: "formulaires",
      label: "Formulaires",
      icon: "📝",
      kind: "pattern",
      niveau: "Intermédiaire",
      why: "Au moment de saisir ses informations, l'utilisateur donne quelque chose au produit : temps, données personnelles, attention, parfois confiance financière. Chaque champ inutile, label flou ou erreur tardive augmente le risque d'abandon. Un bon formulaire transforme cette saisie fragile en conversation guidée.",
      system: "Les formulaires combinent charge cognitive <span class=\"ref-fiche\">→ D01</span>, feedback d'erreur <span class=\"ref-fiche\">→ D01</span>, typographie lisible <span class=\"ref-fiche\">→ D02</span> et composants robustes <span class=\"ref-fiche\">→ D03</span>. Ils influencent aussi la mesure produit <span class=\"ref-fiche\">→ C06</span> : taux de complétion, abandon par champ et erreurs récurrentes.",
      choice: "Un formulaire court en une page fonctionne quand la tâche est simple ; un formulaire en étapes réduit la charge pour les demandes longues ; la validation inline aide à corriger tôt mais peut devenir agressive si elle s'affiche avant la fin de saisie ; la validation à la soumission convient aux cas simples mais rend les erreurs plus coûteuses quand le formulaire est long.",
      senior: "Un designer expérimenté vérifie d'abord si chaque champ mérite d'exister. Il sait qu'un placeholder ne remplace jamais un label : dès que l'utilisateur saisit, l'aide disparaît. Il anticipe l'autofill, le clavier mobile, les formats locaux, les messages d'erreur récupérables et l'ordre logique de saisie.",
      errors: "<p><strong>Pattern 1 — Le champ par curiosité :</strong> l'équipe demande une information parce qu'elle pourrait servir plus tard. La cause est l'appétit de données, mais l'utilisateur paie immédiatement le coût de saisie.</p><p><strong>Pattern 2 — Le placeholder fantôme :</strong> le label est caché dans le placeholder, puis disparaît quand l'utilisateur écrit. Ce pattern vient d'une recherche de sobriété visuelle au détriment de la mémoire et de l'accessibilité.</p><p><strong>Pattern 3 — L'erreur punitive :</strong> l'utilisateur découvre plusieurs erreurs après soumission, avec des messages vagues. La cause est une validation pensée côté système plutôt que côté récupération utilisateur.</p>",
      invariants: "<p>Les champs et méthodes de saisie évoluent, mais demander une information reste un coût. <strong>Ce qui change :</strong> les contrôles, claviers, autofill et modes de validation. <strong>Ce qui ne change pas :</strong> chaque information demandée doit justifier son effort et chaque erreur doit indiquer comment reprendre.</p>",
      practice: {
        titre: "Réduire l'abandon d'un formulaire",
        etapes: ["Choisis un formulaire de 5 champs ou plus.", "Pour chaque champ, écris pourquoi l'information est nécessaire maintenant.", "Identifie les champs qui peuvent être supprimés, préremplis ou déplacés plus tard.", "Réécris deux messages d'erreur pour indiquer le problème, la cause probable et la correction attendue."],
        output: "Audit de formulaire avec justification des champs, suppressions possibles et deux messages d'erreur réécrits.",
        critere: "Un champ est légitime si tu peux expliquer sa valeur immédiate pour l'utilisateur ou le service rendu, pas seulement pour une analyse future.",
        piege: "Optimiser uniquement la longueur. Un formulaire plus court mais ambigu peut être moins performant qu'un formulaire légèrement plus long et mieux guidé."
      },
      verification: ["Pourquoi un placeholder ne remplace-t-il pas un label ?", "Un formulaire d'inscription perd 65% des utilisateurs au champ téléphone. Quelles hypothèses tester avant de changer la couleur du bouton ?", "Quel trade-off existe entre validation inline et validation à la soumission ?"]
    }),
    etatsInterface: designNode({
      id: "etatsInterface",
      label: "États de l'interface",
      icon: "◈",
      kind: "pattern",
      niveau: "Intermédiaire",
      why: "Ouvre un produit en conditions réelles et l'état parfait de la maquette disparaît vite : chargement, échec, zéro résultat, données partielles, perte de connexion ou permission refusée. Si ces moments ne sont pas conçus, l'utilisateur voit du vide, du silence ou un message technique. Les états rendent le comportement du système compréhensible dans les moments imparfaits.",
      system: "Les états prolongent le feedback <span class=\"ref-fiche\">→ D01</span> et structurent les composants <span class=\"ref-fiche\">→ D03</span>. Ils doivent respecter les principes visuels <span class=\"ref-fiche\">→ D02</span> et être documentés dans le handoff <span class=\"ref-fiche\">→ D04</span>, car ce sont précisément les cas que le développement doit implémenter sans improviser.",
      choice: "Un spinner convient aux attentes brèves et indéterminées ; un skeleton est préférable quand la structure du contenu est connue ; un empty state doit expliquer la situation et proposer une prochaine action ; un error state doit dire ce qui s'est passé, si l'utilisateur peut agir, et comment reprendre ; un partial state montre ce qui est disponible sans bloquer tout l'écran.",
      senior: "Un designer expérimenté conçoit d'abord les états qui protègent la confiance : erreur de paiement, sauvegarde en cours, synchronisation, permission refusée, données supprimées. Il sait qu'un bon empty state n'est pas un dessin sympathique : c'est une instruction contextualisée pour passer de zéro à la première valeur.",
      errors: "<p><strong>Pattern 1 — Le rectangle vide :</strong> aucune donnée produit une zone blanche sans explication. La cause est que la maquette a été remplie avec des données idéales, donc personne n'a pensé au premier usage.</p><p><strong>Pattern 2 — Le spinner éternel :</strong> l'attente indéterminée devient le seul état de chargement, même quand une progression ou une alternative serait nécessaire. Ce pattern vient d'une simplification technique qui laisse l'utilisateur sans contrôle.</p><p><strong>Pattern 3 — L'erreur système brute :</strong> l'interface affiche un code ou un message backend incompréhensible. La cause est l'absence de traduction entre état technique et besoin utilisateur.</p>",
      invariants: "<p>Les systèmes peuvent devenir plus rapides, mais attente, absence et erreur ne disparaissent pas. <strong>Ce qui change :</strong> les indicateurs de chargement, patterns d'empty state et mécanismes de récupération. <strong>Ce qui ne change pas :</strong> l'utilisateur a toujours besoin de savoir si le système travaille, a échoué, attend une action ou n'a rien à afficher.</p>",
      practice: {
        titre: "Concevoir les cinq états d'une liste",
        etapes: ["Choisis une liste : notifications, commandes, messages, fichiers ou résultats de recherche.", "Décris l'état idéal avec données réalistes, pas parfaites.", "Conçois loading, empty, error et partial state avec texte et prochaine action.", "Vérifie que chaque état explique la situation sans jargon technique."],
        output: "Spécification des cinq états d'une liste : ideal, loading, empty, error, partial.",
        critere: "Chaque état est réussi si l'utilisateur peut répondre à : que se passe-t-il, est-ce grave, que puis-je faire maintenant ?",
        piege: "Transformer chaque empty state en message marketing. Le premier rôle d'un état vide est d'orienter, pas de décorer."
      },
      verification: ["Pourquoi le skeleton est-il souvent meilleur qu'un spinner pour charger une liste structurée ?", "Une recherche renvoie zéro résultat pour \"facture avril\". Que doit contenir un empty state utile ?", "Pourquoi les états imparfaits sont-ils plus révélateurs de la qualité UX que l'état idéal ?"]
    }),
    responsive: designNode({
      id: "responsive",
      label: "Design responsive",
      icon: "📱",
      kind: "pattern",
      niveau: "Intermédiaire",
      why: "Réduire un écran desktop jusqu'à ce qu'il tienne sur mobile produit souvent une interface compressée, pas une expérience mobile. Les doigts remplacent la souris, le clavier prend la moitié de l'écran, l'attention est fragmentée, la connexion varie. Le responsive existe pour adapter priorités, interaction et layout aux contraintes réelles du contexte.",
      system: "Le responsive force à prioriser la hiérarchie <span class=\"ref-fiche\">→ D01</span>, à préserver la lisibilité typographique <span class=\"ref-fiche\">→ D02</span>, à adapter navigation et composants <span class=\"ref-fiche\">→ D03</span>, puis à documenter ces règles dans le design system <span class=\"ref-fiche\">→ D04</span>.",
      choice: "Le mobile-first oblige à commencer par l'essentiel puis enrichir ; le layout fluide adapte les dimensions entre breakpoints ; l'adaptatif prévoit des compositions différentes pour des seuils précis ; certaines interfaces denses nécessitent une version mobile repensée plutôt qu'une simple réorganisation. Les zones tactiles doivent rester au minimum proches de 44x44 px pour éviter les erreurs de toucher.",
      senior: "Un designer expérimenté ne teste pas seulement trois largeurs propres. Il vérifie les textes longs, le zoom système, le clavier ouvert, les zones tactiles, les orientations, les états d'erreur et les contenus réels. Il redoute les breakpoints choisis selon des devices populaires plutôt que selon le moment où le contenu casse.",
      errors: "<p><strong>Pattern 1 — Le desktop rétréci :</strong> l'équipe empile tout le desktop sur mobile sans repenser la priorité. La cause est la paresse de transformation : déplacer semble moins risqué que décider.</p><p><strong>Pattern 2 — Le breakpoint catalogue :</strong> les breakpoints sont choisis pour quelques modèles d'appareils, pas pour les ruptures réelles du layout. Le design casse dès qu'un écran intermédiaire ou un texte long apparaît.</p><p><strong>Pattern 3 — Le doigt oublié :</strong> les cibles tactiles restent dimensionnées pour une souris. La cause est un test effectué sur écran de design, sans interaction physique réelle.</p>",
      invariants: "<p>Les écrans changent de taille, densité et forme, mais le contenu a toujours des limites de lisibilité et l'interaction a toujours des contraintes physiques. <strong>Ce qui change :</strong> les devices, breakpoints et techniques CSS. <strong>Ce qui ne change pas :</strong> une interface doit rester lisible, actionnable et priorisée dans le contexte réel où elle est utilisée.</p>",
      practice: {
        titre: "Adapter un écran desktop au mobile",
        etapes: ["Choisis un écran desktop dense.", "Liste les éléments indispensables à la tâche principale sur mobile.", "Décide ce qui reste visible, ce qui devient secondaire et ce qui est supprimé ou déplacé.", "Vérifie les cibles tactiles, textes longs, clavier ouvert et ordre de lecture."],
        output: "Plan responsive mobile avec priorités visibles, éléments secondaires, règles d'interaction et cas de test.",
        critere: "Le plan est correct si la tâche principale peut être accomplie sur mobile sans zoom, sans cible minuscule et sans lecture désordonnée.",
        piege: "Penser le responsive comme un problème de grille uniquement. La vraie question est la priorité d'usage dans un contexte différent."
      },
      verification: ["Pourquoi mobile-first aide-t-il à prioriser plutôt qu'à simplement réduire ?", "Un tableau desktop de 12 colonnes doit être consulté sur mobile par des techniciens terrain. Quelles alternatives peux-tu envisager ?", "Pourquoi les contraintes physiques du toucher restent-elles invariantes malgré l'évolution des frameworks ?"]
    })
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "anatomieComposant", x: 10, y: 100, w: 155, h: 65 },
        { id: "navigation", x: 215, y: 100, w: 140, h: 65 },
        { id: "formulaires", x: 405, y: 40, w: 120, h: 65 },
        { id: "etatsInterface", x: 405, y: 165, w: 155, h: 65 },
        { id: "responsive", x: 620, y: 100, w: 170, h: 65 }
      ],
      edges: [
        { x1: 165, y1: 132, x2: 213, y2: 132, label: "fonde" },
        { x1: 355, y1: 112, x2: 403, y2: 72, label: "structure" },
        { x1: 355, y1: 150, x2: 403, y2: 188, label: "requiert" },
        { x1: 525, y1: 72, x2: 618, y2: 118, label: "adapte" },
        { x1: 560, y1: 200, x2: 618, y2: 152, label: "adapte" }
      ]
    }
  }
});
