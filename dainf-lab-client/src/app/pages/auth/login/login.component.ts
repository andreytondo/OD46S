import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LogoComponent } from "@/layout/component/logo.component";
import { AuthService } from '../auth.service';
import { Observable, switchMap, tap } from 'rxjs';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, LogoComponent],
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  private _authService = inject(AuthService);
  private _tokenService = inject(TokenService);
  private _router = inject(Router);

  loginClick() {
    this._login().subscribe({
      next: (res) => {
        this._tokenService.setToken(res.token, this.rememberMe);
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  private _login(): Observable<{ token: string }> {
    return this._authService.login({
      email: this.email,
      password: this.password,
    });
  }
}
