# 📘 Day 07 — Union & Intersection Types

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Union types (|) — value can be ONE of several types
- How to work with union types safely (narrowing required)
- Intersection types (&) — value must be ALL of the types
- Nullable types with union (string | null)
- Extract<T,U> and Exclude<T,U> utility types
- When to use union vs intersection

---

## 📖 Quick Reference

```ts
// Union — one OR the other
type ID = string | number;
type Maybe<T> = T | null | undefined;

// Must narrow before using type-specific methods:
function printId(id: string | number) {
  if (typeof id === "string") id.toUpperCase(); // ✅ string
  else id.toFixed();                             // ✅ number
}

// Intersection — all AND all
type WithId        = { id: number };
type WithName      = { name: string };
type WithTimestamp = { createdAt: Date };

type Entity = WithId & WithName & WithTimestamp;
// Must have id, name, AND createdAt

// Extract/Exclude
type StringsOnly = Extract<string | number | boolean, string>; // string
type NoNulls = Exclude<string | null | undefined, null | undefined>; // string
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

**[Day 08 — Literal Types & Type Aliases →](../Day-08-Literal-Types-TypeAliases/)**
