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
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient, IngredientPrototype, Recipe } from '../../data';
import { merge, Observable, pipe, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: Recipe = undefined;

  ingredientsPlaceholder: IngredientPrototype[] = [
    { name: "testi", id: 21 },
    { name: "testi2", id: 22 },
    { name: "testi3", id: 321 },
    { name: "testi3", id: 321312 }];

  @Input()
  editing: boolean = false;
  addingNewIngredients: boolean = false;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  @Output()
  cancelEdit = new EventEmitter();

  @Output()
  save = new EventEmitter<Recipe>();

  ngOnInit() {
  }

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

  deleteIngredient(id: number) {
    //TODO
  }

  getRemainingIngredients(): IngredientPrototype[] {
    let result: IngredientPrototype[] = this.ingredientsPlaceholder;
    for (let ingredient of this.recipe.ingredients) {
      // TODO fix this dumb loop
      result = result.filter(a => a.id !== ingredient.prototype.id);
    }
    return result;
  }

  ingredientSearchFormatter = (result: IngredientPrototype) => result.name;
  ingredientSearch = (text$: Observable<string>) => {
    const remainingIngredients = this.getRemainingIngredients();
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? remainingIngredients
        : remainingIngredients.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      ));
  };

  selectedIngredient($event: NgbTypeaheadSelectItemEvent) {
    this.addingNewIngredients = !this.addingNewIngredients;
    const newIngredientProto: IngredientPrototype = $event.item;
    const newIngredient: Ingredient = { prototype: newIngredientProto, id: 0, quantity: 0 };
    this.recipe.ingredients.push(newIngredient)
  }
}
