import { Component, Output, EventEmitter } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  constructor(private shopListService: ShoppingListService) {}

  name: string = '';
  amount: number = 0;

  onAddItem(item: Ingredient) {
    this.shopListService.addIngredient(item);
  }
}
