import { cultureSheet } from "./culture-common";

export const cultureDesignResponsiveFigma = cultureSheet({
  id: "culture-F28",
  number: 28,
  title: "Design Responsive dans Figma",
  subtitle:
    "Frames, Auto Layout, contraintes et prévisualisation — concevoir des interfaces qui s'adaptent à toutes les tailles d'écran",
  badge: "Fiche F28",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description:
    "Le responsive n'est pas uniquement une décision CSS côté développement — il se conçoit dans Figma avec des outils précis : Auto Layout pour des composants qui s'étirent et se compriment, contraintes pour ancrer les éléments dans leur frame, et frames multi-breakpoints pour documenter les variantes mobile, tablette et desktop. Cette fiche couvre les mécanismes Figma nécessaires pour livrer des maquettes qui communiquent exactement comment l'interface doit se comporter à chaque taille d'écran.",
  accent: "modele",

  nodes: {
    principesResponsiveFigma: {
      id: "principesResponsiveFigma",
      label: "Définitions et principes du responsive",
      icon: "📐",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une maquette Figma qui ressemble bien à un seul breakpoint mais ne documente pas le comportement aux autres tailles d'écran livre un problème au développeur : il doit inventer les règles de transformation. Résultat : des interprétations divergentes, des interfaces qui cassent à des tailles intermédiaires, et des allers-retours de correction coûteux. Le design responsive dans Figma n'est pas une option — c'est la condition pour qu'une maquette soit un contrat livrable.</p>`,
        system: `<p>Ce nœud prolonge les principes de design responsive de <span class="ref-fiche">→ D03</span> (mobile-first, breakpoints selon le contenu, zones tactiles) en les ancrant dans la pratique Figma. Il s'appuie sur la connaissance de Figma comme outil <span class="ref-fiche">→ D04</span> et prépare les nœuds Auto Layout <span class="ref-fiche">→ autoLayout</span>, contraintes <span class="ref-fiche">→ contraintesFigma</span>, et prévisualisation <span class="ref-fiche">→ previsualisation</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les concepts fondamentaux du responsive appliqués à Figma :</p>
<p><strong>Responsive vs Adaptatif :</strong> deux stratégies distinctes. Le design <em>responsive</em> (ou fluide) : le layout s'adapte continuellement à toute largeur d'écran via des valeurs relatives et des proportions. Le design <em>adaptatif</em> (ou à points de rupture) : des mises en page distinctes sont définies pour des seuils précis (320px, 768px, 1280px). En pratique, les interfaces modernes combinent les deux — une grille fluide à l'intérieur de breakpoints précis. Dans Figma, les deux approches se matérialisent différemment : le responsive utilise des largeurs en pourcentage via les contraintes, l'adaptatif utilise des frames séparées par breakpoint.</p>
<p><strong>Les breakpoints standard :</strong> il n'existe pas de breakpoints universels, mais des conventions largement adoptées. Mobile : 320px à 480px (ancien standard), 375px à 390px (iPhone récents). Tablette portrait : 768px. Tablette paysage / petit desktop : 1024px. Desktop standard : 1280px à 1440px. Desktop large : 1920px. Dans Figma, créer des frames aux largeurs 375, 768, 1280, et 1440 couvre les cas les plus courants. La règle : les breakpoints doivent être placés là où le contenu casse naturellement, pas là où se trouve un device populaire.</p>
<p><strong>Mobile-first dans Figma :</strong> concevoir la version mobile en premier force à prioriser. Sur 375px, chaque élément présent est nécessaire — il n'y a pas de place pour les éléments optionnels. La version desktop ajoute ensuite. En pratique dans Figma : créer la frame 375px en premier, y dessiner tous les composants essentiels, puis dupliquer vers 768px et 1440px en ajoutant les éléments supplémentaires. Cette discipline révèle immédiatement les éléments "desktop only" qui n'ont pas leur place sur mobile.</p>
<p><strong>Ce que Figma ne peut pas faire seul :</strong> Figma simule le responsive via les contraintes et l'Auto Layout, mais ne peut pas reproduire tous les comportements CSS (media queries, CSS Grid, Flexbox avancé, scroll behavior). Une maquette Figma est une approximation visuelle du comportement — les cas limites et les comportements d'animation doivent être documentés en annotations ou en notes de handoff, pas uniquement en maquette.</p>`,
        },
        senior: `<p>Un designer expérimenté livre non seulement les frames 375px, 768px et 1440px, mais aussi un document d'annotations qui précise les comportements intermédiaires : "entre 768px et 1024px, la navigation passe de sidebar à top bar", "la grille de produits passe de 4 colonnes à 2 colonnes sous 768px". Ces annotations éliminent les zones d'ambiguïté que le développeur aurait dû résoudre seul. Elles prennent 30 minutes à rédiger et économisent 2 heures de corrections.</p>`,
        errors: `<p><strong>Pattern 1 — Frame unique livrée comme maquette "responsive" :</strong> livrer une seule maquette desktop en indiquant qu'elle est "responsive". Le développeur ne dispose d'aucune information sur le comportement mobile. Minimum requis pour un handoff honnête : maquettes 375px et 1440px avec annotations sur les changements de layout.</p>
<p><strong>Pattern 2 — Breakpoints choisis pour les devices populaires :</strong> placer les breakpoints à 414px (iPhone Plus), 390px (iPhone 14), 360px (Android) de façon systématique sans tester comment le contenu réel se comporte. Un breakpoint doit être placé là où le design casse ou nécessite une réorganisation — pas là où se trouve un device précis.</p>
<p><strong>Pattern 3 — Maquette mobile = maquette desktop compressée :</strong> dupliquer la frame desktop, rétrécir la largeur à 375px, et repositionner les éléments sans repenser la hiérarchie. Résultat : une interface mobile qui contient la même quantité d'information que le desktop, compressée dans 1/3 de l'espace. La mobilisation cognitive de l'utilisateur mobile est totalement différente — le responsive doit répondre à "que doit-il faire sur mobile ?" pas "comment rétrécir le desktop ?"</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les breakpoints standards (évolution des tailles d'écrans, nouveaux form factors comme les foldables), les outils de prévisualisation de Figma, les conventions de handoff. <strong>Ce qui ne change pas :</strong> les breakpoints doivent correspondre aux ruptures naturelles du contenu, pas aux tailles de devices populaires ; le mobile-first comme discipline de priorisation reste valide quel que soit l'outil ; une maquette unique ne documente pas un comportement responsive.</p>`,
        practice: {
          exercices: [
            {
              titre: "Définir les breakpoints d'une interface existante",
              etapes: [
                "Ouvre une interface web connue (e-commerce, dashboard, blog). Rétrécis la fenêtre de navigateur progressivement de 1440px vers 320px.",
                "Identifie les 3 à 4 points où le layout change notablement (navigation qui se replie, colonnes qui s'empilent, sidebar qui disparaît). Ces points sont les breakpoints naturels de cette interface.",
                "Compare ces points avec les breakpoints CSS réels via les DevTools (onglet Responsive Design Mode). Les conventions sont-elles respectées ?",
                "Dans Figma, crée 3 frames aux largeurs correspondant aux breakpoints identifiés. Nomme-les clairement : 'Mobile 375', 'Tablette 768', 'Desktop 1440'.",
              ],
              output:
                "3 frames Figma nommées aux breakpoints naturels d'une interface réelle, avec justification de chaque point de rupture.",
              critere:
                "Chaque breakpoint doit être justifié par un changement de comportement du contenu — pas par un device populaire.",
            },
          ],
          piege:
            "Créer les frames Figma aux dimensions exactes des devices les plus vendus (iPhone 14 Pro Max : 430px, Samsung Galaxy S22 : 360px) plutôt qu'aux breakpoints naturels du design. Les développeurs travaillent avec des breakpoints CSS en valeurs relatives, pas avec des tailles de devices spécifiques.",
        },
        verification: [
          "Quelle est la différence entre design responsive (fluide) et design adaptatif (à breakpoints fixes), et comment chaque approche se matérialise-t-elle différemment dans un fichier Figma ?",
          "Pourquoi livrer uniquement une maquette desktop au développeur en indiquant qu'elle est 'responsive' est-il insuffisant, et quels livrables minimaux assurent un handoff honnête ?",
          "Un designer place ses breakpoints à 414px, 768px et 1024px pour correspondre aux iPhones Plus, iPads et MacBooks. Quel est le problème de cette approche, et quel critère devrait guider le placement des breakpoints ?",
        ],
      },
    },

    autoLayout: {
      id: "autoLayout",
      label: "Auto Layout dans Figma",
      icon: "🔲",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Sans Auto Layout, un composant Figma est une collection d'éléments à positions fixes. Ajouter un mot dans un bouton, c'est repositionner le texte et redimensionner le rectangle manuellement. Sur une maquette de 50 écrans, chaque modification de contenu déclenche une cascade de corrections manuelles. Auto Layout est la réponse de Figma à ce problème : il transforme un groupe d'éléments en un conteneur qui gère automatiquement l'espacement, l'alignement et le redimensionnement — exactement comme Flexbox en CSS.</p>`,
        system: `<p>Auto Layout est le mécanisme central qui rend les composants Figma véritablement responsifs. Il s'appuie sur les principes du responsive <span class="ref-fiche">→ principesResponsiveFigma</span> et complète les contraintes de positionnement <span class="ref-fiche">→ contraintesFigma</span>. Il correspond directement au comportement de Flexbox dans le code <span class="ref-fiche">→ T08</span> — un composant Auto Layout bien configuré se traduit naturellement en composant Flexbox.</p>`,
        choice: {
          kind: "free",
          html: `<p>Auto Layout : concepts et réglages essentiels :</p>
<p><strong>Ajouter Auto Layout :</strong> sélectionner un groupe ou une frame et appuyer sur <kbd>Shift+A</kbd>. Figma transforme le groupe en frame Auto Layout. Le panneau de droite affiche les options : direction (horizontal ou vertical), espacement entre items (gap), padding (intérieur haut/bas/gauche/droite), alignement des items, et mode de redimensionnement.</p>
<p><strong>Direction et espacement :</strong> horizontal (éléments côte à côte, comme <code>flex-direction: row</code>) ou vertical (éléments empilés, comme <code>flex-direction: column</code>). L'espacement entre items est le <em>gap</em> CSS. Figma permet aussi "Auto" comme espacement : les items s'espacent équitablement dans la frame (équivalent de <code>justify-content: space-between</code>).</p>
<p><strong>Modes de redimensionnement des items :</strong> chaque item dans un Auto Layout peut avoir 3 comportements. <em>Fixed</em> : largeur/hauteur fixe en pixels — l'item ne s'adapte pas. <em>Hug contents</em> : la frame se rétrécit ou s'agrandit pour coller à son contenu (équivalent de <code>width: fit-content</code>). <em>Fill container</em> : l'item s'étire pour remplir l'espace disponible (équivalent de <code>flex: 1</code> ou <code>flex-grow: 1</code>). La combinaison la plus utile pour le responsive : la frame parent en <em>Fill container</em>, les items en <em>Fill container</em> ou avec des flex-shrink simulés.</p>
<p><strong>Padding :</strong> espace entre le bord de la frame et son contenu. En Auto Layout, le padding est configurable séparément pour haut, bas, gauche, droite — ou en valeur unique pour tous les côtés. Il correspond exactement au <code>padding</code> CSS.</p>
<p><strong>Nested Auto Layout (Auto Layout imbriqués) :</strong> la puissance réelle d'Auto Layout vient de l'imbrication. Un bouton est un Auto Layout horizontal (icône + texte). Une card est un Auto Layout vertical (image + contenu). La liste de cards est un Auto Layout avec wrap (équivalent de <code>flex-wrap: wrap</code>). Chaque niveau gère ses propres règles d'espacement et de redimensionnement — exactement comme les conteneurs Flexbox imbriqués en CSS.</p>
<p><strong>Wrap :</strong> depuis les dernières versions de Figma, Auto Layout supporte le wrap (retour à la ligne des items). Équivalent de <code>flex-wrap: wrap</code>. Permet de simuler une grille de cards qui passe de 3 colonnes sur desktop à 1 colonne sur mobile en changeant uniquement la largeur de la frame.</p>`,
        },
        senior: `<p>Un designer expérimenté configure ses composants en "hug contents" par défaut et passe en "fill container" uniquement quand l'élément doit s'étirer dans son parent. Cette discipline rend les composants réutilisables à toutes les tailles — un bouton en "hug contents" s'adapte à son label quelle que soit la longueur, un bouton en largeur fixe cassera avec des traductions plus longues. La règle : "hug" pour les composants atomiques, "fill" pour les conteneurs qui doivent s'étirer.</p>`,
        errors: `<p><strong>Pattern 1 — Mélanger Auto Layout et positionnement absolu sans intention :</strong> avoir des éléments hors-flux (positionnés avec des valeurs absolues X/Y) dans une frame Auto Layout. Ces éléments ignorent les règles Auto Layout et ne s'adaptent pas avec la frame. Figma permet de passer un élément en "absolute position" dans un Auto Layout (équivalent de <code>position: absolute</code>) — c'est parfois voulu (badges, tooltips), mais utiliser cette option par défaut brise le comportement responsive.</p>
<p><strong>Pattern 2 — Spacers manuels entre éléments :</strong> insérer des rectangles transparents vides comme espaceurs dans une frame Auto Layout au lieu d'utiliser le gap ou les valeurs "auto". Ces spacers cassent le redimensionnement automatique — quand la frame change de taille, les spacers ne s'adaptent pas. Utiliser le gap Auto Layout ou l'espacement "auto".</p>
<p><strong>Pattern 3 — Auto Layout imbriqués avec directions incohérentes :</strong> imbriquer un Auto Layout horizontal dans un Auto Layout horizontal sans réfléchir à la hiérarchie. Quand un développeur inspecte la maquette, la structure Auto Layout doit correspondre à la structure Flexbox attendue dans le code — horizontal → column, vertical → row. Des imbrications incohérentes produisent un code difficile à lire et difficile à maintenir.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les raccourcis et l'interface de Figma (Auto Layout a évolué significativement depuis 2019), les nouvelles propriétés (wrap, min/max width). <strong>Ce qui ne change pas :</strong> le modèle conceptuel d'Auto Layout correspond à Flexbox CSS — direction, gap, padding, flex-grow, flex-shrink, flex-wrap. Comprendre Flexbox, c'est comprendre Auto Layout, et vice versa.</p>`,
        practice: {
          exercices: [
            {
              titre: "Reconstruire une card responsive avec Auto Layout",
              etapes: [
                "Crée une card avec : une image (largeur 100%, hauteur fixe 180px), un titre (texte), une description (texte), et un bouton CTA.",
                "Ajoute un Auto Layout vertical sur la card : gap 16px, padding 20px. Configure la card en 'Hug contents' en hauteur et 'Fixed' en largeur (320px).",
                "Configure le titre et la description en 'Fill container' en largeur pour qu'ils s'étirent sur toute la largeur disponible.",
                "Crée une version 'wide' de la card en Auto Layout horizontal (image à gauche, contenu à droite). Passe l'image en 'Fixed' (240px) et le contenu en 'Fill container'.",
                "Place les deux versions dans une frame parent en Auto Layout avec wrap : observe comment elles se réarrangent quand tu changes la largeur de la frame parent.",
              ],
              output:
                "Composant Card avec deux variantes Auto Layout (vertical et horizontal) qui s'adaptent à leur conteneur.",
              critere:
                "Aucun spacer manuel ne doit être utilisé. Chaque élément doit avoir un mode de redimensionnement explicitement choisi (Fixed, Hug, Fill). La card doit fonctionner correctement avec du texte de 3 lignes comme avec du texte d'une ligne.",
            },
          ],
          piege:
            "Utiliser Auto Layout uniquement pour les nouveaux composants et garder les anciens composants en layout manuel. La valeur d'Auto Layout est systémique — un fichier où la moitié des composants utilisent Auto Layout et l'autre moitié des positions fixes est difficile à maintenir et produit des comportements incohérents.",
        },
        verification: [
          "Quelle est la correspondance entre les modes de redimensionnement de Figma ('Fixed', 'Hug contents', 'Fill container') et les propriétés Flexbox CSS correspondantes ?",
          "Un bouton Auto Layout en 'Hug contents' et un bouton en largeur fixe de 200px réagissent différemment à un texte traduit qui passe de 8 à 15 caractères. Décrivez le comportement de chacun et lequel est préférable pour un projet multilingue.",
          "Comment simuler une grille de 3 colonnes qui passe à 1 colonne sur mobile avec les fonctionnalités Auto Layout de Figma, sans créer deux composants séparés ?",
        ],
      },
    },

    contraintesFigma: {
      id: "contraintesFigma",
      label: "Contraintes et comportement au redimensionnement",
      icon: "🧲",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Auto Layout gère le comportement des éléments à l'intérieur d'une frame. Les contraintes gèrent le comportement d'une frame entière (ou d'un élément) quand sa frame parente est redimensionnée. Sans contraintes configurées intentionnellement, redimensionner une frame déplace tous ses éléments de façon imprévisible — les éléments qui devraient rester centrés s'accrochent à un coin, les éléments qui devraient s'étirer restent à taille fixe. Les contraintes sont la réponse à "comment cet élément se positionne-t-il dans son parent quand la taille de ce parent change ?"</p>`,
        system: `<p>Les contraintes complètent Auto Layout <span class="ref-fiche">→ autoLayout</span> pour les cas où l'élément n'est pas dans un conteneur Auto Layout, ou pour définir le positionnement absolu d'un élément dans sa frame. Elles correspondent aux propriétés CSS de positionnement et de dimensionnement relatif (<code>position</code>, <code>%</code>, <code>left/right/top/bottom</code>). Elles informent directement le développeur des règles CSS à implémenter <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les contraintes Figma et leur correspondance CSS :</p>
<p><strong>Accéder aux contraintes :</strong> sélectionner un élément non Auto Layout dans une frame → panneau de droite → section "Constraints". Deux axes indépendants : horizontal (Left, Right, Left & Right, Center, Scale) et vertical (Top, Bottom, Top & Bottom, Center, Scale).</p>
<p><strong>Les options horizontales :</strong></p>
<p><em>Left :</em> l'élément reste à distance fixe du bord gauche de sa frame parent. Correspond à <code>left: Xpx</code> en CSS positionné. Comportement par défaut.</p>
<p><em>Right :</em> l'élément reste à distance fixe du bord droit. Correspond à <code>right: Xpx</code>.</p>
<p><em>Left & Right :</em> l'élément reste à distance fixe des deux bords — il s'étire ou se rétrécit avec la frame parent. Correspond à <code>left: Xpx; right: Xpx</code> ou <code>width: 100%; margin: 0 Xpx</code>. Le cas d'usage le plus utile pour le responsive : un conteneur de contenu qui doit rester à 20px des bords sur toutes les tailles d'écran.</p>
<p><em>Center :</em> l'élément reste centré horizontalement dans sa frame parent, quelle que soit la taille de celle-ci. Correspond à <code>margin: 0 auto</code> ou <code>transform: translateX(-50%); left: 50%</code>.</p>
<p><em>Scale :</em> l'élément se redimensionne proportionnellement à la frame parent (en pourcentage). Correspond à <code>width: X%</code>.</p>
<p><strong>Les options verticales :</strong> les mêmes options existent pour l'axe vertical : Top (ancré en haut), Bottom (ancré en bas), Top & Bottom (s'étire verticalement), Center (centré), Scale (proportionnel).</p>
<p><strong>Cas d'usage concrets :</strong></p>
<p>Un header pleine largeur : contrainte horizontale "Left & Right" → s'étire pour remplir toute la largeur de l'écran.</p>
<p>Un bouton de fermeture en haut à droite d'une modal : contrainte horizontale "Right", verticale "Top" → reste ancré au coin supérieur droit quand la modal est redimensionnée.</p>
<p>Un logo centré dans le header : contrainte horizontale "Center", verticale "Top" → reste centré quelle que soit la largeur du header.</p>
<p>Une sidebar de largeur fixe à gauche : contrainte horizontale "Left", verticale "Top & Bottom" → reste ancrée à gauche et s'étire en hauteur avec la fenêtre.</p>
<p><strong>Contraintes dans un composant Figma :</strong> les contraintes définies à l'intérieur d'un composant maître s'appliquent quand le composant est redimensionné dans ses instances. Un composant Card avec une image en contrainte "Left & Right, Top" s'adaptera correctement quand un développeur modifiera la largeur de la card dans une instance.</p>`,
        },
        senior: `<p>Un designer expérimenté configure les contraintes au niveau du composant maître, pas instance par instance. Si un composant Card a 15 instances sur différentes pages, configurer les contraintes une seule fois dans le maître propage le comportement à toutes les instances. Ce workflow représente la moitié du temps consacré aux contraintes dans la plupart des projets — beaucoup de designers configurent les contraintes dans les instances, ce qui crée une incohérence non documentée difficile à repérer avant le handoff.</p>`,
        errors: `<p><strong>Pattern 1 — Toutes les contraintes laissées à "Left, Top" par défaut :</strong> ne pas configurer les contraintes et livrer la maquette. Quand le développeur redimensionne la frame pour tester le responsive, tous les éléments restent collés en haut à gauche. La maquette ne communique aucune information sur le comportement responsive. Configurer les contraintes prend 5 minutes sur un écran — c'est du temps de handoff économisé.</p>
<p><strong>Pattern 2 — Contraintes "Scale" utilisées pour simuler le responsive fluide :</strong> mettre tous les éléments en contrainte "Scale" (proportionnel) pour que la maquette "s'adapte" au redimensionnement. Résultat : les textes rétrécissent proportionnellement — ce qui ne correspond à aucun comportement CSS réel (les textes ont des tailles fixes ou des tailles relatives aux unités rem/em, pas des pourcentages de l'écran). Les contraintes Scale sont pertinentes pour des éléments purement visuels (illustrations, images de fond), pas pour du contenu textuel.</p>
<p><strong>Pattern 3 — Contraintes contradictoires avec Auto Layout :</strong> configurer des contraintes sur des éléments à l'intérieur d'une frame Auto Layout. Dans une frame Auto Layout, les contraintes horizontales sont ignorées pour les éléments normaux (Auto Layout gère la position). Les contraintes ne s'appliquent qu'aux éléments en "absolute position" dans une frame Auto Layout.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> l'interface Figma pour les contraintes, les nouvelles options (min/max width dans les contraintes récentes), l'intégration avec les variables Figma. <strong>Ce qui ne change pas :</strong> la sémantique des contraintes correspond aux propriétés CSS de positionnement et de dimensionnement — comprendre CSS, c'est comprendre les contraintes ; Left & Right est la contrainte responsive la plus utile car elle simule l'étirement en largeur ; les contraintes se configurent sur le composant maître pour une propagation cohérente.</p>`,
        practice: {
          exercices: [
            {
              titre: "Configurer les contraintes d'un header responsive",
              etapes: [
                "Crée une frame de 1440px de large représentant un header de site : logo à gauche, navigation au centre, bouton CTA à droite, hauteur 72px.",
                "Configure la frame header avec la contrainte 'Left & Right' pour qu'elle s'étire sur toute la largeur de son parent.",
                "Logo : contrainte 'Left, Center' (vertical) → reste ancré à gauche, centré verticalement.",
                "Navigation : contrainte 'Center, Center' → reste centrée horizontalement et verticalement dans le header.",
                "Bouton CTA : contrainte 'Right, Center' → reste ancré à droite, centré verticalement.",
                "Redimensionne la frame de 1440px à 768px et observe le comportement. Est-il cohérent avec le comportement CSS attendu ?",
              ],
              output:
                "Frame header responsive avec contraintes configurées sur logo, navigation et CTA — comportement vérifié de 768px à 1440px.",
              critere:
                "Chaque élément doit se comporter correctement à toutes les largeurs entre 768px et 1440px. Le comportement observé dans Figma doit être identique au comportement CSS correspondant.",
            },
          ],
          piege:
            "Configurer les contraintes uniquement avant le handoff, en une passe rapide sur l'ensemble de la maquette. Cette approche produit des erreurs — les contraintes d'un élément qui semble évident peuvent ne pas correspondre au comportement CSS voulu. Configurer les contraintes pendant la création du composant, quand l'intention est claire.",
        },
        verification: [
          "Un élément avec contrainte 'Left & Right' se comporte différemment d'un élément avec contrainte 'Scale' quand la frame parent est redimensionnée. Décrivez précisément le comportement de chacun et donnez la propriété CSS correspondante.",
          "Pourquoi configurer la contrainte 'Scale' sur un paragraphe de texte est-il inapproprié pour simuler un comportement responsive réel, et quelle contrainte serait correcte pour un bloc de texte pleine largeur ?",
          "Dans quelle situation les contraintes d'un élément dans une frame Auto Layout sont-elles ignorées, et comment passer cet élément en mode où les contraintes s'appliquent à nouveau ?",
        ],
      },
    },

    previsualisation: {
      id: "previsualisation",
      label: "Prévisualisation et test responsive dans Figma",
      icon: "👁",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Concevoir une maquette responsive dans Figma ne garantit pas qu'elle communique correctement le comportement au développeur. Avant le handoff, tester la maquette à différentes tailles d'écran dans Figma, vérifier que les contraintes et Auto Layouts produisent le comportement attendu, et valider sur un device réel via le mirroring — ces étapes révèlent les incohérences avant qu'elles ne deviennent des bugs de production. Un problème détecté dans Figma se corrige en minutes ; détecté après développement, en heures.</p>`,
        system: `<p>La prévisualisation teste le résultat des Auto Layouts <span class="ref-fiche">→ autoLayout</span> et des contraintes <span class="ref-fiche">→ contraintesFigma</span> configurés selon les principes responsive <span class="ref-fiche">→ principesResponsiveFigma</span>. Elle précède le handoff vers le développement <span class="ref-fiche">→ D04</span> et alimente la documentation des comportements pour le développeur <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les méthodes de prévisualisation et de test dans Figma :</p>
<p><strong>Redimensionnement manuel de la frame :</strong> la méthode la plus directe. Sélectionner une frame et la redimensionner manuellement en tirant les bords. Observer si les éléments se comportent comme prévu. Tester des largeurs représentatives : 320px (petit mobile), 375px (mobile standard), 768px (tablette), 1024px (tablette large/laptop), 1280px, 1440px, 1920px (desktop large). Raccourci : sélectionner la frame et utiliser les champs W (width) dans le panneau de propriétés pour taper une largeur précise.</p>
<p><strong>Présentation Figma (Prototype Preview) :</strong> le mode présentation (<kbd>Ctrl/Cmd+Alt+Enter</kbd> ou bouton ▷ en haut à droite) affiche la maquette en plein écran. Il ne simule pas le responsive — il affiche la frame à sa taille de design. Son utilité pour le responsive : tester le flux de navigation entre les frames mobile et desktop en prototype.</p>
<p><strong>Figma Mirror (prévisualisation sur device physique) :</strong> l'application Figma Mirror sur iOS et Android affiche la frame sélectionnée sur l'écran réel du device. C'est la seule façon de valider la densité de pixel, la lisibilité réelle des textes, les cibles tactiles et le confort d'usage sur le device physique. Indispensable avant de valider une maquette mobile. Disponible gratuitement sur les stores d'applications.</p>
<p><strong>Device Preview dans Figma :</strong> en sélectionnant une frame, Figma peut afficher un "device frame" autour de la frame (iPhone, Android, iPad, desktop browser). Cela donne une représentation visuelle du rendu dans le contexte d'un device. Ce n'est pas une simulation — la frame reste à sa taille de design, le device frame est une décoration visuelle.</p>
<p><strong>Ce que Figma ne peut pas tester :</strong> le comportement des scrolls, les animations, les états au hover, les comportements de focus clavier, les media queries CSS avec des valeurs intermédiaires non maquettées. Pour ces cas, le prototype doit être testé dans le navigateur via un développement partiel ou un prototype HTML/CSS.</p>
<p><strong>Checklist de validation responsive avant handoff :</strong></p>
<ul>
<li>La frame se redimensionne correctement de 320px à 1920px sans éléments qui débordent</li>
<li>Les textes restent lisibles à toutes les tailles (ne rétrécissent pas proportionnellement)</li>
<li>Les cibles tactiles sont ≥ 44×44px sur mobile</li>
<li>Les images maintiennent leur ratio ou ont un comportement explicitement défini</li>
<li>Le contenu caché sur mobile est documenté (pas juste absent de la maquette mobile)</li>
<li>Les transitions entre breakpoints sont annotées pour les comportements non évidents</li>
<li>La maquette a été validée sur Figma Mirror sur un device physique</li>
</ul>`,
        },
        senior: `<p>Un designer expérimenté ne livre pas une maquette responsive sans avoir rempli la checklist de validation. Il complète systématiquement ses maquettes d'annotations de comportement (flèches, notes textuelles, frames "comportement au breakpoint 768px") pour documenter les cas que la maquette statique ne peut pas communiquer — notamment les comportements de contenu dynamique (texte long, liste vide, erreur API). Ces annotations prennent 20 minutes et évitent 3h de questions développeur + corrections.</p>`,
        errors: `<p><strong>Pattern 1 — Valider uniquement dans Figma sans device physique :</strong> considérer qu'une maquette mobile validée dans Figma est prête pour le handoff sans la tester sur un device réel. La densité de pixels des écrans récents (3× sur les iPhones récents) fait que les textes paraissent plus grands dans Figma qu'à l'écran. Ce qui semble lisible sur le canvas Figma peut être trop petit sur le device.</p>
<p><strong>Pattern 2 — Frames responsive sans annotations des comportements intermédiaires :</strong> livrer les maquettes 375px et 1440px sans documenter ce qui se passe entre les deux. Si un menu hamburger apparaît en dessous de 768px, si une sidebar disparaît sous 1024px, si des colonnes s'empilent sous 900px — ces informations doivent être annotées, pas laissées à l'interprétation du développeur.</p>
<p><strong>Pattern 3 — Tester uniquement aux breakpoints documentés :</strong> valider uniquement les largeurs 375px, 768px et 1440px sans tester les largeurs intermédiaires (500px, 900px, 1100px). Les bugs responsive apparaissent souvent aux tailles intermédiaires que personne n'a testées — tirer la frame lentement de 375px à 1440px révèle les ruptures inattendues.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils de prévisualisation Figma (nouvelles fonctionnalités régulières), les méthodes de test sur device (Figma Mirror évolue). <strong>Ce qui ne change pas :</strong> la nécessité de tester sur device physique pour valider la lisibilité et les cibles tactiles ; l'obligation d'annoter les comportements non communicables par la maquette statique ; le test des largeurs intermédiaires entre breakpoints.</p>`,
        practice: {
          exercices: [
            {
              titre: "Valider et annoter une maquette responsive complète",
              etapes: [
                "Prends une maquette d'une page complète (homepage ou page produit) avec des frames 375px et 1440px.",
                "Redimensionne la frame 1440px progressivement vers 375px. Identifie 3 comportements non évidents qui ne sont pas communiqués par les deux frames statiques seules.",
                "Crée une frame d'annotation : captures d'écran des comportements intermédiaires avec des flèches et notes explicites ('à 768px, la navigation passe en hamburger menu', 'à 900px, la grille passe de 3 à 2 colonnes').",
                "Installe l'application Figma Mirror sur un smartphone. Ouvre la maquette 375px dans Figma Mirror et compare avec le rendu sur le canvas Figma. Y a-t-il des différences de lisibilité ?",
                "Pour chaque différence identifiée, ajuste la taille de texte ou les dimensions dans la maquette.",
              ],
              output:
                "Page d'annotations responsive avec 3 comportements intermédiaires documentés + rapport de validation Figma Mirror avec ajustements effectués.",
              critere:
                "Les annotations doivent décrire des comportements de transition (pas seulement l'état final) avec des largeurs précises. Tout écart de rendu entre canvas et device doit avoir produit une correction dans la maquette.",
            },
          ],
          piege:
            "Traiter la prévisualisation et les annotations comme optionnelles pour 'gagner du temps'. En réalité, chaque comportement non documenté devient une question développeur (15 min) ou une correction post-développement (1–2h). Les annotations responsive sont de la documentation qui se lit une fois et économise plusieurs cycles de correction.",
        },
        verification: [
          "Quelle est la différence entre tester une maquette responsive par redimensionnement manuel dans Figma et la tester avec Figma Mirror sur un device physique ? Qu'est-ce que le second révèle que le premier ne montre pas ?",
          "Un designer livre des frames 375px et 1440px sans annotations de comportements intermédiaires. Le développeur doit implémenter la navigation. Citez deux décisions que le développeur devra prendre seul en l'absence d'annotations, et quelles conséquences cela peut avoir.",
          "Pourquoi tester uniquement les breakpoints documentés (375px, 768px, 1440px) est-il insuffisant, et quelle méthode de test révèle les ruptures de layout aux largeurs intermédiaires non prévues ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "principesResponsiveFigma", x: 10, y: 100, w: 205, h: 65 },
        { id: "autoLayout", x: 285, y: 40, w: 155, h: 65 },
        { id: "contraintesFigma", x: 285, y: 165, w: 175, h: 65 },
        { id: "previsualisation", x: 575, y: 100, w: 185, h: 65 },
      ],
      edges: [
        { x1: 215, y1: 120, x2: 283, y2: 72, label: "structure" },
        { x1: 215, y1: 148, x2: 283, y2: 197, label: "ancre" },
        { x1: 440, y1: 72, x2: 573, y2: 120, label: "valide" },
        { x1: 460, y1: 197, x2: 573, y2: 148, label: "teste" },
      ],
    },
  },
});
