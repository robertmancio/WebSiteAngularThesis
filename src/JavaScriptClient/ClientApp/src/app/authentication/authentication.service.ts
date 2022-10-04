import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface UserClaim {
  type: string;
  value: string;
}
const httpOptions = {
  headers: new HttpHeaders({
    'X-CSRF': '1',
  })
};

@Injectable()
export class AuthService {
  userClaim: UserClaim[] = [];
  constructor(private http: HttpClient) { }

  login() {
    window.location.href = "/bff/login";
  }

  logout(logoutUrl: string) {
  }

  getUserData(): Observable<string> {
    return this.http.get<string>("/bff/user", httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
