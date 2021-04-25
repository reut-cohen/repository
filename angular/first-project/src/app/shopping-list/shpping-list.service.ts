import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // insert all the array in one single method with ... //
    this.ingredientsChanged.next(this.ingredients.slice());
  }



}
