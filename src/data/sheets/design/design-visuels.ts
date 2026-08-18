import { designNode, designSheet } from "./design-common";

export const designVisuels = designSheet({
  id: "design-D02",
  number: 22,
  title: "Principes Visuels",
  subtitle: "Rendre l'information lisible, hiérarchisée, cohérente et accessible",
  badge: "Fiche D02",
  meta: ["5 nœuds"],
  readingTime: "25 min",
  description:
    "Typographie, couleur, espacement, contraste, accessibilité et consistance visuelle comme système de lisibilité.",
  accent: "visuel",
  nodes: {
    typographie: designNode({
      id: "typographie",
      label: "Typographie",
      icon: "Aa",
      kind: "visuel",
      niveau: "Fondation",
      why: "Un texte peut contenir la bonne information et rester inutilisable si l'œil doit lutter pour le lire : lettres trop petites, lignes trop longues, interlignage serré, trop de styles concurrents. La typographie existe pour réduire l'effort de lecture avant même que le contenu soit compris.",
      system:
        'La typographie exprime la hiérarchie construite en D01 <span class="ref-fiche">→ D01</span> et devient une règle réutilisable dans les composants <span class="ref-fiche">→ D03</span>. Elle doit ensuite être codifiée en tokens typographiques <span class="ref-fiche">→ D04</span> pour rester cohérente entre design et code.',
      choice:
        "Corps de texte lisible : 16px minimum sur le web, line-height autour de 1.4-1.6, longueur de ligne idéale autour de 60-75 caractères. Une échelle typographique modulaire est adaptée aux produits denses ; une échelle plus expressive convient aux pages éditoriales ou marketing. Le compromis réel : lisibilité, densité d'information, personnalité de marque.",
      senior:
        "Un designer expérimenté ne choisit pas une police en regardant un mot isolé. Il vérifie un paragraphe long, un label court, un nombre, un message d'erreur et un écran mobile. Il redoute surtout les styles orphelins : un H5, un caption ou un label qui n'a pas de rôle clair finit toujours par créer de l'incohérence.",
      errors:
        "<p><strong>Pattern 1 — La police vitrine :</strong> on choisit une police parce qu'elle a du caractère en grand, puis elle fatigue en texte courant.</p><p><strong>Pattern 2 — L'échelle improvisée :</strong> chaque écran ajoute une taille de texte locale, jusqu'à ce que la hiérarchie devienne impossible à maintenir.</p><p><strong>Pattern 3 — La ligne tunnel :</strong> les lignes dépassent 90 caractères ; l'utilisateur perd le début de la ligne suivante et ralentit sans comprendre pourquoi.</p>",
      invariants:
        "<p>La lecture dépend de contraintes perceptives : taille apparente, rythme vertical, longueur de ligne, contraste et familiarité des formes. <strong>Ce qui change :</strong> les polices, les modes et les moteurs de rendu. <strong>Ce qui ne change pas :</strong> un texte lisible minimise l'effort de décodage pour libérer l'attention sur le sens.</p>",
      practice: {
        titre: "Créer une échelle typographique minimale",
        etapes: [
          "Choisis un écran contenant titre, paragraphe, label et aide.",
          "Définis 4 rôles typographiques maximum : titre, sous-titre, body, caption/label.",
          "Vérifie body à 16px minimum, line-height 1.4-1.6 et lignes de 60-75 caractères.",
          "Note pour chaque style son rôle et un exemple d'usage.",
        ],
        output: "Une échelle typographique de 4 styles avec taille, line-height, rôle et exemple.",
        critere:
          "Si deux styles ont le même rôle perceptif, fusionne-les. Si un paragraphe dépasse 75 caractères par ligne, ajuste largeur ou taille.",
        piege:
          "Créer des tailles pour obtenir un rendu joli localement au lieu de créer des rôles réutilisables.",
      },
      verification: [
        "Pourquoi 16px est-il un bon minimum pour le corps de texte web ?",
        "Sur une page d'article mobile, les lignes font 95 caractères et le line-height est 1.1. Quels problèmes de lecture observes-tu ?",
        "Quel trade-off existe entre densité d'information et confort typographique ?",
      ],
    }),
    couleur: designNode({
      id: "couleur",
      label: "Couleur",
      icon: "🎨",
      kind: "visuel",
      niveau: "Fondation",
      why: "Quand toutes les couleurs servent à décorer, plus aucune ne signale vraiment l'action, l'état ou le danger. L'utilisateur ne sait plus ce qui est cliquable, prioritaire, positif ou destructif. La couleur existe comme système de communication avant d'être un choix esthétique.",
      system:
        'La couleur soutient la hiérarchie D01 <span class="ref-fiche">→ D01</span>, signale les états des composants <span class="ref-fiche">→ D03</span>, puis devient un ensemble de tokens sémantiques <span class="ref-fiche">→ D04</span>. Elle ne doit jamais porter seule une information critique, car l\'accessibilité dépend aussi du texte, de l\'icône et de la forme.',
      choice:
        "Une palette produit distingue généralement couleurs de marque, couleurs neutres, couleurs d'action et couleurs d'état. La règle 60-30-10 aide à doser : 60% neutre/dominant, 30% secondaire, 10% accent. Une interface métier gagne souvent à rester sobre ; une expérience éditoriale peut être plus expressive si les rôles restent clairs.",
      senior:
        "Un designer expérimenté teste immédiatement les conflits sémantiques : une marque verte avec une action destructive, un rouge utilisé comme accent marketing, un bleu utilisé à la fois pour lien et information passive. Il anticipe aussi dark mode, daltonisme et états disabled avant de figer la palette.",
      errors:
        "<p><strong>Pattern 1 — L'arc-en-ciel fonctionnel :</strong> chaque catégorie reçoit une couleur différente jusqu'à dépasser ce que l'utilisateur peut mémoriser.</p><p><strong>Pattern 2 — Le rouge décoratif :</strong> une couleur culturellement associée à l'erreur est utilisée pour attirer l'œil ; les vrais dangers perdent leur signal.</p><p><strong>Pattern 3 — L'information uniquement colorée :</strong> un statut vert/rouge sans texte ni icône devient invisible pour une partie des utilisateurs.</p>",
      invariants:
        "<p>La couleur est perçue relativement : contraste, contexte, culture et déficiences visuelles changent sa lecture. <strong>Ce qui change :</strong> les tendances de palette et les identités de marque. <strong>Ce qui ne change pas :</strong> une couleur d'interface doit avoir un rôle reconnaissable et ne jamais être le seul porteur d'une information critique.</p>",
      practice: {
        titre: "Construire une palette sémantique minimale",
        etapes: [
          "Liste les rôles nécessaires : texte, surface, action primaire, succès, warning, erreur, focus.",
          "Assigne une couleur ou nuance à chaque rôle, pas à chaque écran.",
          "Vérifie que l'action destructive reste distincte de la couleur de marque.",
          "Ajoute pour chaque statut un texte ou une icône complémentaire.",
        ],
        output: "Une palette sémantique avec rôles, exemples d'usage et règle de non-usage.",
        critere:
          "Si une couleur apparaît sans rôle nommé, supprime-la ou rattache-la à un rôle existant.",
        piege:
          "Commencer par des couleurs aimées plutôt que par les messages que l'interface doit transmettre.",
      },
      verification: [
        "Explique la règle 60-30-10 et son intérêt dans une interface.",
        "Ta marque est verte mais tes boutons de validation sont verts aussi. Comment évites-tu la confusion avec succès/état ?",
        "Pourquoi la couleur seule n'est-elle jamais un invariant suffisant pour transmettre une information ?",
      ],
    }),
    espacementGrille: designNode({
      id: "espacementGrille",
      label: "Espacement et grille",
      icon: "⊞",
      kind: "visuel",
      niveau: "Fondation",
      why: "Place deux éléments trop près et le cerveau les regroupe, même si le texte dit autre chose. Éloigne deux éléments d'une même action et l'utilisateur croit qu'ils appartiennent à deux zones différentes. L'espacement sert de syntaxe visuelle : il indique les groupes, les séparations et le rythme avant les mots.",
      system:
        'L\'espacement applique la loi de proximité issue des fondements UX <span class="ref-fiche">→ D01</span> et structure les composants <span class="ref-fiche">→ D03</span>. Une échelle d\'espacement doit devenir tokenisée <span class="ref-fiche">→ D04</span> pour éviter les corrections pixel par pixel.',
      choice:
        "Une grille 8pt est efficace pour la plupart des interfaces web et mobile ; une grille 4pt offre plus de finesse pour les petits composants. Les layouts éditoriaux peuvent utiliser des grilles colonnes plus expressives. Le trade-off : vitesse de décision et cohérence contre précision locale.",
      senior:
        "Un designer expérimenté regarde les groupes avant les composants. Si les espacements internes et externes sont confondus, l'utilisateur ne sait plus ce qui appartient à quoi. Il vérifie aussi la densité : une app métier peut être dense, mais jamais au point de détruire les regroupements perceptifs.",
      errors:
        "<p><strong>Pattern 1 — Le padding au feeling :</strong> chaque espacement est ajusté à l'œil, sans échelle. Le fichier paraît bon localement et incohérent globalement.</p><p><strong>Pattern 2 — L'égalité qui brouille :</strong> tout reçoit le même espace ; les groupes et séparations ont la même force visuelle.</p><p><strong>Pattern 3 — La grille prison :</strong> on respecte une grille même quand elle nuit à la lecture ou au rythme réel du contenu.</p>",
      invariants:
        "<p>La perception groupe par proximité avant d'analyser le contenu. L'espace peut donc expliquer une relation ou la rendre fausse. <strong>Ce qui change :</strong> les grilles, densités et systèmes d'unités. <strong>Ce qui ne change pas :</strong> l'espacement guide toujours la perception des groupes, des séparations et du rythme.</p>",
      practice: {
        titre: "Définir une échelle d'espacement",
        etapes: [
          "Choisis un écran contenant cartes, titres, champs et actions.",
          "Note tous les espacements utilisés et regroupe les valeurs proches.",
          "Réduis-les à une échelle 4 ou 8pt avec 5-7 valeurs maximum.",
          "Réapplique l'échelle en distinguant espace interne, espace entre éléments liés et espace entre sections.",
        ],
        output: "Une échelle d'espacement avec valeurs, rôles et écran annoté.",
        critere:
          "Deux éléments liés doivent être plus proches entre eux que d'une autre section. Si ce n'est pas visible sans lire, l'échelle échoue.",
        piege:
          "Traiter l'espace comme une finition esthétique plutôt que comme une information structurelle.",
      },
      verification: [
        "Explique la loi de proximité avec un exemple d'interface.",
        "Un formulaire a le même espace entre label/champ et entre deux groupes de champs. Que comprend mal l'utilisateur ?",
        "Quel trade-off existe entre grille stricte et ajustement optique ?",
      ],
    }),
    contrasteAccessibilite: designNode({
      id: "contrasteAccessibilite",
      label: "Contraste et accessibilité",
      icon: "◑",
      kind: "fondement",
      niveau: "Fondation",
      why: "Une interface peut être élégante et illisible pour une partie de ses utilisateurs : texte gris trop pâle, focus invisible, zone tactile minuscule, erreur indiquée seulement par rouge. L'accessibilité existe parce que les conditions réelles d'usage ne ressemblent pas au grand écran calibré du designer.",
      system:
        'Le contraste rend la typographie et la couleur utilisables. Il conditionne les composants D03 <span class="ref-fiche">→ D03</span> : focus, erreurs, disabled, zones tactiles. Il doit être documenté dans le système D04 <span class="ref-fiche">→ D04</span> pour que l\'accessibilité ne dépende pas de vérifications manuelles tardives.',
      choice:
        "WCAG AA demande 4.5:1 pour le texte normal et 3:1 pour les grands textes et éléments graphiques essentiels. AAA est plus strict mais pas toujours réaliste. Les zones tactiles mobiles doivent viser au moins 44x44px. Le choix n'est pas accessibilité contre esthétique : c'est esthétique sous contraintes réelles.",
      senior:
        "Un designer expérimenté vérifie contraste, focus clavier, taille tactile et messages d'erreur avant de présenter une maquette comme prête. Il utilise un outil type WebAIM Contrast Checker ou les audits navigateur, mais sait que l'outil ne juge pas l'intention : un ratio valide ne suffit pas si l'information dépend seulement de la couleur.",
      errors:
        "<p><strong>Pattern 1 — Le gris premium :</strong> on baisse le contraste pour obtenir une esthétique douce, puis le texte devient illisible en lumière réelle.</p><p><strong>Pattern 2 — Le focus sacrifié :</strong> l'état focus est supprimé parce qu'il est jugé laid. La navigation clavier disparaît.</p><p><strong>Pattern 3 — L'accessibilité patch :</strong> on corrige contraste et labels après développement, quand chaque correction touche design, code et QA.</p>",
      invariants:
        "<p>L'accessibilité repose sur des constantes humaines : vision variable, motricité imparfaite, attention limitée, contextes lumineux changeants. <strong>Ce qui change :</strong> les standards, outils d'audit et devices. <strong>Ce qui ne change pas :</strong> une interface robuste doit rester perceptible, actionnable et compréhensible hors conditions idéales.</p>",
      practice: {
        titre: "Vérifier une interface contre WCAG AA",
        etapes: [
          "Choisis un écran avec texte, bouton, lien, erreur et champ de formulaire.",
          "Vérifie les contrastes : 4.5:1 texte normal, 3:1 grand texte ou élément UI essentiel.",
          "Vérifie que les cibles tactiles principales atteignent environ 44x44px.",
          "Note les informations transmises uniquement par couleur et ajoute texte, icône ou forme.",
        ],
        output:
          "Audit accessibilité avec ratios, zones tactiles, problèmes et corrections proposées.",
        critere:
          "Chaque problème doit avoir une correction concrète. Si tu écris seulement 'améliorer contraste', l'audit n'est pas terminé.",
        piege:
          "Croire qu'un score automatique remplace une revue humaine des états, textes, focus et usages réels.",
      },
      verification: [
        "Quels ratios WCAG AA faut-il viser pour texte normal et grand texte ?",
        "Un bouton rouge sans texte indique une erreur dans un tableau. Pourquoi est-ce insuffisant et comment corriges-tu ?",
        "Pourquoi l'accessibilité est-elle un invariant de qualité plutôt qu'un mode séparé ?",
      ],
    }),
    consistance: designNode({
      id: "consistance",
      label: "Consistance visuelle",
      icon: "⊡",
      kind: "systeme",
      niveau: "Fondation",
      why: "Quand deux boutons identiques font des choses différentes, l'utilisateur devient prudent. Quand deux éléments différents font la même chose, il hésite. L'inconsistance force à réapprendre l'interface écran par écran et augmente la charge cognitive sans ajouter de valeur.",
      system:
        'La consistance stabilise les principes visuels de D02 et prépare les composants de D03 <span class="ref-fiche">→ D03</span>. Elle devient maintenable seulement avec un design system et des tokens <span class="ref-fiche">→ D04</span>. Elle dépend aussi des conventions externes : un produit cohérent avec lui-même mais incohérent avec le web reste coûteux à apprendre.',
      choice:
        "Il faut distinguer consistance interne, conventions externes et différenciation. La consistance interne rend le produit prévisible ; les conventions externes réduisent l'apprentissage ; la différenciation se justifie seulement quand elle améliore un moment clé.",
      senior:
        "Un designer expérimenté ne défend pas la consistance comme une religion. Il demande : est-ce que cette variation aide l'utilisateur à comprendre une différence réelle ? Si oui, elle peut être utile. Sinon, elle est une dette cognitive et systémique.",
      errors:
        "<p><strong>Pattern 1 — L'exception séduisante :</strong> un écran important reçoit un traitement spécial, puis l'exception devient un précédent que d'autres écrans imitent mal.</p><p><strong>Pattern 2 — La cohérence contre convention :</strong> l'équipe invente un pattern cohérent en interne mais contraire aux habitudes du web. L'utilisateur paie le coût d'apprentissage.</p><p><strong>Pattern 3 — L'uniformité aveugle :</strong> tout est rendu identique, même quand des différences de risque ou de priorité devraient être visibles.</p>",
      invariants:
        "<p>Le cerveau apprend des régularités et prédit la suite à partir d'elles. La consistance réduit l'effort en rendant ces prédictions fiables. <strong>Ce qui change :</strong> les styles, conventions et composants disponibles. <strong>Ce qui ne change pas :</strong> une interface prévisible demande moins d'énergie qu'une interface qui oblige à réinterpréter chaque écran.</p>",
      practice: {
        titre: "Auditer la consistance d'un flux",
        etapes: [
          "Choisis trois écrans du même flux.",
          "Liste les boutons, liens, titres, espacements, messages d'erreur et états.",
          "Repère les variations qui n'ont pas de raison utilisateur.",
          "Documente une règle pour chaque variation à supprimer ou conserver.",
        ],
        output:
          "Audit de consistance avec variations, justification utilisateur et règles proposées.",
        critere:
          "Une variation conservée doit signaler une différence réelle de sens, priorité ou risque. Sinon elle doit disparaître.",
        piege:
          "Confondre consistance et uniformité : l'objectif n'est pas que tout se ressemble, mais que les différences signifient quelque chose.",
      },
      verification: [
        "Quelle différence fais-tu entre consistance et uniformité ?",
        "Un écran marketing utilise un bouton violet alors que l'app utilise bleu pour l'action principale. Comment décides-tu si c'est acceptable ?",
        "Quel invariant explique pourquoi la consistance réduit la charge cognitive ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "typographie", x: 10, y: 100, w: 130, h: 65 },
        { id: "couleur", x: 190, y: 100, w: 100, h: 65 },
        { id: "espacementGrille", x: 340, y: 40, w: 150, h: 65 },
        { id: "contrasteAccessibilite", x: 340, y: 165, w: 200, h: 65 },
        { id: "consistance", x: 600, y: 100, w: 130, h: 65 },
      ],
      edges: [
        { x1: 140, y1: 132, x2: 188, y2: 132, label: "signale" },
        { x1: 290, y1: 112, x2: 338, y2: 72, label: "structure" },
        { x1: 290, y1: 150, x2: 338, y2: 188, label: "doit rester lisible" },
        { x1: 490, y1: 72, x2: 598, y2: 118, label: "stabilise" },
        { x1: 540, y1: 198, x2: 598, y2: 152, label: "garantit" },
      ],
    },
  },
});
