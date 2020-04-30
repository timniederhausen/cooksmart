import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../data';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: Recipe = { description: 'placeholder', id: 0, image: '', ingredients: undefined, rating: 2, name:"placeholder"};

  ngOnInit() {
  }

}
