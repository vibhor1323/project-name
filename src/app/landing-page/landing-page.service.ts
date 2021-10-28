import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LandingPageAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  otp(ph: string): Observable<any> {
    console.log(ph);
    return this.http
      .post(
        'https://niobooks.in/api/web/request_otp',
        {
          mobile_number: ph,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            client: 'web',
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(ph: string, otp: string) {
    return this.http
      .post(
        'https://niobooks.in/api/web/authenticate',
        {
          mobile_number: ph,
          otp_code: otp,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            client: 'web',
          },
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          localStorage.setItem('UserDetails', JSON.stringify(resData));
        })
      );
  }

  logout() {
    this.router.navigate(['']);
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('items');
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password Incorrect';
        break;
    }
    return throwError(errorMessage);
  }
}
