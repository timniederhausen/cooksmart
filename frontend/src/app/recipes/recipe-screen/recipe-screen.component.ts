import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../data';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-screen',
  templateUrl: './recipe-screen.component.html',
  styleUrls: ['./recipe-screen.component.scss'],
})
export class RecipeScreenComponent implements OnInit {
  recipes$: Observable<Recipe[]> = of([]);
  private searchTerms = new Subject<string>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.recipeService.listRecipes(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
