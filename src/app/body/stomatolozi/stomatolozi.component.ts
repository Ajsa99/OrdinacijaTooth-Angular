import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-stomatolozi',
  templateUrl: './stomatolozi.component.html',
  styleUrls: ['./stomatolozi.component.scss'],
})
export class StomatoloziComponent implements OnInit {
  stomatolozi!: any[];

  searchQuery!: string;
  selectedSearchBy!: string;
  filteredStomatolozi!: any[];

  constructor(private korisnikService: KorisnikService) {}

  ngOnInit(): void {
    this.korisnikService.getAllKorisnici().subscribe((res) => {
      this.stomatolozi = res.filter((stomatolog) => {
        return stomatolog.odobrenje === 1 && stomatolog.tip === 'Stomatolog';
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
}
