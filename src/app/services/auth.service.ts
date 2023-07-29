import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface LoginResponseData extends AuthResponseData {
  registered: boolean;
}

export type AuthResponse = AuthResponseData | LoginResponseData;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlxORnDAbtWRvmnV1dgRQJsIeBWVQybS8';

  private loginUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlxORnDAbtWRvmnV1dgRQJsIeBWVQybS8';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponseData>(this.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (err?.error?.error?.message) {
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid';
          break;
        default:
          'An error occurred';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
