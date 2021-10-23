import { MaterialModule }                     from './../material-module.module';
import { NgModule }                           from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { FormsModule }                        from '@angular/forms';
import { SideMenuPageModule }                 from './../side-menu/side-menu.module';
import { IonicModule }                        from '@ionic/angular';

import { ParkingManagerPageRoutingModule }    from './parking-manager-routing.module';

import { ParkingManagerPage }                 from './parking-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingManagerPageRoutingModule,
    MaterialModule,
    SideMenuPageModule

  ],
  declarations: [ParkingManagerPage]
})
export class ParkingManagerPageModule {}
