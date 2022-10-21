import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { LocalService }from 'src/app/authentication/local.service'

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BffK } from 'src/keys/BffK';
import { LocalK } from 'src/keys/LocalK';
import { UserClaimK } from 'src/keys/UserClaimK';

import { User } from '../models/users-model';

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
  user: User;
  constructor(private http: HttpClient, public local: LocalService) { }

  login() {
    window.location.href = "/bff/login";
  }
  logout() {
    this.userClaim = this.local.getJsonData(LocalK.USER);
    let logoutUrl = this.userClaim.find(x => x.type == UserClaimK.LOGOUT_URL)?.value!;
    this.userClaim = [];
    this.local.clearData();
    if (this.userClaim) {
      window.location.href = logoutUrl;
    } else {
      window.location.href = BffK.LOGOUT;
    }
  }


  getUserData(): Observable<UserClaim[]> {
    return this.http.get<UserClaim[]>(BffK.USER, httpOptions);
  }

  getUser(): Observable<User> {
    return this.http.get<UserClaim[]>(BffK.USER, httpOptions)
      .pipe(
        map(response => {
          this.user = new User(
            response.find(x => x.type == UserClaimK.SUB)?.value!,
            response.find(x => x.type == UserClaimK.PREFERRED_USERNAME)?.value!,
            response.find(x => x.type == UserClaimK.EMAIL)?.value!,
            response.find(x => x.type == UserClaimK.ROLE)?.value!
          );
          return this.user;
        }));
  }

  // local storage
  // logout -> delete all
  get currentUser(): User {
    this.userClaim = this.local.getJsonData('currentUser');
    if (this.userClaim.length > 0) {
      const user = new User(
        this.userClaim.find(x => x.type == UserClaimK.SUB)?.value!,
        this.userClaim.find(x => x.type == UserClaimK.PREFERRED_USERNAME)?.value!,
        this.userClaim.find(x => x.type == UserClaimK.EMAIL)?.value!,
        this.userClaim.find(x => x.type == UserClaimK.ROLE)?.value!
      );
      return user;

    }

    return new User();

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
