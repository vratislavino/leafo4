import { Component, OnInit } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountProvider } from './providers/account/account';
import { SystemInfoProvider } from './providers/system-info/system-info';
import { NotificationProvider } from './providers/notification/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  isUserLoggedIn = false;
  version = '';
  user:any = null;

  public pages = [
    { title: 'Domů', url: 'home', icon: "home"},
    { title: 'Profil', url: 'profile', icon: "person" },
    { title: 'Citáty', url: 'quotes', icon: "quote" },
    { title: 'Rady', url: 'advices', icon: "happy" },
    { title: 'Kalendář', url: 'calendar', icon: "calendar" },
    { title: 'Strom štěstí', url: 'tree', icon: "leaf" },
    { title: 'Nastavení', url: 'settings', icon: "settings" }
  ];

  constructor(
    private router: Router,
    private events: Events,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public ac: AccountProvider,
    public systemInfoService : SystemInfoProvider,
    public notifProivder : NotificationProvider
  ) {
    this.initializeApp();
    this.listenToLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.platform.ready().then(()=> {
      this.ac.ready().then(()=> {
        this.setUpTasksForUser(this.ac.getAuthData());
        this.isUserLoggedIn = this.ac.isLoggedIn();
        this.user = this.ac.getAuthData();
        if(this.isUserLoggedIn)
          this.ac.initUser();
        //this.version = this.systemInfoService.getAppVersion();
        this.setPageForUser(this.user);
      });
    });
  }

  
  private listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.isUserLoggedIn = true;
      this.router.navigate(['/home']);
      this.setUpTasksForUser(this.ac.getAuthData());
    });
    this.events.subscribe('user:logout', () => {
      this.isUserLoggedIn = false;
      this.router.navigate(['/login']);
      //this.setPageForUser(this.ac.getAuthData());
      this.tearDownTasksForUser();
    });
  }

  private tearDownTasksForUser() {
    
    this.disableNotificationsForUser();
    /*
    this.repeatedTaskService.remove('uploadQueue');*/
  }
  private setUpTasksForUser(authData: any) {
    this.scheduleNotificationsForUser();

    /*
    let role = authData ? authData.role : '';
    switch (role) {
      case 'DRIVER':
        this.repeatedTaskService.add('uploadQueue', 5 * 1000, () => {
          this.uploadQueueService.processNext();
        });
        this.repeatedTaskService.start('uploadQueue');
        break;
      default:
        break;
    }*/
  }

  private disableNotificationsForUser() {
    //this.notifProivder.removeNotifications();
  }

  private scheduleNotificationsForUser() {
    //this.notifProivder.setUpNotifications();
  }

  onLogout(event: any) {
    this.ac.logout();
    console.log("LOGGING OUT");
  }

  private setPageForUser(authData: any) {
    //this.router.setRoot(TestingPage);
    //this.router.navigate(this.isUserLoggedIn ? ["/home", {"user": authData}] : ["/login"], );
  }

  isLoggedIn(): boolean {
    return this.ac.isLoggedIn();
  }
}
