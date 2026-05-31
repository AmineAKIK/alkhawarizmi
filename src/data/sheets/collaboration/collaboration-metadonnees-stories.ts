import { coSheet } from "./collaboration-common";

export const collaborationMetadonneesStories = coSheet({
  id: "collaboration-metadonnees-stories",
  number: 13,
  title: "Métadonnées d'une User Story",
  subtitle: "Priorité, estimation, statut, épics, tags — les champs qui structurent le cycle de vie d'une story dans les outils réels",
  badge: "Fiche Co13",
  meta: ["5 nœuds"],
  readingTime: "25 min",
  description: "Une user story bien rédigée est inutile si personne ne sait quand la traiter, combien elle vaut, à quelle initiative elle appartient, ou si elle est terminée. Les métadonnées sont les champs structurels qui font d'un texte une unité de travail actionnable dans un outil de gestion : priorité, estimation, statut, épic, tags, assignation, et critères d'acceptation comme métadonnée de sortie.",
  accent: "modele",

  nodes: {
    introMetadonnees: {
      id: "introMetadonnees",
      label: "Pourquoi les métadonnées ?",
      icon: "🏷",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une story sans métadonnées est un texte dans un fichier — personne ne sait si elle est prioritaire, à qui elle est assignée, ou si elle est terminée. Dans une équipe de 4 personnes, ça se gère par conversation. Dans une équipe de 12 ou sur un backlog de 200 stories, l'absence de métadonnées produit du chaos : des stories traitées dans le mauvais ordre, des doublons non détectés, des features livrées sans validation claire. Les métadonnées transforment une intention textuelle en unité de travail traçable et gouvernable.</p>`,
        system: `<p>Les métadonnées s'appliquent par-dessus la story rédigée <span class="ref-fiche">→ Co11</span> et servent de système nerveux au backlog <span class="ref-fiche">→ Co10</span>. Elles alimentent les rituels agiles (sprint planning, raffinement, retrospective) en rendant l'état du backlog lisible sans réunion. Elles connectent aussi les stories individuelles à la roadmap produit <span class="ref-fiche">→ Co10</span> via les épics et les initiatives.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les métadonnées varient selon l'outil et la maturité de l'équipe :</p>
<p><strong>Métadonnées essentielles (toujours présentes) :</strong> statut (à faire / en cours / terminé), priorité, assignation. Sans ces trois champs, le backlog ne peut pas être géré.</p>
<p><strong>Métadonnées de planification :</strong> estimation (points ou taille), sprint ou itération, épic parente, date limite. Utiles dès que l'équipe fait de la planification à plus d'une semaine.</p>
<p><strong>Métadonnées de contexte :</strong> tags ou labels, composant ou domaine technique, lien vers la maquette, lien vers la spec technique. Utiles quand le backlog dépasse 50 stories ou quand plusieurs équipes partagent le même outil.</p>
<p><strong>Règle de base :</strong> ne pas créer de champ métadonnée sans avoir défini qui le remplit, quand il est obligatoire, et quelle décision il permet de prendre. Un champ jamais rempli correctement est pire qu'un champ absent — il donne une fausse impression d'organisation.</p>`,
        },
        senior: `<p>Un product manager expérimenté définit les métadonnées obligatoires de son backlog au lancement du projet — et n'en ajoute qu'avec une raison précise. Chaque champ ajouté est une obligation de maintenance : si le champ "composant" est créé mais jamais mis à jour, il génère de la méfiance envers tout le backlog. Mieux vaut 3 champs toujours corrects que 10 champs parfois remplis.</p>`,
        errors: `<p><strong>Pattern 1 — Métadonnées cargo cult :</strong> l'équipe copie la configuration Jira d'une autre équipe avec 15 champs personnalisés dont 9 ne sont jamais remplis. Conséquence : le backlog semble structuré mais les décisions continuent de se prendre en réunion parce que les données ne sont pas fiables.</p>
<p><strong>Pattern 2 — Priorité everywhere :</strong> tous les tickets sont marqués "urgent" ou "haute priorité" parce que personne n'ose faire les vrais arbitrages. Conséquence : la priorité devient une métadonnée décorative — l'équipe ignore le champ et choisit ce qu'elle fait selon d'autres critères informels.</p>
<p><strong>Pattern 3 — Métadonnées en lecture seule :</strong> seul le PM remplit les métadonnées. Les développeurs mettent à jour le statut uniquement quand on leur demande. Conséquence : l'état réel du backlog est inconnu en permanence, et les réunions de statut existent pour compenser le manque de données à jour.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les champs disponibles selon l'outil (Jira, Linear, GitHub Issues, Notion), les conventions de nommage, la granularité de la priorité (MoSCoW, numérique, couleur). <strong>Ce qui ne change pas :</strong> les métadonnées ne valent que si elles sont maintenues à jour en temps réel par toute l'équipe — une métadonnée périmée est une désinformation qui coûte plus cher que son absence.</p>`,
        practice: {
          exercices: [
            {
              titre: "Définir les métadonnées minimales d'un backlog",
              etapes: [
                "Prends un projet existant ou fictif avec 20 stories dans un backlog.",
                "Liste tous les champs actuellement utilisés dans l'outil (ou que tu utiliserais).",
                "Pour chaque champ, réponds : qui le remplit ? quand est-il obligatoire ? quelle décision permet-il de prendre ?",
                "Supprime tous les champs pour lesquels tu ne peux pas répondre clairement aux trois questions.",
                "Identifie les champs manquants : quelles décisions de backlog ne peuvent pas être prises parce qu'un champ n'existe pas ?",
              ],
              output: "Liste des métadonnées conservées avec leur propriétaire, leur caractère obligatoire et la décision qu'elles permettent + liste des champs supprimés avec justification.",
              critere: "Chaque champ conservé doit avoir un propriétaire nommé et une décision concrète qu'il permet de prendre. Si tu ne peux pas nommer la décision, supprime le champ.",
            },
          ],
          piege: "Croire que plus de métadonnées = plus de structure. La surcharge de champs produit l'effet inverse : l'équipe arrête de les maintenir et le backlog devient moins lisible qu'un simple fichier texte.",
        },
        verification: [
          "Quels sont les trois champs de métadonnées absolument indispensables pour qu'un backlog puisse être géré sans réunion de statut quotidienne, et pourquoi ces trois-là spécifiquement ?",
          "Ton backlog Jira a 18 champs personnalisés. Le sprint planning prend 3 heures parce que personne ne se fie aux données affichées. Diagnostique le problème et propose un plan de réduction en 2 étapes.",
          "Pourquoi une métadonnée 'priorité' où toutes les stories sont marquées 'haute' est-elle pire qu'un backlog sans champ de priorité du tout ?",
        ],
      },
    },

    typesMeta: {
      id: "typesMeta",
      label: "Types de métadonnées",
      icon: "📂",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Tous les champs d'une story ne jouent pas le même rôle. Confondre les métadonnées de planification (estimation, sprint) avec les métadonnées de contexte (tags, composant) produit des backlogs où l'on sait combien de temps ça prend mais pas pourquoi on le fait, ou l'inverse. Distinguer les types permet d'en attribuer la responsabilité correctement et d'éviter de créer des champs redondants.</p>`,
        system: `<p>Les types de métadonnées structurent le cycle de vie de la story à différents moments. Les métadonnées de planification interviennent au sprint planning <span class="ref-fiche">→ Co09</span>, les métadonnées de contexte au raffinement <span class="ref-fiche">→ Co12</span>, les métadonnées de suivi tout au long du sprint. Ensemble, elles permettent de répondre à toutes les questions de pilotage sans réunion supplémentaire.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quatre familles de métadonnées avec des responsables distincts :</p>
<p><strong>1. Métadonnées d'identité :</strong> ID unique (auto-généré), titre, description (le texte qui/quoi/pourquoi), épic parente. Remplies par le PM lors de la création. Ne changent pas sauf correction.</p>
<p><strong>2. Métadonnées de planification :</strong> priorité, estimation (points / t-shirt size), sprint ou cycle, date limite. Remplies par le PM pour la priorité, par l'équipe pour l'estimation. Évoluent à chaque raffinement et sprint planning.</p>
<p><strong>3. Métadonnées de suivi :</strong> statut (à faire / en cours / en review / terminé / bloqué), assignation, date de début réel, date de fin réelle, liens vers PRs ou commits. Remplies par les développeurs en temps réel. Changent plusieurs fois par jour en sprint actif.</p>
<p><strong>4. Métadonnées de contexte :</strong> tags ou labels (ex: "mobile", "API", "dette"), composant technique, lien vers maquette, lien vers spec, version cible. Remplies selon le besoin lors du raffinement. Servent à la recherche, au filtrage et aux rétrospectives.</p>`,
        },
        senior: `<p>Un product manager expérimenté assigne une responsabilité claire à chaque type : les métadonnées de planification sont sous sa responsabilité, les métadonnées de suivi sous celle des développeurs. Cette séparation évite deux pathologies courantes : le PM qui met à jour le statut à la place des devs (micromanagement) et les devs qui font varier la priorité sans concertation (chaos de priorisation). La convention doit être explicite, pas implicite.</p>`,
        errors: `<p><strong>Pattern 1 — Mélange planification et suivi :</strong> l'équipe utilise le champ "statut" pour encoder à la fois l'avancement technique ("en développement backend") et l'état de validation produit ("en attente de review PM"). Conséquence : impossible de savoir si une story bloquée l'est pour une raison technique ou pour une décision produit manquante.</p>
<p><strong>Pattern 2 — Tags sans taxonomie :</strong> n'importe qui ajoute des tags selon sa propre logique. Après 6 mois, le backlog a 47 tags dont "api", "API", "backend-api", "api-rest" pour désigner la même chose. Conséquence : le filtrage par tag ne fonctionne plus et les tags deviennent du bruit visuel.</p>
<p><strong>Pattern 3 — Estimation absente ou systématiquement fausse :</strong> les stories sont estimées à 1 point par défaut ou non estimées. Conséquence : le sprint planning n'a aucune base pour choisir ce qui entre dans le sprint, et la vélocité ne mesure rien d'utile.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les noms des champs et les valeurs selon l'outil (Jira appelle ça "Story Points", Linear "Estimate", GitHub Projects "Size"), les workflows de statut selon l'équipe. <strong>Ce qui ne change pas :</strong> les quatre familles de métadonnées répondent à quatre questions distinctes — qui suis-je ? quand et pour combien ? où j'en suis ? à quoi j'appartiens ? — et chaque famille a un propriétaire différent.</p>`,
        practice: {
          exercices: [
            {
              titre: "Classifier les métadonnées d'un outil existant",
              etapes: [
                "Ouvre un ticket Jira, Linear ou GitHub Issues de ton projet (ou crée un exemple fictif avec 10 champs).",
                "Classe chaque champ dans l'une des quatre familles : identité, planification, suivi, contexte.",
                "Pour chaque champ de suivi, vérifie qu'il est mis à jour par les développeurs et non par le PM.",
                "Pour chaque champ de planification, vérifie qu'il y a un consensus sur ce que chaque valeur signifie (ex: que signifie 'priorité haute' dans votre équipe ?).",
                "Identifie les champs qui n'appartiennent à aucune famille clairement — ce sont les candidats à la suppression.",
              ],
              output: "Tableau de classification des champs de ton outil + liste de champs ambigus à clarifier ou supprimer.",
              critere: "Chaque champ doit avoir une famille, un propriétaire et une définition des valeurs possibles. Un champ qui ne remplit pas ces trois conditions est un champ problématique.",
            },
          ],
          piege: "Laisser les développeurs gérer aussi la priorité parce que 'ils savent mieux ce qui est complexe'. La complexité technique informe l'estimation, pas la priorité — confondre les deux produit un backlog organisé selon la facilité d'implémentation plutôt que la valeur utilisateur.",
        },
        verification: [
          "Quelle est la différence entre une métadonnée de planification et une métadonnée de suivi, et pourquoi leurs propriétaires doivent-ils être différents ?",
          "Ton équipe utilise Linear. Le champ 'Priority' est rempli par tout le monde selon son propre jugement. 60% des stories sont en 'Urgent'. Propose un protocole de 3 règles pour restaurer la fiabilité de ce champ sans réunion dédiée.",
          "Pourquoi les métadonnées de contexte (tags, composant, version) sont-elles souvent les premières à être abandonnées dans les équipes, et quel signal d'alerte indique qu'elles deviennent du bruit plutôt que de la structure ?",
        ],
      },
    },

    cycleVieMeta: {
      id: "cycleVieMeta",
      label: "Cycle de vie d'une story",
      icon: "🔄",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une story passe par plusieurs états entre sa création et sa livraison, et les métadonnées doivent refléter chacun d'eux avec précision. Quand le statut ne correspond pas à la réalité — une story "en cours" depuis 8 jours qui est en réalité bloquée depuis 6 — le backlog devient mensonger. Les décisions de sprint planning, de re-priorisation et d'escalade sont alors prises sur des données fausses, avec des conséquences qui s'accumulent jusqu'à la crise de fin de sprint.</p>`,
        system: `<p>Le cycle de vie d'une story est la séquence d'états que ses métadonnées de suivi doivent refléter fidèlement. Il s'articule avec le raffinement <span class="ref-fiche">→ Co12</span> (qui définit la transition vers l'état "ready"), le processus de code review <span class="ref-fiche">→ Co07</span> (qui conditionne la transition vers "terminé"), et les métriques d'équipe <span class="ref-fiche">→ Co10</span> (qui mesurent le temps passé dans chaque état).</p>`,
        choice: {
          kind: "free",
          html: `<p>Un cycle de vie typique pour une story fullstack web/mobile :</p>
<p><strong>Backlog → Ready :</strong> la story est rédigée mais pas encore prête à entrer en sprint. Elle passe en "Ready" après le raffinement : critères d'acceptation présents, estimation faite, dépendances identifiées, maquette disponible si nécessaire.</p>
<p><strong>Ready → In Progress :</strong> la story est prise en charge par un développeur en début de sprint. L'assignation est mise à jour, la date de début est enregistrée (automatiquement dans la plupart des outils).</p>
<p><strong>In Progress → In Review :</strong> le code est soumis en PR. Le statut signale que la story attend une review technique — pas que le développeur est disponible pour autre chose.</p>
<p><strong>In Review → Done :</strong> la PR est mergée, les critères d'acceptation sont vérifiés (par le PM ou le QA), la story est déployée. "Done" signifie livré en production ou en staging selon la définition of done de l'équipe.</p>
<p><strong>États spéciaux :</strong> "Blocked" quand une dépendance externe empêche la progression, "On Hold" quand la priorité a changé en cours de sprint, "Won't Do" quand la story est annulée avec trace de la raison.</p>`,
        },
        senior: `<p>Un product manager expérimenté surveille les stories en état "In Progress" depuis plus de 3 jours sans mouvement — c'est le signal le plus fiable d'un blocage non déclaré. Il n'attend pas le standup : il pose la question directement dans le ticket en commentaire. Cette habitude, visible de tous, normalise la transparence sur les blocages et réduit le tunnel silencieux sans créer de pression de reporting.</p>`,
        errors: `<p><strong>Pattern 1 — Statut décalé de la réalité :</strong> les développeurs mettent à jour le statut en fin de sprint "pour faire propre" plutôt qu'en temps réel. Conséquence : le burndown chart est plat pendant 8 jours puis vertical en fin de sprint — personne ne peut anticiper le dérapage.</p>
<p><strong>Pattern 2 — "Done" sans vérification des critères :</strong> une story est passée en "Done" dès que la PR est mergée, sans vérification des critères d'acceptation par le PM. Conséquence : des stories "terminées" qui ne satisfont pas le besoin utilisateur, découvertes lors de la démo.</p>
<p><strong>Pattern 3 — Pas d'état "Blocked" :</strong> l'équipe n'a pas d'état pour les blocages — tout reste en "In Progress". Conséquence : les blocages sont invisibles dans le backlog, le PM ne peut pas escalader à temps, et les stories bloquées traînent jusqu'à la fin du sprint.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le nombre d'états selon la complexité du workflow (certaines équipes ont 3 états, d'autres 8), les noms des états selon les conventions de l'outil et de l'équipe, les déclencheurs de transition automatisés (Jira peut passer une story en "In Review" automatiquement quand une PR est ouverte). <strong>Ce qui ne change pas :</strong> le statut doit refléter l'état réel du travail à tout moment — un statut décalé de plus de quelques heures est une désinformation qui dégrade la qualité de toutes les décisions basées sur le backlog.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cartographier et corriger un workflow de statuts",
              etapes: [
                "Liste les statuts actuellement utilisés dans ton projet (ou crée un exemple avec les statuts : Backlog, In Progress, Done, et éventuellement d'autres).",
                "Pour chaque statut, définis : quel événement déclenche l'entrée dans cet état ? Qui en est responsable ? Quelle information doit être présente avant de passer à l'état suivant ?",
                "Identifie les transitions manquantes : y a-t-il un état 'Blocked' ? Un état 'In Review' distinct de 'In Progress' ? Un état 'Ready' avant le sprint ?",
                "Propose un workflow en 5 à 6 états maximum avec les définitions de transition explicites.",
              ],
              output: "Diagramme de workflow (peut être textuel) avec 5-6 états, leurs définitions et leurs conditions de transition.",
              critere: "Chaque état doit répondre à la question 'qu'est-ce qui doit être vrai pour qu'une story soit dans cet état ?' sans ambiguïté. Si deux personnes de l'équipe ne sont pas d'accord sur la réponse, la définition est trop floue.",
            },
          ],
          piege: "Créer trop d'états pour couvrir tous les cas possibles. Un workflow de 12 états est intenable — les développeurs sautent des étapes ou restent dans l'état qui leur demande le moins d'effort. 5 à 6 états bien définis valent mieux que 12 états approximatifs.",
        },
        verification: [
          "Pourquoi une story restée en 'In Progress' pendant 5 jours sans mise à jour est-elle un signal d'alerte plus fiable qu'un développeur qui dit 'ça avance bien' en standup ?",
          "Ton équipe n'a pas d'état 'Blocked' dans son workflow. Une story est bloquée depuis 2 jours sur une décision API attendue d'une équipe externe. Comment le PM le découvre-t-il, et quel état aurais-tu ajouté pour rendre ce blocage visible sans réunion ?",
          "Quelle est la définition de 'Done' qui rend une story réellement terminée en contexte web fullstack, et pourquoi 'PR mergée' seule est insuffisante ?",
        ],
      },
    },

    metaEtCriteres: {
      id: "metaEtCriteres",
      label: "Métadonnées et critères d'acceptation",
      icon: "🔗",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Les critères d'acceptation sont souvent traités comme du texte libre dans la description d'une story — et donc ignorés au même titre que le reste de la description. Quand ils sont modélisés comme des métadonnées structurées (des champs ou des tâches liées), ils deviennent vérifiables, traçables et liables à des tests automatisés. La différence entre "on a une liste de critères quelque part dans le ticket" et "chaque critère est une case à cocher liée à un scénario de test" est la différence entre une story qui peut être fermée sans discussion et une story qui génère un débat sur ce qui est "vraiment terminé".</p>`,
        system: `<p>Les critères d'acceptation comme métadonnées structurent la transition vers l'état "Done" dans le cycle de vie <span class="ref-fiche">→ cycleVieMeta</span>. Ils s'appuient sur le format Gherkin défini en <span class="ref-fiche">→ Co11</span> et alimentent directement les tests automatisés <span class="ref-fiche">→ T09</span> dans une approche BDD. Ils constituent aussi la base de la Definition of Done partagée avec l'équipe.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois façons de modéliser les critères d'acceptation comme métadonnées :</p>
<p><strong>Sous-tâches liées :</strong> chaque critère est une sous-tâche du ticket parent. Avantage : visible dans le tableau Kanban, assignable individuellement, traçable dans l'historique. Adapté aux équipes Jira ou Linear qui veulent une granularité fine.</p>
<p><strong>Checklist dans le ticket :</strong> chaque critère est une case à cocher dans la description ou un champ dédié. Plus simple, moins puissant. Adapté aux équipes GitHub Issues ou Notion qui n'ont pas de sous-tâches natives.</p>
<p><strong>Fichiers .feature liés :</strong> les critères Gherkin sont écrits dans des fichiers .feature versionés dans le dépôt Git et référencés depuis le ticket. Avantage : les critères vivent avec le code, sont versionés, et deviennent directement des tests exécutables (Cucumber, Behave, Playwright). Coût : setup initial important, discipline de maintenance requise.</p>
<p><strong>Règle de choix :</strong> commence avec des checklists dans le ticket. Passe aux fichiers .feature si l'équipe pratique le BDD et que les critères sont régulièrement convertis en tests automatisés. Les sous-tâches sont utiles si les critères sont assignés à des développeurs différents.</p>`,
        },
        senior: `<p>Un product manager expérimenté sait que les critères d'acceptation ne sont complètement définis qu'après le raffinement — pas à la création de la story. Il crée la story avec 1 ou 2 critères initiaux comme point de départ, et complète la liste lors du Three Amigos ou du grooming. Commencer avec une liste exhaustive créée seul produit des critères qui manquent les cas techniques que seul le développeur ou le QA auraient identifiés.</p>`,
        errors: `<p><strong>Pattern 1 — Critères dans la description narrative :</strong> les critères sont noyés dans un paragraphe de texte plutôt qu'isolés en liste vérifiable. Conséquence : le développeur et le QA ont chacun leur propre lecture de ce qui est exigé, et la story génère un aller-retour en fin de sprint.</p>
<p><strong>Pattern 2 — Critères immuables :</strong> les critères écrits à la création de la story ne sont jamais mis à jour même quand des cas supplémentaires sont découverts pendant le développement. Conséquence : la story est "terminée" selon les critères originaux mais des comportements non couverts sont livrés comme des bugs non intentionnels.</p>
<p><strong>Pattern 3 — Critères après implémentation :</strong> le développeur écrit les critères d'acceptation après avoir terminé le code pour "valider" ce qu'il a fait. Conséquence : les critères décrivent l'implémentation réelle, pas le besoin attendu — ils ne détectent aucun écart et n'ont aucune valeur.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le format de modélisation (checklists, sous-tâches, fichiers .feature), l'outil utilisé, le niveau d'automatisation des tests associés. <strong>Ce qui ne change pas :</strong> un critère d'acceptation n'a de valeur que s'il est rédigé avant l'implémentation, vérifiable par quelqu'un qui n'a pas écrit le code, et mis à jour si le scope change pendant le développement.</p>`,
        practice: {
          exercices: [
            {
              titre: "Structurer les critères d'acceptation comme métadonnées",
              etapes: [
                "Prends cette story : 'En tant qu'utilisateur mobile connecté, je veux réinitialiser mon mot de passe depuis l'app, afin de récupérer l'accès sans contacter le support.'",
                "Rédige 5 critères d'acceptation en format Gherkin (Given/When/Then) couvrant : le happy path, le cas email inconnu, le cas lien expiré, le cas offline, et le cas déjà connecté.",
                "Modélise ces critères comme une checklist dans un ticket fictif (tu peux écrire le contenu du ticket).",
                "Identifie lesquels de ces critères pourraient être des tests automatisés directement et lesquels nécessitent une vérification manuelle.",
                "Indique qui doit cocher chaque case : PM, QA, développeur, ou automatisé.",
              ],
              output: "Ticket fictif structuré avec 5 critères Gherkin en checklist + classification vérification manuelle/automatisée + responsable de validation pour chaque critère.",
              critere: "Chaque critère doit être vérifiable sans lire le code source. Si un critère nécessite d'ouvrir le code pour savoir s'il est satisfait, c'est un critère d'implémentation, pas d'acceptation.",
            },
          ],
          piege: "Traiter les critères d'acceptation comme une liste exhaustive à créer avant toute discussion. La vraie valeur est dans la conversation qui complète les critères — pas dans la liste initiale.",
        },
        verification: [
          "Pourquoi modéliser les critères d'acceptation comme une checklist dans le ticket est structurellement meilleur que les écrire dans la description narrative, même si le contenu est identique ?",
          "Ton équipe utilise Jira. Les critères d'acceptation sont dans le champ 'Description' de chaque story, en texte libre. Le QA dit qu'il perd du temps à chercher ce qui est à vérifier. Propose deux améliorations concrètes sans changer d'outil.",
          "Quelle est la relation entre un critère d'acceptation bien rédigé en Gherkin et un test end-to-end automatisé, et dans quelle condition cette relation est-elle directement exploitable ?",
        ],
      },
    },

    metaPratiqueOutils: {
      id: "metaPratiqueOutils",
      label: "Métadonnées dans les outils réels",
      icon: "🛠",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Avancé",
      sections: {
        why: `<p>La théorie des métadonnées est une chose ; la configurer correctement dans Jira, Linear ou GitHub Projects en est une autre. Chaque outil a ses propres conventions, ses propres limites et ses propres pièges de configuration. Une équipe qui configure Jira sans savoir ce qu'elle cherche à mesurer finit avec un outil de 20 champs personnalisés dont 15 ne sont jamais utilisés — et un sprint planning qui prend 3 heures parce que personne ne fait confiance aux données affichées.</p>`,
        system: `<p>La configuration des métadonnées dans les outils réels conditionne la qualité du backlog <span class="ref-fiche">→ Co10</span> et l'efficacité des rituels agiles <span class="ref-fiche">→ Co09</span>. Elle influence aussi les métriques d'équipe mesurables : le cycle time, le lead time et le throughput ne peuvent être calculés correctement que si les transitions de statut sont enregistrées en temps réel <span class="ref-fiche">→ Co10</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Configuration dans les trois outils les plus courants :</p>
<p><strong>Jira :</strong> très flexible mais risque de sur-configuration. Les champs personnalisés prolifèrent. Bonnes pratiques : limiter à 5 champs personnalisés maximum, utiliser les épics et les labels natifs plutôt que des champs custom, activer les automations de transition (quand une PR est ouverte → passer en "In Review") pour réduire la friction de mise à jour manuelle. Les Story Points sont natifs et reliés automatiquement à la vélocité du sprint.</p>
<p><strong>Linear :</strong> opinioné et rapide. Les priorités ont 4 niveaux fixes (Urgent/High/Medium/Low) — difficile d'en ajouter. Les cycles (équivalent des sprints) sont optionnels. Les estimations sont en t-shirt size ou Fibonacci au choix. Les labels permettent les métadonnées de contexte. Plus adapté aux équipes qui veulent de l'opinioné sans configuration.</p>
<p><strong>GitHub Issues / Projects :</strong> minimaliste. Les labels sont les seules métadonnées de contexte natives. Les milestones remplacent les épics. Les Projects boards permettent d'ajouter des champs custom (priorité, estimation) mais sans automatisation native avancée. Adapté aux équipes techniques qui vivent déjà dans GitHub et veulent minimiser les outils.</p>`,
        },
        senior: `<p>Un product manager expérimenté commence toujours par définir les rapports qu'il veut consulter avant de configurer les champs. Si le rapport "stories livrées par sprint par composant" est utile, il faut un champ "composant" fiable. Si personne ne consulte ce rapport, le champ "composant" n'a aucune raison d'exister. Cette inversion — partir du rapport plutôt que du champ — élimine 80% des champs inutiles avant même qu'ils soient créés.</p>`,
        errors: `<p><strong>Pattern 1 — Migration d'outil sans réinitialisation :</strong> l'équipe migre de Jira vers Linear en important tous les tickets avec tous leurs champs, y compris ceux qui n'étaient plus maintenus. Conséquence : le nouvel outil hérite du chaos de l'ancien — les gains attendus de la migration ne se matérialisent pas.</p>
<p><strong>Pattern 2 — Automatisation sans convention :</strong> les transitions de statut sont automatisées (PR ouverte → In Review) mais personne n'a défini ce qui se passe quand une PR est fermée sans être mergée. Conséquence : des stories restent en "In Review" après que leur PR a été abandonnée — le backlog affiche un faux état.</p>
<p><strong>Pattern 3 — Reporting sur données non maintenues :</strong> le management demande un rapport de vélocité basé sur les Story Points, mais les estimations n'ont pas été mises à jour depuis 3 mois. Conséquence : le rapport existe mais ne mesure rien de réel — et décisions sont prises sur des données périmées avec une fausse impression de précision.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils (Jira, Linear, GitHub Projects, Notion, Shortcut), leurs fonctionnalités natives, leur capacité d'automatisation, leur coût. <strong>Ce qui ne change pas :</strong> la valeur d'un outil de gestion de backlog est directement proportionnelle à la fiabilité de ses données — un outil parfaitement configuré avec des données périmées est moins utile qu'une feuille Google Sheets à jour.</p>`,
        practice: {
          exercices: [
            {
              titre: "Configurer un backlog minimal dans un outil réel",
              etapes: [
                "Choisis un outil (Jira, Linear, ou GitHub Projects) et crée un projet vide.",
                "Définis les statuts de ton workflow en 5 états maximum avec leurs conditions de transition.",
                "Configure 3 champs de métadonnées maximum : priorité, estimation, et un champ de contexte (tag ou composant).",
                "Crée 3 stories avec tous les champs remplis selon les conventions définies.",
                "Crée un filtre ou une vue qui répond à la question : 'Quelles sont les stories prêtes à entrer dans le prochain sprint ?'",
              ],
              output: "Projet configuré dans l'outil + 3 stories complètes + une vue 'ready for sprint' fonctionnelle.",
              critere: "La vue 'ready for sprint' doit pouvoir être consultée par n'importe qui dans l'équipe et produire la même liste sans discussion. Si deux personnes obtiennent des résultats différents, les critères du filtre ne sont pas assez précis.",
            },
          ],
          piege: "Copier la configuration d'une autre équipe ou d'un template en ligne sans l'adapter à son contexte. Une configuration juste est celle qui répond aux questions que ton équipe se pose réellement — pas aux questions qu'une équipe générique se pose en théorie.",
        },
        verification: [
          "Pourquoi définir les rapports attendus avant de configurer les champs est-il plus efficace que l'inverse, et quel rapport concret définirais-tu en premier pour une équipe fullstack de 6 personnes ?",
          "Ton équipe migre de Jira vers Linear. Tu as 450 tickets à migrer. Décris ta stratégie : qu'importes-tu, qu'abandonnes-tu, et comment gères-tu la transition sans perdre l'historique utile ?",
          "Quelle métrique concrète te permet de savoir, après 3 mois d'utilisation d'un outil de backlog, si les métadonnées configurées apportent réellement de la valeur à l'équipe ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "introMetadonnees", x: 10, y: 100, w: 145, h: 65 },
        { id: "typesMeta", x: 215, y: 40, w: 140, h: 65 },
        { id: "cycleVieMeta", x: 215, y: 165, w: 140, h: 65 },
        { id: "metaEtCriteres", x: 435, y: 100, w: 155, h: 65 },
        { id: "metaPratiqueOutils", x: 660, y: 100, w: 150, h: 65 },
      ],
      edges: [
        { x1: 155, y1: 120, x2: 213, y2: 72, label: "structure" },
        { x1: 155, y1: 148, x2: 213, y2: 197, label: "gouverne" },
        { x1: 355, y1: 72, x2: 433, y2: 120, label: "conditionne" },
        { x1: 355, y1: 197, x2: 433, y2: 148, label: "valide" },
        { x1: 590, y1: 132, x2: 658, y2: 132, label: "opérationnalise" },
      ],
    },
  },
});
