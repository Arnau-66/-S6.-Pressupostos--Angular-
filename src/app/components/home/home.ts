import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BaseSelection, BudgetService } from '../../services/budget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      web: [false]
    });

    this.form.valueChanges.subscribe((values: BaseSelection )=> {
      this.total = this.budgetService.calculateBaseTotal(values);
    });
  }
}


