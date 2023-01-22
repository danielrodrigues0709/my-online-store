import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor() { }

  private _cart!: Cart;

  public getCart(): Cart {
    return this._cart;
  }

  public setCart(cart: Cart): void {
    this._cart = cart;
  }
}
