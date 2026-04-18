# 📘 Day 06 — Functions in TypeScript

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Parameter and return type annotations
- Optional and default parameters
- Rest parameters (...args: T[])
- Function type signatures and type aliases
- Function overloads — multiple signatures for one implementation
- this parameter typing
- Generic functions (preview of Day 13)
- Callable interfaces

---
## 🧠 Functions in TypeScript — Parameter and Return Type Annotations

Functions are one of the most important building blocks in TypeScript. They allow you to group logic, reuse code, and define clear input and output behavior.

TypeScript enhances functions by adding **type annotations for parameters and return values**, making functions safer and more predictable.

---

## 🔹 1. What is a Function?

A function is a reusable block of code that performs a specific task.

### 🔹 Basic JavaScript Function

```ts id="a1b2c3"
function add(a, b) {
  return a + b;
}
```

👉 Problem: No type safety

---

## 🔹 2. Function with TypeScript Annotations

TypeScript allows you to define types for:

* Parameters (inputs)
* Return value (output)

---

### 🔹 Syntax

```ts id="d4e5f6"
function functionName(param: type): returnType {
  // logic
}
```

---

## 🔹 3. Parameter Type Annotations

You can define the type of each function parameter.

---

### 🔹 Example

```ts id="g7h8i9"
function greet(name: string) {
  return "Hello " + name;
}
```

👉 `name` must be a string.

---

### 🔹 Multiple Parameters

```ts id="j1k2l3"
function add(a: number, b: number) {
  return a + b;
}
```

---

### 🔹 Error Example

```ts id="m1n2o3"
add(5, "10"); // ❌ Error: string not allowed
```

---

## 🔹 4. Return Type Annotations

You can explicitly define what a function returns.

---

### 🔹 Syntax

```ts id="p1q2r3"
function functionName(): returnType {
  return value;
}
```

---

### 🔹 Example

```ts id="q3r4s5"
function add(a: number, b: number): number {
  return a + b;
}
```

---

👉 Now TypeScript ensures the function always returns a number.

---

## 🔹 5. Why Return Type Annotations Matter

They help:

* Prevent incorrect return values
* Improve code readability
* Enable better tooling and autocomplete
* Make APIs predictable

---

## 🔹 6. Type Inference in Functions

TypeScript can often infer return types automatically.

---

### 🔹 Example

```ts id="t1u2v3"
function multiply(a: number, b: number) {
  return a * b;
}
```

👉 TypeScript infers:

```ts id="v1w2x3"
number
```

---

## 🔹 7. Explicit vs Inferred Return Types

### ✔ Inferred (simple cases)

```ts id="y1z2a3"
function square(n: number) {
  return n * n;
}
```

---

### ✔ Explicit (recommended for complex logic)

```ts id="b1c2d3"
function square(n: number): number {
  return n * n;
}
```

---

## 🔹 8. Functions with No Return Value (`void`)

If a function does not return anything, use `void`.

```ts id="e1f2g3"
function logMessage(message: string): void {
  console.log(message);
}
```

---

## 🔹 9. Optional Parameters

You can make parameters optional using `?`.

```ts id="h1i2j3"
function greet(name: string, age?: number) {
  console.log(name, age);
}
```

---

### 🔹 Usage

```ts id="k1l2m3"
greet("Alice");
greet("Alice", 25);
```

---

## 🔹 10. Default Parameters

You can also assign default values.

```ts id="n1o2p3"
function greet(name: string = "Guest") {
  return "Hello " + name;
}
```

---

## 🔹 11. Function Type Annotation (Function as Variable)

You can define function types explicitly.

```ts id="q1r2s3"
let add: (a: number, b: number) => number;
```

---

### 🔹 Assign Function

```ts id="t3u4v5"
add = (a, b) => a + b;
```

---

## 🔹 12. Real-World Example

```ts id="w1x2y3"
function createUser(name: string, age: number): { name: string; age: number } {
  return { name, age };
}
```

---

## 🔹 13. Functions in Interfaces

```ts id="z1a2b3"
interface MathOps {
  add(a: number, b: number): number;
}
```

---

## 🔹 14. Arrow Functions with Types

```ts id="c1d2e3"
const multiply = (a: number, b: number): number => {
  return a * b;
};
```

---

## 🔹 15. Common Mistakes

### ❌ Wrong parameter types

```ts id="f1g2h3"
function add(a: number, b: number) {
  return a + "10"; // ❌ incorrect logic
}
```

---

### ❌ Missing return type in complex functions

```ts id="i1j2k3"
function process(data) { // ❌ implicit any
  return data;
}
```

---

## 🔹 16. Best Practices

* ✔ Always type parameters in public APIs
* ✔ Explicitly define return types for complex functions
* ✔ Use `void` when nothing is returned
* ✔ Use inference for simple functions
* ✔ Keep function signatures clean and readable

---

## 🚀 In Summary

Functions in TypeScript become safer and clearer with:

* **Parameter annotations** → define input types
* **Return type annotations** → define output types
* Strong inference support for simple cases

👉 This makes functions **predictable, self-documenting, and error-resistant**, which is essential for scalable TypeScript applications.


---

## 🔧 Optional and Default Parameters in TypeScript

TypeScript allows you to make function parameters more flexible using **optional parameters** and **default parameters**. These features help you write functions that can handle different input scenarios without breaking type safety.

They are especially useful in APIs, utility functions, and reusable components.

---

## 🔹 1. Optional Parameters (`?`)

An optional parameter is a parameter that **may or may not be provided** when calling a function.

---

### 🔹 Syntax

```ts id="a1b2c3"
function functionName(param?: type) {
  // logic
}
```

---

### 🔹 Basic Example

```ts id="d4e5f6"
function greet(name: string, age?: number) {
  console.log(name, age);
}
```

---

### 🔹 Valid Calls

```ts id="g7h8i9"
greet("Alice");
greet("Alice", 25);
```

---

## 🔹 How TypeScript Treats Optional Parameters

Optional parameters are internally treated as:

```ts id="j1k2l3"
type | undefined
```

So:

```ts id="m1n2o3"
age?: number
```

is equivalent to:

```ts id="p1q2r3"
age: number | undefined
```

---

## 🔹 Important Rules for Optional Parameters

### ✔ Must come after required parameters

```ts id="q3r4s5"
function test(a: string, b?: number) {} // ✔ correct
```

---

### ❌ Wrong order

```ts id="t1u2v3"
function test(a?: string, b: number) {} // ❌ Error
```

---

## 🔹 Handling Optional Parameters Safely

```ts id="v1w2x3"
function printAge(age?: number) {
  if (age !== undefined) {
    console.log(age.toFixed());
  }
}
```

---

## 🔹 2. Default Parameters

Default parameters allow you to assign a **fallback value** when no argument is provided.

---

### 🔹 Syntax

```ts id="y1z2a3"
function functionName(param: type = defaultValue) {
  // logic
}
```

---

### 🔹 Example

```ts id="b1c2d3"
function greet(name: string = "Guest") {
  console.log("Hello", name);
}
```

---

### 🔹 Valid Calls

```ts id="e1f2g3"
greet();          // Hello Guest
greet("Alice");   // Hello Alice
```

---

## 🔹 Default Parameters vs Optional Parameters

| Feature          | Optional (`?`)      | Default Value (`=`)     |
| ---------------- | ------------------- | ----------------------- |
| Value if missing | `undefined`         | predefined value        |
| Type safety      | must check manually | safe fallback provided  |
| Usage            | flexible input      | stable default behavior |

---

## 🔹 Combined Example

```ts id="h1i2j3"
function createUser(name: string, age?: number = 18) {
  return { name, age };
}
```

---

👉 This is actually **invalid** in TypeScript because optional and default together are redundant.

✔ Correct version:

```ts id="k1l2m3"
function createUser(name: string, age: number = 18) {
  return { name, age };
}
```

---

## 🔹 Real-World Example: Logging Function

```ts id="n1o2p3"
function log(message: string, level: string = "info") {
  console.log(`[${level}] ${message}`);
}
```

---

### 🔹 Usage

```ts id="q1r2s3"
log("Server started");
log("Error occurred", "error");
```

---

## 🔹 Optional Parameters in Real Use Case

```ts id="t3u4v5"
function updateUser(id: number, name?: string) {
  if (name) {
    console.log("Updating name:", name);
  }
}
```

---

## 🔹 Common Pitfalls

### ❌ Wrong parameter order

```ts id="w1x2y3"
function test(a?: string, b: number) {} // ❌ error
```

---

### ❌ Assuming optional means safe usage

```ts id="z1a2b3"
function print(age?: number) {
  console.log(age.toFixed()); // ❌ error if undefined
}
```

---

### ❌ Mixing optional and default incorrectly

```ts id="c1d2e3"
function test(a?: number = 10) {} // ❌ invalid
```

---

## 🔹 Best Practices

* ✔ Use default parameters when a fallback value makes sense
* ✔ Use optional parameters when value is truly optional
* ✔ Always place optional parameters after required ones
* ✔ Avoid mixing `?` and `=` together
* ✔ Handle `undefined` safely when using optional parameters

---

## 🚀 In Summary

* **Optional parameters (`?`)** → parameter may be missing and becomes `undefined`
* **Default parameters (`=`)** → parameter gets a fallback value if not provided

👉 Together, they make functions more flexible while maintaining **type safety and predictable behavior** in TypeScript.


---

## 📦 Rest Parameters in TypeScript (`...args: T[]`) — Full Detail

Rest parameters allow a function to accept **an indefinite number of arguments** as a single array. In TypeScript, rest parameters are fully typed, meaning you can define exactly what type of values are allowed inside them.

They are especially useful when you don’t know how many arguments will be passed to a function.

---

## 🔹 What are Rest Parameters?

Rest parameters collect multiple arguments into an array using the `...` syntax.

---

### 🔹 Basic Syntax

```ts id="a1b2c3"
function functionName(...args: type[]) {
  // logic
}
```

---

## 🔹 Basic Example

```ts id="d4e5f6"
function sum(...numbers: number[]) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
```

---

### 🔹 Usage

```ts id="g7h8i9"
sum(1, 2, 3);
sum(10, 20, 30, 40);
```

👉 All arguments are collected into an array:

```ts id="j1k2l3"
numbers: number[]
```

---

## 🔹 How Rest Parameters Work

Internally:

```ts id="m1n2o3"
function sum(...numbers: number[])
```

becomes conceptually:

```ts id="p1q2r3"
function sum(numbers: number[])
```

But with rest syntax, you can pass arguments individually.

---

## 🔹 Rest Parameters with Strings

```ts id="q3r4s5"
function greetAll(...names: string[]) {
  names.forEach(name => console.log("Hello", name));
}
```

---

### 🔹 Usage

```ts id="t1u2v3"
greetAll("Alice", "Bob", "Charlie");
```

---

## 🔹 Rest Parameters with Mixed Types (Tuples)

You can enforce structured rest parameters using tuples.

```ts id="v1w2x3"
function logEvent(event: string, ...details: [number, string]) {
  console.log(event, details);
}
```

---

### 🔹 Usage

```ts id="y1z2a3"
logEvent("LOGIN", 200, "Success");
```

---

## 🔹 Rest Parameters in Real-World Example

### 🔹 Logging Utility

```ts id="b1c2d3"
function log(level: string, ...messages: string[]) {
  console.log(level.toUpperCase(), ...messages);
}
```

---

### 🔹 Usage

```ts id="e1f2g3"
log("info", "Server started", "Port 3000");
log("error", "Database failed", "Connection timeout");
```

---

## 🔹 Rest Parameters in Array Functions

Rest parameters behave like arrays, so you can use array methods.

```ts id="h1i2j3"
function multiply(...nums: number[]) {
  return nums.map(n => n * 2);
}
```

---

## 🔹 Why Rest Parameters Are Useful

They help you:

* Handle variable number of inputs
* Write flexible APIs
* Avoid overloaded function definitions
* Work with dynamic data
* Build utility functions

---

## 🔹 Rest Parameters vs Arguments Object

| Feature       | Rest Parameters   | `arguments` Object      |
| ------------- | ----------------- | ----------------------- |
| Type safety   | ✔ Yes             | ❌ No                    |
| Array methods | ✔ Yes             | ❌ No (needs conversion) |
| Readability   | ✔ High            | ❌ Low                   |
| Recommended   | ✔ Yes (modern TS) | ❌ Avoid                 |

---

## 🔹 Rules of Rest Parameters

### ✔ Must be last parameter

```ts id="k1l2m3"
function test(a: number, ...rest: number[]) {} // ✔ correct
```

---

### ❌ Wrong placement

```ts id="n1o2p3"
function test(...rest: number[], a: number) {} // ❌ error
```

---

## 🔹 Rest Parameters with Other Parameters

```ts id="q1r2s3"
function formatMessage(prefix: string, ...messages: string[]) {
  return prefix + ": " + messages.join(", ");
}
```

---

### 🔹 Usage

```ts id="t3u4v5"
formatMessage("INFO", "Server started", "Port 3000");
```

---

## 🔹 Type Inference with Rest Parameters

TypeScript automatically infers the array type:

```ts id="w1x2y3"
function log(...values) {
  return values;
}
```

👉 Inference:

```ts id="z1a2b3"
any[]
```

✔ Better version:

```ts id="c1d2e3"
function log(...values: string[]) {}
```

---

## 🔹 Common Pitfalls

### ❌ Not typing rest parameters

```ts id="f1g2h3"
function test(...args) {} // ❌ implicit any[]
```

---

### ❌ Incorrect parameter order

```ts id="i1j2k3"
function test(...args: number[], x: number) {} // ❌ error
```

---

### ❌ Assuming rest is not an array

```ts id="l1m2n3"
function test(...args: number[]) {
  console.log(args.length); // ✔ valid array
}
```

---

## 🔹 Best Practices

* ✔ Always type rest parameters explicitly
* ✔ Use rest parameters for flexible APIs
* ✔ Keep rest parameter last in function signature
* ✔ Prefer rest over `arguments` object
* ✔ Use tuple rest types for structured inputs

---

## 🚀 In Summary

Rest parameters in TypeScript:

* Collect multiple arguments into a single array
* Are written as `...args: T[]`
* Are fully type-safe and inferred
* Must always be the last parameter

👉 They are essential for building **flexible, scalable, and modern TypeScript functions that handle dynamic input safely**.


---

## 🧠 Function Type Signatures and Type Aliases in TypeScript — Full Detail

In TypeScript, functions are not just executable blocks of code—they are also **typed values**. This means you can describe a function’s shape (its parameters and return type) using **function type signatures**. To reuse these shapes, you can store them in **type aliases**.

This is especially useful for callbacks, APIs, event handlers, and reusable utilities.

---

## 🔹 1. What is a Function Type Signature?

A function type signature describes:

* The types of parameters a function accepts
* The type of value it returns

It does NOT include implementation logic.

---

## 🔹 Basic Syntax

```ts id="a1b2c3"
(param1: type, param2: type) => returnType
```

---

## 🔹 Example

```ts id="d4e5f6"
let add: (a: number, b: number) => number;
```

---

### 🔹 Assigning a Function

```ts id="g7h8i9"
add = (x, y) => {
  return x + y;
};
```

---

## 🔹 Why Function Type Signatures Are Useful

They help you:

* Enforce correct function structure
* Improve autocomplete
* Ensure consistency in callbacks
* Avoid runtime errors
* Build reusable APIs

---

## 🔹 2. Function Type Alias

A type alias allows you to **name a function type**, making it reusable.

---

### 🔹 Syntax

```ts id="j1k2l3"
type TypeName = (params) => returnType;
```

---

### 🔹 Example

```ts id="m1n2o3"
type MathOperation = (a: number, b: number) => number;
```

---

### 🔹 Usage

```ts id="p1q2r3"
const add: MathOperation = (a, b) => a + b;

const multiply: MathOperation = (a, b) => a * b;
```

---

## 🔹 3. Function Type vs Inline Type

### ✔ Inline function type

```ts id="q3r4s5"
let subtract: (a: number, b: number) => number;
```

---

### ✔ Type alias (recommended for reuse)

```ts id="t1u2v3"
type MathOp = (a: number, b: number) => number;

let subtract: MathOp;
```

---

## 🔹 4. Function Type with Objects

You can combine function types with object structures.

```ts id="v1w2x3"
type Logger = {
  log: (message: string) => void;
  error: (message: string) => void;
};
```

---

### 🔹 Usage

```ts id="y1z2a3"
const logger: Logger = {
  log(message) {
    console.log(message);
  },
  error(message) {
    console.error(message);
  }
};
```

---

## 🔹 5. Function Type in Interfaces

Interfaces can also define function types.

```ts id="b1c2d3"
interface MathOperation {
  (a: number, b: number): number;
}
```

---

### 🔹 Usage

```ts id="e1f2g3"
const add: MathOperation = (a, b) => a + b;
```

---

## 🔹 6. Function Type with Optional Parameters

```ts id="h1i2j3"
type Greet = (name: string, age?: number) => string;
```

---

### 🔹 Example

```ts id="k1l2m3"
const greet: Greet = (name, age) => {
  return age ? `${name}, ${age}` : name;
};
```

---

## 🔹 7. Function Type with Rest Parameters

```ts id="n1o2p3"
type Sum = (...nums: number[]) => number;
```

---

### 🔹 Usage

```ts id="q1r2s3"
const sum: Sum = (...nums) => {
  return nums.reduce((a, b) => a + b, 0);
};
```

---

## 🔹 8. Real-World Example: Event Handler

```ts id="t3u4v5"
type ClickHandler = (event: MouseEvent) => void;
```

---

### 🔹 Usage

```ts id="w1x2y3"
const handleClick: ClickHandler = (event) => {
  console.log(event.clientX, event.clientY);
};
```

---

## 🔹 9. Callback Function Type

```ts id="z1a2b3"
type Callback = (result: string) => void;
```

---

### 🔹 Usage

```ts id="c1d2e3"
function fetchData(callback: Callback) {
  callback("Success");
}
```

---

## 🔹 10. Why Use Type Aliases for Functions?

Function type aliases are preferred when:

* Reusing function signatures multiple times
* Building large applications
* Defining API contracts
* Working with callbacks and utilities
* Improving code readability

---

## 🔹 11. Function Type vs Interface (Quick Comparison)

| Feature            | Function Type Alias | Interface Function |
| ------------------ | ------------------- | ------------------ |
| Syntax             | `(a: T) => R`       | `(a: T): R`        |
| Reusability        | ✔ High              | ✔ High             |
| Readability        | ✔ Simple            | ✔ Structured       |
| Object combination | ✔ Yes               | ✔ Yes              |

---

## 🔹 12. Common Pitfalls

### ❌ Missing parameter types

```ts id="f1g2h3"
type Add = (a, b) => number; // ❌ error
```

---

### ❌ Wrong return type

```ts id="i1j2k3"
type Add = (a: number, b: number) => string;
```

---

### ❌ Not using type alias for reuse

```ts id="l1m2n3"
let fn: (a: number, b: number) => number;
let fn2: (a: number, b: number) => number;
```

👉 Better:

```ts id="o1p2q3"
type MathFn = (a: number, b: number) => number;
```

---

## 🔹 13. Best Practices

* ✔ Use type aliases for reusable function signatures
* ✔ Keep function signatures small and readable
* ✔ Prefer named types for callbacks and APIs
* ✔ Combine with interfaces when building objects
* ✔ Always type parameters and return values

---

## 🚀 In Summary

Function type signatures in TypeScript:

* Define the structure of functions (inputs + output)
* Can be written inline or using type aliases
* Improve reusability and consistency
* Are essential for callbacks, APIs, and utilities

👉 Using **type aliases for function signatures** leads to cleaner, more scalable, and strongly-typed codebases.


---

## 🔁 Function Overloads in TypeScript — Full Detail

Function overloads allow you to define **multiple call signatures for a single function implementation**. This means a function can behave differently depending on the types or number of arguments passed.

Overloads are useful when one function needs to support multiple input formats while still maintaining strong type safety.

---

## 🔹 1. What Are Function Overloads?

Function overloading means:

> A single function can have multiple “versions” of its type signature.

But there is still **only one actual implementation**.

---

## 🔹 2. Basic Syntax

```ts id="a1b2c3"
function functionName(param: type): returnType;
function functionName(param: differentType): returnType;

function functionName(param: any): any {
  // implementation
}
```

---

## 🔹 3. Simple Example

Let’s create a function that accepts either a string or a number.

```ts id="d4e5f6"
function format(value: string): string;
function format(value: number): string;

function format(value: string | number): string {
  return `Value: ${value}`;
}
```

---

### 🔹 Usage

```ts id="g7h8i9"
format("Hello");
format(100);
```

👉 Both are valid because of overloads.

---

## 🔹 4. Why Function Overloads Exist

Function overloads are used to:

* Support multiple input types
* Improve API flexibility
* Maintain type safety
* Avoid unions in function logic
* Provide better IntelliSense/autocomplete

---

## 🔹 5. Overloads with Different Return Types

You can return different types based on input.

```ts id="j1k2l3"
function getLength(value: string): number;
function getLength(value: any[]): number;

function getLength(value: string | any[]): number {
  return value.length;
}
```

---

### 🔹 Usage

```ts id="m1n2o3"
getLength("Hello"); // number
getLength([1, 2, 3]); // number
```

---

## 🔹 6. Real-World Example: API Response Handler

```ts id="p1q2r3"
function fetchData(url: string): string;
function fetchData(url: string, parse: true): object;

function fetchData(url: string, parse?: boolean): string | object {
  const data = "{ result: 'ok' }";

  if (parse) {
    return JSON.parse(data);
  }

  return data;
}
```

---

### 🔹 Usage

```ts id="q3r4s5"
fetchData("/api"); 
fetchData("/api", true);
```

---

## 🔹 7. Overloads with Different Parameter Counts

```ts id="t1u2v3"
function greet(name: string): string;
function greet(first: string, last: string): string;

function greet(first: string, last?: string): string {
  if (last) {
    return `Hello ${first} ${last}`;
  }
  return `Hello ${first}`;
}
```

---

### 🔹 Usage

```ts id="v1w2x3"
greet("Alice");
greet("Alice", "Johnson");
```

---

## 🔹 8. Important Rule: Implementation Must Be Compatible

The implementation signature must be **compatible with all overloads**.

```ts id="y1z2a3"
// Overloads
function test(a: string): string;
function test(a: number): string;

// Implementation
function test(a: string | number): string {
  return a.toString();
}
```

---

## 🔹 9. Overloads vs Union Types

### ✔ Using Overloads

```ts id="b1c2d3"
function print(value: string): string;
function print(value: number): string;
```

---

### ✔ Using Union Types (alternative)

```ts id="e1f2g3"
function print(value: string | number): string {
  return value.toString();
}
```

---

## 🔹 Comparison

| Feature      | Function Overloads | Union Types |
| ------------ | ------------------ | ----------- |
| Type safety  | ✔ Strong           | ✔ Moderate  |
| IntelliSense | ✔ Better           | ✔ Good      |
| Complexity   | Medium             | Low         |
| Readability  | High (for APIs)    | Simpler     |

---

## 🔹 10. Overloads in Methods (Classes)

```ts id="h1i2j3"
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;

  add(a: any, b: any): any {
    return a + b;
  }
}
```

---

## 🔹 11. Common Pitfalls

### ❌ Missing implementation signature

```ts id="k1l2m3"
function test(a: string): string;
function test(a: number): string;

// ❌ no implementation → error
```

---

### ❌ Incompatible implementation

```ts id="n1o2p3"
function test(a: string): string;
function test(a: number): string;

function test(a: boolean): string { // ❌ wrong
  return "";
}
```

---

### ❌ Overusing overloads unnecessarily

If logic is simple, union types may be better.

---

## 🔹 12. Best Practices

* ✔ Use overloads for complex API behavior
* ✔ Keep number of overloads minimal
* ✔ Ensure implementation covers all cases
* ✔ Prefer union types for simple cases
* ✔ Use overloads when you need better IntelliSense

---

## 🚀 In Summary

Function overloads in TypeScript:

* Allow multiple function signatures for one implementation
* Provide strong type safety and better developer experience
* Are useful for APIs that accept different input formats
* Require a single compatible implementation

👉 They are a powerful tool for building **flexible yet strongly-typed functions in large-scale TypeScript applications**.


---

## 🧬 Generic Functions in TypeScript — Full Detail

Generic functions are one of the most powerful features in TypeScript. They allow you to write **reusable and type-safe functions that work with multiple data types**, without losing type information.

Instead of locking a function to one specific type, generics let you create a **placeholder type** that is decided when the function is used.

---

## 🔹 1. What Are Generic Functions?

A generic function is a function that uses a **type variable** (like `T`) to represent a flexible type.

---

### 🔹 Basic Syntax

```ts id="a1b2c3"
function functionName<T>(param: T): T {
  return param;
}
```

---

## 🔹 2. Simple Generic Function Example

```ts id="d4e5f6"
function identity<T>(value: T): T {
  return value;
}
```

---

### 🔹 Usage

```ts id="g7h8i9"
identity<string>("Hello");
identity<number>(100);
```

👉 TypeScript now preserves the exact type.

---

## 🔹 3. Type Inference with Generics

TypeScript can automatically infer the type.

```ts id="j1k2l3"
identity("Hello"); // T = string
identity(42);      // T = number
```

---

## 🔹 4. Why Generics Are Important

Generics help you:

* Write reusable functions
* Maintain type safety
* Avoid using `any`
* Build flexible APIs
* Preserve input-output type relationships

---

## 🔹 5. Generic Functions with Arrays

```ts id="m1n2o3"
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```

---

### 🔹 Usage

```ts id="p1q2r3"
getFirst<number>([1, 2, 3]);
getFirst<string>(["a", "b", "c"]);
```

---

## 🔹 6. Multiple Generic Types

You can use more than one type variable.

```ts id="q3r4s5"
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}
```

---

### 🔹 Usage

```ts id="t1u2v3"
pair<string, number>("Age", 25);
```

---

## 🔹 7. Generic Functions with Objects

```ts id="v1w2x3"
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

---

### 🔹 Usage

```ts id="y1z2a3"
merge({ name: "Alice" }, { age: 25 });
```

---

## 🔹 8. Generic Constraints (`extends`)

You can restrict what types are allowed.

```ts id="b1c2d3"
function logLength<T extends { length: number }>(value: T): T {
  console.log(value.length);
  return value;
}
```

---

### 🔹 Usage

```ts id="e1f2g3"
logLength("Hello");       // ✔ string has length
logLength([1, 2, 3]);     // ✔ array has length
```

---

## 🔹 9. Real-World Example: API Response Wrapper

```ts id="h1i2j3"
function fetchData<T>(data: T): { success: boolean; data: T } {
  return {
    success: true,
    data
  };
}
```

---

### 🔹 Usage

```ts id="k1l2m3"
fetchData<string>("Hello");
fetchData<number>(100);
```

---

## 🔹 10. Generic Functions with Default Types

```ts id="n1o2p3"
function wrap<T = string>(value: T): T[] {
  return [value];
}
```

---

### 🔹 Usage

```ts id="q1r2s3"
wrap("Hello"); // T = string (default)
wrap<number>(10);
```

---

## 🔹 11. Generic Callback Functions

```ts id="t3u4v5"
function process<T>(value: T, callback: (input: T) => T): T {
  return callback(value);
}
```

---

### 🔹 Usage

```ts id="w1x2y3"
process<number>(10, (n) => n * 2);
```

---

## 🔹 12. Generic Functions vs Normal Functions

| Feature     | Normal Function | Generic Function   |
| ----------- | --------------- | ------------------ |
| Flexibility | Low             | High               |
| Type safety | Fixed types     | Dynamic types      |
| Reusability | Limited         | Very high          |
| Use case    | Simple logic    | Reusable utilities |

---

## 🔹 13. Common Pitfalls

### ❌ Using `any` instead of generics

```ts id="f1g2h3"
function identity(value: any): any { // ❌ loses type safety
  return value;
}
```

---

### ❌ Not preserving relationships

```ts id="i1j2k3"
function getFirst(arr: any[]) {
  return arr[0];
}
```

---

### ❌ Overcomplicating simple functions

Not every function needs generics.

---

## 🔹 14. Best Practices

* ✔ Use generics for reusable logic
* ✔ Avoid `any` by using type parameters
* ✔ Use constraints when needed
* ✔ Keep generic names simple (`T`, `U`, `K`, `V`)
* ✔ Don’t overuse generics for simple functions

---

## 🚀 In Summary

Generic functions in TypeScript:

* Use type variables like `T` to make functions reusable
* Preserve type safety across inputs and outputs
* Support multiple data types without duplication
* Can be constrained for safer usage

👉 They are essential for building **flexible, reusable, and strongly-typed functions in scalable TypeScript applications**.


---

## 📞 Callable Interfaces in TypeScript — Full Detail

Callable interfaces are a special TypeScript feature that allows an **object to be used like a function**, while still having additional properties or methods attached to it.

This is useful when you want something that behaves like a function but also carries extra metadata or utility methods.

---

## 🔹 1. What is a Callable Interface?

A callable interface defines an object that:

* Can be called like a function
* Can also have properties or methods attached

---

## 🔹 Basic Syntax

```ts id="a1b2c3"
interface InterfaceName {
  (param: type): returnType;
}
```

---

## 🔹 2. Simple Callable Interface Example

```ts id="d4e5f6"
interface Greet {
  (name: string): string;
}
```

---

### 🔹 Usage

```ts id="g7h8i9"
const greet: Greet = (name) => {
  return "Hello " + name;
};

greet("Alice");
```

---

## 🔹 3. Callable Interface with Properties

One of the most powerful features is combining:

* function behavior
* object properties

---

### 🔹 Example

```ts id="j1k2l3"
interface Counter {
  (start: number): number;
  interval: number;
  reset(): void;
}
```

---

### 🔹 Implementation

```ts id="m1n2o3"
const counter = (function () {
  const fn = (start: number) => start;

  fn.interval = 1000;
  fn.reset = () => {
    console.log("Reset");
  };

  return fn;
})() as Counter;
```

---

### 🔹 Usage

```ts id="p1q2r3"
counter(10);
counter.interval;
counter.reset();
```

---

## 🔹 4. Why Callable Interfaces Are Useful

They are used when:

* You want a function with extra properties
* Building libraries or utilities
* Creating configurable functions
* Designing APIs with metadata
* Mimicking JavaScript patterns (like jQuery-style APIs)

---

## 🔹 5. Real-World Example: Configurable Logger

```ts id="q3r4s5"
interface Logger {
  (message: string): void;
  level: string;
  setLevel(level: string): void;
}
```

---

### 🔹 Implementation

```ts id="t1u2v3"
const logger = (function () {
  const fn = (message: string) => {
    console.log(`[${fn.level}]`, message);
  };

  fn.level = "info";

  fn.setLevel = (level: string) => {
    fn.level = level;
  };

  return fn;
})() as Logger;
```

---

### 🔹 Usage

```ts id="v1w2x3"
logger("Server started");
logger.setLevel("error");
logger("Something went wrong");
```

---

## 🔹 6. Callable Interface vs Function Type

| Feature          | Callable Interface | Function Type Alias |
| ---------------- | ------------------ | ------------------- |
| Callable         | ✔ Yes              | ✔ Yes               |
| Extra properties | ✔ Yes              | ❌ No                |
| Complexity       | Medium             | Low                 |
| Use case         | Advanced APIs      | Simple functions    |

---

## 🔹 7. Callable Interface with Generics

```ts id="y1z2a3"
interface Identity {
  <T>(value: T): T;
}
```

---

### 🔹 Usage

```ts id="b1c2d3"
const identity: Identity = (value) => value;

identity<number>(10);
identity<string>("Hello");
```

---

## 🔹 8. Callable Interface with Multiple Signatures

```ts id="e1f2g3"
interface OverloadedFn {
  (value: string): string;
  (value: number): number;
}
```

---

### 🔹 Usage

```ts id="h1i2j3"
const fn: OverloadedFn = (value: any) => value;

fn("Hello");
fn(100);
```

---

## 🔹 9. Real-World Use Case: Library-Style API

```ts id="k1l2m3"
interface Utils {
  (input: string): string;
  version: string;
  format(input: string): string;
}
```

---

### 🔹 Usage

```ts id="n1o2p3"
const utils = (function () {
  const fn = (input: string) => input.trim();

  fn.version = "1.0.0";
  fn.format = (input: string) => input.toUpperCase();

  return fn;
})() as Utils;
```

---

## 🔹 10. Common Pitfalls

### ❌ Forgetting callable signature

```ts id="q1r2s3"
interface Test {
  value: string; // ❌ not callable
}
```

---

### ❌ Not attaching properties properly

Callable interfaces require careful assignment.

---

### ❌ Overusing callable interfaces

They can make code harder to read if used unnecessarily.

---

## 🔹 11. Best Practices

* ✔ Use callable interfaces for advanced API design
* ✔ Combine function + metadata only when needed
* ✔ Prefer simple function types for basic logic
* ✔ Use generics for reusable callable behavior
* ✔ Keep implementation clean and consistent

---

## 🚀 In Summary

Callable interfaces in TypeScript:

* Allow objects to behave like functions
* Can include additional properties and methods
* Support generics and overloads
* Are useful for advanced library-style APIs

👉 They are a powerful but niche feature used to build **flexible, hybrid function-object patterns in TypeScript**.


---
## 💡 Key Takeaways

- Types describe the shape and constraints of values — use them to prevent entire classes of bugs
- Explicit types on public APIs make code self-documenting and easier to refactor
- TypeScript's type inference is powerful — only annotate when needed
- Build on the type system to make illegal states unrepresentable

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---


## ⏭️ Next Up

**[Day 07 — Union & Intersection Types →](../Day-07-Union-Intersection-Types/)**
