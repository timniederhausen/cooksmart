// Copyright 2020 Felix Burk, Tim Niederhausen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeScreenComponent } from './recipes/recipe-screen/recipe-screen.component';
import { IngredientScreenComponent } from './ingredients/ingredient-screen/ingredient-screen.component';
import { ShoppingListScreenComponent } from './shopping-list/shopping-list-screen/shopping-list-screen.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeScreenComponent },
  { path: 'ingredients', component: IngredientScreenComponent },
  { path: 'shopping-list', component: ShoppingListScreenComponent },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
