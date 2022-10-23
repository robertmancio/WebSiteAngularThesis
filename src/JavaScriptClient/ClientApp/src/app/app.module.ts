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
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs';
import { AddProductCategoryComponent } from './products/add-product-category/add-product-category.component';
import { UsersComponent } from './users/users.component';
import { LogoutComponent } from './logout/logout.component';
import { LocalService } from './authentication/local.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    FormsModule

  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    AddProductCategoryComponent,
    UsersComponent,
    LogoutComponent,
  ],
  providers: [AuthService, LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
