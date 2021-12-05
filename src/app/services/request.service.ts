import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService implements OnInit {

  public apiUrl: string = 'http://127.0.0.1:5000';

  constructor() { }
 
  ngOnInit() {
    this.api();
  }

  api(): string {
	  return this.apiUrl;
  }
}
