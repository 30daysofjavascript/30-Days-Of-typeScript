# 📘 Day 19 — Modules & Namespaces

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### ES Modules in TypeScript

```ts
// Named exports (any number per file)
export const PI = 3.14;
export type UserId = string | number;
export interface Config { host: string; port: number }
export function greet(name: string): string { return `Hello, ${name}`; }

// Default export (one per file)
export default class App { /* ... */ }

// Type-only imports/exports (TypeScript 3.8+)
import type { User } from "./user";     // guaranteed erased
export type { User };

// Re-export (barrel files)
export { something } from "./other";
export * from "./utils";
export * as Math from "./math";

// Dynamic import
const module = await import("./heavy-module");
```

### Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*":          ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*":     ["src/utils/*"]
    }
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

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## ⏭️ Next Up

**[Day 20 — Declaration Files →](../Day-20-Declaration-Files/)**
