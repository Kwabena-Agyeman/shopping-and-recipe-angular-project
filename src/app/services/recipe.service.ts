import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: 'Double Cheese Burger',
      description: 'Finger licking good',
      ingredients: [
        { name: 'Beef', amount: 1 },
        { name: 'Fries', amount: 2 },
      ],
      imagePath:
        'https://media-cdn.tripadvisor.com/media/photo-s/16/90/e3/9f/burger-se-syrem-hovezi.jpg',
    },
    {
      name: 'Hawaiian Pizza ',
      description: 'Taste it Love it',
      ingredients: [
        { name: 'Pineapple', amount: 1 },
        { name: 'Tomatoes', amount: 2 },
      ],
      imagePath:
        'https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg',
    },
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  getRecipes() {
    return [...this.recipes];
  }
}
