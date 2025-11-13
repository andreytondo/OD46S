import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { LogoComponent } from '@/layout/component/logo.component';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { nameValidator } from '@/shared/validator/name.validator';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    PasswordModule,
    InputContainerComponent,
    LogoComponent,
    InputTextModule,
    AppFloatingConfigurator,
    InputNumberModule
  ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  private _messageService = inject(MessageService);

  form: FormGroup = this._fb.group(
    {
      nome: [null, Validators.compose([Validators.required, nameValidator(), Validators.minLength(5), Validators.maxLength(100)])],
      documento: [null, Validators.compose([Validators.required, Validators.pattern(/^\d{7,16}$/)])],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)]),
      ],
      telefone: [null, Validators.compose([Validators.required, Validators.pattern(/^\d{7,16}$/)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])],
    },
    // {
    //   validators: this.passwordMatchValidator,
    // },
  );
  // passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   if (
  //     password &&
  //     confirmPassword &&
  //     password.value !== confirmPassword.value
  //   ) {
  //     confirmPassword.setErrors({ passwordMismatch: true });
  //     return { passwordMismatch: true };
  //   } else {
  //     confirmPassword?.setErrors(null);
  //     return null;
  //   }
  // }

  signUpClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Preencha todos os campos corretamente',
      });
      return;
    }

    const { confirmPassword, ...userData } = this.form.value;

    // Garante que só os campos esperados vão para o backend
    const payload = {
      nome: userData.nome,
      documento: userData.documento,
      telefone: userData.telefone,
      email: userData.email,
      password: userData.password,
    };

    this._authService.signUp(payload).subscribe({
      next: (res) => {
        this._router.navigate(['login']);
      },
      error: (err) => {
        this._messageService.add({
          severity: 'warn',
          summary: 'Falha ao realizar cadastro',
          detail: 'Verifique os dados e tente novamente',
        });
        console.error('Falha no registro', err);
      },
    });
  }
}
