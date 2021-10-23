import { NgModule }                            from '@angular/core';
import { CommonModule }                        from '@angular/common';
import { FormsModule }                         from '@angular/forms';
import { IonicModule }                         from '@ionic/angular';
import { ServicesMonitoringPageRoutingModule } from './services-monitoring-routing.module';
import { ServicesMonitoringPage }              from './services-monitoring.page';
import { MaterialModule }                      from '../material-module.module';
import { SideMenuPageModule }                  from './../side-menu/side-menu.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesMonitoringPageRoutingModule,
    MaterialModule,
    SideMenuPageModule
  ],
  declarations: [ServicesMonitoringPage]
})
export class ServicesMonitoringPageModule {}
