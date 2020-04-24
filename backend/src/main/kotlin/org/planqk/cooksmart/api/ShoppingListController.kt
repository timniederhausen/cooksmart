package org.planqk.cooksmart.api

import org.planqk.cooksmart.model.Ingredient
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Validated
@RequestMapping("\${api.base-path:}/shopping-list/v1")
class ShoppingListController : ShoppingListApi {
    override fun compileForRecipes(recipes: List<Long>): ResponseEntity<List<Ingredient>> {
        return ResponseEntity(HttpStatus.NOT_IMPLEMENTED)
    }
}
