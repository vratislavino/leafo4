import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { RatingProvider } from './../../providers/rating/rating';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { LeafoInfoType } from '../../components/info-leafo/info-leafo';
import { Router } from '@angular/router';
import { GuideProvider } from 'src/app/providers/guide/guide';
import { Platform } from '@ionic/angular';

/**
 * Generated class for the TreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tree',
  templateUrl: 'tree.html',
  styleUrls: ['tree.scss'],
  providers: [AccountProvider]
})
export class TreePage {
  newWatering = 0;
  lastWatering: Date;
  currentWatering: number = 0;
  uschlyStrom = "Uschly strom.png";
  treeArr = [
    "1.png", "2.png", "3.png", "4.png"
  ];
  wateredAt: string;
  apples = [];
  remaining = 0;

  goldAnimationRunning = false;

  coords = [
    { x: 24, y: 43 },
    { x: 38, y: 31 },
    { x: 59, y: 44 },
  ]

  coordsGolden = { x: 46, y: 22 };

  constructor(
    private platform:Platform,
    private router:Router,
    public ac: AccountProvider,
    public userService: UserProvider,
    private lip: LeafoInfoProvider,
    private vc: ViewContainerRef,
    private rp: RatingProvider,
    private gp: GuideProvider,) {
      platform.ready().then(() => {
        this.ionViewDidLoad();
      });
  }

  tryToShowGuide(gp) {
    let guide = gp.getAvailableGuideToSee("tree");
    console.log(guide);
    if(guide)
      this.lip.createAndShowLeafoBubble(this.vc, guide.text, guide.headline, LeafoInfoType.Normal, ()=>{
        this.gp.addSeen(guide);
        //this.gp.showEm();
        setTimeout(()=>this.tryToShowGuide(gp), 250);
        
      });
  }

  ionViewDidLoad() {
    this.tryToShowGuide(this.gp);
    console.log('ionViewDidLoad TreePage');
    this.initTree();
    this.initApples();
  }

  ionViewDidEnter() {
  }

  setWatering() {
    this.userService.setWatering(this.newWatering).subscribe(val => {

      console.log("new watering set");
      this.router.navigate(["/home"]);
    });
  }

  initTree() {
    this.userService.getTreeState().subscribe(val => {
      console.log("Here");
      //console.log(document.getElementsByClassName('animated')[0]);
      this.remaining = val["remaining"];
      this.currentWatering = this.parseTreeState(val["tree_state"]);
      this.lastWatering = val["lastWatering"];
      this.newWatering = this.currentWatering;
      var date: Date = new Date(this.lastWatering);
      //this.wateredAt = date.getDay() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear();
      this.wateredAt = this.parseDate(this.lastWatering);

      if (new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7).getTime() < new Date().getTime()) {
        this.currentWatering = -1;
        console.log("Starší o 7 dní");
      } else if (new Date(date.getTime() + 1000 * 60 * 60 * 24 * 3).getTime() < new Date().getTime()) {
        this.currentWatering = -1;
        console.log("Starší o 3 dny");
      }
      console.log("Load");
      console.log(new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7) + " " + new Date());
      
      console.log("TreeState: " + this.currentWatering);
    }, error => {
      console.log("Tree state: error");
    });

  }

  initApples() {
    this.rp.getApplesForCurrentTree().subscribe(data => {

      let arr = [];

      //red apples
      if (data[0] != undefined && data[0] != null) {
        let x = 0;
        data[0].forEach(ap => {
          ap.x = this.coords[x].x;
          ap.y = this.coords[x++].y;
          arr.push(ap);
        })
      }

      //golden apples
      if (data[1] != null && data[1] != undefined) {
        let x = 0;
        data[1].x = this.coordsGolden.x;
        data[1].y = this.coordsGolden.y;
        arr.push(data[1]);
      }
      this.apples = arr;
      console.log(this.apples);
    });
  }

  async startAnimation() {
    console.log(document.getElementsByClassName('animated')[0]);
    let animatedC = document.getElementsByClassName('animated')[0];
    let lFirst: HTMLElement = <HTMLElement>document.getElementsByClassName("first")[0];
    let lSecond: HTMLElement = <HTMLElement>document.getElementsByClassName("second")[0];
    let lThird: HTMLElement = <HTMLElement>document.getElementsByClassName("third")[0];
    let x = 0;
    let height = window.innerHeight;
    console.log(height);
    while(x < height - 100) {
      x += 1;
      lFirst.setAttribute("style", "top: " + x + "px;");
      lSecond.setAttribute("style", "top: " + x + "px;");
      lThird.setAttribute("style", "top: " + x + "px;");
      console.log("X: " + x);
      await this.delay(10);
    }
    lFirst.setAttribute("style", "top: " + x + "px;animation: unset;");
    lSecond.setAttribute("style", "top: " + x + "px;animation: unset;");
    lThird.setAttribute("style", "top: " + x + "px;animation: unset;");
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getSrc(ap) {
    if (ap.id_ra != undefined)
      return "../assets/imgs/aNormal.png";
    return "../assets/imgs/aGolden.png"
  }

  getX(perc) {
    let width = document.getElementById("treediv").getBoundingClientRect().width;
    return width / 100.0 * perc + "px";
  }

  getY(perc) {
    let height = document.getElementById("treediv").getBoundingClientRect().height;
    return height / 100.0 * perc + "px";
  }

  goToCalendar() {
    this.router.navigate(["/calendar"]);
  }

  appleClick(apple) {

    if(apple.collectible !== true) {

      this.lip.createAndShowLeafoBubble(this.vc, apple.collectible, "Chyba", LeafoInfoType.Sad, null, null);
      
      return;
    }

    var appleId = apple.id_da;
    var color = apple.id_ra != undefined ? 1 : 2;

    console.log(apple);

    this.lip.createAndShowLeafoBubble(this.vc, apple.text,
      color == 1 ? "Červené jablko" : "Zlaté jablko",
      color == 1 ? LeafoInfoType.RedApple : LeafoInfoType.GoldenApple, () => {

        console.log("Clicked yes!");
        this.rp.collectApple(appleId, this.lip.getAnswers()).subscribe((data) => {


          if (data["Answer"] != undefined) {
            this.onAppleTaken(apple);
          } else {
            this.lip.createAndShowLeafoBubble(this.vc, data["Error"], "Chyba!", LeafoInfoType.Sad, null, null);
          }
        })
      }, () => {
        console.log("Clicked no!");
      });
  }

  onAppleTaken(apple) {
    this.apples.splice(this.apples.indexOf(apple), 1);
    this.lip.createAndShowLeafoBubble(this.vc, "Jablko sebráno", "Hotovo!", LeafoInfoType.Sad, null, null);
  }

  zalij() {
    var date = new Date();
    console.log("Date: " + date.getTime());
    // jestli je poslední zalití +23h menší jak dnešek -> jestli je dneska nezalito => můžu zalívat
    var bool = new Date(new Date(this.lastWatering).getTime() + 1000 * 60 * 60 * 23).getTime() < new Date().getTime() ? true : false;
    console.log("Bool: " + bool);
    console.log("LastWatering: " + this.lastWatering);
    let konev: HTMLElement = <HTMLElement>document.getElementsByClassName('konvicka')[0];
    let kapky: HTMLElement = <HTMLElement>document.getElementsByClassName('kapky')[0];
    konev.setAttribute("style", "bottom: 75%; transform: rotate(0deg);");
    setTimeout(function () {
      kapky.setAttribute("style", "display: block;");
    }, 500);
    setTimeout(function () {
      konev.setAttribute("style", "bottom: 0px; ransform: rotate(49deg);");
      kapky.setAttribute("style", "display: none;");
    }, 1000);
    console.log(konev);
    console.log(kapky);
    if (bool) {
      this.userService.setTreeState().subscribe(succ => {
        if(succ["Error"] != undefined) {
          this.lip.createAndShowLeafoBubble(this.vc, "Konvice je prázdná, nelze zalít, ohodnoť nejdříve dnešní den!", "Pozor!", LeafoInfoType.Sad);
          console.log("Nezalivej s prazdnou konvici... To upe nefunguje hele.");
        } else {
          this.userService.getTreeState().subscribe(val => {
            this.currentWatering = val["tree_state"];
            this.lastWatering = val["lastWatering"];
            this.wateredAt = this.parseDate(this.lastWatering);
  
                  /*
                  "Safra, nepovedelo se provést selectSELECT u.water_count, u.lastWatering FROM users as u JOIN day_ratings AS dr ON u.id_u=dr.id_u WHERE u.id_u=1 AND YEAR(dr.date)=YEAR(CURRENT_TIME) AND MONTH(dr.date)=MONTH(CURRENT_TIMESTAMP) AND DAY(dr.date)=DAY(CURRENT_TIMESTAMP);"
                  */ 
            this.initTree();
            this.initApples();
          }, error => {
            console.log("Tree state: error");
          });
        }
      }, error => {
        console.log("Set tree state: error");
      });
    } else {
      
    }
  }

  parseTreeState(ts: number): number {
    var state: number = 0;
    if (ts == 0)
      return ts;
    else if (ts == 1)
      return ts;
    else if (ts == 2)
      return ts;
    return ts;
  }

  parseDate(date): string {
    var double = date.split(' ');
    var parts = double[0].split('-');
    return parts[2] + ". " + parts[1] + ". " + parts[0];
  }

  getCurrentTree() {
    const path = "../assets/imgs/";
    if (this.currentWatering == -1)
      return path + this.uschlyStrom;

    if (this.currentWatering == 1)
      return path + this.treeArr[0];

    if (this.currentWatering == 2)
      return path + this.treeArr[1];

    if (this.currentWatering == 3)
      return path + this.treeArr[2];

    return path + this.treeArr[3];
  }
}