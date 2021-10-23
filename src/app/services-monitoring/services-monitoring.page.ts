import { Component, OnInit } from '@angular/core';
import { MenuController }    from '@ionic/angular';
import { service }           from '../interfaces/historic';

@Component({
  selector: 'app-services-monitoring',
  templateUrl: './services-monitoring.page.html',
  styleUrls: ['./services-monitoring.page.scss'],
})
export class ServicesMonitoringPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.close();
  }

  close() {  
    this.menu.close();
  }

  
  displayedColumns: string[] = ['name', 'vacancy', 'period'];
  services = service;

}
