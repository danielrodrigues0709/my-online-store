import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = environment.apiUrl + 'auth/login/';

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.http.post(this.apiUrl, {
      login
    });
  }
}
