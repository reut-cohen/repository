import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>) { }

  public ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe(user => {
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
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe(() => { });
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout();
  }

}
