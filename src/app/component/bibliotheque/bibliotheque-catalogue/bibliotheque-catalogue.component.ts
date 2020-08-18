import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {Subscription} from 'rxjs';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {CartService} from '../../../services/cart.service';
import {Exemplaire} from '../../../models/Exemplaire';

@Component({
  selector: 'app-bibliotheque-catalogue',
  templateUrl: './bibliotheque-catalogue.component.html',
  styleUrls: ['./bibliotheque-catalogue.component.css']
})
export class BibliothequeCatalogueComponent implements OnInit, OnDestroy {
  e: Exemplaire;
  showManagerBoard = false;
  bibliotheque: Bibliotheque;
  bibliothequeSubscription: Subscription;

  constructor(private bibliothequeService: BibliothequeService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.bibliothequeSubscription = this.bibliothequeService.getBibliothequeById(this.route.snapshot.params.id).subscribe(
      (bibliotheque: Bibliotheque) => {
        this.bibliotheque = bibliotheque;
      },
      error => {
        console.log(error);
      }
    );
    if (this.tokenStorageService.getUser()){
      this.showManagerBoard = this.tokenStorageService.getRole().includes('MANAGER');
    }
  }

  ngOnDestroy(): void {
    this.bibliothequeSubscription.unsubscribe();
  }

  onClick(exemplaire): void {
    this.cartService.addToCart(exemplaire);
    window.alert('Item ajouté au panier');
  }

  openModal(exemplaire: Exemplaire): void {
    this.e = exemplaire;
  }

}
