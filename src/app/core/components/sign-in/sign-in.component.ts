import { Component } from '@angular/core';
import { User, UserAttributes } from '@supabase/supabase-js';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  template: `
    <form [formGroup]="login_form" (ngSubmit)="onSubmit()">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" />
      </div>

      <div>
        <label for="password">Password</label>
        <input id="password" type="password" formControlName="password" />
      </div>

      <div style="color:red" *ngIf="error">{{ error }}</div>

      <button type="submit" [disabled]="login_form.invalid">Submit</button>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        *ngIf="loading"
      ></span>
    </form>
  `,
})
export class SignInComponent {
  loading: boolean;
  user: UserAttributes;

  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    if (this.login_form.valid) {
      delete this.error;

      const { email, password } = this.login_form.value;
      this.authService
        .signIn(email!, password!)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((err) => {
          this.error = err;
        });
    }
    this.loading = false;
  }
}
