import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../model/korisnik';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  constructor(private http: HttpClient) {}

  public registrationKorisnik(korisnik: any): Observable<any> {
    const url = `https://localhost:7190/register`;
    return this.http.post<Korisnik>(url, korisnik);
  }

  public loginKorisnik(korisnik: any): Observable<any> {
    const url = `https://localhost:7190/login`;
    return this.http.post<Korisnik>(url, korisnik);
  }

  odobrenjeRegistracije(id: any): Observable<any> {
    return this.http.put<any>(
      `https://localhost:7190/api/Korisnik/odobrenjeRegistracije/${id}`,
      null
    );
  }

  getAllKorisnici(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7190/api/Korisnik');
  }

  getKorisnikId(id: any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7190/api/Korisnik/${id}`);
  }

  deleteKorisnik(id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      `https://localhost:7190/api/Korisnik/DeleteKorisnik/${id}`
    );
  }

  filterKorisnikImePrezime(imePrezime: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://localhost:7190/api/Korisnik/FilterKorisnik/${imePrezime}`
    );
  }

  sortKorisnikiPoImenu(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7190/api/Korisnik/sortKorisniciIme'
    );
  }

  sortKorisnikiPoPrezimenu(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7190/api/Korisnik/sortKorisniciPrezime'
    );
  }
}
