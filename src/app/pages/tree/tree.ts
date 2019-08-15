import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { RatingProvider } from './../../providers/rating/rating';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { LeafoInfoType } from '../../components/info-leafo/info-leafo';
import { Router } from '@angular/router';
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

  coords = [
    { x: 24, y: 43 },
    { x: 38, y: 31 },
    { x: 59, y: 44 },
  ]

  coordsGolden = { x: 46, y: 22 };

  constructor(private router:Router,
    public ac: AccountProvider,
    public userService: UserProvider,
    private leafoInfo: LeafoInfoProvider,
    private vc: ViewContainerRef,
    private rp: RatingProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TreePage');
    this.initTree();
    this.initApples();
  }

  setWatering() {
    this.userService.setWatering(this.newWatering).subscribe(val => {

      console.log("new watering set");
      this.router.navigate(["/home"]);
    });
  }

  initTree() {
    this.userService.getTreeState().subscribe(val => {
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

      this.leafoInfo.createAndShowLeafoBubble(this.vc, apple.collectible, "Chyba", LeafoInfoType.Sad, null, null);
      
      return;
    }

    var appleId = apple.id_da;
    var color = apple.id_ra != undefined ? 1 : 2;

    this.leafoInfo.createAndShowLeafoBubble(this.vc, apple.text,
      color == 1 ? "Červené jablko" : "Zlaté jablko",
      color == 1 ? LeafoInfoType.RedApple : LeafoInfoType.GoldenApple, () => {

        console.log("Clicked yes!");
        this.rp.collectApple(appleId, this.leafoInfo.getAnswers()).subscribe((data) => {


          if (data["Answer"] != undefined) {
            this.onAppleTaken(apple);
          } else {
            this.leafoInfo.createAndShowLeafoBubble(this.vc, data["Error"], "Chyba!", LeafoInfoType.Sad, null, null);
          }
        })
      }, () => {
        console.log("Clicked no!");
      });
  }

  onAppleTaken(apple) {
    this.apples.splice(this.apples.indexOf(apple), 1);
    this.leafoInfo.createAndShowLeafoBubble(this.vc, "Jablko sebráno", "Hotovo!", LeafoInfoType.Sad, null, null);
  }

  zalij() {
    var date = new Date();
    console.log("Date: " + date.getTime());
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
        this.userService.getTreeState().subscribe(val => {
          this.currentWatering = val["tree_state"];
          this.lastWatering = val["lastWatering"];
          this.wateredAt = this.parseDate(this.lastWatering);
        }, error => {
          console.log("Tree state: error");
        });
      }, error => {
        console.log("Set tree state: error");
      });
    } else {
      console.log("Nezalivej s prazdnou konvici... To upe nefunguje hele.");
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