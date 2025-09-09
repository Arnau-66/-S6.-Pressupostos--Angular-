# 🧾 Exercici 2 — Sprint 6 (Branch: `feature/exercici2`)

This README belongs **exclusively** to the branch `feature/exercici2`.  
Its purpose is to **prioritize the exercise statement** and define the minimum acceptance criteria.

---

## 📋 Statement (Level 1 — Exercise 2)

> **Pages and Languages Panel**  
> Once the user selects the **Website service**, an additional panel must appear to configure:  
> - Number of **pages**  
> - Number of **languages**  
>
> The price formula for the website is:  
> **(pages × languages × 30) + 500 (base web price)**

---

## ✅ Acceptance criteria

- When **`web`** is selected, a **panel** is displayed.  
- The panel lets the user **increment/decrement**:
  - Number of pages (default = 1, min = 1)  
  - Number of languages (default = 1, min = 1)  
- The **total** updates instantly according to:  
  **Total = base (E1) + extra (pages × languages × 30)**  
- Values are handled with **Reactive Forms** (`FormGroup` + `FormControl<number>`).  
- Calculations live in the **BudgetService** (new function).  

---

## 🧠 Minimal technical design (for this branch)

- `src/app/services/budget.ts`  
  - Extend with:
    ```ts
    calculateTotalWithWebExtras(sel: { seo: boolean; ads: boolean; web: boolean; pages: number; languages: number; }): number
    ```
  - If `web` is `false`, extras = `0`.
- `src/app/components/panel` (new standalone component)
  - Contains inputs and `+ / −` buttons for **pages** and **languages**.
  - It binds to the parent form via `formGroup`/`formControlName`.
- `src/app/components/home`
  - Shows the **panel** only when `web` is selected.
  - Subscribes to `form.valueChanges` and uses the new service function.

---

## 🔗 Dependency with Exercici 1

- Requires **Exercici 1** form (SEO/Ads/Web) working.  
- Uses constant: `WEB_EXTRA = 30` from `src/app/models/constants.ts`.

---

## ▶️ Local execution (reminder)

```bash
npm install
npx ng serve -o
```

> Locale `es-ES` and Bootstrap 5 are already configured (see `main.ts` and `styles.scss`).
