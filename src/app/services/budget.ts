import { Injectable } from '@angular/core';
import { PRICE } from '../models/constants';

export interface BaseSelection {
  seo: boolean;
  ads: boolean;
  web: boolean;
}

export interface WebExtras {
  pages: number;
  languages: number;
}

export type SelectionWithWeb = BaseSelection & WebExtras;

@Injectable({ providedIn: 'root'})

export class BudgetService {

  calculateBaseTotal( sel: BaseSelection): number {
    let total = 0
  
    if (sel.seo) total += PRICE.SEO;
    if (sel.ads) total += PRICE.ADS;
    if (sel.web) total += PRICE.WEB;

    return total;
  }

  calculateTotalWithWebExtras(sel: SelectionWithWeb): number {
    let base = this.calculateBaseTotal(sel);
    if (!sel.web) return base;
    let extras = sel.pages * sel.languages * PRICE.WEB_EXTRA;
    return base + extras;
  }

}
