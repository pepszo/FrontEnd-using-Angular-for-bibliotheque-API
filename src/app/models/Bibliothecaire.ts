import {Role} from './Role';

export class Bibliothecaire {

  idBibliothecaire: number;
  nom: string;
  prenom: string;
  adresse: string;
  dateN: Date;
  email: string;
  mdp: string;
  roles: Role[];

  constructor( ) {
  }
}
