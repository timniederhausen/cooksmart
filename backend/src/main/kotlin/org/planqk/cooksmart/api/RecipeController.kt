package org.planqk.cooksmart.api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.ArraySchema
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.planqk.cooksmart.model.Recipe
import org.planqk.cooksmart.repository.RecipeRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

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
        return ResponseEntity(HttpStatus.CREATED)
    }

    override fun listRecipes(): ResponseEntity<List<Recipe>> {
        return ResponseEntity(recipes.findAll(), HttpStatus.OK)
    }

    override fun addRecipe(recipe: Recipe): ResponseEntity<Recipe> {
        return ResponseEntity(recipes.save(recipe.copy(id = 0)), HttpStatus.CREATED)
    }
}
