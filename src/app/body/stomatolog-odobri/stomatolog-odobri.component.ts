import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-stomatolog-odobri',
  templateUrl: './stomatolog-odobri.component.html',
  styleUrls: ['./stomatolog-odobri.component.scss'],
})
export class StomatologOdobriComponent {
  stomatolozi!: any[];

  searchQuery!: string;
  selectedSearchBy!: string;
  filteredStomatolozi!: any[];

  constructor(
    private korisnikService: KorisnikService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.korisnikService.getAllKorisnici().subscribe((res) => {
      this.stomatolozi = res.filter((stomatolog) => {
        return stomatolog.odobrenje === 0 && stomatolog.tip === 'Stomatolog';
      });
      this.filteredStomatolozi = [...this.stomatolozi];
      console.log(this.filteredStomatolozi);
    });
  }

  filterStomatolozi() {
    if (this.selectedSearchBy === 'ime') {
      this.filteredStomatolozi = this.stomatolozi.filter((stomatolog) =>
        stomatolog.ime?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else if (this.selectedSearchBy === 'prezime') {
      this.filteredStomatolozi = this.stomatolozi.filter((stomatolog) =>
        stomatolog.prezime
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredStomatolozi = [...this.stomatolozi];
    }
  }

  Odobri(id: any) {
    console.log(id);

    const confirmed = confirm(
      'Da li ste sigurni da želite odobriti registraciju?'
    );

    if (confirmed) {
      this.korisnikService.odobrenjeRegistracije(id).subscribe(
        (response: any) => {
          alert('Registracija korisnika je uspešno odobrena.');
        },
        (error) => {
          if (error.status === 200) {
            alert('Registracija korisnika je uspešno odobrena.');
          }
        }
      );
    }
  }

  Odbi(id: any) {
    this.korisnikService.deleteKorisnik(id).subscribe();

    const confirmed = confirm(
      'Da li ste sigurni da želite da odbijete registraciju?'
    );

    if (confirmed) {
      this.korisnikService.deleteKorisnik(id).subscribe(
        (res) => {},
        (error) => {
          if (error.status === 500) {
            alert('Registracija korisnika je uspešno odbijena.');
          }
        }
      );
    }
  }
}
