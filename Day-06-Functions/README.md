# 📘 Day 06 — Functions in TypeScript

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Parameter and return type annotations
- Optional and default parameters
- Rest parameters (...args: T[])
- Function type signatures and type aliases
- Function overloads — multiple signatures for one implementation
- this parameter typing
- Generic functions (preview of Day 13)
- Callable interfaces

---

## 📖 Quick Reference

```ts
// Full annotations
function add(a: number, b: number): number { return a + b; }

// Optional and default
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// Rest params
function sum(...nums: number[]): number { return nums.reduce((a,b) => a+b, 0); }

// Function overloads
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
  return typeof input === "string" ? input.toUpperCase() : input * 2;
}

// Function type alias
type Handler<T> = (value: T) => void;
type Transform<T, U> = (value: T) => U;
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

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## ⏭️ Next Up

**[Day 07 — Union & Intersection Types →](../Day-07-Union-Intersection-Types/)**
