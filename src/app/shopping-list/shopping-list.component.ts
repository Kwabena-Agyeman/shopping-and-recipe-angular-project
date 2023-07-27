import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: Ingredient[];
  private shopServiceSubscription?: Subscription;

  constructor(private shopListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shopListService.getIngredients();
    this.shopServiceSubscription =
      this.shopListService.ingredientsChanges.subscribe((ingredients) => {
        console.log({ EMIT: ingredients });
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.shopServiceSubscription?.unsubscribe();
  }
}
