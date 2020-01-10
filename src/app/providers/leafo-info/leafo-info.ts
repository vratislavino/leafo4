import { Injectable, Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { InfoLeafoComponent, LeafoInfoType } from '../../components/info-leafo/info-leafo';
import { RateLeafoComponent } from 'src/app/components/rate-leafo/rate-leafo';

/*
  Generated class for the LeafoInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeafoInfoProvider {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    
  }

  infoleafo = null;
  rateleafo = null;

  public createAndShowLeafoBubble(
    vc:ViewContainerRef, 
    text:string, 
    headline:string="", 
    face:LeafoInfoType=LeafoInfoType.Happy,
    callback1 = null,
    callback2 = null
    ) : InfoLeafoComponent {
    const b = this.getLeafoBubble(vc);
    b.open();
    b.setLeafoFace(face);
    b.setInfo(text, headline);
    b.setCallbacks(callback1, callback2);
    
    return b;
  }

  public createAndShowRatingBubble(
    vc:ViewContainerRef, 
    original:number, 
    day:Date,
    callback = null
  ) {
    const b = this.getRatingBubble(vc);
    b.open();
    b.initRating(original, day);
    b.setCallback(callback);
    return b;
  }

  public getRatingBubble(vc:ViewContainerRef) : RateLeafoComponent {
    if(this.rateleafo != null && !this.rateleafo.isUndefined())
      return this.rateleafo;

      const compFactory = this.componentFactoryResolver.resolveComponentFactory(RateLeafoComponent);
      const compRef = vc.createComponent(compFactory);
  
      this.rateleafo = <RateLeafoComponent>compRef.instance; 
      return this.rateleafo;

  }

  public getLeafoBubble(vc:ViewContainerRef) : InfoLeafoComponent {

    if(this.infoleafo != null && !this.infoleafo.isUndefined())
      return this.infoleafo;

    const compFactory = this.componentFactoryResolver.resolveComponentFactory(InfoLeafoComponent);
    const compRef = vc.createComponent(compFactory);

    this.infoleafo = <InfoLeafoComponent>compRef.instance; 
    return this.infoleafo;
  }

  public getAnswers() {
    if(this.infoleafo == undefined || this.infoleafo == null)
      return null;

    return this.infoleafo.getAnswers();
  }

}
