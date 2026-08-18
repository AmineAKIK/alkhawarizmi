import { cultureSheet } from "./culture-common";

export const cultureRecursivite = cultureSheet({
  id: "culture-F24",
  number: 24,
  title: "Récursivité",
  subtitle: "Résoudre un problème en appliquant le même raisonnement à une version plus petite",
  badge: "Fiche F24",
  meta: ["4 nœuds"],
  readingTime: "35 min",
  description:
    "Comprendre le principe de récursivité, garantir l'arrêt avec un cas de base, choisir consciemment entre récursion et itération, puis parcourir une généalogie et implémenter des algorithmes récursifs vérifiables.",
  accent: "processus",

  nodes: {
    principeRecursivite: {
      id: "principeRecursivite",
      label: "Principe récursif",
      icon: "↻",
      kind: "modele",
      os: "universel",
      osLabel: "Comprendre",
      niveau: "Fondation",
      sections: {
        why: `<p>Certains problèmes contiennent naturellement une version plus petite d'eux-mêmes : un dossier contient des sous-dossiers, une catégorie contient des sous-catégories, une personne possède des parents qui possèdent eux-mêmes des parents. Les traiter avec une série fixe de boucles devient vite maladroit lorsque la profondeur n'est pas connue à l'avance.</p>`,
        system: `<p>Une fonction récursive est une fonction qui s'appelle elle-même sur une version plus petite du problème. Elle réutilise les contrats de fonction <span class="ref-fiche">→ F21</span>, les conditions <span class="ref-fiche">→ F14</span> et les collections <span class="ref-fiche">→ F19</span>. Elle éclaire aussi les structures imbriquées manipulées par les objets <span class="ref-fiche">→ F23</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Une récursion lisible contient deux parties :</p>
<pre><code>function somme(n) {
  if (n === 0) return 0; // cas de base
  return n + somme(n - 1); // appel sur un problème plus petit
}

console.log(somme(4)); // 10</code></pre>
<p><strong>Cas de base :</strong> situation assez simple pour produire directement un résultat et arrêter les appels.</p>
<p><strong>Étape récursive :</strong> transformation qui rapproche strictement l'entrée du cas de base.</p>
<p><strong>Combinaison :</strong> manière dont le résultat du sous-problème contribue au résultat final.</p>
<p>Utiliser la récursion lorsque la forme du problème est elle-même récursive. Une boucle reste souvent plus directe pour une répétition linéaire simple.</p>`,
        },
        senior: `<p>Un développeur expérimenté ne demande pas seulement si la fonction rappelle son propre nom. Il cherche la preuve d'arrêt : quelle mesure diminue à chaque appel, quelle entrée atteint le cas de base, et quelles entrées invalides pourraient empêcher cette progression ? Une récursion élégante mais non bornée reste un incident en attente.</p>`,
        errors: `<p><strong>Pattern 1 — Le cas de base absent :</strong> on écrit l'appel récursif avant de définir l'arrêt parce que le parcours semble évident. Les appels continuent jusqu'à épuiser la pile.</p>
<p><strong>Pattern 2 — La progression immobile :</strong> on rappelle la fonction avec la même valeur ou une valeur qui ne se rapproche pas du cas de base. Le code possède une condition d'arrêt théorique mais ne peut jamais l'atteindre.</p>
<p><strong>Pattern 3 — La récursion décorative :</strong> on remplace une boucle courte par des appels récursifs parce que la solution paraît plus sophistiquée. La lecture et le débogage deviennent plus difficiles sans bénéfice structurel.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe des fonctions, la limite de pile et les optimisations disponibles selon le langage. <strong>Ce qui ne change pas :</strong> une récursion correcte exige un cas de base et une progression vérifiable vers ce cas.</p>`,
        practice: {
          exercices: [
            {
              titre: "Tracer une somme récursive",
              etapes: [
                "Écris une fonction somme recevant un entier positif.",
                "Définis le résultat direct lorsque l'entier vaut zéro.",
                "Ajoute l'appel récursif avec une valeur strictement plus petite.",
                "Trace manuellement les appels et retours pour somme(4).",
              ],
              output:
                "Une fonction et une trace montrant les appels 4, 3, 2, 1, 0 puis les résultats retournés.",
              critere:
                "Chaque appel se rapproche du cas de base et la trace finale produit exactement 10.",
            },
          ],
          piege:
            "Tester seulement une valeur positive sans vérifier le comportement pour zéro et pour une entrée invalide.",
        },
        verification: [
          "Quelles sont les deux conditions indispensables à une récursion correcte ?",
          "Une fonction rappelle exactement la même entrée après chaque appel. Pourquoi son cas de base ne suffit-il pas ?",
          "Pourquoi une boucle reste-t-elle souvent préférable pour une répétition linéaire simple ?",
        ],
      },
    },

    pileAppels: {
      id: "pileAppels",
      label: "Pile d'appels",
      icon: "▤",
      kind: "diagnostic",
      os: "universel",
      osLabel: "Anticiper",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une fonction récursive ne disparaît pas lorsqu'elle appelle la suivante : chaque appel attend encore son résultat. Sur une entrée trop profonde, ces contextes s'accumulent jusqu'à dépasser la mémoire réservée à la pile d'appels. Un algorithme logiquement correct peut donc rester impraticable.</p>`,
        system: `<p>Chaque appel empile un contexte contenant paramètres, variables locales et adresse de retour. Le lien avec la stack mémoire est détaillé dans <span class="ref-fiche">→ F04</span>. Les tests de limites <span class="ref-fiche">→ T09</span> et la mesure de performance <span class="ref-fiche">→ P03</span> permettent de vérifier que la profondeur réelle reste acceptable.</p>`,
        choice: {
          kind: "free",
          html: `<p>Tracer la pile rend le mécanisme visible :</p>
<pre><code>somme(3)
  attend 3 + somme(2)
    attend 2 + somme(1)
      attend 1 + somme(0)
        retourne 0
      retourne 1
    retourne 3
  retourne 6</code></pre>
<p><strong>Profondeur faible et bornée :</strong> une récursion peut rester très lisible.</p>
<p><strong>Profondeur élevée ou contrôlée par l'utilisateur :</strong> préférer souvent une boucle et une pile de travail explicite.</p>
<p><strong>Arbre très large :</strong> surveiller aussi le nombre total de nœuds visités ; éviter le dépassement de pile ne suffit pas à garantir de bonnes performances.</p>`,
        },
        senior: `<p>Un développeur expérimenté demande d'où vient la profondeur maximale : configuration interne, données importées, contenu utilisateur ou réponse d'une API tierce. Dès qu'une source externe peut construire un arbre arbitrairement profond, il ajoute une borne, valide les données ou remplace la récursion par un parcours itératif explicite.</p>`,
        errors: `<p><strong>Pattern 1 — Le petit exemple rassurant :</strong> on valide l'algorithme sur trois niveaux parce que le résultat est correct. Une donnée réelle de plusieurs milliers de niveaux déclenche ensuite un dépassement de pile.</p>
<p><strong>Pattern 2 — La profondeur sans propriétaire :</strong> on suppose que l'arbre restera raisonnable sans savoir qui contrôle les données. Une entrée externe peut imposer un coût imprévu ou provoquer un déni de service.</p>
<p><strong>Pattern 3 — Le coût réduit à la pile :</strong> on transforme la récursion en boucle puis on considère le problème réglé. Le parcours visite encore trop de nœuds et reste lent malgré l'absence de stack overflow.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la taille maximale de pile, les optimisations du runtime et la profondeur des données traitées. <strong>Ce qui ne change pas :</strong> chaque appel récursif consomme un contexte jusqu'à son retour ; la profondeur et le volume total de travail doivent être bornés ou mesurés.</p>`,
        practice: {
          exercices: [
            {
              titre: "Visualiser la pile",
              etapes: [
                "Trace les appels successifs de somme(3).",
                "Indique quel appel attend encore un résultat à chaque niveau.",
                "Compte la profondeur maximale de la pile.",
                "Explique ce qui se passe si la profondeur atteint plusieurs milliers de niveaux.",
              ],
              output: "Un schéma de pile annoté et une explication du risque de dépassement.",
              critere:
                "Le schéma distingue clairement la phase d'empilement des appels et la phase de retour des résultats.",
            },
          ],
          piege:
            "Compter seulement les opérations arithmétiques en oubliant que chaque appel conserve aussi son propre contexte.",
        },
        verification: [
          "Pourquoi une récursion correcte peut-elle malgré tout provoquer un stack overflow ?",
          "Une API fournit une arborescence librement créée par les utilisateurs. Quelle protection ajoutes-tu avant de la parcourir ?",
          "Pourquoi remplacer la récursion par une boucle ne réduit-il pas automatiquement le nombre de nœuds visités ?",
        ],
      },
    },

    recursionOuIteration: {
      id: "recursionOuIteration",
      label: "Récursion ou itération",
      icon: "⇄",
      kind: "decision",
      os: "universel",
      osLabel: "Choisir",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Récursion et boucle peuvent souvent produire le même résultat, mais elles ne rendent pas les mêmes choses faciles à lire ni à contrôler. Choisir par habitude conduit soit à des algorithmes récursifs fragiles, soit à des boucles complexes qui simulent maladroitement une structure arborescente.</p>`,
        system: `<p>La comparaison prolonge les boucles <span class="ref-fiche">→ F14</span> et les fonctions <span class="ref-fiche">→ F21</span>. Pour des données imbriquées, les objets <span class="ref-fiche">→ F23</span> représentent souvent les nœuds et les listes <span class="ref-fiche">→ F19</span> leurs enfants. La décision doit ensuite être vérifiée sur les limites avec <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir selon la forme du problème et ses contraintes :</p>
<p><strong>Boucle simple :</strong> adaptée pour parcourir une liste plate, compter, filtrer ou répéter jusqu'à une condition claire.</p>
<p><strong>Récursion :</strong> adaptée lorsqu'un élément contient des sous-éléments de même nature : arbre de commentaires, menu, dossiers ou généalogie.</p>
<p><strong>Boucle avec pile explicite :</strong> adaptée lorsqu'un parcours d'arbre doit supporter une grande profondeur ou offrir un contrôle précis sur l'ordre de visite.</p>
<pre><code>function compterPersonnes(personne) {
  if (!personne) return 0;
  return 1 + personne.parents.reduce(
    (total, parent) =&gt; total + compterPersonnes(parent),
    0
  );
}</code></pre>
<p>Comparer lisibilité, profondeur maximale, mémoire et comportement attendu sur les données réelles.</p>`,
        },
        senior: `<p>Un développeur expérimenté n'oppose pas récursion et itération comme deux camps. Il commence par la structure du problème, puis regarde les données de production. Un arbre de catégories limité à cinq niveaux privilégie la clarté ; un graphe importé depuis l'extérieur exige davantage de contrôle, une limite de profondeur et parfois une détection des cycles.</p>`,
        errors: `<p><strong>Pattern 1 — La récursion par réflexe :</strong> on applique une fonction récursive à toute répétition parce que le chapitre vient d'être appris. Une boucle plate aurait exprimé l'intention plus directement.</p>
<p><strong>Pattern 2 — La boucle enchevêtrée :</strong> on écrit plusieurs niveaux de boucles fixes pour parcourir une arborescence parce que les premières données ont seulement trois niveaux. Le quatrième niveau est ignoré ou impose une nouvelle copie de code.</p>
<p><strong>Pattern 3 — L'arbre supposé :</strong> on traite un graphe comme un arbre parce que les exemples n'ont aucun cycle. Une référence circulaire rappelle indéfiniment les mêmes nœuds.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la forme des données, leur profondeur maximale et les garanties apportées par leur source. <strong>Ce qui ne change pas :</strong> le choix entre récursion et itération doit rendre la structure lisible tout en bornant le travail et en traitant les cycles lorsque les données peuvent en contenir.</p>`,
        practice: {
          exercices: [
            {
              titre: "Comparer deux parcours",
              etapes: [
                "Crée une petite arborescence de catégories avec trois niveaux.",
                "Compte les catégories avec une fonction récursive.",
                "Réécris le parcours avec une boucle et une pile explicite.",
                "Compare la lisibilité et le comportement sur une profondeur artificiellement élevée.",
              ],
              output:
                "Deux implémentations produisant le même résultat et une justification du choix retenu.",
              critere:
                "La comparaison mentionne lisibilité, profondeur, mémoire et contrôle des données.",
            },
          ],
          piege:
            "Déclarer une solution meilleure dans tous les cas sans décrire la profondeur ni la provenance des données.",
        },
        verification: [
          "Dans quel cas une boucle avec pile explicite devient-elle préférable à une récursion ?",
          "Un menu imbriqué gagne un quatrième niveau imprévu. Pourquoi trois boucles imbriquées constituent-elles une solution fragile ?",
          "Pourquoi faut-il distinguer un arbre d'un graphe avant de choisir un parcours récursif ?",
        ],
      },
    },

    genealogieAlgorithmes: {
      id: "genealogieAlgorithmes",
      label: "Généalogie récursive",
      icon: "♢",
      kind: "processus",
      os: "universel",
      osLabel: "Implémenter",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une généalogie rend la récursion concrète : une personne possède zéro, un ou plusieurs parents connus, et chaque parent suit exactement la même structure. Le même raisonnement s'applique ensuite à des menus imbriqués, des commentaires avec réponses, des dossiers ou certaines données hiérarchiques reçues par une API.</p>`,
        system: `<p>La généalogie utilise des objets imbriqués <span class="ref-fiche">→ F23</span>, des listes de parents <span class="ref-fiche">→ F19</span> et une fonction récursive <span class="ref-fiche">→ F21</span>. Elle peut être décrite d'abord en pseudo-code <span class="ref-fiche">→ F22</span>, puis testée sur cas vide, profondeur variable et cycle invalide <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Partir d'un contrat explicite et d'une donnée finie :</p>
<pre><code>const lina = {
  nom: "Lina",
  parents: [
    { nom: "Nora", parents: [] },
    { nom: "Samir", parents: [] }
  ]
};

function listerNoms(personne, profondeur = 0) {
  const ligne = "  ".repeat(profondeur) + personne.nom;
  return [
    ligne,
    ...personne.parents.flatMap((parent) =&gt;
      listerNoms(parent, profondeur + 1)
    )
  ];
}

console.log(listerNoms(lina).join("\\n"));</code></pre>
<p><strong>Cas de base :</strong> une personne sans parent connu retourne seulement son propre nom.</p>
<p><strong>Étape récursive :</strong> parcourir chaque parent avec une profondeur augmentée.</p>
<p><strong>Résultat :</strong> combiner les lignes de la personne et de ses ascendants.</p>
<p>Pour des données externes, ajouter une limite de profondeur et un ensemble d'identifiants déjà visités afin d'éviter les cycles.</p>`,
        },
        senior: `<p>Un développeur expérimenté sépare le parcours de l'affichage. La fonction récursive produit d'abord une structure ou une liste vérifiable ; l'interface web ou mobile décide ensuite comment la rendre. Il pense aussi aux données imparfaites : parent inconnu, doublon, cycle d'import et arbre trop profond.</p>`,
        errors: `<p><strong>Pattern 1 — L'affichage collé au parcours :</strong> on modifie directement le DOM ou l'interface mobile pendant la récursion parce que le résultat doit être visible. Le calcul devient difficile à tester et impossible à réutiliser côté serveur.</p>
<p><strong>Pattern 2 — Le parent toujours présent :</strong> on appelle récursivement chaque propriété attendue sans traiter l'absence de parent. Une donnée partielle interrompt tout le parcours.</p>
<p><strong>Pattern 3 — Le cycle familial impossible :</strong> on suppose que les données métier ne peuvent jamais contenir de boucle. Une erreur d'import suffit pourtant à rappeler indéfiniment les mêmes personnes.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la forme exacte de l'objet, le rendu UI et la source des données généalogiques ou hiérarchiques. <strong>Ce qui ne change pas :</strong> un parcours récursif fiable sépare calcul et affichage, traite les branches absentes et se protège contre la profondeur excessive ainsi que les cycles possibles.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire une généalogie",
              etapes: [
                "Crée une personne racine avec deux parents et au moins un grand-parent.",
                "Écris une fonction récursive qui retourne les noms indentés selon leur profondeur.",
                "Teste une personne sans parent et une branche où un parent est inconnu.",
                "Ajoute une limite de profondeur puis explique où placer une détection de cycle pour des données importées.",
              ],
              output:
                "Une structure de généalogie, une fonction récursive et quatre scénarios vérifiés.",
              critere:
                "Le résultat inclut chaque personne attendue une seule fois, traite une branche vide et s'arrête lorsque la limite est atteinte.",
            },
          ],
          piege:
            "Construire le HTML directement dans le parcours sans conserver un résultat intermédiaire simple à vérifier.",
        },
        verification: [
          "Pourquoi une généalogie se prête-t-elle naturellement à la récursion ?",
          "Une donnée importée relie par erreur un ascendant à lui-même. Quelle protection empêche la boucle infinie ?",
          "Pourquoi séparer le parcours récursif du rendu de l'interface améliore-t-il les usages full stack ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 980 300",
      nodes: [
        { id: "principeRecursivite", x: 20, y: 115, w: 185, h: 65 },
        { id: "pileAppels", x: 270, y: 40, w: 165, h: 65 },
        { id: "recursionOuIteration", x: 270, y: 195, w: 200, h: 65 },
        { id: "genealogieAlgorithmes", x: 555, y: 115, w: 210, h: 65 },
      ],
      edges: [
        { x1: 205, y1: 132, x2: 268, y2: 85, label: "empile" },
        { x1: 205, y1: 162, x2: 268, y2: 225, label: "met en balance" },
        { x1: 435, y1: 85, x2: 553, y2: 132, label: "borne" },
        { x1: 470, y1: 225, x2: 553, y2: 162, label: "oriente" },
      ],
    },
  },
});
