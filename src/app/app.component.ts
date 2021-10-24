import { Component, OnInit }       from '@angular/core';
import { LeaseManagementPage }     from './lease-management/lease-management.page';
import { ParkingManagerPage }      from './parking-manager/parking-manager.page';
import { ParkingMonitoringPage }   from './parking-monitoring/parking-monitoring.page';
import { RegisterPage }            from './register/register.page';
import { RegistrationPage }        from './registration/registration.page';
import { ServicesMonitoringPage }  from './services-monitoring/services-monitoring.page';
import { UpdateRegisterPage }      from './update-register/update-register.page';
import { VacancyDetailsPage }      from './vacancy-details/vacancy-details.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public init: boolean = false;
  public isOpen: boolean = false;
  public comp: any;
  public pages: Array<any>;

  constructor() {}
  
  ngOnInit() {
    this.init = true;
    this.pages = [LeaseManagementPage, ParkingMonitoringPage, 
    RegistrationPage, VacancyDetailsPage,
    UpdateRegisterPage, RegisterPage, ServicesMonitoringPage, ParkingManagerPage];
    this.comp = this.comp instanceof ParkingMonitoringPage
  }

  collapse(menuState: boolean) {
    if(menuState)
      this.isOpen = true
    else
      this.isOpen = false;
    this.activated(this.comp, this.isOpen);
  }
 
  activated(comp?: any, isOpen?: boolean) {
    for (let page of this.pages) {
      if (comp) {
        this.comp = comp;
        if(comp instanceof page) {
          if (!isOpen)
            comp.isMenuOpen = this.isOpen;
          else
            comp.isMenuOpen = isOpen;
        }
      }
      else {
        if(this.comp instanceof page) {
          if (!isOpen)
            this.comp.isMenuOpen = this.isOpen;
          else
            this.comp.isMenuOpen = isOpen;
        }
      }
        
    }
  
  }
  

}
