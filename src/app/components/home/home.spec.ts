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

  it('should update total to 700 when SEO and Ads are checked', () => {
    component.form.patchValue({ seo: true, ads: true });
    fixture.detectChanges();

    expect(component.total).toBe(700);
  });

  it('should be 530 when only Web is selected with pages=1 and languages=1', () => {
    component.form.patchValue({ seo: false, ads: false, web: true, pages: 1, languages: 1 });
    fixture.detectChanges();

    expect(component.total).toBe(530);
  });

  it('should be 680 when Web is selected with pages=2 and languages=3', () => {
    component.form.patchValue({ seo: false, ads: false, web: true });
    component.form.get('pages')!.setValue(2);
    component.form.get('languages')!.setValue(3);
    fixture.detectChanges();

    expect(component.total).toBe(680);
  });

  it('should ignore web extras when web=false', () => {
    component.form.patchValue({ web: false, pages: 10, languages: 10 });
    fixture.detectChanges();

    expect(component.total).toBe(0);
  });

  it('should enforce min=1 validation for pages and languages', () => {
    const pages = component.form.get('pages')!;
    const languages = component.form.get('languages')!;

    pages.setValue(0);
    languages.setValue(0);
    fixture.detectChanges();

    expect(pages.invalid).toBeTrue();
    expect(languages.invalid).toBeTrue();
  });

  it('should render <app-panel> only when web=true', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('app-panel')).toBeNull();

    component.form.get('web')!.setValue(true);
    fixture.detectChanges();

    expect(host.querySelector('app-panel')).not.toBeNull();
  });


});
