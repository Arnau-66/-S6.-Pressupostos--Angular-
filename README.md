# Budget Calculator (Angular)

This repository contains the **Sprint 6 project** for the IT Academy Frontend Bootcamp.  
The goal of this sprint is to build a **Budget Calculator Web Application** using **Angular 17**, applying modern features like **Standalone Components**, **Angular Signals**, **Reactive Forms**, and automated **Testing**.

---

## 🚀 Project Overview

The application allows users to:

- ✅ Select services (SEO campaign, Ads campaign, Website).  
- 🔄 Dynamically calculate the budget based on selected options.  
- ⚙️ Adjust website options (number of pages and languages).  
- 🛡️ Validate client data with custom validators (name, email, phone).  
- 💬 Show help tooltips for extra guidance.  
- 💾 Save multiple budgets with client details.  
- 📑 Manage and sort budgets (by date, price, or alphabetically).  
- 🔍 Search budgets by client name (case-insensitive).  
- 🔗 Share budgets via **URL parameters**.  
- 📋 Copy link to clipboard from **form** or from **saved budgets list**.  
- 🧪 Run unit tests to guarantee functionality.  

---

## 📂 Project Structure

```bash
src/app/
├── components/
│   ├── home/              # Main form + total calculation
│   ├── panel/             # Website options (pages & languages)
│   ├── budget-list/       # Saved budgets list with search & sort
│   └── welcome/           # Optional welcome/home section
│
├── services/
│   └── budget.ts          # Business logic: totals, storage, signals
│
├── utils/
│   └── url.ts             # Encode/Decode state to share via URL
│
├── models/                # Interfaces and types (Budget, Selection, etc.)
└── shared/                # Shared components (buttons, validations, etc.)
```

---

## 🛠️ Tech Stack

- **Angular 17+** – Standalone Components, new directives (`@if`, `@for`), Signals  
- **TypeScript** – Strong typing and interfaces  
- **Reactive Forms** – Form validation and dynamic updates  
- **Bootstrap 5** – Layout & responsive design  
- **SCSS** – Stylesheets (with possibility to extend with Sass features)  
- **Karma + Jasmine** – Unit testing  

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Arnau-66/-S6.-Pressupostos--Angular-.git
cd -S6.-Pressupostos--Angular-
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npx ng serve -o
```

Open in browser: [http://localhost:4200](http://localhost:4200)

Run tests:

```bash
npm test
```

---

## 🧪 Testing Coverage

The project includes **unit tests** for:

- Rendering budgets in `BudgetList`.  
- Adding and removing budgets.  
- Header count updates (singular/plural).  
- Sorting by name, price, and date.  
- Searching by client name (partial/case-insensitive).  
- Empty states:  
  - **No budgets yet** → when no budgets are stored.  
  - **No results** → when search query returns nothing.  

---

## 📌 Notes

- This project is **educational** and part of the IT Academy Bootcamp.  
- The **`main` branch** contains the production-ready base project.  
- Development of exercises and corrections is done in feature branches (e.g., `develop`, `corrections`).  

---

## 📝 TO DO (Future Improvements)

- 📋 Add more advanced **form validations** (regex for phone/name).  
- 🎨 Better usage of **Sass features** (mixins, variables, partials).  
- 🏠 Add a **Home/Welcome page** before showing budgets.  
- 📍 Include a **footer** to complement the layout.  
