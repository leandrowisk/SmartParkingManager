import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public hide: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/app', { init: true }])
  }

  register() {
    this.router.navigate(['/register']);
  }

}
