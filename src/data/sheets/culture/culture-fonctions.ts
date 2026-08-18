import { cultureSheet } from "./culture-common";

export const cultureFonctions = cultureSheet({
  id: "culture-F21",
  number: 21,
  title: "Fonctions",
  subtitle: "Nommer, réutiliser et composer des traitements lisibles",
  badge: "Fiche F21",
  meta: ["6 nœuds"],
  readingTime: "40 min",
  description:
    "Comprendre le rôle des fonctions, utiliser les outils existants et concevoir des traitements réutilisables avec des entrées, une sortie et une responsabilité claire.",
  accent: "modele",
  nodes: {
    fondamentauxFonctions: {
      id: "fondamentauxFonctions",
      label: "Principes fondamentaux",
      icon: "ƒ",
      kind: "modele",
      os: "universel",
      osLabel: "Comprendre",
      niveau: "Fondation",
      sections: {
        why: `
          <p>Une fonction donne un nom à un traitement afin de pouvoir l'appeler au bon moment. Au lieu de répéter les mêmes étapes dans plusieurs écrans ou routes, on formule une intention réutilisable : <code>calculerTotal(panier)</code>, <code>estEmailValide(email)</code> ou <code>chargerProfil(id)</code>.</p>
          <p>Elle permet de passer de l'utilisateur de logiciels au créateur capable de décomposer un problème. <span class="ref-fiche">→ F16</span></p>
        `,
        system: `
          <p>Une fonction possède un nom, éventuellement des paramètres, un corps d'instructions et parfois une valeur de retour. Son code ne s'exécute que lorsqu'elle est appelée.</p>
          <pre><code>function doubler(nombre) {
  return nombre * 2;
}

const resultat = doubler(4); // 8</code></pre>
          <p>Chaque appel crée un contexte local : les variables déclarées dans la fonction restent généralement limitées à ce contexte. Les conditions et les boucles peuvent naturellement y prendre place. <span class="ref-fiche">→ F14</span> <span class="ref-fiche">→ F17</span></p>
        `,
        choice: {
          kind: "free",
          html: `
          <p>Créer une fonction lorsque plusieurs étapes forment une intention utile, lorsqu'un traitement est répété ou lorsque le nom de la fonction rend le code appelant plus facile à lire.</p>
          <p>Éviter de découper mécaniquement chaque ligne : une fonction utile clarifie le problème, elle ne déplace pas seulement du code.</p>
        `,
        },
        senior: `
          <p>Un développeur expérimenté lit d'abord l'appel comme une phrase : le nom doit révéler l'intention sans obliger à ouvrir l'implémentation. Il distingue aussi les calculs prévisibles des fonctions qui ont un effet observable, comme enregistrer en base ou envoyer une notification.</p>
        `,
        errors: `
          <p><strong>Pattern 1 — Copier-coller le traitement :</strong> La correction d'une règle doit ensuite être reportée à plusieurs endroits.</p>
          <p><strong>Pattern 2 — Choisir un nom vague :</strong> <code>faireTruc()</code> ou <code>process()</code> cache l'intention et ralentit la lecture.</p>
          <p><strong>Pattern 3 — Créer une fonction sans objectif :</strong> Un découpage excessif oblige à naviguer entre de nombreux petits blocs sans gagner en clarté.</p>
        `,
        invariants: `
          <p><strong>Ce qui change :</strong> la syntaxe de déclaration, la manière d'appeler une fonction et la gestion du contexte selon le langage.</p>
          <p><strong>Ce qui ne change pas :</strong> une fonction nomme un traitement, reçoit éventuellement des entrées et peut produire une sortie.</p>
        `,
        practice: {
          exercices: [
            {
              titre: "Extraire un calcul",
              etapes: [
                "Écrire trois lignes qui additionnent le prix et la taxe d'une commande.",
                "Extraire ces lignes dans une fonction calculerTotal.",
                "Appeler la fonction avec deux commandes différentes.",
              ],
              output: "Une fonction courte appelée deux fois avec des données différentes.",
              critere:
                "Le nom exprime l'intention et le résultat reste identique au calcul initial.",
            },
          ],
          piege:
            "Utiliser directement une variable globale au lieu de recevoir la commande en paramètre.",
        },
        verification: [
          "Quand le corps d'une fonction est-il exécuté ?",
          "Pourquoi une fonction locale réduit-elle le risque lié au copier-coller ?",
          "Dans quel cas faut-il éviter d'extraire une fonction supplémentaire ?",
        ],
      },
    },
    fonctionsPredefinies: {
      id: "fonctionsPredefinies",
      label: "Fonctions prédéfinies",
      icon: "◼",
      kind: "processus",
      os: "universel",
      osLabel: "Réutiliser",
      niveau: "Fondation",
      sections: {
        why: `
          <p>Les langages, navigateurs et bibliothèques fournissent déjà de nombreuses fonctions et méthodes fiables. Les connaître évite de reconstruire des opérations courantes : nettoyer un texte, filtrer une liste, convertir une date ou sérialiser des données.</p>
        `,
        system: `
          <p>Une API prédéfinie expose un contrat documenté : entrées attendues, sortie produite, cas limites et éventuels effets de bord.</p>
          <pre><code>const recherche = saisie.trim().toLowerCase();
const visibles = produits.filter((produit) =&gt; produit.actif);
const payload = JSON.stringify(visibles);</code></pre>
          <p>Une méthode est une fonction appelée depuis une valeur ou un objet, comme <code>texte.trim()</code>. <span class="ref-fiche">→ F18</span> <span class="ref-fiche">→ F19</span> <span class="ref-fiche">→ F20</span></p>
        `,
        choice: {
          kind: "free",
          html: `
          <p>Commencer par vérifier l'API standard et les outils déjà installés dans le projet. Écrire une fonction personnalisée lorsque la règle appartient au métier ou lorsque l'outil existant ne correspond pas au besoin.</p>
        `,
        },
        senior: `
          <p>Avant d'adopter une fonction prédéfinie, vérifier son contrat : modifie-t-elle la valeur d'origine, quel format retourne-t-elle, comment gère-t-elle l'absence de valeur et quel coût implique-t-elle sur de grandes collections ?</p>
        `,
        errors: `
          <p><strong>Pattern 1 — Réinventer l'outil standard :</strong> Une implémentation maison de tri, de conversion ou de recherche ajoute des erreurs évitables.</p>
          <p><strong>Pattern 2 — Supposer le contrat :</strong> Une méthode peut retourner une nouvelle valeur ou modifier l'existante ; la confusion produit des bugs discrets.</p>
          <p><strong>Pattern 3 — Empiler les appels illisibles :</strong> Une longue chaîne de méthodes sans nom intermédiaire masque les étapes du traitement.</p>
        `,
        invariants: `
          <p><strong>Ce qui change :</strong> le nom des fonctions disponibles, leur syntaxe et leur contrat selon le langage ou la bibliothèque.</p>
          <p><strong>Ce qui ne change pas :</strong> il faut lire le contrat d'une API avant de s'appuyer sur son résultat ou ses effets.</p>
        `,
        practice: {
          exercices: [
            {
              titre: "Nettoyer une recherche",
              etapes: [
                "Définir une chaîne contenant des espaces et des majuscules.",
                "Utiliser des méthodes prédéfinies pour retirer les espaces extérieurs et passer en minuscules.",
                "Afficher la valeur initiale puis la valeur transformée.",
              ],
              output:
                "Deux chaînes qui montrent que la transformation produit la recherche normalisée.",
              critere:
                "La valeur normalisée est correcte et le rôle de chaque méthode est expliqué.",
            },
          ],
          piege: "Supposer que la chaîne initiale a été modifiée en place.",
        },
        verification: [
          "Quelle différence pratique existe-t-il entre une fonction et une méthode ?",
          "Que faut-il vérifier avant d'utiliser une API prédéfinie ?",
          "Quand une fonction personnalisée reste-t-elle préférable ?",
        ],
      },
    },
    creerFonction: {
      id: "creerFonction",
      label: "Créer une fonction",
      icon: "+",
      kind: "processus",
      os: "universel",
      osLabel: "Concevoir",
      niveau: "Intermédiaire",
      sections: {
        why: `
          <p>Une fonction personnalisée traduit une règle propre au produit : valider une inscription, calculer des frais de livraison ou déterminer les droits d'un utilisateur. Elle rend le vocabulaire métier visible dans le code.</p>
        `,
        system: `
          <p>La conception commence par une phrase claire : « à partir de ces entrées, produire ce résultat ». Le corps reste centré sur une responsabilité.</p>
          <pre><code>function calculerFraisLivraison(total, estExpress) {
  if (total &gt;= 80) return 0;
  return estExpress ? 12 : 6;
}</code></pre>
          <p>Cette fonction est prévisible : les mêmes entrées donnent la même sortie et elle ne modifie rien à l'extérieur.</p>
        `,
        choice: {
          kind: "free",
          html: `
          <p>Préférer une fonction de calcul prévisible dès que possible. Isoler les effets nécessaires dans des fonctions clairement nommées, par exemple <code>enregistrerCommande()</code> ou <code>envoyerEmailConfirmation()</code>.</p>
        `,
        },
        senior: `
          <p>Une bonne fonction expose juste assez d'informations pour accomplir sa tâche. Elle protège le code appelant des détails internes et facilite l'évolution de la règle sans modifier tous les écrans qui l'utilisent.</p>
        `,
        errors: `
          <p><strong>Pattern 1 — Mélanger plusieurs responsabilités :</strong> Une seule fonction valide, enregistre, notifie et formate la réponse ; elle devient difficile à faire évoluer.</p>
          <p><strong>Pattern 2 — Lire des données cachées :</strong> Le résultat dépend d'une variable globale que l'appel ne rend pas visible.</p>
          <p><strong>Pattern 3 — Nommer selon l'implémentation :</strong> Un nom comme <code>bouclerProduits()</code> décrit le moyen plutôt que le besoin métier.</p>
        `,
        invariants: `
          <p><strong>Ce qui change :</strong> la règle métier, l'algorithme interne et le langage utilisé.</p>
          <p><strong>Ce qui ne change pas :</strong> une fonction claire possède une intention explicite et une responsabilité compréhensible.</p>
        `,
        practice: {
          exercices: [
            {
              titre: "Calculer une livraison",
              etapes: [
                "Écrire les règles de livraison gratuite, standard et express sous forme de phrases.",
                "Créer une fonction calculerFraisLivraison avec deux paramètres.",
                "Tester au moins trois commandes couvrant les différentes branches.",
              ],
              output: "Une fonction de calcul et trois appels produisant les frais attendus.",
              critere:
                "La fonction ne lit aucune donnée cachée et ne modifie aucune valeur extérieure.",
            },
          ],
          piege:
            "Ajouter l'affichage ou l'enregistrement de la commande dans la fonction de calcul.",
        },
        verification: [
          "Pourquoi formuler la responsabilité avant d'écrire le corps de la fonction ?",
          "Qu'est-ce qu'une fonction prévisible apporte au projet ?",
          "Comment reconnaître un effet observable ?",
        ],
      },
    },
    parametresRetours: {
      id: "parametresRetours",
      label: "Paramètres et retours",
      icon: "⇄",
      kind: "modele",
      os: "universel",
      osLabel: "Définir le contrat",
      niveau: "Intermédiaire",
      sections: {
        why: `
          <p>Les paramètres et la valeur de retour forment le contrat visible d'une fonction. Un contrat clair permet de réutiliser le traitement depuis une interface web, une application mobile ou une route backend sans connaître ses détails internes.</p>
        `,
        system: `
          <p>Un paramètre est le nom déclaré par la fonction ; un argument est la valeur fournie lors de l'appel. La valeur retournée devient utilisable dans une variable ou une expression.</p>
          <pre><code>function creerResume({ nom, total = 0 }) {
  return { titre: nom.trim(), montant: total };
}

const resume = creerResume({ nom: "  Lina  ", total: 42 });</code></pre>
          <p>Un objet d'options rend les appels plus lisibles lorsqu'une fonction reçoit plusieurs informations.</p>
        `,
        choice: {
          kind: "free",
          html: `
          <p>Utiliser peu de paramètres positionnels pour les fonctions simples. Préférer un objet nommé lorsque plusieurs options apparaissent. Définir une forme de retour stable et traiter explicitement les entrées invalides.</p>
        `,
        },
        senior: `
          <p>Un contrat robuste rend visibles les cas d'échec : valeur absente, résultat optionnel ou erreur contrôlée. Il évite les retours dont la forme change selon les branches, car ces variations compliquent tous les appels.</p>
        `,
        errors: `
          <p><strong>Pattern 1 — Multiplier les paramètres positionnels :</strong> L'appel <code>creerCompte(a, b, true, false, 3)</code> devient difficile à comprendre.</p>
          <p><strong>Pattern 2 — Retourner des formes différentes :</strong> Une branche renvoie un objet et une autre une chaîne ; le code appelant doit deviner le format.</p>
          <p><strong>Pattern 3 — Modifier silencieusement un argument :</strong> La fonction altère l'objet reçu alors que son nom laisse attendre un simple calcul.</p>
        `,
        invariants: `
          <p><strong>Ce qui change :</strong> le nombre d'entrées, les valeurs par défaut et la stratégie de gestion des erreurs.</p>
          <p><strong>Ce qui ne change pas :</strong> le contrat d'une fonction doit permettre de comprendre ce qu'elle attend et ce qu'elle produit.</p>
        `,
        practice: {
          exercices: [
            {
              titre: "Refactoriser un appel ambigu",
              etapes: [
                "Partir d'une fonction créerProfil recevant cinq paramètres positionnels.",
                "Remplacer ces paramètres par un objet aux propriétés nommées.",
                "Ajouter une valeur par défaut pour une propriété optionnelle.",
                "Comparer la lisibilité des deux appels.",
              ],
              output: "Une fonction dont l'appel révèle le rôle de chaque valeur.",
              critere:
                "L'ordre des propriétés n'est plus une source d'erreur et la valeur par défaut est documentée par le code.",
            },
          ],
          piege: "Conserver des noms génériques comme valeur1 ou option2.",
        },
        verification: [
          "Quelle différence existe-t-il entre un paramètre et un argument ?",
          "Pourquoi un objet d'options améliore-t-il certains appels ?",
          "Quel problème pose une forme de retour instable ?",
        ],
      },
    },
    compositionStructuration: {
      id: "compositionStructuration",
      label: "Composer le code",
      icon: "◇",
      kind: "processus",
      os: "universel",
      osLabel: "Structurer",
      niveau: "Intermédiaire",
      sections: {
        why: `
          <p>Un traitement réaliste dépasse souvent une seule règle. Le découper en fonctions cohérentes permet de lire les étapes, de tester chaque transformation et de remplacer une partie sans réécrire l'ensemble.</p>
        `,
        system: `
          <p>Composer consiste à faire circuler les résultats entre plusieurs fonctions spécialisées.</p>
          <pre><code>function preparerInscription(formulaire) {
  const donnees = normaliserFormulaire(formulaire);
  const erreurs = validerInscription(donnees);
  return { donnees, erreurs };
}</code></pre>
          <p>À mesure que le projet grandit, ces fonctions sont regroupées dans des modules et des couches adaptées. Cette organisation plus large est détaillée dans <span class="ref-fiche">→ T03</span>.</p>
        `,
        choice: {
          kind: "free",
          html: `
          <p>Extraire une étape lorsqu'elle porte une intention autonome, se réutilise ou mérite un test isolé. Garder près de son usage un petit détail qui n'a pas de sens ailleurs.</p>
        `,
        },
        senior: `
          <p>La qualité vient de la cohésion : chaque fonction traite un sujet précis. Une composition lisible évite aussi de transmettre partout un objet immense dont chaque fonction n'utilise qu'une petite partie.</p>
        `,
        errors: `
          <p><strong>Pattern 1 — Construire une fonction géante :</strong> Plusieurs règles et effets sont entassés dans un bloc difficile à vérifier.</p>
          <p><strong>Pattern 2 — Découper sans vocabulaire :</strong> Des helpers numérotés ou génériques dispersent la logique sans clarifier le domaine.</p>
          <p><strong>Pattern 3 — Transmettre tout le contexte :</strong> Chaque fonction reçoit un objet global et dépend implicitement de nombreuses propriétés.</p>
        `,
        invariants: `
          <p><strong>Ce qui change :</strong> la taille du projet, le nombre de fonctions et leur répartition future dans des modules.</p>
          <p><strong>Ce qui ne change pas :</strong> la structuration reste guidée par des responsabilités claires et des dépendances visibles.</p>
        `,
        practice: {
          exercices: [
            {
              titre: "Préparer une inscription",
              etapes: [
                "Lister les étapes nécessaires pour nettoyer et valider un formulaire d'inscription.",
                "Créer une fonction par intention : normaliser puis valider.",
                "Créer une fonction principale qui compose les deux résultats.",
                "Tester la composition avec une saisie valide et une saisie invalide.",
              ],
              output: "Trois fonctions dont les noms rendent le scénario lisible.",
              critere:
                "Chaque fonction possède une responsabilité et reçoit uniquement les données utiles.",
            },
          ],
          piege: "Introduire l'appel réseau ou la base de données dans la fonction de validation.",
        },
        verification: [
          "Que signifie composer des fonctions ?",
          "Quand une étape mérite-t-elle une fonction dédiée ?",
          "Quel signe révèle qu'une fonction reçoit trop de contexte ?",
        ],
      },
    },
    applicationsPratiques: {
      id: "applicationsPratiques",
      label: "Applications pratiques",
      icon: "✓",
      kind: "decision",
      os: "universel",
      osLabel: "Appliquer",
      niveau: "Intermédiaire",
      sections: {
        why: `
          <p>Les fonctions sont présentes dans tout le parcours full stack : filtrer une liste côté interface, valider une saisie mobile, calculer un prix côté serveur ou adapter des données reçues depuis une API.</p>
        `,
        system: `
          <p>Un même besoin peut être décomposé en traitements vérifiables avant de connecter les détails techniques.</p>
          <pre><code>function preparerCommande(panier) {
  const lignes = panier.filter(estDisponible);
  const total = calculerTotal(lignes);
  return { lignes, total, livraison: calculerLivraison(total) };
}</code></pre>
          <p>Les fonctions de calcul deviennent alors de bonnes candidates aux tests unitaires. <span class="ref-fiche">→ T09</span></p>
        `,
        choice: {
          kind: "free",
          html: `
          <p>Commencer par isoler les règles métier prévisibles. Ajouter ensuite les interactions avec l'interface, le réseau ou la base de données dans des fonctions distinctes dont le nom annonce l'effet.</p>
        `,
        },
        senior: `
          <p>Lors d'une revue, suivre le trajet des données : quelles fonctions les transforment, lesquelles les persistent et lesquelles déclenchent un effet extérieur ? Cette lecture aide à détecter les dépendances cachées et les responsabilités mélangées.</p>
        `,
        errors: `
          <p><strong>Pattern 1 — Mélanger calcul et affichage :</strong> Une fonction métier écrit directement dans l'interface et devient difficile à réutiliser côté serveur.</p>
          <p><strong>Pattern 2 — Faire confiance à une seule couche :</strong> Une validation côté interface est utile pour l'expérience utilisateur mais doit aussi être appliquée côté serveur.</p>
          <p><strong>Pattern 3 — Tester uniquement le parcours heureux :</strong> Les entrées vides, les limites et les données invalides restent sans protection.</p>
        `,
        invariants: `
          <p><strong>Ce qui change :</strong> l'environnement d'exécution, les outils d'interface, le framework backend et la source des données.</p>
          <p><strong>Ce qui ne change pas :</strong> isoler les règles, rendre les effets visibles et vérifier les cas limites simplifie les évolutions.</p>
        `,
        practice: {
          exercices: [
            {
              titre: "Préparer une commande",
              etapes: [
                "Créer une liste de produits contenant prix et disponibilité.",
                "Écrire une fonction estDisponible puis une fonction calculerTotal.",
                "Composer ces fonctions dans préparerCommande.",
                "Vérifier le résultat avec un produit indisponible et un panier vide.",
              ],
              output: "Une chaîne de fonctions qui retourne les lignes retenues et le total.",
              critere:
                "Le total tient compte uniquement des produits disponibles et le panier vide est traité.",
            },
          ],
          piege: "Modifier la liste d'origine pendant le filtrage.",
        },
        verification: [
          "Pourquoi séparer une règle métier d'un affichage ?",
          "Pourquoi valider aussi les données côté serveur ?",
          "Quels cas limites faut-il ajouter au test d'un panier ?",
        ],
      },
    },
  },
  maps: {
    universel: {
      viewBox: "0 0 1060 390",
      nodes: [
        { id: "fondamentauxFonctions", x: 20, y: 160, w: 190, h: 65 },
        { id: "fonctionsPredefinies", x: 270, y: 55, w: 180, h: 65 },
        { id: "creerFonction", x: 270, y: 265, w: 180, h: 65 },
        { id: "parametresRetours", x: 520, y: 160, w: 180, h: 65 },
        { id: "compositionStructuration", x: 770, y: 55, w: 210, h: 65 },
        { id: "applicationsPratiques", x: 770, y: 265, w: 200, h: 65 },
      ],
      edges: [
        { x1: 210, y1: 178, x2: 268, y2: 112, label: "réutilise" },
        { x1: 210, y1: 210, x2: 268, y2: 298, label: "conçoit" },
        { x1: 450, y1: 112, x2: 518, y2: 178, label: "éclaire" },
        { x1: 450, y1: 298, x2: 518, y2: 210, label: "définit" },
        { x1: 700, y1: 178, x2: 768, y2: 112, label: "compose" },
        { x1: 700, y1: 210, x2: 768, y2: 298, label: "applique" },
        { x1: 875, y1: 120, x2: 875, y2: 263, label: "structure" },
      ],
    },
  },
});
