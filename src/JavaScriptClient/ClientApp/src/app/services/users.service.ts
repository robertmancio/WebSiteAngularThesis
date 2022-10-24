import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserClaim } from '../authentication/authentication.service';
import { LocalService } from '../authentication/local.service';
import { AddUser, UpdateUser, User, Users } from '../models/users-model';
import { UserClaimKeys } from './utilities';

@Injectable()
export class UsersService {
  
  baseApiUrl: string = '/';

  userId!: string;
  public USER = 'currentUser';

  constructor(private http: HttpClient, private local: LocalService) {
    this.getLocalUserData();
  }

  getLocalUserData(): User {
    let claims = this.local.getJsonData<UserClaim[]>(this.USER);
    return new User(
      claims.find(x => x.type == UserClaimKeys.SUB)?.value!,
      claims.find(x => x.type == UserClaimKeys.PREFERRED_USERNAME)?.value!,
      claims.find(x => x.type == UserClaimKeys.EMAIL)?.value!,
      claims.find(x => x.type == UserClaimKeys.ROLE)?.value!
    );
  }

  patchUser(patchUser: UpdateUser): Observable<any> {
    return this.http.patch("/remote/manageUsers/" + patchUser.id, patchUser);
  }

  addUser(user: AddUser): Observable<any> {
    return this.http.post("/remote/manageUsers", user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete("/remote/manageUsers/" + id);
  }

  getCurrentUser(): Observable<User> {
    this.userId = this.getLocalUserData().id!
    return this.http.get<User>("/remote/manageUsers/" + this.userId);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>("/remote/manageUsers/" + id);
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseApiUrl + 'remote/manageUsers');
  }
}
