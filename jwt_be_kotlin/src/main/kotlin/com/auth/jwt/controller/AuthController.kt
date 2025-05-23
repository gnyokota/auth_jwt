package com.auth.jwt.controller

import com.auth.jwt.dto.EmailDto
import com.auth.jwt.dto.LoginDto
import com.auth.jwt.dto.RegisterDto
import com.auth.jwt.model.UserModel
import com.auth.jwt.service.AuthService
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/api")
class AuthController(private val authService: AuthService) {
    @PostMapping("/register")
    fun register(@RequestBody registerBody: RegisterDto): ResponseEntity<UserModel> {
        val user = UserModel()
        user.name = registerBody.name
        user.email = registerBody.email
        user.password = registerBody.password
        val savedUser = authService.saveUser(user)
        return ResponseEntity.ok(savedUser)
    }

    @PostMapping("/login")
    fun login(@RequestBody loginBody: LoginDto, response: HttpServletResponse): ResponseEntity<Unit> {
        val jwt = authService.checkLogin(loginBody) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val cookie = Cookie("jwt", jwt)
        cookie.isHttpOnly = true
        response.addCookie(cookie)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/user")
    fun user(@RequestBody emailBody: EmailDto, @CookieValue("jwt") jwtCookie: String?): ResponseEntity<Any> {
        if (jwtCookie == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
        val user =
            authService.getUser(emailBody.email, jwtCookie) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()

        return ResponseEntity.ok(user)
    }

    @PostMapping("/logout")
    fun logout(@RequestBody email: String, response: HttpServletResponse): ResponseEntity<Unit> {
        val jwt = authService.checkLogout(email)
        if(jwt == "jwt") {
            val cookie = Cookie("jwt", null)
            cookie.isHttpOnly = true
            response.addCookie(cookie)
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
    }

    @DeleteMapping("/user/delete")
    fun deleteUser(@RequestBody emailBody: EmailDto, @CookieValue("jwt") jwtCookie: String?): ResponseEntity<String> {
        if (jwtCookie == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }

        authService.deleteUser(emailBody.email, jwtCookie) ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        return ResponseEntity.ok("User deleted successfully")
    }
}