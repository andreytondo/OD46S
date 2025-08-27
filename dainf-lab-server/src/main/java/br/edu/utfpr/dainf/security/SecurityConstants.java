package br.edu.utfpr.dainf.security;

public class SecurityConstants {
    public static final String SECRET = "pw44s";
    public static final long EXPIRATION_TIME = 86400000; // 1 dia = 60*60*24*1000
    public static final String TOKEN_PREFIX = "Bearer "; // tipo da autenticação
    public static final String HEADER_STRING = "Authorization"; // header que será passado ao server com o token
}