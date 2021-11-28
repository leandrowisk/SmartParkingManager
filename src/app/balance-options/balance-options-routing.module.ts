import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceOptionsPage } from './balance-options.page';

const routes: Routes = [
  {
    path: '',
    component: BalanceOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceOptionsPageRoutingModule {}
