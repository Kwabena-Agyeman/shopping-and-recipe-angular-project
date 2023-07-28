import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  editMode: boolean = false;

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    imagePath: new FormControl<string>(''),
    description: new FormControl<string>(''),
    ingredients: new FormArray([], Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = !!params['id'];
      if (this.id) {
        const selectedRecipe = this.recipeService.getRecipe(this.id);

        if (selectedRecipe) {
          const { description, id, imagePath, ingredients, name } =
            selectedRecipe;

          this.recipeForm.patchValue({
            name,
            imagePath,
            description,
          });

          // Clear the existing form array and add new ingredients
          const ingredientsFormArray = this.recipeIngredientsFormArray;
          ingredientsFormArray.clear();

          ingredients.forEach((ingredient) => {
            ingredientsFormArray.push(
              this.createIngredientFormGroup(ingredient)
            );
          });
        }
      }
    });
  }

  get recipeIngredientsFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientsControls() {
    return (
      this.recipeForm.get('ingredients') as FormArray<
        FormControl<{ name: string; amount: number }>
      >
    ).controls;
  }

  get imagePath() {
    return (this.recipeForm.get('imagePath') as FormControl).value;
  }

  createIngredientFormGroup(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl<string>(ingredient.name, Validators.required),
      amount: new FormControl<number>(
        ingredient.amount,
        Validators.pattern('^[1-9]+[0-9]*$')
      ),
    });
  }

  onAddIngredient() {
    const ingredientControl = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number>(0, Validators.pattern('^[1-9]+[0-9]*$')),
    });
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientControl);
  }

  onRemoveIngredient(index: number) {
    const ingredientControl = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number>(0, Validators.pattern('^[1-9]+[0-9]*$')),
    });

    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.editMode && this.id) {
      this.recipeService.editRecipe({ ...this.recipeForm.value, id: this.id });
    } else {
      const id = this.recipeService.getRecipes().length + 1;
      const newRecipe = { ...this.recipeForm.value, id };
      this.recipeService.addRecipe(newRecipe);
    }
    this.resetForm();
  }

  resetForm() {
    this.recipeForm.reset();
    this.recipeIngredientsFormArray.clear();
  }
}
