package com.auth.jwt.service

import com.auth.jwt.dto.LoginDto
import com.auth.jwt.model.UserModel
import com.auth.jwt.repository.UserRepository
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CookieValue
import java.util.*

@Service
class AuthService(private val userRepository: UserRepository) {
    private val passwordEncoder: PasswordEncoder = BCryptPasswordEncoder()

    @Value("\${user.secret}")
    lateinit var secret: String

    fun saveUser(userModel: UserModel): UserModel {
        return userRepository.save(userModel)
    }

    fun checkLogin(loginDto: LoginDto): String? {
        val user = userRepository.findByEmail(loginDto.email)
        if(user != null) {
            if(passwordEncoder.matches(loginDto.password, user.password)) {
                val jwt = Jwts.builder()
                    .setIssuer(user.email)
                    .setExpiration(Date(System.currentTimeMillis() + 7200000))
                    .signWith(SignatureAlgorithm.HS256, secret)
                    .compact()
                return jwt
            }
        }
        return null
    }

    fun getUser(email:String, cookieValue: String): UserModel? {
        val body = Jwts.parser().setSigningKey(secret).build().parseSignedClaims(cookieValue).body
        if(body.issuer != email){
            return null
        }
        val user = userRepository.findByEmail(email)
        return user
    }

    fun deleteUser(email:String, cookieValue: String): UserModel? {
        val body = Jwts.parser().setSigningKey(secret).build().parseSignedClaims(cookieValue).body

        if(body.issuer != email){
            return null
        }
        val user = userRepository.findByEmail(email)
        if(user != null){
            userRepository.delete(user)
            return user
        }
        return null
    }
}