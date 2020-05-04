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
