package br.edu.utfpr.dainf.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Getter
    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    @Value("${jwt.refresh.secret}")
    private String refreshSecretKey;

    @Getter
    @Value("${jwt.refresh.expiration}")
    private long refreshExpirationMs;

    public String generateRefreshToken(String email) {
        return buildJWT(email, refreshSecretKey, refreshExpirationMs);
    }

    public String generateToken(String email) {
        return buildJWT(email, secretKey, jwtExpirationMs);
    }

    public boolean isTokenValid(String token) {
        return isJwtValid(token, secretKey);
    }

    public boolean isRefreshTokenValid(String token) {
        return isJwtValid(token, refreshSecretKey);
    }

    public String extractSubject(String token) {
        return extractAllClaims(token, secretKey).getSubject();
    }

    public String extractRefreshTokenSubject(String token) {
        return extractAllClaims(token, refreshSecretKey).getSubject();
    }

    private String buildJWT(String email, String key, long expiration) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    private boolean isJwtValid(String token, String key) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();

            if (claims.getSubject() == null) return false;
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractAllClaims(String token, String key) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }
}
