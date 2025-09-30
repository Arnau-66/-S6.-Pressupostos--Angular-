import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BudgetService } from '../../services/budget';
import { encodeToSearchParams } from '../../utils/url';

type SortKey = 'date' | 'price' | 'name';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './budget-list.html',
  styleUrl: './budget-list.scss'
})

export class BudgetList {

  constructor(public service: BudgetService){}

  readonly query = signal<string>('');
  readonly sortKey = signal<SortKey>('date');
  readonly sortDir = signal<SortDir>('desc');

  copiedId: string | null = null;
  copyErrorId: string | null = null;

  private norm(s: string): string {
    return s
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase();
    }

  readonly filteredSortedBudgets = computed(() => {
    const q = this.norm(this.query().trim());
    const key = this.sortKey();           
    const dir = this.sortDir();
    
    const list = [...this.service.budgets()];
    const filtered = q ? list.filter(b => this.norm(b.client.name).includes(q)) : list;

    return this.sortList(filtered, key, dir);
  });

  private sortList(list: any[], key: SortKey, dir: SortDir) {
    list.sort((a, b) => {
      let cmp = 0;

      switch (key) {
        case 'date': {
          const at = new Date(a.date).getTime();
          const bt = new Date(b.date).getTime();
          cmp = at - bt;
          break;
        }
        case 'price': {
          cmp = a.total - b.total;
          break;
        }
        case 'name': {
          cmp = a.client.name.localeCompare(b.client.name, 'es', {
            sensitivity: 'base',
          });
          break;
        }
      }

      return dir === 'asc' ? cmp : -cmp;
    });

    return list;
  }

  private buildShareUrlFromBudget(b: {
    services: { seo: boolean; ads: boolean; web: boolean; pages: number; languages: number; };
    client: { name: string; email: string; phone?: string; };
  }): string {
    const base = window.location.origin + window.location.pathname;

    const state = {
      seo: !!b.services.seo,
      ads: !!b.services.ads,
      web: !!b.services.web,
      pages: Number(b.services.pages ?? 1),
      languages: Number(b.services.languages ?? 1),
      name: String(b.client.name ?? ''),
      email: String(b.client.email ?? ''),
      phone: String(b.client.phone ?? ''),
    };

    return encodeToSearchParams(state, base);
  }

  async onCopyBudgetLink(budget: any): Promise<void> {
    this.copiedId = null;
    this.copyErrorId = null;

    const url = this.buildShareUrlFromBudget(budget);

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

      this.copiedId = budget.id;
      setTimeout(() => (this.copiedId = null), 2000);
    } catch (err) {
      console.error(err);
      this.copyErrorId = budget.id;
      setTimeout(() => (this.copyErrorId = null), 3000);
    }
  }



  setSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
      return;
    }

    this.sortKey.set(key);
    this.sortDir.set(key === 'name' ? 'asc' : 'desc');
  }
}
