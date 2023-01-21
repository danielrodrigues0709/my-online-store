import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  updateProduct(product: any, id: number): Observable<any> {
    return this.http.patch(this.apiUrl + id, {
      product
    });
  }

  saveProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      product
    });
  }
}
