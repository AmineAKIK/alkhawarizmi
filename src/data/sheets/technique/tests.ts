import type { DevSheet } from "../../schema";
import { dualLanguageMaps } from "../common";

const testsMap = {
  viewBox: "0 0 900 300",
  nodes: [
    { id: "unitaires", x: 20, y: 115, w: 110, h: 65 },
    { id: "integration", x: 180, y: 55, w: 120, h: 65 },
    { id: "e2e", x: 180, y: 175, w: 100, h: 65 },
    { id: "mocks", x: 350, y: 55, w: 110, h: 65 },
    { id: "fixtures", x: 350, y: 175, w: 110, h: 65 },
    { id: "coverage", x: 520, y: 115, w: 120, h: 65 },
    { id: "ci", x: 700, y: 115, w: 100, h: 65 }
  ],
  edges: [
    { x1: 130, y1: 135, x2: 178, y2: 88 },
    { x1: 130, y1: 160, x2: 178, y2: 207 },
    { x1: 300, y1: 88, x2: 348, y2: 88 },
    { x1: 280, y1: 207, x2: 348, y2: 207 },
    { x1: 460, y1: 88, x2: 518, y2: 135 },
    { x1: 460, y1: 207, x2: 518, y2: 160 },
    { x1: 640, y1: 147, x2: 698, y2: 147 }
  ]
};

export const tests: DevSheet = {
  id: "tests",
  part: "T",
  number: 9,
  title: "Tests",
  subtitle: "Transformer la confiance en preuve exécutable",
  badge: "Fiche T09 — Vision Systémique",
  status: "Modèle stabilisé",
  meta: ["7 nœuds · 2 types", "7 sections / nœud"],
  category: "Technique",
  level: "Junior",
  readingTime: "35 min",
  description:
    "Une carte pour comprendre la stratégie de test : unitaires, intégration, E2E, mocks, fixtures, couverture et CI.",
  accent: "runtime",
  tabs: [
    { id: "js", label: "JS JavaScript" },
    { id: "python", label: "Python" }
  ],
  nodes: {
    unitaires: {
      id: "unitaires",
      label: "Unitaires",
      icon: "①",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Un test unitaire vérifie une petite unité de comportement isolée : une fonction, une méthode, un service sans dépendances réelles. Il existe pour détecter vite les régressions sur la logique pure. Sans tests unitaires, chaque refactoring devient risqué parce qu'on ne sait pas si le comportement attendu est encore respecté.</p>`,
        system: `<p>Les tests unitaires se placent au plus près de la logique métier : services, utilitaires, fonctions de calcul, validation. Ils ne démarrent pas de serveur, n'appellent pas de vraie base, ne dépendent pas du réseau. Ils doivent être rapides, nombreux, et lancés très souvent.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript : Vitest est recommandé pour projets modernes, Jest reste très répandu. Python : pytest est le standard. Le vrai choix n'est pas l'outil, mais ce qu'on teste : comportement observable, pas implémentation interne.</p>`,
          alternatives: [
            { name: "Vitest / Jest", description: "Runner, assertions, mocks et coverage côté JavaScript." },
            { name: "pytest", description: "Standard Python, simple et extensible." },
            { name: "unittest", description: "Inclus dans Python, plus verbeux." }
          ]
        },
        senior: `<p>Il suit AAA : Arrange, Act, Assert. Il teste les cas normaux, les cas limites, et les erreurs attendues. Il donne aux tests des noms qui décrivent le comportement métier. Un test doit expliquer ce que le code garantit, pas répéter le nom de la fonction.</p>`,
        errors: `<p><strong>Pattern 1 — Tester l'implémentation :</strong> le test casse au moindre refactoring même si le comportement est identique.</p><p><strong>Pattern 2 — Tests trop larges :</strong> un test unitaire démarre la base, le serveur et le réseau — ce n'est plus unitaire.</p><p><strong>Pattern 3 — Assertions faibles :</strong> tester seulement que "ça ne plante pas".</p>`,
        invariants: `<p>Un test unitaire doit être rapide, déterministe, isolé, et lisible. Ce qui change : framework et syntaxe. Ce qui ne change pas : il prouve une règle de comportement précise.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript" },
            { type: "cmd", value: "npm install --save-dev vitest" },
            { type: "cmd", value: "expect(calculateTotal([])).toBe(0)" },
            { type: "cmd", value: "npx vitest" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pip install pytest" },
            { type: "cmd", value: "assert calculate_total([]) == 0" },
            { type: "cmd", value: "pytest tests/unit/" }
          ],
          debt: "Logique métier sans tests unitaires → refactoring dangereux et bugs qui reviennent."
        }
      }
    },
    integration: {
      id: "integration",
      label: "Intégration",
      icon: "⇆",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Des unités correctes peuvent mal fonctionner ensemble. Un service peut appeler le mauvais repository, une route peut mal valider les données, une transaction peut échouer. Les tests d'intégration existent pour vérifier que plusieurs couches collaborent correctement.</p>`,
        system: `<p>Ils se placent entre unitaires et E2E. Ils testent route + validation + service, service + repository, ou repository + base de test. Ils utilisent parfois une vraie base locale ou éphémère, mais évitent de passer par toute l'interface utilisateur.</p>`,
        choice: {
          kind: "structured",
          main: `<p>La décision centrale : quelles dépendances réelles garder ? Pour tester une API, garder l'application réelle mais utiliser une base de test. Pour tester un service, mocker l'email externe mais garder le repository si l'accès aux données est critique.</p>`,
          alternatives: [
            { name: "API integration", description: "Tester les endpoints sans navigateur." },
            { name: "DB integration", description: "Tester repositories et migrations sur vraie base de test." },
            { name: "Contract integration", description: "Vérifier qu'un client et une API respectent le même contrat." }
          ]
        },
        senior: `<p>Il isole les données de test. Chaque test doit pouvoir tourner seul ou dans n'importe quel ordre. Il réinitialise la base entre tests ou utilise des transactions rollback. Il évite que les tests d'intégration deviennent une simulation E2E lente et fragile.</p>`,
        errors: `<p><strong>Pattern 1 — Base partagée sale :</strong> les tests dépendent de données laissées par d'autres tests.</p><p><strong>Pattern 2 — Trop de mocks :</strong> le test ne teste plus l'intégration réelle.</p><p><strong>Pattern 3 — Trop large :</strong> chaque test démarre toute l'application et devient lent.</p>`,
        invariants: `<p>Un test d'intégration vérifie un contrat entre couches. Il doit garder assez de réalité pour être utile, mais assez de contrôle pour rester fiable.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript API" },
            { type: "cmd", value: "npm install --save-dev supertest" },
            { type: "cmd", value: "await request(app).post('/api/v1/users').send(payload).expect(201)" },
            { type: "comment", value: "Python FastAPI" },
            { type: "cmd", value: "from fastapi.testclient import TestClient" },
            { type: "cmd", value: "client.post('/api/v1/users', json=payload)" },
            { type: "comment", value: "Base de test" },
            { type: "cmd", value: "DATABASE_URL=postgresql://localhost/app_test" }
          ],
          debt: "Tests d'intégration sans isolation des données → faux échecs et confiance détruite."
        }
      }
    },
    e2e: {
      id: "e2e",
      label: "E2E",
      icon: "🌐",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>Les tests unitaires et d'intégration prouvent des morceaux du système. Les tests end-to-end prouvent qu'un vrai parcours utilisateur fonctionne de bout en bout : ouvrir l'app, remplir un formulaire, cliquer, appeler l'API, persister en base, afficher le résultat.</p>`,
        system: `<p>Les E2E se placent au sommet de la pyramide de tests. Ils démarrent l'application comme un utilisateur réel la voit. Ils sont précieux mais coûteux : plus lents, plus fragiles, plus dépendants de l'environnement.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript/frontend : Playwright est le choix moderne, Cypress reste répandu. Backend pur : les E2E peuvent être des tests API complets plutôt que navigateur. Python peut aussi piloter Playwright via son binding officiel.</p>`,
          alternatives: [
            { name: "Playwright", description: "Moderne, multi-navigateurs, robuste." },
            { name: "Cypress", description: "Très utilisé côté frontend, excellent DX." },
            { name: "API E2E", description: "Parcours complet sans navigateur pour backend." }
          ]
        },
        senior: `<p>Il teste peu de parcours E2E, mais les plus critiques : login, paiement, création d'une ressource, workflow principal. Il évite de tester tous les cas limites en E2E : ils appartiennent aux unitaires/intégration. Il rend les sélecteurs stables avec <code>data-testid</code> ou rôles accessibles.</p>`,
        errors: `<p><strong>Pattern 1 — Trop d'E2E :</strong> suite lente, fragile, ignorée par l'équipe.</p><p><strong>Pattern 2 — Sélecteurs CSS fragiles :</strong> changement visuel = tests cassés.</p><p><strong>Pattern 3 — Dépendance à des services externes :</strong> paiement ou email réel dans les tests.</p>`,
        invariants: `<p>Un E2E valide un parcours métier critique. Il ne remplace pas les tests plus bas niveau. Ce qui change : l'outil. Ce qui ne change pas : peu d'E2E, mais très significatifs.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Playwright JS" },
            { type: "cmd", value: "npm init playwright@latest" },
            { type: "cmd", value: "npx playwright test" },
            { type: "cmd", value: "await page.getByRole('button', { name: 'Connexion' }).click()" },
            { type: "comment", value: "Playwright Python" },
            { type: "cmd", value: "pip install pytest-playwright" },
            { type: "cmd", value: "playwright install" }
          ],
          debt: "E2E trop nombreux ou instables → pipeline lent et contourné. Garder les E2E pour les chemins critiques."
        }
      }
    },
    mocks: {
      id: "mocks",
      label: "Mocks",
      icon: "🎭",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Tester une unité exige parfois de remplacer ses dépendances : base de données, email, paiement, API externe, horloge. Un mock est un substitut contrôlé. Il existe pour isoler le comportement testé et éviter qu'un test dépende d'un système lent, coûteux ou instable.</p>`,
        system: `<p>Les mocks se placent aux frontières : repositories mockés pour tester un service, client HTTP mocké pour tester une intégration, email service mocké pour vérifier qu'un email aurait été envoyé. Ils doivent être utilisés pour contrôler les dépendances, pas pour mentir au test.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Mock, stub, fake, spy : les nuances comptent. Stub retourne une valeur contrôlée. Spy observe un appel. Fake implémente une version simplifiée mais fonctionnelle. Mock vérifie une interaction. Plus le mock est proche de l'implémentation interne, plus le test devient fragile.</p>`,
          alternatives: [
            { name: "Stub", description: "Retourne une valeur connue." },
            { name: "Spy", description: "Observe qu'une fonction a été appelée." },
            { name: "Fake", description: "Implémentation légère, souvent plus réaliste qu'un mock." }
          ]
        },
        senior: `<p>Il mocke les dépendances externes, pas le code qu'il veut réellement tester. Il préfère tester le résultat observable plutôt que le nombre exact d'appels internes. Il sait qu'un excès de mocks peut faire passer des tests alors que le système réel ne marche pas.</p>`,
        errors: `<p><strong>Pattern 1 — Mocker tout :</strong> le test vérifie seulement que les mocks ont été appelés.</p><p><strong>Pattern 2 — Mock fragile :</strong> couplé aux détails internes d'une fonction.</p><p><strong>Pattern 3 — Pas de test réel complémentaire :</strong> mocks partout, aucune intégration pour vérifier les contrats.</p>`,
        invariants: `<p>Un mock est un outil d'isolation, pas une preuve que le système complet fonctionne. Il doit rendre un test plus précis, pas plus imaginaire.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Vitest" },
            { type: "cmd", value: "const repo = { findByEmail: vi.fn().mockResolvedValue(null) }" },
            { type: "cmd", value: "expect(repo.findByEmail).toHaveBeenCalledWith(email)" },
            { type: "comment", value: "pytest" },
            { type: "cmd", value: "from unittest.mock import Mock, AsyncMock" },
            { type: "cmd", value: "repo.find_by_email = AsyncMock(return_value=None)" }
          ],
          debt: "Trop de mocks → tests déconnectés du réel. Ajouter des tests d'intégration pour vérifier les contrats entre couches."
        }
      }
    },
    fixtures: {
      id: "fixtures",
      label: "Fixtures",
      icon: "🧱",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Un test a besoin de données connues. Si chaque test construit ses données à la main, le bruit masque l'intention. Les fixtures fournissent des objets, utilisateurs, états de base ou fichiers de test réutilisables, cohérents et nommés.</p>`,
        system: `<p>Les fixtures alimentent tous les niveaux : unitaires, intégration, E2E. Elles peuvent être en mémoire, en base, dans des factories, ou dans des fichiers. Elles créent un monde contrôlé dans lequel le test vérifie un comportement.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Pour petits projets : fixtures simples et factories légères. Pour projets plus gros : builders/factories comme factory_boy en Python ou fonctions factory en JS. Les fixtures doivent rester lisibles : trop de magie rend les tests opaques.</p>`,
          alternatives: [
            { name: "Objet inline", description: "Simple pour un test unique." },
            { name: "Factory", description: "Réutilisable, personnalisable, bon défaut." },
            { name: "Seed DB", description: "Pour intégration/E2E avec base réelle." }
          ]
        },
        senior: `<p>Il crée des factories avec des valeurs par défaut réalistes et surcharge seulement ce qui compte pour le test. Il évite les fixtures globales énormes que tous les tests partagent. Il nomme les fixtures selon le scénario : <code>expiredToken</code>, <code>adminUser</code>, <code>emptyCart</code>.</p>`,
        errors: `<p><strong>Pattern 1 — Fixture géante globale :</strong> impossible de savoir quelle donnée influence quel test.</p><p><strong>Pattern 2 — Données irréalistes :</strong> tests passent avec des cas qui n'existent jamais en prod.</p><p><strong>Pattern 3 — Couplage entre tests :</strong> un test modifie une fixture utilisée par un autre.</p>`,
        invariants: `<p>Un test doit contrôler explicitement son monde. Les données de test doivent rendre l'intention plus claire, pas la cacher.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Factory JS" },
            { type: "cmd", value: "const buildUser = (overrides = {}) => ({ id: 1, email: 'a@test.com', ...overrides })" },
            { type: "comment", value: "pytest fixture" },
            { type: "cmd", value: "@pytest.fixture" },
            { type: "cmd", value: "def user(): return User(email='a@test.com')" },
            { type: "comment", value: "Usage" },
            { type: "cmd", value: "admin = buildUser({ role: 'admin' })" }
          ],
          debt: "Fixtures globales opaques → tests difficiles à lire et à maintenir. Préférer factories explicites."
        }
      }
    },
    coverage: {
      id: "coverage",
      label: "Coverage",
      icon: "%",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>La couverture mesure quelles lignes ou branches ont été exécutées par les tests. Elle ne prouve pas que les tests sont bons, mais elle révèle les zones totalement non testées. Sans coverage, on ne sait pas où les angles morts se cachent.</p>`,
        system: `<p>Le coverage est généré par le runner de tests et souvent publié en CI. Il donne une carte de risque : fichiers critiques non couverts, branches jamais exécutées, services sans tests. Il complète la revue de code, mais ne remplace pas le jugement.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Line coverage est facile à comprendre. Branch coverage est plus utile pour vérifier les chemins conditionnels. Un seuil peut empêcher une régression massive, mais un seuil trop strict pousse à écrire des tests artificiels.</p>`,
          alternatives: [
            { name: "Line coverage", description: "Pourcentage de lignes exécutées." },
            { name: "Branch coverage", description: "Vérifie les chemins if/else." },
            { name: "Mutation testing", description: "Plus avancé : vérifie si les tests détectent des mutations." }
          ]
        },
        senior: `<p>Il utilise le coverage comme signal, pas comme objectif absolu. 80% de couverture avec de bons tests vaut mieux que 100% de tests creux. Il regarde surtout les fichiers critiques : auth, paiement, validation, services métier.</p>`,
        errors: `<p><strong>Pattern 1 — Chasser le 100% :</strong> tests inutiles écrits pour satisfaire un chiffre.</p><p><strong>Pattern 2 — Ignorer les branches :</strong> happy path couvert, erreurs non testées.</p><p><strong>Pattern 3 — Seuil global trompeur :</strong> fichiers critiques non couverts cachés par fichiers simples très couverts.</p>`,
        invariants: `<p>Ce qui n'est jamais exécuté par les tests est un risque inconnu. Le coverage révèle ce risque, mais la qualité des assertions détermine la valeur réelle.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript" },
            { type: "cmd", value: "npx vitest --coverage" },
            { type: "cmd", value: "jest --coverage" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pip install pytest-cov" },
            { type: "cmd", value: "pytest --cov=src --cov-report=term-missing" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "Regarder les fichiers critiques non couverts" }
          ],
          debt: "Coverage absent → angles morts invisibles. Coverage idolâtré → tests creux."
        }
      }
    },
    ci: {
      id: "ci",
      label: "CI",
      icon: "✓",
      kind: "vcs",
      osLabel: "Universel",
      sections: {
        why: `<p>Des tests qui ne tournent que sur la machine d'un développeur ne protègent pas l'équipe. La CI exécute automatiquement les tests, lint, build et parfois coverage à chaque push ou Pull Request. Elle transforme la qualité en garde-fou collectif.</p>`,
        system: `<p>La CI se branche sur GitHub. Un push déclenche un workflow. Le workflow installe les dépendances, configure l'environnement, lance les scripts du projet, puis bloque ou autorise la fusion. Elle est la dernière ligne de défense avant que le code entre dans la branche principale.</p>`,
        choice: {
          kind: "structured",
          main: `<p>GitHub Actions est le choix naturel sur GitHub. Les jobs typiques : install, lint, test, build. Pour projets avec base, ajouter un service PostgreSQL/Redis. Le point essentiel : utiliser les mêmes scripts qu'en local.</p>`,
          alternatives: [
            { name: "GitHub Actions", description: "Défaut si le dépôt est sur GitHub." },
            { name: "GitLab CI", description: "Intégré à GitLab." },
            { name: "CI locale", description: "npm test / pytest avant commit, complément seulement." }
          ]
        },
        senior: `<p>Il garde la CI rapide. Il sépare jobs parallélisables : lint, tests unitaires, build. Il cache les dépendances quand utile. Il rend les messages d'échec lisibles pour que l'équipe répare vite. Il protège main avec des checks obligatoires.</p>`,
        errors: `<p><strong>Pattern 1 — CI différente du local :</strong> commandes divergentes, bugs impossibles à reproduire.</p><p><strong>Pattern 2 — CI lente :</strong> l'équipe attend ou contourne les checks.</p><p><strong>Pattern 3 — Checks non obligatoires :</strong> CI rouge mais merge possible.</p>`,
        invariants: `<p>La branche principale doit toujours être dans un état vérifié. Ce qui change : plateforme CI. Ce qui ne change pas : aucun changement non testé ne doit entrer silencieusement dans main.</p>`,
        practice: {
          commands: [
            { type: "comment", value: ".github/workflows/ci.yml" },
            { type: "cmd", value: "on: [push, pull_request]" },
            { type: "cmd", value: "npm ci" },
            { type: "cmd", value: "npm run lint" },
            { type: "cmd", value: "npm test" },
            { type: "cmd", value: "npm run build" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pip install -r requirements-dev.txt" },
            { type: "cmd", value: "pytest --cov=src" }
          ],
          debt: "Pas de CI obligatoire → main peut casser. CI trop lente → développeurs la contournent."
        }
      }
    }
  },
  maps: dualLanguageMaps(testsMap)
};
