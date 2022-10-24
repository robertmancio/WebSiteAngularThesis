import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client-model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  baseApiUrl: string = '/';
  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseApiUrl + 'clients');
  }

  addClient(addProductRequest: Client): Observable<Client> {
    return this.http.post<Client>(this.baseApiUrl + 'clients',
      addProductRequest);
  }
  patchClient(patchProductRequest: Client): Observable<Client> {
    return this.http.patch<Client>(this.baseApiUrl + 'clients',
      patchProductRequest);
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'clients/' + id);
  }
}
