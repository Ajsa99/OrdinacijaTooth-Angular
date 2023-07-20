import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Termin } from '../model/termin';

@Injectable({
  providedIn: 'root',
})
export class TerminService {
  constructor(private http: HttpClient) {}

  public addTermin(termin: any): Observable<any> {
    const url = `https://localhost:7190/api/Termin/addTermin`;
    return this.http.post<Termin>(url, termin);
  }

  getAllTermini(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7190/api/Termin/getTermini');
  }

  getAllTerminiPacijenti(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7190/api/Termin/getTerminiPacijenti'
    );
  }

  getTerminPacijentId(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      `https://localhost:7190/api/Termin/getTerminiPacijenti/${id}`
    );
  }
}
