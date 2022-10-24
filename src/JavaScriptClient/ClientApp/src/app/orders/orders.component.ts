import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order} from 'src/app/models/orders-model';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderService } from '../services/orders.service';


@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  order: Order[] = [];
  dataSource = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['id', 'amount','date', 'client', 'product', 'actions'];

  openDialog() {
    const dialogRef = this.dialog.open(ManageOrdersComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.orderService.getAllOrders().subscribe(productInv => {
          this.order = productInv;
          this.dataSource.data = this.order;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(private orderService: OrderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orderRequest => {
      console.log(orderRequest);
      orderRequest.forEach(function (row, index) {
          row.index = index;
      });
      this.order = orderRequest;
      this.dataSource.data = this.order;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  editProduct(row: any) {
    const dialogRef = this.dialog.open(ManageOrdersComponent, {
      width: '30%',
      data:row
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.orderService.getAllOrders().subscribe(orderRequest => {
          this.order = orderRequest;
          this.dataSource.data = this.order;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }
  deleteProduct(id: number) {
    this.orderService.deleteOrder(id).subscribe(deletep => {
      this.orderService.getAllOrders().subscribe(orderRequest => {
        this.order = orderRequest;
        this.dataSource.data = this.order;
        this.dataSource.paginator = this.matPaginator;
      })
    })
  }
}
