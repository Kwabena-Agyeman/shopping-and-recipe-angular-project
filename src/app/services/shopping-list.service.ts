import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    { name: 'Carrots', amount: 50 },
    { name: 'Apples', amount: 10 },
  ];
  ingredientsChanges = new Subject<Ingredient[]>();
  selectedIngredient = new Subject<Ingredient>();

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
    this.ingredientsChanges.next([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.ingredients = this.updateIngredientList(ingredient);
    }
    this.ingredientsChanges.next([...this.ingredients]);
  }

  editIngredient(ingredient: Ingredient) {
    const editedIngredient = { ...ingredient };
    const existingIngredientIndex = this.ingredients.findIndex(
      (existingIngredient) =>
        existingIngredient.name.toLowerCase() ===
        editedIngredient.name.toLowerCase()
    );

    if (existingIngredientIndex !== -1) {
      this.ingredients[existingIngredientIndex].name = editedIngredient.name;
      this.ingredients[existingIngredientIndex].amount =
        editedIngredient.amount;

      this.ingredientsChanges.next([...this.ingredients]);
    }
  }

  deleteIngredient(ingredient: Ingredient) {
    const deletedIngredient = { ...ingredient };
    const ingredients = [...this.ingredients];

    this.ingredients = ingredients.filter(
      (existingIngredient) =>
        existingIngredient.name.toLowerCase() !==
        deletedIngredient.name.toLowerCase()
    );

    this.ingredientsChanges.next([...this.ingredients]);
  }
}
