import { conceptionSheet } from "./conception-common";

export const conceptionMesures = conceptionSheet({
  id: "conception-C06",
  number: 16,
  title: "Mesurer et Apprendre",
  subtitle: "Transformer les métriques en apprentissage et les apprentissages en décisions",
  badge: "Fiche C06",
  meta: ["5 nœuds"],
  readingTime: "25 min",
  description:
    "Choisir des métriques de substance, distinguer indicateurs précoces et tardifs, formuler des hypothèses testables, éviter les causalités naïves et boucler Build-Measure-Learn.",
  accent: "validation",
  nodes: {
    metriquesVanite: {
      id: "metriquesVanite",
      label: "Métriques de vanité vs substance",
      icon: "📈",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un dashboard peut monter partout et masquer un produit qui ne crée pas de valeur. Plus d'inscriptions, plus de visites, plus de clics : tout semble positif, jusqu'au moment où personne ne revient, ne paie, ou ne change d'habitude. <strong>Les métriques de vanité rassurent ; les métriques de substance changent les décisions.</strong></p>`,
        system: `<p>Ce nœud ferme la boucle commencée avec l'opportunité <span class="ref-fiche">→ C01</span> et la solution comme hypothèse <span class="ref-fiche">→ C03</span>. Une métrique de substance doit mesurer si le problème réel est mieux résolu pour le bon utilisateur <span class="ref-fiche">→ C02</span>. Elle alimente ensuite les décisions d'itération ou de pivot <span class="ref-fiche">→ C05</span>.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Une métrique est utile seulement si elle répond à une question de décision.</p>`,
          alternatives: [
            {
              name: "Métrique de vanité",
              description:
                "Nombre total d'inscrits, pages vues, téléchargements. Utile pour raconter, insuffisant pour décider.",
            },
            {
              name: "Métrique d'activation",
              description:
                "Mesure si l'utilisateur atteint le premier moment de valeur. Critique pour savoir si la promesse est comprise.",
            },
            {
              name: "Métrique de rétention",
              description:
                "Mesure si la valeur est assez forte pour faire revenir. Souvent plus révélatrice que l'acquisition.",
            },
            {
              name: "Métrique économique",
              description:
                "Conversion, ARPA, marge, CAC payback. Indispensable quand la question est la viabilité.",
            },
          ],
        },
        senior: `<p>Un product manager expérimenté demande toujours : "si cette métrique bouge, que faisons-nous différemment ?" <strong>Une métrique sans décision attachée est du décor.</strong> Il préfère une seule métrique douloureuse mais actionnable à dix chiffres flatteurs. Il accepte aussi qu'une bonne métrique rende l'équipe inconfortable : c'est souvent le signe qu'elle mesure la réalité.</p>`,
        errors: `<p><strong>Pattern 1 — Le compteur flatteur :</strong> on suit un total cumulatif qui monte mécaniquement. Il donne l'impression de progrès même si le produit perd de la valeur.</p><p><strong>Pattern 2 — La métrique sans propriétaire :</strong> tout le monde regarde le chiffre, personne ne sait quelle décision prendre quand il bouge. Le dashboard remplace la responsabilité.</p><p><strong>Pattern 3 — Le changement de thermomètre :</strong> quand une métrique devient inconfortable, on en choisit une autre plus positive. L'équipe optimise son récit, pas le produit.</p>`,
        invariants: `<p>Une métrique de substance relie un comportement observable à la valeur promise. Elle doit pouvoir confirmer, infirmer ou nuancer une hypothèse importante. <strong>Ce qui change :</strong> les outils d'analytics, les dashboards et les standards par industrie. <strong>Ce qui ne change pas :</strong> mesurer n'a de valeur que si cela améliore une décision réelle.</p>`,
        practice: {
          exercices: [
            {
              titre: "Remplacer une métrique de vanité par une métrique de substance",
              etapes: [
                "Choisis un produit ou une feature et liste cinq métriques faciles à afficher.",
                "Pour chacune, demande : quelle décision changerait si cette métrique montait ou baissait ?",
                "Identifie la métrique qui mesure le mieux la valeur réellement délivrée à l'utilisateur.",
                "Définis le seuil qui déclencherait une action : continuer, itérer, pivoter ou arrêter.",
              ],
              output:
                "Une métrique de substance choisie, avec hypothèse associée, seuil et décision déclenchée.",
              critere:
                "Si la métrique peut monter pendant que les utilisateurs ne reçoivent pas plus de valeur, elle reste une métrique de vanité.",
            },
          ],
          piege:
            "Choisir une métrique parce qu'elle est disponible dans l'outil d'analytics. La bonne métrique vient de l'hypothèse, pas du dashboard.",
        },
        verification: [
          "Pourquoi une métrique qui monte peut-elle quand même être une métrique de vanité ?",
          "Une app a beaucoup d'inscriptions mais très peu de retours en semaine 2. Quelle métrique de substance regarderais-tu et pourquoi ?",
          "Quel invariant permet de décider si une métrique mérite d'être suivie ?",
        ],
      },
    },
    leadingLagging: {
      id: "leadingLagging",
      label: "Leading vs Lagging indicators",
      icon: "⏩",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Certains chiffres arrivent trop tard pour aider. Le churn mensuel te dit que les utilisateurs sont partis ; il ne te dit pas assez tôt lesquels allaient partir. Le revenu trimestriel te dit ce qui a déjà été gagné ou perdu. <strong>Les leading indicators servent à agir avant que les lagging indicators ne confirment le résultat.</strong></p>`,
        system: `<p>Les indicateurs précoces traduisent une hypothèse de causalité issue de la solution <span class="ref-fiche">→ C03</span> : si l'utilisateur accomplit tel comportement tôt, alors la valeur durable devrait suivre. Ils complètent les métriques de substance et alimentent les décisions <span class="ref-fiche">→ C05</span>. Ils doivent être vérifiés contre les résultats tardifs, sinon ils deviennent de nouvelles métriques de vanité.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Le choix dépend du délai entre l'action utilisateur et la valeur finale observée.</p>`,
          alternatives: [
            {
              name: "Lagging indicator",
              description:
                "Revenu, churn, rétention longue, renouvellement. Fiable mais tardif : bon pour juger, mauvais pour corriger vite.",
            },
            {
              name: "Leading indicator",
              description:
                "Comportement précoce corrélé à la valeur future : activation, usage d'une feature clé, complétion d'un setup. Bon pour agir vite, à valider.",
            },
            {
              name: "Proxy metric",
              description:
                "Approximation utilisée quand la valeur finale est difficile à mesurer. Utile seulement si le lien avec la valeur est testé régulièrement.",
            },
          ],
        },
        senior: `<p>Un product manager expérimenté ne tombe pas amoureux d'un indicateur précoce. <strong>Il le traite comme une hypothèse : "nous croyons que ce comportement prédit la valeur future".</strong> Il vérifie périodiquement que le signal précoce prédit encore le résultat tardif. Sinon, l'équipe optimise un proxy devenu faux.</p>`,
        errors: `<p><strong>Pattern 1 — Le proxy sacralisé :</strong> une métrique précoce a été utile au départ, puis devient un objectif permanent même quand elle ne prédit plus la valeur.</p><p><strong>Pattern 2 — Le lagging trop tardif :</strong> l'équipe ne regarde que revenu ou churn, et découvre les problèmes quand ils sont déjà coûteux à corriger.</p><p><strong>Pattern 3 — Le leading non validé :</strong> on suppose qu'un comportement précoce prédit la rétention sans jamais comparer les cohortes. Le signal guide l'équipe sans preuve.</p>`,
        invariants: `<p>Un bon indicateur précoce est une prédiction utile, pas une vérité. Il doit être relié à un résultat final et révalidé quand le produit ou le segment change. <strong>Ce qui change :</strong> les comportements prédictifs selon les produits et marchés. <strong>Ce qui ne change pas :</strong> agir tôt exige un signal précoce dont le lien avec la valeur future est démontré.</p>`,
        practice: {
          exercices: [
            {
              titre: "Définir une paire leading / lagging",
              etapes: [
                "Choisis une valeur finale importante : rétention, paiement, renouvellement, recommandation.",
                "Identifie trois comportements précoces qui pourraient prédire cette valeur.",
                "Choisis le plus plausible et explique pourquoi il devrait être causal ou prédictif.",
                "Définis comment tu vérifieras dans les données que ce signal prédit réellement le résultat tardif.",
              ],
              output:
                "Une paire leading/lagging avec hypothèse de lien, méthode de vérification et action si le leading se dégrade.",
              critere:
                "Le leading indicator doit être observable avant le lagging et permettre une action concrète. Sinon il ne sert pas à piloter.",
            },
          ],
          piege:
            "Choisir comme leading indicator un chiffre simplement disponible tôt. Être précoce ne suffit pas : il doit prédire quelque chose qui compte.",
        },
        verification: [
          "Explique pourquoi un indicateur peut être fiable et mesurable mais inutile pour prendre une décision à temps.",
          "Ton app SaaS B2B perd 8% de ses comptes actifs ce mois contre 3% le mois précédent. Tu n'as aucun leading indicator défini. Quelles données brutes tu cherches en priorité pour identifier rétrospectivement ce qui a précédé ces départs — et pourquoi ces données pourraient devenir des leading indicators utiles à surveiller à l'avenir ?",
          "Pourquoi optimiser directement un proxy (ex : nombre de sessions quotidiennes) peut-il dégrader l'objectif réel qu'il est censé représenter ?",
        ],
      },
    },
    hypothesisDriven: {
      id: "hypothesisDriven",
      label: "Hypothesis-driven development",
      icon: "🔬",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Beaucoup d'équipes livrent des features comme si chaque demande était déjà une réponse. Après le lancement, elles regardent les chiffres et cherchent une histoire. Cette méthode apprend lentement, parce que la question n'était pas posée avant la construction. <strong>Le développement piloté par hypothèses transforme chaque feature en test explicite.</strong></p>`,
        system: `<p>Ce nœud prolonge <strong>La solution comme hypothèse</strong> <span class="ref-fiche">→ C03</span> et les hypothèses critiques <span class="ref-fiche">→ C05</span>. Il utilise les métriques de cette fiche pour trancher, puis renvoie vers l'itération ou le pivot <span class="ref-fiche">→ C05</span>. Il boucle aussi vers C01/C02 quand le test invalide le problème ou le segment, pas seulement l'exécution.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Une hypothèse produit peut être formulée à plusieurs niveaux.</p>`,
          alternatives: [
            {
              name: "Hypothèse de problème",
              description:
                "Nous croyons que ce segment souffre de cette douleur. À tester avant de parler de solution.",
            },
            {
              name: "Hypothèse de solution",
              description:
                "Nous croyons que cette approche résout mieux le problème. À tester par MVP, prototype ou expérimentation.",
            },
            {
              name: "Hypothèse de croissance",
              description:
                "Nous croyons que ce canal ou mécanisme amènera les bons utilisateurs. À tester avec coût et qualité d'acquisition.",
            },
            {
              name: "Hypothèse économique",
              description:
                "Nous croyons que les utilisateurs ou acheteurs paieront selon ce modèle. À tester par engagement, prévente ou conversion.",
            },
          ],
        },
        senior: `<p>Un product manager expérimenté formule l'hypothèse avant d'écrire le ticket. <strong>Le ticket décrit ce qu'on construit ; l'hypothèse décrit pourquoi ça mérite d'être construit et comment on saura si c'était vrai.</strong> Cette discipline change les revues de sprint : la question n'est plus seulement "qu'a-t-on livré ?" mais "qu'a-t-on appris ?"</p>`,
        errors: `<p><strong>Pattern 1 — La feature sans pari :</strong> le ticket décrit l'interface et les critères d'acceptation, mais pas l'hypothèse de valeur. La livraison ne peut pas apprendre autre chose que "ça marche techniquement".</p><p><strong>Pattern 2 — L'hypothèse infalsifiable :</strong> "les utilisateurs seront plus satisfaits" sans métrique, seuil ni délai. Aucun résultat ne peut vraiment contredire l'équipe.</p><p><strong>Pattern 3 — L'apprentissage non utilisé :</strong> l'expérience invalide l'hypothèse, mais la roadmap continue inchangée. L'équipe mesure sans apprendre.</p>`,
        invariants: `<p>Une hypothèse utile relie segment, problème, solution, résultat attendu et seuil de décision. Sans seuil, il n'y a pas de test ; sans décision, il n'y a pas d'apprentissage. <strong>Ce qui change :</strong> les formats de tickets, outils d'expérimentation et métriques. <strong>Ce qui ne change pas :</strong> construire sans hypothèse explicite rend l'apprentissage lent, ambigu et vulnérable aux biais.</p>`,
        practice: {
          exercices: [
            {
              titre: "Transformer une feature en hypothèse testable",
              etapes: [
                "Choisis une feature prévue ou récemment livrée.",
                "Formule : nous croyons que [solution] aidera [segment] à [résultat] parce que [raison].",
                "Définis la métrique, le seuil, le délai et la décision associée à succès / échec.",
                "Réécris le ticket pour inclure l'hypothèse et pas seulement la description fonctionnelle.",
              ],
              output:
                "Un hypothesis statement complet avec métrique, seuil, délai et décision post-test.",
              critere:
                "Quelqu'un doit pouvoir lire l'hypothèse et savoir quel résultat prouverait que la feature ne mérite pas d'être poursuivie.",
            },
          ],
          piege:
            "Ajouter une hypothèse vague après coup pour donner une apparence scientifique à une feature déjà décidée.",
        },
        verification: [
          "Quelle est la différence entre livrer une feature et tester une hypothèse — et pourquoi cette différence change-t-elle ce qu'on apprend après le lancement ?",
          "Tu veux valider qu'un onboarding guidé augmente le taux d'activation à J7. Écris le hypothesis statement complet : segment cible, changement attendu, métrique précise, seuil chiffré, délai de mesure, et critère d'infirmation. Qu'est-ce qui rend cette hypothèse réfutable plutôt qu'irréfutable ?",
          "Pourquoi une hypothèse sans seuil de décision explicite ne peut-elle pas produire d'apprentissage utile, même si la métrique augmente ?",
        ],
      },
    },
    correlationCausalite: {
      id: "correlationCausalite",
      label: "Corrélation vs causalité",
      icon: "⟷",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Avancé",
      sections: {
        why: `<p>Après un lancement, deux courbes bougent ensemble : les utilisateurs qui activent une feature restent plus longtemps. L'équipe conclut que la feature cause la rétention, investit dessus, et découvre plus tard que seuls les utilisateurs déjà motivés l'activaient. <strong>Confondre corrélation et causalité mène à optimiser avec confiance la mauvaise chose.</strong></p>`,
        system: `<p>Ce nœud protège toute la boucle de mesure. Il nuance les métriques de substance et les leading indicators : un signal utile peut être prédictif sans être causal. Il conditionne les décisions de pivot <span class="ref-fiche">→ C05</span>, parce qu'une décision lourde exige plus qu'une coïncidence. Il renvoie aussi à la validation sans produit <span class="ref-fiche">→ C02</span> : la qualité du signal dépend de la méthode de test.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Le niveau de preuve nécessaire dépend du coût de la décision.</p>`,
          alternatives: [
            {
              name: "Observation corrélationnelle",
              description:
                "Rapide, utile pour générer des hypothèses. Ne suffit pas pour prouver un effet.",
            },
            {
              name: "Analyse de cohortes",
              description:
                "Compare des groupes dans le temps. Plus robuste, mais sensible aux biais de sélection.",
            },
            {
              name: "Expérience contrôlée / A-B test",
              description:
                "Meilleur outil pour inférer un effet causal si le trafic et la randomisation sont suffisants.",
            },
            {
              name: "Test qualitatif causal",
              description:
                "Entretiens ou observations pour comprendre le mécanisme. Ne prouve pas l'ampleur, mais révèle pourquoi l'effet pourrait exister.",
            },
          ],
        },
        senior: `<p>Un product manager expérimenté ne demande pas seulement "est-ce que les deux métriques bougent ensemble ?" Il demande : <strong>"quelle autre explication pourrait produire le même graphique ?"</strong> Il cherche les variables confondantes : motivation initiale, segment, canal d'acquisition, saisonnalité, maturité utilisateur. Il adapte ensuite le niveau de preuve au risque de la décision.</p>`,
        errors: `<p><strong>Pattern 1 — Le post hoc magique :</strong> une métrique monte après une release, donc on attribue la hausse à la release. Le calendrier remplace la preuve.</p><p><strong>Pattern 2 — Le biais des utilisateurs motivés :</strong> ceux qui utilisent une feature avancée retiennent mieux, mais parce qu'ils étaient déjà plus engagés. La feature accompagne la valeur, elle ne la cause pas forcément.</p><p><strong>Pattern 3 — La moyenne qui ment :</strong> l'effet positif global cache un effet négatif sur un segment important. L'équipe optimise la moyenne et abîme la cible stratégique.</p>`,
        invariants: `<p>Une corrélation est un signal pour enquêter, pas une preuve pour investir lourdement. Plus la décision est coûteuse ou irréversible, plus le niveau de preuve causale doit être élevé. <strong>Ce qui change :</strong> les méthodes statistiques, les outils d'expérimentation et le volume de données. <strong>Ce qui ne change pas :</strong> deux phénomènes qui bougent ensemble peuvent avoir une cause commune, une causalité inverse ou aucun lien causal direct.</p>`,
        practice: {
          exercices: [
            {
              titre: "Tester une interprétation causale",
              etapes: [
                "Choisis une corrélation produit plausible : feature utilisée, rétention, conversion, satisfaction.",
                "Écris trois explications alternatives qui pourraient produire cette corrélation.",
                "Définis le test le plus léger pour distinguer l'explication causale des alternatives.",
                "Décide quel niveau de preuve est nécessaire avant d'investir davantage.",
              ],
              output:
                "Une corrélation analysée avec hypothèse causale, explications alternatives, test proposé et niveau de preuve requis.",
              critere:
                "Tu dois avoir au moins une explication alternative crédible. Si tu n'en trouves aucune, tu es probablement trop attaché à ton interprétation.",
            },
          ],
          piege:
            "Croire qu'un graphique propre produit une conclusion propre. La causalité vient du design de preuve, pas de la beauté du dashboard.",
        },
        verification: [
          "Pourquoi les utilisateurs qui activent une feature peuvent-ils mieux retenir sans que la feature cause la rétention ?",
          "Après une refonte, la conversion augmente de 8 %. Quelles explications alternatives dois-tu tester avant de conclure ?",
          "Quel invariant relie coût de décision et niveau de preuve causale nécessaire ?",
        ],
      },
    },
    buildMeasureLearn: {
      id: "buildMeasureLearn",
      label: "Build-Measure-Learn",
      icon: "🔁",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Beaucoup d'équipes livrent en continu sans apprendre en continu. Elles construisent, mesurent vaguement, puis construisent encore. Le cycle tourne, mais la connaissance n'augmente pas. <strong>Build-Measure-Learn n'est pas une cadence de livraison ; c'est une boucle de réduction d'incertitude.</strong></p>`,
        system: `<p>Cette boucle clôt la Partie Conception. Elle repart du problème réel <span class="ref-fiche">→ C01</span>, teste les hypothèses utilisateur <span class="ref-fiche">→ C02</span>, construit juste assez de solution <span class="ref-fiche">→ C03</span>, évalue viabilité et risques <span class="ref-fiche">→ C04</span>, puis déclenche décision, itération ou pivot <span class="ref-fiche">→ C05</span>. Sans cette boucle, les fiches précédentes restent des analyses statiques.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Le cycle peut commencer à trois endroits selon ce que l'équipe ignore le plus.</p>`,
          alternatives: [
            {
              name: "Learn-Build-Measure",
              description:
                "Commencer par apprendre quand l'incertitude problème ou segment est forte. Entretiens, observation, tests sans produit.",
            },
            {
              name: "Build-Measure-Learn",
              description:
                "Construire juste assez quand l'hypothèse est formulée et qu'un comportement réel doit être observé.",
            },
            {
              name: "Measure-Learn-Build",
              description:
                "Commencer par mesurer quand un produit existe déjà et que les données peuvent révéler le prochain apprentissage.",
            },
          ],
        },
        senior: `<p>Un product manager expérimenté cherche à raccourcir la boucle sans appauvrir le signal. <strong>La vitesse n'est pas de livrer plus vite ; c'est d'apprendre plus tôt avec moins de gaspillage.</strong> Il sait aussi qu'une boucle doit produire une décision. Si l'équipe ne change rien après avoir appris, elle n'a pas vraiment appris : elle a seulement collecté de l'information.</p>`,
        errors: `<p><strong>Pattern 1 — Build-Build-Build :</strong> l'équipe appelle ça itération, mais chaque cycle ajoute des features sans question préalable ni décision postérieure.</p><p><strong>Pattern 2 — Measure sans Learn :</strong> les métriques sont regardées en réunion, commentées, puis oubliées. Aucun choix de roadmap ne change.</p><p><strong>Pattern 3 — Learn sans mémoire :</strong> les apprentissages restent dans les têtes ou les Slack. Trois mois plus tard, l'équipe reteste les mêmes hypothèses.</p>`,
        invariants: `<p>Une boucle d'apprentissage vaut par la qualité de la question, la fidélité du signal et la décision qui suit. Construire, mesurer et apprendre sont trois fonctions ; si l'une manque, la boucle est cassée. <strong>Ce qui change :</strong> les outils de build, analytics, expérimentation et documentation. <strong>Ce qui ne change pas :</strong> une équipe progresse durablement quand chaque cycle réduit une incertitude importante et modifie une décision.</p>`,
        practice: {
          exercices: [
            {
              titre: "Planifier une boucle d'apprentissage complète",
              etapes: [
                "Choisis une incertitude importante issue d'une idée, d'une feature ou d'un risque.",
                "Formule l'hypothèse et le plus petit build nécessaire pour obtenir un signal réel.",
                "Définis la métrique, le seuil, le délai et la décision pour chaque résultat possible.",
                "Prévois où l'apprentissage sera documenté et quelle décision de roadmap il peut changer.",
              ],
              output:
                "Une boucle Build-Measure-Learn complète : hypothèse, build minimal, mesure, seuils, décisions et trace d'apprentissage.",
              critere:
                "La boucle est valide si elle peut changer une décision. Si le résultat ne changerait rien, l'expérience ne mérite pas d'être menée.",
            },
          ],
          piege:
            "Confondre boucle d'apprentissage et sprint de livraison. Une livraison sans hypothèse ni décision associée n'est pas une boucle BML.",
        },
        verification: [
          "Pourquoi Build-Measure-Learn n'est-il pas simplement une façon agile de livrer plus souvent ?",
          "Ton équipe a livré trois itérations et les métriques sont stables. Comment sais-tu si elle apprend vraiment ?",
          "Quel invariant rend une boucle d'apprentissage plus importante qu'une simple cadence de livraison ?",
        ],
      },
    },
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "metriquesVanite", x: 10, y: 100, w: 175, h: 65 },
        { id: "leadingLagging", x: 235, y: 100, w: 155, h: 65 },
        { id: "hypothesisDriven", x: 445, y: 40, w: 175, h: 65 },
        { id: "correlationCausalite", x: 445, y: 165, w: 175, h: 65 },
        { id: "buildMeasureLearn", x: 670, y: 100, w: 140, h: 65 },
      ],
      edges: [
        { x1: 185, y1: 132, x2: 233, y2: 132, label: "affine" },
        { x1: 390, y1: 115, x2: 443, y2: 72, label: "structure" },
        { x1: 390, y1: 148, x2: 443, y2: 188, label: "nuance" },
        { x1: 620, y1: 73, x2: 668, y2: 118, label: "alimente" },
        { x1: 620, y1: 198, x2: 668, y2: 152, label: "corrige" },
      ],
    },
  },
});
