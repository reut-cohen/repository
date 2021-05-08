import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.action'
import { of } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(catchError(error => {
        // ...
        of();
      }), map(resData => {
        of();
      }))
    }),

  );

  constructor(private actions$: Actions,
    private http: HttpClient) { }

}
