import { Injectable }  from '@angular/core';
import { leases }      from '../mocks/leases-mock';
import { RequestService }        from './request.service';
import { Observable, of }         from "rxjs";
import { HttpClient, 
  HttpParams }             from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  public path;

  constructor(      private httpClient: HttpClient,
    private _requests: RequestService) { }

  getLeases(): Observable<any> {
    this.path = this._requests.api() + '/historicMgn';
    //let params = new HttpParams().set('id_estabelecimento', id);
    return this.httpClient.get<any[]>(this.path);
  }

  getLeasesDetails(): Observable<any> {
    this.path = this._requests.api() + '/historicMgnDetail';
    //let params = new HttpParams().set('id_estabelecimento', id);
    return this.httpClient.get<any[]>(this.path);
  }

  balanceFiveDays(): Observable<any> {
    this.path = this._requests.api() + '/balanceFiveDays';
    //let params = new HttpParams().set('id_estabelecimento', id);
    return this.httpClient.get<any[]>(this.path);
  }

  balanceFiveMonths(): Observable<any> {
    this.path = this._requests.api() + '/balanceFiveMonths';
    //let params = new HttpParams().set('id_estabelecimento', id);
    return this.httpClient.get<any[]>(this.path);
  }
  
}
