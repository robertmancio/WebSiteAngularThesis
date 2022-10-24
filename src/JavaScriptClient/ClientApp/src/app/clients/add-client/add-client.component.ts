import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsCategory } from '../../models/productscategory-model';
import { ProductscategoryService } from '../../services/productscategory.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {
  productsCategory: ProductsCategory[] = [];

  productForm!: FormGroup;
  actionBtn : string = "Save"
  actiontitle : string = "Add"
  addProductCategoryRequest: ProductsCategory = {
    id: 0,
    name: ''
  };

  constructor(private dialogRef: MatDialogRef<AddProductCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private productCategoryService: ProductscategoryService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name: ['', Validators.required]
    })

    if (this.data) {
      console.log(this.data);
      this.actionBtn = "Update"
      this.actiontitle = "Update"
      this.productForm.controls['Name'].patchValue(this.data.name);
      this.addProductCategoryRequest.id = this.data.id;
    }
  }

 
  addProductCategory() {
    if (this.actionBtn == "Save") {
      this.productCategoryService.addProductCategory(this.productForm.value).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    } else {
      this.addProductCategoryRequest.name = this.productForm.value.Name;
      this.productCategoryService.patchProductCategory(this.addProductCategoryRequest).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    }
  }
}
