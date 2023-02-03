import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../interfaces/address';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() addAddress: EventEmitter<Address> = new EventEmitter<Address>();

  apiUrl: string = environment.apiUrl + 'users/';
  zipCodeApi: string = environment.zipCodeApi;
  apiKey: string = environment.apikey;

  constructor(private http: HttpClient) { }

  getUsers(params?: string): Observable<any> {
    params = params ? params : '';
    return this.http.get(this.apiUrl + params);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }

  updateUser(user: any, id: number): Observable<any> {
    return this.http.patch(this.apiUrl + id, {
      email: user.email,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      phone: user.phone,
      birthDate: user.birthDate,
      role: user.role,
      address: user.address
    });
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, {
      email: user.email,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      phone: user.phone,
      birthDate: user.birthDate,
      role: user.role,
      address: user.address
    });
  }

  getAddressByPostalCode(postaCode: number): Observable<any> {
    return new Observable((x)=>{
      var request = new XMLHttpRequest();
      request.open('get', `${this.zipCodeApi}search?apikey=${this.apiKey}&codes=${postaCode}&country=US`, true);
      request.send();
      request.onload = function () {
        var data = JSON.parse(this.response);
        x.next(data)
      }
    })
  }

  setAddress(address: Address): void {
    this.addAddress.emit(address);
  }

}
