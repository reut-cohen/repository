import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shpping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://www.kal-lehachana.co.il/wp-content/uploads/2019/09/IMG-20190609-WA0161-1024x576.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Ravioli',
      'Amazing ravioli, straight from Italy',
      'https://img.mako.co.il/2010/06/24/ravioli_shamenet_pitriotcc.jpg',
      [
        new Ingredient('Flour', 500),
        new Ingredient('Eggs', 5),
        new Ingredient('Cream', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // return copy of the array not reference.
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

}
