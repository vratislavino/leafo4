import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';
import { RatingProvider } from 'src/app/providers/rating/rating';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { Router } from '@angular/router';
import { GuideProvider } from 'src/app/providers/guide/guide';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  constructor(private router:Router, 
    private lip: LeafoInfoProvider, 
    private ratingProv: RatingProvider, 
    private vc: ViewContainerRef,
    private gp: GuideProvider) { }

  ngOnInit() {
    this.tryToShowGuide(this.gp);
  }

  tryToShowGuide(gp) {
    let guide = gp.getAvailableGuideToSee("review");
    console.log(guide);
    if(guide)
      this.lip.createAndShowLeafoBubble(this.vc, guide.text, guide.headline, LeafoInfoType.Normal, ()=>{
        this.gp.addSeen(guide);
        //this.gp.showEm();
        setTimeout(()=>this.tryToShowGuide(gp), 250);
        
      });
  }

  
  text = "";

  public sendNewReview() {
    console.log(this.text);
    this.ratingProv.sendReview(this.text).subscribe(data => {
      if(data["Error"] == undefined) {
        this.lip.createAndShowLeafoBubble(this.vc, "Děkuji za zpětnou vazbu.", "Děkuji", LeafoInfoType.Happy, ()=> {
          this.router.navigate(["/home"]);
        });
      } else {
        this.lip.createAndShowLeafoBubble(this.vc,  "Něco se pokazilo při ukládání! " + data["Error"], "Omlouvám se", LeafoInfoType.Sad, ()=> {
          this.router.navigate(["/home"]);
        });
      }
    })
  }

}
