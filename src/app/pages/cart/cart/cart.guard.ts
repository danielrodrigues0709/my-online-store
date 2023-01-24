import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartComponent } from './cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanDeactivate<CartComponent> {

  canDeactivate(
    component: CartComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
   if(nextState?.url == '/cart/resume' || !component.cart) {
      return true;
    }
    else {
      return component.canGoBack();
    }
  }
  
}
