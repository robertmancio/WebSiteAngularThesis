import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../models/client-model';
import { ClientService } from '../../services/clients.service';

@Component({
  selector: 'add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client[] = [];

  productForm!: FormGroup;
  actionBtn : string = "Save"
  actiontitle : string = "Add"
  addClientRequest: Client = {
    id: 0,
    name: ''
  };

  constructor(private dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private clientService: ClientService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: ['', Validators.required],
    })

    if (this.data) {
      console.log(this.data);
      this.actionBtn = "Update"
      this.actiontitle = "Update"
      this.productForm.controls['Name'].patchValue(this.data.name);
      this.productForm.controls['LastName'].patchValue(this.data.lastName);
      this.productForm.controls['Address'].patchValue(this.data.address);
      this.productForm.controls['PhoneNumber'].patchValue(this.data.phoneNumber);
      this.productForm.controls['Email'].patchValue(this.data.email);
      this.addClientRequest.id = this.data.id;
    }
  }

 
  addClient() {
    if (this.actionBtn == "Save") {
      this.clientService.addClient(this.productForm.value).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    } else {
      this.addClientRequest.name = this.productForm.value.Name;
      this.addClientRequest.lastName = this.productForm.value.LastName;
      this.addClientRequest.address = this.productForm.value.Address;
      this.addClientRequest.phoneNumber = this.productForm.value.PhoneNumber;
      this.addClientRequest.email = this.productForm.value.Email;
      this.clientService.patchClient(this.addClientRequest).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    }
  }
}
