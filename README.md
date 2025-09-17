# 🧾 Exercici 6 — Sprint 6 (Branch: `feature/exercici6`)

This README belongs **exclusively** to the branch `feature/exercici6`.  
Its purpose is to **prioritize the exercise statement** and define the minimum acceptance criteria.

---

## 📋 Statement (Level 1 — Exercise 6)

> **Sorting the budget list**  
> When many budgets are saved, it becomes difficult to find them.  
> To improve usability, add **three buttons** that allow sorting the list in different ways:
>
> 1. **Sort by date**  
> 2. **Sort by total price**  
> 3. **Sort alphabetically by client name**

---

## ✅ Acceptance criteria

- Three buttons are displayed above the list of budgets:  
  - **“Sort by Date”**  
  - **“Sort by Price”**  
  - **“Sort by Name”**  
- When a button is clicked, the list reorders accordingly.  
- Sorting affects only the **rendering order** (data stays in the service).  
- Default order (before clicking) = **insertion order** (as in previous exercises).  
- Sorting works **reactively** with Angular **signals** so the list updates instantly.  

---

## 🧠 Minimal technical design (for this branch)

- **BudgetService** (already implemented in E5)  
  - Keeps the reactive array of budgets as a `signal<Budget[]>`.  
- **BudgetList component**  
  - Displays the budgets as in E5.  
  - Adds three buttons in the header for sorting.  
  - Implements a local `signal` (e.g., `sortCriteria = signal<'date' | 'price' | 'name' | 'none'>('none')`) to store the current sort.  
  - Uses a **computed signal** to return the sorted budgets based on the chosen criteria.  

---

## 🧪 (Optional) Suggested tests for this exercise

- Ensure the **three buttons** exist and are clickable.  
- Add two or more budgets with different `date`, `total`, and `name`.  
- Click **“Sort by Date”** and verify the order is chronological.  
- Click **“Sort by Price”** and verify order matches ascending totals.  
- Click **“Sort by Name”** and verify alphabetical order by `client.name`.  

---

## 🔗 Relation with previous exercises

- **Exercise 5** created the list of budgets using `BudgetList` and signals.  
- **Exercise 6** builds on top of this by adding **sorting functionalities** to the same component.  
- Filtering and searching (if required later) will extend the same pattern.

---

## ▶️ Local execution (reminder)

```bash
npm install
npx ng serve -o
```
## 🧪 Testing (reminder)

```bash
npx ng test
```
> Locale `es-ES` and Bootstrap 5 are already configured in the base project (see `main.ts` and `styles.scss`).  
