import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { IonicModule }                      from '@ionic/angular';
import { LeaseManagementPageRoutingModule } from './lease-management-routing.module';
import { LeaseManagementPage }              from './lease-management.page';
import { MaterialModule }                   from '../material-module.module';
import { ChartsModule }                     from 'ng2-charts';
import { SideMenuPageModule }               from './../side-menu/side-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaseManagementPageRoutingModule,
    MaterialModule,
    ChartsModule,
    SideMenuPageModule
  ],
  declarations: [LeaseManagementPage]
})
export class LeaseManagementPageModule {}
