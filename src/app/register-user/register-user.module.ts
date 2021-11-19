import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterUserPageRoutingModule } from './register-user-routing.module';
import { RegisterUserPage } from './register-user.page';
import { MaterialModule } from '../material-module.module';
import { NgxMaskModule, IConfig }          from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUserPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [RegisterUserPage]
})
export class RegisterUserPageModule {}
