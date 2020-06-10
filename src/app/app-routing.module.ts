import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksContainerComponent} from './books-container/books-container.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: BooksContainerComponent,
    canActivate: [LoggedInGuard]
  },
  { path:'login', component:LoginComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
