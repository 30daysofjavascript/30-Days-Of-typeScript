# 📘 Day 09 — Enums

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Numeric enums (auto-incremented values, with reverse mapping)
- String enums (preferred — readable, no reverse mapping gotchas)
- const enums — zero runtime cost (fully inlined at compile time)
- Bit flag enums using bitwise operations
- Enum merging with namespaces (add static methods to enums)
- Enums vs union types — when to use each
- Iterating over enum values

---

## 📖 Quick Reference

```ts
// String enum (preferred)
enum Status {
  Pending  = "PENDING",
  Active   = "ACTIVE",
  Inactive = "INACTIVE",
}

// Const enum — no JS object generated (inlined)
const enum Permission {
  Read   = 1,
  Write  = 2,
  Delete = 4,
  Admin  = 8,
}

// Bit flags
const userPerms = Permission.Read | Permission.Write; // 3
const canRead   = (userPerms & Permission.Read) !== 0; // true

// Enum vs union type:
// Enum:  enum Color { Red="red", Blue="blue" }     → JS object exists
// Union: type Color = "red" | "blue"                → no JS, just types
// Use enums for bit flags or runtime iteration; unions for everything else.
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

**[Day 10 — Narrowing & Type Guards →](../Day-10-Narrowing-TypeGuards/)**
