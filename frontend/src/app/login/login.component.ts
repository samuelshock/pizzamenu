import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';


declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  email: string;
  username: string;
  rememberme: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }

  singIn( form: NgForm) {

    if (form.invalid) {
      return;
    }

    let user = new User(form.value.username, form.value.email, form.value.password);

    this._userService.login(user, form.value.rememberme)
      .subscribe( res => this.router.navigate(['/pizza']));
  }

}