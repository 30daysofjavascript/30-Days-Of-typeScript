# 📘 Day 25 — Discriminated Unions

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### What Makes a Union "Discriminated"

A discriminated union has a **common literal property** (the discriminant) that uniquely identifies each variant:

```ts
type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "square";    side: number }
  | { kind: "rectangle"; width: number; height: number };
//    ↑ discriminant — same key, different literal values

function area(shape: Shape): number {
  switch (shape.kind) {         // TypeScript narrows based on kind
    case "circle":    return Math.PI * shape.radius ** 2;
    case "square":    return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
    // If you add a new variant and forget to handle it:
    default:
      const check: never = shape; // ← TypeScript errors here! ✅
      throw new Error(check);
  }
}
```

### Result Type

```ts
type Result<T, E extends Error = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

// Forces callers to handle both cases:
const result = divide(10, 0); // Result<number, string>
if (result.ok) {
  console.log(result.value); // ✅ TypeScript knows value: number
} else {
  console.log(result.error); // ✅ TypeScript knows error: string
}
```

---

## 💡 Key Takeaways

- TypeScript's type system enables you to make illegal states unrepresentable
- Advanced types (mapped, conditional, template literal) are type-level programming
- The best TypeScript code is not just safe — it's also self-documenting
- Types are tools: use them to prevent bugs, not to fight the compiler

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Total TypeScript](https://www.totaltypescript.com)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

## ⏭️ Next Up

**[Day 26 — Error Handling with Types →](../Day-26-Error-Handling-Types/)**
