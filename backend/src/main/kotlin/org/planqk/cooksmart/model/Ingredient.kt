package org.planqk.cooksmart.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
data class Ingredient(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        @JsonProperty
        val id: Long = 0,

        @ManyToOne(cascade = [CascadeType.REMOVE])
        @JsonProperty
        val prototype: IngredientPrototype,

        @JsonProperty
        @get: NotBlank
        val quantity: Int = 0,

        @JsonProperty
        val unit: String = "",

        @ManyToOne(cascade = [CascadeType.REMOVE])
        @JsonProperty
        val recipe: Recipe
)
