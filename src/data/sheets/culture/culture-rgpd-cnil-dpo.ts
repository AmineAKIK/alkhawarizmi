import { cultureSheet } from "./culture-common";

export const cultureRgpdCnilDpo = cultureSheet({
  id: "culture-F13",
  number: 13,
  title: "RGPD, CNIL et DPO",
  subtitle:
    "Le cadre européen de protection des données personnelles — ce qu'il impose, qui le contrôle, et qui en est responsable",
  badge: "Fiche F13",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description:
    "Dès qu'un site web collecte un email, utilise Google Analytics, ou stocke un historique de commandes, le RGPD s'applique. Ce règlement européen définit des obligations précises pour tout développeur ou organisation qui traite des données personnelles. Cette fiche couvre les trois piliers : le RGPD lui-même (ses principes, sa portée), la CNIL (l'autorité qui contrôle et sanctionne en France), et le DPO (le délégué à la protection des données qui pilote la conformité dans les organisations).",
  accent: "modele",

  nodes: {
    roleRgpd: {
      id: "roleRgpd",
      label: "Rôle et fondements du RGPD",
      icon: "🇪🇺",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Avant le RGPD, les entreprises collectaient des données personnelles sans règles claires sur la durée de conservation, les droits des utilisateurs, ou les obligations en cas de fuite. Le scandale Cambridge Analytica (2018 — 87 millions de profils Facebook exploités à des fins politiques sans consentement) a cristallisé les enjeux. Le RGPD (Règlement Général sur la Protection des Données) répond à un problème structurel : les individus n'avaient aucun contrôle réel sur les données qui les concernent. Pour un développeur, comprendre le RGPD n'est pas une question de conformité administrative — c'est comprendre quelles décisions d'architecture il impose dès la conception.</p>`,
        system: `<p>Le RGPD s'applique à toute application web qui collecte des données personnelles — ce qui couvre la quasi-totalité des projets avec des utilisateurs. Il établit le cadre dans lequel opèrent la CNIL <span class="ref-fiche">→ roleCnil</span> et le DPO <span class="ref-fiche">→ roleDpo</span>. Il structure les obligations pratiques abordées dans les mentions légales et la politique de confidentialité <span class="ref-fiche">→ F12</span>, et interagit avec la sécurité applicative <span class="ref-fiche">→ P02</span> sur les aspects de protection technique des données.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le RGPD en détail :</p>
<p><strong>Qu'est-ce que le RGPD ?</strong> Le Règlement (UE) 2016/679, entré en application le 25 mai 2018, est un règlement européen — il s'applique directement dans tous les États membres sans transposition nationale. Il remplace la directive 95/46/CE et harmonise les règles de protection des données personnelles dans toute l'Union européenne. Le RGPD a inspiré des législations similaires dans le monde : CCPA en Californie, LGPD au Brésil, PIPA en Corée.</p>
<p><strong>Portée géographique — l'extraterritorialité :</strong> le RGPD s'applique à toute organisation qui traite des données de résidents européens, même si l'organisation est établie hors de l'UE. Une startup américaine ou une application mobile australienne qui collecte des données de citoyens européens est soumise au RGPD. La portée n'est pas liée à la localisation de l'entreprise mais à celle des personnes dont les données sont traitées.</p>
<p><strong>Qu'est-ce qu'une donnée personnelle ?</strong> Toute information permettant d'identifier directement ou indirectement une personne physique. Exemples directs : nom, prénom, email, numéro de téléphone, adresse postale. Exemples indirects : adresse IP, identifiant de cookie, numéro de client, données de géolocalisation, identifiant d'appareil. Une donnée anonymisée (impossible à réattribuer à une personne) n'est plus une donnée personnelle. Une donnée pseudonymisée (l'identifiant peut être recoupé avec une clé externe) reste une donnée personnelle.</p>
<p><strong>Les 7 principes fondamentaux (art. 5 RGPD) :</strong> 1. Licéité, loyauté, transparence : traitement basé sur une base légale valide, sans tromper les personnes. 2. Limitation des finalités : les données collectées pour une finalité ne peuvent pas être réutilisées pour une finalité incompatible. 3. Minimisation des données : collecter uniquement les données nécessaires à la finalité. 4. Exactitude : les données doivent être exactes et mises à jour. 5. Limitation de la conservation : pas de conservation indéfinie — une durée maximale doit être définie selon la finalité. 6. Intégrité et confidentialité : protection technique et organisationnelle contre les accès non autorisés. 7. Responsabilité (accountability) : l'organisation doit pouvoir démontrer sa conformité.</p>
<p><strong>Les 6 bases légales du traitement (art. 6 RGPD) :</strong> tout traitement de données personnelles doit reposer sur une base légale. Les plus courantes : consentement explicite et libre (case à cocher non pré-cochée), exécution d'un contrat (traiter l'adresse de livraison pour envoyer une commande), obligation légale (conserver les factures 10 ans pour le fisc), intérêt légitime (prévention de la fraude, sécurité) à condition de ne pas primer sur les droits de la personne. L'intérêt légitime est souvent invoqué à tort pour contourner le consentement — il nécessite un test de mise en balance documenté.</p>
<p><strong>Les droits des personnes (art. 15-22) :</strong> droit d'accès (obtenir une copie de toutes les données le concernant), droit de rectification, droit à l'effacement ("droit à l'oubli"), droit à la limitation du traitement, droit à la portabilité (recevoir ses données dans un format structuré), droit d'opposition, droits relatifs aux décisions automatisées. L'organisation dispose en général de 30 jours pour répondre à une demande d'exercice de droits.</p>`,
        },
        senior: `<p>Un développeur expérimenté applique le principe de "privacy by design" : les décisions de conformité RGPD se prennent à la conception de l'architecture, pas lors de l'audit de conformité avant lancement. Concrètement : collecter uniquement les champs nécessaires dès la conception des formulaires, définir les durées de rétention dans le schéma de base de données, prévoir les APIs d'export et de suppression de données utilisateur dès l'architecture des modèles, et chiffrer les données sensibles au repos. Rétrospectivement ajouter ces fonctionnalités coûte 5 à 10 fois plus cher.</p>`,
        errors: `<p><strong>Pattern 1 — Traiter le consentement comme une formalité :</strong> afficher une case pré-cochée, conditionner l'accès au service à l'acceptation de cookies non essentiels ("cookie wall"), ou ne proposer pas de bouton de refus aussi accessible que l'acceptation. Ces pratiques sont des dark patterns au sens de la CNIL — elles rendent le consentement invalide. Un consentement invalide revient à traiter sans base légale, ce qui expose à des sanctions.</p>
<p><strong>Pattern 2 — Ignorer la minimisation des données :</strong> collecter des informations "utiles plus tard" sans finalité précise — date de naissance, numéro de téléphone, adresse complète pour une newsletter. Le principe de minimisation n'est pas une recommandation mais une obligation. Chaque champ collecté sans finalité précise est un risque légal en cas de fuite et une obligation d'information supplémentaire dans la politique de confidentialité.</p>
<p><strong>Pattern 3 — Pas de procédure de réponse aux demandes d'exercice de droits :</strong> recevoir une demande de suppression de données ("droit à l'oubli") d'un utilisateur et ne pas avoir de processus pour y répondre dans les 30 jours. En l'absence de processus, la demande risque de ne pas être traitée, ce qui constitue une violation RGPD pouvant être signalée à la CNIL par l'utilisateur.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les lignes directrices du CEPD (Comité Européen de la Protection des Données), la jurisprudence des autorités nationales, les décisions sur des sujets émergents (IA, biométrie, transferts de données hors UE). <strong>Ce qui ne change pas :</strong> les 7 principes fondamentaux et les 6 bases légales du RGPD ; l'extraterritorialité pour toute organisation traitant des données de résidents européens ; la conception de la conformité comme un processus continu, pas un état binaire.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cartographier les traitements de données d'un projet",
              etapes: [
                "Pour un projet web existant (ou fictif), liste tous les points de collecte de données personnelles : formulaires, cookies analytiques, logs serveur, emails transactionnels, paiements.",
                "Pour chaque point, identifie : quelle donnée est collectée, pour quelle finalité précise, sur quelle base légale, combien de temps elle est conservée.",
                "Identifie les traitements sans base légale claire ou sans durée de conservation définie.",
                "Vérifie si le projet a une procédure documentée pour répondre aux demandes d'exercice de droits (accès, suppression) dans les 30 jours.",
              ],
              output:
                "Tableau des traitements (Register of Processing Activities — RoPA) : traitement, données collectées, finalité, base légale, durée de conservation, mesures de sécurité.",
              critere:
                "Chaque traitement doit avoir une base légale identifiée — 'parce que c'est utile' n'est pas une base légale valide.",
            },
          ],
          piege:
            "Croire que la politique de confidentialité suffit à assurer la conformité RGPD. La politique de confidentialité est l'obligation d'information (transparence) — l'un des 7 principes. La conformité réelle implique aussi : base légale valide pour chaque traitement, mesures de sécurité techniques, procédures de réponse aux droits, et registre des activités de traitement. Un long document de politique de confidentialité avec des pratiques non conformes n'est pas une protection.",
        },
        verification: [
          "Une startup californienne développe une application de fitness utilisée par 50 000 personnes en France et en Allemagne. Le RGPD s'applique-t-il ? Justifiez votre réponse en vous appuyant sur le critère d'extraterritorialité.",
          "Un site e-commerce souhaite envoyer des newsletters promotionnelles à ses clients. Parmi les bases légales disponibles (consentement, contrat, intérêt légitime), laquelle est appropriée pour cet usage, et pourquoi les deux autres ne le sont pas ?",
          "Quelle est la différence entre une donnée anonymisée et une donnée pseudonymisée au sens du RGPD, et pourquoi cette distinction a-t-elle des conséquences sur les obligations applicables ?",
        ],
      },
    },

    porteeRgpd: {
      id: "porteeRgpd",
      label: "Portée concrète pour les développeurs",
      icon: "⚙",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le RGPD n'est pas uniquement un texte pour les juristes et les DPO. Il impose des choix techniques concrets : comment stocker les mots de passe, pendant combien de temps conserver les logs, comment implémenter la suppression d'un compte, comment configurer Google Analytics, comment traiter les cookies. Un développeur qui ignore ces implications prend des décisions d'architecture qui créent des violations RGPD — et potentiellement des amendes pour son client ou son employeur.</p>`,
        system: `<p>La portée technique du RGPD s'applique directement aux décisions d'architecture applicative <span class="ref-fiche">→ T03</span>, à la gestion des données <span class="ref-fiche">→ T06</span>, et à la sécurité en production <span class="ref-fiche">→ P02</span>. Elle complète les principes fondamentaux du RGPD <span class="ref-fiche">→ roleRgpd</span> et prépare les responsabilités organisationnelles portées par la CNIL <span class="ref-fiche">→ roleCnil</span> et le DPO <span class="ref-fiche">→ roleDpo</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les implications techniques concrètes du RGPD pour un développeur web :</p>
<p><strong>Cookies et traceurs :</strong> les cookies non essentiels (analytics, publicité, réseaux sociaux intégrés) nécessitent un consentement préalable, explicite, libre et éclairé. "Non essentiels" = tout ce qui ne sert pas au fonctionnement technique du service. Google Analytics 4 sans consentement est non conforme en France selon la CNIL. Alternatives conformes sans consentement : Matomo en auto-hébergé avec anonymisation IP, Plausible, Fathom (pas de cookies, données anonymisées). La Consent Management Platform (CMP) utilisée doit respecter le standard IAB TCF 2.0 ou les spécifications CNIL.</p>
<p><strong>Formulaires et collecte :</strong> chaque champ doit être justifié par une finalité précise — ne pas collecter "au cas où". Les champs obligatoires sont ceux strictement nécessaires à la finalité (l'email pour créer un compte est nécessaire ; le numéro de téléphone pour une newsletter ne l'est généralement pas). L'information RGPD doit être présente au point de collecte ("Vos données sont traitées pour X, base légale Y, conservation Z mois, vos droits...") — pas seulement dans la politique de confidentialité accessible via un lien en footer.</p>
<p><strong>Conservation et suppression :</strong> définir des durées de conservation dans le schéma de données (date_expiration sur les tables, scripts de purge automatique). Les logs applicatifs contenant des IPs ou des identifiants d'utilisateurs sont des données personnelles — les conserver indéfiniment viole le principe de limitation de conservation. Recommandation CNIL : logs de sécurité 6 mois maximum, données de connexion 12 mois. Implémenter le "droit à l'oubli" techniquement : suppression effective des données (pas soft-delete only), y compris dans les backups (ou anonymisation lors de la restauration).</p>
<p><strong>Transferts de données hors UE :</strong> envoyer des données personnelles d'européens vers des serveurs aux États-Unis nécessite un mécanisme légal : décision d'adéquation (le pays tiers offre un niveau de protection équivalent — les États-Unis via le Data Privacy Framework depuis 2023), clauses contractuelles types (CCT, approuvées par la Commission européenne), ou binding corporate rules pour les groupes multinationaux. Utiliser AWS us-east-1 ou Google Cloud US sans mesure complémentaire est potentiellement non conforme — préférer les régions européennes (eu-west, europe-west).</p>
<p><strong>Violation de données (data breach) :</strong> en cas de fuite ou compromission de données personnelles, obligation de notification à la CNIL dans les 72 heures si la violation "est susceptible d'engendrer un risque pour les droits et libertés des personnes". Si le risque est élevé pour les personnes concernées, elles doivent aussi être notifiées. Avoir un plan de réponse aux incidents qui inclut cette procédure de notification est une obligation pratique.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que les sous-traitants (hébergeurs, services tiers) sont des "sous-traitants" au sens RGPD et que le responsable de traitement (le client ou l'organisation) doit signer un Data Processing Agreement (DPA) avec chacun d'eux. AWS, Google Cloud, Stripe, Mailchimp, Twilio proposent tous des DPA. Ne pas avoir signé ces DPA tout en utilisant ces services constitue une violation RGPD. Dans les projets professionnels, s'assurer que les DPA sont signés fait partie de la liste de contrôle de mise en production.</p>`,
        errors: `<p><strong>Pattern 1 — Logs applicatifs avec IPs non masquées et durée indéfinie :</strong> configurer les logs serveur pour conserver les adresses IP complètes des utilisateurs indéfiniment. L'IP est une donnée personnelle. Les logs doivent être purgés selon une durée définie, et l'IP peut être pseudonymisée (suppression du dernier octet) pour réduire le caractère identifiant tout en conservant la valeur analytique.</p>
<p><strong>Pattern 2 — Utiliser des services tiers sans DPA :</strong> intégrer Mailchimp, Stripe, ou un service analytics sans avoir signé le Data Processing Agreement correspondant. Tous les sous-traitants qui accèdent à des données personnelles doivent avoir un DPA signé. La CNIL et les autres autorités nationales vérifient ces contrats lors des contrôles.</p>
<p><strong>Pattern 3 — "Droit à l'oubli" implémenté partiellement :</strong> supprimer le compte utilisateur de la base de données principale mais laisser ses données dans les backups, les logs, les tables d'audit, les caches, et les services tiers intégrés. La suppression doit être effective sur tous les systèmes qui ont reçu la donnée. Dans la pratique, les backups sont souvent exemptés à condition que les données soient anonymisées lors de la restauration.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les services tiers et leurs mécanismes de transfert de données (arrêt Privacy Shield 2020, Data Privacy Framework 2023), les outils analytics conformes disponibles, les décisions d'adéquation pour les pays tiers. <strong>Ce qui ne change pas :</strong> le principe de privacy by design (intégrer la conformité dès la conception) ; l'obligation de DPA avec tous les sous-traitants ; les 72 heures de notification en cas de violation ; la nécessité de durées de conservation définies pour toute donnée personnelle.</p>`,
        practice: {
          exercices: [
            {
              titre: "Vérifier la conformité RGPD d'une fonctionnalité concrète",
              etapes: [
                "Choisis une fonctionnalité de ton projet qui collecte des données personnelles (formulaire d'inscription, analytics, formulaire de contact).",
                "Vérifie les 7 points suivants : base légale identifiée, finalité précise documentée, minimisation respectée (pas de champs superflus), durée de conservation définie, information fournie à l'utilisateur au point de collecte, DPA signé avec les sous-traitants impliqués, mécanisme de suppression implémenté.",
                "Pour la configuration analytics : identifie si le service utilisé nécessite un consentement préalable. Si oui, est-il bien en place ? Si non (Matomo anonymisé, Plausible), est-ce documenté comme choix délibéré de conformité ?",
                "Identifie les transferts hors UE impliqués (hébergement, services tiers). Pour chacun, identifie le mécanisme légal applicable (région EU, DPA, décision d'adéquation).",
              ],
              output:
                "Audit de conformité en 7 points pour une fonctionnalité, avec statut conforme/non conforme/à vérifier et action corrective pour chaque point non conforme.",
              critere:
                "Les points 'à vérifier' doivent avoir une action concrète assignée — pas un statut indéfini.",
            },
          ],
          piege:
            "Traiter la conformité RGPD comme un problème uniquement pour les grandes plateformes avec des millions d'utilisateurs. La CNIL contrôle aussi les petites structures. Les notifications reçues par la CNIL proviennent souvent d'utilisateurs individuels mécontents d'un service — la taille du service ne réduit pas le risque de plainte.",
        },
        verification: [
          "Un site utilise Google Analytics sans bandeau de consentement, en invoquant l'intérêt légitime comme base légale. Pourquoi cet argument est-il généralement invalide pour l'analytics publicitaire ou comportemental, et quelle base légale est correcte ?",
          "Un utilisateur demande la suppression de son compte et de toutes ses données. Le développeur supprime l'entrée dans la table 'users' mais les données restent dans les backups hebdomadaires (conservés 6 mois), les logs nginx (conservés indéfiniment), et dans Mailchimp. Quelles obligations reste-t-il à remplir, et pour chaque système, quelle est l'approche recommandée ?",
          "Pourquoi utiliser AWS us-east-1 pour héberger une application dont les utilisateurs sont en Europe peut-il poser un problème RGPD, et quelles sont les deux solutions conformes disponibles ?",
        ],
      },
    },

    roleCnil: {
      id: "roleCnil",
      label: "Rôle et pouvoir de la CNIL",
      icon: "🏛",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La CNIL (Commission Nationale de l'Informatique et des Libertés) n'est pas une administration abstraite — elle dispose de pouvoirs de contrôle et de sanction concrets, et les exerce. En 2022 : Google condamné à 150 millions d'euros, Facebook à 60 millions d'euros, Clearance Energy à 3 millions d'euros pour des violations de cookies. En 2023 et 2024, des structures de taille plus modeste ont également été sanctionnées. Comprendre ce qu'est la CNIL et comment elle fonctionne, c'est comprendre le contexte dans lequel s'inscrit la conformité RGPD en France.</p>`,
        system: `<p>La CNIL est l'autorité de contrôle française désignée par le RGPD (art. 51 RGPD). Elle s'inscrit dans le réseau des autorités de contrôle européennes coordonné par le CEPD (Comité Européen de la Protection des Données). Elle coexiste avec le cadre RGPD <span class="ref-fiche">→ roleRgpd</span> dont elle contrôle l'application, et avec le DPO <span class="ref-fiche">→ roleDpo</span> qui est son interlocuteur principal dans les organisations soumises à obligation de désignation.</p>`,
        choice: {
          kind: "free",
          html: `<p>La CNIL en détail :</p>
<p><strong>Présentation et statut :</strong> la CNIL est une Autorité Administrative Indépendante (AAI) créée par la loi Informatique et Libertés de 1978 — elle précède donc le RGPD de 40 ans. Elle est indépendante du gouvernement et n'est soumise ni aux instructions du pouvoir politique, ni aux intérêts économiques des entreprises contrôlées. Elle est composée de 18 membres : parlementaires, membres du Conseil d'État et de la Cour de cassation, personnalités qualifiées, nommés pour 5 ans non renouvelables. Sa présidente est nommée parmi les membres.</p>
<p><strong>Missions :</strong> informer et conseiller (publications de guides pratiques, recommandations, lignes directrices accessibles sur cnil.fr — une ressource directement utile pour les développeurs), accompagner la conformité (labels, référentiels sectoriels), contrôler le respect des règles (enquêtes en ligne, contrôles sur place, contrôles sur pièces), sanctionner les manquements, représenter la France au niveau européen (CEPD).</p>
<p><strong>Pouvoirs de contrôle :</strong> la CNIL peut mener des contrôles de sa propre initiative, sur plainte d'un utilisateur, ou sur demande d'une autre autorité européenne. Les contrôles peuvent être : en ligne (audit du site public, vérification des cookies, des formulaires, de la politique de confidentialité), sur pièces (demande de documents, de registres de traitements), sur place (inspection physique des locaux et systèmes). Les contrôles en ligne sont continus — la CNIL scanne automatiquement les cookies des sites les plus visités.</p>
<p><strong>Pouvoirs de sanction :</strong> la CNIL peut prononcer : un rappel à l'ordre (violation mineure), une mise en demeure (délai pour se conformer), des mesures correctrices (injonction de cesser un traitement), et des amendes administratives jusqu'à 20 millions d'euros ou 4% du chiffre d'affaires mondial annuel (le plus élevé des deux). Elle peut aussi rendre publiques ses décisions (naming and shaming). Les amendes maximales sont réservées aux violations graves et répétées — dans la pratique, la plupart des amendes sont proportionnées à la taille de l'organisation et à la gravité de la violation.</p>
<p><strong>Comment déposer une plainte auprès de la CNIL :</strong> tout particulier peut déposer une plainte en ligne sur cnil.fr si une organisation ne respecte pas ses droits (refus de répondre à une demande d'accès, cookies imposés, données non supprimées). La CNIL instruit la plainte et peut ouvrir un contrôle. Cette voie est utilisée par de nombreux utilisateurs mécontents — c'est souvent ainsi que les contrôles commencent pour les PME et startups.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise cnil.fr comme ressource de référence, pas uniquement comme source d'information sur les sanctions. Les "guides pratiques" et "fiches pratiques" de la CNIL sur les cookies, les applications mobiles, la sécurité des données, les sous-traitants, ou les durées de conservation sont des documents directement actionnables pour les choix techniques. La CNIL publie aussi des recommandations spécifiques aux secteurs (santé, RH, éducation) qui traduisent le RGPD en obligations concrètes selon le contexte.</p>`,
        errors: `<p><strong>Pattern 1 — Attendre une mise en demeure pour agir :</strong> ne travailler sur la conformité RGPD que lorsque la CNIL a déjà adressé une mise en demeure. À ce stade, l'organisation dispose d'un délai limité pour se conformer sous peine d'amende. La conformité proactive (avant contrôle) est moins coûteuse et moins risquée que la conformité réactive (après mise en demeure).</p>
<p><strong>Pattern 2 — Croire que les petites structures ne sont pas contrôlées :</strong> supposer qu'une startup ou un indépendant est sous le radar de la CNIL. La CNIL instruit toutes les plaintes, quelle que soit la taille de l'organisation visée. Une startup avec 1 000 utilisateurs peut faire l'objet d'un contrôle si un seul utilisateur dépose une plainte motivée.</p>
<p><strong>Pattern 3 — Ignorer les lignes directrices sectorielles de la CNIL :</strong> ne pas consulter les recommandations CNIL spécifiques à son secteur (e-commerce, santé, RH, cloud) avant de concevoir un service. Ces lignes directrices précisent comment le RGPD s'applique dans des contextes précis et constituent la grille d'évaluation lors des contrôles.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la composition de la CNIL, les priorités de contrôle annuelles (publiées chaque année), les montants des amendes prononcées, les nouvelles lignes directrices. <strong>Ce qui ne change pas :</strong> l'indépendance de la CNIL ; ses pouvoirs de contrôle et de sanction ; la possibilité pour tout individu de déposer une plainte ; l'articulation avec le réseau européen des autorités de contrôle (CEPD).</p>`,
        practice: {
          exercices: [
            {
              titre: "Utiliser les ressources de la CNIL pour un projet concret",
              etapes: [
                "Sur cnil.fr, cherche la fiche pratique ou le guide correspondant à ton type de projet (e-commerce, application mobile, site avec formulaire de contact, site utilisant des cookies).",
                "Identifie les 3 obligations les plus importantes selon ce guide pour ton contexte spécifique.",
                "Vérifie si ton projet respecte chacune de ces obligations. Pour celles non respectées, identifie l'action technique concrète à mener.",
                "Consulte la page 'Vos droits' de cnil.fr pour comprendre la procédure de plainte d'un utilisateur. Cela aide à anticiper les demandes et à y répondre rapidement.",
              ],
              output:
                "3 obligations CNIL identifiées pour ton type de projet + état de conformité + action pour chaque point non conforme.",
              critere:
                "Les obligations identifiées doivent venir des ressources officielles CNIL, pas d'une interprétation personnelle ou d'un article de blog.",
            },
          ],
          piege:
            "Considérer cnil.fr comme une ressource uniquement pour les juristes. Les guides techniques de la CNIL (sur les cookies, la sécurité, les mots de passe, les applications mobiles) sont rédigés pour être compréhensibles par des équipes techniques et contiennent des recommandations directement applicables dans le code.",
        },
        verification: [
          "Quel est le statut institutionnel de la CNIL (Autorité Administrative Indépendante), et pourquoi cette indépendance est-elle une propriété importante pour l'efficacité de la régulation ?",
          "Un utilisateur se voit refuser l'accès à ses données personnelles par une entreprise (violation du droit d'accès RGPD). Décrivez la procédure qu'il peut suivre via la CNIL, et quelles sont les actions que la CNIL peut entreprendre suite à cette plainte.",
          "Pourquoi les contrôles en ligne automatisés de la CNIL sur les cookies signifient-ils qu'un site peut être contrôlé sans qu'aucune plainte n'ait été déposée, et quelle conséquence pratique cela a-t-il sur la gestion des cookies ?",
        ],
      },
    },

    roleDpo: {
      id: "roleDpo",
      label: "Rôle et responsabilités du DPO",
      icon: "🧭",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Le DPO (Data Protection Officer — Délégué à la Protection des Données) est une fonction créée par le RGPD pour certaines catégories d'organisations. Son rôle est souvent mal compris : il n'est pas le responsable légal de la conformité RGPD (c'est le responsable de traitement) ni un garde-barrière qui valide chaque projet. Il est un conseiller, un auditeur interne, et un point de contact entre l'organisation, la CNIL, et les personnes concernées. Pour un développeur, comprendre le rôle du DPO aide à savoir à qui poser les questions de conformité — et à quoi s'attendre comme exigences sur les projets techniques.</p>`,
        system: `<p>Le DPO opère dans le cadre défini par le RGPD <span class="ref-fiche">→ roleRgpd</span> et interagit avec la CNIL <span class="ref-fiche">→ roleCnil</span> comme interlocuteur privilégié. Pour les développeurs, il est l'interlocuteur interne sur les questions de conformité technique qui découlent de la portée concrète du RGPD <span class="ref-fiche">→ porteeRgpd</span>. Connaître le rôle du DPO est aussi utile pour des développeurs freelance qui peuvent être amenés à conseiller leurs clients sur la désignation de ce rôle.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le DPO en détail :</p>
<p><strong>Qui doit désigner un DPO ? (art. 37 RGPD) :</strong> la désignation d'un DPO est obligatoire pour : les autorités et organismes publics (administrations, collectivités), les organisations dont les activités de base consistent à effectuer un suivi régulier et systématique des personnes à grande échelle (plateformes publicitaires, opérateurs télécoms, moteurs de recherche), les organisations dont les activités de base consistent à traiter à grande échelle des données sensibles (données de santé, données biométriques, données pénales). Pour les autres organisations, la désignation est facultative mais recommandée. Un DPO peut être désigné pour un groupe d'entreprises s'il est accessible à chacune.</p>
<p><strong>Qui peut être DPO ?</strong> Le DPO doit avoir des "connaissances spécialisées du droit et des pratiques en matière de protection des données" (art. 37.5). Il peut être un employé interne ou un prestataire externe (DPO externalisé). Il ne peut pas occuper simultanément des fonctions créant un conflit d'intérêts avec sa mission (ex: DSI, directeur marketing, directeur général dans une grande organisation — car il contrôlerait ses propres décisions). Pour les PME, le DPO externalisé (cabinet juridique, consultant RGPD) est souvent la solution retenue.</p>
<p><strong>Missions du DPO (art. 39 RGPD) :</strong> informer et conseiller le responsable de traitement et les employés sur leurs obligations RGPD. Contrôler le respect du RGPD en interne (audits, vérifications). Conseiller et surveiller la réalisation des études d'impact (DPIA — Data Protection Impact Assessment) pour les traitements à risque élevé. Coopérer avec la CNIL et lui servir de point de contact. Répondre aux demandes d'exercice de droits des personnes concernées.</p>
<p><strong>Garanties d'indépendance (art. 38 RGPD) :</strong> le DPO bénéficie de protections légales : il ne peut pas être sanctionné pour l'exercice de ses missions, il dispose des ressources et du temps nécessaires, il a accès aux données traitées et aux décisions, il rend compte directement au niveau le plus élevé (direction générale). Ces garanties visent à éviter qu'il soit réduit à une fonction cosmétique sous pression managériale.</p>
<p><strong>Ce que le DPO n'est pas :</strong> il n'est pas responsable légalement à la place du responsable de traitement si l'organisation est sanctionnée — c'est le responsable de traitement (l'organisation) qui est sanctionné. Il n'est pas un validateur obligatoire de chaque projet technique. Il n'est pas le seul responsable de la conformité — chaque équipe est responsable de la conformité de ses propres traitements. Son rôle est de conseiller, contrôler, et coordonner — pas d'exécuter à la place des équipes.</p>`,
        },
        senior: `<p>Un développeur expérimenté dans un contexte avec DPO sait comment travailler efficacement avec lui : présenter les traitements de données en termes de flux (quelles données, d'où elles viennent, où elles vont, combien de temps), anticiper les questions sur la base légale et les mesures de sécurité avant la réunion, et proposer des alternatives techniques moins intrusives dès la conception. Le DPO qui reçoit une documentation technique préparée et une analyse des risques préliminaire ira 3 fois plus vite qu'avec un projet non documenté.</p>`,
        errors: `<p><strong>Pattern 1 — Traiter le DPO comme un obstacle :</strong> contourner le DPO pour accélérer la mise en production d'un traitement de données. Le DPO n'est pas un garde-barrière administratif — son rôle est de protéger l'organisation des risques légaux. Un projet mis en production sans revue DPO qui génère ensuite une plainte CNIL coûte bien plus qu'une revue préalable.</p>
<p><strong>Pattern 2 — Confondre DPO et RSSI :</strong> croire que le DPO est responsable de la sécurité technique des données. Le RSSI (Responsable de la Sécurité des Systèmes d'Information) gère la sécurité technique. Le DPO gère la conformité légale au RGPD. Ces deux rôles sont complémentaires mais distincts — dans une PME, un seul individu peut cumuler les deux à condition de ne pas avoir de conflit d'intérêts, mais les missions restent conceptuellement séparées.</p>
<p><strong>Pattern 3 — Désigner un DPO sans lui donner les moyens d'agir :</strong> nommer un DPO pour cocher une case légale sans lui accorder ni temps, ni budget, ni accès aux projets. Un DPO sans ressources ne peut pas exercer ses missions — et l'organisation n'est pas protégée malgré la désignation formelle. La CNIL vérifie l'effectivité de la désignation, pas seulement son existence.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le profil du DPO selon la taille et le secteur de l'organisation, les outils de gestion de la conformité (DPO software, registres automatisés), les exigences de qualification. <strong>Ce qui ne change pas :</strong> les trois rôles fondamentaux du DPO (conseiller, contrôler, coordonner avec la CNIL) ; son indépendance protégée ; la responsabilité légale qui reste sur le responsable de traitement ; la distinction entre son rôle de conseil et la responsabilité d'exécution des équipes.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier si une organisation doit désigner un DPO",
              etapes: [
                "Décris un projet ou une organisation fictive (ou réelle si disponible) : secteur d'activité, types de données traitées, volume de personnes concernées, nature des traitements (suivi, données sensibles, automatisation).",
                "Applique les 3 critères de désignation obligatoire (art. 37 RGPD) : organisme public ? Suivi régulier et systématique à grande échelle ? Traitement de données sensibles à grande échelle ?",
                "Si la désignation n'est pas obligatoire, évalue si elle est néanmoins recommandée selon le volume et la sensibilité des traitements.",
                "Pour une organisation sans DPO désigné, identifie qui dans l'organisation joue informellement ce rôle et si cette personne a les compétences et l'indépendance nécessaires.",
              ],
              output:
                "Analyse de désignation DPO : critères applicables, conclusion (obligatoire/recommandé/facultatif), et justification.",
              critere:
                "La conclusion doit être justifiée par les critères RGPD — pas par intuition ou taille de l'organisation seule.",
            },
          ],
          piege:
            "Croire que seules les grandes entreprises ont besoin d'un DPO. Les startups du secteur de la santé, les plateformes de RH, les services de marketing digital peuvent être soumises à l'obligation de désignation même avec peu d'employés, parce que c'est la nature des traitements (données sensibles, suivi à grande échelle) qui déclenche l'obligation — pas la taille de l'organisation.",
        },
        verification: [
          "Une plateforme de marketing digital qui gère des profils comportementaux de 500 000 utilisateurs pour cibler des publicités doit-elle désigner un DPO ? Sur quel critère de l'article 37 RGPD basez-vous votre réponse ?",
          "Quelle est la différence entre la responsabilité du DPO et la responsabilité du responsable de traitement en cas de sanction CNIL, et pourquoi cette distinction est-elle importante pour comprendre le rôle du DPO dans l'organisation ?",
          "Un DPO signale à la direction qu'une nouvelle fonctionnalité de collecte de données présente un risque RGPD élevé et recommande sa modification. La direction décide de lancer la fonctionnalité en l'état malgré cet avis. Quelles sont les conséquences possibles et qui est exposé légalement ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 320",
      nodes: [
        { id: "roleRgpd", x: 10, y: 40, w: 170, h: 65 },
        { id: "porteeRgpd", x: 10, y: 165, w: 170, h: 65 },
        { id: "roleCnil", x: 310, y: 100, w: 170, h: 65 },
        { id: "roleDpo", x: 610, y: 100, w: 170, h: 65 },
      ],
      edges: [
        { x1: 180, y1: 72, x2: 308, y2: 120, label: "structure" },
        { x1: 180, y1: 197, x2: 308, y2: 148, label: "conduit" },
        { x1: 480, y1: 132, x2: 608, y2: 132, label: "désigne" },
      ],
    },
  },
});
