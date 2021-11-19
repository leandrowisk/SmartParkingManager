import { Injectable } from '@angular/core';
import { services }   from '../mocks/services-mock';
import { of }         from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  getServices() {
    return of(services)
  }
}
