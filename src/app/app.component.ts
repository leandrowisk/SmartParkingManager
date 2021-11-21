import { LoginPage }                from './login/login.page';
import { Component, 
         Input, 
         OnInit }                  from '@angular/core';
import { BehaviorSubject }         from 'rxjs';
import { LeaseManagementPage }     from './lease-management/lease-management.page';
import { ParkingManagerPage }      from './parking-manager/parking-manager.page';
import { ParkingMonitoringPage }   from './parking-monitoring/parking-monitoring.page';
import { RegisterPage }            from './register/register.page';
import { RegistrationPage }        from './registration/registration.page';
import { ServicesMonitoringPage }  from './services-monitoring/services-monitoring.page';
import { UpdateRegisterPage }      from './update-register/update-register.page';
import { VacancyDetailsPage }      from './vacancy-details/vacancy-details.page';
import { ActivatedRoute, Router }  from '@angular/router';
import { Platform }                from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public init;
  public component: any;
  public isOpen: boolean = false
  public pages: Array<any>;
  public open: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: Platform) {}
  
  ngOnInit() {
    if(this.route.snapshot.paramMap.get('init')){
      this.init = true;
    }
    this.pages = [LeaseManagementPage, ParkingMonitoringPage, 
    RegistrationPage, VacancyDetailsPage,
    UpdateRegisterPage, RegisterPage, ServicesMonitoringPage, ParkingManagerPage];
    this.component = this.component instanceof ParkingMonitoringPage 
  }

  resize(menuState: boolean) {
    if(menuState)
      this.isOpen = true;
    else
      this.isOpen = false;
    this.activated(this.component, this.isOpen);
  }
    
  activated(component?: any, isOpen?: boolean) {
    for (let page of this.pages) {
      if (component) {
        this.component = component;
        if(component instanceof page) {
          if (!isOpen) {
            component.isMenuOpen = this.isOpen;
            page[1].isMenuOpen = isOpen;
          }
          else {
            component.isMenuOpen = isOpen;
            page[1].isMenuOpen = isOpen;
          }
        }
      }
      else {
        if(this.component instanceof page) {
          if (!isOpen)
            this.component.isMenuOpen = this.isOpen;
          else
            this.component.isMenuOpen = isOpen;
        }
      }
    }
  }

}