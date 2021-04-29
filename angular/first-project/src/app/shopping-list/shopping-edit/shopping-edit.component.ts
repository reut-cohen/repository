import { Component, OnInit, Input, ViewChild, Output, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shpping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: true}) addingForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number;
  editedItem: Ingredient


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.
      subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.addingForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          })
      })
  }

  onAddItem() {
    const value = this.addingForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    }
     else {
      this.shoppingListService.addIngredient(ingredient);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.addingForm.reset()
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
