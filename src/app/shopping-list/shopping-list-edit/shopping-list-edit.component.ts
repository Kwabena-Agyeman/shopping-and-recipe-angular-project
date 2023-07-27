import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  name?: string;
  amount?: number;
  editMode = false;
  selectedIngredientSubscription?: Subscription;
  @ViewChild('form') IngredientForm?: HTMLFormElement;

  constructor(private shopListService: ShoppingListService) {}

  ngOnInit(): void {
    this.selectedIngredientSubscription =
      this.shopListService.selectedIngredient.subscribe(
        (ingredient: Ingredient) => {
          this.name = ingredient.name;
          this.amount = ingredient.amount;
          this.editMode = true;
        }
      );
  }

  ngOnDestroy(): void {
    this.selectedIngredientSubscription?.unsubscribe();
  }

  onAddItem(item: Ingredient) {
    this.shopListService.addIngredient(item);
    this.resetForm();
  }

  onEditItem() {
    if (this.name && this.amount) {
      this.shopListService.editIngredient({
        name: this.name,
        amount: this.amount,
      });
      this.resetForm();
    }
  }

  onDeleteItem() {
    if (this.name && this.amount) {
      this.shopListService.deleteIngredient({
        name: this.name,
        amount: this.amount,
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.IngredientForm?.reset();
    this.editMode = false;
  }
}
