import { Component, OnInit } from '@angular/core';
import { MenuController }    from '@ionic/angular';
import { service }           from '../interfaces/historic';

@Component({
  selector: 'app-services-monitoring',
  templateUrl: './services-monitoring.page.html',
  styleUrls: ['./services-monitoring.page.scss'],
})
export class ServicesMonitoringPage implements OnInit {

  public isMenuOpen: boolean = false;
  constructor(private menu: MenuController) { }

  menuState(state: boolean) {
    if (state)
      this.isMenuOpen = true;
    else
      this.isMenuOpen = false;
  }


  ngOnInit() {
    this.close();
  }

  close() {  
    this.menu.close();
  }

  
  displayedColumns: string[] = ['name', 'vacancy', 'period'];
  services = service;

}
