# Contribuer à Alkhawarizmi

Merci de l'intérêt porté à ce projet. Ce document couvre le workflow de contribution technique. Pour ajouter ou modifier une fiche pédagogique, voir le [guide de contribution aux fiches](docs/contribution-fiches.md).

## Mise en route

```bash
npm install
npm run dev
```

## Avant d'ouvrir une pull request

```bash
npm run lint       # ESLint
npm run format:check  # Prettier (vérification uniquement)
npm run typecheck  # tsc --noEmit
npm test           # Vitest
npm run build      # build complet
```

Toutes ces commandes doivent passer sans erreur.

## Style de code

- TypeScript strict, pas de nouvelles assertions non-null (`!`) sans garde explicite.
- Le linting (ESLint) et le formatage (Prettier) sont appliqués automatiquement via `npm run lint` / `npm run format`.
- Les composants React vivent dans `src/ui/`, les données pédagogiques dans `src/data/`.

## Commits

Des messages de commit clairs et descriptifs sont préférés, idéalement au format `type(scope): description` (ex. `fix(audio): corrige la relecture après pause`).

## Contenu pédagogique

Voir [docs/contribution-fiches.md](docs/contribution-fiches.md) pour la structure attendue d'une fiche, les parties du catalogue et les conventions de rédaction.
