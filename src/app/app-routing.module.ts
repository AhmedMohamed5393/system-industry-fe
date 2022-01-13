import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent },
  { path: '',/* canActivate: [AuthGuard],*/ component: OrdersListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
