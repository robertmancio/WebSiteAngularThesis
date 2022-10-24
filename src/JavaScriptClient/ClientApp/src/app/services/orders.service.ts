import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/orders-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  baseApiUrl: string = '/api/';
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseApiUrl + 'order');
  }

  addOrder(addProductRequest: Order): Observable<Order> {
    return this.http.post<Order>(this.baseApiUrl + 'order',
      addProductRequest);
  }
  patchOrder(patchProductRequest: Order): Observable<Order> {
    return this.http.patch<Order>(this.baseApiUrl + 'order',
      patchProductRequest);
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'order/' + id);
  }
}
