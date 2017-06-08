import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';


@Component({
  selector: 'keg-detail',
  template: `
    <div>
      <div  *ngIf="childSelectedKegDetail">
        <div class="col-sm-5">
          <ul>
            <li> <b>Name:</b>  {{childSelectedKegDetail.name}} </li>
            <li> <b>Brand:</b>   {{childSelectedKegDetail.brand}} </li>
            <li> <b>Keg Price:</b>   \${{childSelectedKegDetail.price}}\.00 </li>
            <li> <span [class]="abvColor(childSelectedKegDetail)"><b>ABV:</b></span>   {{childSelectedKegDetail.abv}}\% </li>
            <li> <b>Pints left:</b>   {{childSelectedKegDetail.pintsLeft}} </li>
            <li> <b>Price per pint:</b>   \${{childSelectedKegDetail.pintPrice}} </li>
          </ul>
          <button class="btn btn-default btn-sm" (click)="hideButtonClicked()">Hide Details</button>
          <button class="btn btn-success btn-sm" (click)="sellPintClicked()">Sell Pint</button>
          <button class="btn btn-primary btn-sm" (click)="refillKegClicked()">Refill Keg</button>
        </div>
        <div class="col-sm-5">
          <div  id="kegFullnessDiv">
            <img id="kegFullness" src="public/img/barrel2.png" alt="Keg fullness">
            <div id="kegFill" [style.margin-top]="changeFullness(childSelectedKegDetail.pintsLeft)"            [style.height]="changeFullnessHeight(childSelectedKegDetail.pintsLeft)">
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})


export class KegDetailComponent {
  @Input() childSelectedKegDetail: Keg;
  @Output() hideButtonClickedSender = new EventEmitter();
  @Output() sellPintClickedSender = new EventEmitter();
  @Output() refillKegClickedSender = new EventEmitter();

  hideButtonClicked() {
    this.hideButtonClickedSender.emit();
  }

  sellPintClicked() {
    this.sellPintClickedSender.emit()
  }

  refillKegClicked() {
    this.refillKegClickedSender.emit()
  }

  abvColor(keg) {
    if ( keg.abv < 4 ) {
      return "abvLow";
    } else if (( keg.abv >= 4 ) && ( keg.abv < 5 )) {
      return  "abvMid";
    } else {
      return  "abvHigh";
    }
  }

  // changeFullness(childSelectedKegDetail)
  changeFullness(myPintsLeft) {
    var barrelFullness: number = 0;
    if (myPintsLeft >= 100) {
      barrelFullness = 30;
    } else if ((myPintsLeft < 100) && (myPintsLeft >= 50)) {
      barrelFullness = 80;
    } else {
      barrelFullness = 115;
    }
    return barrelFullness;
  }

  changeFullnessHeight(myPintsLeft) {
    var barrelFullnessHeight: number = 0;
    // barrelFullnessHeight = ((.24 * 50) + 30)
    if (myPintsLeft >= 100) {
      barrelFullnessHeight = 110;
    } else if ((myPintsLeft < 100) && (myPintsLeft >= 50)) {
      barrelFullnessHeight = 60;
    } else {
      barrelFullnessHeight = 30;
    }
    return barrelFullnessHeight;
  }

}
