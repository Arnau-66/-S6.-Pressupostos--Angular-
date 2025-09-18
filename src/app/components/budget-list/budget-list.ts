import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BudgetService } from '../../services/budget';

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

  readonly sortKey = signal<SortKey>('date');
  readonly sortDir = signal<SortDir>('desc');

  readonly sortedBudgets = computed(() => {
    const key = this.sortKey();
    const dir = this.sortDir();
    const list = [...this.service.budgets()];

    list.sort((a,b)=> {
      let cmp = 0;

      switch (key) {
        case 'date': {
          const at = new Date(a.date).getTime();
          const bt = new Date(b.date).getTime();
          cmp = at-bt;
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
        }
      }

      return dir === 'asc' ? cmp : -cmp;
    });

    return list;

  });

  setSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
      return;
    }

    this.sortKey.set(key);
    this.sortDir.set(key === 'name' ? 'asc' : 'desc');
  }
}
