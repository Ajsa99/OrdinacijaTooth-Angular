import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Termin } from '../model/termin';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TerminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public addTermin(termin: any): Observable<any> {
    const url = `${this.apiUrl}/api/Termin/addTermin`;
    return this.http.post<Termin>(url, termin);
  }

  getAllTermini(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Termin/getTermini`);
  }

  getAllTerminiPacijenti(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Termin/getTerminiPacijenti`
    );
  }

  getTerminPacijentId(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Termin/getTerminiPacijenti/${id}`
    );
  }
}
