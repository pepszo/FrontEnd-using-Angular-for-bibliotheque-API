import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';
import {CartService} from './services/cart.service';
import {Exemplaire} from './models/Exemplaire';
import {Cart} from './models/Cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'bibliotheque_frontend';
  cart: Cart;
  e: Exemplaire;
  isLoggedIn = false;
  showLecteurBoard = false;
  showBibliothecaireBoard = false;
  showManagerBoard = false;
  showManagerGeneralBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.showBibliothecaireBoard = this.tokenStorageService.getRole().includes('BIBLIOTHECAIRE');
      this.showManagerBoard = this.tokenStorageService.getRole().includes('MANAGER');
      this.showManagerGeneralBoard = this.tokenStorageService.getRole().includes('GENERAL');
      this.showLecteurBoard = this.tokenStorageService.getRole().includes('LECTEUR');

      if (this.showLecteurBoard){

        this.e = new Exemplaire();
        this.e.idExemplaire = 1;
        this.e.titre = 'harry potter';

        this.cartService.addToCart(this.e);
        console.log(this.cartService.getCart());




      }
      this.username = user;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  onClick(idExemplaire): void {
    this.cartService.removeFromCart(idExemplaire);
    window.alert('item retiré');
  }
}
