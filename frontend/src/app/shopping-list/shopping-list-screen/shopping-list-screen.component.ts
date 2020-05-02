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
import { Recipe } from '../../data';
import { Ingredient } from '../../data';

@Component({
  selector: 'app-shopping-list-screen',
  templateUrl: './shopping-list-screen.component.html',
  styleUrls: ['./shopping-list-screen.component.scss']
})
export class ShoppingListScreenComponent implements OnInit {

  private recipeList: Recipe[] = [{
    name: 'blah', rating: 33, image: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg", id:0,
    ingredients: [{
      unit: "kg", quantity: 3, id: 312,
      prototype: {
        name: "Fries", description: "LOOOONG PLACEHOLDER", id: 0,
        image: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg"
      }
    },
      {
        unit: "kg", quantity: 3, id: 1,
        prototype: {
          name: "Fries", description: "LOOOONG PLACEHOLDER", id: 0,
          image: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg"
        }
      }]
  },
    {
      name: 'bluh', rating: 33333, image: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg", id:5,
      ingredients: [{
        unit: "kg", quantity: 3, id: 2,
        prototype: {
          name: "Fries", description: "LOOOONG PLACEHOLDER", id: 0,
          image: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg"
        }
      }]
    },
    {
      name: 'blabb', rating: 33333, image: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg", id:10,
      ingredients: [{
        unit: "kg", quantity: 3, id: 0,
        prototype: {
          name: "Fries", description: "LOOOONG PLACEHOLDER", id: 0,
          image: "https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg"
        }
      }]
    }
  ];
  private ingredientList: Ingredient[] = [];

  ngOnInit(): void {
    for(let recipe of this.recipeList) {
      this.addRecipe(recipe);
    }
  }

  addRecipe(recipe: Recipe) {
    for (let ingredient of recipe.ingredients) {
      this.ingredientList.push(ingredient);
    }

  }

  removeRecipe(id: number) {
    this.recipeList = this.recipeList.filter(ing => ing.id !== id);
  }

  search(value: string) {
    
  }
}
