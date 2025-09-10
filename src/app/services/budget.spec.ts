import { BudgetService } from './budget';
import { PRICE } from '../models/constants';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    service = new BudgetService(); 
  });

  it('calculates base total (Exercise 1) for single selections', () => {
    expect(service.calculateBaseTotal({ seo: true, ads: false, web: false })).toBe(PRICE.SEO);
    expect(service.calculateBaseTotal({ seo: false, ads: true, web: false })).toBe(PRICE.ADS);
    expect(service.calculateBaseTotal({ seo: false, ads: false, web: true })).toBe(PRICE.WEB);
  });

  it('calculates base total (Exercise 1) for multiple selections', () => {
    expect(service.calculateBaseTotal({ seo: true, ads: true, web: false }))
      .toBe(PRICE.SEO + PRICE.ADS);
    expect(service.calculateBaseTotal({ seo: true, ads: true, web: true }))
      .toBe(PRICE.SEO + PRICE.ADS + PRICE.WEB);
  });

  it('calculates total with web extras (Exercise 2) when web=true', () => {
    const total = service.calculateTotalWithWebExtras({
      seo: true,
      ads: true,
      web: true,
      pages: 2,
      languages: 2
    });
    expect(total).toBe(PRICE.SEO + PRICE.ADS + PRICE.WEB + (2 * 2 * PRICE.WEB_EXTRA));
  });

  it('does NOT add extras when web=false (even if pages/languages > 1)', () => {
    const total = service.calculateTotalWithWebExtras({
      seo: false,
      ads: true,
      web: false,
      pages: 10,
      languages: 10
    });
    expect(total).toBe(PRICE.ADS);
  });
});
