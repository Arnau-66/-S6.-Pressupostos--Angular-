# 📑 Exercici 5 — Sprint 6 (Branch: `feature/exercici5`)

This README belongs **exclusively** to the branch `feature/exercici5`.  
Its purpose is to **prioritize the exercise statement** and define the minimum acceptance criteria.

---

## 📋 Statement (Level 2 — Exercise 5)

> **Multiple budgets with client details**  
> Until now, the app only allowed generating **a single budget**.  
> In this exercise, we must extend the functionality so that users can create and manage **multiple budgets**.

The user must fill **three inputs** with client details (name, phone, email).  
Together with the selected services and the calculated total, the budget should be added to a **list of budgets**.

---

## ✅ Acceptance criteria

- Add three inputs for client details:
  - `name`
  - `phone`
  - `email`
- The user can click a button (e.g. *Add Budget*) to save the budget.
- The saved budget must include:
  - Selected services
  - Pages & languages (if web is selected)
  - Total price
  - Client details (name, phone, email)
- All budgets are shown in a **list component** (not directly in Home).

---

## 🧠 Technical design

- Extend `BudgetService`:
  - Create a **Signal** that stores the list of budgets.
  - Provide methods like `addBudget()` and `getBudgets()`.
- Create a new component `BudgetsList`:
  - Reads the budgets from the service.
  - Uses `@for` (instead of `*ngFor`) to render the list.
- Update `Home`:
  - Add the input fields for client details.
  - Connect the button to call the service and add the budget.

---

## 🧪 Testing considerations

- Test that `addBudget()` correctly adds a new budget to the Signal.
- Test that the `BudgetsList` component renders the budgets.
- Validate that form fields for client details are required.

---

## 🔗 Relation with previous exercises

- Builds on **Exercise 1** (base services with checkboxes).  
- Uses **Exercise 2** (pages & languages).  
- Integrates **Exercise 3** (help modals).  
- Extends **Exercise 4** (unit tests).  
- **Exercise 5** introduces Signals to manage budgets list.

---

## ▶️ Local execution (reminder)

```bash
npm install
npx ng serve -o
```

---

## 📘 Notes on Angular Signals

- **Signals** are Angular’s new **reactivity system** (introduced in Angular 16).  
- They replace manual subscriptions with a **simpler, more predictable** way of handling state.  
- A Signal is like a *reactive variable*: when its value changes, Angular automatically updates the UI.
- Example:

```ts
import { signal } from '@angular/core';

const counter = signal(0);

counter();     // read → 0
counter.set(1); // write → updates value
```

In this project, we use Signals to store and reactively update the **budgets list**.
