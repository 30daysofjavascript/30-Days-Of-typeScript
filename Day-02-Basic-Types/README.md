# 📘 Day 02 — Basic Types

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- All TypeScript primitive types: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`
- The special types: `any`, `unknown`, `never`, `void`
- When to use each type and common pitfalls
- Type assertions (`as`) and non-null assertion (`!`)

---

## 📖 Type Reference

### Primitive Types

| Type | Example | Use Case |
|------|---------|----------|
| `string` | `"hello"` | Text values |
| `number` | `42`, `3.14` | All numeric values |
| `boolean` | `true`, `false` | Logical values |
| `bigint` | `9007199254740991n` | Integers beyond 2^53-1 |
| `symbol` | `Symbol("id")` | Unique property keys |
| `null` | `null` | Intentional absence |
| `undefined` | `undefined` | Uninitialized value |

### Special Types

| Type | Meaning | Rule |
|------|---------|------|
| `any` | Anything goes — disables type checking | ❌ Avoid |
| `unknown` | Could be anything — must check before use | ✅ Prefer over `any` |
| `never` | This code path is unreachable | Used for exhaustive checks |
| `void` | Function returns nothing meaningful | Used as return type |

---

## 🧱 All TypeScript Primitive Types (Detailed Guide)

Primitive types are the most basic building blocks in TypeScript. They represent simple values like text, numbers, and true/false conditions. TypeScript includes all JavaScript primitive types but adds strict type safety to help prevent errors.

---

### 🔹 List of Primitive Types

* string
* number
* boolean
* bigint
* symbol
* null
* undefined

---

### 🔹 1. string

Represents textual data.

```ts id="a1k9pd"
let name: string = "Alice";
let message: string = `Hello ${name}`;
```

**Key points:**

* Used for text values
* Can use single, double, or backticks
* Supports template strings

---

### 🔹 2. number

Represents all numeric values (integers and decimals).

```ts id="b7x2lm"
let age: number = 25;
let price: number = 99.99;
```

**Key points:**

* No separate int or float types
* Includes special values like NaN and Infinity

---

### 🔹 3. boolean

Represents true or false values.

```ts id="c4v8qn"
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;
```

**Key points:**

* Used in conditions and logic
* Only two values: true or false

---

### 🔹 4. bigint

Used for very large integers beyond the safe range of number.

```ts id="d9m3zx"
let bigValue: bigint = 123456789012345678901234567890n;
```

**Key points:**

* Ends with `n`
* Used for extremely large numbers
* Cannot be mixed with number directly

```ts id="e2k7wp"
let x: bigint = 10n;
// x + 5 ❌ Error
```

---

### 🔹 5. symbol

Represents a unique and immutable value.

```ts id="f6r1ty"
let id: symbol = Symbol("id");
let anotherId: symbol = Symbol("id");

console.log(id === anotherId); // false
```

**Key points:**

* Always unique
* Often used as object keys
* Prevents naming conflicts

---

### 🔹 6. null

Represents an intentional empty value.

```ts id="g3n8qa"
let value: null = null;
```

**Key points:**

* Assigned manually by developer
* Means “no value”

---

### 🔹 7. undefined

Represents a variable that has been declared but not assigned.

```ts id="h5p2lc"
let data: undefined = undefined;
```

**Key points:**

* Default state of uninitialized variables
* Automatically assigned by JavaScript

---

### 🔹 null vs undefined

| Feature     | null                    | undefined         |
| ----------- | ----------------------- | ----------------- |
| Meaning     | Intentional empty value | Not assigned      |
| Assigned by | Developer               | JavaScript engine |
| Usage       | Explicit absence        | Missing value     |

---

### 🔹 Strict Null Checking

With strict mode enabled:

```ts id="j8v4mn"
let name: string = null; // ❌ Error
```

You must explicitly allow it:

```ts id="k1x7qz"
let name: string | null = null;
```

---

### 🔹 Type Inference with Primitives

TypeScript automatically detects primitive types:

```ts id="l9c2rt"
let city = "Delhi";   // string
let count = 10;       // number
let isOpen = true;    // boolean
```

---

### 🔹 Best Practices

* Use primitives when possible instead of complex types
* Prefer type inference for simple values
* Be careful with null and undefined in strict mode
* Use bigint only when necessary

---

### 🔹 Common Mistakes

* Mixing bigint and number
* Confusing null and undefined
* Overusing explicit type annotations

---

### 🚀 In Summary

TypeScript primitive types:

* Represent basic values like text, numbers, and boolean logic
* Provide strong type safety
* Help prevent runtime errors
* Form the foundation of all TypeScript applications

## 💡 Key Takeaways

- **`strict: true`** makes `null` and `undefined` separate from other types — always enable it
- **`any`** defeats TypeScript — treat it as a code smell
- **`unknown`** is the safe version of `any` — always check the type before use
- **`never`** enables exhaustive type checking in switch statements
- **`void`** just means "the return value doesn't matter" — not the same as `undefined`
- Type assertions (`as`) don't change runtime behavior — use them carefully

---

## ⚡ The Special Types in TypeScript: `any`, `unknown`, `never`, `void`

TypeScript provides a few **special types** that behave differently from normal primitive and object types. These are used in specific situations where flexibility, safety, or control over behavior is needed.

---

### 🔹 1. `any`

The `any` type disables type checking completely. It allows a variable to hold **any type of value**.

```ts id="a1b2c3"
let value: any = "Hello";
value = 10;
value = true;
value = { name: "John" };
```

**Key points:**

* Turns off type safety
* Can store any type of value
* Useful during migration or quick prototyping
* Should be avoided in production code

👉 Think of `any` as “TypeScript off switch”.

---

### 🔹 2. `unknown`

The `unknown` type is a safer version of `any`. It can also hold any value, but you must **check the type before using it**.

```ts id="d4e5f6"
let value: unknown;

value = "Hello";
value = 42;
value = true;
```

To use it safely:

```ts id="g7h8i9"
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

**Key points:**

* Can hold any value like `any`
* But requires type checking before usage
* Much safer than `any`
* Recommended for unknown external data

👉 Think of `unknown` as “safe any”.

---

### 🔹 3. `never`

The `never` type represents values that **never occur**.

It is used when:

* A function never returns
* A function always throws an error
* A code path is impossible

```ts id="j1k2l3"
function throwError(message: string): never {
  throw new Error(message);
}
```

Infinite loop example:

```ts id="m4n5o6"
function infiniteLoop(): never {
  while (true) {}
}
```

**Key points:**

* Represents impossible values
* Used for error handling or infinite loops
* Helps TypeScript ensure code correctness

👉 Think of `never` as “this function will never finish normally”.

---

### 🔹 4. `void`

The `void` type represents the absence of a return value.

It is commonly used for functions that **do not return anything**.

```ts id="p7q8r9"
function logMessage(message: string): void {
  console.log(message);
}
```

**Key points:**

* Used for functions with no return value
* The function may return `undefined` implicitly
* Common in logging or side-effect functions

👉 Think of `void` as “returns nothing”.

---

### 🔹 `void` vs `undefined`

| Feature  | void                     | undefined               |
| -------- | ------------------------ | ----------------------- |
| Meaning  | No return value expected | A value that is missing |
| Used in  | Functions                | Variables               |
| Behavior | Ignored return           | Actual value            |

---

### 🔹 Comparison of Special Types

| Type    | Meaning               | When to Use                       |
| ------- | --------------------- | --------------------------------- |
| any     | Disable type checking | Quick prototyping (avoid in prod) |
| unknown | Any value but safe    | External or uncertain data        |
| never   | Never occurs          | Errors, infinite loops            |
| void    | No return value       | Functions that don’t return       |

---

### 🔹 Best Practices

* Avoid `any` unless absolutely necessary
* Prefer `unknown` over `any` for safety
* Use `never` for impossible code paths
* Use `void` for functions without return values

---

### 🚀 In Summary

Special types in TypeScript help control flexibility and safety:

* `any` → disables type checking
* `unknown` → safe version of any
* `never` → represents impossible values
* `void` → represents no return value

👉 Understanding these types is essential for writing clean, safe, and professional TypeScript code.

---

## 🎯 When to Use Each Type and Common Pitfalls (TypeScript)

Understanding TypeScript types is not just about knowing what they are, but also **when to use them correctly** and what mistakes to avoid. This section focuses on practical usage of primitive and special types, along with common pitfalls developers face.

---

### 🔹 `string`

**When to use:**

* Usernames, emails, messages, labels
* Any textual data

```ts id="s1t2u3"
let username: string = "john_doe";
```

**Common pitfalls:**

* Using `any` instead of `string` for API responses
* Assuming numbers inside strings without conversion

❌ Bad:

```ts id="p1q2r3"
let age: any = "25";
```

---

### 🔹 `number`

**When to use:**

* Prices, age, counters, calculations

```ts id="n1b2c3"
let price: number = 100;
```

**Common pitfalls:**

* Mixing strings and numbers
* Forgetting NaN cases in calculations

❌ Bad:

```ts id="x1y2z3"
let total = "10" + 5; // results in "105"
```

---

### 🔹 `boolean`

**When to use:**

* Conditions, flags, toggles

```ts id="b1c2d3"
let isActive: boolean = true;
```

**Common pitfalls:**

* Using strings like `"true"` instead of `true`
* Confusing truthy/falsy values

❌ Bad:

```ts id="e1f2g3"
let isLoggedIn: any = "false"; // still truthy
```

---

### 🔹 `bigint`

**When to use:**

* Very large numbers (finance, crypto, IDs)

```ts id="h1i2j3"
let bigId: bigint = 9007199254740991n;
```

**Common pitfalls:**

* Mixing with `number`
* Using it unnecessarily for normal values

❌ Bad:

```ts id="k1l2m3"
let result = 10n + 5; // Error
```

---

### 🔹 `symbol`

**When to use:**

* Unique object keys
* Avoiding property name conflicts

```ts id="s1y2m3"
let id = Symbol("id");
```

**Common pitfalls:**

* Expecting two symbols with same description to be equal
* Overusing for simple cases

❌ Misconception:

```ts id="n2o3p4"
Symbol("a") === Symbol("a"); // false
```

---

### 🔹 `null`

**When to use:**

* Explicit “no value” state
* Resetting variables

```ts id="q1r2s3"
let user: string | null = null;
```

**Common pitfalls:**

* Forgetting strict null checks
* Mixing with `undefined` without union types

---

### 🔹 `undefined`

**When to use:**

* Uninitialized variables
* Optional values

```ts id="t1u2v3"
let value: number | undefined;
```

**Common pitfalls:**

* Treating it as intentional absence (use `null` instead)
* Not handling optional values properly

---

## ⚡ Special Types Usage Guide

---

### 🔹 `any`

**When to use:**

* Temporary code
* Migrating JavaScript to TypeScript

```ts id="a1b2c3"
let data: any = fetchData();
```

**Common pitfalls:**

* Disables type safety completely
* Can hide serious bugs
* Overused in beginner code

❌ Biggest mistake:

```ts id="d1e2f3"
let user: any = "John";
user.toFixed(); // runtime error
```

---

### 🔹 `unknown`

**When to use:**

* API responses
* External or unsafe data

```ts id="g1h2i3"
let input: unknown = getData();
```

**Common pitfalls:**

* Forgetting to narrow the type
* Treating it like `any`

❌ Bad:

```ts id="j1k2l3"
input.toUpperCase(); // Error
```

✔ Correct:

```ts id="m1n2o3"
if (typeof input === "string") {
  input.toUpperCase();
}
```

---

### 🔹 `never`

**When to use:**

* Functions that throw errors
* Infinite loops
* Impossible conditions

```ts id="p1q2r3"
function fail(): never {
  throw new Error("Error");
}
```

**Common pitfalls:**

* Trying to assign values to `never`
* Misunderstanding it as “optional type”

---

### 🔹 `void`

**When to use:**

* Functions that do not return anything

```ts id="v1w2x3"
function log(msg: string): void {
  console.log(msg);
}
```

**Common pitfalls:**

* Expecting a return value
* Confusing with `undefined`

---

## 🚨 General TypeScript Pitfalls

* Overusing `any` instead of proper types
* Ignoring strict mode errors
* Not handling `null` and `undefined` properly
* Mixing incompatible types (`number + string`, `number + bigint`)
* Skipping type narrowing with `unknown`

---

## 🚀 In Summary

Each TypeScript type has a clear purpose:

* Use **strong types (`string`, `number`, `boolean`)** for safety
* Use **`unknown` instead of `any` whenever possible**
* Use **`never` for impossible code paths**
* Use **`void` for non-returning functions**
* Avoid misuse of **`any` and unsafe assumptions**

👉 Correct type usage is what makes TypeScript powerful, scalable, and reliable in real-world applications.

---

## 🧩 Type Assertions (`as`) and Non-Null Assertion (`!`) in TypeScript

TypeScript usually infers types automatically, but sometimes you know more about a value than the compiler does. In such cases, TypeScript provides **type assertions** and the **non-null assertion operator**.

These features should be used carefully because they override TypeScript’s safety checks.

---

## 🔹 Type Assertions (`as`)

A **type assertion** tells TypeScript to treat a value as a specific type.

It does **not change the runtime value**, only the compile-time type.

---

### 🔹 Basic Syntax

```ts id="a1b2c3"
let value: unknown = "Hello TypeScript";

let strLength: number = (value as string).length;
```

Here, we are telling TypeScript:

> “Trust me, this is a string.”

---

### 🔹 Another Syntax (Angle Brackets)

```ts id="d4e5f6"
let value: unknown = "Hello";

let len: number = (<string>value).length;
```

⚠️ This syntax is not used in JSX/React files, so `as` is preferred.

---

## 🔹 When to Use Type Assertions

* When working with API responses
* When TypeScript cannot infer the correct type
* When handling DOM elements

---

### 🔹 Example: DOM Element

```ts id="g7h8i9"
let input = document.getElementById("username") as HTMLInputElement;

input.value = "John";
```

Without assertion, TypeScript only knows it is `HTMLElement`.

---

## 🔹 Common Pitfalls of `as`

### ❌ Unsafe assumptions

```ts id="j1k2l3"
let value: unknown = 123;

let str = value as string;
console.log(str.toUpperCase()); // runtime error
```

👉 TypeScript trusts you, but JavaScript does not.

---

### ❌ Forcing wrong types

Type assertions do NOT convert values:

```ts id="m1n2o3"
let num = "100" as number; // ❌ not a real conversion
```

👉 This is still a string at runtime.

---

## 🔹 Best Practice for `as`

* Use only when you are **100% sure** of the type
* Prefer type narrowing (`typeof`, `instanceof`) when possible
* Avoid overusing assertions

---

## 🔹 Non-Null Assertion (`!`)

The **non-null assertion operator (`!`)** tells TypeScript:

> “This value is NOT null or undefined.”

---

### 🔹 Basic Example

```ts id="p1q2r3"
let element = document.getElementById("app")!;
element.innerText = "Hello";
```

Here, we assume `element` is never `null`.

---

## 🔹 Why It Exists

TypeScript is strict about `null` and `undefined`:

```ts id="s1t2u3"
let element = document.getElementById("app");
// TypeScript: element might be null
```

So you either check or assert:

---

### 🔹 Safe Approach (Recommended)

```ts id="v1w2x3"
let element = document.getElementById("app");

if (element) {
  element.innerText = "Hello";
}
```

---

### 🔹 Unsafe Shortcut (`!`)

```ts id="y1z2a3"
let element = document.getElementById("app")!;
element.innerText = "Hello";
```

---

## 🔹 Common Pitfalls of `!`

### ❌ Runtime crashes

If the element is actually null:

```ts id="b1c2d3"
let el = document.getElementById("missing")!;
el.innerText = "Hi"; // 💥 crash
```

---

### ❌ Overconfidence in code

* Assumes values always exist
* Can hide real bugs

---

## 🔹 When to Use `!`

* When you are **certain** value exists (after checks or controlled environment)
* When working with DOM elements that are guaranteed to exist
* During quick prototyping

---

## 🔹 `as` vs `!`

| Feature         | `as` (Type Assertion)      | `!` (Non-null Assertion)    |
| --------------- | -------------------------- | --------------------------- |
| Purpose         | Change type view           | Remove null/undefined check |
| Affects runtime | No                         | No                          |
| Safety level    | Unsafe if misused          | Unsafe if misused           |
| Use case        | Type conversion assumption | Guaranteed non-null value   |

---

## 🚀 In Summary

* `as` tells TypeScript: *“trust me, this is this type”*
* `!` tells TypeScript: *“this is definitely not null or undefined”*

👉 Both are powerful but dangerous if misused. Prefer **type narrowing and safe checks** whenever possible, and use these operators only when you are confident about the value.

---


## 📝 Exercises

1. What type does TypeScript infer for each: `100`, `"hello" + " world"`, `5 > 3`, `null`?
2. Fix the type errors: `let price: number = "19.99"`, `let active: boolean = 1`
3. Write a function that takes `unknown` and safely returns its string representation
4. Write a function that always throws — what should its return type be?
5. Demonstrate why `unknown` is safer than `any` with a code example

---



## ⏭️ Next Up

**[Day 03 — Type Inference & Annotations →](../Day-03-Type-Inference-Annotations/)**
