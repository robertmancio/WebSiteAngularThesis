import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductsCategory } from '../models/productscategory-model';

@Injectable({
  providedIn: 'root'
})
export class ProductscategoryService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllProductsCategory():Observable<ProductsCategory[]> {
   return this.http.get<ProductsCategory[]>(this.baseApiUrl + 'productCategory');
  }
}
