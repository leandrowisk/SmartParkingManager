import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseManagementPage }  from './lease-management.page';

const routes: Routes = [
  {
    path: '',
    component: LeaseManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaseManagementPageRoutingModule {}
