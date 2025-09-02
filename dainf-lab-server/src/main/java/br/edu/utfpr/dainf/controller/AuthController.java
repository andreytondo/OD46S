package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.UserSignupDTO;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.security.JwtService;
import br.edu.utfpr.dainf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    @Autowired
    UserService userService;

    public AuthController(AuthenticationManager authManager, JwtService jwtService) {
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // removido login com autenticação para desenvolvimento
//            Authentication auth = authManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            request.email(),
//                            request.password()
//                    )
//            );

            String token = jwtService.generateToken(request.email());

            return ResponseEntity.ok(Map.of("token", token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> signUp(@RequestBody UserSignupDTO user) {
        userService.save(user.toUserModel());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public record AuthRequest(String email, String password) {}
}