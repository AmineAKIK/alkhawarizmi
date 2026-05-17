import type { DevSheet } from "../../schema";
import { dualLanguageMaps } from "../common";

const dataPersistenceMap = {
  viewBox: "0 0 860 300",
  nodes: [
    { id: "variables", x: 20, y: 115, w: 110, h: 65 },
    { id: "config", x: 175, y: 55, w: 110, h: 65 },
    { id: "validation", x: 175, y: 175, w: 120, h: 65 },
    { id: "database", x: 345, y: 115, w: 130, h: 65 },
    { id: "modeles", x: 535, y: 115, w: 110, h: 65 },
    { id: "migrations", x: 700, y: 55, w: 120, h: 65 },
    { id: "cache", x: 700, y: 175, w: 110, h: 65 }
  ],
  edges: [
    { x1: 130, y1: 135, x2: 173, y2: 88 },
    { x1: 130, y1: 160, x2: 173, y2: 207 },
    { x1: 285, y1: 88, x2: 343, y2: 135 },
    { x1: 295, y1: 207, x2: 343, y2: 160 },
    { x1: 475, y1: 147, x2: 533, y2: 147 },
    { x1: 645, y1: 135, x2: 698, y2: 88 },
    { x1: 645, y1: 160, x2: 698, y2: 207 }
  ]
};

export const donneesEtPersistance: DevSheet = {
  id: "donnees-et-persistance",
  part: "T",
  number: 6,
  title: "Données et Persistance",
  subtitle: "Comprendre comment les données backend sont validées, modélisées, stockées et migrées",
  badge: "Fiche T06 — Vision Systémique",
  status: "Modèle stabilisé",
  meta: ["7 nœuds · backend", "7 sections / nœud"],
  category: "Technique",
  level: "Junior",
  readingTime: "35 min",
  description:
    "Une carte backend pour comprendre configuration, validation, SQL, ORM, modèles, migrations, repositories et cache.",
  accent: "runtime",
  tabs: [
    { id: "js", label: "JS JavaScript" },
    { id: "python", label: "Python" }
  ],
  nodes: {
    variables: {
      id: "variables",
      label: "Variables",
      icon: "x=",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Une variable est le plus petit endroit où une information peut vivre pendant l'exécution. Sans variables bien nommées et bien limitées, le programme devient une suite de valeurs anonymes qu'il faut garder en tête mentalement. Les variables existent pour donner un nom à une information, réduire la charge cognitive, et rendre explicite ce que le code manipule.</p><p>Mais une variable est aussi dangereuse : si elle est mutable, globale, ou partagée sans contrôle, elle devient une source d'effets de bord. Comprendre les variables, c'est comprendre que la donnée n'est jamais neutre — elle a une portée, une durée de vie, et un propriétaire.</p>`,
        system: `<p>Les variables sont présentes dans toutes les couches : routes, services, composants, repositories, tests. Elles transportent les données depuis l'entrée utilisateur jusqu'à la base, ou depuis la base jusqu'à l'affichage. Les variables locales vivent le temps d'une fonction. Les variables d'environnement configurent l'application. L'état frontend vit plus longtemps et influence l'interface. La base de données persiste au-delà du processus.</p>`,
        choice: {
          kind: "structured",
          main: `<p>La vraie décision n'est pas "variable ou pas", mais "quelle durée de vie et quelle portée ?" Une donnée temporaire reste locale. Une donnée de configuration va dans l'environnement. Une donnée partagée dans l'UI va dans le state. Une donnée durable va en base. Plus une variable vit longtemps et plus elle est accessible, plus elle doit être contrôlée.</p>`,
          alternatives: [
            { name: "Variable locale", description: "Pour une donnée temporaire limitée à une fonction." },
            { name: "Constante", description: "Pour une valeur stable et intentionnelle." },
            { name: "État partagé", description: "Pour une donnée qui influence plusieurs parties du système." }
          ]
        },
        senior: `<p>Il réduit la portée des variables au minimum. Il préfère <code>const</code> à <code>let</code> en JavaScript quand la référence ne change pas. En Python, il évite les variables globales mutables et rend les dépendances explicites via paramètres ou injection. Il nomme les variables selon leur rôle métier, pas selon leur type technique : <code>activeUsers</code> dit plus que <code>list</code>.</p>`,
        errors: `<p><strong>Pattern 1 — La variable globale mutable :</strong> tout le monde peut la modifier, personne ne sait qui l'a changée.</p><p><strong>Pattern 2 — Le nom flou :</strong> <code>data</code>, <code>result</code>, <code>temp</code> partout → impossible de comprendre l'intention.</p><p><strong>Pattern 3 — La mutation cachée :</strong> une fonction modifie un objet reçu en paramètre sans le dire → bugs difficiles à suivre.</p>`,
        invariants: `<p>Une donnée doit avoir un propriétaire clair, une portée limitée, et une durée de vie maîtrisée. Ce principe s'applique partout : variable locale, state React, cache Redis, ligne SQL. Ce qui change : le support. Ce qui ne change pas : une donnée sans propriétaire devient une source de bug.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript" },
            { type: "cmd", value: "const totalPrice = calculateTotal(cartItems)" },
            { type: "cmd", value: "let retryCount = 0 // uniquement si la valeur change réellement" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "total_price = calculate_total(cart_items)" },
            { type: "cmd", value: "MAX_RETRIES = 3" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "Une variable doit pouvoir répondre à : qui la crée, qui la lit, qui la modifie ?" }
          ],
          debt: "Variables globales mutables → effets de bord invisibles. Réduire la portée et rendre les mutations explicites."
        }
      }
    },
    config: {
      id: "config",
      label: "Configuration",
      icon: "⚙",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Le même code doit tourner dans plusieurs environnements : local, test, staging, production. Ce qui change entre ces environnements — URLs, ports, clés API, mode debug, niveau de logs — ne doit pas être hardcodé. La configuration existe pour séparer ce que l'application fait de l'endroit où elle s'exécute.</p>`,
        system: `<p>La configuration est chargée au démarrage, souvent depuis les variables d'environnement, puis injectée dans les couches qui en ont besoin : base de données, logger, clients d'API, serveur HTTP. Elle est proche du point d'entrée mais ne doit pas être dispersée dans tout le code.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Pour les petits projets : <code>.env</code> + module de config central. Pour les projets plus stricts : validation typée au démarrage. En JavaScript, Zod ou envalid. En Python, Pydantic Settings. Le principe : l'application doit planter immédiatement si une configuration obligatoire manque.</p>`,
          alternatives: [
            { name: ".env + dotenv", description: "Simple et suffisant en développement." },
            { name: "Config validée", description: "Zod/envalid ou Pydantic Settings pour éviter les erreurs tardives." },
            { name: "Secrets manager", description: "Doppler, Vault, AWS SSM quand les environnements se multiplient." }
          ]
        },
        senior: `<p>Il crée un module unique de configuration et interdit les accès dispersés à <code>process.env</code> ou <code>os.environ</code> dans toute l'application. Il valide les types : un port est un nombre, un booléen n'est pas la chaîne <code>"false"</code>, une URL doit être une URL. Il documente chaque variable dans <code>.env.example</code>.</p>`,
        errors: `<p><strong>Pattern 1 — process.env partout :</strong> impossible de savoir quelles variables sont requises.</p><p><strong>Pattern 2 — Pas de validation :</strong> l'app démarre avec une config invalide et casse trois couches plus loin.</p><p><strong>Pattern 3 — Config committée :</strong> secrets ou URLs privées versionnés dans Git.</p>`,
        invariants: `<p>La configuration est une dépendance externe du programme. Elle doit être centralisée, validée, documentée, et injectée. Ce qui change : l'outil de validation. Ce qui ne change pas : une app doit refuser de démarrer avec une config invalide.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript" },
            { type: "cmd", value: "npm install dotenv zod" },
            { type: "cmd", value: "src/config/env.js" },
            { type: "cmd", value: "const env = EnvSchema.parse(process.env)" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pip install pydantic-settings python-dotenv" },
            { type: "cmd", value: "class Settings(BaseSettings): database_url: str" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "Supprimer DATABASE_URL → l'app doit refuser de démarrer" }
          ],
          debt: "Configuration non validée → bugs tardifs et messages incompréhensibles. Centraliser la config avant que le projet grossisse."
        }
      }
    },
    validation: {
      id: "validation",
      label: "Validation",
      icon: "✓",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>Le monde extérieur ment, se trompe, ou envoie des données incomplètes. Un formulaire peut envoyer un email invalide, une API peut recevoir un nombre sous forme de chaîne, un client peut omettre un champ obligatoire. La validation existe pour protéger le cœur de l'application : avant d'entrer dans la logique métier, les données doivent être vérifiées, typées, et normalisées.</p>`,
        system: `<p>La validation se place aux frontières : routes HTTP, formulaires frontend, variables d'environnement, messages de queue, fichiers importés. Elle précède les services. Les services ne devraient pas recevoir des données brutes et incertaines, mais des données déjà validées et structurées.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript : Zod est le choix moderne pour valider et inférer les types. Yup existe encore dans beaucoup de formulaires. Python : Pydantic est le standard avec FastAPI. La décision importante : valider à l'entrée, pas au milieu de la logique métier.</p>`,
          alternatives: [
            { name: "Zod", description: "Validation JS/TS moderne, inférence de types." },
            { name: "Pydantic", description: "Validation Python standard, intégré à FastAPI." },
            { name: "Validation DB", description: "Dernier filet, pas remplacement de la validation applicative." }
          ]
        },
        senior: `<p>Il distingue validation syntaxique et validation métier. Syntaxique : email valide, champ requis, longueur minimale. Métier : email déjà utilisé, solde insuffisant, commande non annulable. La première appartient aux schémas de validation. La seconde appartient aux services.</p>`,
        errors: `<p><strong>Pattern 1 — Validation absente :</strong> les données invalides atteignent la base.</p><p><strong>Pattern 2 — Validation dupliquée :</strong> règles différentes frontend/backend → incohérences.</p><p><strong>Pattern 3 — Tout mettre dans le schéma :</strong> règles métier complexes cachées dans la validation d'entrée.</p>`,
        invariants: `<p>Toute frontière du système doit valider ce qui la traverse. Une donnée validée peut circuler plus loin avec confiance. Une donnée non validée est contaminante. Ce principe vaut pour HTTP, CLI, fichiers, env vars, formulaires et événements.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript avec Zod" },
            { type: "cmd", value: "npm install zod" },
            { type: "cmd", value: "const UserSchema = z.object({ email: z.string().email() })" },
            { type: "cmd", value: "const data = UserSchema.parse(req.body)" },
            { type: "comment", value: "Python avec Pydantic" },
            { type: "cmd", value: "class CreateUser(BaseModel): email: EmailStr" },
            { type: "cmd", value: "async def create_user(data: CreateUser):" }
          ],
          debt: "Validation dispersée → règles incohérentes. Centraliser les schémas et séparer validation syntaxique / règles métier."
        }
      }
    },
    database: {
      id: "database",
      label: "Base de données",
      icon: "🗄",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>La mémoire du programme disparaît quand le processus s'arrête. Une application qui doit conserver des utilisateurs, commandes, messages ou paiements a besoin d'un stockage durable. La base de données existe pour persister les informations, les retrouver efficacement, garantir leur cohérence, et survivre aux redémarrages.</p>`,
        system: `<p>La base de données est derrière les repositories. Les routes ne lui parlent jamais directement. Les services formulent des intentions métier, les repositories traduisent en requêtes, la base persiste et renvoie les données. Elle est une dépendance externe critique : lente, faillible, partagée, et durable.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Le choix principal : relationnel ou document. PostgreSQL est le défaut sérieux pour la majorité des applications métier. SQLite est parfait pour local, prototypage et petites apps. MongoDB peut être pertinent pour documents flexibles, mais ne doit pas être choisi pour éviter de modéliser.</p>`,
          alternatives: [
            { name: "PostgreSQL", description: "Défaut robuste, relationnel, transactions, contraintes." },
            { name: "SQLite", description: "Simple, local, fichier unique, excellent pour démarrer." },
            { name: "MongoDB", description: "Documents flexibles, utile si le modèle est réellement documentaire." }
          ]
        },
        senior: `<p>Il commence par modéliser les relations et contraintes. Une contrainte en base vaut mieux qu'une règle oubliée dans un service. Il pense transactions quand plusieurs écritures doivent réussir ou échouer ensemble. Il sait que la base est souvent la source de vérité ultime.</p>`,
        errors: `<p><strong>Pattern 1 — Tout en JSON libre :</strong> pas de contraintes, données incohérentes.</p><p><strong>Pattern 2 — Pas d'index :</strong> requêtes rapides en dev, lentes en prod.</p><p><strong>Pattern 3 — Logique uniquement en app :</strong> la base accepte des états impossibles.</p>`,
        invariants: `<p>Une donnée persistante doit être cohérente, requêtable, sauvegardable et migrable. Ce qui change : SQL, NoSQL, ORM, cloud provider. Ce qui ne change pas : la base est une frontière critique qui demande discipline.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Local PostgreSQL" },
            { type: "cmd", value: "createdb mon_projet_dev" },
            { type: "cmd", value: "psql mon_projet_dev" },
            { type: "comment", value: "SQLite" },
            { type: "cmd", value: "sqlite3 dev.db" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "La table a des clés primaires, contraintes NOT NULL, indexes utiles" }
          ],
          debt: "Pas de contraintes ni d'indexes → dette invisible qui explose avec les données réelles."
        }
      }
    },
    modeles: {
      id: "modeles",
      label: "Modèles",
      icon: "▦",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>Une application manipule des concepts : User, Product, Order, Invoice. Les modèles existent pour donner une forme explicite à ces concepts. Sans modèle, les données circulent sous forme de dictionnaires ou objets anonymes, et personne ne sait vraiment quels champs existent, lesquels sont obligatoires, ni quelles relations sont valides.</p>`,
        system: `<p>Les modèles font le pont entre la base, les repositories, les services et parfois la validation. Selon l'outil, ils peuvent représenter le schéma de base (Prisma, SQLAlchemy, Django models), le domaine métier, ou les DTOs d'entrée/sortie. Il faut savoir quel rôle joue chaque modèle.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript : Prisma schema pour la persistance, classes/types pour le domaine, Zod pour les DTOs. Python : SQLAlchemy ou Django models pour la persistance, Pydantic pour les schémas d'API. La séparation devient importante dès que les données exposées ne sont pas exactement les données stockées.</p>`,
          alternatives: [
            { name: "Modèle persistance", description: "Table, colonnes, relations, contraintes." },
            { name: "DTO / Schema API", description: "Forme reçue ou renvoyée par l'API." },
            { name: "Modèle domaine", description: "Concept métier indépendant de la base." }
          ]
        },
        senior: `<p>Il évite d'exposer directement les modèles de base de données dans les réponses API. Un User en base peut avoir <code>passwordHash</code>, <code>deletedAt</code>, des champs internes. La réponse publique doit être contrôlée. Il nomme les modèles selon le métier, pas selon l'écran qui les utilise.</p>`,
        errors: `<p><strong>Pattern 1 — Le modèle unique pour tout :</strong> base, API, formulaire, domaine mélangés.</p><p><strong>Pattern 2 — Champs sensibles exposés :</strong> passwordHash ou tokens renvoyés par accident.</p><p><strong>Pattern 3 — Relations floues :</strong> pas de cardinalité claire entre entités.</p>`,
        invariants: `<p>Un modèle est un contrat sur la forme d'une donnée. Les contrats doivent être explicites, nommés, testables, et adaptés à leur frontière. Ce qui change : ORM, framework, langage. Ce qui ne change pas : une donnée sans forme explicite devient fragile.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Prisma" },
            { type: "cmd", value: "model User { id Int @id @default(autoincrement()) email String @unique }" },
            { type: "comment", value: "Pydantic" },
            { type: "cmd", value: "class UserResponse(BaseModel): id: int; email: EmailStr" },
            { type: "comment", value: "SQLAlchemy" },
            { type: "cmd", value: "class User(Base): __tablename__ = 'users'" },
            { type: "comment", value: "Vérification" },
            { type: "cmd", value: "Aucun champ sensible dans les schémas de réponse" }
          ],
          debt: "Modèles de persistance exposés directement → fuite de données internes et couplage API/base."
        }
      }
    },
    migrations: {
      id: "migrations",
      label: "Migrations",
      icon: "⇄",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Le schéma de base évolue : ajouter une table, renommer une colonne, créer un index, modifier une contrainte. Si ces changements sont faits à la main, personne ne sait exactement quel état de base correspond à quelle version du code. Les migrations versionnent l'évolution de la base comme Git versionne le code.</p>`,
        system: `<p>Les migrations sont entre les modèles et la base. Elles transforment une intention de modèle en changement durable du schéma. Elles s'exécutent en local, en CI, et au déploiement. Elles doivent être commitées avec le code qui dépend d'elles.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript : Prisma Migrate, Knex migrations, TypeORM migrations. Python : Alembic pour SQLAlchemy, migrations Django natives. Le bon outil est souvent imposé par l'ORM. Le principe : jamais de modification manuelle non versionnée en base partagée.</p>`,
          alternatives: [
            { name: "Prisma Migrate", description: "Très intégré à Prisma, simple pour JS/TS." },
            { name: "Alembic", description: "Standard SQLAlchemy." },
            { name: "Django migrations", description: "Générées et appliquées par Django." }
          ]
        },
        senior: `<p>Il relit les migrations générées avant de les appliquer. Renommer une colonne peut être détecté comme drop + create, donc perte de données. Il pense rollback, données existantes, valeurs par défaut, migrations longues, et compatibilité entre ancienne et nouvelle version du code.</p>`,
        errors: `<p><strong>Pattern 1 — Modifier la base à la main :</strong> le schéma local ne correspond plus au repo.</p><p><strong>Pattern 2 — Migration destructive non relue :</strong> drop de colonne avec données utiles.</p><p><strong>Pattern 3 — Migration sans données par défaut :</strong> ajout d'une colonne NOT NULL sur table remplie → échec en production.</p>`,
        invariants: `<p>Le schéma de base est du code. Il doit être versionné, relu, testé, et déployé dans l'ordre. Ce qui change : l'outil. Ce qui ne change pas : pas de changement de schéma non traçable.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Prisma" },
            { type: "cmd", value: "npx prisma migrate dev --name add_users" },
            { type: "cmd", value: "npx prisma migrate deploy" },
            { type: "comment", value: "Alembic" },
            { type: "cmd", value: "alembic revision --autogenerate -m \"add users\"" },
            { type: "cmd", value: "alembic upgrade head" },
            { type: "comment", value: "Django" },
            { type: "cmd", value: "python manage.py makemigrations" },
            { type: "cmd", value: "python manage.py migrate" }
          ],
          debt: "Migrations non relues → pertes de données. Base modifiée à la main → environnements désynchronisés."
        }
      }
    },
    cache: {
      id: "cache",
      label: "Cache",
      icon: "⏱",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Certaines données coûtent cher à recalculer ou à récupérer : requête SQL lourde, appel API externe, rendu serveur, liste fréquemment consultée. Le cache existe pour stocker temporairement un résultat et éviter de refaire le même travail. Mais le cache introduit un problème : il peut devenir faux.</p>`,
        system: `<p>Le cache peut vivre côté frontend (React Query), côté serveur (mémoire processus), côté infrastructure (Redis), ou côté HTTP (headers cache-control). Il se place entre la demande et la source de vérité. La base reste la vérité durable ; le cache est une copie temporaire optimisée.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Cache local simple pour données peu critiques. React Query pour server state frontend. Redis pour cache partagé entre instances. HTTP cache pour ressources publiques. La vraie décision : quelle stratégie d'invalidation ? TTL, invalidation manuelle, invalidation sur mutation, ou pas de cache.</p>`,
          alternatives: [
            { name: "TTL", description: "Expire automatiquement après une durée." },
            { name: "Invalidation sur mutation", description: "On supprime/rafraîchit après modification." },
            { name: "Redis", description: "Cache partagé robuste côté backend." }
          ]
        },
        senior: `<p>Il n'ajoute pas de cache avant d'avoir mesuré. Le cache optimise un problème réel, pas une peur abstraite. Il documente la source de vérité, la durée de vie, et les conditions d'invalidation. Il sait que les bugs de cache ressemblent souvent à des bugs fantômes : "ça dépend de quand tu regardes".</p>`,
        errors: `<p><strong>Pattern 1 — Cache prématuré :</strong> complexité ajoutée sans problème de performance mesuré.</p><p><strong>Pattern 2 — Pas d'invalidation :</strong> données anciennes servies indéfiniment.</p><p><strong>Pattern 3 — Cache comme source de vérité :</strong> perte ou redémarrage du cache = données incohérentes.</p>`,
        invariants: `<p>Un cache est une copie, jamais la vérité. Toute copie doit avoir une stratégie de fraîcheur. Ce qui change : mémoire, Redis, CDN, React Query. Ce qui ne change pas : plus un cache est efficace, plus son invalidation devient critique.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "React Query" },
            { type: "cmd", value: "queryClient.invalidateQueries({ queryKey: ['users'] })" },
            { type: "comment", value: "Redis" },
            { type: "cmd", value: "redis.set('users:active', JSON.stringify(users), 'EX', 60)" },
            { type: "cmd", value: "redis.del('users:active')" },
            { type: "comment", value: "HTTP" },
            { type: "cmd", value: "Cache-Control: public, max-age=3600" }
          ],
          debt: "Cache sans stratégie d'invalidation → bugs intermittents et difficiles à reproduire."
        }
      }
    }
  },
  maps: dualLanguageMaps(dataPersistenceMap)
};
