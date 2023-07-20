import { Component, OnInit } from '@angular/core';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
  selector: 'app-pacijenti',
  templateUrl: './pacijenti.component.html',
  styleUrls: ['./pacijenti.component.scss'],
})
export class PacijentiComponent implements OnInit {
  pacijenti!: any[];

  searchQuery!: string;
  selectedSearchBy!: string;
  filteredPacijenti!: any[];

  constructor(private pacijentService: PacijentService) {}

  ngOnInit(): void {
    const idKorisnik = Number(localStorage.getItem('userId'));
    this.pacijentService.getAllPacijenti().subscribe((res) => {
      this.pacijenti = res.filter(
        (pacijent) => pacijent.korisnikId === idKorisnik
      );
      this.filteredPacijenti = [...this.pacijenti];
    });
  }

  filterPacijenti() {
    if (this.selectedSearchBy === 'ime') {
      this.filteredPacijenti = this.pacijenti.filter((pacijent) =>
        pacijent.ime.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else if (this.selectedSearchBy === 'prezime') {
      this.filteredPacijenti = this.pacijenti.filter((pacijent) =>
        pacijent.prezime.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPacijenti = [...this.pacijenti];
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
