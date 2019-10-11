import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
const routes = [
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
        path: 'settings/:fromRegister',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
    },
    {
        path: 'quote-popup/:autor',
        loadChildren: () => import('./pages/quote-popup/quote-popup.module').then(m => m.QuotePopupPageModule)
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
        loadChildren: () => import('./pages/depression/depression.module').then(m => m.DepressionPageModule)
    },
    { path: 'testing',
        loadChildren: () => import('./pages/testing/testing.module').then(m => m.TestingPageModule)
    },
    { path: 'tree/how-to',
        loadChildren: () => import('./pages/how-to/how-to.module').then(m => m.HowToPageModule)
    },
    { path: 'calendar/period',
        loadChildren: () => import('./pages/period/period.module').then(m => m.PeriodPageModule)
    },
    { path: 'review', loadChildren: './pages/review/review.module#ReviewPageModule' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map