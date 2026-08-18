import { cultureSheet } from "./culture-common";

export const culturePopulaireInformatique = cultureSheet({
  id: "culture-F03",
  number: 3,
  title: "L'Informatique dans la Culture Populaire",
  subtitle:
    "Cinéma, littérature, séries — comment la fiction a façonné et déformé notre vision de l'informatique",
  badge: "Fiche F03",
  meta: ["3 nœuds"],
  readingTime: "15 min",
  description:
    "La fiction numérique n'est pas anecdotique. Elle façonne ce que les non-informaticiens croient de notre métier, elle influence les aspirations des débutants, et parfois elle anticipe ou catalyse des évolutions réelles. Mais elle déforme aussi systématiquement la réalité — vitesse, interfaces, omnipotence des hackers — avec des conséquences sur les attentes sociales envers l'informatique et sur les développeurs eux-mêmes.",
  accent: "modele",

  nodes: {
    informatiqueCinema: {
      id: "informatiqueCinema",
      label: "L'informatique au cinéma",
      icon: "🎬",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le cinéma est le premier vecteur par lequel la plupart des gens forment leur image mentale du développeur, du hacker et de l'informatique en général. Avant d'avoir jamais écrit une ligne de code, un futur développeur a vu des dizaines de films qui lui ont montré ce que "programmer" est censé ressembler. Ces représentations créent des attentes — sur soi-même, sur le métier, sur ce qui est possible — qu'il faut ensuite désapprendre ou nuancer.</p>`,
        system: `<p>La représentation cinématographique de l'informatique s'ancre dans l'histoire réelle <span class="ref-fiche">→ F01</span> qu'elle simplifie ou déforme pour les besoins dramatiques. Elle influence la culture populaire et crée un imaginaire collectif qui affecte le recrutement, les attentes des clients, et parfois la façon dont les développeurs se perçoivent eux-mêmes. Connaître ces représentations aide à identifier quand elles interfèrent dans des conversations professionnelles <span class="ref-fiche">→ Co02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Films et séries de référence, classés par leur rapport à la réalité :</p>
<p><strong>Représentations qui ont vieilli comme documents :</strong> <em>WarGames</em> (1983) — la guerre froide et les premiers réseaux d'ordinateurs. <em>Hackers</em> (1995) — absurde sur le plan technique mais capturant l'esprit de la scène hacker des années 90. <em>The Net</em> (1995) — montre une Amérique qui découvre Internet à travers le prisme du thriller. Ces films disent plus sur leurs époques que sur l'informatique.</p>
<p><strong>Représentations sérieuses qui ont contribué à la culture :</strong> <em>The Social Network</em> (2010, Fincher) — portrait du fondateur de Facebook qui a influencé toute une génération de startuppers. Inexact sur les détails mais pertinent sur la psychologie des fondateurs. <em>Steve Jobs</em> (2015, Boyle) — comprendre comment un homme a pensé la relation entre technologie et design. <em>The Imitation Game</em> (2014) — dramatisation de la vie de Turing, accessible mais historiquement simplifiée.</p>
<p><strong>Fictions qui ont anticipé ou influencé l'industrie :</strong> <em>2001 : L'Odyssée de l'espace</em> (1968, Kubrick) — HAL 9000 a posé les questions d'IA bien avant qu'elles soient techniques. <em>Minority Report</em> (2002) — les interfaces gestuelles ont inspiré des chercheurs en IHM. <em>Black Mirror</em> (série) — chaque épisode est un exercice de pensée sur les implications sociales d'une technologie précise, souvent utilisé dans les cours d'éthique.</p>
<p><strong>La déformation systématique :</strong> presque toute représentation cinématographique de l'informatique déforme la vitesse (hacker en 30 secondes), l'interface (visualisations 3D en temps réel), l'omniscience (accès à tout depuis n'importe où), et la solitude héroïque (un génie contre le système). La réalité est plus lente, plus collaborative, et beaucoup moins visuellement spectaculaire.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait identifier quand un client ou un manager a une représentation cinématographique de l'informatique qui crée des attentes irréalistes : "vous pouvez pas juste pirater leur système ?" ou "mais c'est pas juste une question de cliquer sur un bouton ?" Savoir d'où vient cette représentation — et l'avoir soi-même traversée — aide à la corriger avec patience plutôt qu'avec condescendance.</p>`,
        errors: `<p><strong>Pattern 1 — Rejeter toute la fiction comme inepte :</strong> critiquer systématiquement les inexactitudes techniques des films devant des non-développeurs. C'est contre-productif et pédant. La fiction n'a pas à être exacte pour être utile — elle pose des questions et crée des intuitions qui ont de la valeur même imprécises.</p>
<p><strong>Pattern 2 — Internaliser les représentations héroïques :</strong> croire qu'on devrait pouvoir tout résoudre rapidement, seul, de façon brillante, parce que c'est ce que font les héros à l'écran. Cette attente crée de l'imposture et de l'épuisement. Le développement réel est lent, collaboratif et rempli de débogage fastidieux.</p>
<p><strong>Pattern 3 — Ignorer la dimension culturelle :</strong> ne pas connaître ces références culturelles crée des angles morts dans les conversations avec des non-développeurs, des clients, ou même des collègues d'autres générations. La culture partagée — même imparfaite — est un outil de communication.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les films et séries de référence, les technologies représentées, les figures héroïques de chaque décennie. <strong>Ce qui ne change pas :</strong> la fiction dramatise et déforme systématiquement la réalité technique pour les besoins narratifs. Cette déformation est structurelle, pas accidentelle — la réalité du développement est trop lente et trop collaborative pour être dramatiquement efficace.</p>`,
        practice: {
          exercices: [
            {
              titre: "Analyser une représentation cinématographique de l'informatique",
              etapes: [
                "Choisis un film ou une série qui met l'informatique en scène (n'importe lequel que tu connais).",
                "Identifie 3 éléments qui sont techniquement inexacts ou déformés et explique pourquoi.",
                "Identifie 1 à 2 éléments qui capturent quelque chose de vrai — une tension, une réalité psychologique, un enjeu social réel derrière la déformation technique.",
                "Formule ce que ce film dit sur l'époque où il a été produit : qu'est-ce que les créateurs et le public craignaient ou espéraient de l'informatique à ce moment-là ?",
              ],
              output:
                "Analyse en 4 points : déformations techniques / vérités capturées malgré tout / lecture historique de l'époque / ce que ça change dans ta façon d'expliquer l'informatique à quelqu'un qui a vu ce film.",
              critere:
                "L'analyse doit aller au-delà du 'c'est faux techniquement' pour dire quelque chose sur la valeur culturelle de la représentation.",
            },
          ],
          piege:
            "Croire que maîtriser les références culturelles de l'informatique est superficiel ou inutile. Ces références structurent les attentes et les peurs des personnes avec qui tu travailles. Les ignorer, c'est se priver d'un outil de communication et d'empathie.",
        },
        verification: [
          "Quel mécanisme permet à un film techniquement inexact comme Hackers (1995) d'avoir une valeur culturelle réelle pour comprendre l'informatique de son époque, et qu'est-ce que ça dit sur la relation entre exactitude et utilité dans la fiction ?",
          "Un client vous dit : 'vous les développeurs, vous pouvez accéder à n'importe quel système si vous le voulez vraiment.' D'où vient cette représentation, et comment la corrigez-vous sans être condescendant ni passer pour quelqu'un qui cache ses capacités réelles ?",
          "Black Mirror est souvent utilisé dans les cours d'éthique technologique. Pourquoi une série de science-fiction peut-elle être pédagogiquement efficace pour discuter des implications de l'IA ou de la surveillance, alors qu'elle n'est pas techniquement précise ?",
        ],
      },
    },

    informatiqueLitterature: {
      id: "informatiqueLitterature",
      label: "Ressources littéraires en informatique",
      icon: "📚",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les livres techniques vieillissent mal — un manuel de programmation de 2010 est souvent obsolète. Mais deux catégories de livres ne vieillissent pas : les fondamentaux (algorithmique, architecture, conception) et les témoignages de praticiens sur comment ils pensent leur métier. Ces livres ne transmettent pas des faits — ils transmettent des modèles mentaux, des façons d'aborder les problèmes qui restent valides même quand les technologies ont changé.</p>`,
        system: `<p>Les ressources littéraires constituent le volet "formation profonde" de la veille <span class="ref-fiche">→ F02</span>. Elles complètent les sources à court cycle (articles, newsletters) par une pensée longue qui prend le temps d'argumenter. Elles alimentent directement la capacité à communiquer <span class="ref-fiche">→ Co02</span> et à travailler en équipe <span class="ref-fiche">→ Co01</span> avec une pensée articulée sur le métier.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quatre catégories de livres qui durent :</p>
<p><strong>Fondamentaux algorithmiques et mathématiques :</strong> <em>Introduction to Algorithms</em> (Cormen et al., CLRS) — la référence universitaire sur les algorithmes, dense mais exhaustive. <em>The Art of Computer Programming</em> (Knuth) — monument de rigueur mathématique, plus consulté que lu en entier. Pour les développeurs web, <em>Grokking Algorithms</em> (Bhargava) est une introduction accessible et illustrée.</p>
<p><strong>Architecture et conception logicielle :</strong> <em>Clean Code</em> (Robert C. Martin) — principes d'écriture de code lisible, très influent malgré ses controverses. <em>Designing Data-Intensive Applications</em> (Kleppmann) — la référence moderne sur les systèmes distribués et les bases de données. <em>A Philosophy of Software Design</em> (Ousterhout) — alternative intellectuelle sérieuse à Clean Code, plus axée sur la complexité.</p>
<p><strong>Culture et histoire :</strong> <em>The Pragmatic Programmer</em> (Hunt & Thomas) — essais sur la philosophie du développement, supérieur aux livres "pratiques" qui vieillissent vite. <em>The Mythical Man-Month</em> (Brooks, 1975) — pourquoi les projets logiciels prennent plus de temps que prévu. Vieux de 50 ans, toujours d'actualité. <em>Soul of a New Machine</em> (Kidder, 1981) — récit journalistique de la construction d'un miniordinateur chez Data General, Pulitzer 1982. Document humain sur ce que c'est de construire du matériel informatique.</p>
<p><strong>Fiction spéculative pertinente :</strong> <em>Neuromancer</em> (Gibson, 1984) — a inventé le terme "cyberspace" et préfiguré Internet avant qu'il existe. <em>Snow Crash</em> (Stephenson, 1992) — a inventé le terme "metaverse" et préfiguré les avatars et les mondes virtuels. <em>Le Démon et son double</em> (Egan) — SF dure qui explore les implications de l'IA et de la conscience artificielle avec rigueur scientifique.</p>`,
        },
        senior: `<p>Un développeur expérimenté lit les livres fondamentaux non pas pour les suivre à la lettre mais pour avoir une base commune de référence avec ses pairs. Quand un collègue dit "c'est un problème de couplage fort" ou "on viole le SRP", il fait référence à un vocabulaire partagé qui vient de ces livres. Sans cette base, les conversations sur l'architecture et la qualité du code deviennent des débats d'opinion. Avec cette base, ils deviennent des discussions sur des compromis mesurables.</p>`,
        errors: `<p><strong>Pattern 1 — Lire les manuels techniques récents au lieu des fondamentaux :</strong> acheter le dernier livre sur React ou Next.js plutôt que de lire DDIA ou The Pragmatic Programmer. Les manuels de framework vieillissent en 2 ans. Les fondamentaux durent 20 ans.</p>
<p><strong>Pattern 2 — Ne lire que de la non-fiction technique :</strong> la fiction spéculative (Gibson, Stephenson, Dick) a souvent anticipé des enjeux que l'informatique a mis 20 ans à formaliser. L'ignorer, c'est se priver d'un mode de pensée sur les implications à long terme de la technologie.</p>
<p><strong>Pattern 3 — Lire sans s'ancrer dans la pratique :</strong> accumuler les livres techniques sans les connecter à des problèmes réels. La lecture d'un livre comme DDIA est inutile si elle ne produit pas au moins une question sur un système qu'on construit ou sur une décision passée qu'on réévalue.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les livres récents pertinents, les langages d'exemples dans les livres fondamentaux, les nouvelles éditions. <strong>Ce qui ne change pas :</strong> les livres qui transmettent des modèles mentaux durent — les livres qui transmettent des syntaxes et des API vieillissent vite. Le critère de sélection reste le même : est-ce que ça m'apprend à penser, ou est-ce que ça m'apprend à utiliser un outil spécifique ?</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire sa liste de lecture de fond",
              etapes: [
                "Identifie ta lacune principale parmi les quatre catégories : algorithmique, architecture, culture du métier, ou fiction spéculative.",
                "Choisis un livre dans cette catégorie — pas le plus impressionnant, mais celui qui correspond à ton niveau actuel.",
                "Lis les deux premiers chapitres et note : qu'est-ce que ça modifie dans ma façon de penser un problème que j'ai aujourd'hui ?",
                "Si après deux chapitres tu n'as pas de réponse à cette question, le livre n'est pas le bon pour ton niveau actuel. Change.",
              ],
              output:
                "Un livre choisi + 2 chapitres lus + une modification concrète dans ta façon de penser un problème actuel.",
              critere:
                "La modification doit être concrète et reliée à un projet ou une décision réelle — pas une abstraction générale.",
            },
          ],
          piege:
            "Choisir les livres les plus cités sur les listes 'must-read' sans évaluer si leur niveau correspond au tien. CLRS est fondamental et difficile — le lire trop tôt sans les prérequis mathématiques est frustrant et contre-productif. Commencer par des livres accessibles comme Grokking Algorithms est une décision intelligente, pas une capitulation.",
        },
        verification: [
          "The Mythical Man-Month a été publié en 1975. Quel est son argument central sur la gestion des projets logiciels, et pourquoi cet argument est-il toujours d'actualité 50 ans plus tard malgré tous les changements dans les méthodes de développement ?",
          "Quelle est la différence entre lire un livre sur React et lire Designing Data-Intensive Applications en termes de durée de vie de la connaissance acquise, et comment cela doit-il influencer l'allocation de votre temps de lecture ?",
          "William Gibson a écrit Neuromancer en 1984 sans avoir jamais utilisé Internet. Le roman a pourtant préfiguré des concepts comme le cyberespace, les avatars et les réseaux décentralisés. Qu'est-ce que ça révèle sur la relation entre fiction spéculative et innovation technologique ?",
        ],
      },
    },

    imaginaireEtMetier: {
      id: "imaginaireEtMetier",
      label: "Imaginaire collectif et réalité du métier",
      icon: "🔭",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Il y a un écart entre l'imaginaire collectif du développeur — le génie solitaire, le hacker omnipotent, l'innovateur qui change le monde — et la réalité quotidienne du métier : beaucoup de lecture de documentation, de débogage fastidieux, de réunions, de compromis et de travail collaboratif. Cet écart n'est pas anodin : il crée du syndrome de l'imposteur chez les débutants, de la désillusion chez les juniors, et une mauvaise communication avec les non-développeurs.</p>`,
        system: `<p>L'imaginaire collectif de l'informatique est forgé par le cinéma <span class="ref-fiche">→ informatiqueCinema</span> et par une histoire souvent racontée comme une succession de génies. Il affecte directement la communication avec les parties prenantes <span class="ref-fiche">→ Co02</span> et la façon dont une équipe technique est perçue en dehors d'elle. Le comprendre aide à calibrer les attentes et à communiquer avec précision sur ce que l'informatique peut et ne peut pas faire.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quatre mythes fondateurs de l'imaginaire collectif et leur confrontation à la réalité :</p>
<p><strong>Mythe 1 — Le génie solitaire :</strong> Jobs, Gates, Zuckerberg, Torvalds — l'histoire de l'informatique est racontée à travers des individus. La réalité : Linux est l'œuvre de milliers de contributeurs. macOS repose sur des décennies de travail collectif. Le génie individuel existe mais il opère dans un écosystème collectif invisible dans la narration publique. Impact quotidien : les développeurs qui croient devoir tout résoudre seuls finissent épuisés et isolés.</p>
<p><strong>Mythe 2 — Le hacker omnipotent :</strong> la fiction montre des personnes qui "hackent" des systèmes en 30 secondes avec des interfaces 3D. La réalité : la sécurité est une discipline de rigueur, de patience et de profondeur — pas de virtuosité intuitive. Les vraies attaques prennent des semaines, utilisent principalement de l'ingénierie sociale, et exploitent des vulnérabilités documentées. Impact quotidien : les clients qui croient que "votre système peut être piraté en 5 minutes" ou à l'inverse que "ça ne peut pas nous arriver".</p>
<p><strong>Mythe 3 — La technologie comme solution universelle :</strong> l'imaginaire dominant depuis les années 2000 traite la technologie comme la réponse à tous les problèmes humains. La réalité : les problèmes organisationnels, politiques et humains ne se résolvent pas par une application. La technologie amplifie ce qui existe — elle amplifie les bonnes organisations et les mauvaises. Impact quotidien : des projets qui échouent parce qu'on a résolu un problème technique sans adresser le problème humain sous-jacent.</p>
<p><strong>Mythe 4 — Le développeur comme artiste incompris :</strong> la vision romantique du développeur génial incompris par le management. La réalité : un développeur qui ne communique pas, ne documente pas et ne collabore pas est objectivement moins efficace — pas plus "pur" ou "technique". La capacité à traduire la complexité technique en langage compréhensible est une compétence technique à part entière.</p>`,
        },
        senior: `<p>Un développeur expérimenté a traversé au moins une désillusion : découvrir que le métier est moins spectaculaire que l'imaginaire, ou à l'inverse que l'aspect humain et collaboratif est beaucoup plus riche qu'il ne l'anticipait. Cette désillusion, bien traversée, produit un ancrage dans la réalité qui rend le développeur plus efficace, plus communicant, et plus apte à tenir sur la durée sans épuisement.</p>`,
        errors: `<p><strong>Pattern 1 — Le syndrome de l'imposteur par l'imaginaire :</strong> se comparer aux représentations fictives ou médiatiques de développeurs brillants et conclure qu'on n'est pas "vraiment" développeur parce qu'on met du temps à déboguer, qu'on cherche sur Stack Overflow, qu'on ne comprend pas tout immédiatement.</p>
<p><strong>Pattern 2 — Alimenter l'imaginaire de toute-puissance :</strong> ne pas corriger les clients ou managers quand ils ont des attentes irréalistes parce que ça flatte l'ego d'être perçu comme omniscient. À court terme gratifiant, à long terme destructeur pour la relation et pour le projet.</p>
<p><strong>Pattern 3 — Rejeter la culture populaire comme inutile :</strong> ne pas s'y intéresser en pensant que c'est superficiel. Mais cette culture façonne les interlocuteurs quotidiens. Un développeur qui peut référencer The Social Network dans une conversation business et expliquer en quoi la réalité est différente crée plus de confiance et de compréhension qu'un développeur qui ignore ces références.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les figures mythiques de l'informatique de chaque décennie, les films et séries de référence, les fantasmes technologiques dominants. <strong>Ce qui ne change pas :</strong> l'écart entre l'imaginaire spectaculaire et la réalité collaborative et lente du développement. Cet écart est structurel — la narration dramatique ne peut pas représenter fidèlement un métier dont la valeur se construit lentement, collectivement et de façon invisible.</p>`,
        practice: {
          exercices: [
            {
              titre: "Décomposer son propre rapport à l'imaginaire du développeur",
              etapes: [
                "Rappelle-toi comment tu t'imaginais le métier de développeur avant d'y entrer (ou à tes tout débuts).",
                "Identifie 2 représentations qui t'ont attiré vers le métier — film, livre, personnage, histoire.",
                "Pour chacune, identifie ce qui était vrai et ce qui était faux ou exagéré.",
                "Formule comment ces représentations ont influencé tes attentes initiales et comment tu les as ajustées avec l'expérience.",
              ],
              output:
                "Réflexion écrite de 3 à 5 paragraphes : représentations initiales / écart avec la réalité / comment cet écart t'a façonné.",
              critere:
                "La réflexion doit être honnête — pas une célébration du métier ni une déploration de la désillusion, mais une analyse de comment les représentations influencent l'apprentissage et l'identité professionnelle.",
            },
          ],
          piege:
            "Croire que corriger l'imaginaire des clients et managers doit être une confrontation. L'approche efficace est additive : ajouter de la réalité à leur représentation sans invalider ce qu'elle contient de vrai — la passion, la créativité, l'impact réel de l'informatique sur le monde.",
        },
        verification: [
          "Le 'génie solitaire' est une narrative dominante de l'histoire de l'informatique (Jobs, Gates, Zuckerberg). En quoi cette narrative est-elle structurellement inexacte, et quelles conséquences concrètes cela a-t-il sur un développeur débutant qui l'internalise ?",
          "Un client vous dit qu'il a besoin d'une 'application simple qui va révolutionner notre secteur'. Identifiez deux représentations issues de l'imaginaire collectif qui expliquent cette formulation, et comment vous reformuleriez sa demande de façon productive.",
          "Le syndrome de l'imposteur est très répandu dans l'informatique. Comment l'écart entre l'imaginaire collectif du métier et sa réalité contribue-t-il à ce syndrome, et quelles représentations spécifiques le renforcent le plus ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "informatiqueCinema", x: 10, y: 100, w: 175, h: 65 },
        { id: "informatiqueLitterature", x: 340, y: 40, w: 175, h: 65 },
        { id: "imaginaireEtMetier", x: 620, y: 100, w: 175, h: 65 },
      ],
      edges: [
        { x1: 185, y1: 120, x2: 338, y2: 72, label: "forme" },
        { x1: 185, y1: 148, x2: 618, y2: 148, label: "construit" },
        { x1: 515, y1: 72, x2: 618, y2: 120, label: "ancre" },
      ],
    },
  },
});
