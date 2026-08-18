import { prodNode, prodSheet } from "./production-common";

export const productionSecurite = prodSheet({
  id: "production-securite",
  number: 2,
  title: "Sécurité Applicative",
  subtitle:
    "Réduire la surface d'attaque, protéger les accès et traiter les dépendances comme du code critique.",
  badge: "Fiche P02",
  meta: ["5 nœuds"],
  readingTime: "40 min",
  description:
    "Modèle de sécurité, secrets, auth, OWASP et dépendances pour penser la protection comme un système.",
  accent: "securite",
  nodes: {
    modeleSecurite: prodNode({
      id: "modeleSecurite",
      label: "Modèle de sécurité",
      icon: "🛡",
      kind: "securite",
      niveau: "Fondation",
      why: "La sécurité n'est pas une checklist. C'est un raisonnement sur ce qu'on protège, contre qui, par quelles couches et avec quelles limites.",
      system:
        "Le modèle de sécurité donne du sens à la gestion des secrets, à l'authentification, à l'autorisation, aux vulnérabilités OWASP et aux dépendances.",
      choice:
        "Les trois réflexes sont defense in depth, moindre privilège et threat modeling. On réduit d'abord la surface d'attaque, puis on protège ce qui reste exposé.",
      senior:
        "Il voit chaque endpoint public, permission, secret, webhook et dépendance comme une surface d'attaque. Un endpoint inexistant ne peut pas être attaqué.",
      errors: `<p><strong>Pattern 1 — Sécurité par obscurité :</strong> croire qu'une API interne n'a pas besoin de contrôle.</p><p><strong>Pattern 2 — Tout ou rien :</strong> ne rien faire parce que la sécurité parfaite n'existe pas.</p><p><strong>Pattern 3 — Sécurité en fin de projet :</strong> sécuriser après coup une architecture qui ne s'y prête pas.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les vecteurs d'attaque. <strong>Ce qui ne change pas :</strong> réduire la surface, limiter les privilèges et multiplier les couches reste valide.</p>`,
      practice: {
        kind: "exercices",
        titre: "Cartographier sa surface d'attaque",
        etapes: [
          "Liste les points d'entrée externes: APIs, formulaires, uploads, webhooks.",
          "Pour chacun, note les données reçues, permissions nécessaires et données modifiées.",
          "Liste les secrets et qui peut y accéder.",
          "Identifie les 2 risques prioritaires et les protections actuelles.",
        ],
        output: "Carte de surface d'attaque avec points d'entrée, secrets et risques prioritaires.",
        critere:
          "Une app web standard expose toujours plusieurs surfaces; si tu n'en vois qu'une, l'audit est trop superficiel.",
        piege:
          "Penser que la sécurité appartient à quelqu'un d'autre. Chaque développeur sécurise le code qu'il écrit.",
      },
      verification: [
        "Pourquoi defense in depth est supérieur à une seule défense robuste ?",
        "Donne un exemple concret de moindre privilège pour un token.",
        "Pourquoi une API cachée n'est-elle pas sécurisée ?",
      ],
    }),
    secretsConfig: prodNode({
      id: "secretsConfig",
      label: "Secrets et configuration",
      icon: "🔐",
      kind: "securite",
      niveau: "Fondation",
      why: "Un secret dans le code source est un secret compromis. Git conserve l'historique, les clones se multiplient, et un dépôt privé n'est jamais un coffre-fort.",
      system:
        "Les secrets sont la première ligne de défense et s'appuient sur les variables d'environnement, puis sur des gestionnaires dédiés quand l'équipe grandit.",
      choice:
        "Variables d'environnement au minimum, Doppler, Infisical ou 1Password Secrets pour l'équipe, Vault pour les contraintes fortes de conformité.",
      senior:
        "Il impose rotation et moindre privilège. Si un secret apparaît dans Git, son ordre d'action est non négociable: révoquer la clé, déployer une nouvelle clé, vérifier les accès, puis seulement nettoyer l'historique. Nettoyer Git avant révocation donne une fausse impression de sécurité.",
      errors: `<p><strong>Pattern 1 — Secret en dur :</strong> une clé API commitée reste dans l'historique.</p><p><strong>Pattern 2 — Secret partagé :</strong> une seule clé pour tous les services rend l'impact maximal.</p><p><strong>Pattern 3 — Secrets jamais rotés :</strong> la fenêtre d'exposition devient infinie.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les outils de secret management. <strong>Ce qui ne change pas :</strong> plus un secret est distribué, plus il est probablement compromis.</p>`,
      practice: {
        kind: "cmds",
        commands: [
          { type: "comment", value: "Scanner les secrets avant push" },
          {
            type: "cmd",
            value: "npm install --save-dev secretlint @secretlint/secretlint-rule-preset-recommend",
          },
          { type: "cmd", value: 'npx secretlint "**/*"' },
          { type: "comment", value: "Scanner l'historique Git" },
          {
            type: "cmd",
            value:
              'docker run --rm -v "$PWD:/repo" trufflesecurity/trufflehog:latest git file:///repo --only-verified',
          },
          {
            type: "comment",
            value:
              "Secret commité: révoquer d'abord, remplacer ensuite, nettoyer l'historique après",
          },
        ],
        debt: "Secrets jamais rotés = compromission passée indétectable.",
      },
      verification: [
        "Une clé supprimée au commit suivant est-elle encore compromise ?",
        "Pourquoi chaque service doit-il avoir ses propres credentials ?",
        "Quand passer d'env vars à un gestionnaire de secrets ?",
      ],
    }),
    authnAuthz: prodNode({
      id: "authnAuthz",
      label: "Authentification et autorisation",
      icon: "🔑",
      kind: "securite",
      niveau: "Intermédiaire",
      why: "L'authentification répond à qui es-tu. L'autorisation répond à qu'as-tu le droit de faire. Confondre les deux crée des failles directes.",
      system:
        "L'auth protège les endpoints, les données et les opérations. Elle doit être appliquée côté serveur à chaque requête sensible.",
      choice:
        "JWT pour APIs stateless, sessions serveur pour apps traditionnelles, OAuth/OIDC ou providers comme Clerk, Auth0 ou Supabase Auth pour déléguer le risque.",
      senior:
        "Il ne fait jamais confiance au client. Cacher un bouton n'empêche pas l'appel direct de l'API. Sur un JWT, il vérifie la signature, l'expiration, l'audience, l'issuer et l'algorithme attendu; il sait aussi qu'un JWT compromis reste valide jusqu'à expiration sans liste de révocation.",
      errors: `<p><strong>Pattern 1 — Autorisation côté client :</strong> l'API reste ouverte même si le bouton est caché.</p><p><strong>Pattern 2 — JWT mal validé :</strong> signature vérifiée mais expiration, audience ou issuer ignorés.</p><p><strong>Pattern 3 — IDOR :</strong> changer un ID dans l'URL donne accès à la ressource d'un autre utilisateur.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> JWT, sessions, OAuth et providers. <strong>Ce qui ne change pas :</strong> identité et permission sont deux contrôles distincts.</p>`,
      practice: {
        kind: "cmds",
        commands: [
          { type: "comment", value: "Middleware JWT — Express" },
          { type: "cmd", value: "npm install jsonwebtoken" },
          { type: "snippet", value: 'const token = req.headers.authorization?.split(" ")[1]' },
          {
            type: "snippet",
            value:
              'const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"], audience: "api", issuer: "auth" })',
          },
          { type: "comment", value: "Autorisation dans le handler" },
          {
            type: "snippet",
            value:
              "if (resource.ownerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' })",
          },
          { type: "comment", value: "401 = non authentifié ; 403 = authentifié mais non autorisé" },
        ],
        debt: "IDOR non vérifié = fuite de données entre utilisateurs.",
      },
      verification: [
        "Quelle faille naît d'une confusion authn/authz ?",
        "Comment empêcher l'accès à /api/orders/456 par le mauvais utilisateur ?",
        "Pourquoi cacher un bouton ne suffit jamais ?",
      ],
    }),
    owaspTop10: prodNode({
      id: "owaspTop10",
      label: "OWASP Top 10",
      icon: "⚠",
      kind: "securite",
      niveau: "Intermédiaire",
      why: "L'OWASP Top 10 concentre les risques web les plus critiques observés en conditions réelles. Le connaître, c'est savoir où investir en priorité.",
      system:
        "Les catégories OWASP relient les décisions de code aux risques de production: injection, broken access control, crypto failures, auth failures et logging failures.",
      choice:
        "Pour débuter: A01 Broken Access Control, A02 Crypto Failures, A03 Injection, A07 Auth Failures et A09 Logging/Monitoring Failures.",
      senior:
        "Il traite Broken Access Control en priorité absolue parce qu'il est A01 dans l'OWASP Top 10 2021: le bug n'est souvent pas spectaculaire, juste un contrôle de propriété oublié. Injection reste critique, mais le premier réflexe de garde est de vérifier qui peut accéder à quelle ressource.",
      errors: `<p><strong>Pattern 1 — SQL concaténé :</strong> l'entrée utilisateur devient du code.</p><p><strong>Pattern 2 — Mots de passe faibles ou en clair :</strong> la fuite de DB devient fuite de comptes.</p><p><strong>Pattern 3 — Pas de rate limiting :</strong> les endpoints de login acceptent la force brute.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les frameworks et langages. <strong>Ce qui ne change pas :</strong> toute entrée utilisateur non validée est un vecteur d'attaque.</p>`,
      practice: {
        kind: "cmds",
        commands: [
          { type: "comment", value: "Audit sécurité npm" },
          { type: "cmd", value: "npm audit" },
          { type: "cmd", value: "npm audit fix" },
          {
            type: "comment",
            value:
              "Éviter npm audit fix --force sans revue: il peut introduire des breaking changes",
          },
          { type: "comment", value: "Requête paramétrée avec ORM" },
          { type: "snippet", value: "prisma.user.findUnique({ where: { id: userId } })" },
          { type: "comment", value: "Hash mot de passe" },
          { type: "cmd", value: "npm install bcrypt" },
          { type: "snippet", value: "const hash = await bcrypt.hash(password, 12)" },
        ],
        debt: "Audit sécurité absent en CI = vulnérabilités connues qui passent en production.",
      },
      verification: [
        "Explique l'injection SQL et comment l'ORM l'évite.",
        "Pourquoi bcrypt est-il préférable à MD5 pour les mots de passe ?",
        "Pourquoi Broken Access Control reste-t-il si fréquent ?",
      ],
    }),
    dependances: prodNode({
      id: "dependances",
      label: "Sécurité des dépendances",
      icon: "📦",
      kind: "securite",
      niveau: "Intermédiaire",
      why: "Une application moderne exécute beaucoup de code tiers. Une vulnérabilité dans une dépendance devient une vulnérabilité dans l'application.",
      system:
        "La sécurité des dépendances appartient au cycle de développement et à la CI/CD. Dependabot, audits et lock files réduisent le risque de supply chain.",
      choice:
        "npm audit ou pip-audit pour détecter, Dependabot ou Renovate pour ouvrir les PRs, Snyk pour un suivi plus complet.",
      senior:
        "Il surveille autant les dépendances transitives que directes. Le lock file est une mesure de sécurité: il empêche les changements silencieux d'arbre de dépendances.",
      errors: `<p><strong>Pattern 1 — Dépendances jamais mises à jour :</strong> les CVE s'accumulent.</p><p><strong>Pattern 2 — Installer pour une fonction triviale :</strong> chaque paquet ajoute une surface d'attaque.</p><p><strong>Pattern 3 — Lock file absent :</strong> les transitives changent sans intention.</p>`,
      invariants: `<p><strong>Ce qui change :</strong> les écosystèmes packages. <strong>Ce qui ne change pas :</strong> tout code externe exécuté dans notre contexte devient notre responsabilité.</p>`,
      practice: {
        kind: "cmds",
        commands: [
          { type: "comment", value: "Audit dépendances" },
          { type: "cmd", value: "npm audit" },
          { type: "cmd", value: "npm audit fix" },
          { type: "cmd", value: "pip install pip-audit" },
          { type: "cmd", value: "pip-audit" },
          { type: "comment", value: "Dependabot hebdomadaire dans .github/dependabot.yml" },
          { type: "snippet", value: "version: 2" },
          { type: "snippet", value: "updates:" },
          { type: "snippet", value: '  - package-ecosystem: "npm"' },
          { type: "snippet", value: '    directory: "/"' },
          { type: "snippet", value: "    schedule:" },
          { type: "snippet", value: '      interval: "weekly"' },
        ],
        debt: "Dependabot absent = vulnérabilités découvertes manuellement ou jamais.",
      },
      verification: [
        "Quelle différence entre dépendance directe et transitive ?",
        "Que fais-tu face à une CVE critique dans une dépendance ?",
        "Pourquoi commiter le lock file améliore la sécurité ?",
      ],
    }),
  },
  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "modeleSecurite", x: 10, y: 100, w: 155, h: 65 },
        { id: "secretsConfig", x: 215, y: 100, w: 145, h: 65 },
        { id: "authnAuthz", x: 415, y: 40, w: 155, h: 65 },
        { id: "owaspTop10", x: 415, y: 165, w: 140, h: 65 },
        { id: "dependances", x: 625, y: 100, w: 170, h: 65 },
      ],
      edges: [
        { x1: 165, y1: 132, x2: 213, y2: 132, label: "protège" },
        { x1: 360, y1: 112, x2: 413, y2: 72, label: "contrôle" },
        { x1: 360, y1: 150, x2: 413, y2: 188, label: "prévient" },
        { x1: 570, y1: 73, x2: 623, y2: 118, label: "expose" },
        { x1: 555, y1: 200, x2: 623, y2: 152, label: "expose" },
      ],
    },
  },
});
