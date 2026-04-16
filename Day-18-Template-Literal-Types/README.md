# 📘 Day 18 — Template Literal Types

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### Template Literal Type Syntax

```ts
// Basic combination
type EventOn<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = EventOn<"click">;    // "onClick"
type Events = EventOn<"click" | "focus" | "blur">;
// "onClick" | "onFocus" | "onBlur"

// Distribution over unions
type Color = "red" | "green" | "blue";
type Size  = "sm" | "md" | "lg";
type ColorSize = `${Color}-${Size}`;
// "red-sm" | "red-md" | "red-lg" | "green-sm" | ...

// infer in template literals — extract parts
type GetEvent<T extends string> =
  T extends `on${infer E}` ? Uncapitalize<E> : never;
type Click = GetEvent<"onClick">;  // "click"

// String intrinsics
type Up    = Uppercase<"hello">;    // "HELLO"
type Down  = Lowercase<"WORLD">;    // "world"
type Cap   = Capitalize<"hello">;   // "Hello"
type Uncap = Uncapitalize<"Hello">; // "hello"

// Route params
type Params<T extends string> =
  T extends `${string}:${infer P}/${infer Rest}`
    ? P | Params<`/${Rest}`>
    : T extends `${string}:${infer P}` ? P : never;
type RouteParams = Params<"/users/:userId/posts/:postId">;
// "userId" | "postId"
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


## ⏭️ Next Up

**[Day 19 — Modules & Namespaces →](../Day-19-Modules-Namespaces/)**
