import { LoginPage }                from './login/login.page';
import { Component, 
         Input, 
         OnInit, 
         ViewChild}                  from '@angular/core';
import { BehaviorSubject, Subscription }         from 'rxjs';
import { LeaseManagementPage }     from './lease-management/lease-management.page';
import { ParkingManagerPage }      from './parking-manager/parking-manager.page';
import { ParkingMonitoringPage }   from './parking-monitoring/parking-monitoring.page';
import { RegisterPage }            from './register/register.page';
import { RegistrationPage }        from './registration/registration.page';
import { ServicesMonitoringPage }  from './services-monitoring/services-monitoring.page';
import { UpdateRegisterPage }      from './update-register/update-register.page';
import { VacancyDetailsPage }      from './vacancy-details/vacancy-details.page';
import { ActivatedRoute, NavigationEnd, Router }  from '@angular/router';
import { Platform }                from '@ionic/angular';
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

  constructor(private route: ActivatedRoute,
              private parkingMonitoring: ParkingMonitoringPage,
              private router: Router,
              private platform: Platform,
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

  /*
  resize(menuState: boolean) {
    if(menuState)
      this.isOpen = true;
    else
      this.isOpen = false;
    this.activated(this.component);
  }
*/
  iniciar(event: any) {
    console.log('chamou iniciar')
    this.init = true;
  }
    
  // activated(component?: any, isOpen?: boolean) {
  //   for (let page of this.pages) {
  //     if (component) {
  //       this.component = component;
  //       if(component instanceof page) {
  //         if (!isOpen) {
  //           component.isMenuOpen = this.isOpen;
  //         }
  //         else {
  //           component.isMenuOpen = isOpen;
  //         }
  //       }
  //     }
  //     else {
  //       if(this.component instanceof page) {
  //         if (!isOpen)
  //           this.component.isMenuOpen = this.isOpen;
  //         else
  //           this.component.isMenuOpen = isOpen;
  //       }
  //     }
  //   }
  // }

/*
  activated(component?: any) {
    if (component) {
      this.component = component;
      this.component.isMenuOpen = this.isOpen;
    }
    else
      this.component.isMenuOpen = this.isOpen;
    this.parkingMonitoring.isMenuOpen = this.isOpen;
    for (let page of this.pages) {
      page.isMenuOpen = this.isOpen;
    }
  }
*/
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