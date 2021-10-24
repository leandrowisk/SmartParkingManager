import { Component, OnInit } from '@angular/core';
import { MenuController }    from '@ionic/angular';
import { todayHistory }      from '../interfaces/historic';

@Component({
  selector: 'app-parking-manager',
  templateUrl: './parking-manager.page.html',
  styleUrls: ['./parking-manager.page.scss'],
})
export class ParkingManagerPage implements OnInit {

  public newService: boolean = false;
  public newPeriod: boolean = false;
  public isMenuOpen: boolean = false;

  constructor(private menu: MenuController) { }
  
  ngOnInit() {
  }


  addNewService() {
    if(!this.newService) 
      this.newService = true;
    else
      this.newService = false;
  }

  addNewPeriod() {
    if(!this.newPeriod) 
      this.newPeriod = true;
    else
      this.newPeriod = false;
  }

  displayedColumns: string[] = ['date', 'user', 'name', 'brand', 'period', 'value'];
  diaryHistoric = todayHistory;

}
