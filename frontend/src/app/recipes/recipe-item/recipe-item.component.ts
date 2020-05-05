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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import {
  Ingredient,
  IngredientDto,
  IngredientProtoService,
  IngredientPrototype,
  Recipe,
} from '../../data';
import { environment } from '../../../environments/environment';

export interface StatefulRecipe extends Recipe {
  removedIngredients?: Ingredient[];
  addedIngredients?: IngredientDto[];
}

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: StatefulRecipe = undefined;

  @Input()
  editing: boolean = false;
  addingNewIngredients: boolean = false;

  @Output()
  cancelEdit = new EventEmitter();

  @Output()
  save = new EventEmitter<Recipe>();

  ingredientSearchTerm$ = new Subject<string>();

  env = environment;

  constructor(
    private readonly ingredientProtoService: IngredientProtoService,
  ) {}

  ngOnInit() {}

  startEditing() {
    this.editing = true;
  }

  cancelEditing() {
    this.cancelEdit.emit();
    this.editing = false;
  }

  onSubmit() {
    this.save.emit(this.recipe);
    this.editing = false;
  }

  changeRate() {
    this.save.emit(this.recipe);
  }

  deleteIngredient(ingredient: Ingredient) {
    if (!this.recipe.removedIngredients) this.recipe.removedIngredients = [];

    if (ingredient.id) this.recipe.removedIngredients.push(ingredient);
    else
      this.recipe.addedIngredients = this.recipe.addedIngredients.filter(
        (r) => r.prototypeId !== ingredient.prototype.id,
      );

    this.recipe.ingredients = this.recipe.ingredients.filter(
      (r) => r.prototype.id !== ingredient.prototype.id,
    );
  }

  isNewIngredient = (proto: IngredientPrototype) =>
    !this.recipe.ingredients.find((i) => i.prototype.id === proto.id);

  ingredientSearchFormatter = (result: IngredientPrototype) => result.name;

  ingredientSearch = (text$: Observable<string>) => {
    return merge(text$, this.ingredientSearchTerm$).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) =>
        this.ingredientProtoService
          .listIngredients(term)
          .pipe(map((p) => p.content.filter(this.isNewIngredient))),
      ),
    );
  };

  selectedIngredient($event: NgbTypeaheadSelectItemEvent) {
    this.addingNewIngredients = !this.addingNewIngredients;
    const newIngredientProto: IngredientPrototype = $event.item;

    // Flushed to DB on save
    if (!this.recipe.addedIngredients) this.recipe.addedIngredients = [];
    this.recipe.addedIngredients.push({
      prototypeId: newIngredientProto.id,
      recipeId: this.recipe.id,
      id: undefined,
      quantity: 0,
      unit: '',
    });

    // This is only for immediate viewing
    this.recipe.ingredients.push({
      prototype: newIngredientProto,
      id: undefined,
      quantity: 0,
      unit: '',
    });
  }
}
