import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { storeProvider } from './ngrx/app.provider';
import { Service } from './ngrx/app.service';
import { Effects } from './ngrx/app.effect';
import * as fromReducers from './ngrx/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './pages/logout/logout.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
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
    StoreModule.forFeature(fromReducers.featureKey, fromReducers.reducer),
  ],
  providers: [storeProvider, Service],
})
export class AppModule {}
