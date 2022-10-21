import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../models/users-model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Users: Users[] = [];
  dataSource = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['userName', 'email', 'role']; 
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(users => {
      this.Users = users;
      this.dataSource.data = this.Users;
      this.dataSource.paginator = this.matPaginator;
    });
  }
}
