import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LoggingService } from "../logging.service";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "./shpping-list.service"

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ ShoppingListService ]
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shppingListService: ShoppingListService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shppingListService.getIngredients();
    this.subscription = this.shppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
    );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shppingListService.startedEditing.next(index);
  }
}
