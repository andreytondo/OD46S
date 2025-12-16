import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-in/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ClearanceValidationComponent } from './clearance-validation/clearance-validation.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

export default [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-mail', component: ConfirmEmailComponent },
  { path: 'clearance', component: ClearanceValidationComponent },
] as Routes;
