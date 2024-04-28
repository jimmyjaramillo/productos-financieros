import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHOR_ID } from '../constants/constants';
@Injectable()

export class AuthorInterceptor implements HttpInterceptor {

  constructor(@Inject(AUTHOR_ID) private authorId: string) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authRequest = req.clone({
        setHeaders: {
          "authorId": this.authorId
        }
    });
    return next.handle(authRequest)
  }

}

