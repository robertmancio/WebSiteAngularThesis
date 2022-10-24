import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddClientComponent } from './add-client/add-client.component';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../models/client-model';
import { ClientService } from '../services/clients.service';


@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {
  client: Client[] = [];
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'lastName', 'address', 'phoneNumber', 'email' ,'actions'];

  openDialog() {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.clientService.getAllClients().subscribe(clientRequest => {
          this.client = clientRequest;
          this.dataSource.data = this.client;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(private clientService: ClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clientRequest => {
      this.client = clientRequest;
      this.dataSource.data = this.client;
      this.dataSource.paginator = this.matPaginator;
    });
  }
  editProduct(row: any) {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '30%',
      data:row
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.clientService.getAllClients().subscribe(clientRequest => {
          this.client = clientRequest;
          this.dataSource.data = this.client;
          this.dataSource.paginator = this.matPaginator;
        });
      }
    });
  }
  deleteProduct(id: number) {
    this.clientService.deleteClient(id).subscribe(deletep => {
      this.clientService.getAllClients().subscribe(clientRequest => {
        this.client = clientRequest;
        this.dataSource.data = this.client;
        this.dataSource.paginator = this.matPaginator;
      })
    })
  }
}
