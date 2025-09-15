import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BudgetService } from '../../services/budget';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './budget-list.html',
  styleUrl: './budget-list.scss'
})
export class BudgetList {

  public service: BudgetService;

  constructor(service: BudgetService){
    this.service = service;
  }

}
