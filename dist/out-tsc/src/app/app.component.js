import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, Events, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountProvider } from './providers/account/account';
import { SystemInfoProvider } from './providers/system-info/system-info';
import { NotificationProvider } from './providers/notification/notification';
import { Router } from '@angular/router';
let AppComponent = class AppComponent {
    constructor(router, events, platform, statusBar, splashScreen, ac, systemInfoService, notifProivder, menuCtrl) {
        this.router = router;
        this.events = events;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.ac = ac;
        this.systemInfoService = systemInfoService;
        this.notifProivder = notifProivder;
        this.menuCtrl = menuCtrl;
        this.isUserLoggedIn = false;
        this.version = '';
        this.user = null;
        this.pages = [
            { title: 'Domů', url: 'home', icon: "home" },
            { title: 'Profil', url: 'profile', icon: "person" },
            { title: 'Citáty', url: 'quotes', icon: "quote" },
            { title: 'Rady', url: 'advices', icon: "happy" },
            { title: 'Kalendář', url: 'calendar', icon: "calendar" },
            { title: 'Strom štěstí', url: 'tree', icon: "leaf" },
            { title: 'Nastavení', url: 'settings/0', icon: "settings" },
            { title: 'Zpětná vazba', url: 'review', icon: "chatboxes" }
        ];
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
        this.platform.ready().then(() => {
            this.ac.ready().then(() => {
                this.setUpTasksForUser(this.ac.getAuthData());
                this.isUserLoggedIn = this.ac.isLoggedIn();
                this.user = this.ac.getAuthData();
                if (this.isUserLoggedIn) {
                    //this.ac.initUser();
                    this.menuCtrl.enable(true);
                }
                else {
                    this.menuCtrl.enable(false);
                }
                //this.version = this.systemInfoService.getAppVersion();
            });
        });
    }
    listenToLoginEvents() {
        this.events.subscribe('user:login', (nav) => {
            this.isUserLoggedIn = true;
            this.menuCtrl.enable(true);
            this.setUpTasksForUser(this.ac.getAuthData());
            if (nav)
                this.router.navigate(['/home']);
        });
        this.events.subscribe('user:logout', () => {
            this.isUserLoggedIn = false;
            this.router.navigate(['/login']);
            //this.setPageForUser(this.ac.getAuthData());
            this.tearDownTasksForUser();
        });
    }
    tearDownTasksForUser() {
        this.menuCtrl.close();
        this.menuCtrl.enable(false);
        this.disableNotificationsForUser();
    }
    setUpTasksForUser(authData) {
        this.scheduleNotificationsForUser();
    }
    disableNotificationsForUser() {
        //this.notifProivder.removeNotifications();
    }
    scheduleNotificationsForUser() {
        //this.notifProivder.setUpNotifications();
    }
    onLogout(event) {
        this.ac.logout();
        console.log("LOGGING OUT");
    }
    isLoggedIn() {
        return this.ac.isLoggedIn();
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        Events,
        Platform,
        StatusBar,
        SplashScreen,
        AccountProvider,
        SystemInfoProvider,
        NotificationProvider,
        MenuController])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map