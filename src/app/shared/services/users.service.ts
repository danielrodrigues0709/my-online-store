import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: string = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) { }

  getUsers(params?: string): Observable<any> {
    params = params ? params : '';
    return this.http.get(this.apiUrl + params);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }

  updateUser(user: User, id: number): Observable<any> {
    return this.http.patch(this.apiUrl + id, {
      user
    });
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, {
      user
    });
  }
}
