import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { TerminService } from 'src/app/services/termin.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss'],
})
export class PocetnaComponent implements OnInit {
  idUser: any = localStorage.getItem('userId');
  korisnik: any = [];
  constructor(private korisnikService: KorisnikService) {}
  ngOnInit(): void {
    this.korisnikService.getKorisnikId(this.idUser).subscribe(
      (data) => {
        this.korisnik = data;
        console.log(this.korisnik);
      },
      (error) => {
        console.log('httperror: ');
        console.log(error);
      }
    );
  }
}
