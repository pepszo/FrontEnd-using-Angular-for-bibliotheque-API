import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {forkJoin, Subscription} from 'rxjs';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {CartService} from '../../../services/cart.service';
import {Exemplaire} from '../../../models/Exemplaire';
import {Edition} from '../../../models/Edition';

@Component({
  selector: 'app-bibliotheque-catalogue',
  templateUrl: './bibliotheque-catalogue.component.html',
  styleUrls: ['./bibliotheque-catalogue.component.scss']
})
export class BibliothequeCatalogueComponent implements OnInit, OnDestroy {
  e: Edition;
  editions: Edition[];
  showLecteurBoard = false;
  showManagerBoard = false;
  bibliotheque: Bibliotheque;
  forkJoinSubscription: Subscription;

  constructor(private bibliothequeService: BibliothequeService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.forkJoinSubscription = forkJoin(
      [this.bibliothequeService.getBibliothequeById(this.route.snapshot.params.id),
              this.bibliothequeService.getAllEditionByBiblio(this.route.snapshot.params.id)]).subscribe(
      data => {
      this.bibliotheque = data[0];
      this.editions = data[1];
      console.log(this.bibliotheque);
      console.log(this.editions);
    },
      error => {
        console.log(error);
      }
      );


    if (this.tokenStorageService.getUser()){
      this.showManagerBoard = this.tokenStorageService.getRole().includes('MANAGER');
      this.showLecteurBoard = this.tokenStorageService.getRole().includes('LECTEUR');
    }
  }

  ngOnDestroy(): void {
    this.forkJoinSubscription.unsubscribe();
  }

  onClick(exemplaire): void {
    if (this.showLecteurBoard){
      this.cartService.addToCart(exemplaire);
      window.alert('Item ajouté au panier');
    }
    else {
      alert('Veuillez vous inscrire ou vous connecter pour reserver');
    }
  }

  onOpenModal(edition: Edition): void {
    console.log(edition);
    this.e = edition;
  }

}
