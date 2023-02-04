import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl + 'users';
  @Output() userUpdated: EventEmitter<any> = new EventEmitter<any>()

  constructor(private http: HttpClient) { }

  getUserData(login: Login): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${login.username}&password=${login.password}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  setUserData(userData: any): void {
    localStorage.setItem('token', 'bearer_random_token');
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userUpdated.emit(userData);
  }
}
