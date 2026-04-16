# 📘 Day 17 — Conditional Types

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### Conditional Type Syntax

```ts
// T extends U ? TrueType : FalseType
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<42>;      // false

// Distributive — distributes over union members
type ToArray<T> = T extends any ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]

// infer — extract types
type Flatten<T> = T extends Array<infer Item> ? Item : T;
type D = Flatten<string[]>; // string

// Non-distributive (wrap in [])
type ToArrayND<T> = [T] extends [any] ? T[] : never;
type E = ToArrayND<string | number>; // (string | number)[]
```

### Never in Conditional Types

Returning `never` filters members from a union:

```ts
type Filter<T, U> = T extends U ? T : never;
type Strings = Filter<string | number | boolean, string>; // string
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

**[Day 18 — Template Literal Types →](../Day-18-Template-Literal-Types/)**
