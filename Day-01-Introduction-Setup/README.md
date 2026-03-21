# 📘 Day 01 — Introduction to TypeScript & Setup

> **Level:** 🟢 Beginner | **Estimated Time:** 1.5–2 hours

---

## 🎯 What You'll Learn

- What TypeScript is and why it exists
- TypeScript vs JavaScript — key differences
- Setting up your TypeScript environment
- Your first type annotations
- Type inference — when TypeScript figures out types for you
- The compilation process (`.ts` → `.js`)
- Overview of `tsconfig.json`

---

## 🤔 Why TypeScript?

JavaScript is **dynamically typed** — types are only checked at runtime:

```js
// JavaScript — this crashes at runtime!
function getUser(id) {
  return users[id].name; // TypeError if id is undefined
}
getUser();  // crashes the app
```

TypeScript is **statically typed** — types are checked at compile time:

```ts
// TypeScript — error caught BEFORE running
function getUser(id: number): string {
  return users[id].name;
}
getUser();  // ❌ Compile Error: Expected 1 argument, got 0
```

---

## 🛠 Setup

### 1. Install Node.js
Download from [nodejs.org](https://nodejs.org) (v18+ recommended)

### 2. Install TypeScript
```bash
npm install -g typescript    # TypeScript compiler
npm install -g ts-node       # Run .ts files directly
```

### 3. Verify Installation
```bash
tsc --version    # Should print: Version 5.x.x
ts-node --version
```

### 4. Install VS Code Extensions
- **TypeScript + JavaScript (built-in)** — syntax highlighting
- **Error Lens** — show errors inline
- **Pretty TypeScript Errors** — more readable error messages

---

## 📖 Concepts Covered

### 1. Type Annotations

Add `: Type` after a variable or parameter name:

```ts
let name: string     = "Alice";
let age: number      = 30;
let active: boolean  = true;
let nothing: null    = null;
let empty: undefined = undefined;
```

### 2. Type Inference

TypeScript can **infer** types from the initial value — you don't always need to annotate:

```ts
let name = "Alice";   // TypeScript infers: string
let age  = 30;        // TypeScript infers: number
let flag = true;      // TypeScript infers: boolean

name = 42;  // ❌ Error: Type 'number' is not assignable to type 'string'
```

> 🔑 **Rule:** Let TypeScript infer when it's obvious; annotate when it's not.

### 3. Function Types

```ts
function greet(name: string, age: number): string {
  return `Hello, ${name}! Age: ${age}`;
}
//            ↑ param types       ↑ return type

greet("Alice", 30);    // ✅
greet(30, "Alice");    // ❌ Wrong order — caught at compile time!
```

### 4. The Compilation Pipeline

```
your-code.ts   →   tsc compiler   →   your-code.js   →   Node.js / Browser
  (TypeScript)                         (JavaScript)
```

Types are **erased** after compilation — zero runtime overhead!

### 5. tsconfig.json

Generated with `tsc --init`:

```json
{
  "compilerOptions": {
    "target": "ES2022",      // output JS version
    "strict": true,          // enable ALL strict checks ← always do this!
    "outDir": "./dist",      // where compiled files go
    "rootDir": "./src"       // where source files are
  }
}
```

---

## 💡 Key Takeaways

- TypeScript is a **superset of JavaScript** — all JS is valid TS
- Types only exist in `.ts` files — they're **erased** on compilation
- TypeScript catches bugs **at compile time**, not at runtime
- **`strict: true`** in tsconfig is the most important setting — always enable it
- TypeScript **infers** most types — you don't need to annotate everything

---

## ⚡ Quick Reference

| Concept | Syntax |
|---------|--------|
| Variable annotation | `let x: string = "hi"` |
| Function params | `function f(a: number, b: string)` |
| Return type | `function f(): boolean` |
| No return | `function f(): void` |
| Compile | `tsc file.ts` |
| Run directly | `ts-node file.ts` |

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom.

1. Add type annotations to `city`, `population`, `isCapital` variables
2. Fix `calculateArea()` with proper parameter and return types
3. Create a `Product` interface and a variable matching it
4. Identify and explain the TypeScript errors in the broken examples
5. Write a `formatPrice(amount, currency)` function with correct types

---

## 🔗 Further Reading

- [TypeScript Official Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) — try TS in browser
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

## ⏭️ Next Up

**[Day 02 — Basic Types →](../Day-02-Basic-Types/)**
