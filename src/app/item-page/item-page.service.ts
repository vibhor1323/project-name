import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import {oldItem} from "./item-page.component"

@Injectable({ providedIn: 'root' })
export class itemPageService {
  selectedItem: any;

  constructor(private router: Router) {}

  update(index: any) {
    this.selectedItem = index;
  }
}
