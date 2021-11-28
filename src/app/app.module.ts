import { ParkingMonitoringPage } from './parking-monitoring/parking-monitoring.page';
import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { RouteReuseStrategy }      from '@angular/router';
import { IonicModule, 
         IonicRouteStrategy }      from '@ionic/angular';
import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule }          from './material-module.module';
import { CommonModule }            from '@angular/common';
import { SideMenuPageModule }      from './side-menu/side-menu.module';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { HttpClientModule }          from '@angular/common/http';
import { RegisterPageModule }      from './register/register.module';
import { LoginPageModule }         from './login/login.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
            BrowserModule, 
            HttpClientModule,
            IonicModule.forRoot(), 
            AppRoutingModule, 
            BrowserAnimationsModule,
            BrowserModule,
            MaterialModule,
            CommonModule,
            SideMenuPageModule,
            LoginPageModule,
            RegisterPageModule
          ],
  exports: [CommonModule],
  providers: [ParkingMonitoringPage],
  bootstrap: [AppComponent],
})
export class AppModule {}
