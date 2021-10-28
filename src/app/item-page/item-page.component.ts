import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LandingPageAuthService } from '../landing-page/landing-page.service';
import { itemPageService } from './item-page.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  ph_number!: string;
  oldItem!: any;
  items!: any;
  itemIndex!: number;
  selectedItem: any;
  selectedItemData: any;
  itemN: any;
  itemC: any;
  unitS: any;
  datE: any;
  purchasePricE: any;
  sellingPricE: any;
  event!: Event;
  searchElement: any;
  reverse: boolean = false;
  isDeleted: boolean = false;

  localItems = JSON.parse(localStorage.getItem('items')!);

  constructor(
    private authService: LandingPageAuthService,
    private itemService: itemPageService
  ) {}

  ngOnInit() {
    const userData: {
      mobile_number: string;
    } = JSON.parse(localStorage.getItem('UserDetails')!);
    // console.log(userData.mobile_number)
    this.ph_number = userData.mobile_number;
    this.selectedItem = null;
    this.oldItem = JSON.parse(localStorage.getItem('items')!);
  }

  searchItem(value: any) {
    this.searchElement = value;
    this.oldItem = JSON.parse(localStorage.getItem('items')!);

    let searchedItem = this.oldItem.filter((item: any) => {
      if (
        item.itemname.includes(this.searchElement) ||
        item.itemcode.includes(this.searchElement)
      )
        return item;
    });
    this.oldItem = searchedItem;
  }

  onChange(value: any, input: any) {
    if (this.selectedItem !== null) {
      this.localItems[this.selectedItem] = this.selectedItemData;
      this.localItems[this.selectedItem][input] = value;
      this.selectedItemData = this.localItems[this.selectedItem];
      this.oldItem[this.selectedItem][input] =
        this.localItems[this.selectedItem][input];
      console.log(this.oldItem[this.selectedItem]);
    }
  }

  handleSubmit(form: NgForm) {
    this.oldItem = JSON.parse(localStorage.getItem('items')!);
    this.oldItem = this.oldItem || [];
    console.log(form.value.itemName);
    if (
      (form.value.itemName != null ||
        form.value.itemName != undefined ||
        form.value.itemName != '') &&
      (form.value.itemCode != '' ||
        form.value.itemCode != null ||
        form.value.itemCode != undefined)
    ) {
      console.log(form.value.itemName);
      this.oldItem.push({
        itemname: form.value.itemName!,
        itemcode: form.value.itemCode!,
        sellingprice: form.value.sellingPrice,
        purchaseprice: form.value.purchasePrice,
        units: form.value.unit,
        date: form.value.Date,
      });
      this.localItems = this.oldItem;
      // console.log(this.oldItem)

      localStorage.setItem('items', JSON.stringify(this.oldItem));
      form.reset();
    }
  }

  updateRow(itemIndex: number) {
    // console.log(itemIndex)
    // this.itemService.update(itemIndex);
    this.selectedItem = itemIndex;
    this.selectedItemData = this.oldItem[itemIndex];
    console.log(this.selectedItemData);

    this.itemN = this.selectedItemData.itemname;
    this.itemC = this.selectedItemData.itemcode;
    this.sellingPricE = this.selectedItemData.sellingprice;
    this.purchasePricE = this.selectedItemData.purchaseprice;
    this.unitS = this.selectedItemData.units;
    this.datE = this.selectedItemData.date;
  }

  handleUpdate(form: NgForm) {
    // console.log(this.localItems[this.selectedItem])

    // console.log(this.localItems[this.selectedItem]);

    if (
      (form.value.itemName != null || form.value.itemName != undefined) &&
      (form.value.itemCode != null || form.value.itemCode != undefined)
    ) {
      // console.log(this.localItems[this.selectedItem]);

      this.localItems[this.selectedItem].itemname = form.value.itemName!;
      this.localItems[this.selectedItem].itemcode = form.value.itemCode!;
      this.localItems[this.selectedItem].sellingprice = form.value.sellingPrice;
      this.localItems[this.selectedItem].purchaseprice =
        form.value.purchasePrice;
      this.localItems[this.selectedItem].units = form.value.unit;
      this.localItems[this.selectedItem].date = form.value.Date;

      localStorage.setItem('items', JSON.stringify(this.localItems));
      this.oldItem = this.localItems;
    }
    this.selectedItem = null;
    this.selectedItemData = {};
    form.reset();
  }

  sort(key: string) {
    this.reverse = !this.reverse;
    if (this.reverse) {
      return this.oldItem.sort((a: any, b: any) => {
        var a1 = a.itemname.toLowerCase();
        var b1 = b.itemname.toLowerCase();
        return a1 < b1 ? 1 : a1 > b1 ? -1 : 0;
      });
    } else {
      return this.oldItem.sort((a: any, b: any) => {
        var a1 = a.itemname.toLowerCase();
        var b1 = b.itemname.toLowerCase();
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
      });
    }
  }

  deleteItem(i: any) {
    // console.log(this.oldItem.splice(i, 1));
    this.itemN = null;
    this.itemC = null;
    this.sellingPricE = null;
    this.purchasePricE = null;
    this.unitS = null;
    this.datE = null;
    this.oldItem.splice(i, 1);
    localStorage.setItem('items', JSON.stringify(this.oldItem));
    this.selectedItem = null;
    this.selectedItemData = {};
    // console.log(this.oldItem);
  }

  logout() {
    this.authService.logout();
  }
}
