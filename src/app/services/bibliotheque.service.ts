import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bibliotheque} from '../models/Bibliotheque';
import {API_URL, httpOptions} from '../app.constants';
import {Observable} from 'rxjs';
import {Edition} from '../models/Edition';

@Injectable({
  providedIn: 'root'
})
export class BibliothequeService {

  constructor(private httpClient: HttpClient) { }

  getAllBibliotheque(): Observable<Bibliotheque[]> {
    return this.httpClient.get <Bibliotheque[]>(API_URL + 'bibliotheque/all');
  }

  getBibliothequeById(id): Observable<Bibliotheque> {
    return this.httpClient.get <Bibliotheque> (API_URL + 'bibliotheque/' + id);
  }

  newBibliotheque(bibliotheque: Bibliotheque): Observable<Bibliotheque> {
    return this.httpClient.post <Bibliotheque>(API_URL + 'bibliotheque/new', bibliotheque, httpOptions);
  }

  getAllEditionByBiblio(id): Observable<Edition[]> {
    return this.httpClient.get <Edition[]> (API_URL + 'bibliotheque/' + id + '/edition');
  }

  getCountOfExemplaireByEdition(idBiblio, idEdition): Observable<number>{
    return this.httpClient.get <number> (API_URL + 'bibliotheque/' + idBiblio + '/edition' + idEdition);
  }

  getAllEditions(): Observable<Edition[]> {
    return this.httpClient.get<Edition[]>(API_URL + 'editions/all');
  }
}
