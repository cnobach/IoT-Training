import { Component, OnInit } from '@angular/core';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartObject: any;
  cart: any = [];
  cartId: any;
  totalCost: any = 0;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.server.getCart(localStorage.getItem('userId')).subscribe(data => {
      this.cartObject = data[0];
      this.cartId = this.cartObject.cartId;
      let iter = this.cartObject.items;
      console.log(iter);
      for(let i=0; i<iter.length; i++){
        this.server.fetchItems(iter[i]).subscribe(data => {
          this.cart.push(data.message[0]);
          let price = parseInt(data.message[0].price);
          this.totalCost += price;
        })
      }
    })
  }

}
