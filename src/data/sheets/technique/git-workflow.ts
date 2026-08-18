import type { DevSheet } from "../../schema";

export const gitWorkflow: DevSheet = {
  id: "git-workflow",
  part: "T",
  number: 5,
  title: "Git Workflow",
  subtitle: "Passer du versioning local au travail collaboratif propre",
  badge: "Fiche T05",
  meta: ["7 nœuds"],
  category: "Technique",
  level: "Junior",
  readingTime: "30 min",
  description:
    "Branching, Pull Requests, review, conflits, merge et historique propre dans un workflow Git d'équipe.",
  accent: "vcs",
  tabs: [{ id: "workflow", label: "Workflow" }],
  nodes: {
    branches: {
      id: "branches",
      label: "Branches",
      icon: "⑂",
      kind: "vcs",
      osLabel: "Git",
      sections: {
        why: `<p>Travailler directement sur <code>main</code> mélange le code stable et le code en cours. Une branche crée un espace de travail isolé pour une intention précise : corriger un bug, ajouter une fonctionnalité, préparer une refactorisation. Elle permet d'avancer sans casser la version de référence.</p>`,
        system: `<p>La branche part de <code>main</code>, reçoit des commits atomiques, puis devient une Pull Request. Elle est la base du workflow collaboratif : CI, review, discussion et merge s'organisent autour d'elle.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Pour débuter, trunk-based simple : <code>main</code> reste stable, branches courtes, merge rapide. Git Flow est plus lourd et utile surtout avec releases longues. La règle : une branche = une intention.</p>`,
          alternatives: [
            { name: "feature branch", description: "Défaut pour une fonctionnalité ou un bug." },
            { name: "trunk-based", description: "Branches courtes, intégration fréquente." },
            { name: "Git Flow", description: "Plus lourd, adapté à cycles de release structurés." },
          ],
        },
        senior: `<p>Il crée une branche depuis un <code>main</code> à jour. Il nomme la branche selon le travail : <code>feat/auth-login</code>, <code>fix/payment-timeout</code>. Il évite les branches longues qui accumulent conflits et dérive.</p>`,
        errors: `<p><strong>Pattern 1 — Branche fourre-tout :</strong> plusieurs sujets dans une même branche.</p><p><strong>Pattern 2 — Branche trop longue :</strong> conflit massif au moment du merge.</p><p><strong>Pattern 3 — Travail sur main :</strong> pas d'isolation, pas de review propre.</p>`,
        invariants: `<p>Une branche est une hypothèse de changement isolée. Elle doit rester courte, lisible et rattachée à une intention. Ce principe ne dépend pas de GitHub ou GitLab.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "git switch main" },
            { type: "cmd", value: "git pull --ff-only" },
            { type: "cmd", value: "git switch -c feat/auth-login" },
            { type: "cmd", value: "git branch --show-current" },
          ],
          debt: "Branches longues → conflits, review impossible, intégration tardive.",
        },
        verification: [
          "Quel problème concrètement surgit quand plusieurs intentions différentes cohabitent dans un même espace de travail partagé ?",
          "Tu travailles sur une feature dans la branche `feature/login`. Ton collègue a mergé 3 commits sur `main` depuis que tu as branché. `git status` montre 0 changements en attente de ton côté. Quelle séquence de commandes tu exécutes pour intégrer ces 3 commits dans ta branche, et pourquoi dans cet ordre ?",
          "Pourquoi une branche courte rattachée à une seule intention reste-t-elle un principe valable quel que soit le gestionnaire de code source utilisé ?",
        ],
      },
    },
    commits: {
      id: "commits",
      label: "Commits",
      icon: "✍",
      kind: "vcs",
      osLabel: "Git",
      sections: {
        why: `<p>Un commit cristallise une intention. Dans un workflow d'équipe, l'historique n'est pas juste une sauvegarde : c'est une documentation de décisions. Des commits propres rendent les reviews, reverts et audits possibles.</p>`,
        system: `<p>Les commits alimentent la PR, déclenchent la CI, et deviennent l'historique final après merge. Ils doivent être assez petits pour être compris et assez complets pour représenter un changement cohérent.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Conventional Commits reste le meilleur défaut : <code>feat</code>, <code>fix</code>, <code>docs</code>, <code>refactor</code>, <code>test</code>, <code>chore</code>. On peut squash au merge pour nettoyer l'historique si l'équipe préfère.</p>`,
          alternatives: [
            { name: "Commits atomiques", description: "Chaque commit porte une intention." },
            { name: "Squash merge", description: "Une PR devient un commit propre." },
            { name: "Rebase interactif", description: "Nettoyer avant review ou merge." },
          ],
        },
        senior: `<p>Il vérifie <code>git diff --staged</code> avant chaque commit. Il utilise <code>git add -p</code> pour éviter les commits qui mélangent plusieurs sujets.</p>`,
        errors: `<p><strong>Pattern 1 — WIP permanent :</strong> historique illisible.</p><p><strong>Pattern 2 — Commit géant :</strong> review pénible, revert impossible.</p><p><strong>Pattern 3 — git add . aveugle :</strong> fichiers temporaires et logs dans l'historique.</p>`,
        invariants: `<p>Un commit doit être lisible, intentionnel et réversible. Le format change, l'exigence reste.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "git status" },
            { type: "cmd", value: "git add -p" },
            { type: "cmd", value: "git diff --staged" },
            { type: "cmd", value: 'git commit -m "feat(auth): add login form"' },
          ],
          debt: "Historique sale → reviews lentes et reverts dangereux.",
        },
        verification: [
          "Quelle propriété doit respecter un enregistrement de changement pour qu'il soit utile à relire six mois plus tard ?",
          "Tu utilises `git add .` sans vérification préalable : cite deux types de fichiers qui peuvent entrer dans l'historique et l'impact concret sur une PR.",
          "Pourquoi l'exigence d'un historique atomique et lisible s'applique-t-elle quelle que soit la convention de nommage choisie ?",
        ],
      },
    },
    push: {
      id: "push",
      label: "Push",
      icon: "↑",
      kind: "vcs",
      osLabel: "Remote",
      sections: {
        why: `<p>Un commit local n'existe que sur ta machine. Le push publie la branche sur le remote, déclenche la CI, sauvegarde le travail et rend la collaboration possible.</p>`,
        system: `<p>Le push relie Git local à GitHub. Une branche poussée peut ouvrir une Pull Request, recevoir des commentaires, être testée par CI et fusionnée.</p>`,
        choice: {
          kind: "structured",
          main: `<p>SSH est le défaut recommandé pour pousser sans friction. HTTPS fonctionne mais demande souvent tokens et configuration supplémentaire.</p>`,
          alternatives: [
            { name: "SSH", description: "Défaut fluide pour GitHub." },
            { name: "HTTPS", description: "Possible, mais souvent moins agréable." },
            { name: "Fork", description: "Pour contribuer à un dépôt sans accès direct." },
          ],
        },
        senior: `<p>Il pousse sa branche, jamais directement <code>main</code>. Il vérifie que la CI se lance après le push et corrige immédiatement si elle échoue.</p>`,
        errors: `<p><strong>Pattern 1 — Push sur main :</strong> contourne review et protection.</p><p><strong>Pattern 2 — Push sans pull :</strong> branche en retard, conflits évitables.</p><p><strong>Pattern 3 — CI rouge ignorée :</strong> dette transmise à l'équipe.</p>`,
        invariants: `<p>Le remote est l'espace partagé. Tout ce qui y arrive doit être intentionnel, traçable et vérifié.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "git push -u origin feat/auth-login" },
            { type: "cmd", value: "git remote -v" },
            { type: "cmd", value: "git fetch origin" },
          ],
          debt: "Branche locale non poussée → pas de backup, pas de review, pas de CI.",
        },
        verification: [
          "Pourquoi publier son travail local sur un espace partagé est-il une étape distincte du simple fait de sauvegarder ses modifications ?",
          "Tu exécutes `git push -u origin feat/auth-login` et la CI se lance automatiquement sur GitHub. Elle passe au rouge en 2 minutes sur le step `npm run lint`. Le code compilait sans erreur en local. Cite les 2 causes les plus probables et comment tu les vérifies.",
          "Pourquoi le principe de ne jamais pousser directement sur la branche principale reste-t-il valable même sur des projets solo ?",
        ],
      },
    },
    pr: {
      id: "pr",
      label: "Pull Request",
      icon: "PR",
      kind: "tool",
      osLabel: "GitHub",
      sections: {
        why: `<p>La Pull Request transforme une branche en conversation. Elle montre ce qui change, pourquoi, comment tester, et quels risques existent. Sans PR, le merge est un acte opaque.</p>`,
        system: `<p>La PR agrège commits, diff, CI, review, commentaires et décision de merge. Elle est la porte d'entrée vers <code>main</code>.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Une bonne PR est petite, ciblée et testable. Draft PR pour signaler un travail en cours. Ready for review quand le changement est cohérent et vérifié localement.</p>`,
          alternatives: [
            { name: "Draft PR", description: "Partager tôt sans demander validation finale." },
            { name: "Ready for review", description: "Demande explicite de relecture." },
            {
              name: "Stacked PRs",
              description: "Découper gros travail en petites PR dépendantes.",
            },
          ],
        },
        senior: `<p>Il écrit une description utile : contexte, solution, tests faits, captures si UI, risques. Il évite les PR massives et préfère plusieurs petites PR lisibles.</p>`,
        errors: `<p><strong>Pattern 1 — PR sans description :</strong> le reviewer doit deviner.</p><p><strong>Pattern 2 — PR énorme :</strong> review superficielle.</p><p><strong>Pattern 3 — Mélanger refactor et feature :</strong> diff impossible à analyser.</p>`,
        invariants: `<p>Une PR est une unité de revue. Elle doit être compréhensible par quelqu'un qui n'a pas vécu dans ta tête.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Description PR" },
            { type: "comment", value: "Contexte" },
            { type: "comment", value: "Changements" },
            { type: "comment", value: "Tests effectués" },
            { type: "comment", value: "Risques / limites" },
            {
              type: "cmd",
              value:
                'gh pr create --draft --title "feat(auth): add login form" --body "Contexte, changements, tests, risques"',
            },
          ],
          debt: "PRs trop grosses → bugs non vus, review lente, frustration.",
        },
        verification: [
          "Qu'est-ce qui rend un changement de code compréhensible par quelqu'un qui n'a pas participé à sa conception ?",
          "Tu ouvres une PR intitulée 'fix' avec 47 fichiers modifiés, aucune description, CI verte. En tant que reviewer, cite 3 informations indispensables que tu dois demander avant de pouvoir commencer la relecture.",
          "Pourquoi une Pull Request reste-t-elle pertinente comme unité de revue même si l'équipe utilise des outils différents (GitHub, GitLab, Gitea) ?",
        ],
      },
    },
    review: {
      id: "review",
      label: "Review",
      icon: "👁",
      kind: "tool",
      osLabel: "Collaboration",
      sections: {
        why: `<p>La review existe pour détecter bugs, risques et incohérences avant merge. Elle transmet aussi les conventions de l'équipe. Ce n'est pas un jugement de valeur sur la personne : c'est un mécanisme de qualité collective.</p>`,
        system: `<p>La review intervient après CI et avant merge. Elle commente le diff, demande des changements, approuve ou pose des questions. Elle complète les tests : les tests vérifient ce qui est automatisable, la review vérifie l'intention et le design.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Une review efficace sépare les bloquants des suggestions. Les commentaires doivent être précis, localisés, et expliquer le risque. Les préférences stylistiques doivent être automatisées par lint/format, pas débattues à la main.</p>`,
          alternatives: [
            { name: "Request changes", description: "Bug ou risque bloquant." },
            { name: "Comment", description: "Question ou suggestion non bloquante." },
            { name: "Approve", description: "Le changement peut être intégré." },
          ],
        },
        senior: `<p>Il review d'abord le comportement, puis l'architecture, puis les détails. Il cherche les bugs, les effets de bord, les tests manquants, les noms flous, les responsabilités mal placées.</p>`,
        errors: `<p><strong>Pattern 1 — Review esthétique :</strong> débats de formatage déjà gérables par outil.</p><p><strong>Pattern 2 — Commentaires vagues :</strong> "pas propre" sans explication.</p><p><strong>Pattern 3 — Approve automatique :</strong> la review devient décorative.</p>`,
        invariants: `<p>La review protège la branche principale et diffuse la connaissance. Elle doit être exigeante, respectueuse et orientée risque.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Checklist review" },
            { type: "comment", value: "Le comportement demandé est-il couvert ?" },
            { type: "comment", value: "Les tests sont-ils suffisants ?" },
            { type: "comment", value: "Les responsabilités sont-elles au bon endroit ?" },
            { type: "comment", value: "Y a-t-il un risque de régression ?" },
            { type: "cmd", value: "gh pr diff" },
          ],
          debt: "Review faible → main devient une zone de surprise.",
        },
        verification: [
          "Quelle distinction un reviewer doit-il faire entre un problème bloquant et une préférence personnelle lors d'une relecture de code ?",
          "Tu receives un commentaire de review : 'ce code n'est pas propre'. Qu'est-ce qui manque dans ce commentaire pour que tu puisses agir dessus, et quelle reformulation serait utile ?",
          "Pourquoi l'automatisation du style (lint/format) et la review humaine sont-elles complémentaires et non interchangeables ?",
        ],
      },
    },
    conflicts: {
      id: "conflicts",
      label: "Conflits",
      icon: "⚠",
      kind: "runtime",
      osLabel: "Git",
      sections: {
        why: `<p>Un conflit apparaît quand Git ne peut pas fusionner automatiquement deux modifications sur la même zone. Ce n'est pas une catastrophe : c'est Git qui demande à un humain de décider quelle intention garder.</p>`,
        system: `<p>Les conflits apparaissent pendant merge, rebase ou pull. Ils doivent être résolus localement, testés, puis committés. Plus une branche reste longtemps séparée, plus les conflits deviennent probables.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Merge conserve l'historique tel quel. Rebase rejoue tes commits sur une base plus récente et donne un historique plus linéaire. Pour débuter, merge est plus simple. Rebase est puissant mais demande prudence sur branches partagées.</p>`,
          alternatives: [
            { name: "merge main", description: "Simple, explicite, moins risqué." },
            {
              name: "rebase main",
              description: "Historique linéaire, attention branches partagées.",
            },
            {
              name: "résolution manuelle",
              description: "Choisir intention finale, pas juste supprimer marqueurs.",
            },
          ],
        },
        senior: `<p>Il lit le contexte métier avant de résoudre. Il ne choisit pas "ours" ou "theirs" aveuglément. Après résolution, il relance tests et lint, parce qu'un conflit résolu peut compiler mais casser le comportement.</p>`,
        errors: `<p><strong>Pattern 1 — Supprimer les marqueurs sans comprendre :</strong> code incohérent.</p><p><strong>Pattern 2 — Force push dangereux :</strong> réécrit le travail des autres.</p><p><strong>Pattern 3 — Pas de tests après conflit :</strong> intégration cassée.</p>`,
        invariants: `<p>Résoudre un conflit, c'est réconcilier deux intentions. La bonne résolution est celle qui préserve le comportement attendu, pas celle qui fait disparaître les chevrons.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "git fetch origin" },
            { type: "cmd", value: "git merge origin/main" },
            { type: "cmd", value: "git status" },
            { type: "cmd", value: "git add fichier-resolu" },
            { type: "cmd", value: "npm test  # ou pytest" },
          ],
          debt: "Branches longues → conflits plus gros. Intégrer main régulièrement.",
        },
        verification: [
          "Que signifie concrètement 'résoudre un conflit' au sens métier, par opposition à simplement faire disparaître les marqueurs Git ?",
          "Après `git merge origin/main`, Git marque `src/services/auth.ts` en conflit. Tu vois deux blocs : le tien ajoute une vérification d'email, celui de `main` modifie la même ligne pour renommer une variable. Quelle est la première action à faire avant d'éditer le fichier, et pourquoi ?",
          "Pourquoi tester le code après résolution d'un conflit reste-t-il indispensable même si la résolution paraît évidente ?",
        ],
      },
    },
    merge: {
      id: "merge",
      label: "Merge",
      icon: "✓",
      kind: "vcs",
      osLabel: "GitHub",
      sections: {
        why: `<p>Le merge intègre un changement validé dans la branche principale. C'est le moment où le travail cesse d'être une proposition et devient la version de référence.</p>`,
        system: `<p>Le merge arrive après CI verte, review approuvée, conflits résolus. Il déclenche souvent un déploiement ou une nouvelle étape de pipeline.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Merge commit préserve l'historique de branche. Squash merge produit un commit propre par PR. Rebase merge garde un historique linéaire. Pour un catalogue ou une petite équipe, squash merge est souvent lisible.</p>`,
          alternatives: [
            { name: "Merge commit", description: "Préserve tout l'historique de branche." },
            { name: "Squash merge", description: "Une PR = un commit final propre." },
            { name: "Rebase merge", description: "Historique linéaire sans commit de merge." },
          ],
        },
        senior: `<p>Il vérifie que la PR correspond encore à son intention initiale. Il supprime la branche après merge. Il surveille le déploiement ou la CI post-merge.</p>`,
        errors: `<p><strong>Pattern 1 — Merge CI rouge :</strong> main cassée par négligence.</p><p><strong>Pattern 2 — Merge sans review :</strong> pas de contrôle collectif.</p><p><strong>Pattern 3 — Branches jamais supprimées :</strong> remote encombré et ambigu.</p>`,
        invariants: `<p>Main doit rester stable. Le merge est une décision de confiance appuyée par tests, review et clarté du changement.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "CI verte" },
            { type: "cmd", value: "Review approuvée" },
            { type: "cmd", value: "Squash and merge" },
            { type: "cmd", value: "Delete branch" },
            { type: "cmd", value: "git switch main && git pull --ff-only" },
          ],
          debt: "Main instable → toute l'équipe ralentit. Protéger main avec checks obligatoires.",
        },
        verification: [
          "Quelle condition doit être remplie pour qu'intégrer un changement dans la branche principale soit une décision responsable ?",
          "Tu t'apprêtes à faire 'Squash and merge' sur une PR de 12 commits, CI verte, 1 approbation. En vérifiant le diff, tu remarques que le titre de PR ne correspond plus aux changements réels (la feature a évolué). Que fais-tu avant de cliquer, et pourquoi ?",
          "Pourquoi la stratégie de merge choisie (merge commit, squash, rebase) n'a pas d'impact sur l'exigence fondamentale que main reste dans un état stable et déployable ?",
        ],
      },
    },
  },
  maps: {
    workflow: {
      viewBox: "0 0 900 300",
      nodes: [
        { id: "branches", x: 20, y: 115, w: 110, h: 65 },
        { id: "commits", x: 175, y: 55, w: 110, h: 65 },
        { id: "push", x: 175, y: 175, w: 100, h: 65 },
        { id: "pr", x: 335, y: 115, w: 120, h: 65 },
        { id: "review", x: 510, y: 55, w: 110, h: 65 },
        { id: "conflicts", x: 510, y: 175, w: 110, h: 65 },
        { id: "merge", x: 680, y: 115, w: 110, h: 65 },
      ],
      edges: [
        { x1: 130, y1: 135, x2: 173, y2: 88, label: "isole" },
        { x1: 130, y1: 160, x2: 173, y2: 207, label: "publie" },
        { x1: 285, y1: 88, x2: 333, y2: 135, label: "ouvre" },
        { x1: 275, y1: 207, x2: 333, y2: 160, label: "soumet" },
        { x1: 455, y1: 135, x2: 508, y2: 88, label: "approuve" },
        { x1: 455, y1: 160, x2: 508, y2: 207, label: "résout" },
        { x1: 620, y1: 88, x2: 678, y2: 135, label: "intègre" },
        { x1: 620, y1: 207, x2: 678, y2: 160, label: "intègre" },
      ],
    },
  },
};
