import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product-model';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  product: Product[] = [];

  productInvForm!: FormGroup;
  actionBtn : string = "Save"
  actiontitle : string = "Add"
  addProductRequest: Product = {
    id: 0,
    name: '',
    details: '',
    price: 0,
    productId: 0

  };
  roles: Role[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'employee', viewValue: 'Employee' },
  ];

  constructor(private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private productCategoryService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productInvForm = this.formBuilder.group({
    })

    if (this.data) {
      console.log(this.data);
      this.actionBtn = "Update"
      this.actiontitle = "Update"
      this.productInvForm.controls['Name'].patchValue(this.data.name);
      this.addProductRequest.id = this.data.id;
    }
  }
  addProduct() {
    if (this.actionBtn == "Save") {
      this.productCategoryService.addProduct(this.productInvForm.value).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    } else {
      this.addProductRequest.name = this.productInvForm.value.Name;
      this.productCategoryService.patchProduct(this.addProductRequest).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    }
  }
}
