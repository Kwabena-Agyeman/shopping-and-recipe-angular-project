import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private firebaseURL =
    'https://organic-shop-angular-ebe7a-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(this.firebaseURL, recipes)
      .subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(this.firebaseURL).subscribe((recipes) => {
      this.recipeService.setRecipes(recipes);
    });
  }
}
