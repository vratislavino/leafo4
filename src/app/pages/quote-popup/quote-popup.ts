import { Component } from '@angular/core';
import { QuoteProvider } from '../../providers/quote/quote';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Generated class for the QuotePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quote-popup',
  templateUrl: 'quote-popup.html',
})
export class QuotePopupPage {

  author: string = "";
  quote: QuoteModel = new QuoteModel(8, 'Kup si něco hezkého na sebe!', "Já", false, '', 'Vráťo', ['friend']);

  constructor(private router:Router, private route:ActivatedRoute, private quoteProvider: QuoteProvider) {
    
  }

  ionViewWillLoad() {
    this.author = this.route.snapshot.paramMap.get("author");
    //this.quoteProvider.mockAdvice(this.author).subscribe((quote: QuoteModel) => { this.quote = quote;});
  }

  close() {
    this.router.navigate(["/advices"]);
    //this.viewCtrl.dismiss({quote: this.quote.text});
  }

}
