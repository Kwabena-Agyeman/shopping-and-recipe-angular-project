import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    { name: 'Carrots', amount: 50 },
    { name: 'Apples', amount: 10 },
  ];

  onIngredientAdded(item: Ingredient) {
    this.ingredients.push(item);
  }
}
