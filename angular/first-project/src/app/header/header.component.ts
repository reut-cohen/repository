import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/store/auth.action';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './../recipes/store/recipe.action';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  private userSub: Subscription;
  public isAuthenticated = false;

  constructor(
    private store: Store<fromApp.AppState>) { }

  public ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe(
      user => {
        this.isAuthenticated = !user ? false : true; // !!user not(not)
      });
  }

  public ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  public onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

  public onSaveData(): void {
    this.store.dispatch(RecipesActions.storeRecipes());
    // this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.store.dispatch(RecipesActions.fetchRecipes());
    // this.dataStorageService.fetchRecipes().subscribe(() => { });
  }

  public onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }

}
