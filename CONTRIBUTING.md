# Contribuer à Alkhawarizmi

Merci de l'intérêt porté à ce projet. Ce document couvre le workflow de contribution technique. Pour ajouter ou modifier une fiche pédagogique, voir le [guide de contribution aux fiches](docs/contribution-fiches.md).

## Prérequis

Le dépôt utilise Node.js 22.13.0 comme version de référence. Avec nvm :

```bash
nvm use
```

## Mise en route

```bash
npm install
npm run dev
```

## Avant d'ouvrir une pull request

Exécuter le même quality gate que la CI :

```bash
npm run check
```

Il couvre le lint sans warnings tolérés, le formatage, les tests avec couverture et le build TypeScript/Vite. Toutes ces vérifications doivent passer avant fusion.

Pour cibler une vérification :

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run test:coverage
npm run build
```

## Style de code

- TypeScript strict, pas de nouvelles assertions non-null (`!`) sans garde explicite.
- Ne pas désactiver une règle ESLint pour masquer une fonction ou une dépendance instable : corriger la cause ou documenter explicitement l'exception lorsqu'elle est réellement nécessaire.
- Les URLs internes doivent passer par les helpers de routage du projet afin de rester compatibles avec le `BASE_URL` GitHub Pages.
- Les composants React vivent dans `src/ui/`, les données pédagogiques dans `src/data/`.
- Les tests ne doivent jamais sortir silencieusement avant leurs assertions : une précondition manquante doit faire échouer le test.

## Commits

Des messages de commit clairs et descriptifs sont préférés, idéalement au format `type(scope): description` (ex. `fix(audio): corrige la relecture après pause`).

## Contenu pédagogique

Voir [docs/contribution-fiches.md](docs/contribution-fiches.md) pour la structure attendue d'une fiche, les parties du catalogue et les conventions de rédaction.
