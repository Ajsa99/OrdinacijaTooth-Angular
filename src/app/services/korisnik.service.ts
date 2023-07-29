import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../model/korisnik';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public registrationKorisnik(korisnik: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<Korisnik>(url, korisnik);
  }

  public loginKorisnik(korisnik: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<Korisnik>(url, korisnik);
  }

  odobrenjeRegistracije(id: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/Korisnik/odobrenjeRegistracije/${id}`,
      null
    );
  }

  getAllKorisnici(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Korisnik`);
  }

  getKorisnikId(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Korisnik/${id}`);
  }

  deleteKorisnik(id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      `${this.apiUrl}/api/Korisnik/DeleteKorisnik/${id}`
    );
  }

  filterKorisnikImePrezime(imePrezime: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Korisnik/FilterKorisnik/${imePrezime}`
    );
  }

  sortKorisnikiPoImenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Korisnik/sortKorisniciIme`);
  }

  sortKorisnikiPoPrezimenu(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Korisnik/sortKorisniciPrezime`
    );
  }
}
