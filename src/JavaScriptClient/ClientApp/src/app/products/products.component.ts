import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsCategory } from 'src/app/models/productscategory-model';
import { ProductscategoryService } from 'src/app/services/productscategory.service'
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  productsCategory: ProductsCategory[] = [];
  dataSource = new MatTableDataSource<ProductsCategory>();
  displayedColumns: string[] = ['id', 'name'];

  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(private productscategoryService: ProductscategoryService) { }

  ngOnInit(): void {
    this.productscategoryService.getAllProductsCategory().subscribe(productscategory => {
      this.productsCategory = productscategory;
      this.dataSource.data = this.productsCategory;
      this.dataSource.paginator = this.matPaginator;
    });
  }
}

