import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {CartService} from '../../../services/cart.service';
import {Edition} from '../../../models/Edition';
import {Exemplaire} from '../../../models/Exemplaire';
import {element} from 'protractor';

@Component({
  selector: 'app-bibliotheque-catalogue',
  templateUrl: './bibliotheque-catalogue.component.html',
  styleUrls: ['./bibliotheque-catalogue.component.scss']
})
export class BibliothequeCatalogueComponent implements OnInit, OnDestroy {
  e: Edition;
  $countOfExempl: number[];
  exemplaires: Exemplaire[];
  editions: Edition[] = [];
  showLecteurBoard = false;
  showManagerBoard = false;
  bibliotheque: Bibliotheque;
  forkJoinSubscription: Subscription;
  bibliothequeSubscription: Subscription;
  private exemplaire: Exemplaire;
  countOfExemplaireSubscription: Subscription;
  private i = 0;

  constructor(private bibliothequeService: BibliothequeService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
   this.forkJoinSubscription = forkJoin(
      [this.bibliothequeService.getBibliothequeById(this.route.snapshot.params.id),
              this.bibliothequeService.getAllEditionByBiblio(this.route.snapshot.params.id),
              this.bibliothequeService.getCountOfExemplaire(this.route.snapshot.params.id)]).subscribe(
      data => {
      this.bibliotheque = data[0];
      this.editions = data[1];
      this.$countOfExempl = data[2];
      this.editions.forEach(n => {
        n.countOfExempByEdition = this.$countOfExempl[this.i];
        this.i++;
      });

      /*this.bibliotheque.exemp.forEach(exemp => {
        if (exemp.edition){
          this.editions.push(exemp.edition);
          console.log(this.editions);
        }
      });*/

    },
      error => {
        console.log(error);
      }
      );

    /* this.bibliothequeSubscription = this.bibliothequeService.getBibliothequeById(this.route.snapshot.params.id).subscribe(
      bibliotheque => {
        this.bibliotheque = bibliotheque;
      },
      error => {
        console.log(error);
      }
    );*/

   if (this.tokenStorageService.getUser()){
      this.showManagerBoard = this.tokenStorageService.getRole().includes('MANAGER');
      this.showLecteurBoard = this.tokenStorageService.getRole().includes('LECTEUR');
    }
  }

  ngOnDestroy(): void {
    this.forkJoinSubscription.unsubscribe();
  }

  onClick(edition): void {
    if (this.showLecteurBoard){
      this.exemplaire = new Exemplaire();
      this.exemplaire.edition = edition;
      this.exemplaire.bibliotheque = this.bibliotheque;
      this.cartService.addToCart(this.exemplaire);
      window.alert('Item ajouté au panier');
    }
    else {
      alert('Veuillez vous inscrire ou vous connecter pour reserver');
    }
  }

  onOpenModal(edition: Edition): void {
    this.e = edition;
  }

}

