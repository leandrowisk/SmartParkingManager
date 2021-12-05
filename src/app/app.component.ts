import { Component,
         OnInit}                   from '@angular/core';
import { Subscription }            from 'rxjs';
import { LeaseManagementPage }     from './lease-management/lease-management.page';
import { ParkingManagerPage }      from './parking-manager/parking-manager.page';
import { ParkingMonitoringPage }   from './parking-monitoring/parking-monitoring.page';
import { RegisterPage }            from './register/register.page';
import { RegistrationPage }        from './registration/registration.page';
import { ServicesMonitoringPage }  from './services-monitoring/services-monitoring.page';
import { UpdateRegisterPage }      from './update-register/update-register.page';
import { VacancyDetailsPage }      from './vacancy-details/vacancy-details.page';
import { NavigationEnd, Router }   from '@angular/router';
import { LoginService }            from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public init: any = false;
  public component: any;
  public isOpen: any = false;
  public isMenuOpen: any = false;
  public pages: Array<any>;
  subscription: Subscription;
  public refresh: boolean = false;

  constructor(private router: Router,
              private loginServices:LoginService) {
      this.browserRefresh();
  }
  
  ngOnInit() {
    this.initializeComponents();
    this.loginRefresh();
    this.doLogin();
    this.doRegister();
  }

  initializeComponents(){
    this.pages = [LeaseManagementPage, ParkingMonitoringPage, 
    RegistrationPage, VacancyDetailsPage,
    UpdateRegisterPage, RegisterPage, ServicesMonitoringPage, ParkingManagerPage];
    this.component = this.component instanceof ParkingMonitoringPage
  }

  doLogin(){
    this.loginServices.init.subscribe(login =>{
      this.init = login;
    })
  }

  doRegister(){
    this.loginServices.register.subscribe(register =>{
      this.init = register;
    })
  }

  browserRefresh(loginRefresh?: boolean) {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd &&  event.id === 1 && event.url === event.urlAfterRedirects ) {
        if (this.refresh)
          this.init = false
        else
          this.init = true;
      }
    });
  }

  loginRefresh() {
    this.loginServices.refresh.subscribe(refresh => {
      this.refresh = refresh;
    })
  }

}