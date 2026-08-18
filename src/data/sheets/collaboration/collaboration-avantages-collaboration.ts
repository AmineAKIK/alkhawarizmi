import { coNode, coSheet } from "./collaboration-common";

export const collaborationAvantagesCollaboration = coSheet({
  id: "collaboration-avantages-collaboration",
  number: 15,
  title: "Avantages et optimisation des ressources collaboratives",
  subtitle:
    "Contribuer, réutiliser, accélérer — tirer le maximum du travail collectif sans en épuiser les acteurs",
  badge: "Fiche Co15",
  meta: ["5 nœuds"],
  readingTime: "30 min",
  description:
    "Les ressources collaboratives ne se consomment pas passivement — elles se cultivent. Cette fiche couvre les gains concrets de la collaboration (vitesse, qualité, apprentissage), les bonnes pratiques de contribution, l'art de réutiliser sans créer de dépendance toxique, et comment une équipe peut structurer son rapport aux ressources communes pour en maximiser la valeur.",
  accent: "humain",
  nodes: {
    gainsReels: coNode({
      id: "gainsReels",
      label: "Gains concrets de la collaboration",
      icon: "📈",
      kind: "organisation",
      niveau: "Fondation",
      why: "Un développeur seul peut produire 200-400 lignes de code de qualité par jour. Une équipe de 5 connectée aux ressources collaboratives (open source, documentation communautaire, retours d'expérience partagés) produit proportionnellement beaucoup plus — non pas parce que chacun travaille plus vite, mais parce que les problèmes déjà résolus ne sont pas résolus à nouveau. Quand ce calcul n'est pas fait explicitement, les décisions de 'faire maison' semblent raisonnables jusqu'à ce qu'elles s'accumulent en dette de réinvention.",
      system:
        'Les gains de la collaboration sont distribués sur plusieurs dimensions : vitesse (réutilisation vs réinvention), qualité (code battu par des milliers d\'utilisateurs vs code non testé), apprentissage (exposition à des pratiques variées). <span class="ref-fiche">→ Co14</span> : les ressources collaboratives identifiées dans la fiche précédente sont le mécanisme par lequel ces gains se matérialisent — open source, documentation communautaire, plateformes de partage. <span class="ref-fiche">→ Co10</span> : les métriques d\'équipe (cycle time, lead time) permettent de mesurer objectivement si l\'utilisation des ressources collaboratives accélère réellement la livraison.',
      choice:
        "Mesurer les gains vs. les intuitionner. Beaucoup d'équipes savent intuitivement que 'l'open source fait gagner du temps' mais ne le mesurent jamais. Alternatives pour mesurer : comparer le temps d'implémentation d'une feature avec une lib existante vs. estimation sans la lib ; tracer le ratio 'code écrit / code réutilisé' par sprint ; mesurer le temps de onboarding avec documentation communautaire vs. sans. Ces mesures existent mais sont rarement faites. Sans mesure, les décisions de 'faire maison' sont prises sur des bases émotionnelles (fierté du code sur mesure, peur des dépendances) plutôt que rationnelles.",
      senior:
        "Le gain le plus sous-estimé de la collaboration n'est pas la vitesse — c'est la découverte d'erreurs que vous n'auriez jamais faites seul. Quand vous publiez du code, participez à une discussion open source ou soumettez une PR, vous exposez votre raisonnement à des cerveaux qui ne partagent pas vos angles morts. C'est inconfortable et c'est exactement ce qui rend le code meilleur. Les équipes qui ne contribuent jamais à l'extérieur développent des patterns locaux qui semblent évidents en interne et qui sont manifestement problématiques vus de l'extérieur.",
      errors: `<p><strong>Pattern 1 — ROI imaginaire :</strong> L'équipe justifie de 'faire maison' en estimant que 'c'est juste 2 semaines de travail'. Elle oublie le coût de maintenance, de documentation, de mise à jour de sécurité, de formation des nouveaux arrivants. Conséquence : 2 ans plus tard, le composant interne coûte plus en maintenance qu'il n'a jamais économisé.</p><p><strong>Pattern 2 — Gain invisible :</strong> L'équipe utilise massivement l'open source mais ne mesure jamais le gain. Conséquence : lors de la prochaine décision 'faire maison vs. utiliser', elle n'a pas d'argument chiffré et cède face aux arguments émotionnels ('on aura plus de contrôle').</p><p><strong>Pattern 3 — Mutualisation superficielle :</strong> L'équipe partage du code en interne sous forme de copier-coller entre projets plutôt que via un paquet partagé. Conséquence : les corrections de bugs doivent être appliquées manuellement dans 5 endroits — la mutualisation crée plus de travail qu'elle n'en économise.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les métriques utilisées pour mesurer le gain, les outils de réutilisation (npm packages, git submodules, monorepos), les contextes (startup vs enterprise). <strong>Ce qui ne change pas :</strong> le gain de la collaboration est réel mais pas automatique — il dépend de la qualité de la ressource réutilisée et du coût d'intégration. Une dépendance mal choisie peut coûter plus qu'une implémentation maison.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Calculer le ROI d'une dépendance open source",
            etapes: [
              "Choisissez une dépendance majeure de votre projet (ex: une lib de validation, de gestion de dates, de HTTP).",
              "Estimez le temps qu'il aurait fallu pour implémenter les fonctionnalités utilisées de zéro (en heures).",
              "Estimez le temps de maintenance annuel si vous aviez développé cette fonctionnalité (corrections de bugs, mises à jour de sécurité, documentation).",
              "Comparez avec le temps passé à intégrer et maintenir la dépendance (mise à jour, migration, adaptation).",
              "Calculez le gain net en heures/an et exprimez-le en jours de développement.",
            ],
            output:
              "Tableau ROI : temps économisé (implémentation + maintenance) vs. temps investi (intégration + migration) + gain net en jours/an.",
            critere:
              "Les estimations doivent être documentées avec des hypothèses explicites — 'j'estime X parce que...' — pas juste des chiffres.",
          },
        ],
        piege:
          "N'inclure que le coût d'implémentation initial dans le calcul — le coût de maintenance long terme est souvent 3 à 5 fois supérieur au coût initial.",
      },
      verification: [
        "Quels sont les trois types de gains concrets que les ressources collaboratives apportent à une équipe de développement, et comment chacun se mesure différemment ?",
        "Votre équipe débat : utiliser une lib de validation de formulaires (45 ko, 3 dépendances) ou écrire sa propre validation (500 lignes). L'argument 'on contrôle tout' est avancé. Quelles questions posez-vous pour structurer la décision objectivement ?",
        "Pourquoi le gain d'apprentissage de la collaboration est-il structurellement supérieur au gain de vitesse, même s'il est moins visible à court terme ?",
      ],
    }),
    bonnesPratiquesContribution: coNode({
      id: "bonnesPratiquesContribution",
      label: "Bonnes pratiques de contribution",
      icon: "✅",
      kind: "processus",
      niveau: "Intermédiaire",
      why: "Une pull request ouverte sur un projet open source avec 'fix bug' comme description, 200 lignes de changements non demandés et aucun test sera fermée en 24h sans explication — et le contributeur ne comprendra pas pourquoi. Les projets open source ont des contraintes que les projets internes n'ont pas : mainteneurs bénévoles, standards de qualité élevés, nécessité de compatibilité avec des milliers d'environnements. Contribuer sans comprendre ces contraintes est contre-productif pour tout le monde.",
      system:
        'Les bonnes pratiques de contribution sont le protocole social qui permet aux ressources collaboratives de fonctionner à grande échelle. <span class="ref-fiche">→ Co07</span> : documenter une décision (ADR, RFC) dans un projet open source suit les mêmes principes qu\'en interne — contexte, alternatives considérées, raison du choix. <span class="ref-fiche">→ T05</span> : le workflow de contribution open source (fork → branch → commits atomiques → PR avec description → review → merge) est le même workflow Git que celui utilisé en interne — maîtriser l\'un facilite l\'autre.',
      choice:
        "Contribution de code vs. contribution non-code. La contribution de code (PR, bug fix, feature) est la plus visible mais pas la seule utile. Les contributions non-code — documentation, traduction, rapport de bugs bien formés, review de PRs ouvertes — sont souvent plus valorisées par les mainteneurs parce qu'elles sont rares et impactantes. Pour un premier contact avec un projet open source : commencer par une issue de documentation ou de test est moins risqué qu'une PR de feature. Pour un projet interne : même logique — commencer par ce qui est le plus demandé, pas ce qui est le plus impressionnant.",
      senior:
        "Le premier filtre d'une bonne contribution est la lecture du CONTRIBUTING.md et des issues récentes. Un contributeur qui ne lit pas ces deux sources avant d'ouvrir une PR travaille contre lui-même. Le deuxième filtre : ouvrir une issue d'abord pour valider que la contribution est voulue avant de coder. Travailler 2 semaines sur une feature pour recevoir 'not in scope, won't merge' est frustrant pour tout le monde. Le troisième filtre : des commits atomiques avec des messages clairs — chaque commit doit être compréhensible isolément, pas juste en contexte de la PR.",
      errors: `<p><strong>Pattern 1 — PR monstre :</strong> Le contributeur soumet une PR avec 1500 lignes de changements couvrant 5 sujets différents parce qu'il a 'tout réparé en même temps'. Conséquence : la PR est impossible à reviewer en une session, le mainteneur la demande découpée, le contributeur est découragé et abandonne.</p><p><strong>Pattern 2 — Feature non demandée :</strong> Le contributeur implémente une feature qu'il voulait et l'envoie sans discussion préalable. Conséquence : la feature est refusée parce qu'elle va contre la roadmap du projet, le travail est perdu, et le contributeur est fâché de 'ne pas être reconnu'.</p><p><strong>Pattern 3 — Contribution sans tests :</strong> Le bug fix ne contient pas de test qui reproduit le bug. Conséquence : le mainteneur doit écrire le test lui-même (ce qui prend du temps qu'il n'a pas) ou merger sans filet — le bug peut réapparaître dans une future refactorisation.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les conventions de code selon le projet, le format des messages de commit (Conventional Commits vs. format libre), les outils de CI utilisés, les processus de review selon les mainteneurs. <strong>Ce qui ne change pas :</strong> une contribution de valeur règle un problème réel, est accompagnée d'un contexte clair, respecte le périmètre du projet, et facilite le travail du mainteneur plutôt que de l'alourdir.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Contribuer à un projet open source pour la première fois",
            etapes: [
              "Identifiez un projet open source que vous utilisez et qui a des issues labellisées 'good first issue' ou 'help wanted'.",
              "Lisez le CONTRIBUTING.md et le README du projet avant toute action.",
              "Choisissez une issue de documentation ou de test (pas de feature) pour votre première contribution.",
              "Commentez sur l'issue pour signaler que vous travaillez dessus et demandez confirmation que c'est toujours d'actualité.",
              "Ouvrez une PR avec : description du problème résolu, comment tester, référence à l'issue originale.",
            ],
            output:
              "PR ouverte sur un vrai projet open source avec description complète, référence à l'issue et changements minimaux.",
            critere:
              "La PR doit être assez petite pour être reviewée en moins de 15 minutes. Si elle dépasse 100 lignes de changements pour une première contribution, elle est trop grande.",
          },
        ],
        piege:
          "Choisir un bug complexe ou une feature impressionnante pour la première contribution — les 'good first issues' existent pour que les contributeurs apprennent le processus, pas pour prouver leur niveau.",
      },
      verification: [
        "Pourquoi ouvrir une issue avant d'écrire le code d'une contribution est-il une pratique professionnelle et non une perte de temps ?",
        "Vous avez implémenté une amélioration de performance sur une lib open source que vous utilisez : elle réduit le temps d'exécution de 40% sur vos benchmarks. La PR fait 800 lignes. Le CONTRIBUTING.md dit 'les PRs doivent être reviewées en moins de 30 minutes'. Comment procédez-vous ?",
        "En quoi les pratiques de contribution open source (commits atomiques, PR avec contexte, tests inclus) sont-elles directement transférables au travail en équipe interne ?",
      ],
    }),
    reutilisationSaine: coNode({
      id: "reutilisationSaine",
      label: "Réutilisation sans dépendance toxique",
      icon: "♻",
      kind: "processus",
      niveau: "Intermédiaire",
      why: "L'enfer des dépendances survient quand une lib que vous avez intégrée sans réfléchir veut maintenant migrer vers une API incompatible. Votre code appelle 50 endroits différents avec l'ancienne API. La migration prend 3 semaines et bloque toutes les autres features. La réutilisation est un gain réel — mais une réutilisation non encapsulée est une dette cachée qui se manifeste le plus brutalement au pire moment.",
      system:
        "La réutilisation saine passe par l'encapsulation des dépendances pour isoler les points de changement. <span class=\"ref-fiche\">→ T03</span> : les patterns d'architecture applicative (repositories, adapters, services) sont les mécanismes qui permettent d'isoler une dépendance externe du reste du code — changer la lib de base de données ne doit pas toucher la couche service. <span class=\"ref-fiche\">→ Co14</span> : l'audit des dépendances (licences, mainteneurs, activité) fait partie de la réutilisation saine — ne pas encapsuler une dépendance abandonnée reste risqué.",
      choice:
        "Wrapper pattern vs. utilisation directe vs. abstraction interface. Wrapper pattern : créer une classe ou module interne qui encapsule la lib externe — les changements de lib ne touchent que le wrapper. Plus de code, mais isolement garanti. Utilisation directe : appeler la lib partout dans le code — moins de code, mais migration catastrophique si la lib change d'API. Abstraction interface : définir votre propre interface que plusieurs implémentations peuvent remplir — maximum de flexibilité, maximum de complexité. Règle pratique : wrappez toute dépendance appelée dans plus de 5 endroits différents.",
      senior:
        "Le signe d'une dépendance bien intégrée : vous pouvez la remplacer par une autre en modifiant un seul fichier. Si changer de lib de logging nécessite de modifier 40 fichiers, la dépendance n'était pas encapsulée. Les dépendances à encapsuler en priorité : les clients HTTP (changent fréquemment), les ORMs (API instable entre versions), les libs de date (moment.js → day.js → date-fns — ce chemin a été parcouru par des milliers d'équipes), les clients de messagerie. Les dépendances qui n'ont pas besoin d'être encapsulées : les utilitaires sans état (lodash, zod) qui ont des APIs stables.",
      errors: `<p><strong>Pattern 1 — Dépendance partout :</strong> L'équipe appelle directement <code>axios.get()</code> dans 60 fichiers différents. Quand axios sort une version majeure avec une API différente, la migration prend une semaine de refactoring. Conséquence : toutes les features sont bloquées pendant la migration, et la dette de migration aurait été évitable avec un wrapper de 20 lignes.</p><p><strong>Pattern 2 — Vendoring sans mise à jour :</strong> L'équipe copie le code d'une lib dans son propre dépôt ('vendor') pour éviter les mises à jour. Conséquence : les corrections de sécurité de la lib originale ne sont jamais appliquées, la version vendorée accumule des vulnérabilités jusqu'à l'incident.</p><p><strong>Pattern 3 — Abstraction prématurée :</strong> L'équipe crée une interface abstraite pour une dépendance utilisée dans 2 endroits, anticipant un futur changement qui n'arrive jamais. Conséquence : 300 lignes de code d'abstraction à maintenir pour un gain de flexibilité hypothétique — complexité sans valeur.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les patterns d'encapsulation selon le langage (adapter pattern en TypeScript, context manager en Python, trait object en Rust), les outils de gestion des dépendances. <strong>Ce qui ne change pas :</strong> une dépendance bien réutilisée est isolée derrière une interface que vous contrôlez. Le coût de remplacement d'une dépendance est proportionnel au nombre de points de contact directs avec votre code.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Encapsuler une dépendance critique",
            etapes: [
              "Identifiez dans votre projet une dépendance externe appelée directement dans plus de 3 endroits (ex: client HTTP, lib de log, lib de date).",
              "Comptez le nombre exact de fichiers et d'appels directs à cette dépendance.",
              "Créez un module wrapper qui expose uniquement les fonctions que vous utilisez réellement, en appelant la lib en dessous.",
              "Remplacez tous les imports directs par des imports de votre wrapper.",
              "Vérifiez que les tests passent, puis simulez un remplacement de la lib : modifiez uniquement le wrapper pour pointer vers une implémentation alternative (même factice).",
            ],
            output:
              "Wrapper créé + tous les imports remplacés + simulation de remplacement réussie en modifiant un seul fichier.",
            critere:
              "Le remplacement de la lib dans le wrapper ne doit nécessiter aucun changement en dehors du fichier wrapper — si d'autres fichiers doivent changer, l'encapsulation est incomplète.",
          },
        ],
        piege:
          "Encapsuler toutes les dépendances par principe — réservez l'encapsulation aux dépendances avec une API instable ou appelées dans de nombreux endroits.",
      },
      verification: [
        "Quelle règle pratique permet de décider si une dépendance doit être encapsulée derrière un wrapper, et sur quel critère mesurable ?",
        "Votre projet utilise moment.js pour la gestion des dates dans 40 fichiers. Vous devez migrer vers day.js pour réduire la taille du bundle de 70 Ko. Décrivez comment une bonne encapsulation aurait réduit le coût de cette migration, et estimez le temps de migration dans les deux cas (avec vs. sans wrapper).",
        "Pourquoi vendoriser (copier le code d'une lib dans son propre dépôt) est-il presque toujours une mauvaise décision, et dans quel cas exceptionnel est-ce justifiable ?",
      ],
    }),
    liensCommonaute: coNode({
      id: "liensCommonaute",
      label: "Liens sociaux et communautaires",
      icon: "🤝",
      kind: "humain",
      niveau: "Intermédiaire",
      why: "Un développeur qui résout des problèmes seul accumule une dette sociale : il ne connaît pas les personnes qui pourraient l'aider, ne sait pas qui a rencontré son problème avant lui, et ne peut pas s'appuyer sur la confiance accumulée pour obtenir de l'aide rapidement. Les liens sociaux dans les communautés techniques ne sont pas de la 'networking' au sens superficiel — ce sont des relations de confiance construites autour de problèmes réels et de solutions partagées, qui se manifestent concrètement quand un problème urgent dépasse vos compétences actuelles.",
      system:
        "Les liens communautaires amplifient l'impact des ressources collaboratives — une documentation est utile, mais un mainteneur qui vous répond directement parce qu'il vous connaît est transformateur. <span class=\"ref-fiche\">→ Co01</span> : les dynamiques de confiance et de feedback au sein d'une équipe s'étendent naturellement vers les communautés externes — la capacité à donner et recevoir du feedback bienveillant s'apprend dans les deux contextes. <span class=\"ref-fiche\">→ Co05</span> : cartographier les parties prenantes de son environnement professionnel inclut les acteurs communautaires — un mainteneur d'une lib critique est une partie prenante de votre projet.",
      choice:
        "Investir dans les liens communautaires en ligne vs. en présentiel. En ligne : scalable, permanent (les conversations restent cherchables), accessible à tous les niveaux. Limite : les liens sont plus faibles, la confiance se construit plus lentement. En présentiel (meetups, hackathons, conférences) : liens plus forts créés rapidement, contexte plus riche, opportunités professionnelles plus directes. Limite : coûteux en temps et argent, géographiquement contraint. Stratégie optimale pour un junior : en ligne pour la découverte et les questions techniques, en présentiel pour les liens professionnels et le mentorat.",
      senior:
        "Les liens communautaires qui ont le plus de valeur professionnelle ne sont pas les plus populaires — ce sont les plus profonds. Connaître superficiellement 500 personnes dans une communauté vaut moins que connaître vraiment 20 personnes avec qui vous avez résolu des problèmes réels. La façon de construire ces liens profonds : contribuer régulièrement sur la durée, répondre aux questions des mêmes personnes, partager vos échecs autant que vos succès. Les liens bâtis sur la vulnérabilité sont plus solides que ceux bâtis sur la démonstration.",
      errors: `<p><strong>Pattern 1 — Networking utilitaire :</strong> Le développeur ne contacte la communauté que quand il a besoin de quelque chose (job, recommandation, aide urgente). Conséquence : les demandes arrivent sans réciprocité préalable, les gens s'en souviennent, et l'aide est moins disponible quand elle est vraiment nécessaire.</p><p><strong>Pattern 2 — Visibilité sans substance :</strong> Le développeur construit une présence en ligne (blog, Twitter/X, LinkedIn) basée sur du contenu générique et des opinions sans profondeur. Conséquence : la visibilité ne génère pas de liens de confiance — les personnes qui comptent dans une communauté technique reconnaissent facilement le contenu de surface.</p><p><strong>Pattern 3 — Communauté comme échappatoire :</strong> Le développeur s'implique massivement dans les communautés externes pour fuir des problèmes non résolus dans son équipe. Conséquence : les relations communautaires deviennent une procrastination et les problèmes d'équipe s'aggravent — l'énergie investie à l'extérieur manque à l'intérieur.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les plateformes, les formats de communauté (en ligne, présentiel, hybride), les cultures selon les pays et les domaines techniques. <strong>Ce qui ne change pas :</strong> les liens communautaires de valeur se construisent par la réciprocité sur la durée — aider avant de demander, contribuer avant de prendre. Cette dynamique est indépendante de la plateforme et de la culture.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Cartographier et activer son réseau communautaire",
            etapes: [
              "Listez 10 personnes de la communauté technique (online ou présentiel) avec qui vous avez eu une interaction réelle (question, réponse, conversation).",
              "Pour chaque personne, notez : contexte de la rencontre, dernier échange, si vous avez contribué à leur résoudre un problème ou s'ils ont contribué aux vôtres.",
              "Identifiez les 3 liens les plus faibles (peu d'échanges réciproques) et les 3 plus forts (réciprocité établie).",
              "Pour l'un des liens faibles, trouvez une façon concrète de contribuer à cette personne cette semaine (répondre à une question publique, partager un de ses contenus avec un commentaire de valeur).",
            ],
            output:
              "Carte de réseau de 10 personnes avec évaluation de la réciprocité + une action concrète réalisée.",
            critere:
              "L'action concrète doit être désintéressée — contribuer quelque chose sans rien demander en retour. Si vous cherchez un bénéfice immédiat, ce n'est pas de la réciprocité, c'est de l'échange commercial.",
          },
        ],
        piege:
          "Chercher à augmenter la taille du réseau plutôt que la profondeur des liens — 10 relations réelles valent plus que 500 connections LinkedIn sans substance.",
      },
      verification: [
        "Pourquoi les liens construits dans des contextes de résolution de problèmes réels sont-ils structurellement plus solides que ceux construits dans des contextes de networking formel ?",
        "Vous avez besoin d'aide urgente pour déboguer un problème d'infrastructure que vous n'arrivez pas à résoudre après 2 jours. Vous n'avez jamais participé à aucune communauté en ligne. Décrivez comment cette situation aurait été différente si vous aviez investi 30 minutes par semaine dans une communauté pendant 6 mois.",
        "En quoi l'investissement dans les liens communautaires est-il différent du networking professionnel traditionnel, et pourquoi cette distinction change-t-elle la façon d'y investir du temps ?",
      ],
    }),
    optimisationUsage: coNode({
      id: "optimisationUsage",
      label: "Optimiser l'usage des ressources",
      icon: "⚡",
      kind: "organisation",
      niveau: "Avancé",
      why: "Une équipe qui utilise mal les ressources collaboratives peut paradoxalement être plus lente qu'une équipe qui n'en utilise pas. Trop de dépendances créent de la complexité. Chercher dans trop de sources crée de la confusion. Participer à trop de communautés dilue l'attention. L'optimisation n'est pas 'd'utiliser plus' — c'est d'utiliser précisément ce qui apporte de la valeur réelle, au bon moment, avec la bonne intention.",
      system:
        "L'optimisation de l'usage est la couche méta : elle évalue en continu si les ressources utilisées créent plus de valeur qu'elles n'en consomment. <span class=\"ref-fiche\">→ Co10</span> : les métriques d'équipe (cycle time, lead time) sont les indicateurs permettant de mesurer si l'utilisation des ressources collaboratives améliore réellement la vitesse et la qualité de livraison. <span class=\"ref-fiche\">→ Co15</span> : le calcul du ROI des dépendances et l'encapsulation saine sont deux pratiques d'optimisation concrètes — cette fiche élargit à l'ensemble du système de ressources collaboratives.",
      choice:
        "Évaluation périodique vs. évaluation continue. Évaluation périodique (trimestrielle) : audit de toutes les dépendances, des communautés actives, des ressources de documentation utilisées. Moins de friction, permet de voir les tendances. Évaluation continue : chaque nouvelle dépendance est évaluée avant ajout, chaque décision d'utilisation d'une ressource est consciente. Plus de rigueur, mais overhead cognitif élevé. Compromis optimal : évaluation continue pour les nouvelles additions (seuil d'entrée élevé), évaluation trimestrielle pour le stock existant.",
      senior:
        "L'optimisation la plus impactante n'est pas de mieux utiliser les ressources existantes — c'est de supprimer celles qui ne valent plus leur coût. Une dépendance installée pour une feature supprimée, une communauté suivie par habitude sans valeur réelle, une documentation bookmarkée mais jamais consultée — ces ressources ont un coût caché (mise à jour, attention, charge mentale). La règle de l'objet dans le placard s'applique : si vous ne l'avez pas utilisé en 6 mois, posez-vous la question de sa valeur.",
      errors: `<p><strong>Pattern 1 — Accumulation sans audit :</strong> L'équipe ajoute des dépendances sans jamais en supprimer. Le package.json grossit de 50 dépendances par an. Conséquence : le build ralentit, la surface d'attaque de sécurité s'élargit, le onboarding des nouveaux développeurs se complexifie sans valeur proportionnelle.</p><p><strong>Pattern 2 — FOMO communautaire :</strong> Le développeur suit toutes les nouvelles communautés, tous les nouveaux outils, toutes les nouvelles libs par peur de rater quelque chose d'important. Conséquence : attention fragmentée, aucune ressource utilisée profondément, sentiment permanent de retard sur 'ce qui se fait'.</p><p><strong>Pattern 3 — Ressource cargo cult :</strong> L'équipe utilise une lib ou une pratique parce que 'les grandes entreprises le font' sans évaluer si le contexte s'applique. Conséquence : complexité inadaptée à la taille du projet, temps investi dans une infrastructure qui n'apporte aucune valeur à ce stade.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les métriques d'évaluation selon le contexte (startup vs. enterprise), les cycles d'audit (mensuel, trimestriel, annuel), les outils d'analyse. <strong>Ce qui ne change pas :</strong> toute ressource collaborative a un coût d'usage (intégration, maintenance, attention). Ce coût doit être inférieur à la valeur produite. Cette équation doit être réévaluée périodiquement — une ressource utile aujourd'hui peut devenir un fardeau demain.</p>`,
      practice: {
        kind: "exercices",
        items: [
          {
            titre: "Audit trimestriel des ressources collaboratives",
            etapes: [
              "Listez toutes les dépendances npm/pip non utilisées depuis 3 mois (npm-check ou pip-autoremove peuvent aider).",
              "Listez toutes les communautés (Discord, Slack, forums) dont vous êtes membre. Pour chacune, notez la dernière fois que vous avez eu une interaction de valeur.",
              "Identifiez les ressources (docs, wikis, bookmarks) que vous n'avez pas consultées depuis 3 mois.",
              "Prenez des décisions : supprimer les dépendances non utilisées, quitter les communautés sans valeur, archiver les bookmarks périmés.",
              "Mesurez l'impact : temps de build, charge mentale, clarté du package.json.",
            ],
            output:
              "Liste de ressources supprimées (dépendances, communautés, bookmarks) + impact mesuré sur un indicateur concret.",
            critere:
              "L'audit doit aboutir à des suppressions réelles, pas seulement à des listes. Une suppression est meilleure qu'un plan de suppression.",
          },
        ],
        piege:
          "Garder une ressource 'au cas où' — si elle n'a pas été utilisée en 3 mois et qu'il n'y a pas de projet concret prévu, le 'au cas où' est une rationalisation.",
      },
      verification: [
        "Quels sont les trois types de coûts cachés d'une dépendance ou ressource collaborative que les équipes sous-estiment systématiquement ?",
        "Votre projet a 180 dépendances npm directes et transitives. Le build prend 8 minutes. Le dernier audit de sécurité a révélé 12 vulnérabilités critiques dans des dépendances non mises à jour. Par où commencez-vous l'optimisation et selon quelle priorité ?",
        "Pourquoi 'utiliser plus de ressources collaboratives' n'est-il pas équivalent à 'mieux collaborer', et quelle métrique permet de distinguer les deux ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "gainsReels", x: 10, y: 100, w: 130, h: 65 },
        { id: "bonnesPratiquesContribution", x: 200, y: 40, w: 165, h: 65 },
        { id: "reutilisationSaine", x: 200, y: 165, w: 165, h: 65 },
        { id: "liensCommonaute", x: 440, y: 100, w: 140, h: 65 },
        { id: "optimisationUsage", x: 650, y: 100, w: 140, h: 65 },
      ],
      edges: [
        { x1: 140, y1: 120, x2: 198, y2: 72, label: "mesure" },
        { x1: 140, y1: 145, x2: 198, y2: 197, label: "encadre" },
        { x1: 365, y1: 72, x2: 438, y2: 120, label: "renforce" },
        { x1: 365, y1: 197, x2: 438, y2: 145, label: "protège" },
        { x1: 580, y1: 132, x2: 648, y2: 132, label: "évalue" },
      ],
    },
  },
});
