import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product} from 'src/app/models/product-model';
import { ProductscategoryService } from 'src/app/services/productscategory.service'
import { AddProductComponent } from './add-product-category/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'productinv',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductInventoryComponent implements OnInit {
  product: Product[] = [];s
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id', 'name','details', 'price', 'product', 'actions'];

  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.productService.getAllProducts().subscribe(productInv => {
          this.product = productInv;
          this.dataSource.data = this.product;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(inventoryProduct => {
      console.log(inventoryProduct);
      inventoryProduct.forEach(function (row, index) {
          row.index = index;
      });
      this.product = inventoryProduct;
      this.dataSource.data = this.product;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  editProduct(row: any) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '30%',
      data:row
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.productService.getAllProducts().subscribe(productinv => {
          this.product = productinv;
          this.dataSource.data = this.product;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(deletep => {
      this.productService.getAllProducts().subscribe(productinv=> {
        this.product = productinv;
        this.dataSource.data = this.product;
        this.dataSource.paginator = this.matPaginator;
      })
    })
  }
}
