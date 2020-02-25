import { Component, OnInit } from '@angular/core';
import { PizzaService, ToppingService } from '../../services/service.index';

import { Pizza } from '../../models/pizza.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: []
})
export class PizzaComponent implements OnInit {

    pizzas: Pizza[] = [];

    pizza: Pizza = new Pizza('');
  
    loading: boolean = false;
    newpizza: boolean = false;
    public value: [] = [];

    public toppings: { [key: string]: Object; }[] = [];
    // maps the local data column to fields property
    public localFields: Object = { text: 'name', value: 'id' };
    // set the placeholder to MultiSelect Dropdown input element
    public localWaterMark: string = 'Select toppings';

    constructor(
        public _pizzaService: PizzaService,
        public _toppingService: ToppingService
    ) { }

    ngOnInit() {
        this.loadPizzas();
    }

    loadPizzas() {

        this.loading = true;

        this._pizzaService.getPizzas().subscribe( (res:any) => {
            this._toppingService.getToppings().subscribe( (toppings:any) => {
                this.pizzas = res;
                this.toppings = toppings;
                console.log(res)
                console.log(toppings)

                this.loading = false;
            });
        });
    }

    onSubmit(form: any): void {
        console.log(form.value);
        this._pizzaService.addPizza(form.value).subscribe( (res:any) => {
            this.value = [];
            this.newpizza = !this.newpizza;
            this.loadPizzas();
        });
    }

    savePizza( pizza:Pizza ) {
        console.log(pizza)
        this._pizzaService.addToppingToPizza(pizza).subscribe();
    }

    deltePizza( pizza:Pizza) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                this._pizzaService.deletePizza(pizza.id)
                .subscribe( res => {
                    this.loadPizzas();
                });
                Swal.fire(
                    'Deleted!',
                    'Your pizza has been deleted.',
                    'success'
                )
            }
          });
    }

}
