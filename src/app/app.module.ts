import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './views/home/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastModule,
    ConfirmDialogModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
