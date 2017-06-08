import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';


@Component({
  selector: 'keg-list',
  template: `
    <select (change)="onChange($event.target.value)">
      <option value="allKegs" selected="selected">All Kegs</option>
      <option value="emptyKegs">Near empty Kegs</option>
      <option value="fullKegs">Mostly full Kegs</option>
    </select>

      <ul>
        <li *ngFor="let currentKeg of childKegList | pints:filterByCompleteness" [class]="priceColor(currentKeg)"> {{currentKeg.name}}
          <button class="btn btn-info btn-sm" (click)="editButtonHasBeenClicked(currentKeg)">Edit Keg</button>
          <button class="btn btn-default btn-sm" (click)="showDetailButtonHasBeenClicked(currentKeg)">Details</button>
        </li>
      </ul>
  `
})


export class KegListComponent {
  @Input() childKegList: Keg[];
  @Output() clickSender1 = new EventEmitter();
  @Output() clickSender2 = new EventEmitter();

  filterByCompleteness: string = "allKegs";

  onChange(optionFromMenu) {
    this.filterByCompleteness = optionFromMenu;
  }
  editButtonHasBeenClicked(kegToEdit: Keg) {
    this.clickSender1.emit(kegToEdit);
  }
  showDetailButtonHasBeenClicked(kegToShow: Keg) {
    this.clickSender2.emit(kegToShow);
  }
  priceColor(keg) {
    var price: number = parseInt(keg.pintPrice);
    if (price < 4) {
      return "cheapPrice";
    } else if ( (price >= 4) && (price < 5) ) {
      return  "midPrice";
    } else {
      return  "expensivePrice";
    }
  }

}
