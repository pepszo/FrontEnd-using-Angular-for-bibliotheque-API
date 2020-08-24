import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {Subscription} from 'rxjs';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-bibliotheque-list',
  templateUrl: './bibliotheque-list.component.html',
  styleUrls: ['./bibliotheque-list.component.scss']
})
export class BibliothequeListComponent implements OnInit, OnDestroy {

  newCotisationSubscription: Subscription;
  validation = 0;
  bibliotequePayement: Bibliotheque;
  payement = false;
  cotisations: string[];
  showLecteurBoard = false;
  showManagerGeneralBoard = false;
  bibliotheques: Bibliotheque[];
  biblioSubscription: Subscription;

  constructor(private bibliothequeService: BibliothequeService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private modalService: NgbModal,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.biblioSubscription = this.bibliothequeService.getAllBibliotheque().subscribe(
      (bibliotheques: Bibliotheque[]) => {
        this.bibliotheques = bibliotheques;
      },
      error => {
        console.log(error);
      }
    );
    if (this.tokenStorageService.getUser()){
      this.showManagerGeneralBoard = this.tokenStorageService.getRole().includes('GENERAL');
      this.showLecteurBoard = this.tokenStorageService.getRole().includes('LECTEUR');
    }

    if (this.showLecteurBoard) {
      this.cotisations = this.tokenStorageService.getCotisations();
    }
  }

  ngOnDestroy(): void {
    this.biblioSubscription.unsubscribe();
  }

  onClick(id): void{
    if (this.showLecteurBoard) {
      if (this.cotisations.includes(id.toString())) {
        this.payement = true;
        this.router.navigate(['/bibliotheques/' + id], { queryParams: { payement: this.payement } });
      }
      else {
        this.router.navigate(['/bibliotheques/' + id], { queryParams: { payement: this.payement }});
      }
    }
    else {
      this.router.navigate(['/bibliotheques/' + id]);
    }
  }

  onClickPayement(longContent, bibliotheque: Bibliotheque): void{
    this.bibliotequePayement = bibliotheque;
    this.modalService.open(longContent, {scrollable: true, centered: true});
  }

  onPayer(): void {
    this.validation = 1;
    setTimeout(
        () => {
          this.validation = 2;
          if (this.validation === 2) {
            this.bibliothequeService.newCotisation(this.tokenStorageService.getUser(), this.bibliotequePayement.idBibliotheque).subscribe(
              data => {
                alert('Payement effectué, Merci!');
                this.authService.getCotisationFromServer(this.tokenStorageService.getUser()).subscribe(
                  cotisations => {
                    this.tokenStorageService.saveCotisations(cotisations);
                    window.location.reload();
                  });

              }
            );
          }
        }, 3000
      );
  }

}
