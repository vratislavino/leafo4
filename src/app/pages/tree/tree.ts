import { LeafoInfoProvider } from './../../providers/leafo-info/leafo-info';
import { RatingProvider } from './../../providers/rating/rating';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { LeafoInfoType } from '../../components/info-leafo/info-leafo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GuideProvider } from 'src/app/providers/guide/guide';
import { Platform } from '@ionic/angular';
import { DateService } from 'src/app/providers/date/date.service';

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
export class TreePage implements OnInit {
  newWatering = 0;
  lastWatering: Date;
  currentWatering: number = 0;
  
  registeredAtDate:Date
  wateredAtDate:Date;
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
    private route: ActivatedRoute,
    private router:Router,
    public ac: AccountProvider,
    public userService: UserProvider,
    private lip: LeafoInfoProvider,
    private vc: ViewContainerRef,
    private rp: RatingProvider,
    private gp: GuideProvider,
    private ds: DateService) {
      platform.ready().then(() => {
        this.ionViewDidLoad();
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
        const fromReg = parseInt(params["date"]);
        console.log(fromReg);
        if(fromReg===1) {
          this.lip.createAndShowRatingBubble(this.vc, -1, "Nemáš hodnocený dnešní den!", new Date(), (rl, dt, rw)=> {
            console.log("Review:" + rw);
            this.rp.setDayReview(this.ds.toKeyDate(dt), rw).subscribe(()=> {
              this.zalij();
            });
          });
        } 
    });
    /*
    if(this.storage.exists("video")) {
        this.storage.get("video").then(res=> {
            this.mediaFile = JSON.parse(res) || {};
        });
    } else {
        this.mediaFile = [];
    }*/
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
    this.userService.getParsedTreeState().then(val => {
      this.remaining = val["remaining"];
      this.lastWatering = val["lastWatering"];
      this.currentWatering = val["tree_state"];
      this.wateredAt = val["wateredAt"];
      this.wateredAtDate = this.ac.getCopyOfUser().parseDateCz(this.wateredAt);
      this.registeredAtDate = this.ac.getCopyOfUser().registrationDate;
      console.log("-------------------------");
      console.log(this.registeredAtDate);
      this.newWatering = val["newWatering"];

      if(this.currentWatering > 3)
        this.initApples();


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

          console.log("APPLE BUSINESS");
          console.log(data);
          console.log(appleId);
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
    //var bool = new Date(new Date(this.lastWatering).getTime() + 1000 * 60 * 60 * 23).getTime() < new Date().getTime() ? true : false;
    //console.log("Bool: " + bool);
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
      this.userService.setTreeState().subscribe(succ => {
        if(succ["Error"] != undefined) { // je tam errorek!
          if(succ["ErrorCode"] == 1) {
            this.lip.createAndShowLeafoBubble(this.vc, succ["Error"],"Pozor!");
          } else if(succ["ErrorCode"] == 2) {
            this.lip.createAndShowRatingBubble(this.vc, -1, succ["Error"], new Date(), (rl, dt, rw)=> {
              this.rp.setDayReview(this.ds.toKeyDate(dt), rw).subscribe(()=> {
                this.zalij();
              });
            });
          } else {
            this.lip.createAndShowLeafoBubble(this.vc, "Něco se pokazilo...", "Omlouvám se");
          }
        } else {
          this.initTree();
          this.initApples();
        }
      }, error => {
        console.log(error);
      });
  }

  getCurrentTree() {
    return this.userService.getCurrentTree(this.currentWatering);
  }

  getRemaining() {
    if(this.remaining == 0)
      return "Dnes si můžeš vzít jablko!";
    if(this.remaining == -1) 
      return "Dnes už sis vzal jablko!";

    return "Do dalšího jablka zbývá " + this.remaining + " dnů";
  }

  getZalito() {
    if(this.wateredAtDate == undefined || this.registeredAtDate == undefined)
      return "";
    
//console.log(this.wateredAtDate);
//console.log(this.registeredAtDate);

    if(this.currentWatering > 0)
      return this.wateredAt;
   return this.wateredAtDate.getTime() <= this.registeredAtDate.getTime() ? "nikdy" : this.wateredAt;
  }
}