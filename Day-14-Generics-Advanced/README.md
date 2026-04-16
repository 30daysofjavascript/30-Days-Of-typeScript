# 📘 Day 14 — Generics: Advanced

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### infer — Extract Types from Patterns

The `infer` keyword lets you extract type information from conditional types:

```ts
// Extract return type of any function
type ReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never;

// Extract element type from array
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type Items = ArrayElement<string[]>; // string

// Extract head/tail of tuple
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : [];
```

### Recursive Generics

```ts
// Deep readonly — works for any nesting depth
type DeepReadonly<T> =
  T extends (infer U)[] ? ReadonlyArray<DeepReadonly<U>> :
  T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } :
  T;

// Deep partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
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

**[Day 15 — Utility Types →](../Day-15-Utility-Types/)**
