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

import {
  SimplePageRecipe,
  Recipe,
  RecipeService,
  IngredientService,
} from '../../data';
import { PageableEntityService } from '../../core/pageable-entity.service';
import { StatefulRecipe } from '../recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-screen',
  templateUrl: './recipe-screen.component.html',
  styleUrls: ['./recipe-screen.component.scss'],
})
export class RecipeScreenComponent implements OnInit, AfterViewInit {
  recipePageService: PageableEntityService<Recipe, string>;

  recipesList$: Observable<StatefulRecipe[]>;

  private searchTerms$ = new Subject<string>();

  newRecipe?: StatefulRecipe;

  constructor(
    private readonly recipeService: RecipeService,
    private readonly ingredientService: IngredientService,
  ) {
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
  }

  ngOnInit() {
    this.searchTerms$
      .pipe(
        // ignore new term if same as previous term
        distinctUntilChanged(),
      )
      .subscribe((term) => {
        console.log('SEARCH ' + term);
        this.recipePageService.state.query = term;
        this.recipePageService.reload();
      });
    const recipePage$ = this.recipePageService.entities$.pipe(
      catchError((err) => {
        console.log(err);
        return of({ first: true, content: [] } as SimplePageRecipe);
      }),
    );
    this.recipesList$ = recipePage$.pipe(
      map((pr) => (pr.content as Array<StatefulRecipe>) ?? []),
    );
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

  saveRecipe(recipe: StatefulRecipe) {
    if (recipe.id) {
      this.recipeService.updateRecipe(recipe.id, recipe).subscribe(
        () => {},
        (error) => {
          console.log(error);
        },
      );
      for (let ingredient of recipe.removedIngredients ?? []) {
        this.ingredientService
          .deleteIngredient(ingredient.id)
          .subscribe({ error: (error) => console.log(error) });
      }
    } else {
      this.recipeService.addRecipe(recipe).subscribe(
        (addedRecipe) => {
          this.recipePageService.reload();
          this.newRecipe = undefined;
        },
        (error) => {
          console.log(error);
        },
      );
    }
    for (let dto of recipe.addedIngredients ?? []) {
      this.ingredientService.addIngredient(dto).subscribe(
        (newIngredient) => {
          // Replace dummy ingredient with real value
          recipe.ingredients = recipe.ingredients.map((ingredient) => {
            if (ingredient.prototype.id === dto.prototypeId)
              return newIngredient;
            return ingredient;
          });
        },
        (error) => console.log(error),
      );
    }
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe.id).subscribe(() => {
      this.recipePageService.filter((r) => r.id !== recipe.id);
    });
  }
}
