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

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.ArraySchema
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.planqk.cooksmart.model.IngredientPrototype
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Tag(name = "ingredient-proto", description = "Ingredient prototypes")
interface IngredientPrototypeApi {
    @Operation(summary = "Delete an ingredient")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Delete succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient ID")
    ])
    @DeleteMapping(value = ["/{id}"])
    fun deleteIngredient(@Parameter(description = "Ingredient to delete", required = true)
                         @PathVariable("id") id: Long): ResponseEntity<Unit>

    @Operation(summary = "Retrieve an ingredient prototype")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "The ingredient data",
                content = [Content(schema = Schema(implementation = IngredientPrototype::class))]),
        ApiResponse(responseCode = "400", description = "Invalid ingredient ID")
    ])
    @GetMapping(value = ["/{id}"], produces = ["application/json"])
    fun getIngredient(@Parameter(description = "ID of the ingredient to retrieve", required = true)
                      @PathVariable("id") id: Long): ResponseEntity<IngredientPrototype>

    @Operation(summary = "Update an ingredient prototype")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Update succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient data")
    ])
    @PutMapping(value = ["/{id}"], consumes = ["application/json"])
    fun updateIngredient(@Parameter(description = "ID of the ingredient to update", required = true)
                         @PathVariable("id") id: Long,
                         @Parameter(description = "New ingredient data", required = true)
                         @RequestBody ingredientPrototype: @Valid IngredientPrototype): ResponseEntity<Unit>

    @Operation(summary = "Get a list of all ingredient prototypes")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "List of all ingredient prototypes",
                content = [Content(array = ArraySchema(schema = Schema(implementation = IngredientPrototype::class)))]),
        ApiResponse(responseCode = "204", description = "There are no ingredient prototypes")
    ])
    @GetMapping(value = ["/"], produces = ["application/json"])
    fun listIngredients(): ResponseEntity<List<IngredientPrototype>>

    @Operation(summary = "Add a new ingredient prototype")
    @ApiResponses(value = [
        ApiResponse(responseCode = "201", description = "Add succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient data supplied")
    ])
    @PostMapping(value = ["/"], consumes = ["application/json"])
    fun addIngredient(@Parameter(description = "Ingredient prototype to add", required = true)
                      @RequestBody ingredientPrototype: @Valid IngredientPrototype): ResponseEntity<IngredientPrototype>
}
