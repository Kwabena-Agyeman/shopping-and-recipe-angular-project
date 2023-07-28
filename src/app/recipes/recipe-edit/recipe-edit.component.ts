import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  recipeForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = !!params['id'];
      this.initForm();
    });
  }

  get recipeIngredientsFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get imagePath() {
    return (this.recipeForm.get('imagePath') as FormControl).value;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([], [Validators.required]);

    if (this.editMode && this.id) {
      const selectedRecipe = this.recipeService.getRecipe(this.id);
      if (selectedRecipe) {
        recipeName = selectedRecipe.name;
        recipeImagePath = selectedRecipe.imagePath;
        recipeDescription = selectedRecipe.description;

        if (selectedRecipe?.ingredients?.length > 0) {
          selectedRecipe.ingredients.forEach((ingredient) => {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, [Validators.required]),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern('^[1-9]+[0-9]*$'),
                ]),
              })
            );
          });
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl<string>(recipeName, [Validators.required]),
      imagePath: new FormControl<string>(recipeImagePath, [
        Validators.required,
      ]),
      description: new FormControl<string>(recipeDescription, [
        Validators.required,
      ]),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    const ingredientControl = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number>(0, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
    });
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientControl);
  }

  onRemoveIngredient(index: number) {
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
    this.onCancel();
  }

  resetForm() {
    this.recipeForm.reset();
    this.recipeIngredientsFormArray.clear();
  }

  onCancel() {
    if (this.id) {
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }
}
