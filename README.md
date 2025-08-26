# 📊 Sprint 6 – Budget Calculator (Angular)

This repository contains the **Sprint 6 project** for the IT Academy Frontend Bootcamp.  
The goal of this sprint is to build a **Budget Calculator Web Application** using **Angular**, following best practices such as **Reactive Forms**, **Services**, **Custom Validators**, and the new **Angular Signals** API.

---

## 🚀 Project Overview

The application allows users to:

- ✅ Select services (SEO campaign, Ads campaign, Website).
- 🔄 Dynamically calculate the budget based on the selected options.
- ⚙️ Adjust website options (number of pages and languages).
- 🛡️ Display validation messages and help tooltips.
- 💾 Save multiple budgets with client details (name, email, phone).
- 📑 Manage and order budgets (by date, price, or alphabetically).
- 🔍 Search budgets by client name.
- 🔗 Share budgets via URL parameters.
  
---

## 📂 Project Structure

Proposed structure:

```bash
src/app/
├── budgets-list/        # Component to list saved budgets
├── home/                # Home page with main form
├── models/              # Interfaces & models (e.g. Budget)
├── panel/               # Component to adjust website options
├── services/            # Budget service (logic & signals)
├── shared/              # Shared components (e.g. modal, validations)
└── welcome/             # Welcome component
```

---

## 🛠️ Tech Stack

- **Angular 17+**
- **TypeScript**
- **SCSS**
- **Bootstrap 5**
- **Angular Signals**

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

---

## 📌 Notes

- This project is **educational** and part of the IT Academy Bootcamp.
- The **`main` branch** contains the production-ready base project.
- Development of exercises (levels 1–3) will be done in **feature branches**.
