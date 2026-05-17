import { designNode, designSheet } from "./design-common";

export const designUx = designSheet({
  id: "design-D01",
  number: 21,
  title: "Expérience Utilisateur",
  subtitle: "Concevoir des expériences lisibles, actionnables et alignées sur les vrais usages",
  badge: "Fiche D01 — Vision Systémique",
  meta: ["5 nœuds · universel"],
  readingTime: "20 min",
  description: "Comprendre l'UX réelle, la hiérarchie de l'information, les flux, la charge cognitive, le feedback et les affordances.",
  accent: "fondement",
  nodes: {
    uxRealite: designNode({
      id: "uxRealite",
      label: "Ce qu'est vraiment l'UX",
      icon: "👁",
      kind: "fondement",
      niveau: "Fondation",
      why: "Une personne arrive avec une intention simple, mais le produit lui impose ses écrans, son vocabulaire interne, ses détours et ses ambiguïtés. Elle voulait réserver, comprendre, payer ou apprendre ; elle se retrouve à deviner où cliquer, à corriger des erreurs obscures, ou à abandonner sans savoir si le problème vient d'elle. L'UX existe pour réduire cette distance entre intention humaine et système construit.",
      system: "L'UX transforme la compréhension du problème réel <span class=\"ref-fiche\">→ C01</span> et des utilisateurs <span class=\"ref-fiche\">→ C02</span> en expérience vécue. Elle conditionne ensuite la hiérarchie de l'information <span class=\"ref-fiche\">→ D01</span>, les flux <span class=\"ref-fiche\">→ D01</span>, les composants <span class=\"ref-fiche\">→ D03</span> et les choix visuels <span class=\"ref-fiche\">→ D02</span> : si l'expérience visée est floue, chaque décision d'interface devient décorative.",
      choice: "Le choix conscient consiste à décider quel niveau d'UX on traite. L'UX Research clarifie les besoins et comportements avant la solution ; l'Interaction Design rend le chemin utilisable écran par écran ; le Service Design regarde l'expérience complète, y compris les emails, le support et les moments hors écran. Un petit produit peut commencer par le flux principal, mais un produit critique doit considérer tout le parcours.",
      senior: "Un designer expérimenté ne demande pas seulement si l'utilisateur aime l'interface : il observe s'il réussit la tâche, où son regard hésite, où il reformule mentalement les libellés, et quel contournement il invente. Il redoute les compliments vagues parce qu'ils masquent souvent une expérience mal comprise. Le signal fort n'est pas \"c'est joli\", c'est une tâche terminée sans explication extérieure.",
      errors: "<p><strong>Pattern 1 — L'UX cosmétique :</strong> sous pression de livraison, l'équipe traite l'UX comme une couche visuelle ajoutée à la fin. Le problème vient du biais de visibilité : ce qui se voit en capture d'écran semble plus réel que les hésitations invisibles de l'utilisateur.</p><p><strong>Pattern 2 — L'utilisateur miroir :</strong> le concepteur projette son propre niveau de connaissance sur l'utilisateur et trouve le produit évident. Ce pattern apparaît parce que plus on connaît un système, plus il devient difficile d'imaginer l'ignorance initiale.</p><p><strong>Pattern 3 — Le succès déclaratif :</strong> on croit une expérience validée parce que les gens disent aimer le concept. La pression d'obtenir des retours positifs fait oublier que les comportements observés valent plus que les opinions polies.</p>",
      invariants: "<p>Les modes d'interaction changent, mais l'utilisateur reste une personne qui poursuit une intention sous contraintes de temps, d'attention et de contexte. <strong>Ce qui change :</strong> les devices, les conventions visuelles et les outils de prototypage. <strong>Ce qui ne change pas :</strong> une bonne expérience réduit toujours l'écart entre ce que l'utilisateur veut accomplir et ce que le système lui demande de comprendre.</p>",
      practice: {
        titre: "Auditer l'expérience d'une tâche réelle",
        etapes: ["Choisis un produit courant et une tâche précise, par exemple créer un compte, réserver un créneau ou retrouver une facture.", "Réalise la tâche sans utiliser ta mémoire du produit et note chaque moment d'hésitation, de retour arrière ou de doute.", "Classe chaque friction : compréhension, navigation, saisie, attente, erreur ou confiance.", "Formule une hypothèse de correction pour la friction la plus coûteuse."],
        output: "Tableau avec la tâche, les étapes, les frictions classées, et une hypothèse de correction prioritaire.",
        critere: "L'audit est réussi si une autre personne peut refaire la tâche et reconnaître au moins une des frictions que tu as nommées.",
        piege: "Auditer l'interface comme une image statique. L'UX se révèle dans l'enchaînement des actions, pas dans une capture d'écran isolée."
      },
      verification: ["Explique pourquoi une interface visuellement propre peut quand même produire une mauvaise UX.", "Un testeur dit \"j'aime bien\" mais met 6 minutes à trouver comment annuler son abonnement. Quel signal dois-tu croire et que dois-tu investiguer ?", "Pourquoi l'UX reste-t-elle importante même si les technologies d'interaction changent complètement ?"]
    }),
    hierarchieInfo: designNode({
      id: "hierarchieInfo",
      label: "Hiérarchie de l'information",
      icon: "⬡",
      kind: "fondement",
      niveau: "Fondation",
      why: "Un écran qui donne tout avec la même intensité oblige l'utilisateur à faire le tri lui-même. Il scanne, ne sait pas où commencer, confond l'action principale avec les options secondaires, puis ralentit ou clique au hasard. La hiérarchie existe parce que l'attention humaine est sélective : une interface doit dire quoi regarder d'abord.",
      system: "La hiérarchie traduit les priorités du problème <span class=\"ref-fiche\">→ C01</span> dans la structure de l'écran. Elle guide les flux utilisateur <span class=\"ref-fiche\">→ D01</span>, réduit la charge cognitive <span class=\"ref-fiche\">→ D01</span>, et donne aux principes visuels <span class=\"ref-fiche\">→ D02</span> un rôle fonctionnel : taille, contraste et espacement servent une priorité, pas une décoration.",
      choice: "Les signaux de hiérarchie sont complémentaires. La taille attire fortement mais peut devenir bruyante ; le contraste distingue les actions critiques mais perd son effet s'il est utilisé partout ; la position guide le scan selon les conventions de lecture ; l'espacement regroupe ou sépare les idées. Le bon choix dépend de l'intention : orienter, rassurer, comparer ou faire agir.",
      senior: "Un designer expérimenté limite volontairement le nombre de niveaux perceptibles. Il utilise le test du flou : si l'interface floutée ne montre plus clairement le titre, l'action principale et les groupes de contenu, la hiérarchie dépend trop du texte. Il redoute les écrans où chaque équipe a obtenu son élément \"important\" au même niveau.",
      errors: "<p><strong>Pattern 1 — La démocratie visuelle :</strong> chaque stakeholder réclame la même importance pour son contenu, donc tout devient gros, coloré et prioritaire. La cause est politique : personne ne veut accepter que son information soit secondaire.</p><p><strong>Pattern 2 — Le CTA rival :</strong> plusieurs actions principales semblent équivalentes alors qu'elles n'ont pas la même valeur utilisateur. Ce pattern vient de la confusion entre options disponibles et décision à guider.</p><p><strong>Pattern 3 — La hiérarchie par décoration :</strong> on ajoute couleurs et tailles après coup pour rendre l'écran plus vivant, sans réexaminer l'ordre réel des décisions. Le biais esthétique masque un problème d'architecture d'information.</p>",
      invariants: "<p>Les styles passent de mode, mais la perception cherche toujours des différences de poids pour organiser l'information. <strong>Ce qui change :</strong> les typographies, palettes et conventions de layout. <strong>Ce qui ne change pas :</strong> sans signaux de priorité cohérents, l'attention humaine doit reconstruire elle-même l'ordre de lecture.</p>",
      practice: {
        titre: "Tester une hiérarchie avec le flou",
        etapes: ["Choisis un écran riche en contenu : page d'accueil, tableau de bord ou page produit.", "Floute mentalement ou visuellement la capture jusqu'à ne plus lire le texte.", "Note les trois éléments qui dominent encore et compare-les à l'objectif utilisateur principal.", "Propose un changement de taille, contraste, position ou espacement pour corriger le premier décalage."],
        output: "Capture annotée avec niveau 1, niveau 2, niveau 3 et correction proposée.",
        critere: "La hiérarchie est correcte si une personne peut prédire l'action principale sans lire tout le contenu.",
        piege: "Confondre priorité business et priorité perceptive. Une information peut être importante pour l'entreprise sans devoir dominer le premier regard."
      },
      verification: ["Pourquoi une page avec quatre boutons primaires crée-t-elle une mauvaise hiérarchie ?", "Tu floutes une page de pricing et le premier élément visible est un badge promotionnel, pas les offres. Que déduis-tu ?", "Pourquoi la hiérarchie reste-t-elle un invariant même si les styles visuels changent ?"]
    }),
    fluxUtilisateur: designNode({
      id: "fluxUtilisateur",
      label: "Flux utilisateur",
      icon: "→",
      kind: "pattern",
      niveau: "Fondation",
      why: "Un utilisateur ne vit jamais un écran seul : il arrive de quelque part, prend une décision, traverse une étape, se trompe parfois, puis attend une confirmation. Quand on conçoit écran par écran, les transitions deviennent des trous noirs : retour impossible, étape inutile, erreur non prévue. Le flux existe pour concevoir la progression complète.",
      system: "Le flux matérialise les besoins utilisateur issus de <span class=\"ref-fiche\">→ C02</span> et le périmètre décidé en <span class=\"ref-fiche\">→ C03</span>. Il organise la hiérarchie de chaque écran <span class=\"ref-fiche\">→ D01</span>, détermine les composants nécessaires <span class=\"ref-fiche\">→ D03</span>, et révèle les mesures à suivre ensuite <span class=\"ref-fiche\">→ C06</span> : abandon, erreur, reprise et réussite.",
      choice: "Un user flow montre les étapes et décisions pour raisonner vite ; un wireflow ajoute les écrans pour vérifier la continuité ; un prototype interactif teste le rythme et les incompréhensions ; une journey map inclut les émotions et points de contact hors produit. Plus l'enjeu est comportemental, plus il faut aller vers prototype ou journey map.",
      senior: "Un designer expérimenté commence rarement par le happy path seul. Il anticipe les retours arrière, les interruptions, les données manquantes, les erreurs de paiement, les sessions expirées et les reprises plus tard. Il sait qu'un flux est robuste quand l'utilisateur peut se tromper sans se sentir piégé.",
      errors: "<p><strong>Pattern 1 — Le tunnel parfait :</strong> le flux est dessiné uniquement pour l'utilisateur motivé, informé et sans erreur. La cause est l'optimisme de conception : on imagine le comportement désiré au lieu du comportement probable.</p><p><strong>Pattern 2 — L'écran orphelin :</strong> un écran est bien conçu seul mais ne dit pas clairement d'où l'on vient ni où repartir. Ce pattern apparaît quand les maquettes sont évaluées comme des planches graphiques plutôt que comme des séquences.</p><p><strong>Pattern 3 — La friction invisible :</strong> une étape semble petite pour l'équipe mais coûteuse pour l'utilisateur, comme chercher une information externe ou vérifier un email. La cause est la sous-estimation du contexte réel d'usage.</p>",
      invariants: "<p>Les écrans, assistants vocaux ou gestes changent la forme du parcours, mais pas le fait qu'une action se déroule dans le temps. <strong>Ce qui change :</strong> les supports, transitions et patterns de navigation. <strong>Ce qui ne change pas :</strong> chaque étape inutile ou ambiguë augmente la probabilité d'abandon.</p>",
      practice: {
        titre: "Cartographier un flux avec échecs",
        etapes: ["Choisis un objectif précis, comme changer un mot de passe ou réserver une livraison.", "Liste le happy path en étapes courtes, avec une seule décision par étape.", "Ajoute au moins trois chemins d'échec : information absente, erreur de saisie, abandon ou retour arrière.", "Indique pour chaque échec comment l'interface permet de comprendre, corriger et reprendre."],
        output: "Schéma de flux avec happy path, trois chemins d'échec et mécanismes de reprise.",
        critere: "Le flux est exploitable si aucune erreur ne se termine par une impasse ou un message sans prochaine action.",
        piege: "Supprimer les chemins d'échec pour rendre le schéma plus propre. Un flux propre mais irréaliste ne protège pas l'expérience réelle."
      },
      verification: ["Pourquoi faut-il dessiner le flux avant de détailler les composants ?", "Un onboarding perd 40% des utilisateurs après la demande de numéro de téléphone. Quelles hypothèses de flux dois-tu tester ?", "Quelle différence durable y a-t-il entre un happy path et un flux utilisateur complet ?"]
    }),
    chargeCognitive: designNode({
      id: "chargeCognitive",
      label: "Charge cognitive",
      icon: "🧠",
      kind: "fondement",
      niveau: "Fondation",
      why: "Un écran peut être techniquement complet et mentalement épuisant. L'utilisateur doit retenir une règle, comparer trop d'options, comprendre des libellés abstraits, puis décider sans savoir ce qui compte. Quand l'effort mental dépasse la valeur perçue, il ralentit, reporte ou abandonne.",
      system: "La charge cognitive dépend de la hiérarchie <span class=\"ref-fiche\">→ D01</span>, du nombre d'étapes du flux <span class=\"ref-fiche\">→ D01</span>, de la clarté typographique <span class=\"ref-fiche\">→ D02</span> et de la qualité des formulaires <span class=\"ref-fiche\">→ D03</span>. Elle relie directement design et apprentissage : une interface doit externaliser l'information que l'utilisateur ne devrait pas mémoriser.",
      choice: "Plusieurs leviers réduisent la charge. Le chunking regroupe les informations liées ; la divulgation progressive cache ce qui n'est utile que plus tard ; les conventions connues remplacent l'apprentissage ; la reconnaissance évite de mémoriser. La loi de Hick rappelle qu'augmenter le nombre d'options simultanées ralentit la décision, surtout quand les options se ressemblent.",
      senior: "Un designer expérimenté distingue la complexité nécessaire de la complexité ajoutée. Remplir une déclaration fiscale est intrinsèquement complexe ; demander à l'utilisateur de mémoriser un code reçu trois écrans plus tôt est une complexité extrinsèque créée par l'interface. Il ne promet pas toujours une interface courte : il cherche une interface qui porte l'effort au bon endroit.",
      errors: "<p><strong>Pattern 1 — Le dashboard cockpit :</strong> tout est affiché pour montrer la puissance du produit, mais personne ne sait quoi regarder. La cause est le biais d'exhaustivité : confondre disponibilité de l'information et utilité au moment présent.</p><p><strong>Pattern 2 — La mémoire sous-traitée :</strong> l'interface force l'utilisateur à retenir un prix, un code, une option ou une règle d'un écran à l'autre. Ce pattern vient souvent d'une architecture interne plus simple pour l'équipe mais plus coûteuse pour l'utilisateur.</p><p><strong>Pattern 3 — La simplification destructive :</strong> on retire des informations nécessaires au nom de la simplicité, puis l'utilisateur perd confiance. La cause est une confusion entre réduire la charge et cacher le contexte indispensable.</p>",
      invariants: "<p>Les interfaces peuvent devenir plus intelligentes, mais la mémoire de travail humaine reste limitée. <strong>Ce qui change :</strong> les patterns de disclosure, d'automatisation et d'aide contextuelle. <strong>Ce qui ne change pas :</strong> une interface qui force l'utilisateur à retenir, comparer et deviner au-delà de sa mémoire de travail augmente toujours erreurs et abandon.</p>",
      practice: {
        titre: "Repérer la charge cognitive d'un flux",
        etapes: ["Choisis un flux de 4 à 8 étapes.", "Pour chaque étape, liste ce que l'utilisateur doit lire, décider et mémoriser.", "Identifie les charges intrinsèques nécessaires et les charges extrinsèques créées par l'interface.", "Propose une correction pour supprimer une charge extrinsèque sans retirer une information nécessaire."],
        output: "Tableau étape par étape avec lecture, décision, mémoire, type de charge et correction proposée.",
        critere: "La correction est bonne si elle réduit un effort mental sans rendre la décision moins informée.",
        piege: "Croire que moins d'éléments signifie toujours moins de charge. Une information absente peut créer plus d'effort qu'une information bien placée."
      },
      verification: ["Explique la différence entre complexité nécessaire et complexité ajoutée par l'interface.", "Un écran de choix d'abonnement affiche 12 options presque identiques. Comment la loi de Hick t'aide-t-elle à diagnostiquer le problème ?", "Pourquoi la mémoire de travail reste-t-elle un invariant de design, même avec de nouveaux outils ?"]
    }),
    feedbackAffordance: designNode({
      id: "feedbackAffordance",
      label: "Feedback et affordances",
      icon: "↩",
      kind: "pattern",
      niveau: "Fondation",
      why: "Un utilisateur voit un élément, se demande s'il peut agir dessus, clique, puis attend de savoir si quelque chose s'est passé. Si l'interface ne suggère pas l'action possible ou ne répond pas après l'action, l'utilisateur répète, doute ou abandonne. Feedback et affordances existent pour fermer cette boucle d'incertitude.",
      system: "Les affordances rendent les composants <span class=\"ref-fiche\">→ D03</span> compréhensibles avant l'action ; le feedback rend les états d'interface <span class=\"ref-fiche\">→ D03</span> compréhensibles après l'action. Ils s'appuient sur le contraste et la couleur <span class=\"ref-fiche\">→ D02</span>, mais doivent aussi rester accessibles quand la couleur ne suffit pas.",
      choice: "Une affordance peut être visuelle (forme de bouton), textuelle (verbe clair), spatiale (zone touchable) ou conventionnelle (icône connue). Le feedback peut être immédiat pour confirmer un clic, progressif pour une attente, de résultat pour une réussite, ou correctif pour une erreur. Le choix dépend du risque : plus l'action est critique, plus le feedback doit être explicite.",
      senior: "Un designer expérimenté applique les seuils de réponse de Nielsen : sous 100 ms, l'action paraît instantanée ; entre 100 ms et 1 s, le flux reste fluide ; au-delà de 1 s, il faut signaler l'attente ; au-delà de 10 s, il faut une progression ou une alternative. Il anticipe aussi le focus clavier et le lecteur d'écran : un feedback visible mais muet n'est pas un feedback complet.",
      errors: "<p><strong>Pattern 1 — Le bouton caméléon :</strong> une action ressemble à du texte ou à une décoration, donc l'utilisateur ne la perçoit pas comme interactive. La cause est souvent une recherche de minimalisme qui efface les signaux d'action.</p><p><strong>Pattern 2 — Le clic sans écho :</strong> après une action, rien ne change immédiatement, donc l'utilisateur reclique ou pense que le système est cassé. Ce pattern vient de la sous-estimation du besoin de confirmation temporelle.</p><p><strong>Pattern 3 — L'erreur tribunal :</strong> le message dit seulement que l'utilisateur a échoué, sans expliquer quoi corriger ni comment reprendre. La cause est une vision technique de l'erreur plutôt qu'une vision de récupération utilisateur.</p>",
      invariants: "<p>Les formes d'interaction changent, mais l'humain cherche toujours à prédire ce qui est possible et à vérifier l'effet de son action. <strong>Ce qui change :</strong> les micro-interactions, les devices et les conventions de feedback. <strong>Ce qui ne change pas :</strong> agir sans retour perceptible crée toujours doute, répétition inutile et perte de confiance.</p>",
      practice: {
        titre: "Auditer les boucles action-retour",
        etapes: ["Choisis un écran avec au moins cinq éléments interactifs.", "Pour chacun, note comment l'utilisateur sait avant l'action qu'il peut interagir.", "Simule l'action et note le feedback immédiat, le feedback d'attente et le feedback de résultat ou d'erreur.", "Corrige l'élément le plus ambigu avec un signal avant action et un retour après action."],
        output: "Audit de cinq boucles action-retour avec ambiguïtés et correction prioritaire.",
        critere: "Chaque boucle est correcte si l'utilisateur peut répondre à deux questions : que puis-je faire ici, et que vient-il de se passer ?",
        piege: "Concevoir le feedback uniquement pour la réussite. Les erreurs et attentes sont les moments où l'utilisateur a le plus besoin de retour."
      },
      verification: ["Explique la différence entre affordance et feedback avec un exemple concret.", "Après un paiement, rien ne se passe pendant 3 secondes. Quel feedback dois-tu prévoir et pourquoi ?", "Pourquoi un feedback doit-il rester utile même si la couleur, l'animation ou le son ne sont pas perçus ?"]
    })
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "uxRealite", x: 10, y: 100, w: 140, h: 65 },
        { id: "hierarchieInfo", x: 200, y: 100, w: 155, h: 65 },
        { id: "fluxUtilisateur", x: 410, y: 40, w: 145, h: 65 },
        { id: "chargeCognitive", x: 410, y: 165, w: 145, h: 65 },
        { id: "feedbackAffordance", x: 620, y: 100, w: 185, h: 65 }
      ],
      edges: [
        { x1: 150, y1: 132, x2: 198, y2: 132, label: "fonde" },
        { x1: 355, y1: 112, x2: 408, y2: 72, label: "structure" },
        { x1: 355, y1: 150, x2: 408, y2: 188, label: "réduit" },
        { x1: 555, y1: 72, x2: 618, y2: 118, label: "exprime" },
        { x1: 555, y1: 192, x2: 618, y2: 150, label: "exprime" }
      ]
    }
  }
});
