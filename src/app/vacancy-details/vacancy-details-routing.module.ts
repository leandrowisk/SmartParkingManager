import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacancyDetailsPage }   from './vacancy-details.page';

const routes: Routes = [
  {
    path: '',
    component: VacancyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyDetailsPageRoutingModule {}
