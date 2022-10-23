import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser, UpdateUser, Users } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl: string = '/';
  constructor(private http: HttpClient) { }

  getAllUsers():Observable<Users[]> {
    return this.http.get<Users[]>(this.baseApiUrl + 'remote/manageUsers');
  }
  addUser(user: AddUser): Observable<any> {
    return this.http.post(this.baseApiUrl + 'remote/manageUsers', user);
  }
  patchUser(patchUser: UpdateUser): Observable<any> {
    return this.http.patch(this.baseApiUrl + 'remote/manageUsers/' + patchUser.id, patchUser);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'remote/manageUsers/' + id);
  }
}
