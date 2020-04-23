package org.planqk.cooksmart.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Entity
data class Recipe(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        @JsonProperty
        val id: Long = 0,

        @JsonProperty
        @get: NotBlank
        val name: String = "",

        @JsonProperty
        val description: String = "",

        @JsonProperty
        val image: String = "",

        @JsonProperty
        @get: NotNull
        val rating: Int = -1
)
