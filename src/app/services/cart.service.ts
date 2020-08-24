import { Injectable } from '@angular/core';
import {Exemplaire} from '../models/Exemplaire';
import {Cart} from '../models/Cart';

const USER_CART = 'user-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new Cart();

  constructor() { }

  public removeCart(): void {
    localStorage.clear();
  }

  public addToCart(exemplaire: Exemplaire): void {
    console.log(exemplaire);
    this.cart.exemplaires = [];
    if (this.getCart() !== null) {
      this.cart.exemplaires = this.getCart();
    }
    this.cart.exemplaires.push(exemplaire);
    localStorage.setItem(USER_CART, JSON.stringify(this.cart.exemplaires));

  }
  public getCart(): Exemplaire[] {
    return JSON.parse(localStorage.getItem(USER_CART));
  }

  public removeFromCart(idExemplaire): void {
    this.cart.exemplaires = [];
    this.cart.exemplaires = this.getCart();
    const index: number = this.cart.exemplaires.indexOf(this.cart.exemplaires.find(exemplaire => exemplaire.idExemplaire === idExemplaire));
    if ( index !== -1){
      this.cart.exemplaires.splice(index, 1);
    }
    localStorage.setItem(USER_CART, JSON.stringify(this.cart.exemplaires));
  }

}
