package org.planqk.cooksmart.repository

import org.planqk.cooksmart.model.Ingredient
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IngredientRepository : JpaRepository<Ingredient, Long>
