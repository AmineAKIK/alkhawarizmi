import { cultureSheet } from "./culture-common";

export const cultureChainesCaracteres = cultureSheet({
  id: "culture-F18",
  number: 18,
  title: "Chaînes de Caractères",
  subtitle: "Construire, rechercher, transformer et analyser le texte manipulé par une application",
  badge: "Fiche F18",
  meta: ["5 nœuds"],
  readingTime: "35 min",
  description: "Les chaînes transportent une grande partie des données visibles d'une application : noms, messages, recherches, URLs et champs de formulaire. Cette fiche apprend à les déclarer, les manipuler, en extraire une partie, rechercher une information et les normaliser avant usage.",
  accent: "modele",

  nodes: {
    fondamentauxChaines: {
      id: "fondamentauxChaines",
      label: "Fondamentaux des chaînes",
      icon: "\"\"",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une application reçoit et affiche constamment du texte : nom d'utilisateur, adresse email, recherche, message d'erreur ou contenu d'une API. Sans modèle clair, un espace invisible fait échouer une connexion, une majuscule empêche une recherche et un emoji est compté de manière surprenante. Une chaîne de caractères permet de représenter une séquence textuelle, mais son apparente simplicité cache des décisions importantes.</p>`,
        system: `<p>Les chaînes spécialisent le type texte introduit avec les variables <span class="ref-fiche">→ F17</span>. Elles entrent depuis les formulaires et APIs <span class="ref-fiche">→ T07</span>, sont validées avant d'atteindre les données persistées <span class="ref-fiche">→ T06</span>, puis sont affichées dans l'interface <span class="ref-fiche">→ T08</span>. Leur traitement doit donc être explicite aux frontières du système.</p>`,
        choice: {
          kind: "free",
          html: `<p>Quelques propriétés structurantes :</p>
<p><strong>Séquence ordonnée :</strong> une chaîne conserve l'ordre de ses caractères. <code>"chat"</code> et <code>"tach"</code> contiennent les mêmes lettres mais ne représentent pas le même texte.</p>
<p><strong>Immutabilité :</strong> dans JavaScript et Python, une opération produit généralement une nouvelle chaîne au lieu de modifier l'ancienne. <code>nom.trim()</code> ne change pas <code>nom</code> si le résultat n'est pas réaffecté.</p>
<p><strong>Chaîne vide :</strong> <code>""</code> est une valeur textuelle valide, différente d'une absence comme <code>null</code>, <code>undefined</code> ou <code>None</code>.</p>
<p><strong>Unicode :</strong> le texte moderne ne se limite pas à l'alphabet ASCII. Accents, alphabets, emoji et caractères combinés exigent de tester les usages réels, particulièrement pour la longueur, le découpage et la recherche.</p>`,
        },
        senior: `<p>Un développeur expérimenté demande d'abord ce que la chaîne représente. Un nom affiché, un email comparé, un mot de passe, une URL et un identifiant technique sont tous du texte, mais n'acceptent pas les mêmes transformations. Normaliser aveuglément peut améliorer une recherche et corrompre un secret ou un identifiant sensible à la casse.</p>`,
        errors: `<p><strong>Pattern 1 — Le texte universel :</strong> on applique la même normalisation à toutes les chaînes parce qu'elles partagent le même type. Un mot de passe ou un identifiant sensible à la casse est modifié et l'utilisateur ne peut plus s'authentifier.</p>
<p><strong>Pattern 2 — Le vide absent :</strong> on confond <code>""</code> avec <code>null</code> parce que les deux semblent ne rien afficher. Le programme perd la différence entre une saisie vide et une donnée non fournie.</p>
<p><strong>Pattern 3 — L'alphabet implicite :</strong> on teste seulement des lettres ASCII parce que les exemples sont simples. Accents, emoji ou alphabets non latins cassent ensuite le comptage ou le découpage en production.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> l'encodage, les bibliothèques Unicode et les conventions propres au domaine. <strong>Ce qui ne change pas :</strong> une chaîne représente une séquence textuelle ordonnée ; sa signification métier détermine les transformations autorisées et les cas limites à tester.</p>`,
        practice: {
          exercices: [
            {
              titre: "Classifier les textes d'un formulaire",
              etapes: [
                "Choisis un formulaire d'inscription avec nom, email, mot de passe, ville et biographie.",
                "Indique pour chaque champ si chaîne vide et absence ont le même sens.",
                "Décide quelles transformations sont autorisées : suppression d'espaces, changement de casse ou aucune modification.",
                "Ajoute un exemple contenant accents ou emoji et note le comportement attendu.",
              ],
              output: "Un tableau de cinq champs avec sens métier, transformations autorisées et cas Unicode testé.",
              critere: "Chaque transformation doit être justifiée par le rôle du champ ; le mot de passe ne doit subir aucune normalisation silencieuse.",
            },
          ],
          piege: "Traiter une chaîne selon sa forme technique plutôt que selon la donnée métier qu'elle représente.",
        },
        verification: [
          "Pourquoi deux chaînes affichées comme du texte peuvent-elles nécessiter des règles de traitement différentes ?",
          "Un utilisateur saisit un mot de passe avec un espace final. Pourquoi ne faut-il pas appliquer automatiquement <code>trim()</code> ?",
          "Pourquoi la prise en compte d'Unicode reste-t-elle nécessaire indépendamment du langage ou du framework ?",
        ],
      },
    },

    declarationInitialisation: {
      id: "declarationInitialisation",
      label: "Déclarer et initialiser",
      icon: "=",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un texte écrit directement au milieu d'une fonction devient vite difficile à comprendre et à faire évoluer. Déclarer une chaîne avec un nom rend visible son intention ; choisir une initialisation honnête distingue un texte réellement vide d'une valeur encore inconnue.</p>`,
        system: `<p>La déclaration applique les règles générales des variables <span class="ref-fiche">→ F17</span> au texte. Elle prépare les opérations de base <span class="ref-fiche">→ operationsBase</span> et la construction de messages visibles dans l'interface <span class="ref-fiche">→ T08</span>. Une valeur provenant de l'extérieur devra ensuite être normalisée ou validée avant usage <span class="ref-fiche">→ transformationsAnalyse</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Construire une chaîne selon l'intention :</p>
<p><strong>Littéral simple :</strong> <code>const statut = "actif"</code> en JavaScript ou <code>statut = "actif"</code> en Python. Les guillemets simples ou doubles sont souvent équivalents ; suivre une convention cohérente évite du bruit.</p>
<p><strong>Interpolation :</strong> <code>\`Bonjour \${prenom}\`</code> en JavaScript ou <code>f"Bonjour {prenom}"</code> en Python. Elle exprime plus clairement l'insertion de valeurs qu'une longue concaténation.</p>
<p><strong>Texte multiligne :</strong> utile pour un template ou un contenu lisible, à distinguer d'un assemblage de données utilisateur.</p>
<p><strong>Valeur vide ou absente :</strong> initialiser avec <code>""</code> uniquement si le vide est un état valide. Utiliser une absence explicite si la valeur n'est pas encore connue.</p>`,
        },
        senior: `<p>Un développeur expérimenté sépare le contenu du code quand le texte devient long, traduit ou partagé. Il garde les petits libellés locaux près de leur usage, mais évite d'enfouir des emails, pages entières ou règles métier dans une concaténation. Cette frontière simplifie la traduction, les tests et les modifications éditoriales.</p>`,
        errors: `<p><strong>Pattern 1 — La concaténation puzzle :</strong> on assemble une phrase avec une succession de <code>+</code> parce que chaque ajout paraît minuscule. Espaces et ponctuation deviennent fragiles et la lecture de l'intention se dégrade.</p>
<p><strong>Pattern 2 — Le vide par réflexe :</strong> on initialise chaque texte avec <code>""</code> pour éviter une valeur absente. Le système ne sait plus distinguer donnée inconnue et saisie volontairement vide.</p>
<p><strong>Pattern 3 — Le paragraphe enfoui :</strong> on place un contenu long ou traduisible directement dans la logique parce que cela semble plus rapide. Toute correction éditoriale devient une modification de code risquée.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les délimiteurs, la syntaxe d'interpolation et les outils de traduction. <strong>Ce qui ne change pas :</strong> une chaîne doit être initialisée avec un sens explicite et sa construction doit rester lisible lorsque les valeurs insérées évoluent.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire des messages lisibles",
              etapes: [
                "Déclare prénom, nombre de notifications et date de dernière connexion.",
                "Construis un message avec concaténation puis avec interpolation.",
                "Teste le message avec zéro notification, un prénom contenant un tiret et une date absente.",
                "Choisis la version la plus lisible et justifie le traitement de la valeur absente.",
              ],
              output: "Deux versions du message, trois sorties testées et une justification du choix final.",
              critere: "La version retenue doit rendre visibles les espaces, la ponctuation et le traitement de la date absente.",
            },
          ],
          piege: "Choisir une initialisation qui évite une erreur technique mais efface une différence métier utile.",
        },
        verification: [
          "Quand l'interpolation est-elle préférable à la concaténation ?",
          "Une date de dernière connexion n'est pas encore connue. Pourquoi <code>\"\"</code> peut-il être une initialisation trompeuse ?",
          "Pourquoi séparer les textes longs du code facilite-t-il l'évolution d'une application ?",
        ],
      },
    },

    operationsBase: {
      id: "operationsBase",
      label: "Opérations de base",
      icon: "Aa",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un champ utilisateur contient souvent des espaces accidentels, une casse imprévisible ou un format différent de celui attendu. Sans opérations de base, l'application affiche des libellés incohérents et compare des valeurs qui devraient pourtant correspondre.</p>`,
        system: `<p>Les opérations de base transforment les chaînes déclarées dans <span class="ref-fiche">→ declarationInitialisation</span>. Elles préparent la recherche et l'extraction <span class="ref-fiche">→ extractionRecherche</span>, puis la normalisation des données entrantes <span class="ref-fiche">→ transformationsAnalyse</span>. Elles sont fréquentes dans les formulaires frontend <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les opérations courantes répondent à des besoins distincts :</p>
<p><strong>Longueur :</strong> <code>texte.length</code> mesure la taille technique d'une chaîne. Pour une limite d'interface stricte avec emoji, vérifier le comportement réel attendu.</p>
<p><strong>Concaténation et interpolation :</strong> assembler plusieurs morceaux de texte. Préférer l'interpolation quand des variables s'insèrent dans une phrase.</p>
<p><strong>Suppression des espaces périphériques :</strong> <code>trim()</code> nettoie une saisie comme un email ou une recherche lorsque ces espaces n'ont pas de sens métier.</p>
<p><strong>Casse :</strong> <code>toLowerCase()</code> ou <code>lower()</code> facilite une comparaison insensible à la casse. Conserver aussi la valeur originale si elle doit être affichée.</p>
<p><strong>Remplacement :</strong> <code>replace()</code> corrige ou reformate une partie connue. Pour une transformation globale ou complexe, préciser les règles et leurs limites.</p>`,
        },
        senior: `<p>Un développeur expérimenté conserve souvent deux représentations : la valeur originale pour l'affichage et une valeur normalisée pour la comparaison ou la recherche. Il ne transforme pas silencieusement la donnée source si l'utilisateur s'attend à retrouver exactement ce qu'il a saisi.</p>`,
        errors: `<p><strong>Pattern 1 — Le nettoyage destructeur :</strong> on écrase la valeur originale avec une version normalisée parce qu'une seule variable semble plus simple. L'affichage perd la saisie réelle et certaines corrections deviennent impossibles.</p>
<p><strong>Pattern 2 — Le <code>trim()</code> automatique :</strong> on retire les espaces de tous les champs parce que cela aide les emails. Un texte libre ou un secret est modifié alors que ses espaces peuvent être significatifs.</p>
<p><strong>Pattern 3 — La longueur naïve :</strong> on suppose que longueur technique et nombre de symboles visibles sont toujours identiques. Une limite de pseudo ou un compteur mobile devient incohérent avec certains emoji.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les méthodes disponibles, les règles Unicode et les besoins de présentation. <strong>Ce qui ne change pas :</strong> une transformation de texte doit être choisie selon le sens métier, préserver l'original quand nécessaire et être testée sur des entrées réalistes.</p>`,
        practice: {
          exercices: [
            {
              titre: "Normaliser une recherche sans perdre l'original",
              etapes: [
                "Déclare trois noms de produits avec casse, espaces périphériques et accents variés.",
                "Conserve chaque libellé original pour l'affichage.",
                "Crée une version normalisée adaptée à une recherche insensible à la casse.",
                "Teste une requête utilisateur avec espaces périphériques et casse différente.",
              ],
              output: "Une liste de produits originaux, leurs versions normalisées et le résultat d'une recherche testée.",
              critere: "La recherche doit trouver le bon produit sans modifier le libellé affiché à l'utilisateur.",
            },
          ],
          piege: "Confondre normalisation de recherche et réécriture définitive de la donnée affichée.",
        },
        verification: [
          "Pourquoi conserver parfois une chaîne originale et une version normalisée ?",
          "Un utilisateur recherche <code>\"  clavier \"</code>. Quelles opérations appliques-tu à la requête et pourquoi ?",
          "Pourquoi une limite basée sur <code>length</code> doit-elle être testée avec des caractères réels de l'application ?",
        ],
      },
    },

    extractionRecherche: {
      id: "extractionRecherche",
      label: "Extraction et recherche",
      icon: "⌕",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une application doit souvent isoler une partie d'un texte ou vérifier qu'un motif est présent : extraire l'extension d'un fichier, détecter un préfixe, filtrer une liste ou retrouver un terme dans une recherche. Sans méthode adaptée, le code dépend d'indices magiques et casse dès qu'un format varie légèrement.</p>`,
        system: `<p>L'extraction utilise les chaînes nettoyées par les opérations de base <span class="ref-fiche">→ operationsBase</span>. Elle prépare l'analyse structurée <span class="ref-fiche">→ transformationsAnalyse</span> et intervient dans les données issues d'URLs, formulaires et APIs <span class="ref-fiche">→ T07</span>. Ses cas limites doivent être couverts par des tests <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir l'outil selon la question :</p>
<p><strong>Extraire une portion :</strong> <code>slice(debut, fin)</code> récupère une sous-chaîne quand les positions sont réellement connues.</p>
<p><strong>Rechercher une présence :</strong> <code>includes()</code> répond directement à une question booléenne : le texte contient-il ce terme ?</p>
<p><strong>Vérifier les extrémités :</strong> <code>startsWith()</code> et <code>endsWith()</code> expriment mieux l'intention qu'une comparaison manuelle d'indices.</p>
<p><strong>Trouver une position :</strong> <code>indexOf()</code> est utile seulement si la position trouvée sert ensuite à extraire ou découper. Tester explicitement le cas non trouvé.</p>
<p><strong>Découper :</strong> <code>split(separateur)</code> transforme une chaîne en collection lorsque le séparateur et le format sont suffisamment fiables.</p>`,
        },
        senior: `<p>Un développeur expérimenté évite de parser un format complexe avec une cascade de <code>split()</code> et d'indices. Pour une URL, une date ou un CSV réel, il utilise un parseur adapté. Les opérations simples restent excellentes quand le contrat est étroit et explicite ; elles deviennent fragiles quand elles tentent de recréer une grammaire complète.</p>`,
        errors: `<p><strong>Pattern 1 — L'indice magique :</strong> on écrit <code>slice(0, 8)</code> parce que l'exemple possède toujours huit caractères. Une valeur plus courte ou un nouveau format rend l'extraction fausse sans erreur visible.</p>
<p><strong>Pattern 2 — Le séparateur optimiste :</strong> on utilise <code>split(",")</code> pour analyser un CSV parce que les premières lignes sont simples. Une virgule dans un champ cité décale ensuite toutes les colonnes.</p>
<p><strong>Pattern 3 — Le non-trouvé oublié :</strong> on utilise directement le résultat de <code>indexOf()</code> sans traiter <code>-1</code>. L'extraction part du mauvais endroit et produit une donnée plausible mais incorrecte.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les noms de méthodes et les parseurs disponibles. <strong>Ce qui ne change pas :</strong> une extraction fiable explicite son contrat de format, traite l'absence de résultat et préfère un parseur dédié lorsque la structure dépasse une règle simple.</p>`,
        practice: {
          exercices: [
            {
              titre: "Analyser des identifiants de fichiers",
              etapes: [
                "Crée une liste avec <code>photo.jpg</code>, <code>archive.tar.gz</code>, <code>README</code> et <code>.env</code>.",
                "Utilise recherche et extraction pour déterminer si une extension exploitable existe.",
                "Documente le comportement pour chaque cas ambigu ou sans extension.",
                "Écris quatre résultats attendus puis vérifie ton implémentation.",
              ],
              output: "Une fonction d'extraction d'extension avec contrat explicite et quatre cas de test.",
              critere: "Les quatre exemples doivent produire un résultat intentionnel ; aucun cas absent ne doit être traité comme un index valide.",
            },
          ],
          piege: "Transformer une convention locale simple en faux parseur universel sans documenter ses limites.",
        },
        verification: [
          "Quand utilises-tu <code>includes()</code> plutôt que <code>indexOf()</code> ?",
          "Une recherche de séparateur retourne <code>-1</code>. Quel comportement dois-tu définir avant d'extraire une sous-chaîne ?",
          "Pourquoi une URL ou un CSV réel mérite-t-il généralement un parseur dédié ?",
        ],
      },
    },

    transformationsAnalyse: {
      id: "transformationsAnalyse",
      label: "Transformer et analyser",
      icon: "↬",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Une chaîne venant d'un formulaire ou d'une API n'est pas encore une donnée métier fiable. Elle peut contenir des espaces, une casse variable, un format invalide ou plusieurs informations mélangées. Transformer et analyser le texte permet de produire une valeur exploitable sans confondre nettoyage, validation et conversion.</p>`,
        system: `<p>L'analyse combine les opérations de base <span class="ref-fiche">→ operationsBase</span> et l'extraction <span class="ref-fiche">→ extractionRecherche</span>. Elle protège les frontières de données <span class="ref-fiche">→ T06</span>, les contrats d'API <span class="ref-fiche">→ T07</span> et les formulaires frontend <span class="ref-fiche">→ T08</span>. Les conditions de validation s'appuient sur la logique détaillée dans <span class="ref-fiche">→ F14</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Séparer les étapes évite les règles opaques :</p>
<p><strong>Normaliser :</strong> produire une représentation comparable, par exemple <code>trim()</code> puis passage en minuscules pour une recherche. La règle dépend du domaine.</p>
<p><strong>Transformer :</strong> utiliser <code>replace()</code>, <code>split()</code> et <code>join()</code> pour reformater un texte lorsque le contrat est simple.</p>
<p><strong>Convertir :</strong> transformer une chaîne vers un nombre, une date ou une structure seulement après validation explicite. Une conversion réussie techniquement ne garantit pas une valeur métier valide.</p>
<p><strong>Valider :</strong> vérifier longueur, présence, format et contraintes métier. Une expression régulière convient à certains motifs locaux ; elle ne remplace pas toujours un parseur ni une validation métier.</p>
<p><strong>Analyser avec une bibliothèque :</strong> choisir un parseur spécialisé pour URLs, dates, JSON ou CSV dès que leur grammaire comporte des cas limites reconnus.</p>`,
        },
        senior: `<p>Un développeur expérimenté garde la chaîne brute disponible pour diagnostiquer une entrée invalide, sans l'exposer inutilement dans les logs si elle contient des données sensibles. Il distingue validation syntaxique et validation métier : une adresse email peut avoir une forme plausible sans être utilisable, une date peut être valide sans être autorisée, un nombre peut être parsé tout en dépassant une limite.</p>`,
        errors: `<p><strong>Pattern 1 — La regex totale :</strong> on écrit une expression régulière gigantesque pour valider un format complexe parce qu'une seule ligne semble élégante. Les cas limites deviennent illisibles et la maintenance se transforme en devinette.</p>
<p><strong>Pattern 2 — Le parse réussi donc valide :</strong> on accepte une conversion numérique ou une date dès que le langage produit une valeur. Une quantité négative ou une date interdite atteint le cœur métier.</p>
<p><strong>Pattern 3 — Le nettoyage irréversible :</strong> on remplace la valeur brute avant d'avoir diagnostiqué l'entrée parce que seule la forme normalisée semble utile. Un bug ou un rejet devient difficile à expliquer.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les bibliothèques de validation, les parseurs et les règles métier. <strong>Ce qui ne change pas :</strong> une frontière fiable sépare valeur brute, normalisation, conversion et validation ; chaque étape doit avoir une intention observable et des cas limites testés.</p>`,
        practice: {
          exercices: [
            {
              titre: "Analyser un formulaire de profil",
              etapes: [
                "Définis nom affiché, email, code postal et biographie comme chaînes brutes reçues d'un formulaire.",
                "Choisis les normalisations autorisées pour chaque champ sans modifier silencieusement la biographie.",
                "Valide présence, longueur et contraintes de format avec des règles lisibles.",
                "Teste une entrée nominale, des espaces périphériques, un email invalide et une biographie trop longue.",
                "Retourne pour chaque test la valeur affichable ou une liste d'erreurs explicites.",
              ],
              output: "Une fonction d'analyse de profil avec quatre scénarios documentés et erreurs explicites.",
              critere: "Chaque champ doit distinguer valeur brute, normalisation autorisée et validation ; les quatre scénarios doivent produire le résultat attendu.",
            },
          ],
          piege: "Confondre nettoyage technique et décision métier : une transformation pratique n'est pas automatiquement légitime pour toutes les données.",
        },
        verification: [
          "Quelle différence fais-tu entre normaliser, convertir et valider une chaîne ?",
          "Une quantité issue d'un formulaire vaut <code>\"-3\"</code>. Pourquoi une conversion numérique réussie ne suffit-elle pas ?",
          "Quand une expression régulière devient-elle moins adaptée qu'un parseur spécialisé ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 1060 340",
      nodes: [
        { id: "fondamentauxChaines", x: 20, y: 135, w: 175, h: 65 },
        { id: "declarationInitialisation", x: 245, y: 135, w: 180, h: 65 },
        { id: "operationsBase", x: 485, y: 55, w: 155, h: 65 },
        { id: "extractionRecherche", x: 485, y: 215, w: 170, h: 65 },
        { id: "transformationsAnalyse", x: 735, y: 135, w: 200, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 167, x2: 243, y2: 167, label: "se déclare" },
        { x1: 425, y1: 150, x2: 483, y2: 103, label: "transforme" },
        { x1: 425, y1: 184, x2: 483, y2: 247, label: "parcourt" },
        { x1: 640, y1: 103, x2: 733, y2: 150, label: "normalise" },
        { x1: 655, y1: 247, x2: 733, y2: 184, label: "analyse" },
      ],
    },
  },
});
