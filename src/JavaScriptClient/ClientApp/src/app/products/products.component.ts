import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'amount'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator:any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  amount: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Bracelets & ancklets', amount: 10 },
  { position: 2, name: 'Necklaces', amount: 10 },
  { position: 3, name: 'Earrings & rings', amount: 10 },
  { position: 4, name: 'Keychains & ornaments', amount: 10 },
  { position: 5, name: 'Sweaters', amount: 10 },
  { position: 6, name: 'Shirts & Blouses', amount: 10 },
  { position: 7, name: 'Pants & shorts', amount: 10 },
  { position: 8, name: 'Belts', amount: 10 },
  { position: 9, name: 'Scarves', amount: 10 },
  { position: 10, name: 'Bags', amount: 10 },
];
