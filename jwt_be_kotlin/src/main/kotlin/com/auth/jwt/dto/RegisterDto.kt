package com.auth.jwt.dto

data class RegisterDto (
    val name: String,
    val email: String,
    val password: String
)