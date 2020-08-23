import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {forkJoin, Subscription} from 'rxjs';
import {Edition} from '../../../models/Edition';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Etat} from '../../../models/Etat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Exemplaire} from '../../../models/Exemplaire';

@Component({
  selector: 'app-bibliotheque-catalogue-add-book',
  templateUrl: './bibliotheque-catalogue-add-book.component.html',
  styleUrls: ['./bibliotheque-catalogue-add-book.component.scss']
})
export class BibliothequeCatalogueAddBookComponent implements OnInit, OnDestroy{

  exempSubscription: Subscription;
  newExemp = new Exemplaire();
  e: Etat;
  ed: Edition;
  editions: Edition[];
  bibliotheque: Bibliotheque;
  etats: Etat[];
  forkJoinSubscription: Subscription;
  exempForm: FormGroup;

  constructor(private bibliothequeService: BibliothequeService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.forkJoinSubscription = forkJoin(
      [this.bibliothequeService.getBibliothequeById(this.route.snapshot.params.id),
              this.bibliothequeService.getAllEditions(),
              this.bibliothequeService.getAllEtats()]).subscribe(
      data => {
        this.bibliotheque = data[0];
        this.editions = data[1];
        this.etats = data[2];
      }
    );

    this.initForm();
  }

  initForm(): void {
    this.exempForm = this.formBuilder.group({
      edition: ['', Validators.required],
      etat: ['', Validators.required]
    });
  }

  onSubmitForm(): void {
    this.newExemp.edition = this.exempForm.value.edition;
    this.newExemp.etat = this.exempForm.value.etat;
    this.newExemp.edition.exemplaire = null;
    this.exempSubscription = this.bibliothequeService.newExemplaire(this.newExemp, this.bibliotheque.idBibliotheque).subscribe(
      date => {
        alert('Exemplaire ajouté avec succès!');
        this.router.navigate(['bibliotheques/' + this.bibliotheque.idBibliotheque]);
      }
    );
  }

  ngOnDestroy(): void {
    this.forkJoinSubscription.unsubscribe();
  }

}
