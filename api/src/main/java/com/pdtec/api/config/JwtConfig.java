package com.pdtec.api.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtConfig {

    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 100000000;
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String HEADER_STRING = "Authorization";

    public static String generateToken(Long id) {
        Date expirationDate = new Date(System.currentTimeMillis() + EXPIRATION_TIME);
        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();
    }

    public static Long getIdFromToken(String token) {
        String subject = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();

        return Long.parseLong(subject);
    }

    public static boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""));

            Date expiration = claims.getBody().getExpiration();
            if (expiration.before(new Date())) {
                return false;
            }

            return true;

        } catch (Exception e) {
            return false;
        }
    }

}
