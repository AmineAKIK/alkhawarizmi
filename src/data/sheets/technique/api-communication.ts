import type { DevSheet } from "../../schema";
import { dualLanguageMaps } from "../common";

const apiCommunicationMap = {
  viewBox: "0 0 980 300",
  nodes: [
    { id: "http", x: 20, y: 115, w: 110, h: 65 },
    { id: "rest", x: 175, y: 55, w: 100, h: 65 },
    { id: "json", x: 175, y: 175, w: 100, h: 65 },
    { id: "status", x: 330, y: 115, w: 120, h: 65 },
    { id: "client", x: 510, y: 55, w: 120, h: 65 },
    { id: "auth", x: 510, y: 175, w: 100, h: 65 },
    { id: "cors", x: 690, y: 55, w: 100, h: 65 },
    { id: "network", x: 690, y: 175, w: 130, h: 65 }
  ],
  edges: [
    { x1: 130, y1: 135, x2: 173, y2: 88, label: "structure" },
    { x1: 130, y1: 160, x2: 173, y2: 207, label: "encode" },
    { x1: 275, y1: 88, x2: 328, y2: 135, label: "retourne" },
    { x1: 275, y1: 207, x2: 328, y2: 160, label: "sérialise" },
    { x1: 450, y1: 135, x2: 508, y2: 88, label: "appelle" },
    { x1: 450, y1: 160, x2: 508, y2: 207, label: "sécurise" },
    { x1: 630, y1: 88, x2: 688, y2: 88, label: "permet" },
    { x1: 610, y1: 207, x2: 688, y2: 207, label: "diagnostique" }
  ]
};

export const apiCommunication: DevSheet = {
  id: "api-communication",
  part: "T",
  number: 7,
  title: "API et Communication",
  subtitle: "Comprendre comment deux systèmes se parlent sans partager la même mémoire",
  badge: "Fiche T07",
  meta: ["8 nœuds · 2 types"],
  category: "Technique",
  level: "Junior",
  readingTime: "35 min",
  description:
    "Une carte pour comprendre HTTP, REST, JSON, status codes, clients API, authentification, CORS et erreurs réseau.",
  accent: "tool",
  tabs: [
    { id: "js", label: "🟨 JavaScript" },
    { id: "python", label: "🐍 Python" }
  ],
  nodes: {
    http: {
      id: "http",
      label: "HTTP",
      icon: "⇄",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Deux programmes ne partagent pas la même mémoire. Un navigateur, un backend, un service externe, une application mobile : chacun vit dans son propre processus, souvent sur une machine différente. HTTP existe comme protocole commun pour formuler une demande, transporter des données, et recevoir une réponse structurée. Sans protocole partagé, chaque communication serait une intégration sur mesure.</p>`,
        system: `<p>HTTP est la couche de transport applicative. Les routes reçoivent des requêtes HTTP, les services traitent l'intention, les repositories récupèrent les données, puis la réponse remonte. Côté client, fetch/axios/httpx transforment un appel de fonction en requête réseau. HTTP est le langage commun entre frontend, backend et services externes.</p>`,
        choice: {
          kind: "structured",
          main: `<p>HTTP repose sur des méthodes qui portent une intention : <code>GET</code> pour lire, <code>POST</code> pour créer ou déclencher, <code>PUT/PATCH</code> pour modifier, <code>DELETE</code> pour supprimer. La décision importante est de respecter la sémantique : ne pas modifier des données avec GET, ne pas utiliser POST pour tout.</p>`,
          alternatives: [
            { name: "HTTP/REST", description: "Défaut pour APIs web lisibles et simples." },
            { name: "GraphQL", description: "Client choisit la forme des données, utile pour interfaces complexes." },
            { name: "gRPC", description: "Contrat fort et performant entre services backend." }
          ]
        },
        senior: `<p>Il pense en termes de contrat : méthode, URL, headers, body, réponse, erreurs. Il sait que HTTP est stateless : chaque requête doit contenir tout ce qui permet de la traiter, notamment l'authentification. Il logue méthode, path, status code et durée pour rendre le trafic observable.</p>`,
        errors: `<p><strong>Pattern 1 — POST partout :</strong> l'API devient imprévisible et difficile à documenter.</p><p><strong>Pattern 2 — État caché côté serveur :</strong> une requête dépend d'une requête précédente sans l'exprimer.</p><p><strong>Pattern 3 — Ignorer les headers :</strong> auth, content-type, cache et CORS deviennent incompréhensibles.</p>`,
        invariants: `<p>Communiquer entre systèmes exige un protocole explicite. Ce qui change : HTTP, WebSocket, gRPC. Ce qui ne change pas : une requête doit avoir une intention claire, une forme documentée, et une réponse interprétable.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "curl -i http://localhost:3000/api/v1/health" },
            { type: "cmd", value: "curl -X POST http://localhost:3000/api/v1/users -H 'Content-Type: application/json' -d '{\"email\":\"a@b.com\"}'" },
            { type: "comment", value: "GET /api/v1/users" },
            { type: "comment", value: "POST /api/v1/users" },
            { type: "comment", value: "PATCH /api/v1/users/:id" },
            { type: "comment", value: "DELETE /api/v1/users/:id" }
          ],
          debt: "Méthodes HTTP utilisées au hasard → API imprévisible. Documenter méthode, path, body et réponse dès la création d'une route."
        },
        verification: [
          "Quel principe justifie l'utilisation d'un protocole partagé entre deux programmes qui ne partagent pas la même mémoire ?",
          "Tu exécutes `curl -X GET http://localhost:3000/api/v1/orders` et obtiens les données correctement. Ton collègue ajoute un endpoint `POST /api/v1/orders/search` qui filtre les commandes selon des critères envoyés dans le body. Pourquoi ce choix de méthode est problématique, et quelle alternative REST respecte mieux la sémantique HTTP ?",
          "HTTP est dit 'stateless'. Quelle conséquence concrète cela a-t-il sur la manière de transporter l'identité de l'utilisateur à chaque requête, et pourquoi ce choix est-il difficile à contourner quelle que soit la technologie utilisée ?"
        ]
      }
    },
    rest: {
      id: "rest",
      label: "REST",
      icon: "↦",
      kind: "tool",
      osLabel: "Universel",
      sections: {
        why: `<p>Sans convention d'API, chaque endpoint devient une invention : <code>/getUser</code>, <code>/deleteProduct</code>, <code>/doLogin</code>. REST apporte une grammaire commune : les URLs représentent des ressources, les méthodes HTTP représentent les actions. Le résultat est une API prédictible.</p>`,
        system: `<p>REST se place au niveau des routes. Il influence le nommage, la structure des URLs, les méthodes utilisées, les status codes et les réponses. Les services ne savent pas qu'ils sont appelés via REST : ils reçoivent une intention métier. REST est une convention de frontière, pas une logique métier.</p>`,
        choice: {
          kind: "structured",
          main: `<p>REST strict n'est pas toujours nécessaire. L'objectif pratique est une API resource-oriented : ressources au pluriel, hiérarchie simple, actions rares et nommées quand elles ne rentrent pas dans CRUD. Une API lisible vaut mieux qu'une API qui force REST de manière dogmatique.</p>`,
          alternatives: [
            { name: "REST resource-oriented", description: "Défaut simple : /users, /orders, /products." },
            { name: "RPC/action", description: "Pour actions métier difficiles à modéliser en ressource." },
            { name: "GraphQL", description: "Quand le problème principal est la forme des données côté client." }
          ]
        },
        senior: `<p>Il versionne l'API quand elle est consommée par d'autres systèmes : <code>/api/v1</code>. Il évite d'exposer la structure interne de la base dans les URLs. Il garde la cohérence : pagination, filtres, erreurs et enveloppes de réponse ont le même format partout.</p>`,
        errors: `<p><strong>Pattern 1 — Verbes dans les URLs :</strong> <code>/getUser</code>, <code>/createOrder</code> au lieu d'utiliser les méthodes HTTP.</p><p><strong>Pattern 2 — Ressources singulières/plurielles mélangées :</strong> <code>/user</code>, <code>/products</code>, <code>/ordersList</code>.</p><p><strong>Pattern 3 — Réponses incohérentes :</strong> parfois <code>{data}</code>, parfois un tableau brut, parfois <code>{result}</code>.</p>`,
        invariants: `<p>Une API est une interface publique. Elle doit être prévisible avant même d'être lue en détail. Ce qui change : REST, RPC, GraphQL. Ce qui ne change pas : un consommateur ne doit pas deviner la forme des routes.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "GET    /api/v1/users" },
            { type: "comment", value: "GET    /api/v1/users/:id" },
            { type: "comment", value: "POST   /api/v1/users" },
            { type: "comment", value: "PATCH  /api/v1/users/:id" },
            { type: "comment", value: "DELETE /api/v1/users/:id" },
            { type: "comment", value: "GET    /api/v1/users?limit=20&offset=0" },
            { type: "cmd", value: "curl -i 'http://localhost:3000/api/v1/users?limit=20&offset=0'" }
          ],
          debt: "Routes incohérentes → documentation lourde et clients fragiles. Définir une convention REST dès le premier endpoint."
        },
        verification: [
          "Qu'apporte une convention de nommage des URLs et des méthodes HTTP à la lisibilité et la prévisibilité d'une interface de programmation ?",
          "Tu rejoins un projet dont l'API expose `POST /api/v1/getUserById`, `GET /api/v1/deleteProduct?id=42`, et `POST /api/v1/updateUser`. Identifie les trois violations de convention REST et propose les URLs et méthodes correctes pour chacune.",
          "Pourquoi est-il préférable de versionner une API publique dès le premier endpoint (`/api/v1/...`) plutôt qu'après coup, même si une seule application la consomme au départ ?"
        ]
      }
    },
    json: {
      id: "json",
      label: "JSON",
      icon: "{}",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>HTTP transporte des octets, pas des objets. JSON est devenu le format commun pour représenter des données structurées entre systèmes : objets, tableaux, chaînes, nombres, booléens, null. Il est lisible par les humains, supporté partout, et assez simple pour devenir le langage de données par défaut des APIs web.</p>`,
        system: `<p>JSON est le corps des requêtes et réponses. Les routes parsuent le JSON entrant, la validation le transforme en données fiables, les services travaillent avec ces objets, puis la réponse est sérialisée en JSON. Côté frontend, fetch ou axios désérialisent la réponse avec <code>response.json()</code>.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JSON est le défaut pour les APIs web. FormData est préférable pour fichiers et formulaires multipart. Protocol Buffers ou MessagePack peuvent être utiles pour performance ou contrats stricts, mais ajoutent de la complexité.</p>`,
          alternatives: [
            { name: "JSON", description: "Défaut lisible et universel." },
            { name: "FormData", description: "Fichiers, multipart, formulaires complexes." },
            { name: "Protobuf", description: "Contrat strict et performant entre services." }
          ]
        },
        senior: `<p>Il distingue absence de champ, champ à <code>null</code>, et valeur vide. Il sait que JSON ne représente pas nativement les dates, BigInt, undefined ou Decimal sans convention. Il documente les formats : dates ISO 8601, montants en centimes, IDs en string si nécessaire.</p>`,
        errors: `<p><strong>Pattern 1 — Content-Type oublié :</strong> le serveur ne parse pas le body correctement.</p><p><strong>Pattern 2 — Dates ambiguës :</strong> timezone implicite, formats mélangés.</p><p><strong>Pattern 3 — Montants en float :</strong> erreurs d'arrondi sur l'argent.</p>`,
        invariants: `<p>Un format de données est un contrat. Les deux côtés doivent partager les mêmes conventions pour types, nullabilité, dates, erreurs et précision numérique. Ce qui change : JSON ou autre. Ce qui ne change pas : le contrat doit être explicite.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "Content-Type: application/json" },
            { type: "cmd", value: "Accept: application/json" },
            { type: "cmd", value: "const data = await response.json()" },
            { type: "cmd", value: "return res.json({ data: user })" },
            { type: "cmd", value: "return {\"data\": user}  # FastAPI" }
          ],
          debt: "Formats JSON implicites → clients cassés au moindre changement. Documenter nullabilité, dates et enveloppes de réponse."
        },
        verification: [
          "Pourquoi un format texte lisible par les humains est-il devenu le standard d'échange de données entre systèmes, alors que des formats binaires plus compacts existent ?",
          "Ton API retourne le champ `price` comme `19.99` (float JavaScript). Le frontend affiche parfois `19.990000000000002` après une addition. Explique l'origine du problème et quelle convention de format (type et unité) résout ce comportement pour représenter des montants monétaires.",
          "JSON ne représente pas nativement les dates. Quel invariant de contrat faut-il établir entre producteur et consommateur pour éviter les bugs de timezone, et pourquoi ce problème persiste-t-il indépendamment du langage ou du framework utilisé ?"
        ]
      }
    },
    status: {
      id: "status",
      label: "Status Codes",
      icon: "200",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Une réponse HTTP ne contient pas seulement des données : elle contient aussi un statut. Le status code est le résumé machine-readable de ce qui s'est passé. Sans status codes cohérents, le client doit lire le texte de la réponse pour comprendre si l'opération a réussi ou échoué — fragile et non standard.</p>`,
        system: `<p>Les routes choisissent le status code en fonction du résultat. Les erreurs métier sont traduites en 4xx, les erreurs inattendues en 5xx. Le client utilise ces codes pour afficher les bons messages, déclencher une redirection, retenter une requête, ou invalider une session.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Les codes essentiels suffisent dans 95% des cas : 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 500 Internal Server Error.</p>`,
          alternatives: [
            { name: "2xx", description: "Succès : la requête a été comprise et traitée." },
            { name: "4xx", description: "Erreur côté client : input, auth, ressource absente." },
            { name: "5xx", description: "Erreur côté serveur : bug ou dépendance indisponible." }
          ]
        },
        senior: `<p>Il ne retourne pas 200 pour une erreur métier. Il distingue 401 (pas authentifié) et 403 (authentifié mais pas autorisé). Il utilise 409 pour conflit métier, comme email déjà utilisé. Il garde une forme d'erreur stable : code interne, message, détails éventuels.</p>`,
        errors: `<p><strong>Pattern 1 — Tout en 200 :</strong> le client ne peut pas distinguer succès et échec proprement.</p><p><strong>Pattern 2 — 500 pour erreurs utilisateur :</strong> validation invalide ou ressource absente traitée comme bug serveur.</p><p><strong>Pattern 3 — Messages sans code interne :</strong> impossible pour le frontend de réagir autrement qu'en affichant du texte.</p>`,
        invariants: `<p>Le status code est une partie du contrat d'API. Il doit être cohérent, documenté, et utilisable par des machines. Ce qui change : le framework. Ce qui ne change pas : succès, erreur client et erreur serveur ne doivent jamais être confondus.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "200 OK                 # lecture ou action réussie" },
            { type: "cmd", value: "201 Created            # ressource créée" },
            { type: "cmd", value: "400 Bad Request        # requête invalide" },
            { type: "cmd", value: "401 Unauthorized       # non authentifié" },
            { type: "cmd", value: "403 Forbidden          # non autorisé" },
            { type: "cmd", value: "404 Not Found          # ressource absente" },
            { type: "cmd", value: "409 Conflict           # conflit métier" },
            { type: "cmd", value: "500 Internal Error     # erreur inattendue" }
          ],
          debt: "Status codes incohérents → frontend rempli de conditions fragiles. Définir une table d'erreurs API."
        },
        verification: [
          "À quoi sert un code numérique dans une réponse HTTP, et en quoi est-il préférable à un message textuel pour qu'un client traite automatiquement le résultat d'une requête ?",
          "Ton API retourne `200 OK` avec le body `{ \"success\": false, \"error\": \"Email already taken\" }` quand un utilisateur tente de s'inscrire avec un email existant. Le frontend React Query détecte la requête comme réussie et n'affiche aucun message d'erreur. Quel status code aurait dû être retourné, et pourquoi le comportement du client change-t-il avec ce code ?",
          "Quelle distinction doit rester stable entre les catégories 4xx et 5xx, et pourquoi confondre les deux rend la gestion d'erreur côté client non fiable, quel que soit l'outil utilisé ?"
        ]
      }
    },
    client: {
      id: "client",
      label: "fetch / axios",
      icon: "↗",
      kind: "tool",
      osLabel: "JavaScript / Python",
      sections: {
        why: `<p>Un client API transforme une intention locale en requête réseau. Au lieu d'écrire toute la mécanique HTTP à chaque fois, il centralise l'URL de base, les headers, l'authentification, le parsing JSON, les timeouts, et la gestion d'erreur. Sans client centralisé, chaque appel API réinvente le même code avec des variantes.</p>`,
        system: `<p>Côté frontend, le client API est appelé par les hooks ou services de données. Côté backend, il peut appeler une API externe. Il se situe à la frontière réseau sortante. Il ne doit pas contenir de logique métier complexe : il envoie, reçoit, normalise les erreurs.</p>`,
        choice: {
          kind: "structured",
          main: `<p>JavaScript : <code>fetch</code> est natif et suffisant, axios ajoute interceptors, timeout ergonomique, parsing automatique. Python : <code>requests</code> pour synchrone, <code>httpx</code> pour async moderne. Le choix dépend surtout du besoin d'interceptors, async et timeouts.</p>`,
          alternatives: [
            { name: "fetch", description: "Natif navigateur/Node moderne, simple." },
            { name: "axios", description: "Interceptors et ergonomie riche côté JS." },
            { name: "httpx", description: "Client HTTP Python moderne, sync et async." }
          ]
        },
        senior: `<p>Il crée un client unique avec base URL, timeout, headers, auth et gestion des erreurs. Il ne met pas <code>fetch('/api/...')</code> dispersé dans tous les composants. Il distingue erreur HTTP (réponse 4xx/5xx) et erreur réseau (pas de réponse du tout).</p>`,
        errors: `<p><strong>Pattern 1 — Appels API dispersés :</strong> headers et gestion d'erreurs incohérents.</p><p><strong>Pattern 2 — Pas de timeout :</strong> requêtes suspendues indéfiniment.</p><p><strong>Pattern 3 — Supposer que fetch throw sur 404 :</strong> fetch ne throw pas sur status HTTP non-2xx.</p>`,
        invariants: `<p>Tout appel réseau peut échouer, être lent, ou retourner une réponse inattendue. Le client API doit rendre ces échecs explicites et cohérents. Ce qui change : fetch, axios, httpx. Ce qui ne change pas : centraliser la frontière réseau évite la duplication et les bugs.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "JavaScript fetch" },
            { type: "cmd", value: "const res = await fetch('/api/v1/users')" },
            { type: "cmd", value: "if (!res.ok) throw new ApiError(res.status)" },
            { type: "cmd", value: "const data = await res.json()" },
            { type: "comment", value: "Axios" },
            { type: "cmd", value: "const api = axios.create({ baseURL: '/api/v1', timeout: 10000 })" },
            { type: "comment", value: "Python" },
            { type: "cmd", value: "pip install httpx" },
            { type: "cmd", value: "async with httpx.AsyncClient(timeout=10) as client:" }
          ],
          debt: "Client API non centralisé → auth, erreurs et timeouts incohérents. Créer un module apiClient dès les premiers appels."
        },
        verification: [
          "Quel problème résout la centralisation des appels réseau dans un module dédié, comparé à des appels `fetch` dispersés dans chaque composant ?",
          "Tu utilises `fetch('/api/v1/users/42')` sans vérifier `res.ok`. Le serveur retourne `404 Not Found` avec body `{ \"error\": \"User not found\" }`. Ton code appelle ensuite `const data = await res.json()` et tente d'accéder à `data.email`. Explique ce qui se passe exactement et comment corriger ce comportement avec `fetch`.",
          "Pourquoi distinguer 'erreur HTTP' (réponse 4xx/5xx reçue) et 'erreur réseau' (pas de réponse) est-il un invariant essentiel de robustesse, quelle que soit la librairie HTTP utilisée ?"
        ]
      }
    },
    auth: {
      id: "auth",
      label: "Auth",
      icon: "🔐",
      kind: "infra",
      osLabel: "Universel",
      sections: {
        why: `<p>Une API doit savoir qui fait la requête et ce que cette personne a le droit de faire. L'authentification répond à "qui es-tu ?", l'autorisation répond à "as-tu le droit ?". Sans auth, toutes les ressources sont publiques ou protégées par des suppositions fragiles côté client.</p>`,
        system: `<p>L'auth traverse plusieurs couches : login route, service d'identité, token/session, middleware d'auth, routes protégées, frontend qui stocke ou transporte le credential. Elle s'appuie souvent sur le header <code>Authorization</code> ou sur des cookies sécurisés.</p>`,
        choice: {
          kind: "structured",
          main: `<p>Deux grandes approches web : cookies httpOnly avec session/JWT, ou token Bearer dans Authorization. Cookies httpOnly protègent mieux contre le vol par XSS. Bearer token est simple pour API/mobile mais exige une stratégie de stockage prudente.</p>`,
          alternatives: [
            { name: "Cookie httpOnly", description: "Bon défaut web, non lisible par JavaScript." },
            { name: "Bearer JWT", description: "Simple pour APIs, mobile, clients externes." },
            { name: "OAuth/OIDC", description: "Délégation d'identité via fournisseur externe." }
          ]
        },
        senior: `<p>Il sépare login, authentification et autorisation. Il ne fait pas confiance au frontend pour cacher les boutons : le backend vérifie toujours les droits. Il pense expiration, refresh token, révocation, rotation, CSRF si cookies, XSS si stockage côté client.</p>`,
        errors: `<p><strong>Pattern 1 — Auth côté frontend seulement :</strong> l'API reste appelable directement.</p><p><strong>Pattern 2 — Token dans localStorage sans réflexion :</strong> exposition en cas de XSS.</p><p><strong>Pattern 3 — Confondre 401 et 403 :</strong> non authentifié vs non autorisé.</p>`,
        invariants: `<p>L'identité et les droits doivent être vérifiés côté serveur à chaque requête protégée. Ce qui change : session, JWT, OAuth. Ce qui ne change pas : le client n'est jamais une source de confiance.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "Authorization: Bearer <token>" },
            { type: "cmd", value: "Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax" },
            { type: "cmd", value: "401 Unauthorized  # pas connecté" },
            { type: "cmd", value: "403 Forbidden     # connecté mais pas autorisé" },
            { type: "comment", value: "Middleware" },
            { type: "cmd", value: "req.user = verifyToken(token)" },
            { type: "cmd", value: "current_user = Depends(get_current_user)" }
          ],
          debt: "Auth sans modèle de menace → failles XSS/CSRF ou droits contournables. Documenter où vit le credential et qui vérifie les droits."
        },
        verification: [
          "Quelle différence fondamentale sépare les deux questions qu'un système doit résoudre pour contrôler l'accès à ses ressources ?",
          "Ton application React stocke le JWT dans `localStorage`. Un ticket de sécurité signale qu'une librairie npm tierce injecte du JavaScript dans la page. Explique précisément comment cette injection peut exfiltrer le token, et pourquoi un cookie `HttpOnly; Secure; SameSite=Lax` aurait rendu cette attaque impossible.",
          "Pourquoi la règle 'le backend vérifie toujours les droits à chaque requête' est-elle un invariant de sécurité qui ne peut pas être délégué au frontend, quel que soit le mécanisme d'authentification choisi ?"
        ]
      }
    },
    cors: {
      id: "cors",
      label: "CORS",
      icon: "🌐",
      kind: "infra",
      osLabel: "Frontend / Backend",
      sections: {
        why: `<p>Le navigateur protège l'utilisateur : une page ouverte sur un domaine ne peut pas appeler librement n'importe quelle API d'un autre domaine. CORS est le mécanisme qui permet au serveur de déclarer quels origins ont le droit de l'appeler depuis un navigateur. Ce n'est pas une protection backend absolue : c'est une règle de navigateur.</p>`,
        system: `<p>CORS intervient avant que le frontend puisse lire la réponse. Le navigateur envoie parfois une requête preflight <code>OPTIONS</code> pour demander au serveur si la vraie requête est autorisée. Le backend répond avec des headers comme <code>Access-Control-Allow-Origin</code>.</p>`,
        choice: {
          kind: "structured",
          main: `<p>En développement, on peut autoriser <code>http://localhost:5173</code>. En production, on autorise uniquement les domaines connus. Éviter <code>*</code> avec credentials. Une autre stratégie locale est le proxy du dev server, qui évite CORS en faisant passer les appels par la même origine.</p>`,
          alternatives: [
            { name: "Allowlist stricte", description: "Origines explicitement autorisées." },
            { name: "Proxy dev server", description: "Évite CORS en local via Vite/Next." },
            { name: "Wildcard", description: "Uniquement pour APIs publiques sans credentials." }
          ]
        },
        senior: `<p>Il sait que "corriger CORS" ne veut pas dire désactiver la sécurité. Il identifie l'origin réel, les headers envoyés, la méthode, et si credentials sont inclus. Il configure CORS côté serveur, pas côté client.</p>`,
        errors: `<p><strong>Pattern 1 — Mettre * partout :</strong> dangereux ou incompatible avec credentials.</p><p><strong>Pattern 2 — Chercher côté frontend :</strong> CORS se décide par les headers du serveur.</p><p><strong>Pattern 3 — Oublier OPTIONS :</strong> preflight bloqué avant la vraie requête.</p>`,
        invariants: `<p>CORS est une politique de navigateur entre origins. Ce qui change : Express, FastAPI, Nginx. Ce qui ne change pas : le serveur doit déclarer explicitement qui peut l'appeler depuis un navigateur.</p>`,
        practice: {
          commands: [
            { type: "comment", value: "Express" },
            { type: "cmd", value: "app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))" },
            { type: "comment", value: "FastAPI" },
            { type: "cmd", value: "app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_url])" },
            { type: "comment", value: "Headers" },
            { type: "cmd", value: "Access-Control-Allow-Origin: http://localhost:5173" }
          ],
          debt: "CORS ouvert trop largement → surface d'abus. CORS mal compris → heures perdues côté frontend."
        },
        verification: [
          "Quel mécanisme de sécurité du navigateur CORS vient compléter, et pourquoi cette restriction s'applique uniquement depuis un navigateur et non depuis curl ou un serveur ?",
          "Tu fais `fetch('https://api.monsite.com/data')` depuis `http://localhost:3000` et le navigateur retourne 'Access to fetch blocked by CORS policy'. Ton serveur Express répond correctement si tu testes avec `curl`. Explique exactement pourquoi fetch échoue, et quelle en-tête HTTP côté serveur Express résout le problème.",
          "Pourquoi configurer CORS côté serveur (et non côté client) est-il un invariant, même si le développeur frontend est celui qui observe l'erreur dans la console ?"
        ]
      }
    },
    network: {
      id: "network",
      label: "Erreurs réseau",
      icon: "⚠",
      kind: "runtime",
      osLabel: "Universel",
      sections: {
        why: `<p>Le réseau est incertain par nature : serveur down, DNS cassé, timeout, offline, CORS bloqué, proxy indisponible, latence. Une application qui suppose que le réseau marche toujours est fragile. Les erreurs réseau existent comme catégorie distincte des erreurs métier : parfois il n'y a même pas de réponse HTTP.</p>`,
        system: `<p>Les erreurs réseau apparaissent côté client API, dev server, navigateur, ou backend appelant un service externe. Elles doivent être transformées en états UI ou réponses contrôlées : loading, retry, message utilisateur, fallback, log technique.</p>`,
        choice: {
          kind: "structured",
          main: `<p>La stratégie dépend du contexte : retry pour erreurs temporaires, timeout pour ne pas attendre indéfiniment, message clair pour l'utilisateur, circuit breaker pour services externes critiques. Toutes les requêtes ne doivent pas être retry : un POST de paiement répété peut créer un doublon sans idempotency key.</p>`,
          alternatives: [
            { name: "Timeout", description: "Aucune requête ne doit attendre pour toujours." },
            { name: "Retry", description: "Utile pour erreurs temporaires et requêtes idempotentes." },
            { name: "Fallback", description: "Dégradation contrôlée si un service est indisponible." }
          ]
        },
        senior: `<p>Il distingue erreur HTTP, erreur réseau, timeout, et erreur de parsing. Il utilise des idempotency keys pour les opérations critiques répétables. Il logue requestId/correlationId pour relier client, backend et service externe.</p>`,
        errors: `<p><strong>Pattern 1 — Catch générique :</strong> afficher "une erreur est survenue" sans contexte exploitable.</p><p><strong>Pattern 2 — Retry aveugle :</strong> répéter des POST non idempotents.</p><p><strong>Pattern 3 — Pas d'état loading/error :</strong> UI bloquée sans explication.</p>`,
        invariants: `<p>Tout appel réseau est faillible. Une application robuste traite l'échec comme un chemin normal, pas comme une exception rare. Ce qui change : outil et framework. Ce qui ne change pas : timeout, retry raisonné, logs et feedback utilisateur.</p>`,
        practice: {
          commands: [
            { type: "cmd", value: "AbortController  # timeout fetch côté JS" },
            { type: "cmd", value: "axios.create({ timeout: 10000 })" },
            { type: "cmd", value: "httpx.AsyncClient(timeout=10)" },
            { type: "cmd", value: "Idempotency-Key: <uuid>" },
            { type: "cmd", value: "X-Request-ID: <uuid>" },
            { type: "comment", value: "Tester : couper le backend puis vérifier l'état d'erreur UI" }
          ],
          debt: "Erreurs réseau non modélisées → UI fragile, doubles actions, bugs impossibles à corréler."
        },
        verification: [
          "Pourquoi les erreurs réseau forment-elles une catégorie distincte des erreurs métier, et quelle conséquence cela a-t-il sur la conception de la gestion d'erreurs d'une application ?",
          "Ton frontend envoie `POST /api/v1/payments` pour déclencher un paiement. La requête part, mais le réseau coupe avant que la réponse n'arrive. L'utilisateur voit un spinner bloqué et reclique sur 'Payer'. Explique ce qui peut se passer côté serveur, et comment une `Idempotency-Key` dans les headers de la requête évite la double facturation.",
          "Pourquoi un timeout sur toute requête réseau est-il un invariant de robustesse, indépendamment du framework ou du cas d'usage, et quelle est la conséquence de son absence sur un service en production ?"
        ]
      }
    }
  },
  maps: dualLanguageMaps(apiCommunicationMap)
};
