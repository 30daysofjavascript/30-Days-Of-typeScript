# 📘 Day 13 — Generics: Basics

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Generics: Basics
- THE PROBLEM GENERICS SOLVE
- Without generics, you either lose type safety or repeat code
- Genric functiions
- Multiple type parameters
- Generic constraints - extends
- Restrict what types can be used with a generic
- Generic interfaces
- Genric classes
- Default type parameters
- Generic type aliases

---

## 🧬 What Are Generics in TypeScript? + The Problem They Solve (Full Detail)

Generics are one of the most powerful features in TypeScript. They allow you to write **reusable, type-safe code that works with multiple data types without losing information about those types**.

Instead of locking your code to one specific type (like `number` or `string`), generics let you define a **placeholder type that is determined when the code is used**.

---

## 🔹 1. What is a Generic?

A generic is a **type parameter**.

Think of it as:

> “A function/class/interface that works with any type, but remembers that type.”

---

### 🔹 Basic Syntax

```ts 
function identity<T>(value: T): T {
  return value;
}
```

---

### 🔹 Usage

```ts 
const a = identity<number>(10);
const b = identity<string>("hello");
```

---

👉 `T` is a placeholder for a type.

---

## 🔹 2. The Core Problem Generics Solve

Before generics, TypeScript developers faced two major issues:

---

# ❌ Problem 1: Losing Type Safety (Using `any`)

When you don’t know the type, you might use `any`.

### 🔴 Example

```ts 
function identity(value: any): any {
  return value;
}
```

---

### 🔴 Problem with `any`

```ts 
const result = identity("hello");

result.toFixed(); // ❌ No error at compile time
```

👉 TypeScript no longer knows the type, so safety is lost.

---

## 🔹 What We Lose Without Generics

* No autocomplete
* No type checking
* No error detection
* Increased runtime bugs

---

# ❌ Problem 2: Repeating Code for Each Type

Without generics, you must duplicate logic for each type.

---

### 🔴 Example (Bad Approach)

```ts 
function identityString(value: string): string {
  return value;
}

function identityNumber(value: number): number {
  return value;
}
```

---

### 🔴 Problems:

* Repetition of same logic
* Hard to maintain
* Not scalable
* Error-prone

---

## 🔹 3. How Generics Solve Both Problems

Generics solve BOTH:

✔ Preserve type safety
✔ Avoid code duplication

---

### 🔹 Generic Solution

```ts 
function identity<T>(value: T): T {
  return value;
}
```

---

### 🔹 Now TypeScript Infers Correctly

```ts 
const a = identity("hello"); // string
const b = identity(123);     // number
```

---

👉 No duplication. No loss of type safety.

---

## 🔹 4. Why Generics Are Powerful

Generics allow:

✔ Reusable functions
✔ Type-safe APIs
✔ Flexible data structures
✔ Strongly typed libraries
✔ Better code abstraction

---

## 🔹 5. Generics in Real Life Analogy

Think of a generic like a **box that remembers what you put inside it**:

* If you put a `string` → it remembers string
* If you put a `number` → it remembers number

But the box itself doesn’t change.

---

## 🔹 6. Generics in Functions (Core Use Case)

```ts 
function wrap<T>(value: T): T[] {
  return [value];
}
```

---

### 🔹 Usage

```ts 
wrap(10);       // number[]
wrap("hello");  // string[]
```

---

## 🔹 7. Generics in Arrays (Built-in Example)

```ts 
const numbers: Array<number> = [1, 2, 3];
const strings: Array<string> = ["a", "b"];
```

---

👉 `Array<T>` is a generic type.

---

## 🔹 8. Generics in Interfaces

```ts 
interface Box<T> {
  value: T;
}
```

---

### 🔹 Usage

```ts 
const box1: Box<number> = { value: 10 };
const box2: Box<string> = { value: "hello" };
```

---

## 🔹 9. Generics in Classes

```ts 
class Container<T> {
  constructor(public value: T) {}
}
```

---

### 🔹 Usage

```ts 
const c1 = new Container<number>(123);
const c2 = new Container<string>("abc");
```

---

## 🔹 10. Key Idea of Generics

Generics allow you to write:

> “One implementation → many types safely”

---

## 🔹 11. What Generics Replace

Without generics:

* `any` (unsafe)
* duplicate functions/classes
* type casting (`as string`, `as number`)

With generics:

✔ One reusable solution
✔ Fully type-safe
✔ Cleaner code

---

## 🔹 12. Common Mistake

### ❌ Using `any` instead of generics

```ts 
function getValue(value: any): any {
  return value;
}
```

---

👉 This removes all TypeScript benefits.

---

## 🔹 13. When You SHOULD Use Generics

Use generics when:

✔ Type is not known in advance
✔ You want reusable logic
✔ You want to preserve input-output type relationship
✔ You are building libraries or utilities

---

## 🚀 In Summary

Generics in TypeScript:

* Allow reusable code with flexible types
* Preserve full type safety
* Solve duplication and `any`-related problems
* Work with functions, classes, interfaces, and types
* Enable scalable and maintainable code design

👉 Without generics, TypeScript becomes repetitive or unsafe. With generics, it becomes **powerful, expressive, and fully type-safe**.

---

## 🧬 Generic Functions in TypeScript — Full Detail

Generic functions are functions that can work with **multiple types while still preserving full type safety**. Instead of fixing a function to a specific type like `string` or `number`, generics allow the type to be **provided dynamically when the function is used**.

This makes functions both **reusable and strongly typed at the same time**.

---

## 🔹 1. What is a Generic Function?

A generic function is a function that uses a **type parameter** (usually written as `<T>`), which acts as a placeholder for a real type.

---

### 🔹 Basic Syntax

```ts 
function functionName<T>(arg: T): T {
  return arg;
}
```

---

👉 `T` is not a real type yet — it becomes a real type when the function is called.

---

## 🔹 2. Simple Identity Function Example

```ts 
function identity<T>(value: T): T {
  return value;
}
```

---

### 🔹 Usage

```ts 
const a = identity<number>(10);
const b = identity<string>("hello");
```

---

### 🔹 Type Inference (Important)

TypeScript often automatically infers the type:

```ts 
const x = identity("hello"); // T = string
const y = identity(42);      // T = number
```

---

## 🔹 3. Why Generic Functions Are Useful

Without generics, you either:

❌ Lose type safety (`any`)
❌ Duplicate functions for each type

With generics:

✔ One function works for all types
✔ Type safety is preserved
✔ Code is reusable and scalable

---

## 🔹 4. Generic Functions with Arrays

```ts 
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```

---

### 🔹 Usage

```ts 
getFirst([1, 2, 3]);        // number
getFirst(["a", "b", "c"]);  // string
```

---

👉 The return type automatically matches array type.

---

## 🔹 5. Multiple Generic Parameters

You can define more than one generic type.

---

### 🔹 Example

```ts 
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}
```

---

### 🔹 Usage

```ts 
pair("age", 25); // [string, number]
```

---

## 🔹 6. Generic Constraints (`extends`)

You can restrict what types are allowed.

---

### 🔹 Example

```ts 
function logLength<T extends { length: number }>(value: T): T {
  console.log(value.length);
  return value;
}
```

---

### 🔹 Valid usage

```ts 
logLength("hello");     // string has length
logLength([1, 2, 3]);   // array has length
```

---

### 🔴 Invalid usage

```ts 
logLength(10); // ❌ number has no length
```

---

## 🔹 7. Default Generic Types

You can set default types:

```ts 
function createArray<T = string>(value: T): T[] {
  return [value];
}
```

---

### 🔹 Usage

```ts 
createArray("hello"); // string[]
createArray(10);      // number[]
```

---

## 🔹 8. Generic Arrow Functions

```ts 
const identity = <T>(value: T): T => {
  return value;
};
```

---

### 🔹 Usage

```ts 
identity(100);
identity("text");
```

---

## 🔹 9. Generic Functions in Real-World Use

### 🔹 API Response Wrapper

```ts 
function fetchData<T>(data: T): { data: T; success: boolean } {
  return {
    data,
    success: true
  };
}
```

---

### 🔹 Usage

```ts 
fetchData({ id: 1, name: "Alice" });
fetchData([1, 2, 3]);
```

---

## 🔹 10. Generic Function Returning Different Types

```ts 
function transform<T, U>(value: T, fn: (input: T) => U): U {
  return fn(value);
}
```

---

### 🔹 Usage

```ts 
const result = transform("123", (str) => Number(str));
```

---

## 🔹 11. How Type Inference Works

TypeScript automatically determines `T` when possible:

```ts 
function wrap<T>(value: T) {
  return value;
}

wrap(true); // T = boolean
```

---

👉 You often don’t need to explicitly write `<T>`.

---

## 🔹 12. Common Mistakes

### ❌ Using `any` instead of generics

```ts 
function identity(value: any): any {
  return value;
}
```

👉 Loses type safety.

---

### ❌ Overcomplicating simple functions

```ts 
function add<T>(a: T, b: T): T {
  return a + b; // ❌ not valid for all types
}
```

---

### ❌ Forgetting constraints

If you need properties like `.length`, you must use `extends`.

---

## 🔹 13. When to Use Generic Functions

Use them when:

✔ Function should work with multiple types
✔ You want to preserve input-output type relationship
✔ You are building reusable utilities
✔ You are designing libraries or frameworks

---

## 🔹 14. When NOT to Use Generics

Avoid generics when:

❌ The type is always fixed
❌ Logic is unrelated to type variation
❌ It makes code unnecessarily complex

---

## 🚀 In Summary

Generic functions in TypeScript:

* Use type parameters like `<T>`
* Work with multiple types safely
* Preserve type relationships between inputs and outputs
* Reduce code duplication
* Enable powerful reusable utilities

👉 They are a core building block of TypeScript’s type system and essential for writing **flexible, reusable, and fully type-safe functions**.

---

## 🧬 Generic Constraints (`extends`) in TypeScript — Full Detail

Generic constraints allow you to **restrict what types can be used in a generic function, class, or interface**. Instead of allowing *any* type, you can enforce rules like:

> “This generic type must have certain properties or extend a specific structure.”

This is done using the `extends` keyword.

---

## 🔹 1. Why Do We Need Generic Constraints?

Without constraints, generics are too flexible:

```ts 
function logLength<T>(value: T) {
  console.log(value.length); // ❌ Error
}
```

---

### 🔴 Problem

TypeScript does NOT know if `T` has a `length` property.

---

## 🔹 2. Solution: `extends` Constraint

We restrict `T` to types that have a `length` property:

```ts 
function logLength<T extends { length: number }>(value: T) {
  console.log(value.length);
  return value;
}
```

---

## 🔹 3. What `extends` Means in Generics

In this context:

> `T extends X` means “T must be assignable to X”

So:

```ts
T extends { length: number }
```

means:

✔ T must have a `length: number` property

---

## 🔹 4. Valid Usage

Now TypeScript allows only compatible types:

```ts 
logLength("hello");      // ✔ string has length
logLength([1, 2, 3]);    // ✔ array has length
```

---

## 🔴 Invalid Usage

```ts 
logLength(123); // ❌ number has no length
```

---

## 🔹 5. Generic Constraints with Interfaces

You can define reusable constraints using interfaces:

```ts 
interface HasLength {
  length: number;
}

function printSize<T extends HasLength>(value: T) {
  console.log(value.length);
}
```

---

## 🔹 6. Constraints with Multiple Properties

You can enforce multiple requirements:

```ts 
function describe<T extends { name: string; age: number }>(obj: T) {
  console.log(obj.name, obj.age);
}
```

---

### 🔹 Usage

```ts 
describe({ name: "Alice", age: 25 });
```

---

## 🔹 7. Constraints with `keyof`

You can restrict generics to valid keys of an object:

```ts 
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

---

### 🔹 Usage

```ts 
const user = { name: "Alice", age: 25 };

getProperty(user, "name"); // ✔
getProperty(user, "age");  // ✔
```

---

## 🔴 Invalid

```ts 
getProperty(user, "email"); // ❌ not a key of user
```

---

## 🔹 8. Constraints with Built-in Types

You can restrict to specific built-in structures:

### 🔹 Example: Array constraint

```ts 
function firstElement<T extends any[]>(arr: T): T[number] {
  return arr[0];
}
```

---

## 🔹 9. Default + Constraint Together

```ts 
function identity<T extends string | number = string>(value: T): T {
  return value;
}
```

---

## 🔹 10. Real-World Example: API Validator

```ts 
function validate<T extends { id: number }>(obj: T) {
  console.log("Valid ID:", obj.id);
}
```

---

### 🔹 Usage

```ts 
validate({ id: 1, name: "Alice" }); // ✔
```

---

## 🔹 11. Constraints in Classes

```ts 
class Container<T extends { id: number }> {
  constructor(public value: T) {}

  getId() {
    return this.value.id;
  }
}
```

---

## 🔹 12. Why Constraints Are Powerful

They allow you to:

✔ Prevent invalid types
✔ Ensure required properties exist
✔ Enable safe property access
✔ Improve autocomplete and inference
✔ Build type-safe reusable utilities

---

## 🔹 13. Common Mistakes

### ❌ Forgetting constraints

```ts id="q1r2s3"
function fn<T>(value: T) {
  return value.length; // ❌ unsafe
}
```

---

### ❌ Over-restricting generics

```ts 
function fn<T extends string>(value: T) {}
```

👉 Too narrow, reduces flexibility.

---

### ❌ Misunderstanding `extends`

`extends` here does NOT mean inheritance — it means **type compatibility constraint**.

---

## 🔹 14. Best Practices

* ✔ Use constraints when accessing properties on generics
* ✔ Keep constraints minimal and precise
* ✔ Prefer `keyof` for object property safety
* ✔ Avoid unnecessary restrictions
* ✔ Combine with inference for cleaner APIs

---

## 🚀 In Summary

Generic constraints using `extends` in TypeScript:

* Restrict what types a generic can accept
* Ensure required properties exist on generic types
* Enable safe property access inside generic code
* Work with interfaces, objects, and `keyof`
* Prevent runtime errors through compile-time safety

👉 They are essential for writing **safe, predictable, and strongly-typed generic APIs in TypeScript**.

---

## 🧬 Generic Interfaces in TypeScript — Full Detail

Generic interfaces allow you to define **interfaces that work with multiple types**. Just like generic functions, generic interfaces make your code **flexible, reusable, and type-safe**, while maintaining strict type checking.

---

## 🔹 1. What is a Generic Interface?

A generic interface is an interface that **accepts one or more type parameters**. These parameters act as placeholders for types that are defined when the interface is used.

---

### 🔹 Basic Syntax

```ts 
interface Box<T> {
  value: T;
}
```

---

### 🔹 Usage

```ts 
const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "Hello" };
```

---

### 🔹 Key Idea

The type `T` is **not fixed** in the interface. It is specified at the **point of usage**, allowing a single interface to represent many different types.

---

## 🔹 2. Multiple Generic Parameters

You can define more than one type parameter in an interface.

```ts 
interface Pair<T, U> {
  first: T;
  second: U;
}
```

---

### 🔹 Usage

```ts 
const pair1: Pair<string, number> = { first: "Age", second: 30 };
const pair2: Pair<boolean, string> = { first: true, second: "Yes" };
```

---

## 🔹 3. Generic Interfaces with Optional Properties

```ts 
interface Response<T> {
  data: T;
  error?: string;
}
```

---

### 🔹 Usage

```ts 
const success: Response<number[]> = { data: [1, 2, 3] };
const failure: Response<null> = { data: null, error: "Failed" };
```

---

## 🔹 4. Generic Interfaces with Readonly Properties

```ts 
interface ReadonlyBox<T> {
  readonly value: T;
}
```

---

### 🔹 Usage

```ts 
const box: ReadonlyBox<string> = { value: "Hello" };
box.value = "World"; // ❌ Error
```

---

## 🔹 5. Generic Constraints in Interfaces

You can use `extends` to constrain generic types:

```ts 
interface LengthwiseBox<T extends { length: number }> {
  value: T;
}
```

---

### 🔹 Usage

```ts 
const box1: LengthwiseBox<string> = { value: "Hello" };
const box2: LengthwiseBox<number[]> = { value: [1, 2, 3] };
// const box3: LengthwiseBox<number> = { value: 123 }; // ❌ Error
```

---

## 🔹 6. Generic Interfaces for Functions

Interfaces can define function types generically:

```ts 
interface Transformer<T, U> {
  (input: T): U;
}
```

---

### 🔹 Usage

```ts 
const numberToString: Transformer<number, string> = (n) => n.toString();
const stringToNumber: Transformer<string, number> = (s) => parseInt(s);
```

---

## 🔹 7. Generic Interfaces for Classes

```ts 
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}
  getValue(): T {
    return this.value;
  }
}
```

---

### 🔹 Usage

```ts 
const numberBox = new Box<number>(42);
const stringBox = new Box<string>("Hello");
```

---

## 🔹 8. Generic Interfaces for API Responses

```ts 
interface ApiResponse<T> {
  status: number;
  payload: T;
  error?: string;
}
```

---

### 🔹 Usage

```ts 
const response1: ApiResponse<{ id: number; name: string }> = {
  status: 200,
  payload: { id: 1, name: "Alice" }
};

const response2: ApiResponse<string[]> = {
  status: 200,
  payload: ["one", "two", "three"]
};
```

---

## 🔹 9. Benefits of Generic Interfaces

* ✔ Reusable across multiple types
* ✔ Maintains type safety
* ✔ Reduces duplication
* ✔ Works with functions, classes, and API data
* ✔ Enables strong typing with flexible structures

---

## 🔹 10. Common Mistakes

* ❌ Using `any` instead of generics (loses type safety)
* ❌ Overcomplicating with too many generic parameters
* ❌ Forgetting constraints when properties are accessed

---

## 🔹 11. Best Practices

* Use **one generic type per concept** when possible
* Name generic parameters clearly (`T`, `U`, `K`, `V`)
* Combine with **constraints** to enforce required properties
* Use generic interfaces for **reusable API contracts, data containers, and function types**

---

## 🚀 In Summary

Generic interfaces in TypeScript:

* Allow a single interface to handle multiple types
* Preserve type safety while being flexible
* Work with properties, functions, and classes
* Can be constrained with `extends`
* Reduce code duplication and improve maintainability

👉 They are a **core tool for designing reusable and type-safe data structures in TypeScript**.


---

## 🧬 Generic Classes in TypeScript — Full Detail

Generic classes allow you to create **reusable class definitions that work with multiple types while preserving type safety**. Instead of locking a class to a single data type, generics let you define a **type parameter that is specified when the class is instantiated**.

This is especially useful for building **data structures, services, repositories, and utility containers**.

---

## 🔹 1. What is a Generic Class?

A generic class is a class that uses a **type parameter** (like `<T>`) to make its properties and methods type-flexible.

---

### 🔹 Basic Syntax

```ts 
class ClassName<T> {
  property: T;

  constructor(value: T) {
    this.property = value;
  }
}
```

---

## 🔹 2. Simple Example: Generic Container

```ts 
class Box<T> {
  constructor(public value: T) {}
}
```

---

### 🔹 Usage

```ts 
const numberBox = new Box<number>(10);
const stringBox = new Box<string>("Hello");
```

---

👉 The class adapts to the type provided at instantiation.

---

## 🔹 3. Why Generic Classes Are Useful

Without generics, you would need:

❌ Separate classes for each type
❌ Unsafe `any` types
❌ Repeated code

With generics:

✔ One reusable class
✔ Full type safety
✔ Flexible design

---

## 🔹 4. Generic Class with Methods

```ts 
class Storage<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  getAll(): T[] {
    return this.data;
  }
}
```

---

### 🔹 Usage

```ts 
const numberStorage = new Storage<number>();
numberStorage.add(1);
numberStorage.add(2);

const stringStorage = new Storage<string>();
stringStorage.add("A");
```

---

## 🔹 5. Generic Class with Multiple Type Parameters

```ts 
class KeyValueStore<K, V> {
  constructor(public key: K, public value: V) {}
}
```

---

### 🔹 Usage

```ts 
const item = new KeyValueStore<string, number>("age", 30);
```

---

## 🔹 6. Generic Constraints in Classes

You can restrict what types are allowed using `extends`.

---

### 🔹 Example

```ts 
class LengthContainer<T extends { length: number }> {
  constructor(public value: T) {}

  getLength(): number {
    return this.value.length;
  }
}
```

---

### 🔹 Usage

```ts 
const box1 = new LengthContainer("Hello");
const box2 = new LengthContainer([1, 2, 3]);
```

---

### 🔴 Invalid

```ts 
const box3 = new LengthContainer(123); // ❌ number has no length
```

---

## 🔹 7. Generic Class with Default Type

You can define a default type:

```ts 
class ApiResponse<T = string> {
  constructor(public data: T) {}
}
```

---

### 🔹 Usage

```ts 
const r1 = new ApiResponse("Success"); // string (default)
const r2 = new ApiResponse<number>(200);
```

---

## 🔹 8. Generic Class in Real-World Example: Repository Pattern

```ts 
class Repository<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }
}
```

---

### 🔹 Usage

```ts 
type User = { id: number; name: string };

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "Alice" });
```

---

## 🔹 9. Generic Classes with Interfaces

```ts 
interface Container<T> {
  value: T;
}
```

---

### 🔹 Implementation

```ts 
class Box<T> implements Container<T> {
  constructor(public value: T) {}
}
```

---

## 🔹 10. Generic Class with Methods Returning Generic Types

```ts 
class Transformer<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}
```

---

## 🔹 11. Type Inference in Generic Classes

TypeScript often infers types automatically:

```ts 
const box = new Box("Hello"); // T inferred as string
```

---

👉 You don’t always need to explicitly specify `<string>`.

---

## 🔹 12. Common Mistakes

### ❌ Using `any` instead of generics

```ts 
class Box {
  value: any;
}
```

👉 Loses type safety.

---

### ❌ Forgetting constraints when needed

```ts 
class Test<T> {
  log() {
    console.log(this.value.length); // ❌ unsafe
  }
}
```

---

### ❌ Overusing generics unnecessarily

Not every class needs generics.

---

## 🔹 13. When to Use Generic Classes

Use them when:

✔ The class handles different data types
✔ You want reusable containers or services
✔ You are building frameworks or libraries
✔ You need type-safe data storage or transformation

---

## 🔹 14. When NOT to Use Generic Classes

Avoid generics when:

❌ The type is always fixed
❌ It adds unnecessary complexity
❌ The class logic is not type-dependent

---

## 🚀 In Summary

Generic classes in TypeScript:

* Allow reusable class definitions across multiple types
* Preserve full type safety
* Work with properties, methods, and constructors
* Support constraints and defaults
* Are widely used in data structures and service layers

👉 They are a fundamental building block for writing **flexible, scalable, and strongly-typed object-oriented systems in TypeScript**.


---

## 🎯 Default Type Parameters in TypeScript — Full Detail

Default type parameters allow you to give a **fallback type** to a generic when the user does not explicitly provide one. They make generics more flexible, reduce boilerplate, and improve usability—especially in libraries, APIs, and reusable utilities.

---

## 🔹 1. What Are Default Type Parameters?

A default type parameter is a type assigned to a generic parameter that is used **when no type argument is provided**.

---

### 🔹 Syntax

```ts 
type Example<T = DefaultType> = {
  value: T;
};
```

---

## 🔹 2. Simple Example

```ts 
class Box<T = string> {
  constructor(public value: T) {}
}
```

---

### 🔹 Usage

```ts 
const a = new Box("hello"); // T = string (default)
const b = new Box<number>(10); // T = number (explicit)
```

---

👉 If the user does not specify `T`, TypeScript uses `string`.

---

## 🔹 3. Why Default Type Parameters Are Useful

Without defaults:

❌ Users must always specify types
❌ More verbose code
❌ Less ergonomic APIs

With defaults:

✔ Less typing required
✔ Better developer experience
✔ Cleaner APIs
✔ More intuitive usage

---

## 🔹 4. Default Types in Functions

```ts 
function wrap<T = string>(value: T): T[] {
  return [value];
}
```

---

### 🔹 Usage

```ts 
wrap("hello"); // string[]
wrap(123);     // number[] (overrides default)
```

---

## 🔹 5. Default Types in Interfaces

```ts 
interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
}
```

---

### 🔹 Usage

```ts 
const res1: ApiResponse = {
  data: "hello",
  success: true
};

const res2: ApiResponse<number> = {
  data: 42,
  success: true
};
```

---

👉 If no type is provided, `T` becomes `unknown`.

---

## 🔹 6. Default Types in Type Aliases

```ts 
type Container<T = string> = {
  value: T;
};
```

---

### 🔹 Usage

```ts 
const c1: Container = { value: "text" };
const c2: Container<number> = { value: 100 };
```

---

## 🔹 7. Multiple Generic Parameters with Defaults

You can mix required and defaulted parameters:

```ts 
type Pair<T, U = number> = {
  first: T;
  second: U;
};
```

---

### 🔹 Usage

```ts 
const p1: Pair<string> = { first: "age", second: 30 };
const p2: Pair<string, boolean> = { first: "ok", second: true };
```

---

👉 `U` defaults to `number` if not provided.

---

## 🔹 8. Default Types in Classes

```ts 
class Storage<T = string> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}
```

---

### 🔹 Usage

```ts 
const s1 = new Storage(); // string[]
const s2 = new Storage<number>(); // number[]
```

---

## 🔹 9. Common Default Types

TypeScript developers often use:

| Default Type | Meaning                         |
| ------------ | ------------------------------- |
| `any`        | fully untyped (not recommended) |
| `unknown`    | safe unknown value              |
| `{}`         | generic object                  |
| `string`     | common default primitive        |
| `void`       | no return type                  |

---

## 🔹 10. Real-World Example: API Wrapper

```ts 
interface ApiResult<T = unknown> {
  data: T;
  error?: string;
}
```

---

### 🔹 Usage

```ts 
const r1: ApiResult = { data: "ok" };
const r2: ApiResult<number> = { data: 200 };
```

---

## 🔹 11. How TypeScript Resolves Defaults

TypeScript follows this order:

1. Explicit type argument (highest priority)
2. Inferred type
3. Default type (fallback)

---

### 🔹 Example

```ts 
function identity<T = string>(value: T): T {
  return value;
}
```

---

```ts 
identity(10); // T inferred as number → overrides default
```

---

👉 Default types are NOT used if inference succeeds.

---

## 🔹 12. Default Types vs Inference

| Situation              | Result            |
| ---------------------- | ----------------- |
| Explicit type provided | Use that type     |
| Type inferred          | Use inferred type |
| No type + no inference | Use default       |

---

## 🔹 13. Common Mistakes

### ❌ Assuming default always applies

```ts 
function f<T = string>(value: T) {}

f(10); // T becomes number, NOT string
```

---

### ❌ Using `any` as default

```ts 
type Box<T = any> = {
  value: T;
};
```

👉 Removes type safety.

---

### ❌ Overusing defaults

Too many defaults can hide type behavior.

---

## 🔹 14. Best Practices

* ✔ Use `unknown` instead of `any` as default
* ✔ Use defaults for optional flexibility
* ✔ Prefer inference over manual defaults when possible
* ✔ Keep defaults meaningful and safe
* ✔ Avoid overcomplicating generic signatures

---

## 🚀 In Summary

Default type parameters in TypeScript:

* Provide fallback types for generics
* Improve usability and reduce verbosity
* Work in functions, interfaces, types, and classes
* Are overridden by explicit or inferred types
* Help design cleaner and more flexible APIs

👉 They are essential for building **ergonomic, reusable, and developer-friendly generic systems in TypeScript**.


---

## 🧬 Generic Type Aliases in TypeScript — Full Detail

Generic type aliases let you define **reusable type patterns that work with different data types**. They are similar to generic interfaces, but are defined using the `type` keyword instead of `interface`.

They are especially useful for modeling **flexible data structures, utility types, function signatures, and API responses**.

---

## 🔹 1. What is a Generic Type Alias?

A generic type alias is a type definition that uses **type parameters (like `<T>`)** to make the type reusable across different inputs.

---

### 🔹 Basic Syntax

```ts 
type Box<T> = {
  value: T;
};
```

---

### 🔹 Usage

```ts 
const a: Box<number> = { value: 10 };
const b: Box<string> = { value: "hello" };
```

---

👉 `T` is a placeholder that gets replaced when the type is used.

---

## 🔹 2. Why Use Generic Type Aliases?

Without generics:

❌ You must duplicate types for each data type
❌ Code becomes repetitive
❌ Hard to maintain

With generics:

✔ One reusable type definition
✔ Strong type safety
✔ Flexible design
✔ Less duplication

---

## 🔹 3. Generic Type Alias vs Interface

| Feature     | Generic Type Alias     | Generic Interface |
| ----------- | ---------------------- | ----------------- |
| Syntax      | `type`                 | `interface`       |
| Extends     | via `&` (intersection) | via `extends`     |
| Unions      | ✔ supported            | ❌ limited         |
| Flexibility | very high              | structured        |

---

## 🔹 4. Generic Type Alias with Multiple Parameters

```ts 
type Pair<T, U> = {
  first: T;
  second: U;
};
```

---

### 🔹 Usage

```ts 
const p1: Pair<string, number> = { first: "age", second: 30 };
const p2: Pair<boolean, string> = { first: true, second: "yes" };
```

---

## 🔹 5. Generic Type Alias for Functions

You can define function signatures using generics:

```ts 
type Transformer<T, U> = (input: T) => U;
```

---

### 🔹 Usage

```ts 
const toString: Transformer<number, string> = (n) => n.toString();
const toNumber: Transformer<string, number> = (s) => parseInt(s);
```

---

## 🔹 6. Generic Type Alias with Objects

```ts 
type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};
```

---

### 🔹 Usage

```ts 
const response: ApiResponse<{ id: number }> = {
  data: { id: 1 },
  success: true
};
```

---

## 🔹 7. Generic Type Alias with Arrays

```ts 
type List<T> = T[];
```

---

### 🔹 Usage

```ts 
const numbers: List<number> = [1, 2, 3];
const strings: List<string> = ["a", "b"];
```

---

## 🔹 8. Generic Type Alias with Constraints

You can restrict types using `extends`:

```ts 
type HasLength<T extends { length: number }> = {
  value: T;
};
```

---

### 🔹 Usage

```ts 
const a: HasLength<string> = { value: "hello" };
const b: HasLength<number[]> = { value: [1, 2, 3] };
```

---

### 🔴 Invalid

```ts 
const c: HasLength<number> = { value: 10 }; // ❌ no length
```

---

## 🔹 9. Generic Type Alias with Union Types

```ts 
type Result<T> = T | null;
```

---

### 🔹 Usage

```ts 
const a: Result<string> = "hello";
const b: Result<number> = null;
```

---

## 🔹 10. Default Generic Type in Type Alias

```ts 
type Box<T = string> = {
  value: T;
};
```

---

### 🔹 Usage

```ts 
const a: Box = { value: "hello" }; // default string
const b: Box<number> = { value: 10 };
```

---

## 🔹 11. Real-World Example: State Wrapper

```ts 
type State<T> = {
  data: T;
  loading: boolean;
  error?: string;
};
```

---

### 🔹 Usage

```ts 
const userState: State<{ name: string }> = {
  data: { name: "Alice" },
  loading: false
};
```

---

## 🔹 12. Real-World Example: Key-Value Store

```ts 
type KeyValue<K, V> = {
  key: K;
  value: V;
};
```

---

### 🔹 Usage

```ts 
const item: KeyValue<string, number> = {
  key: "age",
  value: 25
};
```

---

## 🔹 13. Why Generic Type Aliases Are Powerful

✔ Reduce duplication
✔ Improve type reusability
✔ Work with unions and intersections
✔ Model real-world data structures
✔ Support advanced utility types

---

## 🔹 14. Common Mistakes

### ❌ Overusing `any`

```ts 
type Box<T = any> = {
  value: T;
};
```

👉 Loses type safety.

---

### ❌ Confusing with interfaces

* Interfaces are better for object shapes
* Type aliases are better for unions, functions, and flexibility

---

### ❌ Overcomplicating generics

Too many type parameters reduce readability.

---

## 🔹 15. Best Practices

* ✔ Use type aliases for unions and function types
* ✔ Use generics for reusable patterns
* ✔ Add constraints when accessing properties
* ✔ Prefer clear naming (`T`, `U`, `K`, `V`)
* ✔ Keep type definitions simple and readable

---

## 🚀 In Summary

Generic type aliases in TypeScript:

* Allow reusable type definitions with type parameters
* Work with objects, functions, arrays, and unions
* Support constraints and default types
* Are highly flexible compared to interfaces
* Help build scalable and type-safe architectures

👉 They are a core tool for designing **powerful, reusable, and expressive type systems in TypeScript**.

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

**[Day 14 — Generics: Advanced →](../Day-14-Generics-Advanced/)**
