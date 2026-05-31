import { cultureSheet } from "./culture-common";

export const cultureLogiqueMachine = cultureSheet({
  id: "culture-F14",
  number: 14,
  title: "La Logique de la Machine",
  subtitle: "Expressions booléennes, conditions et boucles — comment un programme choisit son prochain pas",
  badge: "Fiche F14",
  meta: ["6 nœuds"],
  readingTime: "40 min",
  description: "Un ordinateur ne 'réfléchit' pas : il exécute une séquence, évalue des expressions logiques, choisit une branche et répète certaines instructions. Cette fiche relie ET, OU et NON au flux d'exécution, aux structures conditionnelles, aux boucles et aux décisions quotidiennes d'une application web ou mobile.",
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
<p><strong>Les valeurs booléennes en programmation :</strong> une valeur booléenne stricte est soit vraie (<code>true</code>) soit fausse (<code>false</code>). Certains langages acceptent aussi d'autres valeurs dans un contexte conditionnel selon leurs propres règles de conversion. En JavaScript, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code> et <code>false</code> sont "falsy" ; le reste est "truthy". Ces conversions pratiques ne doivent pas être confondues avec une égalité entre les valeurs.</p>
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
          piege: "Croire qu'une expression booléenne complexe devient automatiquement illisible dès qu'elle contient plusieurs opérateurs. Une variable intermédiaire bien nommée comme <code>const canView = (isPremium && !isExpired) || isAdmin</code> est souvent plus lisible et testable qu'un <code>if</code> imbriqué de 10 lignes — à condition que les noms soient précis et que les cas limites soient traités.",
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
      label: "Flux et structures conditionnelles",
      icon: "🔀",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Sans structure de contrôle, un programme lit ses instructions de haut en bas et exécute toujours la même séquence. Une application réelle doit pourtant réagir : refuser un paiement invalide, afficher un écran de connexion, appliquer une remise ou choisir un message selon l'état du réseau. Les structures conditionnelles transforment une expression booléenne en bifurcation explicite dans le flux d'exécution.</p>`,
        system: `<p>Le flux d'exécution applique les opérateurs logiques <span class="ref-fiche">→ operateursEtOu</span> aux données et comparaisons <span class="ref-fiche">→ F17</span>. Les branches conditionnelles préparent l'optimisation des conditions <span class="ref-fiche">→ optimisationConditions</span> et se combinent aux répétitions <span class="ref-fiche">→ bouclesRepetition</span>. Elles structurent ensuite les règles métier <span class="ref-fiche">→ T03</span> et les cas de test <span class="ref-fiche">→ T09</span>.</p>`,
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
<p><strong>L'expression conditionnelle :</strong> un ternaire comme <code>condition ? valeurA : valeurB</code> convient à un choix court entre deux valeurs. Dès que chaque branche porte plusieurs actions ou des effets de bord, un <code>if</code> explicite reste plus lisible.</p>
<p><strong>Le flux par défaut :</strong> une condition ne doit pas cacher ce qui arrive quand aucun cas ne correspond. Un <code>else</code>, un <code>default</code> ou un retour explicite documente le comportement de repli. L'absence volontaire de branche doit aussi rester compréhensible.</p>`,
        },
        senior: `<p>Un développeur expérimenté lit une condition comme une règle métier, pas seulement comme une syntaxe valide. Il privilégie le chemin principal visible, isole les cas d'échec avec des retours anticipés et remplace les longues chaînes de cas par une table de décision ou un dictionnaire de fonctions quand le domaine grandit. La structure choisie doit rendre la prochaine modification prévisible.</p>`,
        errors: `<p><strong>Pattern 1 — La pyramide de conditions :</strong> on imbrique des <code>if</code> sur plusieurs niveaux parce que chaque nouveau cas semble local. Le lecteur doit conserver trop d'hypothèses en mémoire et un scénario limite finit par passer dans la mauvaise branche.</p>
<p><strong>Pattern 2 — Le cas silencieux :</strong> on omet <code>else</code>, <code>default</code> ou retour explicite sans décision consciente. Une nouvelle valeur métier n'est traitée nulle part et l'application semble ne rien faire.</p>
<p><strong>Pattern 3 — Le ternaire roman :</strong> on empile des ternaires pour gagner quelques lignes. La brièveté masque l'ordre des décisions et rend une modification risquée.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe des branches, les capacités de pattern matching et les conventions du langage. <strong>Ce qui ne change pas :</strong> un programme suit une séquence et une condition choisit explicitement le prochain chemin ; chaque branche utile doit rester compréhensible, testable et reliée à une intention métier.</p>`,
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
          "Comment une expression booléenne modifie-t-elle le flux d'exécution d'un programme séquentiel ?",
          "Une fonction de validation contient 4 niveaux de <code>if</code> imbriqués. Réécrivez la structure avec la technique d'early return en expliquant pourquoi cette réécriture est équivalente logiquement mais supérieure en lisibilité.",
          "Quand choisis-tu un <code>switch</code> ou <code>match</code> plutôt qu'une chaîne de <code>else if</code>, et quel comportement de repli dois-tu rendre explicite ?",
        ],
      },
    },

    optimisationConditions: {
      id: "optimisationConditions",
      label: "Optimiser les conditions",
      icon: "↘",
      kind: "decision",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une condition peut fonctionner et rester dangereuse à modifier. Quand une règle d'accès mélange rôle, abonnement, suspension, quotas et exceptions dans une seule expression, le programme devient correct par accident : personne ne sait rapidement quel cas est autorisé ni quel test manque. Optimiser une condition consiste d'abord à réduire sa complexité cognitive sans changer sa vérité.</p>`,
        system: `<p>L'optimisation part des opérateurs logiques <span class="ref-fiche">→ operateursEtOu</span> et des branches conditionnelles <span class="ref-fiche">→ structuresControle</span>. Elle prépare les usages web réels <span class="ref-fiche">→ logiquePratique</span> et facilite les tests <span class="ref-fiche">→ T09</span>, particulièrement pour les contrôles d'accès liés à la sécurité <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs techniques répondent à des problèmes différents :</p>
<p><strong>Variables booléennes nommées :</strong> extraire <code>const peutPublier = estAuteur && !estSuspendu</code> quand une expression porte une intention métier réutilisable.</p>
<p><strong>Guard clauses :</strong> sortir tôt avec <code>if (!utilisateur) return erreur</code> quand plusieurs préconditions bloquent le chemin principal.</p>
<p><strong>Table de décision :</strong> lister les combinaisons et résultats quand plusieurs critères se croisent. Elle rend visibles les cas oubliés avant d'écrire le code.</p>
<p><strong>Dispatch par valeur :</strong> utiliser un dictionnaire de fonctions ou un <code>switch</code> quand une seule valeur détermine l'action. Cela évite de répéter la même comparaison.</p>
<p><strong>Simplification logique :</strong> appliquer les lois de De Morgan et supprimer les conditions redondantes seulement après avoir vérifié une table de vérité et les tests existants.</p>`,
        },
        senior: `<p>Un développeur expérimenté n'optimise pas une condition critique à l'œil. Il capture d'abord son comportement par des exemples ou une table de décision, puis refactorise à comportement constant. Pour une autorisation, il préfère souvent refuser par défaut et autoriser explicitement les cas attendus : une évolution métier oubliée reste bloquée plutôt qu'exposée.</p>`,
        errors: `<p><strong>Pattern 1 — La simplification intuitive :</strong> on réécrit une expression complexe parce que la nouvelle forme paraît équivalente. Sans table de vérité ni tests, une combinaison rare change silencieusement de résultat.</p>
<p><strong>Pattern 2 — Le booléen sans intention :</strong> on extrait <code>condition1</code>, <code>check</code> ou <code>flag</code> parce que la ligne était longue. Le code gagne des variables mais pas de sens métier.</p>
<p><strong>Pattern 3 — L'autorisation optimiste :</strong> on autorise par défaut et retire quelques cas interdits parce que la liste semble courte. Une nouvelle situation non prévue hérite accidentellement d'un accès.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les syntaxes de fonctions, les outils d'analyse statique et les formes de tables de décision. <strong>Ce qui ne change pas :</strong> une optimisation fiable conserve le comportement observable, réduit la charge cognitive et vérifie explicitement les combinaisons importantes avant de modifier une règle critique.</p>`,
        practice: {
          exercices: [
            {
              titre: "Refactoriser une autorisation métier",
              etapes: [
                "Écris une règle d'accès combinant utilisateur connecté, rôle, suspension et propriété de la ressource.",
                "Construis une table de décision avec au moins six combinaisons et le résultat attendu.",
                "Réécris la règle avec des variables booléennes nommées et des guard clauses.",
                "Exécute les six cas avant et après refactorisation pour vérifier l'équivalence.",
              ],
              output: "Une règle originale, une table de décision, une version refactorisée et six résultats comparés.",
              critere: "Chaque ligne de la table doit produire exactement le même résultat avant et après refactorisation.",
            },
          ],
          piege: "Chercher uniquement à réduire le nombre de caractères. Une condition optimisée réduit l'effort nécessaire pour prouver son comportement.",
        },
        verification: [
          "Pourquoi une condition plus courte n'est-elle pas forcément une condition mieux optimisée ?",
          "Une règle d'autorisation mélange quatre prédicats et doit évoluer. Que captures-tu avant de la refactoriser ?",
          "Pourquoi le refus par défaut limite-t-il le risque lorsqu'un nouveau cas métier n'a pas encore été prévu ?",
        ],
      },
    },

    bouclesRepetition: {
      id: "bouclesRepetition",
      label: "Boucles et répétitions",
      icon: "↻",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Traiter cent produits, parcourir les messages d'une API ou retenter une opération ne devrait pas exiger cent copies du même code. Une boucle exprime qu'une instruction doit être répétée selon une règle. Sans elle, le programme devient long et rigide ; mal contrôlée, elle peut bloquer l'interface, saturer un serveur ou modifier les mauvaises données.</p>`,
        system: `<p>Les boucles prolongent le flux conditionnel <span class="ref-fiche">→ structuresControle</span> : elles réévaluent une condition ou avancent dans une collection jusqu'à une sortie. Elles consomment souvent les variables et affectations <span class="ref-fiche">→ F17</span>, alimentent les traitements de données <span class="ref-fiche">→ T06</span> et nécessitent des tests de limites <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir une répétition selon l'intention :</p>
<p><strong><code>for...of</code> ou <code>for item in collection</code> :</strong> parcourir chaque élément d'une collection sans gérer l'index manuellement.</p>
<p><strong><code>for</code> indexé :</strong> utiliser l'index quand la position, un pas particulier ou l'accès à plusieurs collections le justifie.</p>
<p><strong><code>while</code> :</strong> répéter tant qu'une condition reste vraie lorsque le nombre d'itérations n'est pas connu à l'avance. La progression et la sortie doivent être visibles.</p>
<p><strong><code>break</code> et <code>continue</code> :</strong> interrompre une recherche dès qu'un résultat est trouvé ou ignorer explicitement un élément. Trop de sauts rendent le parcours difficile à suivre.</p>
<p><strong><code>map</code>, <code>filter</code> et <code>reduce</code> :</strong> exprimer respectivement transformation, sélection et agrégation d'une collection. Une boucle impérative reste adaptée quand plusieurs effets ou sorties doivent être coordonnés.</p>
<p><strong>Traitement asynchrone :</strong> séquentiel quand l'ordre ou une limite externe compte ; parallèle avec une limite de concurrence quand les opérations sont indépendantes. Lancer des milliers de requêtes en parallèle n'est pas une optimisation.</p>`,
        },
        senior: `<p>Un développeur expérimenté estime le coût avant d'imbriquer des boucles ou d'ajouter des appels réseau dans une répétition. Il distingue le coût algorithmique du coût externe : une boucle linéaire peut devenir lente si chaque itération appelle une base de données. Il traite les collections par lots, borne les tentatives et rend l'arrêt observable avec une limite, un timeout ou un compteur.</p>`,
        errors: `<p><strong>Pattern 1 — La boucle sans sortie :</strong> on écrit un <code>while</code> dont l'état ne progresse pas vers l'arrêt parce que le cas nominal termine toujours en local. En production, une entrée inattendue bloque le processus ou l'interface.</p>
<p><strong>Pattern 2 — La collection mouvante :</strong> on ajoute ou supprime des éléments dans la collection parcourue parce que cela évite une copie. Certains éléments sont sautés ou retraités et le résultat dépend de l'ordre.</p>
<p><strong>Pattern 3 — La tempête asynchrone :</strong> on applique <code>Promise.all</code> à une liste volumineuse parce que le parallélisme paraît plus rapide. Le navigateur, l'API ou la base reçoit trop de requêtes simultanées et le système devient moins fiable.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe des itérateurs, les méthodes de collection et les primitives asynchrones. <strong>Ce qui ne change pas :</strong> toute répétition doit rendre visibles sa progression, sa condition d'arrêt, son coût et les effets produits à chaque itération.</p>`,
        practice: {
          exercices: [
            {
              titre: "Choisir et sécuriser une boucle de traitement",
              etapes: [
                "Crée une liste de commandes avec statut, montant et adresse email.",
                "Parcours-la pour conserver les commandes payées puis calculer leur montant total.",
                "Ajoute une simulation d'envoi asynchrone limitée à deux traitements simultanés.",
                "Documente la condition d'arrêt et teste une liste vide, une commande invalide et cinq commandes valides.",
              ],
              output: "Un traitement de collection avec filtrage, agrégation, concurrence bornée et trois scénarios testés.",
              critere: "Le traitement doit terminer pour chaque scénario et ne jamais dépasser deux opérations asynchrones simultanées.",
            },
          ],
          piege: "Choisir une boucle uniquement selon la syntaxe la plus familière sans expliciter l'arrêt, le coût et les effets de bord.",
        },
        verification: [
          "Quelle différence d'intention existe entre une boucle <code>for...of</code>, une boucle <code>while</code> et une transformation <code>map</code> ?",
          "Une application mobile doit synchroniser 500 éléments avec une API. Pourquoi éviter de lancer 500 requêtes simultanées et quelle stratégie adoptes-tu ?",
          "Pourquoi progression, condition d'arrêt et coût restent-ils les trois questions centrales quelle que soit la syntaxe de boucle ?",
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
        system: `<p>Ce nœud synthétise les fondements logiques <span class="ref-fiche">→ fonctionnementLogique</span>, les opérateurs <span class="ref-fiche">→ operateursEtOu</span>, le flux conditionnel <span class="ref-fiche">→ structuresControle</span>, son optimisation <span class="ref-fiche">→ optimisationConditions</span> et les répétitions <span class="ref-fiche">→ bouclesRepetition</span> en patterns applicables au développement web fullstack et mobile. Il prépare l'architecture applicative <span class="ref-fiche">→ T03</span>, la gestion des données <span class="ref-fiche">→ T06</span> et les tests <span class="ref-fiche">→ T09</span>.</p>`,
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
      viewBox: "0 0 1120 390",
      nodes: [
        { id: "fonctionnementLogique", x: 15, y: 160, w: 185, h: 65 },
        { id: "operateursEtOu", x: 250, y: 160, w: 175, h: 65 },
        { id: "structuresControle", x: 485, y: 160, w: 195, h: 65 },
        { id: "optimisationConditions", x: 750, y: 65, w: 185, h: 65 },
        { id: "bouclesRepetition", x: 750, y: 255, w: 175, h: 65 },
        { id: "logiquePratique", x: 970, y: 160, w: 140, h: 65 },
      ],
      edges: [
        { x1: 200, y1: 192, x2: 248, y2: 192, label: "fonde" },
        { x1: 425, y1: 192, x2: 483, y2: 192, label: "oriente" },
        { x1: 680, y1: 178, x2: 748, y2: 110, label: "clarifie" },
        { x1: 680, y1: 210, x2: 748, y2: 288, label: "répète" },
        { x1: 935, y1: 110, x2: 968, y2: 178, label: "sécurise" },
        { x1: 925, y1: 288, x2: 968, y2: 210, label: "traite" },
      ],
    },
  },
});
