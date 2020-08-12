import {Etat} from './Etat';
import {Bibliotheque} from './Bibliotheque';
import {Edition} from './Edition';

export class Exemplaire{

  idExemplaire: number;
  edition: Edition;
  bibliotheque: Bibliotheque;
  titre: string;
  prix: number;
  etat: Etat;

  constructor() {}
}
