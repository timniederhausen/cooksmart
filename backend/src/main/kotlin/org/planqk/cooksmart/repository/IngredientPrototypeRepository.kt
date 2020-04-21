package org.planqk.cooksmart.repository

import org.planqk.cooksmart.model.IngredientPrototype
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IngredientPrototypeRepository : JpaRepository<IngredientPrototype, Long>
