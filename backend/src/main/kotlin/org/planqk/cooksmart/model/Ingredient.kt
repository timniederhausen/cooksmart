// Copyright 2020 Felix Burk, Tim Niederhausen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package org.planqk.cooksmart.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Ingredient(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        @JsonProperty
        val id: Long = 0,

        @ManyToOne(fetch = FetchType.LAZY)
        val prototype: IngredientPrototype,

        @JsonProperty
        @get: NotNull
        val quantity: Int = 0,

        @JsonProperty
        val unit: String = "",

        @ManyToOne(fetch = FetchType.LAZY)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        val recipe: Recipe? = null
)

data class IngredientDto(
        val id: Long = 0,
        val prototypeId: Long = 0,
        val quantity: Int = 0,
        val unit: String = "",
        val recipeId: Long = 0
)
