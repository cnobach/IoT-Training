import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeLink = 'home';

  constructor(private router: Router, private cookies: CookieService) { }

  ngOnInit(): void {
  }

  signOut(){
    console.log('user signed out');

    localStorage.clear();
    this.cookies.delete('token', '/', 'localhost', false);

    this.router.navigate(['']);
  }

  toCart() {
    this.router.navigate(['/cart']);
  }
}
