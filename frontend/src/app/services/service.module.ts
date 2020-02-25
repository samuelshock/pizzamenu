import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginGuardGuard,
  UserService,
  ToppingService,
  PizzaService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuardGuard,
    UserService,
    ToppingService,
    PizzaService
  ],
  declarations: []
})
export class ServiceModule { }
