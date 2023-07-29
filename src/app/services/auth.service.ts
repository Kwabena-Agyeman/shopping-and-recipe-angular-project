import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlxORnDAbtWRvmnV1dgRQJsIeBWVQybS8';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
