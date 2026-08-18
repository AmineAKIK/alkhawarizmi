# Alkhawarizmi

Alkhawarizmi est un catalogue de fiches pédagogiques systémiques pour apprendre le développement logiciel comme un raisonnement complet, pas comme une collection de recettes.

Chaque fiche transforme un sujet en carte navigable :

- pourquoi le concept existe ;
- où il se place dans le système ;
- quels choix conscients faire ;
- ce qu'une personne expérimentée anticipe ;
- quelles erreurs classiques éviter ;
- quels invariants retenir ;
- quoi pratiquer ;
- comment vérifier sa compréhension.

## Documentation

- [Documentation conceptuelle](docs/conceptuelle.md)
- [Documentation technique](docs/technique.md)
- [Guide de contribution aux fiches](docs/contribution-fiches.md)

## Démarrage

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
```

Prévisualisation du build :

```bash
npm run preview
```

## Stack

- React 19
- TypeScript
- Vite
- vite-plugin-pwa
- lucide-react

## Structure rapide

```text
src/
  data/
    schema.ts          Types du modèle de fiches
    catalog.ts         Catalogue, catégories, normalisation, routes
    presentation.ts    Couleurs, labels, textes partagés de rendu
    sheets/            Contenu pédagogique
  ui/
    App.tsx            Routage client et pages catalogue
    SheetView.tsx      Rendu d'une fiche, carte SVG et panneau de nœud
  styles/
    global.css         Design system CSS de l'application
```

L'application est une SPA statique : toutes les données sont locales au dépôt, sans backend.
