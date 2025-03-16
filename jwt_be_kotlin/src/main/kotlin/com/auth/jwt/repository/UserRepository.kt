package com.auth.jwt.repository

import com.auth.jwt.model.UserModel
import jakarta.persistence.criteria.CriteriaBuilder.In
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository:JpaRepository<UserModel,Int> {
 fun findByEmail(email: String): UserModel?
}