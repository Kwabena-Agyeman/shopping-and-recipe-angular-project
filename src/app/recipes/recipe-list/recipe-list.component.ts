import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
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
}
