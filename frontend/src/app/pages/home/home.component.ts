import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza/pizza.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  pizzas: Pizza[] = [];
  
  loading: boolean = false;

  constructor(
      public _pizzaService: PizzaService
  ) { }

  ngOnInit() {
      this.loadMenu();
  }

  loadMenu() {

      this.loading = true;

      this._pizzaService.getMenu().subscribe( (res:any) => {
          this.pizzas = res;
          this.loading = false;
      });
  }

}
