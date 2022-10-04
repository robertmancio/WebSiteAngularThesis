import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

//Guard
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
      },
      {
        path: 'start',
        component: MenuComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
