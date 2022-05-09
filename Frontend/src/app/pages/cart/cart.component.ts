import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { ServerService } from './services/server.service';
import { NotificationService } from 'src/app/services/notification.service';


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
  sortOptions: SelectItem[] = [];

  constructor(
    private server: ServerService,
    private confirmServ: ConfirmationService,
    private toastr: NotificationService,
    private primeNg: PrimeNGConfig,
  ) { }

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
    // Setting up primeNG DataView variables & config
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
    this.primeNg.ripple = true;
  }

  //  when sort option is changed
  onSortChange(event: any) {
    let value = event.value;
    if (value === '!price') { //If high to low selected
      this.cart.sort(this.sortItemsDesc);
    } else if (value === 'price') { //If low to high selected
      this.cart.sort(this.sortItemsAsc);
    }
  }

  // Sort items array by price ascending
  sortItemsAsc(i: any, j: any) {
    const a = parseInt(i.price);
    const b = parseInt(j.price);
    let comp = 0;
    if (a > b) {
      comp = 1;
    } else if (a < b) {
      comp = -1;
    }
    return comp;
  }

  // Sort items array by price descending
  sortItemsDesc(i: any, j: any) {
    const a = parseInt(i.price);
    const b = parseInt(j.price);
    let comp = 0;
    if (a > b) {
      comp = -1;
    } else if (a < b) {
      comp = 1;
    }
    return comp;
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
          this.toastr.success('Item was removed', 'Success')
        })
      },
      reject: () => {
        this.toastr.info('Item was not removed', 'Cancelled')
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

        this.server.checkout(this.cartObject.items, localStorage.getItem('userId'), (data: Boolean) => {
          if (data == true) {

            this.server.createTransaction(this.cartObject.items, localStorage.getItem('userId')).subscribe(data => {
              this.clearCart();
              this.toastr.success('Your items have been ordered!', 'Confirmation');
            });

          } else if (data != true) {
            this.toastr.error('An Error has occurred. Please try again.', 'Error');
            this.refresh();
          }
        })
      },

      reject: () => {
        this.toastr.info('Transaction cancelled', 'Cancelled')
      },
    })


  }

  clearCart() {
    this.server.clearCart(this.cartId).subscribe(data => {

      this.refresh();

    })
  }
}
