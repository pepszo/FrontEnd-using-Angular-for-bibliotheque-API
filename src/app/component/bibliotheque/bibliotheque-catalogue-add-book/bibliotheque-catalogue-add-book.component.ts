import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {forkJoin, Subscription} from 'rxjs';
import {Edition} from '../../../models/Edition';
import {BibliothequeService} from '../../../services/bibliotheque.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bibliotheque-catalogue-add-book',
  templateUrl: './bibliotheque-catalogue-add-book.component.html',
  styleUrls: ['./bibliotheque-catalogue-add-book.component.scss']
})
export class BibliothequeCatalogueAddBookComponent implements OnInit, OnDestroy{

  editions: Edition[];
  bibliotheque: Bibliotheque;
  forkJoinSubscription: Subscription;

  constructor(private bibliothequeService: BibliothequeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forkJoinSubscription = forkJoin(
      [this.bibliothequeService.getBibliothequeById(this.route.snapshot.params.id),
              this.bibliothequeService.getAllEditions()]).subscribe(
      data => {
        this.bibliotheque = data[0];
        this.editions = data[1];
      }
    );
  }

  ngOnDestroy(): void {
    this.forkJoinSubscription.unsubscribe();
  }

}
