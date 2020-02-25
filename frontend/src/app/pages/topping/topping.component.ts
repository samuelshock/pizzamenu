import { Component, OnInit } from '@angular/core';
import { ToppingService } from '../../services/pizza/toppin.service';
import { Topping } from '../../models/topping.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrls: []
})
export class ToppingComponent implements OnInit {

    toppings: Topping[] = [];
  
    loading: boolean = false;
    newtopping: boolean = false;

    constructor(
        public _toppingService: ToppingService
    ) { }

    ngOnInit() {
        this.loadToppings();
    }

    loadToppings() {

        this.loading = true;

        this._toppingService.getToppings().subscribe( (res:any) => {
            this.toppings = res;
            this.loading = false;
        });
    }

    saveTopping(form: any)  {
        console.log(form.value)
        this._toppingService.addTopping(form.value).subscribe( (res:any) => {
            this.newtopping = !this.newtopping;
            this.loadToppings();
        });
    }

    deleteTopping(topping: Topping) {
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
                this._toppingService.deleteTopping(topping.id)
                .subscribe( () => {
                    this.loadToppings();
                });
                Swal.fire(
                    'Deleted!',
                    'Your topping has been deleted.',
                    'success'
                )
            }
          });
    }

    

}
