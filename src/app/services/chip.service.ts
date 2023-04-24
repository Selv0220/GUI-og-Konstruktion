import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chip } from '../models/chip';

const baseUrl = 'http://server.moedekjaer.dk:8080/api/chips';

@Injectable({
  providedIn: 'root'
})
export class ChipService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Chip[]> {
    return this.http.get<Chip[]>(baseUrl);
  }

  get(id: any): Observable<Chip> {
    return this.http.get<Chip>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
