import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  @Input() recipe?: Recipe;

  constructor(private shopListService: ShoppingListService) {}

  addIngredientsToShopList() {
    if (this.recipe?.ingredients) {
      this.shopListService.addIngredient(this.recipe.ingredients);
    }
  }
}
