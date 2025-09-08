# 🧾 Exercici 1 — Sprint 6 (Branch: `feature/exercici1`)

This README belongs **exclusively** to the branch `feature/exercici1`.  
Its purpose is to **prioritize the exercise statement** and define the minimum acceptance criteria.

---

## 📋 Statement (Level 1 — Exercise 1)

> **Form with 3 products**  
> The application starts with three *checkboxes*.  
> The user must decide which services are needed to build the budget.
>
> 1. Launch an **SEO campaign** (**€300**)  
> 2. Launch an **Ads campaign** (**€400**)  
> 3. Build a **Website** (**€500**)
>
> **Requirement:** Create a **reactive form** with the 3 products. According to the options selected, the **total price** must update dynamically.

---

## ✅ Acceptance criteria

- A **reactive form** is displayed with 3 *checkboxes*: `seo`, `ads`, `web`.  
- The **total** updates **instantly** when toggling the checkboxes.  
- Base prices are fixed: **SEO €300**, **Ads €400**, **Web €500**.  
- The total calculation **does not depend on the UI**, but on a **function inside a service**.  
- The initial screen **does not yet include** the panel for pages/languages (that’s part of Exercise 2).

---

## 🧠 Minimal technical design (for this branch)

- `src/app/services/budget.service.ts`  
  - `calculateBaseTotal({ seo, ads, web }): number` → sums 300/400/500 depending on selection.  
- `src/app/components/home` (standalone)  
  - `FormGroup` with 3 `FormControl<boolean>` (`seo`, `ads`, `web`).  
  - Subscription to `valueChanges` to recalculate the total.  
- `src/app/models/constants.ts`  
  - `PRICE = { SEO: 300, ADS: 400, WEB: 500, WEB_EXTRA: 30 }` (WEB_EXTRA will be used in Exercise 2).

---

## 🧪 (Optional) Suggested test for this exercise

- **BudgetService**: should correctly return totals for typical combinations:  
  - `{seo:true, ads:false, web:false} => 300`  
  - `{seo:true, ads:true, web:false} => 700`  
  - `{seo:true, ads:true, web:true} => 1200`

---

## 🔗 Relation with following exercises

- **Exercise 2** (pages/languages panel) depends on this form being ready.  
- The **final total** in Exercise 2 will be: `base (E1) + extra (pages × languages × 30)`.

---

## ▶️ Local execution (reminder)

```bash
npm install
npx ng serve -o
```

> Locale `es-ES` and Bootstrap 5 are already configured in the base project (see `main.ts` and `styles.scss`).
