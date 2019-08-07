import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AccountProvider } from '../../providers/account/account';
import { QuoteModel } from '../../model/QuoteModel.interface';
import { QuoteProvider } from '../../providers/quote/quote';


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
  loading;
  subCategory = ""; //quotes/me

  historyQuotes: QuoteModel[] = [];
  favoriteQuotes: QuoteModel[] = [];

  constructor( private quoteProvider: QuoteProvider, public ac: AccountProvider, public tC: ToastController, public loadingCtrl: LoadingController) {
    this.getQuotes();
    this.showLoading().then(()=>
      this.loading.dismiss()
    );
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
          this.showToast("Dosáhl(a) jste maximálního počtu oblíbených citátů.");
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

      keys.forEach((key) => {
        var quoteObj = data[key];
        var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["faved"]).complete(AccountProvider.user.addressing);
        this.favoriteQuotes.push(qm);
      });

    }, (err) => {
      console.log("Nejsou žádné výsledky!");
    });
  }

  downloadHistory() {
    this.quoteProvider.getHistoryQuotes().subscribe((data) => {
      this.historyQuotes = [];
      var keys = Object.keys(data);

      keys.forEach((key) => {
        var quoteObj = data[key];
        var qm: QuoteModel = new QuoteModel(quoteObj["id_q"], quoteObj["quote"], quoteObj["faved"]).complete(AccountProvider.user.addressing);
        this.historyQuotes.push(qm);
      });
    }, (err) => {
      console.log("Nejsou žádné výsledky!");
    });
  }

  fetchQuotes() {

  }

  ionViewWillLoad() {
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
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