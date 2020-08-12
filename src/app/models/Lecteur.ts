import {Cotisation} from './Cotisation';
import {Role} from './Role';
import {BookLocation} from './BookLocation';

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
  role: Role;

  constructor( ) {
  }
}
