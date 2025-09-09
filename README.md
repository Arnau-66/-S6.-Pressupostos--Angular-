# 💡 Exercise 3 — Sprint 6 (Branch: `feature/exercici3`)

This README belongs **exclusively** to the branch `feature/exercici3`.  
Its purpose is to **prioritize the exercise statement** and define the minimum acceptance criteria.

---

## 📋 Statement (Level 1 — Exercise 3)

> **Help messages with Bootstrap modals**  
> Some users may not fully understand the meaning of the fields for **number of pages** and **number of languages**.  
> To ensure clarity, we must add a **help button** (with an info icon) that opens a **Bootstrap modal** with an explanation.

---

## ✅ Acceptance criteria

- Each input (`pages`, `languages`) has an **info button** (ℹ️) next to it.  
- Clicking the button opens a **Bootstrap modal**.  
- The modal contains:  
  - A **title** (e.g. "Number of pages" / "Number of languages").  
  - A **short description** explaining the meaning of the input and the rule that **each unit adds €30** to the budget.  
- Modals close correctly when pressing **close button** or outside the modal.  

---

## 🧠 Minimal technical design (for this branch)

- Reuse the **Panel component** created in Exercise 2.  
- Add two **Bootstrap modal templates** inside the `panel.html` file.  
- Trigger modal opening with Bootstrap’s **data-bs-toggle** and **data-bs-target** attributes.  
- No new service logic is needed: the calculation is already handled in `BudgetService`.  

---

## 🔗 Relation with following exercises

- **Exercise 4** will build upon the modal system and validation features.  

---

## ▶️ Local execution (reminder)

```bash
npm install
npx ng serve -o
```

> Locale `es-ES` and Bootstrap 5 are already configured in the base project (see `main.ts` and `styles.scss`).
