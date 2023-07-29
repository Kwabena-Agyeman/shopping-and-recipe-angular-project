import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

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

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          this.userCreation(res);
        }),
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
        tap((res) => {
          this.userCreation(res);
        }),
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem('recipe-book-app-user-token');
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    console.log('called');
    const userData = localStorage.getItem('recipe-book-app-user-token');
    console.log({ userData });

    if (!userData) return;

    const userDataObj: User = JSON.parse(userData);

    const loadedUser = new User(
      userDataObj.email,
      userDataObj.id,
      userDataObj['_token'],
      new Date(userDataObj['_tokenExpirationDate'])
    );

    if (loadedUser.isTokenValid) {
      this.user.next(loadedUser);
    } else {
      localStorage.removeItem('recipe-book-app-user-token');
    }
  }

  private userCreation(data: AuthResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.localId,
      data.idToken,
      expirationDate
    );

    this.user.next(user);
    localStorage.setItem('recipe-book-app-user-token', JSON.stringify(user));
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
