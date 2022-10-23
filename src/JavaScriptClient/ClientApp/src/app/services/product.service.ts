import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseApiUrl: string = 'api/';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + 'productInventory');
  }

  addProduct(addProductRequest: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + 'productInventory',
      addProductRequest);
  }
  patchProduct(patchProductRequest: Product): Observable<Product> {
    return this.http.patch<Product>(this.baseApiUrl + 'productInventory',
      patchProductRequest);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'productInventory/' + id);
  }
}
