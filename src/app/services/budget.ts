import { Injectable } from '@angular/core';
import { PRICE } from '../models/constants';

@Injectable({
  providedIn: 'root'
})


export class BudgetService {

  calculateBaseTotal(services: { seo: boolean; ads: boolean; web: boolean }): number {
    let total = 0
  
    if (services.seo) total += PRICE.SEO;
    if (services.ads) total += PRICE.ADS;
    if (services.web) total += PRICE.WEB;

    return total;
  };
}
