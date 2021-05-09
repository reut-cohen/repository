import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../../shared/Ingredient.model'
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from './shopping-list.action';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListProducer implements OnInit {

  public ingredients$: Observable<Ingredient[]>;
  public advancedIngredients$: Observable<Ingredient[]>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList').pipe(
      map((shoppingList) => {
        return shoppingList.ingredients
      })
    )

    this.advancedIngredients$ = this.ingredients$.pipe(
      map((ingredients: Ingredient[]) => {
        const newIngredients = ingredients.map((ingredient) => {
          ingredient.amount += 1;
          return ingredient;
        })
        return newIngredients;
      })
    )
  }

  public addIngredients(ingredients: Ingredient[]): void {
    console.log('from producer: ');
    console.log(ingredients);
    this.store.dispatch(ShoppingListActions.addIngredients({ ingredients: ingredients }));
  }

  public addIngredient(ingredient: Ingredient): void {
    console.log('from producer: ');
    console.log(ingredient);
    this.store.dispatch(ShoppingListActions.addIngredient({ ingredient: ingredient }));
  }

  public updateIngredient(ingredient: Ingredient): void {
    this.store.dispatch(ShoppingListActions.updateIngredient({ ingredient: ingredient }));
  }

  public deleteIngredient(): void {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
  }

  public startEdit(index: number): void {
    this.store.dispatch(ShoppingListActions.startEdit({ index: index }));
  }
  public stopEdit(): void {
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  public initialEditMode(): void {

  }
}
