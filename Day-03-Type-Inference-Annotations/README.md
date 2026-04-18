# 📘 Day 03 — Type Inference & Annotations

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- When TypeScript infers types automatically (and when to annotate explicitly)
- The 'as const' assertion for literal types and readonly objects
- The satisfies operator (TypeScript 4.9+)
- Using typeof in type position to derive types from values
- Contextual typing — how TypeScript infers from usage context
- Widening vs narrowing of inferred types

---

## 🧠 When TypeScript Infers Types Automatically (and When to Use Explicit Annotations)

TypeScript is designed to reduce unnecessary typing work through **type inference**, but there are also situations where you should **explicitly define types** for clarity, safety, or maintainability.

Understanding this balance is key to writing clean and professional TypeScript code.

---

## 🔹 When TypeScript Infers Types Automatically

TypeScript can automatically determine types in many common cases based on the assigned value or context.

---

### 🔹 1. Variable Initialization

When a variable is declared and immediately assigned a value:

```ts id="a1b2c3"
let name = "John";   // inferred as string
let age = 25;        // inferred as number
let isActive = true; // inferred as boolean
```

👉 TypeScript looks at the value and assigns the type automatically.

---

### 🔹 2. Arrays

```ts id="d4e5f6"
let numbers = [1, 2, 3]; // number[]
let names = ["A", "B"];  // string[]
```

---

### 🔹 3. Object Literals

```ts id="g7h8i9"
let user = {
  name: "Alice",
  age: 30
};
```

👉 Inferred as:

```ts
{
  name: string;
  age: number;
}
```

---

### 🔹 4. Function Return Values

```ts id="j1k2l3"
function add(a: number, b: number) {
  return a + b;
}
```

👉 Return type is inferred as `number`.

---

### 🔹 5. Contextual Typing

TypeScript infers types based on context:

```ts id="m1n2o3"
window.addEventListener("click", (event) => {
  console.log(event.clientX);
});
```

👉 `event` is inferred as `MouseEvent`.

---

## 🔹 When You SHOULD Use Explicit Type Annotations

Even though inference is powerful, there are important cases where explicit types are necessary for clarity, safety, or better design.

---

### 🔹 1. When the Type is Not Obvious

```ts id="p1q2r3"
let data;
```

👉 This becomes `any`, which is unsafe.

✔ Better:

```ts
let data: string;
```

---

### 🔹 2. Function Parameters (Always Recommended)

```ts id="s1t2u3"
function greet(name: string) {
  return `Hello ${name}`;
}
```

👉 Without annotation, parameters become `any` (unsafe).

---

### 🔹 3. Complex Objects

```ts id="v1w2x3"
type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};

let user: User = {
  name: "John",
  age: 25,
  isAdmin: false
};
```

👉 Helps readability and consistency in large projects.

---

### 🔹 4. Function Return Types (Important for APIs)

```ts id="y1z2a3"
function getUser(): { name: string; age: number } {
  return { name: "Alice", age: 30 };
}
```

👉 Makes intent clear and avoids accidental return changes.

---

### 🔹 5. Empty or Delayed Initialization

```ts id="b1c2d3"
let message: string;

message = "Hello";
```

👉 Without annotation, TypeScript cannot infer correctly.

---

### 🔹 6. Union Types

```ts id="e1f2g3"
let id: string | number;

id = "abc";
id = 123;
```

👉 Must be explicitly defined.

---

## 🔹 Inference vs Annotation (Comparison)

| Feature       | Type Inference               | Explicit Annotation   |
| ------------- | ---------------------------- | --------------------- |
| Code length   | Short                        | Longer                |
| Safety        | Good (if clear value exists) | Very strong           |
| Readability   | Clean                        | More explicit         |
| Best use case | Simple variables/functions   | Complex logic or APIs |

---

## 🔹 Best Practices

* ✔ Prefer inference when types are obvious
* ✔ Use annotations for function parameters
* ✔ Always annotate complex objects and APIs
* ✔ Avoid unnecessary explicit types
* ✔ Never rely on `any` due to missing annotations

---

## 🚀 In Summary

TypeScript automatically infers types when values are clear and immediate, such as:

* Variable initialization
* Arrays and objects
* Function return values
* Context-based usage

However, you should use explicit type annotations when:

* Types are unclear
* Working with functions or APIs
* Dealing with complex structures
* Preventing `any` from appearing

👉 The best TypeScript code uses a **balance of smart inference and intentional annotations** for maximum clarity and safety.

---

## 🧊 The `as const` Assertion in TypeScript (Literal Types & Readonly Objects)

The `as const` assertion is a special TypeScript feature that makes values **fully immutable (readonly)** and narrows them to their most specific literal types.

It is especially useful when working with **constants, configuration objects, and fixed values**.

---

## 🔹 What `as const` Does

When you use `as const`, TypeScript:

* Converts values into **literal types**
* Makes arrays and objects **readonly**
* Prevents widening of types

---

## 🔹 Without `as const` (Normal Behavior)

```ts id="a1b2c3"
const colors = ["red", "green", "blue"];
```

TypeScript infers:

```ts id="d4e5f6"
string[]
```

👉 The values are just `string[]`, not specific strings.

---

## 🔹 With `as const`

```ts id="g7h8i9"
const colors = ["red", "green", "blue"] as const;
```

Now TypeScript infers:

```ts id="j1k2l3"
readonly ["red", "green", "blue"]
```

👉 Each value becomes a **literal type**, not just `string`.

---

## 🔹 Literal Type Conversion

```ts id="m1n2o3"
const status = "success" as const;
```

Type becomes:

```ts id="p1q2r3"
"success"
```

Instead of:

```ts id="q3r4s5"
string
```

---

## 🔹 Readonly Objects with `as const`

### Without `as const`

```ts id="t1u2v3"
const user = {
  name: "John",
  role: "admin"
};
```

TypeScript infers:

```ts id="v1w2x3"
{
  name: string;
  role: string;
}
```

---

### With `as const`

```ts id="y1z2a3"
const user = {
  name: "John",
  role: "admin"
} as const;
```

TypeScript infers:

```ts id="b1c2d3"
{
  readonly name: "John";
  readonly role: "admin";
}
```

👉 Everything becomes immutable and specific.

---

## 🔹 Arrays Become Fully Readonly

```ts id="e1f2g3"
const numbers = [1, 2, 3] as const;
```

Type becomes:

```ts id="h1i2j3"
readonly [1, 2, 3]
```

---

## 🔹 Why `as const` is Useful

* Prevents accidental changes
* Ensures strict literal types
* Useful for constants and configuration
* Improves type safety in large applications

---

## 🔹 Real-World Example

### Without `as const`

```ts id="k1l2m3"
function getStatus() {
  return "success";
}
```

Return type:

```ts id="n1o2p3"
string
```

---

### With `as const`

```ts id="q1r2s3"
function getStatus() {
  return "success" as const;
}
```

Return type:

```ts id="s1t2u3"
"success"
```

👉 Now TypeScript knows the exact value.

---

## 🔹 Common Pitfalls

### ❌ Expecting mutation to work

```ts id="v1w2x3"
const config = {
  mode: "dark"
} as const;

config.mode = "light"; // ❌ Error (readonly)
```

---

### ❌ Confusing with normal `const`

```ts id="y1z2a3"
const a = [1, 2, 3];
```

👉 `const` only prevents reassignment, NOT internal changes.

```ts id="b1c2d3"
a.push(4); // allowed
```

But:

```ts id="e1f2g3"
const b = [1, 2, 3] as const;
// b.push(4); ❌ Error
```

---

## 🔹 `as const` vs Normal `const`

| Feature              | const           | as const         |
| -------------------- | --------------- | ---------------- |
| Prevent reassignment | ✔ Yes           | ✔ Yes            |
| Prevent mutation     | ❌ No            | ✔ Yes (readonly) |
| Type specificity     | ❌ Widened types | ✔ Literal types  |

---

## 🚀 In Summary

The `as const` assertion:

* Locks values into **literal types**
* Makes objects and arrays **readonly**
* Prevents unintended mutations
* Improves type safety and precision

👉 Use `as const` when you want **fixed, unchanging values with exact types**, especially for configuration objects, constants, and enums-like structures.

---

## 🧩 The `satisfies` Operator in TypeScript

The `satisfies` operator is a modern TypeScript feature that lets you **check if a value matches a type without changing its inferred type**.

It helps you get the best of both worlds:

* Type safety (validation against a type)
* Precise type inference (no type widening)

---

## 🔹 Why `satisfies` Exists

Before `satisfies`, developers often had to choose between:

* Losing inference by using explicit annotations
* Or losing safety by relying only on inference

The `satisfies` operator solves this problem by validating a value against a type **without changing how TypeScript understands it internally**.

---

## 🔹 Basic Syntax

```ts id="a1b2c3"
value satisfies Type
```

---

## 🔹 Simple Example

```ts id="d4e5f6"
type Role = "admin" | "user";

const userRole = "admin" satisfies Role;
```

👉 TypeScript checks:

* `"admin"` is valid in `Role`
* But keeps the type as `"admin"` (not widened to `Role`)

---

## 🔹 Without `satisfies`

```ts id="g7h8i9"
type Role = "admin" | "user";

const userRole: Role = "admin";
```

👉 Type becomes:

```ts id="j1k2l3"
Role
```

You lose the exact literal `"admin"`.

---

## 🔹 With `satisfies` (Better Inference)

```ts id="m1n2o3"
const userRole = "admin" satisfies Role;
```

👉 Type becomes:

```ts id="p1q2r3"
"admin"
```

✔ Still checked against `Role`
✔ Still keeps literal type

---

## 🔹 Works Great with Objects

```ts id="q3r4s5"
type Config = {
  theme: "light" | "dark";
  fontSize: number;
};

const config = {
  theme: "dark",
  fontSize: 16
} satisfies Config;
```

---

## 🔹 What TypeScript Infers

Instead of:

```ts id="t1u2v3"
{
  theme: "light" | "dark";
  fontSize: number;
}
```

It keeps:

```ts id="v1w2x3"
{
  theme: "dark";
  fontSize: 16;
}
```

👉 Exact values are preserved.

---

## 🔹 Why This Is Powerful

* Keeps **strict validation**
* Preserves **exact literal types**
* Improves **autocomplete**
* Avoids unnecessary type widening

---

## 🔹 Real-World Example

### Without `satisfies`

```ts id="y1z2a3"
type Routes = {
  home: string;
  about: string;
};

const routes: Routes = {
  home: "/",
  about: "/about"
};
```

👉 TypeScript loses specific string literals.

---

### With `satisfies`

```ts id="b1c2d3"
const routes = {
  home: "/",
  about: "/about"
} satisfies Routes;
```

👉 Type becomes:

```ts id="e1f2g3"
{
  home: "/";
  about: "/about";
}
```

✔ Exact paths preserved

---

## 🔹 `as const` vs `satisfies`

| Feature        | as const                            | satisfies                       |
| -------------- | ----------------------------------- | ------------------------------- |
| Type behavior  | Makes everything readonly + literal | Validates without changing type |
| Mutability     | ❌ Not allowed                       | ✔ Allowed (normal object)       |
| Type inference | Very strict literals                | Flexible + precise inference    |
| Best use case  | Constants                           | Config objects & validation     |

---

## 🔹 Common Pitfalls

### ❌ Confusing with type annotation

```ts id="h1i2j3"
const config: Config = {
  theme: "dark",
  fontSize: 16
};
```

👉 Loses literal precision.

---

### ❌ Expecting immutability

```ts id="k1l2m3"
const config = {
  theme: "dark"
} satisfies Config;

config.theme = "light"; // ✔ Allowed
```

👉 `satisfies` does NOT make values readonly.

---

## 🔹 When to Use `satisfies`

* When validating object shapes
* When you want strict checking but precise inference
* When working with config objects
* When building APIs or constants with flexible usage

---

## 🚀 In Summary

The `satisfies` operator:

* Ensures a value matches a type
* Preserves the most precise inferred type
* Does NOT widen or lock types unnecessarily
* Does NOT make values readonly

👉 Use `satisfies` when you want **type safety without losing type precision**.

---

## 🧠 Using `typeof` in Type Position to Derive Types from Values

TypeScript allows you to use the `typeof` operator not only in JavaScript code, but also in **type positions**. This lets you **extract a type directly from a value**, instead of manually rewriting it.

This is extremely useful for keeping types and values in sync automatically.

---

## 🔹 What Does “Type Position” Mean?

In TypeScript, there are two contexts:

* **Value position** → runtime code
* **Type position** → compile-time types

Example:

```ts id="a1b2c3"
let x = 10; // value position
type XType = typeof x; // type position
```

---

## 🔹 Basic Example

```ts id="d4e5f6"
const username = "John";

type UsernameType = typeof username;
```

👉 TypeScript infers:

```ts id="g7h8i9"
type UsernameType = string
```

---

## 🔹 Important Behavior: Widening vs Literal Types

### ❌ Without `as const`

```ts id="j1k2l3"
const role = "admin";

type RoleType = typeof role;
```

👉 Result:

```ts id="m1n2o3"
string
```

Because `const` alone does not preserve literal type.

---

### ✔ With `as const`

```ts id="p1q2r3"
const role = "admin" as const;

type RoleType = typeof role;
```

👉 Result:

```ts id="q3r4s5"
"admin"
```

---

## 🔹 Using `typeof` with Objects

```ts id="t1u2v3"
const user = {
  name: "Alice",
  age: 25
};

type UserType = typeof user;
```

👉 Becomes:

```ts id="v1w2x3"
{
  name: string;
  age: number;
}
```

---

## 🔹 Reusing Values as Types

This is where `typeof` becomes very powerful.

```ts id="y1z2a3"
const config = {
  theme: "dark",
  fontSize: 16
};

type ConfigType = typeof config;
```

Now your type is always synced with your value.

---

## 🔹 Why This Is Useful

* Avoids duplicate type definitions
* Keeps types and data in sync
* Reduces maintenance errors
* Improves scalability in large projects

---

## 🔹 Real-World Example

### Without `typeof`

```ts id="b1c2d3"
type APIResponse = {
  success: boolean;
  data: string;
};
```

Now you must manually update type if object changes.

---

### With `typeof`

```ts id="e1f2g3"
const response = {
  success: true,
  data: "Hello"
};

type APIResponse = typeof response;
```

👉 Type automatically stays updated.

---

## 🔹 Works with Functions Too

```ts id="h1i2j3"
function add(a: number, b: number) {
  return a + b;
}

type AddType = typeof add;
```

👉 Result:

```ts id="k1l2m3"
(a: number, b: number) => number
```

---

## 🔹 Combining with `ReturnType` (Advanced)

```ts id="n1o2p3"
function getUser() {
  return {
    name: "John",
    age: 30
  };
}

type UserReturn = ReturnType<typeof getUser>;
```

👉 Extracts only the return type of the function.

---

## 🔹 Common Pitfalls

### ❌ Expecting literal types without `as const`

```ts id="q1r2s3"
const status = "success";

type StatusType = typeof status; // string ❌
```

✔ Fix:

```ts id="t1u2v3"
const status = "success" as const;
```

---

### ❌ Confusing value and type usage

```ts id="v1w2x3"
typeof user.name // ❌ invalid in type position
```

👉 Must use full object:

```ts id="y1z2a3"
type NameType = typeof user.name;
```

---

## 🔹 When to Use `typeof`

* When deriving types from constants
* When working with configuration objects
* When avoiding duplicate type definitions
* When syncing API response shapes

---

## 🚀 In Summary

Using `typeof` in type position:

* Extracts types directly from values
* Keeps types and data automatically in sync
* Reduces duplication and maintenance work
* Works with variables, objects, and functions

👉 It is one of the most powerful features for building **clean, scalable, and maintainable TypeScript codebases**.

---

## 🧠 Contextual Typing — How TypeScript Infers from Usage Context

Contextual typing is a feature in TypeScript where the type of a value is inferred based on **where and how it is used**, rather than just its explicit value.

Instead of only looking at what you assign, TypeScript also looks at the **surrounding context** to decide the correct type.

---

## 🔹 What is Contextual Typing?

In simple terms:

> TypeScript “understands the situation” and assigns types based on expected usage.

---

## 🔹 Basic Example

```ts id="a1b2c3"
window.addEventListener("click", (event) => {
  console.log(event.clientX);
});
```

👉 Here, TypeScript knows:

* `event` is a `MouseEvent`
* Because `addEventListener("click")` expects a mouse event

You did NOT explicitly define the type, but TypeScript inferred it from context.

---

## 🔹 How It Works

TypeScript uses the function signature to infer types.

```ts id="d4e5f6"
addEventListener(type: "click", listener: (event: MouseEvent) => void)
```

👉 From this, it understands what `event` should be.

---

## 🔹 Contextual Typing in Functions

### Without explicit type:

```ts id="g7h8i9"
const numbers = [1, 2, 3];

numbers.map((num) => {
  return num * 2;
});
```

👉 TypeScript infers:

* `num` is `number`

---

### Why?

Because `map` is defined as:

```ts id="j1k2l3"
map(callback: (value: number) => number)
```

---

## 🔹 Contextual Typing in Objects

```ts id="m1n2o3"
const user = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};
```

👉 TypeScript infers:

* `this.name` is a `string`

---

## 🔹 Contextual Typing in Function Parameters

```ts id="p1q2r3"
function process(callback: (value: string) => void) {
  callback("Hello");
}
```

Now:

```ts id="q3r4s5"
process((text) => {
  console.log(text.toUpperCase());
});
```

👉 `text` is automatically inferred as `string`

---

## 🔹 Contextual Typing in Arrow Functions

```ts id="t1u2v3"
const handler = (event) => {
  console.log(event.target);
};
```

If used in correct context:

```ts id="v1w2x3"
button.addEventListener("click", (event) => {
  console.log(event.target);
});
```

👉 `event` becomes `MouseEvent`

---

## 🔹 Contextual Typing in Arrays

```ts id="y1z2a3"
const names = ["Alice", "Bob"];

names.forEach((name) => {
  console.log(name.toUpperCase());
});
```

👉 `name` is inferred as `string`

---

## 🔹 Why Contextual Typing is Powerful

* Reduces need for manual type annotations
* Makes code cleaner and shorter
* Improves developer experience
* Works well with APIs and libraries

---

## 🔹 When Contextual Typing Fails

TypeScript may not infer correctly if context is missing.

### ❌ No context available:

```ts id="b1c2d3"
const handler = (event) => {
  console.log(event);
};
```

👉 `event` becomes `any` (unsafe)

---

### ✔ Fix with annotation:

```ts id="e1f2g3"
const handler = (event: MouseEvent) => {
  console.log(event.clientX);
};
```

---

## 🔹 Common Places Contextual Typing Works

* Event listeners
* Array methods (`map`, `filter`, `forEach`)
* Callback functions
* Function parameters
* Object methods

---

## 🔹 Contextual Typing vs Explicit Typing

| Feature        | Contextual Typing        | Explicit Typing   |
| -------------- | ------------------------ | ----------------- |
| Source of type | Usage context            | Developer-defined |
| Code verbosity | Low                      | Higher            |
| Safety         | High (if context exists) | Very high         |
| Best for       | Callbacks, APIs          | Complex logic     |

---

## 🚀 In Summary

Contextual typing allows TypeScript to:

* Infer types from function and API usage
* Understand parameter types automatically
* Reduce unnecessary type annotations
* Improve code readability and speed

👉 It is one of the key reasons TypeScript feels intelligent and developer-friendly, especially when working with modern JavaScript APIs.

---

## 🧠 Widening vs Narrowing of Inferred Types in TypeScript

TypeScript doesn’t just assign types—it constantly adjusts them based on how values are used. Two important concepts behind this behavior are **type widening** and **type narrowing**.

Understanding both is essential for writing predictable and safe TypeScript code.

---

## 🔹 What is Type Widening?

**Type widening** happens when TypeScript expands a specific type into a more general one.

👉 It usually occurs during **type inference**.

---

### 🔹 Example of Widening

```ts id="a1b2c3"
let name = "Alice";
```

TypeScript infers:

```ts id="d4e5f6"
string
```

Even though `"Alice"` is a literal, it is widened to `string`.

---

### 🔹 Why Widening Happens

TypeScript assumes `let` variables can change:

```ts id="g7h8i9"
let age = 25;
age = 30; // allowed
```

So it widens:

```ts id="j1k2l3"
number
```

---

## 🔹 Widening with Objects and Arrays

### Arrays

```ts id="m1n2o3"
let colors = ["red", "green"];
```

👉 Type becomes:

```ts id="p1q2r3"
string[]
```

Not:

```ts id="q3r4s5"
["red", "green"]
```

---

### Objects

```ts id="t1u2v3"
let user = {
  name: "John",
  role: "admin"
};
```

👉 Type becomes:

```ts id="v1w2x3"
{
  name: string;
  role: string;
}
```

---

## 🔹 How to Prevent Widening

You can prevent widening using:

### ✔ `const`

```ts id="y1z2a3"
const name = "Alice";
```

👉 Type becomes:

```ts id="b1c2d3"
"Alice"
```

---

### ✔ `as const`

```ts id="e1f2g3"
const colors = ["red", "green"] as const;
```

👉 Type becomes:

```ts id="h1i2j3"
readonly ["red", "green"]
```

---

## 🔹 What is Type Narrowing?

**Type narrowing** is the opposite of widening. It means TypeScript reduces a general type into a more specific one based on runtime checks.

👉 It happens during **control flow analysis**.

---

## 🔹 Example of Narrowing

```ts id="k1l2m3"
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

👉 Inside the `if` block:

* TypeScript narrows `value` to `string`

---

## 🔹 Common Narrowing Techniques

### 🔹 1. typeof narrowing

```ts id="n1o2p3"
if (typeof value === "number") {
  value.toFixed();
}
```

---

### 🔹 2. instanceof narrowing

```ts id="q1r2s3"
if (value instanceof Date) {
  value.getTime();
}
```

---

### 🔹 3. equality checks

```ts id="t1u2v3"
if (value === "success") {
  console.log("OK");
}
```

---

### 🔹 4. truthy checks

```ts id="v1w2x3"
if (value) {
  console.log(value);
}
```

---

### 🔹 5. in operator narrowing

```ts id="y1z2a3"
if ("name" in user) {
  console.log(user.name);
}
```

---

## 🔹 Narrowing with Union Types

```ts id="b1c2d3"
type ID = string | number;

function print(id: ID) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed());
  }
}
```

👉 TypeScript safely narrows each branch.

---

## 🔹 Widening vs Narrowing (Key Difference)

| Feature      | Widening            | Narrowing            |                 |
| ------------ | ------------------- | -------------------- | --------------- |
| Direction    | Specific → General  | General → Specific   |                 |
| Happens when | Variable assignment | Runtime checks       |                 |
| Purpose      | Flexibility         | Safety and precision |                 |
| Example      | "hello" → string    | string               | number → string |

---

## 🔹 Real-World Analogy

* **Widening** → Zooming out (less detail, more general)
* **Narrowing** → Zooming in (more detail, more specific)

---

## 🔹 Common Pitfalls

### ❌ Unexpected widening

```ts id="e1f2g3"
const config = {
  mode: "dark"
};
```

👉 `mode` becomes `string`, not `"dark"`

✔ Fix:

```ts id="h1i2j3"
const config = {
  mode: "dark"
} as const;
```

---

### ❌ Forgetting narrowing checks

```ts id="k1l2m3"
function log(value: string | number) {
  value.toUpperCase(); // ❌ Error
}
```

✔ Fix:

```ts id="n1o2p3"
if (typeof value === "string") {
  value.toUpperCase();
}
```

---

## 🚀 In Summary

* **Widening** makes types more general during inference
* **Narrowing** makes types more specific during usage
* TypeScript uses both to balance **flexibility and safety**

👉 Mastering widening and narrowing is essential for writing accurate, bug-free TypeScript code.


---

## 💡 Key Takeaways

- TypeScript's type system is structural — it checks the *shape* of values, not their class
- Types exist only at compile time — they're completely erased in the output JavaScript
- The more specific your types, the better IntelliSense, safety, and refactoring support you get
- When in doubt: be explicit. TypeScript is documentation that the compiler enforces

---

## 📝 Exercises

Open `index.ts` and complete the numbered exercises at the bottom of the file.

---



## ⏭️ Next Up

**[Day 04 — Arrays & Tuples →](../Day-04-Arrays-Tuples/)**
