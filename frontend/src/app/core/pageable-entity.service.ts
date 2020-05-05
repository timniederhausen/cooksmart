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
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { SimplePageable } from '../data';

// This matches the definition of Spring's Page interface.
interface Page<T> {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: Array<T>;
  first?: boolean;
  last?: boolean;
  pageable?: SimplePageable;
  empty?: boolean;
}

interface State<Q, T> {
  query?: Q;
  pageable?: SimplePageable;
}

export class PageableEntityService<T, Q> {
  private _all: Page<T> = {};
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _entities$ = new Subject<Page<T>>();

  state: State<Q, T> = {};

  constructor(
    search: (state: State<Q, T>) => Observable<Page<T>>,
    debounceTimeVal = 200,
  ) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(debounceTimeVal),
        switchMap(() => search(this.state)),
        map((result) => this._mergeResult(result)),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => this._entities$.next(result));
  }

  get entities$() {
    return this._entities$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  reload() {
    this._search$.next();
  }

  loadMore() {
    if (!this.state.pageable || this._all.last) return;
    this.state.pageable.page += 1;
    this.reload();
  }

  filter(callbackfn: (value: T, index: number, array: T[]) => unknown) {
    this._all.content = this._all.content.filter(callbackfn);
    this._entities$.next(this._all);
  }

  private _mergeResult(result: Page<T>) {
    if (
      // Initial page always clears the entire result set
      result.first ||
      // This handles only partially initialized objects (i.e. before the first request)
      // combined with a page > 1 query.
      !this._all.pageable ||
      // We can only merge consecutive page requests
      result.pageable.page !== this._all.pageable.page + 1
    ) {
      this._all = result;
    } else {
      this._all = {
        ...result,
        size: this._all.size + result.size,
        content: [...this._all.content, ...result.content],
      };
    }
    this.state.pageable = this._all.pageable;
    return this._all;
  }
}
