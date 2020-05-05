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
import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

import { Recipe, RecipeService, ShoppingListService } from '../../data';
import { Ingredient } from '../../data';

@Component({
  selector: 'app-shopping-list-screen',
  templateUrl: './shopping-list-screen.component.html',
  styleUrls: ['./shopping-list-screen.component.scss'],
})
export class ShoppingListScreenComponent implements OnInit {
  recipeList: Recipe[] = [];
  ingredientList: Ingredient[] = [];

  searchTerm$ = new Subject<string>();

  constructor(
    private readonly shoppingListService: ShoppingListService,
    private readonly recipeService: RecipeService,
  ) {}

  ngOnInit() {
    for (let recipe of this.recipeList) {
      this.addRecipe(recipe);
    }
  }

  refreshList() {
    this.shoppingListService
      .compileForRecipes(this.recipeList.map((a) => a.id))
      .subscribe(
        (res) => {
          this.ingredientList = res;
        },
        (error) => {
          console.log(error);
        },
      );
  }

  addRecipe(recipe: Recipe) {
    this.recipeList.push(recipe);
    this.refreshList();
  }

  removeRecipe(id: number) {
    this.recipeList = this.recipeList.filter((ing) => ing.id !== id);
    this.refreshList();
  }

  isNewRecipe = (newRecipe: Recipe) =>
    !this.recipeList.find((r) => r.id === newRecipe.id);

  recipeSearchFormatter = (result: Recipe) => result.name;

  recipeSearch = (text$: Observable<string>) => {
    return merge(text$, this.searchTerm$).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) =>
        this.recipeService.listRecipes(term).pipe(
          map((p) => p.content ?? []),
          map((list) => list.filter((r) => this.isNewRecipe(r))),
        ),
      ),
    );
  };
}
