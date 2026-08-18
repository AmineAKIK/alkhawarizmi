import { cultureSheet } from "./culture-common";

export const cultureVeilleInformatique = cultureSheet({
  id: "culture-F02",
  number: 2,
  title: "Se Tenir Informé en Informatique",
  subtitle:
    "Comprendre pourquoi la veille est indispensable, comment la structurer et la rendre durable sans y passer sa vie",
  badge: "Fiche F02",
  meta: ["4 nœuds"],
  readingTime: "20 min",
  description:
    "L'informatique évolue plus vite que n'importe quel autre domaine professionnel. Un langage ou un framework peut passer de référence à obsolète en cinq ans. Sans méthode, la veille devient soit une source d'anxiété (syndrome FOMO), soit une perte de temps (consommer du bruit). Ce que cette fiche enseigne : distinguer signal et bruit, construire un système de veille soutenable, et développer un regard critique sur les tendances.",
  accent: "modele",

  nodes: {
    pourquoiLaVeille: {
      id: "pourquoiLaVeille",
      label: "Pourquoi la veille est indispensable",
      icon: "📡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un médecin qui cesserait de lire les revues médicales après ses études pratiquerait en 10 ans une médecine périmée. L'informatique va encore plus vite : des technologies majeures ont émergé, dominé et disparu dans la même décennie. Sans veille active, un développeur ne perd pas seulement des opportunités — il accumule des angles morts techniques qui se voient dans ses choix d'architecture, ses dépendances obsolètes et ses lacunes de sécurité.</p>`,
        system: `<p>La veille informatique s'appuie sur la compréhension des évolutions passées <span class="ref-fiche">→ F01</span> pour contextualiser les tendances actuelles. Elle alimente directement tous les choix techniques : architecture <span class="ref-fiche">→ T03</span>, sécurité <span class="ref-fiche">→ P02</span>, outils de collaboration <span class="ref-fiche">→ Co10</span>. Un développeur sans veille prend des décisions techniques dans un contexte figé alors que le contexte réel a évolué.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois raisons structurelles qui rendent la veille obligatoire, pas optionnelle :</p>
<p><strong>La dette de connaissance s'accumule silencieusement :</strong> contrairement à une dette technique visible dans le code, la dette de connaissance ne se voit pas jusqu'au moment où elle crée un problème réel — une vulnérabilité non corrigée parce qu'on n'a pas su qu'elle existait, un choix architectural dépassé parce qu'on ne connaissait pas les alternatives modernes.</p>
<p><strong>Les fondamentaux changent lentement, les outils changent vite :</strong> les principes de l'architecture logicielle bougent peu. Les outils, frameworks et pratiques recommandées changent tous les 2 à 5 ans. La veille doit distinguer ces deux niveaux : surveiller activement les outils, moins activement les principes.</p>
<p><strong>La veille est un filtre, pas un entonnoir :</strong> l'objectif n'est pas de tout lire — c'est impossible. L'objectif est de construire un système qui fait remonter ce qui est pertinent pour son contexte et laisse passer le bruit.</p>`,
        },
        senior: `<p>Un développeur expérimenté ne fait pas sa veille pour être à la mode — il la fait pour éviter de prendre des décisions sans connaître le contexte complet. Il sait qu'une technologie présentée comme révolutionnaire aujourd'hui a souvent un précédent des années 1990. Son filtre principal : "est-ce que ça résout un problème que j'ai vraiment ?" Si la réponse est non, la technologie peut attendre.</p>`,
        errors: `<p><strong>Pattern 1 — La veille comme entertainment :</strong> on consomme des articles, des vidéos, des podcasts de façon passive sans jamais transformer ce qu'on lit en connaissance opérationnelle. Résultat : sentiment d'être informé, mais incapacité à appliquer ce qu'on a "appris".</p>
<p><strong>Pattern 2 — Le FOMO technique :</strong> on essaie d'apprendre chaque nouveau framework dès son annonce. Résultat : on maîtrise rien en profondeur, on fragmente son attention, et on rate les fondamentaux qui durent.</p>
<p><strong>Pattern 3 — L'absence totale de veille :</strong> on se concentre exclusivement sur le projet en cours, sans jamais lever la tête. Résultat : 3 ans plus tard, les choix techniques faits "rationnellement" à l'époque sont devenus des handicaps visibles.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les sources, les plateformes, les formats de contenu, les technologies surveillées. <strong>Ce qui ne change pas :</strong> la nécessité de distinguer signal et bruit, de calibrer la profondeur d'investigation sur le niveau de maturité d'une technologie, et de transformer la lecture passive en connaissance active.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier ses angles morts techniques actuels",
              etapes: [
                "Liste les 5 décisions techniques majeures que tu as prises ou que tu utilises quotidiennement (choix de framework, base de données, système d'authentification, etc.).",
                "Pour chacune, pose la question : 'si je prenais cette décision aujourd'hui en partant de zéro, ferais-je le même choix ?'",
                "Cherche ce qui a changé dans cet espace depuis que la décision a été prise — nouvelles alternatives, nouvelles pratiques, nouveaux risques de sécurité.",
                "Identifie celui où ton manque de veille crée le plus de risque ou d'opportunité manquée.",
              ],
              output:
                "Liste de 5 décisions avec leur statut actuel (toujours solide / à réévaluer / obsolète) et une action concrète pour la décision la plus à risque.",
              critere:
                "Au moins une décision doit aboutir à une action concrète — un article à lire, un PoC à faire, une migration à planifier.",
            },
          ],
          piege:
            "Croire que son stack actuel est à jour parce qu'on utilise les dernières versions. Les numéros de version ne disent rien sur la pertinence architecturale d'un choix. React 18 est récent, mais est-ce encore le bon choix pour ton projet aujourd'hui ?",
        },
        verification: [
          "Quels sont les deux niveaux d'évolution distincts en informatique que la veille doit traiter différemment, et pourquoi les surveiller à la même fréquence serait contre-productif ?",
          "Un collègue dit : 'Je fais ma veille sur Twitter/X et Hacker News, je vois tout ce qui sort.' Identifiez deux problèmes structurels avec cette approche et proposez un ajustement concret.",
          "La 'dette de connaissance' s'accumule silencieusement. Donnez un exemple concret d'une situation où un développeur sans veille prendrait une mauvaise décision technique qui lui semblerait pourtant rationnelle avec ses connaissances actuelles.",
        ],
      },
    },

    construireUnSysteme: {
      id: "construireUnSysteme",
      label: "Construire un système de veille",
      icon: "🗂",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>La veille non structurée ressemble à une pile de magazines non lus : on accumule, on culpabilise, on finit par tout ignorer. Un système de veille résout ce problème en définissant à l'avance ce qu'on surveille, comment on collecte, et surtout comment on transforme ce qu'on lit en quelque chose d'actionnable. Sans système, la veille est un hobby. Avec un système, c'est une compétence professionnelle.</p>`,
        system: `<p>Un système de veille s'alimente de sources structurées et produit de la connaissance opérationnelle. Il est en relation directe avec les méthodes d'organisation personnelle <span class="ref-fiche">→ Co04</span> et avec la documentation vivante <span class="ref-fiche">→ Co03</span> — les insights de veille qui valent le coup d'être gardés doivent être documentés, pas seulement lus et oubliés.</p>`,
        choice: {
          kind: "free",
          html: `<p>Un système de veille minimal en quatre couches :</p>
<p><strong>Couche 1 — Sources primaires (à lire en profondeur) :</strong> documentation officielle des technologies utilisées, RFC et spécifications, blogs d'ingénierie des grandes équipes (engineering blogs de Stripe, Cloudflare, Basecamp, etc.). Lire lentement, prendre des notes. Fréquence : 1 à 2 fois par mois par source.</p>
<p><strong>Couche 2 — Agrégateurs de signal (scanner, ne pas tout lire) :</strong> Hacker News, newsletters techniques (The Pragmatic Engineer, ByteByteGo, TLDR Tech), podcasts sectoriels. L'objectif est de détecter ce qui mérite d'aller en couche 1. Fréquence : quotidien ou hebdomadaire, 15-30 minutes max.</p>
<p><strong>Couche 3 — Communautés et échanges directs :</strong> conférences (en présentiel ou replay), communautés locales, collègues. Le bruit y est plus élevé, mais les signaux faibles sur les tendances émergentes y apparaissent plus tôt qu'ailleurs.</p>
<p><strong>Couche 4 — Pratique délibérée :</strong> lire sans pratiquer ne produit pas de compétence. Pour chaque technologie jugée pertinente après les couches 1 et 2, un mini-projet ou PoC (proof of concept) d'une demi-journée est indispensable pour transformer la lecture en connaissance opérationnelle.</p>`,
        },
        senior: `<p>Un développeur senior sait que les meilleures informations de veille viennent souvent de post-mortems publics — Cloudflare, AWS, GitLab publient leurs incidents en détail. Ces documents contiennent plus de savoir tacite sur l'ingénierie réelle qu'une décennie de tutoriels. Lire un post-mortem bien écrit apprend comment des systèmes réels tombent, comment les équipes réagissent, et quelles décisions techniques ont créé la vulnérabilité.</p>`,
        errors: `<p><strong>Pattern 1 — Collecter sans filtrer :</strong> s'abonner à 50 newsletters, 20 chaînes YouTube et 100 RSS feeds. Résultat : inbox à 10 000 non-lus, culpabilité permanente, abandon total. Un bon système a 5 à 10 sources max par couche, jamais plus.</p>
<p><strong>Pattern 2 — Lire sans noter :</strong> on lit un article excellent, on "se souvient" d'avoir lu quelque chose là-dessus 6 mois plus tard mais impossible de retrouver. Sans système de notes, la veille ne crée pas de capital de connaissance — elle crée de l'éphémère.</p>
<p><strong>Pattern 3 — Veille sans application :</strong> on suit les tendances sans jamais les expérimenter. Le résultat est une connaissance superficielle qui s'effrite à la première question technique précise. La pratique transforme l'information en connaissance.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les plateformes (RSS, newsletters, podcasts, vidéos), les outils de prise de notes, les communautés actives sur tel ou tel sujet. <strong>Ce qui ne change pas :</strong> la structure en couches (signal faible → lecture profonde → pratique), la nécessité de filtrer avant de plonger, et le fait que la connaissance non actionnée disparaît.</p>`,
        practice: {
          exercices: [
            {
              titre: "Mettre en place un système de veille minimal et durable",
              etapes: [
                "Identifie 3 sujets techniques prioritaires pour toi en ce moment (ex: sécurité web, architecture microservices, TypeScript avancé).",
                "Pour chaque sujet, trouve une source primaire (documentation officielle ou blog d'ingénierie reconnu) et une source agrégateur (newsletter ou flux RSS).",
                "Configure un outil de lecture agrégée simple (Feedly, Readwise Reader, ou un simple dossier de bookmarks organisé) avec ces 6 sources max.",
                "Définis un créneau hebdomadaire de 30 minutes fixe pour scanner les agrégateurs et 1 heure mensuelle pour lire une source primaire en profondeur.",
                "Après 4 semaines, évalue : quelles sources ont produit des insights actionnables ? Retire celles qui n'en ont pas produit.",
              ],
              output:
                "Système de veille documenté : 6 sources organisées en 2 couches + calendrier récurrent + critère d'évaluation à 4 semaines.",
              critere:
                "Le système doit tenir dans une seule page et être soutenable sans effort cognitif quotidien supérieur à 15 minutes.",
            },
          ],
          piege:
            "Concevoir un système parfait qui demande 2 heures par jour. La veille durable est celle qui tient dans les contraintes réelles d'une semaine de travail chargée. Si le système casse dès la première semaine intense, c'est le système qui est faux, pas la semaine.",
        },
        verification: [
          "Quelle est la différence fonctionnelle entre une source 'primaire' et une source 'agrégateur' dans un système de veille, et pourquoi les traiter avec la même attention serait une erreur de priorisation ?",
          "Pourquoi un post-mortem publié par une équipe comme Cloudflare ou GitLab peut-il être une meilleure source de veille technique qu'un article de blog bien noté sur Medium, et quel type de connaissance y trouve-t-on spécifiquement ?",
          "Un développeur veut faire de la veille sur l'IA générative. Il s'abonne à 15 newsletters, 3 podcasts et suit 50 comptes sur X. Après 2 mois, il se sent submergé et arrête tout. Que s'est-il passé structurellement, et comment concevoir un système qui aurait évité cet abandon ?",
        ],
      },
    },

    lireLeSignal: {
      id: "lireLeSignal",
      label: "Lire le signal, ignorer le bruit",
      icon: "🔍",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Le volume de contenu technique produit chaque jour est physiquement impossible à consommer. Un développeur doit donc devenir un filtre, pas une éponge. La différence entre un signal et du bruit n'est pas dans la forme du contenu — c'est dans sa relation à un problème réel. Un article de 10 000 mots sur une technologie qui ne résout aucun de tes problèmes actuels est du bruit. Un tweet qui mentionne une CVE critique sur une librairie que tu utilises est un signal.</p>`,
        system: `<p>La capacité à distinguer signal et bruit s'appuie sur une connaissance historique de l'informatique <span class="ref-fiche">→ F01</span> — sans elle, tout semble nouveau et important. Elle alimente directement la capacité à évaluer les tendances <span class="ref-fiche">→ F01</span> et les choix d'évolution de son environnement de développement <span class="ref-fiche">→ T01</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Cinq filtres pour distinguer signal et bruit :</p>
<p><strong>Filtre 1 — Problème réel vs annonce :</strong> la technologie résout-elle un problème que tu as aujourd'hui ? Si la réponse est "peut-être un jour", c'est du bruit pour l'instant. Si c'est "oui, exactement ce que j'ai rencontré la semaine dernière", c'est un signal.</p>
<p><strong>Filtre 2 — Maturité :</strong> est-ce que la technologie est utilisée en production par des équipes comparables à la tienne ? Une annonce de v0.1 sur GitHub avec 200 étoiles n'est pas au même niveau de signal qu'un article d'engineering blog expliquant comment Stripe l'utilise à 100 000 requêtes/seconde.</p>
<p><strong>Filtre 3 — Précédent historique :</strong> y a-t-il déjà eu une technologie comparable ? Qu'est-ce qui a changé qui rend la nouvelle approche viable alors que la précédente a échoué ou stagné ?</p>
<p><strong>Filtre 4 — Consensus ou marketing :</strong> est-ce que plusieurs sources indépendantes convergent sur la même conclusion ? Une technologie citée par un seul vendor enthousiasmé est différente d'une technologie adoptée indépendamment par 10 équipes différentes.</p>
<p><strong>Filtre 5 — Coût d'ignorance :</strong> si tu ignores cette information pendant 6 mois, quel est le risque réel ? Pour une CVE critique sur une dépendance directe, le risque est immédiat. Pour un nouveau framework CSS, le risque est nul à court terme.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que les cycles de hype informatique sont prévisibles. Le cycle de Gartner (Peak of inflated expectations → Trough of disillusionment → Slope of enlightenment → Plateau of productivity) s'applique à quasiment toutes les technologies récentes. Identifier où se situe une technologie dans ce cycle permet d'ajuster le niveau d'attention : au sommet du hype, attendre. Dans le creux de déception, évaluer sérieusement si les cas d'usage réels correspondent aux promesses initiales. Sur le plateau de productivité, adopter si pertinent.</p>`,
        errors: `<p><strong>Pattern 1 — Biais de nouveauté :</strong> donner plus d'attention à ce qui est récent qu'à ce qui est mature et fiable. Une technologie de 2024 n'est pas meilleure qu'une de 2015 parce qu'elle est récente — elle est juste récente. La maturité et la stabilité ont une valeur que la nouveauté n'a pas.</p>
<p><strong>Pattern 2 — Ancrage sur les métriques sociales :</strong> décider qu'une technologie est importante parce qu'elle a beaucoup d'étoiles GitHub, de retweets ou de likes. Ces métriques mesurent la viralité, pas la valeur technique.</p>
<p><strong>Pattern 3 — Absence de deuxième opinion :</strong> adopter une conclusion sur une technologie après avoir lu un seul article enthousiaste. Toute affirmation forte sur une technologie mérite d'être croisée avec une source critique ou un cas d'usage négatif.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les technologies, les cycles de hype, les plateformes où les signaux émergent. <strong>Ce qui ne change pas :</strong> les critères de distinction entre signal et bruit restent les mêmes — problème réel, maturité, précédent historique, consensus indépendant, coût d'ignorance.</p>`,
        practice: {
          exercices: [
            {
              titre: "Appliquer les 5 filtres à une tendance actuelle",
              etapes: [
                "Choisis une tendance technologique dont tu entends parler en ce moment (edge computing, Bun, Htmx, Deno, Wasm, etc.).",
                "Applique les 5 filtres : problème réel pour toi ? Maturité suffisante ? Précédent historique ? Consensus indépendant ? Coût d'ignorer 6 mois ?",
                "Cherche activement une source critique de cette technologie — quelqu'un qui l'a testée et a eu des problèmes, ou qui argumente contre son adoption.",
                "Formule une décision claire : surveiller passivement / évaluer activement dans X semaines / ignorer pour l'instant.",
              ],
              output:
                "Fiche d'évaluation d'une tendance avec les 5 filtres appliqués et une décision explicite avec justification.",
              critere:
                "La décision doit être justifiée par les filtres — pas par le feeling ou l'enthousiasme. Une décision 'ignorer pour l'instant' bien justifiée vaut autant qu'une décision 'adopter'.",
            },
          ],
          piege:
            "Croire qu'ignorer une technologie est une décision passive ou paresseuse. C'est souvent la décision la plus difficile et la plus professionnelle — elle demande de résister à l'enthousiasme collectif et de rester ancré sur ses priorités réelles.",
        },
        verification: [
          "Le cycle de Gartner décrit des phases prévisibles pour l'adoption des technologies. Identifiez où se trouve une technologie récente que vous connaissez dans ce cycle, et expliquez comment cela doit modifier votre niveau d'attention sur elle.",
          "Deux sources indépendantes décrivent la même nouvelle technologie : l'une est un article de blog de l'entreprise qui l'a créée, l'autre est un post-mortem d'une startup qui l'a testée en production et abandonnée. Laquelle est plus utile pour évaluer la technologie, et pourquoi ?",
          "Pourquoi les 'étoiles GitHub' sont une mauvaise métrique pour évaluer si une technologie mérite votre attention, et quelle métrique serait plus pertinente pour évaluer sa maturité réelle ?",
        ],
      },
    },

    cultureContinue: {
      id: "cultureContinue",
      label: "L'apprentissage continu comme pratique",
      icon: "🌱",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>L'informatique est peut-être le seul domaine où les connaissances acquises en formation initiale ont une demi-vie aussi courte. Un ingénieur civil apprend des principes qui s'appliquent pendant 40 ans. Un développeur voit certains des outils qu'il a appris en formation disparaître ou se marginaliser en 5 ans. Cette réalité n'est pas stressante si on l'anticipe — elle devient stressante si on la découvre trop tard.</p>`,
        system: `<p>L'apprentissage continu est le méta-compétence qui conditionne toutes les autres. Il s'appuie sur la veille structurée <span class="ref-fiche">→ construireUnSysteme</span> et alimente directement la capacité à évoluer dans tous les domaines techniques <span class="ref-fiche">→ T01</span>. C'est aussi une composante de la valeur d'un développeur dans une équipe : quelqu'un qui apprend seul demande moins d'encadrement et génère plus d'insights partagés.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois modèles d'apprentissage continu et leurs contextes :</p>
<p><strong>Apprentissage par la pratique (70%) :</strong> la majorité de ce qu'on apprend vraiment vient du travail réel — des problèmes rencontrés, des erreurs faites, des solutions trouvées. Le projet en cours est la meilleure école. Ce modèle est gratuit en temps mais demande de la réflexion consciente sur ce qu'on fait.</p>
<p><strong>Apprentissage par l'échange (20%) :</strong> discuter avec des collègues plus expérimentés, faire des code reviews, participer à des communautés. Ce modèle est extrêmement dense en information — une conversation de 20 minutes avec quelqu'un qui a résolu le problème que vous avez peut valoir des semaines de recherche solitaire.</p>
<p><strong>Apprentissage formel (10%) :</strong> cours, livres, certifications, conférences. Ce modèle est le plus structuré mais aussi le plus coûteux en temps. Il est utile pour acquérir des fondamentaux solides sur un nouveau domaine, pas pour se tenir à jour sur les évolutions rapides.</p>
<p>La répartition 70/20/10 est une heuristique, pas une règle. Elle rappelle que la formation formelle seule (10%) est insuffisante et que la pratique (70%) est irremplaçable.</p>`,
        },
        senior: `<p>Un développeur expérimenté enseigne pour apprendre. Expliquer un concept à quelqu'un d'autre — dans une pull request review, une présentation interne, un article de blog — force une clarté et une précision qui révèle les zones d'ombre de sa propre compréhension. Le feynman technique : si tu ne peux pas expliquer simplement, tu ne comprends pas encore vraiment.</p>`,
        errors: `<p><strong>Pattern 1 — Apprendre sans pratiquer :</strong> accumuler des cours, des certifications, des livres sans les ancrer dans des projets réels. La connaissance théorique sans pratique ne se transfère pas dans la prise de décision réelle face à un problème d'architecture ou un bug de production.</p>
<p><strong>Pattern 2 — Pratiquer sans réfléchir :</strong> faire du code tous les jours sans jamais s'arrêter pour demander "est-ce que je fais ça bien ? y a-t-il une meilleure façon ?" La pratique non réflexive consolide les mauvaises habitudes autant que les bonnes.</p>
<p><strong>Pattern 3 — Apprendre seul en permanence :</strong> refuser de demander de l'aide par crainte de paraître ignorant. L'apprentissage par l'échange (20%) est souvent le plus dense — une équipe qui partage ses connaissances progresse exponentiellement plus vite qu'une collection d'individus qui apprennent chacun dans leur coin.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les technologies à apprendre, les formats de formation disponibles, les communautés actives. <strong>Ce qui ne change pas :</strong> la supériorité de la pratique réflexive sur la consommation passive, la valeur de l'échange avec des pairs, et le fait que personne ne peut apprendre à votre place.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire une routine d'apprentissage soutenable",
              etapes: [
                "Identifie ta compétence la plus importante à développer dans les 6 prochains mois pour ton contexte professionnel actuel.",
                "Décompose-la en sous-compétences concrètes (ex: 'maîtriser les WebSockets' → comprendre le protocole / implémenter côté serveur / gérer la reconnexion / tester).",
                "Pour chaque sous-compétence, identifie si l'apprentissage optimal est par la pratique (projet), l'échange (collègue, communauté) ou formel (doc, livre, cours).",
                "Planifie 30 minutes par jour ou 3 heures par semaine dédiées à cet apprentissage — dans ton agenda réel, pas dans un idéal.",
              ],
              output:
                "Plan d'apprentissage sur 6 semaines : 1 compétence, 3 à 5 sous-compétences, méthode par sous-compétence, créneau hebdomadaire fixe.",
              critere:
                "Le plan doit être réalisable dans tes contraintes réelles. Si tu n'as pas 3 heures par semaine disponibles, commence par 1 heure. Un plan à 1 heure tenu vaut 100 fois plus qu'un plan à 3 heures abandonné.",
            },
          ],
          piege:
            "Confondre 'apprendre en faisant' avec 'faire sans apprendre'. Coder tous les jours sans jamais lire de code d'autres développeurs, sans faire de review, sans questionner ses habitudes — c'est pratiquer, pas apprendre. La réflexion consciente est indispensable.",
        },
        verification: [
          "Le modèle 70/20/10 répartit l'apprentissage entre pratique, échange et formation formelle. Pourquoi est-ce que concentrer 80% de son temps de formation dans des cours et certifications est contre-productif, et quel type de connaissance ne peut s'acquérir que par la pratique ?",
          "Vous venez de passer 3 heures sur un bug que votre collègue aurait résolu en 15 minutes. Quelle décision aurait été professionnellement plus intelligente, et qu'est-ce que cela révèle sur le rapport entre l'apprentissage autonome et l'apprentissage par l'échange ?",
          "L'enseignement est décrit comme une méthode d'apprentissage pour soi-même. Expliquez le mécanisme par lequel expliquer un concept à quelqu'un d'autre améliore votre propre compréhension, et donnez un format concret (code review, doc, présentation) où vous pourriez appliquer ça cette semaine.",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "pourquoiLaVeille", x: 10, y: 100, w: 170, h: 65 },
        { id: "construireUnSysteme", x: 245, y: 40, w: 170, h: 65 },
        { id: "lireLeSignal", x: 245, y: 165, w: 155, h: 65 },
        { id: "cultureContinue", x: 490, y: 100, w: 175, h: 65 },
      ],
      edges: [
        { x1: 180, y1: 120, x2: 243, y2: 72, label: "structure" },
        { x1: 180, y1: 148, x2: 243, y2: 197, label: "filtre" },
        { x1: 415, y1: 72, x2: 488, y2: 120, label: "nourrit" },
        { x1: 400, y1: 197, x2: 488, y2: 148, label: "affine" },
      ],
    },
  },
});
