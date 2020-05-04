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
import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientPrototype, Recipe, RecipeService, ShoppingListService } from '../../data';
import { Ingredient } from '../../data';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-screen',
  templateUrl: './shopping-list-screen.component.html',
  styleUrls: ['./shopping-list-screen.component.scss'],
})
export class ShoppingListScreenComponent implements OnInit {
  recipeList: Recipe[] = [];
  ingredientList: Ingredient[] = [];

  refresh$ = new BehaviorSubject<void>(undefined);

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  constructor(private readonly shoppingListService: ShoppingListService,
              private readonly recipeService: RecipeService) {
  }

  ngOnInit(): void {
    for (let recipe of this.recipeList) {
      this.addRecipe(recipe);
    }
  }

  refreshList() {
    this.shoppingListService.compileForRecipes(this.recipeList.map(a => a.id)).subscribe(
      (res) => {
        this.ingredientList = res;
      },
      (error) => {
        console.log(error);
      }
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

  recipeSearchFormatter = (result: Recipe) => result.name;
  test = "";

  recipeSearch = (text$: Observable<string>) => {
    return combineLatest([text$, this.refresh$]).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(([term]) =>
        this.recipeService
          .listRecipes(term).pipe(map(p => p.content)),
      ),
    );
  };

  selectedRecipe($event: NgbTypeaheadSelectItemEvent) {
    this.addRecipe($event.item);
  }

  public onFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }
}
