import { cultureSheet } from "./culture-common";

export const cultureDatesTemps = cultureSheet({
  id: "culture-F20",
  number: 20,
  title: "Dates et Temps",
  subtitle: "Représenter, comparer et calculer des données temporelles sans confondre instant, calendrier et affichage",
  badge: "Fiche F20",
  meta: ["6 nœuds"],
  readingTime: "45 min",
  description: "Les dates semblent simples jusqu'au premier fuseau horaire, changement d'heure ou délai métier. Cette fiche distingue instant, date civile et durée, explique l'affectation, l'extraction d'informations, les calculs temporels, puis la validation et les cas d'utilisation en pseudo-code.",
  accent: "modele",

  nodes: {
    fondamentauxDates: {
      id: "fondamentauxDates",
      label: "Fondamentaux des dates",
      icon: "◷",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une réunion à 09:00, une date de naissance et un délai de 48 heures ressemblent tous à du temps, mais ne décrivent pas la même chose. Les traiter avec une seule représentation crée des erreurs discrètes : notifications envoyées au mauvais moment, abonnements expirés trop tôt ou rendez-vous déplacés après un changement de fuseau.</p>`,
        system: `<p>Les dates spécialisent les valeurs et types <span class="ref-fiche">→ F17</span>. Elles sont souvent transportées sous forme de chaînes ISO 8601 dans les contrats JSON <span class="ref-fiche">→ T07</span>, parsées selon les principes de validation de texte <span class="ref-fiche">→ F18</span>, persistées <span class="ref-fiche">→ T06</span> puis affichées dans le contexte local de l'utilisateur <span class="ref-fiche">→ T08</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Distinguer les concepts avant de choisir une représentation :</p>
<p><strong>Instant :</strong> un point précis sur la ligne du temps, comme l'envoi d'un message. Il peut être stocké en UTC puis affiché selon le fuseau utilisateur.</p>
<p><strong>Date civile :</strong> un jour du calendrier sans heure, comme une date de naissance. La convertir artificiellement en instant peut déplacer le jour selon le fuseau.</p>
<p><strong>Heure locale et fuseau :</strong> "09:00 Europe/Paris" exprime une intention locale. Le décalage UTC peut varier selon la saison.</p>
<p><strong>Durée :</strong> une quantité de temps écoulé, comme 30 minutes ou 48 heures. Elle ne doit pas être confondue avec une date de calendrier.</p>
<p><strong>Période métier :</strong> "un mois plus tard" dépend du calendrier ; ajouter arbitrairement 30 jours ne produit pas toujours le bon résultat.</p>`,
        },
        senior: `<p>Un développeur expérimenté demande toujours si le domaine parle d'un instant absolu, d'un jour civil, d'une heure locale récurrente ou d'une durée. Cette question précède le choix de bibliothèque. Une mauvaise catégorie temporelle ne se corrige pas avec davantage de formatage.</p>`,
        errors: `<p><strong>Pattern 1 — La date universelle :</strong> on utilise le même type pour anniversaire, expiration et rendez-vous parce que tout ressemble à une date. Une conversion de fuseau déplace alors une information qui ne devait pas bouger.</p>
<p><strong>Pattern 2 — Le mois de trente jours :</strong> on représente "dans un mois" par 30 jours parce que l'approximation semble suffisante. Les fins de mois et années bissextiles produisent des échéances incorrectes.</p>
<p><strong>Pattern 3 — L'heure sans fuseau :</strong> on stocke <code>09:00</code> sans préciser la zone parce que l'équipe travaille dans un seul pays. Dès qu'un utilisateur voyage ou qu'un serveur change de région, l'intention devient ambiguë.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les APIs temporelles, les bibliothèques et les formats d'affichage. <strong>Ce qui ne change pas :</strong> une donnée temporelle fiable distingue instant, date civile, heure locale, fuseau, durée et période métier avant tout calcul.</p>`,
        practice: {
          exercices: [
            {
              titre: "Classifier six données temporelles",
              etapes: [
                "Liste : date de naissance, heure d'une réunion, création d'un message, durée d'un minuteur, renouvellement mensuel et rappel quotidien.",
                "Classe chaque donnée comme instant, date civile, heure locale avec fuseau, durée ou période métier.",
                "Indique la représentation minimale nécessaire pour ne pas perdre d'information.",
                "Justifie deux cas où un simple timestamp ne suffit pas.",
              ],
              output: "Un tableau de six données avec catégorie temporelle, représentation et justification.",
              critere: "Chaque ligne doit préserver l'intention métier sans ajouter une heure ou un fuseau artificiel.",
            },
          ],
          piege: "Réduire toutes les données temporelles à un timestamp parce qu'il est facile à comparer.",
        },
        verification: [
          "Quelle différence fais-tu entre instant, date civile et durée ?",
          "Pourquoi stocker une date de naissance comme un instant UTC peut-il déplacer le jour affiché ?",
          "Pourquoi identifier la catégorie temporelle précède-t-il le choix d'une bibliothèque ?",
        ],
      },
    },

    declarationAffectation: {
      id: "declarationAffectation",
      label: "Déclarer et affecter",
      icon: ":=",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Créer une date depuis une chaîne ambiguë comme <code>03/04/2026</code> oblige le programme à deviner si elle signifie le 3 avril ou le 4 mars. Une affectation temporelle fiable conserve le format, le fuseau et la nature de la donnée au lieu de dépendre du contexte implicite de la machine.</p>`,
        system: `<p>La déclaration applique les fondamentaux temporels <span class="ref-fiche">→ fondamentauxDates</span> et les règles de parsing des chaînes <span class="ref-fiche">→ F18</span>. Elle prépare l'extraction <span class="ref-fiche">→ extractionInformations</span> et les calculs <span class="ref-fiche">→ calculsTemporels</span>. Les contrats API <span class="ref-fiche">→ T07</span> doivent documenter ces conventions.</p>`,
        choice: {
          kind: "free",
          html: `<p>Affecter selon la donnée reçue :</p>
<p><strong>Instant courant :</strong> utiliser l'horloge du système pour capturer "maintenant", puis conserver une référence UTC pour les échanges et la persistance.</p>
<p><strong>Chaîne ISO 8601 :</strong> préférer un format non ambigu comme <code>2026-05-31T14:30:00Z</code> pour un instant ou <code>2026-05-31</code> pour une date civile documentée.</p>
<p><strong>Timestamp :</strong> utile pour représenter un instant de manière compacte. Toujours documenter l'unité, généralement secondes ou millisecondes.</p>
<p><strong>Entrée utilisateur :</strong> parser avec une règle explicite liée au format affiché, puis valider avant affectation métier.</p>
<p><strong>Bibliothèque ou API moderne :</strong> choisir une primitive adaptée au langage pour éviter les constructions manuelles fragiles.</p>`,
        },
        senior: `<p>Un développeur expérimenté évite de laisser le runtime interpréter librement une chaîne locale. Il choisit des formats stricts aux frontières et conserve le fuseau d'origine lorsque l'intention locale compte, par exemple pour un rendez-vous ou une règle récurrente.</p>`,
        errors: `<p><strong>Pattern 1 — Le parsing deviné :</strong> on passe une chaîne locale au constructeur de date parce qu'elle fonctionne sur la machine du développeur. Une autre locale ou un autre runtime l'interprète différemment.</p>
<p><strong>Pattern 2 — Le timestamp sans unité :</strong> on stocke <code>1717164000</code> sans préciser secondes ou millisecondes. Le consommateur produit une date aberrante et le bug traverse l'API.</p>
<p><strong>Pattern 3 — Le fuseau jeté :</strong> on convertit immédiatement une heure locale en UTC puis on oublie la zone d'origine. Une récurrence à 09:00 se décale lors du changement d'heure.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les constructeurs, les primitives et les bibliothèques. <strong>Ce qui ne change pas :</strong> une affectation temporelle doit partir d'un format strict, documenter l'unité et préserver le fuseau lorsque l'intention locale en dépend.</p>`,
        practice: {
          exercices: [
            {
              titre: "Écrire un contrat temporel en pseudo-code",
              etapes: [
                "Définis les champs <code>createdAt</code>, <code>birthDate</code>, <code>meetingAt</code> et <code>timerDuration</code>.",
                "Choisis pour chacun instant UTC, date civile, instant avec zone d'origine ou durée.",
                "Écris un exemple de valeur sérialisée non ambiguë.",
                "Ajoute la règle de parsing et l'erreur retournée si le format est invalide.",
              ],
              output: "Un mini-contrat API de quatre champs temporels avec exemples et règles de parsing.",
              critere: "Chaque champ doit expliciter sa catégorie, son format et le comportement en cas d'entrée invalide.",
            },
          ],
          piege: "Utiliser un seul format par commodité alors que les champs ne décrivent pas la même réalité temporelle.",
        },
        verification: [
          "Pourquoi une chaîne ISO 8601 est-elle préférable à une date locale ambiguë dans un contrat API ?",
          "Un timestamp vaut <code>1717164000</code>. Quelle information manque avant de pouvoir l'interpréter correctement ?",
          "Quand faut-il conserver le fuseau d'origine en plus de l'instant UTC ?",
        ],
      },
    },

    extractionInformations: {
      id: "extractionInformations",
      label: "Extraire des informations",
      icon: "Y/M/D",
      kind: "processus",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Une interface doit parfois afficher l'année, le jour de la semaine ou l'heure locale d'un rendez-vous. Extraire ces informations paraît mécanique, mais le résultat dépend du fuseau et du contexte d'affichage. Le même instant peut appartenir à deux jours différents selon l'utilisateur.</p>`,
        system: `<p>L'extraction consomme une date déclarée avec une convention claire <span class="ref-fiche">→ declarationAffectation</span>. Elle alimente l'affichage frontend <span class="ref-fiche">→ T08</span>, les regroupements par période dans les données <span class="ref-fiche">→ T06</span> et les règles de validation <span class="ref-fiche">→ validationComparaison</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Extraire en fonction de l'usage :</p>
<p><strong>Composants calendaires :</strong> année, mois, jour et jour de semaine servent à afficher ou regrouper. Toujours préciser dans quel fuseau ils sont calculés.</p>
<p><strong>Composants horaires :</strong> heure, minute et seconde s'extraient dans une zone d'affichage choisie, pas implicitement dans celle du serveur.</p>
<p><strong>Formatage localisé :</strong> utiliser les APIs de formatage prévues pour afficher <code>31/05/2026</code>, <code>May 31, 2026</code> ou un mois en toutes lettres selon la locale.</p>
<p><strong>Valeur métier :</strong> conserver la valeur structurée pour calculer ; ne pas reparsing le texte déjà formaté pour l'utilisateur.</p>`,
        },
        senior: `<p>Un développeur expérimenté sépare représentation interne et affichage. Il ne stocke pas "dimanche 31 mai" comme source de vérité et ne regroupe pas des événements par jour avant d'avoir choisi le fuseau du rapport ou de l'utilisateur.</p>`,
        errors: `<p><strong>Pattern 1 — Le jour du serveur :</strong> on extrait le jour dans le fuseau du serveur parce que c'est la valeur par défaut. Un utilisateur situé ailleurs voit un événement rangé sous la mauvaise date.</p>
<p><strong>Pattern 2 — Le texte recyclé :</strong> on reparsing une date déjà formatée pour l'affichage parce qu'elle est disponible dans l'interface. Locale et traduction deviennent une source d'erreurs.</p>
<p><strong>Pattern 3 — Le mois décalé :</strong> on oublie que certaines APIs historiques numérotent les mois à partir de zéro. L'affichage ou le calcul se décale d'un mois sans erreur de type.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les APIs d'extraction, les locales et les conventions historiques. <strong>Ce qui ne change pas :</strong> extraire une information temporelle exige de préciser le fuseau et de séparer valeur structurée, calcul et formatage destiné à l'utilisateur.</p>`,
        practice: {
          exercices: [
            {
              titre: "Afficher un rendez-vous dans deux fuseaux",
              etapes: [
                "Définis en pseudo-code un rendez-vous comme instant UTC et zone d'origine.",
                "Extrais jour, heure et jour de semaine pour Europe/Paris puis America/New_York.",
                "Formate les deux affichages selon leur locale.",
                "Explique pourquoi les dates civiles affichées peuvent différer.",
              ],
              output: "Deux affichages localisés d'un même rendez-vous avec composants extraits et explication.",
              critere: "Les deux affichages doivent provenir du même instant et expliciter leur fuseau.",
            },
          ],
          piege: "Extraire les composants temporels avant d'avoir choisi la zone dans laquelle ils ont un sens.",
        },
        verification: [
          "Pourquoi le même instant peut-il appartenir à deux dates civiles différentes ?",
          "Un serveur UTC regroupe des commandes par jour pour des utilisateurs japonais. Quel choix explicite manque ?",
          "Pourquoi ne faut-il pas utiliser un texte localisé comme source de vérité pour les calculs ?",
        ],
      },
    },

    calculsTemporels: {
      id: "calculsTemporels",
      label: "Calculs avec les dates",
      icon: "±t",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Ajouter 24 heures et ajouter un jour de calendrier ne sont pas toujours équivalents. Un changement d'heure, une fin de mois ou une année bissextile suffit à casser une règle apparemment évidente. Les calculs temporels doivent exprimer précisément s'ils manipulent une durée écoulée ou une période civile.</p>`,
        system: `<p>Les calculs utilisent les catégories temporelles <span class="ref-fiche">→ fondamentauxDates</span> et les valeurs déclarées <span class="ref-fiche">→ declarationAffectation</span>. Ils alimentent la validation et la comparaison <span class="ref-fiche">→ validationComparaison</span>, les délais métier persistés <span class="ref-fiche">→ T06</span> et les scénarios de test <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Choisir le calcul selon la règle :</p>
<p><strong>Différence entre instants :</strong> soustraire deux instants produit une durée écoulée, utile pour un temps de réponse ou un minuteur.</p>
<p><strong>Ajouter une durée :</strong> ajouter 90 minutes ou 48 heures convient à un délai exact.</p>
<p><strong>Ajouter une période civile :</strong> ajouter un jour, un mois ou un an exige une opération calendaire qui traite les fins de mois selon une règle explicite.</p>
<p><strong>Récurrence locale :</strong> "tous les jours à 09:00 Europe/Paris" doit rester exprimé dans cette zone ; ajouter mécaniquement 24 heures peut décaler l'heure locale lors d'un changement saisonnier.</p>
<p><strong>Bibliothèque temporelle :</strong> utiliser une API ou bibliothèque adaptée plutôt que recalculer manuellement secondes, mois et fuseaux.</p>`,
        },
        senior: `<p>Un développeur expérimenté écrit les règles en langage métier avant le calcul : "expire exactement 48 heures après création" n'est pas "expire deux jours calendaires plus tard". Il transforme ensuite chaque bord temporel en test : fin de mois, 29 février et changement d'heure si le produit concerne plusieurs zones.</p>`,
        errors: `<p><strong>Pattern 1 — Le jour de 24 heures :</strong> on ajoute toujours 86 400 secondes pour obtenir demain. Lors d'un changement d'heure local, l'événement récurrent se décale.</p>
<p><strong>Pattern 2 — Le calcul manuel de calendrier :</strong> on additionne mois et jours à la main parce que la règle paraît courte. Les fins de mois et années bissextiles produisent des dates impossibles ou inattendues.</p>
<p><strong>Pattern 3 — La règle mal nommée :</strong> on code une durée exacte alors que le métier attend une période civile, ou l'inverse. Le programme reste cohérent techniquement mais contredit le contrat utilisateur.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les bibliothèques et leurs politiques de débordement calendaire. <strong>Ce qui ne change pas :</strong> un calcul fiable distingue durée écoulée, période civile et récurrence locale, puis teste les frontières du calendrier.</p>`,
        practice: {
          exercices: [
            {
              titre: "Comparer trois règles d'expiration",
              etapes: [
                "Écris en pseudo-code une expiration après 48 heures, une échéance dans un mois civil et un rappel quotidien à 09:00 Europe/Paris.",
                "Décris pour chaque règle si tu ajoutes une durée, une période ou une récurrence locale.",
                "Teste fin de mois, 29 février et changement d'heure.",
                "Documente le résultat attendu de chaque cas limite.",
              ],
              output: "Trois règles temporelles en pseudo-code avec catégorie de calcul et cas limites attendus.",
              critere: "Chaque règle doit choisir explicitement durée, période ou récurrence et traiter au moins un bord pertinent.",
            },
          ],
          piege: "Transformer une phrase métier temporelle en secondes avant d'avoir vérifié ce qu'elle signifie réellement.",
        },
        verification: [
          "Quelle différence existe entre ajouter 24 heures et ajouter un jour civil ?",
          "Un abonnement renouvelé le 31 janvier doit expirer un mois plus tard. Quelle règle faut-il documenter ?",
          "Pourquoi une récurrence locale ne doit-elle pas toujours être modélisée par une durée fixe ?",
        ],
      },
    },

    validationComparaison: {
      id: "validationComparaison",
      label: "Valider et comparer",
      icon: "≤t",
      kind: "validation",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Un formulaire peut accepter une date bien formée mais impossible, une réservation passée ou une fin antérieure au début. Parser une date ne suffit pas : une application doit vérifier le format, la réalité calendaire et la règle métier avant de comparer.</p>`,
        system: `<p>La validation prolonge le parsing strict <span class="ref-fiche">→ declarationAffectation</span> et les calculs <span class="ref-fiche">→ calculsTemporels</span>. Elle s'appuie sur les comparaisons et conditions <span class="ref-fiche">→ F14</span>, protège les données persistées <span class="ref-fiche">→ T06</span> et doit être testée sur les frontières <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Valider en couches :</p>
<p><strong>Format :</strong> la chaîne respecte-t-elle la convention attendue, par exemple ISO 8601 ou format local documenté ?</p>
<p><strong>Existence calendaire :</strong> la date existe-t-elle réellement, comme éviter le 31 février ?</p>
<p><strong>Catégorie compatible :</strong> compare-t-on deux instants, deux dates civiles ou des objets hétérogènes qui exigent une conversion explicite ?</p>
<p><strong>Règle métier :</strong> la fin vient-elle après le début, la réservation respecte-t-elle le délai minimal, l'utilisateur a-t-il l'âge attendu ?</p>
<p><strong>Frontières :</strong> tester juste avant, exactement à la limite et juste après comme pour toute comparaison <span class="ref-fiche">→ F17</span>.</p>`,
        },
        senior: `<p>Un développeur expérimenté décide aussi quelle horloge sert de référence. Une expiration de sécurité doit être évaluée côté serveur, pas selon l'heure modifiable du téléphone. Pour les tests, il injecte ou fige l'horloge afin d'éviter les suites instables qui échouent selon la minute d'exécution.</p>`,
        errors: `<p><strong>Pattern 1 — Le parseur arbitre :</strong> on considère une date valide dès que le runtime produit un objet. Certaines APIs normalisent silencieusement une date impossible au lieu de la rejeter.</p>
<p><strong>Pattern 2 — L'horloge du client :</strong> on vérifie une expiration sensible depuis l'heure du téléphone parce qu'elle est immédiatement disponible. L'utilisateur ou le système peut la modifier et contourner la règle.</p>
<p><strong>Pattern 3 — Le test qui vieillit :</strong> on écrit un test avec <code>maintenant()</code> et une attente exacte sans contrôler l'horloge. La suite devient intermittente selon sa vitesse ou sa date d'exécution.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les parseurs, les bibliothèques de test et les sources d'horloge. <strong>Ce qui ne change pas :</strong> valider une date exige format, existence, catégorie et règle métier ; une comparaison sensible doit utiliser une horloge de confiance et testable.</p>`,
        practice: {
          exercices: [
            {
              titre: "Valider une réservation en pseudo-code",
              etapes: [
                "Définis début, fin et horloge serveur comme entrées.",
                "Rejette format invalide, date inexistante, début passé et fin antérieure ou égale au début.",
                "Ajoute un délai minimal de 30 minutes avant la réservation.",
                "Teste juste avant, exactement à la limite et juste après le délai minimal.",
              ],
              output: "Une fonction de validation en pseudo-code avec règles et trois tests de frontière.",
              critere: "Chaque rejet doit avoir une raison explicite et les trois valeurs autour de la limite doivent produire le résultat attendu.",
            },
          ],
          piege: "Confondre date parsable et date acceptable pour la règle métier.",
        },
        verification: [
          "Quelles couches de validation appliques-tu après avoir reçu une date sous forme de chaîne ?",
          "Pourquoi une expiration de session ne doit-elle pas dépendre uniquement de l'heure du téléphone ?",
          "Comment rendre un test temporel déterministe ?",
        ],
      },
    },

    casUtilisationPseudoCode: {
      id: "casUtilisationPseudoCode",
      label: "Cas d'utilisation en pseudo-code",
      icon: "{t}",
      kind: "decision",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Les bugs temporels apparaissent souvent quand plusieurs notions sont combinées : un affichage local, une expiration absolue, une récurrence et une synchronisation mobile. Écrire le cas en pseudo-code oblige à clarifier l'intention avant de dépendre d'une syntaxe particulière.</p>`,
        system: `<p>Cette synthèse combine les fondamentaux <span class="ref-fiche">→ fondamentauxDates</span>, l'affectation <span class="ref-fiche">→ declarationAffectation</span>, l'extraction <span class="ref-fiche">→ extractionInformations</span>, les calculs <span class="ref-fiche">→ calculsTemporels</span> et la validation <span class="ref-fiche">→ validationComparaison</span>. Elle prépare les contrats API <span class="ref-fiche">→ T07</span>, l'état mobile <span class="ref-fiche">→ T08</span> et les tests <span class="ref-fiche">→ T09</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Exemple de réservation internationale :</p>
<pre>
ENTRÉES:
  dateLocale = "2026-10-25"
  heureLocale = "09:00"
  zone = "Europe/Paris"

instant = convertirVersInstant(dateLocale, heureLocale, zone)
SI instant est invalide:
  retourner erreur("horaire inexistant ou ambigu")

SI instant <= maintenantServeur():
  retourner erreur("réservation dans le passé")

enregistrer({
  startsAtUtc: versUtc(instant),
  originalTimeZone: zone
})

afficherPour(utilisateur):
  retourner formater(startsAtUtc, utilisateur.zone, utilisateur.locale)
</pre>
<p>Le pseudo-code sépare entrée locale, conversion, validation, stockage UTC et affichage localisé. Un rappel récurrent conserverait en plus la règle locale, par exemple "chaque jour à 09:00 Europe/Paris".</p>`,
        },
        senior: `<p>Un développeur expérimenté garde une trace de l'intention originale quand une donnée traverse plusieurs systèmes. Stocker seulement l'instant UTC suffit pour un événement unique ; une récurrence ou une modification future peut nécessiter aussi le fuseau et la règle locale ayant produit cet instant.</p>`,
        errors: `<p><strong>Pattern 1 — Le pseudo-code décoratif :</strong> on écrit un algorithme vague qui ne précise ni format, ni fuseau, ni horloge de référence. La syntaxe disparaît mais l'ambiguïté reste entière.</p>
<p><strong>Pattern 2 — L'affichage stocké :</strong> on persiste directement le texte formaté pour l'utilisateur parce qu'il est déjà lisible. Les comparaisons, changements de locale et migrations deviennent fragiles.</p>
<p><strong>Pattern 3 — La récurrence aplatie :</strong> on stocke uniquement le prochain instant d'un rappel périodique. Après un changement d'heure ou un échec de synchronisation, la règle d'origine ne peut plus être reconstruite.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le langage final, la bibliothèque et le stockage. <strong>Ce qui ne change pas :</strong> un cas temporel robuste sépare entrée, parsing, validation, représentation persistée, calcul et affichage, tout en conservant l'intention métier nécessaire.</p>`,
        practice: {
          exercices: [
            {
              titre: "Concevoir un rappel mobile récurrent",
              etapes: [
                "Écris en pseudo-code l'entrée d'un rappel quotidien à 09:00 dans le fuseau choisi par l'utilisateur.",
                "Définis ce qui est stocké localement et envoyé à l'API.",
                "Calcule le prochain instant sans réduire la règle à 24 heures fixes.",
                "Décris le comportement hors ligne puis au retour du réseau.",
                "Teste le passage à l'heure d'été ou d'hiver dans la zone choisie.",
              ],
              output: "Un pseudo-code de rappel mobile avec persistance, synchronisation et test de changement d'heure.",
              critere: "La règle locale doit rester reconstruisible et l'heure affichée doit rester 09:00 après le changement saisonnier.",
            },
          ],
          piege: "Conserver uniquement le prochain timestamp quand le produit doit également préserver la règle récurrente qui l'a généré.",
        },
        verification: [
          "Quelles étapes un pseudo-code temporel robuste doit-il séparer ?",
          "Pourquoi stocker seulement le prochain timestamp d'un rappel quotidien peut-il perdre l'intention utilisateur ?",
          "Quand un instant UTC suffit-il et quand faut-il conserver aussi le fuseau ou la règle locale ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 1180 390",
      nodes: [
        { id: "fondamentauxDates", x: 15, y: 160, w: 170, h: 65 },
        { id: "declarationAffectation", x: 235, y: 160, w: 175, h: 65 },
        { id: "extractionInformations", x: 475, y: 65, w: 180, h: 65 },
        { id: "calculsTemporels", x: 475, y: 255, w: 175, h: 65 },
        { id: "validationComparaison", x: 725, y: 160, w: 180, h: 65 },
        { id: "casUtilisationPseudoCode", x: 965, y: 160, w: 195, h: 65 },
      ],
      edges: [
        { x1: 185, y1: 192, x2: 233, y2: 192, label: "se représente" },
        { x1: 410, y1: 178, x2: 473, y2: 112, label: "décompose" },
        { x1: 410, y1: 210, x2: 473, y2: 288, label: "calcule" },
        { x1: 655, y1: 112, x2: 723, y2: 178, label: "alimente" },
        { x1: 650, y1: 288, x2: 723, y2: 210, label: "vérifie" },
        { x1: 905, y1: 192, x2: 963, y2: 192, label: "applique" },
      ],
    },
  },
});
