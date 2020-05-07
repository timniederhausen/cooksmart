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
package org.planqk.cooksmart.api

import org.planqk.cooksmart.model.Recipe
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.server.SimpleRepresentationModelAssembler
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn
import org.springframework.stereotype.Component


@Component
class RecipeModelAssembler : SimpleRepresentationModelAssembler<Recipe> {
    override fun addLinks(resource: EntityModel<Recipe>) {
        val id = resource.getContent()!!.id
        resource.add(linkTo(methodOn(RecipeControllerV1::class.java).getRecipe(id)).withSelfRel())
        resource.add(linkTo(methodOn(RecipeControllerV1::class.java).updateRecipe(id, resource.content!!)).withRel("update"))
        resource.add(linkTo(methodOn(RecipeControllerV1::class.java).deleteRecipe(id)).withRel("delete"))
    }

    override fun addLinks(resources: CollectionModel<EntityModel<Recipe>>) {
    }
}
