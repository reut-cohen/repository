import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shpping-list.service';
import { Recipe } from './recipe.model';
@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://www.kal-lehachana.co.il/wp-content/uploads/2019/09/IMG-20190609-WA0161-1024x576.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]
  //   ),
  //   new Recipe(
  //     'Ravioli',
  //     'Amazing ravioli, straight from Italy',
  //     'https://img.mako.co.il/2010/06/24/ravioli_shamenet_pitriotcc.jpg',
  //     [
  //       new Ingredient('Flour', 500),
  //       new Ingredient('Eggs', 5),
  //       new Ingredient('Cream', 1)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); // return copy of the array not reference.
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
  }

}
