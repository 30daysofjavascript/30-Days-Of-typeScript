# 📘 Day 05 — Objects & Interfaces

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Interface syntax for describing object shapes
- Optional properties with ?
- Readonly properties
- Method signatures (shorthand and property syntax)
- Interface extension with extends
- Declaration merging — multiple interface declarations are merged
- Nested interfaces and recursive interfaces
- Interface vs type alias — when to use each

---

## 📖 Quick Reference

```ts
interface User {
  readonly id: number;     // readonly — set once
  name: string;            // required
  email: string;
  bio?: string;            // optional
  greet(): string;         // method signature
}

// Extension — inherit all properties
interface Admin extends User {
  permissions: string[];
  promote(user: User): void;
}

// Declaration merging — add to existing interface
interface User {
  createdAt: Date;  // merged into User automatically
}

// interface vs type alias:
// Use interface for object shapes (classes, API responses)
// Use type for unions, primitives, functions, tuples
type ID       = string | number;  // ← must use type
type Callback = (err: Error | null) => void;
```

---

## 💡 Key Takeaways

- TypeScript's type system is structural — it checks the *shape* of values, not their class
- Types exist only at compile time — they're completely erased in the output JavaScript
- The more specific your types, the better IntelliSense, safety, and refactoring support you get
- When in doubt: be explicit. TypeScript is documentation that the compiler enforces

---

## 📝 Exercises

Open `index.ts` and complete the numbered exercises at the bottom of the file.

---



## ⏭️ Next Up

**[Day 06 — Functions →](../Day-06-Functions/)**
