import { NgModule }                        from '@angular/core';
import { CommonModule }                    from '@angular/common';
import { FormsModule }                     from '@angular/forms';

import { IonicModule }                     from '@ionic/angular';

import { VacancyDetailsPageRoutingModule } from './vacancy-details-routing.module';

import { VacancyDetailsPage }              from './vacancy-details.page';
import { MaterialModule }                  from '../material-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacancyDetailsPageRoutingModule,
    MaterialModule
  ],
  declarations: [VacancyDetailsPage]
})
export class VacancyDetailsPageModule {}
