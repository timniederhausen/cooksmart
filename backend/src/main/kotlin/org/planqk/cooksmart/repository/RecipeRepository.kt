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
package org.planqk.cooksmart.repository

import org.planqk.cooksmart.model.Recipe
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface RecipeRepository : JpaRepository<Recipe, Long> {
    @EntityGraph("RecipeRecursive")
    @Query("SELECT r FROM Recipe r")
    fun findAllDeep(pageable: Pageable): Page<Recipe>

    @EntityGraph("RecipeRecursive")
    @Query("SELECT r FROM Recipe r WHERE lower(r.name) LIKE lower(concat('%', :name,'%'))")
    fun findMatchingDeep(name: String?, pageable: Pageable): Page<Recipe>
}
