import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AddProductCategoryComponent } from './products/add-product-category/add-product-category.component';
import { UsersComponent } from './users/users.component';
//Guard
import { AuthGuard } from './shared/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';


const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children:
      [
        {
          path: 'home',
          pathMatch: 'full',
          component: HomeComponent
        },
      ]
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'products', pathMatch: 'full', component: ProductsComponent },
  { path: 'add-product-category', pathMatch: 'full', component: AddProductCategoryComponent },
  { path: 'users-component', pathMatch: 'full', component: UsersComponent },
  { path: 'manage-users', pathMatch: 'full', component: ManageUsersComponent },
  { path: 'logout', pathMatch: 'full', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
