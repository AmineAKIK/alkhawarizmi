import { conceptionSheet } from "./conception-common";

export const conceptionSolution = conceptionSheet({
  id: "conception-C03",
  number: 13,
  title: "La Solution et le Périmètre",
  subtitle: "Passer du problème validé à une solution délimitée et testable",
  badge: "Fiche C03 — Vision Systémique",
  meta: ["5 nœuds · universel"],
  readingTime: "20 min",
  description: "Comprendre le problème et connaître ses utilisateurs ne suffit pas — il faut encore décider quoi construire, et surtout quoi ne pas construire. Cette fiche donne les outils pour concevoir une solution comme une hypothèse testable, délimiter un périmètre réaliste, et éviter les pièges classiques du feature creep et du sur-engineering.",
  accent: "decision",

  nodes: {
    desirableFaisableViable: {
      id: "desirableFaisableViable",
      label: "Désirable / Faisable / Viable",
      icon: "△",
      kind: "modele",
            os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La plupart des produits ratent parce qu'ils optimisent une seule dimension. <strong>Désirable mais pas viable</strong> : les utilisateurs adorent mais personne ne peut le rentabiliser. <strong>Viable mais pas désirable</strong> : le modèle économique tient mais personne ne veut le produit. <strong>Faisable mais ni désirable ni viable</strong> : prouesse technique sans marché. Le triangle de l'innovation (IDEO) pose que la bonne solution se situe à l'intersection des trois.</p>`,
        system: `<p>Ce nœud est le cadre de référence de toute la fiche C03. Il synthétise le problème réel <span class="ref-fiche">→ C01</span> (désirable : la douleur existe) et les utilisateurs <span class="ref-fiche">→ C02</span> (désirable : le bon segment en a besoin dans son contexte). Il conditionne <strong>Le vrai MVP</strong> (qu'est-ce qui est faisable rapidement et encore viable ?), <strong>La contrainte créatrice</strong> (comment rendre faisable ce qui est désirable), et <strong>Ce qu'on ne construit pas</strong> (ce qui n'est pas encore faisable ou viable).</p>`,
        choice: {
          kind: "free",
          html: `<p>Le triangle désirable/faisable/viable est le cadre le plus utilisé, mais d'autres grilles existent :</p>
<p><strong>Now / Next / Later :</strong> priorisation par horizon temporel. Ce qui est désirable, faisable et viable maintenant ; ce qui le deviendra ; ce qui reste incertain. Utile pour roadmapper sans s'engager sur des détails lointains.</p>
<p><strong>RICE (Reach × Impact × Confidence ÷ Effort) :</strong> scoring quantitatif de features. Utile pour arbitrer entre plusieurs options toutes désirables/faisables/viables.</p>
<p><strong>Kano model :</strong> distingue les features de base (attendues), de performance (plus il y en a, mieux c'est), et d'enchantement (inattendues et délightantes). Utile pour hiérarchiser au sein du périmètre.</p>
<p><strong>Règle :</strong> utilise désirable/faisable/viable pour valider qu'une solution mérite d'être construite. Utilise les autres cadres pour arbitrer entre solutions déjà validées.</p>`,
        },
        senior: `<p>Un product manager expérimenté utilise ce cadre comme un filtre continu, pas comme un exercice ponctuel. <strong>À chaque décision produit, il se demande : est-ce que ça renforce la désirabilité, la faisabilité, ou la viabilité — ou est-ce que ça fragilise l'une d'elles ?</strong> Une feature qui augmente la désirabilité mais rend le produit infaisable dans les délais n'est pas une bonne feature, même si elle est belle.</p><p>Il sait aussi que les trois dimensions évoluent dans le temps : ce qui est infaisable aujourd'hui peut devenir faisable dans six mois (nouvelle techno, équipe plus grande).</p>`,
        errors: `<p><strong>Pattern 1 — La désirabilité assumée :</strong> on investit dans la faisabilité et la viabilité sans avoir validé la désirabilité. Le produit est techniquement réalisable et économiquement viable, mais personne n'en veut. L'ordre compte : désirabilité d'abord, puis faisabilité, puis viabilité.</p>
<p><strong>Pattern 2 — La viabilité oubliée :</strong> on construit quelque chose que les utilisateurs adorent, mais sans modèle économique. L'acquisition est gratuite, le support coûteux, la monétisation absente. Le produit est une charge, pas un actif.</p>
<p><strong>Pattern 3 — La faisabilité surpondérée :</strong> on réduit le périmètre au point où le produit est techniquement facile mais ne résout plus vraiment le problème. On a un produit 'livrable' mais inutile.</p>`,
        invariants: `<p>Les outils de design thinking changent. <strong>Ce qui ne change pas : une solution durable doit être voulue par les utilisateurs, réalisable avec les moyens disponibles, et rentable pour l'organisation qui la produit. L'absence d'une de ces trois conditions condamne le produit tôt ou tard.</strong></p><p><strong>Ce qui change :</strong> les méthodes pour évaluer chaque dimension. <strong>Ce qui ne change pas :</strong> la nécessité d'évaluer les trois avant de s'engager dans la construction.</p>`,
        practice: {
          exercices: [
            {
              titre: "Évaluer une solution sur les trois dimensions",
              etapes: [
                "Choisis une solution ou un produit que tu veux construire (ou un existant que tu veux analyser).",
                "Pour la désirabilité : liste les preuves que des utilisateurs réels veulent cette solution. Qu'est-ce qui manque comme preuve ?",
                "Pour la faisabilité : liste les contraintes techniques, humaines, et temporelles. Qu'est-ce qui pourrait rendre la solution infaisable ?",
                "Pour la viabilité : esquisse le modèle économique. Comment génère-t-on assez de valeur pour couvrir les coûts et croître ?",
                "Identifie la dimension la plus fragile et formule une action pour la renforcer.",
              ],
              output: "Un tableau désirable/faisable/viable avec preuves et lacunes pour chaque dimension, et une action prioritaire identifiée.",
              critere: "Tu as identifié au moins une lacune par dimension. Si tout te paraît solide sur les trois dimensions, tu n'as pas été assez critique ou tu travailles sur un marché très bien connu.",
            },
          ],
          piege: "Évaluer les trois dimensions en silo plutôt que comme un système. Une décision qui renforce la désirabilité peut fragiliser la faisabilité (plus de features = plus de complexité). Les trois dimensions s'influencent mutuellement.",
        },
        verification: [
          "Explique dans tes mots ce que signifient désirable, faisable, et viable pour un produit.",
          "Un produit de fitness tracking est désirable (les gens veulent se suivre) et faisable (la tech existe) mais pas encore viable. Quelles sont les causes possibles ? Comment y remédier ?",
          "Pourquoi l'ordre désirabilité → faisabilité → viabilité est-il important ? Que se passe-t-il si on commence par la viabilité ?",
        ],
      },
    },

    vraiMvp: {
      id: "vraiMvp",
      label: "Le vrai MVP",
      icon: "🚀",
      kind: "decision",
            os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Beaucoup d'équipes appellent MVP une version pauvre d'un produit complet : moins belle, moins stable, moins riche. Elles livrent alors quelque chose qui coûte cher, déçoit les utilisateurs, et n'apprend pas grand-chose. <strong>Pour Eric Ries, un MVP est l'expérience la plus légère qui permet de valider les hypothèses critiques du business.</strong> Ce n'est pas un produit dégradé — c'est parfois un email, une landing page, ou une conversation.</p>`,
        system: `<p>Le vrai MVP est l'application opérationnelle de <strong>Désirable/Faisable/Viable</strong> (qu'est-ce qu'on peut construire rapidement pour valider les trois dimensions ?) et de <strong>Valider sans produit</strong> <span class="ref-fiche">→ C02</span> (les méthodes les plus légères viennent avant le code). Il alimente directement la mesure <span class="ref-fiche">→ C06</span> : un MVP sans métriques de validation n'est pas un MVP, c'est une version alpha.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le spectre des MVPs, du plus léger au plus élaboré :</p>
<p><strong>Entretien + démo fictive :</strong> montrer un prototype non fonctionnel pour valider la compréhension et l'intérêt. Zéro code, feedback en quelques jours.</p>
<p><strong>Landing page + pre-signup :</strong> mesurer l'intent avant de construire. Une semaine de travail, signal quantitatif sur la désirabilité.</p>
<p><strong>Concierge MVP :</strong> faire manuellement ce que le produit ferait automatiquement. Valide la valeur proposée sans infrastructure. Classique pour les marketplaces.</p>
<p><strong>Single feature MVP :</strong> une seule feature qui résout le problème principal. Tout le reste est hors scope jusqu'à validation de cette feature.</p>
<p><strong>Règle :</strong> un MVP est réussi s'il invalide ou confirme l'hypothèse la plus critique du projet. S'il ne peut pas faire ça, ce n'est pas un MVP — c'est une version bêta.</p>`,
        },
        senior: `<p>Un product manager expérimenté demande toujours : <strong>quelle est l'hypothèse critique que ce MVP doit tester ?</strong> Sans réponse précise à cette question, on construit quelque chose mais on n'apprend rien. Il définit aussi à l'avance ce qui constituerait un succès — quel chiffre, quel comportement, quel signal — avant de lancer le MVP, pour éviter l'interprétation biaisée des résultats.</p>`,
        errors: `<p><strong>Pattern 1 — Le MVP qui n'est pas minimum :</strong> six mois de développement pour "valider" une idée. Ce n'est pas un MVP, c'est un produit complet avec moins de polish. Si la construction du MVP prend plus d'un mois, repose-toi la question de ce qu'on essaie de valider.</p>
<p><strong>Pattern 2 — Le MVP sans hypothèse :</strong> on construit quelque chose, on le lance, et on "voit ce qui se passe". Sans hypothèse définie à l'avance, n'importe quel résultat est interprétable comme une validation. Les données sans question préalable ne signifient rien.</p>
<p><strong>Pattern 3 — La mauvaise métrique de succès :</strong> on mesure ce qui est facile à mesurer (téléchargements, inscriptions) plutôt que ce qui valide l'hypothèse (rétention, willingness to pay, NPS). Un MVP peut avoir 10 000 inscriptions et invalider l'hypothèse centrale.</p>`,
        invariants: `<p>Les technologies pour construire des MVPs changent (no-code, IA, templates). <strong>Ce qui ne change pas : la valeur d'un MVP est dans l'apprentissage qu'il génère, pas dans le produit qu'il livre. Un MVP qui ne génère pas d'apprentissage actionnable est du gaspillage, quelle que soit sa qualité technique.</strong></p><p><strong>Ce qui change :</strong> la facilité de construire des MVPs (no-code a rendu beaucoup de tests accessibles). <strong>Ce qui ne change pas :</strong> la nécessité de définir l'hypothèse et le critère de succès avant de construire.</p>`,
        practice: {
          exercices: [
            {
              titre: "Concevoir le MVP le plus léger possible",
              etapes: [
                "Formule l'hypothèse critique de ton projet : 'Je crois que [segment] a [problème] et paierait [montant] pour [solution].'",
                "Identifie le signal qui validerait ou invaliderait cette hypothèse.",
                "Propose trois versions de MVP du plus léger au plus élaboré. Pour chacune, estime : temps de construction, qualité du signal obtenu, et coût si l'hypothèse est fausse.",
                "Choisis la version qui donne le signal le plus fiable au coût le plus faible.",
              ],
              output: "Trois versions de MVP comparées sur temps/signal/coût, avec le choix justifié.",
              critere: "La version choisie peut être construite en moins de deux semaines et donne un signal qui invaliderait clairement l'hypothèse si le résultat est négatif. Si la version 'légère' prend plus d'un mois, tu n'es pas encore au niveau MVP.",
            },
          ],
          piege: "Confondre MVP (minimum viable product pour apprendre) avec MMP (minimum marketable product — le minimum pour vendre). Un MVP n'est pas forcément commercialisable. Il peut être moche, limité, et nécessiter une intervention humaine — tant qu'il valide l'hypothèse.",
        },
        verification: [
          "Quelle est la définition correcte d'un MVP ? En quoi diffère-t-elle de 'produit avec peu de features' ?",
          "Tu veux valider si des restaurateurs paieraient pour un outil de gestion des réservations. Propose un MVP qui ne nécessite pas de code.",
          "Pourquoi définir le critère de succès avant de lancer le MVP est-il critique ?",
        ],
      },
    },

    contrainteCreatrice: {
      id: "contrainteCreatrice",
      label: "La contrainte créatrice",
      icon: "⚡",
      kind: "decision",
            os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>L'absence de contrainte produit de la médiocrité — trop d'options, trop de temps, trop de budget mènent à des produits complexes et peu différenciés. <strong>Les contraintes forcent à faire des choix, et les choix forcent à trouver des solutions créatives que l'abondance ne génère jamais.</strong> Twitter a limité à 140 caractères par contrainte technique — cette contrainte est devenue la définition du produit.</p>`,
        system: `<p>La contrainte créatrice est le mécanisme qui rend <strong>Le vrai MVP</strong> possible — si on avait du temps et des ressources illimitées, on ne serait jamais forcé de choisir l'essentiel. Elle s'articule avec <strong>Ce qu'on ne construit pas</strong> (la contrainte définit ce qu'on exclut), avec <strong>Désirable/Faisable/Viable</strong> (la contrainte agit sur la faisabilité), et avec la priorisation <span class="ref-fiche">→ C05</span>, parce qu'une contrainte explicite transforme les préférences en arbitrages.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les contraintes utiles en design de produit :</p>
<p><strong>Contrainte de temps :</strong> un délai serré force à identifier l'essentiel. "Qu'est-ce qu'on peut livrer en 4 semaines ?" est une meilleure question que "qu'est-ce qu'on devrait construire ?"</p>
<p><strong>Contrainte d'équipe :</strong> une petite équipe force la priorisation. Une seule personne ne peut pas tout construire — elle construit ce qui compte le plus.</p>
<p><strong>Contrainte de budget :</strong> elle force à trouver des solutions créatives plutôt que de jeter de l'argent sur les problèmes.</p>
<p><strong>Contrainte d'interface :</strong> "une seule page", "un seul bouton", "dix mots maximum" sont des contraintes qui forcent à trouver la solution la plus claire possible.</p>`,
        },
        senior: `<p>Un product manager expérimenté utilise les contraintes comme un outil de design intentionnel, pas seulement comme une réalité subie. <strong>Il pose des contraintes volontaires même quand les ressources ne l'exigent pas</strong>, parce qu'il sait que l'abondance produit de la complexité et que la complexité est l'ennemie de l'adoption. Il demande régulièrement : "Si on ne pouvait construire qu'une seule chose, ce serait quoi ?"</p>`,
        errors: `<p><strong>Pattern 1 — La contrainte cachée :</strong> la contrainte existe (budget limité, deadline serrée) mais n'est pas rendue explicite à l'équipe. L'équipe continue à penser en abondance alors qu'elle devrait penser en contrainte. Résultat : un scope trop large, livré en retard et en dessous des attentes.</p>
<p><strong>Pattern 2 — La contrainte injustifiée :</strong> on impose une contrainte sans expliquer pourquoi, l'équipe la perçoit comme arbitraire et cherche à la contourner. Une contrainte comprise est une contrainte utile — une contrainte incomprise est une friction.</p>
<p><strong>Pattern 3 — La sur-contrainte :</strong> on restreint tellement le périmètre que le produit ne résout plus le problème réel. La contrainte doit forcer à choisir l'essentiel, pas à amputer le cœur du produit.</p>`,
        invariants: `<p>Les contraintes spécifiques changent selon les contextes et les époques. <strong>Ce qui ne change pas : la créativité naît de la contrainte, pas de l'abondance. Les meilleurs produits sont ceux qui ont fait des choix radicaux, pas ceux qui ont essayé de tout faire.</strong></p><p><strong>Ce qui change :</strong> la nature des contraintes (temps, argent, techno, marché). <strong>Ce qui ne change pas :</strong> l'effet de la contrainte sur la qualité des décisions — elle force à aller à l'essentiel.</p>`,
        practice: {
          exercices: [
            {
              titre: "Appliquer une contrainte radicale",
              etapes: [
                "Prends un projet ou une idée de produit avec son périmètre actuel.",
                "Applique la contrainte : 'si on ne peut construire qu'une seule feature, ce serait laquelle ?'",
                "Justifie ton choix : pourquoi cette feature et pas une autre ? Quel problème résout-elle en priorité ?",
                "Maintenant applique la contrainte inverse : 'si on devait retirer une feature et n'en garder que les autres, laquelle retire-t-on en premier ?' Répète jusqu'à ce qu'il ne reste qu'une feature.",
                "Compare les deux résultats : sont-ils cohérents ? Si non, qu'est-ce que ça révèle sur tes priorités ?",
              ],
              output: "Une feature principale identifiée par deux méthodes de contrainte, avec la justification et l'analyse des éventuelles incohérences.",
              critere: "Les deux méthodes convergent vers la même feature ou révèlent une tension réelle dans les priorités. Si tu n'arrives pas à choisir une seule feature, c'est que le problème n'est pas encore assez bien défini.",
            },
          ],
          piege: "Choisir la feature la plus facile à construire plutôt que la plus importante pour l'utilisateur. La contrainte doit forcer à identifier l'essentiel, pas à optimiser pour la facilité d'implémentation.",
        },
        verification: [
          "Pourquoi les contraintes de ressources mènent-elles souvent à de meilleures décisions produit que l'abondance ?",
          "Twitter a imposé une limite de 140 caractères. Comment cette contrainte a-t-elle défini le produit plutôt que de le limiter ?",
          "Quelle est la différence entre une contrainte créatrice et une contrainte paralysante ? Comment distinguer les deux ?",
        ],
      },
    },

    ceQuOnNeConstructPas: {
      id: "ceQuOnNeConstructPas",
      label: "Ce qu'on ne construit pas",
      icon: "🚫",
      kind: "decision",
            os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une demande d'utilisateur paraît souvent raisonnable quand elle arrive seule. Dix demandes raisonnables plus tard, le produit a perdu son identité : il fait un peu de tout, lentement, avec une interface que personne ne comprend. <strong>Sans frontière explicite, le périmètre s'étend naturellement.</strong> Le "non" est une décision de design au même titre que le "oui".</p>`,
        system: `<p>Ce nœud est le complément indispensable de <strong>Le vrai MVP</strong> (le MVP est défini autant par ce qu'il exclut que par ce qu'il inclut) et de <strong>La contrainte créatrice</strong> (la contrainte force à exclure). Il prépare la priorisation <span class="ref-fiche">→ C05</span> : décider ce qu'on ne fait pas est la première étape de toute priorisation saine.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs approches pour délimiter le périmètre :</p>
<p><strong>La liste de non-scope explicite :</strong> à côté de la roadmap, une liste de ce qui ne sera jamais dans ce produit (ou pas avant très longtemps). Force l'équipe à avoir la conversation difficile.</p>
<p><strong>Les "won't do" dans le backlog :</strong> certaines équipes agile maintiennent un backlog de tickets explicitement rejetés avec la raison du refus. Permet de ne pas réexpliquer la même décision vingt fois.</p>
<p><strong>Le principe de Jason Fried (Basecamp) :</strong> le périmètre est toujours trop large. La question n'est pas "qu'est-ce qu'on ajoute ?" mais "qu'est-ce qu'on retire pour que le reste soit excellent ?"</p>`,
        },
        senior: `<p>Un product manager expérimenté considère chaque demande de feature comme potentiellement hors scope jusqu'à preuve du contraire. <strong>Il distingue les demandes qui résolvent le problème central du produit et les demandes qui étendent le problème que le produit cherche à résoudre.</strong> Étendre le problème sans valider la nouvelle direction est du feature creep, même si chaque demande individuelle semble raisonnable.</p><p>Il documente aussi les refus — non pas pour dire non définitivement, mais pour avoir un historique des décisions et des raisons qui les ont motivées.</p>`,
        errors: `<p><strong>Pattern 1 — Le feature creep du client :</strong> un client important demande une feature spécifique à son usage, l'équipe la construit, et ça crée un précédent. D'autres clients demandent leurs propres features spécifiques. Le produit devient une accumulation de besoins individuels sans cohérence.</p>
<p><strong>Pattern 2 — Le "on le fera plus tard" :</strong> on ne dit jamais vraiment non, on dit "c'est dans la roadmap". Le résultat est un backlog infini que personne ne regarde vraiment et une équipe qui ne sait pas ce qui compte vraiment.</p>
<p><strong>Pattern 3 — Le scope qui s'étend en cours de sprint :</strong> une feature "simple" révèle des cas limites pendant le développement, l'équipe les traite au fil de l'eau, et la feature triple en complexité. Sans discipline de scope, chaque sprint finit en dépassement.</p>`,
        invariants: `<p>Les méthodes de gestion de backlog et de roadmap changent. <strong>Ce qui ne change pas : la liste de ce qu'on ne construit pas est aussi importante que la liste de ce qu'on construit. Un produit sans frontière claire n'a pas d'identité, et un produit sans identité n'a pas d'utilisateurs fidèles.</strong></p><p><strong>Ce qui change :</strong> les outils de gestion de roadmap et de backlog. <strong>Ce qui ne change pas :</strong> la nécessité humaine et organisationnelle de dire non pour dire oui à ce qui compte vraiment.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire la liste de non-scope",
              etapes: [
                "Pour un produit ou projet réel (ou imaginé), liste 10 features qui pourraient être demandées ou souhaitées.",
                "Pour chaque feature, réponds : est-ce que ça résout le problème central que ce produit cherche à résoudre ?",
                "Classe les 10 features en trois catégories : In scope (résout le problème central), Hors scope pour l'instant (peut être revisité plus tard), Hors scope définitif (n'appartient pas à ce produit).",
                "Pour les deux catégories 'hors scope', formule la raison — ce n'est pas 'on n'a pas le temps' mais 'ça diluerait notre focus sur X' ou 'ça résout un problème différent'.",
              ],
              output: "Une liste de 10 features triées en trois catégories, avec une justification pour les hors-scope.",
              critere: "Au moins 3 features sont classées hors scope définitif, avec des justifications liées à la vision produit et non aux ressources. Si tout est 'in scope', le périmètre n'est pas délimité.",
            },
          ],
          piege: "Classer hors scope uniquement les features difficiles à construire. Le périmètre doit être délimité par la cohérence avec le problème central, pas par la complexité technique. Certaines features faciles à construire sont hors scope parce qu'elles diluent le focus.",
        },
        verification: [
          "Pourquoi définir ce qu'un produit ne fait pas est-il aussi important que définir ce qu'il fait ?",
          "Un utilisateur clé te demande une feature d'import CSV. Comment décides-tu si c'est in scope ou hors scope ?",
          "Quelle est la différence entre 'on le fera plus tard' et 'c'est hors scope' ? Pourquoi l'ambiguïté est-elle dangereuse ?",
        ],
      },
    },

    solutionHypothese: {
      id: "solutionHypothese",
      label: "La solution comme hypothèse",
      icon: "🔬",
      kind: "validation",
            os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>On traite souvent une solution comme une réponse — quelque chose qu'on construit une fois qu'on a compris le problème. <strong>Une solution est toujours une hypothèse : "je crois que X résoudra le problème Y pour les utilisateurs Z."</strong> Traiter la solution comme une certitude, c'est s'interdire de l'invalider et de s'adapter. Traiter la solution comme une hypothèse, c'est maintenir l'ouverture nécessaire pour apprendre et pivoter.</p>`,
        system: `<p>Ce nœud est la charnière entre C03 et la mesure <span class="ref-fiche">→ C06</span>. Il s'appuie sur <strong>Désirable/Faisable/Viable</strong> (les trois dimensions de l'hypothèse), <strong>Le vrai MVP</strong> (le test minimal de l'hypothèse), et prépare les métriques de C06, qui valident ou invalident l'hypothèse de solution. Il est aussi lié à la priorisation <span class="ref-fiche">→ C05</span> : on priorise les hypothèses à tester, pas les features à construire.</p>`,
        choice: {
          kind: "free",
          html: `<p>Différentes façons de formuler et tester une hypothèse de solution :</p>
<p><strong>Format "we believe that" :</strong> "We believe that [solution] will result in [outcome] for [users]. We will know we're right when [measurable signal]." Rend l'hypothèse explicite et testable.</p>
<p><strong>Lean hypothesis statement :</strong> similaire, issu du lean startup. L'important est la partie "we will know we're right when" — sans signal de validation défini, l'hypothèse n'est pas testable.</p>
<p><strong>Falsifiabilité de Popper :</strong> une hypothèse scientifique n'est valide que si elle peut être réfutée. Le même principe s'applique aux hypothèses produit — si tu ne peux pas imaginer un résultat qui prouverait que la solution est fausse, c'est une croyance, pas une hypothèse.</p>`,
        },
        senior: `<p>Un product manager expérimenté traite chaque feature comme un test. <strong>Avant de commencer le développement, il formule l'hypothèse que la feature teste, et il définit à l'avance ce qui constituerait un succès ou un échec.</strong> Cela lui permet de couper des features qui ne performent pas sans attaches émotionnelles — ce n'est pas un échec, c'est un apprentissage.</p><p>Il maintient aussi une "solution hypothesis log" — un historique des hypothèses testées, des résultats, et des décisions prises. Ça évite de retester les mêmes hypothèses et de rejouer les mêmes débats.</p>`,
        errors: `<p><strong>Pattern 1 — Le sunk cost de la solution :</strong> on a investi du temps dans une solution, elle ne performe pas, mais on continue à l'améliorer plutôt que de l'invalider. L'investissement passé n'est pas une raison de continuer — il est perdu dans tous les cas.</p>
<p><strong>Pattern 2 — La solution sans signal de validation :</strong> on lance une feature sans définir à l'avance ce qui constituerait un succès. Après le lancement, n'importe quel chiffre est interprétable comme un succès avec un peu de bonne volonté.</p>
<p><strong>Pattern 3 — L'hypothèse non formulée :</strong> l'équipe a une solution en tête mais ne l'a jamais explicitement formulée comme hypothèse. Du coup, personne ne remet en question le fait que c'est la bonne solution — c'est juste "la solution".</p>`,
        invariants: `<p>Les frameworks de gestion des hypothèses changent. <strong>Ce qui ne change pas : toute solution est une hypothèse sur la façon de résoudre un problème. La différence entre une équipe qui apprend vite et une équipe qui patine est la clarté avec laquelle elle formule et teste ses hypothèses.</strong></p><p><strong>Ce qui change :</strong> les outils de test et de mesure. <strong>Ce qui ne change pas :</strong> la relation causale entre une hypothèse claire, un test rigoureux, et un apprentissage actionnable.</p>`,
        practice: {
          exercices: [
            {
              titre: "Formuler une hypothèse de solution complète",
              etapes: [
                "Choisis une solution ou feature que tu veux construire.",
                "Formule l'hypothèse complète : 'Je crois que [description de la solution] résoudra [problème spécifique] pour [segment d'utilisateurs].'",
                "Formule le signal de validation : 'Je saurai que j'ai raison quand [métrique] atteindra [seuil] en [délai].'",
                "Formule le signal d'invalidation : 'Je saurai que j'ai tort quand [métrique] ne dépasse pas [seuil] en [délai].'",
                "Identifie ce que tu ferais si l'hypothèse est invalidée : pivoter (changer la solution), persévérer (corriger l'exécution), ou arrêter (abandonner l'idée).",
              ],
              output: "Une hypothèse de solution complète avec signal de validation, signal d'invalidation, et plan de réponse en cas d'invalidation.",
              critere: "Le signal d'invalidation est aussi précis que le signal de validation — tu peux imaginer les deux résultats clairement. Si l'invalidation semble impossible ou improbable, l'hypothèse n'est pas assez honnêtement formulée.",
            },
          ],
          piege: "Formuler des hypothèses trop vagues pour être invalidées : 'les utilisateurs seront plus satisfaits' n'est pas un signal de validation. Un signal doit être mesurable, temporellement borné, et suffisamment précis pour trancher.",
        },
        verification: [
          "Pourquoi traiter une solution comme une hypothèse plutôt que comme une réponse change-t-il l'approche du développement ?",
          "Formule une hypothèse complète pour une feature de notification push dans une app de recettes. Inclus le signal de validation et d'invalidation.",
          "Qu'est-ce que la falsifiabilité ? Pourquoi une hypothèse non falsifiable est-elle inutile pour guider les décisions produit ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 280",
      nodes: [
        { id: "desirableFaisableViable", x: 20,  y: 108, w: 155, h: 65 },
        { id: "vraiMvp",                x: 230, y: 40,  w: 120, h: 65 },
        { id: "contrainteCreatrice",    x: 230, y: 175, w: 140, h: 65 },
        { id: "ceQuOnNeConstructPas",   x: 430, y: 108, w: 150, h: 65 },
        { id: "solutionHypothese",      x: 640, y: 108, w: 150, h: 65 },
      ],
      edges: [
        { x1: 175, y1: 125, x2: 228, y2: 78,  label: "délimite" },
        { x1: 175, y1: 150, x2: 228, y2: 195, label: "force" },
        { x1: 350, y1: 72,  x2: 428, y2: 128, label: "précise" },
        { x1: 370, y1: 208, x2: 428, y2: 152, label: "exclut" },
        { x1: 580, y1: 140, x2: 638, y2: 140, label: "teste" },
      ],
    },
  },
});
