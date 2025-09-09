package br.edu.utfpr.dainf.dto;

public record AuthResponse(String token, long expiresIn) {
}

