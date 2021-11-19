import { Injectable }  from '@angular/core';
import { leases }      from '../mocks/leases-mock';
import { of }          from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  constructor() { }

  getLeases() {
    return of(leases)
  }
}
