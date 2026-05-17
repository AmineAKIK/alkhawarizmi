import { conceptionSheet } from "./conception-common";

export const conceptionProbleme = conceptionSheet({
  id: "conception-C01",
  number: 11,
  title: "L'Idée et le Problème Réel",
  subtitle: "Distinguer une idée d'une opportunité, et un problème perçu d'un problème réel",
  badge: "Fiche C01 — Vision Systémique",
  meta: ["5 nœuds · universel"],
  readingTime: "20 min",
  description: "Avant d'écrire une ligne de code ou de dessiner une interface, il faut comprendre quel problème on résout vraiment — et pourquoi ce problème mérite d'être résolu. Cette fiche donne les outils pour ne pas confondre une idée avec une opportunité, ni un problème exprimé avec un problème réel.",
  accent: "diagnostic",

  nodes: {
    ideeOpportunite: {
      id: "ideeOpportunite",
      label: "Idée vs Opportunité",
      icon: "💡",
      kind: "diagnostic",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La plupart des produits ratent avant même d'être construits — non pas à cause d'un mauvais code, mais parce qu'ils répondaient à une idée et non à une opportunité. <strong>Une idée, c'est quelque chose qu'on trouve intéressant. Une opportunité, c'est un problème réel que suffisamment de personnes veulent résoudre.</strong> La confusion entre les deux est la cause numéro un des projets construits dans le vide.</p>`,
        system: `<p>Ce nœud est le point de départ de toute la fiche. Il conditionne <strong>Problème ressenti / exprimé / réel</strong> (on ne peut pas distinguer les niveaux du problème sans avoir d'abord distingué idée et opportunité) et <strong>Biais du fondateur</strong> (le biais est précisément ce qui empêche de faire cette distinction). Il précède aussi directement les utilisateurs <span class="ref-fiche">→ C02</span> : comprendre si c'est une opportunité, c'est comprendre pour qui.</p>`,
        choice: {
          kind: "free",
          html: `<p>Il n'y a pas d'alternative à cette distinction — c'est un filtre cognitif, pas un outil parmi d'autres. Ce qui varie, c'est <strong>la méthode pour faire le tri</strong> :</p><p><strong>Test de la douleur :</strong> quelqu'un paie-t-il déjà pour résoudre ce problème, même avec une solution imparfaite ? Si oui, c'est une opportunité. Si non, c'est peut-être juste une idée.</p><p><strong>Test de la fréquence :</strong> ce problème arrive-t-il souvent dans la vie de quelqu'un, ou une fois tous les cinq ans ? Un problème rare, même douloureux, est rarement une bonne opportunité produit.</p><p><strong>Test de l'initiative :</strong> les gens ont-ils déjà essayé de résoudre ce problème eux-mêmes, avec des rustines, des tableurs, des workarounds ? Si oui, c'est un signal fort que le problème est réel.</p>`,
        },
        senior: `<p>Un product manager expérimenté ne demande pas "est-ce que c'est une bonne idée ?" — il demande "qui souffre de ce problème aujourd'hui, et comment le résout-il ?" Si personne ne souffre encore, ou si les gens s'en accommodent sans chercher de solution, il repart collecter des données avant de continuer.</p><p>Il sait aussi que <strong>l'enthousiasme d'une idée est inversement corrélé à la rigueur avec laquelle on la valide</strong>. Plus une idée paraît évidente, plus elle mérite d'être challengée — parce que l'évidence est souvent le signe d'un biais non interrogé.</p>`,
        errors: `<p><strong>Pattern 1 — La validation par le compliment :</strong> on montre l'idée à des amis ou collègues qui disent "super idée !" et on prend ça pour une validation. Les gens polis confirment les idées par défaut. Seuls les comportements réels (payer, s'inscrire, revenir) valident une opportunité.</p>
<p><strong>Pattern 2 — Le problème trop large :</strong> "les gens perdent du temps au travail" est un observation, pas un problème actionnable. Un problème doit être suffisamment précis pour qu'on puisse imaginer une solution spécifique. Sans précision, on construit une solution générique qui ne résout rien vraiment.</p>
<p><strong>Pattern 3 — La solution cherche son problème :</strong> on a une technologie ou une idée de feature, et on cherche ensuite un problème auquel la coller. Le résultat est toujours un produit qui impressionne en démo mais que personne n'utilise au quotidien.</p>`,
        invariants: `<p>Les outils pour évaluer les opportunités changent — lean canvas, jobs-to-be-done, problem interviews. <strong>Ce qui ne change pas : une opportunité n'existe que si le problème existe indépendamment de ta solution.</strong> Si le problème disparaît dès qu'on enlève ta solution de l'équation, c'est que tu as inventé le problème en même temps que la solution.</p><p><strong>Ce qui change :</strong> les méthodes de validation (entretiens, landing pages, prototypes). <strong>Ce qui ne change pas :</strong> la nécessité de distinguer ce que les gens disent de ce qu'ils font.</p>`,
        practice: {
          exercices: [
            {
              titre: "Le test des trois questions",
              etapes: [
                "Formule ton idée en une phrase : 'Je veux construire X pour Y afin de Z'.",
                "Pose-toi la question : est-ce que Y souffre de ce problème aujourd'hui, sans ma solution ?",
                "Trouve deux ou trois personnes dans le profil Y et demande-leur comment elles gèrent ce problème actuellement — sans mentionner ta solution.",
                "Note leurs réponses : est-ce qu'elles ont déjà une façon de le gérer ? Est-ce qu'elles en parlent spontanément comme d'un vrai problème ?",
              ],
              output: "Une réponse claire à : est-ce une opportunité (le problème existe déjà) ou une idée (le problème n'existe que dans mon cadre) ?",
              critere: "Tu peux décrire comment les personnes interrogées gèrent ce problème aujourd'hui, sans avoir mentionné ta solution. Si tu ne peux pas, tu n'as pas encore validé l'opportunité.",
            },
          ],
          piege: "Poser des questions fermées qui orientent la réponse : 'Est-ce que tu trouves que X est un problème ?' donne presque toujours 'oui'. Pose des questions ouvertes sur le passé : 'La dernière fois que tu as eu ce problème, qu'est-ce que tu as fait ?'",
        },
        verification: [
          "Quelle est la différence entre une idée et une opportunité ? Donne un exemple de chacun.",
          "Tu as une idée d'app de gestion de plantes pour les gens qui voyagent souvent. Comment distingues-tu si c'est une opportunité réelle ou juste une idée ?",
          "Pourquoi l'enthousiasme des proches pour une idée n'est-il pas une validation d'opportunité ?",
        ],
      },
    },

    problemNiveaux: {
      id: "problemNiveaux",
      label: "Problème ressenti / exprimé / réel",
      icon: "🔍",
      kind: "modele",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les utilisateurs ne savent pas toujours ce qu'ils veulent — mais ils savent ce qu'ils ressentent. <strong>Le problème qu'ils expriment est souvent une interprétation du problème qu'ils ressentent, et rarement le problème réel qui les sous-tend.</strong> Construire sur le problème exprimé sans creuser donne des features inutilisées ou des solutions qui résolvent le symptôme mais pas la cause.</p>`,
        system: `<p>Ce nœud est le cadre analytique central de C01. Il s'appuie sur <strong>Idée vs Opportunité</strong> (pour savoir qu'il y a un problème) et alimente <strong>Les 5 pourquoi</strong> (pour creuser du ressenti vers le réel) et <strong>Douleur vs Préférence</strong> (pour évaluer la sévérité). Il fonde ensuite la compréhension utilisateur <span class="ref-fiche">→ C02</span> : comprendre le problème réel est indissociable de comprendre qui en souffre.</p>`,
        choice: {
          kind: "free",
          html: `<p>Ce modèle à trois niveaux (ressenti → exprimé → réel) n'a pas d'alternative directe. Ce qui varie, c'est la méthode pour passer d'un niveau à l'autre :</p>
<p><strong>Entretiens utilisateurs :</strong> la méthode la plus directe. On écoute ce qu'ils expriment, on observe ce qu'ils font, on infère le réel. Exige de savoir poser des questions sans orienter.</p>
<p><strong>Analyse comportementale :</strong> pour les produits existants — logs, heatmaps, enregistrements de sessions. Ce que les gens font révèle le problème réel mieux que ce qu'ils disent.</p>
<p><strong>Shadowing :</strong> observer les utilisateurs dans leur environnement naturel sans interférer. Révèle des problèmes que les gens n'expriment jamais parce qu'ils les considèrent comme normaux.</p>`,
        },
        senior: `<p>Un product manager expérimenté écoute ce que l'utilisateur dit, mais note mentalement la différence entre "ce qu'il dit" et "ce qu'il fait". <strong>Quand un utilisateur dit 'je veux un bouton pour exporter en PDF', le problème exprimé est 'je veux exporter'. Le problème réel est probablement 'je dois partager cette information avec quelqu'un qui n'a pas accès à l'outil'.</strong> La solution peut être un bouton PDF, un lien de partage, ou une intégration email — ça dépend du problème réel.</p>`,
        errors: `<p><strong>Pattern 1 — La feature demandée :</strong> l'utilisateur demande une feature spécifique, on la construit exactement telle quelle, et personne ne l'utilise. On a résolu le problème exprimé sans comprendre le problème réel — la feature répondait à un besoin qui n'était pas le vrai besoin.</p>
<p><strong>Pattern 2 — La généralisation prématurée :</strong> un utilisateur exprime un problème, on suppose que tous les utilisateurs ont le même problème réel, on construit une solution universelle. Chaque segment peut avoir un problème réel différent derrière le même problème exprimé.</p>
<p><strong>Pattern 3 — Le symptôme traité comme cause :</strong> on résout le problème ressenti (la frustration, l'inconfort) sans identifier sa source. L'utilisateur se sent mieux temporairement, mais le problème réel revient sous une autre forme.</p>`,
        invariants: `<p>Les techniques d'investigation changent — entretiens, analytics, A/B tests. <strong>Ce qui ne change pas : entre ce que les gens ressentent, ce qu'ils disent, et ce qu'ils font, c'est ce qu'ils font qui révèle le problème réel.</strong></p><p><strong>Ce qui change :</strong> les outils pour observer et analyser les comportements. <strong>Ce qui ne change pas :</strong> l'écart structurel entre le problème exprimé et le problème réel — il existera toujours, parce que les gens rationalisent après coup ce qu'ils font intuitivement.</p>`,
        practice: {
          exercices: [
            {
              titre: "Décortiquer un problème sur trois niveaux",
              etapes: [
                "Choisis un problème exprimé que tu as entendu (ou imagine-en un vraisemblable pour un contexte que tu connais).",
                "Formule le problème ressenti : quelle émotion ou friction déclenche l'expression de ce problème ?",
                "Formule le problème réel : quel besoin profond ou objectif sous-jacent explique ce ressenti ?",
                "Imagine deux solutions différentes : une qui répond au problème exprimé, une qui répond au problème réel. Laquelle est plus durable ?",
              ],
              output: "Un tableau à trois colonnes : problème ressenti / problème exprimé / problème réel, avec une solution possible pour chaque niveau.",
              critere: "La solution au problème réel rend la solution au problème exprimé inutile ou secondaire. Si ce n'est pas le cas, tu n'as pas encore trouvé le problème réel.",
            },
          ],
          piege: "Rester au niveau du problème exprimé parce que c'est plus confortable — il est précis, formulé, actionnable. Le problème réel demande de creuser, d'interroger, de remettre en question ce qu'on croit savoir. C'est un effort supplémentaire qui évite de construire la mauvaise chose.",
        },
        verification: [
          "Explique la différence entre un problème ressenti, exprimé, et réel avec un exemple concret.",
          "Un utilisateur te dit 'j'ai besoin d'une meilleure barre de recherche'. Comment identifies-tu le problème réel derrière cette demande ?",
          "Pourquoi résoudre le problème exprimé sans comprendre le problème réel crée-t-il des features inutilisées ?",
        ],
      },
    },

    biaisFondateur: {
      id: "biaisFondateur",
      label: "Biais du fondateur",
      icon: "🕶",
      kind: "diagnostic",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Presque tous les fondateurs de produits ont vécu le problème qu'ils veulent résoudre — ou croient l'avoir vécu. Cette proximité est une force (on comprend le problème de l'intérieur) et une faiblesse systémique : <strong>on confond son expérience personnelle avec l'expérience universelle.</strong> Le résultat est un produit conçu pour une version idéalisée de soi-même, pas pour les utilisateurs réels.</p>`,
        system: `<p>Le biais du fondateur contamine tous les autres nœuds de C01 et la compréhension des utilisateurs <span class="ref-fiche">→ C02</span>. Il déforme <strong>Idée vs Opportunité</strong> (on prend son propre enthousiasme pour une validation), <strong>Problème ressenti/exprimé/réel</strong> (on projette son propre problème réel sur tous les utilisateurs), et <strong>Hypothèses vs faits</strong> <span class="ref-fiche">→ C02</span> (on prend ses propres convictions pour des faits).</p>`,
        choice: {
          kind: "free",
          html: `<p>Il n'y a pas d'alternative à la prise de conscience du biais — c'est une condition préalable, pas une technique. Ce qui varie, c'est la façon de le contrecarrer :</p>
<p><strong>Entretiens avec des inconnus :</strong> parler à des gens qui ne te connaissent pas et qui n'ont aucune raison de te faire plaisir. Les amis valident, les inconnus challengent.</p>
<p><strong>Persona adverse :</strong> se forcer à décrire un utilisateur qui ne ressemble pas du tout à soi-même et tester si le produit a encore du sens pour lui.</p>
<p><strong>Kill your darlings :</strong> identifier la feature ou hypothèse à laquelle on tient le plus, et la tester en premier — parce que c'est là que le biais est le plus fort.</p>`,
        },
        senior: `<p>Un product manager expérimenté commence chaque projet en listant explicitement ses propres biais : ce qu'il croit être vrai sur le marché, les utilisateurs, et le problème. Il les traite comme des hypothèses à invalider, pas comme des données. <strong>Il sait que plus il est proche du problème, plus il doit s'efforcer de l'observer depuis l'extérieur.</strong></p><p>Il se méfie aussi du biais de confirmation dans l'analyse des retours utilisateurs : on entend ce qu'on veut entendre. Il prend des notes brutes, il enregistre, il relit.</p>`,
        errors: `<p><strong>Pattern 1 — L'utilisateur imaginaire :</strong> on design pour un utilisateur qui nous ressemble parfaitement — mêmes compétences techniques, même contexte d'usage, même tolérance à la complexité. Le produit est excellent pour cet utilisateur imaginaire et inaccessible pour les vrais utilisateurs.</p>
<p><strong>Pattern 2 — La validation sélective :</strong> on collecte des retours utilisateurs mais on n'entend que ceux qui confirment ce qu'on pense déjà. Les signaux négatifs sont rationalisés ("ils n'ont pas compris", "ce n'est pas notre cible"). Le biais opère même dans la phase de recherche.</p>
<p><strong>Pattern 3 — L'expertise comme prison :</strong> on a tellement d'expertise dans un domaine qu'on ne comprend plus comment un débutant perçoit le problème. On conçoit une solution évidente pour un expert et incompréhensible pour un novice.</p>`,
        invariants: `<p>Les outils de recherche changent — user interviews, surveys, analytics. <strong>Ce qui ne change pas : le biais du fondateur est structurel. Il ne disparaît pas avec l'expérience — il se déplace.</strong> Un fondateur expérimenté développe de nouveaux biais sur ce qui "marche toujours" basés sur ses succès passés.</p><p><strong>Ce qui change :</strong> les techniques pour détecter et corriger le biais. <strong>Ce qui ne change pas :</strong> la nécessité de les appliquer activement à chaque nouveau projet, même (surtout) quand on se croit exempt de biais.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cartographier ses propres biais",
              etapes: [
                "Choisis un projet ou une idée sur laquelle tu travailles (ou envisages de travailler).",
                "Liste 5 choses que tu crois être vraies sur les utilisateurs cibles ou le problème.",
                "Pour chacune, classe-la : est-ce un fait (tu as des données) ou une hypothèse (tu le crois mais tu ne l'as pas vérifié) ?",
                "Identifie les deux hypothèses les plus importantes pour le succès du projet — celles dont tout le reste dépend.",
                "Formule un test minimal pour chacune : comment pourrais-tu la valider ou l'invalider en moins d'une semaine ?",
              ],
              output: "Une liste de 5 croyances classées fait/hypothèse, avec les deux plus critiques identifiées et un test associé.",
              critere: "Tes deux hypothèses critiques sont formulées de façon à pouvoir être invalidées — si tu ne peux pas imaginer de résultat qui prouverait que tu as tort, la formulation n'est pas assez précise.",
            },
          ],
          piege: "Lister des hypothèses anodines pour éviter l'inconfort de confronter les vraies croyances. Les biais les plus dangereux sont ceux qu'on protège inconsciemment — ce sont eux qu'il faut lister en premier.",
        },
        verification: [
          "Pourquoi quelqu'un qui a vécu le problème qu'il veut résoudre est-il particulièrement sujet au biais du fondateur ?",
          "Tu lances une app de gestion de finances personnelles parce que tu as galéré avec ça toi-même. Quels biais spécifiques dois-tu surveiller ?",
          "Quel est le paradoxe du biais du fondateur : en quoi l'expertise dans un domaine est-elle à la fois un atout et un risque ?",
        ],
      },
    },

    cinqPourquoi: {
      id: "cinqPourquoi",
      label: "Les 5 pourquoi",
      icon: "❓",
      kind: "modele",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La plupart des analyses de problèmes s'arrêtent à la première explication plausible. <strong>Les 5 pourquoi forcent à descendre d'un niveau à chaque réponse, jusqu'à atteindre la cause racine plutôt que le symptôme.</strong> L'outil vient du manufacturing Toyota, mais s'applique identiquement à l'analyse de problèmes produit : le problème qu'un utilisateur exprime est rarement le problème qu'il faut résoudre.</p>`,
        system: `<p>Les 5 pourquoi sont l'outil opérationnel du nœud <strong>Problème ressenti/exprimé/réel</strong>. Ils permettent de passer du problème exprimé au problème réel. Ils s'appliquent aussi dans <strong>Douleur vs Préférence</strong> (pour évaluer la profondeur d'un problème) et dans la priorisation <span class="ref-fiche">→ C05</span>, afin d'éviter de prioriser des symptômes plutôt que des causes.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les 5 pourquoi ne sont pas le seul outil d'analyse causale — mais c'est le plus accessible et le plus rapide à appliquer. Les alternatives :</p>
<p><strong>Fishbone diagram (Ishikawa) :</strong> explore les causes en parallèle (méthodes, machines, personnes, matière...). Utile quand plusieurs causes racines coexistent. Plus long, mais plus exhaustif.</p>
<p><strong>Arbre des problèmes :</strong> représentation visuelle des relations cause-effet. Utile pour les problèmes complexes avec beaucoup d'interdépendances. Standard dans les projets de développement international.</p>
<p><strong>Règle :</strong> utilise les 5 pourquoi pour les analyses rapides et individuelles. Passe à une approche plus structurée quand le problème implique plusieurs équipes ou systèmes complexes.</p>`,
        },
        senior: `<p>Un product manager expérimenté utilise les 5 pourquoi comme un réflexe de conversation, pas comme un exercice formel. Quand un utilisateur dit "je n'arrive pas à trouver mes fichiers", il ne note pas "améliorer la recherche" — il pose un pourquoi. Et un autre. Jusqu'à comprendre si le vrai problème est l'organisation, la nomenclature, les droits d'accès, ou quelque chose d'entièrement différent.</p><p><strong>Il sait aussi quand s'arrêter avant cinq :</strong> parfois trois pourquoi suffisent. L'objectif est la cause actionnable, pas le nombre de niveaux.</p>`,
        errors: `<p><strong>Pattern 1 — Le pourquoi rhétorique :</strong> on pose les pourquoi mais on oriente les réponses vers la conclusion qu'on veut atteindre. L'outil devient une façon de légitimer une décision déjà prise plutôt qu'une vraie investigation.</p>
<p><strong>Pattern 2 — La cause unique :</strong> on s'arrête à la première cause racine trouvée. Souvent, plusieurs causes racines coexistent et se renforcent. S'arrêter à une seule donne une solution partielle.</p>
<p><strong>Pattern 3 — La cause hors de portée :</strong> on remonte jusqu'à une cause racine sur laquelle on n'a aucune prise (culture d'entreprise, politique nationale, nature humaine). On a trouvé la "vraie" cause, mais elle est inexploitable. Il faut remonter d'un niveau et chercher la cause actionnable.</p>`,
        invariants: `<p>La technique des 5 pourquoi a 80 ans et n'a pas changé. <strong>Ce qui ne change pas : une solution durable résout la cause, pas le symptôme.</strong> Résoudre le symptôme crée une solution à court terme qui ne fait que déplacer ou retarder le vrai problème.</p><p><strong>Ce qui change :</strong> le domaine d'application (produit, ops, support, code). <strong>Ce qui ne change pas :</strong> le réflexe de ne jamais accepter la première explication comme la cause racine.</p>`,
        practice: {
          exercices: [
            {
              titre: "Appliquer les 5 pourquoi à un problème concret",
              etapes: [
                "Choisis un problème que tu as observé ou vécu : un outil difficile à utiliser, un processus qui bugue, un comportement utilisateur inattendu.",
                "Formule le problème comme un fait observable : 'Les utilisateurs abandonnent à l'étape 3 du formulaire.'",
                "Pose 'pourquoi ?' à cette observation et formule une hypothèse de réponse.",
                "Pose 'pourquoi ?' à cette réponse. Répète jusqu'à 5 fois ou jusqu'à atteindre une cause actionnable.",
                "Identifie à quel niveau se situe la cause actionnable — pas forcément la plus profonde, mais celle sur laquelle tu peux agir.",
              ],
              output: "Une chaîne de 3 à 5 pourquoi avec une cause actionnable identifiée à la fin.",
              critere: "La cause identifiée est actionnable (tu peux faire quelque chose pour la changer) et expliquerait la résolution du problème si elle était traitée. Si la résolution de la cause ne résoudrait pas le problème, tu n'as pas encore trouvé la bonne cause.",
            },
          ],
          piege: "Confondre 'comment' et 'pourquoi'. 'Comment ça s'est passé ?' explore la séquence d'événements. 'Pourquoi ça s'est passé ?' cherche la cause. Les deux questions sont utiles, mais seul le 'pourquoi' mène à la cause racine.",
        },
        verification: [
          "Explique dans tes mots pourquoi s'arrêter à la première explication d'un problème est risqué.",
          "Un utilisateur dit 'votre app est lente'. Applique les 5 pourquoi à cette observation — quelles causes racines possibles pourrais-tu atteindre ?",
          "Quand doit-on s'arrêter avant d'avoir posé 5 pourquoi ? Quel est le vrai critère d'arrêt ?",
        ],
      },
    },

    douleurPreference: {
      id: "douleurPreference",
      label: "Douleur vs Préférence",
      icon: "⚡",
      kind: "diagnostic",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Deux idées peuvent recevoir le même accueil poli en entretien : "oui, ce serait pratique". Pourtant l'une déclenchera un changement d'habitude, l'autre sera oubliée dès que la conversation se termine. <strong>Une douleur est quelque chose que l'utilisateur ne peut pas ignorer — il doit le gérer, même mal, même avec des rustines.</strong> Une préférence est quelque chose qu'il aimerait bien avoir, mais sans lequel il vit très bien.</p>`,
        system: `<p>Ce nœud est le filtre final de C01 — après avoir identifié l'opportunité, compris les niveaux du problème, et appliqué les 5 pourquoi, il faut évaluer l'intensité. Il alimente directement la viabilité <span class="ref-fiche">→ C04</span> : une douleur forte sur un marché suffisant devient une opportunité défendable. Il alimente aussi la priorisation <span class="ref-fiche">→ C05</span> : on priorise d'abord les douleurs, jamais les préférences.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs cadres permettent d'évaluer l'intensité d'un problème :</p>
<p><strong>Le test du dollar :</strong> l'utilisateur paierait-il pour une solution, même imparfaite ? Si oui, c'est une douleur. Si "ça serait sympa mais non", c'est une préférence.</p>
<p><strong>Le test du workaround :</strong> l'utilisateur a-t-il déjà bricolé une solution ? Un tableur maison, un processus manuel, une extension Chrome qui fait mal le travail ? Les workarounds sont le signe le plus fort d'une douleur réelle.</p>
<p><strong>Le test de la fréquence × intensité :</strong> un problème léger mais quotidien peut valoir plus qu'un problème intense mais rare. La douleur totale est le produit des deux.</p>`,
        },
        senior: `<p>Un product manager expérimenté pose une question simple en entretien : <strong>"Qu'est-ce que tu fais aujourd'hui pour gérer ce problème ?"</strong> Si la réponse est "rien, ça ne me dérange pas vraiment", c'est une préférence. Si la réponse est "j'ai un fichier Excel que j'update tous les lundis matin pendant une heure", c'est une douleur.</p><p>Il sait aussi que les douleurs sont plus faciles à monétiser — les gens paient pour faire disparaître une douleur bien plus facilement que pour obtenir un plaisir supplémentaire.</p>`,
        errors: `<p><strong>Pattern 1 — La feature de confort :</strong> on construit quelque chose qui rend l'expérience plus agréable, pas plus nécessaire. Les utilisateurs l'apprécient quand on leur en parle, mais ne le cherchent pas activement. Le taux d'activation reste bas malgré un bon retour qualitatif.</p>
<p><strong>Pattern 2 — L'intensité surévaluée :</strong> dans les entretiens, les gens expriment les problèmes avec une intensité supérieure à leur comportement réel. "Je déteste ça" ne signifie pas "je paierais pour que ça change". Seul le comportement (payer, changer d'outil, bricoler) révèle l'intensité réelle.</p>
<p><strong>Pattern 3 — La douleur du segment marginal :</strong> on identifie une douleur réelle, mais elle ne concerne qu'un très petit segment d'utilisateurs. Le problème est réel pour eux, mais le marché adressable est trop petit pour construire un produit viable.</p>`,
        invariants: `<p>Les outils pour évaluer l'intensité d'un problème changent. <strong>Ce qui ne change pas : les utilisateurs ne changeront pas leurs habitudes pour une préférence. Ils changeront pour une douleur.</strong> La résistance au changement est inversement proportionnelle à l'intensité de la douleur.</p><p><strong>Ce qui change :</strong> les méthodes pour mesurer l'intensité (willingness to pay, behavioral data, churn analysis). <strong>Ce qui ne change pas :</strong> la distinction fondamentale entre ce qu'on aimerait avoir et ce dont on ne peut pas se passer.</p>`,
        practice: {
          exercices: [
            {
              titre: "Classer des problèmes sur l'axe douleur–préférence",
              etapes: [
                "Liste 5 problèmes liés à un domaine que tu connais (travail, loisir, étude).",
                "Pour chacun, pose-toi : est-ce que les gens ont déjà un workaround ? Lequel ?",
                "Évalue la fréquence (combien de fois par semaine ce problème se pose) et l'intensité (sur une échelle de 1 à 5, quel impact sur la productivité ou le bien-être).",
                "Classe les 5 problèmes de la douleur la plus forte à la préférence la plus légère.",
              ],
              output: "Un classement de 5 problèmes avec pour chacun : workaround existant, fréquence, intensité, et classification douleur/préférence.",
              critere: "Les problèmes classés comme 'douleur' ont tous un workaround existant. Si un problème classé 'douleur' n'a pas de workaround, soit tu as surestimé son intensité, soit les gens ont abandonné — ce qui est aussi une forme de workaround.",
            },
          ],
          piege: "Évaluer l'intensité par ce que les gens disent plutôt que par ce qu'ils font. 'J'en ai marre de ça' est une expression de frustration, pas une mesure d'intensité. Cherche les comportements : est-ce qu'ils ont investi du temps, de l'argent, ou de l'énergie pour contourner ce problème ?",
        },
        verification: [
          "Quelle est la différence entre une douleur et une préférence ? Pourquoi cette distinction est-elle critique avant de construire un produit ?",
          "Un utilisateur dit 'je trouverais ça pratique d'avoir une vue calendrier dans votre outil'. Est-ce une douleur ou une préférence ? Comment le détermines-tu ?",
          "Pourquoi les douleurs sont-elles plus faciles à monétiser que les préférences ? Quel principe psychologique est en jeu ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 280",
      nodes: [
        { id: "ideeOpportunite",  x: 30,  y: 108, w: 140, h: 65 },
        { id: "problemNiveaux",   x: 220, y: 40,  w: 140, h: 65 },
        { id: "biaisFondateur",   x: 220, y: 175, w: 140, h: 65 },
        { id: "cinqPourquoi",     x: 420, y: 108, w: 130, h: 65 },
        { id: "douleurPreference",x: 610, y: 108, w: 150, h: 65 },
      ],
      edges: [
        { x1: 170, y1: 130,  x2: 218, y2: 80,  label: "creuse" },
        { x1: 170, y1: 148,  x2: 218, y2: 195, label: "révèle" },
        { x1: 360, y1: 72,   x2: 418, y2: 130, label: "nourrit" },
        { x1: 360, y1: 205,  x2: 418, y2: 148, label: "filtre" },
        { x1: 550, y1: 140,  x2: 608, y2: 140, label: "évalue" },
      ],
    },
  },
});
