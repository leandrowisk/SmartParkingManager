import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';

import { IonicModule }                   from '@ionic/angular';
import { MaterialModule }                from '../material-module.module';
import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage }              from './registration.page';
import { SideMenuPageModule }            from './../side-menu/side-menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    MaterialModule,
    SideMenuPageModule
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
