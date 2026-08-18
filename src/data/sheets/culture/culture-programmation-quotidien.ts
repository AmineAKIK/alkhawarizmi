import { cultureSheet } from "./culture-common";

export const cultureProgrammationQuotidien = cultureSheet({
  id: "culture-F16",
  number: 16,
  title: "De l'Utilisateur au Créateur",
  subtitle:
    "Voir les programmes autour de soi, raisonner comme un développeur et construire un premier projet utile",
  badge: "Fiche F16",
  meta: ["5 nœuds"],
  readingTime: "30 min",
  description:
    "La programmation n'est pas réservée aux applications spectaculaires. Elle organise déjà les objets, les services et les décisions numériques du quotidien. Cette fiche aide à passer du rôle d'utilisateur à celui de créateur : reconnaître un programme, décomposer un problème, relier les concepts fondamentaux, choisir une application pratique et mener un premier projet jusqu'à un résultat observable.",
  accent: "modele",

  nodes: {
    programmesAutourNous: {
      id: "programmesAutourNous",
      label: "Les programmes autour de nous",
      icon: "◎",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une personne utilise chaque jour des dizaines de programmes sans les voir : réveil du téléphone, itinéraire calculé, paiement vérifié, vidéo recommandée, message synchronisé, ascenseur piloté. Tant que la programmation reste associée à un écran rempli de code, elle paraît abstraite et réservée à quelques spécialistes. Reconnaître les programmes autour de soi permet de comprendre leur rôle réel : transformer des entrées en sorties selon des règles explicites.</p>`,
        system: `<p>Ce nœud prolonge l'histoire de l'informatique <span class="ref-fiche">→ F01</span> : l'ordinateur universel devient utile quand un programme lui décrit une tâche. Il s'appuie sur le langage de la machine <span class="ref-fiche">→ F04</span> et prépare la logique appliquée <span class="ref-fiche">→ F14</span>. Dans une application web ou mobile, les règles sont ensuite distribuées entre interface <span class="ref-fiche">→ T08</span>, API <span class="ref-fiche">→ T07</span> et données <span class="ref-fiche">→ T06</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Pour reconnaître un programme, chercher quatre éléments :</p>
<p><strong>Entrées :</strong> informations reçues depuis un humain, un capteur, un fichier, une API ou une base de données. Exemple : position GPS, clic, texte saisi, heure actuelle.</p>
<p><strong>Règles :</strong> instructions et décisions appliquées aux entrées. Exemple : si le solde est insuffisant, refuser le paiement ; sinon enregistrer la transaction.</p>
<p><strong>État :</strong> informations conservées entre deux actions. Exemple : panier, historique, préférences, score ou session connectée.</p>
<p><strong>Sorties :</strong> résultat rendu visible ou transmis à un autre système. Exemple : notification, itinéraire, écran mis à jour ou commande envoyée.</p>
<p>Une calculatrice applique surtout des règles locales. Une application mobile connectée échange aussi avec un serveur. Un système embarqué agit parfois sans interface visible. La forme varie, mais le modèle reste exploitable.</p>`,
        },
        senior: `<p>Un développeur expérimenté ne commence pas par demander quel framework utiliser. Il identifie d'abord les entrées, les règles, l'état et les sorties. Cette lecture révèle où vivent les difficultés : une règle métier ambiguë, une donnée absente, un état impossible à synchroniser ou une sortie qui arrive trop tard. Le code vient ensuite matérialiser ce modèle.</p>`,
        errors: `<p><strong>Pattern 1 — Le programme réduit à l'écran :</strong> on croit que l'application est seulement ce qui est visible parce que l'interface attire l'attention. Les données, règles serveur et échanges réseau deviennent invisibles, donc le fonctionnement global reste incompris.</p>
<p><strong>Pattern 2 — L'automatisation magique :</strong> on décrit un résultat comme si la machine le devinait parce que les étapes intermédiaires sont cachées. Les règles et les données nécessaires ne sont jamais explicitées, donc le problème paraît insoluble.</p>
<p><strong>Pattern 3 — Le code avant le besoin :</strong> on cherche immédiatement un langage ou un tutoriel parce qu'écrire du code donne une impression d'avancement. Le programme obtenu automatise une tâche mal comprise et doit être réécrit.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les appareils, interfaces, langages et architectures utilisées. <strong>Ce qui ne change pas :</strong> un programme reçoit des entrées, applique des règles, manipule éventuellement un état et produit des sorties observables.</p>`,
        practice: {
          exercices: [
            {
              titre: "Décomposer un programme du quotidien",
              etapes: [
                "Choisis un service quotidien : réveil, GPS, messagerie, paiement ou réservation.",
                "Liste ses entrées, ses règles, son état et ses sorties visibles.",
                "Identifie une règle qui pourrait échouer ou produire un résultat inattendu.",
                "Situe ce qui relève de l'interface, du réseau, du serveur et des données.",
              ],
              output:
                "Une fiche d'analyse d'un programme quotidien avec entrées, règles, état, sorties et une panne plausible.",
              critere:
                "L'analyse est complète si une autre personne peut expliquer le fonctionnement général sans voir le code.",
            },
          ],
          piege:
            "Décrire seulement les écrans. Un programme se comprend par ses transformations et ses échanges, pas seulement par son apparence.",
        },
        verification: [
          "Quels quatre éléments permettent de reconnaître le fonctionnement d'un programme au-delà de son interface ?",
          "Une application de météo affiche une température obsolète. Quelles entrées, règles ou étapes du système inspectes-tu ?",
          "Pourquoi le modèle entrées-règles-état-sorties reste-t-il utile quand le langage ou le support change ?",
        ],
      },
    },

    decompositionProbleme: {
      id: "decompositionProbleme",
      label: "Décomposer un problème",
      icon: "◇",
      kind: "diagnostic",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Face à une idée comme "créer une application de tâches", un débutant voit souvent un bloc immense : écran, comptes, notifications, base de données, design, déploiement. Il ne sait pas où commencer et confond difficulté réelle avec taille mal découpée. Programmer consiste d'abord à transformer un problème flou en petites décisions vérifiables.</p>`,
        system: `<p>La décomposition transforme un besoin compris en Conception <span class="ref-fiche">→ C01</span> en règles assez précises pour être programmées. Elle prépare les structures de contrôle <span class="ref-fiche">→ F14</span>, l'architecture applicative <span class="ref-fiche">→ T03</span> et les tests <span class="ref-fiche">→ T09</span> : chaque sous-problème devient une responsabilité et un comportement que l'on peut vérifier séparément.</p>`,
        choice: {
          kind: "free",
          html: `<p>Plusieurs techniques se complètent :</p>
<p><strong>Découpage par parcours :</strong> partir d'une action utilisateur complète, puis détailler les étapes. Adapté aux applications web et mobiles : "ajouter une tâche" devient saisir, valider, enregistrer, confirmer et afficher.</p>
<p><strong>Découpage par données :</strong> identifier les informations nécessaires et leur évolution. Adapté quand le cœur du problème est un état : tâche, statut, date, propriétaire.</p>
<p><strong>Pseudo-code :</strong> écrire les règles dans un langage proche du français avant la syntaxe réelle. Adapté quand la difficulté porte sur l'enchaînement logique.</p>
<p><strong>Cas d'exemple :</strong> choisir quelques entrées concrètes et écrire les sorties attendues. Adapté pour révéler rapidement les ambiguïtés et préparer les tests.</p>`,
        },
        senior: `<p>Un développeur expérimenté découpe jusqu'à obtenir des morceaux dont il peut prédire le résultat avant de coder. Il se méfie des tâches nommées "gérer les utilisateurs" ou "faire le backend" : elles cachent trop de décisions. Il préfère une tranche verticale minuscule mais complète, comme créer une tâche en mémoire et l'afficher, car elle produit un feedback réel de bout en bout.</p>`,
        errors: `<p><strong>Pattern 1 — Le projet falaise :</strong> on garde une tâche énorme parce que la décomposer semble être du temps perdu. Aucun progrès n'est visible, l'incertitude augmente et l'abandon devient probable.</p>
<p><strong>Pattern 2 — Le découpage par fichiers :</strong> on planifie HTML, CSS puis JavaScript séparément parce que l'arborescence paraît concrète. Le premier comportement utilisable arrive trop tard et les intégrations révèlent les problèmes en fin de parcours.</p>
<p><strong>Pattern 3 — Le cas nominal unique :</strong> on écrit seulement ce qui se passe quand tout va bien parce que l'exemple est rassurant. Les entrées vides, invalides ou dupliquées restent implicites et produisent les premiers bugs.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la taille du projet, les outils de planification et le niveau de détail nécessaire. <strong>Ce qui ne change pas :</strong> un problème programmable devient abordable quand il est décomposé en transformations et comportements dont le résultat attendu est explicite.</p>`,
        practice: {
          exercices: [
            {
              titre: "Découper une mini-application avant de coder",
              etapes: [
                "Choisis une mini-application : liste de tâches, convertisseur, compteur de dépenses ou quiz.",
                "Décris un parcours principal en cinq étapes maximum.",
                "Pour chaque étape, note l'entrée, la règle appliquée et la sortie attendue.",
                "Ajoute trois cas limites puis choisis la plus petite tranche verticale réalisable.",
              ],
              output:
                "Un parcours découpé, trois cas limites et une première tranche verticale précisément définie.",
              critere:
                "La tranche choisie doit produire un résultat observable sans nécessiter de terminer toute l'application.",
            },
          ],
          piege:
            "Découper par couches techniques au lieu de viser un comportement minimal visible de bout en bout.",
        },
        verification: [
          "Pourquoi décomposer un problème précède-t-il l'écriture du code ?",
          "Tu veux créer une liste de tâches. Quelle tranche verticale minimale construis-tu en premier et pourquoi ?",
          "Quel invariant relie décomposition, résultat attendu et capacité à tester ?",
        ],
      },
    },

    conceptsFondamentaux: {
      id: "conceptsFondamentaux",
      label: "Les briques fondamentales",
      icon: "▦",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un premier tutoriel peut donner l'impression qu'il faut mémoriser une longue liste de syntaxes. Pourtant, presque tous les programmes reposent sur quelques briques répétées : conserver une valeur, transformer une donnée, choisir selon une condition, répéter une action et regrouper une logique réutilisable. Sans cette carte mentale, chaque nouveau langage paraît être un nouveau monde.</p>`,
        system: `<p>Ces briques prolongent le passage du binaire aux langages de haut niveau <span class="ref-fiche">→ F04</span> et réutilisent la logique booléenne ainsi que les structures de contrôle <span class="ref-fiche">→ F14</span>. Elles deviennent ensuite les matériaux de l'architecture <span class="ref-fiche">→ T03</span>, du frontend <span class="ref-fiche">→ T08</span>, des API <span class="ref-fiche">→ T07</span> et des tests <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>La carte minimale des concepts à reconnaître dans tout langage :</p>
<p><strong>Valeurs et variables :</strong> représenter une information et lui donner un nom. Exemple : <code>prix</code>, <code>utilisateur</code>, <code>estConnecte</code>.</p>
<p><strong>Types et collections :</strong> distinguer texte, nombre, booléen, objet et listes. Le type détermine les opérations possibles et les erreurs à anticiper.</p>
<p><strong>Conditions et boucles :</strong> choisir une branche et répéter un traitement. Leur logique détaillée est couverte dans <span class="ref-fiche">→ F14</span>.</p>
<p><strong>Fonctions :</strong> nommer une transformation réutilisable avec des entrées et une sortie. Une bonne fonction réduit le nombre de choses à comprendre simultanément.</p>
<p><strong>Erreurs et tests :</strong> rendre visibles les cas où le comportement obtenu diffère du comportement attendu. Un programme utile n'est pas seulement écrit : il est vérifié.</p>`,
        },
        senior: `<p>Un développeur expérimenté apprend un nouveau langage en retrouvant ces invariants avant d'explorer ses particularités. Il demande comment le langage représente les données, exprime les fonctions, gère les erreurs, organise les modules et exécute les tests. Cette approche évite de confondre maîtrise d'une syntaxe et compréhension de la programmation.</p>`,
        errors: `<p><strong>Pattern 1 — Le collectionneur de syntaxe :</strong> on mémorise des mots-clés sans les rattacher à un besoin parce que les exercices sont suivis mécaniquement. Dès que l'énoncé change, la solution ne peut pas être adaptée.</p>
<p><strong>Pattern 2 — La fonction tiroir :</strong> on place tout le programme dans une seule fonction parce que cela évite de réfléchir aux responsabilités. Chaque modification touche un bloc opaque et les erreurs deviennent difficiles à isoler.</p>
<p><strong>Pattern 3 — L'erreur comme échec personnel :</strong> on évite de lire les messages d'erreur parce qu'ils semblent sanctionner une faute. Le feedback le plus précis disponible est ignoré et le débogage devient une suite de modifications au hasard.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe, le typage, les librairies standards et les conventions des langages. <strong>Ce qui ne change pas :</strong> programmer exige de représenter des données, appliquer des transformations, contrôler le flux, organiser le code et vérifier le comportement obtenu.</p>`,
        practice: {
          exercices: [
            {
              titre: "Lire un programme sans dépendre de sa syntaxe",
              etapes: [
                "Choisis un petit exemple de code dans un langage que tu connais peu.",
                "Repère les valeurs, variables, collections, conditions, boucles et fonctions.",
                "Réécris son comportement en pseudo-code sans conserver la syntaxe d'origine.",
                "Identifie une entrée différente qui permettrait de tester un cas limite.",
              ],
              output:
                "Un programme annoté, son pseudo-code et un cas limite avec résultat attendu.",
              critere:
                "Le pseudo-code doit expliquer le comportement à une personne qui ne connaît pas le langage source.",
            },
          ],
          piege:
            "Traduire mot à mot la syntaxe au lieu d'expliquer la transformation réalisée par le programme.",
        },
        verification: [
          "Quelles briques fondamentales retrouves-tu dans presque tous les langages de programmation ?",
          "Une fonction de 150 lignes mélange validation, calcul et affichage. Comment la découpes-tu pour rendre son intention visible ?",
          "Pourquoi changer de langage ne supprime-t-il pas le besoin de comprendre données, transformations et flux de contrôle ?",
        ],
      },
    },

    applicationsPratiques: {
      id: "applicationsPratiques",
      label: "Applications pratiques",
      icon: "⚒",
      kind: "decision",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Apprendre uniquement avec des exercices abstraits produit une compétence fragile : on sait compléter une boucle demandée par un cours, mais on ne sait pas reconnaître où la programmation peut rendre service. Une application pratique donne une contrainte réelle, un résultat visible et une raison de persévérer quand la syntaxe devient inconfortable.</p>`,
        system: `<p>Les applications pratiques utilisent les briques fondamentales de cette fiche et les structures logiques <span class="ref-fiche">→ F14</span>. Elles préparent l'environnement de développement <span class="ref-fiche">→ T01</span> et le cycle local <span class="ref-fiche">→ T04</span>. Leur nature dépend aussi du problème réel identifié en Conception <span class="ref-fiche">→ C01</span> : le projet sert un besoin avant de servir une technologie.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir une première application selon le feedback recherché :</p>
<p><strong>Automatisation locale :</strong> renommer des fichiers, convertir des données ou générer un rapport. Bon choix pour voir vite la valeur des entrées, règles et sorties sans interface complexe.</p>
<p><strong>Mini-application web :</strong> quiz, liste de tâches, convertisseur ou suivi simple. Bon choix pour relier données, interactions et affichage dans un navigateur.</p>
<p><strong>Mini-application mobile :</strong> notes, minuteur ou checklist hors ligne. Bon choix quand le contexte mobile apporte une contrainte utile : petit écran, toucher, reprise après interruption.</p>
<p><strong>Petit service API :</strong> enregistrer et relire une ressource. Bon choix après les premières bases, pour comprendre la frontière entre client, serveur et persistance.</p>
<p>Le meilleur projet n'est pas le plus impressionnant : c'est celui dont une première version peut être terminée rapidement et améliorée par étapes.</p>`,
        },
        senior: `<p>Un développeur expérimenté choisit un projet d'apprentissage qui concentre une difficulté nouvelle à la fois. Il évite d'apprendre simultanément langage, framework, base de données, authentification et déploiement. Une première version volontairement limitée crée un socle observable ; chaque évolution ajoute ensuite une seule contrainte et révèle pourquoi les outils plus avancés existent.</p>`,
        errors: `<p><strong>Pattern 1 — Le clone de plateforme :</strong> on choisit de recréer un réseau social complet parce que le résultat semble motivant. Le périmètre dépasse les apprentissages actuels, aucune version terminée n'arrive et la motivation s'épuise.</p>
<p><strong>Pattern 2 — Le tutoriel passager :</strong> on reproduit une vidéo ligne par ligne parce que le résultat apparaît vite. Au premier changement demandé, aucune décision n'est comprise et le projet ne peut pas évoluer.</p>
<p><strong>Pattern 3 — La technologie trophée :</strong> on ajoute base de données, framework ou authentification parce que ces mots paraissent professionnels. La complexité augmente sans répondre à un besoin du projet.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le langage, la plateforme et la forme du projet choisi. <strong>Ce qui ne change pas :</strong> un bon projet d'apprentissage produit rapidement un résultat observable, limite les difficultés simultanées et permet d'ajouter de la complexité seulement quand un besoin concret l'exige.</p>`,
        practice: {
          exercices: [
            {
              titre: "Choisir une première application réaliste",
              etapes: [
                "Liste trois irritants simples de ton quotidien ou trois petits outils que tu aimerais comprendre.",
                "Pour chaque idée, identifie les entrées, règles, état et sorties.",
                "Écarte les idées qui exigent plus d'une difficulté nouvelle importante dès la première version.",
                "Choisis une idée et définis une version réalisable en une session courte.",
              ],
              output:
                "Trois idées comparées et un périmètre de première version avec résultat observable.",
              critere:
                "La première version choisie doit pouvoir être terminée sans authentification, infrastructure complexe ni dépendance non indispensable.",
            },
          ],
          piege:
            "Confondre ambition à long terme et périmètre de la première version. Une petite version terminée enseigne plus qu'une grande architecture inachevée.",
        },
        verification: [
          "Quels critères rendent une première application pédagogique réellement utile ?",
          "Tu veux apprendre JavaScript en recréant une marketplace avec paiement et chat. Comment réduis-tu le périmètre sans perdre l'objectif d'apprentissage ?",
          "Pourquoi ajouter un outil seulement lorsqu'un besoin concret apparaît reste-t-il valable après les premiers projets ?",
        ],
      },
    },

    premierProjet: {
      id: "premierProjet",
      label: "Se lancer par une boucle courte",
      icon: "▶",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le démarrage bloque souvent pour une mauvaise raison : on attend de connaître assez de théorie, de choisir le langage parfait ou de suivre le cours complet avant de produire quelque chose. Or la programmation s'apprend dans une boucle : écrire une petite intention, exécuter, observer l'écart, corriger et recommencer. Sans cette boucle, la connaissance reste passive.</p>`,
        system: `<p>Cette boucle applique la décomposition et les concepts fondamentaux de cette fiche. Elle prépare directement l'environnement de développement <span class="ref-fiche">→ T01</span>, l'initialisation d'un projet <span class="ref-fiche">→ T02</span> et le cycle local <span class="ref-fiche">→ T04</span>. Elle annonce aussi les tests <span class="ref-fiche">→ T09</span> : comparer résultat attendu et résultat obtenu est déjà une forme élémentaire de vérification.</p>`,
        choice: {
          kind: "free",
          html: `<p>Une boucle de départ soutenable :</p>
<p><strong>Définir :</strong> écrire une sortie observable minuscule. Exemple : afficher une liste saisie par l'utilisateur, calculer une conversion ou classer trois valeurs.</p>
<p><strong>Écrire :</strong> produire la plus petite modification capable d'approcher cette sortie.</p>
<p><strong>Exécuter :</strong> lancer immédiatement le programme et lire le résultat ou le message d'erreur.</p>
<p><strong>Comparer :</strong> distinguer résultat attendu, résultat obtenu et hypothèse expliquant l'écart.</p>
<p><strong>Corriger :</strong> modifier une seule chose, puis rejouer. Cette boucle courte évite de construire dix erreurs avant d'en observer une seule.</p>
<p>JavaScript est pratique pour une première expérience web dans le navigateur. Python est lisible pour les automatisations locales. Le bon premier langage dépend du projet immédiat ; aucun choix ne remplace la boucle de feedback.</p>`,
        },
        senior: `<p>Un développeur expérimenté garde la boucle de feedback courte même sur un projet complexe. Il lance fréquemment le programme, lit les erreurs avant de modifier, et sépare les hypothèses. Quand plusieurs choses changent à la fois, il devient difficile de savoir ce qui a corrigé ou cassé le comportement. La discipline du premier programme reste une discipline de production.</p>`,
        errors: `<p><strong>Pattern 1 — Le langage parfait :</strong> on compare indéfiniment JavaScript, Python et d'autres langages parce que choisir semble irréversible. Aucun programme n'est exécuté et l'apprentissage réel ne commence pas.</p>
<p><strong>Pattern 2 — Les vingt lignes aveugles :</strong> on écrit longtemps avant d'exécuter parce qu'on veut terminer une idée complète. Les erreurs s'accumulent et leur origine devient difficile à isoler.</p>
<p><strong>Pattern 3 — La correction loterie :</strong> on modifie plusieurs lignes au hasard après une erreur parce que le message n'est pas lu. Même quand le programme repart, aucun apprentissage fiable n'est produit.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> l'éditeur, le langage, le runtime et les outils de débogage. <strong>Ce qui ne change pas :</strong> progresser en programmation exige une boucle courte entre intention, exécution, observation, hypothèse et correction.</p>`,
        practice: {
          exercices: [
            {
              titre: "Mener une première boucle de programmation",
              etapes: [
                "Choisis un résultat minuscule : convertir des degrés, compter des mots ou filtrer une liste.",
                "Écris en pseudo-code les entrées, la règle et la sortie attendue.",
                "Implémente une première version en JavaScript ou Python puis exécute-la immédiatement.",
                "Ajoute un cas limite, observe le résultat et corrige une seule hypothèse à la fois.",
                "Note ce que tu ajouterais dans une deuxième version sans l'implémenter maintenant.",
              ],
              output:
                "Un mini-programme exécutable, un cas limite traité et une note courte pour la prochaine itération.",
              critere:
                "Le programme doit produire un résultat observable pour un cas nominal et un cas limite, avec une première version volontairement réduite.",
            },
          ],
          piege:
            "Transformer le premier exercice en projet complet. La compétence travaillée est la boucle de feedback, pas la quantité de fonctionnalités.",
        },
        verification: [
          "Pourquoi exécuter souvent son programme est-il plus formateur qu'écrire longtemps avant de tester ?",
          "Ton programme affiche une erreur après dix modifications simultanées. Comment reprends-tu une démarche de diagnostic fiable ?",
          "Quel invariant relie le premier exercice d'un débutant au travail quotidien d'un développeur expérimenté ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 980 300",
      nodes: [
        { id: "programmesAutourNous", x: 20, y: 115, w: 170, h: 65 },
        { id: "decompositionProbleme", x: 235, y: 115, w: 165, h: 65 },
        { id: "conceptsFondamentaux", x: 445, y: 35, w: 170, h: 65 },
        { id: "applicationsPratiques", x: 445, y: 195, w: 170, h: 65 },
        { id: "premierProjet", x: 680, y: 115, w: 220, h: 65 },
      ],
      edges: [
        { x1: 190, y1: 147, x2: 233, y2: 147, label: "révèle" },
        { x1: 400, y1: 130, x2: 443, y2: 83, label: "mobilise" },
        { x1: 400, y1: 164, x2: 443, y2: 227, label: "cadre" },
        { x1: 615, y1: 83, x2: 678, y2: 130, label: "outille" },
        { x1: 615, y1: 227, x2: 678, y2: 164, label: "concrétise" },
      ],
    },
  },
});
