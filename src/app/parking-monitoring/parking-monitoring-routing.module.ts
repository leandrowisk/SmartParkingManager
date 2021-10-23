import { NgModule }              from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { ParkingMonitoringPage } from './parking-monitoring.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingMonitoringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingMonitoringPageRoutingModule {}
