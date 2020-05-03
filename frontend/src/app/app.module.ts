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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
    NgbAccordionModule,
    NgbCollapseModule,
    NgbRatingModule, NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

import {
  HeaderDirective,
  ContentDirective,
  SmartListComponent,
} from './smart-list/smart-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeScreenComponent } from './recipes/recipe-screen/recipe-screen.component';
import { IngredientPrototypeItemComponent } from './ingredients/ingredient-item/ingredient-prototype-item.component';
import { IngredientScreenComponent } from './ingredients/ingredient-screen/ingredient-screen.component';
import { ShoppingListScreenComponent } from './shopping-list/shopping-list-screen/shopping-list-screen.component';
import { ApiModule } from './data';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SmartListComponent,
    HeaderDirective,
    ContentDirective,
    RecipeItemComponent,
    RecipeScreenComponent,
    IngredientPrototypeItemComponent,
    IngredientScreenComponent,
    ShoppingListScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbCollapseModule,
    BrowserAnimationsModule,
    NgbAccordionModule,
    NgbRatingModule,
    HttpClientModule,
    ApiModule,
    NgbTypeaheadModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
