import { Component, OnInit }        from '@angular/core';
import { Location }                 from '@angular/common';
import { ActivatedRoute, Router }   from '@angular/router';
import { FormBuilder, 
         FormGroup }                from '@angular/forms';
import { Parking }                  from '../interfaces/Parking';
import { LoginService }             from '../services/login.service';
import { MenuService }              from '../services/menu.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public hide: boolean = true;
  public isMenuOpen: boolean = false;
  public company: Parking;
  public imageUrl: string;
  public dailyHours: Array<String>;
  public weekDays: Array<String>;
  public dayFrom: string;
  public dayTo: string;
  public openHour: string;
  public closeHour: string;
  public currencyOption = {prefix: 'R$ ', thousands: '.', decimal: ',', allowNegative: 'false', align: 'left'};

  register: FormGroup;
  constructor(private location: Location,
              private _formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private menuService: MenuService) { }

  ngOnInit() {
    this.initializeArrays();
    this.resize();
    this.pageRefresh();
  }

  imageSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}

  removePhoto() {
    this.imageUrl = '';
  }

  initializeArrays() {
    this.dailyHours = ['00:00','00:30','01:00','01:30','02:00', '02:30', '03:00', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', 
    '07:00', '07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30',
    '23:00', '23:30'];
    this.weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  }

  initializeCompany() {
    this.company.fantasy_name = '';
    this.company.vacancies_number = 0;
    this.company.company_email = '';
    this.company.hour_price = 0;
    this.company.daily_price = 0;
    this.company.monthly_price = 0;
    this.company.password = '';
    this.company.vacancies_number = 0;
    this.company.social_reason = '';
    this.company.company_address = '';
  }

  registerUser() {
    this.loginService.registerUser();
  }

  pageRefresh() {
    this.loginService.pageRefresh();
  }

  resize() {
    this.menuService.isMenuOpen.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
    })   
  }

  goBack() {
    this.location.back();
  }

}
