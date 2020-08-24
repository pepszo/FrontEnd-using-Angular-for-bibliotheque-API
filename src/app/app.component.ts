import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';
import {CartService} from './services/cart.service';
import {Cart} from './models/Cart';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'bibliotheque_frontend';
  cart: Cart;
  isLoggedIn = false;
  showLecteurBoard = false;
  showBibliothecaireBoard = false;
  showManagerBoard = false;
  showManagerGeneralBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService,
              private cartService: CartService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.showBibliothecaireBoard = this.tokenStorageService.getRole().includes('BIBLIOTHECAIRE');
      this.showManagerBoard = this.tokenStorageService.getRole().includes('MANAGER');
      this.showManagerGeneralBoard = this.tokenStorageService.getRole().includes('GENERAL');
      this.showLecteurBoard = this.tokenStorageService.getRole().includes('LECTEUR');
      this.username = user;
    }
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        // close all open modals
        this.modalService.dismissAll();

      }

    });
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
