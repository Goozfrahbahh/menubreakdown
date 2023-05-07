import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="max-w-4xl mx-auto mt-24">
      <div
        class="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 bg-gray-100"
      >
        <div class="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
          <h1 class=" mb-6 text-3xl font-bold text-center">Don't worry</h1>
          <p class="text-center mx-12">
            We are here to help you to recover your password. Enter the email
            address you used when you joined and we'll send you instructions to
            reset your password.
          </p>
          <div class="space-y-6 w-ful">
            <input type="email" [(ngModel)]="email" required />
            <div>
              <button
                type="submit"
                (submit)="onSubmit(email)"
                class="w-full px-4 py-2 font-medium text-center text-white bg-indigo-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                Send
              </button>
            </div>
          </div>
          <div class="text-sm text-gray-600 items-center flex justify-between">
            <p
              class="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Back
            </p>
            <p class="hover:text-blue-500 cursor-pointer">Need help?</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  email = 'Email Address';

  constructor(authService: AuthService) {}

  onSubmit(email: string) {
    //     this.authService.forgotPassword(email);
  }
}
