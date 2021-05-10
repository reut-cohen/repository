import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/Ingredient.model'
import * as ShoppingListActions from '../store/shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editIndex: number;
}


const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editIndex: -1
};


const _shoppingListReducer = createReducer(

  initialState,

  on(
    ShoppingListActions.addIngredient,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredient)
    })
  ),

  on(
    ShoppingListActions.addIngredients,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(...action.ingredients)
    })
  ),

  on(
    ShoppingListActions.updateIngredient,
    (state, action) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.map(
        (ingredient, index) => index === state.editIndex ? { ...action.ingredient } : ingredient
      )
    })
  ),

  on(
    ShoppingListActions.deleteIngredient,
    (state) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.filter(
        (_, index) => index !== state.editIndex
      )
    })
  ),

  on(
    ShoppingListActions.startEdit,
    (state, action) => ({
      ...state, editIndex:
      action.index
    })
  ),

  on(
    ShoppingListActions.stopEdit,
    (state) => ({
      ...state, editIndex: -1
    })
  )

);


export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}

// import { Ingredient } from 'src/app/shared/ingredient.model';
// import * as ShoppingListActions from './shopping-list.action';

// export interface State {
//   shoppingListIngredients: Ingredient[];
//   editedIngredient: Ingredient;
//   editedIngredientIndex: number;
// }

// const initialState: State = {
//   shoppingListIngredients: [
//     new Ingredient('Apples', 5),
//     new Ingredient('Tomatoes', 10)
//   ],
//   editedIngredient: null,
//   editedIngredientIndex: -1
// };

// export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
//   switch (action.type) {
//     case ShoppingListActions.ADD_INGREDIENT: // the identifier
//       console.log("action dispatch")
//       return {
//         // never touch the existing state! '...state' copied all properties of state to the new object, we can set now the ingredients.
//         ...state,
//         shoppingListIngredients: [...state.shoppingListIngredients, action.payload]
//       };

//     case ShoppingListActions.ADD_INGREDIENTS:
//       return {
//         ...state,
//         shoppingListIngredients: [...state.shoppingListIngredients, ...action.payload]
//       };

//     case ShoppingListActions.UPDATE_INGREDIENT:
//       const ingredient = state.shoppingListIngredients[state.editedIngredientIndex];

//       //copy the old item and then overwrite it with the payload.
//       const updatedIngredient = {
//         ...ingredient,
//         ...action.payload
//       }
//       const updatedIngredients = [...state.shoppingListIngredients]
//       updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
//       return {
//         ...state,
//         shoppingListIngredients: updatedIngredients,
//         editedIngredientIndex: -1,
//         editedIngredient: null
//       }


//     case ShoppingListActions.DELETE_INGREDIENT:
//       return {
//         ...state,
//         shoppingListIngredients: state.shoppingListIngredients.filter((ig, igIndex )=> {
//           return igIndex !== state.editedIngredientIndex
//         })
//       }

//     case ShoppingListActions.START_EDIT:
//       return {
//         ...state,
//         editedIngredientIndex: action.payload,
//         editedIngredient: { ...state.shoppingListIngredients[action.payload] }
//       }

//     case ShoppingListActions.STOP_EDIT:
//       return {
//         ...state,
//         editedIngredientIndex: -1,
//         editedIngredient: null
//       }

//     default:
//       console.log('default reducer')
//       return state;
//   }

// }
