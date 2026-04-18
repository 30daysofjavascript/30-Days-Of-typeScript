# 📘 Day 01 — Introduction to TypeScript & Setup

> **Level:** 🟢 Beginner | **Estimated Time:** 1.5–2 hours

---

### 🎯 What You'll Learn

- What TypeScript is and why it exists
- TypeScript vs JavaScript — key differences
- Setting up your TypeScript environment
- Your first type annotations
- Type inference — when TypeScript figures out types for you
- The compilation process (`.ts` → `.js`)
- Overview of `tsconfig.json`


## 📘 What is TypeScript?

TypeScript is an open-source programming language developed by Microsoft. It is a superset of JavaScript, which means it builds on top of JavaScript by adding extra features—most notably static typing.

Any valid JavaScript code is also valid TypeScript code, but TypeScript introduces tools that help developers catch errors early and write more maintainable code.

---

### ❓ Why TypeScript Exists

JavaScript is powerful and flexible, but that flexibility can sometimes lead to bugs—especially in large applications. TypeScript was created to solve these problems by adding structure and safety.

---

### 🔑 Key Reasons

### 1. Static Typing

TypeScript allows you to define types for variables, function parameters, and return values.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

This helps catch errors during development instead of at runtime.

---

### 2. Better Tooling & Autocomplete

With type information, editors like Visual Studio Code can provide:

* Intelligent autocomplete
* Better navigation
* Inline documentation

---

### 3. Early Error Detection

TypeScript detects potential bugs before the code runs, reducing runtime errors and improving code quality.

---

### 4. Scalability for Large Projects

As projects grow, maintaining pure JavaScript becomes harder. TypeScript adds structure, making code easier to manage in large teams and codebases.

---

### 5. Modern JavaScript Features

TypeScript supports the latest JavaScript features and compiles them into code that works in older environments.

---

### 🚀 In Short

TypeScript exists to make JavaScript development:

* More predictable
* Easier to maintain
* Safer for large-scale applications


---

## ⚔️ TypeScript vs JavaScript — Key Differences

Both TypeScript and JavaScript are used to build modern web applications, but they differ in how they handle code structure, safety, and scalability.

---

### 🔹 1. Typing System

* **JavaScript**: Dynamically typed (types are determined at runtime)
* **TypeScript**: Statically typed (types are defined and checked at compile time)

```js
// JavaScript
let value = "hello";
value = 10; // No error
```

```ts
// TypeScript
let value: string = "hello";
value = 10; // ❌ Error
```

---

### 🔹 2. Error Detection

* **JavaScript**: Errors are usually found at runtime
* **TypeScript**: Errors are caught during development (compile time)

---

### 🔹 3. Compilation

* **JavaScript**: Runs directly in browsers
* **TypeScript**: Must be compiled (transpiled) into JavaScript before running

---

### 🔹 4. Code Maintainability

* **JavaScript**: Can become harder to manage in large projects
* **TypeScript**: Easier to maintain due to type safety and structure

---

### 🔹 5. Tooling & IDE Support

* **JavaScript**: Basic editor support
* **TypeScript**: Enhanced support (autocomplete, refactoring, type hints)

---

### 🔹 6. Scalability

* **JavaScript**: Better suited for small to medium projects
* **TypeScript**: Designed for large-scale applications and teams

---

### 🔹 7. Learning Curve

* **JavaScript**: Easier for beginners
* **TypeScript**: Slightly steeper due to types and additional concepts

---

### 🔹 8. Object-Oriented Features

* **JavaScript**: Supports OOP but less structured
* **TypeScript**: Strong support with interfaces, enums, and access modifiers

---

### 📊 Quick Comparison Table

| Feature         | JavaScript   | TypeScript   |
| --------------- | ------------ | ------------ |
| Typing          | Dynamic      | Static       |
| Error Checking  | Runtime      | Compile-time |
| Compilation     | Not required | Required     |
| Maintainability | Moderate     | High         |
| Scalability     | Limited      | Excellent    |
| Tooling         | Basic        | Advanced     |

---

### 🚀 In Summary

* Use **JavaScript** for simple, quick projects
* Use **TypeScript** for large, complex, and scalable applications

TypeScript builds on JavaScript by adding safety, structure, and better developer experience—making it a powerful choice for modern development.

---

## 🟦 TypeScript Quick Start (Beginner Friendly)

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

### 🚀 Happy Coding!


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


### 📖 Concepts Covered

## 🏷️ Type Annotations in TypeScript (Full Guide)

Type annotations are one of the core features of TypeScript. They allow you to explicitly define the type of variables, function parameters, and return values—making your code safer, more predictable, and easier to understand.

---

## 🔹 What Are Type Annotations?

A **type annotation** is a way to tell TypeScript what type a value should be.

```ts
let username: string = "John";
let age: number = 25;
let isActive: boolean = true;
```

Here, `string`, `number`, and `boolean` are explicit type annotations.

---

## 🔹 Why Use Type Annotations?

* Catch errors early (before runtime)
* Improve code readability
* Enable better IDE support (autocomplete, hints)
* Make large codebases easier to maintain

---

### 🔹 Basic Types

### 1. Primitive Types

```ts
let name: string = "Alice";
let age: number = 30;
let isLoggedIn: boolean = false;
```

---

### 2. Arrays

You can define arrays in two ways:

```ts
let numbers: number[] = [1, 2, 3];

let fruits: Array<string> = ["apple", "banana"];
```

---

### 3. Tuples

A tuple is a fixed-length array with specific types:

```ts
let user: [string, number] = ["John", 25];
```

---

### 4. Enums

Enums allow you to define a set of named constants:

```ts
enum Role {
  Admin,
  User,
  Guest
}

let currentRole: Role = Role.Admin;
```

---

### 5. Any (Avoid When Possible)

`any` disables type checking:

```ts
let data: any = "Hello";
data = 42; // No error
```

⚠️ Use sparingly, as it removes TypeScript’s safety.

---

### 6. Unknown (Safer Alternative to any)

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

---

### 7. Void

Used when a function does not return anything:

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

---

### 8. Null and Undefined

```ts
let u: undefined = undefined;
let n: null = null;
```

---

## 🔹 Type Annotations in Functions

### Parameters and Return Types

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### Optional Parameters

```ts
function greet(name: string, age?: number): string {
  return `Hello ${name}`;
}
```

### Default Parameters

```ts
function greetUser(name: string = "Guest"): string {
  return `Hello ${name}`;
}
```

---

### 🔹 Object Type Annotations

```ts
let user: { name: string; age: number } = {
  name: "John",
  age: 25
};
```

---

### 🔹 Type Aliases

You can create reusable types:

```ts
type User = {
  name: string;
  age: number;
};

let user1: User = {
  name: "Alice",
  age: 30
};
```

---

### 🔹 Union Types

Allow multiple possible types:

```ts
let id: number | string;

id = 101;
id = "A101";
```

---

### 🔹 Literal Types

Restrict values to specific options:

```ts
let direction: "left" | "right";

direction = "left"; // ✅
direction = "up";   // ❌
```

---

### 🔹 Function Type Annotations

```ts
let multiply: (a: number, b: number) => number;

multiply = (x, y) => x * y;
```

---

### 🔹 Type Inference (Important)

TypeScript can automatically infer types:

```ts
let message = "Hello"; // inferred as string
```

👉 You don’t always need annotations—TypeScript is smart enough to guess.

---

### 🔹 When to Use Type Annotations

Use them when:

* Type is not obvious
* Working with function parameters
* Defining APIs or public interfaces
* Using complex objects

Avoid overusing them when TypeScript can infer types easily.

---

### 🔹 Common Mistakes

❌ Overusing `any`
❌ Forgetting return types in complex functions
❌ Incorrect object structure

---

### 🚀 In Summary

Type annotations help you:

* Write safer code
* Catch errors early
* Improve readability
* Build scalable applications

They are the foundation of TypeScript and essential for mastering the language.


## 🧠 Type Inference in TypeScript

Type inference is a powerful feature of TypeScript where the compiler automatically determines the type of a variable, function, or expression without you explicitly specifying it.

In simple terms: **TypeScript figures out the types for you.**

---

## 🔹 What is Type Inference?

When you assign a value to a variable, TypeScript uses that value to infer (guess) its type.

```ts id="k2v9qx"
let message = "Hello";
```

TypeScript automatically infers:

```ts id="8p4mcz"
let message: string = "Hello";
```

You didn’t write the type—but TypeScript understood it.

---

### 🔹 Why Type Inference is Useful

* Reduces the need for unnecessary type annotations
* Keeps code clean and readable
* Still provides type safety
* Works seamlessly with modern editors

---

## 🔹 Common Examples

### 1. Variable Inference

```ts id="s9fd2j"
let count = 10;        // number
let isActive = true;   // boolean
let user = "Alice";    // string
```

---

### 2. Array Inference

```ts id="c7r8l1"
let numbers = [1, 2, 3]; // number[]
```

---

### 3. Object Inference

```ts id="u3pz7a"
let user = {
  name: "John",
  age: 25
};
```

TypeScript infers:

```ts id="d4wq2b"
{
  name: string;
  age: number;
}
```

---

### 4. Function Return Type Inference

```ts id="x1m8nv"
function add(a: number, b: number) {
  return a + b;
}
```

TypeScript infers the return type as `number`.

---

### 5. Contextual Typing

Type inference also works based on context:

```ts id="q6y2pe"
window.addEventListener("click", (event) => {
  console.log(event.clientX);
});
```

Here, TypeScript knows `event` is a `MouseEvent` based on usage.

---

### 🔹 When Type Inference Works Best

Type inference is most effective when:

* Variables are initialized immediately
* Functions return clear values
* Types are simple and obvious

---

### 🔹 When You Should Add Type Annotations

Even though inference is powerful, you should still use explicit types when:

### 1. Type is unclear

```ts id="m4k9zn"
let data; // ❌ inferred as any
```

---

### 2. Complex objects or structures

```ts id="t7v1xp"
let user = {
  name: "John",
  age: 25
};
```

Better:

```ts id="p2x6bc"
type User = { name: string; age: number };
let user: User = { name: "John", age: 25 };
```

---

### 3. Function parameters

```ts id="n8c4zr"
function greet(name) { // ❌ implicit any
  return `Hello ${name}`;
}
```

---

### 4. Public APIs and libraries

Explicit types improve clarity and usability for others.

---

### 🔹 Type Inference vs Type Annotations

| Feature        | Type Inference | Type Annotations |
| -------------- | -------------- | ---------------- |
| Definition     | Automatic      | Manual           |
| Code verbosity | Less           | More             |
| Control        | Limited        | Full control     |
| Best for       | Simple cases   | Complex cases    |

---

### 🔹 Best Practice

👉 Use **type inference by default**, and add **type annotations only when needed**.

This keeps your code:

* Clean
* Readable
* Type-safe

---

### 🚀 In Summary

Type inference allows TypeScript to:

* Automatically detect types
* Reduce boilerplate code
* Maintain strong type safety

It’s one of the reasons TypeScript feels both powerful and easy to use.



## 🔄 The Compilation Process (`.ts` → `.js`)

TypeScript code cannot run directly in browsers or Node.js. It must first be **compiled (transpiled)** into JavaScript.

This process converts `.ts` (TypeScript) files into `.js` (JavaScript) files that can run anywhere JavaScript is supported.

---

## 🔹 What is Compilation?

In TypeScript, **compilation** means:

> Converting TypeScript code into plain JavaScript while checking for type errors.

This is done using the TypeScript compiler:

```bash
tsc
```

---

### 🔹 Basic Flow

```text
TypeScript (.ts) → TypeScript Compiler (tsc) → JavaScript (.js)
```

---

## 🔹 Step-by-Step Example

### 1. Write TypeScript Code

```ts id="a1x9pz"
let message: string = "Hello TypeScript";
console.log(message);
```

---

### 2. Compile the Code

```bash id="k9v3mt"
tsc index.ts
```

---

### 3. Generated JavaScript

```js id="q7n4zc"
var message = "Hello TypeScript";
console.log(message);
```

👉 Notice: Type annotations are removed during compilation.

---

## 🔹 What Happens During Compilation?

### 1. Type Checking

* TypeScript checks for type errors
* Example: assigning a number to a string → ❌ error

### 2. Removing Types

* All type annotations are stripped out
* Final output is plain JavaScript

### 3. Transpiling Modern Features

* Converts modern JavaScript (ES6+) into older versions (ES5, etc.) if needed

---

## 🔹 Using `tsconfig.json`

The `tsconfig.json` file controls how TypeScript compiles your code.

Example:

```json id="z2m8qp"
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

### Key Options:

* **target** → Output JavaScript version
* **outDir** → Where compiled files go
* **rootDir** → Source folder
* **strict** → Enables strict type checking

---

### 🔹 Compile Entire Project

Instead of compiling one file:

```bash id="y4t7ka"
tsc
```

This compiles all files based on `tsconfig.json`.

---

### 🔹 Watch Mode (Auto Compilation)

Automatically recompile when files change:

```bash id="m6p2we"
tsc --watch
```

---

### 🔹 Compilation Errors

If there are type errors:

```ts id="h3v9xn"
let age: number = "25"; // ❌ Error
```

TypeScript will:

* Show the error
* Still compile (unless configured otherwise)

---

### 🔹 No Emit on Error (Optional)

Prevent JavaScript output if errors exist:

```json id="p8d4rs"
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}
```

---

### 🔹 Source Maps (Debugging)

TypeScript can generate source maps:

```json id="c1k7hz"
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

This allows you to debug `.ts` files in the browser instead of `.js`.

---

### 🔹 Project Structure Example

```id="b5n2lv"
project/
│── src/
│   └── index.ts
│── dist/
│   └── index.js
│── tsconfig.json
```

---

### 🔹 Compilation with Modern Tools

In real-world projects, compilation is often handled by:

* Bundlers (Webpack, Vite)
* Frameworks (React, Next.js, Angular)

They internally use the TypeScript compiler.

---

### 🚀 In Summary

The TypeScript compilation process:

* Converts `.ts` → `.js`
* Checks types for errors
* Removes all type annotations
* Ensures compatibility with different JavaScript environments

👉 TypeScript improves your code during development, but the final output is always plain JavaScript.


## 💡 Key Takeaways

- TypeScript is a **superset of JavaScript** — all JS is valid TS
- Types only exist in `.ts` files — they're **erased** on compilation
- TypeScript catches bugs **at compile time**, not at runtime
- **`strict: true`** in tsconfig is the most important setting — always enable it
- TypeScript **infers** most types — you don't need to annotate everything

---
# ⚙️ Overview of `tsconfig.json`

The `tsconfig.json` file is the **configuration file** for a TypeScript project. It tells the TypeScript compiler (`tsc`) how to compile your `.ts` files into `.js`.

Without this file, TypeScript uses default settings—but for real projects, `tsconfig.json` is essential.

---

## 🔹 What is `tsconfig.json`?

It is a JSON file that defines:

* Compiler options
* Project structure
* Files to include or exclude
* Type-checking rules

You can generate it using:

```bash id="q3w7zn"
npx tsc --init
```

---

### 🔹 Basic Example

```json id="x8n2kl"
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}
```

---

### 🔹 Key Sections

### 1. `compilerOptions`

This is the most important section. It controls how TypeScript compiles your code.

### Common Options:

* **target**
  Specifies the JavaScript version output (e.g., ES5, ES6)

* **module**
  Defines module system (commonjs, esnext, etc.)

* **rootDir**
  Folder containing source TypeScript files

* **outDir**
  Folder where compiled JavaScript files go

* **strict**
  Enables all strict type-checking options

---

### 2. `include`

Specifies which files should be compiled:

```json id="c7v1qx"
{
  "include": ["src"]
}
```

---

### 3. `exclude`

Specifies files/folders to ignore:

```json id="p9k4bm"
{
  "exclude": ["node_modules", "dist"]
}
```

---

### 4. `files` (Optional)

Explicitly list files to include:

```json id="r2m8yo"
{
  "files": ["src/index.ts"]
}
```

---

## 🔹 Important Compiler Options (Detailed)

### 🧠 Strict Type Checking

```json id="d6f3wa"
{
  "strict": true
}
```

Enables:

* `noImplicitAny`
* `strictNullChecks`
* And more

---

### 📦 Module Resolution

```json id="j1t9vs"
{
  "module": "commonjs"
}
```

Used for Node.js projects.

---

### 🌐 Target Version

```json id="w5z8lr"
{
  "target": "ES6"
}
```

Controls JavaScript output compatibility.

---

### 📁 Output Directory

```json id="n4b7cx"
{
  "outDir": "./dist"
}
```

Keeps compiled files separate from source code.

---

### 🚫 No Emit on Error

```json id="u2q6ke"
{
  "noEmitOnError": true
}
```

Prevents generating `.js` files if errors exist.

---

### 🗺️ Source Maps

```json id="h8y3pn"
{
  "sourceMap": true
}
```

Helps debug TypeScript in the browser.

---

### ⚡ ES Module Interop

```json id="v3m1qa"
{
  "esModuleInterop": true
}
```

Improves compatibility with CommonJS modules.

---

### 🔹 Project Structure Example

```id="k7x2zd"
project/
│── src/
│   └── index.ts
│── dist/
│   └── index.js
│── tsconfig.json
```

---

### 🔹 How TypeScript Uses `tsconfig.json`

When you run:

```bash id="b9w6rp"
tsc
```

TypeScript will:

* Read `tsconfig.json`
* Compile all included files
* Apply the defined compiler options

---

### 🔹 Extending Config (Advanced)

You can extend another config:

```json id="e4p9xt"
{
  "extends": "./base-config.json"
}
```

Useful for sharing settings across projects.

---

### 🔹 Best Practices

* Always enable `"strict": true`
* Use `rootDir` and `outDir` for clean structure
* Exclude `node_modules` and build folders
* Keep config minimal and readable

---

### 🚀 In Summary

`tsconfig.json` is the **heart of a TypeScript project**:

* Controls compilation behavior
* Defines project structure
* Enables strict type checking
* Helps manage large-scale applications

👉 Mastering this file is key to using TypeScript effectively.

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
