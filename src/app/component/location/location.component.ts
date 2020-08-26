import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Cart} from '../../models/Cart';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  cart = this.cartService.getCart();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.cart);
  }

}
