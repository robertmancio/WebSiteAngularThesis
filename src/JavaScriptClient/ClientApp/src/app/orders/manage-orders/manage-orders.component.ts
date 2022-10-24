import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/orders-model';
import { ProductsCategory } from '../../models/productscategory-model';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { ProductscategoryService } from '../../services/productscategory.service';



@Component({
  selector: 'manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})

export class ManageOrdersComponent implements OnInit {
  product: Order[] = [];
  productCategory$: Observable<ProductsCategory[]> = new Observable<ProductsCategory[]>();
  productInvForm!: FormGroup;
  actionBtn : string = "Save"
  actiontitle : string = "Add"
  addOrderRequest: Order = {
    id: 0

  };

  constructor(private dialogRef: MatDialogRef<ManageOrdersComponent>,
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
      this.addOrderRequest.id = this.data.id;
    }
  }
  addProduct() {
    if (this.actionBtn == "Save") {
      this.productService.addProduct(this.productInvForm.value).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    } else {
      this.addOrderRequest/*.name*/ = this.productInvForm.value.Name;
      this.productService.patchProduct(this.addOrderRequest).subscribe(response => {
        console.log(response);
        this.dialogRef.close(true);
      })
    }
  }
}
