import { Injectable, Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { InfoLeafoComponent, LeafoInfoType } from '../../components/info-leafo/info-leafo';

/*
  Generated class for the LeafoInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeafoInfoProvider {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    
  }

  leafo: InfoLeafoComponent = null;

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

  public getLeafoBubble(vc:ViewContainerRef) : InfoLeafoComponent {

    if(this.leafo != null && !this.leafo.isUndefined())
      return this.leafo;

    const compFactory = this.componentFactoryResolver.resolveComponentFactory(InfoLeafoComponent);
    const compRef = vc.createComponent(compFactory);

    this.leafo = <InfoLeafoComponent>compRef.instance; 
    return this.leafo;
  }

  public getAnswers() {
    if(this.leafo == undefined || this.leafo == null)
      return null;

    return this.leafo.getAnswers();
  }

}
