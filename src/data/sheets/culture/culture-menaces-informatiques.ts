import { cultureSheet } from "./culture-common";

export const cultureMenacesInformatiques = cultureSheet({
  id: "culture-F08",
  number: 8,
  title: "Les Principales Menaces Informatiques",
  subtitle: "Virus, trojans, phishing, ransomware, déni de service — reconnaître ce à quoi on a affaire avant d'agir",
  badge: "Fiche F08",
  meta: ["4 nœuds"],
  readingTime: "20 min",
  description: "Avant de savoir se défendre, il faut savoir nommer. Virus, trojan, phishing, ransomware et déni de service sont des termes omniprésents dans les médias mais souvent mal compris — confondus, exagérés ou sous-estimés. Cette fiche pose les définitions exactes, les distinctions clés et les caractéristiques reconnaissables de chaque type de menace, pour qu'un développeur puisse raisonner avec précision sur les risques qui concernent son code, ses utilisateurs et son organisation.",
  accent: "modele",

  nodes: {
    virusTrojan: {
      id: "virusTrojan",
      label: "Virus et chevaux de Troie",
      icon: "🦠",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les termes "virus" et "trojan" sont utilisés de façon interchangeable dans le langage courant, ce qui masque une distinction technique fondamentale. Un virus se réplique en s'attachant à d'autres fichiers. Un cheval de Troie (trojan) se présente comme un logiciel légitime pour tromper l'utilisateur. Ces deux menaces ont des vecteurs d'infection, des comportements et des méthodes de détection radicalement différents. Les confondre, c'est appliquer les mauvaises protections.</p>`,
        system: `<p>Les virus et trojans sont les formes les plus anciennes de malwares — ils précèdent Internet tel qu'on le connaît. Ils constituent la base de compréhension sur laquelle s'appuient les mécanismes d'attaque <span class="ref-fiche">→ F09</span> et les méthodes de protection <span class="ref-fiche">→ F10</span>. Ils sont distincts du phishing <span class="ref-fiche">→ phishing</span> (qui cible l'humain) et du ransomware <span class="ref-fiche">→ ransomwareDdos</span> (qui les utilise comme vecteur de déploiement).</p>`,
        choice: {
          kind: "free",
          html: `<p>Définitions précises et distinctions :</p>
<p><strong>Virus informatique :</strong> programme malveillant qui se réplique en s'injectant dans d'autres fichiers exécutables ou documents. Analogie biologique exacte : comme un virus biologique a besoin d'une cellule hôte, un virus informatique a besoin d'un fichier hôte pour se propager. Caractéristiques : auto-réplication, nécessite une action de l'utilisateur pour s'activer (ouvrir le fichier infecté), peut rester dormant longtemps avant d'exécuter sa charge utile (payload). Types courants : virus de fichier (infecte les .exe), virus de macro (infecte les documents Office), virus de secteur de démarrage (infecte le MBR du disque).</p>
<p><strong>Cheval de Troie (Trojan) :</strong> programme malveillant déguisé en logiciel légitime ou utile. Contrairement au virus, le trojan ne se réplique pas — il est distribué délibérément par l'attaquant, installé volontairement par la victime qui croit installer autre chose. Exemples : un générateur de clé de licence qui installe un keylogger, une application mobile piratée qui exfiltre les contacts, un faux antivirus qui installe de vrais malwares. Les trojans sont souvent des "droppers" — ils livrent et installent d'autres malwares (ransomware, spyware, botnet client).</p>
<p><strong>Worm (ver) :</strong> souvent confondu avec un virus, un ver se propage sans fichier hôte et sans action de l'utilisateur. Il exploite des vulnérabilités réseau pour se copier d'une machine à l'autre. WannaCry (2017) était un worm qui exploitait EternalBlue (vulnérabilité SMB Windows). Un ver peut infecter des milliers de machines en heures.</p>
<p><strong>Rootkit :</strong> malware conçu pour masquer sa présence sur un système en modifiant le système d'exploitation lui-même (hooks noyau, modification des appels système). Un rootkit peut cacher d'autres malwares, des processus, des fichiers ou des connexions réseau aux outils de détection normaux. Particulièrement difficile à détecter et supprimer.</p>
<p><strong>La famille des malwares :</strong> virus, trojan, worm, rootkit, spyware, adware, keylogger, botnet client sont tous des types de malwares (malicious software). Le terme "malware" est générique — "virus" est spécifique à la réplication par fichier hôte.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que la distinction virus/trojan a des implications pratiques directes. La protection contre les virus repose sur la détection de signatures et les comportements de réplication. La protection contre les trojans repose sur la vérification de l'intégrité des logiciels (signatures cryptographiques, checksums), la gestion des droits d'installation, et la sensibilisation des utilisateurs. Un trojan sophistiqué peut être invisible pour un antivirus si sa signature est inconnue — c'est pourquoi les supply chain attacks (compromission d'un paquet npm légitime pour y injecter du code malveillant) sont si efficaces.</p>`,
        errors: `<p><strong>Pattern 1 — Croire que l'antivirus suffit :</strong> supposer qu'un antivirus à jour protège contre tous les trojans. Un antivirus détecte les signatures connues. Un trojan zero-day ou un trojan distribué via un paquet légitime (supply chain attack) n'a pas de signature connue au moment de l'infection. La détection comportementale et la gestion des droits complètent la signature.</p>
<p><strong>Pattern 2 — Confondre vecteur et charge utile :</strong> un trojan est un vecteur de livraison, pas une charge utile intrinsèque. Ce que le trojan installe peut être n'importe quoi : keylogger, ransomware, agent de botnet, backdoor. Identifier "c'est un trojan" ne dit pas ce qu'il fait — il faut analyser ce qu'il déploie.</p>
<p><strong>Pattern 3 — Ignorer les malwares sur mobile :</strong> croire que les smartphones sont immunisés. Les trojans Android (applications piratées distribuées hors du Play Store, ou applications légitimes compromises) sont courants. iOS est plus restrictif mais non immunisé — des trojans ont été distribués via des profils MDM frauduleux ou des apps de l'App Store elle-même.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les vecteurs de distribution (clé USB → email → web → supply chain npm/pip), les techniques d'obfuscation, les familles de malwares détectées. <strong>Ce qui ne change pas :</strong> la distinction conceptuelle entre auto-réplication (virus/worm) et déguisement (trojan) ; la nécessité d'un vecteur humain ou réseau pour l'infection initiale ; le modèle attaquant/vecteur/payload.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cartographier les vecteurs d'entrée potentiels d'un projet",
              etapes: [
                "Liste toutes les dépendances externes de ton projet (npm/pip/autre). Identifie lesquelles ont accès à des ressources sensibles (réseau, fichiers système, variables d'environnement).",
                "Cherche si l'une de tes dépendances a eu un incident de supply chain dans les 2 dernières années (recherche '<nom-paquet> supply chain attack' ou '<nom-paquet> malware').",
                "Vérifie que ton projet utilise des checksums ou un lock file pour figer les versions exactes des dépendances.",
                "Identifie le scénario le plus probable d'infection de ta machine de développement (clé USB inconnue, exécutable téléchargé, extension navigateur, paquet npm malveillant).",
              ],
              output: "Carte des vecteurs d'entrée potentiels classés par probabilité et impact, avec une action de réduction pour le risque le plus élevé.",
              critere: "Au moins un vecteur identifié doit être concret et spécifique à ton contexte — pas une liste générique copiée d'un article.",
            },
          ],
          piege: "Croire que les développeurs ne sont pas des cibles. Les machines de développement ont accès aux secrets, aux dépôts de code, aux systèmes de déploiement — elles sont des cibles de haute valeur. Un trojan sur la machine d'un développeur peut compromettre toute l'infrastructure d'une organisation.",
        },
        verification: [
          "Quelle est la différence fondamentale entre un virus et un cheval de Troie en termes de mécanisme de propagation, et pourquoi cette distinction implique des stratégies de protection différentes ?",
          "Un package npm populaire est compromis par un attaquant qui y injecte du code malveillant. De quel type de menace s'agit-il, et pourquoi un antivirus classique à signatures ne le détectera probablement pas au moment de l'installation ?",
          "Un rootkit modifie les appels système du noyau pour masquer sa présence. Pourquoi cette technique rend-elle la détection par un antivirus classique inefficace, et quelle approche alternative permet de le détecter ?",
        ],
      },
    },

    phishing: {
      id: "phishing",
      label: "Le phishing",
      icon: "🎣",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le phishing est responsable de plus de 80% des incidents de sécurité dans les organisations selon les rapports annuels de sécurité (Verizon DBIR). Ce n'est pas une attaque technique — c'est une attaque sur le jugement humain. La raison de son efficacité persistante : les défenses techniques (antivirus, pare-feu, WAF) ne peuvent pas filtrer la tromperie sociale. Un email qui ressemble à celui de votre banque, avec un lien HTTPS valide vers un domaine quasi-identique, passe la plupart des filtres. L'humain reste la vulnérabilité la plus difficile à patcher.</p>`,
        system: `<p>Le phishing est un vecteur d'infection qui peut délivrer des trojans <span class="ref-fiche">→ virusTrojan</span>, initier des attaques de ransomware <span class="ref-fiche">→ ransomwareDdos</span>, ou voler des credentials. Il repose sur les mécanismes psychologiques et techniques détaillés dans <span class="ref-fiche">→ F09</span>. Les méthodes de protection spécifiques sont dans <span class="ref-fiche">→ F10</span>. Comprendre le phishing comme vecteur est indispensable pour concevoir une API qui résiste aux tentatives de vol de tokens <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>La taxonomie du phishing :</p>
<p><strong>Phishing de masse :</strong> emails envoyés par millions avec un prétexte générique (votre compte PayPal est suspendu, votre colis est bloqué). Taux de succès faible (~1–3%) mais l'échelle compense. L'attaquant ne connaît pas les victimes — il pêche au filet.</p>
<p><strong>Spear phishing :</strong> attaque ciblée sur une personne ou une organisation spécifique. L'attaquant a fait des recherches préalables (LinkedIn, site web de l'entreprise, réseaux sociaux) pour personnaliser l'email. Le taux de succès est bien plus élevé (~30%). Exemple : email prétendant venir du PDG de l'entreprise (CEO fraud / Business Email Compromise), demandant un virement urgent à un nouveau fournisseur.</p>
<p><strong>Vishing (voice phishing) :</strong> phishing par téléphone. L'attaquant se fait passer pour le support technique, la banque, ou l'administration fiscale. Efficace car le canal vocal crée un sentiment d'urgence et d'authenticité difficile à évaluer rapidement.</p>
<p><strong>Smishing (SMS phishing) :</strong> phishing par SMS. Messages frauduleux sur la livraison d'un colis, une amende à payer, un remboursement à réclamer. Les liens courts dans les SMS masquent le domaine de destination.</p>
<p><strong>Quishing (QR phishing) :</strong> phishing via QR codes malveillants, imprimés sur de faux documents ou placés par-dessus des QR codes légitimes dans des lieux publics. Le code QR redirige vers un site de phishing — les utilisateurs ne voient pas l'URL avant de scanner.</p>
<p><strong>Typosquatting et homograph attacks :</strong> le site de phishing utilise un domaine visuellement similaire au domaine légitime (paypa1.com, paypaI.com avec un i majuscule, pаypal.com avec un 'а' cyrillique). Ces domaines peuvent avoir un certificat TLS valide — le cadenas vert ne garantit pas la légitimité du site.</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que le phishing n'est pas uniquement un problème d'utilisateurs naïfs. Les attaques de spear phishing les plus sophistiquées (APT — Advanced Persistent Threats) ciblent les développeurs pour compromettre les systèmes de CI/CD, les accès cloud, ou les dépôts de code. Une campagne APT réussie contre un développeur peut compromettre toute l'infrastructure d'une organisation sans aucune vulnérabilité technique dans le code. La résistance au phishing est une compétence professionnelle, pas seulement une prudence personnelle.</p>`,
        errors: `<p><strong>Pattern 1 — Faire confiance au cadenas HTTPS :</strong> croire qu'un site HTTPS avec certificat valide est forcément légitime. TLS garantit que la connexion est chiffrée et que le domaine dans le certificat correspond à l'URL — pas que ce domaine est celui de l'organisation légitime. Un attaquant peut obtenir un certificat TLS valide pour <em>paypa1.com</em> en quelques minutes.</p>
<p><strong>Pattern 2 — Juger un email uniquement par son apparence visuelle :</strong> se fier à la mise en forme, au logo, et au ton professionnel d'un email pour évaluer sa légitimité. Les templates HTML des emails de phishing sont souvent des copies quasi-parfaites des originaux. L'indicateur fiable est le domaine de l'expéditeur et les liens — pas le visuel.</p>
<p><strong>Pattern 3 — Croire que l'urgence justifie de court-circuiter les procédures :</strong> agir sans vérification sous prétexte que "c'est urgent". L'urgence artificielle est le levier psychologique central du phishing — elle réduit le temps de réflexion et pousse à agir avant de vérifier. Toute demande urgente et inhabituelle mérite une vérification par un canal différent (appel téléphonique, confirmation en personne).</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les prétextes utilisés (colis, impôts, COVID, ChatGPT, codes QR), les canaux (email → SMS → téléphone → QR), les outils de génération (les kits de phishing "as-a-service" ont industrialisé la création de campagnes). <strong>Ce qui ne change pas :</strong> le mécanisme fondamental — tromper une personne pour qu'elle effectue une action (cliquer, saisir, télécharger, virer) en usurpant une identité de confiance. L'ingénierie sociale précède l'informatique et ne disparaîtra pas avec les technologies de détection.</p>`,
        practice: {
          exercices: [
            {
              titre: "Analyser des exemples réels de phishing",
              etapes: [
                "Cherche dans ta boîte spam (ou sur phishtank.com) un email de phishing récent. Identifie les signaux d'alerte : domaine de l'expéditeur, domaine des liens, prétexte utilisé, levier psychologique (urgence, peur, cupidité).",
                "Teste un outil de détection d'URL de phishing (virustotal.com) avec l'URL du lien dans l'email. Observe si elle est signalée.",
                "Identifie le type de phishing (masse, spear, smishing, quishing) et le prétexte utilisé.",
                "Formule les 3 signaux qui t'auraient alerté si tu avais reçu cet email sans être sur tes gardes.",
              ],
              output: "Analyse d'un phishing réel : type, vecteur, prétexte, leviers psychologiques, signaux d'alerte, méthode de vérification qui l'aurait déjoué.",
              critere: "Les signaux identifiés doivent être spécifiques à l'exemple analysé — pas une liste générique.",
            },
          ],
          piege: "Croire qu'on est trop averti pour se faire piéger. Les campagnes de phishing ciblées (spear phishing) sont conçues par des équipes professionnelles qui connaissent leur cible. Des experts en sécurité se font régulièrement piéger par des attaques bien préparées. La modestie et la vérification systématique protègent mieux que la confiance en sa propre vigilance.",
        },
        verification: [
          "Expliquez la différence entre phishing de masse et spear phishing en termes d'investissement de l'attaquant et de taux de succès attendu. Pourquoi les organisations à forte valeur (banques, fournisseurs cloud, éditeurs de logiciels) sont-elles davantage ciblées par le spear phishing ?",
          "Un email de votre 'DRH' demande de re-saisir vos identifiants sur un nouveau portail RH 'urgent pour la clôture de paie'. L'email est parfaitement rédigé, le site a un certificat HTTPS valide. Quels indicateurs vérifiez-vous et quelle action entreprennez-vous avant de saisir quoi que ce soit ?",
          "Pourquoi les solutions purement techniques (filtres anti-spam, antivirus, sandboxing d'URLs) ne peuvent-elles pas éliminer complètement le phishing, et quelle est la seule défense qui reste efficace contre les attaques de spear phishing les plus sophistiquées ?",
        ],
      },
    },

    ransomwareDdos: {
      id: "ransomwareDdos",
      label: "Ransomware et déni de service",
      icon: "🔐",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le ransomware est devenu l'une des menaces les plus coûteuses pour les organisations : en 2023, les rançons versées ont dépassé 1 milliard de dollars selon Chainalysis — sans compter les coûts d'indisponibilité, de reconstruction et de réputation. Le déni de service (DDoS) peut mettre hors ligne des services critiques pendant des heures ou des jours. Ces deux menaces partagent un objectif commun : rendre des systèmes ou des données inutilisables. Comprendre leurs mécanismes, c'est comprendre pourquoi les sauvegardes hors-ligne et la résilience d'infrastructure ne sont pas des luxes.</p>`,
        system: `<p>Le ransomware utilise souvent le phishing <span class="ref-fiche">→ phishing</span> ou des trojans <span class="ref-fiche">→ virusTrojan</span> comme vecteur d'infection initiale. Le DDoS exploite les protocoles réseau <span class="ref-fiche">→ F06</span> et l'infrastructure physique <span class="ref-fiche">→ F07</span> pour saturer les cibles. Les mécanismes précis de ces attaques sont dans <span class="ref-fiche">→ F09</span>. Les protections concrètes sont dans <span class="ref-fiche">→ F10</span> et dans la sécurité applicative <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Ransomware et déni de service : définitions et formes :</p>
<p><strong>Ransomware :</strong> malware qui chiffre les fichiers ou systèmes de la victime et exige une rançon (généralement en cryptomonnaie) pour la clé de déchiffrement. Évolution en 3 phases : (1) 2013–2017 : chiffrement simple des fichiers locaux (CryptoLocker, WannaCry). (2) 2018–2020 : double extorsion — chiffrement + exfiltration des données avec menace de publication (Maze, REvil). (3) 2021+ : triple extorsion — chiffrement + exfiltration + attaques DDoS simultanées pour forcer le paiement.</p>
<p><strong>Ransomware-as-a-Service (RaaS) :</strong> modèle économique où les développeurs du ransomware le louent à des "affiliés" qui s'occupent de l'infection. Les affiliés reversent 20–30% de la rançon. Ce modèle a industrialisé le ransomware — n'importe qui peut lancer une attaque sans compétences techniques. LockBit, ALPHV/BlackCat, Cl0p fonctionnaient en RaaS.</p>
<p><strong>Déni de service (DoS) :</strong> attaque qui vise à rendre un service indisponible en le saturant de requêtes ou en exploitant une vulnérabilité qui provoque son crash. Un DoS simple vient d'une seule source — facilement bloqué par filtrage IP.</p>
<p><strong>DDoS (Distributed Denial of Service) :</strong> attaque DoS distribuée sur des milliers ou millions de machines compromises (botnet). Beaucoup plus difficile à bloquer car le trafic vient de sources légitimes à travers le monde. Types principaux : volumétrique (saturation de bande passante — UDP flood, ICMP flood), applicatif (HTTP flood — simule des utilisateurs légitimes pour épuiser les ressources serveur), protocolaire (SYN flood — exploitation du TCP handshake pour épuiser les connexions).</p>
<p><strong>Attaques DDoS par amplification :</strong> technique qui multiplie l'effet de l'attaque. L'attaquant envoie une petite requête à un serveur public (DNS, NTP, memcached) en usurpant l'adresse IP de la victime. Le serveur répond avec une réponse bien plus grande à la victime. Facteur d'amplification DNS : x28. NTP : x556. Memcached : x50 000.</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que la question n'est pas "sera-t-on ciblé par un DDoS ou un ransomware ?" mais "quand et avec quelle intensité ?". Pour un service en production, les questions préventives sont : existe-t-il des sauvegardes hors-ligne testées régulièrement ? Le plan de reprise d'activité a-t-il été exercé récemment ? Quelle est la résistance aux DDoS de l'infrastructure de déploiement ? Ces questions sont posées avant l'incident, pas pendant.</p>`,
        errors: `<p><strong>Pattern 1 — Sauvegardes connectées :</strong> avoir des sauvegardes automatiques, mais connectées au même réseau que les systèmes de production. Un ransomware qui compromet le réseau chiffrera aussi les sauvegardes. La règle 3-2-1 (3 copies, sur 2 supports différents, dont 1 hors-site et hors-ligne) est le minimum pour résister au ransomware.</p>
<p><strong>Pattern 2 — Payer la rançon comme plan B :</strong> supposer que payer la rançon résout le problème. Les études montrent que 20 à 40% des victimes qui paient ne récupèrent pas toutes leurs données. Payer finance les groupes criminels et fait de l'organisation une cible récurrente (signalement comme "payeur"). Dans certains pays, payer des groupes sanctionnés (OFAC) expose à des poursuites légales.</p>
<p><strong>Pattern 3 — Croire que le CDN ou l'hébergeur protège automatiquement contre les DDoS :</strong> supposer que Cloudflare ou AWS absorbe tous les DDoS sans configuration. Les protections DDoS basiques sont incluses, mais les attaques volumétriques massives ou les attaques applicatives ciblées nécessitent une configuration active (règles WAF, rate limiting, protection L7). Sans configuration, un HTTP flood peut saturer les ressources serveur même derrière un CDN.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les groupes de ransomware (arrêtés, rebrandés, remplacés), les montants des rançons, les vecteurs d'infection, les amplitudes des botnets DDoS. <strong>Ce qui ne change pas :</strong> le modèle fondamental du ransomware (chiffrement + levier de pression) et du DDoS (saturation des ressources) ; la règle 3-2-1 pour les sauvegardes ; l'importance de la résilience conçue avant l'incident, pas après.</p>`,
        practice: {
          exercices: [
            {
              titre: "Évaluer la résilience d'un service face au ransomware et au DDoS",
              etapes: [
                "Pour un projet que tu gères (ou pour un projet fictif), liste toutes les données critiques et leurs sauvegardes actuelles. Applique la règle 3-2-1 : 3 copies, 2 supports différents, 1 hors-ligne. Combien de critères manquent ?",
                "Estime le Recovery Time Objective (RTO — combien de temps pour relancer le service après panne complète) et le Recovery Point Objective (RPO — combien de données perdues dans le pire cas). Ces deux métriques sont-elles documentées quelque part ?",
                "Identifie les points d'entrée potentiels d'une infection ransomware dans ton infrastructure (accès RDP ouverts, emails d'employés, dépendances tierces).",
                "Vérifie si ton infrastructure de déploiement a une protection DDoS active. Si oui, est-elle configurée avec des règles de rate limiting sur les endpoints critiques ?",
              ],
              output: "Évaluation de résilience : état des sauvegardes vs règle 3-2-1, RTO/RPO estimés, 3 points d'entrée identifiés, état de la protection DDoS.",
              critere: "L'évaluation doit produire au moins une action concrète d'amélioration — pas uniquement un constat.",
            },
          ],
          piege: "Croire que les petits services ou les petites organisations ne sont pas des cibles de ransomware. Les groupes de ransomware ciblent délibérément les PME et les collectivités parce qu'elles ont des données valables mais des défenses plus faibles que les grandes entreprises. La médiane des rançons payées est plus basse pour les petites organisations, mais elles paient proportionnellement plus souvent.",
        },
        verification: [
          "Expliquez le modèle de 'double extorsion' utilisé par les ransomwares modernes, et pourquoi ce modèle rend le refus de payer plus difficile que dans les versions antérieures qui chiffraient seulement les fichiers locaux.",
          "Quelle est la différence entre un DDoS volumétrique et un DDoS applicatif (L7), et pourquoi un DDoS applicatif peut-il saturer un serveur avec beaucoup moins de bande passante qu'une attaque volumétrique ?",
          "La règle 3-2-1 de sauvegarde est présentée comme une protection contre le ransomware. Expliquez pourquoi une sauvegarde connectée en permanence au réseau ne satisfait pas cette règle, même si elle est sur un support différent.",
        ],
      },
    },

    panoramaMenaces: {
      id: "panoramaMenaces",
      label: "Panorama des menaces : situer les risques",
      icon: "🗺",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les menaces ne sont pas équivalentes. Un développeur solo sur un projet personnel n'a pas le même profil de risque qu'une équipe qui héberge des données médicales. Savoir quelles menaces cibler en priorité selon son contexte évite de disperser les efforts de protection sur des risques improbables en laissant des risques critiques non traités. Une matrice de risques n'est pas un luxe des grandes organisations — c'est un outil de priorisation indispensable pour des ressources limitées.</p>`,
        system: `<p>Ce panorama synthétise les menaces détaillées dans cette fiche <span class="ref-fiche">→ virusTrojan</span> <span class="ref-fiche">→ phishing</span> <span class="ref-fiche">→ ransomwareDdos</span> pour permettre une priorisation contextuelle. Il prépare directement la compréhension des mécanismes d'attaque <span class="ref-fiche">→ F09</span> et des méthodes de protection <span class="ref-fiche">→ F10</span>. Il dialogue aussi avec la sécurité applicative <span class="ref-fiche">→ P02</span> qui traite les menaces spécifiques aux applications web en production.</p>`,
        choice: {
          kind: "free",
          html: `<p>Grille de priorisation des menaces par profil :</p>
<p><strong>Développeur individuel — risques principaux :</strong> phishing ciblant les credentials GitHub/cloud (accès aux dépôts, aux secrets, aux environnements de déploiement), supply chain attack via dépendances npm/pip, ransomware sur la machine de travail (données et code non sauvegardés). Risque DDoS : faible (pas d'infrastructure publique à cibler).</p>
<p><strong>Startup / petite équipe — risques principaux :</strong> phishing / BEC (Business Email Compromise) ciblant les transferts financiers ou les accès cloud, ransomware via un accès RDP ou un email malveillant, DDoS opportuniste ou par un concurrent. Risque supply chain : élevé si peu de processus de revue des dépendances.</p>
<p><strong>Service en production à utilisateurs — risques principaux :</strong> DDoS si le service est public et critique, phishing ciblant les administrateurs pour prendre le contrôle de l'infrastructure, ransomware via une faille dans l'infrastructure (RDP exposé, VPN non patché), credential stuffing sur les comptes utilisateurs si les mots de passe sont réutilisés.</p>
<p><strong>Entreprise avec données sensibles — risques principaux :</strong> APT (Advanced Persistent Threat) via spear phishing sur les employés clés, ransomware avec double extorsion (chiffrement + menace de publication des données), attaques sur la supply chain logicielle (CI/CD compromise), attaques d'initiés.</p>
<p><strong>Comment évaluer un risque :</strong> Probabilité × Impact = Risque. La probabilité d'être ciblé dépend du profil (taille, secteur, visibilité). L'impact dépend de ce qu'une attaque réussie compromettrait (données, réputation, continuité). Un phishing réussi sur une PME sans sauvegardes peut être plus dévastateur qu'un DDoS sur une entreprise avec une infrastructure résiliente.</p>`,
        },
        senior: `<p>Un développeur expérimenté pense en termes de "kill chain" : l'attaquant doit réussir chaque étape de sa chaîne d'attaque pour atteindre son objectif. Interrompre n'importe quel maillon suffit à déjouer l'attaque. Pour un ransomware : le phishing doit réussir → l'exécution du trojan doit réussir → le mouvement latéral sur le réseau doit réussir → le chiffrement doit réussir. Chaque étape est une opportunité de défense. Cette vision en couches est plus robuste que de chercher une protection unique parfaite.</p>`,
        errors: `<p><strong>Pattern 1 — Se concentrer sur les menaces médiatisées plutôt que probables :</strong> investir du temps à se protéger des APT étatiques alors que son profil de risque réel est le ransomware opportuniste ou le phishing de masse. Les ressources de sécurité doivent aller aux risques les plus probables dans son contexte, pas aux scénarios les plus spectaculaires.</p>
<p><strong>Pattern 2 — Traiter la sécurité comme un état binaire :</strong> croire qu'on est soit "sécurisé" soit "non sécurisé". La sécurité est un continuum — chaque mesure réduit le risque sans l'éliminer. L'objectif est d'augmenter le coût et la difficulté pour l'attaquant jusqu'à ce qu'une cible moins défendue devienne plus attractive.</p>
<p><strong>Pattern 3 — Négliger la menace interne :</strong> se concentrer uniquement sur les attaques externes. Les études montrent que 30 à 40% des incidents de sécurité impliquent un initié — employé malveillant, sous-traitant négligent, ou compte compromis d'un employé. La gestion des accès, le principe de moindre privilège et les journaux d'audit s'appliquent aussi aux membres de l'équipe.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les menaces dominantes de chaque année, les groupes criminels actifs, les vecteurs à la mode. <strong>Ce qui ne change pas :</strong> la pertinence d'une évaluation contextuelle (probabilité × impact) pour prioriser les protections ; le modèle de kill chain comme grille d'analyse ; la supériorité de la défense en profondeur sur une défense unique.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire sa matrice de risques personnelle",
              etapes: [
                "Identifie ton profil : développeur solo, startup, service avec utilisateurs, ou autre. Liste les 3 actifs les plus critiques à protéger (code source, credentials, données utilisateurs, continuité du service).",
                "Pour chaque type de menace (phishing, ransomware, DDoS, supply chain, accès non autorisé), évalue la probabilité (faible/moyenne/élevée) et l'impact en cas de succès (faible/moyen/élevé).",
                "Classe les risques par score (probabilité × impact). Identifie le risque #1.",
                "Vérifie si tu as déjà une protection en place pour ce risque #1. Si non, formule une action concrète réalisable cette semaine.",
              ],
              output: "Matrice 5×2 (menaces × probabilité/impact) avec score et action concrète pour le risque le plus élevé.",
              critere: "La matrice doit être spécifique à ton contexte réel — pas une matrice générique. L'action doit être réalisable seul, cette semaine, sans budget.",
            },
          ],
          piege: "Traiter l'évaluation des risques comme un exercice théorique annuel. Une matrice de risques qui n'est pas mise à jour quand le contexte change (nouveau service lancé, nouvelle dépendance critique, nouveau membre d'équipe) perd sa valeur très rapidement.",
        },
        verification: [
          "Expliquez le concept de 'kill chain' appliqué au ransomware : listez les étapes séquentielles d'une attaque ransomware typique et identifiez pour chaque étape un mécanisme de défense qui pourrait l'interrompre.",
          "Un développeur solo travaille sur une application SaaS avec 500 utilisateurs. Son profil de risque le plus élevé est le phishing ciblant ses credentials cloud ou le ransomware sur sa machine de travail. Justifiez cette priorisation par rapport à un DDoS ou une APT.",
          "Pourquoi la menace interne (initié malveillant ou négligent) est-elle structurellement difficile à traiter avec les mêmes outils que les menaces externes, et quels mécanismes spécifiques y répondent mieux ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "virusTrojan", x: 10, y: 40, w: 160, h: 65 },
        { id: "phishing", x: 10, y: 165, w: 145, h: 65 },
        { id: "ransomwareDdos", x: 270, y: 100, w: 175, h: 65 },
        { id: "panoramaMenaces", x: 560, y: 100, w: 175, h: 65 },
      ],
      edges: [
        { x1: 170, y1: 72, x2: 268, y2: 120, label: "vecteur" },
        { x1: 155, y1: 197, x2: 268, y2: 148, label: "vecteur" },
        { x1: 445, y1: 132, x2: 558, y2: 132, label: "situe" },
      ],
    },
  },
});
