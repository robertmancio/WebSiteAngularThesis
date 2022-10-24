import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu/menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { AuthService } from './authentication/authentication.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductInventoryComponent } from './product-inventory/product.component';
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs';
import { AddProductComponent } from './product-inventory/add-product-category/add-product.component';
import { AddProductCategoryComponent } from './products/add-product-category/add-product-category.component';
import { UsersComponent } from './users/users.component';
import { LogoutComponent } from './logout/logout.component';
import { LocalService } from './authentication/local.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { UsersService } from './services/users.service';
import { ProductscategoryService } from './services/productscategory.service';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from './services/clients.service';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientsComponent } from './clients/clients.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatTableModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule

  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    ProductInventoryComponent,
    ClientsComponent,
    AddProductCategoryComponent,
    AddProductComponent,
    AddClientComponent,
    ManageUsersComponent,
    UsersComponent,
    LogoutComponent,
  ],
  providers: [AuthService, LocalService, ProductService, UsersService, ProductscategoryService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
