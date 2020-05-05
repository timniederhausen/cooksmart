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
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Entity
@NamedEntityGraphs(
        NamedEntityGraph(name = "RecipeRecursive",
                attributeNodes = [NamedAttributeNode(value = "ingredients", subgraph = "IngredientWithProto")],
                subgraphs = [
                    NamedSubgraph(
                            name = "IngredientWithProto",
                            attributeNodes = [NamedAttributeNode("prototype")]
                    )
                ]
        )
)
data class Recipe(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,

        @get: NotBlank
        var name: String = "",

        var description: String = "",
        var image: String = "",

        @get: NotNull
        var rating: Int = -1,

        @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, cascade = [CascadeType.ALL], mappedBy = "recipe")
        var ingredients: MutableList<Ingredient> = mutableListOf()
)
