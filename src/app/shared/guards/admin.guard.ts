import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let userDataStr = localStorage.getItem('userData');
      let userData = {
        id: null,
        admin: null
      };

      if(userDataStr != null) userData = JSON.parse(userDataStr);
      
      if(userData.id) {
        if(userData.admin == true) {
          return true;
        }
        this.router.navigate(['/home']);
        return false;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
