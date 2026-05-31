import { cultureSheet } from "./culture-common";

export const cultureHtmlLiens = cultureSheet({
  id: "culture-F34",
  number: 34,
  title: "HTML — Liens et Hypertexte",
  subtitle: "La balise <a>, les URLs, les ancres et les attributs avancés — ce qui fait du Web un web",
  badge: "Fiche F34",
  meta: ["4 nœuds"],
  readingTime: "25 min",
  description: "Le lien hypertexte est la fonctionnalité qui distingue le Web d'un simple affichage de documents — c'est la capacité de relier des ressources entre elles par un clic. La balise <a> est la mise en œuvre HTML de ce concept, avec ses attributs qui contrôlent la destination, le comportement d'ouverture, la sécurité, le téléchargement et l'indexation. Maîtriser les liens, c'est aussi comprendre la différence entre URLs absolues et relatives, les ancres intrapage, et les liens non-HTTP.",
  accent: "modele",

  nodes: {
    hypertexteConcepte: {
      id: "hypertexteConcepte",
      label: "L'hypertexte et la balise <a>",
      icon: "⇢",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Le Web n'est pas une collection de pages isolées — c'est un graphe de documents reliés par des liens. C'est ce réseau de liens qui a donné son nom au "World Wide Web" et qui permet aux moteurs de recherche de l'explorer et de l'indexer. Un développeur qui crée des pages sans liens internes cohérents, sans attributs corrects sur ses balises <code>&lt;a&gt;</code>, et sans comprendre la différence entre navigation et action, produit un web fragmenté, mal référencé et partiellement inaccessible.</p>`,
        system: `<p>La balise <code>&lt;a&gt;</code> est un élément inline <span class="ref-fiche">→ F33</span> — elle s'inscrit dans le flux du texte. Sa distinction fondamentale avec <code>&lt;button&gt;</code> est posée dans la sémantique HTML <span class="ref-fiche">→ F32</span> : navigation vers une URL → <code>&lt;a href&gt;</code>, action sur la page → <code>&lt;button&gt;</code>. Les URLs qu'elle référence s'appuient sur la structure de l'internet et des protocoles web <span class="ref-fiche">→ F05</span>. Les attributs <code>rel</code> avancés ont des implications directes sur la sécurité <span class="ref-fiche">→ P02</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>La balise <code>&lt;a&gt;</code> — anatomie et comportement fondamental :</p>
<p><strong>Structure de base :</strong> <code>&lt;a href="destination"&gt;texte du lien&lt;/a&gt;</code>. L'attribut <code>href</code> (Hypertext REFerence) est l'attribut essentiel — sans lui, la balise <code>&lt;a&gt;</code> est un lien sans destination, non focusable par défaut via Tab, non cliquable comme lien. Le contenu entre les balises est le texte cliquable affiché à l'utilisateur — ce texte est aussi ce que les lecteurs d'écran annoncent et ce que les moteurs de recherche utilisent pour comprendre la destination.</p>
<p><strong>Lien de bloc — contenu riche cliquable :</strong> en HTML5, un <code>&lt;a&gt;</code> peut contenir des éléments block (titres, paragraphes, images) pour créer une "card" entièrement cliquable. <code>&lt;a href="/produit/42"&gt;&lt;img src="photo.jpg" alt="..."&gt;&lt;h3&gt;Nom du produit&lt;/h3&gt;&lt;p&gt;Description&lt;/p&gt;&lt;/a&gt;</code>. C'est la seule exception à la règle "inline ne contient pas block". Restriction : un lien de bloc ne doit pas contenir d'élément interactif (<code>&lt;button&gt;</code>, autre <code>&lt;a&gt;</code>, <code>&lt;input&gt;</code>) — un élément interactif à l'intérieur d'un autre élément interactif produit un comportement indéfini.</p>
<p><strong>Texte du lien — qualité sémantique :</strong> le texte d'un lien doit décrire sa destination ou son action, sans le contexte de la phrase. Éviter : "cliquez ici", "en savoir plus", "lire l'article" — ces textes sont identiques pour tous les liens de la page, rendant la navigation par lecteur d'écran (qui liste les liens) inutilisable. Préférer : "Documentation de l'API Stripe", "Rapport annuel 2024 (PDF)", "Conditions générales de vente". Quand le texte visible est insuffisant, <code>aria-label</code> permet d'ajouter un label accessible plus descriptif sans modifier le texte visible : <code>&lt;a href="/article/42" aria-label="Lire l'article : Introduction à React"&gt;Lire&lt;/a&gt;</code>.</p>
<p><strong>État de focus et accessibilité clavier :</strong> la balise <code>&lt;a href&gt;</code> est nativement focusable via Tab et activable via Entrée — ces comportements sont gratuits et natifs. Ne jamais supprimer l'outline de focus via CSS (<code>outline: none</code> ou <code>:focus { outline: 0 }</code>) sans le remplacer par un indicateur de focus personnalisé — c'est une violation de WCAG 2.1 criterion 2.4.7 qui rend la navigation clavier impossible à suivre visuellement.</p>
<p><strong>La distinction <code>&lt;a&gt;</code> vs <code>&lt;button&gt;</code> :</strong> règle absolue. <code>&lt;a href&gt;</code> : navigue vers une URL, change la page courante, peut être ouvert dans un nouvel onglet, peut être bookmarqué, est indexé par les moteurs de recherche. <code>&lt;button&gt;</code> : déclenche une action JavaScript (soumettre un formulaire, ouvrir une modale, supprimer un élément), ne navigue pas, ne peut pas être bookmarqué. Utiliser <code>&lt;a&gt;</code> sans <code>href</code> avec du JavaScript pour une action, c'est casser la navigation clavier (Entrée active un lien, pas un <code>&lt;a&gt;</code> sans href) et tromper les moteurs de recherche.</p>`,
        },
        senior: `<p>Un développeur expérimenté vérifie systématiquement la qualité des textes de liens lors d'une revue de code ou d'un audit accessibilité. Sa méthode : ouvrir les DevTools → onglet Accessibility → chercher "links" pour voir la liste de tous les liens de la page avec leur nom accessible. Si la liste contient plusieurs "en savoir plus", "ici", "lire la suite" — la page a un problème d'accessibilité et de SEO simultanément. Il sait aussi que les moteurs de recherche utilisent le texte des liens entrants (anchor text) comme signal de pertinence pour la page cible.</p>`,
        errors: `<p><strong>Pattern 1 — Textes de liens génériques :</strong> utiliser "cliquez ici", "en savoir plus" ou "lire la suite" comme texte de lien. Un lecteur d'écran peut lister tous les liens de la page pour naviguer rapidement — une liste de "en savoir plus" répétés est inutilisable. Les moteurs de recherche exploitent le texte du lien pour comprendre la page cible : "en savoir plus" ne transmet aucune information sur la destination.</p>
<p><strong>Pattern 2 — <code>&lt;a&gt;</code> sans <code>href</code> comme déclencheur d'action :</strong> écrire <code>&lt;a onclick="openModal()"&gt;Voir les détails&lt;/a&gt;</code> sans attribut <code>href</code>. Sans <code>href</code>, la balise <code>&lt;a&gt;</code> n'est pas focusable par Tab, n'est pas activable par Entrée, et n'a pas les comportements natifs d'un élément interactif. Pour les actions JavaScript, utiliser <code>&lt;button&gt;</code>. Si on veut vraiment utiliser <code>&lt;a&gt;</code>, ajouter au minimum <code>href="#"</code> et <code>tabindex="0"</code> — mais <code>&lt;button&gt;</code> reste la bonne réponse.</p>
<p><strong>Pattern 3 — Supprimer le focus outline sans le remplacer :</strong> écrire <code>a:focus { outline: none; }</code> dans le CSS parce que l'outline par défaut du navigateur est jugé laid. Le focus outline est l'indicateur visuel qui permet aux utilisateurs naviguant au clavier de savoir quel élément est actif. Le supprimer rend la navigation clavier aveugle. Solution : personnaliser l'outline (<code>outline: 2px solid #0066CC; outline-offset: 2px</code>) plutôt que le supprimer.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les styles par défaut des liens selon les navigateurs, les comportements SPA qui interceptent la navigation (React Router, Next.js remplacent les <code>&lt;a&gt;</code> natifs par des composants qui gèrent la navigation client-side). <strong>Ce qui ne change pas :</strong> un lien navigue vers une URL, un bouton déclenche une action — cette distinction est fondamentale quelle que soit la couche d'abstraction ; le texte du lien est un vecteur d'accessibilité et de SEO simultanément.</p>`,
        practice: {
          exercices: [
            {
              titre: "Auditer la qualité des liens d'une page",
              etapes: [
                "Ouvre une page web dans Chrome. F12 → onglet Console → tape : <code>Array.from(document.querySelectorAll('a')).map(a => a.textContent.trim() || a.getAttribute('aria-label') || '⚠️ VIDE').filter((v, i, arr) => arr.indexOf(v) === i)</code>. Observe la liste des textes de liens uniques.",
                "Identifie les textes génériques ('ici', 'en savoir plus', 'lire', 'cliquer'). Combien y en a-t-il ? Pour chacun, quel texte descriptif pourrait le remplacer ?",
                "Navigue sur la page uniquement au clavier (Tab pour passer d'un lien à l'autre, Entrée pour suivre un lien). Est-ce que tu sais toujours où tu te trouves grâce à l'indicateur de focus ?",
                "Inspecte dans DevTools → Elements quelques liens. Vérifie qu'ils ont tous un attribut <code>href</code>. Pour ceux qui n'en ont pas, sont-ils des liens de navigation ou des déclencheurs d'actions ?",
              ],
              output: "Liste des textes de liens avec identification des textes génériques et propositions de remplacement, rapport sur la navigation clavier (focus visible ou non), liste des <code>&lt;a&gt;</code> sans href avec évaluation de leur usage correct.",
              critere: "Un lien est bien écrit si son texte seul, hors contexte de la phrase, permet de comprendre sa destination ou son action. Tout texte générique doit avoir une alternative proposée.",
            },
          ],
          piege: "Croire que les liens sans href sont acceptables parce qu'ils 'fonctionnent avec la souris'. La navigation à la souris ne teste qu'une modalité d'accès — un lien sans href casse la navigation clavier, les lecteurs d'écran, les outils de test automatisés, et les crawlers de moteurs de recherche qui suivent les liens pour indexer le site.",
        },
        verification: [
          "Quelle est la différence fondamentale entre <code>&lt;a href&gt;</code> et <code>&lt;button&gt;</code> en termes de sémantique et de comportement natif ? Donnez un exemple concret où chaque balise est appropriée.",
          "Un développeur écrit <code>&lt;a onclick='openModal()'&gt;Voir les détails&lt;/a&gt;</code> sans attribut href. Listez les trois problèmes concrets que cela cause, et proposez la correction appropriée.",
          "Pourquoi 'cliquez ici' est-il un mauvais texte de lien ? Quelle méthode DevTools permet de vérifier rapidement la qualité de tous les textes de liens d'une page ?",
        ],
      },
    },

    urlsChemins: {
      id: "urlsChemins",
      label: "URLs, chemins relatifs et absolus",
      icon: "⊕",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un lien qui fonctionne en local mais renvoie une erreur 404 en production, un lien qui pointe vers la bonne page en développement mais vers la mauvaise en staging, un lien qui casse quand le fichier est déplacé — ces bugs viennent presque toujours d'une confusion entre chemins relatifs et absolus. Comprendre la structure d'une URL et la différence entre ces deux types de chemins, c'est éviter une classe entière d'erreurs de liaison.</p>`,
        system: `<p>La structure d'une URL est introduite dans la fiche Internet et navigation <span class="ref-fiche">→ F05</span> (protocole, domaine, port, chemin, paramètres, fragment). Ce nœud applique cette connaissance au contexte spécifique de la balise <code>&lt;a&gt;</code> et des chemins de fichiers HTML. Les chemins relatifs sont aussi utilisés pour les <code>&lt;link&gt;</code> CSS et <code>&lt;script&gt;</code> dans le <code>&lt;head&gt;</code> vu dans <span class="ref-fiche">→ F32</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Structure des URLs et règles de chemin pour les liens HTML :</p>
<p><strong>URL absolue :</strong> contient le protocole, le domaine, et le chemin complet depuis la racine. <code>https://www.exemple.com/articles/html-liens</code>. Une URL absolue est identique quelle que soit la page depuis laquelle elle est appelée — elle pointe toujours vers la même ressource. À utiliser pour : les liens vers des sites externes, les liens dans des emails ou des flux RSS qui peuvent être lus hors contexte, les balises <code>&lt;link rel="canonical"&gt;</code> et Open Graph.</p>
<p><strong>URL relative :</strong> chemin calculé par rapport à la page courante ou à la racine du site. Deux types distincts. <em>Relative au fichier courant :</em> commence par un nom de fichier ou <code>../</code>. <code>contact.html</code> (même dossier), <code>../index.html</code> (dossier parent), <code>articles/html-liens.html</code> (sous-dossier). <em>Relative à la racine du site :</em> commence par <code>/</code>. <code>/articles/html-liens</code> — le <code>/</code> initial représente la racine du domaine, pas la racine du système de fichiers. <code>/images/logo.png</code> pointera toujours vers <code>https://www.exemple.com/images/logo.png</code> quel que soit l'emplacement du fichier HTML.</p>
<p><strong>Règle pratique — préférer les chemins relatifs à la racine :</strong> <code>/chemin/depuis/racine</code> est presque toujours préférable aux chemins relatifs au fichier (<code>../../chemin/relatif</code>). Les chemins relatifs au fichier cassent si la structure de dossiers change. Les chemins relatifs à la racine (commençant par <code>/</code>) restent valides quel que soit l'emplacement du fichier HTML. Exception : les liens entre dépôts ou les générateurs de site statique qui imposent leur propre système de chemins.</p>
<p><strong>Les fragments — ancres intrapage :</strong> le symbole <code>#</code> suivi d'un identifiant pointe vers un élément spécifique dans la page. <code>&lt;a href="#section-contact"&gt;</code> fait défiler la page jusqu'à l'élément ayant <code>id="section-contact"</code>. Peut se combiner avec un chemin : <code>&lt;a href="/a-propos#equipe"&gt;</code> navigue vers la page "à propos" et défile jusqu'à la section "equipe". <code>&lt;a href="#"&gt;</code> seul fait remonter en haut de la page — comportement parfois utilisé comme destination provisoire mais qui cause un saut de page indésirable.</p>
<p><strong>Protocoles non-HTTP dans href :</strong> <code>href</code> accepte d'autres protocoles que HTTP/HTTPS. <code>mailto:contact@exemple.com</code> : ouvre le client email de l'utilisateur avec l'adresse préremplie. Paramètres optionnels : <code>mailto:contact@exemple.com?subject=Demande%20de%20renseignement&amp;body=Bonjour</code>. <code>tel:+33612345678</code> : sur mobile, propose d'appeler le numéro. <code>sms:+33612345678</code> : ouvre le SMS. Ces protocoles sont respectés par les navigateurs mobiles — les liens <code>tel:</code> et <code>sms:</code> sont essentiels pour les sites pensés pour mobile.</p>
<p><strong>URLs et encodage :</strong> les URLs ne peuvent contenir que certains caractères ASCII. Les espaces et caractères spéciaux (accents, ponctuation) doivent être encodés : espace → <code>%20</code>, <code>é</code> → <code>%C3%A9</code>. En pratique, les navigateurs modernes acceptent les URLs non encodées et les encodent automatiquement — mais le code HTML doit utiliser les URLs encodées pour être valide. Les caractères réservés dans les URLs (<code>&amp;</code>, <code>=</code>, <code>?</code>, <code>#</code>) ont un sens spécial et doivent être encodés (<code>%26</code>, <code>%3D</code>, etc.) quand ils font partie d'une valeur de paramètre.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise systématiquement des chemins relatifs à la racine (<code>/chemin</code>) dans ses fichiers HTML, jamais des chemins relatifs au fichier (<code>../../chemin</code>). Sa règle : si le chemin commence par <code>../</code>, c'est un signal d'alerte — revoir la structure de l'URL ou utiliser un chemin depuis la racine. Il sait aussi que les liens <code>mailto:</code> doivent être présentés avec le texte de l'adresse email en clair pour les utilisateurs qui n'ont pas de client email configuré : <code>&lt;a href="mailto:contact@exemple.com"&gt;contact@exemple.com&lt;/a&gt;</code> — pas juste "Nous contacter".</p>`,
        errors: `<p><strong>Pattern 1 — Chemin relatif au fichier qui casse à la réorganisation :</strong> <code>&lt;a href="../../pages/contact.html"&gt;</code>. Quand la structure de dossiers change — inévitable dans tout projet qui grossit — tous les liens relatifs au fichier doivent être mis à jour. Utiliser des chemins depuis la racine (<code>/pages/contact</code>) pour les liens internes au site : ils survivent à toute réorganisation de fichiers.</p>
<p><strong>Pattern 2 — Lien <code>mailto:</code> non encodé avec des paramètres :</strong> écrire <code>mailto:contact@exemple.com?subject=Demande de renseignement</code> avec des espaces non encodés dans les paramètres. Les espaces et caractères spéciaux dans les paramètres d'un <code>mailto:</code> doivent être encodés URL : <code>mailto:contact@exemple.com?subject=Demande%20de%20renseignement</code>. Certains clients mail gèrent les espaces, d'autres non — encoder est la seule approche fiable.</p>
<p><strong>Pattern 3 — Fragment <code>#</code> comme href provisoire :</strong> utiliser <code>&lt;a href="#"&gt;</code> comme destination temporaire pendant le développement, puis oublier de le remplacer. Ce lien fait remonter la page en haut à chaque clic — perturbant pour l'utilisateur et invisible dans les tests fonctionnels qui vérifient qu'un lien "fonctionne" sans vérifier sa destination. Préférer <code>href="/"</code> pour pointer vers l'accueil, ou une URL factice descriptive (<code>href="/a-renseigner"</code>) qui retournera une 404 visible plutôt qu'un comportement silencieux.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les formats d'URL, l'encodage automatique par les navigateurs, les conventions de routing selon les frameworks (Next.js, Nuxt utilisent leur propre système de chemins). <strong>Ce qui ne change pas :</strong> une URL absolue est indépendante du contexte d'appel ; un chemin relatif à la racine (<code>/</code>) est plus robuste qu'un chemin relatif au fichier (<code>../</code>) ; les fragments (<code>#id</code>) sont le mécanisme natif de navigation intrapage.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer un mini-site avec des liens cohérents",
              etapes: [
                "Crée la structure : <code>index.html</code> à la racine, <code>pages/contact.html</code>, <code>pages/a-propos.html</code>. Dans chaque fichier, écris une navigation identique avec des liens vers les trois pages.",
                "Dans <code>index.html</code>, écris les liens avec des chemins relatifs au fichier (<code>pages/contact.html</code>). Dans <code>pages/contact.html</code>, écris les mêmes liens avec des chemins depuis la racine (<code>/index.html</code>, <code>/pages/a-propos.html</code>). Lance avec Live Server et teste les deux approches.",
                "Dans <code>index.html</code>, crée une section longue avec <code>id='section-3'</code>. Ajoute un lien <code>&lt;a href='#section-3'&gt;</code> en haut de la page. Vérifie que le clic fait défiler jusqu'à la bonne section.",
                "Ajoute un lien <code>mailto:</code> complet avec sujet et corps encodés. Ajoute un lien <code>tel:</code>. Teste sur un device mobile (ou émulation mobile dans DevTools) pour voir leur comportement.",
              ],
              output: "Mini-site de 3 pages avec navigation fonctionnelle en chemins depuis la racine, ancre intrapage fonctionnelle, liens mailto et tel testés — avec note sur la différence de comportement entre chemin relatif au fichier et chemin depuis la racine.",
              critere: "La navigation doit fonctionner depuis toutes les pages. Déplacer <code>contact.html</code> dans un sous-dossier <code>pages/fr/contact.html</code> — les chemins depuis la racine doivent nécessiter une seule modification, les chemins relatifs au fichier doivent casser.",
            },
          ],
          piege: "Tester les liens uniquement en ouvrant les fichiers via <code>file://</code> dans le navigateur. Les chemins depuis la racine (<code>/pages/contact.html</code>) ne fonctionnent pas avec <code>file://</code> — le <code>/</code> est interprété comme la racine du système de fichiers, pas la racine du projet. Toujours tester avec Live Server ou un serveur local pour que les chemins depuis la racine se comportent correctement.",
        },
        verification: [
          "Quelle est la différence entre un chemin relatif au fichier (<code>../pages/contact.html</code>) et un chemin relatif à la racine (<code>/pages/contact.html</code>) ? Dans quelle situation le second est-il préférable et pourquoi ?",
          "Vous écrivez <code>&lt;a href='mailto:info@exemple.com?subject=Bonjour tout le monde'&gt;</code>. Quel problème de syntaxe ce lien contient-il, et comment le corriger ?",
          "Un fragment <code>#section-apropos</code> dans un href pointe vers quoi exactement dans le HTML, et que se passe-t-il si aucun élément n'a cet <code>id</code> dans la page ?",
        ],
      },
    },

    attributsComportement: {
      id: "attributsComportement",
      label: "Attributs de comportement — target, rel, download",
      icon: "⚙",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Fondation",
      sections: {
        why: `<p>Un lien externe qui ouvre dans le même onglet fait quitter le site sans moyen de revenir facilement. Un lien externe qui ouvre dans un nouvel onglet sans <code>rel="noopener"</code> expose le site à une attaque de sécurité (tabnabbing). Un lien vers un fichier PDF qui force le téléchargement au lieu de l'afficher dans le navigateur sans utiliser <code>download</code> dépend du comportement imprévisible du navigateur. Ces comportements se contrôlent avec trois attributs précis de <code>&lt;a&gt;</code>.</p>`,
        system: `<p>L'attribut <code>target</code> contrôle le contexte d'affichage de la destination. L'attribut <code>rel</code> (relation) décrit la relation entre la page courante et la destination — son impact sur la sécurité est directement lié aux vulnérabilités frontend <span class="ref-fiche">→ P02</span>. L'attribut <code>download</code> modifie le comportement HTTP de navigation en comportement de téléchargement. Ces attributs s'appliquent aussi à la balise <code>&lt;link&gt;</code> dans le <code>&lt;head&gt;</code> vue dans <span class="ref-fiche">→ F32</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les attributs qui contrôlent le comportement de navigation et de téléchargement :</p>
<p><strong>L'attribut <code>target</code> :</strong> contrôle dans quel contexte la destination s'ouvre. Valeurs : <code>_self</code> (par défaut — dans l'onglet courant), <code>_blank</code> (dans un nouvel onglet ou fenêtre), <code>_parent</code> (dans le cadre parent — utile dans les iframes imbriquées), <code>_top</code> (dans la fenêtre complète, sort des iframes). En pratique, seuls <code>_self</code> (implicite) et <code>_blank</code> sont utilisés couramment. <code>target="_blank"</code> ne doit jamais être utilisé seul — il doit toujours être accompagné de <code>rel="noopener noreferrer"</code>.</p>
<p><strong>L'attribut <code>rel</code> — relations et sécurité :</strong> décrit la relation entre la page courante et la destination. Valeurs critiques pour la sécurité :</p>
<p><em><code>rel="noopener"</code> :</em> empêche la page de destination d'accéder à l'objet <code>window.opener</code> de la page d'origine. Sans <code>noopener</code>, une page malveillante ouverte dans un nouvel onglet peut exécuter <code>window.opener.location = 'fausse-page-de-login.com'</code> et rediriger la page d'origine vers un site de phishing — c'est la vulnérabilité dite "tabnabbing". Depuis 2021, les navigateurs modernes ajoutent implicitement <code>noopener</code> sur <code>target="_blank"</code>, mais l'écrire explicitement reste la bonne pratique pour la clarté et la compatibilité avec les navigateurs plus anciens.</p>
<p><em><code>rel="noreferrer"</code> :</em> empêche le navigateur d'envoyer l'en-tête HTTP <code>Referer</code> (avec l'URL de la page d'origine) à la destination. Implique <code>noopener</code>. À utiliser quand on ne veut pas que le site de destination sache d'où vient le visiteur — par exemple, pour des liens vers des concurrents ou des pages sensibles. La combinaison <code>rel="noopener noreferrer"</code> sur <code>target="_blank"</code> est la pratique standard recommandée.</p>
<p><em><code>rel="nofollow"</code> :</em> indique aux robots des moteurs de recherche de ne pas suivre ce lien et de ne pas transmettre de "link equity" à la destination. À utiliser pour : les liens vers des contenus générés par les utilisateurs (commentaires, forums) pour éviter le spam SEO, les liens payants ou sponsorisés (obligation légale dans certains pays), les liens vers des pages peu fiables. <code>rel="ugc"</code> (user-generated content) et <code>rel="sponsored"</code> sont des variantes plus précises introduites par Google.</p>
<p><em><code>rel="canonical"</code> :</em> utilisé sur les balises <code>&lt;link&gt;</code> dans le <code>&lt;head&gt;</code> (pas sur <code>&lt;a&gt;</code>) pour indiquer l'URL canonique d'une page quand plusieurs URLs servent le même contenu.</p>
<p><strong>L'attribut <code>download</code> :</strong> force le téléchargement d'un fichier au lieu de l'afficher dans le navigateur. <code>&lt;a href="rapport.pdf" download&gt;Télécharger le rapport&lt;/a&gt;</code>. Valeur optionnelle : <code>download="nom-du-fichier.pdf"</code> renomme le fichier téléchargé. Restrictions de sécurité : <code>download</code> ne fonctionne que pour les ressources du même domaine (same-origin) — il est ignoré pour les URLs cross-origin pour prévenir les téléchargements malveillants déguisés. Pour déclencher le téléchargement d'un fichier hébergé sur un autre domaine, le serveur doit envoyer l'en-tête HTTP <code>Content-Disposition: attachment</code>.</p>`,
        },
        senior: `<p>Un développeur expérimenté a une règle automatique : dès qu'il écrit <code>target="_blank"</code>, il ajoute immédiatement <code>rel="noopener noreferrer"</code> — jamais l'un sans l'autre. Il sait aussi que <code>target="_blank"</code> ne doit pas être utilisé systématiquement pour les liens externes : ouvrir un lien dans un nouvel onglet impose un choix à l'utilisateur qui ne l'a pas demandé. La convention est de l'utiliser pour les documents (PDF, fichiers) et les liens vers des outils externes dans le contexte d'une application — pas pour tous les liens vers d'autres sites. Il documente cette règle dans les guidelines du projet.</p>`,
        errors: `<p><strong>Pattern 1 — <code>target="_blank"</code> sans <code>rel="noopener"</code> :</strong> <code>&lt;a href="https://site-externe.com" target="_blank"&gt;</code>. Avant 2021, cette écriture exposait à la vulnérabilité de tabnabbing sur tous les navigateurs. Depuis, les navigateurs modernes ajoutent <code>noopener</code> implicitement — mais pas les navigateurs anciens encore utilisés par une fraction des utilisateurs. La règle : toujours écrire <code>rel="noopener noreferrer"</code> avec <code>target="_blank"</code>.</p>
<p><strong>Pattern 2 — <code>download</code> sur des ressources cross-origin :</strong> <code>&lt;a href="https://cdn-externe.com/fichier.pdf" download&gt;</code>. L'attribut <code>download</code> est ignoré pour les ressources cross-origin — le navigateur affiche ou navigue vers le fichier au lieu de le télécharger. Le développeur est surpris que le comportement ne corresponde pas à l'intention. Solution : héberger la ressource sur le même domaine, ou utiliser un proxy, ou s'assurer que le serveur distant envoie <code>Content-Disposition: attachment</code>.</p>
<p><strong>Pattern 3 — <code>rel="nofollow"</code> sur tous les liens externes :</strong> ajouter systématiquement <code>nofollow</code> sur tous les liens vers des sites externes par précaution SEO. <code>nofollow</code> indique aux robots que ces liens ne sont pas des recommandations — ce qui est approprié pour les liens non vérifiés, les publicités, ou les contenus utilisateurs, mais pas pour des liens vers des sources de référence, des partenaires, ou des ressources que le site recommande explicitement. Abuser de <code>nofollow</code> nuit à l'écosystème d'indexation du web.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> les comportements par défaut des navigateurs (le <code>noopener</code> implicite sur <code>target="_blank"</code> a été ajouté progressivement), les valeurs de <code>rel</code> reconnues par les moteurs de recherche. <strong>Ce qui ne change pas :</strong> <code>target="_blank"</code> doit toujours être accompagné de <code>rel="noopener noreferrer"</code> pour la clarté et la compatibilité ; <code>download</code> ne fonctionne que pour les ressources same-origin ; <code>rel="nofollow"</code> est une communication avec les robots d'indexation, pas une restriction de sécurité.</p>`,
        practice: {
          exercices: [
            {
              titre: "Créer des liens avec les attributs de comportement corrects",
              etapes: [
                "Crée une page avec quatre types de liens : un lien interne (<code>/a-propos</code>), un lien externe vers Wikipédia qui doit s'ouvrir dans un nouvel onglet, un lien de téléchargement vers un PDF local, et un lien <code>mailto:</code>.",
                "Pour le lien externe, écris-le d'abord sans <code>rel</code>. Ouvre-le dans un nouvel onglet. Ouvre la console dans ce nouvel onglet et tape <code>window.opener</code> — observe qu'il n'est pas null (accès à la page d'origine). Ajoute ensuite <code>rel='noopener noreferrer'</code> et réessaie — <code>window.opener</code> doit être null.",
                "Pour le téléchargement, teste avec <code>download</code> sur un fichier local (same-origin via Live Server) et vérifie que le téléchargement se déclenche. Puis essaie sur une URL externe — observe que l'attribut est ignoré.",
                "Inspecte dans DevTools l'en-tête HTTP <code>Referer</code> envoyé lors d'une navigation sans <code>noreferrer</code> vs avec <code>noreferrer</code> (onglet Network → sélectionner la requête → Headers).",
              ],
              output: "Quatre liens avec comportements vérifiés : lien interne sans attributs supplémentaires, lien externe avec noopener noreferrer vérifié par window.opener null, téléchargement same-origin fonctionnel et cross-origin ignoré documenté, différence Referer observée.",
              critere: "La vérification de <code>window.opener</code> null doit être faite effectivement dans la console — pas seulement écrite sans être testée. L'échec du <code>download</code> cross-origin doit être documenté avec le comportement observé.",
            },
          ],
          piege: "Croire que <code>rel='noopener'</code> est devenu inutile depuis que les navigateurs modernes l'appliquent implicitement. La part de marché des navigateurs anciens (IE, vieux Safari, vieux Chrome) qui n'implémentent pas ce comportement implicite représente encore quelques pourcents du trafic selon le contexte. L'expliciter coûte zéro caractère de plus et garantit le comportement correct sur tous les navigateurs.",
        },
        verification: [
          "Expliquez la vulnérabilité de tabnabbing : comment une page externe ouverte avec <code>target='_blank'</code> sans <code>rel='noopener'</code> peut-elle compromettre la page d'origine, et comment <code>noopener</code> la neutralise ?",
          "Vous hébergez un fichier <code>rapport-annuel.pdf</code> sur votre serveur. Vous voulez que le clic déclenche le téléchargement et que le fichier s'appelle 'Rapport-2024.pdf' sur l'ordinateur de l'utilisateur. Écrivez le HTML correspondant.",
          "Quelle est la différence entre <code>rel='nofollow'</code>, <code>rel='ugc'</code> et <code>rel='sponsored'</code> ? Dans quel contexte concret utiliser chacun ?",
        ],
      },
    },

    autresAttributs: {
      id: "autresAttributs",
      label: "Autres attributs de la balise <a>",
      icon: "◈",
      kind: "modele",
      os: "universel",
      osLabel: "Universel",
      niveau: "Intermédiaire",
      sections: {
        why: `<p>Au-delà de <code>href</code>, <code>target</code>, <code>rel</code> et <code>download</code>, la balise <code>&lt;a&gt;</code> dispose d'attributs moins connus qui couvrent des besoins réels : indiquer la langue de la destination, contrôler les informations transmises au serveur cible, fournir un texte d'info-bulle, et gérer le suivi analytique. Ces attributs sont utilisés dans des contextes précis et mal documentés — les ignorer, c'est soit manquer d'outils pour des cas légitimes, soit les utiliser à mauvais escient.</p>`,
        system: `<p>Ces attributs complètent les mécanismes de comportement de navigation <span class="ref-fiche">→ attributsComportement</span> et s'inscrivent dans la relation entre HTML et le protocole HTTP <span class="ref-fiche">→ F05</span>. L'attribut <code>hreflang</code> est lié aux considérations d'internationalisation et de SEO multilingue. L'attribut <code>ping</code> a des implications sur la confidentialité des utilisateurs, sujet connexe au RGPD <span class="ref-fiche">→ F13</span>.</p>`,
        choice: {
          kind: "free",
          html: `<p>Les attributs moins courants de <code>&lt;a&gt;</code> et leurs cas d'usage :</p>
<p><strong>L'attribut <code>hreflang</code> :</strong> indique la langue et optionnellement la région de la ressource cible. <code>&lt;a href="https://exemple.com/en/about" hreflang="en"&gt;About us&lt;/a&gt;</code>. Valeurs au format BCP 47 : <code>fr</code> (français), <code>en</code> (anglais), <code>fr-CA</code> (français canadien), <code>en-US</code> (anglais américain). Usage sur <code>&lt;a&gt;</code> : aide les moteurs de recherche à comprendre que le lien pointe vers une version dans une autre langue. À distinguer de <code>hreflang</code> sur <code>&lt;link&gt;</code> dans le <code>&lt;head&gt;</code> (utilisé pour le SEO multilingue) et de l'attribut <code>lang</code> sur <code>&lt;html&gt;</code> (déclare la langue de la page courante).</p>
<p><strong>L'attribut <code>title</code> :</strong> affiche une info-bulle au survol de la souris. <code>&lt;a href="/faq" title="Questions fréquemment posées"&gt;FAQ&lt;/a&gt;</code>. Limitations importantes : non accessible sur mobile (pas de survol), non annoncé systématiquement par les lecteurs d'écran, non visible pour les utilisateurs qui naviguent au clavier. Règle : ne jamais utiliser <code>title</code> comme seule source d'information importante — si l'information est critique, l'écrire dans le texte visible ou dans un <code>aria-label</code>. Usage légitime : information complémentaire non critique (acronyme développé, date de mise à jour).</p>
<p><strong>L'attribut <code>type</code> :</strong> indique le type MIME de la ressource cible. <code>&lt;a href="rapport.pdf" type="application/pdf"&gt;Rapport annuel&lt;/a&gt;</code>. Ce n'est qu'un conseil pour le navigateur — il ne force pas le comportement (c'est <code>download</code> ou l'en-tête HTTP qui contrôle réellement le comportement). Peut aider certains navigateurs à préparer le bon rendu ou à afficher un avertissement. Valeurs courantes : <code>application/pdf</code>, <code>text/html</code>, <code>image/svg+xml</code>.</p>
<p><strong>L'attribut <code>ping</code> :</strong> liste d'URLs séparées par des espaces auxquelles le navigateur envoie une requête POST avec le corps <code>PING</code> quand le lien est cliqué. <code>&lt;a href="https://destination.com" ping="https://analytics.exemple.com/click"&gt;</code>. Conçu pour le suivi analytique de clics sans bloquer la navigation. Controversé : peu supporté (Firefox le désactive par défaut pour des raisons de confidentialité, Safari l'implémente), et l'envoi de données tiers doit respecter le RGPD si les utilisateurs n'ont pas consenti. En pratique : préférer les solutions analytiques côté serveur ou JavaScript pour le suivi de clics.</p>
<p><strong>L'attribut <code>referrerpolicy</code> :</strong> contrôle finement les informations envoyées dans l'en-tête HTTP <code>Referer</code> — plus précis que <code>rel="noreferrer"</code> qui les supprime entièrement. Valeurs utiles : <code>no-referrer</code> (ne pas envoyer le referrer — équivalent de <code>rel="noreferrer"</code>), <code>no-referrer-when-downgrade</code> (par défaut — envoie le referrer pour HTTPS→HTTPS, supprime pour HTTPS→HTTP), <code>same-origin</code> (envoie uniquement pour les requêtes du même domaine), <code>strict-origin</code> (envoie seulement le domaine sans le chemin), <code>origin-when-cross-origin</code> (chemin complet pour same-origin, domaine seul pour cross-origin). Utile quand on veut un contrôle granulaire du referrer sans supprimer entièrement l'information.</p>
<p><strong>Les attributs ARIA sur les liens :</strong> <code>aria-label</code> (texte accessible alternatif au texte visible, vu dans le nœud précédent), <code>aria-current="page"</code> (indique aux technologies d'assistance que ce lien pointe vers la page active — à utiliser dans la navigation principale), <code>aria-describedby</code> (référence l'id d'un élément qui décrit la destination du lien avec plus de détails). Ces attributs ARIA ne remplacent pas une bonne sémantique HTML native — ils la complètent pour les cas où le texte visible seul est insuffisant.</p>`,
        },
        senior: `<p>Un développeur expérimenté utilise <code>aria-current="page"</code> systématiquement sur le lien actif dans la navigation principale — c'est la façon correcte d'indiquer "vous êtes ici" aux technologies d'assistance, plus fiable qu'une classe CSS "active" qui n'est pas annoncée par les lecteurs d'écran. Il connaît aussi la nuance entre <code>aria-label</code> (remplace entièrement le texte accessible) et <code>aria-describedby</code> (ajoute une description supplémentaire) — les confondre produit un comportement inattendu pour les utilisateurs de lecteurs d'écran.</p>`,
        errors: `<p><strong>Pattern 1 — <code>title</code> utilisé comme seule source d'accessibilité :</strong> <code>&lt;a href="/aide" title="Centre d'aide et documentation"&gt;?&lt;/a&gt;</code> — un lien avec un seul point d'interrogation comme texte visible, toute l'information dans le <code>title</code>. Sur mobile, l'info-bulle n'apparaît jamais. Certains lecteurs d'écran ignorent le <code>title</code> si un texte visible est présent. Utiliser <code>aria-label="Centre d'aide et documentation"</code> à la place, ou mieux : un texte visible descriptif.</p>
<p><strong>Pattern 2 — <code>hreflang</code> confondu avec <code>lang</code> :</strong> utiliser <code>hreflang</code> pour déclarer la langue du contenu du lien lui-même, plutôt que la langue de la ressource cible. <code>hreflang</code> sur <code>&lt;a&gt;</code> concerne la destination, pas le texte du lien. Si le texte du lien est dans une langue différente du reste du document, utiliser l'attribut <code>lang</code> sur la balise : <code>&lt;a href="..." lang="en"&gt;Read more&lt;/a&gt;</code>.</p>
<p><strong>Pattern 3 — <code>ping</code> utilisé sans considération RGPD :</strong> implémenter des URLs de tracking dans l'attribut <code>ping</code> sans obtenir le consentement des utilisateurs. L'attribut <code>ping</code> envoie des données à des serveurs tiers à chaque clic — c'est un traitement de données personnelles (comportement de navigation) qui requiert une base légale sous le RGPD. Même si l'attribut est peu supporté et ignoré dans certains navigateurs, l'intention de tracking doit respecter les obligations légales.</p>`,
        invariants: `<p><strong>Ce qui change :</strong> le support de <code>ping</code> selon les navigateurs, les valeurs reconnues de <code>referrerpolicy</code>, les recommandations SEO de Google sur <code>hreflang</code>. <strong>Ce qui ne change pas :</strong> <code>title</code> n'est jamais une source d'information accessible fiable sur mobile — son utilisation comme seule information importante est toujours un problème d'accessibilité ; <code>aria-current="page"</code> est le mécanisme standard pour indiquer le lien actif dans la navigation.</p>`,
        practice: {
          exercices: [
            {
              titre: "Implémenter une navigation accessible avec les attributs avancés",
              etapes: [
                "Crée une navigation principale avec 4 liens. Sur le lien correspondant à la page courante, ajoute <code>aria-current='page'</code>. Teste avec l'extension NVDA ou ChromeVox : est-ce que le lecteur d'écran annonce 'page courante' sur ce lien ?",
                "Sur un lien vers une ressource PDF externe, combine : <code>type='application/pdf'</code>, <code>download='nom-fichier.pdf'</code>, <code>target='_blank'</code>, <code>rel='noopener noreferrer'</code>. Ajoute un <code>aria-label</code> qui mentionne que c'est un PDF et indique sa taille approximative.",
                "Sur un lien dont le texte visible est 'En savoir plus', remplace le par un <code>aria-label</code> descriptif. Puis, sur un autre lien, utilise <code>aria-describedby</code> pour pointer vers un paragraphe qui décrit la destination. Teste avec un lecteur d'écran pour observer la différence d'annonce.",
                "Recherche dans le HTML d'une page réelle (onglet Sources ou Elements de DevTools) si des attributs <code>ping</code> ou <code>referrerpolicy</code> sont utilisés. Si oui, dans quel contexte et avec quelle valeur ?",
              ],
              output: "Navigation avec <code>aria-current='page'</code> testée au lecteur d'écran, lien PDF avec combinaison complète d'attributs, démonstration de la différence entre <code>aria-label</code> et <code>aria-describedby</code> avec comportement observé.",
              critere: "Le test avec lecteur d'écran doit être effectivement réalisé — pas simulé. L'annonce de <code>aria-current='page'</code> doit être entendue. La différence entre <code>aria-label</code> (qui remplace) et <code>aria-describedby</code> (qui complète) doit être observable dans le comportement du lecteur d'écran.",
            },
          ],
          piege: "Ajouter des attributs ARIA sur des liens sans tester avec un lecteur d'écran réel. Les attributs ARIA produisent des annonces qui peuvent être utiles, redondantes, ou confuses selon la façon dont ils sont combinés. La règle d'or de l'ARIA : 'No ARIA is better than bad ARIA' — un attribut ARIA mal utilisé est pire qu'aucun attribut.",
        },
        verification: [
          "Dans un menu de navigation, comment indiquer aux utilisateurs de lecteurs d'écran que le lien 'Accueil' correspond à la page actuellement visitée ? Quel attribut utiliser, et pourquoi une classe CSS 'active' ne suffit-elle pas ?",
          "Quelle est la différence concrète entre <code>aria-label</code> et <code>aria-describedby</code> sur un lien ? Donnez un exemple où chacun est approprié.",
          "L'attribut <code>ping</code> envoie des données à un serveur tiers à chaque clic. Quelles obligations légales cela implique-t-il, et pourquoi l'attribut est-il controversé malgré son intention originelle légitime ?",
        ],
      },
    },
  },

  maps: {
    universel: {
      viewBox: "0 0 820 270",
      nodes: [
        { id: "hypertexteConcepte", x: 10, y: 100, w: 185, h: 65 },
        { id: "urlsChemins", x: 270, y: 40, w: 165, h: 65 },
        { id: "attributsComportement", x: 270, y: 165, w: 220, h: 65 },
        { id: "autresAttributs", x: 580, y: 100, w: 195, h: 65 },
      ],
      edges: [
        { x1: 195, y1: 120, x2: 268, y2: 72, label: "pointe vers" },
        { x1: 195, y1: 148, x2: 268, y2: 197, label: "contrôle" },
        { x1: 435, y1: 72, x2: 578, y2: 120, label: "enrichit" },
        { x1: 490, y1: 197, x2: 578, y2: 150, label: "raffine" },
      ],
    },
  },
});
