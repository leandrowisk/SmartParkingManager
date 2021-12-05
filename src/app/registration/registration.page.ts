import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService }            from '../services/menu.service';
import { ParkingService}          from '../services/parking.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public isMenuOpen: boolean = false;
  public menuHistory: boolean = false;
  constructor(private route: ActivatedRoute,
              private parkingService : ParkingService,
              private router: Router,
              private menuService: MenuService) { }

  public parkingData = {
        "fantasy_name": "",
        "vacancies_number":"",
        "company_email":"",
        "hour_price":"",
        "company_address":"",
        "daily_price":"",
        "cnpj":"",
        "monthly_vacancies":"",
        "social_reason":"",
        "monthly_price":"",
        "apresentation_image":"",
        "password":"",
  }             
  ngOnInit() {
   this.resize();
   this.getParking()
  }

  getParking(){
    this.parkingService.getParking().subscribe(response => {
        this.parkingData = response;
    });
  }
  
  resize() {
    this.menuService.isMenuOpen.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      })   
  }

  updateRegister() {
    this.router.navigate(['/update-register', {isMenuOpen: this.isMenuOpen}])
  }
}
