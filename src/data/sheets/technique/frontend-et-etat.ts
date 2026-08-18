import type { DevSheet } from "../../schema";

export const frontendEtEtat: DevSheet = {
  id: "frontend-et-etat",
  part: "T",
  number: 8,
  title: "Frontend et État",
  subtitle: "Organiser l'interface, la navigation et les données côté client",
  badge: "Fiche T08",
  meta: ["7 nœuds · frontend"],
  category: "Technique",
  level: "Junior",
  readingTime: "35 min",
  description:
    "Une carte frontend pour comprendre composants, routing, state local, state serveur, formulaires, effets et accessibilité.",
  accent: "tool",
  tabs: [{ id: "frontend", label: "Frontend" }],
  nodes: {
    composants: {
      id: "composants",
      label: "Composants",
      icon: "◫",
      kind: "tool",
      osLabel: "Frontend",
      sections: {
        why: `<p>Une interface sans composants devient un bloc de JSX/HTML ingérable. Les composants découpent l'UI en unités autonomes, réutilisables et compréhensibles. Ils jouent côté frontend le même rôle que les modules et services côté backend : séparer les responsabilités.</p>`,
        system: `<p>Les composants forment un arbre : App, layouts, pages, features, composants UI. Les données descendent via props, les événements remontent via callbacks, et les hooks isolent la logique réutilisable.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Découpe par responsabilité : UI générique, composants de feature, pages. Un bloc mérite un composant s'il est réutilisé, s'il porte une logique propre, ou s'il devient trop complexe pour rester inline.</p>`,
          alternatives: [
            { name: "UI", description: "Button, Input, Modal : sans logique métier." },
            { name: "Feature", description: "UserCard, ProductList : logique du domaine." },
            { name: "Page", description: "Assemblage correspondant à une route." },
          ],
        },
        senior: `<p>Il sépare composants intelligents et composants de présentation. Il extrait les effets et appels API dans des hooks. Il garde les props explicites et évite de connecter toute l'application à un store global inutile.</p>`,
        errors: `<p><strong>Pattern 1 — Composant monolithique :</strong> 500 lignes qui font tout.</p><p><strong>Pattern 2 — Props floues :</strong> objet énorme passé partout.</p><p><strong>Pattern 3 — Logique métier dans le rendu :</strong> JSX illisible et non testable.</p>`,
        invariants: `<p>Un composant fait une chose et expose une interface claire. Ce principe vaut en React, Vue, Svelte ou autre.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "src/components/ui/Button.jsx" },
            { type: "cmd", value: "src/features/users/UserCard.jsx" },
            { type: "cmd", value: "src/features/users/useUsers.js" },
            { type: "cmd", value: "src/pages/UsersPage.jsx" },
          ],
          debt: "Composants trop gros → réutilisation impossible et tests pénibles.",
        },
        verification: [
          "Quel critère permet de décider qu'un morceau d'interface mérite d'être extrait dans une unité autonome plutôt que de rester inline dans son parent ?",
          "Tu travailles sur une page `OrdersPage.jsx` de 480 lignes qui contient une table de commandes, un formulaire de filtre, une modale de détail, et des appels `fetch` directs dans le JSX. Identifie au moins trois extractions justifiées et précise pour chacune si c'est un composant UI, feature ou hook.",
          "Pourquoi le principe de responsabilité unique s'applique-t-il aux composants frontend de la même façon qu'aux modules backend, et quel indicateur concret trahit sa violation dans un composant React ?",
        ],
      },
    },
    routing: {
      id: "routing",
      label: "Routing",
      icon: "⇒",
      kind: "infra",
      osLabel: "Frontend",
      sections: {
        why: `<p>Une interface multi-écrans doit associer une URL à un état de l'application. Le routing frontend permet de naviguer sans recharger toute la page, de partager des liens, et de restaurer une vue depuis l'URL.</p>`,
        system: `<p>Le routeur se situe au-dessus des pages. Il lit l'URL, choisit le composant de page, gère les paramètres, les layouts, parfois les loaders et redirections. Il relie l'expérience utilisateur à une structure navigable.</p>`,
        choice: {
          kind: "structured",
          main: `<p>React Router est le standard React. Next.js utilise un routing par fichiers. TanStack Router apporte typage fort. La règle : l'URL doit porter ce qui est partageable, pas seulement le state interne.</p>`,
          alternatives: [
            { name: "React Router", description: "Standard SPA React." },
            {
              name: "File-based routing",
              description: "Next, Remix : structure de fichiers = routes.",
            },
            { name: "TanStack Router", description: "Routing typé et moderne." },
          ],
        },
        senior: `<p>Il met les filtres et IDs importants dans l'URL. Il protège les routes côté UI, mais sait que la vraie sécurité reste côté backend. Il prévoit pages 404, loading, error boundary et navigation accessible.</p>`,
        errors: `<p><strong>Pattern 1 — State non partageable :</strong> filtres uniquement en mémoire, impossible de copier l'URL.</p><p><strong>Pattern 2 — Auth frontend seule :</strong> route cachée mais API ouverte.</p><p><strong>Pattern 3 — Pas de fallback :</strong> URL inconnue = écran vide.</p>`,
        invariants: `<p>Une route est un contrat de navigation. Elle doit être lisible, stable et restaurable.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "npm install react-router-dom" },
            { type: "cmd", value: '<Route path="/users/:id" element={<UserPage />} />' },
            { type: "cmd", value: "const { id } = useParams()" },
            { type: "cmd", value: "useSearchParams()" },
          ],
          debt: "URL qui ne reflète pas l'état partageable → navigation fragile et UX frustrante.",
        },
        verification: [
          "Pourquoi une URL constitue-t-elle un contrat de navigation et quelle propriété doit-elle respecter pour être utile à l'utilisateur ?",
          "Ton application React affiche une liste de produits filtrée par catégorie et triée par prix. Les filtres sont gérés dans un `useState` local. Un utilisateur configure ses filtres, copie l'URL et l'envoie à un collègue. Le collègue ouvre l'URL et voit la liste sans filtres. Explique pourquoi et comment `useSearchParams()` de React Router résout ce problème.",
          "Pourquoi protéger une route côté frontend (cacher un lien ou rediriger) ne remplace-t-il jamais la protection côté API, et quel est le risque concret si seule la couche UI est sécurisée ?",
        ],
      },
    },
    "state-local": {
      id: "state-local",
      label: "State local",
      icon: "x=",
      kind: "runtime",
      osLabel: "Frontend",
      sections: {
        why: `<p>L'interface a besoin de mémoire courte : menu ouvert, champ en cours d'édition, onglet sélectionné, modale visible. Le state local garde cette information au plus près du composant qui l'utilise.</p>`,
        system: `<p>Le state local vit dans un composant ou un hook. Il ne doit pas remonter plus haut que nécessaire. Plus un état est haut dans l'arbre, plus il peut provoquer de complexité et de rendus inutiles.</p>`,
        choice: {
          kind: "structured",
          main: `<p><code>useState</code> pour valeurs simples, <code>useReducer</code> quand les transitions deviennent nombreuses. Ne pas sortir vers Context ou Zustand tant que l'état n'est pas réellement partagé.</p>`,
          alternatives: [
            { name: "useState", description: "Simple et local." },
            { name: "useReducer", description: "Transitions explicites pour état complexe." },
            { name: "State global", description: "Seulement si plusieurs zones en dépendent." },
          ],
        },
        senior: `<p>Il identifie la source de vérité. Il évite de dupliquer la même donnée dans plusieurs states. Il dérive ce qui peut être calculé au rendu au lieu de le stocker.</p>`,
        errors: `<p><strong>Pattern 1 — State dupliqué :</strong> deux valeurs censées représenter la même chose divergent.</p><p><strong>Pattern 2 — Tout remonter :</strong> parent énorme qui contrôle toute l'UI.</p><p><strong>Pattern 3 — Stocker du dérivable :</strong> bugs de synchronisation inutiles.</p>`,
        invariants: `<p>Un état a une source de vérité et une portée minimale. Ce principe est la base de toute UI maintenable.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "const [isOpen, setIsOpen] = useState(false)" },
            { type: "cmd", value: "const [selectedTab, setSelectedTab] = useState('details')" },
            { type: "cmd", value: "const visibleItems = items.filter(...)" },
          ],
          debt: "State local mal placé → props drilling, rerenders et bugs de synchronisation.",
        },
        verification: [
          "Quel principe guide le choix de l'endroit où placer une valeur dans l'arbre de composants, et quel problème survient quand ce principe est ignoré ?",
          "Un composant React affiche un compteur initialisé à 0. L'utilisateur clique 3 fois très vite sur le bouton +1. Avec `setCount(count + 1)`, tu obtiens parfois 1 au lieu de 3. Explique pourquoi, et comment `setCount(prev => prev + 1)` corrige ce comportement.",
          "Pourquoi stocker une valeur calculable (comme `isFormValid` dérivé des champs) dans un `useState` séparé est-il une source de bugs structurelle, indépendamment du framework ?",
        ],
      },
    },
    "state-serveur": {
      id: "state-serveur",
      label: "State serveur",
      icon: "⇄",
      kind: "tool",
      osLabel: "Frontend",
      sections: {
        why: `<p>Les données venant de l'API ne sont pas un state local classique. Elles ont loading, error, cache, stale time, retry, invalidation. Réimplémenter ça à la main dans chaque composant produit vite du code fragile.</p>`,
        system: `<p>Le state serveur se situe entre les composants et le client API. React Query/SWR gèrent le cache, les requêtes, les erreurs et l'invalidation après mutation.</p>`,
        choice: {
          kind: "structured",
          main: `<p>React Query est le défaut robuste pour applications React. SWR est plus minimaliste. Fetch manuel suffit pour une page simple, mais devient coûteux dès que les données sont partagées ou mutées.</p>`,
          alternatives: [
            { name: "React Query", description: "Cache, mutations, invalidation, retry." },
            { name: "SWR", description: "Simple et léger." },
            { name: "fetch manuel", description: "OK pour prototype très simple." },
          ],
        },
        senior: `<p>Il invalide les bonnes queries après mutation. Il évite de copier les données serveur dans un store global. Il distingue données fraîches, stale et loading initial.</p>`,
        errors: `<p><strong>Pattern 1 — Cache jamais invalidé :</strong> UI affiche des données anciennes.</p><p><strong>Pattern 2 — Copier server state dans Zustand :</strong> double source de vérité.</p><p><strong>Pattern 3 — Loading incohérent :</strong> chaque composant invente ses états.</p>`,
        invariants: `<p>Le serveur est la source de vérité des données persistantes. Le frontend n'en possède qu'une copie temporaire.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "npm install @tanstack/react-query" },
            { type: "cmd", value: "useQuery({ queryKey: ['users'], queryFn: fetchUsers })" },
            { type: "cmd", value: "queryClient.invalidateQueries({ queryKey: ['users'] })" },
          ],
          debt: "Server state manuel partout → bugs de cache et états UI incohérents.",
        },
        verification: [
          "Pourquoi les données provenant d'une API nécessitent-elles une gestion différente du state local d'interface, et quels problèmes surgissent si on les traite de la même façon ?",
          "Tu utilises React Query avec `useQuery({ queryKey: ['users'], queryFn: fetchUsers })`. Après un appel `useMutation` qui crée un nouvel utilisateur avec succès, la liste de l'écran précédent affiche toujours l'ancienne liste sans le nouvel utilisateur. Explique pourquoi, et quelle ligne de code dans le `onSuccess` de ta mutation résout le problème.",
          "Pourquoi copier les données d'une réponse API dans un store Zustand crée-t-il une double source de vérité, et quel principe doit guider la frontière entre state serveur et state UI local ?",
        ],
      },
    },
    forms: {
      id: "forms",
      label: "Formulaires",
      icon: "▤",
      kind: "tool",
      osLabel: "Frontend",
      sections: {
        why: `<p>Les formulaires sont la principale frontière d'entrée utilisateur. Ils collectent des données imparfaites, les valident, affichent des erreurs et déclenchent des mutations. Sans structure, ils deviennent vite le code le plus fragile de l'interface.</p>`,
        system: `<p>Un formulaire relie state local, validation frontend, API, erreurs backend et feedback utilisateur. Il ne remplace jamais la validation backend, mais améliore l'expérience en donnant un retour immédiat.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Formulaire simple : state local. Formulaire complexe : React Hook Form + Zod. La validation frontend doit idéalement partager les mêmes règles que l'API ou rester alignée avec elle.</p>`,
          alternatives: [
            { name: "State local", description: "Suffisant pour deux ou trois champs." },
            { name: "React Hook Form", description: "Performant pour formulaires complexes." },
            { name: "Zod", description: "Schéma partagé et typé." },
          ],
        },
        senior: `<p>Il gère loading, disabled, erreurs champ par champ, erreur globale, succès et reset. Il évite les doubles soumissions et garde les messages d'erreur utiles.</p>`,
        errors: `<p><strong>Pattern 1 — Double submit :</strong> deux requêtes créent deux ressources.</p><p><strong>Pattern 2 — Erreurs backend perdues :</strong> l'utilisateur ne sait pas quoi corriger.</p><p><strong>Pattern 3 — Validation frontend seule :</strong> sécurité inexistante.</p>`,
        invariants: `<p>Une donnée utilisateur est non fiable jusqu'à validation backend. Le frontend améliore l'UX, le backend garantit l'intégrité.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "npm install react-hook-form zod @hookform/resolvers" },
            { type: "cmd", value: "const form = useForm({ resolver: zodResolver(schema) })" },
            { type: "cmd", value: "disabled={mutation.isPending}" },
          ],
          debt: "Formulaires sans stratégie d'erreurs → UX confuse et données invalides.",
        },
        verification: [
          "Quel rôle joue la validation côté interface utilisateur, et pourquoi ne peut-elle pas remplacer la validation effectuée par le serveur ?",
          "Un bouton 'Enregistrer' dans ton formulaire React déclenche une mutation `useMutation`. L'utilisateur a une connexion lente et clique deux fois en 500ms. Ta base de données se retrouve avec deux entrées identiques. Explique la cause et comment l'attribut HTML `disabled={mutation.isPending}` sur le bouton corrige ce comportement.",
          "Pourquoi la règle 'les erreurs backend doivent être affichées à l'utilisateur au bon champ' est-elle un invariant d'UX, même si la validation frontend est déjà en place ?",
        ],
      },
    },
    effects: {
      id: "effects",
      label: "Effets",
      icon: "↻",
      kind: "infra",
      osLabel: "Frontend",
      sections: {
        why: `<p>Un composant pur calcule son affichage depuis ses props et son state. Mais certaines actions touchent le monde extérieur : requête réseau, abonnement, timer, stockage local, titre de page. Les effets existent pour gérer ces synchronisations avec l'extérieur.</p>`,
        system: `<p>Les effets vivent après le rendu. Ils synchronisent le composant avec un système externe. Ils ne doivent pas servir à recalculer ce qui peut être dérivé directement pendant le rendu.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Dans React, <code>useEffect</code> est nécessaire pour synchroniser avec l'extérieur. Mais beaucoup d'effets sont évitables : data fetching avec React Query, calculs dérivés dans le rendu, événements dans les handlers.</p>`,
          alternatives: [
            { name: "useEffect", description: "Synchronisation avec système externe." },
            { name: "Event handler", description: "Action directe suite à interaction." },
            { name: "Query library", description: "Évite les effets manuels de fetching." },
          ],
        },
        senior: `<p>Il réduit les effets au minimum. Il nettoie abonnements et timers. Il comprend les dépendances du tableau et évite de les manipuler au hasard pour faire taire le linter.</p>`,
        errors: `<p><strong>Pattern 1 — Effet de synchronisation interne :</strong> state dérivé inutile.</p><p><strong>Pattern 2 — Dépendances menties :</strong> stale closures et bugs subtils.</p><p><strong>Pattern 3 — Cleanup oublié :</strong> memory leaks, timers multiples.</p>`,
        invariants: `<p>Un effet est une synchronisation avec l'extérieur. S'il n'y a pas d'extérieur, il faut probablement supprimer l'effet.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "useEffect(() => { document.title = title }, [title])" },
            { type: "cmd", value: "return () => clearInterval(timer)" },
            { type: "cmd", value: "Ne pas ignorer react-hooks/exhaustive-deps" },
          ],
          debt: "Effets mal maîtrisés → bugs temporels, appels API en boucle, memory leaks.",
        },
        verification: [
          "Quelle condition doit être remplie pour qu'un `useEffect` soit justifié, et comment distinguer une vraie synchronisation externe d'un recalcul qu'on pourrait faire directement au rendu ?",
          "Ton composant React contient `useEffect(() => { fetchData() }, [userId])` où `fetchData` est une fonction définie dans le corps du composant. Le linter ESLint (règle `react-hooks/exhaustive-deps`) te demande d'ajouter `fetchData` aux dépendances. Tu l'ignores. Explique quel bug de closure cela peut produire quand `userId` change.",
          "Pourquoi omettre la fonction de cleanup d'un `useEffect` qui pose un abonnement ou un `setInterval` est-il un invariant de robustesse à respecter, et quelle classe de bug cette omission provoque-t-elle en production ?",
        ],
      },
    },
    accessibilite: {
      id: "accessibilite",
      label: "Accessibilité",
      icon: "♿",
      kind: "runtime",
      osLabel: "Frontend",
      sections: {
        why: `<p>Une interface n'est pas seulement visuelle. Elle doit être utilisable au clavier, lisible par lecteur d'écran, compréhensible avec des contrastes corrects, et robuste pour différents utilisateurs. L'accessibilité n'est pas une couche décorative : c'est une condition d'usage.</p>`,
        system: `<p>L'accessibilité traverse composants, formulaires, routing et état. Les boutons doivent être de vrais boutons, les inputs avoir des labels, les erreurs être annoncées, le focus être géré lors des changements de route ou modales.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Le meilleur choix est d'utiliser les éléments HTML natifs quand ils existent. Un <code>button</code> accessible vaut mieux qu'une div cliquable. Les composants custom doivent reproduire clavier, focus et rôles ARIA seulement quand nécessaire.</p>`,
          alternatives: [
            { name: "HTML natif", description: "Premier choix, robuste par défaut." },
            { name: "ARIA ciblé", description: "Quand le natif ne suffit pas." },
            { name: "Lib UI accessible", description: "Radix, React Aria, Headless UI." },
          ],
        },
        senior: `<p>Il teste au clavier. Il vérifie labels, focus visible, contrastes, ordre de tabulation et messages d'erreur. Il ne remplace pas la sémantique par des divs stylées.</p>`,
        errors: `<p><strong>Pattern 1 — Div cliquable :</strong> inaccessible au clavier.</p><p><strong>Pattern 2 — Input sans label :</strong> lecteur d'écran inutile.</p><p><strong>Pattern 3 — Focus perdu :</strong> modales et routes désorientent l'utilisateur.</p>`,
        invariants: `<p>Une UI professionnelle doit être utilisable sans souris et compréhensible par technologies d'assistance. C'est un critère de qualité, pas un bonus.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: '<button type="button">Enregistrer</button>' },
            { type: "cmd", value: '<label htmlFor="email">Email</label>' },
            { type: "cmd", value: '<input id="email" aria-describedby="email-error" />' },
            { type: "cmd", value: "Tester Tab / Enter / Escape" },
          ],
          debt: "Accessibilité ignorée → UI fragile, non inclusive, souvent moins robuste pour tout le monde.",
        },
        verification: [
          "Pourquoi l'utilisation des éléments HTML sémantiques natifs est-elle préférable à des éléments génériques avec des gestionnaires d'événements, du point de vue de l'accessibilité ?",
          "Tu remplaces un `<button>Supprimer</button>` par un `<div onClick={handleDelete}>Supprimer</div>` pour faciliter le style CSS. Un utilisateur qui navigue au clavier ne peut plus déclencher la suppression. Explique précisément pourquoi le comportement diffère, et quels attributs ou éléments permettraient de conserver l'accessibilité avec un `div`.",
          "Pourquoi tester une interface uniquement à la souris n'est-il pas suffisant pour garantir la qualité, et quel principe dure indépendamment du framework ou de la librairie de composants utilisée ?",
        ],
      },
    },
  },
  maps: {
    frontend: {
      viewBox: "0 0 920 300",
      nodes: [
        { id: "composants", x: 20, y: 115, w: 120, h: 65 },
        { id: "routing", x: 190, y: 55, w: 110, h: 65 },
        { id: "state-local", x: 190, y: 175, w: 120, h: 65 },
        { id: "state-serveur", x: 360, y: 115, w: 130, h: 65 },
        { id: "forms", x: 550, y: 55, w: 110, h: 65 },
        { id: "effects", x: 550, y: 175, w: 110, h: 65 },
        { id: "accessibilite", x: 720, y: 115, w: 130, h: 65 },
      ],
      edges: [
        { x1: 140, y1: 135, x2: 188, y2: 88, label: "navigue" },
        { x1: 140, y1: 160, x2: 188, y2: 207, label: "stocke" },
        { x1: 300, y1: 88, x2: 358, y2: 135, label: "synchronise" },
        { x1: 310, y1: 207, x2: 358, y2: 160, label: "hydrate" },
        { x1: 490, y1: 135, x2: 548, y2: 88, label: "soumet" },
        { x1: 490, y1: 160, x2: 548, y2: 207, label: "réagit" },
        { x1: 660, y1: 88, x2: 718, y2: 135, label: "annonce" },
        { x1: 660, y1: 207, x2: 718, y2: 160, label: "inclut" },
      ],
    },
  },
};
