import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  loggedinUser?: string;
  typeUser?: string;
  constructor(private router: Router) {}

  ngOnInit() {}

  //vraca token iz localStorage ako je user ulogovan, ako nije vraca undefined
  loggedin() {
    localStorage.getItem('token');
    const item = localStorage.getItem('email');
    const ime = localStorage.getItem('ime');
    const prezime = localStorage.getItem('prezime');
    const userId = localStorage.getItem('userId');
    const type = localStorage.getItem('tip');
    if (item) {
      this.loggedinUser = item;
    }
    if (type) {
      this.typeUser = type;
    }
    return this.loggedinUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('ime');
    localStorage.removeItem('prezime');
    localStorage.removeItem('tip');
    this.loggedinUser = '';
    this.typeUser = '';
    this.router.navigate(['/']);
  }
}
