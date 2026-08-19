# Contribuer à Alkhawarizmi

Merci de l'intérêt porté à ce projet. Ce document couvre le workflow de contribution technique. Pour ajouter ou modifier une fiche pédagogique, voir le [guide de contribution aux fiches](docs/contribution-fiches.md).

## Prérequis

Le dépôt utilise Node.js 22.22.2 comme version de référence. Avec nvm :

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

## Licences et droits sur les contributions

Avant de proposer une contribution, assurez-vous d'avoir le droit de la soumettre.

- Les contributions au **code source** doivent pouvoir être distribuées sous la licence [PolyForm Noncommercial 1.0.0](LICENSE) appliquée au logiciel.
- Les contributions au **contenu pédagogique** destiné à `src/data/sheets/**` doivent pouvoir être distribuées sous [CC BY-NC-SA 4.0](CONTENT_LICENSE.md).
- L'acceptation d'une pull request ne vaut pas transfert automatique de droits commerciaux au mainteneur.

Si une contribution pédagogique substantielle doit ensuite être incluse dans une exploitation commerciale du projet, un accord écrit séparé avec son auteur pourra être nécessaire avant fusion ou avant cette exploitation. Le projet n'impose pas de cession générale de droits cachée dans ce guide.

## Contenu pédagogique

Voir [docs/contribution-fiches.md](docs/contribution-fiches.md) pour la structure attendue d'une fiche, les parties du catalogue et les conventions de rédaction.
