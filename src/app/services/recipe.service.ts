import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  recipesUpdated = new Subject<Recipe[]>();

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next(this.recipes);
  }

  getRecipes() {
    return new Array(...this.recipes);
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find((el) => el.id === id);
    if (recipe) {
      return { ...recipe };
    } else return undefined;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes);
  }

  editRecipe(editedRecipe: Recipe) {
    const existingRecipeIndex = this.recipes.findIndex(
      (recipe) => recipe.id === editedRecipe.id
    );

    if (existingRecipeIndex !== -1) {
      this.recipes[existingRecipeIndex] = editedRecipe;
      this.recipesUpdated.next(this.recipes);
    }
  }

  deleteRecipe(id: number) {
    const existingRecipes = [...this.recipes];
    this.recipes = existingRecipes.filter((recipe) => recipe.id !== id);
    this.recipesUpdated.next(this.recipes);
  }
}
