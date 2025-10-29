import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-in/sign-up.component';

export default [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
] as Routes;
