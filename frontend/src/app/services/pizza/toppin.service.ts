import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import 'rxjs/add/operator/map';
import { Topping } from '../../models/topping.model';
import { UserService } from '../user/user.service';


@Injectable()
export class ToppingService {

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  getToppings() {
    let url = `${ URL_SERVICES }/toppings`;
    return this.http.get(url, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    });
  }

  addTopping( topping:Topping ) {
    let url = `${ URL_SERVICES }/toppings`;

    return this.http.post(url, topping, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    }).map( (res: any) => {
        console.log("The Topping was created")
        return res;
    });
  }

  deleteTopping(id: string ) {
    let url = `${ URL_SERVICES }/toppings/${ id }`;
    
    return this.http.delete(url, {
      headers: {'Authorization': `Token ${ this._userService.token }`}
    }).map( (res: any) => {
        console.log("The topping was deleted")
        return res;
    });
  }
}
