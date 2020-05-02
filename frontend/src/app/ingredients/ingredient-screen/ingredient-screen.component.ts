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
import { Observable, of, Subject } from 'rxjs';
import { Ingredient, IngredientService, Recipe } from '../../data';
import { SmartListComponent } from '../../smart-list/smart-list.component';

@Component({
  selector: 'app-ingredient-screen',
  templateUrl: './ingredient-screen.component.html',
  styleUrls: ['./ingredient-screen.component.scss']
})
export class IngredientScreenComponent implements OnInit {
  ingredients$: Observable<Ingredient[]> = of(
    [{id:0,prototype:{image:"",id:0,description:"looooong placeholder", name:"pizza"},
      quantity:10,unit:"kg"}]);
  private searchTerms = new Subject<string>();

  ingredientList: SmartListComponent<Recipe>;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit() {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
