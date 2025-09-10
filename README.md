# ✅ Exercise 4 — Sprint 6 (Branch: `feature/exercici4`)

This README belongs **exclusively** to the branch `feature/exercici4`.  
Goals for this branch:

1) **Add unit tests** for an important part of the app (as required by the exercise).  
2) **Migrate structural directives** to the new Angular control-flow syntax (`@if`, `@for`, `@switch`).

---

## 📋 Statement (Level 1 — Exercise 4)

> “Create a **unit test** for any functionality you consider important.”

In this branch we will cover **core behavior** of the budgeting flow and add a small UI test for the panel.

---

## ✅ Acceptance criteria

- At least **one meaningful unit test** is implemented and passing.  
- Test(s) run with the Angular default tooling (Karma/Jasmine).  
- The tests verify **business logic** (BudgetService) and optionally a **UI behavior** (Panel).
- CI-friendly: the test command can run in headless mode.

---

## 🧪 Test plan

### 1) `BudgetService` (business logic)
File: `src/app/services/budget.spec.ts`

**What to test**
- Base total for Exercise 1.
- Total with website extras for Exercise 2.
- No extras when `web === false`.
- Boundary values: minimum page/language = 1.

**Suggested cases**
```ts
// Example expectations
// 1) Base only
// {seo:true, ads:false, web:false} -> 300
// 2) Base + web only
// {seo:false, ads:false, web:true, pages:1, languages:1} -> 500 + 1*1*30 = 530
// 3) Full selection
// {seo:true, ads:true, web:true, pages:2, languages:2} -> 300+400+500 + 2*2*30 = 1260
// 4) No extras when web=false
// {seo:false, ads:true, web:false, pages:10, languages:10} -> 400
```

### 2) `Panel` (UI behavior)
File: `src/app/components/panel/panel.spec.ts`

**What to test**
- The `inc('pages')` and `dec('pages')` methods update the bound `FormGroup` and **never go below 1**.
- Same for `languages`.
- (Optional) The template renders the current values (sanity check).

**Tips**
- Use `FormBuilder` to create a `FormGroup` and pass it as `@Input` to the component instance.
- Verify `component.form.get('pages')?.value` after calling `inc/dec`.

---

## ▶️ How to run tests

```bash
# run tests in watch mode
npx ng test

---

## 🔁 Migration to new Angular control flow (`@if`, `@for`, `@switch`)

We will **replace** structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`) with the new, faster and clearer syntax introduced in Angular 17+.

### Why
- Better performance (no implicit `ng-template` creation).
- Consistent, **block-based** syntax similar to TypeScript.
- Works perfectly with standalone components.

### Cheatsheet

**`*ngIf` → `@if`**
```html
<!-- Before -->
<div *ngIf="form.get('web')?.value">Panel</div>

<!-- After -->
@if (form.get('web')?.value) {
  <div>Panel</div>
} @else {
  <div>Sin Web</div>
}
```

**`*ngFor` → `@for`**
```html
<!-- Before -->
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>

<!-- After -->
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No items</li>
}
```

**`*ngSwitch` → `@switch`**
```html
<!-- Before -->
<div [ngSwitch]="mode">
  <p *ngSwitchCase="'view'">View</p>
  <p *ngSwitchCase="'edit'">Edit</p>
  <p *ngSwitchDefault>Unknown</p>
</div>

<!-- After -->
@switch (mode) {
  @case ('view') { <p>View</p> }
  @case ('edit') { <p>Edit</p> }
  @default { <p>Unknown</p> }
}
```

> Note: With `@if/@for/@switch` you **don’t need `CommonModule` just for those blocks**, but you may still need it for other directives like `ngClass`, `ngStyle`, pipes from `CommonModule`, etc. We’ll keep `CommonModule` imported where used.

---

## 🔧 Scope of changes in this branch
 
- Migrate templates in `home.html` and `panel.html` to the new control-flow where applicable:
  - Replace any `*ngIf` with `@if` (e.g., the conditional panel under Web).
  - If any loops exist, replace `*ngFor` with `@for`.

---

## ▶️ Local execution (reminder)

```bash
npm install
npx ng serve -o
```

> Bootstrap 5 and locale `es-ES` are already configured in the base project.
