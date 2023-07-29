import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pacijent } from '../model/pacijent';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PacijentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public addPacijent(pacijent: any): Observable<any> {
    const url = `${this.apiUrl}/api/Pacijent/addPacijent`;
    return this.http.post<Pacijent>(url, pacijent);
  }

  getAllPacijenti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Pacijent/getPacijenti`);
  }

  getPacijentId(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Pacijent/getPacijent/${id}`
    );
  }

  deletePacijent(id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      `${this.apiUrl}/api/Pacijent/DeletePacijent/${id}`
    );
  }

  updatePacijent(pacijentId: number, pacijent: Pacijent): Observable<any> {
    const url = `${this.apiUrl}/api/Pacijent/editPacijent/${pacijentId}`;
    return this.http.put(url, pacijent);
  }

  filterPacijentImePrezime(imePrezime: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Pacijent/FilterPacijent/${imePrezime}`
    );
  }

  sortPacijentiPoImenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Pacijent/sortPacijentiIme`);
  }

  sortPacijentiPoPrezimenu(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/Pacijent/sortPacijentiPrezime`
    );
  }

  getPacijentiByPage(page: any, pageSize: any, id: any): Observable<any[]> {
    const url = `${this.apiUrl}/api/Pacijent/Pacijenti/Page/${page}/${pageSize}/${id}`;
    return this.http.get<any[]>(url);
  }
}
