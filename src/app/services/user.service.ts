import { Injectable } from '@angular/core';
import { users }      from '../mocks/users-mock';
import { of }         from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers() {
    return of(users)
  }
}
