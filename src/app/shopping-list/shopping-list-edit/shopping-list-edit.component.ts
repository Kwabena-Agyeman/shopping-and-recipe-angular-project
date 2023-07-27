import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  @ViewChild('form') IngredientForm?: HTMLFormElement;

  constructor(private shopListService: ShoppingListService) {}

  name: string = '';
  amount?: number;

  onAddItem(item: Ingredient) {
    this.shopListService.addIngredient(item);
    this.IngredientForm?.reset();
  }
}
