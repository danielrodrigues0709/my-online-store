import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutComponent } from './checkout.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: CheckoutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
   if(nextState?.url == '/cart/confirmation' || !component.products) {
      return true;
    }
    else {
      return component.canGoBack();
    }
  }
  
}
