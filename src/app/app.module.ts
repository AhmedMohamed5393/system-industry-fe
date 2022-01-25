import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  exports: [ReactiveFormsModule],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    EffectsModule.forFeature([]),
    EffectsModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
  ],
  providers: [],
})
export class AppModule {}
