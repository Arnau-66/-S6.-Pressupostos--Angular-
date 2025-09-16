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

describe('BudgetService – Exercise 5 (signals & list)', () => {
  let service: BudgetService;

    beforeEach(() => {
      service = new BudgetService();
    });

    function baseSel(overrides: Partial<import('./budget').BaseSelection> = {}) {
      return { seo: false, ads: false, web: false, ...overrides };
    }

    
    function extras(pages = 1, languages = 1) {
      return { pages, languages };
    }

    it('starts with empty budgets() signal', () => {
      expect(service.budgets()).toEqual([]);
    });


    it('addBudget appends an item with id/date and expected total', () => {

      const sel = { ...baseSel({ seo: true, web: true }), ...extras(2, 3) };
      const expected = service.calculateTotalWithWebExtras(sel);

      service.addBudget({
        client: { name: 'Ana', email: 'ana@mail.com', phone: '600600600' },
        services: sel,
        total: expected
      } as any);

      const arr = service.budgets();
      expect(arr.length).toBe(1);
      expect(arr[0].client.name).toBe('Ana');
      expect(arr[0].total).toBe(expected);

      expect(typeof arr[0].id).toBe('string');
      expect(arr[0].date instanceof Date).toBeTrue();
    });

    it('removeBudget removes by id (immutably)', () => {

      const s1 = { ...baseSel({ web: true }), ...extras(1, 1) };
      const s2 = { ...baseSel({ seo: true }), ...extras(1, 1) };

      service.addBudget({
        client: { name: 'A', email: 'a@mail.com', phone: '' },
        services: s1,
        total: service.calculateTotalWithWebExtras(s1)
      } as any);

      service.addBudget({
        client: { name: 'B', email: 'b@mail.com', phone: '' },
        services: s2,
        total: service.calculateTotalWithWebExtras(s2)
      } as any);

      const before = service.budgets();
      expect(before.length).toBe(2);

      const idToRemove = before[0].id;
      service.removeBudget(idToRemove);

      const after = service.budgets();
      expect(after.length).toBe(1);

      expect(after.find(b => b.id === idToRemove)).toBeUndefined();
      expect(after).not.toBe(before);
    });

});
