import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {forkJoin, Subscription} from 'rxjs';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {CartService} from '../../../services/cart.service';
import {Edition} from '../../../models/Edition';
import {Exemplaire} from '../../../models/Exemplaire';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  reservePermission = false;
  bibliotheque = new Bibliotheque();
  forkJoinSubscription: Subscription;
  bibliothequeSubscription: Subscription;
  countOfExemplaireSubscription: Subscription;
  private i = 0;

  constructor(private bibliothequeService: BibliothequeService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
   this.bibliotheque.idBibliotheque = this.route.snapshot.params.id;
   this.forkJoinSubscription = forkJoin(
      [this.bibliothequeService.getBibliothequeById(this.bibliotheque.idBibliotheque),
              this.bibliothequeService.getAllEditionByBiblio(this.bibliotheque.idBibliotheque),
              this.bibliothequeService.getCountOfExemplaire(this.bibliotheque.idBibliotheque)]).subscribe(
      data => {
      this.bibliotheque = data[0];
      console.log(this.bibliotheque);
      this.editions = data[1];
      this.editions.forEach(edition => edition.countOfExempByEdition = 0);
      console.log(this.editions);
      console.log(data[2]);
      data[2].forEach(arr => this.editions.find(edition => edition.idEdition === arr[0]).countOfExempByEdition = arr[1]);


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
   if (this.showLecteurBoard) {
     if (this.tokenStorageService.getCotisations() !== null) {
       this.reservePermission = this.tokenStorageService.getCotisations().includes(this.bibliotheque.idBibliotheque.toString());
     }
   }
  }

  ngOnDestroy(): void {
    this.forkJoinSubscription.unsubscribe();
  }

  onClick(edition): void {
    if (this.showLecteurBoard){
      if (this.reservePermission) {
        if (edition.countOfExempByEdition !== 0){
          this.bibliothequeService.getOneExemplaireByEdition(this.bibliotheque.idBibliotheque, edition.idEdition).subscribe(
            data => {
              console.log(data);
              data.bibliotheque = this.bibliotheque;
              this.cartService.addToCart(data);
            }
          );
        }else{
          alert('Pas disponible pour le moment !');
        }
      }
      else {
        alert('Vous n avez pas payé la cotisation pour cette bibliotheque');
      }
    }
    else {
      alert('Veuillez vous inscrire ou vous connecter pour reserver');
    }
  }

  onOpenModal(bookDescription, edition: Edition): void {
    this.e = edition;
    this.modalService.open(bookDescription, {scrollable: true, centered: true});
  }

}

