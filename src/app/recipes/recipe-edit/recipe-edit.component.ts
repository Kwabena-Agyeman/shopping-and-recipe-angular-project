import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';

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
    ['ingredients']: new FormArray([], Validators.required),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = !!params['id'];
    });
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

  onAddIngredient() {
    const ingredientControl = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      amount: new FormControl<number>(0, Validators.pattern('^[1-9]+[0-9]*$')),
    });
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientControl);
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
