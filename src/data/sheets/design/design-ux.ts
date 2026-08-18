import { designNode, designSheet } from "./design-common";

export const designUx = designSheet({
  id: "design-D01",
  number: 21,
  title: "Expérience Utilisateur",
  subtitle: "Concevoir des expériences lisibles, actionnables et alignées sur les vrais usages",
  badge: "Fiche D01",
  meta: ["9 nœuds"],
  readingTime: "40 min",
  description:
    "Distinguer UX et UI, récolter des données utilisateur, transformer les observations en zoning, wireframes, mockups et prototypes, puis itérer par les tests pour concevoir des expériences lisibles, actionnables et cohérentes.",
  accent: "fondement",
  nodes: {
    uxRealite: designNode({
      id: "uxRealite",
      label: "UX Design vs UI Design",
      icon: "👁",
      kind: "fondement",
      niveau: "Fondation",
      why: "Une personne arrive avec une intention simple, mais le produit lui impose ses écrans, son vocabulaire interne, ses détours et ses ambiguïtés. Une interface peut être élégante et pourtant rendre une réservation, un paiement ou une recherche pénible. L'UX Design existe pour réduire cette distance entre intention humaine et système construit ; l'UI Design donne ensuite une forme visuelle lisible et cohérente aux interactions.",
      system:
        'L\'UX transforme la compréhension du problème réel <span class="ref-fiche">→ C01</span> et des utilisateurs <span class="ref-fiche">→ C02</span> en expérience vécue. Elle mobilise recherche utilisateur, architecture de l\'information, interaction design, contenu, accessibilité et mesure. L\'UI Design intervient dans ce système par les principes visuels <span class="ref-fiche">→ D02</span> et les composants <span class="ref-fiche">→ D03</span> : il rend perceptibles les priorités et les actions sans remplacer le travail UX.',
      choice:
        "Il ne faut pas opposer UX et UI, mais savoir quel problème on traite. Si les utilisateurs abandonnent parce que le parcours demande une information indisponible, retravailler les couleurs ne suffit pas : c'est un problème UX. Si le parcours est juste mais que les actions se distinguent mal, l'UI est en cause. L'UX Research clarifie les comportements ; l'Interaction Design organise les actions ; le Service Design regarde les points de contact hors écran ; l'UI Design traduit ces décisions visuellement.",
      senior:
        "Un designer expérimenté ne demande pas seulement si l'utilisateur aime l'interface : il observe s'il réussit la tâche, où son regard hésite, où il reformule mentalement les libellés, et quel contournement il invente. Il sait aussi nommer la nature d'un problème avant de corriger : changer l'UI d'un flux mal conçu rend souvent l'échec plus séduisant, pas moins réel.",
      errors:
        "<p><strong>Pattern 1 — L'UX cosmétique :</strong> sous pression de livraison, l'équipe traite l'UX comme une couche visuelle ajoutée à la fin. Le problème vient du biais de visibilité : ce qui se voit en capture d'écran semble plus réel que les hésitations invisibles de l'utilisateur.</p><p><strong>Pattern 2 — L'utilisateur miroir :</strong> le concepteur projette son propre niveau de connaissance sur l'utilisateur et trouve le produit évident. Ce pattern apparaît parce que plus on connaît un système, plus il devient difficile d'imaginer l'ignorance initiale.</p><p><strong>Pattern 3 — Le succès déclaratif :</strong> on croit une expérience validée parce que les gens disent aimer le concept. La pression d'obtenir des retours positifs fait oublier que les comportements observés valent plus que les opinions polies.</p>",
      invariants:
        "<p>Les modes d'interaction changent, mais l'utilisateur reste une personne qui poursuit une intention sous contraintes de temps, d'attention et de contexte. <strong>Ce qui change :</strong> les devices, les conventions visuelles et les outils de prototypage. <strong>Ce qui ne change pas :</strong> une bonne expérience réduit toujours l'écart entre ce que l'utilisateur veut accomplir et ce que le système lui demande de comprendre.</p>",
      practice: {
        titre: "Auditer l'expérience d'une tâche réelle",
        etapes: [
          "Choisis un produit courant et une tâche précise, par exemple créer un compte, réserver un créneau ou retrouver une facture.",
          "Réalise la tâche sans utiliser ta mémoire du produit et note chaque moment d'hésitation, de retour arrière ou de doute.",
          "Classe chaque friction : compréhension, navigation, saisie, attente, erreur ou confiance.",
          "Formule une hypothèse de correction pour la friction la plus coûteuse.",
        ],
        output:
          "Tableau avec la tâche, les étapes, les frictions classées, et une hypothèse de correction prioritaire.",
        critere:
          "L'audit est réussi si une autre personne peut refaire la tâche et reconnaître au moins une des frictions que tu as nommées.",
        piege:
          "Auditer l'interface comme une image statique. L'UX se révèle dans l'enchaînement des actions, pas dans une capture d'écran isolée.",
      },
      verification: [
        "Explique la différence entre UX Design et UI Design sans les opposer.",
        'Un testeur dit "j\'aime bien" mais met 6 minutes à trouver comment annuler son abonnement. Quel signal dois-tu croire et que dois-tu investiguer ?',
        "Pourquoi améliorer uniquement l'apparence ne corrige-t-il pas un parcours mal conçu ?",
      ],
    }),
    recherchePersonas: designNode({
      id: "recherchePersonas",
      label: "Recherche et personas",
      icon: "⌕",
      kind: "fondement",
      niveau: "Fondation",
      why: "Quand une équipe imagine ses utilisateurs depuis une salle de réunion, elle conçoit pour une moyenne fictive : disponible, attentive, familière du vocabulaire interne et équipée du bon appareil. La recherche utilisateur existe pour remplacer les suppositions silencieuses par des observations ; les personas existent pour synthétiser les régularités utiles sans oublier leur niveau de preuve.",
      system:
        'La recherche UX prolonge la compréhension des utilisateurs <span class="ref-fiche">→ C02</span> : entretiens, observation contextuelle, analytics, tickets de support et tests d\'utilisabilité éclairent des questions différentes. Les personas regroupent ensuite objectifs, comportements, contextes et frustrations récurrents pour orienter les flux <span class="ref-fiche">→ D01</span> et les composants <span class="ref-fiche">→ D03</span>, sans remplacer les données sources.',
      choice:
        "Un entretien révèle vocabulaire, motivations et récits ; une observation montre les écarts entre discours et comportement ; les analytics quantifient où un problème survient sans expliquer pourquoi ; un test d'utilisabilité révèle les frictions d'une tâche. Un proto-persona peut aligner provisoirement l'équipe au démarrage, mais il doit être explicitement marqué comme hypothèse. Un persona de recherche repose sur plusieurs signaux convergents et décrit des comportements utiles aux décisions, pas une biographie décorative.",
      senior:
        "Un designer expérimenté prépare une question de recherche avant de choisir une méthode. Il ne récolte pas des données pour remplir un livrable : il cherche quelle décision changera selon la réponse. Il se méfie des personas trop romanesques et des moyennes confortables ; un comportement minoritaire mais critique peut exiger un scénario distinct, surtout sur mobile, en situation d'urgence ou avec des contraintes d'accessibilité.",
      errors:
        "<p><strong>Pattern 1 — Le persona de fiction :</strong> l'équipe invente âge, prénom et loisirs sans données parce qu'un modèle de document demande de remplir des cases. La fiche paraît précise mais guide les décisions avec une fausse certitude.</p><p><strong>Pattern 2 — L'entretien sondage :</strong> le designer pose des questions orientées pour confirmer son idée parce qu'il veut avancer vite. Les réponses polies remplacent l'observation des comportements réels.</p><p><strong>Pattern 3 — La donnée sans question :</strong> l'équipe accumule analytics, verbatims et tickets sans décision ciblée. La recherche devient un stock d'informations impossible à prioriser.</p>",
      invariants:
        "<p>La recherche UX réduit l'incertitude avant de figer une solution. Un persona utile synthétise des comportements observés et reste révisable quand les données changent. <strong>Ce qui change :</strong> les méthodes de collecte, les outils d'analytics et le format des personas. <strong>Ce qui ne change pas :</strong> concevoir pour l'utilisateur exige de confronter les hypothèses internes à des comportements réels.</p>",
      practice: {
        titre: "Construire un persona fondé sur des données",
        etapes: [
          "Choisis une décision de design à éclairer et formule une question de recherche précise.",
          "Rassemble au moins cinq observations issues d'entretiens, tests, analytics ou tickets de support.",
          "Regroupe les régularités par objectif, comportement, contexte et frustration, en séparant faits et hypothèses.",
          "Rédige un persona court et note une décision de design qu'il modifie concrètement.",
        ],
        output:
          "Une fiche persona sourcée avec objectifs, comportements, contextes, frustrations, hypothèses restantes et décision influencée.",
        critere:
          "Chaque élément du persona doit être relié à une observation ou marqué comme hypothèse ; au moins une décision de design doit changer à sa lecture.",
        piege:
          "Ajouter des détails biographiques qui rendent le persona vivant mais ne modifient aucune décision.",
      },
      verification: [
        "À quoi sert un persona dans le processus de design, et quand devient-il dangereux ?",
        "Tes analytics montrent 45 % d'abandon sur mobile à l'étape 3. Quelle méthode qualitative ajoutes-tu pour comprendre la cause ?",
        "Pourquoi une recherche UX utile commence-t-elle par une décision à éclairer plutôt que par une méthode favorite ?",
      ],
    }),
    hierarchieInfo: designNode({
      id: "hierarchieInfo",
      label: "Hiérarchie de l'information",
      icon: "⬡",
      kind: "fondement",
      niveau: "Fondation",
      why: "Un écran qui donne tout avec la même intensité oblige l'utilisateur à faire le tri lui-même. Il scanne, ne sait pas où commencer, confond l'action principale avec les options secondaires, puis ralentit ou clique au hasard. La hiérarchie existe parce que l'attention humaine est sélective : une interface doit dire quoi regarder d'abord.",
      system:
        'La hiérarchie traduit les priorités du problème <span class="ref-fiche">→ C01</span> dans la structure de l\'écran. Elle guide les flux utilisateur <span class="ref-fiche">→ D01</span>, réduit la charge cognitive <span class="ref-fiche">→ D01</span>, et donne aux principes visuels <span class="ref-fiche">→ D02</span> un rôle fonctionnel : taille, contraste et espacement servent une priorité, pas une décoration.',
      choice:
        "Les signaux de hiérarchie sont complémentaires. La taille attire fortement mais peut devenir bruyante ; le contraste distingue les actions critiques mais perd son effet s'il est utilisé partout ; la position guide le scan selon les conventions de lecture ; l'espacement regroupe ou sépare les idées. Le bon choix dépend de l'intention : orienter, rassurer, comparer ou faire agir.",
      senior:
        "Un designer expérimenté limite volontairement le nombre de niveaux perceptibles. Il utilise le test du flou : si l'interface floutée ne montre plus clairement le titre, l'action principale et les groupes de contenu, la hiérarchie dépend trop du texte. Il redoute les écrans où chaque équipe a obtenu son élément \"important\" au même niveau.",
      errors:
        "<p><strong>Pattern 1 — La démocratie visuelle :</strong> chaque stakeholder réclame la même importance pour son contenu, donc tout devient gros, coloré et prioritaire. La cause est politique : personne ne veut accepter que son information soit secondaire.</p><p><strong>Pattern 2 — Le CTA rival :</strong> plusieurs actions principales semblent équivalentes alors qu'elles n'ont pas la même valeur utilisateur. Ce pattern vient de la confusion entre options disponibles et décision à guider.</p><p><strong>Pattern 3 — La hiérarchie par décoration :</strong> on ajoute couleurs et tailles après coup pour rendre l'écran plus vivant, sans réexaminer l'ordre réel des décisions. Le biais esthétique masque un problème d'architecture d'information.</p>",
      invariants:
        "<p>Les styles passent de mode, mais la perception cherche toujours des différences de poids pour organiser l'information. <strong>Ce qui change :</strong> les typographies, palettes et conventions de layout. <strong>Ce qui ne change pas :</strong> sans signaux de priorité cohérents, l'attention humaine doit reconstruire elle-même l'ordre de lecture.</p>",
      practice: {
        titre: "Tester une hiérarchie avec le flou",
        etapes: [
          "Choisis un écran riche en contenu : page d'accueil, tableau de bord ou page produit.",
          "Floute mentalement ou visuellement la capture jusqu'à ne plus lire le texte.",
          "Note les trois éléments qui dominent encore et compare-les à l'objectif utilisateur principal.",
          "Propose un changement de taille, contraste, position ou espacement pour corriger le premier décalage.",
        ],
        output: "Capture annotée avec niveau 1, niveau 2, niveau 3 et correction proposée.",
        critere:
          "La hiérarchie est correcte si une personne peut prédire l'action principale sans lire tout le contenu.",
        piege:
          "Confondre priorité business et priorité perceptive. Une information peut être importante pour l'entreprise sans devoir dominer le premier regard.",
      },
      verification: [
        "Pourquoi une page avec quatre boutons primaires crée-t-elle une mauvaise hiérarchie ?",
        "Tu floutes une page de pricing et le premier élément visible est un badge promotionnel, pas les offres. Que déduis-tu ?",
        "Pourquoi la hiérarchie reste-t-elle un invariant même si les styles visuels changent ?",
      ],
    }),
    fluxUtilisateur: designNode({
      id: "fluxUtilisateur",
      label: "Flux utilisateur",
      icon: "→",
      kind: "pattern",
      niveau: "Fondation",
      why: "Un utilisateur ne vit jamais un écran seul : il arrive de quelque part, prend une décision, traverse une étape, se trompe parfois, puis attend une confirmation. Quand on conçoit écran par écran, les transitions deviennent des trous noirs : retour impossible, étape inutile, erreur non prévue. Le flux existe pour concevoir la progression complète.",
      system:
        'Le flux matérialise les besoins utilisateur issus de <span class="ref-fiche">→ C02</span> et le périmètre décidé en <span class="ref-fiche">→ C03</span>. Il organise la hiérarchie de chaque écran <span class="ref-fiche">→ D01</span>, détermine les composants nécessaires <span class="ref-fiche">→ D03</span>, et révèle les mesures à suivre ensuite <span class="ref-fiche">→ C06</span> : abandon, erreur, reprise et réussite.',
      choice:
        "Un user flow montre les étapes et décisions pour raisonner vite ; un wireflow ajoute les écrans pour vérifier la continuité ; un prototype interactif teste le rythme et les incompréhensions ; une journey map inclut les émotions et points de contact hors produit. Plus l'enjeu est comportemental, plus il faut aller vers prototype ou journey map.",
      senior:
        "Un designer expérimenté commence rarement par le happy path seul. Il anticipe les retours arrière, les interruptions, les données manquantes, les erreurs de paiement, les sessions expirées et les reprises plus tard. Il sait qu'un flux est robuste quand l'utilisateur peut se tromper sans se sentir piégé.",
      errors:
        "<p><strong>Pattern 1 — Le tunnel parfait :</strong> le flux est dessiné uniquement pour l'utilisateur motivé, informé et sans erreur. La cause est l'optimisme de conception : on imagine le comportement désiré au lieu du comportement probable.</p><p><strong>Pattern 2 — L'écran orphelin :</strong> un écran est bien conçu seul mais ne dit pas clairement d'où l'on vient ni où repartir. Ce pattern apparaît quand les maquettes sont évaluées comme des planches graphiques plutôt que comme des séquences.</p><p><strong>Pattern 3 — La friction invisible :</strong> une étape semble petite pour l'équipe mais coûteuse pour l'utilisateur, comme chercher une information externe ou vérifier un email. La cause est la sous-estimation du contexte réel d'usage.</p>",
      invariants:
        "<p>Les écrans, assistants vocaux ou gestes changent la forme du parcours, mais pas le fait qu'une action se déroule dans le temps. <strong>Ce qui change :</strong> les supports, transitions et patterns de navigation. <strong>Ce qui ne change pas :</strong> chaque étape inutile ou ambiguë augmente la probabilité d'abandon.</p>",
      practice: {
        titre: "Cartographier un flux avec échecs",
        etapes: [
          "Choisis un objectif précis, comme changer un mot de passe ou réserver une livraison.",
          "Liste le happy path en étapes courtes, avec une seule décision par étape.",
          "Ajoute au moins trois chemins d'échec : information absente, erreur de saisie, abandon ou retour arrière.",
          "Indique pour chaque échec comment l'interface permet de comprendre, corriger et reprendre.",
        ],
        output: "Schéma de flux avec happy path, trois chemins d'échec et mécanismes de reprise.",
        critere:
          "Le flux est exploitable si aucune erreur ne se termine par une impasse ou un message sans prochaine action.",
        piege:
          "Supprimer les chemins d'échec pour rendre le schéma plus propre. Un flux propre mais irréaliste ne protège pas l'expérience réelle.",
      },
      verification: [
        "Pourquoi faut-il dessiner le flux avant de détailler les composants ?",
        "Un onboarding perd 40% des utilisateurs après la demande de numéro de téléphone. Quelles hypothèses de flux dois-tu tester ?",
        "Quelle différence durable y a-t-il entre un happy path et un flux utilisateur complet ?",
      ],
    }),
    ideationWireframes: designNode({
      id: "ideationWireframes",
      label: "Du zoning au prototype",
      icon: "▤",
      kind: "pattern",
      niveau: "Fondation",
      why: "Une observation utilisateur ne dessine pas automatiquement la bonne interface. Quand une équipe saute directement vers une maquette détaillée, elle s'attache trop tôt à une seule solution et discute couleurs, alignements ou composants avant d'avoir comparé les parcours possibles. Zoning, wireframes, mockups et prototypes servent à répondre progressivement à quatre questions différentes : quelles zones faut-il prévoir, comment organiser l'information, quelle forme visuelle donner à la solution, puis comment vérifier son comportement.",
      system:
        'L\'idéation transforme les observations issues de la recherche <span class="ref-fiche">→ D01</span> en plusieurs réponses possibles au problème cadré en Conception <span class="ref-fiche">→ C03</span>. Le zoning répartit d\'abord les grandes zones fonctionnelles ; le wireframe précise contenus, hiérarchie, actions et navigation ; le mockup applique les principes visuels <span class="ref-fiche">→ D02</span> et prépare les composants <span class="ref-fiche">→ D03</span> ; le prototype relie des écrans ou états afin de confronter le flux <span class="ref-fiche">→ D01</span> à un usage observable. Ces livrables ne sont pas quatre obligations mécaniques : chacun réduit une incertitude différente.',
      choice:
        "Choisis le livrable le moins coûteux capable de répondre à la question actuelle. Le zoning est un découpage très basse fidélité : en-tête, navigation, contenu principal, aide ou action ; il vérifie la répartition des zones avant les détails. Le wireframe structure les contenus réels, priorités, actions et états sans investir dans la finition. Le mockup, ou maquette visuelle, montre l'apparence attendue avec typographie, couleurs, espacements et composants : il permet d'évaluer l'UI, mais ne prouve pas que le flux fonctionne. Le prototype rend une partie du parcours interactive pour tester transitions, compréhension et reprise après erreur. Commence bas en fidélité quand le problème reste incertain ; monte seulement quand la prochaine décision l'exige.",
      senior:
        "Un designer expérimenté sait nommer l'incertitude avant de choisir le livrable. Il utilise un zoning pour débloquer une discussion de structure, un wireframe pour comparer plusieurs organisations, un mockup pour arbitrer la forme visuelle, puis un prototype pour observer une tâche. Il garde volontairement les premiers livrables simples : une finition prématurée rend les critiques moins honnêtes et les suppressions plus coûteuses émotionnellement. Avant le handoff, il annote aussi états, contenus longs, responsive mobile et cas d'échec.",
      errors:
        "<p><strong>Pattern 1 — Le zoning sauté :</strong> l'équipe ouvre directement l'outil de maquette parce qu'un écran détaillé paraît plus concret. Les grandes zones et priorités sont décidées implicitement, puis deviennent coûteuses à remettre en question.</p><p><strong>Pattern 2 — Le mockup pris pour une preuve :</strong> la maquette est visuellement convaincante, donc l'équipe suppose que l'expérience fonctionne. Sans parcours interactif ni test, les transitions, erreurs et incompréhensions restent invisibles.</p><p><strong>Pattern 3 — Le prototype théâtre :</strong> le prototype relie uniquement le happy path pour produire une démo fluide. Les reprises, contenus longs et états d'erreur sont écartés, puis redécouverts pendant le développement.</p>",
      invariants:
        "<p>Zoning, wireframe, mockup et prototype sont des outils de réduction d'incertitude, pas des livrables cérémoniels. Leur niveau de fidélité doit rester proportionné à la décision à prendre. <strong>Ce qui change :</strong> les outils de dessin, la fidélité, le format des annotations et la nécessité de produire chaque étape séparément. <strong>Ce qui ne change pas :</strong> valider structure, forme visuelle et comportement au bon moment réduit le coût des mauvaises décisions avant le développement.</p>",
      practice: {
        titre: "Faire évoluer un écran du zoning au prototype",
        etapes: [
          "Choisis une friction observée et formule le besoin utilisateur sans décrire de solution.",
          "Dessine un zoning avec les grandes zones fonctionnelles, puis décline deux wireframes structurellement différents.",
          "Choisis un wireframe avec un critère utilisateur explicite et transforme-le en mockup en appliquant hiérarchie, typographie et composants.",
          "Relie le mockup à au moins un état d'erreur ou de reprise dans un prototype court et précise l'hypothèse à tester.",
        ],
        output:
          "Un zoning, deux wireframes, un mockup et un prototype court annotés par les décisions qu'ils permettent de vérifier.",
        critere:
          "Chaque livrable doit répondre à une question différente : zones, structure, forme visuelle puis comportement observable.",
        piege:
          "Produire quatre versions du même écran sans expliquer quelle incertitude chaque livrable réduit.",
      },
      verification: [
        "Quelle différence fais-tu entre zoning, wireframe, mockup et prototype ?",
        "Une équipe débat pendant une heure de la couleur d'un bouton alors que l'emplacement des actions principales reste incertain. Quel livrable utilises-tu ensuite et pourquoi ?",
        "Quel invariant permet de choisir le niveau de fidélité adapté sans produire mécaniquement tous les livrables ?",
      ],
    }),
    iterationTests: designNode({
      id: "iterationTests",
      label: "Tests et itération",
      icon: "↻",
      kind: "pattern",
      niveau: "Intermédiaire",
      why: "Une solution peut paraître évidente en revue interne et échouer dès qu'une personne extérieure essaie de l'utiliser. Sans test, l'équipe transforme ses préférences en certitudes. Sans itération, elle collecte des retours mais continue comme prévu. Les tests existent pour confronter une hypothèse à un comportement observable et modifier la conception avant ou après livraison.",
      system:
        'Les tests évaluent les wireframes et prototypes <span class="ref-fiche">→ D01</span>, puis les métriques de produit prolongent l\'observation après livraison <span class="ref-fiche">→ C06</span>. Un test d\'utilisabilité explique où et pourquoi une tâche bloque ; un A/B test compare l\'effet causal de deux variantes sur une métrique ; la boucle d\'apprentissage <span class="ref-fiche">→ C06</span> transforme le résultat en décision.',
      choice:
        "Le test modéré permet de poser des questions quand le comportement surprend ; le test non modéré augmente le volume sur des tâches simples ; le prototype teste tôt une compréhension ou un flux ; l'A/B test exige un produit existant, assez de trafic, une hypothèse et une métrique définies avant le lancement. L'A/B test ne remplace pas la recherche qualitative : il dit quelle variante performe mieux, rarement pourquoi.",
      senior:
        "Un designer expérimenté choisit le test le moins coûteux capable de réduire l'incertitude importante. Il refuse l'A/B test décoratif sur une couleur quand le vrai risque porte sur le flux. Avant l'expérience, il écrit la métrique principale, le seuil, la durée et la décision attendue ; après, il examine aussi les segments et les effets secondaires pour éviter d'améliorer une conversion en dégradant confiance ou rétention.",
      errors:
        "<p><strong>Pattern 1 — Le test théâtre :</strong> l'équipe teste une solution déjà décidée pour rassurer les stakeholders. Les retours gênants sont requalifiés en exceptions et aucune décision ne change.</p><p><strong>Pattern 2 — L'A/B confetti :</strong> on compare des micro-variantes sans hypothèse parce que l'outil le permet. Les résultats s'accumulent sans apprentissage utile.</p><p><strong>Pattern 3 — Le gagnant local :</strong> une variante augmente le clic immédiat mais dégrade compréhension, confiance ou rétention. La métrique trop étroite optimise un moment au détriment de l'expérience complète.</p>",
      invariants:
        "<p>Un test utile part d'une incertitude, observe un signal adapté et déclenche une décision. Plus la décision est coûteuse, plus le niveau de preuve doit être solide. <strong>Ce qui change :</strong> les plateformes de test, le trafic disponible et les métriques instrumentées. <strong>Ce qui ne change pas :</strong> une itération sans hypothèse ni décision explicite produit de l'activité, pas de l'apprentissage.</p>",
      practice: {
        titre: "Choisir un test adapté à une incertitude UX",
        etapes: [
          "Choisis une friction ou une décision de design incertaine.",
          "Formule l'hypothèse et le comportement observable qui la confirmerait ou l'infirmerait.",
          "Choisis entre test d'utilisabilité, prototype ou A/B test et justifie ce choix.",
          "Définis avant le test la métrique ou les observations, le seuil et la décision pour chaque résultat.",
        ],
        output:
          "Un protocole de test avec hypothèse, méthode, signal, seuil et décision post-test.",
        critere:
          "Le protocole est valable si un résultat négatif peut réellement conduire à modifier ou abandonner la solution.",
        piege:
          "Choisir l'A/B testing parce qu'il semble plus scientifique alors que le trafic ou la question ne permettent pas une conclusion fiable.",
      },
      verification: [
        "Quelle différence fais-tu entre test d'utilisabilité et A/B test ?",
        'Une variante augmente les clics sur "Commencer" mais diminue la complétion du parcours. Comment interprètes-tu le résultat ?',
        "Pourquoi définir la décision avant de lancer un test protège-t-il l'apprentissage ?",
      ],
    }),
    modelesConception: designNode({
      id: "modelesConception",
      label: "UCD, HCD et Data-Driven",
      icon: "◇",
      kind: "fondement",
      niveau: "Intermédiaire",
      why: "Une équipe peut dire qu'elle conçoit pour l'utilisateur tout en arbitrant chaque décision selon l'opinion la plus forte, la métrique la plus disponible ou la contrainte interne la plus visible. Les modèles de pensée existent pour expliciter ce que l'on observe, qui l'on implique et comment les preuves influencent les choix.",
      system:
        'L\'User-Centered Design (UCD) organise la conception autour des besoins, tâches et retours des utilisateurs du produit. Le Human-Centered Design (HCD) élargit le regard aux humains affectés par le système, à leur contexte et aux effets sociaux. Le Data-Driven Design nourrit les décisions par des données qualitatives et quantitatives issues de la recherche <span class="ref-fiche">→ D01</span> et de la mesure <span class="ref-fiche">→ C06</span>. Ces approches orientent l\'itération <span class="ref-fiche">→ D01</span> sans remplacer le jugement.',
      choice:
        "Utilise UCD pour optimiser une expérience autour de tâches utilisateur clairement identifiées. Élargis vers HCD quand la solution touche plusieurs acteurs, des contraintes humaines fortes ou des conséquences hors écran. Adopte une pratique Data-Driven quand des signaux fiables peuvent éclairer l'arbitrage, sans réduire le design à ce qui est déjà mesurable. Dans un produit mature, les trois approches se complètent souvent.",
      senior:
        "Un designer expérimenté se méfie du faux duel entre intuition et données. Les données décrivent un comportement dans un contexte donné ; elles ne choisissent pas seules le futur souhaitable. Il utilise les anomalies quantitatives pour chercher qualitativement un mécanisme, puis emploie son jugement pour proposer une réponse que les données historiques ne pouvaient pas encore contenir.",
      errors:
        "<p><strong>Pattern 1 — Le user-centered de slogan :</strong> l'équipe invoque l'utilisateur mais ne l'observe jamais parce que les décisions doivent aller vite. L'opinion interne continue de gouverner sous un vocabulaire rassurant.</p><p><strong>Pattern 2 — Le dashboard oracle :</strong> une métrique disponible décide à la place de l'équipe parce qu'elle paraît objective. Les besoins non instrumentés et les effets à long terme deviennent invisibles.</p><p><strong>Pattern 3 — L'humain réduit à l'utilisateur :</strong> le produit optimise la tâche de la personne devant l'écran mais ignore support, opérateurs, proches ou personnes affectées. Une expérience localement fluide déplace le coût ailleurs.</p>",
      invariants:
        "<p>UCD, HCD et Data-Driven Design sont des focales complémentaires, pas des recettes exclusives. Une donnée reste une observation située ; une décision reste un arbitrage explicite. <strong>Ce qui change :</strong> les méthodes, le volume de données et les acteurs impliqués. <strong>Ce qui ne change pas :</strong> une conception robuste relie preuves, contexte humain et jugement plutôt que de déléguer le choix à une opinion ou à un chiffre isolé.</p>",
      practice: {
        titre: "Comparer trois focales de conception",
        etapes: [
          "Choisis une fonctionnalité, par exemple livraison, authentification ou notifications.",
          "Analyse-la avec l'UCD : utilisateur direct, tâche, friction et résultat attendu.",
          "Élargis avec l'HCD : autres humains affectés, contextes et conséquences hors écran.",
          "Ajoute la focale Data-Driven : données disponibles, angles morts et décision qui exige encore du jugement.",
        ],
        output: "Une matrice UCD/HCD/Data-Driven avec observations, décisions et angles morts.",
        critere:
          "Chaque focale doit révéler au moins un élément absent des deux autres ou expliquer pourquoi elle ne change pas la décision.",
        piege:
          "Présenter les trois modèles comme des étapes obligatoires ou des concurrents alors qu'ils répondent à des questions différentes.",
      },
      verification: [
        "Quelle différence de périmètre fais-tu entre UCD et HCD ?",
        "Ton dashboard montre qu'une relance quotidienne augmente l'ouverture de l'app mais les tickets support signalent une irritation croissante. Comment raisonnes-tu ?",
        "Pourquoi le Data-Driven Design ne signifie-t-il pas que les données prennent seules les décisions ?",
      ],
    }),
    chargeCognitive: designNode({
      id: "chargeCognitive",
      label: "Charge cognitive",
      icon: "🧠",
      kind: "fondement",
      niveau: "Fondation",
      why: "Un écran peut être techniquement complet et mentalement épuisant. L'utilisateur doit retenir une règle, comparer trop d'options, comprendre des libellés abstraits, puis décider sans savoir ce qui compte. Quand l'effort mental dépasse la valeur perçue, il ralentit, reporte ou abandonne.",
      system:
        'La charge cognitive dépend de la hiérarchie <span class="ref-fiche">→ D01</span>, du nombre d\'étapes du flux <span class="ref-fiche">→ D01</span>, de la clarté typographique <span class="ref-fiche">→ D02</span> et de la qualité des formulaires <span class="ref-fiche">→ D03</span>. Elle relie directement design et apprentissage : une interface doit externaliser l\'information que l\'utilisateur ne devrait pas mémoriser.',
      choice:
        "Plusieurs leviers réduisent la charge. Le chunking regroupe les informations liées ; la divulgation progressive cache ce qui n'est utile que plus tard ; les conventions connues remplacent l'apprentissage ; la reconnaissance évite de mémoriser. La loi de Hick rappelle qu'augmenter le nombre d'options simultanées ralentit la décision, surtout quand les options se ressemblent.",
      senior:
        "Un designer expérimenté distingue la complexité nécessaire de la complexité ajoutée. Remplir une déclaration fiscale est intrinsèquement complexe ; demander à l'utilisateur de mémoriser un code reçu trois écrans plus tôt est une complexité extrinsèque créée par l'interface. Il ne promet pas toujours une interface courte : il cherche une interface qui porte l'effort au bon endroit.",
      errors:
        "<p><strong>Pattern 1 — Le dashboard cockpit :</strong> tout est affiché pour montrer la puissance du produit, mais personne ne sait quoi regarder. La cause est le biais d'exhaustivité : confondre disponibilité de l'information et utilité au moment présent.</p><p><strong>Pattern 2 — La mémoire sous-traitée :</strong> l'interface force l'utilisateur à retenir un prix, un code, une option ou une règle d'un écran à l'autre. Ce pattern vient souvent d'une architecture interne plus simple pour l'équipe mais plus coûteuse pour l'utilisateur.</p><p><strong>Pattern 3 — La simplification destructive :</strong> on retire des informations nécessaires au nom de la simplicité, puis l'utilisateur perd confiance. La cause est une confusion entre réduire la charge et cacher le contexte indispensable.</p>",
      invariants:
        "<p>Les interfaces peuvent devenir plus intelligentes, mais la mémoire de travail humaine reste limitée. <strong>Ce qui change :</strong> les patterns de disclosure, d'automatisation et d'aide contextuelle. <strong>Ce qui ne change pas :</strong> une interface qui force l'utilisateur à retenir, comparer et deviner au-delà de sa mémoire de travail augmente toujours erreurs et abandon.</p>",
      practice: {
        titre: "Repérer la charge cognitive d'un flux",
        etapes: [
          "Choisis un flux de 4 à 8 étapes.",
          "Pour chaque étape, liste ce que l'utilisateur doit lire, décider et mémoriser.",
          "Identifie les charges intrinsèques nécessaires et les charges extrinsèques créées par l'interface.",
          "Propose une correction pour supprimer une charge extrinsèque sans retirer une information nécessaire.",
        ],
        output:
          "Tableau étape par étape avec lecture, décision, mémoire, type de charge et correction proposée.",
        critere:
          "La correction est bonne si elle réduit un effort mental sans rendre la décision moins informée.",
        piege:
          "Croire que moins d'éléments signifie toujours moins de charge. Une information absente peut créer plus d'effort qu'une information bien placée.",
      },
      verification: [
        "Explique la différence entre complexité nécessaire et complexité ajoutée par l'interface.",
        "Un écran de choix d'abonnement affiche 12 options presque identiques. Comment la loi de Hick t'aide-t-elle à diagnostiquer le problème ?",
        "Pourquoi la mémoire de travail reste-t-elle un invariant de design, même avec de nouveaux outils ?",
      ],
    }),
    feedbackAffordance: designNode({
      id: "feedbackAffordance",
      label: "Feedback et affordances",
      icon: "↩",
      kind: "pattern",
      niveau: "Fondation",
      why: "Un utilisateur voit un élément, se demande s'il peut agir dessus, clique, puis attend de savoir si quelque chose s'est passé. Si l'interface ne suggère pas l'action possible ou ne répond pas après l'action, l'utilisateur répète, doute ou abandonne. Feedback et affordances existent pour fermer cette boucle d'incertitude.",
      system:
        'Les affordances rendent les composants <span class="ref-fiche">→ D03</span> compréhensibles avant l\'action ; le feedback rend les états d\'interface <span class="ref-fiche">→ D03</span> compréhensibles après l\'action. Ils s\'appuient sur le contraste et la couleur <span class="ref-fiche">→ D02</span>, mais doivent aussi rester accessibles quand la couleur ne suffit pas.',
      choice:
        "Une affordance peut être visuelle (forme de bouton), textuelle (verbe clair), spatiale (zone touchable) ou conventionnelle (icône connue). Le feedback peut être immédiat pour confirmer un clic, progressif pour une attente, de résultat pour une réussite, ou correctif pour une erreur. Le choix dépend du risque : plus l'action est critique, plus le feedback doit être explicite.",
      senior:
        "Un designer expérimenté applique les seuils de réponse de Nielsen : sous 100 ms, l'action paraît instantanée ; entre 100 ms et 1 s, le flux reste fluide ; au-delà de 1 s, il faut signaler l'attente ; au-delà de 10 s, il faut une progression ou une alternative. Il anticipe aussi le focus clavier et le lecteur d'écran : un feedback visible mais muet n'est pas un feedback complet.",
      errors:
        "<p><strong>Pattern 1 — Le bouton caméléon :</strong> une action ressemble à du texte ou à une décoration, donc l'utilisateur ne la perçoit pas comme interactive. La cause est souvent une recherche de minimalisme qui efface les signaux d'action.</p><p><strong>Pattern 2 — Le clic sans écho :</strong> après une action, rien ne change immédiatement, donc l'utilisateur reclique ou pense que le système est cassé. Ce pattern vient de la sous-estimation du besoin de confirmation temporelle.</p><p><strong>Pattern 3 — L'erreur tribunal :</strong> le message dit seulement que l'utilisateur a échoué, sans expliquer quoi corriger ni comment reprendre. La cause est une vision technique de l'erreur plutôt qu'une vision de récupération utilisateur.</p>",
      invariants:
        "<p>Les formes d'interaction changent, mais l'humain cherche toujours à prédire ce qui est possible et à vérifier l'effet de son action. <strong>Ce qui change :</strong> les micro-interactions, les devices et les conventions de feedback. <strong>Ce qui ne change pas :</strong> agir sans retour perceptible crée toujours doute, répétition inutile et perte de confiance.</p>",
      practice: {
        titre: "Auditer les boucles action-retour",
        etapes: [
          "Choisis un écran avec au moins cinq éléments interactifs.",
          "Pour chacun, note comment l'utilisateur sait avant l'action qu'il peut interagir.",
          "Simule l'action et note le feedback immédiat, le feedback d'attente et le feedback de résultat ou d'erreur.",
          "Corrige l'élément le plus ambigu avec un signal avant action et un retour après action.",
        ],
        output: "Audit de cinq boucles action-retour avec ambiguïtés et correction prioritaire.",
        critere:
          "Chaque boucle est correcte si l'utilisateur peut répondre à deux questions : que puis-je faire ici, et que vient-il de se passer ?",
        piege:
          "Concevoir le feedback uniquement pour la réussite. Les erreurs et attentes sont les moments où l'utilisateur a le plus besoin de retour.",
      },
      verification: [
        "Explique la différence entre affordance et feedback avec un exemple concret.",
        "Après un paiement, rien ne se passe pendant 3 secondes. Quel feedback dois-tu prévoir et pourquoi ?",
        "Pourquoi un feedback doit-il rester utile même si la couleur, l'animation ou le son ne sont pas perçus ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 1040 500",
      nodes: [
        { id: "uxRealite", x: 20, y: 215, w: 155, h: 65 },
        { id: "recherchePersonas", x: 225, y: 90, w: 165, h: 65 },
        { id: "hierarchieInfo", x: 225, y: 340, w: 165, h: 65 },
        { id: "fluxUtilisateur", x: 440, y: 215, w: 145, h: 65 },
        { id: "ideationWireframes", x: 635, y: 90, w: 190, h: 65 },
        { id: "iterationTests", x: 855, y: 90, w: 155, h: 65 },
        { id: "modelesConception", x: 635, y: 215, w: 190, h: 65 },
        { id: "chargeCognitive", x: 440, y: 340, w: 145, h: 65 },
        { id: "feedbackAffordance", x: 855, y: 340, w: 165, h: 65 },
      ],
      edges: [
        { x1: 175, y1: 232, x2: 223, y2: 140, label: "observe" },
        { x1: 175, y1: 264, x2: 223, y2: 372, label: "ordonne" },
        { x1: 390, y1: 140, x2: 438, y2: 232, label: "éclaire" },
        { x1: 390, y1: 372, x2: 438, y2: 264, label: "structure" },
        { x1: 585, y1: 232, x2: 633, y2: 140, label: "matérialise" },
        { x1: 825, y1: 122, x2: 853, y2: 122, label: "teste" },
        { x1: 585, y1: 248, x2: 633, y2: 248, label: "oriente" },
        { x1: 585, y1: 372, x2: 853, y2: 372, label: "réduit" },
        { x1: 805, y1: 264, x2: 853, y2: 356, label: "cadre" },
      ],
    },
  },
});
