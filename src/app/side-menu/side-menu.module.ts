import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';

import { IonicModule }               from '@ionic/angular';

import { SideMenuPageRoutingModule } from './side-menu-routing.module';

import { SideMenuPage }              from './side-menu.page';
import { MaterialModule }            from '../material-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SideMenuPageRoutingModule,
    MaterialModule
  ],
  declarations: [SideMenuPage],
  exports: [SideMenuPage]
})
export class SideMenuPageModule {}
