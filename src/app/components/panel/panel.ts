import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.scss'
})
export class Panel {
  @Input ({ required: true}) form!: FormGroup;

  inc (field: 'pages' | 'languages'): void {
    let c = this.form.get(field)!;
    let val = Number(c.value) || 0;
    c.setValue(val + 1);
  }

  dec (field: 'pages' | 'languages'): void {
    let c = this.form.get(field)!;
    let val = Number(c.value) || 1;
    c.setValue(Math.max(1, val -1));
  }

}
