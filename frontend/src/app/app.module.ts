import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HeaderDirective, ContentDirective,
  SmartListComponent,
} from './smart-list/smart-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeScreenComponent } from './recipes/recipe-screen/recipe-screen.component';
import { ApiModule } from './data';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SmartListComponent,
    HeaderDirective, ContentDirective,
    RecipeItemComponent,
    RecipeScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCollapseModule,
    BrowserAnimationsModule,
    NgbAccordionModule,
    NgbRatingModule,
    HttpClientModule,
    ApiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
