# 📘 Day 14 — Generics: Advanced

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Generic Constraints with `keyof`
- Conditional Types in Generics
- Infer Keyword
- Recursive Generics
- Mapped Type Modifiers in Generics
- Generic Utility Functions in TypeScript
- Higher-Order Generics in TypeScript

---

## 🧩 Generic Constraints with `keyof` in TypeScript — Full Detail

Generic constraints with `keyof` are one of the most powerful patterns in TypeScript. They let you **restrict a generic type to valid keys of an object**, ensuring complete type safety when accessing object properties dynamically.

This pattern is widely used in **utility functions, frameworks, and type-safe data access helpers**.

---

## 🔹 1. What is `keyof`?

The `keyof` operator produces a union of all keys of a type.

---

### 🔹 Example

```ts 
type User = {
  id: number;
  name: string;
  age: number;
};

type UserKeys = keyof User;
```

---

### 🔹 Result

```ts 
// UserKeys = "id" | "name" | "age"
```

---

👉 `keyof` converts object keys into a union type.

---

## 🔹 2. Why Combine `keyof` with Generics?

Without `keyof`, accessing object properties dynamically is unsafe:

```ts 
function getProperty(obj: object, key: string) {
  return obj[key]; // ❌ Error or unsafe
}
```

---

### 🔴 Problem

* No guarantee key exists
* No type safety for return value
* Risk of runtime errors

---

## 🔹 3. Solution: Generic Constraint with `keyof`

We restrict the key to valid properties of the object.

---

### 🔹 Safe Version

```ts 
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

## 🔹 4. Breaking Down the Syntax

```ts 
<K extends keyof T>
```

Means:

* `K` must be a key of `T`
* Only valid property names are allowed

---

```ts 
T[K]
```

Means:

* Return type is the **value type of that property**

---

## 🔹 5. Example Usage

```ts 
const user = {
  id: 1,
  name: "Alice",
  age: 25
};
```

---

### 🔹 Valid Calls

```ts 
getProperty(user, "name"); // string
getProperty(user, "age");  // number
```

---

### 🔴 Invalid Call

```ts 
getProperty(user, "email"); // ❌ Error (not a key)
```

---

## 🔹 6. Why This Pattern is Powerful

This pattern ensures:

✔ Only valid keys can be used
✔ Return type is automatically inferred
✔ No need for manual type casting
✔ Compile-time safety for dynamic access

---

## 🔹 7. Real-World Example: Safe State Access

```ts 
type State = {
  loading: boolean;
  error: string;
  data: number;
};
```

---

### 🔹 Generic Getter

```ts 
function selectState<K extends keyof State>(
  state: State,
  key: K
): State[K] {
  return state[key];
}
```

---

### 🔹 Usage

```ts 
selectState({ loading: true, error: "", data: 42 }, "data"); // number
```

---

## 🔹 8. Generic Function for Any Object

```ts 
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

### 🔹 Usage

```ts 
const product = {
  id: 101,
  title: "Laptop",
  price: 999
};

pick(product, "title"); // string
pick(product, "price"); // number
```

---

## 🔹 9. Multiple Constraints with `keyof`

You can combine `keyof` with other constraints:

```ts 
function updateProperty<
  T,
  K extends keyof T
>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}
```

---

### 🔹 Usage

```ts 
updateProperty(product, "price", 1200);
```

---

### 🔴 Invalid

```ts 
updateProperty(product, "price", "cheap"); // ❌ wrong type
```

---

## 🔹 10. keyof + Generic Mapping Pattern

This pattern is often used in libraries:

```ts 
function mapObject<T, K extends keyof T, U>(
  obj: T,
  key: K,
  transform: (value: T[K]) => U
): U {
  return transform(obj[key]);
}
```

---

## 🔹 11. Real-World Use Case: Form Handling

```ts 
type Form = {
  username: string;
  password: string;
};
```

---

### 🔹 Safe Field Access

```ts 
function getField<T, K extends keyof T>(form: T, field: K): T[K] {
  return form[field];
}
```

---

## 🔹 12. Why `keyof` + Generics Is Important

It enables:

✔ Type-safe dynamic property access
✔ Strongly typed utility functions
✔ Better autocompletion
✔ Compile-time validation
✔ Elimination of unsafe indexing

---

## 🔹 13. Common Mistakes

### ❌ Using string instead of keyof

```ts 
function get(obj: T, key: string) {} // ❌ unsafe
```

---

### ❌ Forgetting return type mapping

```ts 
T[K] // essential for correct typing
```

---

### ❌ Overusing any

```ts 
function get(obj: any, key: any) {}
```

👉 loses all safety benefits.

---

## 🔹 14. Best Practices

* ✔ Always use `K extends keyof T` for object keys
* ✔ Use `T[K]` to infer return types
* ✔ Prefer this pattern for utility functions
* ✔ Avoid `any` in dynamic property access
* ✔ Combine with constraints for safer APIs

---

## 🚀 In Summary

Generic constraints with `keyof` in TypeScript:

* Restrict generic types to valid object keys
* Ensure only existing properties can be accessed
* Automatically infer correct return types
* Enable fully type-safe dynamic object access
* Power many utility functions and frameworks

👉 This pattern is essential for writing **safe, reusable, and strongly-typed object utilities in TypeScript**.

---

## 🧠 Conditional Types in Generics (TypeScript) — Full Detail

Conditional types let TypeScript choose a type based on a condition. When combined with generics, they become a powerful system for **type-level logic**, enabling TypeScript to behave almost like a programming language inside the type system.

They are written using this syntax:

```ts
T extends U ? X : Y
```

Meaning:

> If `T` is assignable to `U`, return type `X`, otherwise return type `Y`.

---

# 🔹 1. What is a Conditional Type?

A conditional type evaluates a condition at the **type level** and returns one of two possible types.

---

### 🔹 Basic Example

```ts 
type IsString<T> = T extends string ? "yes" : "no";
```

---

### 🔹 Usage

```ts 
type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"
```

---

👉 TypeScript is deciding types like an `if-else` statement.

---

# 🔹 2. Why Conditional Types Matter in Generics

Without conditional types:

❌ Generics are static and less expressive
❌ You cannot change output type based on input
❌ Limited type transformations

With conditional types:

✔ You can create intelligent types
✔ You can transform types dynamically
✔ You can build utility types like `Exclude`, `Extract`, etc.

---

# 🔹 3. Conditional Types with Generics

Most conditional types are used with generics:

```ts 
type Result<T> = T extends string ? string[] : number[];
```

---

### 🔹 Usage

```ts 
type A = Result<string>; // string[]
type B = Result<number>; // number[]
```

---

👉 The output type depends on the input type.

---

# 🔹 4. Practical Example: API Response Formatter

```ts 
type ApiResponse<T> = T extends string
  ? { message: T }
  : { data: T };
```

---

### 🔹 Usage

```ts 
type A = ApiResponse<string>; // { message: string }
type B = ApiResponse<number>; // { data: number }
```

---

# 🔹 5. Conditional Types with Union Types

When used with unions, conditional types distribute over each member.

---

### 🔹 Example

```ts 
type ToArray<T> = T extends any ? T[] : never;
```

---

### 🔹 Usage

```ts 
type Result = ToArray<string | number>;
```

---

### 🔹 Result

```ts 
// string[] | number[]
```

---

👉 This is called **distributive conditional types**.

---

# 🔹 6. Distributive Behavior Explained

Conditional types automatically distribute over unions:

```ts 
T extends U ? X : Y
```

If `T = A | B`, TypeScript evaluates:

* A extends U ? X : Y
* B extends U ? X : Y

Then unions the result.

---

# 🔹 7. Preventing Distribution

You can disable distribution using square brackets:

```ts 
type ToArray<T> = [T] extends [any] ? T[] : never;
```

---

👉 Now it treats the whole union as a single unit.

---

# 🔹 8. Built-in Utility Types Using Conditional Types

Many TypeScript utilities are built using conditional types:

---

## 🔹 Exclude

```ts 
type MyExclude<T, U> = T extends U ? never : T;
```

---

### Example:

```ts 
type A = MyExclude<"a" | "b" | "c", "a">;
```

Result:

```ts 
// "b" | "c"
```

---

## 🔹 Extract

```ts 
type MyExtract<T, U> = T extends U ? T : never;
```

---

# 🔹 9. Conditional Types with `infer`

The `infer` keyword allows extracting types inside conditional logic.

---

### 🔹 Example: Get Return Type

```ts 
type MyReturnType<T> =
  T extends (...args: any[]) => infer R ? R : never;
```

---

### 🔹 Usage

```ts 
type R = MyReturnType<() => number>;
```

Result:

```ts 
// number
```

---

👉 `infer R` captures the return type dynamically.

---

# 🔹 10. Real-World Example: Promise Unwrapping

```ts 
type UnwrapPromise<T> =
  T extends Promise<infer U> ? U : T;
```

---

### 🔹 Usage

```ts 
type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>;          // number
```

---

# 🔹 11. Nested Conditional Types

You can chain conditions:

```ts 
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  "unknown";
```

---

### 🔹 Usage

```ts 
type A = TypeName<"hello">; // "string"
type B = TypeName<42>;      // "number"
type C = TypeName<true>;    // "boolean"
```

---

# 🔹 12. Why Conditional Types Are Powerful

They allow:

✔ Type-level branching logic
✔ Type transformation pipelines
✔ Advanced inference (`infer`)
✔ Building utility types
✔ Strongly typed APIs and frameworks

---

# 🔹 13. Common Mistakes

### ❌ Expecting runtime behavior

Conditional types exist only at compile time.

---

### ❌ Forgetting distribution behavior

```ts
T extends U ? X : Y
```

behaves differently on unions.

---

### ❌ Overcomplicating types

Too many nested conditions reduce readability.

---

# 🔹 14. Best Practices

* ✔ Use conditional types for type transformation, not logic duplication
* ✔ Use `infer` for extracting internal types
* ✔ Prefer built-in utilities when possible
* ✔ Keep conditions readable and shallow
* ✔ Avoid excessive nesting

---

# 🚀 In Summary

Conditional types in generics:

* Act like `if-else` logic at the type level
* Enable dynamic type transformations
* Work with unions and distribute automatically
* Use `infer` for powerful type extraction
* Power many built-in utilities like `Exclude` and `ReturnType`

👉 They are one of the most advanced and powerful features in TypeScript’s type system, enabling **type-level programming and intelligent generics**.

---

## 🧠 `infer` Keyword in TypeScript — Full Detail

### // Extract types from other types

The `infer` keyword is used inside **conditional types** to **extract and capture a type from another type**. It allows TypeScript to “peek inside” complex types and pull out parts of them dynamically.

It is one of the most powerful features in TypeScript’s type system and is heavily used in **utility types, framework internals, and advanced type transformations**.

---

# 🔹 1. What is `infer`?

`infer` means:

> “Let TypeScript figure out this type for me and store it in a variable.”

It is always used inside a conditional type.

---

### 🔹 Syntax

```ts 
type Example<T> =
  T extends SomeType<infer U> ? U : never;
```

---

👉 `U` is inferred from `T`.

---

# 🔹 2. Basic Example: Extracting Array Element Type

```ts 
type ElementType<T> =
  T extends (infer U)[] ? U : never;
```

---

### 🔹 Usage

```ts 
type A = ElementType<string[]>; // string
type B = ElementType<number[]>; // number
```

---

👉 TypeScript extracts the array’s inner type.

---

# 🔹 3. How `infer` Works Conceptually

Think of it like pattern matching:

```ts
T extends Array<infer U>
```

means:

> “If T is an array, capture its element type as U.”

---

# 🔹 4. Extracting Promise Types

One of the most common use cases.

```ts 
type UnwrapPromise<T> =
  T extends Promise<infer U> ? U : T;
```

---

### 🔹 Usage

```ts 
type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>;          // number
```

---

👉 It removes the `Promise` wrapper.

---

# 🔹 5. Extracting Function Return Types

```ts 
type ReturnTypeOf<T> =
  T extends (...args: any[]) => infer R ? R : never;
```

---

### 🔹 Usage

```ts 
type A = ReturnTypeOf<() => number>; // number
type B = ReturnTypeOf<() => string>; // string
```

---

👉 `R` is inferred from the function return type.

---

# 🔹 6. Extracting Function Parameters

```ts 
type Params<T> =
  T extends (...args: infer P) => any ? P : never;
```

---

### 🔹 Usage

```ts 
type A = Params<(a: number, b: string) => void>;
// [number, string]
```

---

👉 Extracts function parameter tuple.

---

# 🔹 7. Extracting First Element of Tuple

```ts 
type First<T> =
  T extends [infer F, ...any[]] ? F : never;
```

---

### 🔹 Usage

```ts 
type A = First<[string, number, boolean]>; // string
```

---

# 🔹 8. Extracting Last Element (Advanced Pattern)

```ts 
type Last<T> =
  T extends [...any[], infer L] ? L : never;
```

---

### 🔹 Usage

```ts 
type A = Last<[1, 2, 3]>; // 3
```

---

# 🔹 9. Multiple `infer` Variables

You can infer multiple parts at once.

```ts 
type Split<T> =
  T extends `${infer First}${infer Rest}` ? [First, Rest] : never;
```

---

### 🔹 Usage

```ts 
type A = Split<"hello">;
// ["h", "ello"]
```

---

# 🔹 10. `infer` in Template Literal Types

```ts 
type ExtractName<T> =
  T extends `user_${infer Name}` ? Name : never;
```

---

### 🔹 Usage

```ts 
type A = ExtractName<"user_john">; // "john"
```

---

# 🔹 11. Why `infer` is Powerful

It allows TypeScript to:

✔ Deconstruct complex types
✔ Extract inner types dynamically
✔ Build reusable utility types
✔ Perform type-level computation
✔ Replace manual type duplication

---

# 🔹 12. Real-World Example: API Response Unwrapping

```ts 
type ApiData<T> =
  T extends { data: infer D } ? D : never;
```

---

### 🔹 Usage

```ts 
type A = ApiData<{ data: string }>; // string
```

---

# 🔹 13. Real-World Example: Deep Promise Chain

```ts 
type DeepUnwrap<T> =
  T extends Promise<infer U> ? DeepUnwrap<U> : T;
```

---

### 🔹 Usage

```ts 
type A = DeepUnwrap<Promise<Promise<number>>>;
// number
```

---

# 🔹 14. Rules of `infer`

✔ Must be used inside conditional types
✔ Only works in `extends` clauses
✔ Cannot be used standalone
✔ Introduces a temporary type variable

---

# 🔹 15. Common Mistakes

### ❌ Using `infer` outside conditional types

```ts
type A = infer T; // ❌ invalid
```

---

### ❌ Expecting runtime behavior

`infer` is purely compile-time.

---

### ❌ Overusing complex nested inference

Makes types hard to read.

---

# 🔹 16. Best Practices

* ✔ Use `infer` for extracting known patterns
* ✔ Prefer built-in utilities when possible
* ✔ Keep inference readable and minimal
* ✔ Combine with conditional types carefully
* ✔ Document complex inferred logic

---

# 🚀 In Summary

The `infer` keyword in TypeScript:

* Extracts types from complex structures
* Works inside conditional types only
* Enables powerful type-level pattern matching
* Is used in utilities like `ReturnType`, `Parameters`, etc.
* Allows deep manipulation of types like arrays, promises, and strings

👉 It is one of the most advanced features in TypeScript and is essential for **type-level programming and advanced generic transformations**.

---

## 🔁 Recursive Generics in TypeScript — Full Detail

Recursive generics are generic types that **reference themselves (directly or indirectly)**. They allow you to model **nested, hierarchical, or infinitely deep structures** in a type-safe way.

They are essential for representing things like:

* JSON data
* Trees (DOM, AST, UI components)
* Nested objects
* File systems
* Graph-like structures (limited forms)

---

# 🔹 1. What Are Recursive Generics?

A recursive generic is a type that **calls itself inside its own definition**.

---

### 🔹 Basic Idea

```ts 
type Node<T> = {
  value: T;
  children: Node<T>[];
};
```

---

👉 `Node<T>` contains itself as a property.

---

# 🔹 2. Simple Recursive Structure: Tree

```ts 
type Tree<T> = {
  value: T;
  children: Tree<T>[];
};
```

---

### 🔹 Example Usage

```ts 
const tree: Tree<number> = {
  value: 1,
  children: [
    {
      value: 2,
      children: []
    }
  ]
};
```

---

👉 Each node can contain more nodes of the same type.

---

# 🔹 3. Why Recursive Generics Are Needed

Without recursion:

❌ You can only model fixed-depth structures
❌ No support for nested unknown depth
❌ Poor modeling of real-world hierarchical data

With recursive generics:

✔ Infinite nesting support
✔ Real-world structure modeling
✔ Type-safe tree-like systems

---

# 🔹 4. Recursive JSON Type (Classic Example)

```ts 
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

---

### 🔹 Usage

```ts 
const data: JSONValue = {
  name: "Alice",
  meta: {
    age: 25,
    tags: ["dev", "ts"]
  }
};
```

---

👉 JSON is inherently recursive (objects contain objects).

---

# 🔹 5. Recursive Generic Object Tree

```ts 
type Node<T> = {
  value: T;
  children?: Node<T>[];
};
```

---

### 🔹 Usage

```ts 
const fileSystem: Node<string> = {
  value: "root",
  children: [
    {
      value: "folder1",
      children: [
        { value: "file1.txt" }
      ]
    }
  ]
};
```

---

# 🔹 6. Recursive Menu Structure Example

```ts 
type MenuItem = {
  label: string;
  url?: string;
  children?: MenuItem[];
};
```

---

### 🔹 Usage

```ts 
const menu: MenuItem = {
  label: "Home",
  children: [
    {
      label: "Products",
      children: [
        { label: "Laptops", url: "/laptops" }
      ]
    }
  ]
};
```

---

# 🔹 7. Recursive Generic with Constraints

You can combine recursion with constraints:

```ts 
type Tree<T extends { id: string }> = {
  value: T;
  children?: Tree<T>[];
};
```

---

👉 Ensures each node has an `id`.

---

# 🔹 8. Recursive Type with Optional Depth Control

```ts 
type NestedArray<T> = T | NestedArray<T>[];
```

---

### 🔹 Usage

```ts 
const arr: NestedArray<number> = [1, [2, [3, 4]]];
```

---

👉 Allows infinite nesting.

---

# 🔹 9. Recursive String Parsing (Advanced Example)

```ts 
type PathSegments<T> =
  T extends `${infer Head}/${infer Rest}`
    ? [Head, ...PathSegments<Rest>]
    : [T];
```

---

### 🔹 Usage

```ts 
type A = PathSegments<"a/b/c">;
// ["a", "b", "c"]
```

---

# 🔹 10. Recursive Promise Unwrapping

```ts 
type DeepUnwrap<T> =
  T extends Promise<infer U>
    ? DeepUnwrap<U>
    : T;
```

---

### 🔹 Usage

```ts 
type A = DeepUnwrap<Promise<Promise<number>>>;
// number
```

---

# 🔹 11. How Recursive Generics Work Internally

TypeScript evaluates recursion:

1. Expands type
2. Substitutes itself repeatedly
3. Stops when base condition matches

---

### 🔹 Base Case is Essential

```ts 
type Node<T> = {
  value: T;
  children?: Node<T>[]; // recursive part
};
```

👉 Without a stopping condition, recursion would be infinite.

---

# 🔹 12. Real-World Use Cases

Recursive generics are used in:

✔ File system models
✔ UI component trees
✔ JSON parsing
✔ API response nesting
✔ AST (Abstract Syntax Trees) in compilers
✔ Menu/navigation systems

---

# 🔹 13. Common Mistakes

### ❌ Missing base case

```ts 
type Bad<T> = Bad<T>; // ❌ infinite recursion
```

---

### ❌ Overcomplicated recursion

Deep recursion can make types slow or unreadable.

---

### ❌ Forgetting optional children

```ts 
children: Tree<T>[]; // forces always present children
```

Better:

```ts 
children?: Tree<T>[];
```

---

# 🔹 14. Best Practices

* ✔ Always define a base case
* ✔ Keep recursion shallow when possible
* ✔ Use optional children for flexibility
* ✔ Prefer simple recursive patterns over deeply nested ones
* ✔ Use for hierarchical data only

---

# 🚀 In Summary

Recursive generics in TypeScript:

* Allow types to reference themselves
* Model infinite or deeply nested structures
* Are essential for trees, JSON, menus, and ASTs
* Require a base case to stop recursion
* Enable powerful real-world data modeling

👉 They are one of the most important advanced TypeScript patterns for representing **hierarchical and recursive data structures safely at the type level**.

---

## 🧠 Mapped Type Modifiers in Generics (TypeScript) — Full Detail

Mapped types in TypeScript let you **transform existing types property-by-property**, and when combined with generics, they become a powerful way to build reusable “type transformers”.

On top of that, **mapped type modifiers** let you control how each property is transformed—such as making them optional, readonly, or removing modifiers entirely.

---

# 🔹 1. What is a Mapped Type?

A mapped type iterates over the keys of a type and creates a new type.

---

### 🔹 Basic Syntax

```ts 
type Mapped<T> = {
  [K in keyof T]: T[K];
};
```

---

👉 This simply copies the original type.

---

# 🔹 2. Why Use Mapped Types in Generics?

Without mapped types:

❌ You must manually rewrite types
❌ No transformation ability
❌ Not scalable for large objects

With mapped types:

✔ Automatically transform object shapes
✔ Work dynamically with any type
✔ Combine with modifiers for powerful behavior

---

# 🔹 3. Example: Generic Identity Mapped Type

```ts 
type ReadOnlyCopy<T> = {
  readonly [K in keyof T]: T[K];
};
```

---

### 🔹 Usage

```ts 
type User = {
  id: number;
  name: string;
};

type ReadonlyUser = ReadOnlyCopy<User>;
```

---

👉 All properties become `readonly`.

---

# 🔹 4. Mapped Type Modifiers Overview

Mapped types support **three key modifiers**:

| Modifier    | Meaning                    |
| ----------- | -------------------------- |
| `readonly`  | makes properties immutable |
| `?`         | makes properties optional  |
| `-readonly` | removes readonly           |
| `-?`        | removes optional           |

---

# 🔹 5. `readonly` Modifier in Mapped Types

### 🔹 Make Everything Readonly

```ts 
type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};
```

---

### 🔹 Usage

```ts 
type User = {
  id: number;
  name: string;
};

type ReadonlyUser = Immutable<User>;
```

---

### 🔴 Result

```ts 
{
  readonly id: number;
  readonly name: string;
}
```

---

# 🔹 6. Removing `readonly` (`-readonly`)

```ts 
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

---

👉 Removes immutability.

---

# 🔹 7. Optional Properties Modifier (`?`)

### 🔹 Make Everything Optional

```ts 
type PartialType<T> = {
  [K in keyof T]?: T[K];
};
```

---

### 🔹 Usage

```ts 
type User = {
  id: number;
  name: string;
};

type PartialUser = PartialType<User>;
```

---

### 🔴 Result

```ts 
{
  id?: number;
  name?: string;
}
```

---

👉 This is similar to built-in `Partial<T>`.

---

# 🔹 8. Removing Optional Modifier (`-?`)

```ts 
type RequiredType<T> = {
  [K in keyof T]-?: T[K];
};
```

---

👉 Forces all properties to be required.

---

# 🔹 9. Real Built-in Utility Types Using Mapped Modifiers

TypeScript already provides these:

| Utility       | Equivalent Logic   |
| ------------- | ------------------ |
| `Partial<T>`  | makes all optional |
| `Required<T>` | removes optional   |
| `Readonly<T>` | makes all readonly |

---

# 🔹 10. Combining Generics + Mapped Modifiers

```ts 
type Transform<T> = {
  readonly [K in keyof T]?: T[K];
};
```

---

👉 Combines readonly + optional.

---

# 🔹 11. Advanced Example: Deep Readonly

```ts 
type DeepReadonly<T> = {
  readonly [K in keyof T]:
    T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

---

### 🔹 Usage

```ts 
type User = {
  name: string;
  address: {
    city: string;
  };
};

type ImmutableUser = DeepReadonly<User>;
```

---

👉 Even nested objects become readonly.

---

# 🔹 12. Key Remapping in Mapped Types (Advanced)

You can also change keys:

```ts 
type RenameKeys<T> = {
  [K in keyof T as `new_${string & K}`]: T[K];
};
```

---

### 🔹 Example

```ts 
type User = {
  id: number;
  name: string;
};

type NewUser = RenameKeys<User>;
```

---

### 🔴 Result

```ts
{
  new_id: number;
  new_name: string;
}
```

---

# 🔹 13. Why Mapped Modifiers Are Powerful

They allow you to:

✔ Transform object structures dynamically
✔ Add/remove immutability
✔ Control optionality
✔ Build utility types
✔ Create reusable type transformers

---

# 🔹 14. Common Mistakes

### ❌ Forgetting `keyof`

```ts 
[K in T] // ❌ invalid
```

---

### ❌ Overcomplicating transformations

Deep nested mapped types can hurt readability.

---

### ❌ Ignoring built-in utilities

Prefer `Partial`, `Readonly`, `Required` when possible.

---

# 🔹 15. Best Practices

* ✔ Use mapped types for object transformations
* ✔ Use modifiers sparingly and intentionally
* ✔ Prefer built-in utilities when applicable
* ✔ Combine with generics for reusable logic
* ✔ Keep deep mappings readable

---

# 🚀 In Summary

Mapped type modifiers in TypeScript:

* Allow transformation of object types property-by-property
* Use `readonly`, `?`, `-readonly`, and `-?`
* Work seamlessly with generics
* Enable powerful utilities like `Partial` and `Readonly`
* Support deep and recursive transformations

👉 They are a core feature of TypeScript’s type system for building **flexible, reusable, and strongly-typed type transformations**.

---

## 🧰 Generic Utility Functions in TypeScript — Full Detail

Generic utility functions are **reusable functions that work with multiple types while preserving strict type safety**. They are one of the most practical applications of generics because they let you build **flexible helper functions used across an entire codebase**.

These functions often combine:

* Generics (`<T>`)
* Constraints (`extends`)
* `keyof`
* Conditional types (sometimes)
* Type inference

---

# 🔹 1. What is a Generic Utility Function?

A generic utility function is a function that:

> Works with different types without losing type information.

---

### 🔹 Basic Example

```ts 
function identity<T>(value: T): T {
  return value;
}
```

---

👉 This is the simplest utility function—returns exactly what you pass in.

---

# 🔹 2. Why Generic Utility Functions Matter

Without generics:

❌ You write duplicate functions
❌ You lose type safety (`any`)
❌ Functions become inflexible

With generics:

✔ One function works for all types
✔ Full type safety
✔ Better reuse across projects

---

# 🔹 3. Utility Function: `wrap` (Convert Value to Array)

```ts 
function wrap<T>(value: T): T[] {
  return [value];
}
```

---

### 🔹 Usage

```ts 
wrap(10);        // number[]
wrap("hello");   // string[]
```

---

👉 The return type always matches input type.

---

# 🔹 4. Utility Function: `first` (Get First Element)

```ts 
function first<T>(arr: T[]): T {
  return arr[0];
}
```

---

### 🔹 Usage

```ts 
first([1, 2, 3]); // number
first(["a", "b"]); // string
```

---

# 🔹 5. Utility Function with `keyof`: `getProperty`

```ts 
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

### 🔹 Usage

```ts 
const user = { name: "Alice", age: 25 };

getProperty(user, "name"); // string
getProperty(user, "age");  // number
```

---

👉 Ensures only valid keys can be used.

---

# 🔹 6. Utility Function: `merge` (Combine Objects)

```ts 
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

---

### 🔹 Usage

```ts 
const result = merge({ name: "Alice" }, { age: 30 });
```

---

👉 Result type: `{ name: string; age: number }`

---

# 🔹 7. Utility Function with Constraints

```ts 
function logLength<T extends { length: number }>(value: T): T {
  console.log(value.length);
  return value;
}
```

---

### 🔹 Usage

```ts 
logLength("hello");
logLength([1, 2, 3]);
```

---

👉 Only values with `.length` are allowed.

---

# 🔹 8. Utility Function: `pick` (Select Property Safely)

```ts 
function pick<T, K extends keyof T>(obj: T, key: K): Pick<T, K> {
  return { [key]: obj[key] } as Pick<T, K>;
}
```

---

### 🔹 Usage

```ts 
const user = { id: 1, name: "Alice" };

pick(user, "name"); // { name: string }
```

---

# 🔹 9. Utility Function: `mapArray`

```ts 
function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}
```

---

### 🔹 Usage

```ts 
const result = mapArray([1, 2, 3], x => x.toString());
// string[]
```

---

# 🔹 10. Utility Function: `filterNonNull`

```ts 
function filterNonNull<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((item): item is T => item != null);
}
```

---

### 🔹 Usage

```ts 
const result = filterNonNull([1, null, 2, undefined]);
// number[]
```

---

# 🔹 11. Utility Function: `deepClone` (Generic Safe Copy)

```ts 
function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
```

---

👉 Preserves type structure.

---

# 🔹 12. Advanced Utility: Conditional Return Type

```ts 
function parse<T>(value: T): T extends string ? number : T {
  return (typeof value === "string" ? Number(value) : value) as any;
}
```

---

👉 Return type depends on input type.

---

# 🔹 13. Real-World Utility Pattern: API Fetch Wrapper

```ts 
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}
```

---

### 🔹 Usage

```ts 
type User = { id: number; name: string };

const user = await fetchData<User>("/api/user");
```

---

# 🔹 14. Why Generic Utility Functions Are Important

They enable:

✔ Reusable logic across types
✔ Strong type inference
✔ Safer APIs
✔ Reduced duplication
✔ Scalable architecture

---

# 🔹 15. Common Mistakes

### ❌ Using `any`

```ts 
function wrap(value: any): any[] {}
```

👉 removes all safety.

---

### ❌ Not using constraints when needed

```ts 
function logLength<T>(value: T) {
  console.log(value.length); // ❌ unsafe
}
```

---

### ❌ Overcomplicating simple functions

Not every helper needs complex generics.

---

# 🔹 16. Best Practices

* ✔ Use generics for reusable logic
* ✔ Combine with `keyof` for object utilities
* ✔ Add constraints when accessing properties
* ✔ Let TypeScript infer types when possible
* ✔ Keep utilities small and composable

---

# 🚀 In Summary

Generic utility functions in TypeScript:

* Provide reusable, type-safe helpers
* Work across multiple data types
* Preserve input-output relationships
* Combine with constraints, `keyof`, and conditional types
* Power modern TypeScript libraries and frameworks

👉 They are the foundation of **scalable, reusable, and strongly typed TypeScript codebases**.

---

## 🧠 Higher-Order Generics in TypeScript — Full Detail

### // Generics that work on other generic types

Higher-order generics are an advanced TypeScript concept where **a generic type operates on other generic types**. Instead of just parameterizing values, they parameterize **type constructors themselves**.

This is similar to higher-order functions in JavaScript (functions that take other functions), but applied at the **type level**.

---

# 🔹 1. What Are Higher-Order Generics?

A higher-order generic is a generic that:

> Accepts or returns another generic type.

---

### 🔹 Simple Idea

* Normal generic: works with `T`
* Higher-order generic: works with `Container<T>` or `Promise<T>` or `Array<T>`

---

# 🔹 2. Basic Example Concept

```ts 
type Wrapper<T> = {
  value: T;
};
```

Now imagine a generic that works on `Wrapper<T>` itself.

---

# 🔹 3. Higher-Order Generic: Identity Wrapper Transformer

```ts 
type TransformWrapper<C> =
  C extends Wrapper<infer T>
    ? Wrapper<T>
    : never;
```

---

👉 Here, `C` is a *generic type structure*, not just a value type.

---

# 🔹 4. What Makes It “Higher-Order”?

A normal generic:

```ts id="g7h8i9"
type Box<T> = { value: T };
```

A higher-order generic:

* Works on `Box<T>` itself
* Extracts or transforms `T`
* Treats generic types as inputs

---

# 🔹 5. Example: Extract Inner Type from Container

```ts 
type InnerType<T> =
  T extends Array<infer U> ? U :
  T extends Promise<infer U> ? U :
  T;
```

---

### 🔹 Usage

```ts 
type A = InnerType<string[]>;        // string
type B = InnerType<Promise<number>>; // number
```

---

👉 This is higher-order because it operates on **generic structures**, not just values.

---

# 🔹 6. Higher-Order Generic Function Type Pattern

```ts 
type Mapper<T> = {
  map: <U>(fn: (value: T) => U) => U[];
};
```

---

### 🔹 Usage

```ts 
const numbers: Mapper<number> = {
  map: (fn) => [fn(1), fn(2)]
};
```

---

👉 The generic operates inside another generic structure.

---

# 🔹 7. Generic Transformer of Generics

```ts 
type Container<T> = {
  value: T;
};

type MakeReadonly<C> =
  C extends Container<infer T>
    ? Readonly<Container<T>>
    : never;
```

---

### 🔹 Usage

```ts 
type Result = MakeReadonly<Container<string>>;
```

---

👉 Transforms a generic type into another version of itself.

---

# 🔹 8. Higher-Order Generic Utility: Unwrap Anything

```ts 
type Unwrap<T> =
  T extends Promise<infer U> ? U :
  T extends Array<infer U> ? U :
  T extends { value: infer U } ? U :
  T;
```

---

### 🔹 Usage

```ts 
type A = Unwrap<Promise<string>>;  // string
type B = Unwrap<number[]>;        // number
type C = Unwrap<{ value: boolean }>; // boolean
```

---

👉 This is a classic higher-order generic pattern.

---

# 🔹 9. Generic Type Transformer (Type-Level Function)

Think of this as:

> A function that takes a type and returns a transformed type.

---

```ts 
type Transformer<T> = T extends string
  ? number
  : boolean;
```

---

### 🔹 Usage

```ts 
type A = Transformer<string>; // number
type B = Transformer<number>; // boolean
```

---

# 🔹 10. Higher-Order Generic with Constraints

```ts 
type ExtractValue<C> =
  C extends { get: () => infer R } ? R : never;
```

---

### 🔹 Usage

```ts 
type A = ExtractValue<{ get: () => number }>; // number
```

---

👉 Works on any object matching a generic structure.

---

# 🔹 11. Why Higher-Order Generics Are Powerful

They allow you to:

✔ Transform generic types into other types
✔ Build reusable type-level utilities
✔ Work with containers like `Promise<T>` or `Array<T>`
✔ Extract nested structures safely
✔ Compose type logic like functions

---

# 🔹 12. Real-World Use Case: API Response Wrapper

```ts 
type ApiResponse<T> = {
  data: T;
  success: boolean;
};
```

---

### 🔹 Higher-Order Transformer

```ts 
type UnwrapResponse<T> =
  T extends ApiResponse<infer U> ? U : never;
```

---

### 🔹 Usage

```ts 
type A = UnwrapResponse<ApiResponse<string>>; // string
```

---

# 🔹 13. Higher-Order Generic Composition

You can combine multiple transformations:

```ts 
type DeepUnwrap<T> =
  T extends Promise<infer U>
    ? DeepUnwrap<U>
    : T;
```

---

👉 This recursively operates on generic types.

---

# 🔹 14. Difference from Normal Generics

| Feature | Normal Generic         | Higher-Order Generic          |
| ------- | ---------------------- | ----------------------------- |
| Input   | value type (`T`)       | generic type (`Container<T>`) |
| Output  | transformed value type | transformed type structure    |
| Scope   | shallow                | structural / recursive        |
| Power   | moderate               | advanced / meta-programming   |

---

# 🔹 15. Common Mistakes

### ❌ Treating generics as values

```ts 
type A<T> = T + 1; // ❌ invalid (types are not runtime values)
```

---

### ❌ Overusing nested inference

Too many `infer` layers reduce readability.

---

### ❌ Not understanding structural matching

Higher-order generics rely on **shape matching**, not exact names.

---

# 🔹 16. Best Practices

* ✔ Use for type transformation utilities
* ✔ Prefer clarity over deep nesting
* ✔ Combine with `infer` for extraction
* ✔ Keep reusable patterns small and composable
* ✔ Document complex transformations

---

# 🚀 In Summary

Higher-order generics in TypeScript:

* Operate on other generic types
* Enable type-level “functions on types”
* Work with structures like `Promise<T>`, `Array<T>`, and custom containers
* Combine heavily with `infer` and conditional types
* Power advanced utilities and frameworks

👉 They represent one of the most advanced concepts in TypeScript, enabling **true type-level programming and reusable type transformations**.

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

**[Day 15 — Utility Types →](../Day-15-Utility-Types/)**
