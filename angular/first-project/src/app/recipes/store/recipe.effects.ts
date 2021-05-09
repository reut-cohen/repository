import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipe.action'
import * as fromApp from '../../store/app.reducer'

@Injectable()
export class RecipeEffects {

  public fetchRecipes$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(RecipesActions.fetchRecipes),
        switchMap(() => {
          return this.http
            .get<Recipe[]>(
              'https://ng-course-recipe-book-1ef4a-default-rtdb.firebaseio.com/recipes.json',
            )
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        map(recipes => {
          return RecipesActions.setRecipes({ recipes: recipes });
        })
      )
  });

  public storeRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.storeRecipes),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipeState]) => {
        return this.http
          .put(
            'https://ng-course-recipe-book-1ef4a-default-rtdb.firebaseio.com/recipes.json',
            recipeState.recipes
          )
      }
      ))
  }, { dispatch: false }
  )

  constructor(private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) { }
}
