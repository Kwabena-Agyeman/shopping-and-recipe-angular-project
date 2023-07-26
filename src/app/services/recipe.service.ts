import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: "Kwabena's recipe",
      description: ' Dummy recipe',
      imagePath:
        'https://eugenesdiner.com/wp-content/uploads/2023/01/NewPunjabClub_Overhead2.jpg',
    },
    {
      name: "Abena's recipe",
      description: ' Secret recipe',
      imagePath:
        'https://eugenesdiner.com/wp-content/uploads/2023/01/NewPunjabClub_Overhead2.jpg',
    },
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  getRecipes() {
    return [...this.recipes];
  }
}
