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

# 🟦 TypeScript Quick Start (Beginner Friendly)

This is the easiest way to start using TypeScript.

---

## ✅ What is TypeScript?

TypeScript is just JavaScript with extra features (like type safety).

---

## 📦 Step 1: Create a Project

```bash id="c1a1"
npm init -y
```

---

## 📥 Step 2: Install TypeScript + TSX

```bash id="c1a2"
npm install -D typescript tsx
```

---

## ⚙️ Step 3: Setup TypeScript

```bash id="c1a3"
npx tsc --init
```

---

## 📁 Step 4: Project Structure (Important)

Create folders like this:

```text id="c1a4"
project/
│── src/
│   └── index.ts
│── package.json
│── tsconfig.json
```


---

## ⚙️ Step 5: Update TypeScript Config (IMPORTANT)

Open `tsconfig.json` and update these fields:

```json id="c1a5"
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

---

## 📁 Step 6: Create File

Create:

```text id="c1a6"
src/index.ts
```

Example code:

```ts id="c1a7"
const message: string = "Hello TypeScript";
console.log(message);
```

---

## ▶️ Step 7: Add Dev Script

Open `package.json` and add:

```json id="c1a8"
{
  "scripts": {
    "dev": "tsx src/index.ts"
  }
}
```

---

## 🚀 Step 8: Run Your Code

```bash id="c1a9"
npm run dev
```

---

## 🔁 Auto Reload (Better Version)

Update script:

```json id="c1b0"
{
  "scripts": {
    "dev": "tsx watch src/index.ts"
  }
}
```

Now it will restart automatically when you save.

---

## 🎯 That’s It!

You don’t need to compile manually.

Just run:

```bash id="c1b1"
npm run dev
```

---

## 💡 Simple Explanation

* `typescript` → understands `.ts` files
* `tsx` → runs TypeScript directly
* `src/` → your source code folder
* `npm run dev` → starts your project

---

## 🧠 Tip

* Keep all code inside `src/`
* Output files go to `dist/`
* Don’t edit `dist/` manually

---

## 🚀 Happy Coding!


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

## ⏭️ Next Up

**[Day 02 — Basic Types →](../Day-02-Basic-Types/)**
