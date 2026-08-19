# Documentation Technique

## Vue d'ensemble

Alkhawarizmi est une SPA React/Vite statique. Elle n'utilise pas de backend : le catalogue est chargé depuis les modules TypeScript du dépôt, puis normalisé au démarrage de l'application.

Flux principal :

```text
src/data/sheets/**
  -> src/data/catalog.ts
  -> src/ui/App.tsx
  -> src/ui/SheetView.tsx
  -> composants de rendu
```

## Stack

- React 19
- TypeScript
- Vite
- Vitest + Testing Library
- vite-plugin-pwa
- lucide-react

La version Node de référence est définie dans `.nvmrc`. Le gestionnaire de paquets de référence est déclaré dans `package.json`.

## Quality gate

La commande de référence, en local comme en CI, est :

```bash
npm run check
```

Elle exécute successivement :

1. ESLint sans warning toléré ;
2. vérification Prettier ;
3. tests Vitest avec couverture ;
4. build de production.

Le build exécute lui-même le type-check complet avant Vite :

```text
npm run build
  -> npm run typecheck
     -> tsconfig.json          (code applicatif)
     -> tsconfig.tooling.json  (vite.config.ts + vitest.config.ts)
  -> vite build
```

Commandes ciblées :

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run test:coverage
npm run build
```

## Arborescence principale

```text
src/
  audio/
    readableContent.ts
    useSpeechReader.ts
  data/
    catalog.ts
    presentation.ts
    schema.ts
    sheets/
      conception/
      design/
      technique/
      production/
      collaboration/
      culture/
  styles/
    fonts.css
    global.css
  test/
  ui/
    App.tsx
    SheetView.tsx
    routing.ts
    richText.ts
    components/
  main.tsx

public/
  404.html
  fonts/
  icons/
```

Les tests sont majoritairement colocés avec le code qu'ils couvrent. `src/test/` contient la configuration partagée de l'environnement de test.

## Modèle de données

`src/data/schema.ts` contient les types structurants du catalogue :

- `DevSheet`
- `SheetNode`
- `SystemMap`
- `PracticeSection`
- `PracticeConception`
- `SheetTab`
- `SheetPart`
- `CategoryName`

Les parties actuellement admises par le type sont :

```text
C, D, T, P, Co, F
```

Les catégories exposées par `catalog.ts`, dans l'ordre applicatif actuel, sont :

```text
Conception -> Design -> Technique -> Production -> Collaboration -> Culture
```

Les onglets valides sont centralisés dans `sheetTabs` dans `schema.ts`.

## Catalogue et normalisation

`src/data/catalog.ts` est la frontière entre les données de fiches et l'application.

Il est responsable de :

- agréger les modules de fiches ;
- construire la liste normalisée `sheets` ;
- exposer les catégories ;
- résoudre la catégorie d'une fiche ;
- construire les chemins internes ;
- exposer les helpers de visibilité et de recherche ;
- appliquer les normalisations nécessaires au modèle de rendu.

Les invariants structurels du catalogue sont vérifiés par `src/data/catalog.test.ts`. Les tests doivent rester la source de vérité pour ces contrôles plutôt qu'une commande d'audit manuelle avec un nombre de fiches codé en dur.

## Routing

Le routing est volontairement léger et vit dans `src/ui/App.tsx`.

Routes supportées :

```text
/
/:category
/:category/:sheetId
/:category/:sheetId/:nodeId
```

Query strings utilisées :

```text
?q=...       recherche d'une catégorie
?tab=...     onglet actif d'une fiche
```

`src/ui/routing.ts` résout les URLs avec `import.meta.env.BASE_URL`, ce qui garde les liens compatibles avec le sous-chemin GitHub Pages.

La navigation interne est assurée par `RouteLink` et l'History API. Les clics modifiés (Ctrl/Cmd/Shift, nouvelle fenêtre, etc.) conservent le comportement natif du navigateur.

Si une fiche est ouverte sous un mauvais slug de catégorie, `App.tsx` répare l'URL avec `replaceState` tout en conservant l'onglet demandé.

## Rendu des fiches

`SheetView.tsx` orchestre :

- l'onglet actif ;
- la carte systémique ;
- le nœud actif ;
- le panneau de détail ;
- les URLs de fiche/nœud ;
- la lecture audio.

`SystemMap.tsx` rend la carte SVG et sa variante mobile. `NodePanel.tsx` rend le détail d'un nœud. `AudioPlayerBar.tsx` expose les contrôles du lecteur Web Speech.

## Texte riche

Une partie des données de fiches contient du HTML statique versionné dans le dépôt. Le passage vers `dangerouslySetInnerHTML` est centralisé et protégé par `src/ui/richText.ts` ainsi que par des tests de catalogue qui empêchent certains marquages exécutables dans le contenu authoré.

Cette confiance ne doit pas être étendue à une future source externe ou éditable par utilisateur sans mécanisme de sanitisation adapté.

## Lecture audio

`src/audio/readableContent.ts` transforme une fiche en sections lisibles.

`src/audio/useSpeechReader.ts` gère notamment :

- la file de lecture ;
- la voix ;
- pause/reprise ;
- navigation entre sections ;
- vitesse et respiration ;
- persistance locale des préférences ;
- reprise et fallback en cas d'échec d'une voix.

La vitesse par défaut d'un utilisateur sans préférence enregistrée est `1x`.

## Build Vite

`vite.config.ts` dérive le `base` de `GITHUB_REPOSITORY` uniquement lorsque `GITHUB_PAGES=true`. En local, le base reste `/`.

Les dépendances React et les icônes sont séparées des données. Les données sont également regroupées par catégorie afin d'éviter un unique bundle de plusieurs mégaoctets.

Ces chunks sont des frontières de build/cache, pas du lazy loading : `catalog.ts` importe encore les catégories statiquement. Un vrai chargement à la demande nécessiterait une architecture de chargement asynchrone du catalogue.

## PWA

La PWA est configurée dans `vite.config.ts` avec `vite-plugin-pwa`.

Caractéristiques principales :

- stratégie de mise à jour `autoUpdate` ;
- manifest localisé en français ;
- `scope` et `start_url` alignés sur le base Vite ;
- icônes PNG 192/512 et asset maskable dédié ;
- précache des JS, CSS, HTML, SVG, PNG et WOFF2 ;
- enregistrement du service worker uniquement en production.

Le service worker est enregistré dans `src/main.tsx` via `virtual:pwa-register`.

## GitHub Pages

Le workflow de déploiement est déclenché par la fin du workflow `CI` sur `main`. Le job de build checkout le SHA exact validé par CI, puis publie l'artifact `dist` via les actions GitHub Pages officielles épinglées par SHA.

`public/404.html` restaure les routes de SPA lorsqu'une URL profonde est ouverte directement sur GitHub Pages.

## CSS et assets

Le design system global est dans `src/styles/global.css`.

Les polices Syne et JetBrains Mono sont auto-hébergées dans `public/fonts/` afin de ne pas dépendre d'un CDN au runtime. Leurs licences SIL OFL sont conservées à côté des fichiers de polices et référencées depuis `THIRD_PARTY_NOTICES.md`.

Les icônes PWA sont dans `public/icons/`.

## CI et maintenance

`.github/workflows/ci.yml` exécute `npm ci` puis `npm run check` sur les pull requests et les pushes vers `main`.

Dependabot est configuré pour :

- grouper les mises à jour mineures/patch React et types React ;
- grouper les mises à jour mineures/patch de développement ;
- suivre séparément les GitHub Actions.

Les migrations majeures restent volontairement hors de ces groupes afin d'être traitées comme des changements de compatibilité explicites.

## Licences

Le dépôt distingue :

- le code original du projet : `LICENSE` ;
- le contenu pédagogique : `CONTENT_LICENSE.md` ;
- la politique commerciale : `COMMERCIAL_LICENSE.md` ;
- les composants tiers redistribués : `THIRD_PARTY_NOTICES.md` et les notices placées avec les assets concernés.

## Points d'architecture à surveiller

### Taille du corpus

Les données du catalogue restent importées statiquement. Si le corpus continue de grossir, le prochain levier pertinent sera un chargement dynamique par catégorie ou par fiche plutôt qu'une multiplication indéfinie des règles `manualChunks`.

### Complexité des composants

`NodePanel.tsx` et `AudioPlayerBar.tsx` concentrent encore des responsabilités cohérentes, mais leur croissance doit être surveillée. Une extraction supplémentaire n'est justifiée que lorsqu'une responsabilité autonome apparaît réellement.

### Normalisation

La normalisation de `catalog.ts` sert de couche de compatibilité. Elle ne doit pas devenir un substitut permanent à la correction des données source.
