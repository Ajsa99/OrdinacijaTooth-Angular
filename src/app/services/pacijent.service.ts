import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pacijent } from '../model/pacijent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacijentService {
  constructor(private http: HttpClient) {}

  public addPacijent(pacijent: any): Observable<any> {
    const url = `https://localhost:7190/api/Pacijent/addPacijent`;
    return this.http.post<Pacijent>(url, pacijent);
  }

  getAllPacijenti(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7190/api/Pacijent/getPacijenti'
    );
  }

  getPacijentId(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      `https://localhost:7190/api/Pacijent/getPacijent/${id}`
    );
  }

  deletePacijent(id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      `https://localhost:7190/api/Pacijent/DeletePacijent/${id}`
    );
  }

  updatePacijent(pacijentId: number, pacijent: Pacijent): Observable<any> {
    const url = `https://localhost:7190/api/Pacijent/editPacijent/${pacijentId}`;
    return this.http.put(url, pacijent);
  }
}
