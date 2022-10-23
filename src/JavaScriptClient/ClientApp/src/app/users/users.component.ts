import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../models/users-model';
import { UsersService } from '../services/users.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Users: Users[] = [];
  dataSource = new MatTableDataSource<Users>();
  displayedColumns: string[] = ['userName', 'email', 'role', 'actions'];

  openDialog() {
    const dialogRef = this.dialog.open(ManageUsersComponent, {
      width: '30%'
    });
  }
    @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
      this.dataSource.paginator = paginator;
    }
  
    constructor(private usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(users => {
      this.Users = users;
      this.dataSource.data = this.Users;
      this.dataSource.paginator = this.matPaginator;
    });
  }
}
