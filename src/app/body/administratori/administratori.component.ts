import { Component } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-administratori',
  templateUrl: './administratori.component.html',
  styleUrls: ['./administratori.component.scss'],
})
export class AdministratoriComponent {
  administratori!: any[];

  searchQuery!: string;
  selectedSearchBy!: string;
  filteredAdministratori!: any[];

  constructor(private korisnikService: KorisnikService) {}

  ngOnInit(): void {
    this.korisnikService.getAllKorisnici().subscribe((res) => {
      this.administratori = res.filter((administrator) => {
        return administrator.tip === 'Administrator';
      });
      this.filteredAdministratori = [...this.administratori];
      console.log(this.filteredAdministratori);
    });
  }

  filterAdministratori() {
    if (this.selectedSearchBy === 'ime') {
      this.filteredAdministratori = this.administratori.filter(
        (administrator) =>
          administrator.ime
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    } else if (this.selectedSearchBy === 'prezime') {
      this.filteredAdministratori = this.administratori.filter(
        (administrator) =>
          administrator.prezime
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredAdministratori = [...this.administratori];
    }
  }
}
