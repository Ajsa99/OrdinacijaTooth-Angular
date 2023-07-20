import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregled } from '../model/pregled';

@Injectable({
  providedIn: 'root',
})
export class PregledService {
  constructor(private http: HttpClient) {}

  public addPregled(pregled: any): Observable<any> {
    const url = `https://localhost:7190/api/Pregled/addPregled`;
    return this.http.post<Pregled>(url, pregled);
  }

  getAllPregledi(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7190/api/Pregled/getPregledi'
    );
  }

  getTerminPregledId(idPacijent: any): Observable<any[]> {
    return this.http.get<any[]>(
      `https://localhost:7190/api/Pregled/getTerminiPregledi/${idPacijent}`
    );
  }
}
