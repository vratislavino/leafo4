import { Component, Input, EventEmitter, Output } from '@angular/core';
import { QuoteModel } from '../../model/QuoteModel.interface';

/**
 * Generated class for the QuoteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quote',
  templateUrl: 'quote.html',
  styleUrls: ['quote.scss']
})
export class QuoteComponent { 

  @Input('quoteObj') quoteObj :QuoteModel;
  @Output() favedClicked = new EventEmitter<QuoteModel>();

  quote: QuoteModel;

  constructor() {
    this.quote = this.quoteObj;
  }

  onFavedClicked() {
    this.favedClicked.emit(this.quoteObj);
  }

  ngAfterViewInit() {
    
  }

}
