import { cultureSheet } from "./culture-common";

export const cultureInfrastructurePhysique = cultureSheet({
  id: "culture-F07",
  number: 7,
  title: "L'Infrastructure Physique des Réseaux",
  subtitle: "Câbles, routeurs, datacenters, antennes — le matériel concret derrière le réseau invisible",
  badge: "Fiche F07",
  meta: ["3 nœuds"],
  readingTime: "20 min",
  description: "Internet ressemble à un nuage sur les schémas. En réalité c'est du cuivre, de la fibre optique, des boîtiers en rack, des datacenters refroidis à l'air froid, et des câbles sous-marins de la taille d'un tuyau d'arrosage qui traversent les océans. Comprendre ces organes physiques, c'est comprendre les limites réelles de toute infrastructure réseau — la vitesse de la lumière dans la fibre, les goulots d'étranglement, les points de défaillance, et pourquoi certaines architectures distribuées fonctionnent là où d'autres échouent.",
  accent: "modele",

  nodes: {
    vocabulaireHardware: {
      id: "vocabulaireHardware",
      label: "Vocabulaire des organes physiques",
      icon: "🖧",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un développeur qui déploie une application sur un VPS ou un cloud ne voit que des abstractions — instances, régions, availability zones. Mais ces abstractions reposent sur du matériel physique réel. Quand un serveur "tombe", c'est souvent un disque physique qui lâche, un switch qui perd l'alimentation, ou un câble qui est sectionné. Comprendre les organes physiques d'un réseau, c'est savoir quelle couche d'abstraction est en faute quand quelque chose ne marche pas, et pourquoi certains problèmes sont indépendants de votre code.</p>`,
        system: `<p>Les organes physiques constituent la couche 1 et 2 du modèle OSI <span class="ref-fiche">→ F06</span>. Ils déterminent les contraintes physiques (vitesse, latence, bande passante) dans lesquelles tous les protocoles logiciels opèrent <span class="ref-fiche">→ F06</span>. Leur compréhension complète la vue de l'infrastructure réseau déployée <span class="ref-fiche">→ T10</span> et éclaire les choix de région cloud pour minimiser la latence vers les utilisateurs.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les organes physiques fondamentaux d'une infrastructure réseau :</p>
<p><strong>Carte réseau (NIC — Network Interface Card) :</strong> composant physique dans chaque ordinateur, serveur ou device connecté au réseau. Chaque NIC a une adresse MAC (Media Access Control) gravée en usine, unique au monde. C'est l'interface entre le logiciel (couche IP et au-dessus) et le support physique (câble ou Wi-Fi). Un serveur de datacenter peut avoir 2 à 4 NICs pour la redondance et l'agrégation de liens.</p>
<p><strong>Switch (commutateur) :</strong> équipement qui interconnecte plusieurs machines sur un réseau local (LAN). Un switch opère à la couche 2 (adresses MAC) : il apprend quelles adresses MAC sont accessibles sur quel port et achemine les trames directement sans les diffuser à tout le monde (contrairement à l'ancien hub). Un switch de datacenter peut gérer 48 à 64 ports à 25 Gbps ou 100 Gbps. Les switches de cœur de réseau (core switches) peuvent commuter des dizaines de Tbps.</p>
<p><strong>Routeur :</strong> équipement qui interconnecte plusieurs réseaux (couche 3, adresses IP). Contrairement au switch (qui ne voit que le LAN local), le routeur consulte sa table de routage pour décider vers quel réseau adjacent acheminer chaque paquet. Votre box Internet est un routeur : elle connecte votre réseau domestique (192.168.x.x) au réseau de votre FAI (IP publique). Les routeurs de coeur d'Internet (backbone) gèrent des millions d'entrées de routage et commutent des Tbps.</p>
<p><strong>Pare-feu (firewall) matériel :</strong> équipement dédié au filtrage du trafic réseau, distinct du firewall logiciel. Un firewall matériel peut inspecter des millions de paquets par seconde sans impact sur les autres serveurs. Il applique des règles (ACL — Access Control Lists) basées sur les IPs, les ports, les protocoles, et parfois le contenu (DPI — Deep Packet Inspection).</p>
<p><strong>Câbles réseau :</strong> trois types principaux. Cuivre (Ethernet RJ45) : jusqu'à 10 Gbps sur courte distance (100m max pour Cat6). Fibre optique monomode : des dizaines de Gbps sur des centaines de kilomètres, utilisée pour les liaisons longue distance et les connexions datacenter. Fibre multimodes : moins chère, distances courtes (datacenter interne). Les datacenters utilisent massivement la fibre.</p>
<p><strong>Point d'accès Wi-Fi (AP — Access Point) :</strong> assure la connexion sans fil. Wi-Fi 6 (802.11ax) offre jusqu'à 9.6 Gbps théoriques, Wi-Fi 6E étend dans la bande 6 GHz pour réduire les interférences. La portée utile d'un AP intérieur est de 30 à 50m — au-delà, le signal se dégrade. Les technologies de mesh Wi-Fi (plusieurs AP coordonnés) permettent de couvrir de grandes surfaces sans dégradation.</p>
<p><strong>Antennes cellulaires (4G/5G) :</strong> infrastructure physique de la connectivité mobile. Une antenne 4G couvre 1 à 10 km selon le terrain. 5G millimétrique : très haut débit (multi-Gbps) mais portée courte (< 500m) et pénétration faible — nécessite une densité d'antennes bien supérieure. 5G sub-6 GHz : portée similaire à 4G mais débit amélioré. L'infrastructure 5G millimétrique est concentrée dans les centres-villes denses.</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que la "latence zéro" est physiquement impossible. La vitesse de la lumière dans la fibre optique est d'environ 200 000 km/s (contre 300 000 km/s dans le vide). Paris → New York = 5 500 km → minimum 27ms par aller-retour. Cette limite physique est incompressible. Elle explique pourquoi les CDN existent (servir le contenu depuis un nœud géographiquement proche), pourquoi les architectures edge computing émergent, et pourquoi une "région cloud" unique crée de la latence perçue pour les utilisateurs distants.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre switch et routeur :</strong> utiliser les termes de façon interchangeable. Un switch connecte des machines sur le même réseau local (couche 2, MAC). Un routeur connecte des réseaux différents (couche 3, IP). Dans un datacenter, les deux coexistent : les switches interconnectent les serveurs dans un rack, les routeurs interconnectent les racks et les réseaux externes.</p>
<p><strong>Pattern 2 — Ignorer les contraintes physiques dans les SLA :</strong> promettre une latence "inférieure à 10ms" entre Paris et São Paulo (9 000 km) sans vérifier la limite physique. La vitesse de la lumière impose ~45ms minimum pour cet aller-retour — le SLA est physiquement impossible à tenir. Les limites physiques des câbles sont incompressibles et doivent être prises en compte dans la conception des SLA.</p>
<p><strong>Pattern 3 — Traiter la redondance réseau comme optionnelle :</strong> déployer des serveurs de production avec une seule NIC, un seul switch, un seul lien Internet. En production, tout composant physique peut tomber. La redondance (dual NIC, dual switch, dual uplink FAI) est le mécanisme standard pour atteindre des SLA à 99.9% et au-delà. Le coût de la redondance est prévisible ; le coût d'une panne unique ne l'est pas.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les vitesses des interfaces (1 Gbps → 10 Gbps → 100 Gbps), les standards Wi-Fi (Wi-Fi 5 → Wi-Fi 6 → Wi-Fi 7), les technologies de câble. <strong>Ce qui ne change pas :</strong> la hiérarchie des équipements (NIC → switch → routeur) et leurs rôles respectifs aux couches 1, 2, et 3 du modèle OSI ; la limite physique de la vitesse de la lumière dans la fibre ; le principe de redondance pour la résilience.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cartographier l'infrastructure physique d'un réseau réel",
              etapes: [
                "Depuis ton réseau local, lance <code>traceroute 8.8.8.8</code> et identifie les différents sauts : réseau local (router box), réseau FAI, backbone internet.",
                "Identifie l'adresse IP publique de ton réseau (<code>curl ifconfig.me</code>) et compare avec ton adresse IP locale (<code>ip a</code> ou <code>ipconfig</code>). Explique la différence (NAT).",
                "Cherche le datacenter le plus proche de toi qui héberge une infrastructure cloud (AWS, GCP, Azure) et estime la latence attendue vers cette région avec <code>ping</code>.",
                "Identifie un câble sous-marin qui relie ton pays à un continent adjacent sur submarinecablemap.com et cherche sa bande passante totale.",
              ],
              output: "Schéma annoté du chemin de ta connexion Internet : box → FAI → backbone → destination, avec les équipements physiques à chaque étape.",
              critere: "Le schéma doit identifier au moins un switch, un routeur, et un lien fibre dans le chemin, avec leur rôle exact.",
            },
          ],
          piege: "Traiter les infrastructures physiques comme le domaine exclusif des équipes OPS ou réseau. En réalité, les contraintes physiques (latence minimale, bande passante maximale, points de défaillance) déterminent directement les choix d'architecture applicative : où déployer, comment distribuer, quelle résilience concevoir.",
        },
        verification: [
          "Quelle est la différence fonctionnelle entre un switch et un routeur, et à quelle couche du modèle OSI chacun opère-t-il ? Donnez un exemple concret de l'usage de chacun dans un réseau de bureau.",
          "La vitesse de la lumière dans la fibre optique est d'environ 200 000 km/s. Calculez la latence minimale incompressible pour une requête Paris → Tokyo (environ 9 700 km) aller-retour, et expliquez pourquoi un CDN avec un nœud au Japon change fondamentalement l'expérience utilisateur.",
          "Une application web doit maintenir 99.9% de disponibilité (SLA 3 nines — environ 9h de downtime autorisé par an). Quels composants physiques réseau faut-il doubler pour atteindre cet objectif, et pourquoi la redondance seule ne suffit pas ?",
        ],
      },
    },

    datacenters: {
      id: "datacenters",
      label: "Datacenters et infrastructure cloud",
      icon: "🏭",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Quand on déploie sur "le cloud", où sont physiquement les machines ? Dans des datacenters — des bâtiments de la taille d'entrepôts, remplis de racks de serveurs, refroidis par des systèmes complexes, alimentés par des générateurs de secours, connectés à Internet par des fibres redondantes. Comprendre comment un datacenter fonctionne, c'est comprendre ce que "us-east-1", "availability zone", et "edge location" signifient concrètement — et pourquoi les décisions de déploiement ont des conséquences réelles sur la latence, la résilience et les coûts.</p>`,
        system: `<p>Les datacenters sont l'infrastructure physique des clouds publics comme des hébergements privés. Ils concentrent les équipements réseau <span class="ref-fiche">→ vocabulaireHardware</span> et constituent les nœuds physiques que les câbles sous-marins <span class="ref-fiche">→ reseauxEtendus</span> relient entre eux. Leur compréhension est indispensable pour faire des choix éclairés de déploiement <span class="ref-fiche">→ T10</span> et anticiper les problèmes de production <span class="ref-fiche">→ P01</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Anatomie d'un datacenter et organisation des clouds :</p>
<p><strong>Anatomie physique d'un datacenter :</strong> un datacenter est organisé en allées chaudes/froides (hot aisle/cold aisle) pour optimiser le refroidissement. Les serveurs sont montés en rack (armoires standardisées de 42U, 1U = 1.75 pouces de hauteur). Un rack typique contient 20 à 40 serveurs. Un datacenter peut contenir des milliers de racks. L'énergie est la contrainte principale : un grand datacenter consomme autant qu'une ville de 50 000 habitants. Le PUE (Power Usage Effectiveness) mesure l'efficacité : 1.0 = parfait, 1.2 = excellent (Google y est), 2.0 = médiocre.</p>
<p><strong>Régions et Availability Zones (AWS/GCP/Azure) :</strong> les hyperscalers organisent leur infrastructure en régions géographiques (ex: eu-west-1 = Irlande). Chaque région contient 3 à 6 Availability Zones (AZ) — des datacenters physiquement séparés de plusieurs km, avec leur propre alimentation et connectivité réseau, mais reliés par des fibres privées à faible latence. Une panne dans une AZ n'affecte pas les autres. Déployer sur plusieurs AZ est la pratique standard pour les applications à haute disponibilité.</p>
<p><strong>Edge locations / PoP (Point of Presence) :</strong> des nœuds légers déployés dans des villes du monde entier, utilisés par les CDN (Cloudflare a 300+ PoP). Ces nœuds cachent les ressources statiques et terminent les connexions TLS proches des utilisateurs, réduisant la latence. Ce n'est pas du compute général — c'est de la mise en cache et de la distribution de trafic.</p>
<p><strong>Colocation vs cloud public vs on-premise :</strong> trois modèles. On-premise : vous possédez et gérez tout le matériel dans vos locaux. Colocation : vous possédez le matériel mais le placez dans un datacenter tiers qui fournit l'espace, l'énergie et la connectivité. Cloud public : vous ne possédez rien, vous louez des ressources virtualisées chez un hyperscaler. Chaque modèle a des compromis de contrôle, de coût, de scalabilité et de conformité réglementaire.</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que "haute disponibilité" ne signifie pas "toujours disponible" — ça signifie "conçu pour réduire le risque de downtime et en limiter l'impact". Les pannes physiques arrivent : disques qui lâchent, fibres qui brûlent, bugs firmware qui plantent des cartes réseau. La conception résiliente suppose que tout composant physique peut tomber à tout moment et architecture en conséquence : réplication, failover automatique, backups géo-redondants. Le premier incident en production est souvent le révélateur des hypothèses de disponibilité implicites.</p>`,
        errors: `<p><strong>Pattern 1 — Déployer dans une seule Availability Zone :</strong> créer toute son infrastructure dans une seule AZ par défaut (c'est souvent le comportement par défaut) sans réaliser qu'une panne dans cette AZ rend tout inaccessible. La distribution sur plusieurs AZ est la protection minimale contre les pannes matérielles datacenter.</p>
<p><strong>Pattern 2 — Ignorer la géographie dans les choix de région :</strong> déployer en us-east-1 par habitude ou parce que c'est le défaut, alors que la majorité des utilisateurs sont en Europe. La latence de 80 à 100ms supplémentaire est perçue par les utilisateurs sur chaque interaction. Pour un public géographiquement dispersé, une stratégie multi-région ou CDN est nécessaire.</p>
<p><strong>Pattern 3 — Confondre CDN et edge compute :</strong> croire qu'un CDN peut exécuter de la logique applicative complexe. Un CDN classique met en cache des réponses statiques. L'edge compute (Cloudflare Workers, Lambda@Edge) exécute du code aux nœuds edge — mais avec des contraintes fortes (temps d'exécution limité, pas d'accès aux bases de données distantes, APIs restreintes). Ce n'est pas interchangeable avec un serveur d'application standard.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les technologies de refroidissement (air → eau → refroidissement liquide direct), les densités de calcul, les nouveaux fournisseurs cloud. <strong>Ce qui ne change pas :</strong> le modèle de base régions/AZ pour la résilience géographique, le principe de séparation physique pour l'isolation des pannes, et la contrainte fondamentale de l'énergie et du refroidissement qui détermine les coûts d'infrastructure.</p>`,
        practice: {
          exercices: [
            {
              titre: "Évaluer une décision de déploiement sous l'angle physique",
              etapes: [
                "Prends un projet que tu déploies ou que tu vas déployer. Identifie où se trouvent géographiquement tes utilisateurs principaux.",
                "Choisis une région cloud et vérifie sa distance par rapport à tes utilisateurs. Utilise <code>ping</code> vers l'endpoint de la région pour mesurer la latence réelle.",
                "Identifie si ton déploiement couvre plusieurs Availability Zones. Si non, évalue le risque : qu'arrive-t-il si l'AZ unique tombe ?",
                "Estime l'impact d'un CDN pour les ressources statiques de ton projet : quelle réduction de latence pour les utilisateurs distants ?",
              ],
              output: "Décision de déploiement documentée : région choisie + justification géographique + stratégie AZ + évaluation CDN.",
              critere: "La justification doit s'appuyer sur des latences mesurées, pas des estimations génériques.",
            },
          ],
          piege: "Traiter le choix de région cloud comme une décision arbitraire ou basée uniquement sur le prix. La géographie des datacenters détermine directement la latence pour vos utilisateurs — et la latence est l'une des métriques les plus corrélées à la satisfaction utilisateur et aux taux de conversion.",
        },
        verification: [
          "Quelle est la différence entre une Région et une Availability Zone dans l'infrastructure AWS/GCP/Azure, et pourquoi distribuer une application sur plusieurs AZ est-il insuffisant pour protéger contre une catastrophe géographique à grande échelle ?",
          "Un service a 60% d'utilisateurs en Europe et est déployé uniquement en us-east-1. Estimez l'impact en latence pour un utilisateur parisien par rapport à un déploiement eu-west-1, et proposez une architecture simple pour servir les deux populations sans doubler les coûts d'infrastructure.",
          "Quelle est la différence entre un CDN classique et une plateforme edge compute comme Cloudflare Workers, et pour quel type de logique applicative chacun est-il adapté ?",
        ],
      },
    },

    reseauxEtendus: {
      id: "reseauxEtendus",
      label: "Réseaux étendus et câbles sous-marins",
      icon: "🌊",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>La fibre optique intercontinentale n'est pas une métaphore. Ce sont des câbles physiques, posés par des navires câbliers spécialisés, qui reposent au fond des océans et transportent 99% du trafic Internet intercontinental. Ces câbles ont des propriétaires, des vulnérabilités physiques (ancres de bateaux, séismes sous-marins, sabotage), et une géographie qui détermine les latences intercontinentales. Comprendre cette réalité physique est indispensable pour concevoir des systèmes vraiment globaux.</p>`,
        system: `<p>Les câbles sous-marins constituent la colonne vertébrale physique de l'Internet mondial. Ils sont l'infrastructure sur laquelle reposent tous les protocoles réseau <span class="ref-fiche">→ F06</span> pour les communications intercontinentales, et les datacenters <span class="ref-fiche">→ datacenters</span> y sont connectés en priorité. Leur vulnérabilité physique explique en partie les stratégies de résilience géographique multi-région.</p>`,
        choice: {
          kind: "free",
          html: `<p>L'infrastructure des réseaux étendus :</p>
<p><strong>Les câbles sous-marins :</strong> environ 400 câbles actifs en 2024, totalisant plus de 1,3 million de km. Un câble moderne (ex: 2Africa, 45 000 km, Méta + partenaires) peut transporter 180 Tbps. La fibre dans un câble sous-marin est protégée par plusieurs couches : fibre, gel de remplissage, tube en acier, armature d'acier, gaines de polyéthylène. En eau profonde, le câble a le diamètre d'un tuyau d'arrosage (25mm). En eau peu profonde (zone à risque d'ancres), il est blindé et peut atteindre 50mm. Les câbles sont posés et entretenus par une dizaine de navires câbliers dans le monde — une rupture peut prendre des semaines à réparer.</p>
<p><strong>Les Points d'Échange Internet (IXP — Internet Exchange Point) :</strong> infrastructures physiques où des centaines d'opérateurs de réseaux (FAI, CDN, grandes entreprises) se connectent directement pour échanger du trafic sans passer par un transit tiers. L'IXP DE-CIX de Francfort est le plus grand au monde (~15 Tbps de trafic moyen). L'IXP de Paris (France-IX) traite ~5 Tbps. Sans IXP, un email de Free vers Orange en France passerait par des serveurs aux États-Unis. Les IXP maintiennent le trafic local et réduisent la latence et les coûts de transit.</p>
<p><strong>Les opérateurs de transit :</strong> quand deux réseaux ne sont pas directement connectés (pas d'IXP commun, pas d'accord de peering), ils passent par un opérateur de transit qui achemine le trafic contre paiement. Les Tier 1 (AT&T, Lumen/CenturyLink, NTT, Telia) constituent l'épine dorsale d'Internet — ils ont des accords de peering entre eux (ils s'échangent du trafic gratuitement) et constituent le "backbone" dont dépendent tous les autres.</p>
<p><strong>Les réseaux mobiles (4G/5G) :</strong> les antennes cellulaires sont reliées à des stations de base (BTS) par fibre ou par faisceau hertzien. Les BTS sont reliées au coeur de réseau mobile (EPC pour 4G, 5GC pour 5G) par fibre. Le coeur du réseau mobile se connecte finalement à Internet via des routeurs d'opérateur. La "connexion mobile" est donc : radio → antenne → fibre → réseau opérateur → Internet. La radio est la seule partie sans fil — tout le reste est fibré.</p>`,
        },
        senior: `<p>Un développeur expérimenté qui conçoit un système global ne suppose pas que les connexions intercontinentales sont fiables par nature. Les coupures de câbles sous-marins surviennent plusieurs fois par an (ancres, séismes, corrosion). La stratégie : architecturer pour la dégradation gracieuse quand une région devient inaccessible, pas seulement pour la haute disponibilité dans un datacenter. Les CDN, la réplication géographique des données, et le design d'APIs tolérantes aux pannes partielles sont les réponses techniques à la fragilité physique du réseau.</p>`,
        errors: `<p><strong>Pattern 1 — Croire que la redondance logicielle compense les pannes physiques :</strong> déployer en multi-région avec réplication automatique, puis constater qu'en cas de coupure de câble sous-marin, la synchronisation inter-région est interrompue et les données divergent. La panne physique du lien réseau casse les hypothèses de la réplication logicielle. Les modes de dégradation doivent être testés explicitement.</p>
<p><strong>Pattern 2 — Ignorer l'impact des IXP dans le choix d'hébergement :</strong> choisir un hébergeur qui n'est pas connecté aux IXP locaux majeurs. Pour un service destiné à des utilisateurs français, un hébergeur non connecté à France-IX ou AMS-IX aura systématiquement une latence et des coûts de transit supérieurs à un hébergeur connecté. Cette information est publique et consultable.</p>
<p><strong>Pattern 3 — Traiter les latences intercontinentales comme compressibles :</strong> promettre des temps de réponse inférieurs à 50ms pour des utilisateurs en Australie quand le serveur est en Europe (~150ms de latence aller-retour minimum, même avec une infrastructure parfaite). Les contraintes physiques sont incompressibles — la solution est de déployer un nœud géographiquement proche des utilisateurs, pas d'optimiser le code.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la capacité des câbles sous-marins augmente régulièrement, de nouveaux câbles sont posés, les IXP s'agrandissent, la 5G millimétrique étend la connectivité mobile. <strong>Ce qui ne change pas :</strong> la vitesse de la lumière dans la fibre comme limite physique absolue, la vulnérabilité des câbles sous-marins aux accidents physiques, et le rôle critique des IXP pour maintenir le trafic local et réduire les coûts de transit.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cartographier la connectivité d'un service déployé",
              etapes: [
                "Identifie le fournisseur et la région de ton hébergement actuel (ou de l'hébergement d'un service que tu utilises).",
                "Sur bgp.he.net ou peeringdb.com, cherche si ce fournisseur est connecté aux IXP majeurs de ta région.",
                "Lance <code>traceroute</code> vers ton service depuis une machine distante (ou utilise un outil en ligne comme traceroute.org) et identifie les AS (Autonomous Systems) traversés.",
                "Sur la carte des câbles sous-marins, identifie quel câble tes requêtes intercontinentales utilisent probablement, et cherche ses incidents récents.",
              ],
              output: "Carte de connectivité du service : fournisseur, IXP connectés, AS traversés, câble sous-marin potentiel pour les connexions internationales.",
              critere: "La carte doit permettre d'identifier au moins un point de dépendance physique non redondé.",
            },
          ],
          piege: "Penser que les pannes de câbles sous-marins sont des événements historiques rares. En réalité, il y a plusieurs incidents documentés par an, et certains ont des impacts régionaux significatifs. Le site TeleGeography recense les incidents — consulter cette liste change radicalement la perception de la 'fiabilité naturelle' d'Internet.",
        },
        verification: [
          "Qu'est-ce qu'un IXP (Internet Exchange Point) et pourquoi son existence réduit-elle à la fois la latence et les coûts pour les utilisateurs d'un service hébergé dans la même zone géographique ?",
          "Un service est déployé en Europe, entièrement sur une seule région cloud, avec réplication automatique vers une deuxième région en Asie. Un câble sous-marin reliant l'Europe et l'Asie est sectionné pendant 72 heures. Décrivez les défaillances en cascade qui peuvent se produire et comment une architecture bien conçue devrait s'en accommoder.",
          "La latence minimale incompressible entre un serveur à Paris et un utilisateur à Sydney est d'environ 160ms aller-retour. Un client demande une expérience 'instantanée' pour ses utilisateurs australiens avec le serveur en Europe. Quelle est la seule solution architecturale possible, et pourquoi l'optimisation du code ne peut pas résoudre ce problème ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "vocabulaireHardware", x: 10, y: 100, w: 185, h: 65 },
        { id: "datacenters", x: 340, y: 40, w: 155, h: 65 },
        { id: "reseauxEtendus", x: 620, y: 100, w: 175, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 338, y2: 72, label: "équipe" },
        { x1: 195, y1: 148, x2: 618, y2: 148, label: "relie" },
        { x1: 495, y1: 72, x2: 618, y2: 120, label: "connecte" },
      ],
    },
  },
});
