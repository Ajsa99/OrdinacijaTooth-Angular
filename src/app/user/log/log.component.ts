import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { KorisnikLogin } from 'src/app/model/korisnikLogin';
import { AuthService } from 'src/app/services/auth-service.service';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent {
  loginForm!: FormGroup;
  userSubmitted!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private korisnikService: KorisnikService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  token: any;

  onSubmit() {
    console.group(this.loginForm.value);
    this.userSubmitted = true;

    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      return; // Ne preduzimamo nikakvu akciju kada su polja prazna
    }

    this.korisnikService
      .loginKorisnik(this.userData())
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            const token = response.token;
            const decodedToken: any = jwt_decode(token);
            const userId = decodedToken['nameid']; // or decodedToken.nameid
            const email = decodedToken['email']; // or decodedToken.email
            const ime = decodedToken['Ime']; // or decodedToken.ime
            const prezime = decodedToken['Prezime']; // or decodedToken.prezime
            const tip = decodedToken['Tip']; // or decodedToken.tip

            console.log(decodedToken);
            console.log('User ID:', userId);
            localStorage.setItem('userId', userId);
            localStorage.setItem('email', email);
            localStorage.setItem('ime', ime);
            localStorage.setItem('prezime', prezime);
            localStorage.setItem('tip', tip);

            alert('Uspešno ste se ulogovali!');
            this.router.navigate(['/pocetna']);
          }
        }),
        catchError((error: any) => {
          if (error.status === 401) {
            alert('Pogrešno ste uneli korisničko ime ili lozinku!');
          } else if (error.status === 400) {
            alert(
              'Registracija je na čekanju. Potrebno je odobrenje od Administratora.'
            );
          } else {
            alert('Došlo je do greške prilikom logovanja!');
          }
          console.log(error);
          return [];
        })
      )
      .subscribe();
  }

  korisnik!: KorisnikLogin;
  userData(): KorisnikLogin {
    return (this.korisnik = {
      email: this.email.value,
      password: this.password.value,
    });
  }
}
