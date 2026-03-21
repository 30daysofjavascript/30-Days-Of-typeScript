# 📘 Day 28 — Advanced Type Patterns

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### Builder Pattern

```ts
class QueryBuilder<T> {
  select(...cols: (keyof T)[]): this { /* ... */ return this; }
  where(condition: string): this      { /* ... */ return this; }
  limit(n: number): this              { /* ... */ return this; }
  build(): string                     { /* ... */ }
}
// Fluent chaining with 'this' return type — works with subclasses!
```

### Branded/Opaque Types

```ts
// Prevents mixing semantically different IDs
declare const _brand: unique symbol;
type Brand<T, B> = T & { readonly [_brand]: B };

type UserId    = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function getUser(id: UserId) { /* ... */ }
const uid = "user-1" as UserId;
const pid = "prod-1" as ProductId;

getUser(uid);  // ✅
// getUser(pid); // ❌ ProductId ≠ UserId — caught at compile time!
```

### Dependency Injection Container

```ts
type Token<T> = { readonly name: string };

class Container {
  bind<T>(token: Token<T>, factory: () => T): this { /* ... */ return this; }
  singleton<T>(token: Token<T>, factory: () => T): this { /* ... */ return this; }
  resolve<T>(token: Token<T>): T { /* ... */ }
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

**[Day 29 — tsconfig & Tooling →](../Day-29-TypeScript-Config-Tooling/)**
