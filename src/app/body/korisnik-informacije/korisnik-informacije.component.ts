import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
  selector: 'app-korisnik-informacije',
  templateUrl: './korisnik-informacije.component.html',
  styleUrls: ['./korisnik-informacije.component.scss'],
})
export class KorisnikInformacijeComponent implements OnInit {
  stomatolog!: any;
  stomatologId!: any;
  pacijenti!: any[];

  showPregledi: boolean = false;

  constructor(
    private korisnikService: KorisnikService,
    private pacijentService: PacijentService,
    private activateRoot: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.stomatologId = this.activateRoot.snapshot.paramMap.get('id');
    this.korisnikService.getKorisnikId(this.stomatologId).subscribe((res) => {
      this.stomatolog = res;
      console.log(this.stomatolog);
    });

    this.pacijentService.getAllPacijenti().subscribe((res) => {
      this.pacijenti = res.filter(
        (idStomatolog) => idStomatolog.korisnikId == this.stomatologId
      );
      console.log(this.pacijenti);
    });
  }
}
