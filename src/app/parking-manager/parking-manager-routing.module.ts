import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingManagerPage }   from './parking-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingManagerPageRoutingModule {}
