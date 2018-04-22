import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//#region Components 
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UserComponent } from './components/user/user.component';
//#endregion

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgetpassword',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);