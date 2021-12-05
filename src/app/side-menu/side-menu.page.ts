import { Component, ElementRef, 
         EventEmitter, Input,
         OnInit, Output, ViewChild }   from '@angular/core';
import { NavigationStart, Router }                      from '@angular/router';
import { AlertController }             from '@ionic/angular';
import { MenuService } from '../services/menu.service';

@Component({ 
  selector: 'side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  public isOpen: boolean = false;
  public count: number = 0;
  public register: boolean = false;
  public monitoring: boolean = false;
  public out: boolean = false;
  public services: boolean = false;
  public management: boolean = false;
  public leasesManagement: boolean = false;
  public isMenuChange: boolean = false;
  @Output() logged: EventEmitter<boolean> = new EventEmitter();

  @Output() menuState: EventEmitter<boolean> = new EventEmitter();
  @Input() initApp: boolean = false;

  constructor(private alert: AlertController,
              private router: Router,
              private menuService: MenuService) { }


  ngOnInit() {
    this.menuState.emit(this.isMenuChange);
    this.parkingMonitoring();
    this.userLogged();
    this.backToLogin();
  }

  async logout() {
    this.changeActive();
    this.out = true;
    const alert = await this.alert.create({
       message: 'Tem certeza que deseja sair',
       buttons: ['Cancelar', 'Sair']
     });
     alert.present();
  }

  changeActive() {
    this.register = false;
    this.monitoring = false;
    this.out = false;
    this.services = false;
    this.leasesManagement = false;
    this.management = false;
    this.resize();
  }

  registration() {
    this.changeActive();
    this.register = true;
    this.router.navigate(['/registration']) 
  }

  parkingMonitoring() {
    this.changeActive();
    this.monitoring = true;
    this.router.navigate(['/parking-monitoring']) 
  }

  servicesMonitoring() {
    this.changeActive();
    this.services = true;
    this.router.navigate(['/services-monitoring']) 
  }

  parkingManagement() {
    this.changeActive();
    this.management = true;
    this.router.navigate(['/parking-manager']) 
  }

  leaseManagement() {
    this.changeActive();
    this.leasesManagement = true;
    this.menuState.emit(this.isOpen)
    this.router.navigate(['/lease-management']) 
  }

  showMenu() {
    let menuFirstLine = document.getElementById('line-1');
    let menuSecondLine = document.getElementById('line-2');
    let menuThirdLine = document.getElementById('line-3');

    if (!this.isOpen) {
      this.isOpen = true;
      this.menuService.menuOpened();
      document.getElementById('menu-content').classList.remove('close-menu');
      document.getElementById('menu-content').classList.add('open-menu');
      document.getElementById('first').classList.remove('space');
      menuFirstLine.classList.add('rotate1');
      menuSecondLine.classList.add('rotate2');
      menuThirdLine.classList.add('rotate3');
      this.count += 1; 
    }  
    else{
      this.isOpen = false;
      this.menuService.menuClosed();
      document.getElementById('menu-content').classList.remove('add-menu');
      document.getElementById('menu-content').classList.add('close-menu');
      document.getElementById('first').classList.add('space');
      if (this.count >=1) {
        menuFirstLine.classList.remove('rotate1');
        menuSecondLine.classList.remove('rotate2');
        menuThirdLine.classList.remove('rotate3');
      }
    }
  }

  backToLogin() {
    window.onpopstate = () => {
      this.router.events.subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate' && (event.url == '/login' || event.url == '/register')) {
          window.history.forward();
        }
        else
          this.changeTabInBack(event.url)
      })
  }
}

userLogged() {
  this.logged.emit(true);
}

changeTabInBack(url: string) {
  switch(url) {
    case '/registration':
      this.changeActive();
      this.register = true;
      break;
      case '/parking-monitoring':
        this.changeActive();
        this.monitoring = true;
        break;
        case '/services-monitoring':
          this.changeActive();
          this.services = true;
          break;
          case '/parking-manager':
            this.changeActive();
            this.management = true;
            break;
            case '/lease-management':
              this.changeActive();
              this.leasesManagement = true;
              break;
  }
}

resize() {
  if (this.isOpen)
    this.menuService.menuOpened();
  else
    this.menuService.menuClosed();
}

}
