import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router }            from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public hide: boolean = true;
  @Output() initing: EventEmitter<any> = new EventEmitter();
 
  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.refresh();
  }

  public login() {
    this.loginService.login();
  }

  public register() {
    this.router.navigate(['/register']);
  }

  public refresh() {
    this.loginService.pageRefresh();
  }

}
