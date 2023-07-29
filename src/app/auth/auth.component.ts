import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

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

    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (response) => {
        if ('registered' in response) {
          console.log({ LoginRes: response });
        } else {
          console.log({ Resgisterd: response });
        }
        this.isLoading = false;
      },
      (error) => {
        this.authError = error;
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}
