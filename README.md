# 🚀 Exercise 8 – Budget App (Angular)

## 📌 Description

This exercise builds on the **previous functionality (Exercise 7)** where we added a search bar to filter budgets by client name.  
Now, we introduce a **budget persistence feature** so that saved budgets remain available even after refreshing or reopening the app.  

---

## 🎯 Goals

- Store the **budgets** in the browser’s **Local Storage**.  
- Ensure that when the app reloads, previously saved budgets are **automatically restored**.  
- Keep all existing features working:  
  - Adding budgets  
  - Deleting budgets  
  - Sorting (date, price, name)  
  - Searching by client name  

---

## 🛠️ Implementation Steps

1. **Update the BudgetService**  
   - Add logic to **save budgets** to `localStorage` whenever they change.  
   - Load budgets from `localStorage` when the service initializes.

2. **Component Integration**  
   - No changes in the template (`budget-list.html`) are required.  
   - The list should work seamlessly with the persisted data.

3. **Testing (budget-list.spec.ts)**  
   - Verify that when budgets are added, they are stored in `localStorage`.  
   - Ensure that after refreshing (simulated in tests), budgets are restored.  
   - Confirm that deleting budgets updates `localStorage` correctly.

---

## ✅ Expected Behaviour

- Add a new budget → it remains visible even after refreshing the page.  
- Delete a budget → it disappears both from the app and `localStorage`.  
- Search and sorting → continue to work normally on the persisted budgets.  

---

## 📂 Branch Information

- **Branch name:** `feature/exercici8`  
- Builds on: `feature/exercici7`  
- Related files:
  - `src/app/services/budget.ts`  
  - `src/app/components/budget-list/budget-list.ts`  
  - `src/app/components/budget-list/budget-list.spec.ts`

---

## 🧪 Testing

- Framework: **Karma + Jasmine**  
- Run tests with:

```bash
npm run test
```

Tests to implement:
- [ ] Stores budgets in `localStorage` when added.  
- [ ] Restores budgets from `localStorage` on service initialization.  
- [ ] Updates `localStorage` when deleting a budget.  
