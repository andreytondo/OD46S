import { Routes } from '@angular/router';
import { Login } from './login/login.component';
import { SignUpComponent } from './sign-in/sign-up.component';

export default [
  { path: 'login', component: Login },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: '/not-found' }
] as Routes;
