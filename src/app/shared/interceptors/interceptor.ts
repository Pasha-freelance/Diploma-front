import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedHeaders = this.addAuthorizationHeaders(request.headers);
    return next.handle(request.clone({ headers: modifiedHeaders })).pipe();
  }

  protected addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
    let token = localStorage.getItem('ddtoken');
    if (headers && token) {
      headers = headers.set('Authorization', token);
    }

    return headers;
  }
}
