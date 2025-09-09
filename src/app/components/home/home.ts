import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BaseSelection, BudgetService, SelectionWithWeb } from '../../services/budget';
import { Panel } from '../panel/panel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Panel],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  form: FormGroup;
  total = 0;

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
  }

  inc (field: 'pages' | 'languages'): void {
    let c = this.form.get(field)!;
    let val = Number (c.value) || 1;
    c.setValue(Math.max(1,val -1));
  }
}


