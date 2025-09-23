# ✅ Feature Branch – Exercici 8 (Sprint 5 Angular Project)

This document describes the implementation of **Exercise 8** of Sprint 5 from the IT Academy bootcamp.  
The goal of this feature is to allow users to **share and restore budgets through URL parameters**, extending the budget management functionality built in previous exercises.

---

## 🧱 Project Architecture – Atomic Design

The project follows the **Atomic Design** methodology to ensure scalability and reusability:

```
src/
└── app/
    ├── shared/
    │   ├── atoms/       # Smallest UI elements (buttons, inputs)
    │   ├── molecules/   # Groups of atoms (newsletter form, FAQ item)
    │   ├── organisms/   # Complete sections (navbar, hero, features, budget list)
    └── app.component.ts # Root component
```

Key points:
- Each component has its **own HTML, SCSS, and TypeScript** file.
- Styles are **scoped and modular** to avoid global conflicts.
- Standalone Angular components ensure a lightweight and clean structure.

---

## ⚙️ Technologies Used

- **Angular 20.1.1** (Standalone Components + Signals)  
- **Angular Router** (`ActivatedRoute`, `Router`) for reading and updating query parameters  
- **Reactive Forms** for budget input state  
- **TypeScript** for type safety and clean structure  
- **Git & GitHub** for version control and collaboration  

---

## 🚀 Improvements Introduced in Exercici 8

This feature builds on top of Exercici 7 (budget list with sorting and search) and introduces **URL-based state management**:

### 1️⃣ Budget State in URL
- All selected services, pages, languages, and client data are **serialized into query parameters**.
- Example:
  ```
  ?seo=1&ads=0&web=1&pages=2&languages=3&name=Ana&email=ana%40mail.com
  ```

### 2️⃣ Restore State from URL
- When accessing a shared link, the app **reads query parameters** and automatically:
  - Restores checkboxes (SEO, Ads, Web).
  - Applies numeric values for pages and languages.
  - Pre-fills client data (name, email, phone).
  - Updates the total calculation accordingly.

### 3️⃣ Live Sync
- The URL updates in real time as the form changes.
- Uses `replaceUrl: true` to avoid polluting browser history.

### 4️⃣ Share Link Button
- Added a **"Copy Link"** button that copies the current budget URL to the clipboard, allowing users to share their budget configuration easily.

---

## 🧪 Testing Overview

This feature includes **unit tests** and **integration tests** for URL handling:

### ✅ What We Test
- **Serialization helpers**:  
  - Convert form values into correct query parameters.
- **Deserialization helpers**:  
  - Restore default values when parameters are missing or invalid.
- **Router sync**:  
  - Changing the form updates the URL.  
  - Visiting a URL restores the form correctly.
- **Copy Link button**:  
  - Copies the current full URL to clipboard.

### 🛠 Tools & Frameworks
- **Jasmine + Karma** for testing.
- `RouterTestingModule` to mock Angular Router in tests.
- `navigator.clipboard` mock for verifying link copy.

### 📌 How to Run Tests
```bash
ng test
```
This will:
- Build the project in testing mode.
- Run all unit tests with Karma.
- Show live pass/fail results.

---

## 📂 Workflow & Branching Strategy

We follow a **feature-branch workflow**:

- `main` → Stable, production-ready version.  
- `develop` → Integration of completed features.  
- `feature/...` → One branch per feature. For example:  
  - `feature/exercici6` → Budget sorting  
  - `feature/exercici7` → Budget search  
  - `feature/exercici8` → Budget sharing via URL  

**Workflow Example:**
1. Create `feature/exercici8` from `develop`.  
2. Implement the feature.  
3. Commit and push changes to GitHub.  
4. Open a Pull Request (PR) into `develop`.  
5. Merge into `main` once reviewed and tested.

---

## 🧠 Key Concepts Reviewed

- **Signals & Effects** → Reactively manage state updates.  
- **Angular Router Query Params** → Read/write budget configuration in the URL.  
- **Reactive Forms** → Connect URL state with form controls.  
- **Clipboard API** → Copy full URL for sharing.  
- **Testing Best Practices** → Unit + integration coverage for new functionality.

---

## 📅 Last Updated

**September 2025**
