# 📘 Day 03 — Type Inference & Annotations

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- When TypeScript infers types automatically (and when to annotate explicitly)
- The 'as const' assertion for literal types and readonly objects
- The satisfies operator (TypeScript 4.9+)
- Using typeof in type position to derive types from values
- Contextual typing — how TypeScript infers from usage context
- Widening vs narrowing of inferred types

---

## 📖 Quick Reference

```ts
// TypeScript infers these — no annotation needed:
let name = "Alice";      // string
let count = 42;          // number
let arr = [1, 2, 3];     // number[]

// Annotate when inference is not obvious:
let status: "loading" | "success" | "error" = "loading";
let userId: number | null = null; // starts null, becomes number

// as const — preserves literal types
const METHOD = "GET" as const;  // type: "GET" not string
const config = { port: 3000, ssl: false } as const;
// type: { readonly port: 3000; readonly ssl: false }

// typeof in type position
const defaultConfig = { host: "localhost", port: 3000 };
type Config = typeof defaultConfig;  // derive type from value!
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

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Total TypeScript](https://www.totaltypescript.com)

---

## ⏭️ Next Up

**[Day 04 — Arrays & Tuples →](../Day-04-Arrays-Tuples/)**
