import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { IonicModule }            from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage }              from './login.page';
import { MaterialModule }         from '../material-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MaterialModule
  ],
  declarations: [LoginPage],
  exports: [LoginPage]
})
export class LoginPageModule {}
