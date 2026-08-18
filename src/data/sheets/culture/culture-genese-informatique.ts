import { cultureSheet } from "./culture-common";

export const cultureGenesInformatique = cultureSheet({
  id: "culture-F01",
  number: 1,
  title: "Genèse et Histoire de l'Informatique",
  subtitle: "De la machine à calculer à l'ordinateur universel, d'ARPANET à Internet — comprendre d'où vient le monde numérique",
  badge: "Fiche F01",
  meta: ["6 nœuds"],
  readingTime: "35 min",
  description: "L'informatique n'a pas été inventée d'un coup par un génie solitaire. Elle est le résultat de décennies de problèmes réels — mathématiques, militaires, scientifiques — résolus par des équipes souvent anonymes. Comprendre cette histoire, la notion d'algorithme et sa représentation en flowchart, c'est comprendre pourquoi les outils qu'on utilise aujourd'hui ont la forme qu'ils ont.",
  accent: "modele",

  nodes: {
    originesMathematiques: {
      id: "originesMathematiques",
      label: "Les origines mathématiques",
      icon: "∑",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Avant d'être une industrie, l'informatique était une question de mathématiques : peut-on mécaniser le calcul ? Peut-on décrire formellement ce qu'est un algorithme ? Peut-on construire une machine capable de suivre n'importe quelle suite d'instructions ? Sans ces questions — posées par Leibniz, Boole, Babbage, puis Turing — aucun ordinateur n'aurait été possible. Ignorer cette origine, c'est traiter l'ordinateur comme un objet magique plutôt que comme la réponse à un problème précis.</p>`,
        system: `<p>Les fondements mathématiques de l'informatique conditionnent tout ce qui vient ensuite. L'algèbre booléenne de Boole (1854) est directement le substrat des circuits logiques de tout processeur moderne. La machine de Turing (1936) est le modèle théorique sur lequel repose la notion même de programme. Ces concepts précèdent la machine physique <span class="ref-fiche">→ ordinateurModerne</span> et expliquent pourquoi un ordinateur peut faire des choses aussi différentes qu'un traitement de texte et un jeu vidéo.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois moments fondateurs à retenir :</p>
<p><strong>Gottfried Leibniz (1679) :</strong> développe le système binaire et rêve d'une "machine à raisonner". Il comprend que le calcul peut être réduit à des opérations sur 0 et 1 — deux siècles avant que ça devienne utile.</p>
<p><strong>Charles Babbage & Ada Lovelace (1837–1843) :</strong> Babbage conçoit la Machine Analytique — premier concept d'ordinateur à usage général avec unité de calcul, mémoire et séquencement conditionnel. Lovelace écrit ce qu'on considère comme le premier programme. Mais la machine ne sera jamais construite — les mécanismes de l'époque ne permettent pas la précision requise.</p>
<p><strong>Alan Turing (1936) :</strong> définit formellement ce qu'est un algorithme via la "machine de Turing" — un modèle théorique qui peut simuler n'importe quel calcul. Il prouve aussi qu'il existe des problèmes qu'aucun algorithme ne peut résoudre (problème de l'arrêt). Ces deux résultats délimitent ce que l'informatique peut et ne peut pas faire.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que l'informatique théorique n'est pas séparée de la pratique quotidienne. La complexité algorithmique (O(n), O(n²)) que vous étudiez vient directement des travaux de Church et Turing des années 1930. Le fait qu'on ne puisse pas écrire un programme qui détecte parfaitement tous les virus informatiques est une conséquence directe du théorème de l'arrêt de Turing. Ces fondements expliquent des limites que vous rencontrerez en production.</p>`,
        errors: `<p><strong>Pattern 1 — L'ordinateur comme boîte noire :</strong> on utilise l'ordinateur sans comprendre le modèle de calcul qu'il implément. Conséquence : on ne comprend pas pourquoi certains problèmes sont fondamentalement "durs" à calculer, on ne comprend pas les limites de l'outil.</p>
<p><strong>Pattern 2 — Confondre invention et découverte :</strong> on croit qu'un génie a "inventé" l'ordinateur un beau jour. La réalité est une accumulation de travaux mathématiques sur 300 ans. Conséquence : on sous-estime l'effort collectif derrière les outils et on survalorise les figures individuelles.</p>
<p><strong>Pattern 3 — Ignorer les précédents :</strong> on réinvente des solutions à des problèmes déjà résolus faute de connaître l'histoire. L'informatique a une histoire dense de problèmes résolus — ne pas la connaître, c'est condamner à refaire le même chemin.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les langages, les architectures matérielles, les paradigmes de programmation. <strong>Ce qui ne change pas :</strong> les fondements mathématiques de l'informatique — algèbre booléenne, modèle de Turing, complexité algorithmique — restent valides quels que soient les outils. Un algorithme O(n²) sera toujours plus lent qu'un O(n log n) sur un grand jeu de données, sur n'importe quel ordinateur.</p>`,
        practice: {
          exercices: [
            {
              titre: "Retracer la chaîne de problèmes qui a produit l'ordinateur",
              etapes: [
                "Choisis un problème concret que tu résous avec un ordinateur aujourd'hui (ex: trier une liste, chercher dans une base de données, envoyer un email).",
                "Remonte la chaîne : quel concept mathématique ou logique rend ce problème traitable par une machine ?",
                "Trouve le nom du mathématicien ou informaticien qui a formalisé ce concept et à quelle décennie.",
                "Exprime en une phrase la continuité entre ce travail historique et ton outil quotidien.",
              ],
              output: "Une chaîne causale de 3 à 4 maillons reliant un problème mathématique du passé à une opération que tu fais quotidiennement.",
              critere: "La chaîne doit être causale — chaque maillon doit expliquer pourquoi le suivant existe.",
            },
          ],
          piege: "S'arrêter à des noms sans comprendre les problèmes. Turing est célèbre — mais ce qui importe, c'est le problème qu'il cherchait à résoudre : 'peut-on savoir à l'avance si un programme s'arrêtera ?'",
        },
        verification: [
          "Quel problème concret Alan Turing cherchait-il à résoudre en 1936, et en quoi ce problème a-t-il des implications pratiques sur ce qu'on peut ou ne peut pas programmer aujourd'hui ?",
          "Ada Lovelace est souvent citée comme 'première programmeuse'. En quoi ce titre est-il historiquement pertinent même si la Machine Analytique n'a jamais fonctionné, et qu'est-ce que cela dit sur la relation entre concept et implémentation en informatique ?",
          "Pourquoi le fait que Leibniz ait inventé le binaire en 1679 — deux siècles avant l'électronique — est-il une illustration de la relation entre mathématiques pures et ingénierie appliquée ?",
        ],
      },
    },

    ordinateurModerne: {
      id: "ordinateurModerne",
      label: "Création de l'ordinateur moderne",
      icon: "🖥",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Entre 1943 et 1955, le concept abstrait de Turing devient une machine physique réelle. Cette transition — du papier au silicium, des relais mécaniques aux transistors — n'était pas inévitable. Elle a été rendue possible par des contextes très précis : la Seconde Guerre mondiale, la course aux armements, les besoins de calcul balistique. Comprendre ces conditions, c'est comprendre pourquoi l'ordinateur a la forme qu'il a — et pourquoi il aurait pu être radicalement différent.</p>`,
        system: `<p>La création de l'ordinateur physique s'appuie sur les fondements mathématiques <span class="ref-fiche">→ originesMathematiques</span> et ouvre la voie à toute l'informatique moderne. L'architecture Von Neumann (1945) — données et programme dans la même mémoire — est encore le modèle dominant de tous les processeurs actuels. Comprendre cette architecture éclaire directement les choix d'architecture applicative <span class="ref-fiche">→ T03</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quatre moments constitutifs de l'ordinateur moderne :</p>
<p><strong>Colossus (1943, Bletchley Park) :</strong> premier ordinateur électronique programmable, construit pour déchiffrer les messages nazis. Classifié secret pendant 30 ans — on ne sait pas qu'il existe. Conséquence : d'autres pays "réinventent" l'ordinateur sans savoir qu'il existe déjà.</p>
<p><strong>ENIAC (1945, Pennsylvanie) :</strong> premier ordinateur électronique à usage général américain, 27 tonnes, 18 000 tubes à vide. Programmé en reconnectant physiquement des câbles — pas de programme stocké en mémoire. Révèle le besoin d'une architecture différente.</p>
<p><strong>Architecture Von Neumann (1945) :</strong> John Von Neumann propose de stocker le programme dans la mémoire au même titre que les données. Cette idée simple révolutionne tout : on peut changer ce que fait l'ordinateur sans le recâbler. C'est le fondement de tout ce qui suivra.</p>
<p><strong>Transistor et miniaturisation (1947–1960s) :</strong> le transistor remplace le tube à vide, 1000x plus petit et fiable. Intel (1968) industrialise le microprocesseur. L'ordinateur passe de la salle d'université au bureau, puis à la poche.</p>`,
        },
        senior: `<p>L'architecture Von Neumann — données et instructions dans la même mémoire — explique directement des problèmes de sécurité qu'on rencontre encore aujourd'hui : les buffer overflows, les injections de code, certaines attaques de type ROP (Return-Oriented Programming) sont des conséquences directes du fait que données et code partagent le même espace mémoire. Connaître l'origine d'une architecture, c'est comprendre ses failles structurelles.</p>`,
        errors: `<p><strong>Pattern 1 — Téléologie de l'histoire :</strong> croire que l'ordinateur devait inévitablement prendre la forme qu'il a. En réalité, d'autres architectures ont existé (machines à flux de données, architectures Harvard strictes) et certains problèmes d'aujourd'hui viendraient d'un choix différent en 1945.</p>
<p><strong>Pattern 2 — Attribution singulière :</strong> "Von Neumann a inventé l'ordinateur." En réalité, il a formalisé une idée qui émergait dans plusieurs groupes simultanément — Eckert, Mauchly, Turing travaillaient sur des concepts similaires. L'histoire de l'informatique est une histoire de convergences parallèles.</p>
<p><strong>Pattern 3 — Discontinuité perçue :</strong> croire que l'ordinateur est une rupture nette avec le passé. C'est une continuité : du boulier à la machine de Pascal, à la machine de Babbage, à ENIAC, chaque étape résout les limites de la précédente.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la technologie physique (tubes à vide → transistors → circuits intégrés → processeurs multi-cœurs), la taille, la vitesse, la consommation électrique. <strong>Ce qui ne change pas :</strong> l'architecture Von Neumann reste le modèle dominant — unité centrale, mémoire partagée pour données et instructions, entrées/sorties. Presque tous les ordinateurs que vous utiliserez suivent ce modèle.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier l'architecture Von Neumann dans un ordinateur moderne",
              etapes: [
                "Ouvre le gestionnaire de tâches ou Activity Monitor de ton ordinateur.",
                "Identifie les quatre composants de l'architecture Von Neumann : CPU (unité de calcul), RAM (mémoire partagée), stockage (mémoire persistante), entrées/sorties (clavier, réseau).",
                "Observe un programme en train d'utiliser la mémoire. Note que données (variables) et instructions (code) cohabitent dans la même RAM.",
                "Trouve un exemple concret où cette cohabitation crée un risque : cherche 'buffer overflow vulnerability' dans une CVE récente.",
              ],
              output: "Schéma annoté des composants Von Neumann sur ton propre ordinateur + un exemple de vulnérabilité liée à l'architecture.",
              critere: "Le schéma doit relier chaque composant abstrait (ALU, mémoire, I/O) à son équivalent physique ou logiciel observable sur ta machine.",
            },
          ],
          piege: "Se contenter de mémoriser les noms (ENIAC, Von Neumann) sans comprendre les problèmes qu'ils résolvaient. L'enjeu n'est pas de connaître l'histoire — c'est de comprendre pourquoi chaque choix architectural a été fait.",
        },
        verification: [
          "Quelle est la décision architecturale centrale de Von Neumann en 1945 et pourquoi elle a rendu obsolète le modèle de l'ENIAC qui nécessitait un recâblage physique pour changer de programme ?",
          "Un buffer overflow est une vulnérabilité où un programme écrit au-delà de la mémoire allouée et écrase d'autres données — parfois du code exécutable. Expliquez pourquoi cette classe de vulnérabilité est une conséquence directe de l'architecture Von Neumann et non un simple bug de programmation.",
          "La miniaturisation des transistors a suivi la loi de Moore (doublement tous les 18 mois) pendant 50 ans. Cette loi ralentit depuis 2015. Qu'est-ce que ça implique pour l'avenir des performances matérielles, et comment les développeurs doivent-ils adapter leurs attentes ?",
        ],
      },
    },

    creationInternet: {
      id: "creationInternet",
      label: "Création d'Internet",
      icon: "🌐",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Internet n'est pas une invention accidentelle ni un don tombé du ciel. C'est le résultat de décisions de design très précises, prises dans un contexte militaire (résister à une attaque nucléaire) puis académique (partager des ressources entre universités). Ces décisions — décentralisation, protocoles ouverts, routage par paquets — ont des conséquences directes sur ce que vous pouvez et ne pouvez pas faire en développement web aujourd'hui. Un développeur qui ignore comment Internet fonctionne code avec des mains dans le dos.</p>`,
        system: `<p>Internet est le substrat sur lequel repose toute la pile technique que vous utilisez. Les protocoles TCP/IP que vous manipulez en <span class="ref-fiche">→ T07</span> (API et communication) ont été conçus sur ARPANET dans les années 1970. HTTPS que vous configurez en <span class="ref-fiche">→ P02</span> (sécurité) est une couche de sécurité posée sur ces protocoles. Comprendre la genèse éclaire les choix de design qui semblent arbitraires jusqu'à ce qu'on connaisse le contexte.</p>`,
        choice: {
          kind: "free",
          html: `<p>Cinq étapes constitutives d'Internet :</p>
<p><strong>ARPANET (1969) :</strong> le Département de la Défense américain finance un réseau décentralisé capable de survivre à la destruction partielle de ses nœuds. Premier message envoyé le 29 octobre 1969 : "lo" (tentative de "login" — le système a planté après deux lettres). La décentralisation n'est pas un choix esthétique, c'est une exigence militaire.</p>
<p><strong>TCP/IP (1974, Cerf & Kahn) :</strong> Vint Cerf et Bob Kahn définissent le protocole qui permet à des réseaux hétérogènes de communiquer. IP gère l'adressage et le routage, TCP garantit la fiabilité de la transmission. Ce duo de protocoles devient le langage commun de tous les réseaux — c'est encore le fondement d'Internet aujourd'hui.</p>
<p><strong>DNS (1983) :</strong> Paul Mockapetris invente le Domain Name System — le système qui traduit "google.com" en adresse IP. Avant le DNS, un fichier texte listait tous les ordinateurs d'Internet. À 1000 machines, le système atteignait ses limites.</p>
<p><strong>World Wide Web (1989–1991, Berners-Lee) :</strong> Tim Berners-Lee au CERN invente le Web — HTML, HTTP, URLs — pour partager des documents entre physiciens. Internet existait déjà ; le Web est une application qui tourne dessus. La confusion entre Internet et le Web est encore très répandue.</p>
<p><strong>Commercialisation (1993–1995) :</strong> Netscape et le premier navigateur grand public, suppression de l'interdiction d'usage commercial d'Internet. L'infrastructure académique et militaire devient le substrat de l'économie mondiale.</p>`,
        },
        senior: `<p>Connaître la genèse d'Internet explique des comportements que vous rencontrez en production. Le fait qu'HTTP soit "stateless" (sans état entre deux requêtes) vient du modèle de document du Web de Berners-Lee — un document HTML ne supposait pas de session persistante. C'est pourquoi on a inventé les cookies, les sessions, les JWT : pour palier cette décision de design originale. Chaque couche de complexité ajoutée au-dessus d'HTTP est une réponse à une limitation du modèle originel.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre Internet et le Web :</strong> Internet est l'infrastructure réseau (câbles, routeurs, protocoles TCP/IP). Le Web est une application qui tourne sur Internet, comme le sont l'email, SSH, les jeux en ligne. Confondre les deux, c'est comme confondre le réseau électrique et les appareils qui y sont branchés.</p>
<p><strong>Pattern 2 — Croire qu'HTTP est simple :</strong> HTTP semble simple (requête/réponse), mais ses implications sont profondes. Stateless, connectionless, text-based — ces caractéristiques ont des conséquences architecturales majeures sur tout ce qu'on construit. Les "simplifier" dans l'implémentation crée des problèmes de sécurité et de performance.</p>
<p><strong>Pattern 3 — Prendre la décentralisation pour acquise :</strong> Internet a été conçu pour être décentralisé, mais son évolution tend vers la centralisation (GAFAM contrôlent la majorité du trafic). Comprendre cette tension aide à comprendre les débats actuels sur la neutralité du net, le RGPD, la souveraineté numérique.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les protocoles de couche application (HTTP/1.1 → HTTP/2 → HTTP/3), les technologies de transport (fibre, 5G, satellite), les noms de domaine et leur gouvernance. <strong>Ce qui ne change pas :</strong> le modèle fondamental d'Internet — adressage IP, routage distribué, protocoles ouverts et interopérables — est stable depuis 1974. HTTP/3 tourne sur QUIC plutôt que TCP, mais le modèle client-serveur de requête/réponse reste intact.</p>`,
        practice: {
          exercices: [
            {
              titre: "Tracer le chemin d'une requête HTTP",
              etapes: [
                "Ouvre les DevTools de ton navigateur (onglet Network) sur n'importe quel site.",
                "Observe une requête HTTP : identifie l'URL (couche application), l'adresse IP de destination (couche réseau), le code de statut (couche protocole).",
                "Lance `traceroute google.com` (ou `tracert` sous Windows) dans un terminal. Observe les nœuds intermédiaires par lesquels ta requête passe.",
                "Compte le nombre de sauts. Chaque saut est un routeur indépendant qui décide de la prochaine destination — c'est le routage distribué d'ARPANET en action.",
                "Ouvre `nslookup google.com` : observe la traduction DNS du nom en adresse IP.",
              ],
              output: "Schéma annotant les couches traversées par une requête réelle : DNS → IP → TCP → HTTP.",
              critere: "Chaque couche du schéma doit être reliée à un protocole nommé et à une décision de design historique qui explique son existence.",
            },
          ],
          piege: "Croire que comprendre les couches réseau est utile seulement pour les administrateurs système. En réalité, un développeur web qui ignore TCP/IP, DNS et HTTP produit du code avec des hypothèses fausses sur la latence, la fiabilité et la sécurité.",
        },
        verification: [
          "Quelle est la différence entre Internet et le World Wide Web, et pourquoi cette distinction est-elle importante pour comprendre ce qui se passe quand vous utilisez `fetch()` dans JavaScript ?",
          "HTTP est un protocole 'stateless'. Expliquez ce que cela signifie concrètement, pourquoi ce choix a été fait en 1991, et quelles technologies ont été inventées pour compenser cette limitation dans le développement web moderne.",
          "ARPANET a été conçu pour être décentralisé et résilient. Pourtant, aujourd'hui, une panne chez AWS affecte des milliers de sites simultanément. Comment expliquer cette contradiction, et qu'est-ce que ça implique pour l'architecture d'un service web que vous déployez ?",
        ],
      },
    },

    evolutionsFutures: {
      id: "evolutionsFutures",
      label: "Informatique moderne et évolutions",
      icon: "🔭",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>L'informatique des années 2020 n'est pas une progression linéaire de celle des années 1980 — c'est une rupture sur plusieurs axes simultanément : la fin de la loi de Moore, l'émergence de l'IA générative, l'informatique distribuée à l'échelle mondiale, les interfaces au-delà de l'écran. Un développeur qui comprend ces ruptures peut anticiper les compétences qu'il aura besoin de développer. Celui qui l'ignore sera toujours en retard d'une révolution.</p>`,
        system: `<p>L'informatique moderne s'appuie sur toute la genèse précédente <span class="ref-fiche">→ ordinateurModerne</span> <span class="ref-fiche">→ creationInternet</span> et influence directement les pratiques de développement contemporaines. Le cloud computing n'est qu'ARPANET industrialisé. L'IA générative n'est qu'un algorithme de Turing ultra-optimisé. La compréhension des évolutions passe par la compréhension des ruptures par rapport aux modèles existants.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quatre ruptures majeures de l'informatique contemporaine :</p>
<p><strong>La fin de la loi de Moore :</strong> depuis 2015, les transistors ne se miniaturisent plus au même rythme. La puissance de calcul progresse maintenant par la parallélisation (plus de cœurs, GPU, NPU) plutôt que par la vitesse d'horloge. Implication directe pour les développeurs : le code séquentiel n'accélèrera plus automatiquement — il faut apprendre la concurrence et le parallélisme.</p>
<p><strong>Le cloud comme infrastructure :</strong> AWS (2006), Azure, GCP ont externalisé l'infrastructure. Un développeur junior peut déployer une app mondiale depuis son laptop. Mais la complexité n'a pas disparu — elle a été déplacée dans les abstractions : conteneurs, orchestration, serverless. Comprendre ces abstractions demande de comprendre ce qu'elles cachent.</p>
<p><strong>L'IA générative (2022–) :</strong> GPT-3, puis GPT-4, puis les LLMs open source ont changé ce que "produire du texte, du code, des images" signifie. L'IA n'est pas une nouvelle informatique — c'est la même, appliquée à des problèmes de reconnaissance de patterns à très grande échelle. Mais elle reconfigure qui fait quoi dans le cycle de développement.</p>
<p><strong>L'informatique ambiante :</strong> IoT, wearables, interfaces vocales, XR (réalité mixte) — l'écran rectangulaire n'est plus le seul terminal. Les développeurs web doivent penser à des interfaces qui n'ont pas de pointeur, pas de clavier, pas de résolution fixe.</p>`,
        },
        senior: `<p>Un développeur expérimenté ne suit pas les tendances technologiques — il évalue leur fond. Quand une nouvelle technologie émerge, il pose deux questions : quel problème réel résout-elle mieux que l'existant ? Quelle dette, quelle complexité ou quelle dépendance introduit-elle ? L'IA générative est puissante pour la génération de code boilerplate et la reformulation — elle est médiocre pour le raisonnement complexe et la compréhension de contexte profond. Utiliser l'outil sans comprendre ses limites, c'est compter sur la magie.</p>`,
        errors: `<p><strong>Pattern 1 — Hype sans fond :</strong> adopter une technologie parce qu'elle est "tendance" sans évaluer si elle résout un problème réel dans son contexte. L'histoire de l'informatique est pavée de technologies promises comme révolutionnaires qui ont disparu (Metaverse de Meta, blockchain pour tout, XML comme lingua franca du Web).</p>
<p><strong>Pattern 2 — Résistance nostalgique :</strong> l'inverse — rejeter toute nouveauté parce que "ça marchait bien avant". Le cloud a remplacé les serveurs physiques pour de bonnes raisons. L'IA générative change certaines tâches de développement pour de bonnes raisons. La résistance par principe fait rater des gains réels.</p>
<p><strong>Pattern 3 — Absence de veille structurée :</strong> suivre Twitter/X et Hacker News n'est pas une veille — c'est une exposition au bruit. Une veille structurée <span class="ref-fiche">→ F02</span> distingue signal et bruit, tendance de fond et effet d'annonce.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les technologies dominantes, les paradigmes de déploiement, les outils de développement, les interfaces. <strong>Ce qui ne change pas :</strong> les problèmes fondamentaux que l'informatique résout — stocker, traiter, transmettre de l'information — restent les mêmes. Chaque nouvelle technologie est une réponse à l'une de ces trois fonctions sous de nouvelles contraintes (vitesse, échelle, coût, énergie).</p>`,
        practice: {
          exercices: [
            {
              titre: "Évaluer une tendance technologique par ses fondamentaux",
              etapes: [
                "Choisis une technologie ou tendance actuelle qui t'intéresse ou t'interroge (WebAssembly, edge computing, IA dans les IDE, quantum computing, etc.).",
                "Identifie le problème précis qu'elle prétend résoudre mieux que les solutions existantes.",
                "Cherche les limites actuelles : qu'est-ce que cette technologie ne peut pas faire ? Quelles sont les conditions dans lesquelles elle est efficace ?",
                "Trouve une technologie précédente qui promettait de résoudre un problème similaire et évalue ce qui a changé.",
              ],
              output: "Analyse en 4 points : problème résolu, avantage sur l'existant, limites connues, précédent historique comparable.",
              critere: "L'analyse doit reposer sur des exemples concrets et mesurables — pas sur des communications marketing ou des prédictions non étayées.",
            },
          ],
          piege: "Confondre ce qui est nouveau avec ce qui est important. WebAssembly existe depuis 2017 — ce n'est pas une nouveauté, c'est une technologie mature qui résout un problème précis. Les technologies qui durent sont celles qui résolvent de vrais problèmes, pas celles qui font le plus de bruit à leur lancement.",
        },
        verification: [
          "La loi de Moore ralentit depuis 2015. Quelles sont les deux stratégies principales par lesquelles l'industrie compense cette limite, et quelles implications cela a-t-il sur la façon dont les développeurs doivent écrire leur code pour en bénéficier ?",
          "Un client vous demande d'intégrer une IA générative pour 'automatiser la rédaction des rapports'. Quelles questions posez-vous avant d'accepter, et comment évaluez-vous si l'IA est la bonne solution pour ce problème précis ?",
          "Pourquoi chaque vague technologique (mainframes → PC → Web → mobile → cloud → IA) n'a pas remplacé la précédente mais s'est ajoutée à elle, et qu'est-ce que cela implique pour les compétences d'un développeur fullstack en 2025 ?",
        ],
      },
    },

    notiondAlgorithme: {
      id: "notiondAlgorithme",
      label: "La notion d'algorithme",
      icon: "⚙",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le mot "algorithme" est partout — dans les médias, dans les débats politiques, dans les conversations quotidiennes. Mais il est rarement compris correctement. Un algorithme n'est pas mystérieux, n'est pas magique et n'est pas propre à l'informatique — une recette de cuisine est un algorithme. Comprendre ce qu'est vraiment un algorithme, c'est comprendre ce que fait vraiment un programme, et donc comprendre ce qu'on peut attendre d'un ordinateur.</p>`,
        system: `<p>La notion d'algorithme est le pont entre les fondements mathématiques <span class="ref-fiche">→ originesMathematiques</span> et la pratique du développement. Tout ce qu'on écrit dans n'importe quel langage de programmation est un algorithme — une suite finie d'instructions précises produisant un résultat déterminé. Cette notion sous-tend l'architecture applicative <span class="ref-fiche">→ T03</span>, les tests <span class="ref-fiche">→ T09</span> et la mesure des performances <span class="ref-fiche">→ P03</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois propriétés qui définissent un algorithme :</p>
<p><strong>Finitude :</strong> un algorithme doit se terminer en un nombre fini d'étapes. Une boucle infinie n'est pas un algorithme — c'est un serveur web qui tourne indéfiniment (et c'est voulu), mais ce n'est pas la même chose.</p>
<p><strong>Précision :</strong> chaque instruction doit être non ambiguë. "Ajouter un peu de sel" n'est pas une instruction algorithmique. "Ajouter 5 grammes de sel" l'est. En programmation, "ajouter 1 à x" est précis — "améliorer la performance" ne l'est pas.</p>
<p><strong>Effectivité :</strong> chaque instruction doit être exécutable avec des ressources finies. Un algorithme qui demanderait de calculer toutes les décimales de π n'est pas effectif.</p>
<p>La complexité algorithmique (notation O grande) mesure combien de ressources (temps, mémoire) un algorithme consomme en fonction de la taille de l'entrée. Un algorithme O(n²) sur 1 million d'éléments sera 1 million de fois plus lent qu'un O(n) sur la même donnée — quelle que soit la vitesse du processeur.</p>`,
        },
        senior: `<p>Un développeur expérimenté pense en termes de complexité algorithmique avant d'optimiser. Une requête SQL avec un plan d'exécution O(n²) sur 10 millions de lignes ne sera jamais sauvée par un meilleur serveur. Ajouter un index (O(log n)) résout le problème structurellement. La différence entre un développeur junior et un senior se voit souvent là : le junior optimise le code, le senior optimise l'algorithme.</p>`,
        errors: `<p><strong>Pattern 1 — Optimisation prématurée :</strong> on optimise le code avant d'avoir mesuré où est le goulot. Conséquence : on optimise des parties non critiques pendant que le vrai problème algorithmique reste intact.</p>
<p><strong>Pattern 2 — Confondre algorithme et programme :</strong> un algorithme est une description abstraite d'une méthode de résolution. Un programme est une implémentation de cet algorithme dans un langage spécifique. Le même algorithme de tri peut s'implémenter en Python, en Rust ou en JavaScript — sa complexité reste la même.</p>
<p><strong>Pattern 3 — Ignorer la complexité en espace :</strong> on optimise le temps d'exécution (CPU) sans mesurer la mémoire consommée. Une solution O(1) en temps mais O(n²) en espace peut être impossible à exécuter sur des données réelles.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les langages de programmation, les frameworks, les paradigmes (impératif, fonctionnel, réactif). <strong>Ce qui ne change pas :</strong> la complexité algorithmique d'un algorithme est indépendante du langage et de la machine. Un algorithme de tri bulle reste O(n²) en Python, en Rust et en assembleur.</p>`,
        practice: {
          exercices: [
            {
              titre: "Mesurer la complexité d'une opération réelle",
              etapes: [
                "Prends une opération de ton projet : un filtrage de liste, une recherche dans une collection, un tri.",
                "Estime sa complexité en notation O : combien d'opérations effectue-t-elle pour n éléments ?",
                "Mesure le temps réel avec 100, 1000, 10 000 éléments et trace la courbe.",
                "Si la courbe est quadratique (O(n²)) ou pire, cherche une alternative algorithmique (index, structure de données différente, tri préalable).",
              ],
              output: "Courbe de performance avec 3 tailles de données + complexité estimée + alternative proposée si nécessaire.",
              critere: "La courbe doit correspondre à la complexité estimée. Si elle ne correspond pas, l'estimation ou la mesure est fausse.",
            },
          ],
          piege: "Croire que les ordinateurs modernes sont assez rapides pour rendre la complexité négligeable. Sur 10 éléments, O(n²) et O(n) sont imperceptibles. Sur 10 millions, la différence peut être de plusieurs heures contre quelques secondes.",
        },
        verification: [
          "Quelles sont les trois propriétés qui définissent un algorithme, et donnez un exemple concret de quelque chose qui ressemble à un algorithme mais n'en est pas un parce qu'il viole l'une de ces propriétés ?",
          "Votre base de données contient 5 millions d'utilisateurs. Une requête qui parcourt séquentiellement tous les enregistrements pour trouver un email (O(n)) prend 2 secondes. Avec un index B-tree (O(log n)), combien de temps prendra-t-elle approximativement, et pourquoi ajouter un meilleur serveur ne résoudrait pas le problème structurel ?",
          "La notation O(n) décrit la complexité 'dans le pire cas'. Pourquoi le cas moyen et le cas médian peuvent-ils être plus pertinents en pratique, et dans quelle situation le pire cas est-il la métrique correcte à optimiser ?",
        ],
      },
    },

    flowcharts: {
      id: "flowcharts",
      label: "Flowcharts et symboles",
      icon: "◇",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un algorithme peut être correct dans la tête de son auteur et rester incompréhensible pour les autres. Dès qu'un parcours contient plusieurs décisions — formulaire invalide, utilisateur connecté ou non, paiement accepté ou refusé — une description linéaire masque facilement une branche oubliée. Le flowchart rend le trajet visible avant que la syntaxe du code ne détourne l'attention.</p>`,
        system: `<p>Le flowchart représente graphiquement un algorithme <span class="ref-fiche">→ notiondAlgorithme</span>. Il prépare les conditions et boucles <span class="ref-fiche">→ F14</span>, puis facilite la conception de fonctions cohérentes <span class="ref-fiche">→ F21</span> et l'identification des scénarios à tester <span class="ref-fiche">→ T09</span>. Il ne remplace pas le code : il clarifie le flux que le code devra exprimer.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les symboles de base suffisent pour commencer :</p>
<p><strong>Ovale — début ou fin :</strong> délimite le point d'entrée et les sorties du parcours. Une fin explicite évite les chemins sans résultat.</p>
<p><strong>Rectangle — traitement :</strong> représente une action précise, par exemple <em>normaliser l'email</em> ou <em>calculer le total</em>.</p>
<p><strong>Losange — décision :</strong> pose une question dont chaque sortie est nommée, généralement <em>oui</em> et <em>non</em>. Exemple : <em>email valide ?</em></p>
<p><strong>Parallélogramme — entrée ou sortie :</strong> représente une donnée reçue ou produite, comme <em>saisir l'email</em> ou <em>afficher l'erreur</em>.</p>
<p><strong>Flèche — ordre d'exécution :</strong> relie les étapes et rend visibles les bifurcations comme les retours de boucle.</p>
<p><strong>Flowchart :</strong> pertinent pour expliquer visuellement un flux court avec décisions ou répétitions. <strong>Pseudo-code :</strong> préférable lorsque les transformations de données deviennent plus détaillées. <strong>Code :</strong> nécessaire pour l'implémentation exécutable. Sur un algorithme complexe, combiner un schéma global et du pseudo-code ciblé est souvent plus lisible qu'un flowchart immense.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise un flowchart pour réduire une incertitude précise, pas pour décorer une documentation. Il vérifie surtout les sorties de chaque losange, les chemins d'échec et les boucles qui reviennent en arrière. Si le diagramme devient illisible sur un écran, il le découpe par responsabilité : validation, authentification, paiement ou synchronisation mobile.</p>`,
        errors: `<p><strong>Pattern 1 — Le losange sans sortie nommée :</strong> on dessine une décision mais les flèches ne précisent pas quel chemin correspond à oui ou non. Le lecteur doit deviner la logique et peut l'inverser lors de l'implémentation.</p>
<p><strong>Pattern 2 — Le flowchart spaghetti :</strong> on place tout le produit dans un seul schéma parce qu'un diagramme semble plus simple que plusieurs documents. Les flèches se croisent, les responsabilités se mélangent et personne ne peut vérifier le parcours.</p>
<p><strong>Pattern 3 — Le schéma heureux :</strong> on représente uniquement le cas où tout fonctionne. Les entrées invalides, refus réseau, permissions absentes et tentatives répétées sont découverts trop tard dans le code ou les tests.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils de dessin, les conventions visuelles détaillées et le niveau de précision adapté à l'équipe. <strong>Ce qui ne change pas :</strong> une représentation utile rend explicites le début, la fin, l'ordre des traitements, les décisions, chaque branche importante et les retours éventuels.</p>`,
        practice: {
          exercices: [
            {
              titre: "Dessiner le flowchart d'une connexion mobile",
              etapes: [
                "Définis le début, la saisie de l'email et du mot de passe, puis la fin attendue du parcours.",
                "Ajoute un losange pour vérifier les champs vides et nomme clairement les sorties oui et non.",
                "Ajoute un traitement d'appel API, puis un losange pour distinguer succès, identifiants refusés et absence de réseau.",
                "Relie chaque échec à un message précis et indique si l'utilisateur peut corriger puis réessayer.",
                "Relis chaque chemin depuis le début jusqu'à une fin explicite et transforme un chemin en pseudo-code.",
              ],
              output: "Un flowchart de connexion mobile avec symboles cohérents, branches nommées et pseudo-code d'un chemin d'échec.",
              critere: "Chaque flèche issue d'une décision est nommée, chaque scénario atteint une sortie explicite et l'absence de réseau n'est pas confondue avec des identifiants invalides.",
            },
          ],
          piege: "Dessiner uniquement le succès. Sur mobile, le réseau indisponible et la correction après erreur font partie du parcours normal à représenter.",
        },
        verification: [
          "Quel problème un flowchart résout-il avant l'écriture du code, et quel rôle joue chaque symbole de base ?",
          "Un paiement mobile peut réussir, être refusé ou échouer faute de réseau. Comment représentes-tu ces trois sorties sans rendre le diagramme ambigu ?",
          "Quand faut-il préférer du pseudo-code ou plusieurs sous-diagrammes à un flowchart unique ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 1030 340",
      nodes: [
        { id: "originesMathematiques", x: 10, y: 100, w: 155, h: 65 },
        { id: "ordinateurModerne", x: 225, y: 40, w: 155, h: 65 },
        { id: "notiondAlgorithme", x: 225, y: 165, w: 145, h: 65 },
        { id: "creationInternet", x: 445, y: 100, w: 145, h: 65 },
        { id: "evolutionsFutures", x: 655, y: 100, w: 150, h: 65 },
        { id: "flowcharts", x: 445, y: 245, w: 160, h: 65 },
      ],
      edges: [
        { x1: 165, y1: 120, x2: 223, y2: 72, label: "fonde" },
        { x1: 165, y1: 148, x2: 223, y2: 197, label: "formalise" },
        { x1: 380, y1: 72, x2: 443, y2: 120, label: "connecte" },
        { x1: 370, y1: 197, x2: 443, y2: 148, label: "structure" },
        { x1: 590, y1: 132, x2: 653, y2: 132, label: "transforme" },
        { x1: 370, y1: 215, x2: 443, y2: 270, label: "se représente" },
      ],
    },
  },
});
