import { NgModule }                        from '@angular/core';
import { CommonModule }                    from '@angular/common';
import { FormsModule }                     from '@angular/forms';
import { IonicModule }                     from '@ionic/angular';
import { VacancyDetailsPageRoutingModule } from './vacancy-details-routing.module';
import { VacancyDetailsPage }              from './vacancy-details.page';
import { MaterialModule }                  from '../material-module.module';
import { SideMenuPageModule }              from '../side-menu/side-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacancyDetailsPageRoutingModule,
    MaterialModule,
    SideMenuPageModule
  ],
  declarations: [VacancyDetailsPage]
})
export class VacancyDetailsPageModule {}
