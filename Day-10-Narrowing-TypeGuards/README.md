# 📘 Day 10 — Narrowing & Type Guards

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- typeof narrowing (string, number, boolean, undefined)
- instanceof narrowing for class instances
- in narrowing for property existence checks
- Equality narrowing (=== comparisons)
- Custom type guards with the 'value is T' return type
- Assertion functions with 'asserts value is T'
- Discriminated unions — the most powerful narrowing technique
- Control flow analysis — TypeScript tracks types across branches

---

## 🔍 `typeof` Narrowing in TypeScript — Full Detail

`typeof` narrowing is one of the most fundamental type-narrowing techniques in TypeScript. It allows you to **refine (narrow) a variable’s type at runtime** based on JavaScript’s `typeof` operator.

This is especially useful when working with **union types**, where a value can be multiple possible types.

---

## 🔹 1. What is `typeof` Narrowing?

`typeof` narrowing uses runtime checks like:

```ts
typeof value === "string"
```

to tell TypeScript:

> “Inside this block, the value is definitely a string.”

---

## 🔹 2. Supported `typeof` Checks

JavaScript’s `typeof` operator returns only a limited set of strings:

| TypeScript Type | `typeof` Result |
| --------------- | --------------- |
| string          | `"string"`      |
| number          | `"number"`      |
| boolean         | `"boolean"`     |
| undefined       | `"undefined"`   |
| function        | `"function"`    |
| object          | `"object"`      |

👉 In this section, we focus on:

* string
* number
* boolean
* undefined

---

## 🔹 3. Basic Example

```ts
type Value = string | number;

function print(value: Value) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✔ string
  } else {
    console.log(value.toFixed(2));    // ✔ number
  }
}
```

---

## 🔹 4. Narrowing to `string`

```ts
function handle(value: string | number) {
  if (typeof value === "string") {
    // value is string here
    console.log(value.length);
    console.log(value.toUpperCase());
  }
}
```

---

### 🔹 Outside the block

```ts
// value is still string | number
```

---

## 🔹 5. Narrowing to `number`

```ts
function calculate(value: string | number) {
  if (typeof value === "number") {
    console.log(value.toFixed(2));
  }
}
```

---

## 🔹 6. Narrowing to `boolean`

```ts
function check(flag: boolean | string) {
  if (typeof flag === "boolean") {
    console.log(flag ? "Yes" : "No");
  }
}
```

---

## 🔹 7. Narrowing to `undefined`

```ts
function greet(name?: string) {
  if (typeof name === "undefined") {
    console.log("Hello, guest");
  } else {
    console.log("Hello, " + name);
  }
}
```

---

👉 This is very useful for optional parameters.

---

## 🔹 8. Combining Multiple Checks

```ts
function process(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log("String:", value);
  } else if (typeof value === "number") {
    console.log("Number:", value);
  } else {
    console.log("Boolean:", value);
  }
}
```

---

## 🔹 9. Narrowing in Complex Functions

```ts
function format(value: string | number | undefined) {
  if (typeof value === "undefined") {
    return "No value";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return value.toFixed(2);
}
```

---

## 🔹 10. Why `typeof` Narrowing is Important

It helps you:

* Safely access type-specific methods
* Avoid runtime errors
* Work effectively with union types
* Write predictable logic

---

## 🔹 11. Common Pitfalls

### ❌ Confusing `null` with `object`

```ts
typeof null === "object"; // ⚠️ JavaScript quirk
```

👉 `typeof` cannot distinguish `null`.

---

### ❌ Using `typeof` for arrays

```ts
typeof [] === "object"; // ❌ not helpful
```

👉 Use `Array.isArray()` instead.

---

### ❌ Forgetting exhaustive checks

```ts
function test(value: string | number) {
  if (typeof value === "string") {
    // handle string
  }
  // ❌ forgot number case
}
```

---

## 🔹 12. Best Practices

* ✔ Use `typeof` for primitive types only
* ✔ Combine with `else` for exhaustive handling
* ✔ Prefer `typeof` over type assertions for safety
* ✔ Use with union types frequently
* ✔ Keep conditions simple and readable

---

## 🔹 13. `typeof` vs Other Narrowing Techniques

| Technique     | Use Case               |
| ------------- | ---------------------- |
| `typeof`      | Primitive types        |
| `instanceof`  | Classes/objects        |
| `in` operator | Object property checks |
| Custom guards | Complex logic          |

---

## 🔹 14. Real-World Example

```ts
function log(value: string | number | boolean | undefined) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else if (typeof value === "boolean") {
    console.log(value ? "True" : "False");
  } else {
    console.log("Undefined value");
  }
}
```

---

## 🚀 In Summary

`typeof` narrowing in TypeScript:

* Uses JavaScript’s `typeof` operator
* Works best with primitive types
* Helps refine union types safely
* Enables safe access to type-specific methods
* Is one of the most commonly used narrowing techniques

👉 It is a foundational tool for writing **safe, predictable, and type-aware TypeScript code**.

---

## 🧠 `instanceof` Narrowing in TypeScript — Full Detail

`instanceof` narrowing is a TypeScript technique used to **refine types based on class instances at runtime**. It leverages JavaScript’s `instanceof` operator to determine whether an object is created from a specific class.

This is especially useful when working with **union types of class instances**.

---

## 🔹 1. What is `instanceof` Narrowing?

`instanceof` checks whether an object is an instance of a specific class:

```ts 
value instanceof SomeClass
```

When used in TypeScript, it tells the compiler:

> “Inside this block, treat `value` as an instance of `SomeClass`.”

---

## 🔹 2. Basic Example

```ts 
class Dog {
  bark() {
    console.log("Woof");
  }
}

class Cat {
  meow() {
    console.log("Meow");
  }
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // ✔ Dog
  } else {
    animal.meow(); // ✔ Cat
  }
}
```

---

## 🔹 3. How It Works

* At runtime → JavaScript checks the prototype chain
* At compile time → TypeScript narrows the type

---

## 🔹 4. Narrowing Multiple Classes

```ts 
class Car {
  drive() {}
}

class Bike {
  ride() {}
}

function move(vehicle: Car | Bike) {
  if (vehicle instanceof Car) {
    vehicle.drive();
  } else {
    vehicle.ride();
  }
}
```

---

## 🔹 5. Real-World Example

```ts 
class ApiError {
  constructor(public message: string) {}
}

class ValidationError {
  constructor(public field: string) {}
}

function handleError(error: ApiError | ValidationError) {
  if (error instanceof ApiError) {
    console.log("API Error:", error.message);
  } else {
    console.log("Validation Error on:", error.field);
  }
}
```

---

## 🔹 6. Why Use `instanceof` Narrowing?

It helps you:

* Safely access class-specific methods
* Differentiate between object types
* Avoid unsafe type assertions
* Write clear object-oriented logic

---

## 🔹 7. `instanceof` vs `typeof`

| Feature    | `typeof`                | `instanceof`              |
| ---------- | ----------------------- | ------------------------- |
| Works with | Primitives              | Class instances           |
| Example    | `"string"`              | `value instanceof Class`  |
| Use case   | string, number, boolean | objects created via class |

---

## 🔹 8. Important Requirement

`instanceof` works only with:

* ✔ Classes
* ✔ Constructor functions

---

### ❌ Does NOT work with interfaces

```ts 
interface Dog {
  bark(): void;
}

if (animal instanceof Dog) {
  // ❌ Error: Dog is not a value
}
```

---

👉 Interfaces are erased at runtime.

---

## 🔹 9. Custom Classes and Prototypes

```ts 
class Person {}

const p = new Person();

console.log(p instanceof Person); // true
```

---

👉 Works via prototype chain.

---

## 🔹 10. Edge Case: Multiple Copies of a Class

If the same class exists in different modules:

```ts 
// Might fail:
value instanceof MyClass // ❌ sometimes false
```

👉 Because they are different constructor references.

---

## 🔹 11. Combining with Other Narrowing

```ts 
function process(value: string | Date) {
  if (value instanceof Date) {
    console.log(value.toISOString());
  } else {
    console.log(value.toUpperCase());
  }
}
```

---

## 🔹 12. Using `instanceof` with Built-in Classes

```ts 
function format(value: Date | string) {
  if (value instanceof Date) {
    return value.toDateString();
  }
  return value.toUpperCase();
}
```

---

👉 Works with:

* `Date`
* `Error`
* `Array` (but better use `Array.isArray()`)

---

## 🔹 13. Common Mistakes

### ❌ Using with interfaces

```ts 
interface A {}
value instanceof A; // ❌ invalid
```

---

### ❌ Using with plain objects

```ts 
const obj = {};
obj instanceof Object; // ✔ but not useful for narrowing
```

---

### ❌ Forgetting class usage

```ts 
type A = { x: number };
// instanceof cannot be used here ❌
```

---

## 🔹 14. Best Practices

* ✔ Use `instanceof` only with classes
* ✔ Prefer it over manual property checks for class objects
* ✔ Combine with union types
* ✔ Avoid relying on it across module boundaries
* ✔ Use custom type guards when needed

---

## 🔹 15. Alternative: Custom Type Guards

When `instanceof` doesn’t work:

```ts 
function isDog(obj: any): obj is Dog {
  return "bark" in obj;
}
```

---

## 🚀 In Summary

`instanceof` narrowing in TypeScript:

* Narrows types based on class instances
* Works using JavaScript’s prototype chain
* Is ideal for object-oriented patterns
* Does NOT work with interfaces or type aliases
* Helps safely access class-specific properties and methods

👉 It’s a key tool for handling **class-based polymorphism and safe object type differentiation in TypeScript**.


---

## 🔍 `in` Narrowing for Property Existence Checks in TypeScript — Full Detail

The `in` operator in TypeScript is used to **check whether a property exists on an object**. When used in conditional statements, it enables **type narrowing**—allowing TypeScript to refine a variable’s type based on the presence of a property.

This is especially useful when working with **union types of objects**.

---

## 🔹 1. What is `in` Narrowing?

The `in` operator checks if a property exists in an object:

```ts 
"propertyName" in obj
```

When used in TypeScript:

> It tells the compiler that if the property exists, the object must be of a specific type.

---

## 🔹 2. Basic Example

```ts 
type Dog = {
  bark: () => void;
};

type Cat = {
  meow: () => void;
};

function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark(); // ✔ Dog
  } else {
    animal.meow(); // ✔ Cat
  }
}
```

---

## 🔹 3. How It Works

* At runtime → JavaScript checks property existence
* At compile time → TypeScript narrows the type

---

## 🔹 4. Real-World Example

```ts 
type ApiResponse =
  | { success: true; data: string }
  | { success: false; error: string };

function handle(res: ApiResponse) {
  if ("data" in res) {
    console.log(res.data);  // ✔ success case
  } else {
    console.log(res.error); // ✔ error case
  }
}
```

---

## 🔹 5. Using `in` with Optional Properties

```ts 
type User = {
  name: string;
  age?: number;
};

function print(user: User) {
  if ("age" in user) {
    console.log(user.age); // number | undefined
  }
}
```

---

👉 Note: The property exists, but may still be `undefined`.

---

## 🔹 6. Narrowing Complex Unions

```ts 
type Shape =
  | { radius: number }
  | { width: number; height: number };

function area(shape: Shape) {
  if ("radius" in shape) {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.width * shape.height;
  }
}
```

---

## 🔹 7. Multiple Property Checks

```ts 
if ("x" in obj && "y" in obj) {
  // narrowed to type with both properties
}
```

---

## 🔹 8. Why Use `in` Narrowing?

It helps you:

* Safely access properties
* Avoid runtime errors
* Distinguish between object shapes
* Work effectively with unions

---

## 🔹 9. `in` vs Other Narrowing Methods

| Method       | Use Case                  |
| ------------ | ------------------------- |
| `typeof`     | Primitive types           |
| `instanceof` | Class instances           |
| `in`         | Object property existence |
| Custom guard | Complex logic             |

---

## 🔹 10. Important Notes

### ✔ Works with objects only

```ts id="t1u2v3"
"x" in obj;
```

---

### ❌ Not for primitives

```ts 
"x" in 42; // ❌ error
```

---

## 🔹 11. Edge Case: Property Exists but Undefined

```ts 
type A = { x?: number };

const obj: A = {};

if ("x" in obj) {
  console.log(obj.x); // number | undefined
}
```

---

👉 Use additional checks if needed:

```ts 
if ("x" in obj && obj.x !== undefined) {
  console.log(obj.x); // number
}
```

---

## 🔹 12. Common Mistakes

### ❌ Assuming value is defined

```ts 
if ("x" in obj) {
  obj.x.toFixed(); // ❌ might be undefined
}
```

---

### ❌ Using wrong property names

```ts 
if ("barkk" in animal) // ❌ typo
```

---

### ❌ Using when types overlap

If both types share the property, narrowing won’t work.

---

## 🔹 13. Best Practices

* ✔ Use `in` for object unions
* ✔ Combine with null/undefined checks
* ✔ Prefer discriminated unions when possible
* ✔ Keep property names clear and unique
* ✔ Use for runtime-safe property access

---

## 🔹 14. Advanced: Discriminated Union Alternative

Instead of `in`, you can use a common tag:

```ts 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}
```

---

👉 Often cleaner than `in`.

---

## 🔹 15. Real-World Use Case

```ts 
type Payment =
  | { cardNumber: string }
  | { paypalEmail: string };

function process(payment: Payment) {
  if ("cardNumber" in payment) {
    console.log("Card:", payment.cardNumber);
  } else {
    console.log("PayPal:", payment.paypalEmail);
  }
}
```

---

## 🚀 In Summary

`in` narrowing in TypeScript:

* Checks if a property exists in an object
* Narrows union types based on property presence
* Works only with objects
* Does NOT guarantee the value is defined
* Is ideal for distinguishing object shapes

👉 It’s a powerful tool for writing **safe, flexible, and type-aware object handling logic in TypeScript**.


---

## ⚖️ Equality Narrowing (`===` and `!==`) in TypeScript — Full Detail

Equality narrowing is a TypeScript technique where the type system **narrows a variable based on strict equality checks** using `===`, `!==`, `==`, or `!=`.

It is one of the simplest and most powerful forms of narrowing because it relies on **direct value comparison**.

---

## 🔹 1. What is Equality Narrowing?

When you compare a variable to a specific value, TypeScript can infer:

> “If this condition is true, the variable must be this exact type/value.”

---

### 🔹 Example

```ts 
function print(value: string | number) {
  if (value === "hello") {
    // value is now "hello" (string literal type)
    console.log(value.toUpperCase());
  }
}
```

---

## 🔹 2. How It Works

TypeScript uses control flow analysis:

* Before check → `string | number`
* After check → narrowed type based on comparison

---

## 🔹 3. Narrowing with String Literals

```ts 
type Status = "success" | "error";

function handle(status: Status) {
  if (status === "success") {
    console.log("All good!");
  } else {
    console.log("Something went wrong");
  }
}
```

---

👉 TypeScript now knows:

* Inside `if` → `"success"`
* Inside `else` → `"error"`

---

## 🔹 4. Narrowing with Numbers

```ts 
function process(value: number | null) {
  if (value === 0) {
    console.log("Zero");
  }
}
```

---

👉 Here, `value` is narrowed to `0` (literal type).

---

## 🔹 5. Narrowing with `null` and `undefined`

This is one of the most common uses.

---

### 🔹 Example

```ts 
function greet(name: string | undefined) {
  if (name === undefined) {
    console.log("Hello guest");
  } else {
    console.log("Hello " + name);
  }
}
```

---

👉 TypeScript safely narrows:

* `undefined` branch
* `string` branch

---

## 🔹 6. Narrowing with `null`

```ts 
function log(value: string | null) {
  if (value === null) {
    return;
  }

  console.log(value.toUpperCase());
}
```

---

## 🔹 7. Strict Equality (`===`) vs Loose Equality (`==`)

### ✔ Recommended: `===`

* No type coercion
* Safer narrowing
* Predictable behavior

---

### ❌ Avoid: `==`

```ts 
if (value == null) {
  // matches null OR undefined
}
```

👉 Sometimes useful, but less precise.

---

## 🔹 8. Nullish Check Shortcut

```ts 
if (value == null) {
  // value is null or undefined
}
```

👉 Equivalent to:

```ts 
if (value === null || value === undefined)
```

---

## 🔹 9. Discriminated Union Narrowing (Best Use Case)

Equality narrowing shines with tagged unions.

---

### 🔹 Example

```ts 
type Shape =
  | { type: "circle"; radius: number }
  | { type: "square"; size: number };

function area(shape: Shape) {
  if (shape.type === "circle") {
    return Math.PI * shape.radius ** 2;
  }

  return shape.size ** 2;
}
```

---

👉 TypeScript narrows based on `type` property.

---

## 🔹 10. Multiple Equality Checks

```ts 
function check(value: "a" | "b" | "c") {
  if (value === "a") {
    // narrowed to "a"
  } else if (value === "b") {
    // narrowed to "b"
  } else {
    // "c"
  }
}
```

---

## 🔹 11. Why Equality Narrowing is Powerful

It allows:

* ✔ Safe branching logic
* ✔ Exhaustive type handling
* ✔ Precise type inference
* ✔ Zero runtime overhead

---

## 🔹 12. Common Mistakes

### ❌ Using non-literal comparisons

```ts 
if (value === someVariable) {
  // narrowing may not be helpful
}
```

---

### ❌ Forgetting exhaustive checks

```ts 
type Mode = "on" | "off";

if (mode === "on") {
  // ❌ missing "off"
}
```

---

### ❌ Mixing types incorrectly

```ts 
if (value === true) {
  // only works if boolean or literal true
}
```

---

## 🔹 13. Best Practices

* ✔ Prefer `===` over `==`
* ✔ Use with union types and literals
* ✔ Combine with discriminated unions
* ✔ Ensure exhaustive checks in complex logic
* ✔ Avoid unnecessary comparisons

---

## 🔹 14. Equality Narrowing vs Other Techniques

| Technique    | Use Case                 |
| ------------ | ------------------------ |
| `typeof`     | primitives               |
| `instanceof` | classes                  |
| `in`         | object properties        |
| `===`        | literal / value matching |

---

## 🔹 15. Real-World Example

```ts 
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };

function render(state: ApiState) {
  if (state.status === "loading") {
    console.log("Loading...");
  } else if (state.status === "success") {
    console.log(state.data);
  } else {
    console.log(state.error);
  }
}
```

---

## 🚀 In Summary

Equality narrowing in TypeScript:

* Uses `===` / `!==` comparisons
* Narrows union types based on exact matches
* Works best with literal types and discriminated unions
* Helps TypeScript refine types safely and precisely
* Has zero runtime cost

👉 It is one of the most important tools for writing **clean, predictable, and type-safe control flow in TypeScript**.


---

## 🧪 Custom Type Guards (`value is T`) in TypeScript — Full Detail

Custom type guards are functions that let you **manually tell TypeScript how to narrow a type** when built-in narrowing (`typeof`, `instanceof`, `in`, etc.) is not enough.

They use a special return type:

```ts
value is SomeType
```

This is called a **type predicate**.

---

## 🔹 1. What is a Custom Type Guard?

A custom type guard is a function that:

* Checks a condition at runtime
* And informs TypeScript about the refined type

---

### 🔹 Syntax

```ts 
function isType(value: unknown): value is Type {
  return true | false;
}
```

---

## 🔹 2. Why Do We Need Custom Type Guards?

Built-in narrowing has limits:

* `typeof` → only primitives
* `instanceof` → only classes
* `in` → only simple property checks

👉 But real-world data (especially APIs) is complex.

Custom type guards solve this.

---

## 🔹 3. Basic Example

```ts 
type Dog = {
  bark: () => void;
};

type Cat = {
  meow: () => void;
};

function isDog(animal: Dog | Cat): animal is Dog {
  return "bark" in animal;
}
```

---

### 🔹 Usage

```ts 
function speak(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark(); // ✔ Dog
  } else {
    animal.meow(); // ✔ Cat
  }
}
```

---

## 🔹 4. How `value is T` Works

When TypeScript sees:

```ts 
animal is Dog
```

It understands:

> “If this function returns true, treat `animal` as `Dog`.”

---

## 🔹 5. Real-World Example: API Response Validation

```ts 
type Success = {
  success: true;
  data: string;
};

type Failure = {
  success: false;
  error: string;
};
```

---

### 🔹 Type Guard

```ts 
function isSuccess(res: Success | Failure): res is Success {
  return res.success === true;
}
```

---

### 🔹 Usage

```ts 
function handle(res: Success | Failure) {
  if (isSuccess(res)) {
    console.log(res.data); // ✔ Success
  } else {
    console.log(res.error); // ✔ Failure
  }
}
```

---

## 🔹 6. Type Guard with `unknown` (Best Practice)

Custom guards are often used to validate unknown data:

```ts 
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

---

### 🔹 Usage

```ts 
function print(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

---

## 🔹 7. Complex Object Validation

```ts 
type User = {
  name: string;
  age: number;
};

function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    typeof value.age === "number"
  );
}
```

---

## 🔹 8. Array Type Guards

```ts 
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(item => typeof item === "string")
  );
}
```

---

## 🔹 9. Using Type Guards in Filtering

```ts 
const values: unknown[] = ["a", 1, "b", true];

const strings = values.filter((v): v is string => typeof v === "string");
```

---

## 🔹 10. Why Not Just Use `boolean`?

Without type predicates:

```ts 
function isString(value: unknown): boolean {
  return typeof value === "string";
}
```

👉 TypeScript does NOT narrow the type.

---

### 🔴 Problem:

```ts 
if (isString(value)) {
  value.toUpperCase(); // ❌ error
}
```

---

## 🔹 11. With `value is T` (Correct Way)

```ts 
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

---

### ✔ Now works:

```ts 
if (isString(value)) {
  value.toUpperCase(); // ✔ allowed
}
```

---

## 🔹 12. Combining Multiple Guards

```ts 
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function process(value: unknown) {
  if (isString(value)) {
    return value.length;
  }

  if (isNumber(value)) {
    return value.toFixed(2);
  }
}
```

---

## 🔹 13. Where Custom Type Guards Shine

* API response validation
* Parsing unknown JSON
* Runtime safety checks
* Framework data handling
* Form validation
* Library development

---

## 🔹 14. Common Mistakes

### ❌ Forgetting `value is T`

```ts 
function isString(value: unknown) {
  return typeof value === "string";
}
```

👉 No narrowing happens.

---

### ❌ Incomplete checks

```ts 
function isUser(value: any): value is User {
  return typeof value.name === "string"; // ❌ unsafe
}
```

---

### ❌ Assuming structure without validation

Always validate deeply.

---

## 🔹 15. Best Practices

* ✔ Always use `value is T` for narrowing
* ✔ Validate all required fields
* ✔ Use `unknown` instead of `any`
* ✔ Keep guards pure (no side effects)
* ✔ Combine with runtime checks (`typeof`, `in`, etc.)

---

## 🚀 In Summary

Custom type guards in TypeScript:

* Use the syntax `value is T`
* Allow manual type narrowing at runtime
* Are essential for validating unknown or external data
* Enable safe access to properties after checks
* Bridge the gap between runtime data and static typing

👉 They are one of the most powerful tools for building **safe, reliable, and production-ready TypeScript applications**.


---

## 🚨 Assertion Functions (`asserts value is T`) in TypeScript — Full Detail

Assertion functions are a special kind of function in TypeScript that **narrow types by either throwing an error or confirming a condition at runtime**. They use the keyword:

```ts 
asserts value is T
```

This tells TypeScript:

> “If this function returns (doesn’t throw), then `value` is guaranteed to be type `T`.”

---

## 🔹 1. What is an Assertion Function?

An assertion function:

* Checks a condition at runtime
* Throws an error if the condition is false
* Narrows the type automatically if it passes

---

### 🔹 Syntax

```ts 
function assertSomething(value: unknown): asserts value is SomeType {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}
```

---

## 🔹 2. Why Assertion Functions Exist

They solve a key problem:

> “How do we guarantee a value is a certain type without returning a new value?”

Unlike type guards, assertion functions:

* ❌ don’t return boolean
* ✔ either succeed or throw
* ✔ narrow types automatically

---

## 🔹 3. Basic Example

### 🔹 Assert a string

```ts 
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}
```

---

### 🔹 Usage

```ts 
function print(value: unknown) {
  assertIsString(value);

  // ✔ value is now string
  console.log(value.toUpperCase());
}
```

---

## 🔹 4. How It Works

Before assertion:

```ts 
unknown
```

After assertion:

```ts 
string
```

👉 TypeScript assumes the assertion succeeded.

---

## 🔹 5. Assertion vs Type Guard

| Feature              | Type Guard (`value is T`) | Assertion (`asserts value is T`) |
| -------------------- | ------------------------- | -------------------------------- |
| Returns boolean      | ✔ Yes                     | ❌ No                             |
| Throws error         | ❌ No                      | ✔ Yes                            |
| Used in conditionals | ✔ Yes                     | ❌ No                             |
| Narrows type         | ✔ Yes                     | ✔ Yes                            |

---

## 🔹 6. Real-World Example: API Validation

```ts 
type User = {
  name: string;
  age: number;
};

function assertUser(value: unknown): asserts value is User {
  if (
    typeof value !== "object" ||
    value === null ||
    typeof (value as any).name !== "string" ||
    typeof (value as any).age !== "number"
  ) {
    throw new Error("Invalid user");
  }
}
```

---

### 🔹 Usage

```ts 
function handle(data: unknown) {
  assertUser(data);

  // ✔ data is User
  console.log(data.name);
}
```

---

## 🔹 7. Assertion with Arrays

```ts 
function assertStringArray(value: unknown): asserts value is string[] {
  if (
    !Array.isArray(value) ||
    !value.every(v => typeof v === "string")
  ) {
    throw new Error("Not a string array");
  }
}
```

---

## 🔹 8. Assertion for Non-Null Values

Very common pattern:

```ts 
function assertNotNull<T>(value: T | null | undefined): asserts value is T {
  if (value == null) {
    throw new Error("Value is null or undefined");
  }
}
```

---

### 🔹 Usage

```ts 
let name: string | undefined = "Alice";

assertNotNull(name);

// ✔ now string
console.log(name.toUpperCase());
```

---

## 🔹 9. DOM Example (Very Common in Frontend)

```ts 
function assertElement(
  el: HTMLElement | null
): asserts el is HTMLElement {
  if (!el) {
    throw new Error("Element not found");
  }
}
```

---

### 🔹 Usage

```ts 
const button = document.querySelector("button");

assertElement(button);

// ✔ button is HTMLElement
button.click();
```

---

## 🔹 10. Assertion Without Return Value

Notice:

```ts 
function assertX(value: unknown): asserts value is string {
  // no return statement
}
```

👉 The function either:

* throws ❌
* or continues ✔

---

## 🔹 11. Why Use Assertions Instead of Guards?

Use assertions when:

* You want to **stop execution if invalid**
* You don’t want branching logic
* You want cleaner code flow
* You are validating critical inputs

---

## 🔹 12. Common Mistakes

### ❌ Not throwing errors

```ts 
function assertString(value: unknown): asserts value is string {
  return typeof value === "string"; // ❌ wrong
}
```

---

### ❌ Using in place of guards incorrectly

Assertions are not for conditional branching.

---

### ❌ Overusing assertions

Can make debugging harder if overused.

---

## 🔹 13. Assertion vs Type Casting

### ❌ Type casting (unsafe)

```ts 
const value = data as string;
```

---

### ✔ Assertion (safe)

```ts 
assertIsString(data);
```

👉 Runtime validation included.

---

## 🔹 14. Best Practices

* ✔ Always throw on failure
* ✔ Use for critical validation logic
* ✔ Prefer over `as` casting for safety
* ✔ Combine with `unknown` inputs
* ✔ Keep assertions small and reusable

---

## 🔹 15. When to Use Assertion Functions

Use them when:

* Validating API responses
* Parsing external data
* Working with DOM elements
* Ensuring non-null values
* Guarding critical runtime assumptions

---

## 🚀 In Summary

Assertion functions in TypeScript:

* Use `asserts value is T` syntax
* Narrow types by throwing errors if invalid
* Do not return values
* Provide runtime safety + compile-time narrowing
* Are ideal for validating unknown or external data

👉 They are a powerful tool for building **safe, defensive, and reliable TypeScript applications with strong runtime guarantees**.

---

## 🧠 Discriminated Unions — The Most Powerful Narrowing Technique in TypeScript

Discriminated unions (also called **tagged unions**) are one of the most important and powerful features in TypeScript. They allow you to model complex states in a **safe, predictable, and fully type-narrowable way**.

They combine:

* Union types
* Literal types
* Type narrowing (especially equality checks)

---

## 🔹 1. What is a Discriminated Union?

A discriminated union is a union of object types that all share a **common property**, called the **discriminant** (or tag), which has a **literal value type**.

---

### 🔹 Basic Structure

```ts 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };
```

---

👉 The `kind` property is the discriminant.

---

## 🔹 2. Why It’s So Powerful

Discriminated unions let TypeScript:

* Automatically narrow types using `===`
* Know exactly which fields exist
* Prevent invalid property access
* Enable exhaustive checking

---

## 🔹 3. Basic Example

```ts 
function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }

  return shape.size ** 2;
}
```

---

### 🔹 What TypeScript knows:

| Branch              | Type of `shape`      |
| ------------------- | -------------------- |
| `kind === "circle"` | `{ radius: number }` |
| else                | `{ size: number }`   |

---

## 🔹 4. How It Works Internally

TypeScript uses:

* Equality narrowing (`===`)
* Literal types (`"circle"`, `"square"`)
* Shared property (`kind`)

👉 Together, they form a **perfect narrowing signal**

---

## 🔹 5. Real-World Example: API Responses

```ts 
type ApiResponse =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };
```

---

### 🔹 Usage

```ts 
function handle(res: ApiResponse) {
  if (res.status === "loading") {
    console.log("Loading...");
  } else if (res.status === "success") {
    console.log(res.data);
  } else {
    console.log(res.error);
  }
}
```

---

👉 TypeScript automatically narrows each branch.

---

## 🔹 6. Exhaustive Checking (Very Important)

You can ensure all cases are handled using `never`.

```ts 
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}
```

---

### 🔹 Usage

```ts 
function handle(res: ApiResponse) {
  switch (res.status) {
    case "loading":
      return "Loading";

    case "success":
      return res.data;

    case "error":
      return res.error;

    default:
      return assertNever(res); // ✔ ensures completeness
  }
}
```

---

## 🔹 7. Why Discriminated Unions Beat `in` Narrowing

### ❌ Using `in`

```ts 
if ("radius" in shape) {}
```

* Less structured
* Easy to break
* No explicit tag

---

### ✔ Discriminated Union

```ts 
if (shape.kind === "circle") {}
```

👉 Much safer and clearer.

---

## 🔹 8. Multiple Fields per Variant

```ts 
type Event =
  | { type: "click"; x: number; y: number }
  | { type: "keypress"; key: string };
```

---

### 🔹 Usage

```ts 
function handle(event: Event) {
  if (event.type === "click") {
    console.log(event.x, event.y);
  } else {
    console.log(event.key);
  }
}
```

---

## 🔹 9. Real-World Example: Authentication States

```ts 
type AuthState =
  | { status: "logged_out" }
  | { status: "loading" }
  | { status: "logged_in"; userId: string };
```

---

### 🔹 Usage

```ts 
function render(state: AuthState) {
  switch (state.status) {
    case "logged_out":
      return "Please log in";

    case "loading":
      return "Loading...";

    case "logged_in":
      return `Welcome ${state.userId}`;
  }
}
```

---

## 🔹 10. Advantages of Discriminated Unions

✔ Fully type-safe
✔ No unsafe property access
✔ Excellent IntelliSense support
✔ Easy to refactor
✔ Works with exhaustive checks
✔ Scales well for large systems

---

## 🔹 11. Common Mistakes

### ❌ Missing discriminant property

```ts 
type Shape =
  | { radius: number }
  | { size: number };
```

👉 TypeScript cannot narrow safely.

---

### ❌ Using non-literal discriminants

```ts 
type A = { kind: string }; // ❌ too broad
```

---

### ❌ Forgetting exhaustive handling

Leads to runtime bugs.

---

## 🔹 12. Best Practices

* ✔ Always use a shared discriminant (`kind`, `type`, `status`)
* ✔ Use literal string types
* ✔ Combine with `switch` statements
* ✔ Add `assertNever` for safety
* ✔ Keep each variant self-contained

---

## 🔹 13. Discriminated Unions vs Other Narrowing

| Technique            | Strength                 |
| -------------------- | ------------------------ |
| `typeof`             | primitives               |
| `instanceof`         | classes                  |
| `in`                 | object properties        |
| `===`                | literal checks           |
| Discriminated unions | structured complex logic |

---

## 🚀 In Summary

Discriminated unions in TypeScript:

* Use a shared literal property to distinguish types
* Enable automatic narrowing with `===` or `switch`
* Provide full type safety for complex objects
* Are the most scalable and maintainable narrowing technique
* Support exhaustive checking with `never`

👉 They are the **gold standard for modeling real-world state machines, API responses, and complex domain logic in TypeScript**.

---

## 🔄 Control Flow Analysis in TypeScript — Full Detail

Control flow analysis is the internal mechanism TypeScript uses to **track and refine types as your code executes through different branches** (like `if`, `else`, loops, returns, and switches).

It is one of the core reasons TypeScript feels “smart” — because it doesn’t just look at declarations, it follows how values behave in your program.

---

## 🔹 1. What is Control Flow Analysis?

Control flow analysis means:

> TypeScript tracks how a variable’s type changes as execution moves through different parts of your code.

So instead of treating a variable as one fixed type, TypeScript continuously **narrows or widens it depending on logic paths**.

---

## 🔹 2. Basic Example

```ts 
function print(value: string | number) {
  if (typeof value === "string") {
    // string branch
    console.log(value.toUpperCase());
  } else {
    // number branch
    console.log(value.toFixed(2));
  }
}
```

---

### 🔹 What TypeScript does internally:

| Code Path     | Type of `value` |         |
| ------------- | --------------- | ------- |
| Before `if`   | `string         | number` |
| Inside `if`   | `string`        |         |
| Inside `else` | `number`        |         |

---

## 🔹 3. How TypeScript Tracks Flow

TypeScript builds a **control flow graph** of your function:

* Assignments
* Conditions
* Returns
* Branches

Then it updates the type of each variable as the program flows.

---

## 🔹 4. Narrowing Through Conditions

### 🔹 Example: `null` handling

```ts 
function greet(name: string | null) {
  if (name === null) {
    return;
  }

  // here: string
  console.log(name.toUpperCase());
}
```

---

👉 TypeScript knows the `return` removes `null` from the flow.

---

## 🔹 5. Narrowing Through Returns

```ts 
function process(value: string | number) {
  if (typeof value === "string") {
    return value.length;
  }

  return value.toFixed(2);
}
```

---

👉 After return, TypeScript narrows remaining flow automatically.

---

## 🔹 6. Narrowing Across Multiple Branches

```ts 
function example(x: string | number | boolean) {
  if (typeof x === "string") {
    // string
  } else if (typeof x === "number") {
    // number
  } else {
    // boolean
  }
}
```

---

👉 Each branch has a fully refined type.

---

## 🔹 7. Control Flow and Reassignment

TypeScript also tracks reassignment:

```ts 
let value: string | number = "hello";

value = 123;

// now number
value.toFixed();
```

---

👉 The type updates dynamically.

---

## 🔹 8. Unreachable Code Detection

Control flow analysis can detect impossible paths:

```ts 
function test(x: string) {
  if (typeof x === "number") {
    // ❌ never reachable
  }
}
```

---

👉 TypeScript marks this as dead code.

---

## 🔹 9. Narrowing with Truthy/Falsy Checks

```ts 
function print(value?: string) {
  if (value) {
    // string
    console.log(value.toUpperCase());
  }
}
```

---

👉 TypeScript narrows `string | undefined` → `string`.

---

## 🔹 10. Narrowing with Loops

```ts 
function process(items: (string | number)[]) {
  for (const item of items) {
    if (typeof item === "string") {
      console.log(item.toUpperCase());
    }
  }
}
```

---

👉 Each iteration is analyzed independently.

---

## 🔹 11. Narrowing with Switch Statements

```ts 
function handle(value: "a" | "b" | "c") {
  switch (value) {
    case "a":
      break;
    case "b":
      break;
    case "c":
      break;
  }
}
```

---

👉 TypeScript tracks remaining possibilities per case.

---

## 🔹 12. Exhaustive Flow Tracking (Advanced)

With `never`:

```ts 
function assertNever(x: never): never {
  throw new Error("Unexpected value");
}
```

---

Used with control flow:

```ts 
function handle(value: "a" | "b") {
  switch (value) {
    case "a":
      return;
    case "b":
      return;
    default:
      return assertNever(value); // ensures completeness
  }
}
```

---

## 🔹 13. Why Control Flow Analysis is Powerful

It enables TypeScript to:

✔ Track variable types across branches
✔ Eliminate unsafe operations
✔ Prevent runtime errors
✔ Support advanced narrowing techniques
✔ Provide intelligent autocomplete

---

## 🔹 14. Real-World Example

```ts 
type Response =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function render(res: Response) {
  if (res.status === "loading") {
    return "Loading...";
  }

  if (res.status === "success") {
    return res.data;
  }

  return res.message;
}
```

---

👉 TypeScript follows each branch precisely.

---

## 🔹 15. Common Misconceptions

### ❌ “TypeScript runs the code”

No — it only analyzes structure, not execution.

---

### ❌ “Types are static everywhere”

They are static, but **flow-aware**, not fixed.

---

### ❌ “Narrowing is manual”

Much of it is automatic via control flow analysis.

---

## 🔹 16. Best Practices

* ✔ Use early returns to simplify flow
* ✔ Prefer discriminated unions
* ✔ Use strict null checks (`strictNullChecks`)
* ✔ Avoid overly complex branching
* ✔ Let TypeScript infer when possible

---

## 🚀 In Summary

Control flow analysis in TypeScript:

* Tracks how types change across execution paths
* Works through `if`, `switch`, loops, and returns
* Enables automatic type narrowing
* Prevents unsafe operations
* Powers most advanced TypeScript type safety features

👉 It is the **foundation that makes TypeScript’s type narrowing intelligent, reliable, and context-aware across your entire codebase**.

---



## 💡 Key Takeaways

- Narrowing is how TypeScript refines a union type to a more specific type in a branch
- Always use discriminated unions (with a `kind`/`type` field) for complex union types
- Custom type guards (value is T) give you full control over narrowing
- Exhaustive checks with `never` ensure you handle all cases as types evolve

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---


## ⏭️ Next Up

**[Day 11 — Classes in TypeScript →](../Day-11-Classes/)**
