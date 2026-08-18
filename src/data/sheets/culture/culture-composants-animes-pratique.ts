import { cultureSheet } from "./culture-common";

export const cultureComposantsAnimesPratique = cultureSheet({
  id: "culture-F27",
  number: 27,
  title: "Composants Animés en Pratique",
  subtitle: "Définitions, prototypes animés courants, CTA animés et composants complets — de la théorie à l'implémentation",
  badge: "Fiche F27",
  meta: ["4 nœuds"],
  readingTime: "30 min",
  description: "F26 couvre les fondements et les outils des animations. Cette fiche passe à la pratique : nommer précisément les types d'animation que l'on rencontre dans les interfaces modernes, reconnaître les prototypes animés de référence, implémenter des CTA animés qui convertissent sans nuire à l'accessibilité, et construire des composants animés courants (modal, skeleton, accordion, toast) de A à Z.",
  accent: "processus",

  nodes: {
    definitionsAnimations: {
      id: "definitionsAnimations",
      label: "Définitions et vocabulaire des animations",
      icon: "📖",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Dire "j'ai ajouté une animation" ne communique pas la même chose que "j'ai ajouté une micro-interaction de feedback sur le bouton de soumission". Sans vocabulaire précis, les conversations entre développeurs, designers et clients restent vagues — on discute de "effets sympas" au lieu de décider si une transition d'état de 200ms est pertinente à cet endroit. Maîtriser les définitions, c'est pouvoir discuter, spécifier et justifier les choix d'animation avec précision.</p>`,
        system: `<p>Ce vocabulaire s'appuie sur les principes généraux des animations couverts dans <span class="ref-fiche">→ F26</span> et sert de base pour comprendre les prototypes animés courants <span class="ref-fiche">→ prototypesAnimes</span>, les CTA <span class="ref-fiche">→ ctaAnimes</span> et les composants concrets <span class="ref-fiche">→ composantsConcrets</span>. Il s'inscrit dans le vocabulaire du design d'interface <span class="ref-fiche">→ D03</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le vocabulaire essentiel des animations d'interface :</p>
<p><strong>Micro-interaction :</strong> animation courte (50–300ms) déclenchée par une action précise de l'utilisateur. Elle confirme, guide ou répond à une interaction. Exemples : le "like" de Twitter/X qui pulse en rouge au clic, le bouton qui se compresse légèrement au press sur mobile, la coche qui apparaît après soumission d'un formulaire. Une micro-interaction doit être invisible quand elle fonctionne bien — l'utilisateur la ressent sans la remarquer.</p>
<p><strong>Transition d'état :</strong> animation qui accompagne le passage d'un composant d'un état à un autre (idle → loading, collapsed → expanded, default → error). Elle rend le changement lisible en montrant le "comment" plutôt qu'une substitution brutale. Exemples : un accordéon qui s'ouvre avec un glissement vertical, une carte qui bascule pour révéler son verso, un champ de formulaire dont la bordure passe du gris au rouge avec un léger shake.</p>
<p><strong>Animation d'entrée / sortie (mount/unmount) :</strong> anime l'apparition et la disparition d'éléments dans le DOM. C'est le cas le plus difficile en CSS pur (un élément supprimé du DOM disparaît instantanément) — c'est pourquoi Framer Motion et ses équivalents existent. Exemples : une modal qui entre depuis le bas, un toast qui glisse depuis un bord, un dropdown qui se déploie.</p>
<p><strong>Skeleton screen (écran squelette) :</strong> placeholder animé qui imite la structure du contenu en cours de chargement, avant que les données réelles n'arrivent. Composé de blocs gris avec une animation de shimmer (balayage lumineux de gauche à droite). Il est préférable au spinner dans la plupart des cas car il réduit la perception de l'attente en montrant la forme du contenu à venir. Exemples : les cartes LinkedIn qui chargent, les posts Facebook en attente.</p>
<p><strong>Stagger (décalage) :</strong> animation d'une liste d'éléments avec un décalage progressif entre chaque — le premier entre à t=0ms, le second à t=50ms, le troisième à t=100ms. Le résultat est une vague visuelle qui guide l'œil et évite l'entrée simultanée de tous les éléments, qui produirait une flash visuelle.</p>
<p><strong>Spring animation (animation de ressort) :</strong> animation basée sur la physique d'un ressort au lieu d'une courbe d'easing fixe. Elle produit un dépassement (overshoot) naturel — l'élément dépasse légèrement sa position finale avant de se stabiliser. Plus naturelle que les easings linéaires pour les mouvements importants. Disponible dans Framer Motion (<code>type: "spring"</code>), React Spring, et CSS (<code>linear()</code> avec valeurs calculées).</p>
<p><strong>Lottie :</strong> format d'animation vectorielle exporté depuis Adobe After Effects via le plugin Bodymovin, lu par la librairie Lottie (lottiefiles.com). Permet des animations complexes (illustrations qui s'animent, icônes animées) sans code CSS/JS — l'animation est décrite dans un fichier JSON. Avantage : animations complexes sans développement. Inconvénient : fichiers parfois lourds, rendu dépendant de la librairie Lottie (~30 Ko gzippé).</p>
<p><strong>View Transitions API :</strong> API navigateur native (Chrome 111+, Firefox en cours) qui anime les transitions entre deux états de page ou de DOM avec une ligne de code : <code>document.startViewTransition(() => updateDOM())</code>. Le navigateur capture un snapshot avant/après et anime automatiquement la différence. Particulièrement puissante pour les transitions entre pages dans les SPA ou les MPAs.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise le bon terme pour décrire une animation dans une PR ou une spécification. Écrire "ajouter une micro-interaction de press sur les boutons primaires (scale 0.97, 100ms ease-in)" est une spécification actionnable. Écrire "rendre les boutons plus vivants" ne l'est pas. La précision du vocabulaire réduit les allers-retours entre design et développement de 50%.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre transition et animation :</strong> en CSS, <code>transition</code> anime le changement d'une valeur entre deux états (déclencheur requis). <code>animation</code> avec <code>@keyframes</code> définit une séquence indépendante (pas de déclencheur requis, peut se répéter). Les utiliser de façon interchangeable produit des comportements inattendus — par exemple utiliser <code>animation</code> pour un hover effect quand <code>transition</code> est plus simple et approprié.</p>
<p><strong>Pattern 2 — Utiliser un skeleton pour tous les états de chargement :</strong> un skeleton est pertinent quand la structure du contenu est connue et prévisible (liste de cartes, profil utilisateur). Pour un contenu de forme variable (résultats de recherche de longueur inconnue, graphiques dynamiques), un spinner ou un état de chargement générique est plus honnête.</p>
<p><strong>Pattern 3 — Implémenter Lottie pour des animations que CSS pourrait gérer :</strong> utiliser Lottie (~30 Ko) pour une icône qui tourne ou un simple loader. Lottie est justifié pour des animations vectorielles complexes (onboarding illustré, icônes expressives multi-étapes). Pour une animation simple, CSS ou SVG animé en natif est plus léger et plus maintenable.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les nouvelles APIs (View Transitions, scroll-driven animations, CSS Anchor Positioning), les outils (Lottie évolue, de nouveaux formats d'animation vectorielle émergent). <strong>Ce qui ne change pas :</strong> les catégories conceptuelles (micro-interaction, transition d'état, mount/unmount, skeleton, stagger, spring) restent valides quel que soit l'outil. Ce sont des intentions de design, pas des API.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier et nommer les animations d'une interface réelle",
              etapes: [
                "Ouvre GitHub, Notion, ou Stripe Dashboard. Explore l'interface en effectuant des actions : cliquer des boutons, ouvrir des menus, soumettre des formulaires, naviguer entre pages.",
                "Pour chaque animation observée, identifie son type parmi : micro-interaction, transition d'état, entrée/sortie (mount/unmount), skeleton, stagger, spring.",
                "Estime la durée de chaque animation (utilise les DevTools → onglet Animations dans Chrome pour voir les valeurs réelles).",
                "Pour les 3 animations les plus significatives, écris une spécification de 2 lignes : 'Cette [type] dure [durée] avec un easing [easing] et se déclenche quand [trigger].'",
              ],
              output: "Catalogue de 5 animations d'une interface réelle, avec type, durée et spécification.",
              critere: "Chaque animation doit être nommée avec un terme précis du vocabulaire, pas avec 'effet', 'animation cool' ou 'transition'.",
            },
          ],
          piege: "Traiter le vocabulaire des animations comme théorique. En pratique, nommer précisément une animation dans une issue GitHub ou une conversation Figma élimine une round-trip de clarification qui prend en moyenne 2 jours. Le ROI du vocabulaire précis est immédiat et mesurable.",
        },
        verification: [
          "Quelle est la différence entre une micro-interaction et une transition d'état ? Donnez un exemple de chacune dans un composant de formulaire de connexion.",
          "Pourquoi un skeleton screen est-il perçu comme plus rapide par les utilisateurs qu'un spinner centré, même si les deux affichent le contenu au même moment ?",
          "Dans quels cas utiliser la View Transitions API native du navigateur est-il préférable à Framer Motion pour animer des transitions de page ?",
        ],
      },
    },

    prototypesAnimes: {
      id: "prototypesAnimes",
      label: "Exemples de prototypes animés courants",
      icon: "🎭",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Les composants animés les plus courants — hamburger menu, accordéon, carousel, progress indicator, skeleton loader — sont suffisamment standards pour avoir des patterns établis. Réinventer chacun d'eux from scratch est une perte de temps et une source d'inconsistances. Reconnaître ces patterns, comprendre pourquoi chacun est animé de la façon dont il l'est, et savoir lequel choisir selon le contexte : c'est la compétence qui permet de produire des interfaces cohérentes rapidement.</p>`,
        system: `<p>Ces prototypes sont des applications des définitions <span class="ref-fiche">→ definitionsAnimations</span> et des techniques CSS/JS de <span class="ref-fiche">→ F26</span>. Ils correspondent aux composants de l'Atomic Design <span class="ref-fiche">→ F25</span> (les organismes et molécules les plus courants). Leur implémentation détaillée est dans les composants concrets <span class="ref-fiche">→ composantsConcrets</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les prototypes animés courants et leurs caractéristiques :</p>
<p><strong>Hamburger menu → X :</strong> icône de trois traits horizontaux qui se transforme en croix à l'ouverture du menu. C'est une transition d'état qui communique "le menu est ouvert" par la forme elle-même. Implémentation : les 3 barres sont des éléments indépendants. À l'ouverture : la barre centrale disparaît (opacity 0), les barres haute et basse pivotent de ±45° sur leur centre. Durée : 250ms ease-in-out. Le résultat visuel montre la relation entre l'icône et l'état du menu.</p>
<p><strong>Accordéon / Disclosure :</strong> contenu qui se déploie et se replie verticalement. L'animation d'ouverture révèle le contenu avec un ease-out (décélère en arrivant). L'animation de fermeture accélère avec un ease-in (part rapidement). Problème classique : animer <code>height: 0</code> vers <code>height: auto</code> ne fonctionne pas en CSS. Solutions modernes : CSS <code>grid-template-rows: 0fr</code> vers <code>1fr</code> (la solution CSS pure la plus élégante), ou JavaScript pour mesurer la hauteur réelle avant l'animation.</p>
<p><strong>Progress bar et stepper :</strong> deux composants distincts. La progress bar indique l'avancement continu (upload, chargement) — elle se remplit via un <code>transform: scaleX()</code> avec <code>transform-origin: left</code>. Le stepper indique les étapes d'un processus (formulaire multi-étapes, onboarding) — la transition entre étapes se fait avec un slide horizontal ou un fade. La distinction est importante : la progress bar est un feedback temps réel, le stepper est une navigation de structure.</p>
<p><strong>Skeleton loader :</strong> structure de placeholder qui imite la mise en page du contenu à venir. Chaque bloc (titre, image, texte) est représenté par un rectangle gris avec un gradient animé qui "balaye" de gauche à droite (shimmer). CSS : un <code>background</code> avec <code>linear-gradient</code> et <code>background-position</code> animé de -100% à 200%. Deux règles d'usage : utiliser uniquement pour des structures connues et répétables, et remplacer le skeleton par le contenu réel avec un fade-in court (150ms) pour éviter le flash.</p>
<p><strong>Toast / Snackbar :</strong> notification éphémère qui entre, reste visible quelques secondes, puis sort automatiquement. L'entrée se fait depuis un bord (généralement en bas à droite ou en haut) avec un slide + fade. La sortie inverse la direction. La durée d'affichage varie (3–8 secondes selon l'importance). Le staggering s'applique quand plusieurs toasts sont empilés — chaque nouveau toast décale les précédents vers le haut. Composant complexe car il gère son propre cycle de vie (timer, sortie animée avant suppression du DOM).</p>
<p><strong>Modal / Dialog :</strong> fenêtre superposée qui entre généralement avec un scale-up (scale 0.95 → 1) et un fade-in simultanés. L'overlay (fond sombre) a son propre fade-in. La sortie inverse. La difficulté : gérer le focus trap (l'accessibilité exige que le focus clavier reste dans la modal ouverte) et la désactivation du scroll du body. Ces contraintes d'accessibilité sont souvent oubliées quand on code une modal from scratch — c'est pourquoi Radix UI Dialog est préférable pour la plupart des projets.</p>
<p><strong>Carousel / Slider :</strong> suite d'éléments dont un seul est visible à la fois, avec navigation horizontale. La transition entre slides se fait par un translateX(-100%) → translateX(0%) pour la slide entrante et translateX(0%) → translateX(100%) pour la sortante — animés simultanément. Piège courant : le carousel qui tourne automatiquement sans pause au hover est une nuisance d'accessibilité (WCAG 2.2, critère 2.2.2). Si le carousel tourne automatiquement, il doit avoir un contrôle de pause accessible.</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit les composants de sa librairie UI (Radix UI, shadcn/ui, Headless UI, Mantine) pour les composants complexes comme les modals, les selects et les tooltips. Ces librairies gèrent correctement l'accessibilité (focus trap, ARIA, keyboard navigation) après des années de test et de corrections. Reconstruire une modal from scratch pour "mieux contrôler l'animation" et oublier le focus trap ou le rôle ARIA est un anti-pattern courant — l'animation peut être personnalisée dans la couche CSS, l'accessibilité doit être fournie par la librairie.</p>`,
        errors: `<p><strong>Pattern 1 — Accordéon avec height:auto non animable :</strong> la tentative la plus courante de débutant. <code>transition: height 300ms</code> avec <code>height: auto</code> ne produit aucune animation. La solution CSS moderne est <code>grid-template-rows: 0fr</code> → <code>1fr</code> sur un conteneur grid. La solution JavaScript est de mesurer la <code>scrollHeight</code> puis d'animer vers cette valeur précise.</p>
<p><strong>Pattern 2 — Skeleton avec une durée d'animation shimmer trop rapide ou trop lente :</strong> un shimmer à 500ms semble agité, un shimmer à 2500ms semble figé. La durée optimale pour le shimmer est entre 1200ms et 1800ms pour imiter la fluidité d'un chargement naturel. La valeur par défaut de la plupart des librairies (Chakra, MUI) est autour de 1500ms — s'y aligner est raisonnable.</p>
<p><strong>Pattern 3 — Toast sans gestion du focus et du stacking :</strong> quand plusieurs toasts s'empilent, les gérer sans un système de file d'attente produit des chevauchements visuels. Les librairies de toast (react-hot-toast, Sonner, react-toastify) gèrent le stacking, l'accessibilité (rôle <code>alert</code> ou <code>status</code>), et les timers automatiquement — les réimplémenter sans ces aspects crée des bugs d'accessibilité et d'UX.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les librairies préférées de chaque époque, les conventions de placement (toast en bas à droite vs en haut au centre), les paradigmes d'animation (spring vs easing). <strong>Ce qui ne change pas :</strong> les problèmes que ces patterns résolvent (révéler du contenu caché, informer sans interrompre, guider vers une étape) ; les contraintes d'accessibilité (focus trap pour les modals, rôle ARIA pour les toasts, pause pour les carousels automatiques).</p>`,
        practice: {
          exercices: [
            {
              titre: "Reproduire 3 prototypes animés courants",
              etapes: [
                "Reproduis une progress bar animée : une barre qui se remplit de 0% à 100% en 2 secondes en utilisant <code>transform: scaleX()</code> avec <code>transform-origin: left</code>. Déclenche l'animation avec un bouton.",
                "Implémente un skeleton loader pour une carte à 3 lignes : rectangle image (largeur 100%, hauteur 120px), ligne titre (largeur 70%), ligne description (largeur 90%). Ajoute l'animation shimmer en CSS.",
                "Crée l'animation hamburger → X : 3 barres qui se transforment en croix. La barre centrale s'efface, les barres haute et basse pivotent de ±45°. Durée 250ms ease-in-out.",
                "Pour chaque prototype, vérifie qu'il respecte <code>prefers-reduced-motion</code> : le shimmer doit s'arrêter, la progress bar et le hamburger doivent changer d'état sans animation.",
              ],
              output: "3 prototypes animés fonctionnels avec gestion prefers-reduced-motion.",
              critere: "Aucun prototype ne doit animer <code>width</code>, <code>height</code>, <code>top</code> ou <code>left</code>. Seuls <code>transform</code> et <code>opacity</code> sont autorisés.",
            },
          ],
          piege: "Utiliser une librairie de composants pour apprendre comment un prototype est animé. Pour apprendre, reproduire from scratch force la compréhension de chaque propriété CSS. Une fois les mécanismes compris, utiliser la librairie en production pour bénéficier de l'accessibilité intégrée.",
        },
        verification: [
          "Pourquoi <code>height: auto</code> ne peut-il pas être animé avec CSS <code>transition</code>, et quelle est la solution CSS moderne pour animer un accordéon sans JavaScript ?",
          "Quel rôle ARIA doit avoir un toast de notification pour être accessible, et quelle est la différence entre les rôles <code>alert</code> et <code>status</code> selon l'urgence du message ?",
          "Nommez deux contraintes d'accessibilité obligatoires pour une modal (dialog) correctement implémentée, et expliquez pourquoi reconstruire une modal from scratch uniquement pour personnaliser son animation est un risque.",
        ],
      },
    },

    ctaAnimes: {
      id: "ctaAnimes",
      label: "Création de CTA animés",
      icon: "🎯",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un CTA (Call To Action) est l'élément le plus important d'une page du point de vue de la conversion — c'est lui qui déclenche l'inscription, l'achat, le téléchargement. Animer un CTA peut augmenter le taux de clic de 15 à 30% selon les études A/B, mais peut aussi distraire et réduire la confiance si l'animation est mal exécutée. La différence entre un CTA animé qui convertit et un qui repousse tient à quelques règles précises : pertinence de l'animation, timing, et accessibilité.</p>`,
        system: `<p>Les CTA animés mobilisent les techniques CSS de <span class="ref-fiche">→ F26</span>, les définitions de micro-interactions <span class="ref-fiche">→ definitionsAnimations</span>, et s'inscrivent dans la conception des composants <span class="ref-fiche">→ F25</span>. Ils impactent directement les métriques de conversion mesurées en <span class="ref-fiche">→ C06</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les patterns de CTA animés efficaces :</p>
<p><strong>Pattern 1 — Hover lift (élévation au survol) :</strong> le bouton se soulève légèrement au survol avec une ombre qui s'accentue. Donne une impression de profondeur et de réactivité physique. Implémentation :</p>
<pre>
.cta-button {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition:
    transform 200ms ease-out,
    box-shadow 200ms ease-out;
}
.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
.cta-button:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</pre>
<p>L'état <code>:active</code> qui recule légèrement simule le press physique — crucial pour le feedback sur mobile.</p>
<p><strong>Pattern 2 — Gradient shimmer (reflet animé) :</strong> un reflet lumineux qui traverse le bouton en boucle lente, attirant l'œil vers l'action principale. Doit être subtil (opacité 0.15–0.25 max) et lent (2–3s de cycle) pour rester élégant. Implémentation avec <code>background</code> gradient animé en position. Règle : utiliser uniquement sur le CTA principal de la page — sur plusieurs éléments, le shimmer crée une compétition visuelle.</p>
<pre>
.cta-shimmer {
  position: relative;
  overflow: hidden;
}
.cta-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255,255,255,0.2) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: shimmer 2.5s ease-in-out infinite;
}
@keyframes shimmer {
  0%   { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
</pre>
<p><strong>Pattern 3 — Pulse (pulsation) :</strong> un halo qui s'étend depuis le bouton en boucle, attirant l'attention sur un CTA secondaire ou une action urgente. Réservé aux situations où l'utilisateur doit remarquer l'élément (alerte, action limitée dans le temps). Implémentation : un pseudo-élément <code>::before</code> qui s'agrandit et se dissout avec <code>scale(1)</code> → <code>scale(1.8)</code> et <code>opacity: 1</code> → <code>0</code>.</p>
<p><strong>Pattern 4 — Loading state dans le bouton :</strong> au clic, le bouton se transforme en indicateur de chargement, puis en état de succès ou d'erreur. Ce pattern est particulièrement important sur les formulaires de paiement et d'inscription — il empêche les doubles soumissions et communique l'état en temps réel. Séquence : clic → <code>disabled</code> + spinner → succès (checkmark avec scale-in) ou erreur (shake horizontal).</p>
<p><strong>Pattern 5 — Arrow slide (flèche qui glisse) :</strong> une flèche dans le bouton qui glisse vers la droite au survol, suggérant le mouvement vers l'avant. Courant sur les boutons "Découvrir", "En savoir plus", "Continuer". Implémentation : la flèche (<code>→</code>) se déplace de quelques pixels vers la droite avec <code>translateX(4px)</code> au hover.</p>
<p><strong>Ce qu'il faut éviter sur les CTA :</strong> animations qui se répètent automatiquement sans interaction (le bouton qui pulse en permanence dans la page est une distraction, pas un guide) ; animations trop longues sur l'état de chargement (si le spinner tourne plus de 3 secondes, communiquer une progression) ; effets 3D lourds qui ralentissent le rendu sur mobile.</p>`,
        },
        senior: `<p>Un développeur expérimenté A/B teste les CTA animés avant de les déployer à grande échelle. Une animation qui semble meilleure visuellement peut réduire les clics si elle génère une anxiété ou une distraction dans le contexte spécifique de la page. Les outils de heat mapping (Hotjar, Clarity) révèlent si les utilisateurs regardent le CTA sans cliquer — souvent le signe que l'animation attire l'œil sans déclencher l'action. L'intuition design ne remplace pas la mesure.</p>`,
        errors: `<p><strong>Pattern 1 — CTA animé sans état :focus visible :</strong> personnaliser l'animation hover du CTA sans préserver ou renforcer l'indicateur de focus clavier. L'état <code>:focus-visible</code> est une obligation d'accessibilité (WCAG 2.4.11). Un CTA avec <code>outline: none</code> et aucune alternative de focus est inaccessible pour les utilisateurs au clavier. La règle : l'animation hover peut être distincte de l'état focus, mais le focus doit rester visible.</p>
<p><strong>Pattern 2 — Shimmer sur plusieurs CTA simultanément :</strong> appliquer le gradient shimmer à chaque bouton important de la page. Résultat : la page entière scintille, l'animation perd son rôle de guidage attentionnel, et l'effet visuel devient du bruit. Le shimmer est un outil de hiérarchie — il n'a de valeur que s'il est rare.</p>
<p><strong>Pattern 3 — Loading state qui ne gère pas les erreurs :</strong> implémenter le bouton qui passe en mode spinner sans gérer le cas d'erreur. Si l'API répond avec une erreur, le bouton reste bloqué en état spinner. L'état de chargement doit systématiquement avoir un timeout et un état d'erreur explicite avec possibilité de retenter.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les tendances de design des CTA (neumorphisme, glassmorphisme, gradients, solides), les métriques de performance mesurées. <strong>Ce qui ne change pas :</strong> le feedback immédiat au clic (état active/press) est non négociable ; le focus clavier doit être visible ; un état de chargement doit avoir un état d'erreur correspondant ; la rareté de l'animation est ce qui lui confère son pouvoir d'attraction.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer un CTA animé avec tous ses états",
              etapes: [
                "Crée un bouton CTA primaire avec le pattern hover lift : <code>translateY(-3px)</code> au hover, <code>translateY(-1px)</code> au press (<code>:active</code>). Durée 200ms, easing ease-out.",
                "Ajoute le gradient shimmer sur ce même bouton avec un cycle de 2.5s. Vérifie que l'opacité du shimmer est ≤ 0.25 pour rester subtil.",
                "Implémente le loading state : au clic, remplacer le texte par un spinner CSS (cercle avec border-top coloré qui tourne en linear infinite). Le bouton doit être désactivé (<code>pointer-events: none</code>) pendant ce state.",
                "Ajoute un état de succès après 1.5s de simulation de chargement : le spinner est remplacé par une coche (✓) avec un scale-in de 200ms.",
                "Ajoute la gestion <code>prefers-reduced-motion</code> : supprimer le shimmer et la transition hover lift, mais conserver le changement de couleur pour le feedback.",
              ],
              output: "Bouton CTA avec états : default, hover (lift + shimmer), press, loading (spinner), success (checkmark), prefers-reduced-motion.",
              critere: "Chaque état doit avoir une durée et un easing définis. L'état focus-visible doit être visible avec un outline ou une alternative. Le shimmer doit être stoppé avec prefers-reduced-motion.",
            },
          ],
          piege: "Mesurer la qualité d'un CTA uniquement par son apparence visuelle. Un CTA esthétiquement parfait avec un état de chargement qui ne gère pas l'erreur API est un composant incomplet. Les états anormaux (erreur, timeout, double-click) définissent la robustesse d'un composant autant que l'état nominal.",
        },
        verification: [
          "Pourquoi l'état <code>:active</code> qui recule légèrement (translateY de -3px → -1px) est-il important pour le feedback tactile sur mobile, même si l'animation est très courte ?",
          "Un CTA avec un gradient shimmer en boucle permanente est présenté à un utilisateur qui parcourt une page de vente avec 5 CTAs. Quel problème de hiérarchie attentionnelle cela crée-t-il, et comment le corriger ?",
          "Un bouton CTA passe en état loading après un clic. L'API met 15 secondes à répondre. Décrivez les états successifs que le composant doit gérer et les messages à afficher à l'utilisateur.",
        ],
      },
    },

    composantsConcrets: {
      id: "composantsConcrets",
      label: "Créer des composants animés concrets",
      icon: "🔨",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Les exercices sur des composants génériques ne suffisent pas — la compétence s'acquiert en construisant des composants réels avec toutes leurs contraintes : accessibilité, états multiples, interaction avec l'extérieur, gestion du cycle de vie. Ce nœud guide l'implémentation pas-à-pas de quatre composants animés courants dans une application fullstack : une modal, un accordion, un toast, et un skeleton loader de données API.</p>`,
        system: `<p>Ces composants concrets appliquent les techniques CSS et JS de <span class="ref-fiche">→ F26</span>, les prototypes courants <span class="ref-fiche">→ prototypesAnimes</span>, et les patterns de CTA <span class="ref-fiche">→ ctaAnimes</span>. Ils s'inscrivent dans l'architecture frontend décrite dans <span class="ref-fiche">→ T08</span> et préparent à la contribution à un design system <span class="ref-fiche">→ D04</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les 4 composants à construire et leurs caractéristiques :</p>
<p><strong>Composant 1 — Modal animée :</strong></p>
<pre>
// Comportement :
// - Entrée : overlay fade-in 200ms + contenu scale(0.95)→scale(1) + fade-in 250ms
// - Sortie : overlay fade-out 150ms + contenu scale(1)→scale(0.95) + fade-out 200ms
// - Fermeture : clic overlay, touche Escape, bouton close
// - Accessibilité : focus trap, rôle dialog, aria-labelledby, scroll body désactivé

// En React avec Framer Motion :
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ isOpen, onClose, title, children }) {
  return (
    &lt;AnimatePresence&gt;
      {isOpen &amp;&amp; (
        &lt;&gt;
          &lt;motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          /&gt;
          &lt;motion.dialog
            role="dialog"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          &gt;
            &lt;h2 id="modal-title"&gt;{title}&lt;/h2&gt;
            {children}
          &lt;/motion.dialog&gt;
        &lt;/&gt;
      )}
    &lt;/AnimatePresence&gt;
  );
}
</pre>
<p><strong>Composant 2 — Accordion CSS pur :</strong></p>
<pre>
/* Solution moderne avec CSS grid */
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;           /* collapsed */
  transition: grid-template-rows 300ms ease-out;
  overflow: hidden;
}

.accordion-content.open {
  grid-template-rows: 1fr;           /* expanded */
}

.accordion-content &gt; div {
  min-height: 0;                     /* nécessaire pour grid-template-rows: 0fr */
}

/* Icône chevron */
.chevron {
  transition: transform 300ms ease-out;
}
.accordion-item.open .chevron {
  transform: rotate(180deg);
}
</pre>
<p><strong>Composant 3 — Toast avec stagger :</strong> système de toasts empilés avec entrée depuis le coin inférieur droit, stagger de 60ms entre chaque, et sortie automatique après 4 secondes. En React, utiliser un contexte (ToastContext) pour déclencher les toasts depuis n'importe quel composant. Chaque toast a un timer individuel, un bouton de fermeture, et un rôle ARIA (<code>role="status"</code> pour les infos, <code>role="alert"</code> pour les erreurs).</p>
<p><strong>Composant 4 — Skeleton loader alimenté par API :</strong> afficher un skeleton pendant le fetch, remplacer avec les données réelles avec un fade-in. Structure :</p>
<pre>
function ProductCard({ productId }) {
  const { data, isLoading } = useProduct(productId);

  if (isLoading) return &lt;ProductCardSkeleton /&gt;;

  return (
    &lt;motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    &gt;
      &lt;ProductCardContent data={data} /&gt;
    &lt;/motion.div&gt;
  );
}

function ProductCardSkeleton() {
  return (
    &lt;div className="skeleton-card"&gt;
      &lt;div className="skeleton skeleton-image" /&gt;
      &lt;div className="skeleton skeleton-title" /&gt;
      &lt;div className="skeleton skeleton-text" /&gt;
    &lt;/div&gt;
  );
}
</pre>`,
        },
        senior: `<p>Un développeur expérimenté extrait les animations dans un fichier de variants Framer Motion partagé, pas inline dans chaque composant. <code>export const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.25 } }</code>. Tous les composants qui font un fade-up importent le même variant — un changement de timing se propage partout. C'est l'équivalent des tokens d'animation mentionnés en F26, mais au niveau code.</p>`,
        errors: `<p><strong>Pattern 1 — Accordion sans <code>overflow: hidden</code> :</strong> implémenter l'animation d'ouverture d'accordion sans <code>overflow: hidden</code> sur le conteneur. Le contenu déborde pendant l'animation au lieu de rester caché jusqu'à ce que le conteneur soit assez grand pour l'accueillir. L'overflow est la propriété qui contrôle la visibilité du contenu pendant l'interpolation.</p>
<p><strong>Pattern 2 — Skeleton avec des dimensions qui ne correspondent pas au contenu réel :</strong> créer un skeleton avec des proportions inventées qui ne correspondent pas à la taille réelle du contenu. Quand les données chargent, le layout se réorganise brutalement (layout shift). La règle : le skeleton doit avoir exactement les mêmes dimensions que le composant avec données réelles.</p>
<p><strong>Pattern 3 — Toast sans cleanup des timers :</strong> créer un toast avec <code>setTimeout</code> pour la fermeture automatique sans nettoyer le timer si le composant est démonté avant. Conséquence : erreur React sur un composant démonté, potentiels memory leaks. Utiliser <code>useEffect</code> avec sa fonction de cleanup : <code>return () => clearTimeout(timerId)</code>.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les APIs CSS disponibles (grid animation, <code>@starting-style</code>, View Transitions), les librairies React d'animation. <strong>Ce qui ne change pas :</strong> les exigences d'accessibilité (focus trap pour les modals, rôles ARIA pour les toasts, keyboard navigation pour les accordéons) ; la nécessité d'un skeleton aux dimensions exactes pour éviter le layout shift ; le cleanup des effets de bord (timers, listeners) dans les animations pilotées par JavaScript.</p>`,
        practice: {
          exercices: [
            {
              titre: "Implémenter un accordion animé accessible",
              etapes: [
                "Crée une liste de 4 accordéons avec titre et contenu. Sans JavaScript pour l'animation — utiliser CSS grid (<code>grid-template-rows: 0fr</code> → <code>1fr</code>) et une classe togglée par JavaScript.",
                "Ajoute l'animation du chevron (<code>rotate(0deg)</code> → <code>rotate(180deg)</code>) synchronisée avec l'ouverture.",
                "Rends l'accordion accessible : ajouter <code>aria-expanded</code> sur le bouton trigger, <code>aria-controls</code> pointant vers le panneau, et <code>role='region'</code> sur le panneau.",
                "Teste la navigation clavier : le trigger doit être focusable avec Tab, activable avec Enter et Space.",
                "Ajoute la gestion <code>prefers-reduced-motion</code> : l'ouverture/fermeture doit être instantanée (transition: none) mais fonctionnelle.",
              ],
              output: "Accordion animé fonctionnel : animation CSS grid, chevron synchronisé, attributs ARIA, navigation clavier, prefers-reduced-motion.",
              critere: "L'accordion doit fonctionner sans JavaScript pour l'animation (CSS grid uniquement). Les attributs ARIA doivent être mis à jour dynamiquement à chaque ouverture/fermeture.",
            },
          ],
          piege: "Implémenter les composants animés dans l'ordre difficile (modal en premier) au lieu de l'ordre pédagogique (accordion sans JS en premier, puis skeleton, puis toast, puis modal avec Framer Motion). L'accordion est la base — il force la compréhension des limitations CSS (height:auto non animable) et de la solution moderne (grid-template-rows) sans dépendances externes.",
        },
        verification: [
          "Expliquez pourquoi la technique <code>grid-template-rows: 0fr</code> → <code>1fr</code> résout le problème de l'animation d'accordion que <code>height: 0</code> → <code>height: auto</code> ne peut pas résoudre.",
          "Un skeleton loader a des proportions différentes du contenu réel qu'il remplace. Quel problème de performance perçue cela crée-t-il, et quel outil Chrome DevTools permet de mesurer ce problème ?",
          "Dans un système de toasts en React, pourquoi est-il nécessaire de nettoyer le <code>setTimeout</code> dans le cleanup de <code>useEffect</code>, et que se passe-t-il si on ne le fait pas ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "definitionsAnimations", x: 10, y: 100, w: 195, h: 65 },
        { id: "prototypesAnimes", x: 270, y: 40, w: 175, h: 65 },
        { id: "ctaAnimes", x: 270, y: 165, w: 155, h: 65 },
        { id: "composantsConcrets", x: 570, y: 100, w: 185, h: 65 },
      ],
      edges: [
        { x1: 205, y1: 120, x2: 268, y2: 72, label: "nomme" },
        { x1: 205, y1: 148, x2: 268, y2: 197, label: "guide" },
        { x1: 445, y1: 72, x2: 568, y2: 120, label: "applique" },
        { x1: 425, y1: 197, x2: 568, y2: 148, label: "compose" },
      ],
    },
  },
});
