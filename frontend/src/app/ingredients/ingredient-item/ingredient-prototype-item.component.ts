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
import { IngredientPrototype, Recipe } from '../../data';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-prototype-item.component.html',
  styleUrls: ['./ingredient-prototype-item.component.scss']
})
export class IngredientPrototypeItemComponent implements OnInit {
  @Input()
  ingredient: IngredientPrototype = undefined;

  @Input()
  editing: boolean = false;

  @Output()
  cancelEdit = new EventEmitter();

  @Output()
  save = new EventEmitter<IngredientPrototype>();

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
    this.save.emit(this.ingredient);
    this.editing = false;
  }

}
