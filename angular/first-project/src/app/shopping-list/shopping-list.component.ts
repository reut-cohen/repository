import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { LoggingService } from "../logging.service";
import { ShoppingListProducer } from './store/shopping-list.producer';
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromApp from '../store/app.reducer'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})

export class ShoppingListComponent implements OnInit {
  public ingredients$: Observable<Ingredient[]>;
  private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private shoppingListProducer: ShoppingListProducer,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.ingredients$ = this.shoppingListProducer.ingredients$;
    this.ingredients$ = this.store.select('shoppingList')
      .pipe(
        map((shoppingList) => {
          return shoppingList.shoppingListIngredients;
        })
      )
    // this.ingredients = this.shppingListService.getIngredients();
    // this.subscription = this.shppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit')
  }
  
  public onEditItem(index: number): void {
    this.shoppingListProducer.startEdit(index);
    // this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.startedEditing.next(index);
  }
}
