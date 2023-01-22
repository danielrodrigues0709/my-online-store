import { Injectable, Output, EventEmitter } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Observable, of } from 'rxjs';
import { coupons } from 'src/app/mocks/coupons';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  @Output() cartUpdated: EventEmitter<Cart> = new EventEmitter<Cart>()

  constructor() { }

  private _cart!: Cart;

  public getCart(): Cart {
    return this._cart;
  }

  public setCart(cart: Cart): void {
    this._cart = cart;
    this.cartUpdated.emit(this._cart);
  }

  getCoupons(): Observable<any> {
    return of(coupons);
  }
}
