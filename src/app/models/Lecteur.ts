import {Cotisation} from './Cotisation';

export class Lecteur {

  idLecteur: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  dateN: Date;
  email: string;
  mdp: string;
  cotisations: Cotisation[];
  locations: BookLocation[];

  constructor( ) {
  }
}
