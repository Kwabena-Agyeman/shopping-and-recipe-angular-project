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

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email: string = form.value['email'];
    const password: string = form.value['password'];
    if (!this.isLoginMode) {
      this.authService.signUp(email, password).subscribe((response) => {
        console.log({ response });
      });
    }
  }
}
