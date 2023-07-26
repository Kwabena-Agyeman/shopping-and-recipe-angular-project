import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    { name: 'Carrots', amount: 50 },
    { name: 'Apples', amount: 10 },
  ];
  ingredientsChanges = new EventEmitter<Ingredient[]>();

  constructor() {}

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient | Ingredient[]) {
    if (Array.isArray(ingredient)) {
      ingredient.map((newIngredient) => {
        const existingItem = this.ingredients.findIndex(
          (oldIngredient) => oldIngredient.name === newIngredient.name
        );

        if (existingItem === -1) {
          this.ingredients.push(newIngredient);
        } else {
          this.ingredients[existingItem].amount =
            this.ingredients[existingItem].amount + newIngredient.amount;
        }
      });
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanges.emit([...this.ingredients]);
  }
}
