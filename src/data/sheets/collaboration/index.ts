// Phase 1 — L'humain et l'équipe (Co01–Co07)
import { collaborationEquipe } from "./collaboration-equipe";
import { collaborationCommunication } from "./collaboration-communication";
import { collaborationDocumentation } from "./collaboration-documentation";
import { collaborationOrganisation } from "./collaboration-organisation";
import { collaborationPartiesPrenantes } from "./collaboration-parties-prenantes";
import { collaborationSujetsCommunication } from "./collaboration-sujets-communication";
import { collaborationMethodesCommunication } from "./collaboration-methodes-communication";

// Phase 2 — Méthodes, formalisme et outillage (Co08–Co13)
import { collaborationModelesGestion } from "./collaboration-modeles-gestion";
import { collaborationMethodesAgiles } from "./collaboration-methodes-agiles";
import { collaborationOutilsGestion } from "./collaboration-outils-gestion";
import { collaborationUserStories } from "./collaboration-user-stories";
import { collaborationStoriesPratique } from "./collaboration-stories-pratique";
import { collaborationMetadonneesStories } from "./collaboration-metadonnees-stories";

// Phase 3 — L'écosystème collaboratif externe (Co14–Co16)
import { collaborationRessourcesCollaboratives } from "./collaboration-ressources-collaboratives";
import { collaborationAvantagesCollaboration } from "./collaboration-avantages-collaboration";
import { collaborationDefisCollaboration } from "./collaboration-defis-collaboration";

export const collaborationSheets = [
  // Phase 1
  collaborationEquipe,
  collaborationCommunication,
  collaborationDocumentation,
  collaborationOrganisation,
  collaborationPartiesPrenantes,
  collaborationSujetsCommunication,
  collaborationMethodesCommunication,
  // Phase 2
  collaborationModelesGestion,
  collaborationMethodesAgiles,
  collaborationOutilsGestion,
  collaborationUserStories,
  collaborationStoriesPratique,
  collaborationMetadonneesStories,
  // Phase 3
  collaborationRessourcesCollaboratives,
  collaborationAvantagesCollaboration,
  collaborationDefisCollaboration,
];
