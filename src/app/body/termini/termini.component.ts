import { Component, OnInit } from '@angular/core';
import { PregledService } from 'src/app/services/pregled.service';
import { TerminService } from 'src/app/services/termin.service';

@Component({
  selector: 'app-termini',
  templateUrl: './termini.component.html',
  styleUrls: ['./termini.component.scss'],
})
export class TerminiComponent implements OnInit {
  termini!: any[];
  pregledi!: any[];

  constructor(
    private terminService: TerminService,
    private pregledService: PregledService
  ) {}

  ngOnInit(): void {
    const idKorisnik = Number(localStorage.getItem('userId'));
    this.terminService.getAllTerminiPacijenti().subscribe((res) => {
      this.termini = res.filter((termin) => termin.korisnikId === idKorisnik);

      this.pregledService.getAllPregledi().subscribe((res) => {
        this.pregledi = res;

        this.termini = this.termini.filter(
          (termin) =>
            !this.pregledi.some((pregled) => pregled.terminId === termin.id)
        );

        console.log('Termini');
        console.log(this.termini);
      });
    });
  }
}
