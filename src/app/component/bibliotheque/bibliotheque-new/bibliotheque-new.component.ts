import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bibliotheque-new',
  templateUrl: './bibliotheque-new.component.html',
  styleUrls: ['./bibliotheque-new.component.css']
})
export class BibliothequeNewComponent implements OnInit, OnDestroy {

  biblioSubscription = new Subscription();
  newBiblio = new Bibliotheque();
  biblioForm: FormGroup;

  constructor(private bibliothequeService: BibliothequeService,
              private route: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.biblioForm = this.formBuilder.group({
      adresse: ['', Validators.required],
      tel: ['', Validators.required]
    });
  }

  onSubmitForm(): void {
    this.newBiblio.adresse = this.biblioForm.value.adresse;
    this.newBiblio.tel = this.biblioForm.value.tel;

    this.biblioSubscription = this.bibliothequeService.newBibliotheque(this.newBiblio).subscribe(
      data => {
        alert('Bibliotheque crée avec succès!');
        this.route.navigate(['/bibliotheques']);
    });
  }

  ngOnDestroy(): void {
    this.biblioSubscription.unsubscribe();
  }

}
