import { AuthService } from '@/pages/auth/services/auth.service';
import { TokenService } from '@/pages/auth/services/token.service';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
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

  return next(authReq).pipe(
    catchError((error) => handleRefresh(req, next, error)),
  );
}

function handleRefresh(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  error: any,
): Observable<HttpEvent<unknown>> {
  if (error.status !== 401) return throwError(() => error);

  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

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
      return throwError(() => refreshError);
    }),
  );
}
