# 📘 Day 26 — Error Handling with Types

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### The Problem with throw

TypeScript cannot type thrown values — they're always `unknown` in catch blocks:

```ts
try {
  riskyFunction();
} catch (error) {
  // error is type 'unknown' (TypeScript 4.4+ with useUnknownInCatchVariables)
  error.message; // ❌ Object is of type 'unknown'
  if (error instanceof Error) {
    error.message; // ✅ narrowed to Error
  }
}
```

### Custom Error Classes

```ts
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = new.target.name; // gets subclass name automatically
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string | number) {
    super(`${resource} with id "${id}" not found`, "NOT_FOUND", 404);
  }
}
```

### Result Pattern — Never Throw

```ts
// Instead of throwing, return a Result type
function parseJSON<T>(json: string): Result<T, SyntaxError> {
  try { return { ok: true, value: JSON.parse(json) }; }
  catch (e) { return { ok: false, error: e as SyntaxError }; }
}
// Callers MUST handle the error case — it's visible in the type!
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

**[Day 27 — Async TypeScript →](../Day-27-Async-Types/)**
