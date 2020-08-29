import {Oeuvre} from './Oeuvre';
import {Exemplaire} from './Exemplaire';

export class Edition {

  idEdition: number;
  oeuvre: Oeuvre;
  nomEditeur: string;
  dateEdition: Date;
  exemplaire: Exemplaire[];
  countOfExempByEdition = 0;

  constructor() {}
}
