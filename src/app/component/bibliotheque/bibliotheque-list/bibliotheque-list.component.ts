import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bibliotheque} from '../../../models/Bibliotheque';
import {Subscription} from 'rxjs';
import {BibliothequeService} from '../../../services/bibliotheque.service';

@Component({
  selector: 'app-bibliotheque-list',
  templateUrl: './bibliotheque-list.component.html',
  styleUrls: ['./bibliotheque-list.component.css']
})
export class BibliothequeListComponent implements OnInit, OnDestroy {

  collapsed = true;
  bibliotheques: Bibliotheque[];
  biblioSubscription: Subscription;

  constructor(private bibliothequeService: BibliothequeService) { }

  ngOnInit(): void {
    this.biblioSubscription = this.bibliothequeService.getAllBibliotheque().subscribe(
      (bibliotheques: Bibliotheque[]) => {
        this.bibliotheques = bibliotheques;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.biblioSubscription.unsubscribe();
  }

}