import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { LogoComponent } from '@/layout/component/logo.component';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    ToastModule,
    AppFloatingConfigurator,
    LogoComponent
  ],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  token: string | null = null;
  password = '';
  confirmPassword = '';
  isSubmitting = false;

  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _messageService = inject(MessageService);

  constructor() {
    this._route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  resetPassword() {
    if (!this.token) {
      this._messageService.add({ severity: 'warn', summary: 'Token ausente', detail: 'Use o link enviado por e-mail.' });
      return;
    }

    if (!this.password || !this.confirmPassword) {
      this._messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'Preencha a nova senha.' });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this._messageService.add({ severity: 'warn', summary: 'Senhas diferentes', detail: 'As senhas informadas não coincidem.' });
      return;
    }

    this.isSubmitting = true;
    this._authService.resetPassword({ token: this.token, newPassword: this.password }).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Senha alterada', detail: 'Você já pode fazer login com a nova senha.' });
        this.isSubmitting = false;
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Falha ao redefinir', detail: 'Não foi possível alterar a senha.' });
        console.error('Failed to reset password', err);
        this.isSubmitting = false;
      }
    });
  }
}
