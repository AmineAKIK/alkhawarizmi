import { cultureSheet } from "./culture-common";

export const cultureMecanismesAttaques = cultureSheet({
  id: "culture-F09",
  number: 9,
  title: "Mécanismes des Attaques Informatiques",
  subtitle:
    "Comment fonctionnent réellement les virus, le phishing et le ransomware — pas le résumé médiatique, la mécanique technique",
  badge: "Fiche F09",
  meta: ["3 nœuds"],
  readingTime: "25 min",
  description:
    "Savoir qu'un ransomware chiffre vos fichiers ne suffit pas pour comprendre comment le prévenir. Cette fiche ouvre le capot : comment un virus infecte réellement un système, comment une campagne de phishing est construite de l'intérieur, comment un ransomware se propage d'une machine à toute une infrastructure. Comprendre ces mécanismes est ce qui distingue une protection subie d'une protection conçue.",
  accent: "modele",

  nodes: {
    mecanismesVirusTrojan: {
      id: "mecanismesVirusTrojan",
      label: "Mécanismes des virus et trojans",
      icon: "⚙",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Un développeur qui sait seulement qu'un virus "infecte des fichiers" ne comprend pas pourquoi son antivirus rate parfois des infections, pourquoi certains malwares survivent à une réinstallation de Windows, ou comment un package npm peut être un cheval de Troie sans qu'aucune alerte ne se déclenche. La mécanique précise des malwares explique directement les limites des outils de détection et les trous dans les défenses standards.</p>`,
        system: `<p>Ces mécanismes sont la suite logique de la compréhension des types de menaces <span class="ref-fiche">→ F08</span>. Ils s'appuient sur la connaissance du fonctionnement bas-niveau des systèmes <span class="ref-fiche">→ F04</span> (exécutable, mémoire, OS). Ils conditionnent directement les méthodes de protection <span class="ref-fiche">→ F10</span> — comprendre le mécanisme permet de cibler la défense au bon niveau.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les mécanismes précis des virus et trojans :</p>
<p><strong>Cycle de vie d'un virus de fichier :</strong> (1) <em>Infection</em> : le virus recherche des fichiers exécutables (.exe, .dll) sur le système et y injecte son code en modifiant le point d'entrée du programme. (2) <em>Déclenchement</em> : quand le fichier infecté est exécuté, le code viral s'exécute en premier. (3) <em>Propagation</em> : le virus recherche d'autres fichiers à infecter sur le disque local, les partages réseau, les supports amovibles. (4) <em>Payload</em> : selon sa conception, le virus peut détruire des données, installer un backdoor, exfiltrer des informations, ou simplement se propager sans payload destructeur.</p>
<p><strong>Techniques d'obfuscation et d'évasion :</strong> pour éviter la détection par signature antivirus, les malwares modernes utilisent : chiffrement du code (seule une petite routine de déchiffrement est visible, différente à chaque infection pour les virus polymorphes), mutations aléatoires du code (virus métamorphiques — réécrivent leur propre code à chaque génération), exécution en mémoire uniquement sans écriture sur disque (fileless malware — particulièrement difficile à détecter par les antivirus traditionnels qui analysent les fichiers).</p>
<p><strong>Mécanismes de persistance :</strong> pour survivre aux redémarrages, les malwares s'inscrivent dans : les clés de registre Windows de démarrage automatique (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run), les tâches planifiées (Task Scheduler), les services Windows, les scripts de démarrage, les extensions navigateur. Un malware qui n'a pas établi de persistance est éliminé au prochain redémarrage.</p>
<p><strong>Mouvement latéral :</strong> une fois sur une machine, un malware cherche à se propager sur le réseau local. Techniques : exploitation de vulnérabilités SMB (EternalBlue, utilisé par WannaCry), pass-the-hash (réutilisation des hachages NTLM pour s'authentifier sur d'autres machines sans connaître le mot de passe en clair), compromission de comptes de domaine Active Directory pour accéder à toutes les machines du domaine.</p>
<p><strong>Mécanisme d'un trojan packager :</strong> l'exécutable légitime (jeu piraté, logiciel cracké, fausse mise à jour) lance d'abord l'installation visible pour l'utilisateur. En parallèle ou après, il extrait et exécute son payload caché depuis ses ressources. Le payload peut être chiffré et obfusqué dans le binaire pour éviter la détection statique. Les techniques de "packing" (UPX, custom packers) compriment et chiffrent l'exécutable pour masquer le contenu aux analyseurs statiques.</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend pourquoi les supply chain attacks sont particulièrement insidieuses : un package npm légitime et populaire, soudain mis à jour par un attaquant qui a compromis le compte du mainteneur, est un trojan parfait — signé par une identité connue, installé automatiquement par des milliers de systèmes CI/CD. La détection par signature est impossible (signature inconnue), la confiance implicite dans la provenance (npm registry, mainteneur connu) est le vecteur. La seule défense est la revue des mises à jour et le lock file pour contrôler exactement quelle version est installée.</p>`,
        errors: `<p><strong>Pattern 1 — Supposer que l'antivirus détecte les fileless malware :</strong> les malwares qui s'exécutent uniquement en mémoire (PowerShell scripts, reflective DLL injection) ne créent pas de fichiers sur le disque — les antivirus basés sur la détection de fichiers ne les voient pas. La détection comportementale (EDR — Endpoint Detection and Response) est nécessaire pour ces vecteurs.</p>
<p><strong>Pattern 2 — Croire que réinstaller l'OS élimine toujours le malware :</strong> un bootkit ou firmware malware peut survivre à une réinstallation complète de l'OS car il réside dans le firmware UEFI, le MBR, ou le firmware d'un périphérique (carte réseau, contrôleur de disque). Ces vecteurs existent depuis l'incident Equation Group (NSA) documenté par Kaspersky en 2015.</p>
<p><strong>Pattern 3 — Négliger l'analyse des dépendances dans la CI/CD :</strong> ne pas avoir de processus de revue des nouvelles versions de dépendances avant déploiement automatique. Un Dependabot qui crée automatiquement une PR et un pipeline qui la merge automatiquement si les tests passent est une porte d'entrée pour un trojan dans une dépendance.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les techniques d'obfuscation (polymorphisme, métamorphisme, fileless), les vecteurs de propagation (USB → réseau → supply chain), les outils de détection (AV signatures → EDR comportemental). <strong>Ce qui ne change pas :</strong> le cycle infection/persistance/propagation/payload ; la nécessité d'un vecteur d'exécution initiale (l'utilisateur ou le système doit exécuter du code non vérifié) ; la course sans fin entre obfuscation et détection.</p>`,
        practice: {
          exercices: [
            {
              titre: "Analyser les mécanismes de persistance sur sa propre machine",
              etapes: [
                "Sur Windows : ouvre l'Éditeur du Registre (regedit), navigue vers HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run et HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run. Identifie tous les programmes configurés pour démarrer automatiquement. Connais-tu chacun d'entre eux ?",
                "Sur macOS/Linux : liste les services de démarrage (<code>launchctl list</code> sur macOS, <code>systemctl list-unit-files --state=enabled</code> sur Linux).",
                "Identifie un service ou programme de démarrage que tu ne reconnais pas et recherche son nom sur VirusTotal ou Google.",
                "Cherche dans les logs système un accès réseau inhabituel vers une adresse IP externe inconnue.",
              ],
              output:
                "Inventaire des programmes de démarrage automatique avec statut (connu/inconnu) + résultat de la vérification du programme inconnu le cas échéant.",
              critere:
                "Tous les programmes de démarrage doivent être identifiés et leurs rôles compris — un programme inconnu doit être vérifié, pas ignoré.",
            },
          ],
          piege:
            "Croire que l'analyse des mécanismes de malware est réservée aux analystes en sécurité. En réalité, comprendre comment un malware établit sa persistance et se propage change la façon dont un développeur conçoit ses permissions d'application, gère ses dépendances et structure ses pipelines CI/CD.",
        },
        verification: [
          "Expliquez la différence entre un virus polymorphe et un virus métamorphique, et pourquoi ces deux techniques compliquent la détection par antivirus à base de signatures.",
          "Un fileless malware s'exécute entièrement en mémoire sans créer de fichiers sur le disque. Pourquoi un antivirus classique (qui analyse les fichiers sur le disque) ne peut-il pas le détecter, et quelle technologie est nécessaire pour identifier ce type de menace ?",
          "Comment EternalBlue (vulnérabilité SMB) a-t-il permis à WannaCry de se propager sans aucune action de l'utilisateur d'une machine à l'autre sur le même réseau local ?",
        ],
      },
    },

    mecanismesPhishing: {
      id: "mecanismesPhishing",
      label: "Construction d'une campagne de phishing",
      icon: "🎭",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Comprendre comment une campagne de phishing est construite côté attaquant transforme la façon dont on évalue les emails, les liens et les demandes inhabituelles. Ce n'est pas de la paranoïa — c'est la même logique qu'un ingénieur réseau qui comprend les mécanismes des attaques pour concevoir les bonnes défenses. Voir la mécanique de l'attaque permet d'en identifier les invariants et les signaux détectables.</p>`,
        system: `<p>Ces mécanismes détaillent les types de phishing de <span class="ref-fiche">→ F08</span>. Ils s'appuient sur les protocoles email (SMTP, SPF, DKIM, DMARC) qui sont eux-mêmes des protocoles réseau <span class="ref-fiche">→ F06</span>. Ils alimentent directement les méthodes de protection <span class="ref-fiche">→ F10</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les mécanismes techniques d'une campagne de phishing :</p>
<p><strong>Infrastructure de l'attaquant :</strong> pour une campagne de phishing professionnel, l'attaquant met en place : un domaine typosquatté ou usurpé (paypa1.com, amaz0n-verify.com), un certificat TLS valide (Let's Encrypt délivre des certificats en quelques secondes, le cadenas vert est facile à obtenir), un serveur d'envoi d'emails configuré pour imiter l'expéditeur légitime, et une page web qui copie exactement l'interface du site légitime (souvent téléchargée automatiquement avec HTTrack ou wget).</p>
<p><strong>Contournement des filtres email (SPF, DKIM, DMARC) :</strong> SPF (Sender Policy Framework) : enregistrement DNS qui liste les serveurs autorisés à envoyer des emails pour un domaine. Un email prétendant venir de @paypal.com depuis un serveur non listé dans le SPF de PayPal sera marqué comme suspect. DKIM (DomainKeys Identified Mail) : signature cryptographique attachée à chaque email par le serveur d'envoi. Permet de vérifier que l'email n'a pas été modifié en transit. DMARC : politique qui dit aux serveurs récepteurs quoi faire si SPF ou DKIM échouent (ignorer, mettre en quarantaine, rejeter). L'attaquant contourne ces protections en utilisant son propre domaine (paypa1.com a ses propres enregistrements SPF/DKIM/DMARC valides) ou en compromettant un compte email légitime.</p>
<p><strong>Techniques de phishing côté site web :</strong> les pages de phishing modernes vont au-delà de la simple copie visuelle : certaines proxifient en temps réel le site légitime (l'utilisateur voit le vrai site, l'attaquant intercepte les credentials — technique utilisée par les toolkits Evilginx, Modlishka), certaines détectent les bots et analyses de sécurité pour afficher une page innocente aux scanners et la page de phishing aux victimes réelles.</p>
<p><strong>Ingénierie sociale : les 6 leviers de Cialdini :</strong> les campagnes de phishing utilisent systématiquement les principes d'influence sociale identifiés par Robert Cialdini. Autorité (l'email vient de votre "PDG", de "Microsoft", de "votre banque"). Urgence/rareté (votre compte sera bloqué dans 24h). Réciprocité (vous avez reçu un remboursement, réclamez-le). Preuve sociale (vos collègues ont déjà mis à jour leur mot de passe). Sympathie (message amical et personnalisé). Engagement (vous avez déjà commencé à renseigner votre profil, finissez-le).</p>
<p><strong>Credential harvesting et C2 :</strong> quand la victime saisit ses credentials sur la page de phishing, ils sont envoyés en temps réel au serveur de l'attaquant (Command and Control — C2). L'attaquant est alerté instantanément et peut utiliser les credentials immédiatement — avant que la victime ne réalise qu'elle vient d'être piégée. Les sessions MFA (multi-factor authentication) peuvent aussi être proxifiées en temps réel par les toolkits modernes.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que le MFA (multi-factor authentication) n'est pas une protection absolue contre le phishing. Les toolkits modernes comme Evilginx agissent comme proxy transparent : l'utilisateur se connecte sur la vraie page (proxifiée), complète le MFA, et l'attaquant intercepte la session cookie valide et authentifiée. La vraie défense contre ce type d'attaque est la MFA résistante au phishing (FIDO2/WebAuthn/clé physique), qui lie cryptographiquement l'authentification au domaine légitime — une tentative d'authentification via un proxy phishing échoue parce que le domaine ne correspond pas.</p>`,
        errors: `<p><strong>Pattern 1 — Supposer que le MFA protège contre tout phishing :</strong> le MFA classique (SMS, TOTP/Google Authenticator) peut être contourné par proxification en temps réel. Seule la MFA résistante au phishing (WebAuthn, FIDO2) est immunisée parce qu'elle lie cryptographiquement l'authentification à l'origine (domaine) de la requête.</p>
<p><strong>Pattern 2 — Croire que les filtres anti-spam éliminent le phishing ciblé :</strong> les filtres anti-spam sont calibrés sur les campagnes de masse à fort volume. Un spear phishing envoyé depuis un compte Gmail ou Outlook compromis d'un vrai collègue, avec un contenu personnalisé et un volume d'un seul email, passe la plupart des filtres. La personnalisation est précisément ce qui rend le spear phishing invisible aux filtres automatiques.</p>
<p><strong>Pattern 3 — Ne pas vérifier les en-têtes email :</strong> juger la légitimité d'un email uniquement par l'affichage du nom de l'expéditeur. Le "Display Name" (nom affiché) est arbitraire — n'importe qui peut envoyer un email avec le display name "Équipe Sécurité Microsoft". L'adresse email réelle et le domaine d'envoi (visible dans les en-têtes complets) sont les indicateurs fiables.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les toolkits de phishing (Evilginx, GoPhish, modlishka), les méthodes de contournement des filtres, les leviers psychologiques utilisés selon le contexte. <strong>Ce qui ne change pas :</strong> la structure fondamentale de la campagne (infrastructure usurpée + page copiée + leviers psychologiques + harvesting de credentials) ; la vulnérabilité du jugement humain face à l'urgence artificielle et l'autorité imitée ; l'avantage structurel de l'attaquant qui doit réussir une seule fois, contre le défenseur qui doit réussir à chaque fois.</p>`,
        practice: {
          exercices: [
            {
              titre: "Inspecter les en-têtes d'un email suspect",
              etapes: [
                "Dans ton client email, trouve comment afficher les en-têtes complets d'un email (en Gmail : les trois points → 'Afficher l'original'). Ouvre n'importe quel email.",
                "Identifie dans les en-têtes : l'adresse 'From' réelle (pas le Display Name), le champ 'Return-Path' (où les bounces sont envoyés), les résultats SPF, DKIM et DMARC (champs 'Authentication-Results').",
                "Cherche un email qui a un Display Name connu (une boutique, un service) mais dont l'adresse From réelle ou le Return-Path ne correspond pas au domaine affiché.",
                "Si tu trouves un email de phishing, identifie quel levier de Cialdini est utilisé (urgence, autorité, réciprocité, etc.).",
              ],
              output:
                "Analyse d'un email suspect : en-têtes complets, résultats SPF/DKIM/DMARC, domaine réel vs affiché, levier psychologique identifié.",
              critere:
                "L'analyse doit utiliser les en-têtes techniques — pas uniquement l'affichage du client email.",
            },
          ],
          piege:
            "Croire que comprendre ces mécanismes aide uniquement à se défendre soi-même. En tant que développeur, comprendre comment le phishing est construit permet de mieux implémenter DMARC/DKIM/SPF sur ses propres domaines d'envoi d'email — protégeant ainsi ses utilisateurs des usurpations de l'identité de son service.",
        },
        verification: [
          "Expliquez comment un toolkit de phishing comme Evilginx permet de contourner le MFA classique (TOTP), et pourquoi FIDO2/WebAuthn y résiste.",
          "Qu'est-ce que DMARC et comment cette politique protège-t-elle les destinataires contre l'usurpation d'un domaine ? Expliquez concrètement ce qui se passe quand une organisation n'a pas configuré DMARC sur son domaine.",
          "Un attaquant envoie un email de spear phishing depuis un compte Gmail légitime appartenant à un vrai employé de l'organisation (compte compromis). Pourquoi les protections SPF, DKIM et DMARC sont-elles inefficaces dans ce cas, et quelle défense reste pertinente ?",
        ],
      },
    },

    mecanismesRansomware: {
      id: "mecanismesRansomware",
      label: "Mécanismes du ransomware",
      icon: "🔓",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Un ransomware ne chiffre pas juste des fichiers — il orchestre une attaque en plusieurs phases sur des jours ou semaines avant que la victime réalise qu'il est là. Comprendre cette chronologie révèle des fenêtres d'intervention que le récit médiatique ("les fichiers ont été chiffrés") efface. Le mouvement latéral, l'exfiltration préalable, la destruction des sauvegardes accessibles — chaque étape est une opportunité de détection manquée. Les connaître, c'est savoir où placer les capteurs.</p>`,
        system: `<p>Le ransomware utilise les mécanismes de trojans <span class="ref-fiche">→ mecanismesVirusTrojan</span> et du phishing <span class="ref-fiche">→ mecanismesPhishing</span> comme vecteurs d'entrée. Il s'appuie sur les protocoles réseau <span class="ref-fiche">→ F06</span> pour le C2 et le mouvement latéral. Sa compréhension prépare directement la méthodologie de protection <span class="ref-fiche">→ F10</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>La kill chain d'un ransomware moderne (opérateur humain) :</p>
<p><strong>Phase 1 — Accès initial (Initial Access) :</strong> l'attaquant entre dans l'organisation. Vecteurs principaux : email de phishing avec pièce jointe malveillante ou lien vers un dropper, exploitation d'une vulnérabilité publique sur un service exposé (VPN non patché, RDP avec mot de passe faible, serveur Exchange), achat d'un accès initial sur un marché cybercriminel (Initial Access Brokers vendent des accès compromis à des entreprises). La compromission initiale peut être détectée à ce stade par les logs d'authentification ou un EDR.</p>
<p><strong>Phase 2 — Persistance et établissement du C2 :</strong> le malware installe un implant persistant (mécanismes décrits dans <span class="ref-fiche">→ mecanismesVirusTrojan</span>) et établit une connexion chiffrée vers le serveur C2 de l'attaquant, souvent via HTTPS sur le port 443 pour se fondre dans le trafic légitime. Des outils légitimes de gestion à distance (Cobalt Strike, Metasploit, AnyDesk) sont souvent utilisés — le "living off the land" rend la détection difficile car ces outils sont légitimes.</p>
<p><strong>Phase 3 — Reconnaissance interne et mouvement latéral :</strong> l'attaquant explore le réseau pendant des jours ou semaines. Il identifie l'Active Directory (annuaire de tous les utilisateurs et machines), les partages réseau contenant les données critiques, les serveurs de sauvegarde, et les serveurs les plus critiques. Il élève ses privilèges pour obtenir des droits d'administrateur de domaine. Cette phase est celle où l'attaque peut encore être détectée par des alertes sur les scans réseau anormaux ou les tentatives d'escalade de privilèges.</p>
<p><strong>Phase 4 — Exfiltration des données :</strong> avant de chiffrer, les groupes modernes exfiltrent les données sensibles vers leur infrastructure (documents financiers, propriété intellectuelle, données personnelles). Cette exfiltration constitue le levier de "double extorsion" : même si la victime restaure depuis ses sauvegardes, l'attaquant menace de publier les données. L'exfiltration peut être détectée par des anomalies dans le trafic réseau sortant (volume inhabituel, destinations inhabituelles).</p>
<p><strong>Phase 5 — Destruction des sauvegardes et déploiement :</strong> avant le chiffrement final, l'attaquant supprime ou chiffre les sauvegardes accessibles depuis le réseau (shadow copies Windows, sauvegardes réseau montées). Puis il déploie le ransomware sur toutes les machines du domaine simultanément — souvent via GPO (Group Policy Object) ou PsExec — pour maximiser l'impact et minimiser le temps de réaction. Le chiffrement RSA + AES est utilisé : AES chiffre les fichiers (rapide), RSA chiffre la clé AES avec la clé publique de l'attaquant (seul l'attaquant a la clé privée pour déchiffrer).</p>`,
        },
        senior: `<p>Un développeur expérimenté comprend que la question "avez-vous des sauvegardes ?" ne suffit pas. La vraie question est "vos sauvegardes sont-elles hors-ligne et testées ?" Un attaquant qui est dans le réseau depuis 3 semaines a eu le temps de compromettre, chiffrer ou supprimer toutes les sauvegardes connectées. Les sauvegardes sur bande, sur stockage air-gapped (physiquement déconnecté du réseau) ou sur un compte cloud avec permissions immuables (Object Lock S3, Vault Azure) sont les seules qui résistent au ransomware qui a compromis le domaine Active Directory.</p>`,
        errors: `<p><strong>Pattern 1 — Traiter le ransomware comme un incident instantané :</strong> croire que l'attaque commence quand les fichiers sont chiffrés. En réalité, l'attaquant est dans le réseau depuis des semaines. La détection tardive est la règle, pas l'exception. La fenêtre moyenne entre compromission initiale et déclenchement du chiffrement est de 11 jours selon IBM X-Force.</p>
<p><strong>Pattern 2 — Reconstruire avant investigation forensique :</strong> réinstaller les systèmes immédiatement après l'incident sans préserver les preuves. L'investigation forensique identifie le vecteur initial (pour le colmater), l'étendue de la compromission (toutes les machines affectées), et confirme l'exfiltration (déclenche les obligations légales RGPD). Détruire les preuves avant l'investigation complique la remédiation et peut créer des obligations légales non remplies.</p>
<p><strong>Pattern 3 — Penser que le paiement garantit la récupération :</strong> les groupes de ransomware sont des organisations criminelles sans obligation contractuelle. 20 à 40% des victimes qui paient ne récupèrent pas toutes leurs données. Certains groupes refacturent après paiement. L'outil de déchiffrement fourni peut lui-même contenir un backdoor.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les groupes de ransomware (LockBit, ALPHV, Cl0p ont dominé avant d'être partiellement démantélés), les vulnérabilités exploitées pour l'accès initial, les techniques de mouvement latéral. <strong>Ce qui ne change pas :</strong> la structure en kill chain (accès → persistance → reconnaissance → exfiltration → destruction des sauvegardes → chiffrement) ; le chiffrement hybride RSA+AES ; la fenêtre de détection entre compromission et déclenchement ; l'importance critique des sauvegardes hors-ligne.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier les indicateurs de compromission (IoC) sur un système",
              etapes: [
                "Sur Windows, cherche des connexions réseau inhabituelles vers des IPs externes avec <code>netstat -an | findstr ESTABLISHED</code>. Identifie toute connexion vers une IP que tu ne reconnais pas.",
                "Vérifie les processus en cours avec une connexion réseau active : <code>netstat -anb</code> (admin requis). Un processus Word ou Excel avec une connexion sortante est suspect.",
                "Examine les logs d'authentification Windows (Event Viewer → Security → Event ID 4624 pour les connexions réussies, 4625 pour les échecs). Y a-t-il des tentatives de connexion à des heures inhabituelles ?",
                "Cherche des shadow copies supprimées : <code>vssadmin list shadows</code>. Si la liste est vide sur un système avec des sauvegardes, c'est un signal d'alarme.",
              ],
              output:
                "Rapport de 4 vérifications de sécurité : connexions réseau, processus avec trafic sortant, logs d'authentification anormaux, état des shadow copies.",
              critere:
                "Chaque vérification doit distinguer un comportement normal d'un signal d'alarme avec un critère spécifique.",
            },
          ],
          piege:
            "Croire que la détection du ransomware se fait quand les fichiers sont chiffrés. À ce stade, l'attaque est terminée. La détection utile est celle des phases 1 à 4 — accès initial, mouvement latéral, exfiltration anormale, suppression des sauvegardes. C'est là que les logs, les EDR et les alertes réseau ont leur valeur.",
        },
        verification: [
          "Expliquez pourquoi la phase de mouvement latéral est la plus importante à détecter dans une attaque ransomware, et quels indicateurs dans les logs système ou réseau peuvent signaler cette phase.",
          "Un ransomware utilise un chiffrement hybride : AES pour les fichiers, RSA pour la clé AES. Expliquez pourquoi cette architecture est utilisée (et non RSA seul pour tout), et pourquoi il est mathématiquement impossible de déchiffrer les fichiers sans la clé privée RSA de l'attaquant.",
          "La règle 3-2-1 de sauvegarde est insuffisante si les sauvegardes sont connectées au réseau. Quelle propriété supplémentaire (et sous quel nom technique) doit avoir une sauvegarde pour résister à un attaquant qui a des droits d'administrateur de domaine sur le réseau ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "mecanismesVirusTrojan", x: 10, y: 100, w: 190, h: 65 },
        { id: "mecanismesPhishing", x: 350, y: 40, w: 195, h: 65 },
        { id: "mecanismesRansomware", x: 350, y: 165, w: 195, h: 65 },
      ],
      edges: [
        { x1: 200, y1: 120, x2: 348, y2: 72, label: "vecteur" },
        { x1: 200, y1: 148, x2: 348, y2: 197, label: "déploie" },
        { x1: 545, y1: 105, x2: 545, y2: 163, label: "prépare" },
      ],
    },
  },
});
