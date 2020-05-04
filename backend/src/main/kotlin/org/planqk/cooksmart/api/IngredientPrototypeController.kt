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

import org.planqk.cooksmart.model.IngredientPrototype
import org.planqk.cooksmart.repository.IngredientPrototypeRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Validated
@RequestMapping("\${api.base-path:}/ingredient-proto/v1")
class IngredientPrototypeController(private val ingredientPrototypes: IngredientPrototypeRepository) : IngredientPrototypeApi {
    override fun deleteIngredient(id: Long): ResponseEntity<Unit> {
        ingredientPrototypes.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    override fun getIngredient(id: Long): ResponseEntity<IngredientPrototype> {
        val instance = ingredientPrototypes.findByIdOrNull(id)
        if (instance == null)
            return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity(instance, HttpStatus.OK)
    }

    override fun updateIngredient(id: Long, ingredientPrototype: IngredientPrototype): ResponseEntity<Unit> {
        ingredientPrototypes.save(ingredientPrototype.copy(id = id))
        return ResponseEntity(HttpStatus.OK)
    }

    override fun listIngredients(query: String?,
                                 pageable: Pageable): ResponseEntity<Page<IngredientPrototype>> {
        if (query == null || query.isEmpty())
            return ResponseEntity(ingredientPrototypes.findAll(pageable), HttpStatus.OK)
        return ResponseEntity(ingredientPrototypes.findDistinctIngredientProrotypeByNameContaining(
                query, pageable), HttpStatus.OK)
    }

    override fun addIngredient(ingredientPrototype: IngredientPrototype): ResponseEntity<IngredientPrototype> {
        return ResponseEntity(ingredientPrototypes.save(ingredientPrototype.copy(id = 0)),
                HttpStatus.CREATED)
    }
}
