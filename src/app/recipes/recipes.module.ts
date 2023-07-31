import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeNavigationHomeComponent } from './recipe-navigation-home/recipe-navigation-home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeNavigationHomeComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: RecipeNavigationHomeComponent,
            pathMatch: 'full',
          },
          { path: 'new', component: RecipeEditComponent },
          { path: ':id', component: RecipeDetailComponent },
          { path: ':id/edit', component: RecipeEditComponent },
        ],
      },
    ]),
  ],
})
export class RecipesModule {}
