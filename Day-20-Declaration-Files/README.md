# 📘 Day 20 — Declaration Files (.d.ts)

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### What are .d.ts Files?

Declaration files describe the shape of existing JavaScript to TypeScript. They contain **only types** — no runtime code.

```ts
// math-lib.d.ts — describes a JavaScript library
declare function add(a: number, b: number): number;
declare const VERSION: string;
declare namespace Utils {
  function clamp(n: number, min: number, max: number): number;
}
```

### Module Declarations

```ts
// For untyped npm packages:
declare module "untyped-package" {
  export function doWork(input: string): number;
  export interface Options { timeout?: number; retries?: number }
  export default class Client {
    constructor(opts?: Options);
    connect(): Promise<void>;
  }
}
```

### Global Augmentation

```ts
// Add to existing global types
declare global {
  interface Window { analytics: Analytics; }
  interface Array<T> { groupBy<K>(fn: (item: T) => K): Record<string, T[]> }
}
```

### Generating .d.ts from Your Code

```json
// tsconfig.json for a library
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true
  }
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

## ⏭️ Next Up

**[Day 21 — Decorators →](../Day-21-Decorators/)**
