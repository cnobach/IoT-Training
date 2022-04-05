import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './services/server.service';

import { PrimeNGConfig } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  products: any;
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  display = false;

  constructor(
    private router: Router,
    private server: ServerService,
    private primeNg: PrimeNGConfig
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
      console.log(this.user);
    })
    this.server.getItems().subscribe(data => {
      this.products = data.message[0];
      this.display = true;
      console.log(this.products);
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

    if(value.indexOf('!') === 0){
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length)
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }



}
