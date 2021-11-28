import { MaterialModule } from './../material-module.module';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { IonicModule }    from '@ionic/angular';

import { BalanceOptionsPageRoutingModule } from './balance-options-routing.module';

import { BalanceOptionsPage }              from './balance-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BalanceOptionsPageRoutingModule,
    MaterialModule
  ],
  declarations: [BalanceOptionsPage]
})
export class BalanceOptionsPageModule {}
