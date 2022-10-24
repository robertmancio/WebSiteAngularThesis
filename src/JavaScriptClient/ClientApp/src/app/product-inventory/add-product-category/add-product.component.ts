import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product-model';
import { ProductsCategory } from '../../models/productscategory-model';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { ProductscategoryService } from '../../services/productscategory.service';



@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  product: Product[] = [];
  productCategory$: Observable<ProductsCategory[]> = new Observable<ProductsCategory[]>();
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

  constructor(private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private productService: ProductService,
    private productCategoryService: ProductscategoryService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productCategory$ = this.productCategoryService.getAllProductsCategory();
    console.log(this.productCategory$);
    this.productInvForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Details: ['', Validators.required],
      Price: ['', Validators.required],
      ProductId: ['', Validators.required],
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
      this.productService.addProduct(this.productInvForm.value).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    } else {
      this.addProductRequest.name = this.productInvForm.value.Name;
      this.productService.patchProduct(this.addProductRequest).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    }
  }
}
