import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../login/register.component';

// pages
import { ToppingComponent } from './topping/topping.component';
import { PizzaComponent } from './pizza/pizza.component';

// additions
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ToppingComponent,
    PizzaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectAllModule
  ]
})
export class PagesModule { }
