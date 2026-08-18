import { environnementDev } from "./environnement-dev";
import { initialisationProjet } from "./initialisation-projet";
import { architectureApplication } from "./architecture-application";
import { cycleDeveloppementLocal } from "./cycle-developpement-local";
import { gitWorkflow } from "./git-workflow";
import { donneesEtPersistance } from "./donnees-et-etat";
import { apiCommunication } from "./api-communication";
import { frontendEtEtat } from "./frontend-et-etat";
import { tests } from "./tests";
import { deploiement } from "./deploiement";

export const techniqueSheets = [
  environnementDev,
  initialisationProjet,
  architectureApplication,
  cycleDeveloppementLocal,
  gitWorkflow,
  donneesEtPersistance,
  apiCommunication,
  frontendEtEtat,
  tests,
  deploiement,
];
