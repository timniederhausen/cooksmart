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

import org.planqk.cooksmart.model.Recipe
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

@RestController
@Validated
@RequestMapping("\${api.base-path:}/recipe/v1")
class RecipeController(private val recipes: RecipeRepository) : RecipeApi {
    override fun deleteRecipe(id: Long): ResponseEntity<Unit> {
        recipes.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    override fun getRecipe(id: Long): ResponseEntity<Recipe> {
        val instance = recipes.findByIdOrNull(id)
        if (instance == null)
            return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity(instance, HttpStatus.OK)
    }

    override fun updateRecipe(id: Long, recipe: Recipe): ResponseEntity<Unit> {
        recipes.save(recipe.copy(id = id))
        return ResponseEntity(HttpStatus.OK)
    }

    override fun listRecipes(query: String?,
                             pageable: Pageable): ResponseEntity<SimplePage<Recipe>> {
        if (query == null || query.isEmpty())
            return ResponseEntity(of(recipes.findAll(pageable)), HttpStatus.OK)

        return ResponseEntity(of(recipes.findDistinctRecipesByNameContainingOrDescriptionContaining(
                query, query, pageable)), HttpStatus.OK)
    }

    override fun addRecipe(recipe: Recipe): ResponseEntity<Recipe> {
        return ResponseEntity(recipes.save(recipe.copy(id = 0)), HttpStatus.CREATED)
    }
}
