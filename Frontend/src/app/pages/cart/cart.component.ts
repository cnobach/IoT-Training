import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ServerService } from './services/server.service';
import { Message } from 'primeng/api';;


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

  msgs: Message[] = [];

  constructor(private server: ServerService, private confirmServ: ConfirmationService) { }

  ngOnInit(): void {
    // Fetches the cart from the dB based on the userId in localStorage
    this.server.getCart(localStorage.getItem('userId')).subscribe(data => {
      this.cartObject = data[0];
      this.cartId = this.cartObject.cartid;
      let iter = this.cartObject.items;

      // Loops through the cart to fetch the items based on Item Id's stored
      for (let i = 0; i < iter.length; i++) {
        this.server.fetchItems(iter[i]).subscribe(data => {
          this.cart.push(data.message[0]);
          let price = parseInt(data.message[0].price);
          this.totalCost += price;
        })
      }
    })
  }

  removeFromCart(itemId: any, cb: any) {
    this.server.removeFromCart(itemId, this.cartId).subscribe(data => {
      cb(true);
    })
  }

  confirmRemove(itemId: any) {

    this.confirmServ.confirm({
      message: 'Remove this item from your cart?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeFromCart(itemId, () => {
          this.refresh();
          this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Item was removed!' }]
        })
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Declined', detail: 'Item was not removed.' }]
      },
      key: itemId
    })

  }

  refresh() {
    this.cart = [];
    this.totalCost = 0;
    this.ngOnInit();
  }

  checkout() {

    this.confirmServ.confirm({
      message: 'Are you sure you want to checkout? Total: $' + this.totalCost,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {

        this.server.checkout(this.cartObject.items, localStorage.getItem('userId')).subscribe(data => {
          if (data == true) {
            this.clearCart();
            this.refresh();
            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Items have been ordered!' }]
          }
        })
      },

      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Declined', detail: 'Checkout Cancelled' }]
      },
    })


  }

  clearCart(){
    alert('TODO: Clear the cart')
  }
}
