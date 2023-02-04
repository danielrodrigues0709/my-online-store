import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      
    let headers: HttpHeaders = request.headers
            .set('token', JSON.stringify(sessionStorage.getItem('token')))
        
        request = request.clone({
            headers
         });
        
        return next.handle(request);

  }
}
