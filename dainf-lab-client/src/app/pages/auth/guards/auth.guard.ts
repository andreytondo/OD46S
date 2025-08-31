import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

/**
 * Auth guard básico apenas para desenvolvimento
 */
export const AuthGuard: CanActivateFn = (route, state) => {
	const tokenService = new TokenService();
	const router = new Router();
	const token = tokenService.getToken();
	const publicRoutes = ['/auth/login', '/auth/sign-up', '/not-found'];
	if (publicRoutes.includes(state.url)) {
		return true;
	}
	if (token) {
		return true;
	} else {
		router.navigate(['/auth/login']);
		return false;
	}
};
