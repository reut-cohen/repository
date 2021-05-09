import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer'
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {


  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  // for adding the token to the request before sent. but just if user exists.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(stateData => {
        return stateData.user;
      }),
      // involves another observable to the user. user + http.get
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedReq);
      })
    )
  }
}
