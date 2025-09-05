import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputContainerComponent } from '@/shared/components/input-container/input-container.component';
import { LogoComponent } from '@/layout/component/logo.component';
import { InputTextModule } from 'primeng/inputtext';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, ButtonModule, PasswordModule, InputContainerComponent, LogoComponent, InputTextModule, AppFloatingConfigurator],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);

  form: FormGroup = this._fb.group(
    {
      name: [null, Validators.required],
      idNumber: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      phone: [],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
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
      console.error('O formulário está inválido.');
      return;
    }

    const { confirmPassword, ...userData } = this.form.value;

    this._authService.signUp(userData).subscribe({
      next: (res) => {
        console.log('Registro bem-sucedido!', res);
        this._router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Falha no registro', err);
      },
    });
  }
}
