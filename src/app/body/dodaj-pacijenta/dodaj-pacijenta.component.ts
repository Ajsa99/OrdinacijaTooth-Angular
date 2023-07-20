import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Pacijent } from 'src/app/model/pacijent';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
  selector: 'app-dodaj-pacijenta',
  templateUrl: './dodaj-pacijenta.component.html',
  styleUrls: ['./dodaj-pacijenta.component.scss'],
})
export class DodajPacijentaComponent implements OnInit {
  addForm!: FormGroup;
  idKorisnik: any = Number(localStorage.getItem('userId'));

  pacijent: Pacijent = {
    ime: '',
    prezime: '',
    pol: '',
    datumRodjenja: new Date(),
    drzava: '',
    grad: '',
    adresa: '',
    telefon: 0,
    email: '',
    korisnikId: 0,
  };

  userSubmitted: boolean;
  userAny: any;

  constructor(
    private fb: FormBuilder,
    private PacijentService: PacijentService,
    private router: Router
  ) {
    this.userSubmitted = false;
  }

  ngOnInit(): void {
    this.AddForm();
  }

  AddForm() {
    this.addForm = this.fb.group({
      Ime: [null, Validators.required],
      Prezime: [null, Validators.required],
      Pol: [null, Validators.required],
      DatumRodjenja: [null, Validators.required],
      Drzava: [null, Validators.required],
      Grad: [null, Validators.required],
      Adresa: [null, Validators.required],
      Telefon: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
    });
  }

  get Ime() {
    return this.addForm.get('Ime') as FormControl;
  }

  get Prezime() {
    return this.addForm.get('Prezime') as FormControl;
  }

  get Pol() {
    return this.addForm.get('Pol') as FormControl;
  }

  get DatumRodjenja() {
    return this.addForm.get('DatumRodjenja') as FormControl;
  }

  get Telefon() {
    return this.addForm.get('Telefon') as FormControl;
  }

  get Drzava() {
    return this.addForm.get('Drzava') as FormControl;
  }

  get Grad() {
    return this.addForm.get('Grad') as FormControl;
  }

  get Adresa() {
    return this.addForm.get('Adresa') as FormControl;
  }

  get Email() {
    return this.addForm.get('Email') as FormControl;
  }

  onSubmit() {
    console.log(this.addForm.value);
    this.userSubmitted = true;

    const confirmed = confirm(
      'Da li ste sigurni da želite da dodate pacijenta?'
    );

    if (this.addForm.valid && confirmed) {
      this.PacijentService.addPacijent(this.userData()).subscribe((x) => {
        this.userAny = x;
      });
      this.addForm.reset();
      this.userSubmitted = false;
      this.router.navigate(['/pacijenti']);
    }
  }

  userData(): Pacijent {
    return (this.pacijent = {
      ime: this.Ime.value,
      prezime: this.Prezime.value,
      pol: this.Pol.value,
      datumRodjenja: this.DatumRodjenja.value,
      telefon: this.Telefon.value,
      drzava: this.Drzava.value,
      grad: this.Grad.value,
      adresa: this.Adresa.value,
      email: this.Email.value,
      korisnikId: this.idKorisnik,
    });
  }
}
