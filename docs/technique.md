# Documentation Technique

## Vue D'ensemble

Alkhawarizmi est une application React/Vite statique. Elle ne dépend pas d'un backend : tout le contenu pédagogique est codé dans `src/data/sheets`.

Le flux principal est :

```text
fichiers de fiches
  -> catalog.ts normalise les données
  -> App.tsx route vers accueil / catégorie / fiche
  -> SheetView.tsx rend la carte et le détail des nœuds
```

## Stack

- **React 19** : rendu UI.
- **TypeScript** : typage du modèle de fiches.
- **Vite** : dev server et build.
- **vite-plugin-pwa** : service worker et manifest PWA.
- **lucide-react** : icônes de navigation et d'interface.

Scripts disponibles :

```bash
npm run dev
npm run build
npm run preview
```

`npm run build` exécute d'abord `tsc --noEmit`, puis `vite build`.

## Arborescence

```text
src/
  data/
    schema.ts
    catalog.ts
    presentation.ts
    sheets/
      common.ts
      conception/
      design/
      technique/
      production/
      collaboration/
  styles/
    global.css
  ui/
    App.tsx
    SheetView.tsx
  main.tsx
```

### `src/data/schema.ts`

Définit le contrat de données :

- `DevSheet` : une fiche complète ;
- `SheetNode` : un nœud pédagogique ;
- `SystemMap` : une carte SVG ;
- `PracticeSection` : pratique au format commandes ;
- `PracticeConception` : pratique au format exercices ;
- `NodeKind`, `SheetPart`, `SheetTab`, `NodeOs`, etc.

Le tableau `sheetTabs` est la source unique des onglets valides :

```ts
export const sheetTabs = [
  "universel",
  "windows",
  "macos",
  "linux",
  "js",
  "python",
  "workflow",
  "frontend",
] as const;
```

### `src/data/catalog.ts`

Responsabilités :

- importer toutes les fiches ;
- définir l'ordre pédagogique des catégories ;
- normaliser les fiches ;
- construire les URLs ;
- exposer les helpers de recherche et de navigation.

L'ordre pédagogique actuel :

```text
Conception -> Design -> Technique -> Production -> Collaboration
```

Fonctions publiques importantes :

- `sheets`
- `sheetCategories`
- `getCategorySheets(category)`
- `getCategoryForSheet(sheet)`
- `getCategoryBySlug(slug)`
- `buildCategoryPath(category, query?)`
- `buildSheetPath(sheet, tab?, nodeId?, searchParams?)`
- `getVisibleNodeIds(sheet)`
- `getVisibleNodeCount(sheet)`

### `src/data/presentation.ts`

Centralise les constantes de présentation liées au domaine :

- labels des catégories de nœuds ;
- couleurs des catégories de nœuds ;
- couleurs des niveaux ;
- titre de la section 4 par partie ;
- texte du bandeau de positionnement ;
- paramètres de rendu texte SVG.

Ce fichier évite de disperser la sémantique métier dans les composants React.

### `src/data/sheets/common.ts`

Contient les helpers partagés par les fiches :

- `buildPractice()` : transforme l'input pratique en format rendu ;
- `buildFreeNodeSections()` : construit les sections standard d'un nœud ;
- `dualLanguageMaps()` : partage une même carte entre JS et Python ;
- `universalSheet()` : construit les fiches sans onglets spécialisés.

Ce fichier est le socle DRY des factories de fiches.

## Modèle De Données

### Fiche

Une fiche suit le type `DevSheet`.

Champs principaux :

- `id` : identifiant d'URL ;
- `part` : `C`, `D`, `T`, `P`, `Co` ;
- `number` : ordre interne ;
- `title`, `subtitle`, `description` ;
- `badge`, `meta`, `readingTime` ;
- `accent` : couleur dominante ;
- `tabs` : onglets disponibles ;
- `nodes` : dictionnaire des nœuds ;
- `maps` : dictionnaire des cartes par onglet.

### Nœud

Un nœud suit le type `SheetNode`.

Champs principaux :

- `id` : identifiant interne et segment d'URL ;
- `label` : texte affiché sur la carte ;
- `icon` : icône du panneau de détail ;
- `kind` : catégorie sémantique du nœud ;
- `os` : cible technique éventuelle ;
- `osLabel` : label affiché ;
- `niveau` : `Fondation`, `Intermédiaire`, `Avancé` ;
- `sections` : contenu pédagogique.

### Sections

Chaque nœud expose :

- `why`
- `system`
- `choice`
- `senior`
- `errors`
- `invariants`
- `practice`
- `verification`

Le contenu long est souvent en HTML string. Le rendu se fait via `dangerouslySetInnerHTML`, mais les données sont internes au dépôt.

## Normalisation Des Données

`catalog.ts` normalise les fiches au chargement.

### `normalizeSheet()`

Applique :

- normalisation des onglets ;
- normalisation des maps ;
- filtrage des nœuds réellement visibles ;
- inférence du numéro d'affichage ;
- normalisation du badge ;
- génération des lignes de titre ;
- normalisation de la méta ;
- normalisation de chaque nœud.

### `normalizeNode()`

Applique :

- inférence de `os` si absent ;
- inférence du niveau pour certaines fiches techniques ;
- correction pédagogique minimale pour la section `why` technique ;
- ajout de références système techniques si elles manquent ;
- ajout du format invariant si nécessaire ;
- normalisation des commandes ;
- questions de vérification par défaut si absentes.

### Pourquoi Normaliser ?

La normalisation sert à maintenir la compatibilité avec des fiches écrites à différents moments du projet.

Elle doit rester limitée. Une règle importante : une transformation automatique ne doit pas cacher durablement un problème de contenu. Si la normalisation devient trop lourde, il faut corriger les fiches source.

## Routing

Le routing est un routeur client simple dans `App.tsx`.

Formats supportés :

```text
/
/:category
/:category/:sheetId
/:category/:sheetId/:nodeId
```

L'onglet actif est porté par la query string :

```text
?tab=js
?tab=python
?tab=windows
```

La recherche dans une catégorie utilise :

```text
?q=...
```

### Types De Route

```ts
type Route =
  | { name: "home" }
  | { name: "category"; category: CategoryName; query: string }
  | { name: "sheet"; category: CategoryName; sheetId: string; nodeId: string | null; tab: string | null }
  | { name: "not-found"; reason: string };
```

### Navigation

La navigation interne utilise `RouteLink`, qui :

- conserve le comportement navigateur avec Ctrl/Cmd/Shift ;
- intercepte le clic simple ;
- appelle `history.pushState` ou `history.replaceState` ;
- force un `window.scrollTo({ top: 0 })`.

### Correction De Catégorie

Si une fiche est ouverte avec une mauvaise catégorie dans l'URL, l'application remplace l'URL par la catégorie réelle.

## Rendu D'une Fiche

`SheetView.tsx` est responsable de :

- choisir l'onglet actif ;
- vérifier que le nœud actif existe dans la map active ;
- afficher la carte SVG ;
- afficher la légende ;
- afficher le panneau du nœud ;
- revenir à la carte.

### Carte SVG

`SystemMap` rend :

- les arêtes ;
- les labels d'arêtes ;
- les nœuds ;
- le wrapping de texte dans les rectangles ;
- l'état actif.

Le rendu texte SVG utilise `svgTextConfig` depuis `presentation.ts`.

### Comportement De Clic Sur Nœud

Quand un nœud est sélectionné :

- l'URL devient `/:category/:sheetId/:nodeId` ;
- la carte passe en état caché ;
- le panneau du nœud s'affiche ;
- la page reste calée en haut grâce à la navigation globale.

Il n'y a pas de `scrollIntoView()` automatique vers le panneau. Ce choix évite d'atterrir au milieu de la fiche après un clic sur la carte.

### Onglets

Les onglets n'apparaissent que si `sheet.tabs.length > 1`.

Cas principaux :

- Technique T01 : OS (`windows`, `macos`, `linux`) ;
- autres fiches techniques : souvent `js`, `python` ;
- parties Conception, Design, Production, Collaboration : généralement `universel`.

## Formats De Pratique

Deux formats existent.

### Commandes

Type : `PracticeSection`

```ts
{
  commands: [
    { type: "comment", value: "Installer" },
    { type: "cmd", value: "npm install" },
    { type: "snippet", value: "const x = ..." }
  ],
  verification?: "...",
  debt: "..."
}
```

Utilisé principalement dans la Partie Technique et certains nœuds Production.

### Exercices

Type : `PracticeConception`

```ts
{
  exercices: [
    {
      titre: "...",
      etapes: ["...", "...", "..."],
      output: "...",
      critere: "..."
    }
  ],
  piege: "..."
}
```

Utilisé dans Conception, Design, Collaboration et certains nœuds Production.

## Factories De Fiches

### Parties Universelles

Les parties sans onglets spécialisés utilisent `universalSheet()` via une factory dédiée :

- `conceptionSheet()`
- `designSheet()`
- `prodSheet()`
- `coSheet()`

### Nœuds

Les parties récentes utilisent des factories de nœuds :

- `designNode()`
- `prodNode()`
- `coNode()`

Elles évitent de répéter la structure complète des sections.

## Catégories Et Couleurs

Les catégories de nœuds sont typées dans `NodeKind`.

Les couleurs et labels sont centralisés dans `presentation.ts`.

Exemples :

- Technique : `tool`, `infra`, `runtime`, `vcs`
- Conception : `diagnostic`, `decision`, `validation`, `modele`
- Design : `fondement`, `visuel`, `pattern`, `systeme`
- Production : `observabilite`, `securite`, `performance`, `processus`
- Collaboration : `humain`, `processus`, `communication`, `organisation`

Attention : `processus` est partagé par Production et Collaboration. Son label de légende est donc générique dans l'UI. Si une distinction visuelle plus fine devient nécessaire, il faudra introduire des kinds distincts ou contextualiser les labels par partie.

## Recherche

La recherche est locale à une catégorie.

Elle indexe :

- titre ;
- sous-titre ;
- description ;
- catégorie ;
- niveau ;
- badge ;
- labels des nœuds visibles.

La recherche ignore les accents grâce à `normalizeText()`.

## Build Et PWA

La configuration Vite se trouve dans `vite.config.ts`.

### Chunks

Le build sépare :

- React ;
- lucide-react ;
- les données par catégorie via `manualChunks`.

Important : les données restent importées statiquement par `catalog.ts`. Les chunks sont séparés au build, mais ce n'est pas un lazy loading route-level complet. Pour un vrai chargement à la demande, il faudrait remplacer les imports statiques par des imports dynamiques par catégorie ou par fiche.

### PWA

La PWA utilise `vite-plugin-pwa`.

Configuration actuelle :

- `registerType: "prompt"` ;
- manifest activé ;
- icônes SVG dans `/public/icons` ;
- service worker enregistré seulement en production.

Le service worker est initialisé dans `main.tsx` :

```ts
if (import.meta.env.PROD) {
  registerSW({ immediate: false });
}
```

## CSS

Le style global est dans `src/styles/global.css`.

Il contient :

- thème sombre ;
- layout accueil ;
- cartes catégorie et fiche ;
- header de fiche ;
- carte SVG ;
- panneau de nœud ;
- sections pédagogiques ;
- formats pratique commandes et exercices ;
- responsive.

Le CSS est global, pas CSS Modules. Les classes doivent donc rester nommées explicitement et éviter les collisions.

## Règles De Validation

Avant livraison :

```bash
npm run build
```

Pour vérifier uniquement le typage :

```bash
npx tsc --noEmit
```

Audit logique recommandé pour les maps :

```bash
npx tsc --module commonjs --target es2020 --jsx react-jsx --esModuleInterop --skipLibCheck --outDir /tmp/alkh-audit src/data/catalog.ts
node -e 'const {sheets}=require("/tmp/alkh-audit/catalog.js"); const problems=[]; for (const s of sheets) { const tabIds=s.tabs.map(t=>t.id); const mapKeys=Object.keys(s.maps).filter(k=>s.maps[k]); for (const tab of tabIds) if (!s.maps[tab]) problems.push(`${s.id}: tab ${tab} no map`); for (const key of mapKeys) if (!tabIds.includes(key)) problems.push(`${s.id}: map ${key} no tab`); for (const [key,map] of Object.entries(s.maps)) { if (!map) continue; const ids=new Set(Object.keys(s.nodes)); for (const n of map.nodes) if (!ids.has(n.id)) problems.push(`${s.id}/${key}: missing ${n.id}`); } } console.log(JSON.stringify({sheets:sheets.length, problems}, null, 2));'
```

Résultat attendu :

```json
{
  "sheets": 28,
  "problems": []
}
```

## Risques Techniques Connus

### HTML Interne Rendu Avec `dangerouslySetInnerHTML`

Les sections longues sont des strings HTML internes. C'est acceptable tant que le contenu vient uniquement du dépôt.

Si un jour le contenu devient éditable par utilisateur ou chargé depuis une source externe, il faudra ajouter une sanitisation HTML stricte.

### Normalisation Trop Intelligente

`catalog.ts` corrige certains contenus automatiquement. C'est pratique pour stabiliser l'app, mais cela peut masquer des erreurs dans les fiches source.

Règle : si une correction automatique devient permanente, préférer corriger la donnée.

### Données Chargées Statiquement

Le build sépare les chunks, mais le catalogue importe encore toutes les catégories. Pour une croissance importante du corpus, la prochaine étape serait :

- index léger chargé au démarrage ;
- import dynamique de la catégorie ;
- import dynamique de la fiche ouverte.

### Routeur Maison

Le routeur actuel est volontairement simple. Il suffit pour une SPA statique.

Si les besoins augmentent :

- nested routes complexes ;
- loaders asynchrones ;
- transitions ;
- erreurs par route ;
- SSR ;

alors il faudra considérer un routeur dédié.

## Principes De Maintenance

- Garder le schéma strict.
- Ne pas dupliquer les constantes de présentation.
- Ajouter les catégories de nœuds dans `schema.ts` et `presentation.ts` ensemble.
- Ajouter les onglets dans `sheetTabs`.
- Préférer les factories de fiches aux objets répétés.
- Préférer `buildSheetPath()` et `buildCategoryPath()` aux URLs écrites à la main.
- Vérifier que chaque map référence des nœuds existants.
- Vérifier que chaque tab a une map correspondante.
- Garder les corrections pédagogiques dans les données source dès que possible.
