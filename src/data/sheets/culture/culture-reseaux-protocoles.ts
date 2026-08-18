import { cultureSheet } from "./culture-common";

export const cultureReseauxProtocoles = cultureSheet({
  id: "culture-F06",
  number: 6,
  title: "Technologies et Protocoles des Réseaux",
  subtitle:
    "Du modèle OSI à HTTP/3 — comment les machines se parlent, selon quelles règles, et pourquoi ça compte",
  badge: "Fiche F06",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description:
    "Les protocoles réseau sont les grammaires silencieuses qui permettent à deux machines de se comprendre. TCP, UDP, TLS, HTTP, WebSocket — chacun résout un problème précis et accepte un compromis précis. Un développeur web qui comprend ces protocoles peut choisir le bon outil pour le bon problème, diagnostiquer des pannes invisibles, et concevoir des systèmes qui tiennent la charge.",
  accent: "modele",

  nodes: {
    modeleOSI: {
      id: "modeleOSI",
      label: "Le modèle OSI et les couches réseau",
      icon: "🧱",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Sans modèle de référence, chaque constructeur de matériel réseau inventait ses propres protocoles incompatibles entre eux. Dans les années 1970, IBM, DEC et Xerox avaient chacun leur propre pile réseau. L'ISO a défini le modèle OSI en 1984 pour créer un langage commun décrivant comment les réseaux fonctionnent en couches indépendantes. Ce modèle n'est pas seulement historique — il est l'outil de raisonnement qui permet à un développeur de dire "ce problème est à la couche 3, pas à la couche 7" et de chercher au bon endroit.</p>`,
        system: `<p>Le modèle OSI est le cadre de référence pour tout ce qui suit dans cette fiche. TCP et UDP <span class="ref-fiche">→ tcpUdp</span> opèrent à la couche 4 (transport). TLS et HTTPS <span class="ref-fiche">→ tlsHttps</span> opèrent entre les couches 4 et 7. HTTP, WebSocket et les protocoles modernes <span class="ref-fiche">→ protocolesModernes</span> opèrent à la couche 7 (application). La compréhension du vocabulaire réseau <span class="ref-fiche">→ F05</span> est le prérequis de cette fiche.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le modèle OSI en 7 couches — avec ce qui est concret pour un développeur web :</p>
<p><strong>Couche 1 — Physique :</strong> transmission de bits sur un support physique (câble, fibre, ondes radio). Spécifie les tensions électriques, les fréquences, les connecteurs. Les développeurs n'interagissent jamais directement avec cette couche — mais c'est là que la latence physique (vitesse de la lumière dans la fibre) est déterminée.</p>
<p><strong>Couche 2 — Liaison de données :</strong> transfert de trames entre deux machines directement connectées sur le même réseau local. C'est ici que les adresses MAC (adresses physiques des cartes réseau) interviennent. Les switches Ethernet opèrent à cette couche.</p>
<p><strong>Couche 3 — Réseau :</strong> routage des paquets de la source à la destination à travers plusieurs réseaux. C'est la couche IP. Les routeurs opèrent à cette couche. Un paquet IP contient l'adresse IP source et destination, et chaque routeur décide du prochain saut vers la destination.</p>
<p><strong>Couche 4 — Transport :</strong> communication de bout en bout entre deux processus. TCP et UDP opèrent ici. TCP garantit la livraison ordonnée et sans perte. UDP envoie sans garantie. Cette couche ajoute les numéros de port pour identifier les services sur une machine.</p>
<p><strong>Couches 5 et 6 — Session et Présentation :</strong> dans le modèle OSI original, gèrent l'établissement de sessions et le formatage des données (chiffrement, compression). En pratique, ces couches sont absorbées par la couche Application dans les protocoles modernes.</p>
<p><strong>Couche 7 — Application :</strong> protocoles que les applications utilisent directement : HTTP, HTTPS, DNS, SMTP, FTP, WebSocket. C'est la couche avec laquelle les développeurs web interagissent le plus.</p>
<p><strong>Le modèle TCP/IP (modèle Internet) :</strong> en pratique, on utilise souvent le modèle TCP/IP à 4 couches plutôt que l'OSI à 7 : Accès réseau (1+2), Internet (3), Transport (4), Application (5+6+7). C'est plus simple et reflète mieux comment Internet fonctionne réellement.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise le modèle OSI pour localiser rapidement un problème. "Est-ce que le ping fonctionne ?" (couche 3 ok). "Est-ce que telnet sur le port marche ?" (couche 4 ok). "Est-ce que curl retourne une réponse ?" (couche 7 ok). Cette démarche de diagnostic par couches est plus rapide que tenter toutes les solutions en même temps — elle élimine des hypothèses systématiquement.</p>`,
        errors: `<p><strong>Pattern 1 — Chercher à la mauvaise couche :</strong> passer des heures à déboguer le code applicatif alors que le problème est un pare-feu qui bloque le port (couche 4) ou une route réseau absente (couche 3). La démarche couche par couche — physique → réseau → transport → application — évite ce piège.</p>
<p><strong>Pattern 2 — Confondre adresse MAC et adresse IP :</strong> l'adresse MAC est l'identifiant physique d'une carte réseau (couche 2), immuable sur le LAN. L'adresse IP est l'identifiant logique assigné à une interface (couche 3), changeable et routable. NAT traduit les IPs privées en IPs publiques à la frontière d'un réseau — c'est pourquoi votre box Internet a une IP publique alors que votre machine a une IP privée (192.168.x.x).</p>
<p><strong>Pattern 3 — Traiter le modèle OSI comme purement théorique :</strong> mémoriser les 7 couches sans les relier à des outils et protocoles réels. Chaque couche correspond à des outils de diagnostic concrets : ping (couche 3), telnet/netcat (couche 4), curl/wget (couche 7). Le modèle est un outil opérationnel.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les protocoles spécifiques à chaque couche évoluent (IPv4 → IPv6, HTTP/1 → HTTP/3), de nouveaux protocoles émergent (QUIC). <strong>Ce qui ne change pas :</strong> le principe de séparation en couches — chaque couche a une responsabilité définie et communique uniquement avec la couche adjacente. Ce principe de modularité est ce qui rend possible l'évolution indépendante des protocoles à chaque couche.</p>`,
        practice: {
          exercices: [
            {
              titre: "Diagnostiquer un problème réseau couche par couche",
              etapes: [
                "Choisis un service web que tu déploies ou que tu utilises, et simule un problème de connectivité en bloquant temporairement l'accès.",
                "Applique le diagnostic par couches : ping (couche 3 — IP disponible ?), puis <code>telnet IP port</code> ou <code>nc -zv IP port</code> (couche 4 — port ouvert ?), puis <code>curl -v https://service</code> (couche 7 — réponse HTTP ?).",
                "Identifie à quelle couche le problème apparaît et traduis-le en une action correctrice précise (ouvrir un port dans le pare-feu, corriger une route réseau, corriger un certificat TLS).",
              ],
              output:
                "Rapport de diagnostic avec la couche identifiée, la commande qui a révélé le problème, et l'action correctrice.",
              critere:
                "Le diagnostic doit utiliser les commandes par couche dans l'ordre — pas sauter directement à la couche application si les couches inférieures n'ont pas été vérifiées.",
            },
          ],
          piege:
            "Mémoriser les 7 couches par leur numéro sans les ancrer dans des outils et des scénarios réels. 'La couche 4 est le transport' est inutile si tu ne sais pas que c'est là que TCP et les ports vivent, et que c'est ce que tu vérifies avec <code>netstat</code> ou <code>ss</code>.",
        },
        verification: [
          "À quelle couche du modèle OSI opèrent respectivement un switch, un routeur, et un serveur HTTP ? Expliquez pourquoi cette distinction permet de localiser rapidement un problème réseau.",
          "Votre application ne peut pas se connecter à une base de données distante. Ping répond, mais la connexion au port 5432 échoue. À quelle couche est le problème, et quelles sont les deux causes les plus probables ?",
          "Pourquoi le modèle TCP/IP à 4 couches est-il plus utilisé en pratique que le modèle OSI à 7 couches, et quelles couches OSI a-t-il fusionnées ?",
        ],
      },
    },

    tcpUdp: {
      id: "tcpUdp",
      label: "TCP, UDP et les protocoles de transport",
      icon: "🔁",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Toutes les données qui voyagent sur Internet ne nécessitent pas les mêmes garanties. Envoyer un email exige que chaque octet arrive intact et dans l'ordre. Streamer une vidéo en temps réel tolère quelques paquets perdus mais ne peut pas attendre qu'ils soient retransmis. Cette différence fondamentale a produit deux protocoles de transport distincts : TCP pour la fiabilité, UDP pour la vitesse. Choisir l'un ou l'autre change complètement les propriétés d'une application — et confondre les deux produit des architectures inadaptées.</p>`,
        system: `<p>TCP et UDP opèrent à la couche 4 du modèle OSI <span class="ref-fiche">→ modeleOSI</span> et constituent le socle sur lequel tous les protocoles applicatifs sont bâtis. HTTP/1.1 et HTTP/2 tournent sur TCP. HTTP/3 tourne sur QUIC, qui est lui-même bâti sur UDP. WebSocket et gRPC tournent sur TCP. La compréhension de ces protocoles éclaire directement les choix d'architecture de l'API <span class="ref-fiche">→ T07</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>TCP vs UDP : le compromis fondamental :</p>
<p><strong>TCP (Transmission Control Protocol) :</strong> protocole fiable et ordonné. Mécanisme central : le "three-way handshake" (SYN → SYN-ACK → ACK) établit une connexion avant tout échange de données. TCP garantit que chaque paquet arrive, dans l'ordre, sans doublon. Si un paquet est perdu, TCP le détecte (via les numéros d'accusé de réception) et le retransmet. Le contrôle de congestion TCP ralentit l'envoi si le réseau est saturé. Ce confort a un coût : latence d'établissement de connexion, overhead des acquittements, et blocage "head-of-line" (un paquet perdu bloque tous les suivants en attente de retransmission).</p>
<p><strong>UDP (User Datagram Protocol) :</strong> protocole sans connexion, non fiable, non ordonné. Envoie les paquets et oublie — aucun accusé de réception, aucune retransmission, aucune garantie d'ordre. Ce que UDP perd en fiabilité, il le gagne en vitesse et en simplicité. L'absence de handshake initial supprime la latence de connexion. L'absence d'accusés de réception réduit l'overhead. Utilisé pour : DNS (résolutions rapides), jeux en ligne temps réel, streaming vidéo, appels VoIP, et maintenant HTTP/3 via QUIC.</p>
<p><strong>Cas d'usage selon le protocole :</strong></p>
<p>TCP : HTTP/1.1, HTTP/2, SMTP (email), FTP, SSH, connexions base de données — tout ce où la perte de données est inacceptable.</p>
<p>UDP : DNS, DHCP, streaming UDP, jeux en ligne, VoIP (Skype, Zoom), QUIC/HTTP/3 — tout ce où la rapidité prime sur la fiabilité absolue, ou où l'application gère elle-même la fiabilité (comme QUIC qui réimplémente la fiabilité de TCP avec moins de latence).</p>
<p><strong>QUIC et HTTP/3 :</strong> QUIC est un protocole bâti sur UDP par Google qui réimplémente les garanties de TCP mais en éliminant ses limitations. Il intègre TLS nativement (pas de négociation séparée), élimine le blocage head-of-line au niveau transport, et permet la reconnexion sans nouveau handshake complet. HTTP/3, bâti sur QUIC, est maintenant supporté par les grands navigateurs et CDN.</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit UDP (via WebRTC ou une lib custom) pour les cas où la latence prime sur la fiabilité — jeux multijoueur, visioconférence, streaming temps réel. Il sait que dans ces cas, mieux vaut afficher une frame légèrement dégradée que geler l'image pendant la retransmission d'un paquet perdu. Il sait aussi que DNS utilise UDP par défaut (requêtes courtes, latence critique) mais bascule sur TCP pour les réponses trop grandes. Ces décisions de conception sont des compromis conscients, pas des accidents.</p>`,
        errors: `<p><strong>Pattern 1 — Supposer que TCP garantit la livraison dans tous les cas :</strong> TCP garantit la livraison si la connexion reste établie. Si la connexion TCP se coupe en milieu de transfert, les données non encore transmises sont perdues. Les applications robustes implémentent leur propre logique de reprise de transfert au-dessus de TCP (ex: reprise de téléchargement interrompu).</p>
<p><strong>Pattern 2 — Utiliser TCP pour tout par "sécurité" :</strong> choisir TCP par défaut sans évaluer si les garanties de TCP sont nécessaires. Pour un service de monitoring qui envoie des métriques toutes les secondes, perdre 0,1% des paquets est acceptable — l'overhead de TCP est injustifié. UDP avec une logique de retransmission custom peut être plus adapté.</p>
<p><strong>Pattern 3 — Ignorer le handshake dans les métriques de latence :</strong> mesurer les performances d'une API sans tenir compte du coût du TCP handshake initial. Sur une connexion intercontinentale, le handshake seul peut coûter 200ms. HTTP keep-alive et HTTP/2 multiplex réutilisent les connexions pour amortir ce coût — ne pas les activer annule ce bénéfice.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les implémentations (QUIC remplace partiellement TCP pour HTTP/3), les optimisations des stacks réseau OS, les protocoles overlay. <strong>Ce qui ne change pas :</strong> le compromis fondamental entre fiabilité et latence ; TCP quand l'ordre et la complétude sont critiques, UDP quand la vitesse ou la flexibilité prime. Ce compromis est indépendant de la technologie.</p>`,
        practice: {
          exercices: [
            {
              titre: "Observer TCP et UDP en action",
              etapes: [
                "Dans le terminal, lance <code>netstat -an</code> (ou <code>ss -an</code> sur Linux). Identifie les connexions TCP établies et les ports UDP en écoute.",
                "Lance <code>curl -v --http1.1 https://httpbin.org/get</code> et observe dans la sortie verbose les étapes : résolution DNS, connexion TCP, handshake TLS, requête HTTP.",
                "Compare avec <code>curl -v --http2 https://httpbin.org/get</code> et note les différences dans la négociation de protocole.",
                "Utilise Wireshark (ou tcpdump) pour capturer le trafic DNS sur ta machine pendant une navigation. Identifie que les requêtes DNS utilisent UDP.",
              ],
              output:
                "Tableau comparatif TCP vs UDP observé en pratique : connexions actives, handshake visible, trafic DNS capturé.",
              critere:
                "Chaque observation doit relier le comportement observé à un mécanisme de TCP ou UDP expliqué dans la fiche — pas de constat sans explication.",
            },
          ],
          piege:
            "Croire que la différence TCP/UDP ne concerne que les administrateurs réseau. En réalité, les développeurs web font face à ce choix quand ils implémentent du temps réel (WebSocket = TCP, WebRTC = UDP), des métriques (UDP léger vs TCP fiable), ou quand ils diagnostiquent pourquoi un service de streaming se comporte différemment d'une API REST.",
        },
        verification: [
          "Expliquez le 'three-way handshake' de TCP en termes de messages échangés, et estimez son coût en millisecondes pour une connexion Paris-New York avec une latence de 80ms par aller-retour.",
          "Un jeu multijoueur en temps réel doit transmettre la position des joueurs 60 fois par seconde. TCP ou UDP ? Justifiez votre choix en termes de compromis fiabilité / latence / blocage head-of-line.",
          "HTTP/3 est bâti sur QUIC, qui lui-même est bâti sur UDP. Pourquoi choisir UDP comme base pour un protocole destiné à remplacer HTTP/2 (qui tourne sur TCP), et quels problèmes de TCP QUIC résout-il ?",
        ],
      },
    },

    tlsHttps: {
      id: "tlsHttps",
      label: "TLS, HTTPS et la sécurité des échanges",
      icon: "🔒",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>HTTP transmet les données en clair sur le réseau. Sur un Wi-Fi public, n'importe qui avec Wireshark peut lire vos mots de passe, vos sessions, vos messages. Ce problème n'est pas théorique — les attaques "man-in-the-middle" sur des réseaux non chiffrés sont documentées depuis les années 1990. TLS (Transport Layer Security) résout ce problème en chiffrant la communication entre le client et le serveur, en authentifiant l'identité du serveur via des certificats, et en garantissant l'intégrité des données échangées. HTTPS = HTTP + TLS. Aujourd'hui, déployer une application sans HTTPS est une faute de sécurité élémentaire.</p>`,
        system: `<p>TLS s'appuie sur les protocoles de transport TCP/UDP <span class="ref-fiche">→ tcpUdp</span> et constitue la couche de sécurité sur laquelle HTTP opère dans ses versions modernes. Il est la base de la sécurité applicative <span class="ref-fiche">→ P02</span> et conditionne la configuration du déploiement <span class="ref-fiche">→ T10</span>. Comprendre TLS est indispensable pour configurer un certificat, diagnostiquer une erreur HTTPS, ou comprendre pourquoi les mots de passe ne doivent pas être transmis en HTTP.</p>`,
        choice: {
          kind: "free",
          html: `<p>TLS de bout en bout : mécanisme et vocabulaire :</p>
<p><strong>Le handshake TLS :</strong> quand un navigateur se connecte à un serveur HTTPS, un "handshake" TLS est effectué avant tout échange de données applicatives. Schéma simplifié de TLS 1.3 (le plus récent) : (1) Client envoie ses capacités cryptographiques (ClientHello). (2) Serveur choisit la suite cryptographique et envoie son certificat (ServerHello). (3) Les deux parties calculent des clés de session partagées via un algorithme d'échange de clés (Diffie-Hellman). (4) La communication chiffrée commence. TLS 1.3 a réduit le handshake à 1 aller-retour (contre 2 pour TLS 1.2), et avec "0-RTT" pour les reconnexions, à 0 aller-retour supplémentaire.</p>
<p><strong>Les certificats TLS :</strong> un certificat TLS est un fichier qui contient la clé publique du serveur et son identité (nom de domaine), signé par une Autorité de Certification (CA) de confiance. Le navigateur vérifie que le certificat est signé par une CA connue et que le domaine dans le certificat correspond à celui de l'URL. Cette vérification empêche l'usurpation d'identité (un attaquant ne peut pas présenter un faux certificat signé par une CA reconnue). Let's Encrypt a rendu les certificats TLS gratuits depuis 2015 — il n'y a plus aucune excuse pour ne pas utiliser HTTPS.</p>
<p><strong>Ce que TLS garantit :</strong> confidentialité (données chiffrées, illisibles pour un observateur réseau), intégrité (toute modification des données en transit est détectée), authentification du serveur (l'identité du serveur est vérifiée). Ce que TLS ne garantit pas : l'identité de l'utilisateur (c'est le rôle de l'authentification applicative), la sécurité des données une fois sur le serveur, la protection contre les attaques sur l'application elle-même.</p>
<p><strong>HSTS (HTTP Strict Transport Security) :</strong> en-tête HTTP que le serveur envoie pour dire au navigateur "ne te connecte plus jamais à ce domaine en HTTP, toujours HTTPS". Protège contre les attaques de downgrade. Les navigateurs maintiennent une liste de domaines avec HSTS préchargé (incluant google.com, github.com) pour éviter même la première connexion HTTP.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que TLS n'est pas une protection totale. Le certificat authentifie le serveur, pas l'entreprise derrière — un certificat DV (Domain Validation) prouve que quelqu'un contrôle le domaine, pas que ce domaine est légitime. Les attaques de phishing sur des domaines avec certificats valides (ex: "paypal-secure-login.com" avec un certificat TLS valide) exploitent cette confusion. La sécurité nécessite plusieurs couches — TLS est nécessaire mais pas suffisant.</p>`,
        errors: `<p><strong>Pattern 1 — Supposer que HTTPS garantit la sécurité de l'application :</strong> croire qu'un site avec le cadenas vert est nécessairement sûr. HTTPS protège le canal de communication, pas l'application elle-même. Une injection SQL sur un site HTTPS est aussi efficace que sur HTTP. TLS ne protège pas contre les vulnérabilités applicatives.</p>
<p><strong>Pattern 2 — Ignorer les erreurs de certificat en développement :</strong> désactiver la vérification des certificats TLS (<code>--insecure</code> dans curl, <code>NODE_TLS_REJECT_UNAUTHORIZED=0</code>) dans des scripts qui finissent par être copiés en production. Ces désactivations suppriment la vérification d'identité du serveur et ouvrent la porte aux attaques man-in-the-middle.</p>
<p><strong>Pattern 3 — Ne pas renouveler les certificats :</strong> laisser expirer un certificat TLS en production. La solution professionnelle est d'automatiser le renouvellement via Let's Encrypt et certbot (ou l'équivalent du provider cloud). Un certificat expiré rend le service inaccessible pour tous les utilisateurs — les navigateurs affichent une erreur bloquante.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les versions de TLS (TLS 1.0, 1.1 sont dépréciées, TLS 1.2 et 1.3 sont actuelles), les autorités de certification, les algorithmes cryptographiques (RSA → ECDSA). <strong>Ce qui ne change pas :</strong> les trois propriétés fondamentales garanties par TLS (confidentialité, intégrité, authentification du serveur) et le mécanisme de base du handshake asymétrique pour établir des clés de session symétriques.</p>`,
        practice: {
          exercices: [
            {
              titre: "Inspecter un certificat TLS et diagnostiquer une erreur HTTPS",
              etapes: [
                "Dans un navigateur, clique sur le cadenas d'un site HTTPS et explore le certificat : qui l'a émis ? Quelle est sa date d'expiration ? Quel domaine couvre-t-il ?",
                "Lance <code>openssl s_client -connect google.com:443</code> et observe la chaîne de certificats dans la sortie.",
                "Cherche la commande pour vérifier l'expiration d'un certificat en une ligne avec openssl (utile pour les scripts de monitoring).",
                "Consulte les en-têtes HSTS d'un site avec <code>curl -sI https://google.com | grep -i strict</code>. Que dit la valeur <code>max-age</code> ?",
              ],
              output:
                "Rapport : certificat inspecté avec émetteur + expiration + domaine + chaîne CA + politique HSTS.",
              critere:
                "Chaque élément observé doit être relié à un mécanisme TLS expliqué dans la fiche.",
            },
          ],
          piege:
            "Traiter TLS comme un sujet d'administrateur système sans lien avec le développement. En réalité, tout développeur configure des certificats (déploiement), débogue des erreurs TLS (connexions API), et choisit les politiques HSTS et CORS qui conditionnent la sécurité de ses utilisateurs.",
        },
        verification: [
          "Expliquez les trois propriétés que TLS garantit pour une connexion HTTPS, et donnez un exemple concret d'attaque que chaque propriété prévient.",
          "Quelle est la différence entre un certificat DV (Domain Validation) et un certificat EV (Extended Validation), et pourquoi un site de phishing peut-il avoir un certificat TLS valide qui affiche le cadenas vert dans le navigateur ?",
          "TLS 1.3 a réduit le handshake à 1 aller-retour contre 2 pour TLS 1.2. Quel est l'impact concret de cette réduction pour une API appelée depuis un mobile avec une latence de 50ms par aller-retour ?",
        ],
      },
    },

    protocolesModernes: {
      id: "protocolesModernes",
      label: "Protocoles modernes et normes",
      icon: "📡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>HTTP/1.1 a été conçu en 1997 pour des pages web simples avec quelques ressources. En 2024, une page web moyenne charge 90 ressources depuis 20 domaines différents, et les applications temps réel (chats, dashboards live, jeux) exigent des communications bidirectionnelles persistantes. HTTP/1.1 ne supporte aucun de ces besoins efficacement. Les protocoles modernes — HTTP/2, HTTP/3, WebSocket, gRPC — ont été conçus pour résoudre ces limitations. Savoir lequel choisir, c'est savoir quel problème chacun résout.</p>`,
        system: `<p>Ces protocoles s'appuient sur TLS <span class="ref-fiche">→ tlsHttps</span> et TCP/UDP <span class="ref-fiche">→ tcpUdp</span> et se placent au niveau de la couche application <span class="ref-fiche">→ modeleOSI</span>. Ils sont ce que les développeurs configurent directement dans leurs APIs <span class="ref-fiche">→ T07</span> et impactent directement la performance <span class="ref-fiche">→ P03</span>. Les RFC qui les définissent sont les documents normatifs de référence pour comprendre leur comportement précis.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les protocoles modernes et leurs cas d'usage :</p>
<p><strong>HTTP/2 (2015) :</strong> résout les principales limitations d'HTTP/1.1 : multiplexage (plusieurs requêtes sur une seule connexion TCP, éliminant le blocage head-of-line au niveau HTTP), compression des en-têtes (HPACK), server push (le serveur peut envoyer des ressources avant que le client ne les demande). HTTP/2 est bâti sur TLS en pratique (obligatoire dans tous les navigateurs). Supporté par 97% des navigateurs et la majorité des serveurs modernes (Nginx, Apache, Node.js). Cas d'usage : toute API ou application web qui fait plusieurs requêtes simultanées — c'est-à-dire pratiquement tout.</p>
<p><strong>HTTP/3 (2022) :</strong> remplace TCP par QUIC (bâti sur UDP). Élimine le blocage head-of-line au niveau transport (une limitation que HTTP/2 ne pouvait pas résoudre car elle est dans TCP). Réduit la latence des connexions initiales et des reconnexions. Particulièrement bénéfique sur les réseaux mobiles et les connexions instables. Déjà utilisé par Google, Facebook, Cloudflare. Supporté par les navigateurs modernes, mais adoption serveur encore partielle.</p>
<p><strong>WebSocket :</strong> protocole de communication bidirectionnelle persistante sur une seule connexion TCP. Contrairement à HTTP (client demande → serveur répond → connexion fermée), WebSocket maintient la connexion ouverte indéfiniment et permet au serveur d'envoyer des données au client sans requête préalable. Commence par un handshake HTTP (Upgrade: websocket), puis bascule dans un mode binaire bidirectionnel. Utilisé pour : chat temps réel, dashboards live, jeux en ligne multijoueur, notifications push. Limitation : maintenenir des milliers de connexions WebSocket simultanées nécessite une architecture spécifique (pas de load balancing stateless simple).</p>
<p><strong>gRPC :</strong> framework RPC (Remote Procedure Call) de Google, bâti sur HTTP/2 et Protocol Buffers (format binaire de sérialisation). Idéal pour la communication inter-services dans une architecture microservices : fortement typé (le contrat est défini dans un fichier .proto), très performant (binaire vs JSON), supporte le streaming bidirectionnel. Moins adapté pour les APIs publiques (nécessite un client gRPC, pas utilisable directement depuis un navigateur sans grpc-web).</p>
<p><strong>Les RFC et la normalisation :</strong> chaque protocole est défini dans des RFC (Request for Comments) publiées par l'IETF (Internet Engineering Task Force). HTTP/1.1 = RFC 2616 (puis 7230-7235), HTTP/2 = RFC 7540, HTTP/3 = RFC 9114, TLS 1.3 = RFC 8446. Ces documents sont la référence absolue sur le comportement spécifié d'un protocole. Quand un comportement "bizarre" d'une librairie est documenté comme "conforme à la RFC X section Y", c'est là qu'on va vérifier.</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit WebSocket pour le temps réel, mais sait que Server-Sent Events (SSE) est souvent plus simple pour la communication unidirectionnelle serveur → client (flux de logs, notifications, mises à jour de statut). SSE est du HTTP simple, fonctionne avec n'importe quel reverse proxy, et est beaucoup plus facile à déboguer que WebSocket. La règle : n'utiliser WebSocket que si la communication bidirectionnelle est vraiment nécessaire.</p>`,
        errors: `<p><strong>Pattern 1 — Utiliser WebSocket là où SSE suffit :</strong> implémenter WebSocket pour des notifications serveur → client unidirectionnelles (mises à jour de statut, feeds d'activité). WebSocket est plus complexe à déployer, à scaler et à déboguer. SSE (Server-Sent Events) est du HTTP standard, plus simple, et suffisant pour la majorité des cas de communication unidirectionnelle.</p>
<p><strong>Pattern 2 — Ne pas vérifier la version de protocole négociée :</strong> déployer une API HTTP/2 sans vérifier que le client négocie effectivement HTTP/2. Certains proxies, load balancers ou configurations Docker terminent HTTP/2 et transmettent en HTTP/1.1. Le gain de performance escompté disparaît sans erreur visible.</p>
<p><strong>Pattern 3 — Ignorer les RFC comme "trop théoriques" :</strong> ne jamais lire une RFC pour comprendre un comportement protocole. Pourtant, les comportements "non documentés" ou "inattendus" d'une librairie HTTP sont presque toujours dans la RFC. La RFC HTTP/1.1 sur la gestion du cache (RFC 7234) explique pourquoi un proxy cache une réponse qu'on croyait non cacheable.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les versions de protocoles (HTTP/2 → HTTP/3), les formats de sérialisation (JSON → Protocol Buffers → MessagePack), les implémentations. <strong>Ce qui ne change pas :</strong> les modèles de communication fondamentaux — requête/réponse (HTTP), flux unidirectionnel (SSE), bidirectionnel persistant (WebSocket), appel de procédure distante typé (gRPC). Le choix de modèle dépend des besoins applicatifs, pas de la mode.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier le protocole adapté à un cas d'usage",
              etapes: [
                "Prends 3 fonctionnalités d'une application que tu connais ou que tu construis : une API REST classique, un système de notifications temps réel, et une communication entre microservices internes.",
                "Pour chaque fonctionnalité, identifie le protocole le plus adapté parmi : HTTP/1.1, HTTP/2, WebSocket, SSE, gRPC. Justifie en termes de modèle de communication, performance, et complexité de déploiement.",
                "Vérifie quelle version d'HTTP ton serveur actuel négocie avec <code>curl -sI --http2 https://ton-api.com | head -5</code> ou avec les DevTools (onglet Network, colonne Protocol).",
              ],
              output:
                "Tableau de choix de protocole pour 3 cas d'usage avec justification des compromis.",
              critere:
                "Chaque choix doit être justifié par au moins un critère technique concret (modèle de communication, latence, scaling) — pas uniquement par 'c'est ce qu'on utilise normalement'.",
            },
          ],
          piege:
            "Choisir gRPC pour toutes les communications internes parce que c'est ce que font les grandes entreprises. gRPC a une courbe d'apprentissage, des outils de débogage moins accessibles que REST/JSON, et nécessite une gestion de schémas .proto. Pour une petite équipe ou un projet en phase d'exploration, REST JSON HTTP/2 est souvent le meilleur choix — et peut migrer vers gRPC plus tard si le besoin de performance le justifie.",
        },
        verification: [
          "HTTP/2 résout le problème de 'blocage head-of-line' au niveau HTTP, mais pas au niveau TCP. Expliquez la différence, et comment HTTP/3 adresse ce second niveau de blocage.",
          "Une application a besoin d'envoyer des mises à jour de progression d'un long traitement serveur vers le navigateur. Comparez WebSocket et Server-Sent Events pour ce cas d'usage et choisissez le plus adapté en justifiant votre choix.",
          "Une RFC définit le comportement 'spécifié' d'un protocole. Donnez un exemple de situation où lire la RFC correspondante est plus utile que de chercher sur Stack Overflow pour comprendre un comportement inattendu d'une librairie HTTP.",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "modeleOSI", x: 10, y: 100, w: 175, h: 65 },
        { id: "tcpUdp", x: 245, y: 40, w: 155, h: 65 },
        { id: "tlsHttps", x: 245, y: 165, w: 155, h: 65 },
        { id: "protocolesModernes", x: 490, y: 100, w: 185, h: 65 },
      ],
      edges: [
        { x1: 185, y1: 120, x2: 243, y2: 72, label: "couche 4" },
        { x1: 185, y1: 148, x2: 243, y2: 197, label: "sécurise" },
        { x1: 400, y1: 72, x2: 488, y2: 120, label: "structure" },
        { x1: 400, y1: 197, x2: 488, y2: 148, label: "authentifie" },
      ],
    },
  },
});
