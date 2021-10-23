import { SideMenuPageModule }                 from './../side-menu/side-menu.module';
import { NgModule }                           from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { FormsModule }                        from '@angular/forms';
import { IonicModule }                        from '@ionic/angular';
import { ParkingMonitoringPageRoutingModule } from './parking-monitoring-routing.module';
import { ParkingMonitoringPage }              from './parking-monitoring.page';
import { ChartsModule }                       from 'ng2-charts';
import { MaterialModule }                     from '../material-module.module';
import { NgCircleProgressModule }             from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingMonitoringPageRoutingModule,
    ChartsModule,
    MaterialModule,
    SideMenuPageModule,
    NgCircleProgressModule.forRoot({
      "radius": 20,
      "space": -10,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": false})
  ],
  declarations: [ParkingMonitoringPage]
})
export class ParkingMonitoringPageModule {}
