import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import 'rxjs/add/operator/map';
import { UserService } from '../user/user.service';
import { Pizza } from '../../models/pizza.model';


@Injectable()
export class PizzaService {

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  getPizza( id: string) {
    let url = `${ URL_SERVICES }/pizzas/${ id }`;
    return this.http.get(url, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    }).map( (res: any) => res.data);
  }

  getPizzas() {
    let url = `${ URL_SERVICES }/pizzas`;
    console.log("service")
    console.log(this._userService.token)
    return this.http.get(url, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    });
  }

  getMenu() {
    let url = `${ URL_SERVICES }/menu`;
    return this.http.get(url);
  }

  addPizza( pizza: Pizza) {
    let url = `${ URL_SERVICES }/pizzas`;

    return this.http.post(url, pizza, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    }).map( (res: any) => {
        console.log("The Pizza was created")
        return res;
    });
  }

  deletePizza( id: string ) {
    let url = `${ URL_SERVICES }/pizzas/${ id }`;
    
    return this.http.delete(url, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    }).map( (res: any) => {
        console.log("The Pizza was deleted")
        return res;
    });
  }

  addToppingToPizza( pizza: Pizza ) {
    // let url = `${ URL_SERVICES }/pizzas/${ pizza.id }?Authorization=Token ${ this._userService.token }`;
    let url = `${ URL_SERVICES }/pizzas/${ pizza.id }`;
    
    return this.http.put(url, pizza, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    }).map( (res: any) => {
        console.log("The Toppings were added")
        return res;
    });
  }
}
