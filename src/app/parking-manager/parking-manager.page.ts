import { Component, OnInit }        from '@angular/core';
import { MenuController }           from '@ionic/angular';
import { CurrencyMaskConfig }       from 'ngx-currency/src/currency-mask.config';
import {ParkingService}             from '../services/parking.service'
import { ActivatedRoute, Router }                                 from '@angular/router';

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
  public services = [{service_id: 0, service_name: '', service_price: 0, active: false, backupActive : false}];
  public serviceUpdate = [];
  public serviceName="";
  public serviceQtdDay=0;
  public serviceValue=0;
  public openingHour = {"open": "00:00:00", "close": "00:00:00", "day_week_init": "Segunda-feira", "day_week_end": "Domingo"};
  constructor(private route: ActivatedRoute, private parkingService: ParkingService,public router: Router) { }
  
  ngOnInit() {
    this.isMenuOpen = this.route.snapshot.paramMap.get('menuState');
    this.resize();
    this.initializeArrays();
    this.getParkingServices();
    this.getOpeningHours();
  }


  initializeArrays() {
    this.dailyHours = ['00:00','00:30','01:00','01:30','02:00', '02:30', '03:00', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', 
    '07:00', '07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30',
    '23:00', '23:30'];
    this.weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  }

  getParkingServices() {
    this.serviceName="";
    this.serviceQtdDay=0;
    this.serviceValue=0;

    this.parkingService.getParkingServices().subscribe(response => {
      this.services = response;
    });
  }

  getOpeningHours() {
    this.parkingService.getOpeningHours().subscribe(response => {
      this.openingHour = response;
    });
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

  updateService(service){
    for (let i = 0;i < this.services.length; i++) {
      if(this.services[i].service_id == service.service_id && service.active != this.services[i].backupActive){
        this.parkingService.updateParkingServices(service).subscribe(response => {
          if(response['mensagem'] == 'true'){
            alert("Serviço Atualizado com Sucesso.")
            this.getParkingServices();
          }else{alert(response['mensagem']); }});
      }        
    }
  }

  updateOpeningHour(){

    let json = {
        "open": this.openingHour.open, 
        "close": this.openingHour.close,
        "day_week_init":this.openingHour.day_week_init,
        "day_week_end":this.openingHour.day_week_end
      }
    
    let hrOpen = this.openingHour.open.split(":")[0];
    let minuteOpen = this.openingHour.open.split(":")[1];

    let hrClose = this.openingHour.close.split(":")[0];
    let minuteClose = this.openingHour.close.split(":")[1];

    
    if(parseInt(hrOpen) < parseInt(hrClose)){

      this.parkingService.updateOpeningHours(json).subscribe(response => {
        if(response['mensagem'] == 'true'){
          alert("Período de funcionamento atualizado com sucesso.")
        }else{alert(response['mensagem']); }});

    }
    else if(parseInt(hrOpen) == parseInt(hrClose)){
      if(parseInt(minuteOpen) < parseInt(minuteClose)){

        this.parkingService.updateOpeningHours(json).subscribe(response => {
          if(response['mensagem'] == 'true'){
            alert("Período de funcionamento atualizado com sucesso.")
          }else{alert(response['mensagem']); }});

      }
      else{
          alert("O horário de abertura não pode ser superior ao horário de fechamento");
      }
    }
    else{
      alert("O horário de abertura não pode ser superior ao horário de fechamento");
  }

  }


  addNewServiceValues(){
   let json = {
    "serviceName":this.serviceName,
    "serviceQtdDay":this.serviceQtdDay,
    "serviceValue":this.serviceValue
  }
    if(json.serviceName !="" && json.serviceQtdDay > 0 && json.serviceValue > 0){
    this.parkingService.addParkingServices(json).subscribe(response => {
      if(response['mensagem'] == 'true'){
        alert("Serviço adicionado com Sucesso.")
        this.getParkingServices();
      }else{alert(response['mensagem']); }
    });

    }
    else{
      alert("Erro ao adicionar serviço. Verifique se os dados estão corretos"); 
    }
  }
  
}
