import { cultureSheet } from "./culture-common";

export const culturePseudoCode = cultureSheet({
  id: "culture-F22",
  number: 22,
  title: "Fondamentaux du Pseudo-code",
  subtitle: "Clarifier un besoin et décrire un algorithme avant de choisir la syntaxe",
  badge: "Fiche F22",
  meta: ["5 nœuds"],
  readingTime: "35 min",
  description:
    "Le pseudo-code transforme un besoin en algorithme vérifiable sans dépendre d'un langage. Cette fiche apprend à analyser le problème, construire les étapes, représenter les structures conditionnelles, implémenter, tester puis optimiser uniquement après mesure.",
  accent: "processus",

  nodes: {
    rolePseudoCode: {
      id: "rolePseudoCode",
      label: "Pourquoi le pseudo-code",
      icon: "≡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Quand une règle métier est encore floue, écrire directement du JavaScript ou du Python mélange deux difficultés : décider ce que le programme doit faire et se souvenir de la syntaxe. Le pseudo-code sépare ces problèmes. Il permet de discuter d'un traitement avec une autre personne, de révéler les étapes manquantes et de corriger l'intention avant de construire du code fragile.</p>`,
        system: `<p>Le pseudo-code est une représentation textuelle d'un algorithme <span class="ref-fiche">→ F01</span>. Il complète la représentation visuelle en flowchart <span class="ref-fiche">→ flowcharts</span>, prolonge la décomposition d'un problème <span class="ref-fiche">→ F16</span> et prépare les fonctions <span class="ref-fiche">→ F21</span>. Il n'est pas exécutable : sa valeur vient de la clarté du raisonnement qu'il rend vérifiable avant l'implémentation.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir la représentation selon l'incertitude à réduire :</p>
<p><strong>Phrase métier :</strong> adaptée pour exprimer l'objectif utilisateur, par exemple "empêcher une réservation dans le passé". Elle reste insuffisante pour décrire toutes les étapes.</p>
<p><strong>Flowchart :</strong> adapté pour visualiser un parcours court avec embranchements ou retours. Il devient lourd lorsque chaque traitement contient beaucoup de détails.</p>
<p><strong>Pseudo-code :</strong> adapté pour préciser l'ordre, les données et les décisions sans dépendre d'un langage particulier.</p>
<p><strong>Code exécutable :</strong> adapté lorsque l'intention est assez stable pour être implémentée, testée et intégrée au projet.</p>`,
        },
        senior: `<p>Un développeur expérimenté n'écrit pas du pseudo-code pour chaque fonction triviale. Il l'utilise lorsque la difficulté réside dans la règle, le parcours ou les cas limites : calcul tarifaire, synchronisation mobile, autorisation ou validation. Si le pseudo-code reste difficile à expliquer, le code ne résoudra pas l'ambiguïté ; il la rendra seulement plus coûteuse.</p>`,
        errors: `<p><strong>Pattern 1 — Le code déguisé :</strong> on copie presque toute la syntaxe d'un langage parce qu'elle est familière. La discussion se bloque sur les points-virgules ou les méthodes au lieu d'évaluer la règle.</p>
<p><strong>Pattern 2 — La prose vague :</strong> on écrit "vérifier les données puis continuer" parce que le détail paraît évident. Les conditions réelles et les sorties d'erreur restent invisibles jusqu'à l'implémentation.</p>
<p><strong>Pattern 3 — Le document rituel :</strong> on rédige un pseudo-code après le développement pour compléter une documentation. Il ne réduit aucune incertitude et se désynchronise rapidement du comportement réel.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la notation choisie, la langue naturelle utilisée et le niveau de détail utile au contexte. <strong>Ce qui ne change pas :</strong> un bon pseudo-code clarifie une intention avant la syntaxe, reste compréhensible sans connaître un langage et rend les cas importants discutables.</p>`,
        practice: {
          exercices: [
            {
              titre: "Comparer trois représentations d'une même règle",
              etapes: [
                "Choisis une règle simple : refuser une réservation passée ou appliquer la livraison gratuite au-dessus d'un seuil.",
                "Écris-la d'abord en une phrase métier.",
                "Décris-la ensuite en pseudo-code avec entrée, décision et sortie.",
                "Note ce que le pseudo-code rend visible alors que la phrase laissait implicite.",
              ],
              output:
                "Une phrase métier, son pseudo-code et une liste d'au moins deux ambiguïtés levées.",
              critere:
                "Une personne ne connaissant pas ton langage de programmation doit pouvoir prédire le résultat pour deux entrées différentes.",
            },
          ],
          piege:
            "Ajouter des détails de framework ou de base de données alors que l'exercice porte sur la règle elle-même.",
        },
        verification: [
          "Quel problème le pseudo-code résout-il avant l'écriture du code exécutable ?",
          "Une règle tarifaire reste difficile à expliquer après rédaction du pseudo-code. Que dois-tu clarifier avant de choisir un langage ?",
          "Quand un flowchart est-il plus utile qu'un pseudo-code, et quand devient-il moins lisible ?",
        ],
      },
    },

    analyserBesoin: {
      id: "analyserBesoin",
      label: "Analyser le besoin",
      icon: "?",
      kind: "diagnostic",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un pseudo-code précis peut parfaitement automatiser la mauvaise chose. Si l'énoncé dit seulement "gérer les notifications", il manque encore l'événement déclencheur, le destinataire, le canal, le consentement et le comportement hors connexion. Avant d'ordonner des instructions, il faut transformer le besoin en contrat observable.</p>`,
        system: `<p>L'analyse technique part du problème réel étudié en Conception <span class="ref-fiche">→ C01</span> et du découpage de programmation <span class="ref-fiche">→ F16</span>. Elle fournit ensuite les entrées, sorties et scénarios nécessaires au pseudo-code de cette fiche, puis prépare les critères de test <span class="ref-fiche">→ T09</span>. Elle ne remplace pas la découverte produit : elle traduit un besoin suffisamment compris en comportement programmable.</p>`,
        choice: {
          kind: "free",
          html: `<p>Avant d'écrire les instructions, cadrer cinq questions :</p>
<p><strong>Déclencheur :</strong> quel événement lance le traitement ? Un clic, une réponse API, une heure planifiée ou une reprise réseau ?</p>
<p><strong>Entrées :</strong> quelles données sont disponibles, obligatoires, optionnelles ou potentiellement invalides ?</p>
<p><strong>Sorties :</strong> quel résultat observable est attendu côté utilisateur ou système ?</p>
<p><strong>Règles :</strong> quelles décisions métier transforment les entrées en sorties ?</p>
<p><strong>Cas limites :</strong> que faire si une valeur manque, si la liste est vide, si le réseau échoue ou si une limite est atteinte ?</p>`,
        },
        senior: `<p>Un développeur expérimenté cherche les mots ambigus avant les mots-clés de programmation : "valide", "rapidement", "automatique", "récent", "autorisé". Chacun cache une règle ou une frontière à faire préciser. Sur mobile, il ajoute systématiquement les interruptions, la reprise et la connectivité variable à l'analyse lorsqu'elles peuvent modifier le comportement.</p>`,
        errors: `<p><strong>Pattern 1 — La feature comme besoin :</strong> on reçoit "ajouter un bouton de rappel" et on décrit immédiatement son clic. Le moment utile, le consentement et le cas hors connexion ne sont jamais questionnés.</p>
<p><strong>Pattern 2 — Le cas nominal roi :</strong> on décrit uniquement une entrée valide parce que le parcours principal paraît prioritaire. Les absences, doublons et erreurs réseau apparaissent tard dans le code.</p>
<p><strong>Pattern 3 — L'ambiguïté silencieuse :</strong> on choisit seul une interprétation pour avancer plus vite. Le pseudo-code semble précis mais encode une décision métier jamais validée.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le domaine métier, le canal web ou mobile et les sources de données. <strong>Ce qui ne change pas :</strong> un comportement programmable exige un déclencheur, des entrées, des règles, des sorties et des cas limites explicités.</p>`,
        practice: {
          exercices: [
            {
              titre: "Cadrer une recherche de produits",
              etapes: [
                "Pars de la demande : permettre à l'utilisateur de rechercher un produit.",
                "Liste le déclencheur, les entrées et la sortie attendue.",
                "Ajoute les cas de recherche vide, résultat vide, erreur réseau et réponse lente.",
                "Formule les questions métier encore ouvertes avant d'écrire l'algorithme.",
              ],
              output:
                "Une mini-fiche de besoin avec contrat observable, quatre cas limites et questions ouvertes.",
              critere:
                "Chaque cas limite possède un résultat attendu ou une question explicite à trancher.",
            },
          ],
          piege:
            "Décider arbitrairement qu'une recherche vide doit afficher tous les produits sans vérifier l'intention produit ni le coût réseau.",
        },
        verification: [
          "Quelles cinq questions cadrent un comportement avant son écriture en pseudo-code ?",
          "Une application mobile synchronise des tâches. Quels cas propres au réseau et aux interruptions ajoutes-tu à l'analyse ?",
          "Pourquoi un pseudo-code précis ne garantit-il pas que le besoin traité est le bon ?",
        ],
      },
    },

    elementsBase: {
      id: "elementsBase",
      label: "Éléments de base",
      icon: ":=",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une suite de phrases libres devient vite difficile à relire : on ne distingue plus les données reçues, celles qui changent, les calculs et le résultat produit. Quelques conventions légères suffisent pour rendre un pseudo-code précis sans le transformer en langage de programmation supplémentaire.</p>`,
        system: `<p>Les éléments de base réutilisent les variables <span class="ref-fiche">→ F17</span>, chaînes <span class="ref-fiche">→ F18</span>, collections <span class="ref-fiche">→ F19</span>, dates <span class="ref-fiche">→ F20</span> et fonctions <span class="ref-fiche">→ F21</span>. Ils donnent une forme lisible aux entrées, transformations et sorties identifiées dans <span class="ref-fiche">→ analyserBesoin</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Un vocabulaire volontairement simple suffit :</p>
<pre><code>RECEVOIR panier
total ← 0
POUR CHAQUE produit DANS panier
  total ← total + produit.prix
FIN POUR
RETOURNER total</code></pre>
<p><strong>Entrées et sorties :</strong> utiliser des verbes comme <code>RECEVOIR</code>, <code>LIRE</code>, <code>AFFICHER</code> ou <code>RETOURNER</code>.</p>
<p><strong>Affectation :</strong> utiliser une flèche comme <code>total ← 0</code> pour distinguer la mise à jour d'une valeur d'une comparaison.</p>
<p><strong>Opérations :</strong> nommer clairement calculs, comparaisons et transformations. Une étape doit rester assez précise pour être traduite en code.</p>
<p><strong>Blocs :</strong> indenter les instructions appartenant à une condition, une boucle ou une fonction et marquer leur fin lorsque cela aide la lecture.</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit une convention puis reste cohérent dans tout le document. Il préfère les noms métier aux raccourcis : <code>prixTotal</code> plutôt que <code>x</code>. Il évite aussi les étapes magiques comme <code>traiterPanier</code> si le traitement est précisément le sujet à clarifier.</p>`,
        errors: `<p><strong>Pattern 1 — Le symbole changeant :</strong> on utilise <code>=</code> tantôt pour affecter, tantôt pour comparer. Le lecteur ne sait plus si une valeur est modifiée ou testée.</p>
<p><strong>Pattern 2 — L'étape magique :</strong> on écrit "gérer la commande" parce que le détail est long. Le cœur du problème reste caché derrière un verbe trop général.</p>
<p><strong>Pattern 3 — Le brouillon sans indentation :</strong> on aligne toutes les instructions parce que le pseudo-code n'est pas exécuté. Les blocs de conditions et de répétitions deviennent ambigus.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les mots-clés, les symboles d'affectation et le degré de formalisme choisi par l'équipe. <strong>Ce qui ne change pas :</strong> les entrées, sorties, affectations, opérations et blocs doivent être lisibles sans dépendre d'une syntaxe implicite.</p>`,
        practice: {
          exercices: [
            {
              titre: "Écrire le total d'un panier",
              etapes: [
                "Définis une entrée panier contenant trois produits avec un prix.",
                "Initialise une variable total et parcours les produits.",
                "Ajoute chaque prix au total avec une affectation explicite.",
                "Retourne le résultat puis vérifie-le manuellement.",
              ],
              output: "Un pseudo-code indenté de calcul de panier et son résultat attendu.",
              critere:
                "Chaque donnée utilisée est nommée, l'affectation reste distincte d'une comparaison et le résultat manuel correspond à la sortie.",
            },
          ],
          piege:
            "Employer une fonction totalPanier déjà supposée existante alors que l'exercice consiste précisément à détailler ce calcul.",
        },
        verification: [
          "Quels éléments minimaux rendent un pseudo-code lisible sans en faire un langage exécutable ?",
          "Dans un calcul de panier, comment distingues-tu l'initialisation de total et la comparaison à un seuil de livraison gratuite ?",
          "Pourquoi une étape comme 'traiter les données' affaiblit-elle la valeur du pseudo-code ?",
        ],
      },
    },

    structuresControle: {
      id: "structuresControle",
      label: "Structures de contrôle",
      icon: "◇",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un pseudo-code uniquement linéaire décrit mal une application réelle. Un formulaire peut être valide ou invalide ; une liste peut être vide ou remplie ; une synchronisation peut réussir ou devoir attendre le réseau. Les structures de contrôle rendent ces chemins explicites avant que les détails du langage ne les masquent.</p>`,
        system: `<p>Ce nœud applique les conditions et boucles présentées en détail dans <span class="ref-fiche">→ F14</span> aux besoins cadrés dans <span class="ref-fiche">→ analyserBesoin</span>. Il prépare ensuite la conception de fonctions <span class="ref-fiche">→ F21</span> et les scénarios de test <span class="ref-fiche">→ T09</span>. Ici, l'objectif est la formalisation lisible ; F14 reste la référence pour les opérateurs, optimisations et coûts de répétition.</p>`,
        choice: {
          kind: "free",
          html: `<p>Exprimer le contrôle selon l'intention :</p>
<pre><code>SI email EST VIDE
  AFFICHER "Email requis"
SINON SI email EST INVALIDE
  AFFICHER "Format incorrect"
SINON
  ENVOYER formulaire
FIN SI</code></pre>
<p><strong><code>SI / SINON SI / SINON</code> :</strong> choisir une branche selon une condition. Rendre visible le comportement de repli.</p>
<p><strong><code>POUR CHAQUE</code> :</strong> traiter chaque élément d'une collection lorsque la liste est connue.</p>
<p><strong><code>TANT QUE</code> :</strong> répéter jusqu'à ce qu'une condition change. Toujours montrer la progression et l'arrêt.</p>
<p><strong>Retour anticipé :</strong> arrêter un traitement dès qu'une précondition échoue pour garder le chemin principal lisible.</p>
<p>Quand de nombreuses conditions se croisent, compléter le pseudo-code par une table de décision plutôt que multiplier les niveaux d'imbrication.</p>`,
        },
        senior: `<p>Un développeur expérimenté relit chaque condition en demandant ce qui arrive dans l'autre branche. Il refuse les boucles dont l'arrêt dépend d'une hypothèse invisible et les parcours qui ne disent rien en cas d'échec réseau. Pour une règle d'autorisation ou de paiement, il construit souvent une table de décision avant le pseudo-code.</p>`,
        errors: `<p><strong>Pattern 1 — Le sinon disparu :</strong> on décrit ce qui arrive si la condition est vraie mais pas le comportement opposé. Une entrée inattendue traverse le traitement sans décision explicite.</p>
<p><strong>Pattern 2 — La boucle éternelle :</strong> on écrit <code>TANT QUE</code> sans montrer quelle valeur progresse vers l'arrêt. Le futur code risque de bloquer ou de retenter indéfiniment.</p>
<p><strong>Pattern 3 — La pyramide de décisions :</strong> on imbrique toutes les branches dans un seul bloc parce que le pseudo-code semble encore court. Les cas limites deviennent difficiles à suivre et à tester.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe réelle des conditions, boucles et retours selon le langage. <strong>Ce qui ne change pas :</strong> chaque décision doit rendre ses chemins importants explicites et chaque répétition doit montrer sa progression ainsi que sa condition d'arrêt.</p>`,
        practice: {
          exercices: [
            {
              titre: "Formaliser une inscription",
              etapes: [
                "Définis les entrées email, mot de passe et consentement.",
                "Écris des retours anticipés pour les champs absents et les formats invalides.",
                "Ajoute une branche explicite si l'API échoue faute de réseau.",
                "Liste les sorties possibles et vérifie qu'un scénario concret atteint chacune d'elles.",
              ],
              output:
                "Un pseudo-code d'inscription avec branches de validation, succès et erreur réseau.",
              critere:
                "Chaque sortie possède au moins un scénario déclencheur et aucune branche ne reste implicite.",
            },
          ],
          piege:
            "Confondre identifiants invalides et réseau indisponible sous une seule sortie générique alors que les actions utilisateur attendues diffèrent.",
        },
        verification: [
          "Quel invariant doit respecter chaque condition et chaque répétition dans un pseudo-code ?",
          "Une synchronisation mobile utilise TANT QUE en ligne est faux. Quelle progression et quelle borne ajoutes-tu pour éviter une répétition infinie ?",
          "Pourquoi compléter une règle complexe par une table de décision plutôt que multiplier les conditions imbriquées ?",
        ],
      },
    },

    relireTraduire: {
      id: "relireTraduire",
      label: "Implémenter et vérifier",
      icon: "✓",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Un algorithme n'a de valeur que s'il produit le résultat attendu sur des cas réels. Sans vérification, un pseudo-code peut sembler élégant tout en oubliant une entrée vide, une frontière ou une erreur externe. Sans mesure, une optimisation peut compliquer le code sans améliorer l'expérience. La traduction vers le code commence lorsque les étapes sont prévisibles ; l'amélioration commence lorsque les écarts sont observables.</p>`,
        system: `<p>La vérification relit les éléments de base <span class="ref-fiche">→ elementsBase</span> et les structures de contrôle <span class="ref-fiche">→ structuresControle</span>. Elle transforme les cas limites issus de l'analyse <span class="ref-fiche">→ analyserBesoin</span> en futurs tests <span class="ref-fiche">→ T09</span>, puis guide la création de fonctions ciblées <span class="ref-fiche">→ F21</span>. Lorsque le comportement est correct mais trop lent ou coûteux, la mesure de complexité <span class="ref-fiche">→ F01</span> et le profiling en production <span class="ref-fiche">→ P03</span> orientent l'optimisation.</p>`,
        choice: {
          kind: "free",
          html: `<p>Construire puis améliorer dans un ordre explicite :</p>
<p><strong>Construire :</strong> partir du besoin cadré, ordonner les transformations et rendre chaque branche importante visible.</p>
<p><strong>Simuler :</strong> parcourir le pseudo-code avec un cas nominal, un cas limite et un cas d'échec.</p>
<p><strong>Tracer :</strong> noter l'évolution des variables importantes étape par étape si un calcul ou une boucle reste difficile à prédire.</p>
<p><strong>Découper :</strong> transformer une étape autonome en fonction lorsque son nom clarifie le parcours ou lorsqu'elle mérite un test isolé.</p>
<p><strong>Implémenter :</strong> choisir les constructions idiomatiques du langage sans reproduire mécaniquement chaque ligne.</p>
<p><strong>Tester :</strong> comparer comportement attendu et comportement obtenu sur les scénarios préparés, puis ajouter les cas découverts pendant l'implémentation.</p>
<p><strong>Optimiser :</strong> mesurer temps, mémoire ou coût externe avant de modifier l'algorithme. Une solution plus complexe doit prouver son bénéfice par une comparaison avant/après.</p>
<p><strong>Maintenir :</strong> conserver le pseudo-code s'il documente une règle durable ; le supprimer s'il ne fait que paraphraser un code devenu plus lisible.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise la simulation manuelle comme une revue de conception miniature. Il cherche surtout les frontières : zéro élément, seuil exact, premier et dernier index, valeur absente, réponse tardive. Lors de l'implémentation, il préserve le comportement mais accepte une structure idiomatique différente si elle rend le code plus clair. Avant d'optimiser, il mesure : un algorithme plus sophistiqué n'est utile que si le goulot réel le justifie.</p>`,
        errors: `<p><strong>Pattern 1 — Le pseudo-code non simulé :</strong> on passe au code dès que le texte semble plausible. Une branche manquante n'est découverte qu'après plusieurs fichiers modifiés.</p>
<p><strong>Pattern 2 — La traduction mot à mot :</strong> on reproduit chaque instruction dans le langage cible parce que le pseudo-code paraît être un plan figé. Les fonctions standards et structures idiomatiques sont ignorées.</p>
<p><strong>Pattern 3 — L'optimisation instinctive :</strong> on remplace une solution lisible par une structure plus complexe parce qu'elle paraît plus performante. Sans mesure avant/après, le coût de maintenance augmente alors que le vrai goulot reste inchangé.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la structure idiomatique du code final, les bibliothèques utilisées, les outils de test et les techniques d'optimisation. <strong>Ce qui ne change pas :</strong> l'implémentation doit préserver les comportements vérifiés et toute optimisation doit répondre à un goulot mesuré avec une comparaison avant/après.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire, tester et optimiser une règle de livraison",
              etapes: [
                "Écris en pseudo-code une règle avec livraison gratuite à partir de 80 euros et supplément express.",
                "Simule les montants 0, 79, 80 et 120 euros avec et sans express.",
                "Découpe le calcul en une fonction nommée lorsque le contrat est clair.",
                "Implémente-la en JavaScript ou Python puis compare les résultats aux scénarios.",
                "Mesure son comportement sur une liste de commandes et explique si une optimisation est réellement nécessaire.",
              ],
              output:
                "Un pseudo-code, une table de scénarios, une fonction exécutable et une décision d'optimisation justifiée par une mesure.",
              critere:
                "Les huit combinaisons donnent exactement le même résultat avant et après implémentation ; toute optimisation proposée cite une mesure et un bénéfice attendu.",
            },
          ],
          piege:
            "Tester seulement 79 et 120 euros. Le seuil exact de 80 euros est le cas frontière qui révèle souvent une comparaison incorrecte.",
        },
        verification: [
          "Pourquoi simuler manuellement quelques scénarios avant d'implémenter l'algorithme ?",
          "Une fonction correcte semble lente sur une grande liste. Quelles mesures effectues-tu avant de modifier l'algorithme ?",
          "Pourquoi une optimisation doit-elle prouver son bénéfice par une comparaison avant/après ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 1110 330",
      nodes: [
        { id: "rolePseudoCode", x: 20, y: 130, w: 180, h: 65 },
        { id: "analyserBesoin", x: 245, y: 130, w: 175, h: 65 },
        { id: "elementsBase", x: 475, y: 45, w: 170, h: 65 },
        { id: "structuresControle", x: 475, y: 215, w: 190, h: 65 },
        { id: "relireTraduire", x: 735, y: 130, w: 180, h: 65 },
      ],
      edges: [
        { x1: 200, y1: 162, x2: 243, y2: 162, label: "cadre" },
        { x1: 420, y1: 145, x2: 473, y2: 92, label: "nomme" },
        { x1: 420, y1: 180, x2: 473, y2: 247, label: "oriente" },
        { x1: 645, y1: 92, x2: 733, y2: 145, label: "décrit" },
        { x1: 665, y1: 247, x2: 733, y2: 180, label: "branche" },
      ],
    },
  },
});
