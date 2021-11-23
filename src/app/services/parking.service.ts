import { Observable, of }         from "rxjs";
import { Injectable }             from '@angular/core';
import { User }                   from '../interfaces/User';
import { HttpClient, 
         HttpParams }             from '@angular/common/http';
import { RequestService }        from './request.service';


@Injectable({
    providedIn: 'root',
})


export class ParkingService {
  public path: string;

  constructor(
      private httpClient: HttpClient,
      private _requests: RequestService
    ) { }

    getRatingsMonitor(): Observable<any[]> {
      this.path = this._requests.api() + '/getParkingMonitorFeedback';
      return this.httpClient.get<any[]>(this.path);
  }
    
  getParkingMonitorVacancies(): Observable<any> {
    this.path = this._requests.api() + '/getParkingVacancies';
    return this.httpClient.get<any[]>(this.path);
}

  getVacanciesStatus(): Observable<any> {
    this.path = this._requests.api() + '/getVacanciesStatus';
    return this.httpClient.get<any[]>(this.path);
}

getVacancieDetail(id): Observable<any> {
  this.path = this._requests.api() + '/getVacancieMgn';
  let params = new HttpParams().set('id_estabelecimento', id);
  return this.httpClient.get<any[]>(this.path,{'params' : params});
}

getParkingServices(): Observable<any> {
  this.path = this._requests.api() + '/getServicesMgnActive';
  //let params = new HttpParams().set('id_estabelecimento', id);
  return this.httpClient.get<any[]>(this.path);
}

getParking(): Observable<any> {
  this.path = this._requests.api() + '/parkingData';
  //let params = new HttpParams().set('id_estabelecimento', id);
  return this.httpClient.get<any[]>(this.path);
}



addParkingServices(params: Object){
  this.path = this._requests.api() + '/addParkingService';
  //let params = new HttpParams().set('id_estabelecimento', id);
  return this.httpClient.post(this.path,params);
}


updateParkingServices(params: Object){
  this.path = this._requests.api() + '/updateParkingService';
  //let params = new HttpParams().set('id_estabelecimento', id);
  return this.httpClient.post(this.path,params);
}

getOpeningHours(): Observable<any> {
  this.path = this._requests.api() + '/getOpeningHours';
  //let params = new HttpParams().set('id_estabelecimento', id);
  return this.httpClient.get<any[]>(this.path);
}

updateOpeningHours(params: Object){
  this.path = this._requests.api() + '/updateOpeningHours';
  //let params = new HttpParams().set('id_estabelecimento', id);
  return this.httpClient.post(this.path,params);
}

}
