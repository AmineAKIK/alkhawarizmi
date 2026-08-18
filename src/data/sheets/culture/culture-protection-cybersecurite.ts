import { cultureSheet } from "./culture-common";

export const cultureProtectionCybersecurite = cultureSheet({
  id: "culture-F10",
  number: 10,
  title: "Protection et Veille en Cybersécurité",
  subtitle:
    "Méthodes concrètes contre les virus, le phishing, le ransomware et le DDoS — plus comment rester à jour",
  badge: "Fiche F10",
  meta: ["5 nœuds"],
  readingTime: "30 min",
  description:
    "Connaître les menaces et comprendre leurs mécanismes mène naturellement ici : quelles protections mettre en place, dans quel ordre, avec quels outils, et comment maintenir ses défenses à jour dans un paysage qui évolue en permanence. Cette fiche est délibérément actionnable — chaque nœud produit des actions concrètes, pas des recommandations génériques.",
  accent: "processus",

  nodes: {
    protectionVirusTrojan: {
      id: "protectionVirusTrojan",
      label: "Se protéger des virus et trojans",
      icon: "🛡",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La protection contre les malwares ne se résume pas à installer un antivirus et l'oublier. Un antivirus à signatures couvre les menaces connues — pas les zero-days, pas les fileless malwares, pas les supply chain attacks. Une stratégie de protection efficace est multicouche : réduire les surfaces d'exposition, détecter les comportements anormaux, limiter les dégâts en cas de compromission. Ces trois axes ensemble produisent une résilience que l'antivirus seul ne peut pas offrir.</p>`,
        system: `<p>Ces protections répondent directement aux mécanismes décrits dans <span class="ref-fiche">→ F09</span>. Elles complètent la sécurité applicative <span class="ref-fiche">→ P02</span> qui traite les vulnérabilités dans le code — ici on traite les vecteurs d'infection de l'environnement de développement et de l'infrastructure. Elles s'appuient sur les pratiques de gestion des dépendances <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les protections par couche :</p>
<p><strong>Couche 1 — Réduction de la surface d'exposition :</strong> principe de moindre privilège pour tous les processus et utilisateurs (un service web ne doit pas tourner en root/admin). Désactivation des services non utilisés (RDP si non nécessaire, SMBv1 absolument). Gestion des droits d'installation (sur les postes de développeurs, limiter les installations non autorisées). Vérification des checksums et signatures des exécutables téléchargés — un fichier .exe légitime a une signature numérique vérifiable.</p>
<p><strong>Couche 2 — Détection :</strong> antivirus avec analyse comportementale (pas uniquement signatures) — Windows Defender est désormais compétent. EDR (Endpoint Detection and Response) pour les environnements professionnels (CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint) — détecte les fileless malwares et les comportements anormaux. Analyse des dépendances : <code>npm audit</code>, <code>pip-audit</code>, Snyk, socket.dev pour les packages npm — détecte les dépendances avec CVE connues ou comportements suspects (accès réseau inattendus).</p>
<p><strong>Couche 3 — Confinement et récupération :</strong> sauvegardes selon la règle 3-2-1 avec au moins une copie hors-ligne ou air-gapped. Sandboxing des applications à risque (navigateur, client email). Segmentation réseau pour limiter le mouvement latéral (les machines de développement ne doivent pas pouvoir atteindre directement les serveurs de production). Scan des images Docker avant déploiement (Trivy, Snyk Container).</p>
<p><strong>Protections spécifiques supply chain :</strong> figer les versions exactes des dépendances dans le lock file (package-lock.json, yarn.lock, requirements.txt avec hash). Activer Dependabot ou Renovate pour les mises à jour de sécurité. Configurer les permissions minimales pour les tokens CI/CD (un token de déploiement ne doit pas pouvoir modifier le code source). Utiliser socket.dev ou similaire pour analyser les packages npm avant installation.</p>`,
        },
        senior: `<p>Un développeur expérimenté traite les clés SSH, les tokens d'API et les identifiants cloud sur sa machine de développement comme autant de surfaces d'attaque. Si sa machine est compromise par un malware, l'attaquant hérite de tout ce qui est accessible depuis cette machine : dépôts GitHub, accès AWS/GCP/Azure, connexions base de données. La règle : chaque credential doit avoir le scope minimal nécessaire, une durée de vie limitée, et être révocable sans impacter toute l'infrastructure.</p>`,
        errors: `<p><strong>Pattern 1 — Stocker des credentials long-terme dans <code>~/.aws/credentials</code> ou <code>~/.ssh</code> sans rotation :</strong> ces fichiers sont les premières cibles d'un malware sur une machine de développeur. Les credentials doivent être rotés régulièrement, avoir des permissions minimales, et une solution de détection d'usage anormal (AWS CloudTrail alerts) doit être en place.</p>
<p><strong>Pattern 2 — Exécuter <code>npm install</code> sur un package inconnu sans vérification :</strong> un simple <code>npm install some-package</code> exécute les scripts <code>preinstall</code> et <code>postinstall</code> du package — qui peuvent faire n'importe quoi avec les permissions du processus en cours. Vérifier socket.dev ou virustotal avant d'installer un package inconnu est une hygiène minimale.</p>
<p><strong>Pattern 3 — Pas de segmentation entre machine dev et accès production :</strong> utiliser le même accès SSH depuis la machine de développement pour se connecter directement aux serveurs de production. En cas de compromission de la machine dev, l'accès production est immédiatement disponible à l'attaquant. La séparation (bastion host, accès production uniquement depuis des machines dédiées ou la CI/CD) réduit drastiquement l'impact d'une compromission locale.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils de détection (AV → EDR → XDR), les vecteurs de supply chain (npm → pip → github actions → docker images), les signatures de malwares connues. <strong>Ce qui ne change pas :</strong> la stratégie multicouche (exposition → détection → confinement) ; le principe de moindre privilège ; la valeur des sauvegardes hors-ligne testées régulièrement.</p>`,
        practice: {
          exercices: [
            {
              titre: "Auditer les credentials et les accès sur sa machine de développement",
              etapes: [
                "Liste toutes les clés SSH présentes dans <code>~/.ssh/</code>. Pour chacune, identifie à quel système elle donne accès et quand elle a été créée. Y en a-t-il d'obsolètes ?",
                "Liste tous les tokens et credentials configurés localement : <code>~/.aws/credentials</code>, variables d'environnement persistantes (<code>~/.bashrc</code>, <code>~/.zshrc</code>), tokens git (<code>git credential-osxkeychain</code> ou équivalent). Tous sont-ils encore nécessaires ?",
                "Pour chaque credential critique (accès cloud, accès production), vérifie ses permissions réelles dans la console du provider. Respectent-elles le principe de moindre privilège ?",
                "Lance <code>npm audit</code> sur un projet actif. Combien de vulnérabilités ? À quel niveau de sévérité ?",
              ],
              output:
                "Inventaire des credentials avec leur scope et leur date de création + résultat npm audit + au moins une action d'amélioration identifiée.",
              critere:
                "Tout credential dont le scope est plus large que nécessaire doit être identifié comme action de réduction immédiate.",
            },
          ],
          piege:
            "Traiter la sécurité de la machine de développement comme moins critique que la sécurité de production. En réalité, la machine de développement est souvent le maillon le plus faible : moins surveillée, avec plus de logiciels installés, utilisée pour des tests avec des droits étendus. Une compromission de machine dev est souvent le vecteur initial d'une attaque sur la production.",
        },
        verification: [
          "Pourquoi l'exécution de <code>npm install</code> depuis un paquet inconnu est-elle potentiellement dangereuse même si le code du paquet lui-même semble inoffensif ?",
          "Un développeur a un credential AWS avec accès <code>AdministratorAccess</code> sur sa machine locale pour 'faciliter le développement'. Identifiez le risque et proposez une configuration d'accès minimale pour le développement local.",
          "Quelle est la différence fonctionnelle entre un antivirus classique à signatures et un EDR, et pourquoi un EDR est-il nécessaire pour détecter les fileless malwares ?",
        ],
      },
    },

    protectionPhishing: {
      id: "protectionPhishing",
      label: "Se protéger du phishing",
      icon: "🎯",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le phishing est la menace pour laquelle la formation humaine est plus efficace que la protection technique. Les filtres anti-spam et les antivirus réduisent le volume, mais une campagne de spear phishing bien préparée passe tous les filtres. La protection efficace combine trois éléments : des mécanismes techniques de réduction du volume (SPF/DKIM/DMARC), une MFA résistante au phishing pour limiter les dégâts d'une credential compromise, et une formation à la reconnaissance des signaux d'alerte.</p>`,
        system: `<p>Ces protections répondent directement aux mécanismes de <span class="ref-fiche">→ mecanismesPhishing</span>. Elles s'appuient sur les protocoles email et DNS <span class="ref-fiche">→ F06</span>. Elles complètent la protection des accès dans la sécurité applicative <span class="ref-fiche">→ P02</span> en ajoutant la dimension humaine et organisationnelle.</p>`,
        choice: {
          kind: "free",
          html: `<p>La protection anti-phishing en 3 couches :</p>
<p><strong>Couche technique — Authentification email :</strong> SPF : publier un enregistrement DNS TXT qui liste les serveurs autorisés à envoyer au nom de votre domaine. Sans SPF, n'importe qui peut envoyer des emails prétendant venir de @votre-domaine.com. DKIM : configurer votre serveur d'envoi pour signer cryptographiquement les emails. Les serveurs récepteurs vérifient la signature avec votre clé publique DNS. DMARC : politique DNS qui dit aux serveurs récepteurs quoi faire si SPF ou DKIM échouent — <em>p=none</em> (ne rien faire, juste signaler), <em>p=quarantine</em> (mettre en spam), <em>p=reject</em> (rejeter). Implémenter DMARC p=reject protège vos utilisateurs des emails frauduleux prétendant venir de votre domaine.</p>
<p><strong>Couche technique — MFA résistante au phishing :</strong> les TOTP (Google Authenticator, Authy) et SMS sont vulnérables au proxying en temps réel. La MFA résistante au phishing utilise FIDO2/WebAuthn : clé physique (YubiKey, Google Titan), ou biométrie liée à l'appareil (Face ID, Touch ID sur macOS/iOS si configuré en WebAuthn). La propriété clé : le challenge WebAuthn inclut le domaine d'origine — une tentative de proxying depuis un faux domaine échoue cryptographiquement. Pour les comptes critiques (cloud, production, GitHub), WebAuthn est la seule MFA vraiment résistante au phishing.</p>
<p><strong>Couche humaine — Formation et réflexes :</strong> les signaux d'alerte à former : domaine de l'expéditeur (pas le display name), correspondance entre domaine et contenu du message, lien dans l'email (hover pour voir l'URL réelle avant de cliquer), urgence artificielle (vérifier par un autre canal avant d'agir), demande inhabituelle d'une personne connue (appeler pour confirmer). La règle de vérification hors-bande : toute demande inhabituelle, urgente ou impliquant de l'argent ou des credentials doit être vérifiée par un autre canal (appel téléphonique sur un numéro connu, confirmation en personne).</p>
<p><strong>Pour les développeurs — Protéger ses services :</strong> implémenter SPF/DKIM/DMARC sur tous les domaines qui envoient des emails (notifications, transactionnels). Utiliser des services d'envoi d'email réputés (SendGrid, Mailgun, Amazon SES) qui simplifient la configuration DKIM. Monitorer les rapports DMARC (outils : DMARC Analyzer, Postmark DMARC) pour détecter les tentatives d'usurpation de votre domaine.</p>`,
        },
        senior: `<p>Un développeur expérimenté implémente DMARC p=reject sur tous ses domaines d'envoi dès que possible — pas comme une décision de sécurité optionnelle mais comme une responsabilité envers ses utilisateurs. Un domaine sans DMARC est un domaine que n'importe quel attaquant peut usurper pour cibler les utilisateurs avec des emails frauduleux semblant venir du service. Cette implémentation est une question d'heures, pas de jours.</p>`,
        errors: `<p><strong>Pattern 1 — Croire que SPF seul suffit :</strong> SPF protège contre l'usurpation du domaine d'envoi, mais pas contre la falsification du champ "From" affiché à l'utilisateur (header "From" vs enveloppe SMTP). Sans DMARC, un attaquant peut contourner SPF en falsifiant uniquement le header "From". C'est SPF + DKIM + DMARC ensemble qui offrent une protection complète.</p>
<p><strong>Pattern 2 — Rester indéfiniment en DMARC p=none :</strong> configurer DMARC avec la politique "none" (surveillance uniquement) et ne jamais passer à "quarantine" puis "reject" par crainte de bloquer des emails légitimes. La politique p=none ne protège personne — elle génère uniquement des rapports. La migration vers p=reject doit être planifiée et exécutée, pas reportée indéfiniment.</p>
<p><strong>Pattern 3 — Utiliser le SMS comme second facteur pour les comptes critiques :</strong> les SMS peuvent être interceptés via SS7 (vulnérabilité des protocoles téléphoniques) ou via SIM swapping (l'attaquant convainc l'opérateur de transférer le numéro vers une carte SIM qu'il contrôle). Pour les accès critiques (cloud production, GitHub, gestionnaire de mots de passe), le SMS est insuffisant.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les toolkits de phishing et leurs capacités de contournement, les vecteurs (email → SMS → QR → voix), les méthodes d'authentification disponibles. <strong>Ce qui ne change pas :</strong> SPF + DKIM + DMARC comme socle de protection du domaine d'envoi ; la supériorité de WebAuthn/FIDO2 sur le TOTP pour la résistance au phishing ; la vérification hors-bande comme protection humaine contre les demandes inhabituelles.</p>`,
        practice: {
          exercices: [
            {
              titre: "Vérifier et configurer SPF/DKIM/DMARC sur un domaine",
              etapes: [
                "Sur un domaine que tu contrôles (ou sur un domaine fictif pour l'exercice), utilise MXToolbox (mxtoolbox.com/SuperTool.aspx) pour vérifier l'état actuel de SPF, DKIM et DMARC.",
                "Si SPF est absent, identifie le format de l'enregistrement TXT à créer pour autoriser uniquement ton serveur d'envoi actuel.",
                "Cherche la documentation DMARC de ton provider d'email (Gmail, Outlook, SendGrid) pour voir comment configurer les enregistrements DNS nécessaires.",
                "Vérifie que tes comptes critiques (GitHub, AWS, cloud provider) ont la MFA activée. Si c'est du TOTP, identifie comment migrer vers une clé physique FIDO2.",
              ],
              output:
                "État actuel de SPF/DKIM/DMARC sur un domaine réel ou fictif + plan d'action pour les éléments manquants + état de la MFA sur les comptes critiques.",
              critere:
                "Le plan doit être concret et ordonné — pas 'configurer DMARC' mais 'ajouter l'enregistrement DNS TXT _dmarc.mondomaine.com avec la valeur v=DMARC1; p=none; rua=...'.",
            },
          ],
          piege:
            "Penser que la protection anti-phishing ne concerne que les utilisateurs finaux, pas les développeurs. Les comptes GitHub, AWS, Vercel, et GCP d'un développeur sont des cibles de valeur élevée. Un credential AWS compromis peut générer des milliers d'euros de facture en quelques heures (cryptominage sur des instances GPU) avant d'être détecté.",
        },
        verification: [
          "Expliquez comment SPF, DKIM et DMARC fonctionnent ensemble pour protéger un domaine contre l'usurpation d'identité dans les emails, et pourquoi l'absence de DMARC rend SPF et DKIM insuffisants seuls.",
          "Un service utilise le TOTP (Google Authenticator) comme second facteur pour ses administrateurs. Un attaquant déploie Evilginx pour proxifier le portail d'administration en temps réel. Le TOTP protège-t-il dans ce cas ? Que faudrait-il à la place ?",
          "Comment la règle de vérification hors-bande s'applique-t-elle concrètement à un développeur qui reçoit un email prétendant venir de son CTO lui demandant de partager un accès AWS 'en urgence pour un client' ?",
        ],
      },
    },

    protectionRansomwareDdos: {
      id: "protectionRansomwareDdos",
      label: "Se protéger du ransomware et du DDoS",
      icon: "🏗",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>La protection contre le ransomware et le DDoS est avant tout une architecture, pas un outil. Un antivirus ne protège pas contre le ransomware si l'attaquant a déjà les droits d'administrateur de domaine. Un CDN ne protège pas contre le DDoS si les règles de rate limiting ne sont pas configurées. La résilience vient des décisions architecturales prises avant l'incident : segmentation réseau, sauvegardes air-gapped, procédures de réponse documentées et testées.</p>`,
        system: `<p>Ces protections répondent directement aux mécanismes de <span class="ref-fiche">→ mecanismesRansomware</span> et à la compréhension du DDoS de <span class="ref-fiche">→ F08</span>. Elles s'appuient sur l'infrastructure physique <span class="ref-fiche">→ F07</span> et les protocoles réseau <span class="ref-fiche">→ F06</span>. Elles complètent les pratiques de déploiement <span class="ref-fiche">→ T10</span> et de production <span class="ref-fiche">→ P01</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Protection anti-ransomware :</p>
<p><strong>Sauvegardes selon la règle 3-2-1-1 :</strong> 3 copies des données, sur 2 types de support différents, dont 1 hors-site, et désormais 1 immuable (air-gapped ou Object Lock). L'immuabilité est la propriété critique : une sauvegarde immuable ne peut pas être modifiée ou supprimée pendant la durée définie, même par un compte administrateur. AWS S3 Object Lock, Azure Immutable Blob Storage, et les bandes physiques hors-site satisfont cette propriété. Tester les sauvegardes régulièrement (restauration mensuelle d'un échantillon) — une sauvegarde non testée est une sauvegarde dont on ne sait pas si elle fonctionne.</p>
<p><strong>Réduction de la surface d'attaque :</strong> désactiver RDP (port 3389) si non utilisé — c'est le vecteur d'accès initial le plus utilisé par les ransomwares sur les serveurs Windows. Si RDP est nécessaire, le mettre derrière un VPN avec MFA, jamais directement sur Internet. Appliquer les patches de sécurité rapidement — WannaCry a exploité une vulnérabilité Windows patchée 2 mois avant l'attaque, mais les systèmes non patchés représentaient encore des millions de machines. Désactiver SMBv1 (protocole obsolète, vecteur d'EternalBlue). Implémenter des alertes sur les suppressions massives de fichiers (indicateur de chiffrement en cours).</p>
<p><strong>Segmentation réseau :</strong> les machines de développement ne doivent pas pouvoir atteindre directement les serveurs de production. Les serveurs de sauvegarde ne doivent pas être dans le même segment réseau que les serveurs de production. Une compromission d'un segment ne doit pas automatiquement compromettre tous les autres. Dans les environnements cloud, les groupes de sécurité et les VPC permettent cette segmentation.</p>
<p><strong>Protection DDoS :</strong> activation des protections DDoS intégrées aux providers cloud (AWS Shield Standard, Cloudflare Free, Azure DDoS Basic — inclus par défaut). Rate limiting sur les endpoints critiques (login, API) — configurer dans le WAF ou au niveau du reverse proxy (Nginx, Caddy). Cloudflare ou équivalent comme reverse proxy absorbe les attaques volumétriques avant qu'elles atteignent l'infrastructure. Pour les services critiques, Cloudflare Pro/Business ou AWS Shield Advanced fournissent des protections L7 configurables. Plan de réponse DDoS : qui prévient-on, quelles règles activer, quel est le chemin d'escalade ?</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que le plan de réponse aux incidents (IRP — Incident Response Plan) doit être écrit et testé avant l'incident, pas pendant. Pendant une attaque ransomware, l'équipe est sous stress et les systèmes sont potentiellement inaccessibles. Les décisions qui paraissent évidentes hors-crise (isoler le segment réseau, contacter l'assurance cyber, préserver les preuves avant reconstruction) sont paralysantes sans préparation. Une simulation annuelle (tabletop exercise) qui rejoue un scénario ransomware ou DDoS est l'investissement de résilience avec le meilleur ratio coût/efficacité.</p>`,
        errors: `<p><strong>Pattern 1 — Sauvegardes connectées en permanence :</strong> avoir des sauvegardes automatiques montées en tant que lecteur réseau ou accessible via les mêmes credentials que les systèmes de production. Un attaquant avec les droits admin peut supprimer ou chiffrer ces sauvegardes. La déconnexion physique ou l'immuabilité est la seule protection qui résiste.</p>
<p><strong>Pattern 2 — Pas de plan de réponse aux incidents documenté :</strong> ne pas avoir écrit à l'avance qui fait quoi en cas de ransomware (qui isole les machines, qui contacte l'équipe légale, qui notifie la CNIL si des données personnelles sont impliquées, qui gère la communication externe). Un incident sans plan écrit devient chaotique — les décisions urgentes sont prises sous pression sans référentiel.</p>
<p><strong>Pattern 3 — Supposer que Cloudflare gratuit protège contre tous les DDoS :</strong> Cloudflare Free absorbe les DDoS volumétriques basiques mais les attaques applicatives L7 sophistiquées (HTTP flood simulant de vrais utilisateurs) nécessitent des règles WAF personnalisées disponibles dans les offres payantes. Comprendre ce que chaque niveau de protection couvre avant d'en avoir besoin.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les services de protection DDoS, les outils de backup, les vectors ransomware à la mode. <strong>Ce qui ne change pas :</strong> la règle 3-2-1 avec la propriété d'immuabilité ; l'importance de la segmentation réseau pour limiter le mouvement latéral ; la nécessité d'un plan de réponse testé avant l'incident.</p>`,
        practice: {
          exercices: [
            {
              titre: "Mettre en place une protection DDoS et vérifier les sauvegardes",
              etapes: [
                "Sur un service déployé (ou sur un environnement de test), active la protection DDoS de base de ton provider (Cloudflare Free, AWS Shield Standard, etc.). Vérifie qu'elle est bien activée.",
                "Configure une règle de rate limiting sur l'endpoint de login de ton application : 10 requêtes par minute par IP. Teste-la avec <code>ab -n 50 -c 10 https://ton-service/login</code>.",
                "Vérifie l'état de tes sauvegardes : sont-elles automatisées ? Quelle est leur fréquence ? Sont-elles hors du même compte cloud ? As-tu testé une restauration dans les 3 derniers mois ?",
                "Écris un plan de réponse minimal (une page) pour le scénario 'tous les fichiers de production sont chiffrés' : 5 étapes dans l'ordre, qui fait quoi.",
              ],
              output:
                "Protection DDoS vérifiée + règle rate limiting testée + état des sauvegardes documenté + plan de réponse d'une page.",
              critere:
                "Le plan de réponse doit nommer des personnes réelles (ou des rôles) pour chaque action — pas des étapes abstraites.",
            },
          ],
          piege:
            "Traiter la protection DDoS comme une décision unique et définitive. Le paysage des attaques évolue — une configuration Cloudflare efficace aujourd'hui peut nécessiter des ajustements si les patterns d'attaque changent. La configuration de sécurité doit être revue régulièrement, notamment après chaque incident ou après des changements d'infrastructure significatifs.",
        },
        verification: [
          "Pourquoi la règle de sauvegarde 3-2-1 doit-elle être complétée par la propriété d'immuabilité pour résister au ransomware, et quelles technologies concrètes permettent d'implémenter cette immuabilité dans un environnement cloud ?",
          "Quelle est la différence entre une protection DDoS L3/L4 (volumétrique) et une protection L7 (applicative), et pourquoi la première ne suffit pas pour protéger contre un HTTP flood qui simule des utilisateurs légitimes ?",
          "Un incident ransomware vient de se déclencher sur l'infrastructure de production. Dans quelle ordre effectuez-vous les 3 premières actions, et pourquoi l'ordre importe-t-il (notamment : pourquoi ne pas reconstruire immédiatement) ?",
        ],
      },
    },

    veilleCybersecurite: {
      id: "veilleCybersecurite",
      label: "Veille et liens utiles en cybersécurité",
      icon: "📡",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le paysage des menaces en cybersécurité évolue plus vite que dans n'importe quel autre domaine technique. Une CVE critique peut passer de inconnue à exploitée en quelques heures. Un nouveau vecteur de phishing peut émerger et atteindre une adoption massive en quelques semaines. Sans veille structurée, un développeur découvre les menaces après qu'elles ont causé des dégâts — plutôt qu'avant, quand des mesures préventives restent possibles. La veille en sécurité est une compétence professionnelle, pas un hobby optionnel.</p>`,
        system: `<p>Cette veille sécurité est le pendant spécialisé de la veille informatique générale <span class="ref-fiche">→ F02</span>. Elle s'applique à toutes les menaces couvertes dans cette série de fiches <span class="ref-fiche">→ F08</span> <span class="ref-fiche">→ F09</span> et alimente la capacité à maintenir les protections <span class="ref-fiche">→ protectionVirusTrojan</span> <span class="ref-fiche">→ protectionPhishing</span> <span class="ref-fiche">→ protectionRansomwareDdos</span> à jour.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les sources de veille sécurité par couche :</p>
<p><strong>Couche 1 — Alertes immédiates (quotidien, 5 minutes) :</strong> CVE Recent (cve.mitre.org ou nvd.nist.gov) pour les nouvelles vulnérabilités critiques sur les technologies de votre stack. GitHub Security Advisories : si vous utilisez des packages npm/pip hébergés sur GitHub, les advisories de sécurité peuvent déclencher des alertes automatiques. Have I Been Pwned (haveibeenpwned.com) : vérifiez si vos adresses email professionnelles sont dans des fuites de bases de données.</p>
<p><strong>Couche 2 — Actualité sécurité (hebdomadaire) :</strong> BleepingComputer (bleepingcomputer.com) : actualité sécurité accessible, bonne couverture des incidents ransomware et des nouvelles vulnérabilités. Krebs on Security (krebsonsecurity.com) : journalisme d'investigation en cybersécurité, Brian Krebs est une référence sur la cybercriminalité. The Hacker News (thehackernews.com) : actualité sécurité quotidienne. Threat Post (threatpost.com) : vulnérabilités et incidents. CERT-FR (cert.ssi.gouv.fr) : alertes de l'agence gouvernementale française de sécurité — particulièrement pertinent pour les obligations réglementaires en France.</p>
<p><strong>Couche 3 — Recherche et approfondissement (mensuel) :</strong> Verizon DBIR (Data Breach Investigations Report) : rapport annuel sur les tendances des incidents de sécurité réels, basé sur des milliers d'incidents. Google Project Zero (googleprojectzero.blogspot.com) : recherche sur les vulnérabilités zero-day. OWASP (owasp.org) : ressources sur la sécurité applicative, Top 10 mis à jour régulièrement. MITRE ATT&CK (attack.mitre.org) : base de connaissances des tactiques, techniques et procédures des attaquants — indispensable pour comprendre les kill chains des groupes APT.</p>
<p><strong>Outils de monitoring continu :</strong> Dependabot ou Renovate sur GitHub pour les alertes de vulnérabilités dans les dépendances. Snyk (snyk.io) pour une analyse continue. npm audit dans la CI/CD pour bloquer les déploiements avec des CVE critiques non patchées. Shodan (shodan.io) pour vérifier ce que l'internet voit de votre infrastructure exposée.</p>`,
        },
        senior: `<p>Un développeur expérimenté intègre la veille sécurité dans son workflow de développement, pas comme une activité séparée. Les alertes Dependabot s'intègrent au flux de PRs. npm audit s'exécute en CI. Les CVE critiques sur son stack lui arrivent via une alerte configurée, pas via un article qu'il lit par hasard. La veille n'est pas une heure bloquée par semaine — c'est un flux d'information structuré qui s'insère dans les activités existantes.</p>`,
        errors: `<p><strong>Pattern 1 — Ne suivre que les actualités sécurité générales sans surveillance des CVE de son stack :</strong> lire BleepingComputer tous les jours mais ne pas avoir d'alerte spécifique sur les CVE affectant les versions de Node.js, PostgreSQL ou React qu'on utilise en production. La veille générale informe sur le paysage ; la veille spécifique à son stack protège concrètement.</p>
<p><strong>Pattern 2 — Découvrir les fuites de données impliquant ses utilisateurs par la presse :</strong> ne pas avoir configuré de monitoring des fuites de données pour les domaines de son service. Des outils comme Have I Been Pwned (API disponible), XposedOrNot, ou des services de monitoring dédiés alertent quand des credentials de vos utilisateurs apparaissent dans des fuites — permettant de forcer une réinitialisation de mot de passe proactivement.</p>
<p><strong>Pattern 3 — Traiter toutes les CVE comme urgentes :</strong> paniquer sur chaque nouvelle CVE sans évaluer son contexte. Une CVE de sévérité CVSS 9.8 est critique — mais seulement si votre configuration expose la fonctionnalité vulnérable. Le score CVSS mesure le potentiel dans le pire cas, pas l'impact dans votre contexte spécifique. Évaluer si la surface d'attaque est exposée avant de déclencher une urgence.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les sources de veille (nouvelles publications, fermetures, restructurations), les vecteurs dominants de chaque année, les outils de monitoring. <strong>Ce qui ne change pas :</strong> la structure en couches (alertes immédiates → actualité hebdomadaire → recherche mensuelle) ; la priorité aux CVE de son propre stack sur les actualités générales ; l'intégration de la veille dans le workflow quotidien plutôt qu'en activité séparée.</p>`,
        practice: {
          exercices: [
            {
              titre: "Configurer un système de veille sécurité minimal",
              etapes: [
                "Active Dependabot sur un dépôt GitHub actif (Settings → Security → Dependabot alerts). Vérifie que les alerts sont bien activées pour les dépendances.",
                "Configure une alerte CVE pour les technologies principales de ton stack sur nvd.nist.gov (NVD Email Notifications) ou sur osv.dev.",
                "Vérifie tes adresses email professionnelles sur haveibeenpwned.com. Si des adresses apparaissent dans des fuites, identifie les actions à prendre (rotation de mot de passe, vérification des accès compromis).",
                "Identifie l'exposition externe de ton infrastructure avec shodan.io en cherchant ton domaine ou ton IP. Qu'est-ce que Shodan voit ?",
              ],
              output:
                "Veille configurée : Dependabot actif + alerte CVE stack + vérification HIBP + rapport Shodan de l'exposition externe.",
              critere:
                "Chaque outil doit être testé, pas seulement configuré — une alerte qui ne s'est pas déclenchée n'est pas une alerte qui fonctionne.",
            },
          ],
          piege:
            "Croire que lire les actualités sécurité constitue une veille sécurité. Lire BleepingComputer est de l'information générale — c'est utile pour la culture mais insuffisant pour la protection opérationnelle. La veille opérationnelle est celle qui déclenche des actions spécifiques : mettre à jour une version, corriger une configuration, révoquer un credential.",
        },
        verification: [
          "Quelle est la différence entre une veille sécurité générale (actualités, tendances) et une veille sécurité spécifique à son stack, et pourquoi les deux sont nécessaires mais ne se remplacent pas ?",
          "Un développeur lit chaque semaine BleepingComputer et maintient ses dépendances npm à jour via Dependabot. Il n'a pas de monitoring des fuites de données pour son service. Quel risque précis ce manque crée-t-il pour ses utilisateurs, et quelle action simple y remédie ?",
          "Une CVE critique (CVSS 9.8) est publiée pour une dépendance que vous utilisez. Comment évaluez-vous si cette CVE vous affecte réellement avant de déclencher une mise à jour urgente, et quels critères déterminent si c'est une urgence à traiter dans l'heure ou une mise à jour à planifier dans la semaine ?",
        ],
      },
    },

    syntheseCybersecurite: {
      id: "syntheseCybersecurite",
      label: "Synthèse : une posture de sécurité cohérente",
      icon: "🧩",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les fiches F08, F09 et F10 couvrent les menaces, leurs mécanismes et les protections séparément. Ce nœud les synthétise en une posture cohérente : comment penser la sécurité comme un système plutôt que comme une liste de cases à cocher. La cohérence est ce qui fait la différence entre une défense qui tient sous pression et une défense qui cède au premier scénario non anticipé.</p>`,
        system: `<p>Ce nœud de synthèse intègre les quatre nœuds de protection de cette fiche avec les fiches de menaces <span class="ref-fiche">→ F08</span> et de mécanismes <span class="ref-fiche">→ F09</span>, et dialogue avec la sécurité applicative <span class="ref-fiche">→ P02</span> qui traite la sécurité du code en production.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les cinq principes d'une posture de sécurité cohérente :</p>
<p><strong>Principe 1 — Défense en profondeur :</strong> ne jamais dépendre d'une seule défense. Si le phishing passe le filtre email, la MFA protège les credentials. Si la MFA est contournée, la segmentation réseau limite l'accès. Si l'attaquant atteint la production, les sauvegardes immuables permettent la récupération. Chaque couche est conçue pour fonctionner même si la précédente a échoué.</p>
<p><strong>Principe 2 — Moindre privilège systématique :</strong> chaque utilisateur, service, processus et credential doit avoir exactement les permissions nécessaires à sa fonction — ni plus, ni moins. Ce principe s'applique à tous les niveaux : compte cloud (pas d'AdministratorAccess pour le développement quotidien), service applicatif (l'API ne doit pas avoir les droits d'admin sur la base de données), développeur (accès en lecture seule aux logs de production, pas de shell direct sur les serveurs). Le moindre privilège limite mécaniquement le rayon d'impact d'une compromission.</p>
<p><strong>Principe 3 — Assumer la compromission (assume breach) :</strong> concevoir les systèmes en partant du principe qu'une compromission est inévitable plutôt qu'improbable. Conséquences : la détection et la réponse rapide (MTTR — Mean Time To Respond) importent autant que la prévention, les logs doivent permettre de reconstituer ce qui s'est passé après un incident, les sauvegardes doivent permettre la restauration même si toute l'infrastructure est compromise.</p>
<p><strong>Principe 4 — Friction calibrée :</strong> une sécurité trop contraignante est contournée par les utilisateurs et les développeurs (utilisation de services shadow IT, partage de credentials pour éviter les procédures MFA lentes). La friction de sécurité doit être calibrée sur le risque réel : MFA forte sur les accès cloud et production, moins de friction sur les environnements de développement locaux. La sécurité ignorée est pire qu'une sécurité imparfaite appliquée.</p>
<p><strong>Principe 5 — Amélioration continue par les incidents :</strong> chaque incident de sécurité (même mineur — un email de phishing cliqué, un secret exposé dans les logs) est une opportunité d'améliorer les défenses. Le post-mortem de sécurité suit la même structure que le post-mortem d'incident technique : chronologie, cause racine, mesures correctives. Les mêmes causes racines reviennent régulièrement dans les incidents — documenter et corriger les patterns évite leur répétition.</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que la sécurité n'est pas un projet avec une date de fin — c'est un état d'équilibre qui doit être activement maintenu. Les menaces évoluent, les systèmes changent, les équipes bougent. Ce qui était sécurisé il y a un an peut ne plus l'être aujourd'hui. Les revues périodiques de la surface d'attaque, les tests de restauration des sauvegardes, et la mise à jour des plans de réponse aux incidents sont des activités permanentes, pas des actions ponctuelles.</p>`,
        errors: `<p><strong>Pattern 1 — La sécurité comme checklist ponctuelle :</strong> effectuer un audit de sécurité une fois par an et considérer la sécurité comme "réglée". Les menaces évoluent en continu, les configurations dérivent, les dépendances accumulent des CVE. La sécurité est un processus continu, pas un état statique.</p>
<p><strong>Pattern 2 — Sur-sécuriser les risques improbables, sous-sécuriser les risques courants :</strong> passer des semaines à se protéger des APT étatiques tout en n'ayant pas de MFA sur les accès cloud, ou ne pas avoir de sauvegarde testée. Le risque d'un phishing de masse ou d'un ransomware opportuniste est bien supérieur au risque d'une APT pour la grande majorité des organisations.</p>
<p><strong>Pattern 3 — Isoler la sécurité dans un rôle dédié :</strong> traiter la sécurité comme le problème exclusif d'un "responsable sécurité" ou d'une équipe dédiée. La sécurité est la responsabilité de chaque développeur sur le code qu'il écrit, les dépendances qu'il installe et les credentials qu'il gère. Déléguer entièrement crée des angles morts dans les décisions quotidiennes.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les menaces dominantes, les outils de protection, les standards de l'industrie (NIST, ISO 27001, SOC 2). <strong>Ce qui ne change pas :</strong> les cinq principes fondamentaux — défense en profondeur, moindre privilège, assume breach, friction calibrée, amélioration continue. Ces principes sont valides depuis que la sécurité informatique existe et resteront valides quelle que soit la technologie.</p>`,
        practice: {
          exercices: [
            {
              titre: "Évaluer sa posture de sécurité globale",
              etapes: [
                "Pour chacun des 5 principes (défense en profondeur, moindre privilège, assume breach, friction calibrée, amélioration continue), attribue une note de 1 à 5 à ta posture actuelle.",
                "Pour le principe avec la note la plus basse, identifie l'action concrète la plus impactante à réaliser cette semaine.",
                "Identifie le dernier incident de sécurité (même mineur) que tu as vécu ou observé. A-t-il produit un post-mortem ? Des mesures correctives ont-elles été appliquées ?",
                "Formule en une phrase la posture de sécurité actuelle de ton projet ou organisation : qu'est-ce qui est solide ? Qu'est-ce qui est le maillon faible ?",
              ],
              output:
                "Auto-évaluation en 5 points + action prioritaire identifiée + analyse du dernier incident + formulation en une phrase de la posture actuelle.",
              critere:
                "L'évaluation doit être honnête — les organisations qui se notent 5/5 sur tous les critères n'ont probablement pas réfléchi à leur surface d'attaque réelle.",
            },
          ],
          piege:
            "Croire qu'une bonne posture de sécurité nécessite un budget important. Les fondamentaux — MFA sur les accès critiques, sauvegardes testées, SPF/DKIM/DMARC, moindre privilège, veille des CVE — sont accessibles à tout développeur solo ou petite équipe sans investissement financier significatif. La principale ressource nécessaire est du temps et de la rigueur.",
        },
        verification: [
          "Expliquez le principe 'assume breach' et comment il change concrètement les décisions d'architecture de sécurité par rapport à une approche qui vise uniquement à prévenir les compromissions.",
          "Un développeur solo sur un projet SaaS avec 200 utilisateurs dispose de 4 heures pour améliorer sa posture de sécurité. En appliquant le principe de priorisation par risque (probabilité × impact), dans quel ordre investit-il ces 4 heures entre : activer MFA sur AWS, configurer Dependabot, mettre en place des sauvegardes immuables, et configurer DMARC ?",
          "Pourquoi la 'friction calibrée' est-elle un principe de sécurité et non une concession sur la sécurité, et donnez un exemple où une friction trop élevée produit une sécurité effectivement moindre ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 320",
      nodes: [
        { id: "protectionVirusTrojan", x: 10, y: 40, w: 175, h: 65 },
        { id: "protectionPhishing", x: 10, y: 165, w: 165, h: 65 },
        { id: "protectionRansomwareDdos", x: 270, y: 100, w: 185, h: 65 },
        { id: "veilleCybersecurite", x: 560, y: 40, w: 175, h: 65 },
        { id: "syntheseCybersecurite", x: 560, y: 165, w: 185, h: 65 },
      ],
      edges: [
        { x1: 185, y1: 72, x2: 268, y2: 120, label: "protège" },
        { x1: 175, y1: 197, x2: 268, y2: 148, label: "protège" },
        { x1: 455, y1: 132, x2: 558, y2: 72, label: "surveille" },
        { x1: 455, y1: 132, x2: 558, y2: 197, label: "synthétise" },
      ],
    },
  },
});
