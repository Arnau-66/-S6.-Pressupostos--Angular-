import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetList } from './budget-list';
import { BudgetService } from '../../services/budget';
import { By } from '@angular/platform-browser';

describe('BudgetList', () => {
  let fixture: ComponentFixture<BudgetList>;
  let component: BudgetList;
  let service: BudgetService;

  const queryButtonByText = (text: string) => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    return buttons.find(b => (b.nativeElement.textContent as string).trim().startsWith(text));
  }; 

  const getRenderedNames = (): string[] => {
    const items = fixture.debugElement.queryAll(By.css('ul.list-group > li.list-group-item'));
    return items.map(li => {
      const full = (li.nativeElement.textContent as string).replace(/\s+/g, ' ').trim();
      return full.split(' · ')[0];
    });
  };

  const setSearchValue = (value: string) => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="search"]');
    input.value = value;
    
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetList]
    })
    .compileComponents();

    service = TestBed.inject(BudgetService);

    service.addBudget({
      client: { name: 'Ana', email: 'ana@mail.com', phone: '' },
      services: { seo: true, ads: false, web: false, pages: 1, languages: 1 },
      total: service.calculateTotalWithWebExtras({
        seo: true, ads: false, web: false, pages: 1, languages: 1
      })
    } as any);

    service.addBudget({
      client: { name: 'Arnau', email: 'a@mail.com', phone: '' },
      services: { seo: false, ads: true, web: true, pages: 2, languages: 2 },
      total: service.calculateTotalWithWebExtras({
        seo: false, ads: true, web: true, pages: 2, languages: 2
      })
    } as any);

    fixture = TestBed.createComponent(BudgetList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('renders one <li.list-group-item> per budget', () => {
    const items = fixture.debugElement.queryAll(By.css('ul.list-group > li.list-group-item'));
    expect(items.length).toBe(2);

    const text = items.map(li => (li.nativeElement.textContent as string)).join(' ');
    expect(text).toContain('Ana');
    expect(text).toContain('Arnau');

  });

  it ('updates the header count (singular/plural)', () => {
    const headerCountEl = fixture.debugElement.query(By.css('.text-muted.small')).nativeElement as HTMLElement;
    expect(headerCountEl.textContent?.trim()).toContain('2 items');

    const first = service.budgets()[0];
    service.removeBudget(first.id);
    fixture.detectChanges();

    const headerCountAfter = fixture.debugElement.query(By.css('.text-muted.small')).nativeElement as HTMLElement;
    expect(headerCountAfter.textContent?.trim()).toContain('1 item');
  })

  it('removes the correct item when Delete button is clicked', () => {
    const anaLi = fixture.debugElement
      .queryAll(By.css('ul.list-group > li.list-group-item'))
      .find(li => (li.nativeElement.textContent as string).includes('Ana'));
    expect(anaLi).toBeTruthy();

    const deleteBtn = anaLi?.query(By.css('button.btn.btn-sm.btn-outline-danger'));
    expect(deleteBtn).toBeTruthy();

    deleteBtn!.nativeElement.click();
    fixture.detectChanges();

    const remainingText = fixture.debugElement
      .queryAll(By.css('ul.list-group > li.list-group-item'))
      .map(li => li.nativeElement.textContent as string)
      .join(' ');
    expect(remainingText).not.toContain('Ana');
    expect(remainingText).toContain('Arnau');
  });

  it ('shows the empty-state alert when there are no budgets', () => {
    service.budgets().forEach(b => service.removeBudget(b.id));
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('ul.list-group > li.list-group-item'));
    expect(items.length).toBe(0);

    const alert = fixture.debugElement.query(By.css('.alert.alert-secondary'));
    expect(alert).toBeTruthy();
    expect((alert.nativeElement.textContent as string).trim()).toContain('No budgets yet');
  });

  it('sorts by Name (asc/desc) when clicking the Name button', () => {
    const nameBtn = queryButtonByText('Name');
    expect(nameBtn).toBeTruthy();

    nameBtn!.nativeElement.click();
    fixture.detectChanges();
    let names = getRenderedNames();
    expect(names[0]).toBe('Ana');

    nameBtn!.nativeElement.click();
    fixture.detectChanges();
    names = getRenderedNames();
    expect(names[0]).toBe('Arnau');
  });

  it('sorts by Price (asc/desc) when clicking the Price button', () => {
    const priceBtn = queryButtonByText('Price');
    expect(priceBtn).toBeTruthy();

    priceBtn!.nativeElement.click();
    fixture.detectChanges();

    let names = getRenderedNames();
    expect(names[0]).toBe('Arnau');
    expect(names[1]).toBe('Ana');

    priceBtn!.nativeElement.click();
    fixture.detectChanges();

    names = getRenderedNames();
    expect(names[0]).toBe('Ana');
    expect(names[1]).toBe('Arnau');
  });
  
  it('filters by client name (partial and case-insensitive)', () => {
  
    expect(getRenderedNames().length).toBe(2);

    setSearchValue('ana');
    let names = getRenderedNames();
    expect(names).toEqual(['Ana']);

    setSearchValue('ARN');
    names = getRenderedNames();
    expect(names).toEqual(['Arnau']);

    setSearchValue('');
    names = getRenderedNames();
    expect(names.length).toBe(2);
  });

  it('shows empty-state when search returns no matches', () => {

    setSearchValue('zz-no-match-zz');

    const items = fixture.debugElement.queryAll(By.css('ul.list-group > li.list-group-item'));
    expect(items.length).toBe(0);

    const alert = fixture.debugElement.query(By.css('.alert.alert-secondary'));
    expect(alert).toBeTruthy();
    expect((alert.nativeElement.textContent as string)).toContain('No budgets yet');
  });  

});
