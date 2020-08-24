import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Bibliotheque} from '../models/Bibliotheque';
import {API_URL, httpOptions} from '../app.constants';
import {Observable} from 'rxjs';
import {Edition} from '../models/Edition';
import {Etat} from '../models/Etat';
import {Exemplaire} from '../models/Exemplaire';
import {Cotisation} from '../models/Cotisation';

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
    return this.httpClient.get <number> (API_URL + 'bibliotheque/' + idBiblio + '/edition/' + idEdition);
  }

  getCountOfExemplaire(idBiblio): Observable<number[]>{
    return this.httpClient.get <number[]> (API_URL + 'bibliotheque/' + idBiblio + '/edition-counts');
  }

  getAllEditions(): Observable<Edition[]> {
    return this.httpClient.get<Edition[]>(API_URL + 'editions/all');
  }

  getAllEtats(): Observable<Etat[]> {
    return this.httpClient.get<Etat[]>(API_URL + 'etat/all');
  }

  newExemplaire(exemplaire: Exemplaire, idBibliotheque): Observable<Exemplaire> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post <Exemplaire>(API_URL + 'bibliotheque/' + idBibliotheque + '/add-book', exemplaire, httpOptions);
  }

  newCotisation(emailLecteur: string, idBibliotheque: number): Observable<Cotisation> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Cotisation> (API_URL + 'bibliotheque/cotisation/new?emailLecteur=' + emailLecteur + '&idBibliotheque=' + idBibliotheque, httpOptions);
  }
}
