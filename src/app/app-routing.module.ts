import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'quotes',
    loadChildren: () => import('./pages/quotes/quotes.module').then(m => m.QuotesPageModule)
  },
  {
    path: 'advices',
    loadChildren: () => import('./pages/advices/advices.module').then(m => m.AdvicesPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarPageModule)
  },
  {
    path: 'tree',
    loadChildren: () => import('./pages/tree/tree.module').then(m => m.TreePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'quote-popup/:autor',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'graph',
    loadChildren: () => import('./pages/graph/graph.module').then(m => m.GraphPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then(m => m.ProfileEditPageModule)
  },
  {
    path: 'add-note',
    loadChildren: () => import('./pages/add-note/add-note.module').then(m => m.AddNotePageModule)
  },
  {
    path: 'add-notification',
    loadChildren: () => import('./pages/add-notification/add-notification.module').then(m => m.AddNotificationPageModule)
  },
  { path: 'depression', 
    loadChildren: () => import('./pages/depression/depression.module').then(m => m.DepressionPageModule) }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
