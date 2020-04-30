package org.planqk.cooksmart.api

import org.planqk.cooksmart.model.Recipe
import org.planqk.cooksmart.repository.RecipeRepository
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

    override fun listRecipes(query: String?,
                             pageable: Pageable): ResponseEntity<Page<Recipe>> {
        if (query == null || query.isEmpty())
            return ResponseEntity(recipes.findAll(pageable), HttpStatus.OK)

        return ResponseEntity(recipes.findDistinctRecipesByNameContainingOrDescriptionContaining(
                query, query, pageable), HttpStatus.OK)
    }

    override fun addRecipe(recipe: Recipe): ResponseEntity<Recipe> {
        return ResponseEntity(recipes.save(recipe.copy(id = 0)), HttpStatus.CREATED)
    }
}
