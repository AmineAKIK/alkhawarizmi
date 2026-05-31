import { cultureSheet } from "./culture-common";

export const cultureObligationsLegalesWeb = cultureSheet({
  id: "culture-F12",
  number: 12,
  title: "Obligations Légales des Contenus Web",
  subtitle: "Contenus tiers, citations, références et mentions légales — ce qu'un site doit respecter et afficher",
  badge: "Fiche F12",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description: "Un site web n'est pas une zone de non-droit. Il existe des obligations légales précises sur les contenus qu'on peut afficher, comment on doit attribuer les œuvres utilisées, ce qu'on doit mentionner sur le site lui-même. Ces obligations varient selon le pays, le type de site et le type de contenu. Cette fiche donne le cadre pratique pour qu'un développeur puisse concevoir et déployer un site web légalement conforme sans être juriste.",
  accent: "processus",

  nodes: {
    contenusTiersObligations: {
      id: "contenusTiersObligations",
      label: "Droits et obligations sur les contenus tiers",
      icon: "📋",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Dès qu'un site affiche un contenu qu'il n'a pas lui-même créé — une image, un texte, une vidéo, une police, un dataset — il entre dans un régime de droits qu'il doit respecter. La règle par défaut du droit d'auteur est le "tous droits réservés" : sans licence explicite ou exception légale, toute reproduction, représentation ou adaptation est interdite. Un site web qui ignore cette règle accumule des risques juridiques réels, indépendamment de sa bonne foi.</p>`,
        system: `<p>Ces obligations découlent directement des principes du droit d'auteur <span class="ref-fiche">→ F11</span> et des licences applicables <span class="ref-fiche">→ licencesLibres</span>. Elles s'appliquent conjointement aux mentions légales obligatoires <span class="ref-fiche">→ mentionsLegales</span>. Les obligations liées aux données personnelles (RGPD) ne sont pas couvertes ici — elles relèvent de la sécurité applicative <span class="ref-fiche">→ P02</span> et du droit de la protection des données.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les droits et obligations selon le type de contenu tiers :</p>
<p><strong>Images et photographies :</strong> utilisation sur un site commercial : vérifier la licence (Creative Commons, Unsplash, Pexels, Getty, Adobe Stock). Les conditions minimales à vérifier : usage commercial autorisé ? Attribution requise ? Modifications permises ? Sources recommandées pour un usage commercial : Unsplash (licence propre, usage commercial gratuit, attribution non obligatoire mais recommandée), Pexels (similaire), Pixabay (CC0 ou licence Pixabay), Adobe Stock, Getty Images (licences payantes). Attention : les banques d'images gratuites ont des licences très différentes — lire les conditions de chaque plateforme, pas uniquement le format de licence annoncé.</p>
<p><strong>Polices de caractères :</strong> les fichiers de police sont des œuvres protégées. Vérifier la licence pour chaque usage : installation locale (license desktop), intégration web via @font-face (licence web souvent distincte), distribution dans une application. Google Fonts : Open Font License (OFL) par défaut — usage commercial autorisé, aucune attribution obligatoire. Adobe Fonts (Typekit) : inclus dans Creative Cloud, mais les droits ne s'étendent pas hors de l'abonnement actif. Polices achetées : vérifier si la licence couvre le nombre de domaines ou de pageviews prévu.</p>
<p><strong>Icônes et illustrations vectorielles :</strong> Font Awesome (Free) : MIT pour les SVG/JS, CC BY 4.0 pour les icônes SVG — attribution requise en CC BY. Font Awesome Pro : licence payante sans obligation d'attribution. Heroicons, Lucide : MIT, attribution non requise. Material Icons (Google) : Apache 2.0. SVG Repo : licences variables par icône — vérifier chaque icône individuellement.</p>
<p><strong>Textes et contenus éditoriaux :</strong> citer un extrait d'un article est couvert par l'exception de courte citation en droit français (article L.122-5 du CPI) sous conditions : œuvre rendue publique, citation courte justifiée par l'analyse ou la critique, mention du nom de l'auteur et de la source. La courte citation ne couvre pas la reproduction d'un article en entier, même avec attribution. Pour reprendre des textes plus longs, une autorisation explicite ou une licence CC appropriée est nécessaire.</p>
<p><strong>Musiques et sons :</strong> les droits musicaux sont soumis à deux types de droits : droits d'auteur (composition, paroles) et droits voisins (interprétation, enregistrement). Pour un site commercial, les bibliothèques libres de droits (Freesound pour des sons CC, Bensound pour de la musique avec conditions spécifiques) sont les options praticables. Les musiques populaires, même courtes, nécessitent des licences synchronisation auprès des sociétés de gestion (SACEM en France).</p>`,
        },
        senior: `<p>Un développeur expérimenté met en place dès la conception un processus de gestion des licences des assets : chaque image, police et icône intégrée dans le projet a sa licence documentée dans un fichier LICENSES.md ou dans les métadonnées du composant. Ce fichier sert à la fois de protection légale (preuve de due diligence) et de référence pour les futurs contributeurs. Les outils automatisés (license-checker pour npm, Licensee pour les dépôts GitHub) complètent ce travail mais ne le remplacent pas pour les assets non-code.</p>`,
        errors: `<p><strong>Pattern 1 — Télécharger depuis une image de résultats Google Images :</strong> utiliser une image trouvée via Google Images sans remonter à la source originale et vérifier la licence. Google Images indexe du contenu protégé — l'indexation par Google ne constitue pas une licence d'utilisation. L'outil "Paramètres de recherche → Droits d'utilisation" filtre les images par type de licence mais il n'est pas exhaustif et reste indicatif.</p>
<p><strong>Pattern 2 — Utiliser une image "free" sans lire les conditions :</strong> des termes comme "free", "gratuit", "libre" sur une banque d'images ne signifient pas nécessairement "libre pour usage commercial sans attribution". Freepik "free" nécessite une attribution. Flaticon "free" nécessite une attribution. Lire les conditions de chaque plateforme, pas seulement le badge affiché.</p>
<p><strong>Pattern 3 — Inclure des polices sans vérifier le nombre de domaines autorisés :</strong> certaines licences de polices commerciales (Typekit/Adobe Fonts) limitent l'usage à un certain nombre de domaines ou de pageviews. Un site qui grossit peut dépasser ses limites de licence sans le savoir. Vérifier les conditions à l'achat et planifier les renouvellements.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les plateformes de ressources gratuites et leurs conditions, les nouvelles catégories de contenus (assets IA générés), les évolutions de la jurisprudence sur le scraping. <strong>Ce qui ne change pas :</strong> la règle par défaut (tout contenu est protégé sauf licence explicite) ; la nécessité de vérifier les conditions de chaque licence avant utilisation commerciale ; la distinction entre accès libre et utilisation libre.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer un fichier de gestion des licences assets",
              etapes: [
                "Dans un projet existant (ou nouveau), liste tous les assets tiers : images, polices, icônes, sons. Pour chacun, identifie la source, la licence et les conditions d'attribution requises.",
                "Crée un fichier <code>LICENSES.md</code> ou <code>THIRD_PARTY_LICENSES.md</code> à la racine du projet avec un tableau : asset, source URL, licence, conditions d'attribution.",
                "Pour chaque asset nécessitant une attribution, vérifie que la mention est bien présente sur le site (page mentions légales, footer, crédits).",
                "Identifie les assets dont la licence n'est pas documentée et planifie leur vérification ou remplacement.",
              ],
              output: "Fichier LICENSES.md complet pour un projet avec tous les assets tiers documentés.",
              critere: "Chaque asset doit avoir une source URL vérifiable et une licence identifiée — 'probablement CC' n'est pas une licence identifiée.",
            },
          ],
          piege: "Déléguer entièrement la vérification des licences à un client ou un designer sans procédure formelle. En tant que développeur qui intègre les assets, la responsabilité technique de vérification est partagée. Un client qui fournit une image 'libre de droits' sans documentation de la source ne protège pas le développeur d'une mise en demeure sur le site qu'il a construit.",
        },
        verification: [
          "Un client vous fournit une photographie 'trouvée sur internet' pour illustrer sa page d'accueil. Quelles étapes suivez-vous avant de l'intégrer, et que faites-vous si vous ne pouvez pas vérifier la licence d'origine ?",
          "Quelle est la différence entre l'exception de courte citation (droit français, art. L.122-5 CPI) et une licence Creative Commons pour la reproduction de textes, et laquelle couvre la reproduction d'un paragraphe de 200 mots d'un article de presse sur un site commercial ?",
          "Un site utilise Freepik (images 'free') et Google Fonts (Roboto). Lesquelles de ces ressources nécessitent une attribution visible sur le site, et où cette attribution doit-elle apparaître selon les licences respectives ?",
        ],
      },
    },

    citationsReferences: {
      id: "citationsReferences",
      label: "Bonnes pratiques de citation et de référence",
      icon: "📝",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Citer correctement, c'est à la fois respecter le droit d'auteur (éviter le plagiat et satisfaire aux conditions d'attribution), donner de la crédibilité au contenu (les lecteurs peuvent vérifier les sources), et maintenir une relation saine avec les créateurs dont on utilise le travail. Sur le web, les citations incorrectes ou absentes créent trois problèmes distincts : un risque légal (violation d'attribution obligatoire), un problème de confiance (contenu non sourcé), et une relation dégradée avec les communautés de créateurs.</p>`,
        system: `<p>Les bonnes pratiques de citation découlent des conditions d'attribution imposées par les licences libres <span class="ref-fiche">→ F11</span> et de l'exception de courte citation en droit d'auteur <span class="ref-fiche">→ contenusTiersObligations</span>. Elles s'inscrivent dans les mentions légales du site <span class="ref-fiche">→ mentionsLegales</span> pour les crédits globaux.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les formats et pratiques de citation selon le type de contenu :</p>
<p><strong>Attribution d'images (CC BY, Unsplash licence, etc.) :</strong> les conditions minimales d'une attribution complète selon les licences CC : Nom de l'auteur, Titre de l'œuvre si connu, Source (URL originale), Licence (avec lien vers le texte de la licence). Format recommandé : <em>"Photo de [Auteur] sur [Plateforme]"</em> avec liens hypertextes. Placement : caption sous l'image, page de crédits, ou footer. Pour les images Unsplash sans obligation légale d'attribution : l'attribution reste recommandée comme bonne pratique (Unsplash l'encourage dans ses guidelines).</p>
<p><strong>Citation de textes :</strong> l'exception de courte citation en droit français impose : citation courte et proportionnée à la démonstration ou analyse, mention obligatoire du nom de l'auteur, mention obligatoire de la source (titre de l'œuvre ou de l'article, date, URL). Le format HTML sémantique recommandé : la balise <code>blockquote</code> avec attribut <code>cite</code> pour l'URL de la source, et la balise <code>cite</code> pour le nom de la source. Ces balises ont une valeur sémantique pour les moteurs de recherche et les outils d'accessibilité.</p>
<p><strong>Attribution de code open source :</strong> MIT et Apache 2.0 exigent la conservation de la notice de copyright dans le code distribué. Pour une application web qui distribue son code (open source) : inclure un fichier NOTICE ou LICENSES. Pour une application web qui ne distribue pas son code (SaaS) : les licences permissives (MIT, Apache) n'exigent généralement pas d'attribution visible dans l'interface. GPL et AGPL exigent l'accès au code source et la licence — pas nécessairement une mention dans l'interface.</p>
<p><strong>Référencement de sources dans les articles :</strong> les bonnes pratiques journalistiques et académiques transposées au web : lien hypertexte vers la source originale (pas seulement une mention textuelle), distinction claire entre citation directe (guillemets, blockquote) et paraphrase, date de consultation pour les sources web (les URLs changent). Le rel="nofollow" ou rel="ugc" sur les liens vers des sources externes permet de signaler leur nature aux moteurs de recherche sans impact sur leur légitimité juridique.</p>`,
        },
        senior: `<p>Un développeur expérimenté distingue l'attribution légalement requise de l'attribution comme bonne pratique professionnelle. Même quand une licence n'impose pas d'attribution (CC0, Unsplash), mentionner la source est une pratique qui construit la confiance, évite les conflits potentiels avec les créateurs, et contribue à la culture de la création ouverte dont dépend l'écosystème de ressources libres. Les plateformes comme Unsplash existent parce que les utilisateurs adoptent volontairement les bonnes pratiques d'attribution.</p>`,
        errors: `<p><strong>Pattern 1 — Lien brisé comme attribution :</strong> citer une source avec un lien qui est ultérieurement brisé (URL changée, page supprimée). Sur les pages d'archives ou les articles anciens, les liens de citation deviennent fréquemment brisés. Les archives (archive.org) et les citations avec date de consultation réduisent ce problème. Pour les attributions légalement obligatoires, la mention textuelle complète en plus du lien est une protection.</p>
<p><strong>Pattern 2 — Attribution générique sans lien vers l'auteur :</strong> écrire "Source : Wikipedia" sans lien vers l'article spécifique, ou "Photo : Internet". Une attribution correcte permet à l'auteur original d'être identifiable et contactable. "Source : Wikipedia" ne satisfait pas les conditions d'attribution CC BY-SA qui exigent le lien vers la page de l'article et la mention de la licence.</p>
<p><strong>Pattern 3 — Republication sans vérification de la chaîne de licences :</strong> republier un article d'un blog qui a lui-même republié d'une source sans vérifier que chaque maillon de la chaîne autorisait la redistribution. La licence d'un contenu republié n'est valide que si le réditeur avait lui-même le droit de redistribuer. Remonter à la source originale reste la seule vérification fiable.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les formats techniques de citation (schema.org, RDFa, microdata), les plateformes et leurs conventions d'attribution spécifiques. <strong>Ce qui ne change pas :</strong> les quatre éléments d'une attribution complète (auteur, titre, source, licence) ; l'obligation de remonter à la source originale pour vérifier la licence ; la distinction entre l'exigence légale d'attribution et la bonne pratique professionnelle d'attribution.</p>`,
        practice: {
          exercices: [
            {
              titre: "Implémenter les attributions sur une page de contenu",
              etapes: [
                "Prends une page de contenu existante (article, portfolio, landing page) qui utilise au moins une image, une citation et une police tiers.",
                "Pour chaque contenu tiers, identifie la licence applicable et ses conditions d'attribution.",
                "Implémente les attributions manquantes avec le format HTML sémantique approprié : <code>blockquote cite='...'</code> pour les citations textuelles, caption avec lien pour les images, page de crédits pour les polices.",
                "Vérifie que chaque attribution est visible et lisible pour un utilisateur (pas seulement dans le code source HTML).",
              ],
              output: "Page avec attributions correctement implémentées + documentation des choix de format pour chaque type de contenu.",
              critere: "Chaque attribution doit être vérifiable : un lecteur doit pouvoir retrouver la source originale à partir de l'attribution affichée.",
            },
          ],
          piege: "Mettre toutes les attributions uniquement dans le code HTML en commentaires ou dans les métadonnées. Pour les licences qui exigent une attribution, celle-ci doit être visible pour l'utilisateur du site — pas seulement lisible par un développeur qui inspecte le code. La condition d'attribution des licences CC vise l'audience du contenu, pas les développeurs.",
        },
        verification: [
          "Quelle est la structure minimale d'une attribution conforme aux conditions CC BY, et donnez un exemple de format HTML qui la satisfait pour une photographie Flickr sous CC BY 2.0 ?",
          "Un article de blog cite un extrait de 150 mots d'un roman récent pour illustrer un argument littéraire. La citation est entre guillemets avec le nom de l'auteur et le titre du livre. Est-ce légalement suffisant en droit français ? Que manque-t-il éventuellement ?",
          "Pourquoi le fait de placer les attributions uniquement dans le code HTML (commentaires, attributs alt) est-il insuffisant pour respecter les conditions d'attribution des licences Creative Commons ?",
        ],
      },
    },

    mentionsLegales: {
      id: "mentionsLegales",
      label: "Mentions légales obligatoires",
      icon: "📜",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>En France, la loi pour la Confiance dans l'Économie Numérique (LCEN, 2004) impose à tout site web accessible au public d'afficher des mentions légales sous peine de sanctions pénales (jusqu'à 75 000 € d'amende). Ces obligations existent dans la plupart des pays développés, avec des variantes. Un développeur qui met en ligne un site sans vérifier ces obligations crée un risque légal pour son client ou pour lui-même. C'est une des rares obligations légales du web qui s'applique systématiquement à tous les sites, quel que soit leur contenu.</p>`,
        system: `<p>Les mentions légales encadrent l'identité du responsable du site et de l'hébergeur. Elles coexistent avec les conditions générales d'utilisation (CGU) et la politique de confidentialité (RGPD). Sur le plan technique, elles constituent une page à accès facile depuis toutes les pages du site, liée dans le footer. Elles complètent les attributions de contenu tiers <span class="ref-fiche">→ citationsReferences</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les mentions légales obligatoires selon le type de site (droit français, LCEN art. 6-III) :</p>
<p><strong>Pour tout site web (personne physique) :</strong> nom et prénom, adresse, numéro de téléphone ou email, nom et coordonnées de l'hébergeur (nom, adresse, numéro de téléphone). L'adresse personnelle peut être remplacée par l'adresse d'un tiers (avocat, domiciliataire) si la personne souhaite ne pas la publier — moyennant accord de ce tiers.</p>
<p><strong>Pour les professionnels et entreprises :</strong> raison sociale et forme juridique, adresse du siège social, numéro d'immatriculation (RCS, SIRET), capital social, numéro de TVA intracommunautaire si assujetti, directeur de la publication (nom), coordonnées de l'hébergeur. Pour les professions réglementées : référence à l'autorité de supervision et aux règles professionnelles applicables.</p>
<p><strong>Pour les sites de e-commerce :</strong> en plus des mentions professionnelles : conditions générales de vente (CGV) obligatoires, droit de rétractation de 14 jours (directive européenne), modalités de livraison et retour, garanties légales, règlement des litiges.</p>
<p><strong>Politique de confidentialité (RGPD) :</strong> obligatoire dès qu'un site collecte des données personnelles (cookies analytiques, formulaire de contact, inscription). Doit informer sur : l'identité du responsable de traitement, les données collectées, la finalité du traitement, la durée de conservation, les droits des utilisateurs (accès, rectification, suppression), la base légale du traitement. Des solutions comme iubenda ou Cookiebot génèrent des politiques conformes.</p>
<p><strong>Bandeau de consentement aux cookies :</strong> depuis les recommandations CNIL 2020, les cookies non essentiels (analytics, publicité, réseaux sociaux) nécessitent un consentement préalable explicite. Le simple fait de continuer à naviguer ne constitue pas un consentement valide. Le refus doit être aussi simple que l'acceptation. Google Analytics sans consentement préalable est une violation des recommandations CNIL en France.</p>`,
        },
        senior: `<p>Un développeur expérimenté intègre la page de mentions légales dans le template de base de chaque nouveau projet, avec des variables à remplir par le client. Cette approche évite l'oubli systématique et force la conversation sur les informations légales dès le démarrage du projet, pas lors de la mise en ligne. Il sait aussi que la conformité RGPD n'est pas uniquement une question de bandeau cookies — elle implique des décisions d'architecture (où les données sont stockées, combien de temps, qui y a accès) qui doivent être prises en amont.</p>`,
        errors: `<p><strong>Pattern 1 — Page de mentions légales absente ou vide :</strong> livrer un site sans page de mentions légales, ou avec un template rempli de données fictives "à compléter". En France, l'absence de mentions légales est une infraction pénale. La page doit être accessible depuis toutes les pages du site, généralement via un lien en footer.</p>
<p><strong>Pattern 2 — Confondre mentions légales, CGU et politique de confidentialité :</strong> rassembler toutes les obligations légales sur une seule page sans structure lisible. Les mentions légales (identité du site), les CGU (conditions d'utilisation du service), et la politique de confidentialité (traitement des données) sont des documents distincts avec des audiences et des obligations différentes — les regrouper peut rendre le document illisible et la conformité difficile à vérifier.</p>
<p><strong>Pattern 3 — Bandeaux cookies cosmétiques :</strong> installer un bandeau cookies qui affiche "Accepter" et "En savoir plus" sans option de refus simple, ou qui place les cookies analytiques avant le consentement. Ces pratiques sont des dark patterns au sens de la CNIL. Les amendes CNIL pour non-conformité cookies ont été significatives (Google : 150 M€, Facebook : 60 M€ en 2022).</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les textes réglementaires évoluent (nouvelles lignes directrices CNIL, DSA européen), les exigences spécifiques selon le type de site et le secteur d'activité, les règles selon la juridiction. <strong>Ce qui ne change pas :</strong> l'obligation d'identifier clairement le responsable du site et l'hébergeur ; l'obligation d'informer sur le traitement des données personnelles ; la nécessité de conserver une documentation de conformité.</p>`,
        practice: {
          exercices: [
            {
              titre: "Rédiger les mentions légales d'un projet réel",
              etapes: [
                "Identifie le type de site : personnel, association, entreprise, e-commerce. Identifie la juridiction principale (France par défaut).",
                "Liste les informations obligatoires selon le type de site (LCEN) et prépare les informations nécessaires avec le client ou pour ton projet.",
                "Crée la page mentions légales avec les sections : éditeur, directeur de publication, hébergeur, propriété intellectuelle (si applicable), liens vers CGU et politique de confidentialité.",
                "Vérifie que la page est accessible depuis le footer de toutes les pages. Teste avec un vérificateur en ligne (ex: LegalMonster ou Legifiscal).",
              ],
              output: "Page de mentions légales conforme LCEN pour un type de site spécifié, accessible depuis le footer.",
              critere: "Toutes les sections obligatoires pour le type de site identifié doivent être présentes avec des informations réelles, pas des placeholders.",
            },
          ],
          piege: "Croire qu'un générateur de mentions légales en ligne produit un document systématiquement conforme et à jour. Ces outils sont des aides, pas des garanties. Les exigences légales évoluent et varient selon le secteur d'activité, la nature du service, et la juridiction des utilisateurs. Pour un site commercial, une vérification par un juriste spécialisé en droit du numérique est une précaution raisonnable.",
        },
        verification: [
          "Quelles sont les 4 informations minimales obligatoires dans les mentions légales d'un site personnel hébergé par une personne physique en France, et quelle loi les impose ?",
          "Un site utilise Google Analytics sans bandeau de consentement aux cookies. En quoi cette pratique est-elle non conforme aux recommandations CNIL, et quelle alternative technique est conforme sans bandeau (ou avec un bandeau simplifié) ?",
          "Quelle est la différence entre les mentions légales, les CGU et la politique de confidentialité, et pourquoi ces trois documents doivent-ils être distincts et accessibles séparément ?",
        ],
      },
    },

    protectionContenuPropre: {
      id: "protectionContenuPropre",
      label: "Protéger le contenu de son propre site",
      icon: "🔏",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Le droit d'auteur protège automatiquement le contenu que vous créez pour votre site — mais cette protection est inerte si vous n'avez pas de preuves de la date de création, si vous n'avez pas défini explicitement ce que les visiteurs peuvent faire avec votre contenu, et si vous ne savez pas détecter et réagir à un usage non autorisé. La protection passive (le droit existe) sans protection active (la preuve, la licence, le monitoring) laisse le créateur sans outils face à une violation.</p>`,
        system: `<p>Ce nœud est l'inverse des nœuds précédents : si <span class="ref-fiche">→ contenusTiersObligations</span> et <span class="ref-fiche">→ citationsReferences</span> traitent de l'utilisation de contenus tiers, ce nœud traite de la protection de son propre contenu. Il s'appuie sur les fondamentaux <span class="ref-fiche">→ F11</span> et complète les mentions légales <span class="ref-fiche">→ mentionsLegales</span> par les déclarations de droits sur le contenu du site.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les mécanismes de protection active du contenu d'un site :</p>
<p><strong>Définir explicitement les droits accordés :</strong> la mention "Tous droits réservés" ou "© [Année] [Auteur]" dans le footer indique que le droit d'auteur est exercé et que toute reproduction nécessite une autorisation. Si vous souhaitez autoriser certains usages, publier une licence explicite (CC BY pour les articles si vous souhaitez qu'ils soient partagés avec attribution, CC BY-NC pour interdire l'usage commercial) évite les zones d'ambiguïté. Une licence explicite est plus utile que l'absence de mention — elle dit clairement ce que les visiteurs peuvent faire.</p>
<p><strong>Constituer des preuves de création :</strong> le droit d'auteur naît à la création, mais en cas de litige, prouver la date de création est indispensable. Méthodes : dépôt à l'INPI (Institut National de la Propriété Industrielle) pour les œuvres importantes, enveloppe Soleau (INPI, 15 €, conservation de 5 ans renouvelables), timestamp via les commits Git (hash cryptographique des fichiers à une date attestée), services de certification d'horodatage (certifiez.com, OriginStamp via blockchain), ou simplement un email envoyé à soi-même avec pièce jointe (valeur probante limitée mais accessible).</p>
<p><strong>Détecter les utilisations non autorisées :</strong> Google Alerts sur des extraits spécifiques de votre contenu pour détecter les copies. TinEye (tineye.com) et Google Images (recherche par image inversée) pour les photographies. Copyscape (copyscape.com) pour les textes — détecte les copies de contenu web. Ces outils permettent d'identifier les violations avant qu'elles ne deviennent des précédents.</p>
<p><strong>Réagir à une violation :</strong> démarche graduelle recommandée. Étape 1 : contact direct avec le contrevenant (email documenté demandant le retrait). Étape 2 si absence de réponse : procédure DMCA (pour les hébergeurs américains) ou signalement à l'hébergeur du site contrevenant. Étape 3 : mise en demeure formelle par lettre recommandée. Étape 4 : action en justice si les enjeux le justifient. La plupart des violations se résolvent à l'étape 1 ou 2.</p>`,
        },
        senior: `<p>Un développeur expérimenté qui maintient un blog technique ou un portfolio sait que les copies de contenu sont fréquentes — souvent automatisées par des agrégateurs ou des systèmes de curation qui ne vérifient pas les droits. Avoir un processus simple de détection (Google Alerts sur des phrases caractéristiques) et une lettre type de demande de retrait permet de gérer ces situations sans y consacrer des ressources disproportionnées. La plupart des copies non malveillantes sont retirées rapidement sur simple demande.</p>`,
        errors: `<p><strong>Pattern 1 — Aucune mention de droits sur le site :</strong> publier du contenu sans mention © ni license dans le footer. L'absence de mention ne supprime pas le droit d'auteur, mais elle crée une ambiguïté sur les usages autorisés et rend moins évident que les droits sont activement exercés. Une mention simple en footer élimine cette ambiguïté.</p>
<p><strong>Pattern 2 — Utiliser des protections techniques illusoires :</strong> désactiver le clic droit, masquer les images en CSS background-image, ou bloquer le copier-coller pour "protéger" le contenu. Ces mesures sont triviales à contourner et irritent les utilisateurs légitimes sans protéger contre les copies malveillantes. La protection réelle est légale (droit d'auteur) et par la preuve de création, pas technique.</p>
<p><strong>Pattern 3 — Ne jamais surveiller l'utilisation de son contenu :</strong> créer du contenu sans mécanisme de détection des copies. Des algorithmes de curation de contenu copient automatiquement des centaines de sites — sans monitoring, le créateur ne le sait jamais. Une alerte Google basique sur quelques phrases spécifiques prend 2 minutes à configurer et signale les copies.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils de détection (évolution de la recherche inversée d'images, nouveaux services d'horodatage), les procédures de signalement selon les plateformes. <strong>Ce qui ne change pas :</strong> la protection automatique du droit d'auteur à la création ; la nécessité de preuves en cas de litige ; la démarche graduée pour répondre à une violation (contact → signalement → mise en demeure → action) ; la supériorité de la protection légale sur la protection technique.</p>`,
        practice: {
          exercices: [
            {
              titre: "Configurer une surveillance basique de son contenu",
              etapes: [
                "Dans le footer de ton site (ou d'un projet de test), ajoute une mention © avec l'année et le nom de l'auteur. Si tu souhaites autoriser certains usages, ajoute un lien vers ta licence choisie (Creative Commons ou autre).",
                "Sélectionne 3 à 5 phrases spécifiques de tes articles ou descriptions. Configure une alerte Google (google.fr/alerts) avec ces phrases entre guillemets pour détecter les copies.",
                "Si ton site contient des photos originales, télécharge-en une sur TinEye (tineye.com) et Google Images pour voir si elle est déjà référencée ailleurs.",
                "Rédige un email type de demande de retrait (50 mots, ton, référence légale, délai) que tu pourras utiliser si une copie non autorisée est détectée.",
              ],
              output: "Mention © configurée + 3 alertes Google activées + vérification TinEye effectuée + email type rédigé.",
              critere: "Les alertes doivent utiliser des phrases assez spécifiques pour ne pas générer de faux positifs — une phrase de 8 mots caractéristique de ton contenu, pas un titre générique.",
            },
          ],
          piege: "Penser que protéger son contenu est uniquement utile si on est un créateur professionnel avec un contenu très précieux. En réalité, même un portfolio technique ou un blog de développement peut faire l'objet de copies — notamment par des agrégateurs de contenu automatisés qui ne vérifient jamais les droits. La mise en place de surveillance basique prend moins de 15 minutes.",
        },
        verification: [
          "Quelles sont les deux preuves de création les plus accessibles pour un développeur solo qui veut documenter la date de création de son contenu, et quelle est leur valeur probante respective en cas de litige ?",
          "Un site concurrent copie intégralement 5 articles de votre blog technique sans permission ni attribution. Décrivez les 3 premières étapes de la démarche recommandée pour faire cesser cette violation, dans l'ordre croissant de formalisme.",
          "Pourquoi désactiver le clic droit sur les images d'un site est-il une protection inefficace contre les copies non autorisées, et quelle protection réelle existe à la place ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 320",
      nodes: [
        { id: "contenusTiersObligations", x: 10, y: 40, w: 195, h: 65 },
        { id: "citationsReferences", x: 10, y: 165, w: 185, h: 65 },
        { id: "mentionsLegales", x: 330, y: 100, w: 170, h: 65 },
        { id: "protectionContenuPropre", x: 620, y: 100, w: 185, h: 65 },
      ],
      edges: [
        { x1: 205, y1: 72, x2: 328, y2: 120, label: "cadre" },
        { x1: 195, y1: 197, x2: 328, y2: 148, label: "forme" },
        { x1: 500, y1: 132, x2: 618, y2: 132, label: "complète" },
      ],
    },
  },
});
