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
import { Recipe, RecipeService } from '../../data';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {SmartListComponent} from "../../smart-list/smart-list.component";

@Component({
  selector: 'app-recipe-screen',
  templateUrl: './recipe-screen.component.html',
  styleUrls: ['./recipe-screen.component.scss'],
})
export class RecipeScreenComponent implements OnInit {
  recipes$: Observable<Recipe[]> = of([{name:'blah', rating: 33}, {name: 'bluh', rating: 33333}, {name: 'blabb', rating: 33333}]);
  private searchTerms = new Subject<string>();

  recipeList: SmartListComponent<Recipe>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    /*this.recipes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.recipeService.listRecipes(term)),
    );*/
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
