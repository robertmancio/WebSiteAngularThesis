import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsCategory } from '../../models/productscategory-model';
import { ProductscategoryService } from '../../services/productscategory.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'

@Component({
  selector: 'add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {

  productForm!: FormGroup;
  addProductCategoryRequest: ProductsCategory = {
    id: 0,
    name: ''
  };

  constructor(private productCategoryService: ProductscategoryService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required]

    }) 
  }

  addProductCategory() {
    this.productCategoryService.addProductCategory(this.addProductCategoryRequest)
    .subscribe({
      next: (productCategory) => {
        this.router.navigate(['products'])
      }
    })
  }
}  
