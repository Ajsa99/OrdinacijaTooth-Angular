import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  authUser(korisnik: any) {
    let UserArray = [];
    const localStorageUsers = localStorage.getItem('Users');

    if (localStorageUsers !== null) {
      //pretvaranje stringa u JSON objekat
      UserArray = JSON.parse(localStorageUsers);
    }
    // if(localStorage.getItem('Users')){
    //  UserArray = JSON.parse(localStorage.getItem('Users'));
    //}

    return UserArray.find(
      (p: { email: string; password: string }) =>
        p.email === korisnik.email && p.password === korisnik.password
    );
  }
}
