import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { MenuController }           from '@ionic/angular';
import { CurrencyMaskConfig }       from 'ngx-currency/src/currency-mask.config';

@Component({
  selector: 'app-parking-manager',
  templateUrl: './parking-manager.page.html',
  styleUrls: ['./parking-manager.page.scss'],
})
export class ParkingManagerPage implements OnInit {

  public newService: boolean = false;
  public newPeriod: boolean = false;
  public isMenuOpen: any = false;
  public openHour: string;
  public closeHour: string;
  public dayFrom: string;
  public dayTo: string;
  public dailyHours: Array<String>;
  public weekDays: Array<String>;
  public currencyOption = {prefix: 'R$ ', thousands: '.', decimal: ',', allowNegative: 'false', align: 'left'};
  public menuHistory: boolean = false;
  public container =  document.getElementById('container');


  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.isMenuOpen = this.route.snapshot.paramMap.get('menuState');
    this.resize();
    this.initializeArrays();
  }


  initializeArrays() {
    this.dailyHours = ['00:00','00:30','01:00','01:30','02:00', '02:30', '03:00', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', 
    '07:00', '07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30',
    '23:00', '23:30'];
    this.weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  }


  resize() {
    if(this.menuHistory != this.isMenuOpen) {
      if (this.isMenuOpen) {
        this.menuHistory = true;
      }
      else {
        this.isMenuOpen = false;
        this.menuHistory = false;
      }
    }
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

}
