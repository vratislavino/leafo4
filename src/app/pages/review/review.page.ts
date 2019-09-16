import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';
import { RatingProvider } from 'src/app/providers/rating/rating';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  constructor(private router:Router, private leafoInfo: LeafoInfoProvider, private ratingProv: RatingProvider, private vc: ViewContainerRef) { }

  ngOnInit() {
  }

  
  text = "";

  public sendNewReview() {
    console.log(this.text);
    this.ratingProv.sendReview(this.text).subscribe(data => {
      if(data["Error"] == undefined) {
        this.leafoInfo.createAndShowLeafoBubble(this.vc, "Děkuji za zpětnou vazbu.", "Děkuji", LeafoInfoType.Happy, ()=> {
          this.router.navigate(["/home"]);
        });
      } else {
        this.leafoInfo.createAndShowLeafoBubble(this.vc,  "Něco se pokazilo při ukládání! " + data["Error"], "Omlouvám se", LeafoInfoType.Sad, ()=> {
          this.router.navigate(["/home"]);
        });
      }
    })
  }

}
