import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(
    private router: Router,
    private server: ServerService
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
  }



}
