import { Component, ElementRef, 
         EventEmitter, Input,
         OnInit, Output, ViewChild }   from '@angular/core';
import { Router }                      from '@angular/router';
import { AlertController }             from '@ionic/angular';

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
  @Output() menuState: EventEmitter<boolean> = new EventEmitter();
  @Input() initApp: boolean = false;

  constructor(private alert: AlertController,
              private router: Router) { }


  ngOnInit() {
    this.menuState.emit(this.isMenuChange);
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
  }

  registration() {
    this.changeActive();
    this.register = true;
    this.router.navigate(['/registration', { menuState: this.isOpen }]) 
  }

  parkingMonitoring() {
    this.changeActive();
    this.monitoring = true;
    this.router.navigate(['/parking-monitoring', { menuState: this.isOpen }]) 
  }

  servicesMonitoring() {
    this.changeActive();
    this.services = true;
    this.router.navigate(['/services-monitoring', { menuState: this.isOpen }]) 
  }

  parkingManagement() {
    this.changeActive();
    this.management = true;
    this.router.navigate(['/parking-manager', { menuState: this.isOpen }]) 
  }

  leaseManagement() {
    this.changeActive();
    this.leasesManagement = true;
    this.menuState.emit(this.isOpen)
    this.router.navigate(['/lease-management', { menuState: this.isOpen }]) 
  }

  showMenu() {
    let menuFirstLine = document.getElementById('line-1');
    let menuSecondLine = document.getElementById('line-2');
    let menuThirdLine = document.getElementById('line-3');

    if (!this.isOpen) {
      this.isOpen = true;
      this.menuState.emit(true);
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
      this.menuState.emit(false);
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
}
