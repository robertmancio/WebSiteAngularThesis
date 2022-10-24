import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseApiUrl: string = '/';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + 'inventoryProduct');
  }

  addProduct(addProductRequest: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + 'inventoryProduct',
      addProductRequest);
  }
  patchProduct(patchProductRequest: Product): Observable<Product> {
    return this.http.patch<Product>(this.baseApiUrl + 'inventoryProduct',
      patchProductRequest);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'inventoryProduct/' + id);
  }
}
