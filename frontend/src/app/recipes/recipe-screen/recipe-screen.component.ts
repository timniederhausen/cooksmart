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
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { Pageable, PageRecipe, Recipe, RecipeService } from '../../data';

@Component({
  selector: 'app-recipe-screen',
  templateUrl: './recipe-screen.component.html',
  styleUrls: ['./recipe-screen.component.scss'],
})
export class RecipeScreenComponent implements OnInit, AfterViewInit {
  recipes$: Observable<PageRecipe>;
  recipesList$: Observable<Recipe[]>;
  recipes: PageRecipe;

  private searchTerms$ = new Subject<string>();
  private pageWanted$ = new Subject<Pageable>();

  newRecipe?: Recipe;

  constructor(private readonly recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes$ = combineLatest([
      this.pageWanted$,
      this.searchTerms$.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),
      ),
    ])
      .pipe(
        // switch to new search observable each time the term / page changes
        switchMap(([pageable, term]) => {
          if (!pageable) return this.recipeService.listRecipes(term);
          return this.recipeService.listRecipes(
            term,
            pageable.page,
            pageable.size,
            pageable.sort,
          );
        }),

        catchError((err) => {
          console.log(err);
          return of({ first: true, content: [] } as PageRecipe);
        }),
      )
      .pipe(
        tap((recipes) => {
          if (recipes.first) this.recipes = recipes;
          else
            this.recipes = {
              ...recipes,
              content: this.recipes.content.concat(recipes.content),
            };
        }),
      );
    this.recipesList$ = this.recipes$.pipe(map((pr) => pr.content ?? []));
  }

  ngAfterViewInit() {
    this.pageWanted$.next({});
    this.searchTerms$.next('');
  }

  search(term: string) {
    this.searchTerms$.next(term);
  }

  loadMore() {
    if (!this.recipes.pageable || this.recipes.last) return;
    this.pageWanted$.next({
      ...this.recipes.pageable,
      page: this.recipes.pageable.page + 1,
    });
  }

  addNew() {
    this.newRecipe = {
      description: '',
      image: '',
      ingredients: undefined,
      rating: 0,
      name: '',
    };
  }

  saveRecipe(recipe: Recipe) {
    console.log(recipe);
    if (recipe.id) {
      this.recipeService.updateRecipe(recipe.id, recipe).subscribe(
        () => {},
        (error) => {
          console.log(error);
        },
      );
      return;
    }
    this.recipeService.addRecipe(recipe).subscribe(
      (addedRecipe) => {
        this.recipes.content = [addedRecipe, ...this.recipes.content];
        this.newRecipe = undefined;
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
