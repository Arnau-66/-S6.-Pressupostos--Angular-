# 🚀 Exercise 7 – Budget App (Angular)

## 📌 Description

This exercise builds on the **previous functionality (Exercise 6)** where we implemented sorting by **date, price, and name**.  
Now, we introduce a **search bar** that allows filtering budgets by the **client’s name**.

---

## 🎯 Goals

- Add a **search input field** above the budget list.  
- As the user types, the list should **dynamically filter** to only show budgets whose **client name matches** the query.  
- Search should be **case-insensitive**.  
- Search must work **in combination with sorting** (Exercise 6).

---

## 🛠️ Implementation Steps

1. **Update the template (budget-list.html)**  
   - Add an input field with `(input)` event binding.  
   - Display only budgets matching the search query.

2. **Update the component (budget-list.ts)**  
   - Create a `searchTerm` signal (string).  
   - Add a computed `filteredBudgets` that applies both **search filter** and **sorting**.  
   - Update the template to render `filteredBudgets` instead of the full list.

3. **Testing (budget-list.spec.ts)**  
   - Verify that when typing a name in the search input, only matching budgets appear.  
   - Ensure the search is **case-insensitive**.  
   - Ensure that when search is cleared, all budgets reappear.

---

## ✅ Expected Behaviour

- Typing **"Joan"** → Only budgets with client name *Joan* remain.  
- Typing **"ana"** → Should still match *Ana* (case-insensitive).  
- Clearing the search → All budgets return.  
- Sorting buttons (date, price, name) must still work on the **filtered list**.

---

## 📂 Branch Information

- **Branch name:** `feature/exercici7`  
- Builds on: `feature/exercici6`  
- Related files:
  - `src/app/components/budget-list/budget-list.ts`
  - `src/app/components/budget-list/budget-list.html`
  - `src/app/components/budget-list/budget-list.spec.ts`

---

## 🧪 Testing

- Framework: **Karma + Jasmine**  
- Run tests with:

```bash
npm run test
```

Tests to implement:
- [ ] Renders the correct filtered budgets when typing a search query.  
- [ ] Restores full list when search is cleared.  
- [ ] Works together with sorting (filtered + sorted).  

---
