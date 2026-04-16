# 📘 Day 08 — Literal Types & Type Aliases

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Literal types — exact values as types ("north" | "south" | 1 | 2)
- How const vs let affects literal inference (widening)
- Type aliases for primitives, unions, functions, and objects
- as const assertion for preserving literal types
- satisfies operator (TypeScript 4.9+)
- Branded/opaque types for type-safe IDs
- Recursive type aliases (JSON type, linked lists, trees)
- Template literal types preview

---

## 📖 Quick Reference

```ts
// Literal types — exact values
type Direction = "north" | "south" | "east" | "west";
type Port = 80 | 443 | 3000 | 8080;

// const infers literal; let widens to base type
const METHOD = "GET";  // type: "GET"
let method   = "GET";  // type: string (widened!)

// Fix: as const, or explicit annotation
let method2 = "GET" as const;       // type: "GET"
let method3: "GET" | "POST" = "GET"; // constrained

// Type aliases
type Callback  = () => void;
type Transform<T, U> = (value: T) => U;
type JSONValue = string | number | boolean | null
               | JSONValue[] | { [k: string]: JSONValue };

// Branded types prevent mixing semantically different strings
type UserId  = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
// A UserId cannot be passed where OrderId is expected!
```

---

## 💡 Key Takeaways

- Types describe the shape and constraints of values — use them to prevent entire classes of bugs
- Explicit types on public APIs make code self-documenting and easier to refactor
- TypeScript's type inference is powerful — only annotate when needed
- Build on the type system to make illegal states unrepresentable

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---


## ⏭️ Next Up

**[Day 09 — Enums →](../Day-09-Enums/)**
