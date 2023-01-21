import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  apiUrl: string = environment.apiUrl + 'carts/';

  constructor(private http: HttpClient) { }

  getCarts(params?: string): Observable<any> {
    params = params ? params : ''; 
    return this.http.get(this.apiUrl + params);
  }

  deleteCart(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }

  updateCart(cart: any, id: number): Observable<any> {
    return this.http.patch(this.apiUrl + id, {
      cart
    });
  }

  saveCart(cart: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      cart
    });
  }
}
