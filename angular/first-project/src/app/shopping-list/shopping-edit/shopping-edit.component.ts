import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import * as fromApp from '../../store/app.reducer';
import { ShoppingListProducer } from './../store/shopping-list.producer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  public subscription: Subscription;
  public editMode = false;
  public editedItemIndex: number;
  public editedItem: Ingredient;


  constructor(
    private shoppingListProducer: ShoppingListProducer,
    private store: Store<fromApp.AppState>) { }

  public ngOnInit(): void {
    this.store.select('shoppingList').subscribe(stateData => {
      const index = stateData.editIndex;
      if (index > -1) {
        this.editMode = true;
        this.editedItem = stateData.ingredients[index];
        this.form.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  public onAddItem(): void {
    const value = this.form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListProducer.updateIngredient(ingredient);
    } else {
      this.shoppingListProducer.addIngredient(ingredient);
    }
    this.editMode = false;
    this.form.reset();
  }

  public ngOnDestroy(): void {
    this.shoppingListProducer.stopEdit();
  }

  public onClear(): void {
    this.form.reset();
    this.editMode = false;
    this.shoppingListProducer.stopEdit();
  }

  public onDelete(): void {
    this.shoppingListProducer.deleteIngredient();
    this.onClear();
  }
}
