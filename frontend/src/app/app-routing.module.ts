import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeScreenComponent } from './recipes/recipe-screen/recipe-screen.component';

const routes: Routes = [
  { path: '', component: RecipeScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
