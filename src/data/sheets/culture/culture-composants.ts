import { cultureSheet } from "./culture-common";

export const cultureComposants = cultureSheet({
  id: "culture-F25",
  number: 25,
  title: "Composants : Introduction et Atomic Design",
  subtitle: "Qu'est-ce qu'un composant, comment le créer, comment organiser ses interfaces avec l'Atomic Design",
  badge: "Fiche F25",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description: "Le composant est la brique fondamentale de toute interface web moderne. Avant d'écrire du code, comprendre ce qu'est un composant — pourquoi il existe, comment il reçoit des données, comment il s'imbrique — permet d'aborder n'importe quel framework avec un modèle mental solide. L'Atomic Design de Brad Frost donne un vocabulaire pour organiser ces composants à l'échelle d'une application entière.",
  accent: "modele",

  nodes: {
    decouvrirComposants: {
      id: "decouvrirComposants",
      label: "Découvrir les composants",
      icon: "◫",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Sans composants, une interface est un long fichier HTML répétitif où le même bouton est copié-collé 40 fois. Changer la couleur du bouton signifie chercher et modifier 40 endroits distincts — avec le risque d'en rater. Le composant résout ce problème en encapsulant une portion d'interface dans une unité réutilisable, autonome et modifiable en un seul endroit. C'est le même principe qu'une fonction en programmation : écrire la logique une fois, l'appeler partout où on en a besoin.</p>`,
        system: `<p>Les composants sont l'unité de base du développement frontend <span class="ref-fiche">→ T08</span> et le point d'arrivée du travail de design côté code <span class="ref-fiche">→ D03</span>. Ils s'appuient sur les structures de contrôle <span class="ref-fiche">→ F14</span> (les conditions qui décident quoi afficher) et les fonctions <span class="ref-fiche">→ F21</span> (dont ils sont une application directe). Ils s'organisent en systèmes via l'Atomic Design <span class="ref-fiche">→ atomicDesign</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Ce qu'est un composant, concrètement :</p>
<p><strong>Définition :</strong> un composant est une fonction (ou une classe) qui reçoit des données en entrée et retourne une description de l'interface à afficher. En React : <code>function Button({ label }) { return &lt;button&gt;{label}&lt;/button&gt;; }</code>. En Vue : un fichier <code>.vue</code> avec un bloc <code>&lt;template&gt;</code>. En Web Components natifs : une classe qui étend <code>HTMLElement</code>. Le concept est le même quel que soit le framework.</p>
<p><strong>Les props (propriétés) :</strong> les données que le composant reçoit depuis son parent. Un composant <code>Button</code> peut recevoir un <code>label</code>, une <code>couleur</code>, un état <code>disabled</code>. Les props sont unidirectionnelles : elles descendent du parent vers l'enfant. Le composant ne modifie pas ses props — il les lit et s'affiche en conséquence. Cette règle évite que les données deviennent imprévisibles.</p>
<p><strong>Les événements et callbacks :</strong> comment un composant communique vers le haut. Un bouton cliqué déclenche un événement (<code>onClick</code> en React, <code>@click</code> en Vue). Le parent passe une fonction en prop ; l'enfant l'appelle quand quelque chose se passe. Les données descendent via props, les actions remontent via événements — c'est le flux unidirectionnel de toutes les interfaces modernes.</p>
<p><strong>L'état local (state) :</strong> certaines données appartiennent au composant lui-même et ne concernent pas le reste de l'application. Un accordéon est ouvert ou fermé — c'est son état local. Un formulaire a des valeurs en cours de saisie — c'est son état local. Le state diffère des props : il vit dans le composant, peut être modifié par lui, et déclenche un re-rendu quand il change.</p>
<p><strong>La composition :</strong> les composants s'imbriquent. Une <code>Card</code> contient une <code>Image</code>, un <code>Title</code> et un <code>Button</code>. Une <code>Page</code> contient plusieurs <code>Card</code>. Cette imbrication forme un arbre de composants — le modèle de toutes les interfaces modernes, qu'elles soient en React, Vue, Angular ou Svelte.</p>`,
        },
        senior: `<p>Un développeur expérimenté pense au composant comme à un contrat : il déclare explicitement ce qu'il accepte en entrée (props typées), ce qu'il émet (événements documentés), et ce dont il a besoin pour fonctionner (dépendances). Un composant dont l'interface est floue — qui accepte un objet générique sans documentation — est un composant qui accumulera des effets de bord invisibles. La clarté du contrat détermine la maintenabilité sur le long terme.</p>`,
        errors: `<p><strong>Pattern 1 — Le composant fourre-tout :</strong> un seul composant qui gère la navigation, les données, l'affichage et les appels API. Il grossit jusqu'à 500 lignes. Personne n'ose le toucher. La solution : extraire chaque responsabilité distincte dans son propre composant ou hook.</p>
<p><strong>Pattern 2 — Les props drilling :</strong> passer une donnée à travers 5 niveaux de composants intermédiaires qui ne l'utilisent pas, juste pour atteindre le composant du bas. Conséquence : chaque composant intermédiaire devient couplé à une donnée qu'il ne concerne pas. La solution : context, store, ou restructurer la hiérarchie.</p>
<p><strong>Pattern 3 — Modifier les props directement :</strong> tenter de modifier une prop reçue depuis le parent dans le composant enfant. En React cela lève une erreur silencieuse ou crée des incohérences. Les props sont en lecture seule ; pour modifier une valeur, l'enfant notifie le parent via un callback, et c'est le parent qui met à jour sa propre donnée.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe (JSX en React, templates en Vue, Svelte ou Angular), les noms des APIs (<code>useState</code> vs <code>ref</code> vs <code>signal</code>), les conventions de fichiers. <strong>Ce qui ne change pas :</strong> le modèle fondamental reste identique dans tous les frameworks — encapsulation, props en entrée, événements en sortie, état local pour les données internes, composition par imbrication.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer et utiliser un composant de A à Z",
              etapes: [
                "Dans un projet existant ou un bac à sable (CodeSandbox, StackBlitz), crée un composant <code>Card</code> qui reçoit trois props : <code>title</code> (string), <code>description</code> (string), <code>imageUrl</code> (string).",
                "Le composant affiche les trois props dans un conteneur structuré : image en haut, titre en gras, description en dessous.",
                "Utilise ce composant trois fois dans un composant parent avec des contenus différents. Observe que changer une prop dans un seul endroit ne touche que cette carte.",
                "Ajoute un bouton 'En savoir plus' avec un événement <code>onClick</code> : passer une callback du parent qui affiche une alerte avec le titre de la carte cliquée.",
              ],
              output: "Composant Card avec 3 props, utilisé 3 fois dans un parent, avec un événement qui remonte vers le parent.",
              critere: "Chaque carte doit afficher des données différentes issues de ses props. Le clic doit déclencher la callback du parent — pas une logique hardcodée dans l'enfant.",
            },
          ],
          piege: "Commencer par créer des composants très petits et très génériques dès le début (un composant Text, un composant Container...). L'abstraction prématurée crée plus de complexité qu'elle n'en résout. Créer un composant quand le même code serait copié deux fois, pas avant.",
        },
        verification: [
          "Quelle est la différence entre une prop et un état local (state) dans un composant ? Donnez un exemple concret de chacun dans un composant de liste de tâches.",
          "Pourquoi les props sont-elles unidirectionnelles — du parent vers l'enfant uniquement — et comment un composant enfant communique-t-il vers son parent quand l'utilisateur effectue une action ?",
          "Un composant Card reçoit une prop `items` qui est un tableau. Est-ce qu'une modification de ce tableau directement dans la Card affecte le parent ? Expliquez le mécanisme et la règle à respecter.",
        ],
      },
    },

    creerComposant: {
      id: "creerComposant",
      label: "Création et utilisation de composants",
      icon: "🔧",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Savoir qu'un composant existe en théorie ne suffit pas — savoir le structurer, le nommer, le tester et le documenter détermine si d'autres développeurs pourront l'utiliser ou s'il restera un composant que seul son auteur comprend. La création d'un composant suit un processus : identifier la responsabilité, définir l'interface (props et événements), implémenter, tester les cas limites, documenter. Ce processus s'applique que le composant fasse 15 lignes ou 150.</p>`,
        system: `<p>La création concrète de composants s'appuie sur les fondements <span class="ref-fiche">→ decouvrirComposants</span> et se place dans l'organisation Atomic Design <span class="ref-fiche">→ atomicDesign</span>. Elle est le pont vers la fiche technique T08 <span class="ref-fiche">→ T08</span> et anticipe les composants animés <span class="ref-fiche">→ F26</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les étapes de création d'un composant réutilisable :</p>
<p><strong>Étape 1 — Identifier la responsabilité unique :</strong> avant d'écrire une ligne, formuler en une phrase ce que fait le composant. "Ce composant affiche une carte produit avec son image, son nom et son prix." Si la phrase contient "et" plusieurs fois, le composant fait probablement trop de choses. Exemple de découpe : <code>ProductCard</code> (affichage) + <code>useProduct</code> (logique de fetch) + <code>ProductPage</code> (assemblage).</p>
<p><strong>Étape 2 — Définir l'interface en premier :</strong> lister les props avant de coder. Nom de chaque prop, type attendu, valeur par défaut si pertinent, si elle est obligatoire ou optionnelle. Cette liste devient la documentation du composant. En TypeScript : un type ou une interface explicite. En JavaScript : une liste de PropTypes ou un commentaire JSDoc.</p>
<p><strong>Étape 3 — Implémenter et tester les cas limites :</strong> après l'implémentation nominale, tester : prop manquante ou undefined, texte très long (débordement), liste vide, image absente, état disabled. Un composant qui fonctionne uniquement avec des données parfaites est un composant qui cassera en production.</p>
<p><strong>Structure de fichier recommandée :</strong></p>
<pre>
src/
  components/
    ui/           ← composants génériques (Button, Input, Card)
    features/     ← composants liés au domaine (ProductCard, UserAvatar)
  pages/          ← assemblages de composants (ProductPage, HomePage)
  hooks/          ← logique réutilisable (useProduct, useAuth)
</pre>
<p><strong>Nommage :</strong> PascalCase pour les composants (<code>ProductCard</code>), camelCase pour les props (<code>imageUrl</code>), kebab-case pour les fichiers (<code>product-card.tsx</code> dans certaines conventions) ou PascalCase fichier (<code>ProductCard.tsx</code> dans la convention React standard). La cohérence au sein d'un projet prime sur le choix de convention.</p>`,
        },
        senior: `<p>Un développeur expérimenté documente les cas d'usage non triviaux directement dans le fichier du composant, sous forme de stories Storybook ou de commentaires d'exemples. Quand un collègue cherche comment utiliser <code>DataTable</code>, il ne doit pas lire le code source entier — il doit trouver en 30 secondes un exemple qui ressemble à son cas. Cette documentation n'est pas du luxe : elle détermine si le composant sera réutilisé ou recréé.</p>`,
        errors: `<p><strong>Pattern 1 — Interface implicite :</strong> un composant qui accepte un objet <code>data</code> générique sans documentation de sa structure. Chaque utilisateur doit lire l'implémentation pour comprendre ce que <code>data</code> doit contenir. Typer explicitement chaque prop élimine cette friction.</p>
<p><strong>Pattern 2 — Composant sans valeurs par défaut :</strong> toutes les props sont obligatoires, y compris celles qui ont un comportement naturel par défaut. Un <code>Button</code> sans default pour <code>type="button"</code> sera parfois un submit dans un formulaire sans que ce soit intentionnel.</p>
<p><strong>Pattern 3 — Logique métier dans le composant UI :</strong> un composant <code>Button</code> qui contient des règles de pricing ou un composant <code>Avatar</code> qui fait un appel API. La logique métier appartient aux hooks ou aux composants de feature — pas aux composants UI génériques. Cette séparation permet de tester la logique indépendamment de l'affichage.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les frameworks (React, Vue, Svelte, Angular), les formats de documentation (Storybook, MDX, JSDoc), les outils de test (Testing Library, Playwright). <strong>Ce qui ne change pas :</strong> la responsabilité unique comme critère de découpe ; la définition explicite de l'interface avant l'implémentation ; les cas limites comme critère de robustesse d'un composant.</p>`,
        practice: {
          exercices: [
            {
              titre: "Découper une page monolithique en composants",
              etapes: [
                "Prends une page HTML ou un composant existant de plus de 100 lignes dans un projet réel ou fictif.",
                "Identifie les blocs répétés ou les sections aux responsabilités distinctes. Nomme chaque bloc en PascalCase avec une phrase de responsabilité.",
                "Pour chaque composant identifié, liste les props nécessaires : nom, type, obligatoire ou optionnel.",
                "Implémente le composant le plus simple d'abord. Teste-le avec des données réelles et des données manquantes.",
                "Intègre-le dans la page parent et vérifie que le comportement est identique à l'original.",
              ],
              output: "Page originale découpée en 3 à 5 composants nommés avec leurs props listées + implémentation d'un composant avec test des cas limites.",
              critere: "Chaque composant doit avoir une responsabilité formulée en une phrase sans 'et'. Les props doivent être typées ou documentées.",
            },
          ],
          piege: "Créer un composant différent pour chaque légère variation visuelle. Un <code>BlueButton</code>, un <code>RedButton</code>, un <code>LargeBlueButton</code>. La bonne approche est un seul <code>Button</code> avec des props <code>variant</code> et <code>size</code> — c'est le système de variants qui gère les variations, pas la multiplication des composants.",
        },
        verification: [
          "Comment définir l'interface d'un composant avant de l'implémenter, et pourquoi cette étape réduit-elle le nombre de refactors nécessaires après la première utilisation ?",
          "Un composant <code>UserList</code> reçoit une prop <code>users</code> qui peut être undefined, un tableau vide, ou un tableau de 500 éléments. Listez les cas à traiter et décrivez le rendu approprié pour chacun.",
          "Pourquoi séparer un composant <code>ProductCard</code> (affichage) d'un hook <code>useProduct</code> (logique de données) est-il préférable à tout mettre dans un seul composant, du point de vue des tests et de la réutilisabilité ?",
        ],
      },
    },

    atomicDesign: {
      id: "atomicDesign",
      label: "Atomic Design",
      icon: "⚛",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Quand une application grandit, le problème n'est plus de créer des composants — c'est de les organiser. Sans méthode, chaque développeur range ses composants différemment, les noms deviennent inconsistants, et personne ne sait où trouver un composant donné. Brad Frost a formalisé l'Atomic Design en 2013 pour résoudre ce problème : organiser les composants selon leur niveau d'abstraction, du plus petit élément indivisible jusqu'à la page complète. Cette méthode donne un vocabulaire partagé et une hiérarchie claire pour toute une équipe.</p>`,
        system: `<p>L'Atomic Design est la méthode d'organisation qui donne du sens aux composants créés en <span class="ref-fiche">→ creerComposant</span>. Il est mentionné dans l'anatomie des composants côté design <span class="ref-fiche">→ D03</span> et dans l'organisation des composants techniques <span class="ref-fiche">→ T08</span>. Il prépare la compréhension du design system complet <span class="ref-fiche">→ D04</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les 5 niveaux de l'Atomic Design :</p>
<p><strong>1. Atomes :</strong> les éléments UI les plus petits et les plus indivisibles. Ils ne peuvent pas être décomposés en composants plus simples sans perdre leur utilité. Exemples : <code>Button</code>, <code>Input</code>, <code>Label</code>, <code>Icon</code>, <code>Badge</code>, <code>Avatar</code>, <code>Spinner</code>. Un atome n'a pas de logique métier. Il reçoit des props simples (texte, couleur, taille, état disabled) et affiche un élément visuel précis. La règle : si vous pouvez l'utiliser dans n'importe quel projet sans modification, c'est un atome.</p>
<p><strong>2. Molécules :</strong> combinaisons d'atomes qui forment une unité fonctionnelle simple. Exemples : <code>SearchBar</code> = Input + Button, <code>FormField</code> = Label + Input + ErrorMessage, <code>NotificationItem</code> = Icon + Text + CloseButton. Une molécule fait une chose précise mais combine plusieurs atomes pour le faire. Elle peut avoir une logique légère (état d'ouverture d'un dropdown, validation d'un champ).</p>
<p><strong>3. Organismes :</strong> sections d'interface composées de molécules et d'atomes, suffisamment complexes pour représenter une portion autonome de la page. Exemples : <code>Header</code> = Logo + Navigation + SearchBar + UserMenu, <code>ProductCard</code> = Image + Title + Price + AddToCartButton, <code>CommentSection</code> = liste de CommentItems + CommentForm. Un organisme peut avoir de la logique métier — il est souvent le niveau où les données sont chargées ou la logique de domaine vit.</p>
<p><strong>4. Templates :</strong> structure de page sans données réelles — le squelette. Un template définit le placement des organismes : "ici le header, là la grille de produits, à droite le panier". C'est une maquette filaire avec des composants réels à la place des rectangles. Il n'y a pas de données réelles à ce niveau — les templates permettent de valider la mise en page avant de connecter les données.</p>
<p><strong>5. Pages :</strong> les templates remplis de données réelles. C'est ce que l'utilisateur voit. Une page instancie un template et lui fournit les données (depuis l'API, le store, les paramètres de route). Le rendu final, testable et déployable.</p>
<p><strong>En pratique — adapter sans rigidité :</strong> l'Atomic Design est un guide, pas un dogme. Peu d'équipes appliquent les 5 niveaux strictement. La valeur pratique est dans les 3 premiers niveaux : distinguer les composants génériques sans contexte (atomes), les unités fonctionnelles simples (molécules), et les sections de page avec logique métier (organismes). Une structure de dossiers courante :</p>
<pre>
src/components/
  atoms/      ← Button, Input, Icon, Badge
  molecules/  ← SearchBar, FormField, Card
  organisms/  ← Header, ProductGrid, CommentSection
</pre>`,
        },
        senior: `<p>Un développeur expérimenté sait que la valeur principale de l'Atomic Design n'est pas la taxonomie elle-même — c'est le vocabulaire partagé qu'elle crée dans l'équipe. Quand un designer dit "c'est une molécule" et qu'un développeur comprend immédiatement le niveau de réutilisabilité et de contexte attendu, la conversation design-développement est 3 fois plus rapide. L'Atomic Design sans ce vocabulaire partagé est juste une organisation de dossiers — avec ce vocabulaire, c'est un système de communication.</p>`,
        errors: `<p><strong>Pattern 1 — Classer par intuition visuelle plutôt que par responsabilité :</strong> mettre un composant dans "atomes" parce qu'il est petit visuellement, alors qu'il contient de la logique métier et dépend d'un contexte précis. La classification doit se baser sur la réutilisabilité et le niveau d'abstraction, pas sur la taille ou la complexité visuelle.</p>
<p><strong>Pattern 2 — Templates et pages confondus :</strong> ne pas distinguer le squelette de mise en page (template) des pages avec données réelles. Cette confusion empêche de tester la mise en page indépendamment des données — et rend les layouts dépendants du contenu.</p>
<p><strong>Pattern 3 — Atomic Design comme règle absolue :</strong> refuser qu'un composant existe s'il ne rentre pas parfaitement dans une catégorie. Certains composants sont hybrides. L'objectif est l'organisation intelligible par l'équipe, pas la pureté taxonomique.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les noms des niveaux (certaines équipes utilisent "primitives", "blocks", "sections"), l'adaptation à chaque projet (pas toujours 5 niveaux), les outils de documentation (Storybook structure souvent par niveaux Atomic). <strong>Ce qui ne change pas :</strong> le principe de hiérarchie de l'abstraction (du plus générique au plus spécifique au contexte) ; la valeur du vocabulaire partagé entre design et développement ; la distinction entre composants sans logique métier (atomes) et composants avec logique de domaine (organismes).</p>`,
        practice: {
          exercices: [
            {
              titre: "Classifier les composants d'une interface existante",
              etapes: [
                "Prends n'importe quelle interface web que tu utilises (une page de e-commerce, un dashboard, une app de messagerie). Fais une capture d'écran.",
                "Identifie 3 atomes : des éléments UI génériques sans contexte métier spécifique.",
                "Identifie 2 molécules : des combinaisons d'atomes qui forment une unité fonctionnelle simple.",
                "Identifie 1 organisme : une section de page avec sa propre logique ou son propre ensemble de données.",
                "Pour chaque composant identifié, vérifie la règle : pourrait-il être réutilisé dans un autre projet sans modification (atome) ? Dans d'autres pages du même projet (molécule) ? Ou est-il spécifique à cette section (organisme) ?",
              ],
              output: "Classification de 6 composants d'une interface réelle avec justification du niveau pour chacun.",
              critere: "La justification doit reposer sur le critère de réutilisabilité — pas sur la taille visuelle ou la position dans la page.",
            },
          ],
          piege: "Commencer par créer la structure de dossiers Atomic avant d'avoir des composants à y ranger. L'organisation émerge des besoins réels — créer les dossiers en premier sans composants crée une bureaucratie vide. Atomic Design s'applique quand on a déjà 10 à 15 composants et qu'on commence à chercher comment les organiser.",
        },
        verification: [
          "Quelle est la différence entre un atome et une molécule en termes de réutilisabilité et de logique interne ? Donnez un exemple de composant qui semble un atome mais est en réalité une molécule.",
          "Pourquoi distinguer un template (squelette) d'une page (données réelles) est-il utile pour le développement et les tests, même dans une petite équipe ?",
          "Un composant <code>ProductCard</code> est-il un atome, une molécule ou un organisme ? Justifiez votre réponse selon les critères de l'Atomic Design, et expliquez comment votre réponse changerait si ProductCard récupérait elle-même les données produit depuis l'API.",
        ],
      },
    },

    compositionAvancee: {
      id: "compositionAvancee",
      label: "Composition et patterns avancés",
      icon: "🧩",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Créer un composant simple est accessible dès les premières heures de pratique. Créer un composant flexible — qui s'adapte à des usages variés sans devenir impossible à maintenir — demande de maîtriser les patterns de composition. Ces patterns résolvent des problèmes récurrents : comment passer du contenu variable à un composant, comment partager de la logique sans dupliquer le code, comment rendre un composant configurable sans exposer 40 props. Ils sont présents dans presque toutes les librairies de composants professionnelles.</p>`,
        system: `<p>Les patterns de composition s'appuient sur les fondements des composants <span class="ref-fiche">→ decouvrirComposants</span> et de leur création <span class="ref-fiche">→ creerComposant</span>. Ils préparent à comprendre les librairies de composants professionnelles (shadcn/ui, Headless UI, Radix) et la mécanique des hooks avancés dans <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les patterns de composition essentiels :</p>
<p><strong>Children / Slots — injecter du contenu :</strong> plutôt que de multiplier les props pour chaque variation de contenu, passer du contenu via les enfants (<code>children</code> en React, <code>&lt;slot&gt;</code> en Vue/Web Components). Un composant <code>Modal</code> ne devrait pas avoir une prop <code>titleContent</code>, <code>bodyContent</code>, <code>footerContent</code> — il devrait exposer des slots nommés dans lesquels le parent injecte ce qu'il veut. Cela rend le composant générique sans le rendre rigide.</p>
<p><strong>Render Props — partager de la logique :</strong> un composant qui encapsule de la logique (fetching, gestion d'état, scroll) et expose ses résultats via une fonction passée en prop. Le composant gère le "comment" (la logique), le parent gère le "quoi afficher". Exemple : <code>&lt;DataFetcher url="/api/users" render={(users) =&gt; &lt;UserList users={users} /&gt;} /&gt;</code>. En React moderne, les hooks ont souvent remplacé ce pattern, mais il reste utile pour les composants qui exposent une interface flexible.</p>
<p><strong>Compound Components — API cohérente :</strong> plusieurs composants qui travaillent ensemble sous un namespace commun. Exemple :</p>
<pre>
&lt;Select&gt;
  &lt;Select.Trigger&gt;Choisir...&lt;/Select.Trigger&gt;
  &lt;Select.Content&gt;
    &lt;Select.Item value="a"&gt;Option A&lt;/Select.Item&gt;
    &lt;Select.Item value="b"&gt;Option B&lt;/Select.Item&gt;
  &lt;/Select.Content&gt;
&lt;/Select&gt;
</pre>
<p>Ce pattern expose une API lisible et flexible — l'utilisateur du composant contrôle la structure interne sans que le composant principal gère 50 props différentes. C'est le pattern utilisé par Radix UI, Headless UI, et la plupart des librairies modernes.</p>
<p><strong>Custom Hooks — extraire la logique réutilisable :</strong> une fonction qui commence par <code>use</code> et encapsule de la logique avec état. <code>useWindowSize()</code>, <code>useLocalStorage(key)</code>, <code>useDebounce(value, delay)</code>. Les hooks permettent de partager de la logique entre composants sans héritage ni render props. En Vue 3, les composables jouent le même rôle.</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit le pattern selon le problème à résoudre, pas par préférence. Children/slots pour du contenu variable, compound components pour une API avec plusieurs sous-parties interdépendantes, custom hooks pour de la logique réutilisable sans rendu. La question clé : est-ce que la variation est dans le contenu (slots), dans la structure (compound), ou dans la logique (hooks) ? La réponse détermine le pattern.</p>`,
        errors: `<p><strong>Pattern 1 — Prop explosion :</strong> ajouter une prop pour chaque légère variation plutôt que d'utiliser children ou slots. Un composant <code>Card</code> qui a des props <code>hasHeader</code>, <code>headerText</code>, <code>hasFooter</code>, <code>footerText</code>, <code>hasImage</code>... alors qu'un simple slot résoudrait tout. Chaque prop supplémentaire est une surface de maintenance.</p>
<p><strong>Pattern 2 — Hooks dans des conditions :</strong> appeler un hook (<code>useState</code>, <code>useEffect</code>) à l'intérieur d'un bloc <code>if</code> ou d'une boucle. Les hooks doivent être appelés au top-level du composant, dans le même ordre à chaque rendu — c'est une règle fondamentale de React qui lève une erreur si elle est violée.</p>
<p><strong>Pattern 3 — Réinventer des librairies existantes :</strong> passer des semaines à créer un système de sélection accessible, un tooltip robuste, ou un combobox de A à Z, alors que Radix UI, Headless UI ou Floating UI résolvent ces problèmes avec des années de travail et de tests d'accessibilité derrière eux. Construire des composants bas niveau quand des solutions éprouvées existent est du temps mal investi.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les APIs spécifiques aux frameworks (React hooks vs Vue composables vs Svelte stores), les librairies de référence. <strong>Ce qui ne change pas :</strong> les problèmes que résolvent ces patterns (contenu variable, logique partagée, API composée) sont les mêmes dans tous les frameworks. La forme change, l'intention reste.</p>`,
        practice: {
          exercices: [
            {
              titre: "Refactoriser un composant avec prop explosion vers les slots",
              etapes: [
                "Prends un composant avec plus de 5 props liées au contenu (textes, titres, icônes, footers...). Si tu n'en as pas, crée un composant <code>Card</code> avec des props <code>title</code>, <code>subtitle</code>, <code>footer</code>, <code>actions</code>, <code>badge</code>.",
                "Identifie lesquelles de ces props pourraient être remplacées par du contenu injecté via children ou slots nommés.",
                "Refactorise le composant pour exposer un slot principal et optionnellement des slots nommés pour header et footer.",
                "Mets à jour les 3 usages de ce composant dans le parent. Vérifie que le comportement est identique.",
              ],
              output: "Composant refactorisé de prop explosion vers slots + 3 usages mis à jour.",
              critere: "Le composant refactorisé doit avoir moins de props mais supporter les mêmes cas d'usage, voire plus.",
            },
          ],
          piege: "Utiliser les compound components pour des composants simples sans sous-parties. Un <code>Button</code> n'a pas besoin de <code>Button.Icon</code> et <code>Button.Label</code> — la complexité dépasse largement le bénéfice. Les compound components sont pertinents pour des composants qui ont une structure interne non triviale avec des relations entre sous-parties (Select, Accordion, Tabs, Menu).",
        },
        verification: [
          "Quelle est la différence entre passer du contenu via une prop string (<code>title='Mon titre'</code>) et via children (<code>&lt;Card&gt;&lt;h2&gt;Mon titre&lt;/h2&gt;&lt;/Card&gt;</code>) ? Dans quels cas le second est-il supérieur ?",
          "Pourquoi les hooks React ne peuvent-ils pas être appelés dans des conditions ou des boucles, et quelle règle concrète garantit leur comportement prévisible à chaque rendu ?",
          "Nommez deux librairies de composants headless (sans style) qui résolvent les problèmes d'accessibilité pour les composants complexes (dropdown, tooltip, dialog). Pourquoi utiliser ces librairies plutôt que de tout reconstruire ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "decouvrirComposants", x: 10, y: 100, w: 185, h: 65 },
        { id: "creerComposant", x: 260, y: 40, w: 185, h: 65 },
        { id: "atomicDesign", x: 260, y: 165, w: 155, h: 65 },
        { id: "compositionAvancee", x: 560, y: 100, w: 185, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 258, y2: 72, label: "structure" },
        { x1: 195, y1: 148, x2: 258, y2: 197, label: "organise" },
        { x1: 445, y1: 72, x2: 558, y2: 120, label: "approfondit" },
        { x1: 415, y1: 197, x2: 558, y2: 148, label: "compose" },
      ],
    },
  },
});
