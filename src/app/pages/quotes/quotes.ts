import { Component, ViewContainerRef, ɵConsole } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { QuoteProvider } from '../../providers/quote/quote';
import { LeafoInfoType } from 'src/app/components/info-leafo/info-leafo';
import { GuideProvider } from 'src/app/providers/guide/guide';
import { LeafoInfoProvider } from 'src/app/providers/leafo-info/leafo-info';


/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
  styleUrls: ['quotes.scss'],
  providers: [AccountProvider, QuoteProvider]
})
export class QuotesPage {

  quoteType = "history";
  subCategory = ""; //quotes/me

  historyQuotes: QuoteModel[] = [];
  favoriteQuotes: QuoteModel[] = [];

  constructor( 
    private platform: Platform,
    private quoteProvider: QuoteProvider, 
    public ac: AccountProvider, 
    public tC: ToastController,
    private gp: GuideProvider,
    private vc: ViewContainerRef,
    private lip: LeafoInfoProvider
    ) {


      this.platform.ready().then(() => {
        this.tryToShowGuide(this.gp);
        this.getQuotes();
      });
  }

  tryToShowGuide(gp) {
    let guide = gp.getAvailableGuideToSee("quotes");
    console.log(guide);
    if(guide)
      this.lip.createAndShowLeafoBubble(this.vc, guide.text, guide.headline, LeafoInfoType.Normal, ()=>{
        this.gp.addSeen(guide);
        //this.gp.showEm();
        setTimeout(()=>this.tryToShowGuide(gp), 250);
        
      });
  }

  getQuotes() {

    this.favoriteQuotes = [];
    this.historyQuotes = [];

    this.downloadHistory();
    this.downloadFaved();
    //this.quoteProvider.mockFavoriteQuotes().subscribe((data: QuoteModel[]) => this.favoriteQuotes = data);
    //this.quoteProvider.mockHistoryQuotes().subscribe((data: QuoteModel[]) => this.historyQuotes = data);

  }

  onFavedClicked(quote) {

    this.quoteProvider.setFaved(quote.getId(), quote.faved == 0 ? true : false).subscribe((data) => {
      if (data.result) {
        if (data.result == 1) {
          quote.setFaved(!quote.faved);
          this.getQuotes();
        } else if (data.result == 2) {
          this.showToast("Dosáhl(a) jsi maximálního počtu oblíbených citátů.");
        } else {
          this.showToast("Chyba při zpracování příkazu.");
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  downloadFaved() {
    this.quoteProvider.getFavoriteQuotes().subscribe((data) => {
      this.favoriteQuotes = [];
      var keys = Object.keys(data);
      if(keys.indexOf("Error") > -1) {
        console.log(data[keys[0]]);
        console.log("Error detected");
        return;
      }
      keys.forEach((key) => {
        var quoteObj = data[key];
        var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["author"], quoteObj["faved"]).complete(this.ac.getAddressing());
        this.favoriteQuotes.push(qm);
      });

    }, (err) => {
      console.log(err);
    });
  }

  downloadHistory() {
    this.quoteProvider.getHistoryQuotes().subscribe((data) => {
      this.historyQuotes = [];
      var keys = Object.keys(data);

      if(keys.indexOf("Error") > -1) {
        console.log(data[keys[0]]);
        console.log("Error detected");
        return;
      }
      keys.forEach((key) => {
        var quoteObj = data[key];
        //console.log(data[key]);
        var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["author"], quoteObj["faved"]).complete(this.ac.getAddressing());
        this.historyQuotes.push(qm);
      });
    }, (err) => {
      console.log(err);
    });
  }

  fetchQuotes() {

  }

  ionViewWillLoad() {
  }
  
  async showToast(message) {
    var alert = await this.tC.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    await alert.present();
  }

}