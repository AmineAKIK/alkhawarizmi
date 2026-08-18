import { cultureSheet } from "./culture-common";

export const cultureVariablesValeurs = cultureSheet({
  id: "culture-F17",
  number: 17,
  title: "Variables et Valeurs",
  subtitle: "Nommer, stocker, transformer et réutiliser les données qui font évoluer un programme",
  badge: "Fiche F17",
  meta: ["7 nœuds"],
  readingTime: "40 min",
  description: "Une variable relie une intention humaine à une valeur manipulée par la machine. Cette fiche explique pourquoi les variables existent, comment les types contraignent les opérations, comment déclarer et modifier une valeur consciemment, puis comment construire des expressions arithmétiques, des comparaisons et des cas pratiques web ou mobile.",
  accent: "modele",

  nodes: {
    conceptVariable: {
      id: "conceptVariable",
      label: "Le concept de variable",
      icon: "x",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un programme qui manipule seulement des valeurs écrites en dur ne peut pas s'adapter. Il affiche toujours le même nom, calcule toujours le même prix et ignore ce que l'utilisateur saisit. Une variable existe pour donner un nom à une valeur qui doit être comprise, réutilisée ou remplacée pendant l'exécution : <code>prix</code>, <code>utilisateur</code>, <code>estConnecte</code> ou <code>nombreArticles</code>.</p>`,
        system: `<p>Les variables concrétisent les valeurs et types introduits parmi les briques fondamentales <span class="ref-fiche">→ F16</span>. La machine représente ultimement ces valeurs en mémoire et en binaire <span class="ref-fiche">→ F04</span>. Les variables alimentent ensuite les expressions de cette fiche, les conditions <span class="ref-fiche">→ F14</span>, l'état d'interface <span class="ref-fiche">→ T08</span> et les données persistées <span class="ref-fiche">→ T06</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Trois idées doivent rester distinctes :</p>
<p><strong>La valeur :</strong> la donnée elle-même, comme <code>42</code>, <code>"Paris"</code> ou <code>true</code>.</p>
<p><strong>La variable :</strong> le nom utilisé dans le programme pour retrouver une valeur, comme <code>temperature</code> ou <code>ville</code>.</p>
<p><strong>La constante :</strong> un nom dont la liaison ne doit pas être remplacée après initialisation. En JavaScript, <code>const</code> exprime cette intention ; en Python, la convention utilise souvent un nom en majuscules pour les constantes.</p>
<p>Un bon nom décrit le rôle de la donnée dans le problème. <code>prixTotal</code> communique une intention ; <code>x</code> convient seulement dans un contexte mathématique très local.</p>`,
        },
        senior: `<p>Un développeur expérimenté considère le nom d'une variable comme une décision de conception miniature. Quand un nom devient difficile à choisir, il révèle souvent une responsabilité mal comprise : <code>data</code>, <code>result</code> ou <code>temp</code> survivent parce que le code mélange plusieurs intentions. Renommer correctement oblige à clarifier le modèle mental avant de clarifier la syntaxe.</p>`,
        errors: `<p><strong>Pattern 1 — Le nom brouillard :</strong> on appelle une variable <code>data</code>, <code>value</code> ou <code>tmp</code> parce que nommer précisément demande un effort. Quelques lignes plus loin, personne ne sait ce qu'elle représente et les modifications deviennent risquées.</p>
<p><strong>Pattern 2 — La valeur magique :</strong> on répète <code>0.2</code>, <code>86400</code> ou <code>"admin"</code> sans nom parce que la valeur semble évidente. Son rôle métier reste caché et une modification future oublie certaines occurrences.</p>
<p><strong>Pattern 3 — La boîte trompeuse :</strong> on imagine qu'une variable contient toujours physiquement une copie indépendante de la valeur. Avec les objets et listes, plusieurs variables peuvent référencer la même structure ; une modification inattendue se propage ailleurs.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe de déclaration, les conventions de nommage et la gestion mémoire du langage. <strong>Ce qui ne change pas :</strong> une variable donne un nom exploitable à une valeur afin que le programme puisse la lire, la transmettre et raisonner dessus.</p>`,
        practice: {
          exercices: [
            {
              titre: "Nommer les données d'un problème réel",
              etapes: [
                "Choisis un cas simple : panier, profil utilisateur, météo ou minuteur.",
                "Liste dix valeurs nécessaires au fonctionnement.",
                "Donne à chaque valeur un nom qui exprime son rôle métier et son unité si nécessaire.",
                "Repère les valeurs répétées qui méritent une constante nommée.",
              ],
              output: "Une liste de dix variables et constantes avec rôle, exemple de valeur et justification du nom.",
              critere: "Chaque nom doit rester compréhensible sans relire l'énoncé du problème ; aucun nom générique comme data ou value ne doit subsister.",
            },
          ],
          piege: "Choisir les noms selon la forme technique de la donnée plutôt que selon sa signification dans le problème.",
        },
        verification: [
          "Quelle différence fais-tu entre une valeur, une variable et une constante ?",
          "Un calcul de livraison répète le nombre 5 à plusieurs endroits. Comment décides-tu s'il mérite une constante nommée ?",
          "Pourquoi le besoin de nommer précisément une donnée reste-t-il valable quel que soit le langage ?",
        ],
      },
    },

    typesVariables: {
      id: "typesVariables",
      label: "Types de variables",
      icon: "T",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La chaîne <code>"12"</code> et le nombre <code>12</code> se ressemblent à l'écran, mais ils ne se comportent pas pareil : <code>"12" + 3</code> peut produire <code>"123"</code> alors que <code>12 + 3</code> produit <code>15</code>. Sans compréhension des types, les données saisies dans un formulaire, reçues d'une API ou lues depuis un fichier déclenchent des résultats surprenants.</p>`,
        system: `<p>Les types donnent un sens opérationnel aux bits expliqués dans <span class="ref-fiche">→ F04</span> : texte, nombres et booléens sont des interprétations différentes de données en mémoire. Ils conditionnent les expressions de cette fiche, les validations <span class="ref-fiche">→ T08</span>, les contrats d'API <span class="ref-fiche">→ T07</span> et le stockage <span class="ref-fiche">→ T06</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les familles à reconnaître dès le départ :</p>
<p><strong>Chaîne de caractères :</strong> texte comme <code>"Amina"</code> ou <code>"75001"</code>. Un code postal reste souvent du texte : on ne l'additionne pas.</p>
<p><strong>Nombre :</strong> quantité utilisée dans des calculs. Distinguer entier et décimal devient important pour les prix et les arrondis.</p>
<p><strong>Booléen :</strong> <code>true</code> ou <code>false</code>, adapté aux prédicats comme <code>estConnecte</code>.</p>
<p><strong>Valeur absente :</strong> <code>null</code>, <code>undefined</code> ou <code>None</code> selon le langage. L'absence doit être prévue, pas découverte par accident.</p>
<p><strong>Collections et objets :</strong> listes et structures regroupant plusieurs valeurs. Elles permettent de représenter un panier, un profil ou une série de mesures.</p>
<p>JavaScript est dynamiquement typé : une variable peut recevoir des valeurs de types différents. TypeScript ajoute une vérification statique. Python est également dynamique, avec des annotations optionnelles. Le choix change le moment où certaines erreurs deviennent visibles.</p>`,
        },
        senior: `<p>Un développeur expérimenté traite les frontières comme des zones de conversion explicite : formulaire, URL, variable d'environnement, fichier CSV et réponse HTTP arrivent souvent sous forme de texte ou de données non fiables. Il convertit et valide au bord du système plutôt que de laisser des types ambigus circuler jusqu'au cœur métier.</p>`,
        errors: `<p><strong>Pattern 1 — Le nombre déguisé :</strong> on utilise directement la valeur d'un champ de formulaire parce qu'elle affiche des chiffres. Le texte est concaténé au lieu d'être additionné et le calcul devient faux.</p>
<p><strong>Pattern 2 — L'absence impossible :</strong> on suppose qu'une API renvoie toujours une valeur parce que le cas nominal fonctionne. Un <code>null</code> réel arrive en production et casse une chaîne d'accès.</p>
<p><strong>Pattern 3 — Le type pansement :</strong> on force une conversion ou un cast pour faire disparaître une erreur parce que l'outil bloque. L'incohérence reste présente et ressort plus loin sous une forme plus difficile à diagnostiquer.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le système de types, la syntaxe de conversion et le moment où les erreurs sont détectées. <strong>Ce qui ne change pas :</strong> le type d'une valeur détermine quelles opérations ont un sens et les frontières externes exigent validation et conversion explicites.</p>`,
        practice: {
          exercices: [
            {
              titre: "Auditer les types d'un formulaire",
              etapes: [
                "Choisis un formulaire simple : inscription, commande ou calculatrice.",
                "Liste chaque champ avec le type reçu depuis l'interface et le type réellement attendu par le métier.",
                "Ajoute une conversion explicite et une validation pour les nombres, booléens ou valeurs optionnelles.",
                "Teste au moins trois entrées problématiques : champ vide, texte dans un nombre et valeur hors limites.",
              ],
              output: "Un tableau champ/type reçu/type attendu/conversion/validation avec trois cas de test.",
              critere: "Chaque frontière doit rendre explicite la conversion ou expliquer pourquoi aucune conversion n'est nécessaire.",
            },
          ],
          piege: "Supposer qu'une valeur composée de chiffres est automatiquement un nombre utilisable dans un calcul.",
        },
        verification: [
          "Pourquoi la chaîne \"12\" et le nombre 12 doivent-ils être distingués ?",
          "Un formulaire HTML fournit une quantité utilisée dans un total. Quelles conversions et validations appliques-tu avant le calcul ?",
          "Pourquoi valider les types aux frontières reste-t-il nécessaire même avec un langage fortement typé ?",
        ],
      },
    },

    declarationInitialisation: {
      id: "declarationInitialisation",
      label: "Déclarer et initialiser",
      icon: ":=",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Quand une donnée apparaît sans origine claire, le lecteur doit remonter le programme pour deviner quand elle a été créée et si elle possède déjà une valeur valable. Déclarer une variable rend son existence explicite ; l'initialiser lui donne une première valeur cohérente avant sa première utilisation.</p>`,
        system: `<p>La déclaration matérialise le concept de variable de cette fiche et doit respecter le type attendu. Elle prépare l'affectation consciente, puis les expressions. Elle rejoint aussi la lisibilité architecturale <span class="ref-fiche">→ T03</span> : limiter la portée d'une variable réduit le nombre d'endroits capables de la modifier.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir une déclaration selon l'intention :</p>
<p><strong>JavaScript <code>const</code> :</strong> choix par défaut quand la liaison ne sera pas réaffectée : <code>const tauxTva = 0.2</code>. Un objet déclaré avec <code>const</code> peut encore être modifié intérieurement ; seule la liaison reste fixe.</p>
<p><strong>JavaScript <code>let</code> :</strong> adapté quand la valeur doit évoluer : <code>let total = 0</code>. Préférer une portée locale courte.</p>
<p><strong>JavaScript <code>var</code> :</strong> ancien mécanisme à portée de fonction et comportement de hoisting plus piégeux. À reconnaître dans du code existant, rarement à introduire.</p>
<p><strong>Python :</strong> l'affectation crée généralement la variable : <code>total = 0</code>. Les annotations comme <code>total: float = 0</code> rendent l'intention plus visible sans transformer Python en langage statique strict.</p>
<p>Initialiser avec une valeur neutre (<code>0</code>, <code>[]</code>, <code>""</code>) est pertinent seulement si cette valeur a un sens métier réel.</p>`,
        },
        senior: `<p>Un développeur expérimenté déclare une variable au plus près de son usage et choisit une valeur initiale qui représente réellement un état valide. Il évite les valeurs sentinelles ambiguës comme <code>-1</code> ou chaîne vide quand elles mélangent absence, erreur et valeur métier. Une portée réduite et une initialisation honnête suppriment des états impossibles avant même les tests.</p>`,
        errors: `<p><strong>Pattern 1 — Le <code>let</code> réflexe :</strong> on déclare toutes les variables modifiables parce que cela semble plus simple. Le lecteur doit ensuite vérifier partout si la valeur change réellement, ce qui augmente la charge cognitive.</p>
<p><strong>Pattern 2 — L'initialisation mensongère :</strong> on initialise avec <code>0</code> ou chaîne vide parce qu'il faut bien une valeur. Le programme confond "pas encore calculé", "absent" et vraie valeur nulle.</p>
<p><strong>Pattern 3 — La portée panoramique :</strong> on déclare une variable très haut dans le fichier pour qu'elle soit accessible partout. Plusieurs blocs peuvent la modifier et l'origine d'un résultat devient difficile à retracer.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les mots-clés de déclaration, les règles de portée et les conventions du langage. <strong>Ce qui ne change pas :</strong> une variable doit être créée dans la portée la plus étroite utile et recevoir une première valeur dont le sens est explicite avant son utilisation.</p>`,
        practice: {
          exercices: [
            {
              titre: "Choisir entre constante et variable modifiable",
              etapes: [
                "Écris un petit calcul de panier avec prix, quantité, taux de TVA et total.",
                "Pour chaque donnée, décide si la liaison doit rester fixe ou évoluer pendant le calcul.",
                "Implémente la version JavaScript avec <code>const</code> par défaut et <code>let</code> uniquement si nécessaire.",
                "Réécris le même exemple en Python et annote les types attendus.",
              ],
              output: "Deux versions du calcul avec justification de chaque déclaration et valeur initiale.",
              critere: "Chaque <code>let</code> doit correspondre à une réaffectation réelle ; chaque valeur initiale doit représenter un état cohérent.",
            },
          ],
          piege: "Utiliser une valeur neutre par habitude sans vérifier qu'elle représente réellement l'état initial du problème.",
        },
        verification: [
          "Quelle différence existe entre déclarer et initialiser une variable ?",
          "Dans un calcul de panier, quelles données déclares-tu avec const et lesquelles pourraient nécessiter let ?",
          "Pourquoi réduire la portée d'une variable diminue-t-il le risque de bug indépendamment du langage ?",
        ],
      },
    },

    affectationModification: {
      id: "affectationModification",
      label: "Affecter et modifier",
      icon: "↺",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un panier change quand un article est ajouté, un compteur évolue après un clic et un formulaire se met à jour pendant la saisie. Modifier une valeur est parfois nécessaire. Mais chaque modification introduit une dimension temporelle : pour comprendre le résultat final, il faut savoir dans quel ordre les changements ont eu lieu.</p>`,
        system: `<p>L'affectation remplace la valeur liée à une variable déclarée. Elle alimente les boucles et structures de contrôle <span class="ref-fiche">→ F14</span>, mais doit rester maîtrisée dans l'état d'interface <span class="ref-fiche">→ T08</span>. Les tests <span class="ref-fiche">→ T09</span> deviennent essentiels quand plusieurs étapes peuvent faire évoluer la même donnée.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs formes expriment des intentions différentes :</p>
<p><strong>Réaffectation :</strong> <code>total = total + prix</code> ou <code>total += prix</code>. Adaptée à un accumulateur local et lisible.</p>
<p><strong>Transformation immuable :</strong> créer une nouvelle valeur sans modifier l'ancienne : <code>const panierMisAJour = [...panier, article]</code>. Adaptée quand l'historique, le partage de références ou la prévisibilité comptent.</p>
<p><strong>Mutation interne :</strong> modifier un objet ou une liste existante : <code>panier.push(article)</code>. Parfois efficace et acceptable dans une portée locale, mais plus risquée quand la structure est partagée.</p>
<p><strong>Fonction pure :</strong> calculer une sortie uniquement depuis les entrées, sans modifier d'état externe. C'est souvent le choix le plus facile à tester.</p>`,
        },
        senior: `<p>Un développeur expérimenté ne bannit pas toute mutation : il réduit sa surface. Un accumulateur local dans une boucle est simple ; un objet partagé modifié depuis plusieurs composants devient fragile. Il sait que la vraie question est : combien d'endroits peuvent observer ou modifier cette valeur, et peut-on reconstruire son évolution quand un bug apparaît ?</p>`,
        errors: `<p><strong>Pattern 1 — La mutation distante :</strong> une fonction modifie un objet reçu en paramètre sans l'annoncer parce que c'est plus court. L'appelant observe un changement inattendu et le bug semble venir d'ailleurs.</p>
<p><strong>Pattern 2 — L'alias invisible :</strong> deux variables référencent le même objet parce qu'une affectation a été prise pour une copie. Modifier l'une modifie l'autre et contredit l'intuition du lecteur.</p>
<p><strong>Pattern 3 — L'état en cascade :</strong> plusieurs étapes modifient la même variable globale parce qu'elle est facilement accessible. Le résultat dépend de l'ordre d'exécution et devient difficile à tester isolément.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe de copie, les structures immuables disponibles et les optimisations du runtime. <strong>Ce qui ne change pas :</strong> chaque modification d'état augmente le nombre d'étapes nécessaires pour expliquer un résultat ; limiter et rendre explicites les mutations améliore la prévisibilité.</p>`,
        practice: {
          exercices: [
            {
              titre: "Comparer mutation et transformation immuable",
              etapes: [
                "Crée une liste de tâches contenant deux objets.",
                "Ajoute une tâche avec une mutation puis observe la liste originale.",
                "Repars de la liste initiale et ajoute une tâche en créant une nouvelle liste.",
                "Compare les références, les valeurs obtenues et le risque si plusieurs parties du programme partagent la liste.",
              ],
              output: "Deux implémentations commentées avec observation de la liste originale et choix justifié selon le contexte.",
              critere: "Tu dois pouvoir expliquer quand une mutation locale reste acceptable et quand une nouvelle valeur est préférable.",
            },
          ],
          piege: "Présenter l'immutabilité comme une règle absolue ou la mutation comme un détail sans conséquence. Le contexte de partage de la donnée décide du risque.",
        },
        verification: [
          "Quelle différence fais-tu entre réaffectation, mutation et transformation immuable ?",
          "Deux composants partagent la même liste de tâches. Pourquoi modifier la liste directement peut-il créer un bug difficile à localiser ?",
          "Pourquoi limiter la surface de mutation reste-t-il utile dans n'importe quel paradigme de programmation ?",
        ],
      },
    },

    operateursArithmetiques: {
      id: "operateursArithmetiques",
      label: "Opérateurs arithmétiques",
      icon: "±",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Calculer un total, appliquer une remise, convertir une durée ou alterner une ligne sur deux paraît simple jusqu'au premier résultat faux. Une priorité d'opérations oubliée, une division par zéro ou un prix manipulé comme un flottant peuvent produire un bug silencieux : le programme tourne, mais le montant affiché est incorrect. Les opérateurs arithmétiques existent pour exprimer précisément les transformations numériques.</p>`,
        system: `<p>Les opérateurs arithmétiques transforment les variables numériques typées dans cette fiche. Ils s'appuient sur la représentation des nombres et ses limites <span class="ref-fiche">→ F04</span>, préparent les comparaisons de cette fiche et apparaissent dans les données métier <span class="ref-fiche">→ T06</span>, l'affichage frontend <span class="ref-fiche">→ T08</span> et les tests de cas limites <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les opérations de base et leurs usages :</p>
<p><strong>Addition <code>+</code> et soustraction <code>-</code> :</strong> additionner un article au total, calculer un solde ou mesurer un écart. En JavaScript, <code>+</code> sert aussi à concaténer du texte : convertir explicitement les entrées évite les surprises.</p>
<p><strong>Multiplication <code>*</code> et division <code>/</code> :</strong> calculer <code>prix * quantite</code>, une moyenne ou un taux. Une division exige d'anticiper le dénominateur nul et la précision décimale attendue.</p>
<p><strong>Modulo <code>%</code> :</strong> obtenir le reste d'une division. Utile pour détecter un nombre pair avec <code>index % 2 === 0</code>, alterner des éléments ou construire un cycle.</p>
<p><strong>Puissance :</strong> <code>**</code> en JavaScript et Python. Utile pour les calculs scientifiques ou financiers, rarement pour un simple total.</p>
<p><strong>Parenthèses :</strong> rendent l'intention explicite. <code>(prix * quantite) + frais</code> est plus facile à relire qu'une expression qui dépend seulement de la précédence implicite.</p>`,
        },
        senior: `<p>Un développeur expérimenté distingue calcul mathématique et règle métier. Il nomme les étapes : <code>sousTotal</code>, <code>remise</code>, <code>taxe</code>, <code>total</code>. Il sait aussi que les montants financiers se calculent généralement en unités entières minimales, comme les centimes, pour éviter les erreurs d'arrondi des flottants expliquées dans <span class="ref-fiche">→ F04</span>.</p>`,
        errors: `<p><strong>Pattern 1 — La calculette compacte :</strong> on écrit une formule longue sur une ligne parce qu'elle ressemble à l'équation métier. La précédence et les arrondis deviennent difficiles à relire, donc une modification future casse silencieusement le résultat.</p>
<p><strong>Pattern 2 — Le prix flottant :</strong> on stocke et additionne des montants monétaires en décimaux parce que leur affichage contient une virgule. Les approximations binaires s'accumulent et produisent des écarts financiers.</p>
<p><strong>Pattern 3 — Le diviseur fantôme :</strong> on calcule une moyenne sans traiter la liste vide parce que les exemples contiennent toujours des données. Une division par zéro produit une valeur invalide qui se propage dans l'interface ou l'API.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe de certains opérateurs, les types numériques disponibles et les stratégies d'arrondi du langage. <strong>Ce qui ne change pas :</strong> un calcul fiable explicite ses unités, respecte la priorité des opérations, traite les cas limites et choisit une représentation adaptée à la précision métier.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire un calcul de commande fiable",
              etapes: [
                "Définis en centimes le prix unitaire, la quantité, la remise et les frais de livraison.",
                "Calcule sous-total, montant de remise et total final avec des variables intermédiaires nommées.",
                "Ajoute une moyenne par article en traitant explicitement le panier vide.",
                "Teste un panier normal, un panier vide et une remise qui change le résultat attendu.",
              ],
              output: "Un calcul de commande commenté avec unités explicites et trois cas de test documentés.",
              critere: "Aucun montant ne doit dépendre d'un flottant ambigu ; le panier vide doit produire un comportement défini.",
            },
          ],
          piege: "Optimiser la longueur de la formule plutôt que sa lisibilité et la précision du résultat.",
        },
        verification: [
          "À quoi servent addition, soustraction, multiplication, division et modulo dans des cas applicatifs distincts ?",
          "Tu calcules la moyenne d'un panier vide et obtiens une valeur invalide. Quelle condition ajoutes-tu et pourquoi ?",
          "Pourquoi représenter les montants en centimes reste-t-il une stratégie robuste quel que soit le framework utilisé ?",
        ],
      },
    },

    operateursComparaison: {
      id: "operateursComparaison",
      label: "Comparaisons et booléens",
      icon: "≤",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une application doit constamment décider : le stock est-il suffisant, le mot de passe est-il assez long, l'utilisateur possède-t-il le bon rôle, le total dépasse-t-il le seuil de livraison gratuite ? Sans comparaisons explicites, les règles métier restent des phrases humaines que le programme ne peut pas appliquer.</p>`,
        system: `<p>Une comparaison consomme les variables et calculs arithmétiques de cette fiche puis produit un booléen. Ce booléen alimente les opérateurs logiques et structures de contrôle détaillés dans <span class="ref-fiche">→ F14</span>. Les comparaisons apparaissent ensuite dans les validations frontend <span class="ref-fiche">→ T08</span>, les règles métier <span class="ref-fiche">→ T03</span> et les contrôles de sécurité <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les principales comparaisons et leurs critères de choix :</p>
<p><strong>Égalité :</strong> vérifier si deux valeurs représentent la même chose. En JavaScript, préférer <code>===</code> et <code>!==</code> à <code>==</code> et <code>!=</code> pour éviter les conversions implicites. Python utilise <code>==</code> et <code>!=</code>.</p>
<p><strong>Ordre :</strong> <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>. Une frontière métier doit être formulée précisément : un âge minimum de 18 ans utilise <code>age &gt;= 18</code>, pas <code>age &gt; 18</code>.</p>
<p><strong>Appartenance :</strong> vérifier si une valeur appartient à une collection : <code>roles.includes(role)</code> en JavaScript, <code>role in roles</code> en Python.</p>
<p><strong>Identité et contenu :</strong> deux objets peuvent contenir les mêmes données sans être la même référence. Selon le langage, comparer des structures exige parfois une comparaison profonde explicite.</p>
<p><strong>Résultat booléen :</strong> chaque comparaison produit <code>true</code> ou <code>false</code>. Ces prédicats nommés deviennent ensuite lisibles : <code>const livraisonGratuite = total &gt;= seuil</code>.</p>`,
        },
        senior: `<p>Un développeur expérimenté surveille particulièrement les frontières : exactement 18 ans, exactement zéro article, exactement le seuil de remise, date égale à l'expiration. Les bugs de comparaison se cachent souvent dans un seul caractère, <code>&gt;</code> au lieu de <code>&gt;=</code>. Il transforme chaque frontière métier en cas de test adjacent : juste avant, exactement dessus et juste après.</p>`,
        errors: `<p><strong>Pattern 1 — La frontière décalée :</strong> on écrit <code>age &gt; 18</code> au lieu de <code>age &gt;= 18</code> parce que la phrase "plus de 18 ans" paraît naturelle. Les utilisateurs exactement à la limite subissent un comportement incorrect.</p>
<p><strong>Pattern 2 — L'égalité permissive :</strong> on utilise <code>==</code> en JavaScript parce que l'exemple fonctionne. Les conversions implicites rendent certaines comparaisons vraies entre des types différents et masquent une donnée mal validée.</p>
<p><strong>Pattern 3 — L'objet sosie :</strong> on compare deux objets comme des valeurs simples parce qu'ils affichent le même contenu. Leur identité ou leur structure réelle diffère et la condition retourne un résultat inattendu.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe d'égalité, les règles de coercition et la comparaison des objets selon le langage. <strong>Ce qui ne change pas :</strong> une comparaison produit un booléen ; ses types, ses frontières et le sens métier de l'égalité doivent être explicites et testés autour des limites.</p>`,
        practice: {
          exercices: [
            {
              titre: "Tester les frontières d'une règle métier",
              etapes: [
                "Choisis une règle : âge minimum, livraison gratuite, capacité maximale ou date d'expiration.",
                "Écris la comparaison qui traduit précisément la règle.",
                "Teste une valeur juste avant la limite, exactement à la limite et juste après.",
                "Ajoute une valeur du mauvais type et définis la validation attendue avant comparaison.",
              ],
              output: "Une comparaison métier avec quatre cas de test et résultat attendu pour chacun.",
              critere: "La limite doit être traitée intentionnellement et l'entrée de mauvais type doit être rejetée ou convertie explicitement.",
            },
          ],
          piege: "Tester seulement une valeur clairement valide et une valeur clairement invalide. Les bugs vivent souvent exactement sur la frontière.",
        },
        verification: [
          "Pourquoi une comparaison produit-elle un booléen exploitable par le reste du programme ?",
          "La livraison est gratuite à partir de 50 euros inclus. Quelle comparaison écris-tu et quels trois cas limites testes-tu ?",
          "Pourquoi les règles de comparaison doivent-elles rester explicites même dans un langage qui effectue des conversions automatiques ?",
        ],
      },
    },

    expressionsCasPratiques: {
      id: "expressionsCasPratiques",
      label: "Expressions et cas pratiques",
      icon: "ƒ",
      kind: "decision",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une variable isolée ne produit aucun comportement utile. La programmation commence réellement quand plusieurs valeurs sont combinées pour calculer un total, construire un message, décider si une action est autorisée ou filtrer une liste. Les expressions transforment des données nommées en résultats observables.</p>`,
        system: `<p>Les expressions utilisent les variables, types, affectations, calculs et comparaisons de cette fiche. Elles alimentent directement les opérateurs logiques et structures de contrôle détaillés dans <span class="ref-fiche">→ F14</span>, puis les fonctions et projets pratiques <span class="ref-fiche">→ F16</span>. Dans une application web, elles apparaissent dans les validations <span class="ref-fiche">→ T08</span>, les règles métier <span class="ref-fiche">→ T03</span> et les calculs sur les données <span class="ref-fiche">→ T06</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Reconnaître les principales familles d'expressions :</p>
<p><strong>Arithmétiques :</strong> <code>sousTotal = prix * quantite</code>, puis <code>total = sousTotal + fraisLivraison</code>.</p>
<p><strong>Textuelles :</strong> construire un libellé depuis plusieurs valeurs, par exemple <code>message = "Bonjour " + prenom</code> ou une interpolation moderne.</p>
<p><strong>Comparaisons :</strong> <code>age >= 18</code>, <code>statut === "actif"</code>. Elles produisent un booléen.</p>
<p><strong>Logiques :</strong> combiner des comparaisons : <code>estConnecte && !estSuspendu</code>. Leur précision est détaillée dans <span class="ref-fiche">→ F14</span>.</p>
<p><strong>Transformations de collections :</strong> filtrer, transformer ou agréger une liste. Exemple : sélectionner les tâches terminées ou additionner les montants d'un panier.</p>
<p>Une expression intermédiaire nommée devient souvent plus claire qu'une ligne très compacte : <code>const peutCommander = estConnecte && panier.length > 0</code>.</p>`,
        },
        senior: `<p>Un développeur expérimenté extrait les sous-expressions qui portent une intention métier. Il préfère <code>const livraisonGratuite = total >= seuilLivraisonGratuite</code> à une condition répétée avec un nombre magique. Cette habitude améliore simultanément lecture, testabilité et évolution : quand la règle change, son nom reste le point de repère.</p>`,
        errors: `<p><strong>Pattern 1 — La formule opaque :</strong> on compacte plusieurs calculs et conditions sur une ligne parce que le langage le permet. La règle métier devient difficile à relire, à tester et à modifier.</p>
<p><strong>Pattern 2 — La coercition surprise :</strong> on mélange texte et nombres sans conversion explicite parce que l'exemple simple fonctionne. Une entrée issue d'un formulaire transforme une addition en concaténation.</p>
<p><strong>Pattern 3 — La règle dupliquée :</strong> la même expression métier est répétée dans plusieurs fichiers parce qu'elle paraît courte. Une évolution modifie seulement certaines occurrences et le produit applique deux règles différentes.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les opérateurs disponibles, la syntaxe d'interpolation et les méthodes de collection. <strong>Ce qui ne change pas :</strong> une expression combine des valeurs pour produire un résultat ; nommer les intentions intermédiaires et éviter les conversions implicites rend ce résultat compréhensible et vérifiable.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire un calcul de panier lisible",
              etapes: [
                "Définis prix, quantité, taux de TVA, frais de livraison et seuil de livraison gratuite.",
                "Calcule sous-total, taxe et total avec des expressions intermédiaires nommées.",
                "Ajoute une expression booléenne qui décide si la livraison est gratuite.",
                "Teste un panier sous le seuil, un panier exactement au seuil et un panier vide.",
              ],
              output: "Un calcul de panier lisible avec variables nommées, expression booléenne et trois résultats documentés.",
              critere: "Aucun nombre métier ne doit être répété sans nom ; chaque résultat intermédiaire doit pouvoir être expliqué séparément.",
            },
          ],
          piege: "Chercher la ligne la plus courte. Une expression utile optimise d'abord la compréhension de la règle métier.",
        },
        verification: [
          "Comment une expression transforme-t-elle des variables en comportement utile ?",
          "Un formulaire renvoie la quantité \"2\" et le code calcule total = quantité + 3. Quel résultat obtiens-tu potentiellement et comment le corriges-tu ?",
          "Pourquoi nommer une sous-expression métier est-il préférable à répéter une formule courte à plusieurs endroits ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 1180 380",
      nodes: [
        { id: "conceptVariable", x: 20, y: 155, w: 150, h: 65 },
        { id: "typesVariables", x: 215, y: 75, w: 145, h: 65 },
        { id: "declarationInitialisation", x: 215, y: 235, w: 180, h: 65 },
        { id: "affectationModification", x: 455, y: 155, w: 170, h: 65 },
        { id: "operateursArithmetiques", x: 680, y: 75, w: 185, h: 65 },
        { id: "operateursComparaison", x: 680, y: 235, w: 185, h: 65 },
        { id: "expressionsCasPratiques", x: 925, y: 155, w: 205, h: 65 },
      ],
      edges: [
        { x1: 170, y1: 170, x2: 213, y2: 123, label: "prend un type" },
        { x1: 170, y1: 204, x2: 213, y2: 267, label: "se crée" },
        { x1: 395, y1: 267, x2: 453, y2: 204, label: "évolue" },
        { x1: 360, y1: 123, x2: 453, y2: 170, label: "contraint" },
        { x1: 625, y1: 170, x2: 678, y2: 123, label: "calcule" },
        { x1: 625, y1: 204, x2: 678, y2: 267, label: "compare" },
        { x1: 865, y1: 123, x2: 923, y2: 170, label: "alimente" },
        { x1: 865, y1: 267, x2: 923, y2: 204, label: "décide" },
      ],
    },
  },
});
