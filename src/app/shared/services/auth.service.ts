import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = environment.authUrl + 'login';
  @Output() userUpdated: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  getUserData(login: Login): any {
    login.expiresInMins = 60;
    fetch(this.authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login)
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      this.setUserData(res);
    });
  }

  private setUserData(userData: any): void {
    this.userUpdated.emit(userData);
    localStorage.setItem('token', userData.token);
  }
}
