import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
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
      id: 2,
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

  constructor() {}

  getRecipes() {
    return new Array(...this.recipes);
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find((el) => el.id === id);
    if (recipe) {
      return { ...recipe };
    } else return undefined;
  }
}
