package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.AuthResponse;
import br.edu.utfpr.dainf.dto.UserSignupDTO;
import br.edu.utfpr.dainf.security.JwtService;
import br.edu.utfpr.dainf.service.AuthService;
import br.edu.utfpr.dainf.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, UserService userService, JwtService jwtService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.login(request.email(), request.password());
            String refreshToken = jwtService.generateRefreshToken(request.email());

            long maxAge = request.rememberMe() ? jwtService.getRefreshExpirationMs() / 1000 : -1;
            ResponseCookie cookie = authService.createRefreshCookie(refreshToken, maxAge);

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@CookieValue(name = "refresh_token") String refreshToken, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.refresh(refreshToken);
            String email = jwtService.extractRefreshTokenSubject(refreshToken);
            String newRefreshToken = jwtService.generateRefreshToken(email);

            ResponseCookie cookie = authService.createRefreshCookie(newRefreshToken);
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(true)
                .path("/auth/refresh")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> signUp(@RequestBody UserSignupDTO user) {
        authService.signUp(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/recovery")
    public ResponseEntity<?> recovery(@RequestBody AuthRequest request) {
        userService.forgotPassword(request.email());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPassword request) {
        userService.resetPassword(request.token, request.newPassword);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    public record ResetPassword(String token, String newPassword) {
    }

    public record AuthRequest(String email, String password, boolean rememberMe) {
    }
}