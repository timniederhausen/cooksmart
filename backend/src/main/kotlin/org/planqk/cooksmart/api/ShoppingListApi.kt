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
import org.planqk.cooksmart.model.Ingredient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@Tag(name = "shopping-list", description = "Shopping list creation")
interface ShoppingListApi {
    @Operation(summary = "Compile a ingredient shopping list for a list of recipes")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Ingredient shopping list for given recipes"),
        ApiResponse(responseCode = "400", description = "Invalid recipe ID supplied",
                content = [Content()])
    ])
    @GetMapping(value = ["/compile_for_recipes"], produces = ["application/json"])
    fun compileForRecipes(@Parameter(description = "Recipes to shop for", required = true)
                          @RequestParam(value = "recipes", required = false)
                          recipes: List<Long>): ResponseEntity<List<Ingredient>>
}
