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
  Ingredient, IngredientProtoService, IngredientPrototype, IngredientService, Pageable, PageIngredientPrototype,
  PageRecipe,
  Recipe
} from '../../data';
import { SmartListComponent } from '../../smart-list/smart-list.component';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ingredient-screen',
  templateUrl: './ingredient-screen.component.html',
  styleUrls: ['./ingredient-screen.component.scss']
})
export class IngredientScreenComponent implements OnInit, AfterViewInit {
  ingredients$: Observable<PageIngredientPrototype>;
  ingredientsList$: Observable<IngredientPrototype[]>;
  ingredients: PageIngredientPrototype;

  private searchTerms$ = new Subject<string>();
  private pageWanted$ = new Subject<Pageable>();

  newIngredient?: IngredientPrototype;

  constructor(private readonly ingredientProtoService: IngredientProtoService) {
  }

  ngOnInit() {
    this.ingredients$ = combineLatest([
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
          if (!pageable) return this.ingredientProtoService.listIngredients(term);
          return this.ingredientProtoService.listIngredients(
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
        tap((ingredients) => {
          if (ingredients.first) this.ingredients = ingredients;
          else
            this.ingredients = {
              ...ingredients,
              content: this.ingredients.content.concat(ingredients.content),
            };
        }),
      );
    this.ingredientsList$ = this.ingredients$.pipe(map((pr) => pr.content ?? []));
  }

  ngAfterViewInit() {
    this.pageWanted$.next({});
    this.searchTerms$.next('');
  }

  loadMore() {
    if (!this.ingredients.pageable || this.ingredients.last) return;
    this.pageWanted$.next({
      ...this.ingredients.pageable,
      page: this.ingredients.pageable.page + 1,
    });
  }

  search(term: string): void {
    this.searchTerms$.next(term);
  }

  addNew() {
    this.newIngredient = {
      description: '',
      image: '',
      name: '',
    };
  }

  saveIngredient(ingredientProto: IngredientPrototype) {
    console.log(ingredientProto);
    if (ingredientProto.id) {
      this.ingredientProtoService.updateIngredient1(ingredientProto.id, ingredientProto).subscribe(
        () => {
        },
        (error) => {
          console.log(error);
        },
      );
      return;
    }
    this.ingredientProtoService.addIngredient1(ingredientProto).subscribe(
      (addedRecipe) => {
        this.ingredients.content = [addedRecipe, ...this.ingredients.content];
        this.newIngredient = undefined;
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
