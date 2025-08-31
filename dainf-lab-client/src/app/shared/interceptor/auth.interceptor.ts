import { TokenService } from '@/pages/auth/services/token.service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authToken = inject(TokenService).getToken();

  if (!authToken) return next(req);

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
