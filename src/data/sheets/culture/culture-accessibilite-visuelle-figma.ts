import { cultureSheet } from "./culture-common";

export const cultureAccessibiliteVisuelleFigma = cultureSheet({
  id: "culture-F30",
  number: 30,
  title: "Accessibilité Visuelle et Figma",
  subtitle: "RGAA, outils d'audit et ajustements concrets — concevoir des interfaces accessibles dès la maquette",
  badge: "Fiche F30",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description: "L'accessibilité visuelle ne commence pas dans le code — elle se décide dans la maquette. Cette fiche couvre le cadre réglementaire français (RGAA) et son rapport aux standards WCAG, les principes de conception inclusive dans Figma (daltonisme, basse vision, lisibilité), les outils de vérification disponibles dans Figma et dans le navigateur, puis les ajustements concrets pour corriger les problèmes les plus courants avant le handoff.",
  accent: "processus",

  nodes: {
    rgaaReglementation: {
      id: "rgaaReglementation",
      label: "RGAA et cadre réglementaire",
      icon: "⚖",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>En France, un service public numérique qui ne respecte pas le RGAA s'expose à des sanctions légales et à une obligation de publication d'une déclaration d'accessibilité. Mais au-delà du secteur public, ignorer le RGAA dans un projet web commercial expose l'équipe à un risque réputationnel et juridique croissant : la loi pour une République Numérique de 2016 a élargi le périmètre, et les recours se multiplient. Un développeur ou designer qui ne connaît pas le RGAA travaille sans filet sur une contrainte légale réelle.</p>`,
        system: `<p>Le RGAA s'appuie sur les standards WCAG du W3C, dont les principes visuels sont introduits dans <span class="ref-fiche">→ D02</span> (contraste, couleur, typographie). Il complète les obligations légales web déjà couvertes <span class="ref-fiche">→ F12</span> et conditionne les choix d'implémentation frontend <span class="ref-fiche">→ T08</span>. La conformité RGAA doit être anticipée dès la conception dans Figma <span class="ref-fiche">→ principesConceptionInclusive</span> — la corriger après développement multiplie le coût par 3 à 10.</p>`,
        choice: {
          kind: "free",
          html: `<p>Le cadre réglementaire de l'accessibilité numérique en France :</p>
<p><strong>WCAG vs RGAA :</strong> les Web Content Accessibility Guidelines (WCAG) sont un standard international publié par le W3C, actuellement en version 2.1 (2018) et 2.2 (2023). Ils définissent des critères organisés en quatre principes — Perceptible, Opérationnel, Compréhensible, Robuste (POUR) — et en trois niveaux : A (minimum), AA (standard exigé), AAA (optimal, pas toujours réaliste). Le RGAA (Référentiel Général d'Amélioration de l'Accessibilité, version 4.1 en vigueur) est la transposition française des WCAG 2.1 niveau AA. Il traduit les critères abstraits des WCAG en tests concrets applicables aux technologies web. Chaque critère WCAG a des équivalents RGAA avec des méthodes de test précises.</p>
<p><strong>Qui est obligé par le RGAA :</strong> depuis la loi pour une République Numérique (2016) et son décret d'application (2019) : les services de l'État et collectivités (obligation légale avec sanctions jusqu'à 20 000€ par service non conforme), les entreprises privées de plus de 250 millions d'euros de CA en France (depuis 2021), et progressivement le secteur associatif recevant des fonds publics. Pour les structures non obligées, le RGAA AA reste la référence de qualité professionnelle — les clients publics l'exigent de plus en plus contractuellement.</p>
<p><strong>La déclaration d'accessibilité :</strong> les organismes obligés doivent publier une déclaration d'accessibilité sur leur site, indiquant : le niveau de conformité (totalement conforme / partiellement conforme / non conforme), les résultats de l'audit, les dérogations éventuelles (charge disproportionnée), et un mécanisme de contact pour signaler un problème. Cette déclaration doit être mise à jour après chaque audit substantiel.</p>
<p><strong>Les niveaux WCAG et leur application pratique :</strong></p>
<p><em>Niveau A :</em> critères dont l'absence rend le contenu inaccessible à certains utilisateurs. Exemples : alternatives textuelles pour les images (<code>alt</code>), sous-titres pour les vidéos, pas de contenu qui clignote plus de 3 fois par seconde. Non-négociables.</p>
<p><em>Niveau AA :</em> standard exigé par le RGAA et la majorité des clients publics. Exemples : ratio de contraste 4.5:1 pour le texte, redimensionnement à 200% sans perte de fonctionnalité, focus visible sur tous les éléments interactifs, pas de piège clavier.</p>
<p><em>Niveau AAA :</em> critères optionnels qui améliorent l'accessibilité mais ne sont pas toujours applicables. Exemples : ratio de contraste 7:1, langage simplifié, pas d'interruption automatique. Cibler AAA est pertinent pour les services critiques (administration, santé, finance).</p>`,
        },
        senior: `<p>Un designer expérimenté ne confond pas "conformité RGAA" et "accessibilité réelle". Un audit RGAA vérifie des critères mesurables — il ne peut pas capturer l'expérience d'un utilisateur malvoyant qui navigue avec une loupe, ni l'effort cognitif d'un utilisateur avec des troubles de l'attention. La conformité est un plancher légal, pas un plafond d'ambition. Il conseille aussi à ses clients de commencer par un audit de conformité partiel sur les pages critiques (homepage, formulaire de contact, page de paiement) plutôt qu'un audit complet qui mobilise des ressources importantes sans cibler les vrais risques.</p>`,
        errors: `<p><strong>Pattern 1 — RGAA découvert en phase de recette :</strong> l'équipe apprend que le client exige le RGAA AA pendant la phase de validation finale. Résultat : des semaines de corrections sur un produit déjà développé, avec des impacts en cascade sur les composants, les tokens et le code. Le RGAA doit apparaître dans les critères d'acceptation dès le début du projet, pas en condition de livraison.</p>
<p><strong>Pattern 2 — Conformité RGAA confondue avec accessibilité complète :</strong> l'équipe coche tous les critères RGAA et considère l'accessibilité comme réglée. Les critères RGAA couvrent les problèmes détectables automatiquement ou par audit expert — pas les problèmes d'usage réel avec des technologies d'assistance. Un audit automatique ne détecte que 30 à 40% des problèmes d'accessibilité réels.</p>
<p><strong>Pattern 3 — Dérogation "charge disproportionnée" utilisée abusivement :</strong> invoquer la dérogation légale pour éviter de corriger des problèmes d'accessibilité importants. La charge disproportionnée est une exception légale stricte — elle nécessite une analyse documentée montrant que le coût de mise en conformité est disproportionné par rapport aux bénéfices attendus. La dégrader en "c'est trop de travail" expose à un risque légal réel.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les versions du RGAA et des WCAG (WCAG 2.2 ajoute de nouveaux critères sur la taille des cibles et l'authentification), le périmètre légal des organismes obligés, les outils d'audit. <strong>Ce qui ne change pas :</strong> le RGAA est la transposition nationale des WCAG AA — comprendre les WCAG, c'est comprendre le RGAA ; la conformité de niveau AA est le standard professionnel exigible sur tout projet web en France ; l'accessibilité se conçoit au départ, pas en patch à la fin.</p>`,
        practice: {
          exercices: [
            {
              titre: "Évaluer la conformité RGAA d'une page existante",
              etapes: [
                "Choisis une page web publique (service administratif, e-commerce, médias). Ouvre-la dans Chrome ou Firefox.",
                "Installe l'extension WAVE (WebAIM) dans le navigateur. Lance l'analyse de la page. Note le nombre d'erreurs (rouge), d'alertes (jaune) et d'éléments structurels détectés.",
                "Navigue sur la page uniquement au clavier (Tab, Entrée, Espace, Flèches, Echap). Identifie les éléments inaccessibles au clavier et les moments où le focus visuel disparaît.",
                "Ouvre DevTools → Accessibility tree (Chrome : Éléments → Accessibilité). Vérifie que les boutons ont un nom accessible, que les images ont un alt pertinent, que le formulaire a des labels associés.",
              ],
              output: "Rapport d'audit en deux parties : résultats WAVE (erreurs et alertes classées) + résultats navigation clavier (éléments inaccessibles identifiés avec leur position dans la page).",
              critere: "Chaque erreur WAVE doit être classée : critique (bloque un utilisateur), importante (dégrade l'usage), ou mineure (recommandation). La navigation clavier doit identifier au moins un chemin complet possible et un blocage.",
            },
          ],
          piege: "Considérer qu'un score WAVE à zéro erreur signifie une page accessible. Les outils automatiques détectent les violations techniques évidentes — ils ne détectent pas les alt texts trompeurs ('image1.png'), les labels génériques ('Cliquez ici'), les structures de navigation illogiques, ni les problèmes de charge cognitive.",
        },
        verification: [
          "Quelle est la relation entre WCAG et RGAA, et pourquoi un projet pour un client public français doit-il cibler le RGAA AA plutôt que WCAG AA directement ?",
          "Quelles catégories d'organisations sont légalement obligées de respecter le RGAA en France, et quelle sanction risque un organisme public non conforme ?",
          "Pourquoi un audit automatique de conformité RGAA ne suffit-il pas à garantir l'accessibilité réelle d'une interface, et quel complément est nécessaire ?",
        ],
      },
    },

    principesConceptionInclusive: {
      id: "principesConceptionInclusive",
      label: "Principes de conception inclusive dans Figma",
      icon: "◑",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un designer qui conçoit sur un écran 27 pouces calibré, dans un bureau silencieux, avec une vision parfaite, conçoit pour lui-même. Or 15% de la population mondiale vit avec un handicap, dont une grande proportion de déficiences visuelles — daltonisme (8% des hommes), basse vision, cataracte, vieillissement. Concevoir sans simuler ces conditions dans Figma garantit de livrer des interfaces qui excluent une partie des utilisateurs dès la première maquette.</p>`,
        system: `<p>La conception inclusive applique et approfondit les principes de contraste et d'accessibilité de <span class="ref-fiche">→ D02</span>. Elle conditionne les choix de typographie <span class="ref-fiche">→ D02</span>, de couleur <span class="ref-fiche">→ D02</span> et de composants <span class="ref-fiche">→ D03</span>. Elle est vérifiable avec les outils d'audit <span class="ref-fiche">→ outilsVerification</span> et génère des ajustements documentés dans le handoff <span class="ref-fiche">→ D04</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les principes de conception inclusive visuelle dans Figma :</p>
<p><strong>Simuler les déficiences de vision des couleurs :</strong> Figma intègre un simulateur de daltonisme dans View → Accessibility Simulation. Types disponibles : Deuteranopia (rouge-vert, déficience la plus répandue), Protanopia (rouge-vert, variante moins fréquente), Tritanopia (bleu-jaune, rare), Achromatopsia (absence totale de couleur). La règle pratique : activer la simulation Deuteranopia sur toutes les maquettes de validation. Si les statuts "succès" et "erreur" deviennent indiscernables, la conception dépend trop de la couleur.</p>
<p><strong>La règle de la double redondance :</strong> toute information portée par la couleur doit être également portée par un deuxième signal — forme, icône, texte, position ou pattern. Exemples concrets : un champ en erreur ne signale pas l'erreur uniquement par une bordure rouge → ajouter une icône d'alerte et un texte d'erreur ; un graphique circulaire avec des segments de couleurs différentes → ajouter des étiquettes texte sur chaque segment ou une légende avec formes distinctes ; un bouton "Danger" rouge → ajouter le label "Supprimer définitivement" qui porte l'information sans la couleur.</p>
<p><strong>Contraste dans le contexte réel :</strong> au-delà des ratios WCAG (4.5:1 texte normal, 3:1 grand texte), considérer les conditions d'usage réelles. Un ratio de 4.6:1 sur écran calibré peut être insuffisant en plein soleil sur un smartphone avec un écran moins lumineux. Les zones de texte sur fond d'image sont particulièrement problématiques — ajouter un fond semi-opaque, un text shadow ou réserver les textes pour des zones uniformes. Tester les maquettes en noir et blanc (Figma : appliquer un filtre Grayscale) révèle si la hiérarchie survive sans couleur.</p>
<p><strong>Taille de texte et espacement inclusifs :</strong> au-delà de 16px minimum pour le corps de texte, concevoir pour que les utilisateurs qui agrandissent les textes (jusqu'à 200% sur mobile) ne cassent pas le layout. Dans Figma : tester les maquettes avec les textes agrandis de 140% simule le comportement du zoom navigateur ou de l'accessibilité système. Les composants avec hauteur fixe et texte centré sont les plus fragiles — préférer des hauteurs "hug" ou des min-height. Pour les utilisateurs dyslexiques : espacement entre lettres (letter-spacing) ≥ 0.12em et entre mots (word-spacing) ≥ 0.16em, préférer les polices sans empattement pour les textes longs.</p>
<p><strong>Focus et états visibles :</strong> dans Figma, le design de l'état focus doit être explicitement inclus dans les composants. Un focus visible respectant WCAG 2.2 doit avoir : un contour de minimum 2px, un ratio de contraste minimum de 3:1 entre l'indicateur de focus et ce qui l'entoure. En pratique : un outline bleu de 3px sur fond blanc est robuste et visible. Ne pas supprimer l'état focus dans les composants Figma parce qu'il paraît peu élégant — c'est un signal critique pour les utilisateurs clavier.</p>`,
        },
        senior: `<p>Un designer expérimenté active la simulation de daltonisme systématiquement avant toute présentation de maquette — pas après. Il sait que les graphiques (dashboards, analytics, infographies) sont les zones les plus à risque : il évite les combinaisons rouge/vert et utilise des formes géométriques distinctes en complément des couleurs. Il annote aussi les composants dans le handoff avec les ratios de contraste mesurés et les états de focus attendus — pas comme une décoration, mais comme une spécification que le développeur devra respecter dans le code.</p>`,
        errors: `<p><strong>Pattern 1 — Daltonisme testé uniquement sur les éléments de statut :</strong> vérifier la simulation uniquement sur les boutons "Succès" et "Erreur" en ignorant les graphiques, les badges de catégories, les cartes de prix, les légendes de carte. La dépendance à la couleur peut se cacher partout où plusieurs éléments sont différenciés uniquement par leur teinte. Activer la simulation sur l'ensemble de la maquette, pas sur des composants isolés.</p>
<p><strong>Pattern 2 — Contraste calculé sur la valeur nominale sans contexte :</strong> vérifier le ratio texte/fond sur la version desktop en conditions idéales, sans tester texte sur image, texte en mode dark, texte sur gradient ou texte sur fond coloré variable. Un composant Card avec un texte blanc sur fond photo peut avoir un ratio suffisant sur la photo sombre et insuffisant sur la version claire de la même photo. Tester les cas limites, pas la moyenne.</p>
<p><strong>Pattern 3 — Focus conçu comme un état optionnel :</strong> dessiner l'état focus dans Figma uniquement quand le développeur le demande, ou l'omettre complètement dans les composants. L'état focus doit être dans chaque composant interactif du design system, avec les mêmes soins que les états hover et active — il est utilisé par tous les utilisateurs clavier, dont une part significative ne peut pas utiliser de souris.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les standards de taille de cible (WCAG 2.2 a ajouté le critère 2.5.8, 24×24px minimum), les fonctionnalités de simulation dans Figma, les types de déficiences connus. <strong>Ce qui ne change pas :</strong> toute information portée uniquement par la couleur exclut une partie des utilisateurs ; le focus visible est non négociable pour les utilisateurs clavier ; concevoir pour les cas limites (daltonisme, basse vision, zoom 200%) produit de meilleures interfaces pour tous.</p>`,
        practice: {
          exercices: [
            {
              titre: "Auditer une maquette pour la conception inclusive",
              etapes: [
                "Ouvre une maquette dans Figma. Active View → Accessibility Simulation → Deuteranopia. Identifie tous les éléments où la distinction entre deux états ou deux catégories dépend uniquement de la couleur.",
                "Désactive la simulation. Exporte la maquette et applique-lui un filtre Grayscale (ou utilise le plugin A11y Annotation Kit). Vérifie que la hiérarchie visuelle (titres, actions primaires, contenus secondaires) est encore lisible sans couleur.",
                "Identifie les 3 éléments interactifs principaux (bouton CTA, lien navigation, champ de formulaire). Vérifie que chacun a un état focus explicitement designé dans le composant. Sinon, dessine l'état focus manquant.",
                "Augmente mentalement la taille de tous les textes de 40%. Quels composants se cassent ou débordent ? Note-les pour ajustement dans les propriétés Auto Layout.",
              ],
              output: "Rapport d'audit inclusif avec : liste des éléments dépendants de la couleur seule + corrections proposées, hiérarchie validée en grayscale, états focus manquants créés, composants fragiles au zoom identifiés.",
              critere: "Chaque problème identifié doit avoir une correction concrète dans la maquette ou une annotation dans le handoff. Un rapport sans correction n'est pas un audit — c'est une liste de tâches non traitées.",
            },
          ],
          piege: "Tester l'accessibilité uniquement sur les écrans finalisés, juste avant le handoff. À ce stade, les corrections demandent de modifier les composants maîtres du design system, ce qui a des répercussions sur toutes les instances. Intégrer les vérifications d'accessibilité inclusive à la phase de création des composants, pas à la phase de validation finale.",
        },
        verification: [
          "Vous avez conçu un graphique à barres avec des barres en rouge, vert et bleu pour représenter trois catégories. Quel problème cela pose-t-il pour un utilisateur daltonien deutéranope, et quelles deux modifications concrètes dans Figma corrigent ce problème ?",
          "Un composant bouton a un état par défaut et un état hover bien designés, mais aucun état focus. Quel utilisateur est impacté, dans quelle situation, et quel critère WCAG cela viole-t-il ?",
          "Expliquez pourquoi concevoir pour la basse vision et le zoom à 200% améliore l'expérience pour tous les utilisateurs, et quel principe de conception sous-jacent cela illustre.",
        ],
      },
    },

    outilsVerification: {
      id: "outilsVerification",
      label: "Outils de vérification dans Figma et le navigateur",
      icon: "🔍",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un designer peut vérifier intuitivement que le contraste "semble bon" et livrer un ratio de 3.2:1 au lieu des 4.5:1 requis. Sans outil, les problèmes d'accessibilité restent invisibles jusqu'au développement ou jusqu'à l'audit de recette — quand les corrections sont les plus coûteuses. Les outils de vérification dans Figma permettent de détecter et documenter les problèmes pendant la conception, pas après.</p>`,
        system: `<p>Les outils de vérification s'appliquent aux principes de conception inclusive <span class="ref-fiche">→ principesConceptionInclusive</span> et produisent des données concrètes pour le handoff <span class="ref-fiche">→ D04</span>. Ils complètent le cadre réglementaire RGAA <span class="ref-fiche">→ rgaaReglementation</span> en permettant de mesurer la conformité aux critères de contraste et de structure avant le développement <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les outils essentiels pour vérifier l'accessibilité dans Figma et le navigateur :</p>
<p><strong>Dans Figma — Plugins d'accessibilité :</strong></p>
<p><em>Stark :</em> le plugin le plus complet pour l'accessibilité dans Figma. Fonctionnalités : vérification de contraste en temps réel sur la sélection (affiche le ratio et la conformité AA/AAA), simulateur de déficiences visuelles (8 types de daltonisme + cécité totale), vérificateur de taille des cibles tactiles (44×44px), focus order checker pour documenter l'ordre de tabulation. La version gratuite couvre les essentiels ; la version payante ajoute l'audit automatique de toute la page et l'export de rapport. Installation : Figma Community → rechercher "Stark".</p>
<p><em>A11y Annotation Kit :</em> un kit de composants (pas un plugin) disponible dans la Community Figma qui fournit des annotations standardisées pour documenter l'accessibilité dans le handoff : rôles ARIA, ordre de lecture, labels des éléments interactifs, focus groups. À utiliser sur une couche séparée au-dessus de la maquette pour annoter sans modifier les composants.</p>
<p><em>Contrast (plugin) :</em> outil léger focalisé sur le contraste. Avantage sur Stark : gratuit sans limitation, interface simple, affiche le ratio et les niveaux AA/AAA pour texte normal et grand texte simultanément. Utile pour une vérification rapide sans avoir besoin de l'ensemble des fonctionnalités de Stark.</p>
<p><em>Figma natif — Accessibility Simulation :</em> View → Accessibility Simulation intègre nativement les simulations de déficiences visuelles sans plugin. Moins complet que Stark pour le contraste, mais disponible sans installation et utilisable en présentation.</p>
<p><strong>Dans le navigateur — Outils de vérification :</strong></p>
<p><em>WAVE (WebAIM) :</em> extension navigateur (Chrome et Firefox) qui analyse une page web complète et signale les erreurs d'accessibilité avec des icônes positionnées sur les éléments concernés. Catégories : erreurs (problèmes bloquants), alertes (problèmes à vérifier), éléments structurels (headings, landmarks, lists). Utile pour l'audit post-développement ou pour analyser un site existant en référence.</p>
<p><em>Lighthouse (Chrome DevTools) :</em> F12 → onglet Lighthouse → Accessibility. Score de 0 à 100 basé sur les critères axe. Rapide à lancer, intégré au navigateur, produit un rapport actionnable avec les critères en échec et les éléments concernés. Ne couvre pas tous les critères RGAA (seulement les vérifiables automatiquement) mais couvre les problèmes les plus courants.</p>
<p><em>Axe DevTools (extension) :</em> l'outil de référence des auditeurs d'accessibilité. La version gratuite (axe DevTools) s'intègre dans les DevTools du navigateur et produit des résultats plus précis que Lighthouse avec moins de faux positifs. La version payante (axe DevTools Pro) ajoute des tests guidés pour les critères non automatisables.</p>
<p><em>Contrast Checker WebAIM :</em> outil en ligne qui calcule le ratio de contraste entre deux couleurs hex et indique la conformité AA/AAA. Utile pour vérifier une couleur spécifique hors contexte de Figma ou de navigateur.</p>`,
        },
        senior: `<p>Un designer expérimenté utilise Stark en mode "Suggest" plutôt qu'en mode "Check" seul : quand Stark détecte un contraste insuffisant, il propose automatiquement des variantes de couleur conformes AA tout en restant proches de la couleur originale. Cela permet de corriger un problème de contraste en 10 secondes au lieu de chercher manuellement une couleur alternative. Il documente aussi les résultats des vérifications directement dans le fichier Figma (avec A11y Annotation Kit ou une page dédiée "Accessibilité") pour que le développeur dispose d'un rapport de conformité au moment du handoff, sans avoir à relancer les outils.</p>`,
        errors: `<p><strong>Pattern 1 — Vérification uniquement sur le composant isolé :</strong> tester le contraste du bouton primaire sur fond blanc dans la bibliothèque de composants, sans vérifier comment ce bouton apparaît sur fond coloré, sur fond image ou dans ses états hover et focus dans la maquette réelle. Un composant conforme en isolation peut être non conforme dans son contexte d'usage — la vérification doit se faire dans la frame de maquette, pas dans la bibliothèque.</p>
<p><strong>Pattern 2 — Lighthouse utilisé comme seul audit RGAA :</strong> lancer un audit Lighthouse, obtenir un score de 90 et déclarer le site accessible. Lighthouse détecte environ 30% des problèmes RGAA automatisables — il ne détecte pas les alt texts non pertinents, les labels génériques ("bouton"), les problèmes de navigation au clavier, les pièges de focus ou les erreurs de structure sémantique subtiles. Il est un point de départ, pas une certification.</p>
<p><strong>Pattern 3 — A11y Annotation Kit utilisé sans processus de handoff :</strong> annoter les rôles ARIA et l'ordre de tabulation dans une couche Figma sans convention avec le développeur sur comment utiliser ces annotations. Les annotations deviennent une décoration invisible que le développeur ne regarde pas. Établir une convention : quelle couche, quel format, quelles annotations sont obligatoires vs. optionnelles, et inclure une revue des annotations dans la checklist de handoff.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les plugins Figma (Stark évolue, de nouveaux outils apparaissent), les versions de Lighthouse et axe, les critères automatiquement détectables. <strong>Ce qui ne change pas :</strong> aucun outil automatique ne couvre 100% des critères d'accessibilité — un audit complet combine outil automatique + test manuel au clavier + test avec lecteur d'écran ; la vérification de contraste doit se faire dans le contexte d'usage réel, pas sur le composant isolé.</p>`,
        practice: {
          exercices: [
            {
              titre: "Installer et utiliser Stark sur une maquette existante",
              etapes: [
                "Dans Figma, ouvre le panneau Plugins (Shift+Cmd+P ou Shift+Ctrl+P) → rechercher 'Stark' → installer. Ouvre une maquette complète.",
                "Sélectionne un texte sur fond coloré. Lance Stark → Contrast Checker. Note le ratio obtenu, le niveau de conformité (AA/AAA ou fail), et si Stark propose une couleur alternative conforme.",
                "Lance Stark → Vision Simulator → Deuteranopia sur la maquette complète. Capture une zone qui pose problème. Documente dans un commentaire Figma les éléments qui perdent leur distinction.",
                "Lance Stark → Focus Order sur un flux de 3 à 5 éléments interactifs. Vérifie que l'ordre numéroté correspond à l'ordre logique de lecture (gauche à droite, haut en bas). Corrige un ordre incorrect.",
              ],
              output: "Rapport Stark sur la maquette : 3 ratios de contraste vérifiés avec niveau de conformité, 1 capture de simulation Deuteranopia avec problème documenté, ordre de focus d'un flux vérifié et corrigé si nécessaire.",
              critere: "Chaque ratio insuffisant doit avoir une couleur alternative conforme identifiée (via Stark Suggest ou manuellement). L'ordre de focus doit correspondre à l'ordre de lecture attendu par un utilisateur clavier.",
            },
          ],
          piege: "Installer Stark puis ne l'utiliser qu'une fois par projet, juste avant le handoff. L'accessibilité vérifiée une seule fois sur une maquette figée détecte les problèmes trop tard. Utiliser Stark comme réflexe à chaque nouveau composant créé — le contraste d'un bouton se vérifie au moment où la couleur est choisie, pas une semaine plus tard.",
        },
        verification: [
          "Quelle est la différence entre Stark (plugin Figma) et WAVE (extension navigateur) en termes de moment d'utilisation dans le processus de conception, et quel problème chacun détecte que l'autre ne peut pas détecter ?",
          "Un audit Lighthouse donne un score Accessibilité de 85/100. L'équipe estime que le projet est accessible. Quels types de problèmes RGAA ce score ne détecte-t-il probablement pas, et quelle vérification complémentaire est indispensable ?",
          "Vous utilisez A11y Annotation Kit pour documenter les rôles ARIA et l'ordre de tabulation dans Figma. Le développeur ne consulte jamais ces annotations. Quelle est la cause probable, et comment modifier le processus de handoff pour résoudre ce problème ?",
        ],
      },
    },

    ajustementsCorrections: {
      id: "ajustementsCorrections",
      label: "Ajustements et corrections dans Figma",
      icon: "⚙",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Identifier un problème d'accessibilité dans une maquette sans savoir comment le corriger produit un rapport sans suite. Les ajustements d'accessibilité dans Figma suivent des patterns répétables : corriger un contraste insuffisant sans trahir la palette, ajouter un signal non-couleur sans surcharger l'interface, redesigner un composant fragile pour le rendre robuste au zoom — ces gestes ont des solutions concrètes, documentables, transmissibles dans le handoff.</p>`,
        system: `<p>Les ajustements corrigent les problèmes détectés par les outils <span class="ref-fiche">→ outilsVerification</span> et documentés lors de l'audit inclusif <span class="ref-fiche">→ principesConceptionInclusive</span>. Ils s'inscrivent dans le système de tokens de couleur <span class="ref-fiche">→ D04</span> — une correction de contraste doit modifier le token sémantique, pas la valeur locale. Ils alimentent le handoff <span class="ref-fiche">→ D04</span> sous forme d'annotations qui précisent les ratios attendus et les comportements inclusifs.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les corrections d'accessibilité les plus courantes dans Figma :</p>
<p><strong>Corriger un contraste insuffisant :</strong> deux approches selon la contrainte. Si la couleur de fond est fixe (marque, image) : assombrir le texte (aller vers le noir) ou l'éclaircir (aller vers le blanc) jusqu'au ratio requis. Si la couleur de texte est fixe (marque) : modifier le fond en l'assombrissant ou en ajoutant un fond intermédiaire (un rectangle semi-opaque sombre derrière le texte sur image). Pour les éléments UI non textuels (icônes, bordures de champs, indicateurs) : le seuil est 3:1 — plus facile à atteindre. Outil de calcul rapide dans Figma : Stark → Suggest montre la variante conforme la plus proche de la couleur originale.</p>
<p><strong>Ajouter un signal non-couleur :</strong> pour chaque statut ou catégorie actuellement différencié uniquement par couleur, ajouter une couche d'information redondante. Méthodes par ordre de lisibilité : texte (le plus robuste — "Erreur : champ obligatoire" ne dépend d'aucune perception couleur), icône avec forme distincte (triangle d'alerte ≠ cercle de succès ≠ losange d'information), motif ou texture en plus de la couleur (pour graphiques et cartographies), position ou taille différente (éléments d'erreur légèrement mis en avant). Dans Figma : créer des variantes de composant qui intègrent ces signaux systématiquement — l'icône d'erreur fait partie du composant, pas d'une couche manuelle ajoutée au cas par cas.</p>
<p><strong>Redesigner un composant fragile au zoom :</strong> les composants les plus à risque au zoom 200% sont ceux avec une hauteur fixe, un texte centré verticalement en position absolue, ou un overflow hidden. Corrections : remplacer les hauteurs fixes par des min-height, passer les textes en Auto Layout "Hug contents" en hauteur, configurer overflow visible ou scroll plutôt que hidden. Dans Figma, ces corrections impliquent souvent de refactoriser l'Auto Layout du composant maître — ce qui améliore aussi la maintenabilité globale.</p>
<p><strong>Documenter les ajustements pour le handoff :</strong> chaque correction d'accessibilité dans Figma doit être transmise avec son contexte. Format recommandé dans les annotations A11y : "Contraste texte/fond : 5.2:1 (AA conforme — valeur mesurée avec Stark)", "État focus : outline 3px solid #0066CC, offset 2px — visible sur fond blanc et fond gris clair", "Image décorative : alt vide ('') — ne pas décrire", "Image informative : alt = description courte du contenu, pas de la forme". Ces annotations éliminent les décisions d'implémentation laissées au développeur.</p>`,
        },
        senior: `<p>Un designer expérimenté distingue l'accessibilité structurelle de l'accessibilité cosmétique. Corriger le contraste d'un texte est une correction cosmétique — rapide et locale. Repenser un composant pour qu'il supporte le zoom 200% sans casser son layout est une correction structurelle — elle demande de refactoriser le composant maître et d'en tester toutes les instances. Il priorise toujours les corrections structurelles d'abord (elles ont des répercussions systémiques si elles ne sont pas faites au bon moment) et traite les cosmétiques en deuxième passe. Il documente aussi les corrections "non appliquées pour raison de marque" avec une alternative proposée — si le client refuse une correction, la décision doit être tracée dans le fichier, pas silencieuse.</p>`,
        errors: `<p><strong>Pattern 1 — Correction de contraste locale sans mise à jour du token :</strong> modifier la couleur d'un texte directement dans une frame pour passer le ratio WCAG, sans mettre à jour le token de couleur correspondant. Résultat : le fix est appliqué dans une frame, les 40 autres instances du composant restent non conformes. La correction d'accessibilité doit modifier le token sémantique (color-text-secondary par exemple), pas la valeur locale.</p>
<p><strong>Pattern 2 — Icône ajoutée "à la main" au cas par cas :</strong> ajouter une icône d'erreur en superposition sur les champs en erreur dans chaque frame individuellement, au lieu d'intégrer l'icône d'erreur dans le variant "error" du composant Input. Quand le composant change ou que de nouvelles frames sont créées, ces icônes manuelles sont oubliées. L'accessibilité non-couleur doit être dans le composant, pas dans la couche de composition.</p>
<p><strong>Pattern 3 — Alt text conçu comme une tâche de développement :</strong> ne pas spécifier les textes alternatifs des images dans le handoff Figma, en laissant le développeur écrire les alt texts. Or le texte alternatif pertinent dépend du contexte de la page et de l'intention éditoriale — "Photo d'une femme souriante" vs "Portrait de Marie Dupont, directrice artistique" vs alt vide (image décorative) — que le designer connaît et que le développeur doit deviner. Les alt texts se définissent dans les annotations de handoff, pas dans le code.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les outils de suggestion de couleur conforme, les pratiques d'annotation dans Figma, les exigences WCAG sur les tailles de cibles. <strong>Ce qui ne change pas :</strong> les corrections d'accessibilité doivent toucher les tokens et composants maîtres, jamais des valeurs locales ; chaque signal couleur doit avoir un équivalent non-couleur dans le composant lui-même ; les textes alternatifs et les rôles ARIA se décident à la conception, pas à l'implémentation.</p>`,
        practice: {
          exercices: [
            {
              titre: "Corriger trois problèmes d'accessibilité dans une maquette",
              etapes: [
                "Identifie dans une maquette un texte avec contraste insuffisant (ratio < 4.5:1). Utilise Stark → Suggest pour obtenir une couleur conforme. Modifie le token de couleur correspondant dans les Figma Variables ou dans la bibliothèque, pas la valeur locale de la frame.",
                "Identifie un élément de statut différencié uniquement par couleur (tag 'En cours' vert vs 'En retard' rouge, par exemple). Ajoute une icône distincte à chaque variante dans le composant maître. Vérifie en simulation Deuteranopia que les deux états restent distincts.",
                "Identifie un composant avec une hauteur fixe contenant du texte. Passe la hauteur en 'Hug contents' ou configure un min-height. Teste avec un texte 40% plus long (simuler le zoom) — le composant doit s'agrandir sans déborder.",
                "Ajoute une annotation A11y sur l'image principale de la maquette : décider si c'est une image décorative (alt vide) ou informative (alt descriptif), et noter le texte alternatif exact dans l'annotation.",
              ],
              output: "Maquette avec 3 corrections documentées : token de couleur mis à jour avec ratio mesuré, composant de statut avec variante icône, composant redimensionnable validé au zoom, annotation alt text sur l'image.",
              critere: "Chaque correction doit être dans le composant maître ou le token — zéro correction locale dans une frame. L'annotation alt text doit être une décision explicite (décoratif ou informatif) avec le texte exact, pas une note 'à compléter'.",
            },
          ],
          piege: "Traiter les corrections d'accessibilité comme une tâche de fin de projet, distincte du design. En réalité, intégrer les corrections dans les composants maîtres pendant la phase de construction du design system coûte 10 fois moins de temps que les appliquer en fin de projet sur des centaines d'instances. L'accessibilité intégrée dès la conception est un avantage de maintenabilité, pas une contrainte supplémentaire.",
        },
        verification: [
          "Un token de couleur 'color-text-secondary' a une valeur qui produit un ratio de 3.8:1 sur fond blanc. Vous corrigez manuellement la couleur dans une frame pour passer à 4.6:1. Quel problème cette approche crée-t-elle, et quelle est la correction systémique correcte ?",
          "Vous avez un composant Badge avec deux variantes : 'success' (fond vert) et 'error' (fond rouge), différenciées uniquement par couleur. Décrivez précisément comment modifier le composant maître pour qu'il reste accessible à un utilisateur daltonien deutéranope.",
          "Le développeur vous demande quel texte alternatif mettre sur l'image de bannière de la page d'accueil. Vous répondez 'c'est ton job'. Pourquoi cette réponse est-elle incorrecte, et qui doit décider du contenu de l'attribut alt et à quelle étape du processus ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "rgaaReglementation", x: 10, y: 100, w: 185, h: 65 },
        { id: "principesConceptionInclusive", x: 275, y: 40, w: 240, h: 65 },
        { id: "outilsVerification", x: 275, y: 165, w: 210, h: 65 },
        { id: "ajustementsCorrections", x: 590, y: 100, w: 210, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 273, y2: 72, label: "cadre" },
        { x1: 195, y1: 148, x2: 273, y2: 197, label: "mesure" },
        { x1: 515, y1: 72, x2: 588, y2: 120, label: "corrige" },
        { x1: 485, y1: 197, x2: 588, y2: 150, label: "documente" },
      ],
    },
  },
});
