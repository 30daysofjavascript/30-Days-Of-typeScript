# 📘 Day 13 — Generics: Basics

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### Why Generics?

Without generics, you either lose type safety (use `any`) or duplicate code (write one function per type). Generics give you **one implementation with full type safety**.

```ts
// Without generics: either any (unsafe) or duplicate code
function firstAny(arr: any[]): any { return arr[0]; } // loses types

// With generics: one function, full type safety
function first<T>(arr: T[]): T | undefined { return arr[0]; }

const s: string  = first(["a","b","c"]); // TypeScript infers T=string
const n: number  = first([1, 2, 3]);     // TypeScript infers T=number
```

### Generic Constraints

```ts
// T must have a .length property
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
getLength("hello");    // ✅
getLength([1, 2, 3]);  // ✅
// getLength(42);       // ❌ number has no .length

// T must be a key of U
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Generic Classes and Interfaces

```ts
class Stack<T> {
  private items: T[] = [];
  push(item: T): void  { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}

interface Repository<T> {
  findById(id: number): Promise<T | null>;
  create(item: Omit<T, "id">): Promise<T>;
}
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

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## ⏭️ Next Up

**[Day 14 — Generics: Advanced →](../Day-14-Generics-Advanced/)**
