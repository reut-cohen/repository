import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class AuthProducer {

  constructor(private store: Store<fromApp.AppState>) {}
  public login(
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
  ) {

  }

  public logout() {

  }
}
