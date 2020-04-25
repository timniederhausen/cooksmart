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
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@Validated
@RequestMapping("\${api.base-path:}/ingredient/v1")
class IngredientController(private val ingredientRepo: IngredientRepository) : IngredientApi {
    override fun deleteIngredient(id: Long): ResponseEntity<Unit> {
        ingredientRepo.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    override fun updateIngredient(id: Long, ingredient: Ingredient): ResponseEntity<Unit> {
        ingredientRepo.save(ingredient.copy(id = id))
        return ResponseEntity(HttpStatus.OK)
    }

    override fun addIngredient(ingredient: Ingredient): ResponseEntity<Ingredient> {
        return ResponseEntity(ingredientRepo.save(ingredient.copy(id = 0)), HttpStatus.CREATED)
    }
}
