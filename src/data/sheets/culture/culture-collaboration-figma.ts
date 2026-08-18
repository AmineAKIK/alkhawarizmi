import { cultureSheet } from "./culture-common";

export const cultureCollaborationFigma = cultureSheet({
  id: "culture-F31",
  number: 31,
  title: "Collaboration dans Figma",
  subtitle: "Co-édition en temps réel, autorisations, commentaires et historique de versions",
  badge: "Fiche F31",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description:
    "Figma est conçu pour le travail en équipe : plusieurs personnes éditent le même fichier simultanément, les autorisations contrôlent qui peut modifier ou seulement consulter, les commentaires ancrés sur le canvas remplacent les allers-retours par email, et l'historique de versions permet de revenir à n'importe quel état antérieur. Comprendre ces mécanismes, c'est éviter les conflits d'édition, les accès involontaires et les retours de stakeholders qui se perdent.",
  accent: "processus",

  nodes: {
    coEditionTempsReel: {
      id: "coEditionTempsReel",
      label: "Co-édition en temps réel",
      icon: "⇄",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Quand deux designers travaillent sur le même fichier Figma sans savoir ce que fait l'autre, l'un écrase les modifications de l'autre, des composants sont déplacés sans raison apparente, et les frames se retrouvent dans un état intermédiaire que personne ne reconnaît. La co-édition en temps réel est le mécanisme qui rend la collaboration simultanée visible et coordonnable — mais seulement si l'équipe comprend ses règles et ses limites.</p>`,
        system: `<p>La co-édition opère sur la structure du fichier Figma établie dans <span class="ref-fiche">→ D04</span> — pages, sections et calques nommés rendent la co-édition lisible. Elle complète les commentaires ancrés sur le canvas <span class="ref-fiche">→ commentairesAnnotations</span> qui permettent des échanges asynchrones sur le même fichier. Elle conditionne les autorisations <span class="ref-fiche">→ autorisationsRoles</span> : un éditeur co-édite, un viewer observe sans modifier. L'historique de versions <span class="ref-fiche">→ historiqueVersions</span> sécurise le travail simultané en permettant de revenir en arrière après un conflit.</p>`,
        choice: {
          kind: "free",
          html: `<p>Mécanismes de co-édition en temps réel dans Figma :</p>
<p><strong>Curseurs et présence :</strong> chaque collaborateur connecté au fichier est visible par un curseur coloré portant son prénom. Ces curseurs se déplacent en temps réel — ils indiquent sur quelle zone chaque personne travaille. Cliquer sur un curseur dans la barre de présence (en haut à droite) fait sauter la vue vers la position de cette personne dans le canvas. C'est la façon la plus rapide de rejoindre un collaborateur sans communication externe.</p>
<p><strong>Follow mode :</strong> cliquer sur l'avatar d'un collaborateur dans la barre de présence active le mode "Follow". Votre vue suit automatiquement les déplacements et zoom de cette personne dans le canvas — comme regarder par-dessus son épaule. Pour sortir du Follow mode : cliquer à nouveau sur l'avatar, appuyer sur Echap, ou naviguer manuellement. Utile pour les revues en temps réel avec un stakeholder ou pour suivre une explication technique en appel vidéo sans partage d'écran.</p>
<p><strong>Conflits d'édition simultanée :</strong> Figma résout les conflits par "last write wins" au niveau de la propriété. Si deux designers modifient la couleur du même rectangle simultanément, la dernière modification enregistrée gagne — sans alerte. Ce comportement silencieux est la principale source de confusion en co-édition. Règle pratique : deux personnes ne doivent pas travailler sur les mêmes frames simultanément. Organiser la co-édition par zones : "je suis sur la page Mobile, tu travailles sur la page Desktop".</p>
<p><strong>Sections et zones de travail :</strong> les Sections dans Figma (clic droit sur le canvas → "Add section", ou touche S) créent des conteneurs visuels qui délimitent les zones de travail. Nommer les sections "En cours — Alice" et "En cours — Bob" est une convention simple qui évite la co-édition non intentionnelle. Les sections n'ont pas de comportement de verrouillage — elles sont des repères visuels, pas des protections techniques.</p>
<p><strong>Verrouillage d'éléments :</strong> dans le panneau de calques, clic droit sur un calque → "Lock" (ou Cmd/Ctrl+Shift+L) verrouille un élément. Un élément verrouillé ne peut pas être sélectionné ni modifié par qui que ce soit dans le fichier, y compris par le propriétaire. C'est le mécanisme de protection contre les modifications involontaires. Utile pour les éléments de fond, les guides visuels ou les composants finalisés pendant qu'on travaille sur d'autres parties.</p>
<p><strong>Observation sans modification :</strong> un collaborateur avec des droits View only (Viewer) voit les curseurs des éditeurs en temps réel mais ne peut pas modifier le fichier. Son propre curseur n'est pas visible des autres — il observe en silence. Les Viewers peuvent utiliser le Follow mode pour suivre un éditeur, et peuvent ajouter des commentaires si l'autorisation est activée.</p>`,
        },
        senior: `<p>Un designer expérimenté qui co-édite avec son équipe prévoit une convention de zones avant d'ouvrir le fichier — pas après avoir constaté un conflit. Il utilise les sections nommées pour délimiter les territoires de travail de chaque session, et verrouille systématiquement les composants finalisés avant de partager le fichier pour une session de co-édition. Il sait aussi que le Follow mode est son meilleur outil pour les revues synchrones à distance : au lieu de partager son écran via Teams ou Zoom (avec la latence que ça implique), il invite le stakeholder dans le fichier Figma et utilise Follow pour guider la revue directement dans l'outil.</p>`,
        errors: `<p><strong>Pattern 1 — Co-édition sur les mêmes frames sans coordination :</strong> deux designers travaillent en parallèle sur les mêmes écrans, chacun pensant travailler sur "sa version". Les modifications s'écrasent mutuellement en silence. La cause : l'absence de convention de zones avant la session de co-édition. Solution : séparer physiquement les zones de travail dans le canvas et annoncer sa zone dans le canal de communication de l'équipe avant de commencer.</p>
<p><strong>Pattern 2 — Follow mode confondu avec le partage d'écran :</strong> utiliser Figma en partage d'écran pour les revues à distance au lieu d'inviter les participants directement dans le fichier. En partage d'écran, les observateurs voient une image compressée de votre écran. Dans Figma avec Follow mode, ils voient le fichier en qualité native et peuvent commenter, zoomer ou consulter les propriétés. La revue est plus riche et plus rapide.</p>
<p><strong>Pattern 3 — Fichier non verrouillé partagé pour retour stakeholder :</strong> envoyer un lien d'accès Editor à un stakeholder pour qu'il commente le fichier. Le stakeholder, sans formation Figma, modifie involontairement des frames, déplace des éléments, casse l'alignement. Donner des droits Viewer avec autorisation de commentaire aux parties prenantes non-designers — jamais des droits Editor par défaut.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les fonctionnalités de co-édition de Figma (la co-édition multiplayer a évolué significativement en 2023 vers une architecture plus robuste), les alternatives d'outils (Penpot, Sketch avec Sketch Cloud). <strong>Ce qui ne change pas :</strong> deux personnes éditant les mêmes éléments simultanément sans coordination produiront des conflits, quel que soit l'outil ; les conventions d'équipe sur les zones de travail précèdent toujours les mécanismes techniques de verrouillage.</p>`,
        practice: {
          exercices: [
            {
              titre: "Organiser une session de co-édition sans conflit",
              etapes: [
                "Ouvre un fichier Figma en collaboration avec une autre personne (ou simule avec deux onglets/comptes). Observe les curseurs et la barre de présence en haut à droite.",
                "Crée deux Sections dans le canvas : 'Zone A — [ton prénom]' et 'Zone B — [prénom du collaborateur]'. Chaque personne ne travaille que dans sa section.",
                "Verrouille 3 calques dans ta zone (Cmd/Ctrl+Shift+L) et teste que le collaborateur ne peut pas les sélectionner. Vérifie dans le panneau de calques qu'ils affichent l'icône de verrouillage.",
                "Active le Follow mode en cliquant sur l'avatar du collaborateur. Observe que ta vue suit ses déplacements. Navigue manuellement pour quitter le Follow mode.",
              ],
              output:
                "Fichier organisé avec sections nommées par zone de travail, calques verrouillés dans chaque zone, Follow mode testé et compris — session documentée avec une convention de zones écrite.",
              critere:
                "La convention de zones doit être écrite explicitement (dans un commentaire épinglé ou une note dans le fichier) avant que la co-édition commence. Le Follow mode doit être testé dans les deux sens. Les calques verrouillés doivent résister à la sélection par le collaborateur.",
            },
          ],
          piege:
            "Croire que la co-édition en temps réel est sûre par défaut parce que Figma est 'intelligent'. Figma synchronise les modifications sans arbitrage — il n'y a pas de merge automatique intelligent comme dans Git. C'est l'équipe qui gère la coordination, pas l'outil.",
        },
        verification: [
          "Deux designers travaillent simultanément sur la même Card component dans Figma. Designer A change la couleur de fond en bleu, designer B la change en vert au même moment. Quel est le résultat final, pourquoi, et quelle pratique évite ce scénario ?",
          "Lors d'une revue design à distance, vous expliquez une maquette complexe à un product manager via un appel Teams avec partage d'écran. Quelle alternative Figma offre-t-elle, et en quoi est-elle supérieure pour ce type d'échange ?",
          "Pourquoi verrouiller un calque dans Figma est-il différent de donner des droits Viewer à un utilisateur, et dans quelle situation chaque mécanisme est-il approprié ?",
        ],
      },
    },

    autorisationsRoles: {
      id: "autorisationsRoles",
      label: "Autorisations, rôles et permissions",
      icon: "🔑",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un lien Figma envoyé sans réfléchir aux permissions peut donner à un client la capacité de supprimer des composants, à un développeur externe de modifier les maquettes finales, ou à toute personne possédant le lien d'accéder à des maquettes confidentielles. Les permissions Figma sont un système en couches — organisation, équipe, projet, fichier — et chaque couche peut restreindre ou étendre ce que la précédente autorisait. Ignorer ce système, c'est choisir entre sur-restriction (collaborateurs bloqués) et sur-exposition (données sensibles accessibles).</p>`,
        system: `<p>Les autorisations déterminent qui peut co-éditer <span class="ref-fiche">→ coEditionTempsReel</span>, qui peut commenter <span class="ref-fiche">→ commentairesAnnotations</span> et qui peut accéder au Dev Mode pour inspecter les propriétés. Elles s'inscrivent dans la pratique de gestion des accès aux outils de l'équipe <span class="ref-fiche">→ Co04</span> et dans les considérations de sécurité des fichiers contenant des données de design sensibles <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le système de permissions Figma en couches :</p>
<p><strong>Les rôles au niveau du fichier :</strong> chaque collaborateur invité sur un fichier reçoit un rôle. <em>Owner :</em> créateur du fichier, contrôle toutes les permissions, peut transférer la propriété. <em>Editor :</em> peut modifier le fichier, gérer les composants, créer des pages, inviter d'autres collaborateurs. <em>Viewer :</em> peut voir le fichier, naviguer dans les frames, copier les valeurs de propriétés (couleurs, tailles, etc.), mais ne peut pas modifier. <em>Viewer with commenting :</em> peut voir et ajouter des commentaires — c'est le rôle recommandé pour les stakeholders et clients qui doivent donner du feedback sans risquer de modifier.</p>
<p><strong>Partager un fichier : les options de lien :</strong> dans le bouton "Share" (haut à droite), trois options de lien. <em>"Only people invited" :</em> seuls les utilisateurs explicitement invités peuvent accéder — le mode le plus sûr pour les fichiers confidentiels. <em>"Anyone with the link can view" :</em> toute personne avec le lien peut voir le fichier sans se connecter — pratique pour partager avec des stakeholders sans compte Figma, mais le fichier est accessible à quiconque obtient le lien. <em>"Anyone with the link can edit" :</em> à utiliser exclusivement pour des fichiers non confidentiels et des sessions de co-édition publiques — jamais pour des fichiers de production.</p>
<p><strong>Les organisations et équipes (plans professionnels) :</strong> les plans Figma Organisation et Enterprise ajoutent des couches de permission. Une <em>organisation</em> peut définir des politiques qui s'appliquent à tous les membres (ex. : les fichiers sont privés par défaut). Les <em>équipes</em> regroupent des membres avec accès partagé aux projets de l'équipe. Les permissions d'équipe peuvent être plus larges ou plus restreintes que les permissions de fichier individuel. Sur les plans gratuits et professionnels, les permissions sont gérées au niveau du fichier uniquement.</p>
<p><strong>Dev Mode (Figma Professional et supérieur) :</strong> Dev Mode est un mode de consultation du fichier conçu pour les développeurs — il affiche les propriétés CSS/Swift/Kotlin, les assets exportables et les annotations de handoff sans exposer les fonctionnalités d'édition. Les développeurs peuvent recevoir un accès Dev Mode (distinct du rôle Viewer standard) qui leur donne une vue plus détaillée que le Viewer mais sans capacité d'édition. Sur les plans payants, le nombre d'éditeurs est limité — utiliser les rôles Viewer pour les développeurs qui consultent seulement est une optimisation de coût courante.</p>
<p><strong>Subtilités des permissions :</strong></p>
<p><em>Un Editor peut inviter d'autres personnes</em> — à moins que cette capacité soit désactivée par un Owner ou un admin d'organisation. Vérifier ce réglage avant de partager un fichier confidentiel avec un Editor externe.</p>
<p><em>Les commentaires peuvent être désactivés</em> pour un lien de partage spécifique, indépendamment du rôle du destinataire. Utile quand le fichier est partagé en lecture seule pour référence, sans solliciter de feedback.</p>
<p><em>La copie vers d'autres projets</em> peut être restreinte : "Prevent editors from publishing, copying, sharing outside the team". Ce réglage protège les fichiers de design system contre une copie non autorisée vers d'autres organisations.</p>`,
        },
        senior: `<p>Un designer expérimenté établit une politique de permissions par type de collaborateur avant de commencer un projet, pas au moment de partager. Sa règle : les designers internes → Editor ; les développeurs internes → Viewer ou Dev Mode access ; les clients et stakeholders → Viewer with commenting via lien "Anyone with link can view" pour les fichiers non confidentiels, ou "Only people invited" pour les maquettes confidentielles. Il ne donne jamais d'accès Editor à un externe sans l'avoir documenté et sans avoir verrouillé les zones critiques du fichier. Il sait aussi que les permissions Figma ne remplacent pas une politique de sécurité : un Viewer peut toujours faire une capture d'écran.</p>`,
        errors: `<p><strong>Pattern 1 — Lien Editor partagé par défaut :</strong> copier le lien du fichier depuis la barre d'adresse du navigateur et l'envoyer à un client. Ce lien donne par défaut le niveau de permission configuré dans les réglages du fichier — souvent Editor. Le client modifie involontairement des éléments, croit "aider" en repositionnant des frames, et casse la structure. Toujours passer par "Share" → configurer les permissions → générer un lien ciblé.</p>
<p><strong>Pattern 2 — Même fichier pour exploration et production :</strong> travailler sur le même fichier Figma pour les expérimentations et les maquettes finales, avec les mêmes permissions. Un développeur avec accès Viewer voit les explorations abandonnées, les notes internes et les versions rejetées. Séparer les fichiers ou les pages selon leur confidentialité, et gérer les permissions par fichier.</p>
<p><strong>Pattern 3 — Dev Mode ignoré sur les plans payants :</strong> donner à tous les développeurs des droits Editor "pour qu'ils puissent inspecter le fichier plus facilement". Sur les plans payants, chaque siège Editor a un coût. Dev Mode donne aux développeurs toutes les informations d'inspection (CSS, assets, annotations) sans siège Editor. Sur une équipe de 10 développeurs, la différence de coût est significative.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les plans Figma et leurs limitations de sièges Editors, les fonctionnalités Dev Mode (en évolution active), les politiques d'organisation sur les plans Enterprise. <strong>Ce qui ne change pas :</strong> le principe de moindre privilège s'applique à Figma comme à tout outil — donner le niveau d'accès minimum nécessaire à la tâche ; les stakeholders n'ont jamais besoin de droits Editor pour donner du feedback ; les permissions de lien et les rôles d'invitation sont deux systèmes distincts qui s'additionnent.</p>`,
        practice: {
          exercices: [
            {
              titre: "Configurer les permissions d'un fichier pour une revue client",
              etapes: [
                "Ouvre le panneau 'Share' d'un fichier Figma (bouton en haut à droite). Observe les options disponibles : le champ d'invitation, le lien de partage et ses options.",
                "Configure le fichier en 'Only people invited' (le plus restrictif). Génère un lien de partage et teste-le dans un onglet incognito — il ne doit pas être accessible.",
                "Change la configuration en 'Anyone with link can view'. Génère un nouveau lien et teste-le en incognito — le fichier doit être visible en lecture seule.",
                "Invite une adresse email fictive avec le rôle 'Viewer (can comment)'. Vérifie dans la liste des invités que le rôle affiché est correct. Révoquer l'invitation.",
              ],
              output:
                "Documentation des trois modes de partage testés avec leur comportement observé, liste des rôles disponibles et règle de décision : quel rôle pour quel type de collaborateur dans votre contexte.",
              critere:
                "La règle de décision doit couvrir explicitement : designers internes, développeurs internes, stakeholders internes, clients externes, prestataires externes. Chaque cas doit avoir un rôle justifié.",
            },
          ],
          piege:
            "Croire que 'Anyone with link can view' est sûr parce que le destinataire ne peut pas modifier. Le lien est permanent et partageable — toute personne qui le reçoit (en forward d'email, en screenshot du message) peut accéder au fichier. Pour les maquettes contenant des données business sensibles (chiffres, noms de clients, roadmaps internes), utiliser 'Only people invited' systématiquement.",
        },
        verification: [
          "Quelle est la différence entre le rôle 'Viewer' et le rôle 'Viewer with commenting' dans Figma, et dans quelle situation préfères-tu l'un ou l'autre pour un client qui doit valider une maquette ?",
          "Un développeur de l'équipe a besoin de consulter les maquettes Figma pour implémenter les composants. Sur un plan payant, quelles sont les deux options de rôle possibles, et quelle est la différence en termes d'accès et de coût ?",
          "Vous partagez un fichier Figma contenant des maquettes pour un nouveau produit non annoncé. Vous utilisez 'Anyone with link can view'. Quel risque cela crée-t-il, et quelle configuration est plus appropriée ?",
        ],
      },
    },

    commentairesAnnotations: {
      id: "commentairesAnnotations",
      label: "Commentaires, annotations et feedback",
      icon: "💬",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les retours sur une maquette circulaient par email avec des captures d'écran annotées ("la zone en rouge à gauche"), par des réunions de revue où les retours n'étaient pas documentés, ou par des fichiers Word de feedback que personne ne relisait deux semaines plus tard. Les commentaires Figma ancrés sur le canvas existent pour localiser le feedback à l'endroit exact où le problème se trouve, le rendre asynchrone sans perte de contexte, et tracer son cycle de vie de "ouvert" à "résolu".</p>`,
        system: `<p>Les commentaires sur le canvas s'appuient sur les permissions de partage <span class="ref-fiche">→ autorisationsRoles</span> — seuls les collaborateurs autorisés peuvent commenter. Ils complètent les commentaires sur les prototypes décrits dans <span class="ref-fiche">→ F29</span>, qui fonctionnent dans le mode présentation. Ils alimentent l'itération design-dev <span class="ref-fiche">→ D04</span> et le processus de feedback qui précède le handoff.</p>`,
        choice: {
          kind: "free",
          html: `<p>Utiliser les commentaires et annotations dans Figma :</p>
<p><strong>Ajouter un commentaire sur le canvas :</strong> appuyer sur la touche <kbd>C</kbd> ou cliquer sur l'icône de bulle dans la toolbar pour entrer en mode commentaire. Cliquer sur n'importe quelle zone du canvas place un pin numéroté. Un champ de saisie apparaît pour rédiger le commentaire. Le commentaire est ancré à cette position géographique dans le canvas — si on déplace la frame, le commentaire ne suit pas automatiquement. Les commentaires peuvent mentionner des collaborateurs avec @prénom pour les notifier.</p>
<p><strong>Commenter sur un élément spécifique :</strong> en mode commentaire, cliquer directement sur un calque ou une frame ancre le commentaire à cet élément. Dans le panneau de droite, une section "Comments" apparaît listant les commentaires liés à l'élément sélectionné. Cette association élément-commentaire est plus robuste que le positionnement géographique : si la frame est déplacée, le commentaire suit.</p>
<p><strong>Cycle de vie d'un commentaire :</strong> un commentaire peut être en état "ouvert" (non traité) ou "résolu" (traité). Cliquer sur le bouton ✓ d'un commentaire le marque comme résolu — il disparaît du canvas en mode normal mais reste accessible depuis le panneau de commentaires filtré "Resolved". Les commentaires résolus ne sont pas supprimés — ils constituent une trace de l'historique des décisions. Réouvrir un commentaire résolu est possible si la correction n'était pas satisfaisante.</p>
<p><strong>Threads et réponses :</strong> les commentaires supportent des réponses en thread — cliquer sur un commentaire pour l'ouvrir et y répondre. Les threads permettent de centraliser la discussion autour d'un point spécifique sans créer plusieurs pins pour le même sujet. Marquer un thread comme résolu clôt l'ensemble de la discussion.</p>
<p><strong>Annotations de design (distinctes des commentaires) :</strong> les annotations sont des éléments visuels créés dans le fichier Figma lui-même — flèches, notes textuelles, frames de documentation — et non dans le système de commentaires. Elles font partie du design et sont visibles par tous dans le fichier. Utilisation typique : annoter les comportements d'interaction, les règles de contenu dynamique, les spécifications d'accessibilité (avec le A11y Annotation Kit). Contrairement aux commentaires, les annotations sont persistantes, non liées à un utilisateur spécifique, et ne peuvent pas être "résolues" — elles font partie du livrable.</p>
<p><strong>Notifications de commentaire :</strong> Figma envoie des notifications email quand un collaborateur est mentionné (@), quand quelqu'un répond à un thread dans lequel on a participé, ou quand un commentaire est résolu sur un fichier qu'on suit. Les notifications peuvent être configurées par fichier et dans les préférences du compte.</p>`,
        },
        senior: `<p>Un designer expérimenté établit une convention de commentaires avec son équipe avant de commencer une phase de feedback : quel format, quel niveau de détail attendu, dans quel délai les commentaires seront traités, et qui est responsable de marquer les commentaires comme résolus. Sans cette convention, les commentaires s'accumulent sans propriétaire, les discussions restent ouvertes sans décision, et personne ne sait si une question posée il y a deux semaines a été traitée. Il utilise les mentions @collaborateur pour assigner explicitement chaque commentaire à la personne qui doit agir — pas pour informer, mais pour créer une responsabilité.</p>`,
        errors: `<p><strong>Pattern 1 — Commentaires sans priorité ni type :</strong> mélanger dans les commentaires des bugs critiques, des questions ouvertes, des suggestions de détail et des validations de direction — sans distinction. Le designer ne sait pas quoi traiter en premier. Établir une convention de préfixes : "[BLOQUANT]", "[QUESTION]", "[SUGGESTION]", "[VALIDÉ]" — ou utiliser les conventions Conventional Comments adaptées au design review.</p>
<p><strong>Pattern 2 — Commentaires jamais résolus :</strong> accumuler des dizaines de commentaires ouverts sur un fichier, dont certains datent de semaines. Le canvas devient illisible avec des pins partout. Les nouveaux commentaires se perdent dans la masse. Planifier une session de tri des commentaires à chaque fin d'itération : chaque commentaire ouvert doit être résolu (correction faite), converti en tâche dans le backlog, ou explicitement rejeté avec une raison.</p>
<p><strong>Pattern 3 — Annotations confondues avec des commentaires :</strong> utiliser le système de commentaires pour les spécifications techniques et les règles de comportement (textes alternatifs, règles de truncation, animations) plutôt que des annotations dans le fichier. Les commentaires sont éphémères — ils peuvent être résolus, ils ne suivent pas les déplacements de frames, et ils ne sont pas visibles lors d'un handoff en Dev Mode. Les spécifications durables appartiennent aux annotations dans le fichier, pas aux commentaires.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les fonctionnalités de commentaire Figma (FigJam offre un système de collaboration plus riche pour les workshops, Figma Slides pour les présentations), les outils alternatifs (Loom pour feedback vidéo, Notion pour documentation). <strong>Ce qui ne change pas :</strong> un feedback sans localisation précise génère toujours de l'ambiguïté ; un commentaire sans propriétaire ne sera pas traité ; les spécifications durables ne peuvent pas vivre dans le système de commentaires — elles doivent être dans le fichier ou dans la documentation liée.</p>`,
        practice: {
          exercices: [
            {
              titre: "Établir un workflow de feedback sur une maquette",
              etapes: [
                "Ouvre un fichier Figma en mode commentaire (touche C). Ajoute 3 commentaires sur une maquette existante : un en cliquant sur une zone neutre du canvas, un en cliquant directement sur un composant, un avec une mention @collaborateur.",
                "Observe la différence de comportement entre les deux premiers commentaires quand tu déplaces la frame. Lequel suit la frame ? Lequel reste à sa position géographique ?",
                "Réponds à un commentaire en thread. Marque le thread comme résolu. Filtre les commentaires pour voir 'Resolved only' et vérifie que le commentaire résolu est toujours accessible.",
                "Rédige sur papier ou dans un doc partagé une convention de commentaires pour ton équipe : préfixes à utiliser, délai de traitement, qui résout quoi, convention pour les annotations vs commentaires.",
              ],
              output:
                "3 commentaires créés avec comportements différents documentés, thread résolu et retrouvé dans l'historique, convention de commentaires rédigée et applicable à l'équipe.",
              critere:
                "La convention doit répondre à : qui peut commenter, avec quel préfixe, dans quel délai, qui marque comme résolu, comment distinguer commentaire de spécification. Elle doit tenir en moins de 10 lignes pour être effectivement appliquée.",
            },
          ],
          piege:
            "Traiter les commentaires Figma comme un canal de communication principal avec les stakeholders. Les commentaires sont utiles pour des retours précis et localisés — mais une discussion structurelle sur la direction du produit, un désaccord sur une décision majeure, ou un feedback émotionnellement sensible nécessitent un autre canal (appel, réunion). Figma n'est pas Slack, et une bulle de commentaire n'a pas la richesse d'une conversation.",
        },
        verification: [
          "Quelle est la différence pratique entre ancrer un commentaire sur une zone du canvas et l'ancrer directement sur un élément Figma, et dans quelle situation chaque méthode est-elle plus fiable ?",
          "Votre fichier Figma contient 45 commentaires ouverts de la phase de design précédente. Comment organisez-vous une session de tri et quel critère utilisez-vous pour décider entre 'résoudre', 'créer une tâche' et 'rejeter' ?",
          "Un développeur vous demande d'ajouter dans Figma les règles de comportement pour les textes tronqués (nombre de lignes max, comportement au survol). Devez-vous utiliser les commentaires ou les annotations, et pourquoi ?",
        ],
      },
    },

    historiqueVersions: {
      id: "historiqueVersions",
      label: "Historique de versions et révisions",
      icon: "🕐",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Un designer passe trois heures sur une nouvelle version d'un écran, la montre à l'équipe, et tout le monde préfère la version précédente. Sans historique de versions, il faut reconstituer l'ancienne version à la main, ou constater qu'elle a été perdue. Figma enregistre automatiquement l'état du fichier à intervalles réguliers — mais sans versions nommées, retrouver "la version de mercredi avant la réunion client" dans une liste de 200 entrées automatiques prend plus de temps que de recréer le travail.</p>`,
        system: `<p>L'historique de versions sécurise la co-édition <span class="ref-fiche">→ coEditionTempsReel</span> en permettant de revenir à un état avant un conflit destructif. Il complète les commentaires <span class="ref-fiche">→ commentairesAnnotations</span> en donnant un contexte temporel aux retours : "le commentaire de jeudi correspond à la version avant l'itération du vendredi". Il s'inscrit dans la pratique plus large de gestion des versions du travail, analogue au Git workflow pour le code <span class="ref-fiche">→ T05</span> — avec des différences fondamentales.</p>`,
        choice: {
          kind: "free",
          html: `<p>Gérer l'historique de versions dans Figma :</p>
<p><strong>Accéder à l'historique :</strong> menu Figma (icône en haut à gauche) → "Show version history", ou Cmd/Ctrl+Alt+S. Le panneau de droite affiche une liste chronologique des versions avec horodatage et, le cas échéant, un nom et un auteur. Cliquer sur une version l'affiche dans le canvas en lecture seule — la version actuelle reste intacte. Un bandeau orange en haut indique qu'on visualise une ancienne version.</p>
<p><strong>Versions automatiques vs versions nommées :</strong> Figma enregistre automatiquement une version toutes les 30 minutes environ (sur les plans payants, les enregistrements sont plus fréquents et l'historique est illimité ; sur le plan gratuit, l'historique est limité à 30 jours). Ces versions automatiques portent un horodatage mais pas de nom. Les <em>versions nommées</em> sont créées manuellement via Cmd/Ctrl+Alt+S → "Name this version". Elles persistent indéfiniment et sont identifiables au premier regard. Convention recommandée : nommer les versions aux jalons significatifs — "V1 — Avant réunion client 12/03", "V2 — Post-feedback équipe produit", "Livré au dev — Sprint 4".</p>
<p><strong>Restaurer une version :</strong> dans l'historique, cliquer sur une version → bouton "Restore this version". La version restaurée devient la version actuelle — l'état présent du fichier est écrasé. Attention : la restauration est irréversible directement (mais la version précédente reste dans l'historique juste après la version restaurée). Avant de restaurer, créer une version nommée de l'état actuel pour ne pas perdre le travail récent.</p>
<p><strong>Copier depuis l'historique :</strong> une alternative à la restauration complète. En visualisant une ancienne version, on peut sélectionner des éléments et les copier (Cmd/Ctrl+C), puis quitter l'historique et coller dans la version actuelle. Cette approche permet de récupérer un élément spécifique d'une ancienne version sans écraser l'ensemble du fichier.</p>
<p><strong>Branches (Figma Professional et Organisation) :</strong> sur les plans payants, Figma permet de créer des branches d'un fichier — une copie indépendante sur laquelle travailler sans affecter le fichier principal. Les branches fonctionnent comme les branches Git : on travaille en parallèle, puis on merge les changements dans le fichier principal. Utile pour des explorations risquées ou des variations alternatives sans polluer le fichier de production. La fusion de branches n'est pas automatique — Figma affiche un diff visuel et le merger doit sélectionner manuellement les changements à intégrer.</p>`,
        },
        senior: `<p>Un designer expérimenté crée systématiquement une version nommée avant chaque présentation, avant chaque session de co-édition importante, et avant toute modification structurelle du design system. Sa règle : "si je ne pourrais pas retrouver cet état en moins de 10 secondes dans l'historique, je dois le nommer". Il utilise aussi les branches pour les explorations qui risquent de casser la structure existante — tester un changement radical de navigation, explorer une nouvelle direction visuelle — plutôt que de travailler directement sur le fichier principal.</p>`,
        errors: `<p><strong>Pattern 1 — Aucune version nommée sur un projet long :</strong> travailler plusieurs semaines sur un projet sans jamais nommer une version. L'historique contient 150 entrées automatiques horodatées. Retrouver "la version avant les changements du client de la semaine dernière" nécessite de cliquer sur des dizaines d'entrées pour identifier le bon état. Les versions nommées coûtent 5 secondes — ne pas en créer coûte des heures en recherche.</p>
<p><strong>Pattern 2 — Restauration sans sauvegarde préalable :</strong> restaurer une version ancienne sans avoir d'abord créé une version nommée de l'état actuel. Si la version restaurée n'est pas la bonne, l'état actuel a été perdu et ne figure dans l'historique que comme une entrée automatique parmi d'autres. Toujours créer une version nommée "Avant restauration" avant de restaurer.</p>
<p><strong>Pattern 3 — Branches utilisées comme sauvegarde :</strong> créer une branche "Backup" avant chaque modification importante plutôt que d'utiliser l'historique de versions. Les branches sont conçues pour des variations alternatives parallèles — elles ont un coût de maintenance (elles doivent être fusionnées ou supprimées) et polluent la liste des fichiers si elles s'accumulent. L'historique de versions est l'outil de sauvegarde natif — les branches sont pour la parallélisation du travail.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la fréquence des enregistrements automatiques selon le plan Figma, les fonctionnalités de branches (en amélioration constante), les alternatives de versioning (Abstract pour Sketch, Lottie pour animations). <strong>Ce qui ne change pas :</strong> un jalon significatif mérite toujours une version nommée avant d'être modifié ; restaurer sans sauvegarder l'état actuel est toujours risqué ; l'historique automatique sans versions nommées devient inutilisable au-delà d'une semaine de travail intensif.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer et naviguer dans un historique de versions significatif",
              etapes: [
                "Ouvre un fichier Figma. Crée une version nommée (Cmd/Ctrl+Alt+S) avec le nom 'Avant exercice — [date]'.",
                "Fais 3 modifications visibles sur une frame (couleur, texte, position d'un élément). Crée une deuxième version nommée 'Après modifications'.",
                "Ouvre l'historique (menu Figma → Show version history). Navigue jusqu'à 'Avant exercice'. Sélectionne un élément dans cette version et copie-le (Cmd/Ctrl+C).",
                "Quitte l'historique (bouton 'Return to current version'). Colle l'élément copié (Cmd/Ctrl+V). Compare l'état actuel avec la version 'Avant exercice' sans avoir restauré l'ensemble du fichier.",
              ],
              output:
                "Fichier avec deux versions nommées, compréhension de la navigation dans l'historique et de la copie partielle depuis une version ancienne — sans perte de l'état actuel.",
              critere:
                "L'exercice réussit si tu peux récupérer un élément spécifique d'une version antérieure sans avoir écrasé l'état actuel du fichier. La version 'Avant exercice' doit être retrouvable en moins de 10 secondes dans la liste.",
            },
          ],
          piege:
            "Confondre l'historique de versions Figma avec Git. Dans Git, chaque commit est intentionnel, nommé, et l'historique est un graphe de décisions. Dans Figma, l'historique automatique est une liste d'états enregistrés sans intention — sans versions nommées, c'est une liste de snapshots anonymes. Les deux systèmes servent des objectifs similaires mais avec des philosophies différentes : Git pour la traçabilité du code, Figma pour la récupération du design.",
        },
        verification: [
          "Quelle est la différence entre une version automatique et une version nommée dans Figma, et à quel moment précis dans le workflow de design faut-il créer une version nommée ?",
          "Vous voulez récupérer uniquement le composant Hero Section tel qu'il était il y a 3 jours, sans remettre le reste du fichier dans son état d'il y a 3 jours. Comment procédez-vous dans Figma ?",
          "En quoi les branches Figma ressemblent-elles aux branches Git, et quelle est la différence fondamentale dans la façon dont la fusion est gérée dans chaque outil ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "coEditionTempsReel", x: 10, y: 100, w: 205, h: 65 },
        { id: "autorisationsRoles", x: 285, y: 40, w: 195, h: 65 },
        { id: "commentairesAnnotations", x: 285, y: 165, w: 220, h: 65 },
        { id: "historiqueVersions", x: 590, y: 100, w: 195, h: 65 },
      ],
      edges: [
        { x1: 215, y1: 120, x2: 283, y2: 72, label: "contrôle" },
        { x1: 215, y1: 148, x2: 283, y2: 197, label: "structure" },
        { x1: 480, y1: 72, x2: 588, y2: 120, label: "sécurise" },
        { x1: 505, y1: 197, x2: 588, y2: 148, label: "contextualise" },
      ],
    },
  },
});
