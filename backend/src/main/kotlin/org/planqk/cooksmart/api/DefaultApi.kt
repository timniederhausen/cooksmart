package org.planqk.cooksmart.api

import org.planqk.cooksmart.model.Ingredient
import org.planqk.cooksmart.model.IngredientPrototype
import org.planqk.cooksmart.model.Recipe
import org.planqk.cooksmart.repository.IngredientPrototypeRepository
import org.planqk.cooksmart.repository.IngredientRepository
import org.planqk.cooksmart.repository.RecipeRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@Validated
@RequestMapping("\${api.base-path:}")
class DefaultApiController(private val recipes: RecipeRepository,
                           private val ingredients: IngredientRepository,
                           private val ingredientPrototypes: IngredientPrototypeRepository) {

    @RequestMapping(
            value = ["/compile_shopping_list"],
            produces = ["application/json"],
            method = [RequestMethod.GET])
    fun compileShoppingListGet(@RequestParam(value = "recipes", required = false) recipes: List<Long>?
    ): ResponseEntity<List<Ingredient>> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/ingredient/{id}"],
            method = [RequestMethod.DELETE])
    fun ingredientIdDelete(@PathVariable("id") id: Long
    ): ResponseEntity<Unit> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/ingredient/{id}"],
            produces = ["application/json"],
            method = [RequestMethod.GET])
    fun ingredientIdGet(@PathVariable("id") id: Long
    ): ResponseEntity<IngredientPrototype> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/ingredient/{id}"],
            consumes = ["application/json"],
            method = [RequestMethod.PUT])
    fun ingredientIdPut(@PathVariable("id") id: Long
                        , @Valid @RequestBody ingredientPrototype: IngredientPrototype?
    ): ResponseEntity<Unit> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/ingredients"],
            produces = ["application/json"],
            method = [RequestMethod.GET])
    fun ingredientsGet(): ResponseEntity<List<IngredientPrototype>> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/ingredients"],
            consumes = ["application/json"],
            method = [RequestMethod.POST])
    fun ingredientsPost(@Valid @RequestBody ingredientPrototype: IngredientPrototype?
    ): ResponseEntity<Unit> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/recipe/{id}"],
            method = [RequestMethod.DELETE])
    fun recipeIdDelete(@PathVariable("id") id: Long
    ): ResponseEntity<Unit> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/recipe/{id}"],
            produces = ["application/json"],
            method = [RequestMethod.GET])
    fun recipeIdGet(@PathVariable("id") id: Long
    ): ResponseEntity<Recipe> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/recipe/{id}"],
            consumes = ["application/json"],
            method = [RequestMethod.PUT])
    fun recipeIdPut(@PathVariable("id") id: Long
                    , @Valid @RequestBody recipe: Recipe?
    ): ResponseEntity<Unit> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/recipes"],
            produces = ["application/json"],
            method = [RequestMethod.GET])
    fun recipesGet(): ResponseEntity<List<Recipe>> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }


    @RequestMapping(
            value = ["/recipes"],
            produces = ["application/json"],
            consumes = ["application/json"],
            method = [RequestMethod.POST])
    fun recipesPost(@Valid @RequestBody recipe: Recipe?
    ): ResponseEntity<Recipe> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }
}
