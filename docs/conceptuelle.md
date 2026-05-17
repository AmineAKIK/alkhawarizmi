# Documentation Conceptuelle

## Intention

Alkhawarizmi sert à enseigner le développement logiciel comme une suite de décisions reliées. Le projet ne cherche pas à produire des fiches de commandes ni des résumés de cours classiques. Il cherche à former une manière de penser : comprendre un problème, situer un concept, choisir avec des critères, anticiper les erreurs, puis pratiquer.

Le principe central est simple : un débutant ne devient pas solide en mémorisant des outils. Il devient solide quand il comprend pourquoi ces outils existent, dans quel système ils s'insèrent, ce qu'ils rendent possible, et ce qui casse quand ils sont mal utilisés.

## Public Visé

Le contenu s'adresse à des débutants complets qui veulent devenir des développeurs capables de raisonner, pas seulement d'exécuter des tutoriels.

Le niveau pédagogique visé est exigeant :

- assez concret pour un débutant ;
- assez rigoureux pour éviter les simplifications trompeuses ;
- assez systémique pour montrer les liens entre conception, design, technique, production et collaboration.

## Organisation Pédagogique

Les catégories sont ordonnées selon le cycle de vie logique d'une application :

1. **Conception** : comprendre le problème, les utilisateurs, le périmètre, les risques, les décisions et la mesure.
2. **Design** : transformer la compréhension du problème en expérience lisible, utilisable et cohérente.
3. **Technique** : construire l'application avec un environnement, une architecture, des données, des APIs, un frontend, des tests et un déploiement.
4. **Production** : faire vivre l'application dans le réel : observabilité, sécurité, performance, maintenance.
5. **Collaboration** : travailler avec d'autres humains : équipe technique, stakeholders, documentation, organisation.

Cette progression évite de commencer par l'outil. On ne code pas d'abord ; on comprend ce qu'on construit, pour qui, pourquoi, puis comment le maintenir et le faire évoluer.

## Anatomie D'une Fiche

Une fiche représente un domaine complet sous forme de carte systémique. Elle contient :

- une carte SVG de nœuds reliés ;
- un panneau détaillé par nœud ;
- huit sections pédagogiques par nœud.

Chaque nœud est un concept ou une pratique que le lecteur peut explorer. Les arêtes de la carte décrivent des relations logiques : dépendance, clarification, validation, facilitation, prévention, etc.

## Les Huit Sections D'un Nœud

### 1. Pourquoi ça existe

Cette section part du problème, pas d'une définition.

Un bon nœud ne commence pas par "X est...". Il commence par la friction qui rend X nécessaire : le chaos avant l'outil, l'erreur avant le concept, la douleur avant la méthode.

Objectif : faire sentir au lecteur que le concept existe pour résoudre un problème réel.

### 2. Sa place dans le système

Cette section situe le nœud dans le curriculum.

Elle explique :

- ce que ce nœud utilise ;
- ce qu'il rend possible ;
- quelles fiches ou pratiques sont reliées ;
- pourquoi cette relation est causale.

Objectif : empêcher l'apprentissage isolé. Rien n'est enseigné comme une île.

### 3. Le choix conscient

Cette section montre les alternatives et les critères de décision.

Elle ne doit pas dire "utilise X parce que c'est mieux". Elle doit expliquer quand X est adapté, quand une autre approche est plus raisonnable, et quel compromis on accepte.

Objectif : apprendre à choisir, pas à appliquer une préférence.

### 4. Ce qu'une personne expérimentée anticipe

Le titre change selon la partie :

- Conception : `Ce qu'un product manager expérimenté anticipe`
- Design : `Ce qu'un designer expérimenté anticipe`
- Technique : `Ce qu'un senior anticipe`
- Production : `Ce qu'un ingénieur de garde anticipe`
- Collaboration : `Ce qu'un tech lead expérimenté anticipe`

Cette section porte la valeur tacite de la fiche. Elle doit contenir ce qu'on apprend après avoir vu des projets échouer, des incidents arriver, des équipes se désaligner, des utilisateurs contourner une interface.

Objectif : transmettre le modèle mental d'une personne expérimentée, pas une liste de bonnes pratiques génériques.

### 5. Les erreurs classiques

Chaque nœud doit présenter exactement trois patterns d'erreur.

Un pattern d'erreur n'est pas une évidence comme "ne pas tester". C'est un comportement reconnaissable, nommé, avec sa cause et sa conséquence.

Objectif : rendre les erreurs mémorisables et détectables dans la vraie vie.

### 6. Les invariants

Cette section distingue ce qui change de ce qui dure.

Elle doit contenir la formulation :

```text
Ce qui change : ...
Ce qui ne change pas : ...
```

Objectif : éviter que le lecteur confonde un outil actuel avec un principe durable.

### 7. Pratique

Le format dépend de la partie :

- Conception : exercices uniquement.
- Design : exercices uniquement.
- Technique : commandes uniquement.
- Production : mixte, commandes ou exercices selon le nœud.
- Collaboration : exercices uniquement.

Objectif : transformer la compréhension en action vérifiable.

### 8. Vérifie ta compréhension

Chaque nœud doit avoir exactement trois questions :

1. une question de principe ;
2. un scénario concret ;
3. un invariant ou un trade-off.

Objectif : forcer le lecteur à reformuler, appliquer et généraliser.

## Philosophie De Contenu

### Enseigner Le Pourquoi Avant Le Comment

Une commande sans contexte donne une illusion de compétence. Le lecteur peut copier, mais il ne sait pas diagnostiquer.

Les fiches cherchent donc à répondre dans cet ordre :

1. Quel problème existait ?
2. Pourquoi ce concept est apparu ?
3. Où se place-t-il ?
4. Comment le choisir ?
5. Comment le pratiquer ?

### Enseigner Des Systèmes, Pas Des Recettes

Chaque fiche est reliée aux autres. Par exemple :

- la priorisation de Conception nourrit l'organisation de Collaboration ;
- les variables d'environnement de Technique préparent la sécurité en Production ;
- les principes de Design contraignent les composants de Technique ;
- l'observabilité de Production donne des signaux pour la mesure produit.

Le curriculum complet forme une boucle : concevoir, construire, observer, apprendre, collaborer, recommencer.

### Rendre L'Erreur Visible

Le projet donne une place importante aux erreurs classiques parce qu'un débutant apprend souvent trop tard ce qu'il aurait dû surveiller.

Nommer les patterns d'erreur permet de les reconnaître :

- avant de les commettre ;
- pendant qu'ils apparaissent ;
- après coup, dans une rétrospective.

### Distinguer L'Actuel Du Durable

Les frameworks changent. Les invariants restent.

Un bon contenu pédagogique ne doit pas seulement dire "avec React, fais X" ou "avec npm, fais Y". Il doit expliquer le principe qui survivra quand l'outil changera.

## Niveau De Qualité Attendu

Une fiche est considérée solide si elle respecte ces critères :

- elle commence par un problème concret ;
- elle évite les généralités ;
- elle donne des critères de choix ;
- elle relie les concepts entre eux ;
- elle contient du savoir tacite réel ;
- elle nomme exactement trois erreurs classiques ;
- elle formule clairement ses invariants ;
- elle propose une pratique vérifiable ;
- elle vérifie la compréhension par trois questions distinctes.

Le contenu doit rester exigeant sans devenir inaccessible. Le lecteur ne doit pas sortir avec une impression vague de "c'est important", mais avec une carte mentale utilisable.
