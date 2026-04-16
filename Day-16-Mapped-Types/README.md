# 📘 Day 16 — Mapped Types

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### Mapped Type Syntax

```ts
// Basic: { [K in keyof T]: transformation }
type Stringify<T> = { [K in keyof T]: string };
type Optional<T>  = { [K in keyof T]?: T[K] };
type Mutable<T>   = { -readonly [K in keyof T]: T[K] }; // -readonly removes readonly

// Key remapping with 'as' (TypeScript 4.1+)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
// { getName: () => string; getAge: () => number; ... }

// Filter keys — map to never to exclude
type DataOnly<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
// Removes all methods, keeps only data properties

// PickByValue — keep properties matching a type
type StringProps<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
```

---

## 💡 Key Takeaways

- TypeScript's type system is one of the most expressive in any mainstream language
- Invest time learning these type-level programming tools — they unlock code that is safe AND flexible
- Start with basic utility types, then gradually adopt mapped/conditional types as needed

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---

## ⏭️ Next Up

**[Day 17 — Conditional Types →](../Day-17-Conditional-Types/)**
