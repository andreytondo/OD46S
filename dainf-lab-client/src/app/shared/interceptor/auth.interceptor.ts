import { AuthService } from '@/pages/auth/services/auth.service';
import { TokenService } from '@/pages/auth/services/token.service';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authToken = inject(TokenService).getToken();

  const authReq = authToken
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      })
    : req.clone({ withCredentials: true });

  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  return next(authReq).pipe(
    catchError((error) =>
      handleRefresh(req, next, error, authService, tokenService),
    ),
  );
}

function handleRefresh(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  error: any,
  authService: AuthService,
  tokenService: TokenService,
): Observable<HttpEvent<unknown>> {
  if (error.status !== 401) return throwError(() => error);

  if (req.url.includes('/auth/refresh') || req.url.includes('/auth/login')) {
    tokenService.clearToken();
    const router = new Router();
    router.navigate(['/login']);
    return throwError(() => error);
  }

  // Tenta fazer o refresh do token
  return authService.refresh().pipe(
    switchMap((res) => {
      tokenService.setToken(res.token);
      // Reenvia a requisição original com o novo token
      const newReq = req.clone({
        setHeaders: { Authorization: `Bearer ${res.token}` },
        withCredentials: true,
      });
      return next(newReq);
    }),
    catchError((refreshError) => {
      tokenService.clearToken();
      const router = new Router();
      router.navigate(['/login']);
      return throwError(() => refreshError);
    }),
  );
}
