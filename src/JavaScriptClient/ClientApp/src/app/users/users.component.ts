import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User, Users } from '../models/users-model';
import { UsersService } from '../services/users.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { Router } from '@angular/router';


@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
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

  constructor(private usersService: UsersService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(usersrequest => {
      console.log(usersrequest);
      this.users = usersrequest;
      this.dataSource.data = this.users;
      this.dataSource.paginator = this.matPaginator;
    });
  }
  deleteUser(id: string) {
    console.log(id);
    this.usersService.deleteUser(id).subscribe(result => {
      this.usersService.getAllUsers().subscribe(usersrequest => {
        this.users = usersrequest;
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.matPaginator;
      })
    });
  }
}
