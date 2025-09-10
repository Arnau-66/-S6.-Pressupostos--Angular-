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
});
