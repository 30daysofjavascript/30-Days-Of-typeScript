# 📘 Day 07 — Union & Intersection Types

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Union types (|) — value can be ONE of several types
- How to work with union types safely (narrowing required)
- Intersection types (&) — value must be ALL of the types
- Nullable types with union (string | null)
- Extract<T,U> and Exclude<T,U> utility types
- When to use union vs intersection

---

## 🔀 Union Types in TypeScript (`|`) — Full Detail

Union types are one of the most important features in TypeScript. They allow a value to be **one of several possible types**, making your code more flexible while still staying type-safe.

Instead of restricting a variable to a single type, union types let it accept multiple allowed types using the `|` (pipe) operator.

---

## 🔹 1. What is a Union Type?

A union type means:

> “This value can be A OR B OR C…”

---

### 🔹 Syntax

```ts id="a1b2c3"
type Name = Type1 | Type2 | Type3;
```

---

## 🔹 2. Basic Example

```ts id="d4e5f6"
let value: string | number;

value = "Hello"; // ✔ valid
value = 42;      // ✔ valid
```

---

## 🔹 3. Why Union Types Are Important

Union types help you:

* Handle multiple input formats
* Model real-world data (flexible values)
* Avoid using `any`
* Improve API flexibility
* Increase type safety while staying flexible

---

## 🔹 4. Union Types in Functions

### 🔹 Example

```ts id="g7h8i9"
function printId(id: string | number) {
  console.log(id);
}
```

---

### 🔹 Usage

```ts id="j1k2l3"
printId("ABC123");
printId(101);
```

---

## 🔹 5. Working with Union Types Safely (Type Narrowing)

You cannot directly use methods unless TypeScript knows the exact type.

---

### ❌ Unsafe Example

```ts id="m1n2o3"
function print(value: string | number) {
  console.log(value.toUpperCase()); // ❌ Error
}
```

---

### ✔ Safe Version (Type Narrowing)

```ts id="p1q2r3"
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed());
  }
}
```

---

## 🔹 6. Union Types with Objects

```ts id="q3r4s5"
type Dog = { bark: () => void };
type Cat = { meow: () => void };

type Pet = Dog | Cat;
```

---

### 🔹 Usage

```ts id="t1u2v3"
function speak(pet: Pet) {
  if ("bark" in pet) {
    pet.bark();
  } else {
    pet.meow();
  }
}
```

---

## 🔹 7. Union Types with Literal Values

Union types are often used with specific values.

---

### 🔹 Example

```ts id="v1w2x3"
type Status = "loading" | "success" | "error";
```

---

### 🔹 Usage

```ts id="y1z2a3"
let state: Status;

state = "loading";
state = "success";
// state = "failed"; ❌ Error
```

---

## 🔹 8. Union Types in Arrays

```ts id="b1c2d3"
let values: (string | number)[];
```

---

### 🔹 Usage

```ts id="e1f2g3"
values = ["hello", 10, "world", 20];
```

---

## 🔹 9. Union Types in Return Values

```ts id="h1i2j3"
function getValue(id: number): string | null {
  if (id > 0) return "Valid";
  return null;
}
```

---

## 🔹 10. Discriminated Unions (Advanced Pattern)

A powerful pattern using a shared property.

```ts id="k1l2m3"
type Success = {
  status: "success";
  data: string;
};

type Error = {
  status: "error";
  message: string;
};

type Response = Success | Error;
```

---

### 🔹 Usage

```ts id="n1o2p3"
function handleResponse(res: Response) {
  if (res.status === "success") {
    console.log(res.data);
  } else {
    console.log(res.message);
  }
}
```

---

## 🔹 11. Union Types with Functions

```ts id="q1r2s3"
type Formatter = ((value: string) => string) | ((value: number) => number);
```

---

## 🔹 12. Union Types vs Any

| Feature         | Union Types    | `any` Type     |
| --------------- | -------------- | -------------- |
| Type safety     | ✔ Strong       | ❌ None         |
| Flexibility     | ✔ Controlled   | ✔ Unlimited    |
| Autocomplete    | ✔ Yes          | ❌ No           |
| Error detection | ✔ Compile-time | ❌ Runtime only |

---

## 🔹 13. Common Pitfalls

### ❌ Not narrowing types

```ts id="f1g2h3"
function test(value: string | number) {
  value.toUpperCase(); // ❌ Error
}
```

---

### ❌ Overusing unions everywhere

Too many unions can make code harder to maintain.

---

### ❌ Confusing unions with intersections

```ts id="i1j2k3"
// Union = OR
type A = string | number;

// Intersection = AND
type B = { name: string } & { age: number };
```

---

## 🔹 14. Best Practices

* ✔ Use unions instead of `any` whenever possible
* ✔ Always narrow types before using them
* ✔ Use literal unions for controlled values
* ✔ Use discriminated unions for complex states
* ✔ Keep unions simple and readable

---

## 🚀 In Summary

Union types in TypeScript:

* Allow a value to be one of several types
* Are written using the `|` operator
* Require type narrowing for safe usage
* Are widely used in APIs, states, and flexible data models

👉 They are essential for building **flexible yet strongly-typed applications in TypeScript**.

---

## 🧠 How to Work with Union Types Safely (Type Narrowing Required)

Union types in TypeScript allow a value to be **one of several types** (using `|`). While this makes code flexible, it also creates a challenge: you cannot safely use type-specific features until TypeScript knows exactly which type you are dealing with.

That’s where **type narrowing** comes in.

---

## 🔹 1. Why Narrowing Is Required

When a value has a union type, TypeScript only allows operations that are safe for **all possible types in the union**.

---

### 🔹 Example

```ts id="a1b2c3"
function print(value: string | number) {
  console.log(value.toUpperCase()); // ❌ Error
}
```

👉 Why error happens:

* `string` has `toUpperCase()`
* `number` does not
* TypeScript blocks unsafe usage

---

## 🔹 2. What is Type Narrowing?

Type narrowing is the process of **refining a union type into a more specific type** using checks.

After narrowing, TypeScript knows the exact type and allows safe operations.

---

## 🔹 3. Using `typeof` (Primitive Narrowing)

The most common way to narrow primitive union types.

---

### 🔹 Example

```ts id="d4e5f6"
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✔ string
  } else {
    console.log(value.toFixed()); // ✔ number
  }
}
```

---

## 🔹 4. Using `in` Operator (Object Narrowing)

Used when working with object unions.

---

### 🔹 Example

```ts id="g7h8i9"
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark(); // ✔ Dog
  } else {
    animal.meow(); // ✔ Cat
  }
}
```

---

## 🔹 5. Using Equality Checks

When types include literal values.

---

### 🔹 Example

```ts id="j1k2l3"
type Status = "loading" | "success" | "error";

function handle(status: Status) {
  if (status === "success") {
    console.log("Done!");
  }
}
```

---

## 🔹 6. Discriminated Unions (Best Practice)

A powerful and scalable narrowing pattern using a shared property.

---

### 🔹 Example

```ts id="m1n2o3"
type Success = {
  status: "success";
  data: string;
};

type Error = {
  status: "error";
  message: string;
};

type Response = Success | Error;
```

---

### 🔹 Narrowing

```ts id="p1q2r3"
function handle(res: Response) {
  if (res.status === "success") {
    console.log(res.data); // ✔ safe
  } else {
    console.log(res.message); // ✔ safe
  }
}
```

---

## 🔹 7. Using `instanceof` (Class Narrowing)

Used when working with classes.

---

### 🔹 Example

```ts id="q3r4s5"
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

---

## 🔹 8. Type Guards (Custom Narrowing)

You can create reusable narrowing functions.

---

### 🔹 Example

```ts id="t1u2v3"
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

---

### 🔹 Usage

```ts id="v1w2x3"
function print(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

---

## 🔹 9. Array Narrowing with Unions

```ts id="y1z2a3"
function process(values: (string | number)[]) {
  values.forEach(value => {
    if (typeof value === "string") {
      console.log(value.toUpperCase());
    } else {
      console.log(value.toFixed());
    }
  });
}
```

---

## 🔹 10. Why Narrowing Matters

Without narrowing:

* TypeScript blocks unsafe operations
* You cannot access type-specific methods

With narrowing:

* Code becomes safe
* TypeScript understands exact types
* Better autocomplete and error checking

---

## 🔹 11. Common Mistakes

### ❌ Assuming type without checking

```ts id="f1g2h3"
function test(value: string | number) {
  console.log(value.length); // ❌ Error
}
```

---

### ❌ Using incorrect narrowing

```ts id="i1j2k3"
if (value === "string") { // ❌ wrong check
}
```

---

### ❌ Ignoring all possible types

Not handling every union branch can cause runtime bugs.

---

## 🔹 12. Best Practices

* ✔ Always narrow before using type-specific methods
* ✔ Prefer `typeof` for primitives
* ✔ Use `in` for objects
* ✔ Use discriminated unions for scalable designs
* ✔ Create reusable type guards for complex logic

---

## 🚀 In Summary

Working with union types safely in TypeScript requires **type narrowing**, which:

* Refines union types into specific types
* Prevents runtime errors
* Enables safe property and method access
* Improves code clarity and reliability

👉 Narrowing is the key step that turns flexible union types into **safe and predictable TypeScript code**.

---

## 🧩 Intersection Types in TypeScript (`&`) — Full Detail

Intersection types are the opposite of union types. Instead of allowing a value to be **one of many types**, intersection types require a value to satisfy **all combined types at the same time**.

They are created using the `&` (ampersand) operator.

---

## 🔹 1. What is an Intersection Type?

An intersection type means:

> “This value must be Type A AND Type B AND Type C…”

So the final type contains **all properties from all types combined**.

---

## 🔹 2. Basic Syntax

```ts id="a1b2c3"
type A = Type1 & Type2;
```

---

## 🔹 3. Simple Example

```ts id="d4e5f6"
type A = { name: string };
type B = { age: number };

type Person = A & B;
```

---

### 🔹 Result

```ts id="g7h8i9"
type Person = {
  name: string;
  age: number;
};
```

---

## 🔹 4. Using Intersection Types

```ts id="j1k2l3"
const user: Person = {
  name: "Alice",
  age: 25
};
```

👉 Both properties are required.

---

## 🔹 5. Why Intersection Types Are Important

Intersection types help you:

* Combine multiple type definitions
* Build reusable type systems
* Extend existing types
* Model complex real-world objects
* Create flexible yet strict structures

---

## 🔹 6. Intersection with Multiple Types

```ts id="m1n2o3"
type A = { id: number };
type B = { name: string };
type C = { active: boolean };

type User = A & B & C;
```

---

### 🔹 Result

```ts id="p1q2r3"
{
  id: number;
  name: string;
  active: boolean;
}
```

---

## 🔹 7. Intersection with Functions

```ts id="q3r4s5"
type Logger = {
  log: (msg: string) => void;
};

type ErrorHandler = {
  error: (msg: string) => void;
};

type System = Logger & ErrorHandler;
```

---

### 🔹 Usage

```ts id="t1u2v3"
const system: System = {
  log: (msg) => console.log(msg),
  error: (msg) => console.error(msg)
};
```

---

## 🔹 8. Intersection with Interfaces

```ts id="v1w2x3"
interface A {
  name: string;
}

interface B {
  age: number;
}

type Person = A & B;
```

---

## 🔹 9. Intersection with Primitives (Important Behavior)

Intersection of primitive types behaves differently.

---

### 🔹 Example

```ts id="y1z2a3"
type Test = string & number;
```

👉 Result: `never`

Because:

* A value cannot be both string AND number at the same time

---

## 🔹 10. Intersection with Objects + Conflicts

If properties conflict, TypeScript tries to merge them strictly.

---

### 🔹 Example

```ts id="b1c2d3"
type A = { value: string };
type B = { value: number };

type C = A & B;
```

👉 Result:

```ts id="e1f2g3"
type C = { value: never };
```

---

## 🔹 11. Real-World Example: User Permissions

```ts id="h1i2j3"
type User = {
  name: string;
};

type Admin = {
  permissions: string[];
};

type AdminUser = User & Admin;
```

---

### 🔹 Usage

```ts id="k1l2m3"
const admin: AdminUser = {
  name: "Alice",
  permissions: ["read", "write"]
};
```

---

## 🔹 12. Real-World Example: API Response + Metadata

```ts id="n1o2p3"
type ApiResponse = {
  data: string;
};

type Timestamp = {
  timestamp: number;
};

type ResponseWithTime = ApiResponse & Timestamp;
```

---

### 🔹 Usage

```ts id="q1r2s3"
const res: ResponseWithTime = {
  data: "Success",
  timestamp: Date.now()
};
```

---

## 🔹 13. Intersection vs Extension (Interfaces)

### ✔ Interface extension

```ts id="t3u4v5"
interface A {
  name: string;
}

interface B extends A {
  age: number;
}
```

---

### ✔ Intersection type

```ts id="w1x2y3"
type B = A & {
  age: number;
};
```

👉 Both produce similar results, but:

* `extends` is interface-based
* `&` works with any types

---

## 🔹 14. Intersection Types in Functions

```ts id="z1a2b3"
type A = { a: string };
type B = { b: number };

function combine(obj: A & B) {
  console.log(obj.a, obj.b);
}
```

---

## 🔹 15. Common Pitfalls

### ❌ Expecting OR behavior

```ts id="c1d2e3"
type A = { name: string };
type B = { age: number };

type C = A & B; // ❌ NOT OR, it's AND
```

---

### ❌ Conflicting property types

```ts id="f1g2h3"
type A = { id: string };
type B = { id: number };

type C = A & B; // results in never
```

---

### ❌ Overusing intersections

Too many intersections can make types unreadable.

---

## 🔹 16. Best Practices

* ✔ Use intersections to combine object shapes
* ✔ Prefer interfaces when designing object hierarchies
* ✔ Avoid conflicting property types
* ✔ Keep intersection types simple and readable
* ✔ Use for composition, not complexity

---

## 🚀 In Summary

Intersection types in TypeScript:

* Combine multiple types into one (`&`)
* Require a value to satisfy ALL types
* Are commonly used for object composition
* Can produce `never` if types conflict
* Are powerful for building scalable type systems

👉 They are essential for creating **composed, strict, and highly structured TypeScript models**.


---

## 🚫 Nullable Types in TypeScript (`string | null`) — Full Detail

Nullable types in TypeScript are created using **union types with `null`**. They allow a value to either hold a valid type (like `string`, `number`, etc.) **or explicitly have no value (`null`)**.

This is very common in real-world applications, especially when dealing with:

* API responses
* database fields
* optional data
* user input

---

## 🔹 1. What is a Nullable Type?

A nullable type means:

> “This value can either be a valid type OR null.”

---

### 🔹 Syntax

```ts id="a1b2c3"
type Name = string | null;
```

---

## 🔹 2. Basic Example

```ts id="d4e5f6"
let username: string | null;

username = "Alice"; // ✔ valid
username = null;    // ✔ valid
```

---

## 🔹 3. Why Nullable Types Exist

In real applications, data is not always guaranteed to exist.

Nullable types help you represent:

* Missing values
* Optional database fields
* API fields that may not be returned
* State before initialization

---

## 🔹 4. Nullable Types in Functions

```ts id="g7h8i9"
function getUserName(id: number): string | null {
  if (id === 1) {
    return "Alice";
  }
  return null;
}
```

---

## 🔹 5. Handling Nullable Values (IMPORTANT)

You cannot directly use methods on nullable values without checking.

---

### ❌ Unsafe Example

```ts id="j1k2l3"
function print(name: string | null) {
  console.log(name.toUpperCase()); // ❌ Error
}
```

---

### ✔ Safe Example (Narrowing Required)

```ts id="m1n2o3"
function print(name: string | null) {
  if (name !== null) {
    console.log(name.toUpperCase());
  }
}
```

---

## 🔹 6. Nullable with Other Types

```ts id="p1q2r3"
type User = {
  name: string | null;
  age: number | null;
};
```

---

## 🔹 7. Nullable vs Optional (`?`) — Important Difference

| Feature              | `string | null`        | `name?: string`         |
|---------------------|------------------------|--------------------------|
| Value exists        | ✔ Yes                 | ❌ May be missing       |
| Type                | string or null         | string or undefined      |
| Access safety       | Needs null check       | Needs undefined check    |

---

### 🔹 Example Comparison

#### Nullable

```ts id="q3r4s5"
let name: string | null = null;
```

#### Optional

```ts id="t1u2v3"
let name?: string;
```

---

## 🔹 8. Nullable in Objects

```ts id="v1w2x3"
type Profile = {
  bio: string | null;
};
```

---

## 🔹 9. Nullable in Arrays

```ts id="y1z2a3"
let values: (string | null)[];
```

---

### 🔹 Usage

```ts id="b1c2d3"
values = ["hello", null, "world"];
```

---

## 🔹 10. API Example (Real-World Use Case)

```ts id="e1f2g3"
type ApiResponse = {
  data: string | null;
  error: string | null;
};
```

---

### 🔹 Usage

```ts id="h1i2j3"
const response: ApiResponse = {
  data: null,
  error: "Something went wrong"
};
```

---

## 🔹 11. Strict Null Checking (`strictNullChecks`)

TypeScript has a compiler option called:

```ts id="k1l2m3"
"strictNullChecks": true
```

### ✔ When enabled:

* `null` and `undefined` are NOT allowed unless explicitly included
* Forces safer code

---

## 🔹 12. Common Mistakes

### ❌ Using value without checking

```ts id="n1o2p3"
function test(name: string | null) {
  console.log(name.length); // ❌ Error
}
```

---

### ❌ Forgetting null in type

```ts id="q1r2s3"
let value: string; // ❌ cannot assign null
value = null;
```

---

## 🔹 13. Safe Patterns for Nullable Types

### ✔ 1. Explicit null check

```ts id="t3u4v5"
if (value !== null) {
  console.log(value);
}
```

---

### ✔ 2. Optional chaining

```ts id="w1x2y3"
console.log(value?.toUpperCase());
```

---

### ✔ 3. Nullish coalescing (`??`)

```ts id="z1a2b3"
const name = value ?? "Default";
```

---

## 🔹 14. Best Practices

* ✔ Use `| null` when absence is meaningful
* ✔ Always check for `null` before using values
* ✔ Prefer `strictNullChecks` in projects
* ✔ Use `??` for fallback values
* ✔ Avoid overusing nullable types when `optional (?)` is better

---

## 🚀 In Summary

Nullable types in TypeScript:

* Are created using union types like `string | null`
* Represent values that can be missing or empty
* Require explicit null checks before usage
* Are essential for safe handling of real-world data

👉 They make your code more **robust, predictable, and safe against missing values**.


---

## 🧰 `Extract<T, U>` and `Exclude<T, U>` Utility Types in TypeScript — Full Detail

TypeScript provides powerful built-in utility types that help you manipulate union types easily. Two of the most important are:

* `Exclude<T, U>` → removes types from a union
* `Extract<T, U>` → keeps only matching types from a union

They are especially useful when working with **union types, APIs, and conditional type filtering**.

---

## 🔹 1. What are Utility Types?

Utility types are **predefined generic helpers** in TypeScript that transform types.

Instead of manually rewriting unions, you can use:

* `Exclude` → filter OUT types
* `Extract` → filter IN matching types

---

## 🔹 2. Understanding `Exclude<T, U>`

### 🔹 Definition

`Exclude<T, U>` removes from `T` all types that are assignable to `U`.

---

### 🔹 Syntax

```ts id="a1b2c3"
type Result = Exclude<T, U>;
```

---

### 🔹 Simple Example

```ts id="d4e5f6"
type Status = "loading" | "success" | "error";

type WithoutError = Exclude<Status, "error">;
```

---

### 🔹 Result

```ts id="g7h8i9"
type WithoutError = "loading" | "success";
```

---

## 🔹 3. How `Exclude` Works (Conceptually)

Think of it like filtering out values:

```ts id="j1k2l3"
T = "a" | "b" | "c"
U = "b"

Result = "a" | "c"
```

---

## 🔹 4. Real-World Example of `Exclude`

### 🔹 API Status Filtering

```ts id="m1n2o3"
type ApiStatus = "idle" | "loading" | "success" | "error";

type ActiveStatus = Exclude<ApiStatus, "idle">;
```

---

### 🔹 Result

```ts id="p1q2r3"
type ActiveStatus = "loading" | "success" | "error";
```

---

## 🔹 5. Understanding `Extract<T, U>`

### 🔹 Definition

`Extract<T, U>` keeps only the types from `T` that are assignable to `U`.

---

### 🔹 Syntax

```ts id="q3r4s5"
type Result = Extract<T, U>;
```

---

### 🔹 Simple Example

```ts id="t1u2v3"
type Status = "loading" | "success" | "error";

type OnlySuccess = Extract<Status, "success" | "error">;
```

---

### 🔹 Result

```ts id="v1w2x3"
type OnlySuccess = "success" | "error";
```

---

## 🔹 6. How `Extract` Works (Conceptually)

```ts id="y1z2a3"
T = "a" | "b" | "c"
U = "b" | "c"

Result = "b" | "c"
```

---

## 🔹 7. Real-World Example of `Extract`

### 🔹 Filtering Event Types

```ts id="b1c2d3"
type Events = "click" | "hover" | "scroll" | "keydown";

type MouseEvents = Extract<Events, "click" | "hover">;
```

---

### 🔹 Result

```ts id="e1f2g3"
type MouseEvents = "click" | "hover";
```

---

## 🔹 8. Difference Between `Exclude` and `Extract`

| Feature  | Exclude<T, U>          | Extract<T, U>        |
| -------- | ---------------------- | -------------------- |
| Purpose  | Removes matching types | Keeps matching types |
| Behavior | Filters OUT            | Filters IN           |
| Result   | Smaller union          | Smaller union        |

---

### 🔹 Example Side-by-Side

```ts id="h1i2j3"
type A = "a" | "b" | "c";

type X = Exclude<A, "b">;  // "a" | "c"
type Y = Extract<A, "b">;  // "b"
```

---

## 🔹 9. Advanced Example: API Permissions

```ts id="k1l2m3"
type Permissions = "read" | "write" | "delete" | "admin";

type UserPermissions = Exclude<Permissions, "admin">;
type AdminPermissions = Extract<Permissions, "admin">;
```

---

## 🔹 10. Using with Union of Objects

```ts id="n1o2p3"
type Shape =
  | { type: "circle"; radius: number }
  | { type: "square"; size: number }
  | { type: "triangle"; base: number };
```

---

### 🔹 Extract Specific Shape

```ts id="q1r2s3"
type Circle = Extract<Shape, { type: "circle" }>;
```

---

### 🔹 Result

```ts id="t3u4v5"
type Circle = { type: "circle"; radius: number };
```

---

## 🔹 11. Common Pitfalls

### ❌ Confusing Extract and Exclude

```ts id="w1x2y3"
// Wrong assumption
type A = Exclude<"a" | "b", "a">; // removes "a"
type B = Extract<"a" | "b", "a">; // keeps only "a"
```

---

### ❌ Using with non-union types unnecessarily

These utilities are designed for unions.

---

## 🔹 12. Best Practices

* ✔ Use `Exclude` to remove unwanted union members
* ✔ Use `Extract` to pick specific union members
* ✔ Prefer them over manual type rewriting
* ✔ Combine with `keyof` for advanced type filtering
* ✔ Use for API design and strict type control

---

## 🚀 In Summary

`Exclude<T, U>` and `Extract<T, U>` are utility types that:

* Work on union types
* Help filter type members
* Improve type safety and readability
* Reduce manual type rewriting

👉 They are essential tools for building **clean, precise, and scalable TypeScript type systems**.

---

## ⚖️ When to Use Union (`|`) vs Intersection (`&`) in TypeScript — Full Detail

Union and intersection types are two core tools in TypeScript’s type system. They look similar at first, but they solve completely opposite problems:

* **Union (`|`)** → “this OR that”
* **Intersection (`&`)** → “this AND that”

Choosing the right one is critical for writing correct, predictable types.

---

## 🔹 1. Core Difference (Mental Model)

### 🔀 Union Types (`|`)

A value can be **one of several types**.

```ts id="a1b2c3"
type ID = string | number;
```

👉 Means: ID can be a string OR a number.

---

### 🧩 Intersection Types (`&`)

A value must satisfy **all types at once**.

```ts id="d4e5f6"
type User = { name: string } & { age: number };
```

👉 Means: User must have BOTH name AND age.

---

## 🔹 2. When to Use Union Types (`|`)

Use unions when a value can take **multiple possible forms**, but only one at a time.

---

### ✔ 1. Multiple possible input types

```ts id="g7h8i9"
function printId(id: string | number) {
  console.log(id);
}
```

👉 ID is either string OR number.

---

### ✔ 2. API states or status values

```ts id="j1k2l3"
type Status = "loading" | "success" | "error";
```

---

### ✔ 3. Optional-like behavior with strict control

```ts id="m1n2o3"
type Value = string | null;
```

---

### ✔ 4. Different object shapes (discriminated unions)

```ts id="p1q2r3"
type Dog = { type: "dog"; bark: () => void };
type Cat = { type: "cat"; meow: () => void };

type Pet = Dog | Cat;
```

---

### ✔ 5. Flexible function inputs

```ts id="q3r4s5"
function format(value: string | number) {
  return value.toString();
}
```

---

### 🔥 Key idea for unions:

👉 “I don’t know which type I’ll get, so I must handle both.”

---

## 🔹 3. When to Use Intersection Types (`&`)

Use intersections when you need to **combine multiple types into one complete type**.

---

### ✔ 1. Combining object features

```ts id="t1u2v3"
type Person = { name: string };
type Employee = { id: number };

type Staff = Person & Employee;
```

---

### ✔ 2. Extending capabilities (composition)

```ts id="v1w2x3"
type CanRun = { run: () => void };
type CanJump = { jump: () => void };

type Athlete = CanRun & CanJump;
```

---

### ✔ 3. Adding metadata to existing types

```ts id="y1z2a3"
type ApiResponse = { data: string };
type Timestamp = { time: number };

type ResponseWithTime = ApiResponse & Timestamp;
```

---

### ✔ 4. Merging configuration objects

```ts id="b1c2d3"
type Config = { apiUrl: string };
type Auth = { token: string };

type AppConfig = Config & Auth;
```

---

### ✔ 5. Enhancing library types

```ts id="e1f2g3"
type Logger = { log: (msg: string) => void };
type ErrorLogger = { error: (msg: string) => void };

type FullLogger = Logger & ErrorLogger;
```

---

### 🔥 Key idea for intersections:

👉 “I need all features combined into one object/type.”

---

## 🔹 4. Side-by-Side Comparison

| Feature              | Union (`|`)                          | Intersection (`&`)                  |
|---------------------|--------------------------------------|-------------------------------------|
| Meaning             | A OR B                              | A AND B                             |
| Type behavior       | One of many possible types          | Combination of all types            |
| Use case            | Flexible inputs                     | Composed objects/types              |
| Safety model        | Must narrow type                    | Must satisfy all properties         |
| Example             | string | number                    | A & B                               |

---

## 🔹 5. Real-World Comparison Example

### 🔀 Union (different states)

```ts id="h1i2j3"
type PaymentStatus = "pending" | "completed" | "failed";
```

👉 Only one state at a time.

---

### 🧩 Intersection (combined user data)

```ts id="k1l2m3"
type User = { name: string };
type Permissions = { role: string };

type AdminUser = User & Permissions;
```

👉 Must have BOTH name and role.

---

## 🔹 6. Common Mistakes

### ❌ Using union when you need structure

```ts id="n1o2p3"
type User = { name: string } | { age: number }; // ❌ wrong if both are required
```

---

### ❌ Using intersection when types conflict

```ts id="q1r2s3"
type A = { id: string };
type B = { id: number };

type C = A & B; // ❌ becomes impossible (never)
```

---

### ❌ Confusing OR vs AND logic

This is the most common mistake:

* Union = choose one
* Intersection = combine both

---

## 🔹 7. Decision Guide (Simple Rule)

### ✔ Use UNION (`|`) when:

* Value can be one of multiple options
* You need branching logic
* You are modeling states or variants
* You expect type narrowing

---

### ✔ Use INTERSECTION (`&`) when:

* You are combining object shapes
* You are building composed types
* You want to extend existing types
* You need all properties together

---

## 🚀 In Summary

* **Union (`|`)** → flexible, one-of-many values, requires narrowing
* **Intersection (`&`)** → strict, combines multiple types into one

👉 Think of it like this:

* Union = “OR logic” (choose one path)
* Intersection = “AND logic” (combine all requirements)

Mastering this distinction is essential for designing **clean, scalable, and type-safe TypeScript systems**.

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

**[Day 08 — Literal Types & Type Aliases →](../Day-08-Literal-Types-TypeAliases/)**
