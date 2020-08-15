import { Injectable } from '@angular/core';
import {Exemplaire} from '../models/Exemplaire';
import {Cart} from '../models/Cart';
import {timeSinceInMicros} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new Cart();

  constructor() { }

  public addToCart(exemplaire: Exemplaire): void {
    this.cart.exemplaires = this.getCart();
    this.cart.exemplaires.push(exemplaire);
    localStorage.setItem('cart', JSON.stringify(this.cart.exemplaires));

  }
  public getCart(): Exemplaire[] {
    return JSON.parse(localStorage.getItem('cart'));
  }

  public removeFromCart(idExemplaire): void {
    this.cart.exemplaires = [];
    this.cart.exemplaires = this.getCart();
    this.cart.exemplaires = this.cart.exemplaires.filter(exemplaire => exemplaire.idExemplaire !== idExemplaire);
    localStorage.setItem('cart', JSON.stringify(this.cart.exemplaires));
  }

}
