import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the reactive form with default values', () => {
    const form = component.form;

    expect(form.get('seo')?.value).toBeFalse();
    expect(form.get('ads')?.value).toBeFalse();
    expect(form.get('web')?.value).toBeFalse();

    expect(form.get('pages')?.value).toBe(1);
    expect(form.get('languages')?.value).toBe(1);

    expect(component.total).toBe(0);
  });

  it('should update total to 300 when SEO is checked', () => {
    const seo = component.form.get('seo')!;
    
    seo.setValue(true); 
    fixture.detectChanges();

    expect(component.total).toBe(300);
  });


});
