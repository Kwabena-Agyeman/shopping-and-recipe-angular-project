import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  authError?: string;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email: string = form.value['email'];
    const password: string = form.value['password'];

    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService.signUp(email, password).subscribe(
        (response) => {
          console.log({ response });
          this.isLoading = false;
        },
        (error) => {
          this.authError = 'An error occurred';
          this.isLoading = false;
          console.error(error);
        }
      );
    }
  }
}
