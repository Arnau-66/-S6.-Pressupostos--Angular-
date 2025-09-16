import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetList } from './budget-list';
import { BudgetService } from '../../services/budget';

describe('BudgetList', () => {
  let component: BudgetList;
  let fixture: ComponentFixture<BudgetList>;
  let service: BudgetService;

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
      client: { name: 'Bruno', email: 'b@mail.com', phone: '' },
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

  
});
