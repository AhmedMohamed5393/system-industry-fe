import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { storeProvider } from './providers/app.provider';
import { Service } from './services/app.service';
import { Effects } from './effects/app.effect';
import * as fromCustomerReducers from './reducers/customer.reducer';
import * as fromOrderReducers from './reducers/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './pages/logout/logout.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { TokenInterceptor } from './utils/Interceptors/token.interceptor';
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, LoginComponent, LogoutComponent, OrdersListComponent],
  exports: [ReactiveFormsModule],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    EffectsModule.forFeature([Effects]),
    EffectsModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromCustomerReducers.customerFeatureKey, fromCustomerReducers.customerReducer),
    StoreModule.forFeature(fromOrderReducers.orderFeatureKey, fromOrderReducers.orderReducer),
  ],
  providers: [
    storeProvider,
    Service,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class AppModule {}
