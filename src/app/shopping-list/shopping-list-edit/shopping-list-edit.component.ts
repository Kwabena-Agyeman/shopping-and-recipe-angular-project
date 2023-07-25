import { Component, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  name: string = '';
  amount: number = 0;

  onAddItem(item: Ingredient) {
    this.ingredientAdded.emit(item);
  }
}
