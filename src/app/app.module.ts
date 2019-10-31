// Ionic basic imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

//3rd party for video capture
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

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
import { InfoLeafoComponentModule } from './components/info-leafo/info-leafo.module';
import { InfoLeafoComponent } from './components/info-leafo/info-leafo';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';

import * as Hammer from 'hammerjs';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


library.add(fab);
library.add(fas);

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pan': {direction: Hammer.DIRECTION_ALL }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    InfoLeafoComponentModule,
    FontAwesomeModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InfoLeafoComponent
  ],
  providers: [
    Camera,
    MediaCapture,
    Media, 
    File,
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
    NotificationProvider,
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}
  ]
})
export class AppModule { }
