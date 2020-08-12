import {Bibliothecaire} from './Bibliothecaire';
import {Cotisation} from './Cotisation';
import {Exemplaire} from './Exemplaire';

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
