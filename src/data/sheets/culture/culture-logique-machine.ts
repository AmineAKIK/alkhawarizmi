import { cultureSheet } from "./culture-common";

export const cultureLogiqueMachine = cultureSheet({
  id: "culture-F14",
  number: 14,
  title: "La Logique de la Machine",
  subtitle: "Opérateurs ET, OU, NON — et comment la machine prend des décisions à partir de 0 et de 1",
  badge: "Fiche F14",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description: "Un ordinateur ne 'réfléchit' pas. Il évalue des expressions logiques, teste des conditions, et saute vers des instructions différentes selon les résultats. Tout le raisonnement d'un programme — chaque if, chaque boucle, chaque décision — repose sur trois opérations fondamentales : ET, OU, NON. Cette fiche construit le pont entre le binaire physique de la machine et les structures de contrôle qu'un développeur écrit au quotidien.",
  accent: "modele",

  nodes: {
    fonctionnementLogique: {
      id: "fonctionnementLogique",
      label: "Le fonctionnement logique de la machine",
      icon: "⚡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Pourquoi un CPU peut-il faire des calculs, trier des données, afficher des pixels et jouer de la musique avec des milliards de transistors qui ne font qu'ouvrir ou fermer un circuit électrique ? La réponse tient en un concept : l'algèbre de Boole. En 1854, George Boole a montré que tout raisonnement logique peut être réduit à des opérations sur des valeurs binaires (vrai/faux, 1/0). En 1937, Claude Shannon a montré que ces opérations pouvaient être implémentées avec des circuits électriques. Cette connexion est le fondement de toute l'informatique. Comprendre pourquoi la machine "pense" en 0 et 1 et comment elle en dérive toute logique est indispensable pour comprendre ce qu'on lui demande de faire.</p>`,
        system: `<p>Ce nœud est la suite directe du binaire et de la représentation de l'information <span class="ref-fiche">→ F04</span>. Il constitue le socle des opérateurs logiques <span class="ref-fiche">→ operateursEtOu</span> et des structures de contrôle <span class="ref-fiche">→ structuresControle</span>. Il éclaire rétrospectivement pourquoi les origines mathématiques de l'informatique <span class="ref-fiche">→ F01</span> — Boole et Turing en particulier — ont des conséquences directes sur chaque ligne de code écrite aujourd'hui.</p>`,
        choice: {
          kind: "free",
          html: `<p>Comment la machine traduit la logique en électricité :</p>
<p><strong>Les portes logiques :</strong> un transistor est un interrupteur électronique contrôlé par un signal électrique. Fermé (courant passe) = 1. Ouvert (courant bloqué) = 0. En combinant des transistors, on construit des <em>portes logiques</em> — des circuits élémentaires qui implémentent les opérations booléennes. Une porte ET (AND) : sa sortie est 1 uniquement si <em>toutes</em> ses entrées sont 1. Une porte OU (OR) : sa sortie est 1 si <em>au moins une</em> entrée est 1. Une porte NON (NOT) : inverse la valeur (0 devient 1, 1 devient 0). Ces trois portes suffisent à implémenter n'importe quel circuit logique — addition, comparaison, mémorisation.</p>
<p><strong>Des portes aux circuits :</strong> un additionneur binaire (circuit qui additionne deux bits) est construit avec 5 portes logiques (2 XOR, 2 AND, 1 OR). Un processeur moderne contient des milliards de transistors organisés en millions de ces circuits. L'unité arithmétique et logique (ALU) du CPU — qui effectue toutes les opérations mathématiques et les comparaisons — est une combinaison de portes logiques. Quand Python exécute <code>a + b</code>, c'est une cascade d'opérations sur des milliards de transistors qui s'ouvrent et se ferment en quelques nanosecondes.</p>
<p><strong>Les valeurs booléennes en programmation :</strong> dans tous les langages, une valeur booléenne est soit vraie (<code>true</code>, <code>1</code>, toute valeur non nulle) soit fausse (<code>false</code>, <code>0</code>, <code>null</code>, <code>undefined</code>, chaîne vide). C'est la traduction directe du 0/1 des transistors au niveau du code. Les langages ajoutent des subtilités — JavaScript a des valeurs "falsy" (0, "", null, undefined, NaN, false) et "truthy" (tout le reste) — mais le modèle sous-jacent est toujours booléen.</p>
<p><strong>Pourquoi ça compte pour un développeur web :</strong> les conditions d'authentification (<em>"l'utilisateur est connecté ET a le rôle admin"</em>), les filtres de recherche (<em>"produits en stock OU en réapprovisionnement"</em>), les validations de formulaire (<em>"email rempli ET format valide"</em>) — toutes ces logiques métier se traduisent en expressions booléennes sur des opérateurs ET, OU, NON. Savoir lire et écrire ces expressions avec précision évite les bugs de logique, souvent les plus difficiles à détecter.</p>`,
        },
        senior: `<p>Un développeur expérimenté sait que les bugs de logique — une condition ET au lieu de OU, un NON mal placé — sont parmi les plus dangereux car ils ne provoquent pas d'erreur d'exécution. Le programme tourne, mais produit des résultats incorrects dans certains cas. Ces bugs sont particulièrement vicieux dans les contrôles d'accès et les validations de données : <code>isAdmin || isOwner</code> au lieu de <code>isAdmin && isOwner</code> peut exposer des données à des utilisateurs non autorisés sans aucun message d'erreur.</p>`,
        errors: `<p><strong>Pattern 1 — Confondre vérité en logique et vérité en code :</strong> en mathématiques, un prédicat est vrai ou faux avec précision. En JavaScript, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code> et <code>NaN</code> sont tous "falsy" — mais pas identiques. Écrire <code>if (!user)</code> quand on veut tester <code>if (user === null || user === undefined)</code> peut inclure par erreur le cas où <code>user</code> est <code>0</code> ou une chaîne vide.</p>
<p><strong>Pattern 2 — Négliger les cas limites des expressions booléennes :</strong> tester une expression logique uniquement avec les cas "normaux" sans tester les combinaisons aux limites. Une expression comme <code>age >= 18 && hasConsent</code> fonctionne pour les cas courants, mais qu'arrive-t-il si <code>age</code> est <code>undefined</code> ? L'expression devient <code>undefined >= 18</code>, qui est <code>false</code> en JavaScript — comportement correct par chance, mais non intentionnel et non documenté.</p>
<p><strong>Pattern 3 — Imbriquer des conditions sans les simplifier :</strong> écrire une cascade de <code>if</code> imbriqués qui testent la même variable sous différents angles alors qu'une expression booléenne composite serait plus lisible et moins sujette aux erreurs. La complexité cognitive des conditions imbriquées masque les bugs de logique.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe des opérateurs selon les langages (<code>&&</code> en JS/C, <code>and</code> en Python, <code>AND</code> en SQL), la gestion des valeurs "falsy" selon les langages, les optimisations du compilateur sur les expressions booléennes. <strong>Ce qui ne change pas :</strong> les trois opérateurs fondamentaux ET, OU, NON et leurs tables de vérité ; le modèle booléen comme base de toute logique conditionnelle ; la correspondance entre portes logiques physiques et opérateurs du code.</p>`,
        practice: {
          exercices: [
            {
              titre: "Décomposer une règle métier en expression booléenne",
              etapes: [
                "Prends une règle d'accès ou de validation de ton projet (ou fictive) : par exemple 'un utilisateur peut voir ce contenu s'il est abonné premium ET que son abonnement n'est pas expiré, OU s'il est administrateur'.",
                "Identifie chaque prédicat atomique (une seule assertion vraie ou fausse) : <em>isPremium</em>, <em>!isExpired</em>, <em>isAdmin</em>.",
                "Construis l'expression booléenne et vérifie sa table de vérité pour les 4 à 8 combinaisons possibles.",
                "Identifie les cas limites : que se passe-t-il si <em>isPremium</em> est <code>undefined</code> ? Si <em>isAdmin</em> est <code>null</code> ?",
                "Implémente la vérification dans le langage de ton choix avec des valeurs de test pour chaque combinaison.",
              ],
              output: "Expression booléenne décomposée en prédicats atomiques + table de vérité pour toutes les combinaisons + test des cas limites.",
              critere: "La table de vérité doit couvrir tous les cas possibles, pas seulement les cas 'normaux'. Chaque combinaison doit produire le résultat attendu selon la règle métier.",
            },
          ],
          piege: "Croire que les expressions booléennes complexes sont plus lisibles quand elles sont décomposées en variables intermédiaires nommées. En réalité, <code>const canView = (isPremium && !isExpired) || isAdmin</code> est plus lisible et testable qu'un <code>if</code> imbriqué de 10 lignes — à condition que les noms soient précis et que les cas limites soient traités.",
        },
        verification: [
          "Expliquez comment des transistors qui ne font qu'ouvrir ou fermer un circuit électrique permettent à un processeur d'additionner deux nombres entiers. Quel est le lien entre une porte logique AND et un transistor physique ?",
          "En JavaScript, <code>0 || 'défaut'</code> retourne <code>'défaut'</code> alors que <code>0 ?? 'défaut'</code> retourne <code>0</code>. Expliquez la différence en termes de valeurs booléennes, et dans quel contexte chaque opérateur est le bon choix.",
          "Une fonction de contrôle d'accès contient <code>return isAdmin || isOwner && !isSuspended</code>. À cause de la précédence des opérateurs, cette expression n'est pas évaluée comme on pourrait l'attendre. Réécrivez-la correctement avec des parenthèses explicites pour exprimer 'admin OU (propriétaire non suspendu)'.",
        ],
      },
    },

    operateursEtOu: {
      id: "operateursEtOu",
      label: "Opérateurs ET, OU et NON",
      icon: "🔗",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>ET, OU, NON sont les briques élémentaires de tout raisonnement conditionnel en programmation. Ils semblent triviaux — et ils le sont conceptuellement — mais leur mauvaise utilisation est responsable de toute une classe de bugs difficiles à détecter : des validations qui laissent passer des données invalides, des contrôles d'accès qui accordent des permissions incorrectes, des filtres qui excluent ou incluent les mauvais éléments. Comprendre précisément leur sémantique et leur comportement dans les cas limites (court-circuit, précédence, valeurs falsy) est indispensable pour écrire un code fiable.</p>`,
        system: `<p>Les opérateurs ET, OU, NON sont la mise en pratique des fondements logiques <span class="ref-fiche">→ fonctionnementLogique</span> dans le code. Ils sont le matériau direct des structures de contrôle <span class="ref-fiche">→ structuresControle</span> — toute condition dans un <code>if</code> est une expression booléenne composée de ces opérateurs. Leur compréhension approfondie est aussi indispensable pour la validation des données <span class="ref-fiche">→ T06</span> et la sécurité applicative <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les trois opérateurs en détail :</p>
<p><strong>Opérateur ET (AND — <code>&&</code> en JS/C, <code>and</code> en Python) :</strong> retourne vrai uniquement si <em>toutes</em> les conditions sont vraies. Table de vérité : <code>vrai ET vrai = vrai</code>, <code>vrai ET faux = faux</code>, <code>faux ET vrai = faux</code>, <code>faux ET faux = faux</code>. Usage : "l'utilisateur doit satisfaire <em>toutes</em> les conditions". Exemple : <code>isConnected && hasPermission && !isBanned</code>. Court-circuit (short-circuit evaluation) : si la première condition est fausse, la seconde n'est pas évaluée. <code>user && user.email</code> — si <code>user</code> est null, <code>user.email</code> n'est jamais évalué (évite une erreur).</p>
<p><strong>Opérateur OU (OR — <code>||</code> en JS/C, <code>or</code> en Python) :</strong> retourne vrai si <em>au moins une</em> condition est vraie. Table de vérité : <code>vrai OU vrai = vrai</code>, <code>vrai OU faux = vrai</code>, <code>faux OU vrai = vrai</code>, <code>faux OU faux = faux</code>. Usage : "l'utilisateur satisfait <em>au moins une</em> des conditions". Exemple : <code>isAdmin || isOwner</code>. Court-circuit : si la première condition est vraie, la seconde n'est pas évaluée. En JavaScript, <code>||</code> est aussi utilisé pour les valeurs par défaut : <code>const name = user.name || 'Anonyme'</code> — mais attention, cette syntaxe retourne la valeur par défaut si <code>user.name</code> est falsy (y compris <code>0</code> ou <code>""</code>, ce qui peut être indésirable).</p>
<p><strong>Opérateur NON (NOT — <code>!</code> en JS/C, <code>not</code> en Python) :</strong> inverse la valeur booléenne. <code>!true = false</code>, <code>!false = true</code>. Usage : "la condition doit être absente". Exemple : <code>!isExpired</code>, <code>!user</code> (l'utilisateur n'existe pas). Double négation : <code>!!</code> est un pattern pour convertir une valeur quelconque en booléen strict. <code>!!user.name</code> retourne <code>true</code> si <code>user.name</code> est une chaîne non vide, <code>false</code> sinon.</p>
<p><strong>Opérateurs dérivés utiles en JavaScript :</strong> <code>??</code> (nullish coalescing) : retourne la valeur de droite uniquement si celle de gauche est <code>null</code> ou <code>undefined</code> (pas si elle est <code>0</code> ou <code>""</code>). Plus précis que <code>||</code> pour les valeurs par défaut. <code>?.</code> (optional chaining) : <code>user?.email</code> retourne <code>undefined</code> si <code>user</code> est null/undefined, sans erreur. Équivalent concis de <code>user && user.email</code>.</p>
<p><strong>Précédence des opérateurs :</strong> <code>!</code> (NON) a la priorité la plus haute, puis <code>&&</code> (ET), puis <code>||</code> (OU). Donc <code>a || b && c</code> est évalué comme <code>a || (b && c)</code>. Cette précédence, héritée de la notation mathématique (multiplication avant addition), est source de bugs quand elle n'est pas anticipée. Règle pratique : utiliser des parenthèses explicites dès qu'une expression mélange <code>&&</code> et <code>||</code>.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise systématiquement des parenthèses explicites dans les expressions booléennes composites, même quand elles ne sont pas techniquement nécessaires. <code>(isAdmin || isOwner) && !isSuspended</code> est plus lisible et moins sujette à interprétation que <code>isAdmin || isOwner && !isSuspended</code>, même si les deux sont syntaxiquement valides. La lisibilité d'une condition de sécurité est une propriété de sécurité en elle-même : une condition illisible sera mal modifiée.</p>`,
        errors: `<p><strong>Pattern 1 — Utiliser <code>||</code> pour les valeurs par défaut quand 0 ou "" sont des valeurs valides :</strong> écrire <code>const count = options.count || 10</code> retourne 10 si <code>options.count</code> est <code>0</code>, ce qui est probablement un bug. La valeur <code>0</code> est falsy en JavaScript mais c'est une valeur de comptage parfaitement valide. Utiliser <code>??</code> : <code>const count = options.count ?? 10</code> retourne 10 uniquement si <code>options.count</code> est null ou undefined.</p>
<p><strong>Pattern 2 — Évaluer des effets de bord via le court-circuit :</strong> utiliser le court-circuit ET pour déclencher des effets de bord conditionnels : <code>isLogged && logEvent('action')</code>. Techniquement fonctionnel, mais illisible et difficile à tester. Le court-circuit doit être réservé aux accès optionnels (<code>user?.email</code>), pas aux effets de bord.</p>
<p><strong>Pattern 3 — Nier des expressions complexes sans appliquer les lois de De Morgan :</strong> écrire <code>!(a && b)</code> en croyant que c'est équivalent à <code>!a && !b</code>. Ce n'est pas le cas. Les lois de De Morgan stipulent : <code>!(a && b) = !a || !b</code> et <code>!(a || b) = !a && !b</code>. Confondre les deux produit des conditions dont la logique est inversée par rapport à l'intention.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe selon les langages, les opérateurs supplémentaires (<code>??</code>, <code>?.</code>), le comportement avec les valeurs non booléennes. <strong>Ce qui ne change pas :</strong> les tables de vérité de ET, OU, NON — invariantes quelle que soit la technologie ; le court-circuit (AND évalue de gauche à droite et s'arrête au premier faux, OR au premier vrai) ; les lois de De Morgan (utiles pour simplifier ou nier des expressions composites).</p>`,
        practice: {
          exercices: [
            {
              titre: "Réécrire des conditions problématiques",
              etapes: [
                "Identifie dans un projet réel (ou exercice fictif) une condition avec au moins deux opérateurs logiques. Exemple : <code>if (user.role === 'admin' || user.role === 'moderator' && !user.isBanned)</code>.",
                "Évalue cette condition manuellement pour 4 combinaisons : admin non banni, admin banni, modérateur non banni, modérateur banni. Quel est le résultat attendu ? Quel est le résultat réel (en tenant compte de la précédence) ?",
                "Si les résultats diffèrent, réécris la condition avec des parenthèses explicites pour qu'elle exprime l'intention réelle.",
                "Applique les lois de De Morgan pour simplifier une condition niée complexe. Exemple : <code>!(a === null || b === undefined)</code> devient <code>a !== null && b !== undefined</code>.",
              ],
              output: "Condition originale + table de vérité pour 4 cas + condition corrigée avec parenthèses + une application des lois de De Morgan.",
              critere: "La table de vérité doit être construite manuellement — pas devinée. Chaque cas doit avoir le résultat attendu documenté avant d'évaluer le résultat réel.",
            },
          ],
          piege: "Simplifier des conditions complexes sans vérifier toutes les combinaisons. Une simplification 'logique' qui modifie la précédence implicite peut inverser un cas limite sans que les tests habituels le détectent. Toute modification d'une condition critique doit s'accompagner d'une vérification de toutes les combinaisons, pas seulement des cas courants.",
        },
        verification: [
          "Construisez la table de vérité complète de l'expression <code>(A || B) && !C</code> pour toutes les combinaisons possibles de A, B, C. Quelle est la différence avec <code>A || (B && !C)</code> ?",
          "Pourquoi <code>const label = item.count || 'aucun'</code> est un bug potentiel quand <code>item.count</code> peut valoir <code>0</code>, et quelle est la syntaxe correcte en JavaScript moderne pour exprimer cette intention ?",
          "Énoncez les deux lois de De Morgan et montrez comment elles permettent de réécrire <code>!(isExpired || isDeleted)</code> sous une forme équivalente sans négation globale.",
        ],
      },
    },

    structuresControle: {
      id: "structuresControle",
      label: "Bases des structures de contrôle",
      icon: "🔀",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un programme qui exécute toujours les mêmes instructions dans le même ordre n'est pas un programme — c'est une procédure fixe. Les structures de contrôle sont ce qui permet à un programme de s'adapter : exécuter une séquence d'instructions si une condition est vraie, répéter une opération tant qu'une condition reste vraie, sauter vers un bloc différent selon une valeur. Sans elles, il n'existe pas de logique conditionnelle, pas d'itération, pas de programme interactif. Elles sont les briques fondamentales de tout algorithme.</p>`,
        system: `<p>Les structures de contrôle sont l'application directe des opérateurs logiques <span class="ref-fiche">→ operateursEtOu</span> dans le flux d'exécution d'un programme. Elles s'appuient sur le fonctionnement logique de la machine <span class="ref-fiche">→ fonctionnementLogique</span> et constituent le vocabulaire de base pour implémenter n'importe quel algorithme <span class="ref-fiche">→ F01</span>. La maîtrise des structures de contrôle conditionne directement l'architecture du code <span class="ref-fiche">→ T03</span> et la lisibilité des tests <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les structures de contrôle fondamentales :</p>
<p><strong>La conditionnelle — if / else if / else :</strong> exécute un bloc d'instructions si une condition est vraie. Structure de base :</p>
<pre>
if (condition) {
  // exécuté si condition est vraie
} else if (autreCondition) {
  // exécuté si condition est fausse ET autreCondition est vraie
} else {
  // exécuté si toutes les conditions précédentes sont fausses
}
</pre>
<p>Chaque <code>else if</code> est mutuellement exclusif avec les branches précédentes — une seule branche s'exécute. La clause <code>else</code> garantit qu'un cas est toujours couvert. Omettre le <code>else</code> signifie accepter qu'aucune action ne soit prise si toutes les conditions sont fausses — intentionnel ou bug selon le contexte.</p>
<p><strong>Le switch / match :</strong> évalue une valeur et exécute le bloc correspondant. Plus lisible que des <code>else if</code> en chaîne quand on compare une variable à plusieurs valeurs fixes. Le <code>default</code> est l'équivalent du <code>else</code>. En JavaScript, le <code>break</code> est obligatoire pour éviter le "fall-through" (exécution des cases suivants). Python utilise <code>match/case</code> (depuis 3.10) avec une sémantique plus puissante (pattern matching).</p>
<p><strong>La boucle while — tant que :</strong> exécute un bloc répétitivement tant qu'une condition est vraie. La condition est évaluée avant chaque itération. Si la condition est fausse dès le début, le bloc n'est jamais exécuté. Risque : boucle infinie si la condition ne devient jamais fausse. Usage : quand le nombre d'itérations n'est pas connu à l'avance (lire un fichier jusqu'à la fin, attendre un événement, algorithme de recherche).</p>
<p><strong>La boucle for — pour chaque :</strong> itère un nombre déterminé de fois ou sur chaque élément d'une collection. La forme classique <code>for (let i = 0; i &lt; n; i++)</code> combine initialisation, condition, et incrément. <code>for...of</code> (JS) et <code>for item in collection</code> (Python) itèrent sur les éléments d'une collection sans gérer l'index manuellement. Usage : quand le nombre d'itérations est connu ou quand on traite tous les éléments d'une liste.</p>
<p><strong>break et continue :</strong> <code>break</code> interrompt la boucle immédiatement. <code>continue</code> passe à l'itération suivante sans exécuter le reste du bloc courant. Ces instructions permettent de contrôler finement le flux dans une boucle, mais leur suruti-lisation rend le code difficile à lire — souvent un signal que la condition de boucle ou la structure du traitement peuvent être améliorées.</p>`,
        },
        senior: `<p>Un développeur expérimenté préfère la forme la plus expressive selon le contexte. Pour itérer sur une liste et transformer ses éléments, <code>map</code>/<code>filter</code>/<code>reduce</code> (programmation fonctionnelle) est plus lisible qu'une boucle <code>for</code> impérative avec une variable accumulatrice. Pour une logique conditionnelle complexe avec beaucoup de cas, un objet de dispatch (dictionnaire de fonctions) est souvent plus maintenable qu'une chaîne de <code>else if</code>. La structure de contrôle choisie communique l'intention : <code>forEach</code> dit "je traite chaque élément", <code>while</code> dit "je répète jusqu'à", <code>if/else</code> dit "je prends une décision binaire".</p>`,
        errors: `<p><strong>Pattern 1 — Nesting excessif (pyramide de la mort) :</strong> imbriquer des <code>if</code> dans des <code>if</code> dans des <code>if</code> jusqu'à 4 ou 5 niveaux de profondeur. Chaque niveau d'imbrication rend le code exponentiellement plus difficile à lire et à tester. La technique d'early return (retour anticipé) transforme les conditions imbriquées en conditions plates en retournant immédiatement quand une condition d'échec est rencontrée.</p>
<p><strong>Pattern 2 — Boucle while sans condition de sortie garantie :</strong> écrire une boucle <code>while (true)</code> ou une condition de sortie qui dépend d'un état externe non maîtrisé, sans mécanisme de sécurité (compteur limite, timeout). Une boucle infinie en production bloque le processus entier.</p>
<p><strong>Pattern 3 — Modifier la collection en cours d'itération :</strong> ajouter ou supprimer des éléments dans une liste pendant qu'on l'itère. Ce comportement est non défini ou source de bugs dans la plupart des langages — certains éléments peuvent être sautés ou traités deux fois. Construire une nouvelle collection est le pattern correct.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe selon les langages (Python n'a pas de <code>switch</code> classique, Rust a le <code>match</code> exhaustif, JavaScript a <code>for...of</code>), les idiomes préférés (impératif vs fonctionnel), les optimisations du compilateur sur les boucles. <strong>Ce qui ne change pas :</strong> les trois catégories fondamentales (séquence, conditionnelle, répétition) — tout algorithme s'exprime avec ces trois constructions (théorème de Böhm-Jacopini, 1966) ; le risque de boucle infinie avec <code>while</code> ; la lisibilité comme critère de choix entre formes équivalentes.</p>`,
        practice: {
          exercices: [
            {
              titre: "Refactoriser une fonction avec nesting excessif",
              etapes: [
                "Écris (ou trouve dans un projet existant) une fonction avec au moins 3 niveaux d'imbrication de <code>if</code>. Exemple : valider un formulaire avec plusieurs champs, chacun avec plusieurs conditions.",
                "Applique la technique d'early return : dès qu'une condition d'échec est rencontrée, retourner immédiatement avec le message d'erreur approprié.",
                "Vérifie que le comportement est identique pour tous les cas en listant les inputs de test et les outputs attendus avant et après refactorisation.",
                "Évalue la lisibilité : la version avec early return est-elle plus directe ? Quels cas sont maintenant plus évidents à identifier ?",
              ],
              output: "Fonction originale avec nesting + version refactorisée avec early return + liste des cas de test qui vérifient l'équivalence.",
              critere: "La version refactorisée ne doit pas changer de comportement sur un seul cas. La liste de test doit couvrir les cas limites, pas seulement le chemin nominal.",
            },
          ],
          piege: "Considérer l'early return comme une mauvaise pratique parce qu'une fonction a 'plusieurs points de sortie'. Cette règle vient des langages sans garbage collector où gérer la mémoire manuellement à chaque point de sortie était risqué. Dans les langages modernes (JavaScript, Python), l'early return pour les conditions de garde améliore systématiquement la lisibilité.",
        },
        verification: [
          "Quelle est la différence de comportement entre <code>while (condition)</code> et <code>do { ... } while (condition)</code>, et donnez un exemple de situation où la seconde forme est la seule correcte ?",
          "Une fonction de validation contient 4 niveaux de <code>if</code> imbriqués. Réécrivez la structure avec la technique d'early return en expliquant pourquoi cette réécriture est équivalente logiquement mais supérieure en lisibilité.",
          "Le théorème de Böhm-Jacopini (1966) stipule que tout algorithme peut être exprimé avec seulement trois structures : séquence, conditionnelle, et répétition. Donnez un exemple concret d'un algorithme quotidien (trier une liste, rechercher un élément) et identifiez quelles structures de contrôle sont nécessaires pour l'implémenter.",
        ],
      },
    },

    logiquePratique: {
      id: "logiquePratique",
      label: "Logique appliquée au code réel",
      icon: "🧩",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La logique booléenne et les structures de contrôle ne sont pas des exercices académiques — elles se retrouvent dans chaque feature web : autorisation d'accès, filtrage de liste, validation de formulaire, gestion des états d'une interface, traitement des réponses d'API. La maîtrise de la logique n'est pas une compétence avancée réservée aux algorithmes complexes — c'est ce qui sépare le code qui fonctionne des cas nominaux du code qui fonctionne dans tous les cas.</p>`,
        system: `<p>Ce nœud synthétise les trois nœuds précédents de cette fiche <span class="ref-fiche">→ fonctionnementLogique</span> <span class="ref-fiche">→ operateursEtOu</span> <span class="ref-fiche">→ structuresControle</span> en patterns directement applicables dans un contexte de développement web fullstack. Il prépare les fondements pour comprendre l'architecture applicative <span class="ref-fiche">→ T03</span>, la gestion des données et la validation <span class="ref-fiche">→ T06</span>, et les tests <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quatre patterns logiques fréquents dans le développement web :</p>
<p><strong>Pattern 1 — Contrôle d'accès (guard clauses) :</strong> vérifier les conditions de garde avant d'exécuter la logique principale. Forme canonique :</p>
<pre>
function processOrder(user, order) {
  if (!user) return { error: 'Non authentifié' };
  if (!user.isActive) return { error: 'Compte suspendu' };
  if (order.items.length === 0) return { error: 'Panier vide' };
  // logique principale ici — on sait que les conditions sont satisfaites
  return processPayment(user, order);
}
</pre>
<p>Chaque garde est une condition de sortie anticipée. La logique principale est "plate" et lisible parce que toutes les conditions d'échec ont déjà été éliminées.</p>
<p><strong>Pattern 2 — Filtrage de collection :</strong> sélectionner les éléments d'une liste qui satisfont une condition. En JavaScript, <code>array.filter(item => condition(item))</code>. La condition peut combiner plusieurs opérateurs : <code>products.filter(p => p.inStock && (p.category === 'electronics' || p.isFeatured))</code>. Extraire la condition dans une fonction nommée améliore la lisibilité : <code>products.filter(isAvailableElectronics)</code>.</p>
<p><strong>Pattern 3 — Validation de formulaire :</strong> vérifier qu'un ensemble de champs satisfait des règles. Pattern typique : accumuler les erreurs plutôt que retourner à la première. Chaque règle est une expression booléenne indépendante. Séparer les règles de validation de leur déclenchement permet de les tester unitairement.</p>
<p><strong>Pattern 4 — Gestion des états d'interface :</strong> dans un composant frontend, l'affichage dépend de l'état (chargement, erreur, vide, données). Chaque état est une combinaison de valeurs booléennes : <code>isLoading</code>, <code>hasError</code>, <code>isEmpty</code>. La logique de rendu conditionnel (<code>if (isLoading) return &lt;Spinner&gt;</code>) suit exactement les mêmes règles que n'importe quelle condition. Un état incohérent (à la fois <code>isLoading = true</code> et <code>hasError = true</code>) est un bug logique dans la gestion d'état.</p>`,
        },
        senior: `<p>Un développeur expérimenté nomme ses conditions booléennes complexes pour documenter leur intention. <code>const canPublish = isAuthor && !isDraft && !hasUnresolvedReviews</code> est plus lisible qu'une longue expression inline dans un <code>if</code>. Ces variables nommées servent aussi de documentation auto-expliquante — elles disent non seulement ce qui est testé, mais pourquoi. Quand une condition change (ex: ajouter une vérification de quota), on modifie la définition de la variable en un endroit, pas toutes ses occurrences.</p>`,
        errors: `<p><strong>Pattern 1 — Logique inversée sans raison :</strong> écrire <code>if (!isValid) { ... } else { ... }</code> quand le cas principal est l'état valide. Les lecteurs doivent inverser mentalement la logique. Préférer le cas "heureux" en premier : <code>if (isValid) { ... } else { ... }</code>, sauf si le cas d'erreur est un guard clause destiné à sortir immédiatement.</p>
<p><strong>Pattern 2 — État incohérent dans l'UI :</strong> permettre des combinaisons d'états booléens qui ne peuvent pas coexister logiquement (<code>isLoading = true</code> et <code>data = [item1, item2]</code> simultanément). Utiliser un état discriminé (une valeur unique représentant l'état : 'idle', 'loading', 'success', 'error') plutôt que plusieurs booléens indépendants élimine les états incohérents par construction.</p>
<p><strong>Pattern 3 — Logique métier dans les templates/vues :</strong> placer des expressions booléennes complexes directement dans les templates HTML ou JSX. Ces expressions sont difficiles à tester et à lire. Les extraire dans des variables ou des fonctions nommées dans la logique du composant, pas dans le rendu.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les frameworks (React, Vue, Angular, Svelte), les langages (JS, Python, Go), les paradigmes de gestion d'état. <strong>Ce qui ne change pas :</strong> les patterns fondamentaux (guard clauses pour le contrôle d'accès, filtrage pour les collections, accumulation d'erreurs pour la validation) s'appliquent dans tous les langages et frameworks ; le principe de nommage des conditions complexes comme documentation ; la supériorité des états discriminés sur les booléens multiples pour éviter les états incohérents.</p>`,
        practice: {
          exercices: [
            {
              titre: "Implémenter une fonction de validation complète",
              etapes: [
                "Définis une règle de validation pour un formulaire d'inscription avec 4 champs : email (format valide), mot de passe (min 8 caractères, au moins un chiffre), nom (non vide, max 50 caractères), âge (entier entre 18 et 120).",
                "Implémente une fonction <code>validateForm(data)</code> qui retourne un objet <code>{ valid: boolean, errors: string[] }</code>.",
                "Utilise les opérateurs ET, OU, NON pour exprimer chaque règle. Nomme chaque condition atomique en variable pour documenter l'intention.",
                "Écris au moins 6 cas de test : tous valides, chaque champ invalide séparément, deux champs invalides simultanément.",
              ],
              output: "Fonction de validation avec opérateurs nommés + 6 cas de test couvrant les cas limites.",
              critere: "Chaque règle de validation doit être exprimée comme une expression booléenne nommée, pas une condition inline anonyme. Les 6 cas de test doivent couvrir exactement les cas documentés, pas des cas inventés.",
            },
          ],
          piege: "Croire que la logique booléenne s'apprend uniquement en théorie. Ces opérateurs et structures apparaissent dans le code dès les premières heures de développement. Prendre l'habitude de construire les tables de vérité manuellement pour les conditions non triviales — 15 minutes de vérification en amont évitent des heures de débogage d'un bug de logique discret.",
        },
        verification: [
          "Refactorisez cette fonction en utilisant des guard clauses et des variables booléennes nommées : <code>function getDiscount(user, cart) { if (user) { if (user.isPremium) { if (cart.total > 100) { return 0.2; } else { return 0.1; } } else { return 0; } } else { return 0; } }</code>",
          "Pourquoi représenter l'état d'un composant avec un seul état discriminé ('idle' | 'loading' | 'success' | 'error') est-il préférable à quatre booléens indépendants (<code>isIdle</code>, <code>isLoading</code>, <code>isSuccess</code>, <code>isError</code>) pour éviter les bugs logiques ?",
          "Une fonction de filtrage de produits doit retourner les produits 'disponibles à l'achat' : en stock ET (éligible à la livraison OU retrait en magasin disponible) ET non discontinué. Écrivez l'expression booléenne correspondante avec des variables nommées et construisez sa table de vérité pour au moins 4 combinaisons représentatives.",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "fonctionnementLogique", x: 10, y: 100, w: 185, h: 65 },
        { id: "operateursEtOu", x: 260, y: 40, w: 175, h: 65 },
        { id: "structuresControle", x: 260, y: 165, w: 180, h: 65 },
        { id: "logiquePratique", x: 560, y: 100, w: 175, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 258, y2: 72, label: "opérateurs" },
        { x1: 195, y1: 148, x2: 258, y2: 197, label: "flux" },
        { x1: 435, y1: 72, x2: 558, y2: 120, label: "applique" },
        { x1: 440, y1: 197, x2: 558, y2: 148, label: "structure" },
      ],
    },
  },
});
