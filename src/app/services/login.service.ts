import { EventEmitter, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { users } from '../mocks/users-mock';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public init: EventEmitter<boolean> = new EventEmitter();
  public register: EventEmitter<boolean> = new EventEmitter();
  public refresh: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  
  getUsers(){
    return of(users)
  }

  login(){
    this.init.emit(true);
  }

  registerUser(){
    this.register.emit(true);
  }

  pageRefresh() {
    this.refresh.emit(true)
  }
}
