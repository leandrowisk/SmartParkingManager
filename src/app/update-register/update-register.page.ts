import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ParkingService}          from '../services/parking.service'
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-update-register',
  templateUrl: './update-register.page.html',
  styleUrls: ['./update-register.page.scss'],
})
export class UpdateRegisterPage implements OnInit {
  public isMenuOpen: boolean = false;
  public imageUrl: string ;
  public fantasyName: string = 'ParkingSolutions';
  public vacanciesNumber: number = 4;
  public email: string = "parkin_solutions@gmail.com";
  public cnpj: string = '07.527.986/0045-24';
  public address: string = 'Rua das Árvores';
  public dailyValue: number = 80;
  public hourValue: number = 35;
  public monthlyVacanciesNumber: number = 2;
  public socialReason: string = 'ParkingSolutions';
  public monthlyValue: number = 120;
  public menuHistory: boolean = true;

  public parkingData = {
    "fantasy_name": "",
    "vacancies_number":0,
    "company_email":"",
    "hour_price":0,
    "company_address":"",
    "daily_price":0,
    "cnpj":"",
    "monthly_vacancies":0,
    "social_reason":"",
    "monthly_price":0,
    "apresentation_image":"",
    "password":"",
}       

  constructor(private location: Location,
              private userService: UserService,
              private parkingService : ParkingService,
              private route: ActivatedRoute,
              private menuService: MenuService) { }

  ngOnInit() {
    this.resize();
    this.getParking();
  }

  removePhoto() {
    this.parkingData.apresentation_image = '';
  }

  getParking(){
    this.parkingService.getParking().subscribe(response => {
      this.parkingData = response;
      this.imageUrl = this.parkingData.apresentation_image;
      this.fantasyName = this.parkingData.fantasy_name;
      this.vacanciesNumber=this.parkingData.vacancies_number;
      this.email=this.parkingData.company_email;
      this.cnpj=this.parkingData.cnpj;
      this.address=this.parkingData.company_address;
      this.dailyValue=this.parkingData.daily_price;
      this.hourValue=this.parkingData.hour_price;
      this.monthlyVacanciesNumber=this.parkingData.monthly_vacancies;
      this.socialReason=this.parkingData.social_reason;
      this.monthlyValue=this.parkingData.monthly_price;
    });
  }

  resize() {
    this.menuService.isMenuOpen.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      })   
  }

  imageSelected(event) {
    // this.imageUrl = image.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.parkingData.apresentation_image = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}


  goBack() {
    this.location.back();
  }
}
