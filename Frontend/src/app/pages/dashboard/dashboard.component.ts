import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './services/server.service';

import { PrimeNGConfig } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';
;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products = [{}];

  user: any;
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';

  constructor(
    private router: Router,
    private server: ServerService,
    private primeNg: PrimeNGConfig,
    private confirmServ: ConfirmationService,
    private toastr: NotificationService
    ) { }

  //  If the user is not logged in, route to login page
  //    ** probably gonna change with JWT's, for now it works
  ngOnInit(): void {

    if (!localStorage.getItem('userId')) {
      this.router.navigate(['login']);
    }
    //  set user object to the got user
    this.server.getUser(localStorage.getItem('userId')).subscribe(data => {
      this.user = data.message[0];
    })

    this.server.getItems().subscribe(data => {
      this.products = data;
    })

    // Setting up primeNG DataView variables & config
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];
    this.primeNg.ripple = true;
  }

  //  when sort option is changed
  onSortChange(event:any) {
    let value = event.value;
    if(value === '!price'){ //If high to low selected
      this.products.sort(this.sortProductsDesc);
    } else if(value === 'price') { //If low to high selected
      this.products.sort(this.sortProductsAsc);
    }
  }
  
  // Sort products array by price ascending
  sortProductsAsc(i:any, j:any){
    const a = parseInt(i.price);
    const b = parseInt(j.price);
    let comp = 0;
    if(a > b){
      comp = 1;
    } else if(a < b){
      comp = -1;
    }
    return comp;
  }

  // Sort products array by price descending
  sortProductsDesc(i:any, j:any){
    const a = parseInt(i.price);
    const b = parseInt(j.price);
    let comp = 0;
    if(a > b){
      comp = -1;
    } else if(a < b){
      comp = 1;
    }
    return comp;
  }

  addToCart(itemId: any, cb:any ){
    this.server.addToCart(itemId, localStorage.getItem('userId')).subscribe(data=> {
      cb(true);
    });
  }

  confirmAdd(itemId: any){
    this.confirmServ.confirm({
      message: 'Add this item to your cart?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.addToCart(itemId, () => {
          this.toastr.success('Item was added to your cart!', 'Success');
        })
      },
      reject: () => {
        this.toastr.info('Item was not added to your cart', 'Cancelled');      },
      key: itemId
    })
  }
}
