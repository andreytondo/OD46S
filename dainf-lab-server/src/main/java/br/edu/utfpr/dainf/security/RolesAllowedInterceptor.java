package br.edu.utfpr.dainf.security;

import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;

@Component
public class RolesAllowedInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!(handler instanceof HandlerMethod method)) return true;

        // Method-level @RolesAllowed takes precedence
        RolesAllowed rolesAllowed = method.getMethodAnnotation(RolesAllowed.class);
        // Fallback to class-level annotation
        if (rolesAllowed == null) rolesAllowed = method.getBeanType().getAnnotation(RolesAllowed.class);

        // Do not check roles
        if (rolesAllowed == null) return true;

        // Check user roles
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        RolesAllowed finalRolesAllowed = rolesAllowed;
        if (auth == null || auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .noneMatch(a -> Arrays.asList(finalRolesAllowed.value()).contains(a))) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return false;
        }

        return true;
    }
}