import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bibliotheque} from '../models/Bibliotheque';
import {API_URL} from '../app.constants';
import {Observable} from 'rxjs';

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
}
