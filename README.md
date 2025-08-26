# 📊 Sprint 6 – Budget Calculator (Angular) · develop

This README describes the **develop** branch of the project.  
`develop` is the active integration branch used for day‑to‑day work. The `main` branch keeps the stable, deliverable state.

---

## 🚀 Scope (same app as main, development focus)

- Select services (SEO, Ads, Website) and compute total dynamically.
- Website options: pages × languages (extra cost).
- Validations and help modal.
- Multi‑budget list with sort & search.
- Share state via URL parameters.
- **This branch focuses on ongoing development and integration.**

---

## 🛠️ Tech Stack

- **Angular 17+**
- **TypeScript**
- **SCSS**
- **Bootstrap 5**
- **Angular Signals**

---

## ⚙️ Quick Start (develop)

```bash
git clone https://github.com/Arnau-66/-S6.-Pressupostos--Angular-.git
cd -S6.-Pressupostos--Angular-
git checkout develop || git checkout -b develop
npm install
npx ng serve -o
```

> Nota: usamos **Angular CLI local** (vía `npx`), no global.

---

## 🌿 Branching (short)

- `main` → estable / entregas.
- `develop` → integración continua.
- `feature/*` → trabajo por funcionalidad (merge a `develop` mediante PR).

Ejemplos de features:
- `feature/forms-n1-e1`
- `feature/panel-n1-e2`
- `feature/sort-search-n2-e6-e7`

---

## 📂 Structure (planned)

```bash
src/app/
├── budgets-list/        # List of saved budgets
├── home/                # Main form
├── models/              # Interfaces & models
├── panel/               # Pages & languages panel
├── services/            # Budget service (logic & signals)
└── shared/              # Modal, validations, etc.
```

---

## 📌 Notes

- Educational project (IT Academy Bootcamp).
- Keep commits concise (Conventional Commits recommended).
- Use feature branches and PRs to `develop`. Merge to `main` only for releases.
