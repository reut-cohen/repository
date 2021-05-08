import { Ingredient } from 'src/app/shared/Ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface State {
  shoppingListIngredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  shoppingListIngredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: // the identifier
      console.log("action dispatch")
      return {
        // never touch the existing state! '...state' copied all properties of state to the new object, we can set now the ingredients.
        ...state,
        shoppingListIngredients: [...state.shoppingListIngredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        shoppingListIngredients: [...state.shoppingListIngredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.shoppingListIngredients[state.editedIngredientIndex];

      //copy the old item and then overwrite it with the payload.
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients = [...state.shoppingListIngredients]
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        shoppingListIngredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      }


    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        shoppingListIngredients: state.shoppingListIngredients.filter((ig, igIndex )=> {
          return igIndex !== state.editedIngredientIndex
        })
      }

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.shoppingListIngredients[action.payload] }
      }

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      }

    default:
      console.log('default reducer')
      return state;
  }

}
