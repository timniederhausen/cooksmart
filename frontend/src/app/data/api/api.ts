export * from './ingredient.service';
import { IngredientService } from './ingredient.service';
export * from './ingredient-proto.service';
import { IngredientProtoService } from './ingredient-proto.service';
export * from './recipe.service';
import { RecipeService } from './recipe.service';
export * from './shopping-list.service';
import { ShoppingListService } from './shopping-list.service';
export const APIS = [IngredientService, IngredientProtoService, RecipeService, ShoppingListService];
