package org.planqk.cooksmart.api

import org.planqk.cooksmart.model.Ingredient
import org.planqk.cooksmart.model.IngredientPrototype
import org.planqk.cooksmart.model.Recipe
import org.junit.jupiter.api.Test

import org.springframework.http.ResponseEntity

class DefaultApiTest {

    
    private val api: DefaultApiController = DefaultApiController()

    
    /**
    * compile a shopping list for
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun compileShoppingListGetTest() {
        val recipes:kotlin.collections.List<kotlin.Long>? = null
        val response: ResponseEntity<List<Ingredient>> = api.compileShoppingListGet(recipes!!)

        // TODO: test validations
    }
    
    /**
    * delete an ingredient
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun ingredientIdDeleteTest() {
        val id:kotlin.Long? = null
        val response: ResponseEntity<Unit> = api.ingredientIdDelete(id!!)

        // TODO: test validations
    }
    
    /**
    * get the ingredient data
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun ingredientIdGetTest() {
        val id:kotlin.Long? = null
        val response: ResponseEntity<IngredientPrototype> = api.ingredientIdGet(id!!)

        // TODO: test validations
    }
    
    /**
    * update an existing ingredient
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun ingredientIdPutTest() {
        val id:kotlin.Long? = null
        val ingredientPrototype:IngredientPrototype? = null
        val response: ResponseEntity<Unit> = api.ingredientIdPut(id!!, ingredientPrototype!!)

        // TODO: test validations
    }
    
    /**
    * get a list of the user&#39;s ingredients
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun ingredientsGetTest() {
        val response: ResponseEntity<List<IngredientPrototype>> = api.ingredientsGet()

        // TODO: test validations
    }
    
    /**
    * create a new ingredient
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun ingredientsPostTest() {
        val ingredientPrototype:IngredientPrototype? = null
        val response: ResponseEntity<Unit> = api.ingredientsPost(ingredientPrototype!!)

        // TODO: test validations
    }
    
    /**
    * delete a recipe
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun recipeIdDeleteTest() {
        val id:kotlin.Long? = null
        val response: ResponseEntity<Unit> = api.recipeIdDelete(id!!)

        // TODO: test validations
    }
    
    /**
    * get the recipe data
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun recipeIdGetTest() {
        val id:kotlin.Long? = null
        val response: ResponseEntity<Recipe> = api.recipeIdGet(id!!)

        // TODO: test validations
    }
    
    /**
    * update an existing recipe
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun recipeIdPutTest() {
        val id:kotlin.Long? = null
        val recipe:Recipe? = null
        val response: ResponseEntity<Unit> = api.recipeIdPut(id!!, recipe!!)

        // TODO: test validations
    }
    
    /**
    * get a list of the user&#39;s recipes
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun recipesGetTest() {
        val response: ResponseEntity<List<Recipe>> = api.recipesGet()

        // TODO: test validations
    }
    
    /**
    * create a new recipe
    *
    * 
    *
    * @throws ApiException
    *          if the Api call fails
    */
    @Test
    fun recipesPostTest() {
        val recipe:Recipe? = null
        val response: ResponseEntity<Recipe> = api.recipesPost(recipe!!)

        // TODO: test validations
    }
    
}
