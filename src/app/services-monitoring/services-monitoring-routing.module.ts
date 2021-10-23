import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { ServicesMonitoringPage } from './services-monitoring.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesMonitoringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesMonitoringPageRoutingModule {}
