package org.planqk.cooksmart.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Entity
data class Recipe(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        @get: NotBlank
        val name: String = "",
        val description: String = "",

        val image: String = "",

        @get: NotNull
        val rating: Int = -1
)
