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
import { Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';

import { SimplePageRecipe, Recipe, RecipeService } from '../../data';
import { PageableEntityService } from '../../core/pageable-entity.service';

@Component({
  selector: 'app-recipe-screen',
  templateUrl: './recipe-screen.component.html',
  styleUrls: ['./recipe-screen.component.scss'],
})
export class RecipeScreenComponent implements OnInit, AfterViewInit {
  recipePageService: PageableEntityService<Recipe, string>;

  recipesList$: Observable<Recipe[]>;
  canLoadMore$: Observable<boolean>;

  private searchTerms$ = new Subject<string>();
  private sort$ = new Subject<string>();

  newRecipe?: Recipe;

  constructor(private readonly recipeService: RecipeService) {
    this.recipePageService = new PageableEntityService<Recipe, string>(
      (state) => {
        console.log(state);
        return this.recipeService.listRecipes(
          state.query ? state.query : undefined,
          state.pageable?.page,
          state.pageable?.size,
          state.pageable?.sort,
        );
      },
    );
    this.canLoadMore$ = this.recipePageService.entities$.pipe(
      map((p) => !p.last),
    );
  }

  ngOnInit() {
    this.searchTerms$
      .pipe(
        // ignore new term if same as previous term
        distinctUntilChanged(),
      )
      .subscribe((term) => {
        console.log('SEARCH ' + term);
        this.recipePageService.state.pageable.page = 0;
        this.recipePageService.state.query = term;
        this.recipePageService.reload();
      });
    this.sort$.subscribe((sort) => {
      this.recipePageService.state.pageable.page = 0;
      this.recipePageService.state.pageable.sort = [sort];
      this.recipePageService.reload();
    });
    const recipePage$ = this.recipePageService.entities$.pipe(
      catchError((err) => {
        console.log(err);
        return of({ first: true, content: [] } as SimplePageRecipe);
      }),
    );
    this.recipesList$ = recipePage$.pipe(map((pr) => pr.content ?? []));
  }

  ngAfterViewInit() {
    this.searchTerms$.next('');
  }

  search(term: string) {
    this.searchTerms$.next(term);
  }

  loadMore() {
    this.recipePageService.loadMore();
  }

  addNew() {
    this.newRecipe = {
      id: undefined,
      description: '',
      image: '',
      ingredients: [],
      rating: 0,
      name: '',
    };
  }

  saveRecipe(recipe: Recipe) {
    if (recipe.id) {
      this.recipeService.updateRecipe(recipe.id, recipe).subscribe(
        (updatedRecipe) => {
          // The server is the only source of truth here
          Object.assign(recipe, updatedRecipe);
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      this.recipeService.addRecipe(recipe).subscribe(
        (addedRecipe) => {
          // XXX: How should an added recipe be handled if we have multiple pages loaded?
          this.recipePageService.reload();
          this.newRecipe = undefined;
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe.id).subscribe(() => {
      this.recipePageService.filter((r) => r.id !== recipe.id);
    });
  }

  changeOrder(sort: string) {
    this.sort$.next(sort);
  }
}
