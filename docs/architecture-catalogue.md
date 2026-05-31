# Architecture du Catalogue

## Principe fondamental

Le catalogue Alkhawarizmi poursuit un seul objectif : former une façon de penser, pas enseigner des outils. Cela implique une progression simultanée sur deux niveaux qui ne se mélangent jamais.

---

## Les deux niveaux de progression

### Niveau 1 — La colonne vertébrale opérationnelle (entre fiches)

L'ordre des fiches dans une catégorie suit le cycle de vie logique du domaine. Le lecteur avance de ce qu'il fait *d'abord* vers ce qu'il fait *ensuite*. Cette progression est **séquentielle et causale** : comprendre la fiche N est nécessaire pour tirer profit de la fiche N+1.

### Niveau 2 — La progression pédagogique interne (dans une fiche)

À l'intérieur d'une fiche, les nœuds progressent du pourquoi vers le comment, du principe vers la pratique, du général vers le particulier. Ce niveau est documenté dans `contribution-fiches.md`.

**Ces deux niveaux ne se mélangent pas.** Une fiche ne peut pas être à la fois un concept général et un outil pratique. Le niveau d'abstraction d'une fiche détermine sa position dans la colonne vertébrale.

---

## Les trois niveaux d'abstraction d'une fiche

Avant de créer ou de placer une fiche, identifier son niveau :

**Conceptuel** — enseigne un modèle mental, un principe, une façon de voir.
Exemples : C01 (Idée vs Opportunité), T03 (Architecture), Co01 (Travailler en équipe).
→ Se place au début de la colonne vertébrale de sa catégorie.

**Méthodologique** — enseigne une méthode, un cadre de travail, un processus.
Exemples : Co09 (Méthodes agiles), Co08 (Modèles de gestion), C05 (Décider et prioriser).
→ Se place au milieu, après les concepts qui le justifient.

**Instrumental** — enseigne un outil, une convention, une pratique concrète et immédiatement actionnable.
Exemples : Co10 (Outils de gestion), C07 (User Stories), Co07 (Méthodes de communication).
→ Se place en fin de colonne vertébrale, après les méthodes qui le motivent.

---

## Le test de placement d'une fiche

Trois questions à poser avant de placer une fiche dans une catégorie :

**Q1 — Quel est son niveau d'abstraction ?**
Conceptuel → début. Méthodologique → milieu. Instrumental → fin.

**Q2 — A-t-elle un précédent logique dans la même catégorie ?**
La fiche doit pouvoir compléter la phrase : *"Maintenant que tu comprends X, voici Y."*
Si elle ne peut pas, elle est mal placée ou dans la mauvaise catégorie.

**Q3 — Qui en a besoin, à quel moment ?**
Si la réponse est *"n'importe quand"* ou *"tout le monde"*, la fiche est trop générique : la découper ou la reclasser.

---

## Les catégories et leurs colonnes vertébrales

### Conception — du problème à la décision formalisée

Cycle de vie : explorer le problème → comprendre les utilisateurs → délimiter la solution → évaluer la viabilité → décider et prioriser → mesurer et apprendre → formaliser le travail en stories.

```
C01  Idée et Problème Réel              [conceptuel]
C02  Les Utilisateurs                    [conceptuel]
C03  La Solution et le Périmètre         [conceptuel]
C04  La Viabilité et les Risques         [méthodologique]
C05  Décider et Prioriser                [méthodologique]
C06  Mesurer et Apprendre                [méthodologique]
```

**Règle Conception :** toute fiche ajoutée doit s'inscrire dans la démarche de découverte et de validation du problème ou de la solution. Les outils de formalisation du travail (user stories, backlog, tickets) n'appartiennent pas à Conception — ils appartiennent à Collaboration / Phase 2.

### Design — de l'expérience aux composants

Cycle de vie : comprendre l'expérience utilisateur → poser les principes visuels → construire les composants → passer le relais au code.

```
D01  Expérience Utilisateur              [conceptuel]
D02  Principes Visuels                   [conceptuel]
D03  Composants et Patterns              [méthodologique]
D04  Du Design au Code                   [instrumental]
```

**Règle Design :** toute fiche ajoutée doit s'inscrire dans la transformation d'un besoin utilisateur compris (Conception) en interface maintenable (Technique). La progression va du principe vers le système de design vers le code.

### Technique — de l'environnement au déploiement

Cycle de vie : setup de l'environnement → initialiser le projet → architecting → cycle quotidien → gestion du code → données → API → frontend → tests → déploiement.

```
T01  Environnement de Développement      [conceptuel]
T02  Initialisation du Projet            [méthodologique]
T03  Architecture d'une Application      [conceptuel]
T04  Cycle de Développement Local        [méthodologique]
T05  Git Workflow                        [instrumental]
T06  Données et Persistance              [méthodologique]
T07  API et Communication                [méthodologique]
T08  Frontend et État                    [méthodologique]
T09  Tests                               [méthodologique]
T10  Déploiement                         [instrumental]
```

**Règle Technique :** toute fiche ajoutée doit correspondre à une étape du cycle de vie technique d'une application web fullstack. L'ordre est séquentiel : on ne peut pas tester (T09) ce qu'on n'a pas architecturé (T03) ni construit (T06–T08).

### Production — de l'observation à l'itération

Cycle de vie : observer ce qui se passe → sécuriser → optimiser → maintenir et itérer.

```
P01  Monitoring et Observabilité         [conceptuel]
P02  Sécurité Applicative                [méthodologique]
P03  Performance et Optimisation         [méthodologique]
P04  Maintenance et Itération            [instrumental]
```

**Règle Production :** toute fiche ajoutée doit s'inscrire dans la gestion d'un système vivant en production. La progression va de la visibilité (voir ce qui se passe) à l'action (corriger, optimiser, évoluer).

### Collaboration — de l'humain à l'écosystème

La Collaboration n'a pas de cycle de vie temporel comme Technique. Son cycle de vie est **thématique** : on progresse du plus humain et interne au plus structurel et externe. Trois phases obligatoires, dans cet ordre.

#### Phase 1 — L'humain et l'équipe

Comprendre avec qui on travaille, comment se parler, comment s'organiser au quotidien.
Précède tout le reste : sans culture d'équipe et sans communication claire, aucune méthode ni outil ne fonctionne.

```
Co01  Travailler en Équipe Technique              [conceptuel]
Co02  Communiquer Hors de l'Équipe Technique      [conceptuel]
Co03  Documentation Vivante                        [méthodologique]
Co04  Organiser le Travail                         [méthodologique]
Co05  Parties Prenantes                            [méthodologique]
Co06  Sujets de Communication                      [instrumental]
Co07  Méthodes de Communication                    [instrumental]
```

#### Phase 2 — Les méthodes, le formalisme et l'outillage

Comprendre comment le travail collectif est structuré, planifié, formalisé et mesuré.
Suppose la Phase 1 acquise : on ne peut pas choisir entre Scrum et Kanban sans comprendre d'abord comment une équipe fonctionne.

```
Co08  Modèles de gestion de projet                 [conceptuel de phase]
Co09  Méthodes agiles                              [méthodologique]
Co10  Outils de gestion de projet                  [instrumental]
Co11  Les User Stories                             [méthodologique]
Co12  User Stories en Pratique                     [instrumental]
Co13  Métadonnées d'une User Story                 [instrumental]
```

#### Phase 3 — L'écosystème collaboratif externe

Comprendre dans quel monde plus large le travail collectif s'inscrit : open source, communautés, ressources partagées.
Se place en dernier : c'est un contexte d'élargissement, pas un prérequis au travail quotidien.

```
Co14  Les ressources collaboratives en informatique           [conceptuel de phase]
Co15  Avantages et optimisation des ressources collaboratives [méthodologique]
Co16  Défis et évolution des ressources collaboratives        [instrumental]
```

**Règle Collaboration :** toute nouvelle fiche doit être assignée à l'une des trois phases. Une fiche qui ne peut pas être placée dans une phase sans briser la logique de progression appartient à une autre catégorie.

---

## Règles de création d'une nouvelle fiche

1. **Identifier le niveau d'abstraction** (conceptuel / méthodologique / instrumental).
2. **Identifier la catégorie** par le domaine du cycle de vie (conception, design, technique, production, collaboration).
3. **Identifier la position** dans la colonne vertébrale : après quelle fiche, avant quelle fiche, et pourquoi.
4. **Vérifier le précédent logique** : compléter la phrase *"Maintenant que tu comprends X, voici Y."*
5. **Pour Collaboration** : identifier la phase (humain, méthodes, écosystème) et vérifier qu'elle y appartient.

Si une fiche ne passe pas ces cinq étapes, elle est soit mal découpée, soit dans la mauvaise catégorie, soit un enrichissement d'une fiche existante plutôt qu'une fiche nouvelle.

---

## Ce qu'on ne fait pas

- On ne crée pas de 6e catégorie sans redéfinir le cycle de vie global.
- On ne place pas une fiche instrumentale avant les fiches conceptuelles qui la justifient.
- On ne mélange pas les niveaux d'abstraction dans une même séquence contiguë sans transition explicite.
- On ne crée pas une fiche si son contenu est déjà couvert par les nœuds d'une fiche existante — on enrichit la fiche existante.
- On ne crée pas de fiche dont le seul lien avec la catégorie est thématique sans lien causal avec les fiches adjacentes.
