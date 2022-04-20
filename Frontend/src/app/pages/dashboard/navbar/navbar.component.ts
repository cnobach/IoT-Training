import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeLink = 'home';
  nav: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nav = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard'],
        routerLinkActiveOptions: {
          exact: true
        }
      },
      {
        label: 'Cart',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/cart'],
        routerLinkActiveOptions: {
          exact: true
        }
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/profile'],
        routerLinkActiveOptions: {
          exact: true
        }
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.signOut();
        }
      }
    ]
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  toCart() {
    this.router.navigate(['/cart']);
  }
}
