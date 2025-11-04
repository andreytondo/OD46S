import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

/**
 * Auth guard básico apenas para desenvolvimento
 */
export const AuthGuard: CanActivateFn = (route, state) => {
	const tokenService = new TokenService();
	const router = new Router();
	const token = tokenService.getToken();

	if (token) {
		return true;
	} else {
		router.navigate(['login']);
		return false;
	}
};
