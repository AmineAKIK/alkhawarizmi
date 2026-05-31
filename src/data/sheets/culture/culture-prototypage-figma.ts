import { cultureSheet } from "./culture-common";

export const culturePrototypageFigma = cultureSheet({
  id: "culture-F29",
  number: 29,
  title: "Prototypage dans Figma",
  subtitle: "Connexions, interactions, transitions et partage — transformer des maquettes statiques en prototypes navigables",
  badge: "Fiche F29",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description: "Une maquette statique montre l'apparence d'une interface — un prototype montre comment elle se comporte. Figma permet de relier des frames, de configurer des interactions (clic, survol, glissement), de choisir des transitions visuelles, et de partager le résultat directement avec les parties prenantes sans export. Cette fiche couvre les mécanismes concrets de prototypage dans Figma : connexions et flows, triggers et animations, overlays et scroll, puis partage et collecte de retours.",
  accent: "modele",

  nodes: {
    connexionsFlows: {
      id: "connexionsFlows",
      label: "Connexions et flows de prototype",
      icon: "⇢",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Quand une équipe présente des maquettes statiques à des parties prenantes, elle doit expliquer oralement ce qui se passe au clic, ce que montre l'état suivant, comment on revient en arrière. La moitié des malentendus naissent là : ce qui paraît évident pour le designer reste opaque pour le stakeholder ou le développeur. Un prototype connecté élimine ce commentaire oral — le parcours est navigable, les décisions sont visibles dans l'interaction elle-même.</p>`,
        system: `<p>Les connexions de prototype opèrent sur les frames préparées dans Figma <span class="ref-fiche">→ D04</span>. Elles matérialisent les flux utilisateur conçus en <span class="ref-fiche">→ D01</span> et précèdent les tests d'utilisabilité <span class="ref-fiche">→ D01</span>. Elles s'appuient sur les composants et leurs états <span class="ref-fiche">→ D03</span> — chaque état d'un composant peut être une destination de connexion. Le prototype ainsi construit alimente directement le handoff <span class="ref-fiche">→ D04</span> en documentant les intentions de navigation.</p>`,
        choice: {
          kind: "free",
          html: `<p>Créer et organiser des connexions dans Figma :</p>
<p><strong>Activer le mode Prototype :</strong> dans Figma, l'onglet "Prototype" dans le panneau de droite active le mode de connexion. En sélectionnant un élément, un point bleu apparaît sur son bord droit — tirer ce point vers une autre frame crée une connexion. La flèche bleue affiche la destination et le trigger configuré.</p>
<p><strong>Anatomy d'une connexion :</strong> chaque connexion a trois paramètres. Le <em>trigger</em> : l'événement qui déclenche la transition (On Click, On Hover, On Press, After Delay, On Drag, Key/Gamepad). La <em>destination</em> : la frame cible, un overlay, ou "Back" pour revenir à la frame précédente. L'<em>action</em> : Navigate To (navigation directe), Open Overlay (modal/popup par-dessus), Swap Overlay, Close Overlay, Scroll To (position dans la même frame), Back.</p>
<p><strong>Flows de prototype :</strong> un flow est un point d'entrée dans le prototype — la frame depuis laquelle commence un parcours. Figma permet plusieurs flows dans le même fichier : "Onboarding", "Checkout", "Settings". Chaque flow est indépendant et peut être partagé séparément. Pour créer un flow : sélectionner une frame → onglet Prototype → "+" à côté de "Flows" → nommer le flow. Cette organisation est cruciale pour les gros fichiers avec plusieurs parcours.</p>
<p><strong>Starting frame vs frame ordinaire :</strong> seule la starting frame d'un flow déclenche le prototype à cette frame. Les autres frames participent au flux mais ne sont pas accessibles directement comme point d'entrée depuis le lien de partage, sauf si elles ont leur propre flow.</p>
<p><strong>Navigation Back :</strong> Figma maintient un historique de navigation dans le prototype. L'action "Back" revient à la frame précédente dans l'historique, comme le bouton retour d'un navigateur. Indispensable pour les boutons de retour dans les maquettes mobiles — ne pas connecter manuellement tous les retours vers la frame précédente : utiliser l'action Back.</p>`,
        },
        senior: `<p>Un designer expérimenté organise ses flows avant de créer les connexions — pas l'inverse. Il nomme explicitement chaque flow selon le parcours utilisateur (pas "Flow 1"), et crée une frame de départ par parcours principal même si ce n'est pas un écran réel de l'app (une frame "DÉBUT ONBOARDING" en dehors du canvas de travail). Cela permet de partager un lien ciblé à chaque équipe — l'équipe produit teste le checkout, le designer QA teste l'onboarding — sans qu'ils arrivent sur un écran intermédiaire sans contexte.</p>`,
        errors: `<p><strong>Pattern 1 — Un seul flow pour tout le prototype :</strong> relier toutes les frames de toutes les fonctionnalités dans un seul parcours linéaire. Quand le stakeholder clique "retour" depuis l'écran de confirmation de commande, il se retrouve sur l'écran d'onboarding. Un flow par parcours cohérent évite ce mélange.</p>
<p><strong>Pattern 2 — Connexions vers des frames de travail :</strong> connecter des éléments vers des frames encore en cours de design, avec des commentaires visibles ou des placeholders. Le prototype partage le contenu du fichier en temps réel — une frame inachevée dans le flux devient visible au stakeholder. Séparer les frames "En cours" des frames "Prêtes pour prototype" avec des pages ou des sections distinctes.</p>
<p><strong>Pattern 3 — Happy path uniquement :</strong> connecter seulement le parcours sans erreur et sans retour arrière. Le prototype simule alors une application parfaite qui n'existe pas. Un développeur ou un testeur qui clique "Annuler" ou saisit un email invalide se retrouve bloqué — ce qui annule la valeur du test. Ajouter au minimum les états d'erreur des formulaires et les chemins de retour principaux.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> l'interface de Figma (onglet Prototype, options de connexion), les types de triggers disponibles, les formats d'export. <strong>Ce qui ne change pas :</strong> un prototype utile doit avoir des flows nommés par parcours, des connexions qui couvrent les cas d'échec critiques, et une destination Back pour chaque action de retour — quelle que soit l'évolution des fonctionnalités de l'outil.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer un flow de prototype avec retours et erreurs",
              etapes: [
                "Prends 4 frames : écran de connexion, dashboard, écran de profil, et état d'erreur 'email invalide'.",
                "Dans l'onglet Prototype, crée un flow nommé 'Connexion' depuis l'écran de connexion. Connecte le bouton 'Se connecter' vers le dashboard avec le trigger 'On Click'.",
                "Connecte le lien 'Mon profil' dans le dashboard vers l'écran de profil. Ajoute une connexion 'Back' sur le bouton retour du profil.",
                "Connecte le formulaire de connexion vers l'état d'erreur quand l'email est invalide. Ajoute une connexion 'Back' ou 'Navigate To' vers l'écran de connexion depuis l'état d'erreur.",
                "Lance le prototype (Ctrl/Cmd+Alt+Entrée) et teste le parcours complet, y compris le chemin d'erreur.",
              ],
              output: "Flow 'Connexion' avec happy path, chemin d'erreur et navigation retour fonctionnels — prototype testable sans commentaire oral.",
              critere: "Le prototype doit être navigable sans explication : un observateur externe doit pouvoir atteindre le dashboard ET déclencher l'état d'erreur, et revenir à l'écran de connexion depuis chaque état.",
            },
          ],
          piege: "Créer les connexions au fur et à mesure de la conception des frames, sans plan de flows préalable. Résultat : des connexions croisées difficiles à maintenir, des frames de travail accessibles par accident, et un prototype qui mélange plusieurs parcours sans point d'entrée clair.",
        },
        verification: [
          "Quelle est la différence entre un 'flow' et une 'connexion' dans Figma, et pourquoi créer plusieurs flows dans un même fichier plutôt qu'un seul parcours connecté ?",
          "Un prototype connecte uniquement le happy path. Un testeur clique 'Annuler' sur la modal de confirmation de suppression et se retrouve bloqué. Quelle connexion manque et quelle action Figma utilises-tu pour la résoudre sans créer une nouvelle frame ?",
          "Pourquoi utiliser l'action 'Back' pour les boutons de retour plutôt que de les connecter manuellement vers la frame précédente, et dans quel cas 'Back' peut-il produire un comportement inattendu ?",
        ],
      },
    },

    interactionsTransitions: {
      id: "interactionsTransitions",
      label: "Interactions et transitions",
      icon: "✦",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Deux prototypes peuvent connecter les mêmes frames et pourtant communiquer des intentions radicalement différentes selon les transitions choisies. Un Instant Animate donne l'impression d'un bug ; une transition de 600ms donne l'impression que l'app est lente ; une Smart Animate mal configurée produit un saut visuel qui brouille la relation spatiale entre les écrans. La transition n'est pas de la décoration — elle est la documentation visuelle du comportement attendu dans le code.</p>`,
        system: `<p>Les interactions et transitions opèrent sur les connexions de flows établies <span class="ref-fiche">→ connexionsFlows</span>. Elles communiquent au développeur les intentions d'animation qui seront implémentées en CSS ou en JavaScript <span class="ref-fiche">→ T08</span>. Smart Animate s'appuie directement sur les composants Auto Layout <span class="ref-fiche">→ F28</span> pour interpoler les états — un composant bien structuré produit des animations Smart Animate cohérentes.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les types de transitions et d'animations dans Figma :</p>
<p><strong>Les transitions de navigation :</strong></p>
<p><em>Instant :</em> pas de transition, changement immédiat de frame. Utile pour les prototypes de test où la transition n'est pas l'objet du test, ou pour les changements d'état qui doivent être imperceptibles.</p>
<p><em>Dissolve :</em> fondu enchaîné entre les deux frames. Correspond à un <code>opacity</code> CSS. Convient pour les changements de contexte sans relation spatiale claire (changer d'onglet dans une navigation principale).</p>
<p><em>Smart Animate :</em> Figma détecte les éléments qui ont le même nom dans les deux frames et les anime automatiquement — position, taille, couleur, opacité. C'est la transition la plus puissante pour simuler des comportements réels. Prérequis : les éléments doivent avoir exactement le même nom dans les deux frames (ou dans les deux états d'un composant), et la structure d'Auto Layout doit être cohérente entre les frames.</p>
<p><em>Move In / Move Out / Push / Slide In / Slide Out :</em> la nouvelle frame entre depuis un bord (haut, bas, gauche, droite). "Move In" ajoute par-dessus la frame actuelle, "Push" la pousse hors de l'écran. Correspond aux transitions de navigation mobile (slide depuis la droite pour naviguer "en avant", depuis la gauche pour "en arrière"). Communique la relation spatiale : quand on navigue vers une sous-page, l'écran glisse depuis la droite.</p>
<p><strong>L'easing :</strong> contrôle la courbe d'accélération de l'animation. Figma propose : Linear (vitesse constante — mécanique), Ease In (commence lentement — bon pour les éléments qui quittent l'écran), Ease Out (finit lentement — bon pour les éléments qui arrivent à l'écran), Ease In and Out (accélère puis décélère — naturel pour les déplacements d'éléments), Spring (rebond — attention à l'excès). La convention dominante dans les interfaces modernes : Ease Out pour les entrées (l'élément décélère en arrivant), Ease In pour les sorties (l'élément accélère en partant).</p>
<p><strong>La durée :</strong> les animations d'interface se situent entre 100ms (micro-interactions : confirmation de clic) et 400ms (transitions de page complète). Au-delà de 400ms, la transition paraît lente. Entre 200ms et 300ms se situe la plage la plus polyvalente. La règle : les transitions sur des surfaces larges peuvent être légèrement plus longues (300ms) que les transitions sur des petits éléments (150ms).</p>
<p><strong>Les overlays :</strong> Figma peut ouvrir une frame par-dessus la frame actuelle (modal, drawer, tooltip, bottom sheet). L'overlay configure : la position (centrée, ancrée à un élément, hors écran), l'arrière-plan (assombri, transparent), la fermeture au clic extérieur (oui/non). Un overlay qui se ferme au clic extérieur simule le comportement standard des modales — documenter explicitement quand ce n'est pas le cas.</p>`,
        },
        senior: `<p>Un designer expérimenté utilise Smart Animate pour communiquer précisément les intentions d'animation au développeur — pas pour rendre le prototype "impressionnant". Quand Smart Animate produit un effet fluide entre deux états, il indique au développeur que cet effet doit être implémenté. Il documente en annotation les courbes d'easing et les durées souhaitées (Ease Out 250ms, Spring k=400) pour que le développeur n'ait pas à les deviner. Il redoute les prototypes sur-animés qui promettent au client des effets que l'équipe technique n'a pas le temps ou les moyens d'implémenter.</p>`,
        errors: `<p><strong>Pattern 1 — Smart Animate qui saute :</strong> deux frames avec des éléments de même nom mais de structure Auto Layout différente produisent un saut au lieu d'une animation fluide. La cause : Smart Animate interpole les propriétés mais ne peut pas reconstruire une structure radicalement différente. Solution : s'assurer que les frames de départ et d'arrivée partagent la même hiérarchie d'imbrication pour les éléments animés.</p>
<p><strong>Pattern 2 — Durée et easing par défaut pour tout :</strong> laisser toutes les transitions à "Ease Out 300ms" sans réfléchir à l'intention. Un menu qui s'ouvre depuis le bas d'un écran mobile ne devrait pas avoir la même durée qu'un changement d'onglet. La durée et l'easing doivent refléter l'ampleur du déplacement et la nature de l'interaction.</p>
<p><strong>Pattern 3 — Prototype trop fidèle aux animations :</strong> passer plus de temps sur les transitions du prototype que sur les interactions et le contenu. Un prototype sur-animé déplace l'attention des testeurs et des stakeholders vers les effets visuels plutôt que vers les décisions de UX. Dans un test d'utilisabilité, utiliser Instant ou Dissolve simple pour ne pas biaiser les retours.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les options de transition de Figma (Smart Animate est apparu en 2019, les springs récemment), les capacités des appareils cibles, les frameworks d'animation. <strong>Ce qui ne change pas :</strong> Ease Out pour les entrées et Ease In pour les sorties correspond au mouvement naturel perçu par l'œil humain — ce principe précède les outils ; la durée d'une transition doit être proportionnelle à l'amplitude du changement visuel ; une transition dans le prototype est une promesse implicite d'implémentation.</p>`,
        practice: {
          exercices: [
            {
              titre: "Comparer les transitions sur un même parcours",
              etapes: [
                "Crée deux frames identiques représentant deux états d'une card : état 'fermé' (titre visible, contenu masqué) et état 'ouvert' (contenu visible). Nomme les éléments identiquement dans les deux frames.",
                "Crée trois connexions depuis un bouton 'Voir détails' vers la frame ouverte : une avec Instant, une avec Dissolve 300ms Ease Out, une avec Smart Animate 300ms Ease Out.",
                "Lance le prototype et compare les trois comportements. Pour chaque transition, note ce qu'elle communique sur la relation spatiale entre les deux états.",
                "Ajoute un overlay 'modale de confirmation' : frame centrée, fond sombre, fermeture au clic extérieur activée. Configure la transition d'entrée en Move In depuis le bas, 250ms Ease Out.",
              ],
              output: "Prototype avec trois variantes de transition comparées sur la même interaction, et une modale overlay fonctionnelle — avec note sur ce que chaque transition communique.",
              critere: "Chaque transition doit avoir une justification explicite : pourquoi ce type, cette durée, cet easing — et cette justification doit survivre à la question 'qu'est-ce que ça dit au développeur sur l'animation attendue dans le code ?'",
            },
          ],
          piege: "Choisir les transitions qui rendent le prototype le plus impressionnant plutôt que celles qui documentent le mieux l'intention. Un prototype convaincant en démo peut promettre une expérience que le budget de développement ne permet pas de livrer.",
        },
        verification: [
          "Quelle est la condition technique pour que Smart Animate fonctionne correctement entre deux frames, et que se passe-t-il si cette condition n'est pas remplie ?",
          "Expliquez la différence entre 'Move In' et 'Push' comme type de transition, et donnez un exemple de parcours utilisateur où chaque option est la plus appropriée.",
          "Pourquoi utiliser 'Instant' comme transition dans un prototype de test d'utilisabilité est souvent préférable à Smart Animate, même si Smart Animate est plus réaliste ?",
        ],
      },
    },

    overlaysScroll: {
      id: "overlaysScroll",
      label: "Overlays, scroll et interactions avancées",
      icon: "⧉",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Les interfaces modernes ne sont pas des successions de pages statiques : elles ont des modales qui s'ouvrent par-dessus le contenu, des listes qui défilent, des drawers qui glissent depuis un bord, des composants interactifs au survol. Sans prototyper ces comportements, les revues de design restent abstraites — "la modale s'ouvre ici" dit beaucoup moins que montrer directement la modale s'ouvrir avec la bonne animation, au bon endroit, avec le bon comportement de fermeture.</p>`,
        system: `<p>Les overlays s'appuient sur les connexions et les transitions <span class="ref-fiche">→ interactionsTransitions</span> pour configurer leur apparence et comportement. Le scroll est lié aux contraintes de frames <span class="ref-fiche">→ F28</span> — une frame avec overflow visible peut être configurée comme zone scrollable. Ces mécanismes complètent les flows <span class="ref-fiche">→ connexionsFlows</span> pour produire un prototype qui documente les comportements complexes attendus en développement <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Overlays, scroll et interactions de composant dans Figma :</p>
<p><strong>Configurer un overlay :</strong> créer une frame représentant la modal ou le drawer. Dans la connexion, choisir l'action "Open Overlay". Options de position : "Centered" (modal), "Top / Bottom / Left / Right" (drawer ou bottom sheet), "Manual" (positionnement libre — pour les tooltips et dropdowns ancrés à un élément). Cocher "Add background behind overlay" pour le fond semi-transparent. Cocher "Close when clicking outside" pour le comportement standard des modales — le décocher explicitement quand la modale exige une action avant fermeture (confirmation, formulaire obligatoire).</p>
<p><strong>Scroll dans une frame Figma :</strong> sélectionner la frame → panneau de droite → "Prototype" → "Overflow behavior". Options : No Scrolling (par défaut), Vertical Scrolling, Horizontal Scrolling, Both. La frame affiche le contenu "above the fold" — le reste défile. Pour qu'un header reste fixe pendant le scroll : placer le header dans la frame avec la contrainte "Top", et le contenu scrollable dans une frame imbriquée avec Vertical Scrolling. Cette structure simule la barre de navigation fixe des applications mobiles.</p>
<p><strong>Interactions de composant (Component Interactions) :</strong> dans l'onglet Prototype d'un composant, des interactions peuvent être définies directement sur le composant maître et s'appliquent à toutes les instances. Exemple : un composant Accordion avec un trigger "On Click" qui passe de l'état "Closed" à l'état "Open" via Smart Animate — chaque instance de cet accordion est interactive dans le prototype sans connexion supplémentaire. Prérequis : le composant doit avoir des variants nommés "Closed" et "Open".</p>
<p><strong>After Delay :</strong> trigger qui déclenche une transition après un délai défini en millisecondes, sans action utilisateur. Cas d'usage : simuler un état de chargement (After Delay 2000ms → écran avec contenu chargé), une notification qui disparaît automatiquement, un onboarding avec progression automatique. Attention : les After Delay ne se mettent pas en pause dans le prototype — si l'utilisateur navigue sur une autre frame puis revient, le délai a pu expirer.</p>`,
        },
        senior: `<p>Un designer expérimenté utilise les Component Interactions pour réduire la maintenance du prototype : un composant accordion interactif inséré 15 fois dans un fichier se comporte correctement dans toutes ses instances sans 15 connexions manuelles. Il sait aussi quand ne pas surprototyper : les interactions de composant complexes (drag-and-drop, swipe gestures, formulaires multi-étapes) sont souvent plus clairement documentées par des annotations explicites que par un prototype imparfait qui crée de fausses attentes.</p>`,
        errors: `<p><strong>Pattern 1 — Overlay sans comportement de fermeture documenté :</strong> créer une modale sans configurer explicitement comment elle se ferme (clic extérieur, bouton, touche Echap). Le développeur doit alors deviner ou demander. Documenter systématiquement : fermeture au clic extérieur oui/non, bouton de fermeture obligatoire, et comportement si l'action en cours n'est pas complétée.</p>
<p><strong>Pattern 2 — Scroll simulé par une frame trop haute :</strong> créer une frame très haute pour représenter une page longue, sans configurer le Overflow Scrolling. Dans le prototype, la frame affiche tout le contenu d'un coup sans scroll. Configurer l'overflow de la frame à "Vertical Scrolling" et définir une hauteur fixe pour la frame (correspondant à la hauteur de l'écran device) pour que le scroll soit réellement simulé.</p>
<p><strong>Pattern 3 — After Delay comme solution au manque de contenu :</strong> utiliser des transitions automatiques (After Delay) pour masquer le fait que certains états ne sont pas encore designés. Le prototype avance tout seul sans action utilisateur, donnant l'illusion d'une expérience complète. Dans les tests, l'utilisateur n'a pas le temps de lire ni d'interagir. Réserver les After Delay aux cas où la progression automatique est réellement le comportement prévu.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les options d'overlay et de scroll de Figma, les nouvelles interactions (drag, key press, gamepad), l'intégration avec les variables Figma pour des prototypes conditionnels. <strong>Ce qui ne change pas :</strong> un overlay doit toujours documenter son comportement de fermeture ; un scroll prototype nécessite une frame à hauteur fixe avec Overflow Scrolling activé ; les Component Interactions réduisent la maintenance mais exigent des variants nommés correctement dans le composant maître.</p>`,
        practice: {
          exercices: [
            {
              titre: "Prototyper une liste scrollable avec modale de détail",
              etapes: [
                "Crée une frame mobile (375px × 812px) représentant une liste de 8 items. Le contenu total dépasse 812px — configure l'Overflow Behavior à 'Vertical Scrolling'.",
                "Place un header fixe (56px) dans la frame avec la contrainte 'Top' et 'Left & Right'. Vérifie dans le prototype que le header reste visible pendant le scroll.",
                "Ajoute un item de la liste avec une connexion 'On Click' → 'Open Overlay' vers une frame de détail (centrée, fond sombre, fermeture au clic extérieur).",
                "Configure la transition de l'overlay : Move In depuis le bas, 300ms Ease Out. Vérifie dans le prototype que l'overlay s'ouvre correctement depuis n'importe quelle position de scroll.",
              ],
              output: "Frame mobile avec scroll fonctionnel, header fixe, et overlay de détail avec transition et fermeture — comportement vérifiable dans le prototype.",
              critere: "Le scroll doit masquer et révéler le contenu sans déplacer le header. L'overlay doit s'ouvrir et se fermer correctement depuis n'importe quelle position de scroll dans la liste.",
            },
          ],
          piege: "Configurer la hauteur de la frame mobile à la taille totale du contenu scrollable (ex: 2000px) au lieu de la fixer à la hauteur de l'écran (812px). Résultat : le prototype affiche tout le contenu sans scroll et les tests ne révèlent pas les problèmes de contenu hors-écran.",
        },
        verification: [
          "Quelle configuration de frame est nécessaire pour que le scroll fonctionne correctement dans un prototype Figma, et pourquoi une frame de 2000px de haut sans Overflow Scrolling configuré ne simule pas un vrai scroll ?",
          "Décrivez les paramètres à configurer pour une modale de confirmation de suppression : position de l'overlay, fond, fermeture au clic extérieur (oui ou non), et justifiez chaque choix.",
          "Quelle est la condition pour qu'une Component Interaction définie sur un composant maître s'applique automatiquement à toutes ses instances dans le prototype, sans connexion manuelle ?",
        ],
      },
    },

    partageCollaboration: {
      id: "partageCollaboration",
      label: "Partage et collaboration sur le prototype",
      icon: "↗",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un prototype terminé dans Figma ne sert à rien s'il reste dans le fichier de l'auteur. Le partager avec les parties prenantes, les développeurs et les testeurs sans export ni réunion de présentation obligatoire — c'est la différence entre un outil de communication et un livrable de présentation. Mais partager sans cadrer ce qu'on attend en retour produit des commentaires épars, des comparaisons non contextualisées et des décisions prises sur la mauvaise version.</p>`,
        system: `<p>Le partage du prototype conclut le travail de connexions <span class="ref-fiche">→ connexionsFlows</span>, de transitions <span class="ref-fiche">→ interactionsTransitions</span> et d'interactions avancées <span class="ref-fiche">→ overlaysScroll</span>. Il déclenche les tests d'utilisabilité décrits en <span class="ref-fiche">→ D01</span> et alimente le handoff design-dev <span class="ref-fiche">→ D04</span>. Les commentaires collectés nourrissent ensuite l'itération design-dev <span class="ref-fiche">→ D04</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Méthodes de partage et de collaboration dans Figma :</p>
<p><strong>Lien de prototype :</strong> dans le mode Prototype, cliquer sur le bouton ▷ "Present" ouvre le prototype en plein écran. Le bouton "Share prototype" (icône de lien) génère un lien public ou restreint. Options de partage : "Anyone with link can view" (stakeholders sans compte Figma), "Only people invited to this file" (équipe interne). Le lien pointe vers le flow de départ configuré — s'il n'y a pas de flow défini, Figma choisit automatiquement la première frame du fichier, ce qui peut désorienter le destinataire.</p>
<p><strong>Partager un flow spécifique :</strong> dans "Share prototype", le menu déroulant permet de choisir quel flow est le point d'entrée du lien partagé. Partager le lien "Checkout" à l'équipe produit et le lien "Settings" au développeur backend garantit que chaque destinataire commence au bon endroit dans le parcours. Cela évite de devoir expliquer "commence à la frame 12" dans un email.</p>
<p><strong>Commentaires dans Figma :</strong> le mode commenter (touche C, ou bouton icône de commentaire dans la toolbar) permet d'annoter n'importe quelle frame. Les commentaires sont positionnels — ancrés à un point du canvas. Les destinataires peuvent répondre, réouvrir, résoudre les commentaires. Dans le mode Prototype présenté, des commentaires peuvent aussi être laissés directement sur le prototype en mode présentation si le partage inclut les commentaires. Configuration : "Share prototype" → options avancées → activer "Comments".</p>
<p><strong>Figma Mirror pour validation mobile :</strong> l'app Figma Mirror (iOS et Android) permet de visualiser le prototype sur un device physique. En mode Prototype dans l'app desktop, la frame sélectionnée s'affiche sur le device en temps réel. Les interactions fonctionnent — clic, scroll. C'est la seule façon de valider la taille des cibles tactiles, la lisibilité réelle du texte, et le confort d'usage avant de partager aux stakeholders mobiles.</p>
<p><strong>Présenter vs Partager :</strong> deux usages distincts. Le mode présentation ("Present" depuis Figma desktop) affiche le prototype en plein écran sur votre écran — pour les présentations en réunion, vous contrôlez la navigation. Le mode partage (lien envoyé) donne au destinataire son propre contrôle de navigation — pour les revues asynchrones. Ne pas confondre : une présentation en réunion où vous contrôlez le prototype ne valide pas que les parties prenantes comprennent le parcours sans assistance.</p>`,
        },
        senior: `<p>Un designer expérimenté envoie toujours un lien de prototype accompagné d'un contexte minimal : "Ce prototype couvre le parcours de réservation depuis la recherche jusqu'à la confirmation. Il ne couvre pas les états d'erreur de paiement — ce sera la prochaine itération. Je cherche à valider : est-ce que l'étape de choix des options de livraison est claire ?" Sans ce cadrage, les stakeholders commentent tout, le designer doit trier le signal du bruit, et les décisions prennent trois fois plus de temps.</p>`,
        errors: `<p><strong>Pattern 1 — Lien partagé sans flow défini :</strong> envoyer un lien de prototype sans avoir configuré le flow de départ. Figma lance le prototype depuis la première frame du fichier — souvent une frame d'exploration ou un état intermédiaire. Le destinataire commence au mauvais endroit et conclut que le prototype est cassé. Toujours définir un flow avant de partager.</p>
<p><strong>Pattern 2 — Collecte de commentaires sans processus de traitement :</strong> activer les commentaires sur le prototype et recevoir des dizaines de retours sans processus pour les prioriser, les assigner ou les clôturer. Les commentaires Figma deviennent un backlog informel impossible à gérer. Définir avant le partage : qui peut commenter, quel type de retour est attendu (bug de prototype ? question UX ? suggestion ?), et dans quel délai les commentaires seront traités.</p>
<p><strong>Pattern 3 — Prototype partagé en remplacement d'une conversation :</strong> envoyer le lien de prototype en demandant une "validation" asynchrone sur des décisions stratégiques. Un prototype répond à "comment ça fonctionne ?" mais pas à "est-ce que c'est la bonne direction ?". Les décisions stratégiques de UX exigent une conversation, pas une navigation silencieuse.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les options de partage Figma (permissions, types de liens, FigJam pour les retours collaboratifs), les outils tiers de collecte de retours sur prototype. <strong>Ce qui ne change pas :</strong> un lien de prototype sans contexte génère des retours épars ; un flow de départ doit toujours être défini avant partage ; les retours asynchrones sur prototype ne remplacent pas les conversations pour les décisions structurelles.</p>`,
        practice: {
          exercices: [
            {
              titre: "Préparer et partager un prototype pour revue stakeholder",
              etapes: [
                "Prends un prototype avec au moins deux flows distincts. Vérifie que chaque flow a une starting frame nommée clairement ('Onboarding', 'Checkout', 'Paramètres').",
                "Dans 'Share prototype', génère deux liens distincts — un par flow principal. Vérifie en ouvrant chaque lien dans un onglet incognito que le prototype démarre au bon endroit.",
                "Rédige un message d'envoi de 5 lignes maximum : contexte du prototype, périmètre couvert, ce qui n'est pas encore couvert, et la question précise à laquelle tu cherches une réponse.",
                "Active les commentaires dans les options de partage. Ouvre le lien en mode visualisation et laisse un commentaire test pour vérifier que les destinataires pourront commenter.",
                "Installe Figma Mirror et visualise le prototype principal sur un device mobile avant de l'envoyer. Y a-t-il des textes illisibles ou des cibles trop petites ?",
              ],
              output: "Deux liens de prototype ciblés, message d'envoi avec contexte et question précise, commentaires activés, validation Figma Mirror effectuée.",
              critere: "Un destinataire sans contexte préalable doit pouvoir démarrer le bon parcours depuis le lien, comprendre ce qu'on lui demande d'évaluer, et laisser un commentaire ancré à l'endroit concerné — sans assistance.",
            },
          ],
          piege: "Envoyer le lien du fichier Figma plutôt que le lien du prototype. Le destinataire arrive sur le canvas de design complet, voit les frames de travail, les explorations abandonnées et les annotations internes. Le lien prototype affiche uniquement le mode présentation — toujours vérifier le type de lien avant d'envoyer.",
        },
        verification: [
          "Quelle est la différence entre partager le lien d'un fichier Figma et partager le lien d'un prototype Figma, et pourquoi cette distinction est-elle importante pour les parties prenantes externes ?",
          "Vous recevez 30 commentaires épars sur un prototype partagé sans cadrage. La moitié des commentaires portent sur des détails visuels non finalisés que vous aviez prévu de corriger. Quelle pratique de partage aurait réduit ce problème ?",
          "Dans quel cas le partage asynchrone d'un lien prototype est-il insuffisant, et quelle alternative complémentaire est nécessaire pour les décisions de design stratégiques ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "connexionsFlows", x: 10, y: 100, w: 185, h: 65 },
        { id: "interactionsTransitions", x: 275, y: 40, w: 210, h: 65 },
        { id: "overlaysScroll", x: 275, y: 165, w: 185, h: 65 },
        { id: "partageCollaboration", x: 575, y: 100, w: 205, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 273, y2: 72, label: "anime" },
        { x1: 195, y1: 148, x2: 273, y2: 197, label: "enrichit" },
        { x1: 485, y1: 72, x2: 573, y2: 120, label: "finalise" },
        { x1: 460, y1: 197, x2: 573, y2: 148, label: "complète" },
      ],
    },
  },
});
