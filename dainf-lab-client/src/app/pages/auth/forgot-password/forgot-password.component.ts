import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { LogoComponent } from '@/layout/component/logo.component';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    ToastModule,
    AppFloatingConfigurator,
    LogoComponent
  ],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email = '';
  isSubmitting = false;

  private readonly _authService = inject(AuthService);
  private readonly _messageService = inject(MessageService);

  requestRecovery() {
    if (!this.email) {
      this._messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'Informe o e-mail cadastrado.' });
      return;
    }

    this.isSubmitting = true;
    this._authService.requestPasswordRecovery({ email: this.email }).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'E-mail enviado', detail: 'Verifique sua caixa de entrada para continuar.' });
        this.isSubmitting = false;
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Falha ao enviar', detail: 'Não foi possível iniciar a recuperação de senha.' });
        console.error('Failed to send recovery e-mail', err);
        this.isSubmitting = false;
      }
    });
  }
}
