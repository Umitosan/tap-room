import { Component, Input } from '@angular/core';
import { Keg } from './keg.model';


@Component({  // 'decorator'
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="row">
      <keg-list [childKegList]="masterKegList" (clickSender1)="editKeg($event)" (clickSender2)="showKeg($event)"></keg-list>
    </div>
    <hr>
    <div class="row">
      <keg-detail id="details" [childSelectedKegDetail]="selectedKegDetail" (hideButtonClickedSender)="hideKeg()" (sellPintClickedSender)="sellOnePint($event)" (refillKegClickedSender)="refillKeg($event)"></keg-detail>
    </div>
    <hr>
    <div class="row">
      <edit-keg [childSelectedKeg]="selectedKeg" (doneButtonClickedSender)="finishedEditing()" ></edit-keg>
      <new-keg (newKegSender)="addKeg($event)"></new-keg>
    </div>
  </div>
  `
})


export class AppComponent {
  masterKegList: Keg[] = [ new Keg('Mirror Pond Pale Ale', 'Deschutes Brewery', 98, 4.5, "http://thefullpint.com/wp-content/uploads/2008/07/deschutes.jpg"),
                           new Keg('Blue Dot IPA', 'Hair of the Dog', 112, 7, "http://www.bringonthebeer.com/images/hair_of_the_dog_brewing_blue_dot_full.jpg"),
                           new Keg('Budweiser Light', 'Budweiser', 125, 4, "http://www.boozingear.com/media/catalog/product/cache/7/image/650x/040ec09b1e35df139433887a97daa66f/b/u/bud-0178b.jpg"),
                           new Keg('Pabst Blue Ribbon', 'Pabst', 110, 3.5, "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Pabst_Blue_Ribbon_logo.svg/911px-Pabst_Blue_Ribbon_logo.svg.png"),
                           new Keg('Apocalypse IPA', '10 Barrel', 189, 6.8, "https://cdn.beeradvocate.com/im/beers/53808.jpg"),
                          ];
  selectedKeg: null;
  // used to be "selectedKegDetail: null;" but this caused build errors
  selectedKegDetail: Keg;
  currentPintsLeft: number = 120;

  showKeg(clickedKegDetail) {
    this.selectedKegDetail = clickedKegDetail;
  }

  hideKeg() {
    this.selectedKegDetail = null;
  }

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }

  finishedEditing() {
    this.selectedKeg = null;
  }

  addKeg(newKegFromChild: Keg) {
    this.masterKegList.push(newKegFromChild);
  }

  sellOnePint() {
    if (this.selectedKegDetail.pintsLeft > 10) {
      this.selectedKegDetail.pintsLeft -= 10;
    } else {
      this.selectedKegDetail.pintsLeft = 0;
      alert("Keg is finished");
    }
  }

  refillKeg() {
    this.selectedKegDetail.pintsLeft = 124;
  }



}
