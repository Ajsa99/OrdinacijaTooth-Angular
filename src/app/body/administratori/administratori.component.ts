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

  selectedSortBy: string = 'default';

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
    if (!this.searchQuery) {
      this.filteredAdministratori = [...this.administratori];
    } else {
      this.korisnikService
        .filterKorisnikImePrezime(this.searchQuery)
        .subscribe((res) => {
          this.filteredAdministratori = res.filter((administrator) => {
            return administrator.tip === 'Administrator';
          });
        });
    }
  }

  sortAdministratori() {
    if (this.selectedSortBy === 'ime') {
      this.korisnikService.sortKorisnikiPoImenu().subscribe((res) => {
        this.filteredAdministratori = res.filter((administrator) => {
          return administrator.tip === 'Administrator';
        });
      });
    } else if (this.selectedSortBy === 'prezime') {
      this.korisnikService.sortKorisnikiPoPrezimenu().subscribe((res) => {
        this.filteredAdministratori = res.filter((administrator) => {
          return administrator.tip === 'Administrator';
        });
      });
    } else {
      this.korisnikService.getAllKorisnici().subscribe((res) => {
        this.administratori = res.filter((administrator) => {
          return administrator.tip === 'Administrator';
        });
        this.filteredAdministratori = [...this.administratori];
      });
    }
  }
}
