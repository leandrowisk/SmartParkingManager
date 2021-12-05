import { LoginPage }          from './login/login.page';
import { NgModule }           from '@angular/core';
import { PreloadAllModules, 
         RouterModule, 
         Routes }             from '@angular/router';
import { AppComponent }       from './app.component';
import { RegisterPage }       from './register/register.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
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
  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'chat-bot',
    loadChildren: () => import('./chat-bot/chat-bot.module').then( m => m.ChatBotPageModule)
  },
  {
    path: 'balance-options',
    loadChildren: () => import('./balance-options/balance-options.module').then( m => m.BalanceOptionsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
