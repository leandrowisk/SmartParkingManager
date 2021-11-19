import { SideMenuPageModule }        from './../side-menu/side-menu.module';
import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule }       from '@angular/forms';
import { IonicModule }               from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage }              from './register.page';
import { MaterialModule }            from '../material-module.module';
import { MatFormFieldModule }        from '@angular/material/form-field';
import { MatInputModule }            from '@angular/material/input';
import { NgxCurrencyModule }         from 'ngx-currency';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
