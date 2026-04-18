# 📘 Day 05 — Objects & Interfaces

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Interface syntax for describing object shapes
- Optional properties with ?
- Readonly properties
- Method signatures (shorthand and property syntax)
- Interface extension with extends
- Declaration merging — multiple interface declarations are merged
- Nested interfaces and recursive interfaces
- Interface vs type alias — when to use each

---

## 🧩 Interface Syntax for Describing Object Shapes in TypeScript

In TypeScript, an **interface** is a powerful way to define the *shape of an object*. It describes what properties an object should have, along with their types.

Interfaces are one of the core building blocks of TypeScript’s type system, especially for structuring objects, APIs, and class contracts.

---

## 🔹 What is an Interface?

An interface defines a **blueprint for an object**.

It does not create any runtime code—it only exists during development for type checking.

---

### 🔹 Basic Syntax

```ts id="a1b2c3"
interface User {
  name: string;
  age: number;
}
```

---

### 🔹 Using the Interface

```ts id="d4e5f6"
const user: User = {
  name: "Alice",
  age: 25
};
```

👉 The object must match the structure exactly.

---

## 🔹 Why Interfaces Are Used

Interfaces help you:

* Define clear object structures
* Enforce consistency across codebases
* Improve autocomplete and tooling
* Enable safer API design
* Support scalable applications

---

## 🔹 Optional Properties

You can make properties optional using `?`.

```ts id="g7h8i9"
interface User {
  name: string;
  age?: number;
}
```

---

### 🔹 Example

```ts id="j1k2l3"
const user1: User = { name: "Alice" };
const user2: User = { name: "Bob", age: 30 };
```

---

## 🔹 Readonly Properties

You can prevent modification using `readonly`.

```ts id="m1n2o3"
interface User {
  readonly id: number;
  name: string;
}
```

---

### 🔹 Example

```ts id="p1q2r3"
const user: User = {
  id: 1,
  name: "Alice"
};

user.name = "Bob"; // ✔ allowed
user.id = 2;       // ❌ Error
```

---

## 🔹 Function Types in Interfaces

Interfaces can also describe functions.

```ts id="q3r4s5"
interface MathOperation {
  (a: number, b: number): number;
}
```

---

### 🔹 Usage

```ts id="t1u2v3"
const add: MathOperation = (a, b) => a + b;
```

---

## 🔹 Index Signatures

Used when object keys are dynamic.

```ts id="v1w2x3"
interface StringMap {
  [key: string]: string;
}
```

---

### 🔹 Example

```ts id="y1z2a3"
const data: StringMap = {
  name: "Alice",
  city: "Delhi"
};
```

---

## 🔹 Nested Interfaces

Interfaces can contain other interfaces.

```ts id="b1c2d3"
interface Address {
  city: string;
  country: string;
}

interface User {
  name: string;
  address: Address;
}
```

---

### 🔹 Example

```ts id="e1f2g3"
const user: User = {
  name: "Alice",
  address: {
    city: "Delhi",
    country: "India"
  }
};
```

---

## 🔹 Extending Interfaces

Interfaces can inherit from other interfaces.

```ts id="h1i2j3"
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

---

### 🔹 Example

```ts id="k1l2m3"
const emp: Employee = {
  name: "John",
  employeeId: 101
};
```

---

## 🔹 Interface vs Type (Quick Insight)

| Feature             | Interface   | Type Alias         |
| ------------------- | ----------- | ------------------ |
| Extending           | ✔ extends   | ✔ intersection (&) |
| Declaration merging | ✔ supported | ❌ not supported    |
| Object shapes       | Best choice | Also supported     |
| Flexibility         | High        | Very high          |

---

## 🔹 Declaration Merging (Unique Feature)

Interfaces can be re-opened and extended automatically.

```ts id="n1o2p3"
interface User {
  name: string;
}

interface User {
  age: number;
}
```

👉 Becomes:

```ts id="q1r2s3"
{
  name: string;
  age: number;
}
```

---

## 🔹 Common Pitfalls

### ❌ Missing required properties

```ts id="t1u2v3"
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice"
}; // ❌ Error
```

---

### ❌ Adding unknown properties

```ts id="v1w2x3"
const user: User = {
  name: "Alice",
  age: 25,
  city: "Delhi" // ❌ Error
};
```

---

## 🔹 When to Use Interfaces

Use interfaces when:

* Defining object structures
* Designing APIs
* Working with classes
* Sharing types across modules
* Building scalable applications

---

## 🚀 In Summary

Interfaces in TypeScript:

* Define object shapes clearly
* Support optional, readonly, and nested properties
* Can describe functions and indexes
* Can extend and merge

👉 They are the **preferred way to model structured data and contracts in TypeScript applications**.


---

## ❓ Optional Properties in TypeScript (`?`) — Full Detail

Optional properties in TypeScript allow you to define object fields that **may or may not exist**. This is useful when working with partial data, APIs, forms, or flexible object structures.

Instead of forcing every property to be present, TypeScript lets you mark some properties as optional using the `?` operator.

---

## 🔹 What is an Optional Property?

An optional property is a property that:

* Can exist in an object
* Or can be missing entirely
* Without causing a type error

---

### 🔹 Basic Syntax

```ts id="a1b2c3"
interface User {
  name: string;
  age?: number;
}
```

👉 Here:

* `name` is required
* `age` is optional

---

## 🔹 Using Optional Properties

### 🔹 Valid Example (with optional property)

```ts id="d4e5f6"
const user1: User = {
  name: "Alice"
};
```

---

```ts id="g7h8i9"
const user2: User = {
  name: "Bob",
  age: 25
};
```

---

## 🔹 What TypeScript Infers

Optional properties are internally treated as a **union with `undefined`**.

```ts id="j1k2l3"
age?: number
```

becomes:

```ts id="m1n2o3"
age: number | undefined
```

---

## 🔹 Accessing Optional Properties Safely

Since the property might not exist, TypeScript forces you to handle it safely.

---

### 🔹 Example

```ts id="p1q2r3"
function printAge(user: User) {
  if (user.age !== undefined) {
    console.log(user.age);
  }
}
```

---

## 🔹 Optional Chaining (Common Companion)

Optional properties are often used with optional chaining (`?.`).

```ts id="q3r4s5"
console.log(user.age?.toFixed());
```

👉 Prevents runtime errors if `age` is missing.

---

## 🔹 Optional Properties in Functions

Optional properties are widely used in function parameters.

```ts id="t1u2v3"
function greet(user: { name: string; age?: number }) {
  console.log(user.name);
}
```

---

## 🔹 Real-World Example (API Response)

```ts id="v1w2x3"
interface ApiResponse {
  success: boolean;
  message?: string;
  data?: object;
}
```

👉 Not all responses always include `message` or `data`.

---

## 🔹 Optional Properties in Nested Objects

```ts id="y1z2a3"
interface Address {
  city?: string;
  country: string;
}

interface User {
  name: string;
  address?: Address;
}
```

---

### 🔹 Usage

```ts id="b1c2d3"
const user: User = {
  name: "Alice"
};
```

---

## 🔹 Common Pitfalls

### ❌ Assuming optional means always undefined

```ts id="e1f2g3"
if (user.age) {
  console.log(user.age);
}
```

👉 This fails for `0` or falsy values.

✔ Better:

```ts id="h1i2j3"
if (user.age !== undefined) {
  console.log(user.age);
}
```

---

### ❌ Forgetting undefined handling

```ts id="k1l2m3"
user.age.toFixed(); // ❌ Error if age is missing
```

---

## 🔹 Optional Properties vs Required Properties

| Feature       | Required Property | Optional Property     |
| ------------- | ----------------- | --------------------- |
| Must exist    | ✔ Yes             | ❌ No                  |
| Type          | Exact type        | Type | undefined      |
| Safety checks | Not needed        | Required              |
| Use case      | Critical data     | Flexible/partial data |

---

## 🔹 When to Use Optional Properties

Use `?` when:

* Data is not always available
* Working with APIs or external inputs
* Building flexible configurations
* Designing forms with optional fields

---

## 🚀 In Summary

Optional properties in TypeScript:

* Allow object fields to be missing
* Are written using `?`
* Automatically become `type | undefined`
* Require safe access patterns

👉 They are essential for modeling **real-world, incomplete, or flexible data structures** in a type-safe way.


---

## 🔒 Readonly Properties in TypeScript — Full Detail

Readonly properties in TypeScript are used to make object properties **immutable after initialization**. Once a value is assigned, it cannot be changed, which helps prevent accidental mutations and makes code safer and more predictable.

This feature is especially useful in large applications, APIs, and shared data structures.

---

## 🔹 What is a Readonly Property?

A readonly property is a property that:

* Can be assigned once (usually at creation)
* Cannot be modified later
* Enforced at compile time by TypeScript

---

### 🔹 Basic Syntax

```ts id="a1b2c3"
interface User {
  readonly id: number;
  name: string;
}
```

---

## 🔹 Using Readonly Properties

### 🔹 Valid Example

```ts id="d4e5f6"
const user: User = {
  id: 1,
  name: "Alice"
};
```

---

### 🔹 Allowed Operation

```ts id="g7h8i9"
user.name = "Bob"; // ✔ allowed
```

---

### 🔹 Not Allowed Operation

```ts id="j1k2l3"
user.id = 2; // ❌ Error
```

👉 Because `id` is marked as `readonly`.

---

## 🔹 Why Readonly Exists

Readonly properties are used to:

* Prevent accidental changes to critical data
* Improve code safety
* Model immutable data structures
* Support functional programming patterns
* Ensure predictable state in applications

---

## 🔹 Readonly vs Const (Important Difference)

| Feature               | `const`   | `readonly` property       |
| --------------------- | --------- | ------------------------- |
| Applies to            | Variables | Object properties         |
| Prevents reassignment | ✔ Yes     | ✔ Yes (for property)      |
| Prevents mutation     | ❌ No      | ✔ Yes (for property only) |

---

### 🔹 Example

```ts id="m1n2o3"
const user = {
  id: 1,
  name: "Alice"
};
```

👉 This is allowed:

```ts id="p1q2r3"
user.id = 2; // ✔ allowed (because object is mutable)
```

---

### 🔹 With readonly

```ts id="q3r4s5"
interface User {
  readonly id: number;
  name: string;
}
```

Now:

```ts id="t1u2v3"
user.id = 2; // ❌ Error
```

---

## 🔹 Readonly Arrays vs Readonly Properties

Readonly also works on arrays:

```ts id="v1w2x3"
const numbers: readonly number[] = [1, 2, 3];
```

---

## 🔹 Readonly Properties in Nested Objects

Readonly applies only to the property level (shallow immutability).

```ts id="y1z2a3"
interface Address {
  city: string;
}

interface User {
  readonly id: number;
  address: Address;
}
```

---

### 🔹 Example

```ts id="b1c2d3"
const user: User = {
  id: 1,
  address: {
    city: "Delhi"
  }
};
```

👉 This is allowed:

```ts id="e1f2g3"
user.address.city = "Mumbai"; // ✔ allowed
```

⚠️ Because readonly does NOT deeply freeze objects.

---

## 🔹 Deep Readonly (Advanced Concept)

To make everything immutable:

```ts id="h1i2j3"
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

Or built-in:

```ts id="k1l2m3"
type User = Readonly<{
  id: number;
  name: string;
}>;
```

---

## 🔹 Readonly in Interfaces vs Type Aliases

### Interface

```ts id="n1o2p3"
interface User {
  readonly id: number;
}
```

### Type Alias

```ts id="q1r2s3"
type User = {
  readonly id: number;
};
```

👉 Both behave the same.

---

## 🔹 Common Pitfalls

### ❌ Thinking readonly means deep immutability

```ts id="t1u2v3"
user.address.city = "Mumbai"; // ✔ still allowed
```

---

### ❌ Expecting runtime enforcement

Readonly is **compile-time only**, not runtime protection.

---

### ❌ Confusing with const

```ts id="v1w2x3"
const user = { id: 1 };
```

👉 This allows mutation of properties.

---

## 🔹 When to Use Readonly Properties

Use readonly when:

* IDs should never change
* Configuration objects must remain fixed
* API responses should be immutable
* You want safer and predictable state
* Working with shared data structures

---

## 🚀 In Summary

Readonly properties in TypeScript:

* Prevent modification of object fields after creation
* Are declared using `readonly`
* Provide compile-time safety, not runtime enforcement
* Help model immutable and predictable data

👉 They are essential for building **safe, stable, and maintainable TypeScript applications** where data integrity matters.


---

## ⚙️ Method Signatures in TypeScript (Shorthand vs Property Syntax)

In TypeScript interfaces and object types, methods can be defined in two main ways:

* **Shorthand method syntax**
* **Property (function expression) syntax**

Both define functions inside objects, but they differ slightly in readability, style, and use cases.

---

## 🔹 1. Shorthand Method Syntax

This is the most common and modern way to define methods in interfaces and objects.

---

### 🔹 Syntax

```ts id="a1b2c3"
interface User {
  greet(name: string): string;
}
```

---

### 🔹 Example Usage

```ts id="d4e5f6"
const user: User = {
  greet(name: string) {
    return `Hello, ${name}`;
  }
};
```

---

### 🔹 Key Features

* Clean and concise
* Preferred in modern TypeScript code
* Matches class method syntax
* Easy to read in interfaces

---

### 🔹 Real-World Example

```ts id="g7h8i9"
interface Logger {
  log(message: string): void;
}

const logger: Logger = {
  log(message) {
    console.log(message);
  }
};
```

---

## 🔹 2. Property (Function Expression) Syntax

This syntax defines methods as **object properties holding functions**.

---

### 🔹 Syntax

```ts id="j1k2l3"
interface User {
  greet: (name: string) => string;
}
```

---

### 🔹 Example Usage

```ts id="m1n2o3"
const user: User = {
  greet: (name: string) => {
    return `Hello, ${name}`;
  }
};
```

---

### 🔹 Key Features

* Uses arrow function syntax
* Explicit function type assigned to property
* Useful for functional programming style
* Common in callbacks and higher-order functions

---

## 🔹 Shorthand vs Property Syntax (Comparison)

| Feature         | Shorthand Syntax       | Property Syntax           |
| --------------- | ---------------------- | ------------------------- |
| Readability     | High                   | Medium                    |
| Syntax style    | Method-like            | Function expression       |
| `this` behavior | Dynamic (`this` works) | Lexical (arrow functions) |
| Preferred use   | Interfaces, classes    | Callbacks, utilities      |

---

## 🔹 Important Difference: `this` Behavior

### 🔹 Shorthand Method

```ts id="p1q2r3"
const obj = {
  name: "Alice",
  greet() {
    return this.name;
  }
};
```

👉 `this` refers to `obj`

---

### 🔹 Property Function (Arrow Function)

```ts id="q3r4s5"
const obj = {
  name: "Alice",
  greet: () => {
    return this.name; // ❌ undefined
  }
};
```

👉 Arrow functions do NOT bind `this`

---

## 🔹 Interface Example Using Both Styles

### 🔹 Shorthand (Preferred in interfaces)

```ts id="t1u2v3"
interface Calculator {
  add(a: number, b: number): number;
}
```

---

### 🔹 Property Syntax Alternative

```ts id="v1w2x3"
interface Calculator {
  add: (a: number, b: number) => number;
}
```

---

## 🔹 When to Use Shorthand Syntax

Use shorthand when:

* Defining object methods
* Working with classes or interfaces
* You need correct `this` behavior
* Writing clean, readable APIs

---

## 🔹 When to Use Property Syntax

Use property syntax when:

* Working with callbacks
* Using arrow functions intentionally
* You want lexical `this`
* Writing functional-style code

---

## 🔹 Common Pitfalls

### ❌ Misusing arrow functions for methods

```ts id="b1c2d3"
const user = {
  name: "Alice",
  greet: () => {
    return this.name; // ❌ wrong
  }
};
```

---

### ❌ Confusing syntax styles in interfaces

```ts id="e1f2g3"
interface User {
  greet(): string; // shorthand
  greet: () => string; // property style
}
```

👉 Both are valid, but mixing unnecessarily reduces consistency.

---

## 🔹 Best Practices

* ✔ Prefer shorthand method syntax for object methods
* ✔ Use property syntax for callbacks or functional patterns
* ✔ Be consistent within a codebase
* ✔ Avoid arrow functions when `this` is needed

---

## 🚀 In Summary

TypeScript supports two ways to define methods:

* **Shorthand method syntax** → clean, class-like, supports `this`
* **Property function syntax** → explicit, functional, uses arrow functions

👉 Choose based on whether you need **object-oriented behavior (`this`) or functional style callbacks**.


---

## 🔗 Interface Extension with `extends` in TypeScript

Interface extension allows one interface to **inherit properties and methods from another interface** using the `extends` keyword. This helps you build reusable, modular, and scalable type structures.

Instead of repeating properties, you can create a base interface and extend it wherever needed.

---

## 🔹 What is Interface Extension?

Interface extension means:

> One interface builds on top of another interface.

It allows **code reuse and type composition**.

---

## 🔹 Basic Syntax

```ts id="a1b2c3"
interface A {
  name: string;
}

interface B extends A {
  age: number;
}
```

---

## 🔹 Usage Example

```ts id="d4e5f6"
const user: B = {
  name: "Alice",
  age: 25
};
```

👉 `B` automatically includes everything from `A`.

---

## 🔹 Why Use `extends`?

Interface extension is used to:

* Avoid repeating common properties
* Build hierarchical data models
* Improve maintainability
* Make code scalable and modular
* Represent real-world relationships

---

## 🔹 Multiple Interface Extension

An interface can extend multiple interfaces.

```ts id="g7h8i9"
interface A {
  name: string;
}

interface B {
  age: number;
}

interface C extends A, B {
  isActive: boolean;
}
```

---

### 🔹 Example Usage

```ts id="j1k2l3"
const user: C = {
  name: "Alice",
  age: 25,
  isActive: true
};
```

---

## 🔹 Real-World Example: User System

```ts id="m1n2o3"
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}
```

---

### 🔹 Usage

```ts id="p1q2r3"
const emp: Employee = {
  name: "John",
  age: 30,
  employeeId: 101,
  department: "Engineering"
};
```

---

## 🔹 Interface Extension with Methods

Interfaces can also inherit methods.

```ts id="q3r4s5"
interface Animal {
  name: string;
  speak(): void;
}

interface Dog extends Animal {
  breed: string;
}
```

---

### 🔹 Implementation

```ts id="t1u2v3"
const dog: Dog = {
  name: "Buddy",
  breed: "Labrador",
  speak() {
    console.log("Woof!");
  }
};
```

---

## 🔹 Extending Interfaces with Optional Properties

```ts id="v1w2x3"
interface Base {
  id: number;
}

interface User extends Base {
  name?: string;
}
```

---

## 🔹 Interface Extension vs Type Intersection

| Feature             | Interface `extends` | Type `&` Intersection |
| ------------------- | ------------------- | --------------------- |
| Syntax              | extends keyword     | & operator            |
| Readability         | High                | Medium                |
| Declaration merging | ✔ supported         | ❌ not supported       |
| Use case            | OOP-style design    | Flexible compositions |

---

### 🔹 Equivalent Example

```ts id="y1z2a3"
// Interface way
interface A {
  name: string;
}
interface B extends A {
  age: number;
}
```

```ts id="b1c2d3"
// Type way
type B = A & {
  age: number;
};
```

---

## 🔹 Interface Extension in Large Systems

### 🔹 API Models

```ts id="e1f2g3"
interface ApiResponse {
  success: boolean;
}

interface UserResponse extends ApiResponse {
  data: {
    name: string;
  };
}
```

---

### 🔹 Component Props (Frontend)

```ts id="h1i2j3"
interface BaseProps {
  id: string;
}

interface ButtonProps extends BaseProps {
  label: string;
  onClick: () => void;
}
```

---

## 🔹 Common Pitfalls

### ❌ Forgetting inherited properties

```ts id="k1l2m3"
interface A {
  name: string;
}

interface B extends A {}

const obj: B = {}; // ❌ Error (name is missing)
```

---

### ❌ Confusing extension direction

```ts id="n1o2p3"
interface A extends B {} // ❌ B must exist first
```

---

### ❌ Overusing deep inheritance

Too many levels of extension can make code harder to understand.

---

## 🔹 Best Practices

* ✔ Use interfaces for shared structures
* ✔ Extend only when there is a clear relationship
* ✔ Keep inheritance shallow (1–2 levels max)
* ✔ Prefer composition for complex systems

---

## 🚀 In Summary

Interface extension with `extends`:

* Allows one interface to inherit another
* Promotes reusability and clean structure
* Supports multiple inheritance
* Works well for modeling real-world relationships

👉 It is a core tool in TypeScript for building **scalable, maintainable, and structured type systems**.

---

## 🔄 Declaration Merging in TypeScript (Multiple Interfaces Merging)

Declaration merging is a unique feature of TypeScript where **multiple declarations with the same name are automatically combined into a single definition**.

This behavior is most commonly seen with **interfaces**, and it allows you to extend types across different parts of your codebase without explicitly using `extends`.

---

## 🔹 What is Declaration Merging?

If you declare the same interface multiple times, TypeScript will:

> Merge all declarations into one final interface.

---

## 🔹 Basic Example

```ts id="a1b2c3"
interface User {
  name: string;
}

interface User {
  age: number;
}
```

---

### 🔹 Result (Merged Interface)

TypeScript treats it as:

```ts id="d4e5f6"
interface User {
  name: string;
  age: number;
}
```

---

### 🔹 Usage

```ts id="g7h8i9"
const user: User = {
  name: "Alice",
  age: 25
};
```

---

## 🔹 Why Declaration Merging Exists

Declaration merging is useful for:

* Extending types across multiple files
* Incrementally building interfaces
* Library augmentation
* Modular code design
* Adding properties without modifying original code

---

## 🔹 Merging Across Files (Real-World Use Case)

Imagine you have a library type:

```ts id="j1k2l3"
// library.d.ts
interface Config {
  apiUrl: string;
}
```

---

Then in your project:

```ts id="m1n2o3"
// app.ts
interface Config {
  timeout: number;
}
```

---

### 🔹 Final Merged Type

```ts id="p1q2r3"
interface Config {
  apiUrl: string;
  timeout: number;
}
```

---

## 🔹 Declaration Merging Rules

### 🔹 1. Properties are combined

```ts id="q3r4s5"
interface A {
  a: string;
}

interface A {
  b: number;
}
```

👉 Result:

```ts id="t1u2v3"
interface A {
  a: string;
  b: number;
}
```

---

### 🔹 2. Conflicting types cause errors

```ts id="v1w2x3"
interface A {
  name: string;
}

interface A {
  name: number; // ❌ Error
}
```

👉 TypeScript cannot merge incompatible types.

---

## 🔹 Merging Methods and Properties

```ts id="y1z2a3"
interface Logger {
  log(message: string): void;
}

interface Logger {
  error(message: string): void;
}
```

---

### 🔹 Result

```ts id="b1c2d3"
interface Logger {
  log(message: string): void;
  error(message: string): void;
}
```

---

## 🔹 Declaration Merging vs Interface Extension

| Feature          | Declaration Merging  | `extends` Keyword    |
| ---------------- | -------------------- | -------------------- |
| Explicit linking | ❌ No                 | ✔ Yes                |
| File separation  | ✔ Works across files | ✔ Works across files |
| Readability      | Medium               | High                 |
| Control          | Less explicit        | More explicit        |

---

## 🔹 Module Augmentation (Advanced Use)

Declaration merging is heavily used in **extending third-party libraries**.

---

### 🔹 Example: Extending Express Request

```ts id="e1f2g3"
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
```

---

👉 Now every request has `userId`.

---

## 🔹 Real-World Use Case: Adding Features to Libraries

You can extend built-in or external types without modifying source code.

```ts id="h1i2j3"
interface Window {
  myAppVersion: string;
}
```

---

### 🔹 Usage

```ts id="k1l2m3"
window.myAppVersion = "1.0.0";
```

---

## 🔹 Common Pitfalls

### ❌ Conflicting property types

```ts id="n1o2p3"
interface A {
  value: string;
}

interface A {
  value: number; // ❌ Error
}
```

---

### ❌ Unintentional merging

If two interfaces share the same name accidentally, they will merge silently.

---

### ❌ Overusing merging

Too much merging can make code hard to track and debug.

---

## 🔹 Best Practices

* ✔ Use declaration merging for library augmentation
* ✔ Keep merged interfaces consistent
* ✔ Avoid conflicting property types
* ✔ Prefer `extends` for clear relationships
* ✔ Use merging intentionally, not accidentally

---

## 🚀 In Summary

Declaration merging in TypeScript:

* Combines multiple interface declarations with the same name
* Automatically merges properties and methods
* Enables powerful library and module augmentation
* Must avoid conflicting types

👉 It is a unique TypeScript feature that allows **incremental and flexible type evolution across codebases and files**.


---


## 🧱 Nested Interfaces and Recursive Interfaces in TypeScript

TypeScript interfaces can model complex real-world data structures using **nesting** (interfaces inside interfaces) and **recursion** (an interface referencing itself). These features are essential for working with hierarchical data like trees, folders, APIs, and nested JSON responses.

---

## 🔹 1. Nested Interfaces

A nested interface is when an interface contains another interface as one of its properties.

This helps represent **structured, hierarchical data** clearly.

---

### 🔹 Basic Example

```ts id="a1b2c3"
interface Address {
  city: string;
  country: string;
}

interface User {
  name: string;
  address: Address;
}
```

---

### 🔹 Usage

```ts id="d4e5f6"
const user: User = {
  name: "Alice",
  address: {
    city: "Delhi",
    country: "India"
  }
};
```

---

## 🔹 Why Nested Interfaces Are Useful

* Represent real-world structures (user → address → city)
* Improve code readability
* Enforce strict structure on nested data
* Work well with API responses and JSON objects

---

## 🔹 Deeply Nested Interfaces

Interfaces can be nested multiple levels deep.

```ts id="g7h8i9"
interface Country {
  name: string;
}

interface Address {
  city: string;
  country: Country;
}

interface User {
  name: string;
  address: Address;
}
```

---

### 🔹 Usage

```ts id="j1k2l3"
const user: User = {
  name: "Alice",
  address: {
    city: "Delhi",
    country: {
      name: "India"
    }
  }
};
```

---

## 🔹 Real-World Example: API Response

```ts id="m1n2o3"
interface ApiResponse {
  data: {
    user: {
      id: number;
      profile: {
        name: string;
        email: string;
      };
    };
  };
}
```

---

## 🔹 2. Recursive Interfaces

A recursive interface is an interface that **refers to itself**, directly or indirectly.

This is used to represent **tree-like or hierarchical structures**.

---

## 🔹 Basic Recursive Example (Tree Structure)

```ts id="p1q2r3"
interface Category {
  name: string;
  subcategories?: Category[];
}
```

---

### 🔹 Usage

```ts id="q3r4s5"
const category: Category = {
  name: "Electronics",
  subcategories: [
    {
      name: "Mobile Phones",
      subcategories: [
        { name: "Smartphones" },
        { name: "Feature Phones" }
      ]
    },
    {
      name: "Laptops"
    }
  ]
};
```

---

## 🔹 Why Recursive Interfaces Are Important

They are used to model:

* File systems
* Organizational charts
* Menu structures
* Tree data structures
* Nested comments or replies

---

## 🔹 Real-World Example: File System

```ts id="t1u2v3"
interface FileNode {
  name: string;
  isFile: boolean;
  children?: FileNode[];
}
```

---

### 🔹 Usage

```ts id="v1w2x3"
const fileSystem: FileNode = {
  name: "root",
  isFile: false,
  children: [
    {
      name: "docs",
      isFile: false,
      children: [
        { name: "file.txt", isFile: true }
      ]
    }
  ]
};
```

---

## 🔹 Recursive Interfaces with Optional Properties

Optional properties are often used in recursion to stop infinite nesting.

```ts id="y1z2a3"
interface Node {
  value: number;
  next?: Node;
}
```

---

### 🔹 Example: Linked List

```ts id="b1c2d3"
const list: Node = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3
    }
  }
};
```

---

## 🔹 Nested vs Recursive Interfaces

| Feature        | Nested Interfaces | Recursive Interfaces |
| -------------- | ----------------- | -------------------- |
| Structure      | Fixed levels      | Dynamic depth        |
| Self-reference | ❌ No              | ✔ Yes                |
| Use case       | API objects, JSON | Trees, graphs, lists |
| Complexity     | Low–Medium        | Medium–High          |

---

## 🔹 Common Pitfalls

### ❌ Infinite recursion without base case

```ts id="e1f2g3"
interface Node {
  children: Node[]; // ❌ dangerous if no stopping condition
}
```

---

### ❌ Overcomplicating simple structures

```ts id="h1i2j3"
interface A {
  b: {
    c: {
      d: {
        e: string;
      };
    };
  };
}
```

👉 Better to split into smaller interfaces.

---

### ❌ Forgetting optional recursion termination

```ts id="k1l2m3"
interface Node {
  next: Node; // ❌ must be optional or carefully controlled
}
```

---

## 🔹 Best Practices

* ✔ Use nested interfaces for structured data
* ✔ Use recursion only for hierarchical data
* ✔ Always include optional or terminating conditions
* ✔ Keep nesting depth reasonable
* ✔ Break complex structures into smaller interfaces

---

## 🚀 In Summary

* **Nested interfaces** model structured, layered objects (like API responses)
* **Recursive interfaces** model self-repeating structures (like trees and linked lists)

👉 Together, they allow TypeScript to represent **real-world hierarchical and dynamic data structures safely and clearly**.


---

## ⚖️ Interface vs Type Alias in TypeScript — When to Use Each

TypeScript gives you two powerful ways to define shapes: **interfaces** and **type aliases**. They often look similar, but they have important differences in flexibility, extensibility, and use cases.

Understanding when to use each helps you write cleaner, more scalable, and more consistent TypeScript code.

---

## 🔹 1. What is an Interface?

An interface is mainly used to define the **structure of objects**.

```ts id="a1b2c3"
interface User {
  name: string;
  age: number;
}
```

---

## 🔹 2. What is a Type Alias?

A type alias is more flexible and can represent **many kinds of types**, not just objects.

```ts id="d4e5f6"
type User = {
  name: string;
  age: number;
};
```

---

## 🔹 Similarities

Both can describe object shapes:

```ts id="g7h8i9"
// Interface
interface A {
  x: number;
}

// Type alias
type B = {
  x: number;
};
```

👉 Both behave the same here.

---

## 🔹 Key Differences

### 🔹 1. Declaration Merging

Interfaces support declaration merging, type aliases do not.

#### ✔ Interface

```ts id="j1k2l3"
interface User {
  name: string;
}

interface User {
  age: number;
}
```

👉 Merges automatically:

```ts id="m1n2o3"
{
  name: string;
  age: number;
}
```

---

#### ❌ Type Alias

```ts id="p1q2r3"
type User = {
  name: string;
};

type User = {
  age: number;
}; // ❌ Error
```

---

## 🔹 2. Extending and Composition

### ✔ Interface (uses `extends`)

```ts id="q3r4s5"
interface Person {
  name: string;
}

interface Employee extends Person {
  id: number;
}
```

---

### ✔ Type Alias (uses intersections)

```ts id="t1u2v3"
type Person = {
  name: string;
};

type Employee = Person & {
  id: number;
};
```

---

## 🔹 3. What They Can Represent

### ✔ Interface (object-focused)

* Objects
* Classes
* Function shapes (limited)

```ts id="v1w2x3"
interface Logger {
  log(message: string): void;
}
```

---

### ✔ Type Alias (more powerful)

Can represent:

* Objects
* Primitives
* Unions
* Tuples
* Intersections
* Function types

```ts id="y1z2a3"
type ID = string | number;
type Point = [number, number];
type Callback = (msg: string) => void;
```

---

## 🔹 4. Extensibility

### ✔ Interface (open for extension)

```ts id="b1c2d3"
interface Window {
  myApp: string;
}
```

Later:

```ts id="e1f2g3"
interface Window {
  version: number;
}
```

👉 Automatically merged.

---

### ❌ Type Alias (closed)

Once defined, it cannot be reopened.

---

## 🔹 5. Performance and Tooling

In practice:

* Interfaces are slightly more optimized for object shapes
* Type aliases are more flexible but can be heavier for complex unions

👉 Difference is usually negligible in real apps.

---

## 🔹 When to Use Interface

Use **interface** when:

* Defining object shapes
* Designing APIs or public contracts
* Working with classes (`implements`)
* You expect extension or merging
* Building scalable architectures

---

### 🔹 Example

```ts id="h1i2j3"
interface User {
  id: number;
  name: string;
}

class Admin implements User {
  id = 1;
  name = "Alice";
}
```

---

## 🔹 When to Use Type Alias

Use **type alias** when:

* You need unions or intersections
* You define primitives or tuples
* You want flexible type composition
* You work with function types
* You need advanced type transformations

---

### 🔹 Example

```ts id="k1l2m3"
type Status = "loading" | "success" | "error";

type Point = [number, number];

type Handler = (event: string) => void;
```

---

## 🔹 Side-by-Side Comparison

| Feature             | Interface       | Type Alias       |
| ------------------- | --------------- | ---------------- |
| Object shapes       | ✔ Best choice   | ✔ Works          |
| Unions              | ❌ Not supported | ✔ Supported      |
| Tuples              | ❌ Not ideal     | ✔ Supported      |
| Declaration merging | ✔ Yes           | ❌ No             |
| Extending           | `extends`       | `&` intersection |
| Flexibility         | Medium          | High             |

---

## 🔹 Common Pitfalls

### ❌ Using interface for unions

```ts id="n1o2p3"
interface Status = "loading" | "success"; // ❌ invalid
```

---

### ❌ Overusing type aliases for objects

```ts id="q1r2s3"
type User = {
  name: string;
};
```

👉 Works fine, but interface is often cleaner for large object models.

---

## 🔹 Best Practice Rule of Thumb

* ✔ Use **interface** for object-oriented design
* ✔ Use **type** for everything else
* ✔ Prefer consistency across your project

---

## 🚀 In Summary

* **Interface** → best for object shapes, APIs, extensibility, and class design
* **Type alias** → best for unions, primitives, tuples, and advanced type logic

👉 In modern TypeScript, both are powerful—but choosing the right one improves **clarity, scalability, and maintainability** of your code.

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

**[Day 06 — Functions →](../Day-06-Functions/)**
