import { Injectable } from '@angular/core';
import {Exemplaire} from '../models/Exemplaire';
import {Cart} from '../models/Cart';

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
    const index: number = this.cart.exemplaires.indexOf(this.cart.exemplaires.find(exemplaire => exemplaire.idExemplaire === idExemplaire));
    if ( index !== -1){
      this.cart.exemplaires.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart.exemplaires));
  }

}
