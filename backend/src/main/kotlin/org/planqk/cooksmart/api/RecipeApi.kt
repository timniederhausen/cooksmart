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
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.planqk.cooksmart.model.Recipe
import org.springdoc.data.rest.converters.PageableAsQueryParam
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Tag(name = "recipe", description = "Recipes")
interface RecipeApi {
    @Operation(summary = "Delete an existing recipe")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Delete succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient data supplied")
    ])
    @DeleteMapping(value = ["/recipe/{id}"])
    fun deleteRecipe(@Parameter(description = "ID of the recipe to delete", required = true)
                     @PathVariable("id") id: Long): ResponseEntity<Unit>

    @Operation(summary = "Retrieve a recipe")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "The recipe data"),
        ApiResponse(responseCode = "400", description = "Invalid recipe ID",
                content = [Content()])
    ])
    @GetMapping(value = ["/recipe/{id}"], produces = ["application/json"])
    fun getRecipe(@Parameter(description = "ID of the recipe to retrieve", required = true)
                  @PathVariable("id") id: Long): ResponseEntity<Recipe>

    @Operation(summary = "Update an existing recipe")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Update succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid recipe data")
    ])
    @PutMapping(value = ["/recipe/{id}"], consumes = ["application/json"])
    fun updateRecipe(@Parameter(description = "ID of the recipe to update", required = true)
                     @PathVariable("id") id: Long,
                     @Parameter(description = "New recipe data", required = true)
                     @RequestBody recipe: @Valid Recipe): ResponseEntity<Unit>

    @Operation(summary = "Get a list of all recipes")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "List of all recipes"),
        ApiResponse(responseCode = "204", description = "There are no recipes",
                content = [Content()])
    ])
    @GetMapping(value = ["/recipes"], produces = ["application/json"])
    @PageableAsQueryParam
    fun listRecipes(@Parameter(description = "Filter for the recipe name", required = false)
                    @RequestParam("query")
                    query: String?,
                    @Parameter(hidden = true)
                    pageable: Pageable): ResponseEntity<Page<Recipe>>

    @Operation(summary = "Add a new ingredient prototype")
    @ApiResponses(value = [
        ApiResponse(responseCode = "201", description = "Add succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient data supplied")
    ])
    @PostMapping(value = ["/recipes"], produces = ["application/json"], consumes = ["application/json"])
    fun addRecipe(@RequestBody recipe: @Valid Recipe): ResponseEntity<Recipe>
}
