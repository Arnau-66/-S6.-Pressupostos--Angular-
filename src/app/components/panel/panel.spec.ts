import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Panel } from './panel';

describe('Panel', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panel, ReactiveFormsModule]
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);

    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;

    component.form = fb.group({
      pages: [1, [Validators.min(1)]],
      languages: [1, [Validators.min(1)]],
      web: [true]
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment pages by 1 when inc("pages") is called', () => {
    const pages = component.form.get('pages')!;
    expect(pages.value).toBe(1);

    component.inc('pages');
    expect(pages.value).toBe(2);

    component.inc('pages');
    expect(pages.value).toBe(3);
  });

  it('should increment languages by 1 when inc("languages") is called', () => {
    const languages = component.form.get('languages')!;
    expect(languages.value).toBe(1);

    component.inc('languages');
    expect(languages.value).toBe(2);
  });

  it('should decrement pages by 1 but never below 1', () => {
    const pages = component.form.get('pages')!;
    component.inc('pages');
    expect(pages.value).toBe(2);

    component.dec('pages');
    expect(pages.value).toBe(1);

    component.dec('pages');
    expect(pages.value).toBe(1);
  });

  it('should decrement languages by 1 but never below 1', () => {
    const languages = component.form.get('languages')!;
    component.inc('languages');
    component.inc('languages');
    expect(languages.value).toBe(3);

    component.dec('languages');
    expect(languages.value).toBe(2);

    component.dec('languages');
    expect(languages.value).toBe(1);

    component.dec('languages');
    expect(languages.value).toBe(1);
  });

  it('should keep validators working (min=1) after changes', () => {
    const pages = component.form.get('pages')!;
    const languages = component.form.get('languages')!;

    component.inc('pages');
    component.dec('pages');
    component.dec('pages');

    component.inc('languages');
    component.dec('languages');
    component.dec('languages');

    expect(pages.value).toBe(1);
    expect(languages.value).toBe(1);

    pages.setValue(0);
    languages.setValue(0);
    expect(pages.invalid).toBeTrue();
    expect(languages.invalid).toBeTrue();
  });
  
  it('(DOM) should increment pages when clicking the + button', () => {
    const host: HTMLElement = fixture.nativeElement;
    const btn = host.querySelector('[data-testid="inc-pages"]') as HTMLButtonElement;

    btn.click();
    fixture.detectChanges();

    expect(component.form.get('pages')!.value).toBe(2);
  });
});
