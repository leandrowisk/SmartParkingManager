import { NgModule }           from '@angular/core';
import { PreloadAllModules, 
         RouterModule, 
         Routes }             from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    loadChildren: () => import('./app.module').then(m => m.AppModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'lease-management',
    loadChildren: () => import('./lease-management/lease-management.module').then( m => m.LeaseManagementPageModule)
  },
  {
    path: 'parking-manager',
    loadChildren: () => import('./parking-manager/parking-manager.module').then( m => m.ParkingManagerPageModule)
  },
  {
    path: 'services-monitoring',
    loadChildren: () => import('./services-monitoring/services-monitoring.module').then( m => m.ServicesMonitoringPageModule)
  },
  {
    path: 'update-register',
    loadChildren: () => import('./update-register/update-register.module').then( m => m.UpdateRegisterPageModule)
  },
  {
    path: 'vacancy-details',
    loadChildren: () => import('./vacancy-details/vacancy-details.module').then( m => m.VacancyDetailsPageModule)
  },
  {
    path: 'parking-monitoring',
    loadChildren: () => import('./parking-monitoring/parking-monitoring.module').then( m => m.ParkingMonitoringPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'side-menu',
    loadChildren: () => import('./side-menu/side-menu.module').then( m => m.SideMenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
