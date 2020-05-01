package org.planqk.cooksmart.api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.planqk.cooksmart.model.Ingredient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Tag(name = "ingredient", description = "Recipe-bound ingredients")
interface IngredientApi {
    @Operation(summary = "Delete an ingredient")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Delete succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient ID")
    ])
    @DeleteMapping(value = ["/{id}"])
    fun deleteIngredient(@Parameter(description = "Ingredient to delete", required = true)
                         @PathVariable("id") id: Long): ResponseEntity<Unit>

    @Operation(summary = "Update an ingredient")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Update succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient data")
    ])
    @PutMapping(value = ["/{id}"], consumes = ["application/json"])
    fun updateIngredient(@Parameter(description = "ID of the ingredient to update", required = true)
                         @PathVariable("id") id: Long,
                         @Parameter(description = "New ingredient data", required = true)
                         @RequestBody ingredient: @Valid Ingredient): ResponseEntity<Unit>

    @Operation(summary = "Add a new ingredient prototype")
    @ApiResponses(value = [
        ApiResponse(responseCode = "201", description = "Add succeeded"),
        ApiResponse(responseCode = "400", description = "Invalid ingredient data supplied",
                content = [Content()])
    ])
    @PostMapping(value = ["/"], consumes = ["application/json"])
    fun addIngredient(@Parameter(description = "Ingredient prototype to add", required = true)
                      @RequestBody ingredient: @Valid Ingredient): ResponseEntity<Ingredient>
}
