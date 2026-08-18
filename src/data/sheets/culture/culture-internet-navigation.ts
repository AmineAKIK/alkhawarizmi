import { cultureSheet } from "./culture-common";

export const cultureInternetNavigation = cultureSheet({
  id: "culture-F05",
  number: 5,
  title: "Comprendre Internet et la Navigation Web",
  subtitle: "Ce qui se passe vraiment quand on tape une URL — et ce qu'Internet cache derrière l'écran visible",
  badge: "Fiche F05",
  meta: ["3 nœuds"],
  readingTime: "20 min",
  description: "Internet est utilisé des milliards de fois par jour sans que ses utilisateurs — y compris beaucoup de développeurs — comprennent ce qui se passe réellement. Taper une URL déclenche une cascade de mécanismes invisibles : résolution DNS, établissement de connexion TCP, négociation TLS, requête HTTP, rendu navigateur. Et derrière le Web visible, une infrastructure invisible structure l'accès à l'information. Cette fiche rend visible ce que l'usage quotidien cache.",
  accent: "modele",

  nodes: {
    vocabulaireInternet: {
      id: "vocabulaireInternet",
      label: "Vocabulaire fondamental d'Internet",
      icon: "📖",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Parler de réseau sans vocabulaire partagé, c'est essayer de discuter d'architecture sans distinguer mur porteur et cloison. Les termes IP, port, protocole, paquet, DNS, URL, domaine sont utilisés dans toutes les conversations techniques sur le Web — dans les logs d'erreur, les configurations serveur, les dashboards de monitoring. Un développeur qui ne maîtrise pas ce vocabulaire comprend mal ses propres outils et ne peut pas diagnostiquer ses propres pannes réseau.</p>`,
        system: `<p>Ce vocabulaire est le socle de tout ce qui suit dans cette fiche <span class="ref-fiche">→ navigationWeb</span> <span class="ref-fiche">→ faceCache</span> et dans la fiche des protocoles réseau <span class="ref-fiche">→ F06</span>. Il ancre également la compréhension historique d'Internet <span class="ref-fiche">→ F01</span> dans des notions opérationnelles quotidiennes. Sans ce vocabulaire, configurer un serveur <span class="ref-fiche">→ T10</span> ou déboguer une API <span class="ref-fiche">→ T07</span> reste une manipulation de symboles sans sens.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les dix termes fondamentaux qu'un développeur web doit maîtriser :</p>
<p><strong>Adresse IP :</strong> identifiant numérique unique d'une machine sur un réseau. IPv4 : 4 nombres de 0 à 255 séparés par des points (ex: 93.184.216.34). IPv6 : 8 groupes hexadécimaux (ex: 2001:0db8:...). Une adresse IP identifie une interface réseau, pas une machine — un serveur avec deux cartes réseau a deux adresses IP.</p>
<p><strong>Port :</strong> numéro (0 à 65535) qui identifie un service spécifique sur une machine. Le port 80 est HTTP, le 443 est HTTPS, le 22 est SSH, le 5432 est PostgreSQL. Une IP seule identifie la machine. IP + port identifient le service précis avec lequel communiquer. Quand on dit "localhost:3000", on désigne le service sur le port 3000 de la machine locale.</p>
<p><strong>Protocole :</strong> ensemble de règles qui définissent comment deux machines communiquent. HTTP définit comment un client demande et un serveur répond. TCP définit comment les données sont découpées, envoyées et réassemblées. Un protocole est un contrat d'interface entre deux systèmes.</p>
<p><strong>Paquet :</strong> unité de base de transmission réseau. Les données ne voyagent pas en un seul bloc — elles sont découpées en paquets, chacun portant son en-tête (adresse source, adresse destination, numéro de séquence) et ses données. Chaque paquet peut prendre un chemin différent à travers le réseau.</p>
<p><strong>DNS (Domain Name System) :</strong> système qui traduit un nom de domaine lisible (google.com) en adresse IP numérique (142.250.74.46). Sans DNS, il faudrait mémoriser des adresses IP pour chaque site. Le DNS est distribué et hiérarchique : un réseau mondial de serveurs collabore pour répondre aux requêtes en quelques millisecondes.</p>
<p><strong>URL (Uniform Resource Locator) :</strong> adresse complète d'une ressource sur le Web. Anatomie : <code>https://api.exemple.com:443/users/42?format=json#section</code>. Chaque partie a un rôle : protocole (https), domaine (api.exemple.com), port optionnel (443), chemin (/users/42), paramètres de requête (?format=json), fragment (#section).</p>
<p><strong>Domaine :</strong> nom lisible associé à une IP via le DNS. Structure hiérarchique de droite à gauche : <em>com</em> est le TLD (Top Level Domain), <em>exemple</em> est le domaine de second niveau, <em>api</em> est un sous-domaine. Chaque niveau est géré par une autorité différente.</p>
<p><strong>Bande passante vs latence :</strong> deux métriques différentes. La bande passante est le volume de données par seconde (débit, en Mbps). La latence est le délai pour qu'un paquet arrive à destination (en millisecondes). Une connexion fibre à 1 Gbps avec 100ms de latence sera moins réactive qu'une connexion à 10 Mbps avec 10ms pour les petites requêtes. Pour les applications web, la latence importe souvent plus que la bande passante.</p>
<p><strong>Serveur vs client :</strong> dans le modèle client-serveur, le client initie la connexion et fait des requêtes, le serveur attend et répond. Un même programme peut être client (d'une base de données) et serveur (d'un navigateur) simultanément.</p>
<p><strong>Pare-feu (firewall) :</strong> dispositif (matériel ou logiciel) qui filtre le trafic réseau selon des règles. Il peut bloquer ou autoriser des paquets selon l'IP source, la destination, le port, le protocole. Un pare-feu est la première ligne de défense d'une infrastructure réseau.</p>`,
        },
        senior: `<p>Un développeur expérimenté pense en IP + port dès qu'il débogue un problème réseau. "Pourquoi mon service A ne peut pas appeler mon service B ?" — première vérification : est-ce que le port du service B est ouvert ? Le pare-feu le bloque-t-il ? L'adresse IP est-elle correcte ? Ces trois questions résolvent 80% des problèmes de connectivité avant même de regarder le code.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre domaine et serveur :</strong> croire qu'un domaine correspond à un seul serveur physique. En réalité, google.com pointe vers des milliers de serveurs via des techniques de load balancing et de CDN. Une même IP peut aussi servir plusieurs domaines (virtual hosting). Le DNS est une abstraction sur l'infrastructure physique.</p>
<p><strong>Pattern 2 — Confondre bande passante et latence :</strong> supposer qu'une "bonne connexion" résout tous les problèmes de performance réseau. Une API qui fait 10 appels séquentiels subira 10 fois la latence quelle que soit la bande passante. L'optimisation pertinente est souvent de réduire le nombre d'aller-retours, pas d'augmenter le débit.</p>
<p><strong>Pattern 3 — Ignorer les ports dans la configuration :</strong> déployer une application sans vérifier que les ports nécessaires sont ouverts dans le pare-feu. Résultat : l'application tourne, les logs sont propres, mais les requêtes externes n'arrivent jamais. Ce bug est invisible côté applicatif.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les versions de protocoles (IPv4 → IPv6), les outils de résolution DNS, les types de connexion (ADSL → fibre → 5G → satellite). <strong>Ce qui ne change pas :</strong> le modèle fondamental d'adressage (identifiant unique + port + protocole), la distinction bande passante / latence, et le rôle du DNS comme système de nommage distribué.</p>`,
        practice: {
          exercices: [
            {
              titre: "Disséquer une URL et tracer sa résolution",
              etapes: [
                "Prends une URL complexe d'une API que tu utilises et décompose chaque partie : protocole, sous-domaine, domaine, TLD, port (implicite ou explicite), chemin, paramètres.",
                "Dans un terminal, lance <code>nslookup ce-domaine.com</code> et observe l'adresse IP retournée.",
                "Lance <code>curl -v https://ce-domaine.com</code> et repère dans la sortie : la résolution DNS, l'adresse IP, le port de connexion, les en-têtes HTTP.",
                "Compare la latence de deux serveurs géographiquement différents avec <code>ping adresse-ip-1</code> et <code>ping adresse-ip-2</code>.",
              ],
              output: "Schéma annoté de l'URL avec chaque composant identifié + résultat DNS + latence mesurée.",
              critere: "Tu dois pouvoir expliquer pourquoi chaque composant de l'URL existe et ce qu'il accomplit.",
            },
          ],
          piege: "Mémoriser les définitions sans jamais les observer en action. Ouvrir les DevTools d'un navigateur (onglet Network) sur n'importe quel site révèle plus en 5 minutes que 30 minutes de lecture théorique sur le vocabulaire réseau.",
        },
        verification: [
          "Quelle est la différence entre une adresse IP et un nom de domaine, et quel mécanisme assure la traduction de l'un à l'autre ? Expliquez pourquoi ce mécanisme est distribué plutôt que centralisé.",
          "Une application répond en 20ms en local mais en 800ms en production. Le serveur est rapide, la bande passante est bonne. Quel concept réseau explique cet écart, et comment modifieriez-vous l'architecture de l'application pour le réduire ?",
          "Pourquoi la distinction entre bande passante et latence est-elle critique pour concevoir une API performante, et donnez un exemple concret où augmenter la bande passante ne résoudrait pas un problème de performance ?",
        ],
      },
    },

    navigationWeb: {
      id: "navigationWeb",
      label: "Ce qui se passe quand on navigue",
      icon: "🌐",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Taper "google.com" dans un navigateur et voir une page s'afficher semble instantané et magique. En réalité, c'est une cascade de 7 à 15 étapes distinctes — résolution DNS, connexion TCP, négociation TLS, requête HTTP, parsing HTML, exécution JavaScript, rendu visuel — chacune pouvant être un point de défaillance ou d'optimisation. Un développeur qui comprend cette cascade peut diagnostiquer où ça ralentit, où ça échoue, et pourquoi certaines optimisations fonctionnent.</p>`,
        system: `<p>La navigation web mobilise le vocabulaire fondamental <span class="ref-fiche">→ vocabulaireInternet</span> et expose les protocoles de communication réseau <span class="ref-fiche">→ F06</span> dans leur contexte d'usage réel. Elle est le cas d'usage concret de toute la pile HTTP que les développeurs manipulent en <span class="ref-fiche">→ T07</span>. Comprendre cette cascade est indispensable pour optimiser les performances front-end <span class="ref-fiche">→ P03</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>La cascade complète d'une navigation web, étape par étape :</p>
<p><strong>Étape 1 — Résolution DNS :</strong> le navigateur vérifie d'abord son cache local (a-t-il déjà résolu ce domaine ?). Si non, il interroge le résolveur DNS de votre FAI, qui interroge les serveurs DNS racine, puis les serveurs du TLD (.com, .fr), puis le serveur autoritaire du domaine. Cette chaîne prend 20 à 100ms pour un nouveau domaine, quelques microsecondes pour un domaine en cache.</p>
<p><strong>Étape 2 — Connexion TCP :</strong> avec l'adresse IP, le navigateur établit une connexion TCP via un "three-way handshake" : SYN → SYN-ACK → ACK. Cet échange prend un aller-retour réseau (RTT). Sur une connexion transcontinentale, ça représente 80 à 150ms avant qu'un seul octet de données soit envoyé.</p>
<p><strong>Étape 3 — Négociation TLS (si HTTPS) :</strong> pour une connexion sécurisée, le navigateur et le serveur échangent leurs certificats, vérifient leur authenticité, et établissent des clés de chiffrement partagées. HTTP/2 et TLS 1.3 ont réduit ce coût, mais il reste non nul. La première connexion HTTPS vers un domaine inconnu peut ajouter 100 à 200ms.</p>
<p><strong>Étape 4 — Requête HTTP :</strong> le navigateur envoie la requête HTTP avec ses en-têtes (User-Agent, Accept, cookies, etc.). Le serveur traite la requête et répond avec les en-têtes de réponse et le corps (HTML, JSON, image...).</p>
<p><strong>Étape 5 — Parsing HTML et construction du DOM :</strong> le navigateur lit le HTML et construit le DOM (Document Object Model), l'arbre de la structure de la page. Chaque ressource externe trouvée (CSS, JavaScript, images) déclenche une nouvelle requête HTTP — potentiellement autant de fois les étapes 1 à 4.</p>
<p><strong>Étape 6 — Exécution JavaScript et rendu :</strong> les scripts JavaScript sont exécutés, peuvent modifier le DOM, peuvent déclencher des appels réseau supplémentaires (AJAX, fetch). Le navigateur calcule enfin les styles CSS, la disposition (layout) et affiche les pixels — le "paint".</p>
<p><strong>Pourquoi c'est important pour un développeur :</strong> chaque étape a un coût mesurable. Les DevTools affichent la cascade complète dans l'onglet Network. La métrique "Time to First Byte" (TTFB) mesure le temps jusqu'à la réponse serveur. Le "First Contentful Paint" (FCP) mesure quand quelque chose de visible apparaît. Optimiser la performance web consiste à raccourcir ou paralléliser ces étapes.</p>`,
        },
        senior: `<p>Un développeur expérimenté lit la cascade réseau dans les DevTools comme un médecin lit une radio. Il cherche : y a-t-il des requêtes bloquantes qui retardent le FCP ? Des ressources CSS non minifiées ? Des images non optimisées ? Des appels API séquentiels qui pourraient être parallélisés ? Un TTFB élevé qui trahit un problème côté serveur ? Cette lecture prend 2 minutes et oriente toute l'optimisation.</p>`,
        errors: `<p><strong>Pattern 1 — Optimiser le mauvais goulot :</strong> minifier le JavaScript de 50 Ko alors que le problème est un TTFB de 2 secondes causé par une requête base de données lente. L'outil DevTools Network tab révèle où se passe réellement le temps avant d'optimiser quoi que ce soit.</p>
<p><strong>Pattern 2 — Ignorer le coût des connexions multiples :</strong> charger 30 ressources séparées (scripts, styles, images) en croyant que c'est équivalent à 1 grosse ressource. Chaque requête a un overhead fixe (TCP handshake, en-têtes HTTP). HTTP/2 a atténué ce problème via le multiplexage, mais le coût de résolution DNS et de connexion initiale reste réel.</p>
<p><strong>Pattern 3 — Ne pas tester hors du bureau :</strong> développer sur une connexion fibre locale et ne jamais simuler une connexion mobile 3G. Les DevTools permettent de throttler la connexion. Ce qui semble "instantané" en local peut prendre 8 secondes sur un réseau mobile moyen — une différence qui change complètement les décisions d'architecture frontend.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les protocoles (HTTP/1.1 → HTTP/2 → HTTP/3), les mécanismes de cache navigateur, les formats de ressources optimisés. <strong>Ce qui ne change pas :</strong> la cascade fondamentale (DNS → TCP → TLS → HTTP → rendu) reste la même quelle que soit la version du protocole. Chaque étape a un coût et peut être un point de défaillance ou d'optimisation.</p>`,
        practice: {
          exercices: [
            {
              titre: "Analyser la cascade réseau d'une vraie page",
              etapes: [
                "Ouvre les DevTools de ton navigateur (F12), onglet Network. Assure-toi que 'Disable cache' est coché.",
                "Navigue vers un site que tu utilises souvent. Observe la cascade : combien de requêtes ? Quelle est la première requête ? Combien de temps prend le TTFB ?",
                "Identifie la ressource qui bloque le rendu (les barres orange/rouges dans Chrome DevTools). C'est souvent un JavaScript chargé de façon synchrone.",
                "Active la simulation réseau 'Slow 3G' dans DevTools et recharge. Qu'est-ce qui change ? Quelle est l'expérience utilisateur sur mobile ?",
                "Identifie une optimisation concrète : une image non compressée, un script bloquant, un domaine tiers qui ajoute une résolution DNS supplémentaire.",
              ],
              output: "Rapport de la cascade : nombre de requêtes, TTFB, FCP, ressource la plus lente, et une optimisation concrète identifiée.",
              critere: "L'optimisation identifiée doit cibler le goulot réel mesuré — pas une optimisation générique 'compresser les images' si le problème est le TTFB.",
            },
          ],
          piege: "Se concentrer sur la taille des fichiers plutôt que sur le nombre d'allers-retours. Deux requêtes de 10 Ko chacune coûtent souvent plus cher qu'une seule requête de 20 Ko, parce que chaque requête a un overhead fixe de connexion que la taille des données n'explique pas.",
        },
        verification: [
          "Listez les 4 étapes réseau qui se produisent avant qu'un seul octet de contenu HTML ne soit reçu par le navigateur lors d'une première visite sur un site HTTPS, et estimez l'ordre de grandeur du coût de chacune.",
          "Le Time to First Byte (TTFB) d'un site est de 2 secondes. Le JavaScript est déjà minifié et les images compressées. Que suggère ce TTFB élevé, et comment le diagnostiqueriez-vous ?",
          "HTTP/2 a introduit le multiplexage des requêtes sur une seule connexion TCP. En quoi cela change-t-il la stratégie de concaténation des ressources CSS et JavaScript qui était recommandée sous HTTP/1.1 ?",
        ],
      },
    },

    faceCache: {
      id: "faceCache",
      label: "La face cachée d'Internet",
      icon: "🕳",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Internet tel qu'on l'utilise — Google, Wikipedia, les réseaux sociaux — est le Web de surface indexé par les moteurs de recherche. Il représente une fraction de ce qui circule sur Internet. En dessous, il y a un Internet invisible aux moteurs de recherche, une infrastructure physique sous-marine, des points d'échange qui concentrent le trafic mondial, et des réseaux conçus pour l'anonymat. Comprendre cette profondeur change la vision qu'on a d'Internet : ce n'est pas un nuage abstrait, c'est une infrastructure physique avec des propriétaires, des goulots d'étranglement et des points de contrôle.</p>`,
        system: `<p>La face cachée d'Internet repose sur l'infrastructure physique abordée dans <span class="ref-fiche">→ F07</span> et sur les protocoles de sécurité et d'anonymat couverts dans <span class="ref-fiche">→ F06</span>. Elle complète la genèse historique d'Internet <span class="ref-fiche">→ F01</span> en montrant la réalité contemporaine derrière les promesses originelles de décentralisation.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quatre couches de l'Internet invisible :</p>
<p><strong>Le Deep Web :</strong> l'ensemble des pages non indexées par les moteurs de recherche. Ce n'est pas mystérieux : votre boîte email, votre espace bancaire, les intranets d'entreprise, les bases de données académiques sont du Deep Web. Estimé à 400 à 500 fois plus volumineux que le Web de surface. La majorité du Deep Web est parfaitement légal — il n'est juste pas accessible sans authentification.</p>
<p><strong>Le Dark Web :</strong> sous-ensemble du Deep Web accessible uniquement via des logiciels spéciaux, notamment Tor. Le terme "dark" désigne l'opacité technique, pas nécessairement l'illégalité. Tor (The Onion Router) est financé par le gouvernement américain pour permettre à des journalistes, des dissidents et des militants des droits humains de communiquer de façon anonyme depuis des pays autoritaires. Le Dark Web contient aussi des marchés illégaux, mais c'est une minorité de son usage réel.</p>
<p><strong>Le réseau Tor et l'anonymat :</strong> Tor fonctionne en routant le trafic à travers 3 nœuds de relais chiffrés (d'où "onion" — pelures d'oignon). Chaque relais ne connaît que son prédécesseur et son successeur, jamais la source et la destination complètes simultanément. Ce modèle rend la surveillance très difficile mais non impossible — les erreurs côté utilisateur (se connecter à un compte personnel, utiliser JavaScript) peuvent rompre l'anonymat.</p>
<p><strong>L'infrastructure physique d'Internet :</strong> Internet n'est pas un nuage. C'est concrètement : environ 400 câbles sous-marins reliant les continents (dont 99% du trafic intercontinental passe), des Points d'Échange Internet (IXP) où des centaines de réseaux s'interconnectent physiquement (l'IXP de Francfort traite 10 Tbps à lui seul), des datacenters de hyperscalers (AWS, Google, Azure) qui concentrent une part croissante du trafic mondial. Couper quelques câbles stratégiques isolerait des pays entiers — ce qui est arrivé (coupure du câble sous-marin SEA-ME-WE-4 en 2008, qui a perturbé Internet au Moyen-Orient et en Asie).</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que la "décentralisation" d'Internet est une propriété de conception, pas une réalité opérationnelle. En pratique, une panne chez AWS us-east-1 affecte simultanément des milliers de services — parce que des milliers de sociétés ont externalisé leur infrastructure vers le même datacenter. La concentration des services dans quelques hyperscalers crée des points de défaillance uniques que l'architecture originelle d'ARPANET cherchait précisément à éviter. Cette tension est structurelle et informe les choix d'architecture multi-cloud ou on-premise.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre Dark Web et activité criminelle :</strong> associer automatiquement Tor et le Dark Web à des activités illicites. En réalité, Tor est un outil de protection de la vie privée utilisé par des journalistes (New York Times a un site .onion), des agences gouvernementales, et des millions d'utilisateurs cherchant à contourner la censure dans des pays autoritaires. L'outil n'est pas le crime.</p>
<p><strong>Pattern 2 — Traiter Internet comme une infrastructure fiable par nature :</strong> supposer qu'Internet est toujours disponible et que les pannes sont des accidents rares. En réalité, les câbles sous-marins sont régulièrement sectionnés (ancres de bateaux, séismes sous-marins), les IXP peuvent être saturés, et les attaques DDoS peuvent rendre des services majeurs inaccessibles pendant des heures. Une architecture résiliente anticipe ces pannes.</p>
<p><strong>Pattern 3 — Ignorer la géopolitique des infrastructures :</strong> ne pas réaliser que les câbles sous-marins, les IXP et les DNS racines ont des propriétaires nationaux ou corporatifs qui peuvent filtrer, surveiller ou couper le trafic. La "neutralité" d'Internet est une norme débattue, pas un état de fait permanent. Les développeurs qui déploient des services globaux doivent comprendre ces dépendances.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les technologies d'anonymat (Tor évolue, I2P existe en alternative), la carte des câbles sous-marins s'étend, les lois de surveillance varient par pays et par époque. <strong>Ce qui ne change pas :</strong> la distinction conceptuelle entre Web indexé, Deep Web et Dark Web ; le principe du routage en oignon pour l'anonymat ; et le fait qu'Internet repose sur une infrastructure physique concentrée malgré sa conception décentralisée.</p>`,
        practice: {
          exercices: [
            {
              titre: "Explorer la cartographie physique d'Internet",
              etapes: [
                "Va sur submarinecablemap.com et observe la carte des câbles sous-marins. Identifie les concentrations géographiques et les zones peu connectées.",
                "Cherche l'IXP le plus proche de ta ville (ixpdb.net) et identifie combien de réseaux y sont interconnectés.",
                "Lance <code>traceroute 8.8.8.8</code> depuis ton terminal et essaie d'identifier les pays traversés par ta requête via les noms de domaine des routeurs intermédiaires.",
                "Cherche un incident récent de coupure de câble sous-marin et évalue l'impact géographique sur la connectivité Internet.",
              ],
              output: "Carte annotée de 3 observations : une concentration de câbles, un IXP local, et le chemin géographique d'une requête vers Google.",
              critere: "Les observations doivent relier l'infrastructure physique à des conséquences concrètes pour les utilisateurs ou les développeurs dans ta région.",
            },
          ],
          piege: "Traiter la face cachée d'Internet comme un sujet de curiosité culturelle sans lien avec le développement. En réalité, comprendre que 99% du trafic intercontinental passe par des câbles sous-marins change la façon dont on conçoit la résilience d'un service global. Comprendre le Deep Web explique pourquoi 'indexer' une page nécessite une action délibérée.",
        },
        verification: [
          "Quelle est la différence technique précise entre le Deep Web et le Dark Web, et donnez deux exemples légitimes et courants d'utilisation de chacun qui ne relèvent pas d'activités illicites.",
          "Tor utilise le routage en oignon pour l'anonymat. Expliquez le mécanisme en trois nœuds de relais et identifiez une limite de ce système — une situation où l'anonymat peut être rompu malgré l'utilisation de Tor.",
          "Internet a été conçu pour être décentralisé et résilient. Pourtant, 99% du trafic intercontinental passe par environ 400 câbles sous-marins et une large part du Web mondial tourne sur 3 hyperscalers. Comment expliquer cette contradiction entre la conception et la réalité opérationnelle ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "vocabulaireInternet", x: 10, y: 100, w: 185, h: 65 },
        { id: "navigationWeb", x: 340, y: 40, w: 165, h: 65 },
        { id: "faceCache", x: 620, y: 100, w: 175, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 338, y2: 72, label: "structure" },
        { x1: 195, y1: 148, x2: 618, y2: 148, label: "révèle" },
        { x1: 505, y1: 72, x2: 618, y2: 120, label: "dépasse" },
      ],
    },
  },
});
