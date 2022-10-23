
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsCategory } from '../models/productscategory-model';

@Injectable({
  providedIn: 'root'
})
export class ProductscategoryService {
  
  baseApiUrl: string = '/';
  constructor(private http: HttpClient) { }

  getAllProductsCategory():Observable<ProductsCategory[]> {
   return this.http.get<ProductsCategory[]>(this.baseApiUrl + 'productCategory');
  }

  addProductCategory(addProductCategoryRequest: ProductsCategory): Observable<ProductsCategory> {
    return this.http.post<ProductsCategory>(this.baseApiUrl + 'productCategory',
      addProductCategoryRequest);
  }
  patchProductCategory(patchProductCategoryRequest: ProductsCategory): Observable<ProductsCategory> {
    return this.http.patch<ProductsCategory>(this.baseApiUrl + 'productCategory',
      patchProductCategoryRequest);
  }
  deleteProductCategory(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'productCategory/' + id);
  }
}
