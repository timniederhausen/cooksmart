package org.planqk.cooksmart.api

import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.doReturn
import org.planqk.cooksmart.model.Ingredient
import org.planqk.cooksmart.model.IngredientPrototype
import org.planqk.cooksmart.model.Recipe
import org.planqk.cooksmart.repository.RecipeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@WebMvcTest(controllers = [ShoppingListController::class])
internal class ShoppingListControllerTest {
    @Autowired
    private val mockMvc: MockMvc? = null

    @MockBean
    private val recipeRepo: RecipeRepository? = null

    @Test
    fun compileForRecipes() {
        doReturn(listOf(Recipe(id = 1, ingredients = listOf(
                Ingredient(prototype = IngredientPrototype(id = 1), quantity = 2, unit = "kg"),
                Ingredient(prototype = IngredientPrototype(id = 2), quantity = 4, unit = "count")
        )), Recipe(id = 2, ingredients = listOf(
                Ingredient(prototype = IngredientPrototype(id = 1), quantity = 1, unit = "count"),
                Ingredient(prototype = IngredientPrototype(id = 2), quantity = 5, unit = "count"),
                Ingredient(prototype = IngredientPrototype(id = 3), quantity = 1, unit = "count")
        )), Recipe(id = 3, ingredients = listOf(
                Ingredient(prototype = IngredientPrototype(id = 4), quantity = 8, unit = "kg"),
                Ingredient(prototype = IngredientPrototype(id = 5), quantity = 7, unit = "count")
        )))).`when`(recipeRepo)!!.findAllById(any())
        mockMvc!!.perform(get("/api/shopping-list/v1/compile_for_recipes").param("recipes", "1", "2", "3"))
                .andDo(print())
                .andExpect(status().isOk())
    }
}
