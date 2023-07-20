import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Termin } from 'src/app/model/termin';
import { PacijentService } from 'src/app/services/pacijent.service';
import { TerminService } from 'src/app/services/termin.service';

@Component({
  selector: 'app-zakazi-termin',
  templateUrl: './zakazi-termin.component.html',
  styleUrls: ['./zakazi-termin.component.scss'],
})
export class ZakaziTerminComponent {
  pacijenti: any[] = [];

  addForm!: FormGroup;
  idKorisnik: any = Number(localStorage.getItem('userId'));
  userSubmitted!: boolean;

  constructor(
    private pacijentService: PacijentService,
    private terminService: TerminService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userSubmitted = false;
  }

  termin: Termin = {
    pacijentId: 0,
    datum: '',
    vreme: '',
    korisnikId: 0,
  };

  ngOnInit(): void {
    const idKorisnik = Number(localStorage.getItem('userId'));
    this.pacijentService.getAllPacijenti().subscribe((res) => {
      this.pacijenti = res.filter(
        (pacijent) => pacijent.korisnikId === idKorisnik
      );
      console.log(this.pacijenti);
    });

    this.AddForm();
  }

  userAny: any;

  AddForm() {
    this.addForm = this.fb.group({
      IDPacijent: [null, Validators.required], // Promenjeno ime kontrola sa "Ime" na "ImePrezime"
      Datum: [null, Validators.required],
      Vreme: [null, Validators.required],
    });
  }

  get IDPacijent() {
    // Promenjeno ime funkcije sa "Ime" na "ImePrezime"
    return this.addForm.get('IDPacijent') as FormControl; // Promenjeno ime sa "Ime" na "ImePrezime"
  }

  get Datum() {
    return this.addForm.get('Datum') as FormControl;
  }

  get Vreme() {
    return this.addForm.get('Vreme') as FormControl;
  }

  onSubmit() {
    console.log(this.addForm.value);
    this.userSubmitted = true;

    console.log(this.userData());

    if (this.addForm.valid) {
      const confirmed = confirm(
        'Da li ste sigurni da želite da dodate pacijenta?'
      );
      if (confirmed) {
        this.terminService.addTermin(this.userData()).subscribe((x) => {
          this.userAny = x;
        });
        this.addForm.reset();
        this.userSubmitted = false;
        this.router.navigate(['/termini']);
      }
    }
  }

  userData(): Termin {
    return (this.termin = {
      pacijentId: +this.IDPacijent.value,
      datum: this.Datum.value,
      vreme: this.Vreme.value,
      korisnikId: this.idKorisnik,
    });
  }
}
