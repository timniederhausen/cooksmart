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
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

import { IngredientProtoService, IngredientPrototype } from '../../data';
import { PageableEntityService } from '../../core/pageable-entity.service';

@Component({
  selector: 'app-ingredient-screen',
  templateUrl: './ingredient-screen.component.html',
  styleUrls: ['./ingredient-screen.component.scss'],
})
export class IngredientScreenComponent implements OnInit, AfterViewInit {
  ingredientPageService: PageableEntityService<IngredientPrototype, string>;
  ingredientsList$: Observable<IngredientPrototype[]>;

  private searchTerms$ = new Subject<string>();
  private sort$ = new Subject<string>();


  newIngredient?: IngredientPrototype;

  constructor(private ingredientProtoService: IngredientProtoService) {
    this.ingredientPageService = new PageableEntityService<
      IngredientPrototype,
      string
    >((state) => {
      console.log(state);
      return this.ingredientProtoService.listIngredients(
        state.query ? state.query : undefined,
        state.pageable?.page,
        state.pageable?.size,
        state.pageable?.sort,
      );
    });
  }

  ngOnInit() {
    this.searchTerms$
      .pipe(
        // ignore new term if same as previous term
        distinctUntilChanged(),
      )
      .subscribe((term) => {
        console.log('SEARCH ' + term);
        this.ingredientPageService.state.query = term;
        this.ingredientPageService.reload();
      });
    this.ingredientsList$ = this.ingredientPageService.entities$.pipe(
      map((pr) => pr.content ?? []),
    );
    this.sort$
      .pipe().subscribe( (sort) => {
        console.log('SORT' + sort);
        this.ingredientPageService.state.pageable.sort = [sort];
        this.ingredientPageService.reload();
    });
  }

  ngAfterViewInit() {
    this.searchTerms$.next('');
  }

  loadMore() {
    this.ingredientPageService.loadMore();
  }

  search(term: string): void {
    this.searchTerms$.next(term);
  }

  addNew() {
    this.newIngredient = {
      id: undefined,
      description: '',
      image: '',
      name: '',
    };
  }

  saveIngredient(ingredientProto: IngredientPrototype) {
    console.log(ingredientProto);
    if (ingredientProto.id) {
      this.ingredientProtoService
        .updateIngredient1(ingredientProto.id, ingredientProto)
        .subscribe(
          () => {},
          (error) => {
            console.log(error);
          },
        );
      return;
    }
    this.ingredientProtoService.addIngredient1(ingredientProto).subscribe(
      (addedRecipe) => {
        this.ingredientPageService.reload();
        this.newIngredient = undefined;
      },
      (error) => {
        console.log(error);
      },
    );
  }

  changeOrder(sort: string) {
    this.sort$.next(sort);
  }
}
