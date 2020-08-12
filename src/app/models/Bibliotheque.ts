import {Bibliothecaire} from './Bibliothecaire';
import {Cotisation} from './Cotisation';

export class Bibliotheque {

  idBibliotheque: number;
  adresse: string;
  tel: string;
  bibliothecaires: Bibliothecaire[];
  cotisations: Cotisation[];
  exemplaires: Exemplaire[];

  constructor( ) {
  }
}
