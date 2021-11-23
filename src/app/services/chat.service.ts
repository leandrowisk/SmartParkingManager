import { Observable, of }         from "rxjs";
import { Injectable }             from '@angular/core';
import { User }                   from '../interfaces/User';
import { HttpClient, 
         HttpParams }             from '@angular/common/http';
import { RequestService }        from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public path: string;

  constructor(
    private httpClient: HttpClient,
    private _requests: RequestService
    ) { }

  toChat(params:Object): Observable<any> {
    this.path = this._requests.api() + '/ia';
    return this.httpClient.post(this.path,{"question":params});
}
}
