import { cultureSheet } from "./culture-common";

export const cultureHtmlTexte = cultureSheet({
  id: "culture-F33",
  number: 33,
  title: "HTML — Texte et Contenu",
  subtitle:
    "Organisation, mise en forme et placement du texte — les balises qui donnent du sens au contenu",
  badge: "Fiche F33",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description:
    "La majorité du contenu d'une page web est du texte. HTML fournit des balises précises pour l'organiser (paragraphes, listes, citations, définitions), le mettre en forme sémantiquement (emphase, importance, annotation, correction), et le placer dans la structure de la page. Comprendre la distinction block/inline et choisir la balise adaptée à chaque contenu textuel, c'est produire un HTML lisible par les humains, les moteurs de recherche et les technologies d'assistance.",
  accent: "modele",

  nodes: {
    blockInline: {
      id: "blockInline",
      label: "Éléments block et inline",
      icon: "⬡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>La majorité des erreurs de mise en page HTML commises par les débutants — textes qui ne se comportent pas comme attendu, espacements impossibles à contrôler, éléments qui refusent de se placer côte à côte — viennent d'une incompréhension fondamentale : les éléments HTML se comportent différemment selon qu'ils sont "block" ou "inline". Cette distinction n'est pas un détail CSS — c'est une propriété intrinsèque de chaque balise HTML qui détermine comment le navigateur la place dans le flux du document.</p>`,
        system: `<p>La distinction block/inline est le modèle sous-jacent de tout le placement de contenu HTML. Elle conditionne les éléments d'organisation du texte <span class="ref-fiche">→ organisationTexte</span> (les paragraphes et listes sont block, les liens et emphases sont inline) et les éléments de mise en forme <span class="ref-fiche">→ miseEnFormeTexte</span> (<code>&lt;strong&gt;</code> et <code>&lt;em&gt;</code> sont inline). Elle est le prérequis de la compréhension du modèle de boîte CSS qui gouverne tout le placement visuel <span class="ref-fiche">→ placementTexte</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>La distinction block vs inline — comment chaque type se comporte dans le flux du document :</p>
<p><strong>Les éléments block :</strong> un élément block commence toujours sur une nouvelle ligne et prend toute la largeur disponible de son conteneur parent, quelle que soit la quantité de contenu qu'il contient. Deux éléments block consécutifs s'empilent verticalement. On peut définir leur largeur (<code>width</code>), hauteur (<code>height</code>), marges verticales et horizontales via CSS. Exemples d'éléments block : <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code>, <code>&lt;div&gt;</code>, <code>&lt;blockquote&gt;</code>, <code>&lt;pre&gt;</code>, <code>&lt;table&gt;</code>, <code>&lt;form&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>.</p>
<p><strong>Les éléments inline :</strong> un élément inline s'inscrit dans le flux du texte, sur la même ligne que ce qui le précède et le suit. Il ne prend que la largeur de son contenu. Plusieurs éléments inline s'enchaînent horizontalement jusqu'à ce que la ligne soit pleine, puis passent à la ligne suivante (wrapping). Les marges verticales (<code>margin-top</code>, <code>margin-bottom</code>) et la hauteur (<code>height</code>) n'ont pas d'effet sur les éléments inline purs. Exemples d'éléments inline : <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;code&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;abbr&gt;</code>, <code>&lt;mark&gt;</code>, <code>&lt;sub&gt;</code>, <code>&lt;sup&gt;</code>, <code>&lt;br&gt;</code>.</p>
<p><strong>La règle d'imbrication block/inline :</strong> un élément inline ne doit pas contenir d'élément block. <code>&lt;a&gt;&lt;p&gt;texte&lt;/p&gt;&lt;/a&gt;</code> est invalide — un lien (inline) ne peut pas contenir un paragraphe (block). Exception notable en HTML5 : <code>&lt;a&gt;</code> peut contenir des éléments block quand il est utilisé comme lien de bloc (une card entière cliquable) — c'est explicitement autorisé pour ce cas d'usage spécifique. En revanche, <code>&lt;span&gt;&lt;div&gt;texte&lt;/div&gt;&lt;/span&gt;</code> reste invalide.</p>
<p><strong>inline-block — le tiers terme :</strong> CSS introduit une troisième valeur : <code>display: inline-block</code>. Un élément inline-block s'inscrit dans le flux horizontal comme un élément inline (pas de retour à la ligne forcé), mais accepte width, height et marges verticales comme un élément block. Les images (<code>&lt;img&gt;</code>) sont nativement inline-block. Utile pour des boutons, des tags, des badges qui doivent se placer côte à côte tout en acceptant des dimensions précises.</p>
<p><strong>Comment consulter le display natif :</strong> dans Chrome DevTools, sélectionner un élément → onglet Computed → chercher la propriété <code>display</code>. La valeur affichée est la valeur calculée par le navigateur, qui inclut le display natif de la balise HTML avant toute surcharge CSS. C'est la façon la plus fiable de vérifier comment le navigateur traite nativement un élément.</p>`,
        },
        senior: `<p>Un développeur expérimenté ne mémorise pas la liste complète des éléments block vs inline — il comprend le principe et consulte les DevTools quand nécessaire. Ce qu'il retient : tous les éléments de structure de page et de contenu textuel autonome (<code>&lt;p&gt;</code>, titres, listes) sont block ; tous les éléments de mise en forme au sein d'un paragraphe (<code>&lt;strong&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;abbr&gt;</code>) sont inline. Quand un texte ne se comporte pas comme attendu, la première question est toujours : "est-ce que j'essaie de styler un élément inline comme un block sans changer son display ?"</p>`,
        errors: `<p><strong>Pattern 1 — Marge verticale sur un inline :</strong> appliquer <code>margin-top</code> ou <code>margin-bottom</code> à un <code>&lt;span&gt;</code> ou un <code>&lt;a&gt;</code> et s'étonner que ça ne fonctionne pas. Les marges verticales sont ignorées sur les éléments inline. La correction : passer l'élément en <code>display: inline-block</code> ou <code>display: block</code> selon le besoin.</p>
<p><strong>Pattern 2 — Élément block dans un inline par habitude :</strong> mettre un <code>&lt;div&gt;</code> à l'intérieur d'un <code>&lt;span&gt;</code>, ou un <code>&lt;p&gt;</code> à l'intérieur d'un <code>&lt;a&gt;</code> en dehors du cas de lien de bloc. Le navigateur répare silencieusement l'erreur mais le résultat est un DOM différent de ce qui est écrit — ce qui produit des surprises lors de la manipulation JavaScript ou du styling CSS.</p>
<p><strong>Pattern 3 — Utiliser <code>&lt;br&gt;</code> pour créer de l'espace vertical :</strong> insérer plusieurs <code>&lt;br&gt;</code> consécutifs pour espacer des blocs de contenu. <code>&lt;br&gt;</code> est un saut de ligne dans un contexte de texte continu — son seul usage légitime est dans une adresse ou un poème où les retours à la ligne font partie du contenu. Pour espacer des blocs, utiliser <code>margin</code> CSS. Deux <code>&lt;br&gt;</code> consécutifs signalent presque toujours qu'un nouveau paragraphe <code>&lt;p&gt;</code> aurait dû être utilisé.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> CSS peut modifier le display de n'importe quel élément (un <code>&lt;span&gt;</code> peut devenir block, un <code>&lt;div&gt;</code> peut devenir inline), les frameworks CSS (flexbox, grid) introduisent des contextes de formatage différents. <strong>Ce qui ne change pas :</strong> chaque élément HTML a un display natif que le navigateur applique par défaut ; les éléments inline ne peuvent pas contenir d'éléments block (sauf l'exception <code>&lt;a&gt;</code> en HTML5) ; les marges verticales et les dimensions précises ne s'appliquent qu'aux éléments block ou inline-block.</p>`,
        practice: {
          exercices: [
            {
              titre: "Identifier et corriger des erreurs block/inline",
              etapes: [
                "Ouvre un fichier HTML et écris ce code : <code>&lt;span&gt;&lt;h2&gt;Titre&lt;/h2&gt;&lt;p&gt;Paragraphe&lt;/p&gt;&lt;/span&gt;</code>. Ouvre-le dans le navigateur avec Live Server. Inspecte le résultat dans DevTools → Elements — observe comment le navigateur a 'réparé' le code invalide.",
                "Écris deux paragraphes séparés par trois <code>&lt;br&gt;</code>. Puis remplace les <code>&lt;br&gt;</code> par du CSS (<code>margin-bottom: 2rem</code> sur le premier <code>&lt;p&gt;</code>). Compare le résultat visuel et la qualité sémantique des deux approches.",
                "Dans DevTools sur n'importe quelle page, sélectionne successivement un lien <code>&lt;a&gt;</code>, un <code>&lt;strong&gt;</code>, un <code>&lt;p&gt;</code>, et un <code>&lt;div&gt;</code>. Pour chacun, consulte l'onglet 'Computed' et note la valeur de la propriété <code>display</code>.",
                "Écris une card cliquable : un <code>&lt;a&gt;</code> contenant une image, un <code>&lt;h3&gt;</code> et un <code>&lt;p&gt;</code>. Valide que c'est correct selon HTML5 (lien de bloc). Soumets au validateur W3C.",
              ],
              output:
                "Quatre observations documentées : résultat du code invalide dans DevTools, comparaison br vs margin, valeurs display des quatre éléments inspectés, validation de la card cliquable.",
              critere:
                "Chaque observation doit inclure une explication du comportement — pas seulement ce qui s'affiche, mais pourquoi le navigateur se comporte ainsi selon la règle block/inline.",
            },
          ],
          piege:
            "Croire que changer l'apparence via CSS (<code>display: block</code> sur un <code>&lt;span&gt;</code>) change la sémantique. CSS change le comportement visuel, pas le sens HTML. Un <code>&lt;span&gt;</code> affiché en block via CSS reste sémantiquement un élément générique inline — les technologies d'assistance et les moteurs de recherche voient la sémantique HTML, pas le display CSS.",
        },
        verification: [
          "Pourquoi appliquer <code>margin-top: 20px</code> sur un <code>&lt;span&gt;</code> n'a-t-il aucun effet visible, et quelles sont les deux solutions CSS pour obtenir ce comportement ?",
          "Un développeur écrit <code>&lt;p&gt;Texte&lt;br&gt;&lt;br&gt;&lt;br&gt;Autre texte&lt;/p&gt;</code> pour créer de l'espace entre deux blocs de texte. Quelle est la bonne approche sémantique, et dans quel unique contexte <code>&lt;br&gt;</code> est-il approprié ?",
          "Est-ce qu'un <code>&lt;a&gt;</code> contenant une <code>&lt;div&gt;</code> est valide en HTML5 ? Dans quel cas précis, et quelle règle générale cela contredit-il ?",
        ],
      },
    },

    organisationTexte: {
      id: "organisationTexte",
      label: "Éléments d'organisation du texte",
      icon: "≡",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le texte brut sans structure est un mur de mots : le lecteur ne sait pas où commence une idée, où elle finit, ce qui est une liste, ce qui est une définition, ce qui est une citation. HTML fournit des balises précises pour chaque type d'organisation textuelle. Les utiliser correctement, c'est donner au navigateur, au moteur de recherche et au lecteur d'écran les informations pour comprendre comment le contenu est organisé — pas seulement ce qu'il dit.</p>`,
        system: `<p>Les éléments d'organisation sont tous des éléments block <span class="ref-fiche">→ blockInline</span> — ils créent des unités de contenu distinctes dans le flux du document. Ils s'inscrivent dans la structure sémantique de la page <span class="ref-fiche">→ F32</span> : un <code>&lt;article&gt;</code> est composé de paragraphes, de titres et de listes. Ils conditionnent la lisibilité et l'accessibilité abordées dans <span class="ref-fiche">→ F30</span> : la navigation entre titres et les annonces de liste par les lecteurs d'écran dépendent de ces balises.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les balises d'organisation textuelle et leur usage correct :</p>
<p><strong>Paragraphes — <code>&lt;p&gt;</code> :</strong> l'unité de base du texte continu. Un paragraphe est un bloc d'idées cohérentes. Les navigateurs ajoutent automatiquement des marges au-dessus et en dessous — ne jamais supprimer ces marges sans raison, elles font partie de la lisibilité. Règle : ne pas utiliser des <code>&lt;div&gt;</code> pour des paragraphes de texte courant — <code>&lt;p&gt;</code> est sémantiquement précis et expose le contenu comme "texte de paragraphe" aux technologies d'assistance.</p>
<p><strong>Listes non ordonnées — <code>&lt;ul&gt;</code> et <code>&lt;li&gt;</code> :</strong> pour des éléments dont l'ordre ne compte pas — une liste de fonctionnalités, des ingrédients, des liens de navigation. La structure est stricte : <code>&lt;ul&gt;</code> ne peut contenir que des <code>&lt;li&gt;</code> comme enfants directs (pas de <code>&lt;p&gt;</code> ou <code>&lt;div&gt;</code> directement dans <code>&lt;ul&gt;</code>). En revanche, chaque <code>&lt;li&gt;</code> peut contenir n'importe quel contenu block ou inline. Le navigateur ajoute des puces par défaut — remplacées ou supprimées via CSS (<code>list-style: none</code>).</p>
<p><strong>Listes ordonnées — <code>&lt;ol&gt;</code> et <code>&lt;li&gt;</code> :</strong> pour des éléments dont l'ordre est significatif — étapes d'un tutoriel, classement, instructions. Attributs utiles : <code>start="3"</code> pour commencer la numérotation à 3, <code>reversed</code> pour un compte à rebours, <code>type="A"</code> pour des lettres majuscules ou <code>type="i"</code> pour des chiffres romains. Le navigateur numérote automatiquement.</p>
<p><strong>Listes imbriquées :</strong> une liste peut contenir une autre liste pour représenter une hiérarchie. La liste imbriquée se place à l'intérieur du <code>&lt;li&gt;</code> parent — jamais directement dans <code>&lt;ul&gt;</code> ou <code>&lt;ol&gt;</code>. Correct : <code>&lt;ul&gt;&lt;li&gt;Item&lt;ul&gt;&lt;li&gt;Sous-item&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;</code>. Utile pour les tables des matières, les menus de navigation à plusieurs niveaux, les structures de données hiérarchiques.</p>
<p><strong>Listes de définitions — <code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code> :</strong> pour les paires terme/définition ou clé/valeur. <code>&lt;dl&gt;</code> (description list) est le conteneur, <code>&lt;dt&gt;</code> (description term) est le terme, <code>&lt;dd&gt;</code> (description detail) est la définition ou valeur. Un <code>&lt;dt&gt;</code> peut avoir plusieurs <code>&lt;dd&gt;</code> (un terme avec plusieurs définitions). Cas d'usage : glossaires, FAQ (question = <code>&lt;dt&gt;</code>, réponse = <code>&lt;dd&gt;</code>), fiches produit (caractéristiques techniques), métadonnées d'un article (auteur, date, catégorie).</p>
<p><strong>Citations — <code>&lt;blockquote&gt;</code> et <code>&lt;q&gt;</code> :</strong> deux balises pour deux contextes. <code>&lt;blockquote cite="url-source"&gt;</code> : citation longue, affichée en bloc indépendant avec indentation par défaut, pour une citation d'un autre document ou d'une personne. L'attribut <code>cite</code> donne l'URL de la source (non affiché, utilisé par les outils sémantiques). <code>&lt;q&gt;</code> : citation courte inline, dans le flux d'un paragraphe — le navigateur ajoute automatiquement des guillemets adaptés à la langue (<code>lang</code>) du document. Ne jamais ajouter manuellement des guillemets autour d'un <code>&lt;q&gt;</code>.</p>
<p><strong>Code préformaté — <code>&lt;pre&gt;</code> et <code>&lt;code&gt;</code> :</strong> deux balises complémentaires. <code>&lt;code&gt;</code> : fragment de code inline (nom de variable, balise HTML, commande) dans le flux d'un paragraphe — rendu en police monospace par défaut. <code>&lt;pre&gt;</code> : bloc préformaté qui préserve les espaces et retours à la ligne — utilisé seul pour de l'art ASCII ou du texte à espacement significatif, mais le plus souvent combiné : <code>&lt;pre&gt;&lt;code&gt;...&lt;/code&gt;&lt;/pre&gt;</code> pour des blocs de code multi-lignes. Dans ce cas, le <code>&lt;code&gt;</code> donne la sémantique, le <code>&lt;pre&gt;</code> préserve le formatage.</p>
<p><strong>Séparateur thématique — <code>&lt;hr&gt;</code> :</strong> représente une rupture thématique dans le contenu — le passage à un autre sujet dans la même section. Affiché par défaut comme une ligne horizontale, mais son sens est sémantique, pas visuel. À utiliser pour signaler un changement de contexte dans un texte long, pas pour décorer.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise les <code>&lt;dl&gt;</code>/<code>&lt;dt&gt;</code>/<code>&lt;dd&gt;</code> beaucoup plus souvent que la moyenne — ces balises sont presque systématiquement oubliées au profit de tableaux ou de listes à deux colonnes. Une fiche produit (Couleur : Rouge, Taille : M, Matière : Coton) est une liste de définitions, pas un tableau ni deux <code>&lt;ul&gt;</code> côte à côte. Il sait aussi que <code>&lt;blockquote&gt;</code> ne sert pas à indenter du texte — c'est son apparence par défaut qui crée cette confusion, mais la sémantique est "voici une citation d'une source externe". Indenter du texte se fait avec CSS.</p>`,
        errors: `<p><strong>Pattern 1 — Liste simulée avec des <code>&lt;p&gt;</code> ou des <code>&lt;br&gt;</code> :</strong> écrire une liste d'éléments comme des paragraphes ou des lignes séparées par <code>&lt;br&gt;</code> parce que "ça ressemble pareil". Un lecteur d'écran annonce "liste de 5 éléments" au début d'un <code>&lt;ul&gt;</code> — information structurelle absente d'une succession de <code>&lt;p&gt;</code>. Les moteurs de recherche comprennent qu'une liste est un ensemble cohérent d'items liés. L'apparence visuelle est identique, la sémantique est opposée.</p>
<p><strong>Pattern 2 — <code>&lt;blockquote&gt;</code> utilisé pour l'indentation :</strong> utiliser <code>&lt;blockquote&gt;</code> pour indenter visuellement un bloc de texte qui n'est pas une citation. Cette confusion vient du rendu visuel par défaut (indentation). La sémantique HTML dit "c'est une citation d'une source externe" — un lecteur d'écran peut l'annoncer ainsi. Pour indenter, utiliser <code>padding-left</code> ou <code>margin-left</code> en CSS.</p>
<p><strong>Pattern 3 — Tableau utilisé pour des paires clé/valeur :</strong> utiliser un <code>&lt;table&gt;</code> pour afficher des caractéristiques produit (Couleur : Rouge, Poids : 500g) alors qu'une <code>&lt;dl&gt;</code> est sémantiquement précise pour ce cas. Un tableau implique des données tabulaires avec des relations entre lignes et colonnes. Une liste de définitions représente des associations terme/valeur sans relation entre les lignes.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les attributs disponibles sur les listes (<code>start</code>, <code>reversed</code>, <code>type</code> évoluent), l'apparence par défaut des balises selon le navigateur. <strong>Ce qui ne change pas :</strong> <code>&lt;p&gt;</code> pour le texte continu, <code>&lt;ul&gt;/<code>&lt;ol&gt;</code> pour les listes, <code>&lt;dl&gt;</code> pour les paires terme/définition — ces associations sémantiques sont stables depuis HTML 2.0 et correspondent à des besoins permanents d'organisation du contenu.</p>`,
        practice: {
          exercices: [
            {
              titre: "Restructurer du contenu avec les bonnes balises d'organisation",
              etapes: [
                "Prends ce contenu non structuré et identifie le type de chaque élément : <em>trois avantages d'un produit listés à la suite, une fiche technique avec Couleur/Poids/Matière, une citation d'un expert, un bloc de code JavaScript de 5 lignes, une séquence de 4 étapes d'installation numérotées</em>.",
                "Associe chaque élément à sa balise : avantages → <code>&lt;ul&gt;</code>, fiche technique → <code>&lt;dl&gt;</code>, citation → <code>&lt;blockquote cite&gt;</code>, code multi-lignes → <code>&lt;pre&gt;&lt;code&gt;</code>, étapes → <code>&lt;ol&gt;</code>.",
                "Écris le HTML complet avec les balises choisies. Pour la fiche technique, vérifie que chaque <code>&lt;dt&gt;</code> a son <code>&lt;dd&gt;</code> correspondant. Pour le code, assure-toi que les caractères spéciaux sont encodés (<code>&amp;lt;</code> pour <code>&lt;</code>).",
                "Ajoute une liste imbriquée dans l'une des étapes de l'<code>&lt;ol&gt;</code> (une étape avec 2 sous-étapes). Valide la structure avec HTMLHint.",
              ],
              output:
                "Cinq blocs HTML structurés avec la balise sémantique appropriée, liste imbriquée valide, entités encodées dans le bloc code — validé sans erreur HTMLHint.",
              critere:
                "Pour chaque choix de balise, pouvoir justifier pourquoi cette balise et pas une autre. La justification doit être sémantique ('c'est une liste de définitions parce que chaque item est une paire terme/valeur') et pas visuelle ('ça ressemble à un tableau').",
            },
          ],
          piege:
            "Choisir les balises selon l'apparence visuelle par défaut plutôt que selon le sens du contenu. <code>&lt;blockquote&gt;</code> indente, <code>&lt;ul&gt;</code> ajoute des puces, <code>&lt;h1&gt;</code> est grand et gras — mais ces apparences sont les styles par défaut du navigateur, pas la définition des balises. CSS peut tout modifier. La balise exprime le sens, pas l'apparence.",
        },
        verification: [
          "Vous avez une page produit avec les caractéristiques : Couleur → Bleu, Taille → L, Poids → 320g, Matière → Coton. Quelle balise HTML utiliserez-vous pour structurer ces données, et pourquoi ni <code>&lt;ul&gt;</code> ni <code>&lt;table&gt;</code> n'est le meilleur choix ?",
          "Un lecteur d'écran annonce 'liste de 3 éléments' quand il rencontre un <code>&lt;ul&gt;</code>. Il ne dit rien de spécial quand il rencontre trois <code>&lt;p&gt;</code> consécutifs. Pourquoi cette différence est-elle importante pour l'expérience de navigation, et quels types de contenus méritent d'être structurés en liste ?",
          "Quelle est la structure HTML correcte pour un bloc de code JavaScript multi-lignes, pourquoi utilise-t-on deux balises imbriquées, et quel problème d'encodage faut-il anticiper si le code contient des chevrons ?",
        ],
      },
    },

    miseEnFormeTexte: {
      id: "miseEnFormeTexte",
      label: "Mise en forme sémantique du texte",
      icon: "𝐁",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>HTML propose des balises de mise en forme inline qui semblent proches les unes des autres mais ont des sens radicalement différents : <code>&lt;strong&gt;</code> et <code>&lt;b&gt;</code> rendent tous deux le texte en gras, <code>&lt;em&gt;</code> et <code>&lt;i&gt;</code> le mettent en italique — mais leur sémantique diverge. Confondre ces balises, c'est produire un HTML qui communique la mauvaise intention au lecteur d'écran, au moteur de recherche, et à tout développeur qui lit le code source plus tard.</p>`,
        system: `<p>Les éléments de mise en forme sont des éléments inline <span class="ref-fiche">→ blockInline</span> — ils s'inscrivent dans le flux du texte, à l'intérieur des éléments block comme les paragraphes <span class="ref-fiche">→ organisationTexte</span>. Leur sémantique contribue directement à l'accessibilité <span class="ref-fiche">→ F30</span> : les lecteurs d'écran interprètent certaines balises de mise en forme (notamment <code>&lt;strong&gt;</code> et <code>&lt;em&gt;</code>) pour adapter leur lecture vocale.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les balises de mise en forme inline et leurs distinctions sémantiques :</p>
<p><strong><code>&lt;strong&gt;</code> vs <code>&lt;b&gt;</code> :</strong> deux balises qui rendent le texte en gras, mais avec des intentions différentes. <code>&lt;strong&gt;</code> : importance forte — le contenu est crucial pour la compréhension du message. Certains lecteurs d'écran accentuent la voix sur le texte en <code>&lt;strong&gt;</code>. Usage : avertissement, information critique, terme clé d'un argumentaire. <code>&lt;b&gt;</code> : texte "stylistiquement différent" sans importance particulière — attirer l'attention pour une raison de présentation, sans implication sémantique de criticité. Usage : premier mot d'un article dans certains styles, noms de produits dans une description. En pratique : si le texte doit être gras uniquement pour l'apparence, utiliser CSS (<code>font-weight: bold</code>) ; si le texte est important à comprendre, utiliser <code>&lt;strong&gt;</code>.</p>
<p><strong><code>&lt;em&gt;</code> vs <code>&lt;i&gt;</code> :</strong> deux balises qui rendent le texte en italique. <code>&lt;em&gt;</code> : emphase sémantique — le stress sur ce mot change le sens de la phrase. "Je n'ai <em>pas</em> dit qu'il avait menti" vs "Je n'ai pas dit qu'<em>il</em> avait menti" — l'emphase change complètement le sens. Les lecteurs d'écran peuvent adapter le ton vocal. <code>&lt;i&gt;</code> : texte dans une voix ou mode alternatif — terme technique, expression étrangère, titre d'œuvre, terme d'une taxonomie. Usage : <code>Le terme &lt;i lang="la"&gt;habeas corpus&lt;/i&gt;</code>, <code>&lt;i&gt;Homo sapiens&lt;/i&gt;</code>. Pour l'italique purement décoratif : utiliser CSS (<code>font-style: italic</code>).</p>
<p><strong><code>&lt;mark&gt;</code> — surlignage sémantique :</strong> texte surligné pour indiquer sa pertinence dans un contexte donné — typiquement le terme recherché dans des résultats de recherche. Rendu en jaune par défaut. Distinct de <code>&lt;strong&gt;</code> (importance) : <code>&lt;mark&gt;</code> indique la pertinence contextuelle, pas l'importance intrinsèque du contenu.</p>
<p><strong><code>&lt;small&gt;</code> — contenu accessoire :</strong> texte de moindre importance — mentions légales, copyright, conditions d'utilisation, annotations. Rendu en taille réduite. Sémantique : contenu qui est accessoire par rapport au contenu principal, pas simplement un texte petit. Pour du texte petit visuellement sans cette implication sémantique : utiliser <code>font-size</code> en CSS.</p>
<p><strong><code>&lt;del&gt;</code> et <code>&lt;ins&gt;</code> — modifications de document :</strong> pour indiquer des révisions dans un document. <code>&lt;del&gt;</code> : texte supprimé (rendu barré par défaut). <code>&lt;ins&gt;</code> : texte ajouté (rendu souligné par défaut). Attributs optionnels : <code>cite="url"</code> (raison du changement) et <code>datetime="2024-03-15T10:30:00"</code> (moment du changement). Usage typique : affichage des modifications de prix (<code>&lt;del&gt;29,99 €&lt;/del&gt; 19,99 €</code>), suivi des révisions d'un document.</p>
<p><strong><code>&lt;sub&gt;</code> et <code>&lt;sup&gt;</code> — indices et exposants :</strong> <code>&lt;sub&gt;</code> indice (texte en dessous de la ligne de base) : formules chimiques (H<sub>2</sub>O), indices mathématiques. <code>&lt;sup&gt;</code> exposant (texte au-dessus) : exposants mathématiques (m²), renvois de notes (¹), ordres ordinaux (1<sup>er</sup>). Ne pas utiliser pour un effet visuel — ces balises ont une sémantique précise que les moteurs de recherche et lecteurs d'écran exploitent.</p>
<p><strong><code>&lt;abbr&gt;</code> — abréviations et acronymes :</strong> entoure une abréviation avec l'attribut <code>title</code> pour donner sa forme développée. <code>&lt;abbr title="HyperText Markup Language"&gt;HTML&lt;/abbr&gt;</code>. Le navigateur affiche souvent une info-bulle au survol. Les lecteurs d'écran peuvent lire la forme développée. Usage : première occurrence d'une abréviation sur une page — les occurrences suivantes n'ont pas besoin d'être entourées à nouveau.</p>
<p><strong><code>&lt;time&gt;</code> — dates et heures lisibles par machine :</strong> <code>&lt;time datetime="2024-03-15"&gt;15 mars 2024&lt;/time&gt;</code>. L'attribut <code>datetime</code> contient la valeur normalisée (format ISO 8601) que les machines comprennent, le contenu visible est le format lisible par les humains. Les moteurs de recherche exploitent cette balise pour les événements et les articles datés.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise <code>&lt;strong&gt;</code> rarement et intentionnellement — si tout est important, rien ne l'est. Il sait que <code>&lt;del&gt;</code>/<code>&lt;ins&gt;</code> avec <code>datetime</code> est la façon sémantiquement correcte d'afficher un ancien prix barré et un nouveau prix, et que beaucoup de sites e-commerce utilisent simplement du CSS (<code>text-decoration: line-through</code>) sur un <code>&lt;span&gt;</code> en perdant la sémantique. Il connaît aussi la limite pratique d'<code>&lt;abbr&gt;</code> : l'info-bulle au survol n'est pas accessible sur mobile — pour les acronymes critiques, écrire la forme développée dans le texte à la première occurrence plutôt que de compter sur le <code>title</code>.</p>`,
        errors: `<p><strong>Pattern 1 — <code>&lt;strong&gt;</code> pour le style, pas pour l'importance :</strong> mettre en <code>&lt;strong&gt;</code> tous les mots qu'on veut en gras dans un paragraphe — le nom du produit, le prix, chaque terme technique. Résultat : un paragraphe où 30% du texte est en <code>&lt;strong&gt;</code>, ce qui détruit l'utilité sémantique de la balise. Règle : <code>&lt;strong&gt;</code> ne devrait pas apparaître plus d'une ou deux fois par section. Pour du gras décoratif, utiliser CSS.</p>
<p><strong>Pattern 2 — <code>&lt;i&gt;</code> pour de l'italique stylistique :</strong> utiliser <code>&lt;i&gt;</code> pour mettre en italique un slogan, une accroche, une description poétique — sans qu'il s'agisse d'un terme technique, d'une expression étrangère ou d'un titre d'œuvre. <code>&lt;i&gt;</code> a une sémantique précise ("voix ou mode alternatif") — pour de l'italique purement décoratif ou stylistique, <code>font-style: italic</code> en CSS est la bonne approche.</p>
<p><strong>Pattern 3 — Oublier les entités dans <code>&lt;code&gt;</code> et <code>&lt;pre&gt;</code> :</strong> écrire du code HTML dans un bloc <code>&lt;pre&gt;&lt;code&gt;</code> sans encoder les caractères spéciaux. Un <code>&lt;div&gt;</code> dans le code à afficher devient réellement un <code>&lt;div&gt;</code> HTML que le navigateur parse — il disparaît visuellement et ne s'affiche pas. Toujours encoder <code>&lt;</code> en <code>&amp;lt;</code> et <code>&gt;</code> en <code>&amp;gt;</code> dans les blocs de code qui contiennent du HTML.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> certaines balises ont évolué dans leur définition entre HTML4 et HTML5 (<code>&lt;b&gt;</code> et <code>&lt;i&gt;</code> ont été redéfinis), les comportements des lecteurs d'écran vis-à-vis des balises de mise en forme. <strong>Ce qui ne change pas :</strong> la distinction sémantique entre importance (<code>&lt;strong&gt;</code>) et style (<code>&lt;b&gt;</code>), entre emphase (<code>&lt;em&gt;</code>) et voix alternative (<code>&lt;i&gt;</code>) — ces distinctions reflètent des besoins permanents du texte ; pour tout effet visuel sans sens sémantique, CSS est toujours la bonne réponse.</p>`,
        practice: {
          exercices: [
            {
              titre: "Choisir les bonnes balises de mise en forme sur un contenu réel",
              etapes: [
                "Prends un paragraphe de description de produit contenant : un avertissement de sécurité, le nom scientifique d'un ingrédient, un ancien prix et le nouveau prix, une date de péremption, une abréviation (ex : 'SPF').",
                "Associe chaque élément à sa balise : avertissement → <code>&lt;strong&gt;</code>, nom scientifique → <code>&lt;i lang='la'&gt;</code>, ancien prix → <code>&lt;del&gt;</code>, nouveau prix → texte normal, date → <code>&lt;time datetime&gt;</code>, abréviation → <code>&lt;abbr title&gt;</code>.",
                "Écris le paragraphe HTML complet avec toutes les balises. Vérifie dans le navigateur que le rendu visuel par défaut correspond aux attentes.",
                "Teste ensuite avec un outil de simulation de lecteur d'écran (extension Chrome 'Screen Reader' ou ChromeVox) : comment les balises <code>&lt;strong&gt;</code> et <code>&lt;abbr&gt;</code> sont-elles annoncées ?",
              ],
              output:
                "Paragraphe HTML complet avec les 5 balises de mise en forme utilisées correctement, rendu visuel vérifié, comportement du lecteur d'écran observé pour au moins deux balises.",
              critere:
                "Chaque balise doit être justifiée par sa sémantique, pas par son rendu visuel. L'ancien prix en <code>&lt;del&gt;</code> doit être justifié par 'c'est un texte supprimé/remplacé', pas par 'ça s'affiche barré'.",
            },
          ],
          piege:
            "Vouloir trop bien faire et entourer chaque terme important d'un <code>&lt;strong&gt;</code>, chaque terme technique d'un <code>&lt;i&gt;</code>, chaque date d'un <code>&lt;time&gt;</code>. Le sur-balisage est aussi problématique que le sous-balisage : il alourdit le HTML, dilue la sémantique, et rend le code difficile à lire. La règle : utiliser une balise de mise en forme seulement quand son sens ajoute une information que le texte brut ne transmet pas.",
        },
        verification: [
          "Quelle est la différence sémantique entre <code>&lt;strong&gt;</code> et <code>&lt;b&gt;</code>, et dans quels cas utiliser l'un plutôt que l'autre ? Donnez un exemple concret de chaque usage approprié.",
          "Un e-commerce affiche un ancien prix barré (29,99 €) et le nouveau prix (19,99 €). Quelle structure HTML sémantiquement correcte utiliserez-vous pour représenter cette information, et quels attributs optionnels pourriez-vous ajouter ?",
          "Pourquoi écrire <code>&lt;pre&gt;&lt;code&gt;&lt;div class='card'&gt;&lt;/div&gt;&lt;/code&gt;&lt;/pre&gt;</code> produit-il un résultat inattendu dans le navigateur, et comment corriger ce problème ?",
        ],
      },
    },

    placementTexte: {
      id: "placementTexte",
      label: "Placement du texte dans la page",
      icon: "⊞",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le placement du contenu textuel dans une page HTML — comment il s'aligne, comment il s'espace, comment il se positionne par rapport aux autres éléments — est la frontière entre HTML et CSS. HTML détermine ce que le contenu est et comment il s'organise sémantiquement ; CSS détermine où il se place visuellement. Comprendre ce que HTML apporte nativement au placement (le flux normal, les rôles structurels) et où CSS prend le relais, c'est éviter de chercher dans le mauvais langage la solution à un problème de mise en page.</p>`,
        system: `<p>Le placement en HTML s'appuie sur la distinction block/inline <span class="ref-fiche">→ blockInline</span> qui définit le flux normal du document. Les balises structurelles de F32 <span class="ref-fiche">→ F32</span> définissent les grandes zones (header, main, footer) mais ne spécifient pas leur position — c'est CSS qui le fait. Ce nœud prépare la compréhension du modèle de boîte CSS et des systèmes de layout (flexbox, grid) qui constituent la couche de présentation.</p>`,
        choice: {
          kind: "free",
          html: `<p>Ce que HTML apporte nativement au placement, et où CSS prend le relais :</p>
<p><strong>Le flux normal du document :</strong> sans CSS, les éléments HTML s'organisent selon le "flux normal" : les éléments block s'empilent verticalement de haut en bas dans l'ordre du code source, les éléments inline se disposent horizontalement dans le flux du texte. C'est l'ordre de rendu par défaut du navigateur. CSS peut sortir des éléments de ce flux normal (avec <code>position: absolute</code>, <code>position: fixed</code>, <code>float</code>) ou réorganiser complètement le placement (avec flexbox ou grid) — mais sans CSS, le flux normal s'applique toujours.</p>
<p><strong>Ce que HTML contrôle nativement :</strong> l'ordre d'apparition dans le flux (l'ordre du code source = l'ordre de lecture = l'ordre de tabulation clavier) ; la nature block ou inline de chaque élément qui détermine son comportement de base dans le flux ; la hiérarchie sémantique qui influence l'accessibilité mais pas la position visuelle. HTML ne contrôle pas : l'alignement horizontal ou vertical, les dimensions précises, les marges, l'espacement, la couleur de fond, la position absolue. Tout cela relève de CSS.</p>
<p><strong>L'attribut <code>align</code> et les balises de mise en page dépréciées :</strong> HTML 4 et les versions antérieures avaient des attributs de mise en page (<code>align="center"</code>, <code>align="right"</code>, <code>valign</code>) et des balises de présentation (<code>&lt;center&gt;</code>, <code>&lt;font&gt;</code>). Ces attributs et balises sont obsolètes en HTML5 — le navigateur les supporte encore par rétrocompatibilité mais ne jamais les écrire dans du code nouveau. Tout ce qu'ils font est réalisable avec CSS, avec plus de précision et sans mélanger structure et présentation.</p>
<p><strong>L'attribut <code>style</code> inline :</strong> HTML autorise l'attribut <code>style="..."</code> sur n'importe quel élément pour appliquer du CSS directement dans le HTML. C'est du CSS inline — fonctionnel mais problématique : priorité CSS maximale (difficile à surcharger), couplage structure/présentation, impossible à réutiliser, rend le HTML illisible sur les composants complexes. À n'utiliser qu'exceptionnellement pour du CSS généré dynamiquement par JavaScript. Pour le développement normal, toujours écrire le CSS dans une feuille de style séparée.</p>
<p><strong>L'attribut <code>hidden</code> :</strong> l'attribut booléen <code>hidden</code> sur un élément le retire du rendu visuel ET de l'accessibilité (équivalent à <code>display: none</code> en CSS). À distinguer de <code>visibility: hidden</code> (l'élément est invisible mais occupe encore son espace) et de <code>aria-hidden="true"</code> (l'élément est masqué des technologies d'assistance seulement, mais reste visible visuellement). <code>hidden</code> est un attribut HTML sémantique : "ce contenu n'est actuellement pas pertinent".</p>
<p><strong>Ordre du code source et accessibilité :</strong> l'ordre des éléments dans le HTML détermine l'ordre de tabulation clavier et l'ordre de lecture des lecteurs d'écran, indépendamment de la position visuelle créée par CSS. Un layout CSS qui affiche une sidebar avant le contenu principal visuellement mais dont le HTML place le contenu principal avant la sidebar dans le code source — l'utilisateur clavier naviguera dans l'ordre du code source, pas dans l'ordre visuel. La règle : l'ordre dans le HTML doit correspondre à l'ordre logique de lecture, même si CSS réorganise visuellement.</p>`,
        },
        senior: `<p>Un développeur expérimenté maintient une règle stricte : aucun attribut de style dans le HTML sauf pour du CSS généré dynamiquement par JavaScript. Il sait que l'ordre du code source n'est pas un détail — c'est l'ordre de tabulation clavier et de lecture pour les technologies d'assistance. Quand CSS crée un layout où l'ordre visuel diverge de l'ordre du code (typique avec CSS Grid ou <code>order</code> en flexbox), il vérifie que l'ordre de tabulation reste logique. Il utilise <code>tabindex</code> uniquement en dernier recours et jamais avec des valeurs positives qui cassent l'ordre naturel.</p>`,
        errors: `<p><strong>Pattern 1 — Mise en page avec des tables HTML :</strong> utiliser <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code> et <code>&lt;td&gt;</code> pour créer des layouts multi-colonnes — une pratique des années 1990 toujours parfois rencontrée. Les tables HTML sont pour les données tabulaires, pas pour le layout. Un layout en table est rigide, inaccessible (les lecteurs d'écran lisent les tables cellule par cellule), difficile à rendre responsive, et compliqué à maintenir. Le layout se fait avec CSS flexbox ou grid.</p>
<p><strong>Pattern 2 — Attribut style inline proliférant :</strong> avoir des attributs <code>style="..."</code> sur des dizaines d'éléments pour contrôler leur apparence. Ce pattern apparaît quand on copie-colle du code depuis des générateurs en ligne ou des exemples non maintenables. Chaque propriété inline devient une dette : impossible à modifier globalement, impossble à thématiser, impossible à surcharger proprement depuis une feuille de style.</p>
<p><strong>Pattern 3 — Ordre HTML optimisé pour le CSS, pas pour la lecture :</strong> réorganiser l'ordre des éléments dans le HTML pour que le layout CSS soit plus simple à écrire, sans considérer l'ordre de tabulation clavier. Exemple : mettre la sidebar avant le <code>&lt;main&gt;</code> dans le HTML parce que c'est plus simple avec un certain layout flexbox — alors que le contenu principal devrait être lu et navigué en premier. L'ordre HTML doit refléter la priorité sémantique du contenu.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les systèmes de layout CSS (table layouts → float → flexbox → grid — chaque décennie a vu émerger une nouvelle approche), les attributs HTML disponibles pour le placement. <strong>Ce qui ne change pas :</strong> HTML décrit la structure et l'ordre sémantique du contenu ; CSS décrit le placement visuel — cette séparation des responsabilités est un invariant de la plateforme web depuis HTML 4 ; l'ordre du code source détermine l'ordre de navigation clavier et de lecture des technologies d'assistance, indépendamment du layout CSS.</p>`,
        practice: {
          exercices: [
            {
              titre: "Distinguer ce qui relève de HTML et ce qui relève de CSS",
              etapes: [
                "Ouvre une page web simple dans Chrome. Désactive tout le CSS : F12 → onglet Elements → sélectionne la balise <code>&lt;html&gt;</code> → dans l'onglet Styles à droite, décoche 'user agent stylesheet'. Ou plus simple : installe l'extension 'Web Developer' et utilise 'CSS → Disable All Styles'.",
                "Observe la page sans CSS. Identifie ce qui reste structuré (titres, paragraphes, listes en flux vertical) et ce qui est perdu (colonnes, couleurs, espacements précis, images positionnées).",
                "Note les éléments qui gardent un sens sans CSS (navigation lisible en liste, articles séparés par des espaces de paragraphe) et ceux qui deviennent inutilisables (layout multi-colonnes, grilles de cards).",
                "Navigue sur cette page sans CSS avec uniquement le clavier (Tab pour avancer, Shift+Tab pour reculer). L'ordre de tabulation correspond-il à l'ordre logique de lecture ? Est-il différent de l'ordre visuel avec CSS ?",
              ],
              output:
                "Analyse en deux colonnes : ce que HTML apporte seul (structure sémantique, ordre de lecture, hiérarchie des titres, liste navigable) vs ce que CSS apporte (positionnement, couleurs, mise en page, espacements précis) — avec une conclusion sur la séparation des responsabilités.",
              critere:
                "L'exercice réussit si tu peux nommer trois choses que le HTML maintient correctement sans CSS (structure lisible, ordre de tabulation correct, hiérarchie des titres visible) et trois choses qui nécessitent absolument CSS pour être utilisables.",
            },
          ],
          piege:
            "Penser que 'sans CSS ça ne sert à rien' après avoir vu la page sans styles. Le HTML sans CSS est utilisable : les liens fonctionnent, la navigation clavier fonctionne, les lecteurs d'écran fonctionnent, les moteurs de recherche indexent. CSS améliore le rendu visuel — il ne crée pas la structure. Une page accessible avec un HTML de qualité sera utilisable même si CSS échoue à charger (connexion lente, erreur réseau, CSS désactivé par l'utilisateur).",
        },
        verification: [
          "Expliquez pourquoi l'ordre des éléments dans le code HTML est important pour l'accessibilité clavier, même si CSS peut afficher ces éléments dans un ordre visuel complètement différent.",
          "Vous devez créer un layout avec une sidebar à gauche et un contenu principal à droite. Dans votre HTML, quel élément placez-vous en premier dans le code source — la sidebar ou le contenu principal — et pourquoi ?",
          "Quelle est la différence entre <code>hidden</code> (attribut HTML), <code>display: none</code> (CSS), et <code>aria-hidden='true'</code> (ARIA) pour masquer un élément, et quand utiliser chacun ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "blockInline", x: 10, y: 100, w: 155, h: 65 },
        { id: "organisationTexte", x: 240, y: 40, w: 195, h: 65 },
        { id: "miseEnFormeTexte", x: 240, y: 165, w: 200, h: 65 },
        { id: "placementTexte", x: 560, y: 100, w: 165, h: 65 },
      ],
      edges: [
        { x1: 165, y1: 120, x2: 238, y2: 72, label: "structure" },
        { x1: 165, y1: 148, x2: 238, y2: 197, label: "porte" },
        { x1: 435, y1: 72, x2: 558, y2: 120, label: "ordonne" },
        { x1: 440, y1: 197, x2: 558, y2: 150, label: "positionne" },
      ],
    },
  },
});
