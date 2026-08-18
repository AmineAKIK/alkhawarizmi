import { cultureSheet } from "./culture-common";

export const cultureDroitAuteurLicences = cultureSheet({
  id: "culture-F11",
  number: 11,
  title: "Droit d'Auteur et Licences Libres",
  subtitle: "Ce que protège le droit d'auteur, pourquoi ça compte pour un site web, et comment les licences libres organisent le partage",
  badge: "Fiche F11",
  meta: ["3 nœuds"],
  readingTime: "20 min",
  description: "Chaque ligne de code, chaque image, chaque texte, chaque police de caractère utilisée dans un projet web est potentiellement couverte par le droit d'auteur. Un développeur qui ne comprend pas ces règles prend des risques juridiques réels — pas théoriques. Cette fiche pose les fondements : ce qu'est le droit d'auteur, ce qu'il protège et ce qu'il ne protège pas, et comment les licences libres ont réinventé la collaboration à grande échelle en s'appuyant sur lui.",
  accent: "modele",

  nodes: {
    fondamentsDroitAuteur: {
      id: "fondamentsDroitAuteur",
      label: "Principes fondamentaux du droit d'auteur",
      icon: "©",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un développeur qui intègre une image trouvée sur Google dans un projet client sans vérifier ses droits expose ce client à une mise en demeure pour violation du droit d'auteur — des affaires documentées se sont conclues par des milliers d'euros d'indemnités pour une seule photographie. Ce risque n'est pas hypothétique : des agences spécialisées (Getty Images, Corbis) scannent automatiquement le web à la recherche de leurs contenus non licenciés. Comprendre le droit d'auteur, c'est d'abord éviter ces situations.</p>`,
        system: `<p>Le droit d'auteur est le socle légal sur lequel s'appuient les licences libres <span class="ref-fiche">→ licencesLibres</span> et les obligations pratiques sur un site web <span class="ref-fiche">→ F12</span>. Sans comprendre ce que protège le droit d'auteur, on ne peut pas évaluer correctement les obligations associées à l'utilisation d'un contenu tiers, ni comprendre pourquoi certaines licences accordent des permissions que le droit par défaut refuse.</p>`,
        choice: {
          kind: "free",
          html: `<p>Ce que couvre le droit d'auteur :</p>
<p><strong>Naissance automatique :</strong> en France et dans la plupart des pays (Convention de Berne, signée par 181 pays), le droit d'auteur naît automatiquement à la création d'une œuvre originale, sans dépôt, sans enregistrement, sans mention ©. Une ligne de code, un texte, une image, une composition musicale, un design sont protégés dès leur création. La mention © n'est pas requise en droit français — elle a une valeur informative et dissuasive, pas constitutive.</p>
<p><strong>Ce qui est protégé — la forme, pas l'idée :</strong> le droit d'auteur protège l'expression d'une idée, jamais l'idée elle-même. Un algorithme de tri n'est pas protégeable en tant qu'idée — son implémentation spécifique dans un fichier de code l'est. Une recette de cuisine n'est pas protégeable — le texte qui la décrit l'est. Cette distinction est fondamentale : vous pouvez vous inspirer librement d'une idée, pas copier son expression.</p>
<p><strong>Œuvres protégées en contexte web :</strong> textes (articles, descriptions, contenus éditoriaux), code source (chaque fichier de code est une œuvre de l'esprit), images et photographies (même une photo "banale" si elle reflète un choix créatif de l'auteur), illustrations et graphismes, polices de caractères (les fichiers de police sont des œuvres protégées — une police trouvée sur un blog peut ne pas être légalement redistribuable), musiques et sons, vidéos, bases de données (protection spécifique par le droit sui generis en Europe).</p>
<p><strong>Durée de protection :</strong> en France, le droit d'auteur dure 70 ans après la mort de l'auteur (droit patrimonial). Après cette période, l'œuvre tombe dans le domaine public. Attention : "domaine public" signifie libre d'utilisation patrimoniale, pas libre de toute contrainte — le droit moral (droit à la paternité, droit au respect de l'œuvre) est perpétuel et inaliénable en droit français.</p>
<p><strong>Droit moral vs droit patrimonial :</strong> le droit moral (droit de divulgation, droit à la paternité, droit au respect de l'intégrité, droit de repentir) est inaliénable — l'auteur ne peut pas y renoncer, même contractuellement. Le droit patrimonial (droit de reproduction, de représentation, d'adaptation) est cessible — l'auteur peut le céder ou accorder des licences. Cette distinction est propre au droit continental (France, Allemagne) ; le copyright anglo-saxon est plus patrimonial et traite l'auteur principalement comme un détenteur de droits économiques.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que dans un contexte professionnel salarié, les droits sur le code produit dans le cadre du contrat de travail appartiennent à l'employeur (article L.113-9 du Code de la propriété intellectuelle). Cette règle a une conséquence pratique : le code écrit pour un client ou un employeur ne peut pas être réutilisé dans un projet personnel ou portefeuille sans accord explicite. Les contributeurs open source qui signent un CLA (Contributor License Agreement) cèdent explicitement leurs droits à l'organisation maintenant le projet.</p>`,
        errors: `<p><strong>Pattern 1 — "Trouvé sur Internet = libre d'utilisation" :</strong> croire que l'accessibilité d'un contenu implique son autorisation d'utilisation. L'absence de mention ©, l'ancienneté d'une image, ou le fait qu'elle soit indexée par Google ne change rien à sa protection. La règle par défaut est l'inverse : tout contenu est protégé, sauf preuve contraire (licence explicite, domaine public prouvé).</p>
<p><strong>Pattern 2 — Confondre domaine public et libre de droits :</strong> "libre de droits" (royalty-free) est une licence commerciale — on paie une fois et on peut utiliser sans payer de redevance à chaque usage, mais l'auteur conserve ses droits. "Domaine public" signifie que les droits patrimoniaux sont expirés. Ces deux termes décrivent des situations radicalement différentes.</p>
<p><strong>Pattern 3 — Ignorer le droit d'auteur sur le code des librairies :</strong> intégrer une librairie open source dans un projet commercial sans vérifier sa licence. GPL, LGPL, MIT, Apache, AGPL ont des obligations très différentes sur ce que vous pouvez faire avec le code résultant. Une librairie GPL dans un projet commercial peut imposer la publication du code source complet de ce projet.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les durées de protection selon les pays, les règles spécifiques aux œuvres de collaboration ou aux œuvres employeur/salarié, les développements du droit pour les œuvres générées par IA. <strong>Ce qui ne change pas :</strong> la protection automatique à la création ; la distinction idée/expression ; l'inaliénabilité du droit moral en droit continental ; le fait que l'utilisation d'un contenu tiers sans vérification des droits constitue un risque juridique réel.</p>`,
        practice: {
          exercices: [
            {
              titre: "Auditer les contenus tiers d'un projet existant",
              etapes: [
                "Liste tous les contenus tiers de ton projet : images, polices, icônes, sons, textes copiés, vidéos embarquées. Pour chacun, identifie la source.",
                "Pour chaque source, détermine si la licence est explicitement indiquée. Si non, le contenu est protégé par défaut.",
                "Classe chaque contenu en trois catégories : licence vérifiée et compatible, à vérifier, potentiellement problématique.",
                "Pour les contenus problématiques, identifie une alternative sous licence libre compatible (Unsplash, Pexels, Google Fonts, Font Awesome).",
              ],
              output: "Tableau d'audit : contenu, source, licence, statut, action requise.",
              critere: "Tout contenu dont la licence n'est pas explicitement documentée doit être classé 'à vérifier', pas 'probablement ok'.",
            },
          ],
          piege: "Croire que citer la source d'une image exempte de devoir obtenir une licence. La citation est une règle de bonne pratique académique — elle ne remplace pas l'autorisation légale d'utilisation. Citer 'Photo : Photographer XY' sur un site commercial qui utilise sa photo sans licence ne protège pas d'une poursuite.",
        },
        verification: [
          "Une image trouvée sur un blog en 2008, sans mention ©, peut-elle être utilisée librement sur un site commercial aujourd'hui ? Expliquez votre raisonnement en vous appuyant sur les règles de naissance du droit d'auteur.",
          "Quelle est la différence entre droit moral et droit patrimonial, et pourquoi un auteur français ne peut-il pas contractuellement renoncer à son droit à la paternité même en signant une cession totale de ses droits patrimoniaux ?",
          "Un développeur salarié crée un outil interne pendant ses heures de bureau pour un client de son employeur. Qui détient les droits sur cet outil, et pourquoi le développeur ne peut-il pas le réutiliser dans un projet personnel sans autorisation ?",
        ],
      },
    },

    licencesLibres: {
      id: "licencesLibres",
      label: "Licences libres et leur rôle",
      icon: "🔓",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les licences libres ont rendu possible l'open source, l'écosystème npm, pip, les polices gratuites, les banques d'images libres — une infrastructure collaborative qui représente des milliards de dollars de valeur. Mais elles fonctionnent en s'appuyant sur le droit d'auteur, pas en l'ignorant. Une licence libre est un contrat par lequel l'auteur accorde des permissions précises à quiconque respecte ses conditions. Ne pas respecter ces conditions revient à utiliser l'œuvre sans licence — ce qui remet dans la situation d'infraction au droit d'auteur.</p>`,
        system: `<p>Les licences libres sont l'application pratique du droit d'auteur <span class="ref-fiche">→ fondamentsDroitAuteur</span> au contexte de la collaboration ouverte. Elles structurent les ressources collaboratives documentées dans <span class="ref-fiche">→ Co14</span>. Choisir la mauvaise licence pour un projet ou ne pas respecter les conditions d'une licence tierce a des conséquences directes sur les obligations légales du site <span class="ref-fiche">→ F12</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les familles de licences et leur logique :</p>
<p><strong>Licences de code — spectre du copyleft :</strong> le copyleft est le mécanisme par lequel une licence exige que les travaux dérivés soient distribués sous la même licence (ou compatible). Il utilise le droit d'auteur pour garantir la perpétuation du libre. MIT et BSD (permissives, sans copyleft) : permettent tout — utilisation commerciale, modification, distribution, inclusion dans du code propriétaire — à condition de conserver la mention de copyright et le texte de licence. C'est la licence la plus permissive, choisie par React, Vue, Node.js. Apache 2.0 (permissive avec clause de brevet) : comme MIT mais ajoute une licence explicite sur les brevets détenus par les contributeurs. GPL v2/v3 (copyleft fort) : tout projet qui intègre du code GPL doit être distribué sous GPL. Incompatible avec les projets propriétaires. Linux kernel (GPL v2), WordPress (GPL v2). LGPL (copyleft faible) : permet l'utilisation dans des projets propriétaires via une liaison dynamique, mais les modifications de la lib elle-même doivent être publiées. AGPL (copyleft réseau) : comme GPL mais couvre aussi les services SaaS — utiliser du code AGPL dans un service web impose de publier le code source du service. MongoDB, Nextcloud utilisent AGPL.</p>
<p><strong>Licences Creative Commons (CC) pour les contenus non-code :</strong> système modulaire de 6 licences principales combinant 4 éléments. BY (Attribution) : toujours obligatoire, citer l'auteur. NC (Non Commercial) : interdit l'usage commercial. ND (No Derivatives) : interdit les œuvres dérivées. SA (Share Alike) : les dérivés doivent être sous la même licence (copyleft pour contenus). CC0 équivaut à un abandon de droits (proche du domaine public). CC BY est la plus permissive des CC avec attribution. CC BY-SA (utilisée par Wikipedia) impose le partage sous même licence. Pour un site commercial, les contenus CC NC sont interdits. Vérifier toujours les 4 éléments.</p>
<p><strong>Licences pour les polices :</strong> Open Font License (OFL, utilisée par la plupart des Google Fonts) : permet l'utilisation, modification et distribution y compris dans des projets commerciaux, sans obligation de partager le code source du projet hôte. SIL OFL est la référence pour les polices libres. Certaines polices commerciales ont des licences desktop/web séparées — une licence desktop (pour installer la police sur votre ordinateur) ne couvre pas son intégration dans une CSS @font-face sur un site public.</p>
<p><strong>Choisir la licence de son propre projet :</strong> MIT si vous voulez la réutilisation maximale sans contrainte. Apache 2.0 si vous avez des brevets à protéger. GPL si vous voulez garantir que les dérivés restent libres. AGPL si vous créez un service et voulez que les forks SaaS publient leur code. CC BY pour des contenus que vous partagez avec attribution obligatoire. CC0 si vous voulez un maximum de réutilisation sans aucune condition.</p>`,
        },
        senior: `<p>Un développeur expérimenté vérifie la compatibilité des licences avant d'intégrer une nouvelle dépendance dans un projet avec des contraintes légales spécifiques. GPL et MIT sont incompatibles dans un sens : du code MIT peut être intégré dans un projet GPL, mais du code GPL ne peut pas être intégré dans un projet MIT distribué. Dans les projets commerciaux, les licences AGPL et GPL doivent être examinées avec soin car elles peuvent imposer la publication du code source du projet entier. Des outils comme license-checker (npm) ou pip-licenses permettent d'auditer automatiquement les licences de toutes les dépendances d'un projet.</p>`,
        errors: `<p><strong>Pattern 1 — Ignorer les conditions de la licence open source utilisée :</strong> intégrer une librairie GPL dans un projet commercial propriétaire en pensant que "c'est gratuit donc utilisable librement". GPL impose la publication du code source complet sous GPL. L'ignorer expose à des poursuites de la part des détenteurs de droits (la Software Freedom Conservancy a poursuivi plusieurs entreprises pour violation de GPL).</p>
<p><strong>Pattern 2 — Confondre la licence du projet et la licence des assets :</strong> publier un projet sous MIT en incluant des images sous CC BY-NC ou des polices avec licence desktop uniquement. La licence du code ne s'applique pas aux autres assets du projet — chaque type de contenu a sa propre licence à vérifier.</p>
<p><strong>Pattern 3 — Retirer les mentions d'attribution :</strong> utiliser un contenu sous licence CC BY ou MIT en supprimant la mention de l'auteur original. La quasi-totalité des licences libres exigent la conservation de l'attribution — c'est souvent la seule contrepartie demandée à l'utilisateur.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les versions des licences (GPL v2 vs v3, Apache 1.0 vs 2.0), les nouvelles licences qui émergent (SSPL, BUSL), les licences spécifiques à l'IA (questions ouvertes sur les modèles entraînés sur des données protégées). <strong>Ce qui ne change pas :</strong> la structure fondamentale des licences libres (permissions accordées + conditions à respecter) ; la hiérarchie copyleft fort → copyleft faible → permissive ; l'obligation de lire et respecter les conditions avant d'utiliser.</p>`,
        practice: {
          exercices: [
            {
              titre: "Choisir la bonne licence pour un projet et vérifier les dépendances",
              etapes: [
                "Pour un projet que tu développes (ou fictif), définis les critères de licence : usage commercial autorisé par des tiers ? Obligation de publier les dérivés ? Contraintes sur les brevets ? Compatibilité avec les dépendances déjà présentes ?",
                "Utilise choosealicense.com pour identifier les licences adaptées à tes critères.",
                "Lance <code>npx license-checker --summary</code> sur un projet npm pour voir toutes les licences des dépendances. Identifie les licences copyleft (GPL, AGPL, LGPL) si présentes.",
                "Vérifie la compatibilité entre la licence que tu souhaites appliquer et les licences des dépendances identifiées.",
              ],
              output: "Choix de licence justifié pour le projet + tableau des licences des dépendances + identification des incompatibilités potentielles.",
              critere: "Le choix de licence doit être justifié par les critères du projet, pas par 'c'est ce que tout le monde utilise'.",
            },
          ],
          piege: "Croire que publier son code sur GitHub le rend automatiquement open source ou libre d'utilisation. Un dépôt GitHub sans fichier LICENSE est protégé par le droit d'auteur par défaut — personne ne peut légalement copier, modifier ou distribuer le code. Publier sans licence n'est pas équivalent à publier en open source.",
        },
        verification: [
          "Expliquez le mécanisme du copyleft et pourquoi une librairie sous licence GPL ne peut pas être intégrée dans un projet sous licence MIT distribué en binaire fermé.",
          "Un développeur utilise une police Google Fonts (Open Font License) et des images Unsplash sur son site commercial. A-t-il des obligations légales, et si oui lesquelles ? A-t-il besoin d'une permission supplémentaire pour un usage commercial ?",
          "Quelle est la différence entre AGPL et GPL, et pourquoi AGPL a-t-il été créé à l'ère des services web SaaS ?",
        ],
      },
    },

    droitAuteurWeb: {
      id: "droitAuteurWeb",
      label: "Droit d'auteur et développement web",
      icon: "🌐",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le développement web manipule quotidiennement des contenus protégés : intégration d'APIs de médias sociaux, embed de vidéos YouTube, utilisation de polices et icônes, scrabing de données, génération de contenus par IA à partir de données d'entraînement protégées. Sans cadre de référence sur le droit d'auteur, chacune de ces pratiques peut devenir un risque juridique. Un développeur qui comprend ces règles peut concevoir des architectures qui respectent les droits dès le départ — pas corriger des problèmes légaux en urgence après un déploiement.</p>`,
        system: `<p>Ce nœud applique les principes fondamentaux <span class="ref-fiche">→ fondamentsDroitAuteur</span> et les licences libres <span class="ref-fiche">→ licencesLibres</span> au contexte spécifique du développement web. Il prépare directement les obligations légales pratiques du site <span class="ref-fiche">→ F12</span>. Il dialogue aussi avec la sécurité applicative <span class="ref-fiche">→ P02</span> sur les aspects de collecte et traitement de données.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les cas spécifiques au développement web :</p>
<p><strong>Intégration de contenus tiers (embed) :</strong> intégrer une vidéo YouTube via iframe utilise le player officiel de YouTube — YouTube accorde une licence implicite d'intégration dans ses CGU pour ce cas d'usage. En revanche, télécharger la vidéo et la ré-héberger sur votre serveur est une violation du droit d'auteur. La distinction : utiliser les mécanismes d'intégration fournis par la plateforme ≠ copier le contenu.</p>
<p><strong>APIs de réseaux sociaux :</strong> afficher des tweets, posts Instagram ou Facebook via les APIs officielles est autorisé dans le cadre des CGU de chaque plateforme (qui accordent une licence d'affichage). Scraper et stocker ce contenu sans autorisation, ou l'utiliser en dehors du contexte prévu par les CGU, est une violation des droits. Les plateformes ont des équipes légales qui poursuivent les violations commerciales.</p>
<p><strong>Web scraping :</strong> techniquement possible, légalement complexe. Scraper des données publiquement accessibles peut violer : le droit d'auteur sur le contenu (textes, images), le droit sui generis des bases de données (en Europe, une base de données structurée est protégée même si ses éléments individuels ne le sont pas), les CGU du site (violation contractuelle), potentiellement le Computer Fraud and Abuse Act (USA). Arrêt HiQ vs LinkedIn (USA) : le scraping de données publiques est généralement permis, mais les règles varient par juridiction.</p>
<p><strong>IA générative et droit d'auteur :</strong> sujet en cours de définition juridique (2023-2025). Questions ouvertes : les modèles entraînés sur des données protégées violent-ils le droit d'auteur ? Les outputs générés par IA sont-ils protégeables ? Plusieurs tribunaux américains ont statué que les outputs IA purs (sans intervention créative humaine significative) ne sont pas protégeables. Les affaires Getty Images vs Stability AI et des artistes vs Midjourney/Stable Diffusion sont en cours. Règle prudente : utiliser des modèles avec des informations claires sur leurs données d'entraînement (DALL-E 3, Gemini) pour les usages commerciaux.</p>
<p><strong>Code généré par IA :</strong> statut juridique incertain. GitHub Copilot a fait l'objet d'un procès collectif. La règle prudente : le code généré par IA basé sur du code GPL dans les données d'entraînement peut potentiellement hériter des obligations GPL. Plusieurs grandes entreprises ont des politiques internes interdisant Copilot sur les projets à distribution externe pour cette raison.</p>`,
        },
        senior: `<p>Un développeur expérimenté conçoit ses systèmes d'ingestion de contenu tiers avec les droits en tête dès l'architecture. Si le projet nécessite de stocker des contenus externes, il prévoit : vérification automatique des licences à l'ingestion, TTL de cache aligné sur les CGU de la source, mécanisme de suppression rapide si un ayant droit demande le retrait (notice and takedown), attribution automatique dans l'affichage. Ces décisions d'architecture prises en amont coûtent une fraction de ce que représente une mise en conformité après lancement.</p>`,
        errors: `<p><strong>Pattern 1 — Mettre en cache des contenus sous licence restreinte :</strong> cacher des images ou textes tiers sur son propre serveur pour accélérer le chargement, sans vérifier si la licence autorise la reproduction. Même hébergée temporairement, une copie d'un contenu protégé est une reproduction au sens du droit d'auteur.</p>
<p><strong>Pattern 2 — Utiliser le "fair use" comme justification générale :</strong> invoquer le "fair use" américain (ou l'exception française de citation) pour justifier l'utilisation non autorisée de contenus. Ces exceptions ont des critères stricts (but non commercial, quantité limitée, pas d'impact sur la valeur commerciale de l'œuvre) et ne couvrent pas l'utilisation commerciale générale. Le droit français connaît des exceptions similaires mais différentes — elles ne sont pas interchangeables.</p>
<p><strong>Pattern 3 — Scraper et stocker sans politique de rétention :</strong> construire un crawler qui agrège des contenus protégés dans une base de données sans mécanisme de suppression si une demande de retrait est formulée. L'absence de procédure de retrait transforme une infraction potentielle en infraction certaine.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la jurisprudence sur l'IA et le droit d'auteur (en cours de définition), les politiques d'utilisation des grandes plateformes, les règles de scraping selon les juridictions. <strong>Ce qui ne change pas :</strong> la protection automatique du contenu créatif ; la distinction entre utiliser les mécanismes d'intégration officiels (embed) et copier le contenu ; la nécessité de vérifier les licences avant toute intégration de contenu tiers.</p>`,
        practice: {
          exercices: [
            {
              titre: "Évaluer la conformité droit d'auteur d'une fonctionnalité",
              etapes: [
                "Identifie une fonctionnalité d'un projet qui intègre des contenus tiers (galerie d'images, flux de posts, embed de vidéos, données scrapées).",
                "Pour chaque source de contenu, identifie : quel mécanisme d'intégration est utilisé (API officielle, embed, copie, scraping) et quelle licence ou CGU s'applique.",
                "Identifie si le contenu est stocké localement ou affiché depuis la source. Si stocké : la licence autorise-t-elle la reproduction ?",
                "Si tu identifies une situation non conforme, propose une alternative technique conforme (utiliser l'embed officiel à la place d'une copie, utiliser une source sous licence libre, obtenir une autorisation explicite).",
              ],
              output: "Audit de conformité pour une fonctionnalité : mécanisme d'intégration, licence applicable, conformité, alternative si nécessaire.",
              critere: "Toute incertitude sur la licence doit être traitée comme une non-conformité potentielle, pas comme une zone grise à ignorer.",
            },
          ],
          piege: "Considérer les questions de droit d'auteur sur le web comme des préoccupations uniquement pour les grandes entreprises. Les procédures de notice and takedown (DMCA aux USA, équivalents européens) sont accessibles à n'importe quel ayant droit individuel et peuvent forcer le retrait de contenus ou entraîner la suspension d'un hébergement. La taille du projet ne réduit pas le risque juridique.",
        },
        verification: [
          "Quelle est la différence légale entre intégrer une vidéo YouTube via un iframe et télécharger cette même vidéo pour la ré-héberger, et pourquoi le premier usage est généralement autorisé alors que le second est une violation du droit d'auteur ?",
          "Un projet web scrape chaque nuit les 1000 derniers articles d'un journal en ligne pour les afficher dans une newsletter. Identifiez les 3 fondements légaux distincts sur lesquels ce journal pourrait agir pour faire cesser cette pratique.",
          "Pourquoi le code généré par GitHub Copilot pose-t-il des questions juridiques particulières pour les projets à distribution externe, et quelle règle prudente adoptent certaines grandes entreprises face à cette incertitude ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "fondamentsDroitAuteur", x: 10, y: 100, w: 195, h: 65 },
        { id: "licencesLibres", x: 340, y: 40, w: 165, h: 65 },
        { id: "droitAuteurWeb", x: 620, y: 100, w: 175, h: 65 },
      ],
      edges: [
        { x1: 205, y1: 120, x2: 338, y2: 72, label: "structure" },
        { x1: 205, y1: 148, x2: 618, y2: 148, label: "applique" },
        { x1: 505, y1: 72, x2: 618, y2: 120, label: "cadre" },
      ],
    },
  },
});
