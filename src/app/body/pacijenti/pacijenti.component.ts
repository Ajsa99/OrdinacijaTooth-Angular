import { Component, OnInit } from '@angular/core';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
  selector: 'app-pacijenti',
  templateUrl: './pacijenti.component.html',
  styleUrls: ['./pacijenti.component.scss'],
})
export class PacijentiComponent implements OnInit {
  pacijenti!: any[];
  idKorisnik!: number;

  searchQuery!: string;
  filteredPacijenti!: any[];
  selectedSortBy: string = 'default';

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 5; // Broj pacijenata po stranici, možete promeniti ako želite drugačiji broj

  constructor(private pacijentService: PacijentService) {}

  ngOnInit(): void {
    this.idKorisnik = Number(localStorage.getItem('userId'));
    console.log(this.idKorisnik);

    this.pacijentService.getAllPacijenti().subscribe((res) => {
      this.totalPages = Math.ceil(
        res.filter((pacijent) => pacijent.korisnikId === this.idKorisnik)
          .length / this.pageSize
      );
      console.log(this.totalPages);

      this.loadPacijentiByPage(this.currentPage);
    });
  }

  loadPacijentiByPage(page: number): void {
    this.pacijentService
      .getPacijentiByPage(page, this.pageSize, this.idKorisnik)
      .subscribe((res) => {
        console.log(res);
        this.pacijenti = res;
        this.filteredPacijenti = [...this.pacijenti];

        // Proveri da li je sledeća stranica prazna (nema pacijenata)
        this.pacijentService
          .getPacijentiByPage(page + 1, this.pageSize, this.idKorisnik)
          .subscribe((nextPageRes) => {
            if (nextPageRes.length === 0) {
              this.totalPages = page; // Postavi totalPages na trenutnu stranicu ako je sledeća prazna
            } else {
              this.totalPages =
                Math.ceil(nextPageRes.length / this.pageSize) + page; // Inače, nastavi sa normalnim izračunom
            }
          });
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPacijentiByPage(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPacijentiByPage(this.currentPage);
    }
  }

  filterPacijenti() {
    if (!this.searchQuery) {
      this.filteredPacijenti = [...this.pacijenti];
    } else {
      this.pacijentService
        .filterPacijentImePrezime(this.searchQuery)
        .subscribe((res) => {
          this.filteredPacijenti = res.slice(0, this.pageSize); // Prikazi samo prvi "this.pageSize" pacijenata koji zadovoljavaju filter
        });
    }
  }

  sortPacijenti() {
    if (this.selectedSortBy === 'ime') {
      this.pacijentService.sortPacijentiPoImenu().subscribe((res) => {
        this.pacijenti = res.filter(
          (pacijent) => pacijent.korisnikId === this.idKorisnik
        );
        this.filteredPacijenti = this.pacijenti.slice(0, this.pageSize); // Zadrzi samo prvih "this.pageSize" pacijenata nakon sortiranja
      });
    } else if (this.selectedSortBy === 'prezime') {
      this.pacijentService.sortPacijentiPoPrezimenu().subscribe((res) => {
        this.pacijenti = res.filter(
          (pacijent) => pacijent.korisnikId === this.idKorisnik
        );
        this.filteredPacijenti = this.pacijenti.slice(0, this.pageSize); // Zadrzi samo prvih "this.pageSize" pacijenata nakon sortiranja
      });
    } else {
      // Ako nije izabrana opcija za sortiranje, prikaži nesortiranu listu
      this.pacijentService.getAllPacijenti().subscribe((res) => {
        this.pacijenti = res.filter(
          (pacijent) => pacijent.korisnikId === this.idKorisnik
        );
        this.filteredPacijenti = this.pacijenti.slice(0, this.pageSize); // Zadrzi samo prvih "this.pageSize" pacijenata
      });
    }
  }

  DeletePacijent(id: any) {
    console.log(id);

    const confirmed = confirm(
      'Da li ste sigurni da želite da obrišete pacijenta?'
    );

    if (confirmed) {
      this.pacijentService.deletePacijent(id).subscribe(() => {
        this.pacijenti = this.pacijenti.filter(
          (pacijent) => pacijent.id !== id
        );
        alert('Čestitamo, uspešno ste obrisali pacijenta!');
      });
    }
  }
}
