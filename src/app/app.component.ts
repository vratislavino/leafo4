import { Component, OnInit } from '@angular/core';

import { Platform, Events, MenuController } from '@ionic/angular';
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
    { title: 'Nastavení', url: 'settings/0', icon: "settings" },
    { title: 'Zpětná vazba', url: 'review', icon: "chatboxes" }
  ];

  constructor(
    private router: Router,
    private events: Events,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public ac: AccountProvider,
    public systemInfoService : SystemInfoProvider,
    public notifProivder : NotificationProvider,
    public menuCtrl: MenuController
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
          {
            //this.ac.initUser();
            this.menuCtrl.enable(true);

          } else {
            this.menuCtrl.enable(false);
          }
        //this.version = this.systemInfoService.getAppVersion();
      });
    });
  }

  
  private listenToLoginEvents() {
    this.events.subscribe('user:login', (nav) => {
      this.isUserLoggedIn = true;
      this.menuCtrl.enable(true);
      this.setUpTasksForUser(this.ac.getAuthData());
      if(nav)
        this.router.navigate(['/home']);
    });
    this.events.subscribe('user:logout', () => {
      this.isUserLoggedIn = false;
      this.router.navigate(['/login']);
      //this.setPageForUser(this.ac.getAuthData());
      this.tearDownTasksForUser();


    });
  }

  private tearDownTasksForUser() {
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    this.disableNotificationsForUser();
  }
  private setUpTasksForUser(authData: any) {
    this.scheduleNotificationsForUser();

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

  isLoggedIn(): boolean {
    return this.ac.isLoggedIn();
  }
}
