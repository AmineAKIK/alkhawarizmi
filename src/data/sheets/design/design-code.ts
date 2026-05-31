import { designNode, designSheet } from "./design-common";

export const designCode = designSheet({
  id: "design-D04",
  number: 24,
  title: "Du Design au Code",
  subtitle: "Transformer les décisions de design en systèmes maintenables et implémentables",
  badge: "Fiche D04",
  meta: ["6 nœuds"],
  readingTime: "25 min",
  description: "Design system, préparation d'un fichier Figma, import, export, Community, design tokens, handoff et itération design-dev comme continuité entre intention et produit réel.",
  accent: "systeme",
  nodes: {
    designSystem: designNode({
      id: "designSystem",
      label: "Le design system",
      icon: "⬡",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Au début, chaque écran peut être ajusté à la main. Puis l'équipe grossit, les boutons divergent, les espacements changent, les messages d'erreur n'ont plus le même ton, et personne ne sait quelle version est la bonne. Un design system existe pour empêcher la cohérence de dépendre de la mémoire individuelle.",
      system: "Le design system synthétise les principes visuels <span class=\"ref-fiche\">→ D02</span>, les composants et états <span class=\"ref-fiche\">→ D03</span>, puis les relie au code via tokens <span class=\"ref-fiche\">→ D04</span> et handoff <span class=\"ref-fiche\">→ D04</span>. Il sert aussi la maintenance technique <span class=\"ref-fiche\">→ P04</span> : les décisions répétées deviennent un système plutôt qu'une série d'exceptions.",
      choice: "Une bibliothèque de composants documente des éléments réutilisables ; un design system ajoute règles d'usage, principes, tokens, accessibilité, gouvernance et contribution ; des brand guidelines cadrent surtout l'identité visuelle. Le bon niveau dépend de la taille de l'équipe, du nombre de produits et du coût de l'incohérence.",
      senior: "Un designer expérimenté commence par les composants les plus fréquents et les plus risqués, pas par un système complet abstrait. Il redoute le design system musée : beau, documenté, mais non utilisé en production. Son modèle mental : un système n'existe vraiment que si modifier une décision partagée change les écrans réels et le code réel.",
      errors: "<p><strong>Pattern 1 — Le musée de composants :</strong> l'équipe construit une bibliothèque parfaite hors du produit, puis personne ne l'utilise. La cause est l'envie de système avant d'avoir observé les usages répétés.</p><p><strong>Pattern 2 — La règle sans gouvernance :</strong> le système décrit des règles mais personne ne décide des exceptions, contributions et dépréciations. Ce pattern vient de la confusion entre documentation et fonctionnement organisationnel.</p><p><strong>Pattern 3 — Le composant sans contexte :</strong> le système montre l'apparence du composant mais pas quand l'utiliser, quand l'éviter, ni quels contenus sont acceptés. La cause est une focalisation sur l'objet visuel plutôt que sur la décision d'usage.</p>",
      invariants: "<p>Les outils de système changent, mais la cohérence à grande échelle nécessite toujours une source de vérité maintenue. <strong>Ce qui change :</strong> les plateformes, formats de documentation et bibliothèques UI. <strong>Ce qui ne change pas :</strong> sans règles partagées, maintenues et utilisées dans le produit réel, la cohérence se dégrade avec chaque écran ajouté.</p>",
      practice: {
        titre: "Définir un design system minimal",
        etapes: ["Choisis un produit avec au moins trois écrans.", "Repère les cinq décisions répétées les plus visibles : bouton, champ, couleur, espacement, message ou carte.", "Pour chacune, écris la règle actuelle, l'usage prévu et l'exception acceptable.", "Identifie laquelle doit devenir composant, token ou règle documentaire."],
        output: "Inventaire minimal de design system avec cinq décisions répétées, usage, exceptions et type de formalisation.",
        critere: "Le système minimal est utile si au moins une future maquette pourrait réutiliser une règle sans rediscuter la décision.",
        piege: "Créer un système exhaustif avant d'avoir un produit vivant. La bonne première version couvre les répétitions réelles, pas toutes les possibilités imaginables."
      },
      verification: ["Quelle différence fais-tu entre une bibliothèque de composants et un design system complet ?", "Ton équipe a trois styles de boutons primaires en production. Quelle première action de design system prioriserais-tu ?", "Pourquoi un design system non utilisé dans le code n'est-il pas une vraie source de vérité ?"]
    }),
    figma: designNode({
      id: "figma",
      label: "Figma",
      icon: "✦",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Un fichier de design peut vite devenir un grenier : écrans posés librement sur le canvas, calques nommés Rectangle 42, anciennes pistes mêlées aux maquettes finales et alignements corrigés à l'œil. Figma existe pour concevoir et collaborer sur des interfaces web ou mobile, mais l'outil n'apporte pas de structure par magie. Comprendre son interface et préparer le fichier évite que les décisions de design se perdent dans un document difficile à relire.",
      system: "Figma rend visibles avant le code les décisions de zoning, wireframe, mockup et prototype <span class=\"ref-fiche\">→ D01</span>, les principes de grille et d'espacement <span class=\"ref-fiche\">→ D02</span>, puis les composants <span class=\"ref-fiche\">→ D03</span>. Son interface de travail s'organise autour du canvas, de la toolbar, du panneau de navigation à gauche et du panneau de propriétés à droite. Le panneau de gauche permet notamment de retrouver pages, assets et calques ; le panneau de droite adapte ses réglages à la sélection et expose les onglets Design et Prototype en édition. Figma doit ensuite rester aligné avec le design system, les tokens et le handoff de cette fiche <span class=\"ref-fiche\">→ D04</span>.",
      choice: "Figma est adapté à la collaboration, aux composants, variables, prototypes et échanges avec le développement ; Penpot offre une alternative open source intéressante ; Sketch reste présent dans certains environnements macOS ; un prototype HTML peut être préférable pour des interactions complexes. Dans Figma, commence par des frames : ce sont des conteneurs capables de représenter un écran web, une vue mobile ou un composant imbriqué. Ils rendent possibles les contraintes, l'auto layout, le prototypage et les layout guides, anciennement nommés layout grids. Ajoute aux frames des guides uniformes, colonnes ou lignes lorsque le layout doit rester cohérent entre tailles d'écran. Utilise aussi les repères ponctuels tirés depuis les règles pour aligner précisément quelques objets sans confondre cette aide locale avec un système de grille partagé.",
      senior: "Un designer expérimenté lit le panneau de calques comme une première documentation de l'interface : frames nommées selon l'écran ou l'état, hiérarchie lisible, sections séparant exploration, ready-for-dev, composants et archive. Il choisit une frame avant de dessiner un écran, applique une grille ou des guides seulement lorsqu'ils réduisent des décisions répétées, puis vérifie que le contenu mobile et responsive reste cohérent quand la frame change de largeur. Il redoute autant la frame fourre-tout que le fichier où deux personnes raisonnables ne savent pas quoi implémenter.",
      errors: "<p><strong>Pattern 1 — Le canvas déversoir :</strong> les écrans, composants et variantes sont posés sans pages, sections ni frames nommées parce qu'il faut avancer vite. Le panneau de calques devient illisible et personne ne sait quelle version fait foi.</p><p><strong>Pattern 2 — La frame décorative :</strong> l'équipe dessine dans une frame mais ignore hiérarchie, contraintes et comportement au redimensionnement. Le mockup paraît correct à une taille unique puis casse sur mobile ou contenu réel.</p><p><strong>Pattern 3 — La grille automatique :</strong> une grille de colonnes ou des repères sont appliqués par habitude sans relation avec le contenu. L'équipe aligne précisément une structure mal pensée et confond cohérence visuelle avec pertinence du layout.</p>",
      invariants: "<p>Les outils changent, mais un fichier de design fiable rend sa structure compréhensible et ses décisions répétées visibles. <strong>Ce qui change :</strong> l'interface de Figma, le nom des fonctionnalités comme layout guides, les raccourcis et les alternatives telles que Penpot ou Sketch. <strong>Ce qui ne change pas :</strong> pages, frames, calques, guides et propriétés doivent servir la lisibilité du fichier, la cohérence du layout et la transmission vers le produit développé.</p>",
      practice: {
        titre: "Préparer un fichier Figma web et mobile",
        etapes: ["Crée quatre pages : Exploration, Ready for dev, Components et Archive, puis observe leur hiérarchie dans le panneau de navigation.", "Dans Exploration, crée avec l'outil Frame un écran desktop et un écran mobile ; nomme clairement les frames et leurs principaux calques.", "Sélectionne chaque frame et ajoute des layout guides adaptés : colonnes pour structurer la largeur, puis lignes ou grille uniforme seulement si le besoin le justifie.", "Active les règles, tire au moins un repère ponctuel pour un alignement utile et relève dans le panneau de propriétés les dimensions, contraintes ou réglages qui devront être transmis au développement."],
        output: "Un fichier Figma organisé avec quatre pages, deux frames nommées, des calques lisibles, des layout guides justifiés et un repère ponctuel.",
        critere: "Une personne nouvelle doit retrouver les écrans, comprendre la hiérarchie des calques et expliquer pourquoi chaque guide ou repère existe en moins de deux minutes.",
        piege: "Ajouter frames, guides et repères mécaniquement pour donner une apparence professionnelle au fichier sans vérifier qu'ils clarifient réellement le layout."
      },
      verification: ["Quel rôle distinct jouent le panneau de navigation, le panneau de propriétés et une frame dans Figma ?", "Un écran desktop est précis mais casse dès que sa frame rétrécit. Quelles propriétés et décisions de layout vérifies-tu avant le handoff ?", "Quelle différence fais-tu entre un layout guide partagé sur une frame et un repère ponctuel tiré depuis une règle ?"]
    }),
    ressourcesFigma: designNode({
      id: "ressourcesFigma",
      label: "Import, export et Community",
      icon: "⇄",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Une équipe gagne du temps en réutilisant une icône, un kit d'interface ou un plugin, puis en exportant les ressources attendues par le développement. Mais ce raccourci devient vite une dette invisible : fichier importé sans structure, asset rasterisé alors qu'il devait rester vectoriel, template Community copié sans vérifier son usage réel, ou plugin ajouté sans besoin explicite. Importer, exporter et explorer Community servent à accélérer la conception sans perdre la maîtrise du produit.",
      system: "L'import fait entrer dans Figma des fichiers de travail ou des médias externes ; l'export fait sortir une sélection utile au partage, au handoff ou au code <span class=\"ref-fiche\">→ D04</span>. Dans Figma Design, une exportation peut porter sur des calques, frames, composants, groupes, sections, une portion du canvas ou le fichier entier. Community complète ce flux en permettant de rechercher notamment des UI kits, wireframes, modèles et extensions comme les plugins. Ces ressources peuvent accélérer les composants <span class=\"ref-fiche\">→ D03</span>, mais elles doivent être évaluées et documentées comme toute ressource collaborative <span class=\"ref-fiche\">→ Co14</span>.",
      choice: "Importe un fichier .fig ou .sketch depuis le navigateur de fichiers lorsque tu dois récupérer un document de travail ; ajoute directement au fichier de design les images, vidéos ou SVG nécessaires à la maquette, en gardant à l'esprit qu'un SVG importé devient un calque vectoriel éditable. À l'export, choisis selon l'usage : JPG pour une image web légère sans transparence, PNG pour préserver transparence et lisibilité, SVG pour une icône ou illustration vectorielle responsive, PDF pour partager une mise en page fixe. Dans Community, filtre la recherche selon le besoin : fichiers et modèles pour une base de travail, plugins pour une capacité précise. Duplique ou installe seulement après avoir lu la description et vérifié que la ressource apporte plus qu'elle ne complique.",
      senior: "Un designer expérimenté traite chaque import comme une matière à nettoyer, pas comme une vérité prête à livrer : il vérifie la hiérarchie des calques, les composants, les variantes, les noms et le poids des médias. Avant l'export, il demande au développement le format, la taille, l'échelle et le canal de livraison attendus au lieu de déposer plusieurs versions mystérieuses. Pour Community, il sépare inspiration, accélérateur temporaire et dépendance durable. Il vérifie l'origine, les conditions d'usage et le coût de maintenance d'une ressource ; il reste particulièrement prudent avec un plugin quand le fichier contient des informations sensibles.",
      errors: "<p><strong>Pattern 1 — L'import poubelle :</strong> une ressource externe est déposée dans le fichier puis utilisée telle quelle, avec des calques opaques et des composants incohérents. La cause est la confusion entre gagner du temps au départ et disposer d'un asset maintenable.</p><p><strong>Pattern 2 — L'export au hasard :</strong> l'équipe génère PNG, JPG et SVG sans définir le besoin, l'échelle ni la destination. Ce pattern vient d'un handoff implicite : le développement reçoit des fichiers mais pas une décision exploitable.</p><p><strong>Pattern 3 — Le buffet Community :</strong> kits et plugins s'accumulent parce qu'ils semblent utiles ou populaires, sans vérifier leur apport réel ni leur maintenance. La cause est l'attrait du raccourci visible alors que son coût futur reste diffus.</p>",
      invariants: "<p>Les formats et catalogues évoluent, mais une ressource externe doit toujours être choisie, inspectée et transmise consciemment. <strong>Ce qui change :</strong> les types de fichiers pris en charge, les formats d'exportation, les filtres Community et les extensions disponibles. <strong>Ce qui ne change pas :</strong> l'équipe doit connaître l'origine d'une ressource, vérifier sa qualité, choisir un format adapté à l'usage et éviter qu'un outil opportuniste devienne une dépendance incomprise.</p>",
      practice: {
        titre: "Constituer un mini-flux de ressources Figma",
        etapes: ["Importe dans un fichier Figma une image et un SVG utiles à un écran, puis inspecte leur comportement et la structure créée dans le panneau de calques.", "Sélectionne une icône ou une illustration, prépare deux exports justifiés parmi PNG, JPG, SVG et PDF, puis note pour chaque format sa destination et son compromis.", "Dans Community, recherche un UI kit, un modèle ou un wireframe adapté au même écran ; lis sa description, duplique-le dans un espace d'exploration et relève ce que tu conserverais ou retirerais.", "Recherche ensuite un plugin répondant à un besoin précis et rédige une décision courte : utilité, origine, coût de maintenance et précautions avant installation."],
        output: "Un tableau de ressources avec origine, type d'import, structure inspectée, exports retenus, destination et décision argumentée pour une ressource Community et un plugin.",
        critere: "Chaque import, export ou ressource Community doit avoir un usage explicite, un compromis connu et une place claire dans le fichier ou le handoff.",
        piege: "Mesurer la qualité du travail au nombre de ressources importées et de plugins installés. Une ressource utile réduit une difficulté précise sans rendre le fichier plus opaque."
      },
      verification: ["Pourquoi un SVG importé et un PNG importé ne se manipulent-ils pas de la même manière dans Figma ?", "Quel format choisis-tu pour une icône responsive, une photographie web légère et une maquette fixe à partager, et pourquoi ?", "Avant de dupliquer un fichier Community ou d'installer un plugin, quelles informations vérifies-tu pour éviter une dépendance mal maîtrisée ?"]
    }),
    designTokens: designNode({
      id: "designTokens",
      label: "Design tokens",
      icon: "{}",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Copie une couleur en hex dans vingt fichiers et le prochain changement devient une chasse manuelle. Choisis les espacements à l'œil et chaque écran dérive légèrement. Les tokens transforment une valeur visuelle répétée en décision nommée, portable et synchronisable.",
      system: "Les tokens traduisent les décisions de couleur, typo et espacement de <span class=\"ref-fiche\">→ D02</span> en valeurs utilisables par le code. Ils alimentent le design system <span class=\"ref-fiche\">→ D04</span>, réduisent les ambiguïtés de handoff <span class=\"ref-fiche\">→ D04</span>, et permettent aux composants <span class=\"ref-fiche\">→ D03</span> de rester cohérents entre modes et plateformes.",
      choice: "Les tokens primitifs nomment une valeur brute comme blue-500 ; les tokens sémantiques nomment une intention comme color-action-primary ; les tokens de composant nomment un usage local comme button-primary-background. Les primitifs facilitent l'échelle, les sémantiques protègent le sens, les tokens de composant gèrent les exceptions. Un système mature combine les trois sans exposer les valeurs brutes partout.",
      senior: "Un designer expérimenté refuse les noms comme color1 ou spacing-big parce qu'ils ne survivront pas aux changements. Il anticipe mode sombre, thèmes, états, accessibilité et plateformes. Il sait qu'un bon token décrit pourquoi une valeur existe, pas seulement quelle valeur elle porte aujourd'hui.",
      errors: "<p><strong>Pattern 1 — Le token peinture :</strong> les tokens sont nommés par apparence immédiate, comme purpleButton, puis deviennent absurdes quand la couleur change. La cause est une nomination basée sur le présent plutôt que sur l'intention.</p><p><strong>Pattern 2 — Le hex clandestin :</strong> des valeurs directes continuent d'apparaître dans le code malgré le système de tokens. Ce pattern vient d'un système incomplet ou trop lourd, que les équipes contournent pour avancer.</p><p><strong>Pattern 3 — Le token sans usage :</strong> on crée des dizaines de tokens jamais utilisés. La cause est l'abstraction prématurée : vouloir couvrir tous les futurs possibles avant les besoins réels.</p>",
      invariants: "<p>Les formats de tokens évoluent, mais nommer une décision partagée reste le moyen de la maintenir. <strong>Ce qui change :</strong> les outils de synchronisation, formats JSON, variables Figma et pipelines CSS. <strong>Ce qui ne change pas :</strong> une valeur répétée sans nom finit toujours par diverger, et une valeur nommée sans intention finit par devenir incompréhensible.</p>",
      practice: {
        titre: "Créer une mini-échelle de tokens",
        etapes: ["Choisis trois décisions visuelles répétées : couleur d'action, couleur d'erreur, espacement de section.", "Définis pour chacune un token primitif, un token sémantique et un exemple d'usage composant.", "Vérifie que les noms restent vrais si la valeur change.", "Repère une valeur qui ne mérite pas encore de token parce qu'elle n'est pas répétée."],
        output: "Table de tokens avec primitif, sémantique, usage composant et justification.",
        critere: "Un token est bien nommé si tu peux changer sa valeur sans devoir renommer son intention.",
        piege: "Transformer chaque pixel en token. Un token doit représenter une décision partagée, pas une obsession de granularité."
      },
      verification: ["Quelle différence fais-tu entre token primitif, token sémantique et token de composant ?", "Ton produit passe en mode sombre et un token gray-900 est utilisé pour du texte, des bordures et des fonds. Quel problème cela révèle ?", "Pourquoi le nom d'un token doit-il survivre à un changement de valeur ?"]
    }),
    handoff: designNode({
      id: "handoff",
      label: "Handoff design-dev",
      icon: "↔",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Un développeur reçoit une maquette belle et finale, puis découvre les questions qui n'ont pas été designées : que se passe-t-il en loading, quel texte si le titre déborde, quel comportement au clavier, quel état d'erreur, quelle valeur de token ? Le handoff existe pour transformer une intention visuelle en spécification implémentable.",
      system: "Le handoff relie composants <span class=\"ref-fiche\">→ D03</span>, états d'interface <span class=\"ref-fiche\">→ D03</span>, tokens <span class=\"ref-fiche\">→ D04</span> et contraintes techniques de la partie développement <span class=\"ref-fiche\">→ T03</span>. Il protège l'UX de <span class=\"ref-fiche\">→ D01</span> en évitant que les détails non spécifiés soient résolus au hasard dans le code.",
      choice: "Le handoff final convient aux petits changements très cadrés ; le handoff continu implique les développeurs pendant la conception et réduit les surprises ; Storybook ou une documentation vivante permet de comparer composants design et code ; Dev Mode donne mesures et styles mais ne transmet pas seul l'intention, les règles métier et les edge cases.",
      senior: "Un designer expérimenté ne considère jamais le handoff comme une passation froide. Il anticipe les questions du développement : contenu long, responsive, states, accessibilité, tokens, animation, erreur réseau, permissions. Il préfère une conversation tôt avec un développeur à dix commentaires tardifs sur une maquette déjà vendue.",
      errors: "<p><strong>Pattern 1 — Le handoff lancer de colis :</strong> le designer livre un fichier final et disparaît. La cause est une séparation artificielle entre conception et implémentation, qui transforme les questions normales en interruptions.</p><p><strong>Pattern 2 — Le pixel sans intention :</strong> les dimensions sont fournies mais pas la raison de la décision. Ce pattern vient d'une croyance que le code reproduit des pixels, alors qu'il doit reproduire un comportement sous contraintes.</p><p><strong>Pattern 3 — L'edge case hors champ :</strong> les cas limites ne sont pas spécifiés parce qu'ils rendent la maquette moins propre. La cause est la confusion entre présentation de concept et préparation à la production.</p>",
      invariants: "<p>Les outils de handoff deviennent plus automatiques, mais l'intention ne se déduit jamais entièrement des pixels. <strong>Ce qui change :</strong> Dev Mode, inspecteurs, annotations et outils de documentation. <strong>Ce qui ne change pas :</strong> une implémentation fiable exige toujours de transmettre comportements, contraintes, états et priorités, pas seulement des styles.</p>",
      practice: {
        titre: "Préparer un handoff complet",
        etapes: ["Choisis un écran prêt à développer.", "Liste les composants utilisés et les tokens attendus pour couleurs, typo et espacements.", "Ajoute les états : loading, empty, error, succès, focus clavier et mobile.", "Écris trois questions à poser au développeur avant implémentation."],
        output: "Checklist de handoff avec composants, tokens, états et questions design-dev.",
        critere: "Le handoff est prêt si les questions restantes portent sur des choix techniques, pas sur des intentions UX non spécifiées.",
        piege: "Confondre inspection automatique et compréhension. Un outil peut lire une taille, pas expliquer pourquoi l'élément doit se comporter ainsi."
      },
      verification: ["Pourquoi Dev Mode ne remplace-t-il pas une vraie spécification de handoff ?", "Un titre peut faire 12 ou 120 caractères dans la vraie donnée. Où cette information doit-elle apparaître dans le handoff ?", "Pourquoi le handoff continu réduit-il plus de risque qu'un handoff final ?"]
    }),
    iterationDesignDev: designNode({
      id: "iterationDesignDev",
      label: "Itération design-dev",
      icon: "🔄",
      kind: "systeme",
      niveau: "Intermédiaire",
      why: "Quand le design attend que tout soit parfait avant de parler au développement, les contraintes arrivent trop tard : animation coûteuse, composant impossible à réutiliser, performance dégradée, responsive fragile. Quand le développement implémente sans retour design, l'intention UX se dilue. L'itération design-dev existe pour faire rencontrer intention et faisabilité avant que les décisions ne soient verrouillées.",
      system: "L'itération design-dev ferme la boucle entre expérience visée <span class=\"ref-fiche\">→ D01</span>, composants conçus <span class=\"ref-fiche\">→ D03</span>, design system <span class=\"ref-fiche\">→ D04</span> et code produit <span class=\"ref-fiche\">→ T04</span>. Elle alimente aussi la mesure et l'apprentissage <span class=\"ref-fiche\">→ C06</span> : le design n'est validé que quand le produit réel produit le comportement attendu.",
      choice: "Le design ahead prépare un ou deux sprints d'avance pour réduire les blocages ; le design en parallèle convient aux petites équipes très synchronisées ; le pairing design-dev résout vite les interactions ambiguës ; la design QA vérifie l'implémentation réelle contre l'intention, sans tomber dans le pixel-perfect aveugle.",
      senior: "Un designer expérimenté sait que \"pixel-perfect\" est souvent une mauvaise question. Il vérifie plutôt si la hiérarchie, les états, l'accessibilité, les comportements et les intentions sont préservés dans le code. Il anticipe les compromis : parfois il faut ajuster le design pour une meilleure maintenabilité, parfois il faut défendre un détail parce qu'il porte la compréhension utilisateur.",
      errors: "<p><strong>Pattern 1 — La maquette intouchable :</strong> toute contrainte technique est vécue comme une dégradation du design. La cause est l'attachement au livrable plutôt qu'à l'intention utilisateur.</p><p><strong>Pattern 2 — Le dev comme exécutant :</strong> le développeur est consulté seulement après validation, donc ses connaissances de performance, responsive et accessibilité arrivent trop tard. Ce pattern vient d'une séparation hiérarchique des métiers.</p><p><strong>Pattern 3 — La QA cosmétique :</strong> la revue se limite à comparer les pixels, sans vérifier les états, le clavier, les données réelles ou les erreurs. La cause est que le visible immédiat attire plus l'attention que le comportement systémique.</p>",
      invariants: "<p>Les méthodes de production changent, mais une interface réelle est toujours le résultat d'un compromis entre intention, contrainte et usage observé. <strong>Ce qui change :</strong> les cycles de sprint, outils de QA, frameworks frontend et modes de collaboration. <strong>Ce qui ne change pas :</strong> design et code doivent itérer ensemble pour préserver l'expérience quand elle rencontre les contraintes du produit réel.</p>",
      practice: {
        titre: "Structurer une revue design-dev",
        etapes: ["Choisis une fonctionnalité en cours ou imagine une fonctionnalité prête à intégrer.", "Prépare une liste de vérification : hiérarchie, états, responsive, accessibilité, tokens, données longues, performance perçue.", "Décide quels points doivent être testés dans le navigateur plutôt que dans la maquette.", "Formule trois compromis acceptables et trois éléments à défendre absolument."],
        output: "Plan de revue design-dev avec checklist, tests navigateur, compromis et points non négociables.",
        critere: "La revue est utile si elle distingue clairement un écart cosmétique, un écart d'intention UX et une contrainte technique légitime.",
        piege: "Utiliser la revue design-dev comme tribunal de conformité. Le but est d'améliorer le produit réel, pas de prouver que la maquette avait toujours raison."
      },
      verification: ["Pourquoi le pixel-perfect strict peut-il être une mauvaise métrique de qualité ?", "Un développeur explique qu'une animation prévue coûte trop cher en performance sur mobile. Comment raisonnes-tu le compromis ?", "Pourquoi l'expérience réelle ne peut-elle pas être validée uniquement dans Figma ?"]
    })
  },
  maps: {
    universel: {
      viewBox: "0 0 1020 310",
      nodes: [
        { id: "designSystem", x: 10, y: 120, w: 140, h: 65 },
        { id: "figma", x: 190, y: 120, w: 100, h: 65 },
        { id: "ressourcesFigma", x: 335, y: 120, w: 190, h: 65 },
        { id: "designTokens", x: 580, y: 45, w: 130, h: 65 },
        { id: "handoff", x: 580, y: 195, w: 120, h: 65 },
        { id: "iterationDesignDev", x: 780, y: 120, w: 175, h: 65 }
      ],
      edges: [
        { x1: 150, y1: 152, x2: 188, y2: 152, label: "structure" },
        { x1: 290, y1: 152, x2: 333, y2: 152, label: "enrichit" },
        { x1: 525, y1: 135, x2: 578, y2: 78, label: "alimente" },
        { x1: 525, y1: 170, x2: 578, y2: 225, label: "prépare" },
        { x1: 710, y1: 78, x2: 778, y2: 138, label: "alimente" },
        { x1: 700, y1: 225, x2: 778, y2: 168, label: "alimente" }
      ]
    }
  }
});
