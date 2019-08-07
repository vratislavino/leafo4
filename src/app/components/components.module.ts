import { NgModule } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { CalendarComponent } from './calendar/calendar';
import { InfoLeafoComponent } from './info-leafo/info-leafo';

@NgModule({
	declarations: [CalendarComponent,
	InfoLeafoComponent],
	entryComponents: [InfoLeafoComponent],
	imports: [IonicModule],
	exports: [CalendarComponent,
    InfoLeafoComponent]
})
export class ComponentsModule {}
