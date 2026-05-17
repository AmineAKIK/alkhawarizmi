# Guide De Contribution Aux Fiches

## Objectif

Ce guide décrit comment ajouter ou modifier une fiche sans casser la cohérence pédagogique, technique ou visuelle du catalogue.

Une fiche n'est pas seulement une page de contenu. C'est une carte systémique composée de nœuds, de relations, de pratiques et de questions de compréhension.

## Avant D'ajouter Une Fiche

Vérifier :

- la catégorie pédagogique à laquelle elle appartient ;
- sa place dans la progression globale ;
- les concepts déjà couverts ailleurs ;
- les références croisées nécessaires ;
- le format de pratique attendu pour sa partie.

Ne pas créer une fiche si le contenu répète substantiellement une fiche existante. Ajouter une référence croisée ou enrichir la fiche existante.

## Choisir La Partie

### Conception

Pour les concepts liés à :

- problème ;
- utilisateur ;
- périmètre ;
- viabilité ;
- décision ;
- mesure ;
- apprentissage.

Format pratique : exercices.

Section 4 :

```text
Ce qu'un product manager expérimenté anticipe
```

### Design

Pour les concepts liés à :

- expérience utilisateur ;
- principes visuels ;
- composants ;
- patterns ;
- design system ;
- handoff design-code.

Format pratique : exercices.

Section 4 :

```text
Ce qu'un designer expérimenté anticipe
```

### Technique

Pour les concepts liés à :

- environnement ;
- initialisation ;
- architecture ;
- cycle local ;
- Git ;
- données ;
- API ;
- frontend ;
- tests ;
- déploiement.

Format pratique : commandes.

Section 4 :

```text
Ce qu'un senior anticipe
```

### Production

Pour les concepts liés à :

- observabilité ;
- sécurité ;
- performance ;
- incidents ;
- maintenance.

Format pratique : commandes ou exercices selon le nœud.

Section 4 :

```text
Ce qu'un ingénieur de garde anticipe
```

### Collaboration

Pour les concepts liés à :

- travail en équipe ;
- communication externe ;
- documentation ;
- organisation du travail.

Format pratique : exercices.

Section 4 :

```text
Ce qu'un tech lead expérimenté anticipe
```

## Structure D'une Fiche

Une fiche contient :

- metadata ;
- onglets ;
- nœuds ;
- cartes.

Les parties sans onglets spécialisés doivent utiliser une factory :

```ts
export const maFiche = conceptionSheet({
  id: "...",
  number: 17,
  title: "...",
  ...
});
```

Factories disponibles :

- `conceptionSheet`
- `designSheet`
- `prodSheet`
- `coSheet`

Pour les nœuds des parties qui ont une factory :

- `designNode`
- `prodNode`
- `coNode`

## Règles Pour Les Nœuds

Chaque nœud doit avoir :

- `id`
- `label`
- `icon`
- `kind`
- `osLabel`
- `niveau`
- `sections`

Chaque nœud doit avoir les huit sections :

- `why`
- `system`
- `choice`
- `senior`
- `errors`
- `invariants`
- `practice`
- `verification`

## Section 1 — Pourquoi Ça Existe

Commencer par le problème.

À éviter :

```text
Le cache est un mécanisme qui...
```

Préférer :

```text
Quand chaque requête recalcule la même donnée, l'application ralentit alors que rien d'utile ne change...
```

Critères :

- problème concret ;
- douleur reconnaissable ;
- contexte propre à la partie ;
- coût de l'absence du concept.

## Section 2 — Sa Place Dans Le Système

Nommer au moins deux relations.

Les références croisées doivent utiliser :

```html
<span class="ref-fiche">→ T05</span>
```

La relation doit être causale.

À éviter :

```text
Ce concept est lié aux tests et au déploiement.
```

Préférer :

```text
Ce concept prépare les tests <span class="ref-fiche">→ T09</span> parce qu'il rend le comportement observable, puis sécurise le déploiement <span class="ref-fiche">→ T10</span> parce qu'on peut vérifier que la même règle tient hors du local.
```

## Section 3 — Le Choix Conscient

Présenter :

- alternatives réelles ;
- contextes d'usage ;
- trade-offs ;
- critères de choix.

Ne pas présenter une préférence personnelle comme une règle universelle.

## Section 4 — Anticipation Expérimentée

Cette section doit contenir du savoir tacite.

Question de contrôle :

```text
Est-ce qu'une personne expérimentée dirait : oui, c'est exactement ce qu'on apprend après quelques vrais projets ?
```

Si la section pourrait apparaître dans un article générique sans modification, elle est trop faible.

## Section 5 — Erreurs Classiques

Format obligatoire :

```html
<p><strong>Pattern 1 — Nom mémorisable :</strong> description...</p>
<p><strong>Pattern 2 — Nom mémorisable :</strong> description...</p>
<p><strong>Pattern 3 — Nom mémorisable :</strong> description...</p>
```

Il faut exactement trois patterns.

Chaque pattern doit contenir :

- un nom reconnaissable ;
- le comportement ;
- la cause ;
- la conséquence.

## Section 6 — Invariants

La formulation doit contenir :

```text
Ce qui change : ...
Ce qui ne change pas : ...
```

Un invariant doit rester vrai si :

- l'outil change ;
- le framework change ;
- l'organisation change ;
- la technologie change.

## Section 7 — Pratique

### Exercices

Utiliser :

```ts
practice: {
  kind: "exercices",
  items: [
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

Critères :

- 3 à 5 étapes ;
- verbes d'action ;
- output concret ;
- critère auto-évaluable ;
- piège spécifique.

### Commandes

Utiliser :

```ts
practice: {
  kind: "cmds",
  commands: [
    { type: "comment", value: "Installer" },
    { type: "cmd", value: "npm install" },
    { type: "snippet", value: "const config = ..." }
  ],
  verification: "...",
  debt: "..."
}
```

Critères :

- commandes exactes ;
- ordre logique ;
- vérification présente ;
- dette spécifique ;
- snippets de code marqués `snippet`, pas `cmd`.

## Section 8 — Vérifie Ta Compréhension

Exactement trois questions :

1. principe ;
2. scénario concret ;
3. invariant ou trade-off.

À éviter :

- questions oui/non ;
- scénario vague ;
- trois questions qui testent la même chose ;
- mémorisation pure.

## Cartes SVG

Chaque map doit avoir :

- `viewBox`
- `nodes`
- `edges`

Chaque nœud de map doit avoir :

- `id`
- `x`
- `y`
- `w`
- `h`

Chaque arête doit avoir :

- `x1`
- `y1`
- `x2`
- `y2`
- `label` si utile

Tous les IDs de map doivent exister dans `nodes`.

Si la même map est utilisée pour JS et Python :

```ts
const sharedMap = { ... };

maps: dualLanguageMaps(sharedMap)
```

## Onglets

Onglets valides :

- `universel`
- `windows`
- `macos`
- `linux`
- `js`
- `python`
- `workflow`
- `frontend`

Les parties Conception, Design, Production et Collaboration utilisent généralement `universel`.

La Partie Technique peut utiliser :

- OS si les différences sont système ;
- JS/Python si les différences sont langage.

Ne pas mélanger OS et langage dans une même fiche.

## Couleurs Et Kinds

Ajouter un nouveau `kind` exige de modifier :

1. `NodeKind` dans `schema.ts`
2. `nodeKindLabels` dans `presentation.ts`
3. `nodeKindColors` dans `presentation.ts`
4. éventuellement le CSS si une classe dépend du kind.

Ne pas inventer une couleur localement dans une fiche.

## URLs

Ne jamais construire une URL de fiche à la main dans l'UI.

Utiliser :

```ts
buildCategoryPath(category)
buildSheetPath(sheet, tab, nodeId, searchParams)
```

## Checklist Avant Validation

```bash
npm run build
```

Puis vérifier manuellement :

- la fiche apparaît dans la bonne catégorie ;
- la carte affiche tous les nœuds ;
- chaque nœud s'ouvre ;
- retour carte fonctionne ;
- changement d'onglet fonctionne si présent ;
- l'URL directe vers un nœud fonctionne ;
- la recherche trouve la fiche ;
- le responsive mobile reste lisible.

## Anti-Patterns À Éviter

- Dupliquer une map JS/Python identique.
- Ajouter une couleur directement dans un composant.
- Ajouter une URL écrite à la main.
- Mettre du code dans une commande `cmd` alors que c'est un snippet.
- Laisser une fiche corriger son contenu par la normalisation au lieu de corriger la source.
- Créer un nœud sans relation systémique.
- Écrire une section 4 générique.
- Ajouter une quatrième erreur classique.
- Ajouter une question de vérification en plus "par prudence".
