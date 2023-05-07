import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const EXPORTCOMPONENTS = [
  SignInComponent,
  SignUpComponent,
  ProfileComponent,
];

export const IMPORTMODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
];

@NgModule({
  imports: [...IMPORTMODULES],
  declarations: [...EXPORTCOMPONENTS, ForgotPasswordComponent],
  exports: [...EXPORTCOMPONENTS],
})
export class CoreModule {}
