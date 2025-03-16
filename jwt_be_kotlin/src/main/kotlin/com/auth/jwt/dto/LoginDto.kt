package com.auth.jwt.dto

data class LoginDto(
    val email: String,
    val password: String
)