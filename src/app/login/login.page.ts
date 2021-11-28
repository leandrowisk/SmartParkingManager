import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public hide: boolean = true;
  @Output() initing: EventEmitter<any> = new EventEmitter();
 
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public login() {
    console.log('login') 
    this.initing.emit('olá')   
  }

  register() {
    this.router.navigate(['/register']);
  }

}
