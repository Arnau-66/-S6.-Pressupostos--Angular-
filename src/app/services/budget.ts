import { Injectable } from '@angular/core';
import { PRICE } from '../models/constants';

export interface BaseSelection {
  seo: boolean;
  ads: boolean;
  web: boolean;
}

@Injectable({ providedIn: 'root'})

export class BudgetService {

  calculateBaseTotal( sel: BaseSelection): number {
    let total = 0
  
    if (sel.seo) total += PRICE.SEO;
    if (sel.ads) total += PRICE.ADS;
    if (sel.web) total += PRICE.WEB;

    return total;
  };
}
