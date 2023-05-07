import { Component, OnInit, ViewChild } from '@angular/core';
import { Access, Profile } from '../../models/user';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="h-full pt-14 bg-transparent p-0 sm:p-12 overflow-hidden">
      <div
        class="mx-auto max-w-md px-6 py-12 text-white border-4 border-zinc-700 shadow-xl sm:rounded-3xl"
      >
        <h1 class="text-2xl text-center text-[#31abc8] font-bold mb-8">
          Registration Form
        </h1>
        <form (ngSubmit)="onSubmit()" [formGroup]="profileForm">
          <div class="relative z-0 w-full mb-5">
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600"
              [ngClass]="{
                'select': submitted && profileForm['email'].invalid,
              }"
            />
            <label
              for="email"
              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-300/90"
              >Email</label
            >
            <div
              *ngIf="profileForm.controls['email'].dirty  && profileForm.controls['email'].errors?.['required']"
              class="invalid-feedback"
            >
              Email is required for registration
            </div>
            <div
              *ngIf="profileForm.controls['email'].dirty  && profileForm.controls['email'].errors?.['email']"
              class="invalid-feedback"
            >
              Min Length of Passwrod is 6 characters
            </div>
          </div>

          <div class="relative z-0 w-full mb-5">
            <input
              type="password"
              id="password"
              formControlName="password"
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600"
            />
            <label
              for="password"
              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-300/90"
              >Password</label
            >
            <div
              *ngIf="profileForm.controls['password'].touched  && profileForm.controls['passwordConfirm'].errors?.['minLength']"
              class="invalid-feedback"
            >
              Min Length of Passwrod is 6 characters
            </div>
          </div>
          <div class="relative z-0 w-full mb-5">
            <input
              type="password"
              id="confirmPassword"
              formControlName="confirmPassword"
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600"
            />
            <label
              for="confirmPassword"
              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-300/90"
              >Confirm Password</label
            >
            <div
              *ngIf="profileForm.controls['passwordConfirm'].touched  && profileForm.controls['passwordConfirm'].errors?.['matchPassword']"
              class="invalid-feedback"
            >
              Confirm Password does not match
            </div>
          </div>

          <div class="relative z-0 w-full mb-5">
            <select
              id="accessLevel"
              formControlName="accessLevel"
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-zinc-400 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-zinc-600"
            >
              <option *ngFor="let access of accessLevels">
                {{ access }}
              </option>
            </select>
            <label
              for="select"
              class="duration-300 top-3 -z-1 origin-0 text-gray-300/90"
              >Select an option</label
            >
            <span
              class="text-sm text-red-600 hidden"
              [ngClass]="
                profileForm.controls['accessLevel'].errors
                  ? 'text-red-600'
                  : 'text-gray-500'
              "
              >Option has to be selected</span
            >
          </div>
          <button
            id="button"
            type="submit"
            class="flex rounded-md px-4 py-2 align-middle overflow-hidden
            relative group cursor-pointer border-2 font-medium border-zinc-500
            text-[#31abc8]"
          >
            <span
              class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#31abc8] bg-opacity-70 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"
            ></span>
            <span
              class="relative ml-2 text-gray-500 dark:text-gray-400 transition duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-100 ease"
              type="submit"
              >Sign Up</span
            >
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .-z-1 {
        z-index: -1;
      }

      .origin-0 {
        transform-origin: 0%;
      }

      input:focus ~ label,
      input:not(:placeholder-shown) ~ label,
      textarea:focus ~ label,
      textarea:not(:placeholder-shown) ~ label,
      select:focus ~ label,
      select:not([value='']):valid ~ label {
        /* @apply transform; scale-75; -translate-y-6; */
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        transform: translateX(var(--tw-translate-x))
          translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
          skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
          scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        --tw-scale-x: 0.75;
        --tw-scale-y: 0.75;
        --tw-translate-y: -1.5rem;
      }

      input:focus ~ label,
      select:focus ~ label {
        /* @apply text-black; left-0; */
        --tw-text-opacity: 1;
        left: 0px;
        color: #828282;
      }

      invalid {
      }
    `,
  ],
})
export class SignUpComponent {
  accessLevels = ['Employee', 'Manager', 'Admin'];
  _profileForm: FormGroup;
  submitted: boolean = false;

  ngOnInit() {
    this._profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      accessLevel: new FormControl('Employee'),
    });
  }

  get profileForm() {
    return this._profileForm;
  }

  resetForm() {
    this.profileForm.reset();
  }

  checkPasswords(group: FormGroup | any) {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { matchPassword: true };
  }

  public onSubmit() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}
