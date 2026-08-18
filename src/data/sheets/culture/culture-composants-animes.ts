import { cultureSheet } from "./culture-common";

export const cultureComposantsAnimes = cultureSheet({
  id: "culture-F26",
  number: 26,
  title: "Créer un Composant Animé",
  subtitle: "Animations CSS et JavaScript — donner du mouvement à une interface sans nuire à la lisibilité ni aux performances",
  badge: "Fiche F26",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description: "Une animation bien conçue guide l'attention, confirme une action, révèle une relation spatiale. Une animation mal conçue distrait, désactive les utilisateurs photosensibles et détruit les performances. Cette fiche couvre les fondements des animations CSS (transitions, keyframes), les animations pilotées par JavaScript, les bibliothèques d'animation modernes, et les règles d'accessibilité et de performance qui distinguent une animation professionnelle d'un effet décoratif.",
  accent: "modele",

  nodes: {
    fondamentsAnimation: {
      id: "fondamentsAnimation",
      label: "Pourquoi et quand animer",
      icon: "🎬",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une interface sans animation est une interface muette — elle n'informe pas l'utilisateur de ce qui vient de se passer, de ce qui est en train de changer, ou de la relation entre deux éléments. Un élément qui apparaît sans transition ne laisse pas le temps à l'œil de le localiser. Une action dont le résultat est instantané ne confirme pas qu'elle a bien été effectuée. Les animations existent pour rendre les interfaces plus lisibles et plus réactives — pas pour les rendre plus "jolies".</p>`,
        system: `<p>Les animations s'appliquent directement aux composants créés en <span class="ref-fiche">→ F25</span>. Elles interagissent avec les états de l'interface (loading, error, empty) décrits dans <span class="ref-fiche">→ D03</span>, et ont des implications sur les performances <span class="ref-fiche">→ P03</span> et l'accessibilité <span class="ref-fiche">→ D03</span>. Elles mobilisent les connaissances sur les composants CSS côté frontend <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les bons et mauvais usages des animations :</p>
<p><strong>Usages qui justifient une animation :</strong></p>
<p><em>Feedback d'action :</em> un bouton qui s'anime légèrement au clic confirme que l'action a été reçue. Un formulaire soumis qui affiche un spinner communique "je traite". Sans ces feedbacks, l'utilisateur clique plusieurs fois ou doute.</p>
<p><em>Transition d'état :</em> un composant qui passe de "chargement" à "données disponibles" avec un fade-in évite l'apparition brutale qui désorienterait l'œil. La continuité visuelle aide à comprendre le changement.</p>
<p><em>Hiérarchie spatiale :</em> un menu qui glisse depuis le bord révèle sa relation spatiale avec le bouton qui l'a ouvert. Un tooltip qui apparaît près du curseur indique qu'il est lié à cet élément. Le mouvement communique la structure.</p>
<p><em>Guidage de l'attention :</em> un élément qui pulse doucement signale qu'il nécessite une action. Une notification qui entre depuis le coin supérieur informe sans interrompre le flux principal.</p>
<p><strong>Usages à éviter :</strong></p>
<p><em>Animation décorative :</em> animer des éléments uniquement pour "donner vie à l'interface" sans que l'animation porte une information. Chaque animation a un coût cognitif — elle capte l'attention. Animer sans raison vide ce capital.</p>
<p><em>Durées trop longues :</em> une animation de 800ms sur un bouton transforme chaque interaction en attente. Les animations d'interface doivent être entre 100ms (micro-interactions) et 300ms (transitions). Au-delà, l'utilisateur perçoit de la lenteur.</p>
<p><em>Animations en boucle permanente :</em> des éléments qui bougent continuellement (texte qui défile, icônes qui tournent sans raison) empêchent la concentration. Les animations en boucle ne sont justifiées que pendant un état actif (chargement en cours).</p>`,
        },
        senior: `<p>Un développeur expérimenté teste toujours ses animations avec <code>prefers-reduced-motion</code> activé. Environ 35% des utilisateurs déclarent être dérangés par les animations d'interfaces — et une proportion significative souffre de troubles vestibulaires ou de photosensibilité pour qui certaines animations sont problématiques. La media query <code>@media (prefers-reduced-motion: reduce)</code> permet de désactiver ou réduire les animations pour ces utilisateurs, sans supprimer le feedback nécessaire.</p>`,
        errors: `<p><strong>Pattern 1 — Animation sur toute la page au chargement :</strong> faire entrer chaque section de la page avec une animation séquentielle "effet waouh". Résultat : l'utilisateur attend que les animations se terminent avant de pouvoir interagir, et toutes les interactions deviennent lentes. Les animations de chargement initial doivent être minimales et rapides.</p>
<p><strong>Pattern 2 — Ignorer prefers-reduced-motion :</strong> ne pas tester avec cette préférence système activée. Sur macOS, elle est dans Accessibilité → Mouvement → Réduire le mouvement. Sur Windows, dans Paramètres d'accessibilité. Si l'interface casse ou perd du feedback essentiel quand cette option est activée, les animations n'ont pas été conçues de façon inclusive.</p>
<p><strong>Pattern 3 — Animer des propriétés coûteuses :</strong> animer <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, <code>margin</code> ou <code>padding</code> déclenche un recalcul de layout (reflow) à chaque frame. Sur un écran à 60 fps, cela produit 60 reflows par seconde — potentiellement 600ms de blocage du thread principal sur des appareils mobiles. Animer uniquement <code>transform</code> et <code>opacity</code> qui sont gérées par le GPU sans reflow.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les librairies d'animation (Framer Motion, GSAP, Web Animations API, CSS animations), les conventions d'easing, les capacités des appareils. <strong>Ce qui ne change pas :</strong> les animations doivent porter une information ou un feedback — pas seulement décorer ; la durée recommandée reste entre 100ms et 300ms pour les transitions d'interface ; <code>transform</code> et <code>opacity</code> sont les propriétés performantes ; <code>prefers-reduced-motion</code> doit toujours être respecté.</p>`,
        practice: {
          exercices: [
            {
              titre: "Auditer les animations d'une interface existante",
              etapes: [
                "Ouvre une application web que tu utilises fréquemment. Observe chaque animation présente : entrées, sorties, états de chargement, feedbacks de clic.",
                "Pour chaque animation, identifie son rôle : feedback d'action, transition d'état, hiérarchie spatiale, guidage d'attention, ou décorative.",
                "Mesure les durées approximatives avec les DevTools (onglet Animations dans Chrome). Lesquelles dépassent 400ms ?",
                "Active la préférence 'Réduire le mouvement' dans les paramètres d'accessibilité de ton OS. Recharge la page. Qu'est-ce qui change ? Qu'est-ce qui aurait dû changer et ne l'a pas fait ?",
              ],
              output: "Audit de 5 animations : rôle identifié, durée mesurée, évaluation de la pertinence, état avec prefers-reduced-motion.",
              critere: "Toute animation classée 'décorative' doit être justifiée ou identifiée comme supprimable. La durée de chaque animation doit être comparée à la plage recommandée.",
            },
          ],
          piege: "Penser qu'une interface bien animée est une interface avec beaucoup d'animations. Le résultat inverse est souvent plus professionnel : quelques animations précises et rapides qui communiquent exactement ce dont l'utilisateur a besoin, dans un contexte de silence visuel qui les rend lisibles.",
        },
        verification: [
          "Nommez trois situations où une animation est justifiée fonctionnellement dans une interface web, et trois situations où elle est purement décorative et devrait être supprimée.",
          "Pourquoi animer <code>transform: translateX()</code> est-il beaucoup plus performant qu'animer <code>left: 100px</code> pour déplacer un élément, et quel mécanisme du navigateur explique cette différence ?",
          "Un utilisateur active 'Réduire le mouvement' dans ses paramètres système. Comment votre composant animé doit-il réagir, et pourquoi supprimer toutes les animations sans exception n'est pas la bonne approche ?",
        ],
      },
    },

    animationsCSS: {
      id: "animationsCSS",
      label: "Animations CSS : transitions et keyframes",
      icon: "🎨",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>CSS est la couche naturelle pour les animations d'interface — les transitions entre états, les apparitions d'éléments, les feedbacks de survol. Avant d'introduire JavaScript ou une bibliothèque, la majorité des animations nécessaires dans une interface web standard se font en pur CSS en quelques lignes. Comprendre les transitions et les keyframes, c'est avoir les outils pour animer 80% des cas sans dépendance externe.</p>`,
        system: `<p>Les animations CSS s'appliquent aux composants <span class="ref-fiche">→ F25</span> et interagissent directement avec les changements d'états produits par JavaScript. Elles s'appuient sur les fondements de l'animation <span class="ref-fiche">→ fondamentsAnimation</span> et sont complétées par les animations JavaScript pour les cas plus complexes <span class="ref-fiche">→ animationsJS</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les deux mécanismes CSS d'animation :</p>
<p><strong>Les transitions CSS (<code>transition</code>) :</strong> animent automatiquement le changement de valeur d'une propriété CSS d'un état A à un état B. Elles nécessitent un déclencheur (survol :hover, ajout d'une classe, changement d'état).</p>
<pre>
.button {
  background: blue;
  transform: scale(1);
  transition: background 200ms ease, transform 150ms ease;
}

.button:hover {
  background: darkblue;
  transform: scale(1.05);
}
</pre>
<p>Les propriétés de <code>transition</code> : durée (<code>200ms</code>), fonction d'easing (<code>ease</code>, <code>ease-in-out</code>, <code>linear</code>, <code>cubic-bezier(...)</code>), délai optionnel (<code>0ms</code>). Pour animer plusieurs propriétés, les séparer par des virgules ou utiliser <code>transition: all 200ms ease</code> (à éviter en production — anime toutes les propriétés, y compris celles non voulues).</p>
<p><strong>Les animations keyframes (<code>@keyframes</code>) :</strong> définissent une séquence d'états avec un timing précis. Contrairement aux transitions, elles ne nécessitent pas de déclencheur et peuvent se répéter.</p>
<pre>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-appear {
  animation: fadeIn 250ms ease-out forwards;
}
</pre>
<p>Les propriétés d'<code>animation</code> : nom (<code>fadeIn</code>), durée (<code>250ms</code>), easing (<code>ease-out</code>), délai (<code>0ms</code>), nombre de répétitions (<code>1</code> ou <code>infinite</code>), direction (<code>normal</code>, <code>reverse</code>), fill-mode (<code>forwards</code> conserve l'état final).</p>
<p><strong>Les fonctions d'easing :</strong> <code>ease</code> : lent → rapide → lent (naturel, usage général). <code>ease-in</code> : lent → rapide (pour les éléments qui sortent). <code>ease-out</code> : rapide → lent (pour les éléments qui entrent). <code>linear</code> : vitesse constante (pour les rotations en boucle). <code>cubic-bezier(x1, y1, x2, y2)</code> : courbe personnalisée. La règle intuitive : ease-out pour les entrées (l'élément décélère en arrivant = naturel), ease-in pour les sorties (l'élément accélère en partant = naturel).</p>
<p><strong>prefers-reduced-motion en CSS :</strong></p>
<pre>
@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
  .card-appear { animation: none; }
}
</pre>`,
        },
        senior: `<p>Un développeur expérimenté utilise la propriété <code>will-change: transform</code> avec parcimonie — elle signale au navigateur qu'un élément va être animé pour qu'il le place sur sa propre couche graphique (layer promotion). Utilisée sur trop d'éléments, elle consomme de la mémoire GPU et peut dégrader les performances au lieu de les améliorer. La règle : n'utiliser <code>will-change</code> qu'après avoir mesuré un problème de performance, pas de façon préventive sur tous les éléments animés.</p>`,
        errors: `<p><strong>Pattern 1 — Animer <code>width</code> ou <code>height</code> pour révéler un élément :</strong> <code>height: 0</code> vers <code>height: auto</code> ne fonctionne pas en CSS (les valeurs auto ne sont pas interpolables). Utiliser <code>max-height</code> comme substitut crée des timings imprévisibles. La solution moderne : <code>@starting-style</code> (CSS récent) ou une animation sur <code>transform: scaleY()</code> avec <code>transform-origin: top</code>.</p>
<p><strong>Pattern 2 — Utiliser <code>transition: all</code> :</strong> en appliquant <code>all</code>, toute propriété CSS qui change (y compris des propriétés que vous n'aviez pas prévu d'animer comme <code>color</code>, <code>border</code>, <code>outline</code>) sera animée. Cela produit des effets inattendus et des performances dégradées. Spécifier explicitement les propriétés à animer.</p>
<p><strong>Pattern 3 — Lier les animations à des classes ajoutées en JavaScript sans délai :</strong> ajouter une classe CSS d'animation juste après avoir inséré un élément dans le DOM. Le navigateur peut n'avoir pas encore rendu l'état initial avant d'appliquer la classe — l'animation ne se déclenche pas. Solution : forcer un reflow (<code>element.offsetHeight</code>) ou utiliser <code>requestAnimationFrame</code> avant d'ajouter la classe.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les nouvelles propriétés CSS d'animation (View Transitions API, <code>@starting-style</code>, scroll-driven animations), les outils de débogage. <strong>Ce qui ne change pas :</strong> les propriétés performantes (<code>transform</code> et <code>opacity</code>) ; les fonctions d'easing et leur intention (ease-in pour sorties, ease-out pour entrées) ; la nécessité de gérer <code>prefers-reduced-motion</code>.</p>`,
        practice: {
          exercices: [
            {
              titre: "Animer un composant Card avec CSS uniquement",
              etapes: [
                "Crée un composant <code>Card</code> simple (titre, description, image). Ajoute une transition sur le survol : élévation légère avec <code>transform: translateY(-4px)</code> et un changement d'ombre (<code>box-shadow</code>). Durée : 200ms, easing : ease-out.",
                "Crée une animation d'apparition pour la Card : elle doit entrer avec un fade-in (opacity 0 → 1) et un léger glissement vers le haut (translateY 12px → 0). Utilise un keyframe avec une durée de 250ms.",
                "Ajoute un spinner de chargement en CSS pur : un cercle avec <code>border</code> dont un quart est coloré, qui tourne avec une animation keyframe en <code>linear infinite</code>.",
                "Implémente la media query <code>prefers-reduced-motion</code> : supprimer l'animation d'apparition et remplacer la transition hover par un simple changement de couleur (non animé).",
              ],
              output: "Composant Card avec transition hover + animation d'apparition + spinner + gestion prefers-reduced-motion.",
              critere: "Les animations ne doivent utiliser que <code>transform</code> et <code>opacity</code>. La media query doit produire un rendu utilisable sans aucune animation.",
            },
          ],
          piege: "Commencer par les bibliothèques d'animation avant de maîtriser les transitions CSS. Une animation de fade-in, un hover effect, un spinner — tout cela se fait en moins de 10 lignes de CSS sans dépendance. Les bibliothèques apportent une valeur réelle pour les animations complexes (orchestration, scroll-triggered, physique) — pas pour les cas simples.",
        },
        verification: [
          "Quelle est la différence entre <code>transition</code> et <code>@keyframes</code> en termes de déclenchement et de contrôle ? Donnez un exemple de cas d'usage approprié pour chacun.",
          "Pourquoi <code>ease-out</code> est-il recommandé pour les éléments qui entrent à l'écran, et <code>ease-in</code> pour les éléments qui en sortent ? Quelle sensation chaque easing produit-il pour l'utilisateur ?",
          "Un développeur anime la hauteur d'un accordéon avec <code>height: 0</code> vers <code>height: auto</code>. Pourquoi cette transition ne fonctionne-t-elle pas, et quelles sont les deux alternatives CSS performantes pour animer un accordéon ?",
        ],
      },
    },

    animationsJS: {
      id: "animationsJS",
      label: "Animations JavaScript et bibliothèques",
      icon: "⚡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>CSS couvre la majorité des animations d'interface, mais certains cas demandent JavaScript : animer selon des valeurs dynamiques (position de la souris, données de l'API), orchestrer des animations séquentielles complexes, ou animer des éléments qui entrent et sortent du DOM (ce que CSS ne sait pas faire seul). L'API Web Animations et les bibliothèques comme Framer Motion ou GSAP offrent un contrôle programmatique sur les animations tout en restant performantes.</p>`,
        system: `<p>Les animations JavaScript s'appuient sur les bases des animations CSS <span class="ref-fiche">→ animationsCSS</span> et sur la compréhension des composants <span class="ref-fiche">→ F25</span>. Elles mobilisent les fondements de l'animation <span class="ref-fiche">→ fondamentsAnimation</span> pour éviter les usages non justifiés. Elles interagissent avec les performances frontend <span class="ref-fiche">→ P03</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les approches d'animation JavaScript :</p>
<p><strong>Web Animations API (WAAPI) — natif, sans dépendance :</strong></p>
<pre>
const element = document.querySelector('.card');
element.animate(
  [
    { opacity: 0, transform: 'translateY(12px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  { duration: 250, easing: 'ease-out', fill: 'forwards' }
);
</pre>
<p>La WAAPI est disponible dans tous les navigateurs modernes, tourne sur le thread du composant (pas du main thread), et expose une API Promise (<code>animation.finished</code>) pour chaîner des actions. Elle remplace avantageusement <code>requestAnimationFrame</code> pour les animations de propriétés CSS.</p>
<p><strong>requestAnimationFrame — animation frame par frame :</strong> pour les animations qui doivent être calculées dynamiquement (position de particules, animations liées à des données en temps réel, canvas). <code>requestAnimationFrame</code> synchronise les calculs avec le refresh rate du navigateur (60 fps). À utiliser quand la valeur à animer dépend d'une variable qui change à chaque frame.</p>
<p><strong>Framer Motion (React) — animations déclaratives :</strong></p>
<pre>
import { motion } from 'framer-motion';

function Card() {
  return (
    &lt;motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    &gt;
      Contenu de la carte
    &lt;/motion.div&gt;
  );
}
</pre>
<p>La valeur principale de Framer Motion est la prop <code>exit</code> — animer les éléments qui quittent le DOM (ce qui est impossible en CSS pur). Il gère aussi les animations de layout (<code>layout</code> prop pour animer des réorganisations), les animations au scroll, et les transitions de page. Sa taille (environ 30 Ko minifié gzippé) est justifiée pour des applications avec des besoins d'animation avancés.</p>
<p><strong>GSAP (GreenSock) — contrôle avancé :</strong> la librairie de référence pour les animations complexes (sites marketing, storytelling interactif, timelines séquentielles). Son modèle de timeline permet d'orchestrer des dizaines d'animations avec précision. Sa communauté et sa documentation sont excellentes. Sa taille (60+ Ko) et sa licence (gratuit pour usages non-commerciaux, payant pour certains plugins) la réservent aux projets qui en ont vraiment besoin.</p>
<p><strong>Quand utiliser quoi :</strong> transitions CSS simples → CSS pur. Animations d'entrée/sortie dans React → Framer Motion. Animations liées à des données dynamiques → WAAPI ou requestAnimationFrame. Site marketing avec animations complexes → GSAP.</p>`,
        },
        senior: `<p>Un développeur expérimenté préfère toujours la solution avec le moins de complexité nécessaire. Framer Motion pour un simple fade-in est une sur-ingénierie — c'est 30 Ko de JavaScript pour 3 lignes de CSS. La règle : commencer par CSS, passer à WAAPI si la logique devient dynamique, introduire Framer Motion si le projet a des animations d'entrée/sortie d'éléments React complexes, réserver GSAP pour les cas véritablement avancés. Chaque niveau de la pile a son coût en bundle size et en complexité.</p>`,
        errors: `<p><strong>Pattern 1 — Utiliser <code>setInterval</code> pour des animations :</strong> <code>setInterval(fn, 16)</code> tente d'animer à 60 fps mais ne se synchronise pas avec le refresh du navigateur. Résultat : des sauts visuels et du jank. Toujours utiliser <code>requestAnimationFrame</code> ou la WAAPI pour les animations frame par frame.</p>
<p><strong>Pattern 2 — Calculer des animations dans le render React :</strong> faire des calculs d'animation lourds dans le corps du composant React. Chaque re-render recalcule tout. Les animations avec état doivent vivre dans des refs (<code>useRef</code>), des hooks dédiés, ou dans une librairie qui gère leur cycle de vie indépendamment du re-render.</p>
<p><strong>Pattern 3 — Animer des éléments sans <code>AnimatePresence</code> en Framer Motion :</strong> tenter d'animer les props <code>exit</code> sans entourer les composants avec <code>&lt;AnimatePresence&gt;</code>. Sans ce wrapper, Framer Motion ne peut pas intercepter la suppression du DOM et l'animation exit ne s'exécutera jamais.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les bibliothèques (Motion for Vue, Svelte Spring, CSS View Transitions API), les APIs navigateur (WAAPI s'enrichit régulièrement), les conventions. <strong>Ce qui ne change pas :</strong> le principe de synchronisation avec requestAnimationFrame pour les animations frame par frame ; l'obligation d'intercepter la sortie du DOM pour les animations exit ; la règle d'escalade (CSS → WAAPI → bibliothèque) selon la complexité.</p>`,
        practice: {
          exercices: [
            {
              titre: "Animer les entrées et sorties d'une liste avec Framer Motion",
              etapes: [
                "Dans un projet React, installe Framer Motion (<code>npm install framer-motion</code>).",
                "Crée une liste d'éléments où on peut ajouter et supprimer des items. Entoure la liste avec <code>&lt;AnimatePresence&gt;</code>.",
                "Chaque item de la liste doit utiliser <code>motion.li</code> avec : <code>initial={{ opacity: 0, x: -20 }}</code>, <code>animate={{ opacity: 1, x: 0 }}</code>, <code>exit={{ opacity: 0, x: 20 }}</code>.",
                "Ajoute une transition de 200ms ease-out. Vérifie que l'ajout et la suppression sont tous deux animés.",
                "Implémente la gestion de <code>prefers-reduced-motion</code> : lire la media query avec <code>window.matchMedia</code> et passer <code>duration: 0</code> si elle est active.",
              ],
              output: "Liste animée avec entrées et sorties Framer Motion + gestion prefers-reduced-motion.",
              critere: "Ajout et suppression d'items doivent être animés indépendamment. La gestion de prefers-reduced-motion doit couper les animations sans casser la fonctionnalité.",
            },
          ],
          piege: "Animer des listes avec de nombreux items sans optimiser les re-renders. Chaque item animé qui cause un re-render du parent fait recalculer toutes les animations. Utiliser <code>React.memo</code> sur les items de liste et <code>useCallback</code> sur les handlers pour éviter que les animations ne soient perturbées par des re-renders inutiles.",
        },
        verification: [
          "Quelle est la différence fondamentale entre la Web Animations API et Framer Motion en termes de cas d'usage ? Pour quel type de projet choisiriez-vous l'une plutôt que l'autre ?",
          "Pourquoi <code>setInterval(fn, 16)</code> produit-il des animations saccadées alors que <code>requestAnimationFrame(fn)</code> produit des animations fluides, alors que les deux visent 60 fps ?",
          "Dans une application React, vous voulez que les éléments d'une liste disparaissent avec une animation quand ils sont supprimés. Pourquoi une simple prop <code>exit</code> sur <code>motion.div</code> ne suffira-t-elle pas, et quel mécanisme Framer Motion nécessite-t-il ?",
        ],
      },
    },

    composantAnimeComplet: {
      id: "composantAnimeComplet",
      label: "Créer un composant animé complet",
      icon: "✨",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Connaître les APIs d'animation ne suffit pas — il faut un processus pour créer un composant animé qui soit à la fois performant, accessible, et maintenable. Sans processus, les animations sont ajoutées de façon incohérente, certaines dépendent de bibliothèques lourdes pour des effets simples, et la gestion de prefers-reduced-motion est oubliée. Ce nœud synthétise le processus complet : de la définition du comportement jusqu'au test d'accessibilité.</p>`,
        system: `<p>Ce nœud applique tous les fondements de cette fiche — raisons d'animer <span class="ref-fiche">→ fondamentsAnimation</span>, CSS <span class="ref-fiche">→ animationsCSS</span>, JavaScript <span class="ref-fiche">→ animationsJS</span> — en un processus de création concret. Il prépare à contribuer à un design system <span class="ref-fiche">→ D04</span> avec des composants dont les animations sont documentées et cohérentes.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le processus de création d'un composant animé :</p>
<p><strong>Étape 1 — Définir le comportement avant le code :</strong> lister les états et les transitions. "La modal entre par le bas (translateY) et sort en s'effaçant (opacity). La durée d'entrée est 250ms ease-out, la sortie 200ms ease-in." Ce document en 3 lignes est plus utile qu'une heure de code approximatif. Il permet de valider les choix avec le design avant d'implémenter.</p>
<p><strong>Étape 2 — Choisir le niveau d'implémentation :</strong> CSS pur si l'animation se déclenche par un changement d'état (hover, ajout de classe, :focus). WAAPI si la valeur est calculée dynamiquement. Framer Motion si l'élément entre et sort du DOM dans un contexte React. Ne pas choisir une solution plus complexe que le problème ne l'exige.</p>
<p><strong>Étape 3 — Implémenter les propriétés performantes uniquement :</strong> <code>transform</code> et <code>opacity</code> uniquement. Si l'animation semble nécessiter <code>width</code>, <code>height</code>, ou <code>top/left</code>, chercher l'équivalent en transform (<code>scaleX</code> pour width, <code>scaleY</code> pour height, <code>translate</code> pour position).</p>
<p><strong>Étape 4 — Gérer prefers-reduced-motion :</strong></p>
<pre>
// React avec Framer Motion
import { useReducedMotion } from 'framer-motion';

function AnimatedCard({ children }) {
  const shouldReduce = useReducedMotion();
  return (
    &lt;motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.25 }}
    &gt;
      {children}
    &lt;/motion.div&gt;
  );
}
</pre>
<p>Framer Motion expose <code>useReducedMotion()</code> qui lit la préférence système. En CSS pur : <code>@media (prefers-reduced-motion: reduce) { ... }</code>. La règle : supprimer les mouvements (<code>translateY</code>, <code>translateX</code>), mais conserver les fades (opacity) — un fade bref n'est pas perturbant pour la plupart des utilisateurs sensibles aux mouvements.</p>
<p><strong>Étape 5 — Tester :</strong> vérifier le rendu à 60fps avec l'onglet Performance des DevTools (chercher les Long Tasks et les Paint events pendant l'animation). Tester avec prefers-reduced-motion activé. Tester sur un appareil mobile bas de gamme (les DevTools permettent de throttler le CPU). Vérifier que l'animation reste cohérente avec plusieurs instances simultanées.</p>`,
        },
        senior: `<p>Un développeur expérimenté extrait les valeurs d'animation dans des tokens ou des constantes partagées, pas des valeurs hardcodées dans chaque composant. <code>const DURATION = { fast: 150, normal: 250, slow: 400 }</code> et <code>const EASING = { enter: 'ease-out', exit: 'ease-in' }</code>. Quand la charte graphique change les durées d'animation, une modification en un endroit répercute le changement partout. Ce niveau de cohérence distingue un composant isolé d'un composant qui fait partie d'un système.</p>`,
        errors: `<p><strong>Pattern 1 — Tester uniquement sur son ordinateur de développement :</strong> les animations qui semblent parfaitement fluides sur un MacBook Pro 16" peuvent produire du jank sur un téléphone Android d'entrée de gamme. Le throttling CPU dans les DevTools Chrome (Performance tab → CPU 4x slowdown) révèle les animations qui ne passent pas à l'échelle.</p>
<p><strong>Pattern 2 — Valeurs d'animation incohérentes entre composants :</strong> un composant utilise 200ms, un autre 300ms, un autre 500ms, sans logique. L'utilisateur perçoit une interface "décousue" même sans identifier la cause. Définir 3 à 5 durées nommées (fast, normal, slow, verySlow) et s'y tenir.</p>
<p><strong>Pattern 3 — Oublier le test avec plusieurs instances :</strong> une Card animée seule paraît fluide. Une grille de 20 Cards qui entrent toutes simultanément provoque un jank visible. Tester les animations dans leur contexte réel d'utilisation, pas uniquement en isolation.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils et APIs disponibles, les conventions d'animation selon les plateformes (Material Design, iOS Human Interface Guidelines, Fluent Design). <strong>Ce qui ne change pas :</strong> le processus (définir → choisir le niveau → implémenter → accessibilité → tester) ; les propriétés performantes (transform, opacity) ; la cohérence des valeurs comme condition de qualité perçue.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer un composant Notification animé complet",
              etapes: [
                "Définis le comportement : une notification entre depuis le coin supérieur droit avec un slideIn (translateX de +120% à 0) en 250ms ease-out. Elle sort avec un fadeOut (opacity 1 → 0) en 200ms ease-in quand elle est fermée ou après 3 secondes.",
                "Implémente le composant en React avec Framer Motion. La notification doit apparaître au montage et disparaître à la fermeture avec les animations définies.",
                "Ajoute la gestion de prefers-reduced-motion : pas de translateX mais fade conservé.",
                "Teste avec 3 notifications empilées. Ajoute une logique de staggering (délai progressif entre chaque entrée) pour éviter que toutes les notifications entrent en même temps.",
                "Mesure les performances avec Chrome DevTools Performance tab pendant l'apparition de 3 notifications simultanées.",
              ],
              output: "Composant Notification animé avec entrée, sortie, staggering, accessibilité et rapport de performance.",
              critere: "Les animations doivent utiliser uniquement transform et opacity. prefers-reduced-motion doit éliminer les mouvements mais conserver le fade. Aucune Long Task > 50ms pendant l'animation sur CPU throttled 4x.",
            },
          ],
          piege: "Considérer les animations comme une phase de finition à ajouter à la fin du développement. Les animations d'entrée/sortie affectent la structure du composant (il faut AnimatePresence en React, ou une gestion de cycle de vie spécifique) — les intégrer après coup force souvent un refactor de la structure. Penser à l'animation dès la conception du composant.",
        },
        verification: [
          "Décrivez le processus en 5 étapes pour créer un composant animé professionnel, et expliquez pourquoi l'étape de définition du comportement doit précéder l'implémentation.",
          "Pourquoi tester un composant animé sur son ordinateur de développement ne suffit-il pas, et quels deux outils ou techniques permettent de tester dans des conditions plus représentatives ?",
          "Un composant utilise <code>transform: translateY(-100%)</code> pour une durée de 300ms avec ease-out à l'entrée. Réécrivez ce composant en intégrant la gestion de prefers-reduced-motion de façon à conserver le feedback visuel tout en supprimant le mouvement.",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "fondamentsAnimation", x: 10, y: 100, w: 185, h: 65 },
        { id: "animationsCSS", x: 260, y: 40, w: 165, h: 65 },
        { id: "animationsJS", x: 260, y: 165, w: 175, h: 65 },
        { id: "composantAnimeComplet", x: 570, y: 100, w: 185, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 258, y2: 72, label: "implémente" },
        { x1: 195, y1: 148, x2: 258, y2: 197, label: "orchestre" },
        { x1: 425, y1: 72, x2: 568, y2: 120, label: "compose" },
        { x1: 435, y1: 197, x2: 568, y2: 148, label: "affine" },
      ],
    },
  },
});
