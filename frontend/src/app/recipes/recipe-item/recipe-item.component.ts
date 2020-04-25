import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  name: String = "";
  rating: Number  = 0;

  constructor(name: String, rating: Number) {
    this.name = name;
    this.rating = rating;
  }

  ngOnInit() {
  }

}
