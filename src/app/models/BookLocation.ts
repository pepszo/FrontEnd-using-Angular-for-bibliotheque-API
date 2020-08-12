import {Lecteur} from './Lecteur';
import {Exemplaire} from './Exemplaire';

export class BookLocation{

  idBookLocation: number;
  lecteur: Lecteur;
  exemplaire: Exemplaire;
  dateDebut: Date;
  dateFin: Date;
  dateRendu: Date;
  etatRendu: number;

  constructor() {}
}
