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

  get(id: number): Observable<Chip> {
    return this.http.get<Chip>(`${baseUrl}/${id}`);
  }

  create(data: Chip): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: Chip): Observable<any> {
    console.log(data)
    return this.http.put(`${baseUrl}/${id}`, data); // the url is correct, the data is correct, yet it doesn't get updated
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
