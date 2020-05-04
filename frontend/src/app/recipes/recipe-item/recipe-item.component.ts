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
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  Ingredient,
  IngredientProtoService,
  IngredientPrototype,
  IngredientService,
  Recipe,
  RecipeService,
} from '../../data';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import {
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';

export interface StatefulRecipe extends Recipe {
  removedIngredients?: Ingredient[];
}

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: Recipe = undefined;

  @Input()
  editing: boolean = false;
  addingNewIngredients: boolean = false;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  @Output()
  cancelEdit = new EventEmitter();

  @Output()
  save = new EventEmitter<Recipe>();

  refresh$ = new BehaviorSubject<void>(undefined);

  constructor(
    private readonly ingredientProtoService: IngredientProtoService,
    private readonly ingredientService: IngredientService,
    private readonly recipeService: RecipeService,
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

  deleteIngredient(id: number) {
    this.recipe.ingredients = this.recipe.ingredients.filter(
      (r) => r.id !== id,
    );
    this.recipeService.updateRecipe(this.recipe.id, this.recipe).subscribe(
      (error) => {
        console.log(error);
      },
    );
  }

  isNewIngredient = (proto: IngredientPrototype) =>
    !this.recipe.ingredients.find((i) => i.prototype.id === proto.id);

  ingredientSearchFormatter = (result: IngredientPrototype) => result.name;

  ingredientSearch = (text$: Observable<string>) => {
    return combineLatest([text$, this.refresh$]).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(([term]) =>
        this.ingredientProtoService
          .listIngredients(term)
          .pipe(map((p) => p.content.filter(this.isNewIngredient))),
      ),
    );
  };

  selectedIngredient($event: NgbTypeaheadSelectItemEvent) {
    this.addingNewIngredients = !this.addingNewIngredients;
    const newIngredientProto: IngredientPrototype = $event.item;
    const newIngredient = {
      prototype: newIngredientProto,
      id: 0,
      quantity: 0,
      unit: '',
    };
    this.ingredientService.addIngredient(newIngredient).subscribe(
      (addedIngredient) => {
        this.recipe.ingredients.push(addedIngredient);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }
}
