import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = environment.apiUrl + 'products/';

  constructor(private http: HttpClient) { }

  getProducts(params?: string): Observable<any> {
    params = params ? params : '';
    return this.http.get(this.apiUrl + params);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }

  updateProduct(product: Product, id: number): Observable<any> {
    return this.http.patch(this.apiUrl + id, {
      product
    });
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, {
      product
    });
  }
}
