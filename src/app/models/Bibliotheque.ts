import {Bibliothecaire} from './Bibliothecaire';
import {Cotisation} from './Cotisation';
import {Exemplaire} from './Exemplaire';

export class Bibliotheque {

  idBibliotheque: number;
  adresse: string;
  tel: string;
  bibliothecaire: Bibliothecaire[];
  cotisation: Cotisation[];
  exemp: Exemplaire[];

  constructor( ) {
  }
}
