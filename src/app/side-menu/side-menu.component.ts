import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { PacijentService } from '../services/pacijent.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  id: any = localStorage.getItem('userId');
  ime: any = localStorage.getItem('ime');
  prezime: any = localStorage.getItem('prezime');
  tip: any = localStorage.getItem('tip');

  korisnik: any = [];

  constructor(
    private router: Router,

    private korisnikService: KorisnikService
  ) {}

  ngOnInit(): void {
    this.korisnikService.getKorisnikId(this.id).subscribe((res) => {
      console.log(res);
    });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  isRegistracijaRouter(): boolean {
    return this.router.url.includes('/registracija');
  }

  isPrijavaRouter(): boolean {
    return this.router.url.includes('/prijava');
  }
}
