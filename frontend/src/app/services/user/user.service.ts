import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadStorage();
   }

  saveInStorage( id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu || []));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  isLogged() {
    return ( this.token.length > 5 ) ? true : false;
  }

  login( user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICES + '/rest-auth/login/';

    const headers = new HttpHeaders({'Content-Type':'application/json;'});

    return this.http.post(url, user)
      .map( (res: any) => {
        this.saveInStorage(user._id, res.token, res.user, res.menu);
        return true;
      })
      .catch( (err: any) => {
        // console.log('Error en el login', err.error.message, 'error');
        console.log(err);
        return Observable.throw(err);
      });
  }

  createUser( user: User) {
    let url = URL_SERVICES + '/rest-auth/registration/';

    return this.http.post(url, user)
      .map( (res: any) => {
        console.log('User Created', user.email, 'success');
        return res.user;
      })
      .catch( (err: any) => {
        // una alternativa es crear un servicio de menejo de errores
        // este guarde en un log y mandar al server backend
        // console.log(err.error.message, err.error.error.message, 'error');
        console.log(err);
        return Observable.throw(err);
      });
  }

  updateUser( user: User) {

    let url = `${ URL_SERVICES }/user/${ user._id }?token=${ this.token }`;
    return this.http.put(url, user)
      .map( (res: any) => {

        if ( user._id === this.user._id) {
          let userDB: User = res.user;
          this.saveInStorage(userDB._id, this.token, userDB, this.menu);
        }

        console.log('User Updated', user.username, 'success');
        return true;
      })
      .catch( (err: any) => {
        // una alternativa es crear un servicio de menejo de errores
        // este guarde en un log y mandar al server backend
        console.log(err.error.message, err.error.error.message, 'error');
        return Observable.throw(err);
      });
  }

  loadUsers( since: number = 0) {
    let url = URL_SERVICES + '/user?since=' + since;

    return this.http.get(url);
  }

  findUsers( term: string ) {
    let url = URL_SERVICES + '/search/coleccion/usuarios/' + term;
    return this.http.get(url)
      .map((res: any) => res.usuarios);
  }

  deleteUser( id: string) {
    let url = `${ URL_SERVICES }/user/${ id }?token=${ this.token }`;
    return this.http.delete(url).map( res => {
      console.log('Usuario eliminado', 'El usuario a sido eliminado correctamente', 'success');
      return true;
    });
  }

}
