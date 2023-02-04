import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let userDataStr = sessionStorage.getItem('userData');
      let userData = {
        id: null
      };

      if(userDataStr != null) userData = JSON.parse(userDataStr);
      
      if(userData.id) {
        return true;
      }
      else {
        this.router.navigate(['/login'])
        return false;
      }
  }

  
}
