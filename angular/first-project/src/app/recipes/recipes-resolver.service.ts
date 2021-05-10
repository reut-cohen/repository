import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Recipe } from "./recipe.model";
import * as RecipesActions from './store/recipe.action';


@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<{ recipes: Recipe[] }> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipeService.getRecipes();
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap((recipes: Recipe[]) => {
        if (recipes.length === 0) {
          this.store.dispatch(RecipesActions.fetchRecipes());
          return this.actions$
            .pipe(
              ofType(RecipesActions.setRecipes),
              take(1)
            );
        } else {
          return of({ recipes });
        }
      })
    )
    // return this.dataStorageService.fetchRecipes();

  }

}
