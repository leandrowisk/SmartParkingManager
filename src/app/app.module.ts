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


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
            BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            BrowserAnimationsModule,
            MaterialModule,
            CommonModule,
            SideMenuPageModule
          ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
