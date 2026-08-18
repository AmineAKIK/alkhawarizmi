import { cultureSheet } from "./culture-common";

export const cultureObjetsClasses = cultureSheet({
  id: "culture-F23",
  number: 23,
  title: "Objets et Classes",
  subtitle: "Regrouper les données, modéliser un concept et choisir une structure adaptée",
  badge: "Fiche F23",
  meta: ["4 nœuds"],
  readingTime: "35 min",
  description:
    "Comprendre pourquoi les objets regroupent des données liées, comment une classe décrit la construction et le comportement d'instances, puis choisir entre objet simple, fonction et classe dans une application web ou mobile full stack.",
  accent: "modele",

  nodes: {
    comprendreObjets: {
      id: "comprendreObjets",
      label: "Comprendre les objets",
      icon: "{}",
      kind: "modele",
      os: "universel",
      osLabel: "Modéliser",
      niveau: "Fondation",
      sections: {
        why: `<p>Quand les informations d'un utilisateur circulent dans cinq variables séparées, il devient facile d'oublier son email, de mélanger deux identifiants ou de transmettre des arguments dans le mauvais ordre. Un objet regroupe les données qui décrivent un même concept sous des propriétés nommées : profil, produit, commande ou configuration.</p>`,
        system: `<p>Un objet prolonge les variables <span class="ref-fiche">→ F17</span> en réunissant plusieurs valeurs liées sous une identité commune. Il peut contenir des chaînes <span class="ref-fiche">→ F18</span>, des listes <span class="ref-fiche">→ F19</span> et des fonctions appelées méthodes <span class="ref-fiche">→ F21</span>. Dans une application full stack, les objets structurent aussi les échanges JSON <span class="ref-fiche">→ T07</span> et les données manipulées côté frontend <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Un objet simple suffit lorsqu'il faut regrouper des valeurs nommées :</p>
<pre><code>const produit = {
  id: "p-42",
  nom: "Clavier",
  prixCentimes: 5900,
  disponible: true
};

console.log(produit.nom);</code></pre>
<p><strong>Propriété :</strong> valeur accessible par un nom comme <code>produit.nom</code>.</p>
<p><strong>Objet imbriqué :</strong> propriété contenant elle-même un objet, utile pour structurer une adresse ou une configuration sans aplatir tous les champs.</p>
<p><strong>Méthode :</strong> fonction liée à un objet. Elle est utile lorsqu'un comportement appartient clairement au concept représenté.</p>
<p>Préférer un objet simple pour transporter des données. Ajouter une abstraction plus forte seulement lorsqu'elle clarifie réellement les règles et les usages.</p>`,
        },
        senior: `<p>Un développeur expérimenté vérifie la frontière de l'objet : quelles propriétés appartiennent réellement au même concept, lesquelles sont obligatoires, et lesquelles viennent d'une autre source de vérité ? Il évite les objets fourre-tout nommés <code>data</code> ou <code>context</code>, car ils cachent progressivement les dépendances du programme.</p>`,
        errors: `<p><strong>Pattern 1 — Le sac sans modèle :</strong> on ajoute toutes les propriétés disponibles dans un objet générique parce qu'il est pratique à transmettre. Les responsabilités se mélangent et chaque fonction dépend d'un contexte plus large que nécessaire.</p>
<p><strong>Pattern 2 — La propriété devinée :</strong> on utilise <code>user.name</code> à un endroit et <code>user.username</code> ailleurs parce que la forme de l'objet n'est pas définie. Les erreurs apparaissent tard, souvent à l'affichage.</p>
<p><strong>Pattern 3 — L'imbrication labyrinthe :</strong> on imbrique des objets sans limite parce que la structure reflète toutes les sources externes. Les accès deviennent fragiles et le domaine reste dépendant d'un format tiers.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe des objets, l'accès aux propriétés et les mécanismes de typage selon le langage. <strong>Ce qui ne change pas :</strong> un objet utile regroupe des données liées avec des noms explicites et une frontière compréhensible.</p>`,
        practice: {
          exercices: [
            {
              titre: "Modéliser un produit",
              etapes: [
                "Liste les données nécessaires pour afficher un produit dans une boutique web ou mobile.",
                "Crée un objet produit avec identifiant, nom, prix en centimes, disponibilité et catégorie.",
                "Ajoute un objet imbriqué dimensions avec largeur et hauteur.",
                "Affiche une phrase lisible à partir de plusieurs propriétés.",
              ],
              output: "Un objet produit structuré et une phrase construite depuis ses propriétés.",
              critere: "Chaque propriété possède un nom métier précis et aucune donnée sans rapport avec le produit n'est ajoutée.",
            },
          ],
          piege: "Nommer les propriétés selon leur position ou leur type, comme valeur1 ou texte, au lieu de leur rôle métier.",
        },
        verification: [
          "Quel problème un objet résout-il par rapport à plusieurs variables indépendantes ?",
          "Un objet profil reçoit progressivement les préférences UI, les droits, le token et toutes les données de session. Quel risque apparaît ?",
          "Pourquoi la frontière d'un objet reste-t-elle importante même si le langage accepte librement de nouvelles propriétés ?",
        ],
      },
    },

    definirClasse: {
      id: "definirClasse",
      label: "Définir une classe",
      icon: "C",
      kind: "processus",
      os: "universel",
      osLabel: "Construire",
      niveau: "Fondation",
      sections: {
        why: `<p>Lorsque plusieurs objets doivent être construits selon les mêmes règles et partager les mêmes comportements, recopier leur structure et leurs fonctions devient fragile. Une classe sert de plan de construction : elle décrit comment initialiser une instance et quelles méthodes elle expose.</p>`,
        system: `<p>Une classe s'appuie sur les objets de cette fiche et sur les fonctions <span class="ref-fiche">→ F21</span>. Son constructeur reçoit les données initiales ; ses méthodes regroupent les comportements cohérents avec le concept. Dans une architecture applicative <span class="ref-fiche">→ T03</span>, les classes peuvent modéliser certains objets du domaine ou faciliter l'injection de dépendances dans des services.</p>`,
        choice: {
          kind: "free",
          html: `<p>Une classe rend explicite la construction d'objets similaires :</p>
<pre><code>class Panier {
  constructor(lignes = []) {
    this.lignes = lignes;
  }

  calculerTotal() {
    return this.lignes.reduce(
      (total, ligne) =&gt; total + ligne.prixCentimes,
      0
    );
  }
}

const panier = new Panier([{ prixCentimes: 1200 }]);</code></pre>
<p><strong>Classe :</strong> plan de construction et ensemble de comportements partagés.</p>
<p><strong>Constructeur :</strong> fonction appelée à la création pour établir un état initial valide.</p>
<p><strong>Méthode :</strong> comportement disponible sur chaque instance.</p>
<p>Ne pas créer une classe uniquement pour ranger une poignée de fonctions sans état. Un module de fonctions ou un objet simple peut être plus lisible.</p>`,
        },
        senior: `<p>Un développeur expérimenté demande ce que la classe protège réellement : un invariant métier, un cycle de vie ou une dépendance clairement encapsulée. Si la classe ne fait que déplacer des données sans garantir de règle, elle ajoute souvent du vocabulaire et des couches sans simplifier le raisonnement.</p>`,
        errors: `<p><strong>Pattern 1 — La classe réflexe :</strong> on crée une classe pour chaque nom du domaine parce que la programmation orientée objet paraît plus sérieuse. Les abstractions se multiplient sans protéger aucune règle.</p>
<p><strong>Pattern 2 — Le constructeur permissif :</strong> on accepte n'importe quelles valeurs parce qu'elles seront validées plus tard. Des instances invalides circulent et déplacent les erreurs loin de leur origine.</p>
<p><strong>Pattern 3 — La méthode étrangère :</strong> on ajoute une méthode parce qu'elle utilise vaguement l'objet, alors qu'elle dépend surtout du réseau ou de l'interface. La classe mélange modèle, infrastructure et affichage.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la syntaxe de déclaration, les mécanismes de visibilité et les conventions du langage. <strong>Ce qui ne change pas :</strong> une classe n'est utile que si elle rend la construction ou le comportement d'objets similaires plus explicite et plus fiable.</p>`,
        practice: {
          exercices: [
            {
              titre: "Construire une classe panier",
              etapes: [
                "Pars d'un tableau de lignes contenant chacune un prix en centimes.",
                "Définis une classe Panier dont le constructeur initialise les lignes.",
                "Ajoute une méthode calculerTotal qui retourne la somme.",
                "Crée deux paniers différents et compare leurs totaux.",
              ],
              output: "Une classe Panier, deux instances et leurs résultats indépendants.",
              critere: "La méthode utilise l'état de son instance et retourne un montant en centimes sans modifier les lignes.",
            },
          ],
          piege: "Ajouter l'affichage du total ou un appel API dans calculerTotal alors que la méthode doit rester un calcul métier.",
        },
        verification: [
          "Quel rôle distinct jouent la classe, le constructeur et une méthode ?",
          "Une classe Produit ne contient que des propriétés et aucune règle particulière. Quelle alternative plus simple envisages-tu ?",
          "Quel critère durable permet de décider si une classe mérite d'exister ?",
        ],
      },
    },

    utiliserInstances: {
      id: "utiliserInstances",
      label: "Utiliser les instances",
      icon: "◎",
      kind: "modele",
      os: "universel",
      osLabel: "Manipuler",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Définir une classe ne crée encore aucun panier, compte ou minuteur concret. Une instance représente un objet particulier construit depuis cette classe. Comprendre cette distinction évite de partager accidentellement un état entre utilisateurs ou de croire que deux objets au contenu identique sont forcément le même objet.</p>`,
        system: `<p>Une instance applique le plan défini par la classe et possède son propre état. Les règles d'affectation et de référence étudiées avec les variables <span class="ref-fiche">→ F17</span> restent essentielles : deux variables peuvent viser la même instance. Les tests <span class="ref-fiche">→ T09</span> doivent vérifier l'indépendance des objets lorsque plusieurs utilisateurs, composants ou traitements coexistent.</p>`,
        choice: {
          kind: "free",
          html: `<p>Créer et manipuler des instances demande de distinguer identité et contenu :</p>
<pre><code>const panierA = new Panier();
const panierB = new Panier();
const alias = panierA;

console.log(panierA === panierB); // false
console.log(panierA === alias);   // true</code></pre>
<p><strong>Instance :</strong> objet concret construit depuis une classe.</p>
<p><strong>Identité :</strong> fait d'être le même objet en mémoire, indépendamment du contenu affiché.</p>
<p><strong>État :</strong> ensemble des valeurs actuelles portées par l'instance.</p>
<p>Limiter les mutations partagées. Une mise à jour locale et visible peut rester simple ; une instance modifiée depuis de nombreux endroits devient difficile à suivre.</p>`,
        },
        senior: `<p>Un développeur expérimenté recherche les alias avant de corriger un bug d'état : qui conserve une référence vers cette instance, qui peut la modifier, et combien de temps vit-elle ? Dans un frontend réactif ou une synchronisation mobile, une mutation invisible empêche parfois l'interface de détecter le changement ou rend les conflits hors connexion difficiles à résoudre.</p>`,
        errors: `<p><strong>Pattern 1 — L'instance partagée par accident :</strong> on réutilise le même objet pour plusieurs sessions parce qu'il était pratique à déclarer une seule fois. Les données d'un utilisateur contaminent celles d'un autre.</p>
<p><strong>Pattern 2 — Le sosie confondu :</strong> on suppose que deux objets ayant les mêmes propriétés sont la même instance. Une comparaison d'identité échoue alors que le besoin portait sur l'égalité de contenu.</p>
<p><strong>Pattern 3 — La mutation invisible :</strong> plusieurs fonctions modifient la même instance parce qu'elles possèdent toutes sa référence. L'origine d'un changement devient difficile à reconstruire et l'interface peut rester désynchronisée.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> la gestion mémoire, la comparaison d'objets et les conventions de mutation selon le langage ou le framework. <strong>Ce qui ne change pas :</strong> chaque instance possède une identité et un état ; partager une référence partage aussi la possibilité d'observer ou de modifier cet état.</p>`,
        practice: {
          exercices: [
            {
              titre: "Observer identité et mutation",
              etapes: [
                "Crée deux instances distinctes de Panier avec le même contenu.",
                "Compare leur identité puis compare manuellement leur total.",
                "Crée une troisième variable qui référence la première instance.",
                "Modifie cette instance et observe les valeurs visibles depuis les deux variables liées.",
              ],
              output: "Un petit script et quatre observations expliquant identité, contenu et alias.",
              critere: "La conclusion distingue clairement deux instances similaires d'une référence partagée vers la même instance.",
            },
          ],
          piege: "Conclure que deux objets sont identiques uniquement parce que leur affichage JSON est identique.",
        },
        verification: [
          "Quelle différence existe-t-il entre une classe et une instance ?",
          "Deux composants modifient le même objet panier reçu depuis un état partagé. Quel problème de traçabilité anticipes-tu ?",
          "Pourquoi l'identité et le contenu d'un objet doivent-ils rester deux notions distinctes ?",
        ],
      },
    },

    choisirUsage: {
      id: "choisirUsage",
      label: "Choisir le bon usage",
      icon: "✓",
      kind: "decision",
      os: "universel",
      osLabel: "Appliquer",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Connaître les classes ne signifie pas qu'il faut en mettre partout. Dans une application web ou mobile, certaines données doivent surtout traverser le réseau, être stockées ou alimenter une interface. D'autres portent des règles métier durables. Le bon choix réduit la complexité au lieu de la déplacer.</p>`,
        system: `<p>Les objets simples sont naturels pour les payloads JSON des APIs <span class="ref-fiche">→ T07</span> et l'état frontend <span class="ref-fiche">→ T08</span>. Les modèles de données <span class="ref-fiche">→ T06</span> et les services d'architecture <span class="ref-fiche">→ T03</span> peuvent utiliser des classes lorsque leurs invariants ou dépendances le justifient. Les tests <span class="ref-fiche">→ T09</span> vérifient ensuite les contrats et comportements indépendamment de la représentation choisie.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir la structure la plus simple qui rend le besoin clair :</p>
<p><strong>Valeurs séparées :</strong> adaptées à quelques données locales sans cohésion particulière.</p>
<p><strong>Objet simple :</strong> adapté aux formulaires, configurations, réponses API et états sérialisables. Il circule facilement entre frontend, backend et stockage local mobile.</p>
<p><strong>Fonction :</strong> adaptée à une transformation ou règle prévisible sans état durable. <span class="ref-fiche">→ F21</span></p>
<p><strong>Classe :</strong> adaptée lorsque plusieurs instances partagent une construction, des comportements et des invariants significatifs.</p>
<p>Une réponse JSON reçue depuis le réseau reste un objet de données : elle ne devient pas automatiquement une instance de classe avec ses méthodes. Cette conversion doit être volontaire si le domaine en a besoin.</p>`,
        },
        senior: `<p>Un développeur expérimenté surveille les frontières de sérialisation. Les méthodes, dates riches et dépendances injectées ne traversent pas automatiquement JSON. Il garde souvent les données de transport simples, puis les convertit explicitement vers un modèle métier seulement dans la couche qui en bénéficie. Sur mobile, cette discipline facilite aussi le cache local et la reprise hors connexion.</p>`,
        errors: `<p><strong>Pattern 1 — L'orienté objet partout :</strong> on enveloppe chaque réponse API dans une hiérarchie de classes parce que le projet utilise déjà des classes. Les conversions augmentent sans apporter de règle métier.</p>
<p><strong>Pattern 2 — Le JSON magique :</strong> on suppose qu'un objet reçu du réseau possède les méthodes de la classe correspondante. Après désérialisation, seules les données traversent et l'appel de méthode échoue.</p>
<p><strong>Pattern 3 — Le modèle frontière :</strong> on utilise exactement la même forme pour la base, l'API, l'état UI et le domaine parce qu'elle existe déjà. Une évolution locale force des changements dans toutes les couches.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les frameworks, les outils de sérialisation et les styles d'architecture choisis par l'équipe. <strong>Ce qui ne change pas :</strong> la représentation doit rester adaptée à sa frontière ; une classe se justifie par les règles qu'elle clarifie, pas par habitude.</p>`,
        practice: {
          exercices: [
            {
              titre: "Choisir une représentation full stack",
              etapes: [
                "Prends trois cas : payload de création de profil, calcul du total d'un panier et client API authentifié.",
                "Choisis pour chacun valeurs séparées, objet simple, fonction ou classe.",
                "Justifie le choix avec sérialisation, état, comportement et dépendances.",
                "Indique ce qui traverse réellement le réseau dans chaque cas.",
              ],
              output: "Un tableau de trois décisions avec représentation choisie, raison et frontière réseau.",
              critere: "Chaque classe proposée protège un comportement ou une dépendance explicite ; chaque donnée réseau reste sérialisable.",
            },
          ],
          piege: "Choisir une classe uniquement parce que le cas métier porte un nom comme Profil ou Produit.",
        },
        verification: [
          "Quand un objet simple est-il préférable à une classe ?",
          "Une API renvoie un JSON décrivant un panier. Pourquoi ne peux-tu pas appeler directement une méthode de Panier dessus ?",
          "Quel invariant guide le choix de représentation à la frontière entre frontend, backend et stockage mobile ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 980 300",
      nodes: [
        { id: "comprendreObjets", x: 20, y: 115, w: 190, h: 65 },
        { id: "definirClasse", x: 270, y: 40, w: 175, h: 65 },
        { id: "utiliserInstances", x: 270, y: 195, w: 185, h: 65 },
        { id: "choisirUsage", x: 540, y: 115, w: 200, h: 65 },
      ],
      edges: [
        { x1: 210, y1: 132, x2: 268, y2: 85, label: "formalise" },
        { x1: 210, y1: 162, x2: 268, y2: 225, label: "devient concret" },
        { x1: 445, y1: 85, x2: 538, y2: 132, label: "oriente" },
        { x1: 455, y1: 225, x2: 538, y2: 162, label: "éclaire" },
      ],
    },
  },
});
