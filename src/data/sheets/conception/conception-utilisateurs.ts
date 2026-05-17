import { conceptionSheet } from "./conception-common";

export const conceptionUtilisateurs = conceptionSheet({
  id: "conception-C02",
  number: 12,
  title: "Les Utilisateurs",
  subtitle: "Comprendre pour qui on construit, ce qu'ils font vraiment, et comment le valider sans produit",
  badge: "Fiche C02 — Vision Systémique",
  meta: ["5 nœuds · universel"],
  readingTime: "20 min",
  description: "Construire le bon produit pour les mauvaises personnes ou construire pour une image mentale d'utilisateur plutôt que pour des utilisateurs réels — c'est le deuxième piège après la confusion idée/opportunité. Cette fiche donne les outils pour comprendre qui sont vraiment les utilisateurs, ce qui les motive, et comment valider ces hypothèses avant de construire.",
  accent: "diagnostic",

  nodes: {
    utilisateurAcheteurDecideur: {
      id: "utilisateurAcheteurDecideur",
      label: "Utilisateur / Acheteur / Décideur",
      icon: "👥",
      kind: "modele",
            os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Dans beaucoup de produits, la personne qui utilise l'outil, la personne qui paie, et la personne qui décide de l'acheter sont trois personnes différentes. <strong>Optimiser pour l'utilisateur sans comprendre ce que veut l'acheteur ou ce qui convainc le décideur, c'est construire un produit que personne ne signe.</strong> Cette confusion est particulièrement fréquente en B2B — le manager décide, le budget vient des finances, et les équipes utilisent.</p>`,
        system: `<p>Ce nœud est fondamental pour toute la fiche C02. Il conditionne <strong>Jobs-to-be-done</strong> (chaque rôle a un job différent), <strong>Contexte d'usage</strong> (l'utilisateur et l'acheteur vivent dans des contextes différents), et <strong>Hypothèses vs faits</strong> (les hypothèses sur les motivations varient selon le rôle). Il nourrit aussi la viabilité <span class="ref-fiche">→ C04</span> : le modèle économique dépend de qui paie, pas seulement de qui utilise.</p>`,
        choice: {
          kind: "free",
          html: `<p>La distinction utilisateur/acheteur/décideur s'applique différemment selon le contexte :</p>
<p><strong>B2C (consommateur direct) :</strong> souvent les trois rôles sont la même personne. La complexité vient des influenceurs (recommandations, avis) qui ne sont ni utilisateurs ni acheteurs mais influencent la décision.</p>
<p><strong>B2B (entreprise) :</strong> les trois rôles sont presque toujours séparés. Le décideur (DG, DSI) définit le budget, l'acheteur (responsable d'équipe) évalue les options, l'utilisateur (employé) travaille avec l'outil. Chacun a des critères de décision différents.</p>
<p><strong>B2B2C (via un intermédiaire) :</strong> une quatrième couche — la plateforme ou le partenaire qui distribue. Ses contraintes s'ajoutent aux trois rôles.</p>`,
        },
        senior: `<p>Un product manager expérimenté identifie en premier lieu qui a le pouvoir de bloquer l'adoption — pas qui a envie du produit. Dans un contexte B2B, même si les utilisateurs adorent le produit, si le DSI a des contraintes de sécurité non adressées ou si le CFO trouve le pricing opaque, le deal ne se fait pas. <strong>Il conçoit des arguments différents pour chaque rôle, pas un pitch unique pour tous.</strong></p>`,
        errors: `<p><strong>Pattern 1 — Le champion sans budget :</strong> on identifie un utilisateur enthousiaste qui "va faire remonter ça à sa direction". L'enthousiasme est réel, mais la personne n'a ni budget ni autorité. Six mois de travail commercial pour rien.</p>
<p><strong>Pattern 2 — Le décideur sans contexte :</strong> on parle au DG qui dit oui, mais personne n'a validé que les équipes utiliseront effectivement l'outil. Le contrat est signé, le déploiement échoue faute d'adoption.</p>
<p><strong>Pattern 3 — L'optimisation pour un seul rôle :</strong> on conçoit pour l'utilisateur (expérience fluide, features puissantes) sans penser à l'acheteur (ROI mesurable) ni au décideur (conformité, reporting). Le produit est excellent à l'usage mais invendable.</p>`,
        invariants: `<p>Les structures organisationnelles changent, les modèles d'achat évoluent. <strong>Ce qui ne change pas : dans tout achat, quelqu'un utilise, quelqu'un paie, et quelqu'un autorise — et leurs motivations sont rarement identiques.</strong></p><p><strong>Ce qui change :</strong> la structure exacte des rôles selon l'industrie et la taille d'entreprise. <strong>Ce qui ne change pas :</strong> la nécessité d'identifier et d'adresser chaque rôle séparément pour qu'un produit B2B soit adopté.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cartographier les rôles pour un produit",
              etapes: [
                "Choisis un produit B2B que tu connais ou imagine (outil de gestion de projet, logiciel RH, plateforme de formation...).",
                "Identifie un exemple concret d'organisation cible et liste : qui utilise l'outil au quotidien ? Qui décide de l'achat ? Qui signe le budget ?",
                "Pour chaque rôle, formule leur critère de décision principal : qu'est-ce qui les convaincrait d'adopter ce produit ? Qu'est-ce qui les bloquerait ?",
                "Identifie les points de friction entre les rôles : où leurs critères s'opposent-ils ?",
              ],
              output: "Un tableau à trois colonnes (utilisateur / acheteur / décideur) avec pour chaque rôle : profil, critère d'adoption, et risque de blocage.",
              critere: "Les critères d'adoption des trois rôles sont distincts et parfois contradictoires. Si tous les critères se ressemblent, tu n'as pas encore fait la distinction réelle entre les rôles.",
            },
          ],
          piege: "Supposer que le rôle 'utilisateur' est le plus important parce que c'est lui qui interagit avec le produit. En B2B, le décideur qui ne touchera jamais l'outil peut bloquer un déploiement — son critère compte autant que celui de l'utilisateur.",
        },
        verification: [
          "Dans quel contexte la distinction utilisateur/acheteur/décideur est-elle la plus critique ? Pourquoi ?",
          "Tu construis un outil de gestion de congés pour les PME. Qui sont l'utilisateur, l'acheteur, et le décideur ? Quels sont leurs critères respectifs ?",
          "Pourquoi optimiser exclusivement pour l'expérience utilisateur peut-il mener à un échec commercial en B2B ?",
        ],
      },
    },

    jobsToBeDone: {
      id: "jobsToBeDone",
      label: "Jobs-to-be-done",
      icon: "🔧",
      kind: "modele",
            os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Deux utilisateurs peuvent cliquer sur le même bouton pour des raisons complètement différentes. Si on ne comprend que le geste visible, on optimise l'interface ; si on comprend le progrès recherché, on peut repenser la solution entière. <strong>Le job-to-be-done est la tâche fonctionnelle, émotionnelle, ou sociale que l'utilisateur essaie d'accomplir.</strong> McDonald's a découvert que certains clients "engageaient" un milkshake pour tenir un long trajet ennuyeux — pas seulement pour boire quelque chose de sucré.</p>`,
        system: `<p>Le JTBD donne de la profondeur à <strong>Utilisateur/Acheteur/Décideur</strong> (chaque rôle a un job différent) et à <strong>Contexte d'usage</strong> (le job change selon le moment et la contrainte). Il alimente la solution <span class="ref-fiche">→ C03</span> : une bonne solution accomplit le job mieux que les alternatives actuelles. Il nourrit aussi la mesure <span class="ref-fiche">→ C06</span> : une métrique pertinente mesure si le job est réellement accompli.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs cadres permettent de structurer la compréhension des motivations utilisateurs :</p>
<p><strong>Jobs-to-be-done (Christensen) :</strong> focus sur la tâche à accomplir et le progrès vers un résultat. Trois dimensions : fonctionnel (ce que ça fait), émotionnel (ce que ça fait ressentir), social (comment ça me positionne vis-à-vis des autres).</p>
<p><strong>Outcome-driven innovation (Ulwick) :</strong> décompose les jobs en "desired outcomes" mesurables. Plus structuré, utile pour des recherches quantitatives.</p>
<p><strong>User story mapping (Patton) :</strong> organise les activités des utilisateurs en séquences et niveaux d'abstraction. Plus proche du delivery que de la recherche.</p>
<p><strong>Règle :</strong> utilise JTBD pour la phase de découverte et de compréhension. Passe aux user stories pour la phase de delivery.</p>`,
        },
        senior: `<p>Un product manager expérimenté formule les jobs à un niveau d'abstraction suffisant pour que la solution ne soit pas prédéterminée. <strong>"Je veux partager ce document" est trop concret (la solution est évidente). "Je veux que mon équipe soit alignée sur cette information" est le bon niveau</strong> — il ouvre des dizaines de solutions possibles (réunion, doc partagé, outil de collaboration, email, notification...). Le niveau d'abstraction du job détermine l'espace des solutions explorées.</p>`,
        errors: `<p><strong>Pattern 1 — Le job trop fonctionnel :</strong> on identifie uniquement la dimension fonctionnelle (ce que l'outil fait) et on rate les dimensions émotionnelles et sociales. Un outil de gestion de projet ne fait pas que gérer des tâches — il donne à son utilisateur une impression de contrôle et de sérieux vis-à-vis de son équipe.</p>
<p><strong>Pattern 2 — Le job confondu avec la feature :</strong> "je veux un export PDF" est une solution, pas un job. Le job est "je veux partager ce document avec quelqu'un qui n'a pas accès à l'outil". Confondre les deux ferme l'exploration des solutions alternatives.</p>
<p><strong>Pattern 3 — Le job unique pour tous :</strong> on identifie un job pour "les utilisateurs" sans distinguer les segments. Différents segments ont des jobs différents même avec le même produit — un débutant et un expert n'utilisent pas le même outil pour faire la même chose.</p>`,
        invariants: `<p>Le framework JTBD date des années 90 et ses fondements restent stables. <strong>Ce qui ne change pas : les utilisateurs engagent des produits pour accomplir du progrès dans leur vie. Le progrès peut être fonctionnel, émotionnel, ou social — et les trois dimensions comptent.</strong></p><p><strong>Ce qui change :</strong> les outils disponibles pour accomplir un job (disruption technologique). <strong>Ce qui ne change pas :</strong> le job lui-même — les gens voulaient rester en contact avec leurs proches avant les réseaux sociaux, et ils le voudront après.</p>`,
        practice: {
          exercices: [
            {
              titre: "Formuler des jobs à la bonne altitude",
              etapes: [
                "Choisis un produit du quotidien (Spotify, WhatsApp, Notion, Google Maps...).",
                "Formule son job principal sous trois formes : trop concret (description de la feature), trop abstrait (générique et inapplicable), et au bon niveau (assez large pour laisser de l'espace aux solutions, assez précis pour guider).",
                "Pour le job au bon niveau, identifie les trois dimensions : fonctionnelle, émotionnelle, sociale.",
                "Identifie deux autres produits ou comportements qui accomplissent le même job — les 'compétiteurs indirects'.",
              ],
              output: "Un job formulé aux trois niveaux d'abstraction, avec ses trois dimensions et deux compétiteurs indirects identifiés.",
              critere: "Le job au bon niveau permet d'imaginer au moins trois solutions différentes. Si une seule solution vient immédiatement à l'esprit, le job est trop concret.",
            },
          ],
          piege: "Identifier les jobs en demandant aux utilisateurs 'quels sont vos besoins ?' — ils répondront avec des features, pas des jobs. Demande plutôt : 'La dernière fois que tu as utilisé ce produit, qu'est-ce que tu essayais d'accomplir ?' Le passé révèle les vrais jobs mieux que le présent.",
        },
        verification: [
          "Qu'est-ce qu'un job-to-be-done ? En quoi est-ce différent d'un besoin fonctionnel ou d'une feature ?",
          "Formule le job-to-be-done d'un utilisateur qui ouvre Instagram à 7h du matin. Identifie les dimensions fonctionnelle, émotionnelle, et sociale.",
          "Pourquoi identifier les compétiteurs indirects d'un produit (via le job) est-il plus utile que d'identifier ses compétiteurs directs ?",
        ],
      },
    },

    contexteUsage: {
      id: "contexteUsage",
      label: "Contexte d'usage",
      icon: "🗺",
      kind: "diagnostic",
            os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un produit ne s'utilise pas dans un vide. Il s'utilise dans un moment précis, avec des contraintes physiques et mentales, souvent en parallèle d'autres tâches. <strong>Ignorer le contexte d'usage, c'est concevoir pour un utilisateur idéal dans des conditions idéales — et rater l'utilisateur réel dans ses conditions réelles.</strong> Une app conçue en bureau sur écran large peut être inutilisable sur mobile dans le métro avec une main occupée.</p>`,
        system: `<p>Le contexte d'usage donne de la chair aux <strong>Jobs-to-be-done</strong> (le même job peut avoir des contextes d'usage très différents) et aux <strong>Hypothèses vs faits</strong> (les hypothèses sur le contexte sont parmi les plus difficiles à valider sans observation). Il alimente la solution <span class="ref-fiche">→ C03</span> : les contraintes de contexte définissent ce qui est faisable, acceptable et prioritaire.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs méthodes permettent de comprendre le contexte d'usage :</p>
<p><strong>Observation contextuelle (shadowing) :</strong> observer les utilisateurs dans leur environnement naturel, sans interférer. Révèle des contraintes et comportements invisibles en entretien.</p>
<p><strong>Diary study :</strong> demander aux utilisateurs de noter leurs expériences en temps réel sur plusieurs jours. Capture le contexte tel qu'il se passe, pas reconstruit de mémoire.</p>
<p><strong>Entretiens contextuels :</strong> conduire l'entretien là où l'utilisateur travaille normalement, avec son environnement réel visible. Plus riche qu'un entretien en salle de conférence.</p>
<p><strong>Règle :</strong> si tu ne peux pas observer, demande aux utilisateurs de te décrire la dernière fois qu'ils ont eu ce problème — lieu, heure, ce qu'ils faisaient en parallèle, leur état d'esprit.</p>`,
        },
        senior: `<p>Un product manager expérimenté pense en scénarios d'usage avant de penser en features. <strong>Il se demande : dans quel moment précis de la journée/semaine/mois ce produit sera-t-il utilisé ? Avec quelles contraintes ? En remplacement de quoi ?</strong> Ces questions changent radicalement les décisions de design — une interface conçue pour une utilisation quotidienne rapide est différente d'une interface conçue pour une utilisation mensuelle approfondie.</p>`,
        errors: `<p><strong>Pattern 1 — Le contexte de bureau :</strong> on conçoit en assumant que l'utilisateur est assis devant un grand écran, avec du temps, dans le calme. En réalité, les logiciels d'entreprise sont de plus en plus utilisés en mobilité, en réunion, ou simultanément avec d'autres outils.</p>
<p><strong>Pattern 2 — Le contexte unique :</strong> on identifie un contexte d'usage principal et on conçoit pour lui. Souvent, le même produit est utilisé dans des contextes radicalement différents selon le moment ou le profil utilisateur — chacun avec des contraintes distinctes.</p>
<p><strong>Pattern 3 — Le contexte oublié du déploiement :</strong> on pense au contexte d'usage de l'utilisateur final mais on oublie le contexte d'installation et de déploiement — qui fait l'onboarding ? Dans quelle situation d'urgence ou de tranquillité ? Le contexte d'onboarding détermine souvent le taux d'adoption.</p>`,
        invariants: `<p>Les outils et interfaces changent, les contextes d'usage évoluent. <strong>Ce qui ne change pas : un produit utilisé dans un contexte différent de celui pour lequel il a été conçu sera toujours sous-optimal.</strong> La contrainte du contexte réel prime toujours sur la logique du produit idéal.</p><p><strong>Ce qui change :</strong> les contextes eux-mêmes (travail hybride, mobile-first, vocal...). <strong>Ce qui ne change pas :</strong> la nécessité de comprendre où, quand, et dans quel état d'esprit le produit sera utilisé avant de le concevoir.</p>`,
        practice: {
          exercices: [
            {
              titre: "Décrire trois scénarios d'usage concrets",
              etapes: [
                "Choisis un produit ou une feature sur lequel tu travailles (ou imagine-en un).",
                "Décris trois scénarios d'usage différents : lieu, moment, état d'esprit de l'utilisateur, ce qu'il faisait juste avant, contraintes physiques (une main libre ? bruit ? urgence ?).",
                "Pour chaque scénario, identifie les contraintes qui impactent le design : taille d'écran, temps disponible, niveau de concentration, connexion internet...",
                "Identifie le scénario le plus contraignant — conçois pour lui. Un design qui fonctionne dans le pire contexte fonctionne dans tous les contextes.",
              ],
              output: "Trois scénarios d'usage détaillés avec contraintes, et le scénario le plus contraignant identifié comme référence de conception.",
              critere: "Les trois scénarios sont suffisamment différents pour impliquer des décisions de design distinctes. Si les trois scénarios mènent au même design, ils ne sont pas assez contrastés.",
            },
          ],
          piege: "Décrire des contextes d'usage idéaux ('l'utilisateur ouvre l'app depuis son bureau') plutôt que des contextes réels ('l'utilisateur ouvre l'app dans le métro entre deux stations'). Les contextes idéaux ne révèlent pas les vrais défis de design.",
        },
        verification: [
          "Pourquoi comprendre le contexte d'usage est-il aussi important que comprendre le besoin fonctionnel ?",
          "Tu conçois une app de suivi de chantier pour les conducteurs de travaux. Décris trois contextes d'usage possibles et leurs contraintes.",
          "Quel est le principe derrière 'concevoir pour le scénario le plus contraignant' ? Dans quel cas ce principe ne s'applique-t-il pas ?",
        ],
      },
    },

    hypothesesFaits: {
      id: "hypothesesFaits",
      label: "Hypothèses vs faits",
      icon: "⚖",
      kind: "validation",
            os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Toute connaissance sur les utilisateurs commence comme une hypothèse. Le problème n'est pas d'avoir des hypothèses — c'est de les confondre avec des faits. <strong>Une hypothèse non identifiée comme telle devient une certitude implicite qui guide les décisions sans jamais être remise en question.</strong> Les produits ratés sont souvent des produits construits sur des hypothèses traitées comme des faits, jamais testées, jusqu'au moment où le marché les invalide.</p>`,
        system: `<p>Ce nœud est le filtre épistémique de toute la fiche C02. Il s'applique à <strong>Utilisateur/Acheteur/Décideur</strong> (nos modèles des rôles sont des hypothèses), <strong>Jobs-to-be-done</strong> (les jobs qu'on identifie sont des hypothèses), et <strong>Contexte d'usage</strong> (nos scénarios sont des hypothèses). Il prépare <strong>Valider sans produit</strong> et annonce la solution comme hypothèse <span class="ref-fiche">→ C03</span> : une hypothèse identifiée doit être testée avant d'être transformée en périmètre.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs approches existent pour structurer le suivi des hypothèses :</p>
<p><strong>Hypothesis backlog :</strong> liste explicite de toutes les hypothèses du projet, classées par criticité et par niveau de confiance actuel. Chaque hypothèse a un test associé.</p>
<p><strong>Assumption mapping :</strong> grille 2x2 (criticité × niveau de confiance). Les hypothèses critiques et peu confirmées sont les priorités de recherche.</p>
<p><strong>Lean canvas :</strong> outil de structuration des hypothèses d'un business model complet. Utile pour capturer toutes les dimensions, moins utile pour le suivi quotidien.</p>
<p><strong>Règle :</strong> l'outil importe moins que la discipline — distinguer explicitement ce qu'on sait de ce qu'on croit, et avoir un processus pour réduire l'incertitude sur les hypothèses critiques.</p>`,
        },
        senior: `<p>Un product manager expérimenté commence chaque projet en faisant la liste de ce qu'il ne sait pas encore — pas de ce qu'il sait. <strong>Il formule ses hypothèses de façon à ce qu'elles puissent être invalidées : "Si cette hypothèse est fausse, qu'est-ce que ça changerait ?"</strong> Une hypothèse qui ne peut pas être invalidée n'est pas une hypothèse — c'est une croyance.</p><p>Il maintient aussi cette discipline dans la durée : les faits d'aujourd'hui peuvent devenir des hypothèses fausses demain si le contexte change.</p>`,
        errors: `<p><strong>Pattern 1 — L'hypothèse déguisée en persona :</strong> on crée un persona détaillé ("Marie, 34 ans, responsable marketing...") et on le traite comme un fait. Le persona est une hypothèse sur qui sont les utilisateurs et ce qu'ils veulent — utile pour aligner les équipes, dangereux si on oublie que c'est une construction.</p>
<p><strong>Pattern 2 — La validation par le consensus interne :</strong> l'équipe se réunit, débat, et arrive à un consensus sur les hypothèses. Le consensus interne ne valide pas une hypothèse — seule la confrontation avec la réalité le fait. Un groupe peut être collectivement dans l'erreur.</p>
<p><strong>Pattern 3 — L'hypothèse non formulée :</strong> certaines hypothèses sont si évidentes qu'on ne les formule jamais — et donc on ne les teste jamais. "Les gens veulent gagner du temps" est une hypothèse. "Notre cible a accès à internet" est une hypothèse. Les hypothèses les plus évidentes sont souvent les plus dangereuses quand elles sont fausses.</p>`,
        invariants: `<p>Les méthodes de recherche changent. <strong>Ce qui ne change pas : toute décision basée sur une hypothèse non testée est un pari. Plus la décision est irréversible ou coûteuse, plus le pari est risqué.</strong></p><p><strong>Ce qui change :</strong> la vitesse à laquelle on peut tester des hypothèses (prototypes rapides, A/B tests, landing pages). <strong>Ce qui ne change pas :</strong> la nécessité de savoir ce qu'on sait versus ce qu'on croit — indépendamment des outils disponibles pour le tester.</p>`,
        practice: {
          exercices: [
            {
              titre: "Trier les certitudes des hypothèses",
              etapes: [
                "Prends un projet ou une idée de produit (réel ou imaginé).",
                "Liste 10 affirmations que tu ferais sur les utilisateurs ou le marché ('Les utilisateurs veulent X', 'Le segment cible fait Y', 'La douleur principale est Z'...).",
                "Pour chaque affirmation, classifie : Fait (tu as des données qui le prouvent), Hypothèse forte (tu as des indices, mais pas de preuve directe), Hypothèse faible (c'est une supposition sans données).",
                "Pour les hypothèses faibles critiques, formule un test minimal : qu'est-ce que tu observerais si c'était vrai ? Comment peux-tu créer cette situation ?",
              ],
              output: "Une liste de 10 affirmations classées fait/hypothèse forte/hypothèse faible, avec les hypothèses faibles critiques et leurs tests associés.",
              critere: "Au moins 4 de tes 10 affirmations sont des hypothèses (sinon tu n'as pas été assez honnête ou tu travailles sur un marché extrêmement bien connu). Les tests que tu formules peuvent être conduits en moins d'une semaine.",
            },
          ],
          piege: "Classer comme 'fait' des choses qu'on a entendues plusieurs fois ou qui font consensus dans l'équipe. La répétition ne transforme pas une hypothèse en fait. Seule la confrontation avec des données externes le fait.",
        },
        verification: [
          "Explique pourquoi une affirmation entendue de plusieurs utilisateurs différents n'est pas nécessairement un fait — et ce qui permettrait de la transformer en fait.",
          "Dans ton document de conception, tu lis ces trois affirmations : '1) Nos utilisateurs préfèrent le mobile. 2) Le marché SaaS RH est en croissance. 3) Les utilisateurs abandonnent à l'étape 3 de l'onboarding.' Pour chacune, classe-la en fait vérifié, hypothèse testable, ou croyance non testable — et justifie ce qui manque pour passer de l'une à l'autre.",
          "Pourquoi une hypothèse non testable est-elle plus dangereuse qu'une absence d'hypothèse pour guider les décisions produit ?",
        ],
      },
    },

    validerSansProduit: {
      id: "validerSansProduit",
      label: "Valider sans produit",
      icon: "✅",
      kind: "validation",
            os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une équipe peut passer trois mois à construire une première version, la lancer, puis découvrir en deux jours que l'hypothèse centrale était fausse. Ce n'est pas un problème d'exécution : c'est un apprentissage payé trop cher. <strong>Avant d'écrire une ligne de code, on peut valider les hypothèses les plus critiques avec des méthodes qui prennent des heures, pas des mois.</strong></p>`,
        system: `<p>Ce nœud est la conclusion opérationnelle de C02. Il transforme les <strong>Hypothèses vs faits</strong> en actions de validation, et s'appuie sur les <strong>Jobs-to-be-done</strong> et le <strong>Contexte d'usage</strong> pour définir quoi tester. Il prépare la solution <span class="ref-fiche">→ C03</span> : on ne peut pas délimiter une bonne solution sans avoir validé les hypothèses critiques sur le problème et les utilisateurs.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les méthodes de validation sans produit, du plus léger au plus élaboré :</p>
<p><strong>Entretiens de découverte :</strong> conversations ouvertes avec des utilisateurs potentiels pour comprendre leurs comportements et problèmes. Zéro coût, rapide, mais qualitatif — ne donne pas de mesures.</p>
<p><strong>Landing page + pré-inscription :</strong> décrire la solution et mesurer l'intent (email, pré-commande, demande d'accès). Donne une mesure quantitative de l'intérêt avant de construire.</p>
<p><strong>Prototype papier ou Figma :</strong> tester la compréhension et l'usage d'une interface sans coder. Révèle les problèmes d'UX et de concept avant l'implémentation.</p>
<p><strong>Wizard of Oz :</strong> simuler le produit manuellement (un humain fait ce que l'IA ou le système ferait). Valide le concept et la valeur perçue sans infrastructure.</p>
<p><strong>Fake door :</strong> proposer une feature dans le produit existant et mesurer le clic — si personne ne clique, inutile de la construire.</p>`,
        },
        senior: `<p>Un product manager expérimenté choisit la méthode de validation la plus légère qui peut invalider l'hypothèse critique. <strong>La question n'est pas "comment prouver que j'ai raison ?" mais "quel est le test minimal qui pourrait me prouver que j'ai tort ?"</strong> Si le test ne peut pas invalider l'hypothèse, il ne sert à rien.</p><p>Il sait aussi que chaque méthode a ses limites : les entretiens sur-estiment souvent l'intérêt (les gens sont polis), les tests A/B ne fonctionnent que sur des produits existants avec du trafic, les landing pages mesurent l'intent mais pas l'usage réel.</p>`,
        errors: `<p><strong>Pattern 1 — La validation par démo :</strong> on montre le produit à des prospects et ils disent "c'est super". Ce n'est pas une validation — c'est de la politesse. La validation, c'est quelqu'un qui sort sa carte bleue, signe un engagement, ou change son comportement.</p>
<p><strong>Pattern 2 — Le prototype trop abouti :</strong> on construit un prototype si détaillé que les utilisateurs testent l'exécution (est-ce que l'interface est belle ?) plutôt que le concept (est-ce que ce produit résout mon problème ?). Un prototype en papier brouillon force à tester le concept.</p>
<p><strong>Pattern 3 — La validation d'une seule hypothèse :</strong> on valide l'hypothèse la plus facile (les gens ont le problème) et on oublie les autres hypothèses critiques (ils paieraient pour le résoudre, ils changeraient leur workflow, ils ont le budget...). Un produit peut rater même si le problème est validé.</p>`,
        invariants: `<p>Les outils de validation changent — prototypes no-code, tests utilisateurs en ligne, analytics. <strong>Ce qui ne change pas : une hypothèse validée avec un faux signal est pire qu'une hypothèse non testée — elle crée une fausse certitude qui oriente tout le produit dans la mauvaise direction.</strong></p><p><strong>Ce qui change :</strong> la facilité et la vitesse de mise en place des tests. <strong>Ce qui ne change pas :</strong> la nécessité que le signal mesuré représente réellement le comportement qu'on veut prédire.</p>`,
        practice: {
          exercices: [
            {
              titre: "Concevoir un test de validation minimal",
              etapes: [
                "Reprends les hypothèses critiques identifiées dans l'exercice précédent (ou formules-en deux nouvelles pour un projet imaginé).",
                "Pour chaque hypothèse critique, choisis la méthode de validation la plus légère qui pourrait l'invalider.",
                "Formule le test précisément : qui tu vas contacter, quoi tu vas leur montrer ou demander, quel signal tu vas mesurer, et quel résultat t'indiquerait que l'hypothèse est fausse.",
                "Estime le temps nécessaire pour conduire ce test. Si c'est plus d'une semaine, simplifie.",
              ],
              output: "Pour chaque hypothèse critique : méthode choisie, description du test, signal mesuré, seuil d'invalidation, durée estimée.",
              critere: "Le test peut être conduit en moins d'une semaine, et tu as défini à l'avance ce qui constituerait une invalidation. Si tu n'as pas défini le seuil d'invalidation avant de conduire le test, les biais cognitifs interpréteront les résultats en ta faveur.",
            },
          ],
          piege: "Concevoir des tests qui ne peuvent que confirmer l'hypothèse. Si tu demandes 'est-ce que tu trouves que ce problème existe ?', la réponse sera presque toujours oui. Conçois des tests qui te donnent une chance réelle de découvrir que tu as tort.",
        },
        verification: [
          "Pourquoi construire le produit complet est-il la méthode de validation la plus chère et la plus risquée ?",
          "Tu veux valider l'hypothèse 'les parents de jeunes enfants seraient prêts à payer pour une app de suivi des vaccins'. Propose deux méthodes de validation sans produit, du plus léger au plus élaboré.",
          "Comment sais-tu qu'une validation a donné un vrai signal et pas un faux signal (politesse, biais de désirabilité sociale) ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 280",
      nodes: [
        { id: "utilisateurAcheteurDecideur", x: 20,  y: 108, w: 155, h: 65 },
        { id: "jobsToBeDone",                x: 225, y: 40,  w: 140, h: 65 },
        { id: "contexteUsage",               x: 225, y: 175, w: 130, h: 65 },
        { id: "hypothesesFaits",             x: 430, y: 108, w: 130, h: 65 },
        { id: "validerSansProduit",          x: 620, y: 108, w: 140, h: 65 },
      ],
      edges: [
        { x1: 175, y1: 128, x2: 223, y2: 78,  label: "définit" },
        { x1: 175, y1: 148, x2: 223, y2: 195, label: "situe" },
        { x1: 365, y1: 72,  x2: 428, y2: 128, label: "génère" },
        { x1: 355, y1: 208, x2: 428, y2: 152, label: "contraint" },
        { x1: 560, y1: 140, x2: 618, y2: 140, label: "teste" },
      ],
    },
  },
});
