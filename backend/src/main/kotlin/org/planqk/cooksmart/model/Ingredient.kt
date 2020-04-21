package org.planqk.cooksmart.model

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
data class Ingredient(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        @ManyToOne(cascade = [CascadeType.REMOVE])
        val prototype: IngredientPrototype,

        @get: NotBlank
        val quantity: Int = 0,
        val unit: String = "",

        @ManyToOne(cascade = [CascadeType.REMOVE])
        val recipe: Recipe
)
