import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../data';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: Recipe = { description: '', id: 0, image: '', ingredients: undefined, rating: 0, name:"placeholder"};

  ngOnInit() {
  }

}
