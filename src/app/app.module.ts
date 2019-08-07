// Ionic basic imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

// Application pages imports
import { AppComponent } from './app.component';

// 3rd party packages
//import { ChartsModule } from 'ng2-charts';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
/*
import { HomePageModule } from './pages/home/home.module';
import { LoginPageModule } from './pages/login/login.module';
import { RegisterPageModule } from './pages/register/register.module';
import { ProfilePageModule } from './pages/profile/profile.module';
import { QuotesPageModule } from './pages/quotes/quotes.module';
import { AdvicesPageModule } from './pages/advices/advices.module';
import { CalendarPageModule } from './pages/calendar/calendar.module';
import { ProfileEditPageModule } from './pages/profile-edit/profile-edit.module';
import { TreePageModule } from './pages/tree/tree.module';
import { SettingsPageModule } from './pages/settings/settings.module';
import { TestingPageModule } from './pages/testing/testing.module';
*/

// Application providers imports
import { AccountProvider } from './providers/account/account';
import { QuoteProvider } from './providers/quote/quote';
import { RatingProvider } from './providers/rating/rating';
import { MotStorageProvider } from './providers/mot-storage/mot-storage';
import { UserProvider } from './providers/user/user';
import { RequestProvider } from './providers/request/request';
import { SystemInfoProvider } from './providers/system-info/system-info';
import { LeafoInfoProvider } from './providers/leafo-info/leafo-info';
import { NotificationProvider } from './providers/notification/notification';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  providers: [
    Camera,
    AppVersion,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AccountProvider,
    QuoteProvider,
    RatingProvider,
    MotStorageProvider,
    UserProvider,
    RequestProvider,
    SystemInfoProvider,
    LeafoInfoProvider,
    NotificationProvider
  ]
})
export class AppModule { }
