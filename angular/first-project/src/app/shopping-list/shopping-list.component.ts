import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Ingredient } from '../shared/Ingredient.model'
import { LoggingService } from "../logging.service";
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.action';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})

export class ShoppingListComponent implements OnInit {
  public ingredients$: Observable<Ingredient[]>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.ingredients$ = this.shoppingListProducer.ingredients$;
    this.ingredients$ = this.store.select('shoppingList')
      .pipe(
        map((shoppingList) => {
          return shoppingList.ingredients;
        })
      )

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit')
  }

  public onEditItem(index: number): void {
    this.store.dispatch(ShoppingListActions.startEdit({ index: index }));
    // this.shoppingListProducer.startEdit(index);
  }
}
