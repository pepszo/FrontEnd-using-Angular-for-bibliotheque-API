import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Exemplaire} from '../../models/Exemplaire';
import {BibliothequeService} from '../../services/bibliotheque.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  cart: Exemplaire[];
  private idArray: number[] = [];

  constructor(private cartService: CartService,
              private bibliothequeService: BibliothequeService,
              private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }

  onRemove(exemplaire: Exemplaire): void {
    if (confirm('Voulez-vous vraiment supprimer ce livre ?')){
      this.cartService.removeFromCart(exemplaire.idExemplaire);
      location.reload();
    }
  }

  onReserver(): void {
    if (this.cart){
      this.cart.forEach(exemplaire => this.idArray.push(exemplaire.idExemplaire)) ;
    }
    this.bibliothequeService.newLocations(this.idArray).subscribe(
      data => {
        this.cartService.removeCart();
        this.router.navigate(['bibliotheques']).then(() => location.reload());
      }
    );

  }

}
