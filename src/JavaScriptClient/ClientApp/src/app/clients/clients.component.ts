import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsCategory } from 'src/app/models/productscategory-model';
import { ProductscategoryService } from 'src/app/services/productscategory.service'
import { AddProductCategoryComponent } from './add-client/add-client.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'clients',
  templateUrl: './c.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {
  productsCategory: ProductsCategory[] = [];
  dataSource = new MatTableDataSource<ProductsCategory>();
  displayedColumns: string[] = ['id', 'name', 'actions'];

  openDialog() {
    const dialogRef = this.dialog.open(AddProductCategoryComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.productscategoryService.getAllProductsCategory().subscribe(productscategory => {
          this.productsCategory = productscategory;
          this.dataSource.data = this.productsCategory;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(private productscategoryService: ProductscategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productscategoryService.getAllProductsCategory().subscribe(productscategory => {
      this.productsCategory = productscategory;
      this.dataSource.data = this.productsCategory;
      this.dataSource.paginator = this.matPaginator;
    });
  }
  editProduct(row: any) {
    const dialogRef = this.dialog.open(AddProductCategoryComponent, {
      width: '30%',
      data:row
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.productscategoryService.getAllProductsCategory().subscribe(productscategory => {
          this.productsCategory = productscategory;
          this.dataSource.data = this.productsCategory;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }
  deleteProduct(id: number) {
    this.productscategoryService.deleteProductCategory(id).subscribe(deletep => {
      this.productscategoryService.getAllProductsCategory().subscribe(productscategory => {
        this.productsCategory = productscategory;
        this.dataSource.data = this.productsCategory;
        this.dataSource.paginator = this.matPaginator;
      })
    })
  }
}
