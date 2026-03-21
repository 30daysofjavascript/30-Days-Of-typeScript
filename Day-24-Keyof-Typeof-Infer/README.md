# 📘 Day 24 — keyof, typeof & infer

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### keyof — Get Union of Keys

```ts
interface User { id: number; name: string; active: boolean; }
type Keys = keyof User; // "id" | "name" | "active"

// Type-safe property access
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const name: string = get(user, "name");   // ✅
const id: number   = get(user, "id");     // ✅
// get(user, "invalid");                   // ❌ compile error
```

### typeof — Get Type of a Value

```ts
const config = { host: "localhost", port: 3000 };
type Config = typeof config; // { host: string; port: number }

// Common: keyof typeof for plain objects used as enums
const STATUS = { ACTIVE: "active", INACTIVE: "inactive" } as const;
type StatusKey   = keyof typeof STATUS;   // "ACTIVE" | "INACTIVE"
type StatusValue = typeof STATUS[keyof typeof STATUS]; // "active" | "inactive"
```

### infer — Extract Types

```ts
// Return type of any function
type ReturnOf<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never;

// Element type of array
type Elem<T> = T extends (infer E)[] ? E : never;

// Tuple operations
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;
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

**[Day 25 — Discriminated Unions →](../Day-25-Discriminated-Unions/)**
