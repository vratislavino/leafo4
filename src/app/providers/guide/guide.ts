import { Injectable } from '@angular/core';
import { MotStorageProvider } from '../mot-storage/mot-storage';

@Injectable()
export class GuideProvider {

  public static allGuides = [
    {
      page: "home",
      guides: [{
        order: 0,
        seen: false,
        headline: "Přivítání",
        text: "Vítám tě v aplikaci Leafo! Nacházíš se na cestě k lepšímu já!"
      }, {
        order: 1,
        seen: false,
        headline: "Seznámení",
        text: "Budu tě provázet touhle aplikací! Když někam přijdeš, řeknu ti co a jak!"
      }]
    }, {
      page: "profile",
      guides: [{
        order: 0,
        seen: false,
        headline: "Stránka Profil",
        text: "Zde vidíš své oblíbené citáty a horoskop! Můžeš si přidat profilovou fotku v Nastavení profilu"
      },{
        order: 1,
        seen: false,
        headline: "Úroveň profilu",
        text: "Ve zlatém jablku vidíš svou úroveň profilu."
      }, {
        order: 2,
        seen: false,
        headline: "Depka",
        text: "Pokud jsi na dně, můžeš jednou měsíčně využít tlačítko DEPKA, které ti pomůže znovu na nohy!"
      }]
    }, {
      page: "quotes",
      guides: [{
        order: 0,
        seen: false,
        headline: "Stránka citátů",
        text: "Zde najdeš každý den nový citát! Budeš o něm upozorněn už na hlavní stránce. Přetažením doleva si můžeš uložit citát do oblíbených. Pozor! V historii můžeš mít jen 10 citátů, o nejstarší přijdeš!"
      }]
    }, {
      page: "review",
      guides: [{
        order: 0,
        seen: false,
        headline: "Zpětná vazba",
        text: "Nech mi prosím zpětnou vazbu, ať vím, co můžu zlepšovat!"
      }]
    }, {
      page: "calendar",
      guides: [{
        order: 0,
        seen: false,
        headline: "Kalendář",
        text: "Vítám tě v tvém osobním kalendáři! Zde si můžeš přidávat poznámky a hodnotit jednotlivé dny"
      },{
        order: 1,
        seen: false,
        headline: "Hodnocení",
        text: "Hodnocení dnů je důležité k naplnění konve a následné zalití tvého stromu. Klikni na den, který chceš hodnotit a následně podrž prst na kolečku vpravo! Zvolené hodnocení můžeš stejným způspobem i měnit"
      },{
        order: 2,
        seen: false,
        headline: "Další funkce",
        text: "Kliknutím na šipečku vpravo dole uvidíš možnosti přidání připomenutí nebo poznámky k danému dnu! Jako žena si můžeš nastavit i menstruační kalendář!"
      },{
        order: 3,
        seen: false,
        headline: "Přehled pozitivity",
        text: "Kliknutím na pravé spodní kolečko otevřeš svůj týdenní a měsíční přehled hodnocení dnů"
      }]
    }, {
      page: "advices",
      guides: [{
        order: 0,
        seen: false,
        headline: "Rady",
        text: "Zde si můžeš každý den vzít jednu radu. Buď si nech poradit od maminky nebo od přítele!"
      }]
    }, {
      page: "graph",
      guides: [{
        order: 0,
        seen: false,
        headline: "Grafy",
        text: "Zde uvidíš svůj pozitivní vývoj. V rámci procvičování paměti si k jednotlivým dnům můžeš vzpomenout, co se ti přihodilo pozitivního a co nejvíce ovlivnilo tvé hodnocení dne!"
      }]
    }, {
      page: "tree",
      guides: [{
        order: 0,
        seen: false,
        headline: "Strom",
        text: "Zde vidíš svůj strom a pokud jsi ohodnotil den, můžeš ho zalít. Pokud se budeš o svůj strom starat, přinese ti jistě nějaké plody. Více informací se dozvíš kliknutím na otazníček!"
      }]
    }
  ];

  constructor(private motStorage: MotStorageProvider) {

  }

  init() {
    //this.saveCurrentToStorage();
    //return;
    if (this.motStorage.exists("allguides")) {
      GuideProvider.allGuides = this.motStorage.get("allguides");

      /*
      for (var i = 0; i < all.length; i++) {
        for(var j = 0; j < all[i].guides.length; j++) {
          GuideProvider.allGuides[i][j].seen = all[];
        }
      }*/

    } else {
      this.saveCurrentToStorage();
    }

    this.showEm();
  }

  saveCurrentToStorage() {
    this.motStorage.set("allguides", GuideProvider.allGuides);
  }

  getAvailablePageToSee(page): any {
    let pg:any = null;
    for(var i = 0; i < GuideProvider.allGuides.length; i++) {
      if(GuideProvider.allGuides[i].page == page) {
        pg = GuideProvider.allGuides[i];
        break;
      }
    }

    return pg;
  }

  getAvailableGuideToSee(page) {
    let pg = this.getAvailablePageToSee(page);
    let guide:any = null;
    for(var i = 0; i < pg.guides.length; i++) {
      if(!pg.guides[i].seen) {
        guide = pg.guides[i];
        break;
      }
    }

    return guide;
  }

  showEm() {
    console.log(GuideProvider.allGuides);
  }

  addSeen(guide) {
    guide.seen = true;
    this.saveCurrentToStorage();
  }


}
