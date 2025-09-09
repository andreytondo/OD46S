package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.dto.AuthResponse;
import br.edu.utfpr.dainf.dto.UserSignupDTO;
import br.edu.utfpr.dainf.security.JwtService;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthService(AuthenticationManager authManager, JwtService jwtService, UserService userService) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    public AuthResponse login(String email, String password) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        String token = jwtService.generateToken(email);
        long expiresIn = jwtService.getJwtExpirationMs() / 1000;
        return new AuthResponse(token, expiresIn);
    }

    public AuthResponse refresh(String refreshToken) {
        if (!jwtService.isRefreshTokenValid(refreshToken)) {
            throw new AuthenticationException("Invalid refresh token") {
            };
        }
        String email = jwtService.extractRefreshTokenSubject(refreshToken);
        String newToken = jwtService.generateToken(email);
        long expiresIn = jwtService.getJwtExpirationMs() / 1000;
        return new AuthResponse(newToken, expiresIn);
    }

    public void signUp(UserSignupDTO userSignupDTO) {
        userService.save(userSignupDTO.toUserModel());
    }

    public ResponseCookie createRefreshCookie(String refreshToken) {
        return createRefreshCookie(refreshToken, jwtService.getRefreshExpirationMs() / 1000);
    }

    public ResponseCookie createRefreshCookie(String refreshToken, Long maxAge) {
        return ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/auth/refresh")
                .maxAge(maxAge)
                .sameSite("Strict")
                .build();
    }
}
