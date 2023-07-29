import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregled } from '../model/pregled';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PregledService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public addPregled(pregled: any): Observable<any> {
    const url = `${this.apiUrl}/api/Pregled/addPregled`;
    return this.http.post<Pregled>(url, pregled);
  }

  getAllPregledi(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Pregled/getPregledi`);
  }

  getTerminPregledId(idPacijent: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Pregled/getTerminiPregledi/${idPacijent}`
    );
  }
}
