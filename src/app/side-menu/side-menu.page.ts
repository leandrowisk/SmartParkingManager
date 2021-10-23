import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController }                          from '@ionic/angular';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  public isOpen: boolean = false;
  public count: number = 0;
  constructor(private alert: AlertController) { }


  ngOnInit() {
    this.isOpen = false;
  }

  ngAfterViewInit() {
  
  }

  async logout() {
    const alert = await this.alert.create({
       message: 'Tem certeza que deseja sair',
       buttons: ['Cancelar', 'Sair']
     });
     alert.present();
  }

  showMenu() {
    let menu = document.getElementById('menu-content');
    let menuFirstLine = document.getElementById('line-1');
    let menuSecondLine = document.getElementById('line-2');
    let menuThirdLine = document.getElementById('line-3');

    if (!this.isOpen) {
      this.isOpen = true;
      menu.className = 'open';
      menuFirstLine.classList.add('rotate1');
      menuSecondLine.classList.add('rotate2');
      menuThirdLine.classList.add('rotate3');
      this.count += 1;
    }  
    else{
      this.isOpen = false;
      menu.className = 'close';
      if (this.count >=1) {
        menuFirstLine.classList.remove('rotate1');
        menuSecondLine.classList.remove('rotate2');
        menuThirdLine.classList.remove('rotate3');
      }
    }
  }
}
