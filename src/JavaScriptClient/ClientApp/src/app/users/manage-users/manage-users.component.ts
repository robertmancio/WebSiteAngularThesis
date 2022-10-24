import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../models/users-model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];

  userForm!: FormGroup;
  actionBtn: string = "Save"
  actiontitle: string = "Add"
  addProductCategoryRequest: User = {
    id: '',
    userName:'',
    email: '',
    role:''
  };

  constructor(private dialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required],
      password: [null, Validators.required]
    })

    if (this.data) {
      console.log(this.data);
      this.actionBtn = "Update"
      this.actiontitle = "Update"
      this.userForm.controls['Name'].patchValue(this.data.name);
      this.addProductCategoryRequest.id = this.data.id;
    }
  }

  submitForm() {
    let valid = true;
    console.log(this.userForm.value);
    Object.keys(this.userForm.controls).forEach(key => {
      // Get errors of every form control
      if (this.userForm.get(key)!.errors != null) {
        valid = false;
      }
    });

    if (valid) {
      this.userService.addUser(this.userForm.value).subscribe(res => {
        this.router.navigate(["/user"]);
      });
    }
  }



  addUser() {
    if (this.actionBtn == "Save") {
      this.userService.addUser(this.userForm.value).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    } else {
      this.userService.patchUser(this.addProductCategoryRequest).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    }
  }
}
