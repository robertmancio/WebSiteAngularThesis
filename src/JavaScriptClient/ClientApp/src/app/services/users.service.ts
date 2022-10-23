import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl: string = '/';
  constructor(private http: HttpClient) { }

  getAllUsers():Observable<Users[]> {
    return this.http.get<Users[]>(this.baseApiUrl + 'remote/manageUsers');
  }
}
