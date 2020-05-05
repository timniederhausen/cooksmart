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
import org.planqk.cooksmart.model.IngredientPrototype
import org.planqk.cooksmart.model.Recipe
import org.planqk.cooksmart.repository.IngredientPrototypeRepository
import org.planqk.cooksmart.repository.IngredientRepository
import org.planqk.cooksmart.repository.RecipeRepository
import org.planqk.cooksmart.util.SimplePage
import org.planqk.cooksmart.util.of
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.transaction.Transactional

@RestController
@Validated
@RequestMapping("\${api.base-path:}/recipe/v1")
class RecipeController(private val recipeRepository: RecipeRepository,
                       private val ingredientRepository: IngredientRepository,
                       private val ingredientPrototypeRepository: IngredientPrototypeRepository) : RecipeApi {
    override fun deleteRecipe(id: Long): ResponseEntity<Unit> {
        recipeRepository.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    override fun getRecipe(id: Long): ResponseEntity<Recipe> {
        val instance = recipeRepository.findByIdOrNull(id)
        if (instance == null)
            return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity(instance, HttpStatus.OK)
    }

    @Transactional
    override fun updateRecipe(id: Long, recipe: Recipe): ResponseEntity<Recipe> {
        val recipeEntity = recipeRepository.getOne(id)

        recipeEntity.name = recipe.name
        recipeEntity.description = recipe.description

        // Remove deleted ingredients
        recipeEntity.ingredients.removeIf { ingredient ->
            recipe.ingredients.find { i -> i.id == ingredient.id } == null
        }

        for (ingredient in recipe.ingredients) {
            val ingredientEntity = recipeEntity.ingredients.find { i -> i.id == ingredient.id }
            if (ingredientEntity == null) {
                recipeEntity.ingredients.add(ingredientRepository.save(Ingredient(
                        prototype = ingredientPrototypeRepository.getOne(ingredient.prototype.id),
                        recipe = recipeEntity,
                        quantity = ingredient.quantity,
                        unit = ingredient.unit
                )))
                continue
            }
            ingredientEntity.quantity = ingredient.quantity
            ingredientEntity.unit = ingredient.unit
            ingredientEntity.prototype = ingredientPrototypeRepository.getOne(ingredient.prototype.id)
        }

        return ResponseEntity(recipeRepository.save(recipeEntity), HttpStatus.OK)
    }

    override fun listRecipes(query: String?,
                             pageable: Pageable): ResponseEntity<SimplePage<Recipe>> {
        val recipes = if (query == null || query.isEmpty())
            recipeRepository.findAllDeep(pageable)
        else recipeRepository.findMatchingDeep(query, pageable)

        return ResponseEntity(of(recipes), HttpStatus.OK)
    }

    @Transactional
    override fun addRecipe(recipe: Recipe): ResponseEntity<Recipe> {
        recipe.id = 0
        recipe.ingredients = recipe.ingredients.map { ingredient -> ingredientRepository.save(ingredient) }.toMutableList()
        return ResponseEntity(recipeRepository.save(recipe), HttpStatus.CREATED)
    }
}
