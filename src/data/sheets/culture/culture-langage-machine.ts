import { cultureSheet } from "./culture-common";

export const cultureLangageMachine = cultureSheet({
  id: "culture-F04",
  number: 4,
  title: "L'Ordinateur et Son Langage",
  subtitle:
    "Composants, binaire, assembleur — comprendre ce que fait vraiment la machine avant les abstractions",
  badge: "Fiche F04",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description:
    "Chaque ligne de code qu'un développeur web écrit finit par être exécutée par un processeur qui ne comprend qu'une chose : des 0 et des 1. Entre ces deux niveaux — le JavaScript d'un côté, le silicium de l'autre — il y a des couches d'abstraction que la plupart des développeurs traversent sans jamais s'arrêter pour comprendre. Cette fiche rend visibles ces couches et explique pourquoi les comprendre rend meilleur, même sans jamais écrire une ligne d'assembleur.",
  accent: "modele",

  nodes: {
    composantsOrdinateur: {
      id: "composantsOrdinateur",
      label: "Composants d'un ordinateur",
      icon: "🖥",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un développeur qui ne sait pas ce que fait un CPU, une RAM, un SSD ou une carte réseau prend des décisions techniques dans un vide. Pourquoi une opération en mémoire est-elle 1000x plus rapide qu'une lecture disque ? Pourquoi un accès réseau est-il imprévisible ? Pourquoi un algorithme O(n²) sur 10 millions d'éléments est-il impossible en pratique ? Ces questions ont des réponses physiques. Comprendre le matériel, c'est comprendre les limites réelles dans lesquelles le code s'exécute.</p>`,
        system: `<p>Les composants physiques sont le substrat de l'architecture Von Neumann <span class="ref-fiche">→ F01</span> qui structure tout l'informatique moderne. Comprendre le rôle de chaque composant éclaire directement les choix d'architecture applicative <span class="ref-fiche">→ T03</span>, la gestion des données <span class="ref-fiche">→ T06</span>, et les problèmes de performance <span class="ref-fiche">→ P03</span>. Un développeur qui comprend la hiérarchie mémoire prend de meilleures décisions de mise en cache sans jamais ouvrir un profiler.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les cinq composants fondamentaux et leur rôle concret :</p>
<p><strong>CPU (Central Processing Unit) :</strong> le processeur exécute les instructions une par une (ou plusieurs en parallèle sur les architectures multi-cœurs modernes). Un CPU moderne exécute des milliards d'instructions par seconde. Ce qui le ralentit : attendre des données — depuis la RAM, depuis le disque, depuis le réseau. Le CPU est presque toujours plus rapide que ses sources de données.</p>
<p><strong>RAM (Random Access Memory) :</strong> mémoire volatile (disparaît à l'extinction) où s'exécutent les programmes et où vivent les données en cours de traitement. L'accès RAM prend ~100 nanosecondes. C'est 100x plus lent que le cache L1 du CPU, mais 100 000x plus rapide qu'un SSD. Toute l'optimisation des applications web passe par "garder en RAM ce qu'on accède souvent".</p>
<p><strong>Stockage (SSD/HDD) :</strong> mémoire persistante (survit à l'extinction). Un SSD lit ~500 MB/s. Un disque dur (HDD) lit ~100 MB/s avec latence de rotation. La différence entre une application rapide et lente est souvent là : combien d'aller-retours disque fait-on par requête ?</p>
<p><strong>Réseau :</strong> la connexion entre machines. Une requête HTTP entre Paris et New York prend ~80ms minimum (vitesse de la lumière dans la fibre). Une requête locale sur un réseau d'entreprise : ~0.5ms. Le réseau est le composant le plus imprévisible — latence variable, pannes, congestion. Tout protocole réseau est une réponse à cette imprévisibilité.</p>
<p><strong>GPU (Graphics Processing Unit) :</strong> processeur massivement parallèle, conçu pour le rendu 3D mais maintenant omniprésent dans l'IA et le calcul scientifique. Un GPU a des milliers de petits cœurs simples là où un CPU a quelques cœurs complexes. Il excelle dans les calculs répétitifs sur de grandes données — c'est pourquoi l'entraînement de réseaux de neurones se fait sur GPU.</p>`,
        },
        senior: `<p>Un développeur expérimenté pense en termes de hiérarchie mémoire avant d'écrire du code. La règle empirique des ordres de grandeur : cache L1 (~0.5 ns), RAM (~100 ns), SSD (~100 µs), réseau local (~0.5 ms), réseau intercontinental (~100 ms). Quand une opération est lente, la première question est : "à quel niveau de la hiérarchie est-ce qu'on attend ?" Cette question oriente tout le reste.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre rapidité de développement et rapidité d'exécution :</strong> écrire du code qui "marche" sans réfléchir à combien de fois il accède au disque ou au réseau. Une page web qui fait 50 requêtes SQL en série n'est pas un problème de code — c'est un problème de compréhension de la hiérarchie mémoire.</p>
<p><strong>Pattern 2 — Ignorer la lokalité des données :</strong> stocker des données dont l'accès est fréquent sur le support le plus lent (disque ou réseau) par habitude ou par manque de connaissance des alternatives. Le cache n'est pas une optimisation avancée — c'est la conséquence directe de la différence de vitesse entre les composants.</p>
<p><strong>Pattern 3 — Sous-estimer le coût réseau :</strong> traiter un appel API externe comme équivalent à un appel de fonction locale. Un appel réseau peut durer de 1 à 1000 ms et peut échouer. Ignorer cette différence produit des architectures fragiles et des interfaces qui "bloquent".</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les vitesses absolues (les SSD NVMe sont 10x plus rapides que les SSD SATA), les architectures (ARM vs x86, CPU vs NPU), les tailles des mémoires. <strong>Ce qui ne change pas :</strong> la hiérarchie relative — le cache CPU est toujours plus rapide que la RAM, qui est toujours plus rapide que le stockage, qui est toujours plus rapide que le réseau. Les ordres de grandeur relatifs sont stables depuis 30 ans.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier les goulots d'étranglement d'une application réelle",
              etapes: [
                "Prends une application que tu développes ou utilises. Ouvre le gestionnaire de tâches ou Activity Monitor.",
                "Observe l'utilisation CPU, RAM et les entrées/sorties disque pendant une opération lente.",
                "Identifie lequel des composants est saturé : CPU élevé (calcul intensif) ? RAM élevée (trop de données en mémoire) ? I/O élevé (trop d'accès disque) ?",
                "Pour le composant identifié, cherche une modification architecturale qui réduit la pression dessus — pas une optimisation de code, mais un changement de stratégie (mise en cache, pagination, lazy loading, etc.).",
              ],
              output:
                "Analyse de goulot d'étranglement : composant saturé identifié + cause probable + modification architecturale proposée.",
              critere:
                "La modification proposée doit adresser le composant goulot, pas optimiser un composant qui n'est pas le problème.",
            },
          ],
          piege:
            "Chercher à optimiser le CPU quand le problème est le réseau, ou optimiser les requêtes SQL quand le problème est que les résultats ne sont jamais mis en cache. Diagnostiquer avant d'optimiser — le composant le plus lent détermine la stratégie.",
        },
        verification: [
          "Un accès RAM prend ~100 nanosecondes, un accès SSD ~100 microsecondes, un accès réseau local ~0.5 milliseconde. Exprimez ces différences en termes relatifs et expliquez pourquoi elles justifient l'existence des systèmes de cache dans les applications web.",
          "Votre application fait 30 requêtes SQL par page chargée. Chaque requête prend 5ms. La page est lente. En quoi ce problème est-il d'abord un problème de compréhension des composants matériels avant d'être un problème de code ?",
          "Pourquoi l'émergence du GPU comme accélérateur de calcul IA est-elle une conséquence directe de l'architecture matérielle (milliers de petits cœurs vs quelques gros cœurs CPU) plutôt qu'une rupture arbitraire avec le passé ?",
        ],
      },
    },

    binaireEtRepresentation: {
      id: "binaireEtRepresentation",
      label: "Le binaire et la représentation de l'information",
      icon: "⚡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un ordinateur ne stocke ni ne manipule du texte, des images ou des nombres — il manipule des séquences de 0 et de 1, des états électriques "haut" ou "bas". Tout le reste est une interprétation de ces états par des conventions — l'encodage ASCII dit que 01000001 représente la lettre "A", l'encodage UTF-8 dit comment représenter le caractère "é", le standard IEEE 754 dit comment représenter 3.14. Quand ces conventions se cassent, on obtient des bugs d'encodage, des dépassements d'entiers, des problèmes de virgule flottante — des bugs qui semblent mystérieux jusqu'à ce qu'on comprend d'où ils viennent.</p>`,
        system: `<p>Le binaire est le langage natif du matériel <span class="ref-fiche">→ composantsOrdinateur</span> et le fondement de toutes les abstractions au-dessus. Il conditionne les limites des types de données en programmation — pourquoi un entier 32 bits ne peut pas dépasser 2 147 483 647, pourquoi certains calculs en virgule flottante donnent des résultats "inattendus". Ces limites se manifestent dans les tests <span class="ref-fiche">→ T09</span> et dans les bugs de production.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois couches de représentation que tout développeur doit comprendre :</p>
<p><strong>Le système binaire :</strong> en base 2, chaque position vaut le double de la précédente (1, 2, 4, 8, 16...). Un bit stocke 0 ou 1. Un octet (8 bits) stocke 256 valeurs. Un entier 32 bits stocke 4 milliards de valeurs. Le binaire n'est pas une curiosité académique — chaque type de données dans votre code a une taille en bits qui détermine ses limites. Un entier JavaScript est un nombre flottant 64 bits — ce qui explique pourquoi <code>Number.MAX_SAFE_INTEGER</code> n'est pas 2^63 mais 2^53.</p>
<p><strong>Les encodages de texte :</strong> ASCII (1963) encode 128 caractères sur 7 bits — parfait pour l'anglais, inutile pour le reste du monde. Unicode a résolu ce problème en définissant un espace de 1,1 million de "code points". UTF-8 est l'encodage le plus utilisé sur le Web : il encode chaque caractère sur 1 à 4 octets selon sa plage. Quand un texte français s'affiche avec des "é" transformés en "Ã©", c'est un problème d'encodage — deux parties du système utilisent des conventions différentes pour interpréter les mêmes octets.</p>
<p><strong>Les nombres flottants (IEEE 754) :</strong> représenter 3.14 en binaire est impossible avec une précision parfaite, comme 1/3 est impossible en décimal sans arrondi. IEEE 754 définit comment arrondir. La conséquence : <code>0.1 + 0.2</code> en JavaScript donne <code>0.30000000000000004</code>. Ce n'est pas un bug JavaScript — c'est une conséquence directe de la représentation binaire des décimaux. Les applications financières ne doivent pas utiliser des flottants pour les montants — elles utilisent des entiers (en centimes) pour éviter ces erreurs d'arrondi.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait dans quels contextes les représentations binaires créent des problèmes invisibles : les comparaisons d'égalité sur des flottants, les dépassements d'entiers silencieux en JavaScript (qui passe à une notation scientifique imprécise pour les très grands nombres), les bugs d'encodage sur les caractères spéciaux dans les emails ou les API. Il teste ces cas limites parce qu'il sait qu'ils existent, pas parce qu'il les a trouvés par hasard.</p>`,
        errors: `<p><strong>Pattern 1 — Tester les valeurs normales, ignorer les limites :</strong> ne jamais tester ce qui se passe au-delà de <code>Number.MAX_SAFE_INTEGER</code>, avec des caractères UTF-8 non-ASCII, ou avec des nombres proches des limites d'un type. Ces bugs n'apparaissent pas en développement — ils apparaissent en production avec des données réelles.</p>
<p><strong>Pattern 2 — Stocker des montants en flottants :</strong> utiliser <code>float</code> ou <code>double</code> pour stocker des prix ou des montants bancaires. Les erreurs d'arrondi IEEE 754 sont inévitables et s'accumulent. La solution : entiers (en centimes), librairies de précision arbitraire, ou types <code>Decimal</code> selon le langage.</p>
<p><strong>Pattern 3 — Ignorer l'encodage à la frontière des systèmes :</strong> ne pas spécifier explicitement l'encodage (UTF-8) lors de l'écriture de fichiers, des appels API, ou de la lecture de bases de données. Les problèmes surviennent quand deux systèmes avec des encodages par défaut différents échangent des données contenant des caractères non-ASCII.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les encodages en vogue (ASCII → ISO-8859 → UTF-8 → UTF-16 selon les plateformes), les tailles de types selon les langages, les standards de représentation. <strong>Ce qui ne change pas :</strong> la nécessité d'une convention partagée pour interpréter des séquences de bits, les limitations des représentations en précision finie, et le fait que toute donnée est ultimement des octets dont l'interprétation dépend du contexte.</p>`,
        practice: {
          exercices: [
            {
              titre: "Explorer les limites de représentation dans son langage",
              etapes: [
                "Dans le langage que tu utilises le plus (JavaScript, Python, etc.), trouve la valeur maximale d'un entier et ce qui se passe quand tu la dépasses.",
                "Teste 0.1 + 0.2 et explique le résultat obtenu à partir de ce que tu sais sur IEEE 754.",
                "Écris une chaîne contenant des caractères accentués, sauvegarde-la dans un fichier en spécifiant UTF-8, puis ouvre-la en ISO-8859 et observe le résultat.",
                "Cherche dans un projet réel (le tien ou un open source) comment les montants financiers sont stockés — entiers, flottants, ou type Decimal ?",
              ],
              output:
                "Quatre observations documentées : limite entiers + comportement flottant + bug d'encodage simulé + analyse des choix de stockage financier.",
              critere:
                "Chaque observation doit être reliée à la représentation binaire sous-jacente — pas juste 'ça fait ça', mais 'ça fait ça parce que'.",
            },
          ],
          piege:
            "Croire que ces problèmes de représentation sont des curiosités académiques qui ne surviennent jamais en production. Les bugs d'arrondi sur les montants bancaires, les dépassements d'entiers dans les compteurs de vues, les bugs d'encodage sur les noms propres — ce sont des bugs réels, documentés, qui coûtent réellement de l'argent et de la réputation.",
        },
        verification: [
          "En JavaScript, l'expression '0.1 + 0.2 === 0.3' retourne 'false'. Expliquez pourquoi à partir de la représentation IEEE 754, et proposez deux approches pour comparer des nombres décimaux de façon fiable dans un contexte financier.",
          "Une application reçoit des données depuis une API tierce et certains caractères spéciaux s'affichent mal. Décrivez le problème en termes d'encodage (quelle convention utilise l'émetteur, quelle convention utilise le récepteur) et comment le diagnostiquer.",
          "Pourquoi Number.MAX_SAFE_INTEGER en JavaScript vaut 2^53 - 1 et non 2^63 - 1 comme on pourrait l'attendre d'un entier 64 bits, et quelles conséquences cela a-t-il pour les identifiants de base de données générés côté backend ?",
        ],
      },
    },

    assembleurEtBas: {
      id: "assembleurEtBas",
      label: "L'assembleur et le langage de la machine",
      icon: "⚙",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>L'assembleur est le premier niveau de langage humainement lisible au-dessus du binaire. Personne ne demande à un développeur web de coder en assembleur. Mais connaître ce niveau d'abstraction — même superficiellement — explique des comportements que les langages de haut niveau cachent : pourquoi une multiplication coûte moins qu'une division, pourquoi les branchements conditionnels perturbent le pipeline du processeur, pourquoi certaines optimisations de compilateur semblent "magiques". C'est la différence entre utiliser une voiture et comprendre son moteur.</p>`,
        system: `<p>L'assembleur est le pont entre le binaire <span class="ref-fiche">→ binaireEtRepresentation</span> et les langages de haut niveau <span class="ref-fiche">→ evolutionLangages</span>. Il matérialise l'architecture d'un processeur — ses registres, son jeu d'instructions, son modèle mémoire. Comprendre ce niveau éclaire les problèmes de performance <span class="ref-fiche">→ P03</span> et certaines classes de vulnérabilités de sécurité <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Ce qu'un développeur web gagne à comprendre l'assembleur, sans jamais en écrire :</p>
<p><strong>Le modèle de registres et de mémoire :</strong> un CPU a un petit nombre de "tiroirs" ultra-rapides (registres) et accède à la RAM via des adresses. Chaque variable de votre code finit dans un registre ou une adresse mémoire. Comprendre ça explique pourquoi les "variables locales" sont rapides (elles tiennent dans les registres) et pourquoi accéder à un objet en mémoire avec des pointeurs peut être plus lent.</p>
<p><strong>Les instructions de base :</strong> un processeur exécute des instructions élémentaires — MOV (copier une valeur), ADD (additionner), CMP (comparer), JMP (sauter à une adresse), CALL (appeler une fonction). Tout ce qu'on écrit en JavaScript ou Python est traduit en séquences de ces instructions. Une fonction "innocente" peut générer des dizaines d'instructions assembleur.</p>
<p><strong>Le pipeline et les prédictions de branchement :</strong> les processeurs modernes exécutent plusieurs instructions en parallèle via le "pipeline". Un <code>if/else</code> crée un branchement — le processeur doit prédire quelle branche sera prise avant de savoir. Si la prédiction est mauvaise (branch misprediction), il doit annuler le travail préfetché. C'est pourquoi dans les boucles très critiques, les conditions prévisibles sont plus rapides que les conditions aléatoires.</p>
<p><strong>Stack et heap :</strong> deux zones mémoire aux comportements très différents. La stack (pile) est gérée automatiquement et rapide — elle contient les variables locales et les adresses de retour des fonctions. Le heap (tas) est géré manuellement (ou par un garbage collector) et plus lent — il contient les objets alloués dynamiquement. La différence entre les deux est visible dans les bugs de récursion infinie (stack overflow) ou de fuite mémoire (heap non libéré).</p>`,
        },
        senior: `<p>Un développeur expérimenté lit parfois l'assembleur généré par son compilateur pour comprendre pourquoi une optimisation "évidente" n'accélère pas son code, ou pour vérifier qu'une opération critique n'est pas plus complexe qu'elle n'y paraît. Les outils modernes (Compiler Explorer / godbolt.org) permettent de voir l'assembleur généré par n'importe quel compilateur en temps réel. Ce n'est pas quotidien, mais c'est un outil de diagnostic que les seniors connaissent.</p>`,
        errors: `<p><strong>Pattern 1 — Croire que le code de haut niveau est une traduction directe :</strong> penser que <code>a + b</code> génère une seule instruction assembleur. En réalité, selon le compilateur, le type, l'optimisation activée, ce peut être 2 à 20 instructions incluant des vérifications d'overflow, des conversions de type, des accès mémoire. L'abstraction cache la complexité réelle.</p>
<p><strong>Pattern 2 — Confondre logique et performance :</strong> un code "logiquement simple" peut être lent en raison de son comportement en mémoire ou de ses branchements. Un <code>switch</code> sur des valeurs séquentielles peut être traduit en table de sauts ultra-rapide. Un <code>if/else</code> avec des conditions complexes peut dépasser des branchements intensément. La logique et la performance sont deux niveaux distincts.</p>
<p><strong>Pattern 3 — Voir la récursion comme "élégante" sans voir ses coûts :</strong> la récursion est un concept de haut niveau mais elle a un coût bas-niveau direct : chaque appel de fonction empile un "stack frame" contenant les paramètres et l'adresse de retour. Une récursion trop profonde cause un stack overflow — pas parce que le code est "faux" logiquement, mais parce qu'il épuise la mémoire de la pile.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les jeux d'instructions (x86, ARM, RISC-V), les optimisations des compilateurs modernes, les architectures (CISC vs RISC). <strong>Ce qui ne change pas :</strong> la distinction entre registres (rapides, limités) et mémoire (lente, vaste), le coût différentiel des opérations, et la présence systématique d'une stack et d'un heap dans tout programme.</p>`,
        practice: {
          exercices: [
            {
              titre: "Observer l'assembleur d'une fonction simple",
              etapes: [
                "Va sur godbolt.org (Compiler Explorer) et choisis un compilateur C (GCC ou Clang) avec optimisation -O0 (sans optimisation).",
                "Écris une fonction simple : `int add(int a, int b) { return a + b; }`. Observe l'assembleur généré.",
                "Active l'optimisation -O2 et observe comment l'assembleur change.",
                "Essaie une fonction avec un if/else simple et observe comment le branchement est traduit.",
              ],
              output:
                "Comparaison annotée de l'assembleur avec et sans optimisation pour deux fonctions simples.",
              critere:
                "L'annotation doit identifier au moins : où se trouvent les paramètres (registres ou pile), où se fait le calcul, où se fait le retour.",
            },
          ],
          piege:
            "Croire que comprendre l'assembleur demande d'écrire de l'assembleur. L'objectif est la lecture — comprendre ce que le compilateur fait de votre code. Godbolt permet cette exploration sans rien installer et sans devenir spécialiste.",
        },
        verification: [
          "Expliquez la différence entre la stack et le heap en termes de gestion mémoire, et donnez un exemple de bug qui survient dans chacune — stack overflow d'un côté, fuite mémoire de l'autre.",
          "Un collègue optimise une boucle critique en évitant les branchements conditionnels. Il dit que 'les if dans les boucles sont lents'. Expliquez le mécanisme matériel (prédiction de branchement) qui justifie cette optimisation, et dans quelles conditions elle n'est pas nécessaire.",
          "Pourquoi le fait de connaître la distinction entre registres et mémoire aide-t-il à comprendre pourquoi les variables locales d'une fonction sont généralement plus rapides à accéder que les propriétés d'un objet en mémoire ?",
        ],
      },
    },

    evolutionLangages: {
      id: "evolutionLangages",
      label: "Des langages bas niveau aux langages modernes",
      icon: "🔼",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Chaque génération de langage de programmation a résolu les problèmes du niveau précédent en ajoutant une couche d'abstraction. L'assembleur a rendu le binaire lisible. Le C a rendu la mémoire portable. Java et C# ont automatisé la gestion de la mémoire. Python a prioritarisé la lisibilité sur la performance. JavaScript a apporté la programmation dynamique dans le navigateur. Chaque choix de langage est un compromis délibéré entre contrôle, performance, productivité et sécurité. Comprendre cette évolution, c'est comprendre pourquoi les langages qu'on utilise aujourd'hui ont les caractéristiques qu'ils ont.</p>`,
        system: `<p>L'évolution des langages est la continuité directe du bas niveau <span class="ref-fiche">→ assembleurEtBas</span> vers les outils du développement quotidien. Elle conditionne le choix du langage pour un projet donné <span class="ref-fiche">→ T01</span> et explique les compromis qu'on accepte en choisissant JavaScript ou Python plutôt que Rust ou C. Elle s'inscrit dans l'évolution plus large de l'informatique <span class="ref-fiche">→ F01</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Cinq générations de langages et les problèmes qu'elles résolvent :</p>
<p><strong>Génération 1 — Binaire (1940–1950) :</strong> programmer directement en 0 et 1, adresse mémoire par adresse mémoire. Extrêmement laborieux, propice aux erreurs, non portable. Problème : impossible à maintenir à grande échelle.</p>
<p><strong>Génération 2 — Assembleur (1950–) :</strong> mnémoniques lisibles (MOV, ADD, JMP) traduits en binaire par un assembler. Résout la lisibilité, pas la portabilité — un programme assembleur x86 ne tourne pas sur ARM. Toujours utilisé dans les drivers, les systèmes embarqués critiques, et l'optimisation extrême.</p>
<p><strong>Génération 3 — Langages impératifs haut niveau (1950–1980) :</strong> FORTRAN (1957, calcul scientifique), COBOL (1959, gestion d'entreprise), C (1972, systèmes). C est la révolution : langage proche du matériel mais portable — le même code C compilé sur x86 ou ARM donne le même comportement. Le kernel Linux, les interpréteurs Python et V8 (JavaScript) sont écrits en C. Problème encore présent : la gestion manuelle de la mémoire crée des failles de sécurité (buffer overflows, use-after-free).</p>
<p><strong>Génération 4 — Langages avec garbage collection (1990–) :</strong> Java (1995), C#, Python, JavaScript — le runtime gère automatiquement la mémoire, éliminant une grande classe de bugs. Le coût : une pause périodique pour le garbage collector, une mémoire plus consommée, une performance moindre que C. Le compromis : moins de bugs de mémoire, plus de productivité, plus de portabilité. C'est le choix dominant pour les applications web.</p>
<p><strong>Génération 5 — Langages à ownership (2015–) :</strong> Rust résout le problème de C (mémoire manuelle, failles) sans garbage collector, via un système de propriété vérifiable à la compilation. TypeScript est la réponse de JavaScript à l'absence de types statiques. Ces langages résolvent les problèmes des générations précédentes avec de nouveaux compromis (courbe d'apprentissage plus raide pour Rust, configuration supplémentaire pour TypeScript).</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit un langage en fonction du problème, pas par habitude ou par loyauté. Pour un script de migration de données ponctuel : Python (vitesse de développement prime). Pour une API à haute disponibilité : Node.js ou Go (équilibre performance/productivité). Pour un système embarqué ou un composant critique en mémoire : Rust ou C. La question n'est jamais "quel est le meilleur langage ?" — c'est "quel est le meilleur compromis pour ce contexte ?"</p>`,
        errors: `<p><strong>Pattern 1 — Loyauté au langage :</strong> défendre un langage comme "meilleur" indépendamment du contexte. Chaque langage est le résultat de compromis délibérés — aucun n'est universellement supérieur. Coder Python pour un système embarqué temps-réel est objectivement inadapté. Coder Rust pour un prototype de 3 jours est objectivement contre-productif.</p>
<p><strong>Pattern 2 — Ignorer les abstractions sous-jacentes :</strong> croire que passer de JavaScript à TypeScript est un changement fondamental. TypeScript est un sur-ensemble de JavaScript avec un système de types vérifié à la compilation — il compile en JavaScript et tourne sur le même moteur V8. Comprendre ce qu'une abstraction cache permet de savoir où elle ne s'applique pas.</p>
<p><strong>Pattern 3 — Sous-estimer le coût du garbage collector :</strong> choisir Java ou Python pour une application où la latence est critique sans connaître les pauses GC. Dans un jeu temps-réel ou un système de trading, une pause GC de 100ms est catastrophique. Ces contraintes sont connues avant la construction, pas découvertes en production.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les langages dominants par domaine (Python pour l'IA, JavaScript pour le web, Go pour les microservices), les paradigmes en vogue (fonctionnel, réactif), les nouvelles syntaxes. <strong>Ce qui ne change pas :</strong> les compromis fondamentaux entre contrôle, performance, sécurité et productivité. Chaque langage est une position dans cet espace de compromis — la position optimale dépend du contexte, jamais d'une préférence absolue.</p>`,
        practice: {
          exercices: [
            {
              titre: "Analyser les compromis d'un choix de langage passé",
              etapes: [
                "Choisis un projet que tu as réalisé ou auquel tu as contribué.",
                "Identifie le(s) langage(s) utilisé(s) et les raisons explicites ou implicites de ce choix.",
                "Pour chaque langage, identifie les compromis acceptés : vitesse de développement / performance / sécurité mémoire / typage / écosystème.",
                "Formule si, avec la connaissance que tu as maintenant, tu ferais le même choix — et si non, quel langage aurait mieux servi le contexte.",
              ],
              output:
                "Analyse de choix de langage : raisons initiales + compromis acceptés + évaluation rétrospective.",
              critere:
                "L'analyse doit mobiliser les compromis concrets des langages (GC, typage, performance, portabilité) — pas de préférences subjectives ou de mode.",
            },
          ],
          piege:
            "Comparer les langages sur des benchmarks synthétiques (micro-benchmarks de vitesse). Ces benchmarks mesurent les performances sur des cas triviaux et ne reflètent pas les vrais compromis en production : vitesse de développement, écosystème de librairies, courbe d'apprentissage de l'équipe, outils de débogage. Un langage 2x plus rapide qui prend 5x plus longtemps à développer n'est pas toujours le meilleur choix.",
        },
        verification: [
          "Rust résout les problèmes de sécurité mémoire du C sans garbage collector. Quel mécanisme permet cela, et pourquoi ce mécanisme rend-il Rust plus difficile à apprendre que Python malgré ses avantages ?",
          "Une startup veut choisir entre Python et Go pour son API backend. Quels critères concrets utiliseraient-vous pour faire cette recommandation, et en quoi les compromis de chaque langage (GC, typage, vitesse de développement, performance) s'appliquent à leur contexte ?",
          "JavaScript a été conçu en 10 jours en 1995 pour des scripts simples dans le navigateur. Il est maintenant utilisé pour des serveurs, des applications mobiles et des outils de bureau. Quelles caractéristiques du langage créent des problèmes dans ces nouveaux contextes, et comment TypeScript y répond-il partiellement ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "composantsOrdinateur", x: 10, y: 100, w: 165, h: 65 },
        { id: "binaireEtRepresentation", x: 240, y: 40, w: 165, h: 65 },
        { id: "assembleurEtBas", x: 240, y: 165, w: 155, h: 65 },
        { id: "evolutionLangages", x: 480, y: 100, w: 155, h: 65 },
      ],
      edges: [
        { x1: 175, y1: 120, x2: 238, y2: 72, label: "encode" },
        { x1: 175, y1: 148, x2: 238, y2: 197, label: "exécute" },
        { x1: 405, y1: 72, x2: 478, y2: 120, label: "abstrait" },
        { x1: 395, y1: 197, x2: 478, y2: 148, label: "structure" },
      ],
    },
  },
});
