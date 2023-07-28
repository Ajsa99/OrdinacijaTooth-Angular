import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-stomatolozi',
  templateUrl: './stomatolozi.component.html',
  styleUrls: ['./stomatolozi.component.scss'],
})
export class StomatoloziComponent implements OnInit {
  stomatolozi!: any[];
  filteredStomatolozi!: any[];
  searchQuery!: string;

  selectedSortBy: string = 'default';

  constructor(private korisnikService: KorisnikService) {}

  ngOnInit(): void {
    this.korisnikService.getAllKorisnici().subscribe((res) => {
      this.stomatolozi = res.filter((stomatolog) => {
        return stomatolog.odobrenje === 1 && stomatolog.tip === 'Stomatolog';
      });
      this.filteredStomatolozi = [...this.stomatolozi];
    });
  }

  filterStomatolozi() {
    if (!this.searchQuery) {
      this.filteredStomatolozi = [...this.stomatolozi];
    } else {
      this.korisnikService
        .filterKorisnikImePrezime(this.searchQuery)
        .subscribe((res) => {
          this.filteredStomatolozi = res.filter((stomatolog) => {
            return (
              stomatolog.odobrenje === 1 && stomatolog.tip === 'Stomatolog'
            );
          });
        });
    }
  }

  sortStomatolozi() {
    if (this.selectedSortBy === 'ime') {
      this.korisnikService.sortKorisnikiPoImenu().subscribe((res) => {
        this.filteredStomatolozi = res.filter((stomatolog) => {
          return stomatolog.odobrenje === 1 && stomatolog.tip === 'Stomatolog';
        });
      });
    } else if (this.selectedSortBy === 'prezime') {
      this.korisnikService.sortKorisnikiPoPrezimenu().subscribe((res) => {
        this.filteredStomatolozi = res.filter((stomatolog) => {
          return stomatolog.odobrenje === 1 && stomatolog.tip === 'Stomatolog';
        });
      });
    } else {
      this.korisnikService.getAllKorisnici().subscribe((res) => {
        this.stomatolozi = res.filter((stomatolog) => {
          return stomatolog.odobrenje === 1 && stomatolog.tip === 'Stomatolog';
        });
        this.filteredStomatolozi = [...this.stomatolozi];
      });
    }
  }
}
