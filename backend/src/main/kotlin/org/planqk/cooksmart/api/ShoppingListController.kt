package org.planqk.cooksmart.api

import org.planqk.cooksmart.model.Ingredient
import org.planqk.cooksmart.repository.IngredientRepository
import org.planqk.cooksmart.repository.RecipeRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Validated
@RequestMapping("\${api.base-path:}/shopping-list/v1")
class ShoppingListController(private val recipeRepo: RecipeRepository) : ShoppingListApi {
    override fun compileForRecipes(recipes: List<Long>): ResponseEntity<List<Ingredient>> {
        val recipeObjects = recipeRepo.findAllById(recipes)
        // Ensure we've found all recipes
        if (recipeObjects.size != recipes.size)
            return ResponseEntity(HttpStatus.BAD_REQUEST)

        val ingredientsMap = HashMap<Pair<Long, String>, Ingredient>()
        for (r in recipeObjects) {
            for (first in r.ingredients) {
                ingredientsMap.compute(Pair(first.prototype.id, first.unit)) { _, second ->
                    if (second == null) first else first.copy(quantity = first.quantity + second.quantity)
                }
            }
        }

        return ResponseEntity(ingredientsMap.values.toList(), HttpStatus.OK)
    }
}
