import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/model/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit {
  registrationForm!: FormGroup;

  korisnik: Korisnik = {
    ime: '',
    prezime: '',
    pol: '',
    datumRodjenja: new Date(),
    telefon: 0,
    drzava: '',
    grad: '',
    adresa: '',
    email: '',
    password: '',
    tip: '',
  };

  userSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    private KorisnikService: KorisnikService,
    private router: Router
  ) {
    this.userSubmitted = false;
  }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        Ime: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        Prezime: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        Pol: [null, Validators.required],
        DatumRodjenja: [null, Validators.required],
        Telefon: [null, Validators.required],
        Drzava: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        Grad: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        Adresa: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
        Email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
        Tip: [null, Validators.required],
      },
      { validators: this.passwordMatchingValidator }
    );
  }

  //custiom validator
  passwordMatchingValidator(fg: AbstractControl): Validators {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value
      ? false
      : { notmached: true };
  }

  get Ime() {
    return this.registrationForm.get('Ime') as FormControl;
  }

  get Prezime() {
    return this.registrationForm.get('Prezime') as FormControl;
  }

  get Pol() {
    return this.registrationForm.get('Pol') as FormControl;
  }

  get DatumRodjenja() {
    return this.registrationForm.get('DatumRodjenja') as FormControl;
  }

  get Telefon() {
    return this.registrationForm.get('Telefon') as FormControl;
  }

  get Drzava() {
    return this.registrationForm.get('Drzava') as FormControl;
  }

  get Grad() {
    return this.registrationForm.get('Grad') as FormControl;
  }

  get Adresa() {
    return this.registrationForm.get('Adresa') as FormControl;
  }

  get Email() {
    return this.registrationForm.get('Email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get Tip() {
    return this.registrationForm.get('Tip') as FormControl;
  }

  //-----------------------------------------------------------------

  userAny: any;

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;

    if (this.registrationForm.valid) {
      this.KorisnikService.registrationKorisnik(this.userData()).subscribe(
        (x) => {
          this.userAny = x;
          this.registrationForm.reset();
          this.userSubmitted = false;
          alert('Čestitamo, uspešno ste se registrovali!');
          this.router.navigate(['prijava']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Obrada grešaka validacije sa servera
            const validationErrors = error.error;
            console.log(validationErrors);

            // Prikaz greške korisniku u obliku alert-a
            let errorMessage = 'Podacu koje ste uneli nisu validni';

            alert(errorMessage);
          } else {
            // Obrada drugih grešaka
            // Na primer, obraditi greške koje nisu vezane za validaciju
          }
        }
      );
    }
  }

  userData(): Korisnik {
    return (this.korisnik = {
      ime: this.Ime.value,
      prezime: this.Prezime.value,
      pol: this.Pol.value,
      datumRodjenja: this.DatumRodjenja.value,
      telefon: this.Telefon.value,
      drzava: this.Drzava.value,
      grad: this.Grad.value,
      adresa: this.Adresa.value,
      email: this.Email.value,
      password: this.password.value,
      tip: this.Tip.value,
    });
  }
}
