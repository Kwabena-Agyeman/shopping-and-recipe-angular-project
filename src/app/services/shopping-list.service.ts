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

  private updateIngredientList(item: Ingredient) {
    const ingredients = [...this.ingredients];
    const newIngredient = { ...item };
    const existingIngredientIndex = ingredients.findIndex(
      (existingIngredient) =>
        existingIngredient.name.toLowerCase() ===
        newIngredient.name.toLowerCase()
    );

    if (existingIngredientIndex === -1) {
      ingredients.push(newIngredient);
      return ingredients;
    } else {
      ingredients[existingIngredientIndex].amount += newIngredient.amount;
      return ingredients;
    }
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients = this.updateIngredientList(ingredient);
    this.ingredientsChanges.emit([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.ingredients = this.updateIngredientList(ingredient);
    }
    this.ingredientsChanges.emit([...this.ingredients]);
  }
}
