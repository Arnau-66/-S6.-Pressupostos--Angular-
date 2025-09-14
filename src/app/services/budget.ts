import { Injectable, signal, computed } from '@angular/core';
import { PRICE } from '../models/constants';

export interface BaseSelection {
  seo: boolean;
  ads: boolean;
  web: boolean;
}

export interface WebExtras {
  pages: number;
  languages: number;
}

export type SelectionWithWeb = BaseSelection & WebExtras;

export interface Budget {
  id: string;
  services: SelectionWithWeb;
  total: number;
  client: {
    name: string;
    email: string;
    phone?: string;
  };
  date: Date;
}

@Injectable({ providedIn: 'root' })
export class BudgetService {

  calculateBaseTotal(sel: BaseSelection): number {
    let total = 0;

    if (sel.seo) total += PRICE.SEO;
    if (sel.ads) total += PRICE.ADS;
    if (sel.web) total += PRICE.WEB;

    return total;
  }

  calculateTotalWithWebExtras(sel: SelectionWithWeb): number {
    const base = this.calculateBaseTotal(sel);
    if (!sel.web) return base;
    const extras = sel.pages * sel.languages * PRICE.WEB_EXTRA;
    return base + extras;
  }

  private readonly _budgets = signal<Budget[]>([]);

  readonly budgets = computed(() => this._budgets());

  addBudget(b: Omit<Budget, 'id' | 'date'> & Partial<Pick<Budget, 'id' | 'date'>>): void {
    const id = b.id ?? this._genId();
    const date = b.date ?? new Date();

    const normalized: Budget = {
      id,
      date,
      services: b.services,
      total: b.total,
      client: {
        name: b.client.name,
        email: b.client.email,
        phone: b.client.phone
      }
    };

    this._budgets.update(prev => [normalized, ...prev]);
  }

  removeBudget(id: string): void {
    this._budgets.update(prev => prev.filter(b => b.id !== id));
  }


  clearBudgets(): void {
    this._budgets.set([]);
  }

  private _genId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
