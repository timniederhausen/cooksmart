package org.planqk.cooksmart.api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.ArraySchema
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
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
        ApiResponse(responseCode = "200", description = "Ingredient shopping list for given recipes",
                content = [Content(array = ArraySchema(schema = Schema(implementation = Ingredient::class)))]),
        ApiResponse(responseCode = "400", description = "Invalid recipe ID supplied")
    ])
    @GetMapping(value = ["/for_recipes"], produces = ["application/json"])
    fun compileForRecipes(@Parameter(description = "Recipes to shop for", required = true)
                          @RequestParam(value = "recipes", required = false)
                          recipes: List<Long>): ResponseEntity<List<Ingredient>>
}
