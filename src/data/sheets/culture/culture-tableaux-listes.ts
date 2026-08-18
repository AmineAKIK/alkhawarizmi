import { cultureSheet } from "./culture-common";

export const cultureTableauxListes = cultureSheet({
  id: "culture-F19",
  number: 19,
  title: "Tableaux et Listes",
  subtitle:
    "Regrouper, parcourir et transformer plusieurs valeurs sans perdre leur ordre ni leur sens",
  badge: "Fiche F19",
  meta: ["6 nœuds"],
  readingTime: "40 min",
  description:
    "Les applications manipulent rarement une seule valeur : produits, messages, tâches et résultats arrivent en collections. Cette fiche distingue tableaux et listes, explique leur initialisation, l'accès par indice, les modifications et les opérations de transformation utiles en web et mobile.",
  accent: "modele",

  nodes: {
    fondamentauxTableaux: {
      id: "fondamentauxTableaux",
      label: "Fondamentaux des tableaux",
      icon: "[]",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Afficher dix produits avec dix variables séparées rend chaque ajout pénible et chaque traitement répétitif. Un tableau regroupe plusieurs valeurs dans une collection ordonnée : on peut les parcourir, les compter et appliquer la même règle à chacune. Sans collection, une application devient rigide dès que le nombre d'éléments varie.</p>`,
        system: `<p>Les tableaux prolongent les variables et types <span class="ref-fiche">→ F17</span> en regroupant plusieurs valeurs. Ils sont parcourus avec les boucles <span class="ref-fiche">→ F14</span>, reçus et envoyés dans les APIs JSON <span class="ref-fiche">→ T07</span>, puis affichés sous forme de listes dans le frontend <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Reconnaître les propriétés essentielles :</p>
<p><strong>Collection ordonnée :</strong> chaque élément possède une position. Dans la plupart des langages courants, le premier indice vaut <code>0</code>.</p>
<p><strong>Taille :</strong> certains langages distinguent tableau à taille fixe et collection dynamique. En JavaScript, <code>Array</code> est dynamique ; en Python, <code>list</code> l'est aussi.</p>
<p><strong>Type des éléments :</strong> TypeScript peut exprimer <code>Product[]</code>. JavaScript autorise techniquement des types mélangés, mais une collection homogène reste généralement plus prévisible.</p>
<p><strong>Ordre métier :</strong> une liste de messages chronologiques dépend de son ordre ; un ensemble de permissions peut plutôt relever d'un <code>Set</code> si l'unicité compte davantage.</p>`,
        },
        senior: `<p>Un développeur expérimenté demande si l'ordre, l'unicité et la recherche par identifiant sont réellement les propriétés dominantes. Un tableau convient à l'affichage ordonné et au parcours. Quand le code recherche continuellement un élément par clé, un dictionnaire ou une <code>Map</code> peut mieux exprimer l'intention.</p>`,
        errors: `<p><strong>Pattern 1 — Le tableau universel :</strong> on utilise un tableau pour toute collection parce qu'il est familier. Les recherches répétées par identifiant deviennent lentes et la structure ne communique plus le besoin réel.</p>
<p><strong>Pattern 2 — Le mélange commode :</strong> on place textes, nombres et objets dans la même collection parce que le langage l'autorise. Chaque usage doit ensuite deviner le type courant et les erreurs se multiplient.</p>
<p><strong>Pattern 3 — L'ordre accidentel :</strong> on dépend de la position des éléments sans documenter que l'ordre porte un sens métier. Un tri ou un filtre ultérieur modifie silencieusement le comportement.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le nom de la structure, sa taille fixe ou dynamique et son typage. <strong>Ce qui ne change pas :</strong> choisir une collection exige d'expliciter ordre, unicité, mode d'accès et type des éléments.</p>`,
        practice: {
          exercices: [
            {
              titre: "Choisir la structure d'une collection",
              etapes: [
                "Liste quatre cas : fil de messages, permissions utilisateur, panier et annuaire par identifiant.",
                "Indique pour chacun si ordre, doublons et recherche par clé comptent.",
                "Choisis tableau, ensemble ou dictionnaire selon ces propriétés.",
                "Justifie un cas où le tableau n'est pas le meilleur choix.",
              ],
              output:
                "Un tableau comparatif de quatre collections avec propriétés et structure choisie.",
              critere:
                "Chaque choix doit être justifié par ordre, unicité ou mode d'accès, pas seulement par habitude.",
            },
          ],
          piege:
            "Choisir un tableau avant d'avoir identifié les propriétés réellement importantes de la collection.",
        },
        verification: [
          "Quelles propriétés distinguent une collection ordonnée d'un ensemble ou d'un dictionnaire ?",
          "Une application cherche un utilisateur par identifiant des centaines de fois. Pourquoi un tableau peut-il être un mauvais choix ?",
          "Pourquoi le choix de structure reste-t-il une décision métier autant que technique ?",
        ],
      },
    },

    declarationInitialisation: {
      id: "declarationInitialisation",
      label: "Déclarer et initialiser",
      icon: "[ ]",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une collection créée sans intention claire mélange facilement état vide, données non chargées et absence d'information. Déclarer et initialiser un tableau oblige à dire ce qu'il représente avant de le remplir.</p>`,
        system: `<p>L'initialisation applique les principes des variables <span class="ref-fiche">→ F17</span> aux collections. Elle prépare l'accès et la modification <span class="ref-fiche">→ accesModification</span>, puis les opérations de transformation <span class="ref-fiche">→ operationsTableaux</span>. Dans une interface <span class="ref-fiche">→ T08</span>, distinguer tableau vide et chargement non terminé évite les écrans trompeurs.</p>`,
        choice: {
          kind: "free",
          html: `<p>Initialiser selon l'état réel :</p>
<p><strong>Tableau vide :</strong> <code>const produits = []</code> en JavaScript ou <code>produits = []</code> en Python signifie que la collection existe et ne contient aucun élément.</p>
<p><strong>Valeurs initiales :</strong> <code>const roles = ["user", "editor"]</code> rend une configuration locale explicite.</p>
<p><strong>Copie :</strong> <code>const copie = [...original]</code> crée un nouveau tableau superficiel en JavaScript ; <code>copie = original.copy()</code> joue un rôle similaire en Python.</p>
<p><strong>Absent ou non chargé :</strong> utiliser un état séparé lorsque les données ne sont pas encore disponibles. Un tableau vide ne doit pas masquer un chargement en cours.</p>`,
        },
        senior: `<p>Un développeur expérimenté distingue soigneusement vide, absent, erreur et chargement. Ces états produisent parfois la même zone blanche à l'écran, mais ils n'appellent pas la même interface : message "aucun résultat", skeleton, bouton réessayer ou redirection.</p>`,
        errors: `<p><strong>Pattern 1 — Le vide de chargement :</strong> on initialise une liste distante à <code>[]</code> puis on affiche "aucun résultat" avant la réponse API. L'utilisateur reçoit une information fausse pendant le chargement.</p>
<p><strong>Pattern 2 — La copie imaginaire :</strong> on écrit <code>const copie = original</code> en pensant dupliquer le tableau. Les deux variables pointent vers la même collection et une modification se propage.</p>
<p><strong>Pattern 3 — Le contenu implicite :</strong> on initialise un tableau avec des valeurs dont le rôle n'est pas nommé. Quelques semaines plus tard, personne ne sait si l'ordre ou les doublons sont intentionnels.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe de déclaration et les mécanismes de copie. <strong>Ce qui ne change pas :</strong> l'état initial d'une collection doit distinguer explicitement vide, absent et non chargé ; une copie doit être volontaire.</p>`,
        practice: {
          exercices: [
            {
              titre: "Modéliser les états d'une liste distante",
              etapes: [
                "Définis les états chargement, succès vide, succès avec données et erreur.",
                "Associe à chacun une valeur de collection et un rendu d'interface.",
                "Implémente une représentation avec un statut discriminé.",
                "Teste les quatre états sans appel réseau réel.",
              ],
              output: "Un modèle d'état de liste distante avec quatre rendus vérifiés.",
              critere:
                "Le chargement ne doit jamais être affiché comme un succès vide et l'erreur doit rester distincte.",
            },
          ],
          piege:
            "Utiliser le tableau vide comme réponse unique à toutes les situations où aucune donnée n'est immédiatement affichable.",
        },
        verification: [
          "Quelle différence existe entre collection vide et données non encore chargées ?",
          "Pourquoi <code>const copie = original</code> ne crée-t-il pas une copie indépendante d'un tableau JavaScript ?",
          "Pourquoi distinguer vide, absent et erreur améliore-t-il une interface quel que soit le framework ?",
        ],
      },
    },

    accesModification: {
      id: "accesModification",
      label: "Accès et modification",
      icon: "[i]",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Lire le premier produit, remplacer une tâche ou supprimer un message exige de cibler le bon élément. Une erreur d'indice peut modifier le voisin, ignorer le dernier élément ou lire une valeur absente sans provoquer immédiatement une erreur visible.</p>`,
        system: `<p>L'accès part du tableau initialisé <span class="ref-fiche">→ declarationInitialisation</span> et prépare les opérations globales <span class="ref-fiche">→ operationsTableaux</span>. Il s'appuie sur les conditions <span class="ref-fiche">→ F14</span> pour vérifier limites et présence, puis influence la gestion d'état frontend <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Modifier consciemment une collection :</p>
<p><strong>Indice :</strong> <code>items[0]</code> lit le premier élément. Vérifier la longueur ou accepter explicitement l'absence avant d'utiliser le résultat.</p>
<p><strong>Recherche :</strong> <code>find()</code> convient quand l'identité métier compte davantage que la position. <code>findIndex()</code> sert si une modification indexée suit réellement.</p>
<p><strong>Ajout et retrait local :</strong> <code>push()</code>, <code>pop()</code>, <code>shift()</code> et <code>unshift()</code> modifient un tableau JavaScript existant. Leur mutation peut être acceptable dans une portée locale.</p>
<p><strong>Mise à jour immuable :</strong> créer un nouveau tableau avec spread, <code>map()</code> ou <code>filter()</code> convient mieux quand l'état est partagé ou observé par une interface.</p>`,
        },
        senior: `<p>Un développeur expérimenté cible les éléments persistés par identifiant, pas par position d'affichage. Après un tri, un filtre ou une synchronisation mobile, l'élément à l'indice 2 peut changer ; son identifiant métier reste stable.</p>`,
        errors: `<p><strong>Pattern 1 — Le décalage d'un cran :</strong> on oublie que le premier indice vaut zéro. La boucle dépasse la fin ou le mauvais élément est modifié.</p>
<p><strong>Pattern 2 — La position identité :</strong> on met à jour l'élément d'indice 2 parce que c'était sa position à l'écran. Un tri ou un filtre intervient et une autre donnée est modifiée.</p>
<p><strong>Pattern 3 — La mutation partagée :</strong> on modifie directement un tableau observé à plusieurs endroits parce que <code>push()</code> est simple. L'interface ou un autre appelant voit un changement inattendu.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les méthodes d'ajout, de suppression et de copie. <strong>Ce qui ne change pas :</strong> une modification fiable cible un élément avec une identité adaptée, traite les limites et rend explicite si la collection originale est mutée ou remplacée.</p>`,
        practice: {
          exercices: [
            {
              titre: "Mettre à jour une liste de tâches",
              etapes: [
                "Crée trois tâches avec identifiant, titre et statut.",
                "Marque une tâche comme terminée en la ciblant par identifiant.",
                "Produis une nouvelle liste sans modifier l'originale.",
                "Teste un identifiant présent et un identifiant absent.",
              ],
              output: "Une fonction de mise à jour immuable et deux cas de test documentés.",
              critere:
                "L'original doit rester inchangé et l'identifiant absent doit produire un comportement défini.",
            },
          ],
          piege: "Utiliser l'indice visible comme identifiant métier durable.",
        },
        verification: [
          "Quand faut-il accéder par indice et quand faut-il rechercher par identifiant ?",
          "Une liste affichée est triée après le clic utilisateur. Pourquoi modifier par position peut-il toucher le mauvais élément ?",
          "Pourquoi rendre explicite mutation ou remplacement reste-t-il important dans tout langage ?",
        ],
      },
    },

    operationsTableaux: {
      id: "operationsTableaux",
      label: "Opérations sur les tableaux",
      icon: "ƒ[]",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Parcourir manuellement chaque collection avec une boucle générique fonctionne, mais masque souvent l'intention. Filtrer les produits disponibles, transformer des données API ou calculer un total sont trois problèmes différents ; les exprimer avec des opérations distinctes rend le code plus lisible et testable.</p>`,
        system: `<p>Ces opérations prolongent l'accès et la modification <span class="ref-fiche">→ accesModification</span> et s'appuient sur les boucles <span class="ref-fiche">→ F14</span>. Elles apparaissent dans le traitement de données <span class="ref-fiche">→ T06</span>, les réponses API <span class="ref-fiche">→ T07</span> et les listes affichées <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir l'opération qui exprime l'intention :</p>
<p><strong><code>map()</code> :</strong> transformer chaque élément et produire une nouvelle collection de même longueur.</p>
<p><strong><code>filter()</code> :</strong> conserver les éléments satisfaisant une condition.</p>
<p><strong><code>find()</code> et <code>some()</code> :</strong> récupérer un élément ou répondre à une question booléenne sans parcourir inutilement le reste.</p>
<p><strong><code>reduce()</code> :</strong> agréger une collection en une valeur, par exemple un total. Préférer une boucle simple si l'accumulation devient difficile à lire.</p>
<p><strong><code>slice()</code> et <code>sort()</code> :</strong> extraire ou ordonner. Attention : <code>sort()</code> modifie le tableau JavaScript ; copier avant si l'original doit rester stable.</p>`,
        },
        senior: `<p>Un développeur expérimenté évite les chaînes de transformations élégantes mais opaques. Il nomme les étapes métier, vérifie le coût sur les grandes collections et sait qu'un tri ou plusieurs parcours côté client peuvent être inutiles si l'API ou la base peut fournir directement les données attendues.</p>`,
        errors: `<p><strong>Pattern 1 — Le <code>map()</code> décoratif :</strong> on utilise <code>map()</code> pour déclencher un effet de bord sans exploiter le tableau retourné. L'intention est trompeuse ; une boucle ou <code>forEach()</code> serait plus claire.</p>
<p><strong>Pattern 2 — Le tri furtif :</strong> on appelle <code>sort()</code> sur un tableau partagé parce que seul l'ordre affiché semble changer. La collection originale est mutée et d'autres écrans changent aussi.</p>
<p><strong>Pattern 3 — Le <code>reduce()</code> acrobatique :</strong> on agrège, filtre et transforme dans un seul appel pour éviter plusieurs lignes. La densité masque les règles métier et rend les cas limites pénibles à tester.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les méthodes disponibles et les optimisations du runtime. <strong>Ce qui ne change pas :</strong> une opération de collection doit révéler son intention, documenter si elle mute l'original et rester compréhensible sur les cas vides ou volumineux.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire une vue de panier",
              etapes: [
                "Crée une collection de produits avec prix, quantité et disponibilité.",
                "Filtre les produits disponibles puis transforme-les en lignes avec sous-total.",
                "Calcule le total avec une agrégation lisible.",
                "Teste panier vide, produit indisponible et plusieurs produits.",
              ],
              output:
                "Un pipeline de panier avec filtrage, transformation, total et trois scénarios.",
              critere:
                "Chaque étape doit avoir une intention unique et le panier vide doit produire un total défini.",
            },
          ],
          piege:
            "Compacter toutes les opérations en une chaîne difficile à relire pour économiser des variables intermédiaires utiles.",
        },
        verification: [
          "Quelle différence d'intention existe entre <code>map()</code>, <code>filter()</code> et <code>reduce()</code> ?",
          "Pourquoi trier directement un tableau partagé peut-il modifier une autre vue de l'application ?",
          "Quand une boucle explicite devient-elle préférable à une chaîne de méthodes ?",
        ],
      },
    },

    fondamentauxListes: {
      id: "fondamentauxListes",
      label: "Fondamentaux des listes",
      icon: "≡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Le mot "liste" désigne souvent toute collection affichée à l'écran, mais il peut aussi nommer une structure technique précise. Confondre liste métier, tableau dynamique et liste chaînée rend les discussions floues et conduit à optimiser un problème qui n'existe pas.</p>`,
        system: `<p>Ce nœud clarifie le vocabulaire après les tableaux <span class="ref-fiche">→ fondamentauxTableaux</span>. Il éclaire les listes reçues via JSON <span class="ref-fiche">→ T07</span>, l'état de liste côté frontend <span class="ref-fiche">→ T08</span> et les choix de structure de données plus larges <span class="ref-fiche">→ T06</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Distinguer trois usages du mot liste :</p>
<p><strong>Liste métier :</strong> ensemble ordonné d'éléments comme tâches ou messages, indépendamment de son implémentation.</p>
<p><strong>JavaScript <code>Array</code> et Python <code>list</code> :</strong> collections dynamiques adaptées à la majorité des usages applicatifs courants.</p>
<p><strong>Liste chaînée :</strong> structure composée de nœuds reliés, utile pour comprendre certains compromis d'insertion et de parcours. Elle n'offre pas le même accès direct par indice qu'un tableau.</p>
<p><strong>Tableau fixe :</strong> structure contiguë de taille déterminée dans certains langages. Elle offre d'autres compromis mémoire et performance, rarement nécessaires directement dans une application web en JavaScript.</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit d'abord la structure idiomatique du langage et ne descend vers une structure spécialisée qu'après avoir mesuré un besoin. Dans une application web classique, la qualité du contrat de données, du filtrage et des identifiants compte généralement plus qu'une liste chaînée écrite à la main.</p>`,
        errors: `<p><strong>Pattern 1 — Le vocabulaire brumeux :</strong> on parle de liste, tableau et collection comme de synonymes exacts. L'équipe ne sait plus si la discussion concerne l'interface, le métier ou l'implémentation.</p>
<p><strong>Pattern 2 — La structure académique prématurée :</strong> on implémente une liste chaînée dans un écran web simple parce qu'elle semble plus sophistiquée. Le code gagne de la complexité sans résoudre de problème mesuré.</p>
<p><strong>Pattern 3 — Le détail ignoré :</strong> on suppose inversement que toutes les structures se valent. Dans un traitement volumineux ou contraint, le mode d'accès et le coût des opérations deviennent importants.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les implémentations disponibles et leurs coûts précis selon le langage. <strong>Ce qui ne change pas :</strong> le mot liste doit être replacé dans son contexte ; une structure spécialisée se choisit selon un besoin mesuré, pas selon son prestige.</p>`,
        practice: {
          exercices: [
            {
              titre: "Clarifier le vocabulaire d'un écran mobile",
              etapes: [
                "Choisis un écran de messages ou de tâches.",
                "Décris la liste métier affichée et les opérations réellement nécessaires.",
                "Indique comment tu la représenterais en JavaScript et en Python.",
                "Explique pourquoi une liste chaînée dédiée serait utile ou inutile ici.",
              ],
              output:
                "Une note courte distinguant besoin métier, représentation JavaScript, représentation Python et structure spécialisée.",
              critere:
                "La conclusion doit reposer sur les opérations nécessaires, pas sur une préférence abstraite.",
            },
          ],
          piege:
            "Introduire une structure spécialisée avant d'avoir mesuré une limite concrète de la structure idiomatique.",
        },
        verification: [
          "Pourquoi le mot liste peut-il désigner plusieurs réalités différentes ?",
          "Une application React affiche vingt tâches. Pourquoi une liste chaînée écrite à la main est-elle probablement inutile ?",
          "Quand le coût des opérations sur une structure devient-il un vrai critère de choix ?",
        ],
      },
    },

    listesPratiques: {
      id: "listesPratiques",
      label: "Listes en pratique",
      icon: "☷",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une liste réelle évolue : chargement progressif, ajout, suppression, filtrage, tri et synchronisation hors ligne. Les opérations isolées ne suffisent plus ; il faut préserver les identifiants, rendre les états visibles et éviter que deux sources modifient silencieusement la même collection.</p>`,
        system: `<p>Les listes pratiques combinent accès <span class="ref-fiche">→ accesModification</span>, transformations <span class="ref-fiche">→ operationsTableaux</span> et distinction des structures <span class="ref-fiche">→ fondamentauxListes</span>. Elles préparent l'état frontend <span class="ref-fiche">→ T08</span>, les échanges API <span class="ref-fiche">→ T07</span> et les tests de scénarios <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quelques décisions fréquentes :</p>
<p><strong>Identifiant stable :</strong> conserver un <code>id</code> métier pour modifier, supprimer et rendre une liste dans une interface.</p>
<p><strong>Pagination ou chargement progressif :</strong> éviter de charger une collection entière quand son volume peut grandir.</p>
<p><strong>Tri et filtrage :</strong> côté client pour une petite collection déjà chargée ; côté serveur quand le volume, le partage ou la pagination l'exigent.</p>
<p><strong>Synchronisation mobile :</strong> gérer explicitement les éléments locaux, confirmés, en erreur ou en conflit quand le réseau disparaît puis revient.</p>`,
        },
        senior: `<p>Un développeur expérimenté anticipe les listes longues et les mises à jour concurrentes avant qu'elles deviennent visibles. Il évite d'utiliser l'indice comme clé d'interface, borne les volumes et décide quelle source fait autorité lors d'une synchronisation mobile.</p>`,
        errors: `<p><strong>Pattern 1 — L'indice comme clé :</strong> on rend une liste frontend avec la position parce qu'elle est disponible immédiatement. Après insertion ou tri, l'interface réutilise le mauvais état visuel pour un autre élément.</p>
<p><strong>Pattern 2 — La liste infinie chargée d'un bloc :</strong> on récupère toutes les données parce que les premiers tests contiennent dix lignes. Le temps de réponse et la mémoire se dégradent avec la croissance réelle.</p>
<p><strong>Pattern 3 — La synchronisation muette :</strong> on écrase la liste locale avec la réponse serveur au retour du réseau. Les modifications hors ligne disparaissent sans explication pour l'utilisateur.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les frameworks d'état, les APIs de pagination et les stratégies hors ligne. <strong>Ce qui ne change pas :</strong> une liste applicative robuste possède des identifiants stables, borne son volume et rend explicite la source d'autorité lors des mises à jour.</p>`,
        practice: {
          exercices: [
            {
              titre: "Concevoir une liste de tâches mobile",
              etapes: [
                "Définis cinq tâches avec identifiant stable, statut et état de synchronisation.",
                "Ajoute localement une tâche pendant une simulation hors ligne.",
                "Filtre les tâches terminées sans muter la collection originale.",
                "Décris le comportement au retour du réseau en cas de succès et de conflit.",
              ],
              output:
                "Un modèle de liste mobile avec ajout hors ligne, filtre immuable et stratégie de synchronisation.",
              critere:
                "Chaque tâche doit garder un identifiant stable et aucune modification locale ne doit disparaître sans état explicite.",
            },
          ],
          piege:
            "Traiter la liste affichée comme une simple collection locale alors qu'elle reflète parfois plusieurs sources et plusieurs moments.",
        },
        verification: [
          "Pourquoi une liste d'interface a-t-elle besoin d'identifiants stables ?",
          "Une application mobile ajoute une tâche hors ligne puis retrouve le réseau. Quels états dois-tu représenter avant d'écraser la liste locale ?",
          "Quand déplacer tri et filtrage vers le serveur devient-il préférable ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 1180 390",
      nodes: [
        { id: "fondamentauxTableaux", x: 15, y: 160, w: 180, h: 65 },
        { id: "declarationInitialisation", x: 245, y: 65, w: 185, h: 65 },
        { id: "accesModification", x: 245, y: 255, w: 175, h: 65 },
        { id: "operationsTableaux", x: 500, y: 160, w: 190, h: 65 },
        { id: "fondamentauxListes", x: 760, y: 65, w: 180, h: 65 },
        { id: "listesPratiques", x: 760, y: 255, w: 175, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 178, x2: 243, y2: 112, label: "s'initialise" },
        { x1: 195, y1: 210, x2: 243, y2: 288, label: "se modifie" },
        { x1: 430, y1: 112, x2: 498, y2: 178, label: "prépare" },
        { x1: 420, y1: 288, x2: 498, y2: 210, label: "alimente" },
        { x1: 690, y1: 178, x2: 758, y2: 112, label: "clarifie" },
        { x1: 690, y1: 210, x2: 758, y2: 288, label: "applique" },
      ],
    },
  },
});
