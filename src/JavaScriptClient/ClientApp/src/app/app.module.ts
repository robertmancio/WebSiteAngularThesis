import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialExampleModule } from '../material.module';
import { AuthService } from './authentication/authentication.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
