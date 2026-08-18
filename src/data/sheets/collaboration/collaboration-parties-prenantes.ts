import { coNode, coSheet } from "./collaboration-common";

export const collaborationPartiesPrenantes = coSheet({
  id: "collaboration-parties-prenantes",
  number: 5,
  title: "Parties Prenantes dans l'Environnement du Développeur Web",
  subtitle:
    "Cartographier, comprendre et naviguer les relations avec PM, designer, client et hiérarchie technique.",
  badge: "Fiche Co05",
  meta: ["7 nœuds"],
  readingTime: "45 min",
  description:
    "Les compétences relationnelles qui permettent à un développeur web de travailler efficacement avec chaque interlocuteur clé de son écosystème.",
  accent: "humain",
  nodes: {
    stakeholderMapping: coNode({
      id: "stakeholderMapping",
      label: "Cartographier les parties prenantes",
      icon: "🗺",
      kind: "organisation",
      niveau: "Fondation",
      why: "Un développeur qui ne sait pas qui peut bloquer, retarder ou redéfinir son travail avance à l'aveugle. Le coût réel n'est pas l'ignorance elle-même : c'est le retard de six semaines découvert en démo parce qu'une équipe Sécurité n'avait jamais été consultée, ou la refonte complète d'une UI parce que le client métier n'avait pas validé les maquettes.",
      system:
        'La cartographie des parties prenantes est la fondation sur laquelle reposent toutes les autres relations décrites dans cette fiche. Sans elle, la relation avec le PM <span class="ref-fiche">→ pmRelation</span> manque de contexte, et la relation avec la hiérarchie technique <span class="ref-fiche">→ hierarchieTech</span> reste floue sur les périmètres d\'escalade. Elle s\'articule aussi avec l\'alignement stakeholder travaillé en Co02 pour savoir qui consulter avant une décision.',
      choice:
        "La cartographie peut être formelle (matrice pouvoir/intérêt) ou informelle (liste commentée dans un Notion). L'outil importe peu; ce qui importe c'est de distinguer qui décide, qui bloque, qui est informé et qui est affecté sans avoir de voix officielle. Sur un projet court, une liste de 5 noms suffit. Sur un projet de 6 mois, la matrice révèle les oubliés dangereux.",
      senior:
        "Il cartographie avant de coder, pas après avoir livré. Il cherche surtout les parties prenantes silencieuses : l'équipe Conformité qui valide les données utilisateur, l'admin système qui doit déployer la feature, le client final qui n'est jamais en réunion mais dont les retours arrivent deux semaines après la mise en production. Il sait que la question 'qui d'autre est affecté ?' est plus puissante que n'importe quelle matrice, parce que les gens oublient rarement leurs propres douleurs quand on leur pose la question directement. Il refait un tour rapide de cartographie à chaque changement majeur de scope, pas seulement au lancement du projet.",
      errors: `<p><strong>Pattern 1 — Stakeholders visibles seulement :</strong> on cartographie les personnes présentes dans les réunions et on oublie les équipes affectées en dehors de l'équipe technique. Conséquence: une décision correcte sur le papier échoue à l'exécution parce qu'une contrainte légale, infra ou métier n'a pas été anticipée.</p><p><strong>Pattern 2 — Cartographie statique :</strong> on fait la liste au début du projet et on ne la met jamais à jour. Conséquence: un pivot de scope ou un changement d'organisation rend la cartographie fausse au moment où elle est la plus utile.</p><p><strong>Pattern 3 — Confondre informé et décideur :</strong> on traite tous les stakeholders avec le même niveau d'attention, ce qui épuise le temps de communication sans apporter la valeur différenciée attendue. Conséquence: les vrais décideurs reçoivent le même email que les personnes simplement à tenir au courant et perdent le signal dans le bruit.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> la taille de l'organisation, les outils de cartographie et la fréquence des revues. <strong>Ce qui ne change pas :</strong> sur tout projet technique qui touche plusieurs équipes, une partie prenante non identifiée devient tôt ou tard un risque concret.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Cartographier les parties prenantes d'une feature en cours",
            etapes: [
              "Prends une feature que tu développes actuellement ou que tu as développée récemment.",
              "Liste toutes les personnes ou équipes qui peuvent être affectées par cette feature, au-delà de ton équipe directe.",
              "Pour chaque personne, note son rôle : décideur, bloqueur potentiel, informé, affecté sans voix officielle.",
              "Identifie les lacunes : qui aurait dû être consulté et ne l'a pas été ?",
              "Pour les 2 stakeholders les plus importants, définis le bon canal et la bonne fréquence de communication.",
            ],
            output:
              "Liste annotée de 5 à 10 stakeholders avec rôle, canal et fréquence pour les deux principaux.",
            critere:
              "Si un membre de ton équipe peut lire ta cartographie et identifier immédiatement qui appeler en cas de blocage, le travail est réussi.",
          },
        ],
        piege:
          "Ne cartographier que les personnes avec qui on parle déjà. Les oubliés dangereux sont précisément ceux qu'on n'a pas encore rencontrés.",
      },
      verification: [
        "Quelle est la différence entre un stakeholder décideur, bloqueur et simplement informé dans le contexte d'une feature web ?",
        "Tu livres une feature de téléchargement de fichiers. Trois semaines après le déploiement, l'équipe Sécurité découvre qu'elle viole la politique interne sur les formats autorisés. Qui aurait dû être cartographié avant le développement, et à quelle étape ?",
        "Pourquoi la cartographie des stakeholders devient-elle obsolète et à quel moment faut-il la refaire ?",
      ],
    }),

    pmRelation: coNode({
      id: "pmRelation",
      label: "Relation avec le Product Manager",
      icon: "🔀",
      kind: "humain",
      niveau: "Fondation",
      why: "Le PM et le développeur ont des temporalités différentes et des définitions implicites du mot 'fini' qui ne se recoupent jamais naturellement. Sans travail explicite sur cette relation, le PM découvre en démo que la feature livrée ne correspond pas à ce qu'il avait imaginé, et le développeur découvre que la spec qu'il a suivie scrupuleusement ne répondait pas au vrai besoin.",
      system:
        'La relation avec le PM s\'appuie sur la traduction technique vue en <span class="ref-fiche">→ Co02</span> et conditionne directement la qualité de la cartographie des parties prenantes <span class="ref-fiche">→ stakeholderMapping</span>. Un PM bien informé sur les contraintes techniques arbitre mieux les priorités et réduit les retours de correction coûteux en fin de sprint.',
      choice:
        "Deux modèles coexistent selon la maturité de l'organisation : le PM comme proxy client qui traduit les besoins en specs, ou le PM comme partenaire de découverte qui explore le problème avec le développeur avant d'écrire la spec. Le second produit de meilleures décisions mais demande plus de disponibilité des deux côtés. En startup early-stage, les deux rôles se confondent souvent dans la même personne.",
      senior:
        "Il distingue deux registres de conversation avec le PM : la clarification de spec (avant de coder) et l'arbitrage de contrainte (pendant le développement). Pour la clarification, il pose la question de l'intention derrière la fonctionnalité, pas seulement du comportement attendu : comprendre pourquoi l'utilisateur a besoin de X change souvent l'implémentation. Pour l'arbitrage, il présente toujours les options avec leur coût et leur trade-off, jamais un choix binaire oui/non. Il sait aussi que la relation PM-dev se construit sur la fiabilité : un développeur qui annonce tôt les problèmes, respecte ses estimations et documente les décisions est un développeur à qui le PM donne de la latitude technique.",
      errors: `<p><strong>Pattern 1 — Spec suivie à la lettre sans questionner l'intention :</strong> le développeur implémente exactement ce qui est écrit parce que c'est plus simple que de négocier. Conséquence: la feature est conforme à la spec mais ne résout pas le problème utilisateur, ce qui génère une deuxième itération coûteuse.</p><p><strong>Pattern 2 — Estimation sans hypothèses :</strong> on donne un chiffre en jours sans dire ce qu'il suppose. Conséquence: quand l'hypothèse s'avère fausse, le retard est vécu comme un manque de fiabilité plutôt que comme une incertitude de découverte normale.</p><p><strong>Pattern 3 — Décisions techniques cachées :</strong> on fait des choix d'implémentation avec des impacts produit sans les remonter au PM parce qu'on considère que c'est du détail technique. Conséquence: le PM apprend les contraintes qu'il aurait pu intégrer dans ses arbitrages seulement quand elles bloquent une prochaine feature.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les outils de gestion de produit, les méthodologies agile ou non, la taille de l'équipe. <strong>Ce qui ne change pas :</strong> un développeur et un PM qui synchronisent leur compréhension avant de coder produisent moins de retours coûteux qu'une équipe qui livre puis corrige.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Clarifier une user story avant de l'estimer",
            etapes: [
              "Prends une user story ou une demande feature actuelle ou récente.",
              "Écris 3 questions sur l'intention derrière la demande, pas sur l'implémentation.",
              "Pour chaque question, note comment la réponse pourrait changer ton approche technique.",
              "Écris une estimation avec ses hypothèses explicites : 'X jours si Y est vrai, X+3 jours si Z'.",
            ],
            output:
              "3 questions d'intention, leur impact sur l'implémentation et une estimation conditionnelle.",
            critere:
              "Le PM doit pouvoir lire tes questions et comprendre immédiatement quel risque tu essaies de lever.",
          },
        ],
        piege:
          "Poser des questions techniques au PM. Les questions utiles portent sur le comportement attendu de l'utilisateur, pas sur les détails d'implémentation.",
      },
      verification: [
        "Quelle est la différence entre clarifier une spec et renégocier un périmètre avec un PM ?",
        "Ton PM te demande d'ajouter un système de notifications en temps réel à une app. L'estimation honnête est 3 jours avec WebSockets, mais la spec ne précise pas si le temps réel doit être instantané ou accepte un délai de 30 secondes. Comment formules-tu ta clarification et ton estimation au PM ?",
        "Pourquoi remonter au PM les décisions techniques avec impacts produit plutôt que les gérer seul ?",
      ],
    }),

    designerRelation: coNode({
      id: "designerRelation",
      label: "Relation avec le designer",
      icon: "🎨",
      kind: "humain",
      niveau: "Fondation",
      why: "Le handoff designer-développeur est l'un des moments les plus coûteux d'un projet web si mal géré. Un pixel perfect mal compris, une animation non discutée, ou un composant Figma qui suppose une structure DOM impossible génèrent des aller-retours qui s'accumulent et détériorent la relation. Le coût réel n'est pas le temps perdu : c'est le ressentiment mutuel qui s'installe quand chacun croit que l'autre ne comprend pas les contraintes de son métier.",
      system:
        "La relation avec le designer conditionne la qualité du livrable visible par le client ou métier <span class=\"ref-fiche\">→ clientMetier</span>. Elle bénéficie directement du vocabulaire de traduction technique développé en Co02 pour nommer les contraintes d'implémentation sans jargon inaccessible. Un handoff réussi est aussi une forme de documentation qui réduit l'ambiguïté pendant le développement.",
      choice:
        "Deux approches du handoff : spec détaillée dans Figma (annotations, tokens, états) qui suppose que le développeur lit tout avant de coder ; ou session de passation en direct où le développeur pose ses questions pendant que le designer explique les intentions. La deuxième est plus coûteuse en temps immédiat mais réduit les allers-retours. En équipe distribuée, un Figma bien annoté avec les états (hover, focus, error, empty, loading) remplace avantageusement la session live.",
      senior:
        "Il regarde d'abord les états d'erreur, les états vides et les breakpoints extrêmes dans les maquettes, parce que ce sont les cas que les designers oublient souvent et les développeurs aussi. Il exprime les contraintes d'implémentation en termes d'impact utilisateur, pas de complexité technique : 'cette animation coûte 3 jours pour un gain perçu de 2 secondes, voici une alternative à 2 heures qui donne 80% de l'effet'. Il construit le vocabulaire commun progressivement : expliquer ce qu'est le reflow une fois, en montrant un exemple visuel, vaut mieux que de l'invoquer comme excuse à chaque discussion.",
      errors: `<p><strong>Pattern 1 — Pixel perfect sans discussion :</strong> le développeur implémente exactement la maquette sans signaler les contraintes d'implémentation coûteuses, puis annonce le retard en fin de sprint. Conséquence: le designer se sent trahi et le délai est perçu comme du manque de compétence plutôt que comme un problème de priorisation.</p><p><strong>Pattern 2 — Maquettes sans états :</strong> le développeur commence à coder en supposant les états manquants sans demander. Conséquence: les états d'erreur, de loading et de vide sont implémentés de façon incohérente et le QA génère des dizaines de retours en fin de projet.</p><p><strong>Pattern 3 — Jargon technique comme veto :</strong> le développeur utilise des termes comme reflow, repaint ou bundle size pour rejeter des demandes sans expliquer l'impact réel. Conséquence: le designer n'a pas les éléments pour arbitrer et soit abandonne ses exigences, soit les défend sans critère, les deux étant des échecs de collaboration.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les outils de design (Figma, Sketch, Zeplin), la maturité du design system, la taille de l'équipe. <strong>Ce qui ne change pas :</strong> un développeur qui exprime ses contraintes en termes d'impact utilisateur est entendu mieux qu'un développeur qui les exprime en termes de complexité technique.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Auditer un handoff design existant",
            etapes: [
              "Prends une maquette Figma d'une feature récente ou en cours.",
              "Liste tous les états qui ne sont pas représentés : loading, error, empty, disabled.",
              "Identifie 2 éléments dont l'implémentation exacte coûterait plus de 4 heures et où une alternative existe.",
              "Pour chaque alternative, formule la proposition en termes d'impact utilisateur visible, pas de complexité technique.",
            ],
            output:
              "Liste des états manquants, 2 propositions d'alternative formulées en impact utilisateur.",
            critere:
              "Un designer sans background technique doit comprendre ta proposition sans que tu aies à expliquer le code.",
          },
        ],
        piege:
          "Attendre la fin de l'implémentation pour signaler les contraintes. Plus la contrainte est signalée tôt, plus le designer a d'options pour adapter la maquette.",
      },
      verification: [
        "Comment formuler une contrainte d'implémentation à un designer sans utiliser de jargon technique ?",
        "Un designer te livre une maquette avec une animation complexe sur le scroll. Tu estimes l'animation à 2 jours; une version simplifiée donnerait 70% de l'effet en 2 heures. Comment engages-tu la conversation avec le designer pour qu'il puisse arbitrer ?",
        "Pourquoi les états manquants dans une maquette coûtent-ils plus cher en fin de projet qu'en phase de handoff ?",
      ],
    }),

    clientMetier: coNode({
      id: "clientMetier",
      label: "Relation avec le client ou le métier",
      icon: "🏢",
      kind: "communication",
      niveau: "Intermédiaire",
      why: "Le client ou l'équipe métier parle le langage du problème à résoudre ; le développeur parle le langage de la solution technique. Quand ces deux langages ne se traduisent pas, le client valide une demo sans comprendre ce qu'il valide, et le développeur livre conformément à ce qui a été validé sans que le vrai besoin soit satisfait. Le coût de ce malentendu se voit en recette : des listes de retours de 40 points qui auraient tous pu être évités avec deux conversations en amont.",
      system:
        'La relation client/métier synthétise la traduction technique de Co02 <span class="ref-fiche">→ Co02</span> et dépend d\'une cartographie des parties prenantes à jour <span class="ref-fiche">→ stakeholderMapping</span>. Elle conditionne aussi la qualité des livrables visibles par la hiérarchie technique <span class="ref-fiche">→ hierarchieTech</span> : un développeur qui comprend les besoins métier produit une justification technique plus convaincante en escalade.',
      choice:
        "Deux modes de relation selon le contexte : relation directe où le développeur est en contact avec le client (fréquent en agence ou en startup) ou relation indirecte médiatisée par le PM ou un chef de projet. En relation directe, le développeur gagne en contexte mais risque de prendre des engagements qu'il n'a pas l'autorité de tenir. En relation indirecte, le filtre du PM réduit l'ambiguïté mais peut créer une perte de signal sur les vrais besoins.",
      senior:
        "Il sépare toujours le besoin exprimé de la solution suggérée dans ce que dit le client. 'Je veux un bouton export Excel' peut cacher 'j'ai besoin de partager les données avec mon équipe comptable qui n'a pas accès à l'outil'. Comprendre le vrai besoin ouvre des solutions moins coûteuses et plus maintenables. Il ne valide pas en demo sans s'assurer que la personne qui valide peut effectivement prendre la décision de valider — une validation par quelqu'un qui n'a pas autorité n'est pas une validation. Il documente toutes les décisions prises en réunion client dans un compte-rendu envoyé dans les 24h, pas pour se protéger, mais pour donner au client la chance de corriger une incompréhension avant qu'elle ne soit codée.",
      errors: `<p><strong>Pattern 1 — Solution sans besoin :</strong> le développeur implémente ce que le client demande sans explorer ce que le client cherche à accomplir. Conséquence: la feature livrée est correcte mais inutile, et le client ne sait pas comment formuler qu'elle ne lui convient pas.</p><p><strong>Pattern 2 — Jargon en demo :</strong> le développeur présente en utilisant des termes techniques devant un public métier qui acquiesce par politesse. Conséquence: la validation est fausse et les retours arrivent en production quand le coût de correction est maximum.</p><p><strong>Pattern 3 — Engagement sans autorité :</strong> en contact direct avec le client, le développeur promet une feature ou un délai sans avoir vérifié que l'équipe peut tenir l'engagement. Conséquence: le PM ou le lead découvre l'engagement existant et doit soit le tenir à un coût élevé soit le décommander au détriment de la relation client.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> le secteur, la taille du client, la proximité de la relation et le modèle contractuel. <strong>Ce qui ne change pas :</strong> un développeur qui comprend le problème métier avant de coder prend de meilleures décisions techniques que celui qui suit une spec sans contexte.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Distinguer besoin et solution dans une demande client",
            etapes: [
              "Prends une demande client ou métier récente exprimée comme une solution ('je veux un tableau', 'j'ai besoin d'un email automatique').",
              "Écris la question qui permettrait de remonter au vrai besoin derrière la solution demandée.",
              "Propose deux alternatives à la solution demandée qui répondent au même besoin avec des coûts ou trade-offs différents.",
              "Formule la présentation de ces alternatives sans jargon technique.",
            ],
            output:
              "Besoin réel identifié, 2 alternatives formulées en langage métier avec leurs trade-offs.",
            critere:
              "Un responsable métier sans background technique doit pouvoir choisir entre tes alternatives en comprenant les implications.",
          },
        ],
        piege:
          "Trop interroger un client sur ses besoins profonds quand il a une contrainte de temps ou de budget : parfois la bonne solution c'est livrer ce qui est demandé et documenter ce qu'on a vu.",
      },
      verification: [
        "Comment distinguer le besoin exprimé de la solution suggérée dans une demande client, et pourquoi cette distinction change l'implémentation ?",
        "En démo, un responsable métier valide une feature de reporting en disant 'c'est exactement ce qu'on voulait'. Deux semaines plus tard, son équipe envoie 15 retours. Que s'est-il passé et comment l'aurais-tu évité ?",
        "Pourquoi documenter les décisions prises en réunion client dans les 24h protège les deux parties et pas seulement le développeur ?",
      ],
    }),

    hierarchieTech: coNode({
      id: "hierarchieTech",
      label: "Relation avec la hiérarchie technique",
      icon: "📡",
      kind: "humain",
      niveau: "Intermédiaire",
      why: "Un développeur qui ne sait pas quand escalader, quand rendre visible et comment cadrer ses demandes consomme de l'énergie à résoudre seul des problèmes que son lead ou CTO auraient débloqués en dix minutes. À l'inverse, un développeur qui escalade trop ou mal crée du bruit et perd la confiance de sa hiérarchie. Le coût réel c'est l'autonomie perdue : quand la confiance est faible, le lead vérifie tout, ce qui ralentit tout.",
      system:
        'La relation avec la hiérarchie technique est l\'aboutissement de toutes les autres relations de cette fiche. Une cartographie à jour <span class="ref-fiche">→ stakeholderMapping</span> donne au lead le contexte nécessaire pour arbitrer rapidement. La capacité à rendre visible le travail et ses contraintes s\'appuie sur les compétences de communication de Co02 <span class="ref-fiche">→ Co02</span>.',
      choice:
        "Deux registres distincts avec la hiérarchie : le reporting (rendre visible l'avancement et les risques régulièrement, même quand tout va bien) et l'escalade (demander une décision ou un déblocage sur un problème spécifique). Le reporting régulier réduit les surprises et construit la confiance qui donne de l'autonomie. L'escalade bien cadrée accélère la résolution; mal cadrée, elle transfère simplement l'anxiété vers le haut.",
      senior:
        "Il sait que la visibilité est une compétence, pas de la servitude. Un lead ne peut pas protéger ce qu'il ne voit pas : un blocage silencieux depuis trois jours arrive toujours au pire moment. Il cadre chaque escalade en trois éléments : le contexte factuel, les options qu'il a déjà considérées, et la décision qu'il demande. Il ne descend jamais avec uniquement un problème. Il gère aussi l'asymétrie d'information : son lead connaît des contraintes organisationnelles que lui ne connaît pas; quand une décision lui semble irrationnelle, il pose la question avant de la résister.",
      errors: `<p><strong>Pattern 1 — Blocage silencieux :</strong> le développeur reste bloqué plusieurs jours sans signaler parce qu'il croit que demander de l'aide révèle une incompétence. Conséquence: le blocage est découvert en standup ou en démo, à un moment où les options d'intervention sont réduites et le coût organisationnel maximal.</p><p><strong>Pattern 2 — Escalade sans contexte :</strong> on signale un problème sans avoir investigué les options ni précisé la décision attendue. Conséquence: le lead doit poser les questions que le développeur aurait dû poser lui-même, ce qui ralentit la résolution et érode la confiance.</p><p><strong>Pattern 3 — Autonomie sans visibilité :</strong> le développeur travaille bien mais ne rend pas visible son travail, estimant que les résultats parleront d'eux-mêmes. Conséquence: le lead ne peut pas arbitrer les priorités correctement, et le développeur est perçu comme imprévisible même quand son travail est de qualité.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> le style de management, la culture de l'organisation (startup horizontale vs grande entreprise hiérarchique), les outils de suivi. <strong>Ce qui ne change pas :</strong> rendre visible le travail et ses contraintes avant qu'elles ne deviennent des crises est toujours perçu comme du professionnalisme, jamais comme une faiblesse.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Cadrer une escalade ou un point de visibilité",
            etapes: [
              "Identifie un blocage actuel ou un risque sur une tâche en cours.",
              "Écris le contexte factuel en 2 phrases : ce que tu fais, depuis combien de temps tu es bloqué, ce que tu as déjà essayé.",
              "Liste 2 options de résolution que tu as envisagées avec leurs implications respectives.",
              "Formule la décision ou le déblocage précis que tu demandes à ton lead.",
            ],
            output:
              "Message d'escalade structuré : contexte, options considérées, décision demandée.",
            critere:
              "Le lead doit pouvoir répondre à ton message sans poser de question de clarification sur le contexte.",
          },
        ],
        piege:
          "Confondre visibilité et reporting bureaucratique. La visibilité est proactive et ciblée sur ce qui peut changer une décision; le reporting pour le reporting est du bruit.",
      },
      verification: [
        "Quelle est la différence entre rendre visible un risque et escalader un problème, et quand utiliser l'un ou l'autre ?",
        "Tu es bloqué depuis 2 jours sur un bug de performance en production. Tu as 3 pistes, aucune concluante. Ton lead n'est pas au courant. Comment formules-tu ton message d'escalade et qu'est-ce que tu ne mets pas dedans ?",
        "Pourquoi un développeur autonome qui ne rend pas visible son travail est perçu comme moins fiable qu'un développeur moins expérimenté qui communique régulièrement ?",
      ],
    }),

    equipeDevs: coNode({
      id: "equipeDevs",
      label: "Relation avec l'équipe de développement",
      icon: "👥",
      kind: "humain",
      niveau: "Fondation",
      why: "Les frictions les plus coûteuses dans une équipe technique ne viennent pas des conflits avec les clients ou la hiérarchie — elles viennent des relations latérales entre développeurs. Un dev qui ne sait pas demander de l'aide sans paraître incompétent, donner du feedback sans blesser, ou exprimer un désaccord technique sans créer de tension isole progressivement sa compétence au lieu de la multiplier. Le coût réel : chaque savoir non partagé dans une équipe est une dette pédagogique qui doit être remboursée quand un problème similaire resurface.",
      system:
        'La relation avec l\'équipe de développement est le socle de tout le reste. <span class="ref-fiche">→ Co01</span> : la confiance psychologique dans l\'équipe est la condition préalable à une communication honnête entre pairs — sans elle, les vrais problèmes et désaccords restent dans les têtes plutôt que sur la table. <span class="ref-fiche">→ Co07</span> : les méthodes concrètes de communication (code review, async, présentations techniques) sont les outils qui opérationnalisent cette relation au quotidien.',
      choice:
        "Deux modes de relation entre pairs : collaboration sur le code (pair programming, code review, partage de contexte technique) et collaboration sur les décisions (désaccords techniques, arbitrages d'implémentation, partage de connaissances). Pour le code : la revue bienveillante et la demande d'aide directe construisent la confiance plus vite que la compétence seule. Pour les décisions : le désaccord technique exprimé comme une question ('as-tu pensé à X ?') plutôt qu'une affirmation ('tu as tort') préserve la relation tout en portant le fond.",
      senior:
        "Il sait que sa valeur dans une équipe est proportionnelle à ce qu'il rend possible pour les autres, pas seulement à ce qu'il produit lui-même. Un senior qui garde sa connaissance pour lui accélère seul et ralentit l'équipe. Un développeur junior qui apprend à bien formuler ses demandes d'aide — contexte, ce qu'il a essayé, ce dont il a besoin — reçoit de meilleures réponses en moins de temps. Cette compétence de la demande bien formulée est plus importante pour la progression individuelle que n'importe quelle connaissance technique.",
      errors: `<p><strong>Pattern 1 — Compétition silencieuse :</strong> deux développeurs travaillent en parallèle sur des problèmes similaires sans se parler, par manque d'habitude de partager les difficultés. Conséquence: le même problème est résolu deux fois, les deux solutions coexistent en produisant une incohérence, et l'équipe perd du temps à unifier ce qui aurait pu être partagé dès le départ.</p><p><strong>Pattern 2 — Désaccord technique non exprimé :</strong> un développeur pense que l'approche de son collègue est sous-optimale mais ne le dit pas pour éviter le conflit. Il valide silencieusement en code review et commente en coulisses. Conséquence: la mauvaise approche est mergée, la dette s'installe, et le désaccord ressort lors d'un incident trois mois plus tard avec plus d'émotion et moins d'options.</p><p><strong>Pattern 3 — Aide impossible à demander :</strong> la culture implicite de l'équipe valorise l'autonomie au point que demander de l'aide est perçu comme une faiblesse. Conséquence: les blocages s'accumulent silencieusement, les estimations dérivent sans explication, et les nouveaux membres mettent deux fois plus de temps à monter en compétence.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> la taille de l'équipe, le niveau d'expérience moyen, la culture d'entreprise (remote-first, co-localisée, hybride) et les outils de collaboration (Slack, Linear, GitHub). <strong>Ce qui ne change pas :</strong> une équipe où chaque membre peut exprimer une difficulté, un désaccord ou une ignorance sans crainte de jugement produit du code meilleur et résout les problèmes plus vite qu'une équipe de compétences individuelles supérieures mais en compétition implicite.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Auditer la qualité des échanges entre pairs dans l'équipe",
            etapes: [
              "Pense aux 5 derniers échanges techniques significatifs avec un collègue (demandes d'aide, désaccords, code reviews, partages de contexte).",
              "Pour chacun, note : est-ce que tu as exprimé ta vraie opinion ou tu t'es censuré ? L'échange a-t-il produit une meilleure décision ou juste évité un conflit ?",
              "Identifie le sujet technique sur lequel tu as le plus de réticence à exprimer un désaccord avec un pair — et formule ce désaccord par écrit comme une question, pas une affirmation.",
              "Pour la prochaine demande d'aide que tu envoies, applique la structure : ce que tu essaies d'obtenir, ce que tu as déjà essayé, ce dont tu as besoin précisément.",
            ],
            output:
              "Journal de 5 échanges analysés + un désaccord formulé comme question + une demande d'aide structurée envoyée.",
            critere:
              "Le désaccord formulé comme question doit être suffisamment précis pour que ton collègue comprenne où tu vois le problème, sans que tu aies à dire 'tu as tort'.",
          },
        ],
        piege:
          "Croire que les tensions entre développeurs viennent de conflits de personnalité. La majorité vient de désaccords techniques non exprimés qui s'accumulent — la solution est plus souvent une conversation franche sur le code qu'un travail sur la relation.",
      },
      verification: [
        "Pourquoi un développeur qui partage ses difficultés et ses ignorances ouvertement construit plus de crédibilité dans une équipe technique qu'un développeur qui les dissimule ?",
        "Ton collègue a mergé une implémentation que tu trouves fragile — une gestion d'erreurs absente sur un endpoint critique. Tu ne l'as pas signalé en review par évitement. Deux jours plus tard, un incident en production. Comment aurais-tu dû formuler ton observation en review, et que dis-tu maintenant à ton collègue ?",
        "En quoi la qualité des relations latérales entre développeurs (entre pairs) détermine-t-elle la vitesse de résolution des incidents et la qualité des décisions techniques autant que la compétence individuelle ?",
      ],
    }),

    clientFinal: coNode({
      id: "clientFinal",
      label: "Relation avec le client final",
      icon: "🧑‍💻",
      kind: "communication",
      niveau: "Avancé",
      why: "Un développeur qui n'a jamais parlé à un vrai utilisateur code selon ses propres hypothèses. Ces hypothèses sont presque toujours fausses sur au moins un point critique : la façon dont les gens utilisent réellement une interface, les contextes dans lesquels ils accèdent à l'app, les erreurs qu'ils font systématiquement. Quand ces faux pas se manifestent en production — confusion sur un libellé, blocage sur un formulaire, abandon d'un tunnel — ils coûtent bien plus cher à corriger qu'une conversation de 30 minutes en amont n'aurait coûté à prévenir.",
      system:
        'La relation avec le client final est distincte de la relation avec le client métier ou le PM. <span class="ref-fiche">→ clientMetier</span> : le client métier exprime des besoins organisationnels ; le client final révèle des comportements réels — et les deux divergent souvent. <span class="ref-fiche">→ Co02</span> : traduire ce que le client final exprime (frustration, contournement, abandon) en langage que le PM peut prioriser est une compétence de traduction inverse, du terrain vers le produit.',
      choice:
        "Accès direct vs. accès médiatisé. Accès direct : tests utilisateurs, appels de support, sessions d'observation. Accès médiatisé : données analytics, tickets de support traités par une autre équipe, retours remontés par le PM. L'accès direct produit des insights qualitatifs impossibles à extraire des données — comprendre pourquoi un utilisateur clique sur le mauvais bouton. L'accès médiatisé produit des signaux à grande échelle — savoir que 40% des utilisateurs abandonnent à l'étape 3. Les deux se complètent. Un développeur sans jamais aucun accès direct — même 1h par mois de lecture de tickets de support — code dans le vide.",
      senior:
        "Il sait distinguer le signal du bruit dans les retours clients. Un utilisateur qui dit 'c'est compliqué' ne décrit pas un problème de complexité — il décrit un problème d'alignement entre son modèle mental et l'interface. Creuser ce que 'compliqué' signifie concrètement ('je ne comprends pas pourquoi cette action est là' vs 'il y a trop d'étapes') change complètement la solution. Il ne prend jamais un retour client au pied de la lettre : 'je veux un bouton X' cache presque toujours 'j'ai du mal à faire Y'. Il traduit systématiquement les retours en problèmes avant de les transmettre en solutions.",
      errors: `<p><strong>Pattern 1 — Retour client = feature request :</strong> le développeur ou le PM traite chaque retour client comme une demande de feature à implémenter. Conséquence: le produit s'alourdit de fonctionnalités qui répondent aux symptômes sans adresser le problème sous-jacent, et les utilisateurs continuent à se plaindre différemment du même problème.</p><p><strong>Pattern 2 — Analytics sans sens :</strong> l'équipe mesure tout (taux de clic, temps de session, funnel completion) mais n'a pas de client réel à qui demander pourquoi les chiffres sont ce qu'ils sont. Conséquence: on optimise des métriques sans comprendre les comportements, et les décisions d'amélioration reposent sur des hypothèses non vérifiées.</p><p><strong>Pattern 3 — Un seul type de client :</strong> on écoute les utilisateurs les plus vocaux (power users, plaignants actifs) et on considère que leurs retours représentent l'ensemble. Conséquence: le produit s'optimise pour une minorité, et la majorité silencieuse — qui abandonne sans se plaindre — n'est jamais représentée dans les décisions.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> le mode d'accès au client final (tests utilisateurs, support, analytics, NPS), la fréquence des retours selon la maturité du produit, les outils de collecte. <strong>Ce qui ne change pas :</strong> un retour client exprimé comme une solution ('je veux X') cache toujours un problème sous-jacent ('j'ai du mal à faire Y') — le travail du développeur et du PM est de remonter du symptôme au problème avant de décider quoi construire.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Analyser des retours clients pour identifier le vrai problème",
            etapes: [
              "Collecte 5 retours clients récents sur le produit (tickets de support, commentaires, NPS verbatims, résultats de tests utilisateurs).",
              "Pour chacun, sépare : ce qui est exprimé (solution demandée ou plainte) et ce qui est sous-jacent (problème réel que le client essaie de résoudre).",
              "Identifie le retour le plus fréquemment reformulé différemment — c'est probablement le même problème sous-jacent vu sous plusieurs angles.",
              "Formule ce problème en une phrase de 'job to be done' : 'Quand [contexte], l'utilisateur essaie de [objectif], mais [obstacle] l'en empêche.'",
              "Propose deux solutions qui répondent au problème sous-jacent plutôt qu'aux symptômes exprimés.",
            ],
            output:
              "Tableau de 5 retours : symptôme vs problème + 1 job to be done + 2 solutions orientées problème.",
            critere:
              "Tes deux solutions ne doivent pas être les features demandées par les clients — elles doivent résoudre le problème sous-jacent que tu as identifié, possiblement de façon différente.",
          },
        ],
        piege:
          "Traiter les retours de 5 utilisateurs comme représentatifs. Les utilisateurs qui donnent du feedback sont presque toujours ceux qui s'y connaissent le mieux ou qui sont le plus frustrés — ni l'un ni l'autre n'est le cas médian.",
      },
      verification: [
        "Pourquoi un utilisateur qui dit 'je veux un bouton export Excel' n'est presque jamais en train de demander un bouton export Excel, et comment remontes-tu au vrai besoin ?",
        "Ton app SaaS a un taux d'abandon de 60% à l'étape 3 d'un formulaire en 5 étapes. Analytics montrent un pic de clics sur le bouton 'précédent' à cette étape. Tu n'as pas accès direct aux utilisateurs. Quelles hypothèses formules-tu, comment les valides-tu avec les données existantes, et quel accès au client final te manque pour trancher ?",
        "En quoi la relation avec le client final est-elle structurellement différente de la relation avec le client métier, et pourquoi les confondre produit des décisions de produit systématiquement sous-optimales ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 960 340",
      nodes: [
        { id: "stakeholderMapping", x: 10, y: 135, w: 155, h: 65 },
        { id: "pmRelation", x: 225, y: 30, w: 145, h: 65 },
        { id: "designerRelation", x: 225, y: 135, w: 145, h: 65 },
        { id: "equipeDevs", x: 225, y: 240, w: 155, h: 65 },
        { id: "clientMetier", x: 450, y: 80, w: 145, h: 65 },
        { id: "clientFinal", x: 450, y: 195, w: 140, h: 65 },
        { id: "hierarchieTech", x: 680, y: 135, w: 165, h: 65 },
      ],
      edges: [
        { x1: 165, y1: 148, x2: 223, y2: 63, label: "identifie" },
        { x1: 165, y1: 162, x2: 223, y2: 162, label: "cadre" },
        { x1: 165, y1: 175, x2: 223, y2: 257, label: "réunit" },
        { x1: 370, y1: 63, x2: 448, y2: 100, label: "oriente" },
        { x1: 370, y1: 168, x2: 448, y2: 212, label: "traduit" },
        { x1: 590, y1: 100, x2: 678, y2: 155, label: "remonte" },
        { x1: 590, y1: 215, x2: 678, y2: 170, label: "alimente" },
      ],
    },
  },
});
