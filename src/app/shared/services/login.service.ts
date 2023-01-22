import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = environment.apiUrl + 'auth/login/';

  constructor(private http: HttpClient) { }

  @Output() loginUpdated: EventEmitter<boolean> = new EventEmitter<boolean>()
  private _isLoggedIn!: boolean;

  public getLogin(): boolean {
    return this._isLoggedIn;
  }

  public setLogin(loggedIn: boolean): void {
    this._isLoggedIn = loggedIn;
    this.loginUpdated.emit(loggedIn);
  }

  login(login: Login): Observable<any> {
    return this.http.post(this.apiUrl, {
      login
    });
  }
}
