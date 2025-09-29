import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BudgetService, SelectionWithWeb } from '../../services/budget';
import { Panel } from '../panel/panel';
import { BudgetList } from '../budget-list/budget-list';
import { encodeToSearchParams } from '../../utils/url';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Panel, BudgetList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  form: FormGroup;
  clientForm: FormGroup;
  total = 0;

  copied = false;
  copyError: string | null = null;

  constructor( private fb: FormBuilder, private budgetService: BudgetService) {
    this.form = this.fb.group ({
      seo: [false],
      ads: [false],
      web: [false],
      pages: [1, [Validators.min(1)]],
      languages: [1, [Validators.min(1)]],
    });

    this.form.valueChanges.subscribe(values =>{
      let sel = values as SelectionWithWeb;
      this.total = this.budgetService.calculateTotalWithWebExtras(sel);
    });

    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

  }

  inc (field: 'pages' | 'languages'): void {
    let c = this.form.get(field)!;
    let val = Number (c.value) || 1;
    c.setValue(Math.max(1,val -1));
  }

  get canSave(): boolean {
    return this.form.valid && this.clientForm.valid;
  }

  onSave(): void {
    
    if (!this.canSave) return;

    const sel = {
      seo: !!this.form.get('seo')?.value,
      ads: !!this.form.get('ads')?.value,
      web: !!this.form.get('web')?.value,
      pages: Number(this.form.get('pages')?.value ?? 1),
      languages: Number(this.form.get('languages')?.value ?? 1),
    } satisfies SelectionWithWeb;

    const total = this.budgetService.calculateTotalWithWebExtras(sel);

    const client = {
      name: String(this.clientForm.get('name')?.value ?? ''),
      email: String(this.clientForm.get('email')?.value ?? ''),
      phone: this.clientForm.get('phone')?.value ? String(this.clientForm.get('phone')?.value) : undefined
    };

    this.budgetService.addBudget({
      services: sel,
      total,
      client
    });

    this.clientForm.reset({
      name: '',
      email: '',
      phone: ''
    });
  }

  private buildShareState() {
    return {
      seo: !!this.form.get('seo')?.value,
      ads: !!this.form.get('ads')?.value,
      web: !!this.form.get('web')?.value,

      pages: Number(this.form.get('pages')?.value ?? 1),
      languages: Number(this.form.get('languages')?.value ?? 1),
      name: String(this.clientForm.get('name')?.value ?? ''),
      email: String(this.clientForm.get('email')?.value ?? ''),
      phone: String(this.clientForm.get('phone')?.value ?? ''),
    };
  }

  private buildShareUrl(): string {
    const state = this.buildShareState();
    const base = window.location.origin + window.location.pathname;
    return encodeToSearchParams(state, base);
  }

  async onCopyLink(): Promise<void> {
    this.copied = false;
    this.copyError = null;

    const url = this.buildShareUrl();

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    } catch (err: any) {
      this.copyError = 'Could not copy link';
      console.error(err);
    }
  }

}


