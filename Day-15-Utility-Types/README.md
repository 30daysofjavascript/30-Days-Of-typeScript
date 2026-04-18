# 📘 Day 15 — Utility Types

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

| Utility | What it Does | Example |
|---------|-------------|---------|
| `Partial<T>` | All properties optional | `Partial<User>` |
| `Required<T>` | All properties required | `Required<Config>` |
| `Readonly<T>` | All properties readonly | `Readonly<User>` |
| `Pick<T,K>` | Keep only K keys | `Pick<User,"id"\|"name">` |
| `Omit<T,K>` | Remove K keys | `Omit<User,"password">` |
| `Record<K,V>` | Object of K→V | `Record<string,number>` |
| `Exclude<T,U>` | Remove U from union T | `Exclude<string\|null, null>` |
| `Extract<T,U>` | Keep only U from union T | `Extract<string\|number, string>` |
| `NonNullable<T>` | Remove null/undefined | `NonNullable<string\|null>` |
| `ReturnType<T>` | Return type of function | `ReturnType<typeof fn>` |
| `Parameters<T>` | Param types of function | `Parameters<typeof fn>` |
| `Awaited<T>` | Unwrap Promise | `Awaited<Promise<string>>` |


---

## 🧰 Utility Types in TypeScript — Full Detail

### + Base Types for Examples

Utility types are **predefined generic types provided by TypeScript** that help you **transform, manipulate, and reuse existing types** without rewriting them manually.

They are built using advanced features like:

* Generics
* Mapped types
* Conditional types
* `keyof`
* `infer`

---

# 🔹 1. What Are Utility Types?

Utility types are:

> Reusable generic helpers that transform one type into another.

---

### 🔹 Simple Idea

Instead of writing:

```ts 
type PartialUser = {
  id?: number;
  name?: string;
};
```

You can use:

```ts
type PartialUser = Partial<User>;
```

---

👉 Less code, more power.

---

# 🔹 2. Why Utility Types Matter

Without utility types:

❌ Repetitive type definitions
❌ Hard to maintain large codebases
❌ Error-prone manual updates

With utility types:

✔ Reusable transformations
✔ Cleaner and shorter code
✔ Built-in type safety
✔ Standardized patterns

---

# 🔹 3. Base Type for Examples

We’ll use a consistent base type throughout all examples:

```ts 
type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
};
```

---

👉 This will help you clearly understand how each utility type transforms a type.

---

# 🔹 4. Categories of Utility Types

Utility types can be grouped into categories:

---

## 🟢 1. Property Modifiers

* `Partial<T>`
* `Required<T>`
* `Readonly<T>`

---

## 🔵 2. Property Selection

* `Pick<T, K>`
* `Omit<T, K>`

---

## 🟣 3. Type Transformations

* `Record<K, T>`
* `Exclude<T, U>`
* `Extract<T, U>`
* `NonNullable<T>`

---

## 🟡 4. Function & Object Utilities

* `ReturnType<T>`
* `Parameters<T>`
* `InstanceType<T>`

---

# 🔹 5. Example: Partial<T>

Makes all properties optional.

```ts 
type PartialUser = Partial<User>;
```

---

### 🔹 Result

```ts 
{
  id?: number;
  name?: string;
  email?: string;
  age?: number;
}
```

---

👉 Useful for update operations.

---

# 🔹 6. Example: Required<T>

Makes all properties required.

```ts 
type RequiredUser = Required<User>;
```

---

### 🔹 Result

```ts 
{
  id: number;
  name: string;
  email: string;
  age: number;
}
```

---

👉 Removes optional `?`.

---

# 🔹 7. Example: Readonly<T>

Makes all properties immutable.

```ts 
type ReadonlyUser = Readonly<User>;
```

---

👉 Prevents modification after creation.

---

# 🔹 8. Example: Pick<T, K>

Select specific properties.

```ts 
type UserPreview = Pick<User, "id" | "name">;
```

---

### 🔹 Result

```ts 
{
  id: number;
  name: string;
}
```

---

# 🔹 9. Example: Omit<T, K>

Remove specific properties.

```ts 
type UserWithoutEmail = Omit<User, "email">;
```

---

👉 Opposite of `Pick`.

---

# 🔹 10. Example: Record<K, T>

Creates an object type with specific keys.

```ts 
type Roles = "admin" | "user";

type RoleMap = Record<Roles, User>;
```

---

### 🔹 Result

```ts 
{
  admin: User;
  user: User;
}
```

---

# 🔹 11. Example: Exclude<T, U>

Removes types from a union.

```ts 
type A = Exclude<"a" | "b" | "c", "a">;
// "b" | "c"
```

---

# 🔹 12. Example: Extract<T, U>

Keeps only matching types.

```ts 
type A = Extract<"a" | "b" | "c", "a" | "b">;
// "a" | "b"
```

---

# 🔹 13. Example: NonNullable<T>

Removes `null` and `undefined`.

```ts 
type A = NonNullable<string | null | undefined>;
// string
```

---

# 🔹 14. Example: ReturnType<T>

Gets function return type.

```ts 
type Fn = () => number;

type R = ReturnType<Fn>; // number
```

---

# 🔹 15. Example: Parameters<T>

Gets function parameters as tuple.

```ts 
type Fn = (a: string, b: number) => void;

type P = Parameters<Fn>; // [string, number]
```

---

# 🔹 16. Example: InstanceType<T>

Extracts class instance type.

```ts 
class UserClass {
  name = "Alice";
}

type A = InstanceType<typeof UserClass>;
```

---

# 🔹 17. How Utility Types Work Internally

Example: `Partial<T>`

```ts 
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

---

👉 Uses mapped types + generics.

---

# 🔹 18. Real-World Use Cases

Utility types are used for:

✔ API request/response shaping
✔ Form state updates
✔ Database models
✔ UI props transformations
✔ Partial updates (PATCH requests)
✔ Immutable data handling

---

# 🔹 19. Common Mistakes

### ❌ Overusing utility types

Too many transformations can reduce readability.

---

### ❌ Not understanding base type

Always know what you’re transforming.

---

### ❌ Confusing Pick vs Omit

* `Pick` → keep
* `Omit` → remove

---

# 🔹 20. Best Practices

* ✔ Use built-in utility types before creating custom ones
* ✔ Keep transformations simple and readable
* ✔ Combine utility types carefully
* ✔ Use meaningful base types
* ✔ Avoid over-nesting

---

# 🚀 In Summary

Utility types in TypeScript:

* Are built-in generic helpers
* Transform existing types safely
* Reduce duplication and improve maintainability
* Are powered by generics, mapped types, and conditional types
* Are essential for real-world TypeScript development

👉 They are one of the most important tools for writing **clean, scalable, and maintainable type-safe applications**.

---

## 🧩 `Partial<T>` in TypeScript — Full Detail

### Make ALL Properties Optional

### // Great for update functions where you only pass changed fields

`Partial<T>` is one of the most commonly used utility types in TypeScript. It transforms a type by making **every property optional**, allowing you to work with **incomplete objects safely**.

---

# 🔹 1. What is `Partial<T>`?

`Partial<T>` is a built-in utility type that:

> Converts all properties of a type `T` into optional properties.

---

### 🔹 Syntax

```ts
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

---

👉 It uses a **mapped type + `keyof` + optional modifier (`?`)**

---

# 🔹 2. Base Example Type

```ts
type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
};
```

---

# 🔹 3. Using `Partial<T>`

```ts
type PartialUser = Partial<User>;
```

---

### 🔹 Result

```ts
{
  id?: number;
  name?: string;
  email?: string;
  age?: number;
}
```

---

👉 Even required fields (`id`, `name`, `email`) become optional.

---

# 🔹 4. Why `Partial<T>` is Useful

Without `Partial`:

❌ You must provide all properties
❌ Difficult to handle updates
❌ Repetitive type definitions

With `Partial`:

✔ Pass only changed fields
✔ Cleaner update logic
✔ Flexible object handling

---

# 🔹 5. Real-World Use Case: Update Function

```ts
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}
```

---

### 🔹 Usage

```ts
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

updateUser(user, { name: "Bob" });
updateUser(user, { email: "new@mail.com" });
```

---

👉 You don’t need to pass all fields—only the ones you want to change.

---

# 🔹 6. Partial in API PATCH Requests

In many APIs:

* `POST` → full object
* `PATCH` → partial update

---

```ts
type UpdateUserRequest = Partial<User>;
```

---

👉 Perfect match for real-world API design.

---

# 🔹 7. Partial with Nested Objects (Important Limitation)

```ts
type Profile = {
  user: {
    name: string;
    age: number;
  };
};
```

---

```ts
type PartialProfile = Partial<Profile>;
```

---

### 🔴 Result

```ts
{
  user?: {
    name: string;
    age: number;
  };
}
```

---

👉 `user` is optional, **but its inner properties are NOT optional**

---

# 🔹 8. Deep Partial (Custom Solution)

To make nested properties optional:

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};
```

---

### 🔹 Usage

```ts
type DeepPartialProfile = DeepPartial<Profile>;
```

---

👉 Now everything is optional at all levels.

---

# 🔹 9. Combining `Partial<T>` with Other Types

### 🔹 Partial + Pick

```ts
type PartialUserName = Partial<Pick<User, "name" | "email">>;
```

---

### 🔹 Partial + Required

```ts
type Mixed = Required<Pick<User, "id">> & Partial<User>;
```

---

👉 Some fields required, others optional.

---

# 🔹 10. Partial in Forms

```ts
type FormState = Partial<User>;
```

---

👉 Useful when:

* Form is partially filled
* Fields update independently

---

# 🔹 11. How `Partial<T>` Works Internally

```ts
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

---

Breakdown:

* `keyof T` → all keys
* `[K in ...]` → loop over keys
* `?` → make each optional
* `T[K]` → preserve original type

---

# 🔹 12. Common Mistakes

### ❌ Assuming deep optional behavior

```ts
Partial<NestedType>
```

👉 Only affects top-level properties.

---

### ❌ Overusing Partial

Too much optionality can lead to weak type safety.

---

### ❌ Using Partial when fields should be required

Don’t use it blindly—understand intent.

---

# 🔹 13. Best Practices

* ✔ Use for update/patch operations
* ✔ Use in forms and partial state
* ✔ Combine with other utility types when needed
* ✔ Use `DeepPartial` for nested structures
* ✔ Avoid overusing in critical data models

---

# 🔹 14. When to Use `Partial<T>`

Use it when:

✔ Updating existing objects
✔ Accepting incomplete data
✔ Designing flexible APIs
✔ Handling form inputs
✔ Merging objects

---

# 🚀 In Summary

`Partial<T>`:

* Makes all properties optional
* Is built using mapped types
* Is perfect for update functions and partial data
* Does NOT deeply affect nested properties
* Is one of the most useful and widely used utility types

👉 It is essential for writing **flexible, real-world TypeScript code**, especially in APIs, forms, and state management.

---

## 🧩 `Required<T>` in TypeScript — Full Detail

### Make ALL Properties Required

### // Opposite of `Partial` — removes all `?`

`Required<T>` is a built-in utility type in TypeScript that transforms a type by making **every property required**, effectively **removing all optional modifiers** (`?`) from the type.

---

# 🔹 1. What is `Required<T>`?

`Required<T>` is the inverse of `Partial<T>`:

> Converts all optional properties of a type `T` into required properties.

---

### 🔹 Syntax

```ts 
type Required<T> = {
  [K in keyof T]-?: T[K];
};
```

---

👉 Uses **mapped types**, **keyof**, and the `-?` modifier to remove the optional flag.

---

# 🔹 2. Base Example Type

```ts 
type User = {
  id: number;
  name: string;
  email?: string;
  age?: number;
};
```

---

# 🔹 3. Using `Required<T>`

```ts 
type FullUser = Required<User>;
```

---

### 🔹 Result

```ts 
{
  id: number;
  name: string;
  email: string;
  age: number;
}
```

---

👉 All properties are now **required**, including previously optional ones (`email`, `age`).

---

# 🔹 4. Why `Required<T>` is Useful

Without `Required`:

❌ Optional properties may cause runtime errors
❌ Type safety may be inconsistent

With `Required`:

✔ Ensures all fields are present
✔ Useful for strict object validation
✔ Provides full guarantees of structure

---

# 🔹 5. Real-World Use Case: Data Validation

```ts 
function validateUser(user: Required<User>) {
  // Safe access to all fields
  console.log(user.id, user.name, user.email, user.age);
}
```

---

### 🔹 Usage

```ts 
validateUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30
});
```

---

👉 Compiler ensures **all fields are provided**.

---

# 🔹 6. Required for API Responses

Some APIs guarantee all fields are returned:

```ts 
type ApiResponse = Required<User>;
```

---

👉 Perfect for responses where optionality is not allowed.

---

# 🔹 7. Required with Nested Objects

```ts 
type Profile = {
  user?: {
    name?: string;
    age?: number;
  };
};
```

```ts 
type FullProfile = Required<Profile>;
```

---

### 🔹 Result

```ts 
{
  user: {
    name?: string;
    age?: number;
  };
}
```

---

👉 Only top-level optional property is made required. **Nested optionals remain optional**.

---

# 🔹 8. Deep Required (Custom Solution)

To make nested properties required:

```ts 
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object
    ? DeepRequired<T[K]>
    : T[K];
};
```

---

### 🔹 Usage

```ts 
type FullProfileDeep = DeepRequired<Profile>;
```

---

👉 All nested fields are now required.

---

# 🔹 9. Combining `Required<T>` with Other Utility Types

### 🔹 Partial → Required

```ts 
type AllRequired = Required<Partial<User>>;
```

---

### 🔹 Pick → Required

```ts 
type RequiredNameEmail = Required<Pick<User, "name" | "email">>;
```

---

# 🔹 10. Common Mistakes

### ❌ Assuming deep required behavior

```ts 
Required<NestedType>
```

* Only top-level properties are affected.

---

### ❌ Using Required blindly

* Make sure all properties truly need to exist.

---

# 🔹 11. Best Practices

* ✔ Use for strict validation of objects
* ✔ Combine with other utility types for flexibility
* ✔ Use `DeepRequired` for nested structures
* ✔ Avoid over-constraining optional APIs

---

# 🔹 12. When to Use `Required<T>`

Use it when:

✔ Validating full objects
✔ Transforming optional types into guaranteed structures
✔ Working with API responses where all fields are present
✔ Ensuring safe access to all properties

---

# 🚀 In Summary

`Required<T>`:

* Makes all properties **mandatory**
* Removes all optional `?` modifiers
* Works at the top-level (nested optionals remain optional unless you use `DeepRequired`)
* Ensures **strong type safety**
* Perfect for **validation, API responses, and strict object contracts**

> Opposite of `Partial<T>`, `Required<T>` is essential for **making types more predictable and eliminating optionality when it’s unsafe or unnecessary**.

---



---
## 📖 Key Concepts

### Built-in Utility Types Cheat Sheet

| Utility | What it Does | Example |
|---------|-------------|---------|
| `Partial<T>` | All properties optional | `Partial<User>` |
| `Required<T>` | All properties required | `Required<Config>` |
| `Readonly<T>` | All properties readonly | `Readonly<User>` |
| `Pick<T,K>` | Keep only K keys | `Pick<User,"id"\|"name">` |
| `Omit<T,K>` | Remove K keys | `Omit<User,"password">` |
| `Record<K,V>` | Object of K→V | `Record<string,number>` |
| `Exclude<T,U>` | Remove U from union T | `Exclude<string\|null, null>` |
| `Extract<T,U>` | Keep only U from union T | `Extract<string\|number, string>` |
| `NonNullable<T>` | Remove null/undefined | `NonNullable<string\|null>` |
| `ReturnType<T>` | Return type of function | `ReturnType<typeof fn>` |
| `Parameters<T>` | Param types of function | `Parameters<typeof fn>` |
| `Awaited<T>` | Unwrap Promise | `Awaited<Promise<string>>` |

```ts
// Real-world combinations:
type CreateDTO = Omit<User, "id" | "createdAt">;
type UpdateDTO = Partial<Omit<User, "id" | "createdAt">>;
type SafeUser  = Readonly<Omit<User, "password">>;
```
---

## 🧩 `Readonly<T>` in TypeScript — Full Detail

### Make ALL Properties Readonly

`Readonly<T>` is a built-in TypeScript utility type that transforms a type by making **all properties immutable**, preventing them from being changed after initial assignment.

---

# 🔹 1. What is `Readonly<T>`?

`Readonly<T>` is a mapped type that:

> Converts every property of type `T` into a **readonly property**, meaning the property can only be set once (usually during object creation) and cannot be reassigned afterward.

---

### 🔹 Syntax

```ts 
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

---

👉 Uses **mapped types + `keyof` + `readonly` modifier**.

---

# 🔹 2. Base Example Type

```ts 
type User = {
  id: number;
  name: string;
  email?: string;
  age?: number;
};
```

---

# 🔹 3. Using `Readonly<T>`

```ts 
type ReadonlyUser = Readonly<User>;
```

---

### 🔹 Result

```ts 
{
  readonly id: number;
  readonly name: string;
  readonly email?: string;
  readonly age?: number;
}
```

---

👉 All properties are now **immutable**.

---

# 🔹 4. Why `Readonly<T>` is Useful

Without `Readonly`:

❌ Properties can be accidentally modified
❌ Difficult to enforce immutability

With `Readonly`:

✔ Safe immutability for objects
✔ Helps enforce functional programming practices
✔ Prevents bugs caused by unintended mutation

---

# 🔹 5. Real-World Use Case: Immutable Data

```ts 
const user: Readonly<User> = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30
};

// ❌ Error: Cannot assign to 'name' because it is a read-only property
user.name = "Bob";
```

---

# 🔹 6. Readonly in API Responses

```ts 
type ApiResponse = Readonly<User>;
```

---

👉 Guarantees that the received object **cannot be accidentally modified**.

---

# 🔹 7. Readonly with Nested Objects (Important Limitation)

```ts 
type Profile = {
  user: {
    name: string;
    age: number;
  };
};
```

```ts 
type ReadonlyProfile = Readonly<Profile>;
```

---

### 🔴 Result

```ts 
{
  readonly user: {
    name: string;
    age: number;
  };
}
```

---

👉 `user` itself is readonly, **but its inner properties are still mutable**.

---

# 🔹 8. Deep Readonly (Custom Solution)

To make nested objects completely readonly:

```ts 
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

---

### 🔹 Usage

```ts 
type ProfileReadonly = DeepReadonly<Profile>;
```

---

👉 Now everything, including nested properties, is immutable.

---

# 🔹 9. Combining `Readonly<T>` with Other Utility Types

### 🔹 Partial + Readonly

```ts 
type PartialReadonlyUser = Readonly<Partial<User>>;
```

* Optional and readonly at the same time.

---

### 🔹 Pick + Readonly

```ts 
type ReadonlyNameEmail = Readonly<Pick<User, "name" | "email">>;
```

---

# 🔹 10. Common Mistakes

### ❌ Assuming deep readonly behavior

```ts 
Readonly<NestedType>
```

* Only top-level properties become readonly. Nested objects remain mutable unless you use `DeepReadonly`.

---

### ❌ Using readonly unnecessarily

* Avoid marking everything readonly without reason; it can make object updates harder when mutation is intended.

---

# 🔹 11. Best Practices

* ✔ Use for immutable API responses or configuration objects
* ✔ Combine with `Partial` or `Pick` when needed
* ✔ Use `DeepReadonly` for nested structures
* ✔ Prefer immutability for safer state management

---

# 🔹 12. When to Use `Readonly<T>`

Use it when:

✔ You want to prevent accidental mutation
✔ Working with immutable data structures
✔ Designing API responses that shouldn’t change
✔ Writing functional-style code

---

# 🚀 In Summary

`Readonly<T>`:

* Makes all properties **immutable**
* Prevents reassignment after creation
* Works at the top level (nested objects remain mutable unless `DeepReadonly` is used)
* Helps enforce immutability and functional programming practices
* Perfect for **state, API responses, and configuration objects**

> Together with `Partial<T>` and `Required<T>`, `Readonly<T>` is a fundamental TypeScript utility for controlling object mutability and ensuring safe, predictable code.


---

## 🧩 `Pick<T, K>` in TypeScript — Full Detail

### Keep Only Specified Keys

`Pick<T, K>` is a built-in TypeScript utility type that **constructs a new type by selecting only a subset of properties from an existing type**. It’s the opposite of `Omit<T, K>`.

---

# 🔹 1. What is `Pick<T, K>`?

`Pick<T, K>` allows you to:

> Create a new type that **contains only the keys `K` from type `T`**.

---

### 🔹 Syntax

```ts 
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

---

* `T` → original type
* `K` → keys to select (must exist in `T`)
* `[P in K]` → mapped type to extract only those keys

---

# 🔹 2. Base Example Type

```ts 
type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
};
```

---

# 🔹 3. Using `Pick<T, K>`

```ts 
type UserPreview = Pick<User, "id" | "name">;
```

---

### 🔹 Result

```ts 
{
  id: number;
  name: string;
}
```

---

👉 Only the `id` and `name` properties are included; `email` and `age` are omitted.

---

# 🔹 4. Why `Pick<T, K>` is Useful

* Focus on only the properties you need
* Reduces unnecessary data exposure
* Simplifies API responses
* Enhances type safety by limiting available keys

---

# 🔹 5. Real-World Use Case: API Responses

```ts 
type UserSummary = Pick<User, "id" | "name">;

function getUserSummary(): UserSummary {
  return { id: 1, name: "Alice" };
}
```

---

### 🔹 Usage

* Send only essential fields in API responses
* Avoid exposing sensitive information (like `email`)

---

# 🔹 6. Pick vs Partial + Required

You can combine `Pick` with other utility types:

```ts 
type OptionalUserPreview = Partial<Pick<User, "name" | "email">>;
```

* Creates a type where `name` and `email` are optional.

```ts 
type RequiredUserId = Required<Pick<User, "id">>;
```

* Ensures `id` is required even if original type had optional properties.

---

# 🔹 7. Pick with Functions

```ts 
type UserHandler = Pick<User, "id" | "email">;

function handleUser(user: UserHandler) {
  console.log(user.id, user.email);
}
```

* Only `id` and `email` can be accessed inside the function.

---

# 🔹 8. Pick with Nested Objects

```ts 
type Profile = {
  user: {
    name: string;
    age: number;
  };
  isActive: boolean;
};
```

```ts 
type ProfileUser = Pick<Profile, "user">;
```

### 🔹 Result

```ts 
{
  user: {
    name: string;
    age: number;
  };
}
```

* Works the same even with nested objects.

---

# 🔹 9. Common Mistakes

### ❌ Picking keys that don’t exist

```ts 
type Wrong = Pick<User, "nickname">; // ❌ Error
```

* Only keys that exist in the original type (`keyof T`) are allowed.

### ❌ Assuming Pick removes nested properties

* `Pick` works only at the top level; nested objects are not altered.

---

# 🔹 10. Best Practices

* ✔ Use to expose only required fields
* ✔ Combine with `Partial`, `Required`, or `Readonly` for flexible types
* ✔ Avoid picking unnecessary keys that complicate the type
* ✔ Use in API responses, UI models, or form states

---

# 🔹 11. When to Use `Pick<T, K>`

Use `Pick` when:

✔ You need a subset of a type for a function or API
✔ You want to reduce data exposure
✔ You want to create smaller, focused types from larger ones
✔ Working with forms or partial updates

---

# 🚀 In Summary

`Pick<T, K>`:

* Creates a new type with only the selected keys `K`
* Keeps type safety for selected properties
* Works at the top level (nested properties remain intact)
* Is ideal for API responses, function arguments, and partial views
* Can be combined with `Partial`, `Required`, and `Readonly` for flexible and reusable types

> `Pick` is one of the most commonly used TypeScript utility types for **safe and precise type selection**.

---

## 🧩 `Omit<T, K>` in TypeScript — Full Detail

### Remove Specified Keys

`Omit<T, K>` is a built-in TypeScript utility type that **constructs a new type by removing specific properties** from an existing type. It’s the inverse of `Pick<T, K>`.

---

# 🔹 1. What is `Omit<T, K>`?

`Omit<T, K>` allows you to:

> Create a new type that **excludes the keys `K` from type `T`**.

---

### 🔹 Syntax

```ts 
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

* `T` → original type
* `K` → keys to exclude
* Internally uses `Pick` + `Exclude` to construct the new type

---

# 🔹 2. Base Example Type

```ts 
type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
};
```

---

# 🔹 3. Using `Omit<T, K>`

```ts 
type UserWithoutEmail = Omit<User, "email">;
```

---

### 🔹 Result

```ts 
{
  id: number;
  name: string;
  age?: number;
}
```

* `email` is removed from the type
* Other properties remain unchanged

---

# 🔹 4. Why `Omit<T, K>` is Useful

* Remove sensitive or unnecessary fields
* Create derived types without repeating all other properties
* Simplify API responses
* Increase type safety by eliminating unwanted fields

---

# 🔹 5. Real-World Use Case: API Responses

```ts 
type PublicUser = Omit<User, "email" | "age">;

function getPublicUser(): PublicUser {
  return { id: 1, name: "Alice" };
}
```

* Avoid sending sensitive or internal fields like `email` or `age`

---

# 🔹 6. Omit vs Pick

```ts 
type Picked = Pick<User, "id" | "name">;
type Omitted = Omit<User, "email" | "age">;
```

* Both produce the same type in this example
* `Pick` → specify which keys to **keep**
* `Omit` → specify which keys to **remove**

---

# 🔹 7. Omit with Nested Objects

```ts 
type Profile = {
  user: {
    name: string;
    age: number;
    email: string;
  };
  isActive: boolean;
};
```

```ts 
type ProfileWithoutEmail = Omit<Profile["user"], "email">;
```

### 🔹 Result

```ts 
{
  name: string;
  age: number;
}
```

* Only removes `email` from the `user` object
* Works with nested objects when accessing the property type

---

# 🔹 8. Omit with Functions

```ts 
type UserHandler = Omit<User, "age">;

function handleUser(user: UserHandler) {
  console.log(user.id, user.name, user.email);
  // ❌ Cannot access user.age
}
```

* `age` is no longer accessible

---

# 🔹 9. Common Mistakes

### ❌ Omitting keys that don’t exist

```ts 
type Wrong = Omit<User, "nickname">; // ❌ Error
```

* Only keys in `T` can be omitted

### ❌ Assuming deep omit

* `Omit` affects only the top-level properties
* Nested objects require additional typing or custom utility types

---

# 🔹 10. Best Practices

* ✔ Use for API responses to exclude sensitive data
* ✔ Use to create simpler derived types
* ✔ Combine with `Partial` or `Readonly` for flexibility
* ✔ Avoid using Omit when nested properties need removal — consider custom types

---

# 🔹 11. When to Use `Omit<T, K>`

Use `Omit` when:

✔ You want to remove unnecessary fields from a type
✔ Exposing only safe data to external consumers
✔ Creating derived types without repeating the rest of the fields
✔ Simplifying function or API parameters

---

# 🚀 In Summary

`Omit<T, K>`:

* Constructs a new type **excluding specified keys**
* Uses `Pick` + `Exclude` internally
* Works only at the **top level** (nested properties need custom handling)
* Perfect for **API responses, internal vs public types, and removing sensitive properties**
* Can be combined with `Partial`, `Required`, or `Readonly` for flexible type composition

> `Omit` is a critical utility for **precise type control and avoiding repetitive type definitions** in TypeScript.

---

## 🧩 `Record<K, V>` in TypeScript — Full Detail

### Object with Specific Key/Value Types

`Record<K, V>` is a built-in utility type in TypeScript that allows you to **construct an object type with a fixed set of keys (`K`) and a consistent value type (`V`)**.

It is extremely useful for creating **maps, dictionaries, lookup tables, and strongly typed objects with known keys**.

---

# 🔹 1. What is `Record<K, V>`?

`Record<K, V>` creates a type where:

> Each key in `K` maps to a value of type `V`.

---

### 🔹 Syntax

```ts 
type Record<K extends keyof any, V> = {
  [P in K]: V;
};
```

---

* `K` → set of keys (string | number | symbol)
* `V` → value type for each key
* `[P in K]` → mapped type that creates properties

---

# 🔹 2. Basic Example

```ts 
type Roles = "admin" | "user";

type RolePermissions = Record<Roles, boolean>;
```

---

### 🔹 Result

```ts 
{
  admin: boolean;
  user: boolean;
}
```

---

👉 Each key has the same value type (`boolean`).

---

# 🔹 3. Using `Record<K, V>`

```ts 
const permissions: Record<"read" | "write", boolean> = {
  read: true,
  write: false
};
```

---

👉 TypeScript ensures:

* All keys exist
* No extra keys allowed
* Values match the defined type

---

# 🔹 4. Why `Record<K, V>` is Useful

Without `Record`:

❌ Manual object typing
❌ Repetitive definitions
❌ Hard to scale

With `Record`:

✔ Strongly typed objects
✔ Guaranteed key coverage
✔ Cleaner syntax
✔ Scalable for large key sets

---

# 🔹 5. Real-World Use Case: User Map

```ts 
type User = {
  id: number;
  name: string;
};

type UserMap = Record<string, User>;
```

---

### 🔹 Usage

```ts 
const users: UserMap = {
  "1": { id: 1, name: "Alice" },
  "2": { id: 2, name: "Bob" }
};
```

---

👉 Creates a dictionary of users indexed by string keys.

---

# 🔹 6. Record with Union Keys

```ts 
type Status = "success" | "error" | "loading";

type StatusMessages = Record<Status, string>;
```

---

### 🔹 Result

```ts 
{
  success: string;
  error: string;
  loading: string;
}
```

---

👉 All union members must be present.

---

# 🔹 7. Record vs Index Signature

### 🔹 Index Signature

```ts 
type Map = {
  [key: string]: number;
};
```

---

### 🔹 Record

```ts 
type Map = Record<string, number>;
```

---

👉 Both are similar, but:

* `Record` is cleaner and reusable
* Index signature is more manual

---

# 🔹 8. Record with Complex Values

```ts 
type Product = {
  name: string;
  price: number;
};

type ProductCatalog = Record<string, Product>;
```

---

👉 Values can be objects, arrays, or even functions.

---

# 🔹 9. Record with Functions

```ts 
type Handlers = Record<string, () => void>;
```

---

### 🔹 Usage

```ts 
const handlers: Handlers = {
  click: () => console.log("clicked"),
  hover: () => console.log("hovered")
};
```

---

# 🔹 10. Combining `Record` with Other Utility Types

### 🔹 Record + Partial

```ts 
type PartialSettings = Partial<Record<"dark" | "light", boolean>>;
```

---

👉 Keys optional, values fixed.

---

### 🔹 Record + Readonly

```ts 
type ImmutableMap = Readonly<Record<string, number>>;
```

---

👉 Immutable key-value store.

---

# 🔹 11. Record vs Object Type

```ts 
type A = {
  admin: boolean;
  user: boolean;
};
```

```ts 
type B = Record<"admin" | "user", boolean>;
```

---

👉 Both are equivalent, but `Record` is:

* More dynamic
* Better for reusable patterns

---

# 🔹 12. Common Mistakes

### ❌ Missing keys

```ts 
const obj: Record<"a" | "b", number> = {
  a: 1
}; // ❌ missing 'b'
```

---

### ❌ Adding extra keys

```ts 
const obj: Record<"a", number> = {
  a: 1,
  b: 2 // ❌ not allowed
};
```

---

### ❌ Using wrong key type

```ts 
Record<boolean, string>; // ❌ invalid
```

👉 Keys must be `string | number | symbol`

---

# 🔹 13. Best Practices

* ✔ Use for maps and dictionaries
* ✔ Use union types for fixed keys
* ✔ Combine with other utility types for flexibility
* ✔ Prefer over manual object typing for scalability
* ✔ Avoid when keys are unknown at compile time (use index signature instead)

---

# 🔹 14. When to Use `Record<K, V>`

Use it when:

✔ You need a key-value mapping
✔ Keys are known ahead of time (union types)
✔ All keys should have the same value type
✔ Creating lookup tables or configurations
✔ Designing strongly typed dictionaries

---

# 🚀 In Summary

`Record<K, V>`:

* Creates an object type with keys `K` and values `V`
* Uses mapped types internally
* Ensures all keys are present and correctly typed
* Is ideal for maps, dictionaries, and lookup tables
* Can be combined with other utility types

👉 It is one of the most powerful tools for building **structured, predictable, and type-safe object mappings in TypeScript**.

---

## 🧩 `Exclude<T, U>` in TypeScript — Full Detail

### Remove Types from a Union

`Exclude<T, U>` is a built-in TypeScript utility type that **constructs a type by excluding from `T` all types that are assignable to `U`**. It’s particularly useful when working with union types and you want to remove certain members.

---

# 🔹 1. What is `Exclude<T, U>`?

`Exclude<T, U>` allows you to:

> Remove one or more types from a union type `T` that are assignable to type `U`.

---

### 🔹 Syntax

```ts 
type Exclude<T, U> = T extends U ? never : T;
```

* `T` → union type to filter
* `U` → type(s) to remove from `T`
* `T extends U ? never : T` → conditional type removes matching members

---

# 🔹 2. Basic Example

```ts 
type Status = "success" | "error" | "loading";

type NonErrorStatus = Exclude<Status, "error">;
```

---

### 🔹 Result

```ts 
type NonErrorStatus = "success" | "loading";
```

* `"error"` is removed from the union
* Remaining members are preserved

---

# 🔹 3. Using `Exclude<T, U>`

```ts 
type Primitive = string | number | boolean;
type NonString = Exclude<Primitive, string>;
```

---

### 🔹 Result

```ts 
type NonString = number | boolean;
```

* `"string"` is removed, leaving only number and boolean

---

# 🔹 4. Why `Exclude<T, U>` is Useful

* Remove unwanted types from a union
* Enforce stricter type constraints
* Create derived types from existing unions without repeating members
* Helps with **type-safe filtering and narrowing**

---

# 🔹 5. Real-World Use Case: Filtering Event Types

```ts 
type EventType = "click" | "hover" | "drag";

type NonHoverEvent = Exclude<EventType, "hover">;

function handleEvent(event: NonHoverEvent) {
  // Only "click" or "drag" allowed
}
```

* Ensures `hover` cannot be passed to `handleEvent`

---

# 🔹 6. Exclude with Multiple Types

```ts 
type Colors = "red" | "green" | "blue";
type PrimaryColors = Exclude<Colors, "green">;
```

### 🔹 Result

```ts 
type PrimaryColors = "red" | "blue";
```

* You can remove multiple members by passing a union as `U`:

```ts 
type NonPrimary = Exclude<Colors, "red" | "blue">; // "green"
```

---

# 🔹 7. Exclude with Built-in Types

```ts 
type Mixed = string | number | null | undefined;
type NonNullableMixed = Exclude<Mixed, null | undefined>; // string | number
```

* Used internally by `NonNullable<T>` utility type

---

# 🔹 8. Exclude vs Extract

* `Exclude<T, U>` → remove types assignable to `U`
* `Extract<T, U>` → keep only types assignable to `U`

```ts 
type A = string | number | boolean;
type B = Exclude<A, string | number>; // boolean
type C = Extract<A, string | number>; // string | number
```

---

# 🔹 9. Common Mistakes

### ❌ Using non-union types

```ts 
type Result = Exclude<string, number>; // string ✅
```

* Only removes members that are assignable, no error
* Works with unions, but with single type it just returns itself if it’s not assignable

### ❌ Forgetting to assign back to a type

* `Exclude` does **not modify the original type**; you must assign it to a new type

---

# 🔹 10. Best Practices

* ✔ Use to filter unwanted union members
* ✔ Combine with `Extract` for more control
* ✔ Use when refining function parameters or API types
* ✔ Useful with `keyof` to remove unwanted keys from objects

---

# 🔹 11. When to Use `Exclude<T, U>`

Use `Exclude` when:

✔ You need a stricter subset of a union type
✔ Removing types that are not valid in a certain context
✔ Filtering out specific keys from `keyof T`
✔ Creating safer, more precise type definitions

---

# 🚀 In Summary

`Exclude<T, U>`:

* Removes types from a union that are assignable to `U`
* Returns a new union type without the excluded members
* Works well with string, number, symbol unions, or any union type
* Often used with `keyof`, function arguments, or conditional types
* A cornerstone utility type for **type-safe union filtering in TypeScript**

> Think of `Exclude<T, U>` as a “subtractive filter” for union types: remove what you don’t want, keep the rest.

---

## 🧩 `Extract<T, U>` in TypeScript — Full Detail

### Keep Only Matching Types from a Union

`Extract<T, U>` is a built-in TypeScript utility type that **constructs a type by extracting from `T` all types that are assignable to `U`**. It’s the counterpart of `Exclude<T, U>`.

---

# 🔹 1. What is `Extract<T, U>`?

`Extract<T, U>` allows you to:

> Select only the members of a union type `T` that are assignable to `U`.

---

### 🔹 Syntax

```ts 
type Extract<T, U> = T extends U ? T : never;
```

* `T` → union type to filter
* `U` → type(s) to retain from `T`
* Conditional type returns only members assignable to `U`

---

# 🔹 2. Basic Example

```ts 
type Status = "success" | "error" | "loading";

type ErrorStatus = Extract<Status, "error">;
```

---

### 🔹 Result

```ts 
type ErrorStatus = "error";
```

* Only `"error"` is retained
* All other members are removed

---

# 🔹 3. Using `Extract<T, U>`

```ts 
type Primitive = string | number | boolean;
type Numeric = Extract<Primitive, number>;
```

---

### 🔹 Result

```ts 
type Numeric = number;
```

* Only `number` remains in the type

---

# 🔹 4. Why `Extract<T, U>` is Useful

* Keep only the types you want from a union
* Enforce stricter type constraints
* Create derived types without repeating union members
* Useful in **conditional types, narrowing, and function parameter filtering**

---

# 🔹 5. Real-World Use Case: Function Parameter Filtering

```ts 
type EventType = "click" | "hover" | "drag";

type MouseEvent = Extract<EventType, "click" | "drag">;

function handleMouseEvent(event: MouseEvent) {
  // Only "click" or "drag" allowed
}
```

* Ensures `"hover"` cannot be passed

---

# 🔹 6. Extract with Multiple Types

```ts 
type Colors = "red" | "green" | "blue";
type PrimaryColors = Extract<Colors, "red" | "blue">;
```

---

### 🔹 Result

```ts 
type PrimaryColors = "red" | "blue";
```

* Only `"red"` and `"blue"` are kept

---

# 🔹 7. Extract with Built-in Types

```ts 
type Mixed = string | number | null | undefined;
type NonNullableMixed = Extract<Mixed, string | number>; // string | number
```

* Similar behavior to `NonNullable<T>`
* Keeps only the non-nullable types

---

# 🔹 8. Extract vs Exclude

| Utility         | Purpose                                    |
| --------------- | ------------------------------------------ |
| `Exclude<T, U>` | Remove types assignable to `U` from `T`    |
| `Extract<T, U>` | Keep only types assignable to `U` from `T` |

```ts 
type A = string | number | boolean;
type B = Exclude<A, string | number>; // boolean
type C = Extract<A, string | number>; // string | number
```

---

# 🔹 9. Common Mistakes

### ❌ Using types not in union

```ts 
type Result = Extract<string, number>; // ❌ no match → never
```

* Returns `never` if nothing matches

### ❌ Forgetting assignment

* Must assign `Extract` to a type; it does not alter the original type

---

# 🔹 10. Best Practices

* ✔ Use to narrow union types for functions or APIs
* ✔ Combine with `keyof` for filtering object keys
* ✔ Use with conditional types for advanced type transformations
* ✔ Often used alongside `Exclude` for fine-grained type control

---

# 🔹 11. When to Use `Extract<T, U>`

Use `Extract` when:

✔ You want to **retain only specific types** from a union
✔ Filtering allowed values for function parameters
✔ Narrowing `keyof` to a subset of keys
✔ Creating derived or restricted types safely

---

# 🚀 In Summary

`Extract<T, U>`:

* Keeps only the types from `T` that are assignable to `U`
* Returns a new union type containing only the matching members
* Works with strings, numbers, symbols, or any union types
* Complementary to `Exclude<T, U>`
* Essential for **type-safe filtering and narrowing of union types**

> Think of `Extract<T, U>` as a “subtractive complement”: you keep only what matches your filter `U`.

---

## 🧩 `NonNullable<T>` in TypeScript — Full Detail

### Remove `null` and `undefined`

`NonNullable<T>` is a built-in utility type in TypeScript that **removes `null` and `undefined` from a type**. It’s extremely useful when working with values that may be optional or nullable but need to be **guaranteed to exist** in a specific context.

---

# 🔹 1. What is `NonNullable<T>`?

`NonNullable<T>` is a utility type that:

> Constructs a type by **excluding `null` and `undefined` from `T`**.

---

### 🔹 Syntax

```ts 
type NonNullable<T> = T extends null | undefined ? never : T;
```

---

👉 It uses a **conditional type** to filter out `null` and `undefined`.

---

# 🔹 2. Basic Example

```ts 
type Value = string | null | undefined;

type SafeValue = NonNullable<Value>;
```

---

### 🔹 Result

```ts 
type SafeValue = string;
```

---

👉 `null` and `undefined` are removed.

---

# 🔹 3. Using `NonNullable<T>`

```ts 
type MaybeNumber = number | null;

type NumberOnly = NonNullable<MaybeNumber>;
```

---

### 🔹 Result

```ts 
type NumberOnly = number;
```

---

# 🔹 4. Why `NonNullable<T>` is Useful

Without it:

❌ You must constantly check for `null` or `undefined`
❌ Code becomes cluttered with safety checks

With it:

✔ Cleaner, safer code
✔ Guarantees value existence
✔ Reduces runtime errors

---

# 🔹 5. Real-World Use Case: Safe Function Input

```ts 
function processValue(value: NonNullable<string | null | undefined>) {
  console.log(value.toUpperCase());
}
```

---

### 🔹 Usage

```ts 
processValue("hello"); // ✅
// processValue(null); // ❌ Error
```

---

👉 Ensures only valid (non-nullable) values are accepted.

---

# 🔹 6. Using with Object Properties

```ts 
type User = {
  id: number;
  name?: string | null;
};
```

```ts 
type UserName = NonNullable<User["name"]>;
```

---

### 🔹 Result

```ts 
type UserName = string;
```

---

👉 Extracts a safe version of a possibly nullable property.

---

# 🔹 7. NonNullable vs Exclude

```ts 
type A = NonNullable<string | null | undefined>;
type B = Exclude<string | null | undefined, null | undefined>;
```

---

👉 Both are equivalent:

```ts 
type A = string;
type B = string;
```

---

👉 In fact, `NonNullable<T>` is implemented using `Exclude` internally.

---

# 🔹 8. Working with Union Types

```ts 
type Mixed = string | number | null | undefined;

type Clean = NonNullable<Mixed>;
```

---

### 🔹 Result

```ts 
type Clean = string | number;
```

---

👉 Keeps all valid types, removes only `null` and `undefined`.

---

# 🔹 9. Using with Function Return Types

```ts 
function getValue(): string | null {
  return Math.random() > 0.5 ? "yes" : null;
}
```

```ts 
type SafeReturn = NonNullable<ReturnType<typeof getValue>>;
```

---

👉 `SafeReturn` becomes `string`.

---

# 🔹 10. Combining with Other Utility Types

### 🔹 NonNullable + Partial

```ts 
type CleanUser = {
  [K in keyof User]: NonNullable<User[K]>;
};
```

---

👉 Removes nullability from all properties.

---

### 🔹 NonNullable + Pick

```ts 
type SafeName = NonNullable<Pick<User, "name">["name"]>;
```

---

# 🔹 11. Common Mistakes

### ❌ Assuming it removes all falsy values

```ts 
NonNullable<string | "" | 0>;
```

---

👉 Result:

```ts 
string | "" | 0
```

---

❗ It **only removes `null` and `undefined`**, NOT:

* `""` (empty string)
* `0`
* `false`

---

### ❌ Using without narrowing at runtime

Even if type is `NonNullable<T>`, you may still need runtime checks depending on context.

---

# 🔹 12. Best Practices

* ✔ Use when you are certain value should not be null
* ✔ Combine with `ReturnType`, `Pick`, etc.
* ✔ Use for safer property access
* ✔ Avoid overusing if null is a valid state

---

# 🔹 13. When to Use `NonNullable<T>`

Use it when:

✔ You want to guarantee a value exists
✔ Cleaning up nullable types
✔ Working with APIs that may return null
✔ Extracting safe types from optional properties
✔ Reducing unnecessary null checks

---

# 🚀 In Summary

`NonNullable<T>`:

* Removes `null` and `undefined` from a type
* Uses conditional types internally
* Equivalent to `Exclude<T, null | undefined>`
* Works with unions, object properties, and return types
* Helps create **safe, predictable, non-nullable values**

👉 It is essential for writing **robust TypeScript code where null safety matters**, especially in APIs, forms, and data processing.

---

## 🧩 `ReturnType<T>` in TypeScript — Full Detail

### Extract the Return Type of a Function

`ReturnType<T>` is a built-in TypeScript utility type that **extracts the return type of a function type `T`**. This allows you to reuse the return type elsewhere without duplicating type definitions.

---

# 🔹 1. What is `ReturnType<T>`?

`ReturnType<T>` is a **conditional type** that:

> Infers the return type of a function type `T`.

---

### 🔹 Syntax

```ts 
type ReturnType<T extends (...args: any) => any> = 
    T extends (...args: any) => infer R ? R : any;
```

* `T` → a function type
* `infer R` → TypeScript infers the return type of the function
* Returns `R` or `any` if it can’t infer

---

# 🔹 2. Basic Example

```ts 
function greet(name: string) {
  return `Hello, ${name}!`;
}

type GreetReturn = ReturnType<typeof greet>;
```

---

### 🔹 Result

```ts 
type GreetReturn = string;
```

* Automatically infers the return type (`string`)
* No need to manually write the return type elsewhere

---

# 🔹 3. Using `ReturnType<T>`

```ts 
function calculateSum(a: number, b: number) {
  return a + b;
}

type SumReturn = ReturnType<typeof calculateSum>;
```

---

### 🔹 Result

```ts 
type SumReturn = number;
```

* Type is inferred from the function return

---

# 🔹 4. Why `ReturnType<T>` is Useful

* Avoid duplicating type definitions
* Makes code DRY (Don’t Repeat Yourself)
* Ensures consistency between function return and dependent types
* Works with higher-order functions or API return types

---

# 🔹 5. Real-World Use Case: API Response Typing

```ts 
async function fetchUser() {
  return { id: 1, name: "Alice" };
}

type UserResponse = ReturnType<typeof fetchUser>;
// UserResponse = Promise<{ id: number; name: string }>
```

---

### 🔹 Extracting resolved type of Promise

```ts 
type User = Awaited<ReturnType<typeof fetchUser>>;
// User = { id: number; name: string }
```

* Combines with `Awaited` to get the actual value from a Promise

---

# 🔹 6. Using with Function Types

```ts 
type Adder = (x: number, y: number) => number;

type AdderReturn = ReturnType<Adder>; // number
```

* Works even if the function type is declared as a type alias

---

# 🔹 7. Using with Generics

```ts 
function identity<T>(value: T) {
  return value;
}

type IdentityReturn<T> = ReturnType<typeof identity<T>>; // ❌ Error
```

* ❗ `ReturnType` **cannot be used with generic functions directly**
* You must either specify a concrete type or wrap in another generic:

```ts 
type IdentityReturnType<T> = T;
```

---

# 🔹 8. Comparison with `typeof`

* `ReturnType<typeof fn>` extracts the return type dynamically
* `typeof` alone only gives the function type, not the return type

```ts 
type FuncType = typeof greet;  // (name: string) => string
type FuncReturn = ReturnType<typeof greet>; // string
```

---

# 🔹 9. Common Mistakes

### ❌ Non-function type

```ts 
type R = ReturnType<string>; // ❌ Error: Type 'string' does not satisfy the constraint
```

* `ReturnType` only works on functions

### ❌ Generic functions without concrete type

* TypeScript cannot infer the generic type automatically

---

# 🔹 10. Best Practices

* ✔ Use `ReturnType` to avoid repeating return type annotations
* ✔ Combine with `Awaited` for async functions
* ✔ Useful in higher-order functions and utility functions
* ✔ Keeps code consistent when refactoring function return types

---

# 🔹 11. When to Use `ReturnType<T>`

Use `ReturnType` when:

✔ You need the type of a function’s return elsewhere
✔ Avoiding manual type duplication
✔ Working with APIs or library functions
✔ Extracting types from third-party functions
✔ Building generic utility types based on function returns

---

# 🚀 In Summary

`ReturnType<T>`:

* Extracts the return type from a function type `T`
* Uses conditional types and `infer` under the hood
* Works with function declarations, expressions, and type aliases
* Essential for **DRY and type-safe TypeScript code**, especially with async functions or API responses

> Think of `ReturnType<T>` as a type-level “peek inside the function” to see exactly what it returns, so you can reuse it safely elsewhere.

---

## 🧩 `Parameters<T>` in TypeScript — Full Detail

### Extract Function Parameter Types

`Parameters<T>` is a built-in TypeScript utility type that **extracts the parameter types of a function type `T` as a tuple type**. It is the counterpart to `ReturnType<T>`.

---

# 🔹 1. What is `Parameters<T>`?

`Parameters<T>` allows you to:

> Take a function type and extract all of its parameter types into a tuple.

---

### 🔹 Syntax

```ts 
type Parameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;
```

* `T` → function type
* `infer P` → infers parameter list as a tuple
* Returns `P` (tuple of parameters)

---

# 🔹 2. Basic Example

```ts 
function greet(name: string, age: number) {
  return `Hello ${name}, age ${age}`;
}

type GreetParams = Parameters<typeof greet>;
```

---

### 🔹 Result

```ts 
type GreetParams = [string, number];
```

* Parameters are captured as a **tuple type**

---

# 🔹 3. Using `Parameters<T>`

```ts 
function add(a: number, b: number): number {
  return a + b;
}

type AddParams = Parameters<typeof add>;
```

---

### 🔹 Result

```ts 
type AddParams = [number, number];
```

---

# 🔹 4. Why `Parameters<T>` is Useful

* Avoid repeating function parameter types
* Useful for higher-order functions
* Helps in building wrappers, decorators, and utilities
* Ensures consistency between original function and reused parameters

---

# 🔹 5. Real-World Use Case: Function Wrapper

```ts 
function logFunction<F extends (...args: any) => any>(fn: F) {
  return (...args: Parameters<F>) => {
    console.log("Arguments:", args);
    return fn(...args);
  };
}
```

---

### 🔹 Usage

```ts 
const sum = (a: number, b: number) => a + b;

const loggedSum = logFunction(sum);

loggedSum(1, 2);
```

---

👉 Ensures wrapper function has the **same parameters as original function**

---

# 🔹 6. Parameters with Multiple Function Types

```ts 
type Fn = (x: string, y: boolean) => number;

type FnParams = Parameters<Fn>;
```

---

### 🔹 Result

```ts 
type FnParams = [string, boolean];
```

---

# 🔹 7. Using with `apply` or `call`

```ts 
function multiply(a: number, b: number) {
  return a * b;
}

function invoke<F extends (...args: any) => any>(
  fn: F,
  ...args: Parameters<F>
) {
  return fn(...args);
}
```

---

👉 Ensures safe function invocation

---

# 🔹 8. Combining with `ReturnType`

```ts 
function format(name: string, age: number) {
  return `${name} is ${age}`;
}

type Params = Parameters<typeof format>;
type Result = ReturnType<typeof format>;
```

---

👉 Now you have both input and output types safely extracted.

---

# 🔹 9. Using with Generic Functions

```ts 
function identity<T>(value: T) {
  return value;
}

type P = Parameters<typeof identity>; // ❌ Error in inference
```

---

⚠️ Note:

* Generic functions may not infer parameters as expected
* You often need a concrete function type for full accuracy

---

# 🔹 10. Common Mistakes

### ❌ Using on non-function types

```ts 
type X = Parameters<string>; // ❌ Error
```

* Only works on function types

---

### ❌ Assuming return type instead of tuple

```ts 
type Wrong = Parameters<typeof greet>; 
// NOT string | number — it's [string, number]
```

---

# 🔹 11. Best Practices

* ✔ Use for wrappers, decorators, and higher-order functions
* ✔ Combine with `ReturnType` for full function typing
* ✔ Use tuple spreading when forwarding arguments
* ✔ Keep function signatures DRY and reusable

---

# 🔹 12. When to Use `Parameters<T>`

Use `Parameters` when:

✔ You want to reuse function arguments
✔ Building function wrappers or middleware
✔ Creating logging, caching, or instrumentation utilities
✔ Ensuring type-safe forwarding of arguments

---

# 🚀 In Summary

`Parameters<T>`:

* Extracts function parameter types as a tuple
* Uses `infer` internally to capture arguments
* Ensures safe reuse of function signatures
* Works well with higher-order functions and wrappers
* Complements `ReturnType<T>` for full function typing

> Think of `Parameters<T>` as a way to “copy the input signature” of a function safely at the type level, enabling powerful reusable abstractions in TypeScript.

---

## 🧩 `InstanceType<T>` in TypeScript — Full Detail

### Extract the Instance Type of a Class

`InstanceType<T>` is a built-in TypeScript utility type that **extracts the type of an instance created by a constructor function or class type `T`**. This is useful when you want the type of objects created by `new` without manually declaring it.

---

# 🔹 1. What is `InstanceType<T>`?

`InstanceType<T>` allows you to:

> Obtain the type of an object that would be returned by `new T()`.

---

### 🔹 Syntax

```ts 
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

* `T` → constructor function type or class
* `infer R` → infers the instance type returned by `new T()`
* Returns the instance type `R`

---

# 🔹 2. Basic Example

```ts 
class User {
  constructor(public name: string, public age: number) {}
}

type UserInstance = InstanceType<typeof User>;
```

---

### 🔹 Result

```ts 
type UserInstance = User;
```

* `UserInstance` is the type of the object created by `new User(...)`

---

# 🔹 3. Using `InstanceType<T>`

```ts 
class Point {
  constructor(public x: number, public y: number) {}
}

type PointInstance = InstanceType<typeof Point>;
```

---

### 🔹 Result

```ts 
type PointInstance = Point;
```

* Equivalent to manually writing `type PointInstance = Point`

---

# 🔹 4. Why `InstanceType<T>` is Useful

* Avoid repeating class names in type annotations
* Useful for **factory functions** that return class instances
* Helps in **generic programming with class constructors**
* Ensures consistent typing when class names change

---

# 🔹 5. Real-World Use Case: Factory Function

```ts 
function createInstance<C extends new (...args: any) => any>(
  ctor: C,
  ...args: ConstructorParameters<C>
): InstanceType<C> {
  return new ctor(...args);
}

class Animal {
  constructor(public species: string) {}
}

const cat = createInstance(Animal, "Cat");
```

---

### 🔹 Type Safety

```ts 
cat.species; // ✅ string
```

* TypeScript knows `cat` is an `Animal` instance

---

# 🔹 6. Using with Abstract Classes

```ts 
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area() { return Math.PI * this.radius ** 2; }
}

type CircleInstance = InstanceType<typeof Circle>; // Circle
```

* Works with non-abstract classes only; abstract class itself cannot be instantiated

---

# 🔹 7. Combining with `ConstructorParameters<T>`

```ts 
type CircleParams = ConstructorParameters<typeof Circle>; // [radius: number]
type CircleObj = InstanceType<typeof Circle>; // Circle
```

* `ConstructorParameters` extracts constructor args
* `InstanceType` extracts the resulting object type

---

# 🔹 8. Common Mistakes

### ❌ Using on non-class types

```ts 
type T = InstanceType<number>; // ❌ Error
```

* Only works with **constructable types** (`new` signature)

### ❌ Abstract class itself

```ts 
type ShapeInstance = InstanceType<typeof Shape>; // ❌ Error
```

* Abstract classes cannot be instantiated

---

# 🔹 9. Best Practices

* ✔ Use with generic factory functions
* ✔ Combine with `ConstructorParameters` for full constructor typing
* ✔ Avoid using on non-class types
* ✔ Useful for type-safe dependency injection

---

# 🔹 10. When to Use `InstanceType<T>`

Use `InstanceType` when:

✔ You want to get the type of a class instance programmatically
✔ Building generic factories or utilities
✔ Ensuring consistency between constructor and created objects
✔ Avoiding repetitive type declarations
✔ Working with dynamic class constructors

---

# 🚀 In Summary

`InstanceType<T>`:

* Extracts the type of an object returned by `new T()`
* Uses conditional types and `infer` internally
* Works with class constructors or constructor signatures
* Essential for **generic factories, type-safe instantiation, and dependency injection**
* Avoids manual duplication of class instance types

> Think of `InstanceType<T>` as a type-level way to say: “give me the object type that this class constructor produces.”

---

## 🧩 `Awaited<T>` in TypeScript — Full Detail

### Unwrap Promise Types

`Awaited<T>` is a built-in TypeScript utility type that **extracts the type that a `Promise` resolves to**. It’s essential for working with async functions and promises, especially when you want the type of the resolved value.

---

# 🔹 1. What is `Awaited<T>`?

`Awaited<T>` allows you to:

> Obtain the type that a promise resolves to, recursively unwrapping nested promises.

---

### 🔹 Syntax

```ts 
type Awaited<T> =
  T extends null | undefined ? T :
  T extends object & { then(onfulfilled: infer F, ...args: any): any } ?
    F extends (value: infer V, ...args: any) => any ? Awaited<V> : never :
  T;
```

* Handles nested promises (`Promise<Promise<T>>`)
* Recursively unwraps until the final resolved type

---

# 🔹 2. Basic Example

```ts 
type Result = Awaited<Promise<string>>;
```

### 🔹 Result

```ts 
type Result = string;
```

* Extracts the resolved type from the promise

---

# 🔹 3. Nested Promises

```ts 
type Nested = Promise<Promise<number>>;

type Unwrapped = Awaited<Nested>;
```

### 🔹 Result

```ts 
type Unwrapped = number;
```

* Recursively unwraps all layers of promises

---

# 🔹 4. Using with Async Functions

```ts 
async function fetchUser() {
  return { id: 1, name: "Alice" };
}

type UserType = Awaited<ReturnType<typeof fetchUser>>;
```

### 🔹 Result

```ts 
type UserType = { id: number; name: string };
```

* Combines `ReturnType` and `Awaited` to get the resolved value of an async function

---

# 🔹 5. Why `Awaited<T>` is Useful

* Works with **Promise-returning functions**
* Handles **nested promises** automatically
* Useful in **generic utilities** and **type-safe async code**
* Eliminates the need to manually infer the resolved type

---

# 🔹 6. Real-World Use Case: Async Wrapper

```ts 
function wrapAsync<T extends (...args: any) => Promise<any>>(fn: T) {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const result = await fn(...args);
    return result;
  };
}
```

* The wrapper maintains the **exact resolved type** of the original async function

---

# 🔹 7. Non-Promise Values

```ts 
type Value = Awaited<string>;
```

### 🔹 Result

```ts 
type Value = string;
```

* `Awaited` works on non-promise types and returns the type itself

---

# 🔹 8. Combining with Generics

```ts 
type AsyncResult<T extends Promise<any>> = Awaited<T>;
```

* Ensures any generic promise resolves to the correct type

---

# 🔹 9. Common Mistakes

### ❌ Assuming it unwraps all thenable objects

* Works for **actual Promises or thenable objects**
* Custom objects without `.then` will not be unwrapped

### ❌ Using on non-promise types unnecessarily

```ts 
type X = Awaited<number>; // ✅ Still works: number
```

* Safe, but unnecessary if you already have a non-promise type

---

# 🔹 10. Best Practices

* ✔ Use with `ReturnType` for async functions
* ✔ Combine with `Parameters` for wrappers
* ✔ Handle nested promises automatically
* ✔ Avoid overuse on already resolved types

---

# 🔹 11. When to Use `Awaited<T>`

Use `Awaited` when:

✔ Extracting the resolved type of a promise
✔ Building generic async utilities
✔ Working with nested promises
✔ Typing async API responses
✔ Ensuring type safety in `await` expressions

---

# 🚀 In Summary

`Awaited<T>`:

* Unwraps the resolved type from a promise (`Promise<T>` → `T`)
* Handles nested promises recursively
* Works with async functions and generic utilities
* Ensures type-safe operations on the value returned by `await`
* Can be combined with `ReturnType` and `Parameters` for full async type safety

> Think of `Awaited<T>` as the **type-level `await` operator**, giving you exactly the type that `await` would produce at runtime.

---

## 🧩 String Utility Types in TypeScript — Full Detail

TypeScript provides several **string-focused utility types** to manipulate and extract string literal types at the type level. These types are extremely useful for **type-safe transformations and constraints**.

---

# 🔹 1. `Uppercase<S>` — Convert to Uppercase

Converts all letters in a string literal type to uppercase.

```ts 
type Greeting = "hello world";
type UpperGreeting = Uppercase<Greeting>;
```

### 🔹 Result

```ts
type UpperGreeting = "HELLO WORLD";
```

* Works only with **string literal types**, not general `string`.

---

# 🔹 2. `Lowercase<S>` — Convert to Lowercase

Converts all letters in a string literal type to lowercase.

```ts 
type Shout = "HELLO";
type Whisper = Lowercase<Shout>;
```

### 🔹 Result

```ts
type Whisper = "hello";
```

---

# 🔹 3. `Capitalize<S>` — Capitalize First Letter

Capitalizes the **first character** of a string literal type.

```ts 
type word = "hello";
type capitalized = Capitalize<word>;
```

### 🔹 Result

```ts
type capitalized = "Hello";
```

* Only affects the first character; rest of the string remains the same.

---

# 🔹 4. `Uncapitalize<S>` — Lowercase First Letter

Lowercases the **first character** of a string literal type.

```ts 
type Name = "World";
type smallName = Uncapitalize<Name>;
```

### 🔹 Result

```ts
type smallName = "world";
```

---

# 🔹 5. Combining String Utilities

You can **chain these types** for complex transformations.

```ts 
type MyString = "hello world";
type Transformed = Capitalize<Lowercase<MyString>>;
```

### 🔹 Result

```ts
type Transformed = "Hello world";
```

* Useful for formatting API response keys, generating type-safe constants, or normalizing string types.

---

# 🔹 6. Use Cases

1. **API Response Normalization**

   ```ts
   type ApiKey = "USER_ID";
   type NormalizedKey = Lowercase<ApiKey>; // "user_id"
   ```

2. **Dynamic Keys in Mapped Types**

   ```ts
   type Keys = "firstName" | "lastName";
   type UpperKeys = Uppercase<Keys>; // "FIRSTNAME" | "LASTNAME"
   ```

3. **Creating Consistent Event Names**

   ```ts
   type Event = "click" | "hover";
   type CapitalizedEvent = Capitalize<Event>; // "Click" | "Hover"
   ```

---

# 🔹 7. Limitations

* Works **only with string literals**, not general `string` or `string | number`.
* Cannot transform runtime string values; purely **type-level**.
* Does not perform **complex manipulations** (like substring or replace) — you’d need template literal types for that.

---

# 🔹 8. Chaining with Template Literal Types

String utilities can be combined with **template literals** for dynamic type generation:

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">; // "onClick"
type HoverEvent = EventName<"hover">; // "onHover"
```

* Extremely powerful for building **type-safe event handlers**, API routes, or Redux action types.

---

# 🔹 9. Summary Table

| Utility Type      | Effect                           | Example               |
| ----------------- | -------------------------------- | --------------------- |
| `Uppercase<S>`    | Convert all letters to uppercase | `"hello"` → `"HELLO"` |
| `Lowercase<S>`    | Convert all letters to lowercase | `"HELLO"` → `"hello"` |
| `Capitalize<S>`   | Uppercase first character        | `"hello"` → `"Hello"` |
| `Uncapitalize<S>` | Lowercase first character        | `"World"` → `"world"` |

---

# 🚀 Summary

String Utility Types in TypeScript:

* Provide **type-level string transformations**
* Useful for **type-safe constants, API keys, and event names**
* Combine well with **template literal types** for dynamic type generation
* Limited to **literal types**, not runtime strings

> Think of these as **compile-time string manipulators** that make your type definitions cleaner, safer, and more expressive.

---

## 🧩 Combining Utility Types in TypeScript — Full Detail

### Building Powerful Types by Composing Utilities

One of the most powerful features of TypeScript is that **utility types are composable**. Instead of using them in isolation, you can combine multiple utilities to create **precise, reusable, and highly expressive types**.

---

# 🔹 1. What Does “Combining Utility Types” Mean?

It means:

> Using multiple built-in utility types together (like `Partial`, `Pick`, `Omit`, `Readonly`, `Record`, `NonNullable`, etc.) to build a new, refined type.

---

### 🔹 Why it matters

* Avoids repetitive type definitions
* Enables advanced type transformations
* Keeps code DRY (Don’t Repeat Yourself)
* Improves type safety and clarity

---

# 🔹 2. Basic Composition Example

```ts 
type User = {
  id: number;
  name: string;
  email?: string;
  age?: number;
};
```

---

### 🔹 Combine `Pick` + `Readonly`

```ts 
type SafeUser = Readonly<Pick<User, "id" | "name">>;
```

### 🔹 Result

```ts 
{
  readonly id: number;
  readonly name: string;
}
```

👉 Only selected fields, and they are immutable.

---

# 🔹 3. Combine `Omit` + `Partial`

```ts 
type EditableUser = Partial<Omit<User, "id">>;
```

### 🔹 Result

```ts 
{
  name?: string;
  email?: string;
  age?: number;
}
```

👉 `id` is removed, remaining fields are optional.

---

# 🔹 4. Combine `NonNullable` + `Pick`

```ts 
type CleanEmail = NonNullable<Pick<User, "email">["email"]>;
```

### 🔹 Result

```ts 
type CleanEmail = string;
```

👉 Ensures `email` is always a valid string (no null/undefined).

---

# 🔹 5. Combine `Record` + `Readonly`

```ts 
type Role = "admin" | "user";

type Permissions = Readonly<Record<Role, boolean>>;
```

### 🔹 Result

```ts 
{
  readonly admin: boolean;
  readonly user: boolean;
}
```

👉 Immutable lookup table.

---

# 🔹 6. Combine `Partial` + `Record`

```ts 
type FeatureFlags = Partial<Record<"darkMode" | "beta" | "ads", boolean>>;
```

### 🔹 Result

```ts 
{
  darkMode?: boolean;
  beta?: boolean;
  ads?: boolean;
}
```

👉 Useful for optional configuration objects.

---

# 🔹 7. Combine `Extract` + `Exclude`

```ts 
type AllEvents = "click" | "hover" | "scroll" | "drag";

type MouseEvents = Extract<AllEvents, "click" | "hover">;
type OtherEvents = Exclude<AllEvents, "click" | "hover">;
```

👉 Splits a union into meaningful subsets.

---

# 🔹 8. Combine `ReturnType` + `Awaited`

```ts 
async function fetchUser() {
  return { id: 1, name: "Alice" };
}

type UserType = Awaited<ReturnType<typeof fetchUser>>;
```

### 🔹 Result

```ts 
{
  id: number;
  name: string;
}
```

👉 Extracts resolved async return type.

---

# 🔹 9. Combine `Parameters` + `NonNullable`

```ts 
function log(message?: string) {}

type SafeParams = NonNullable<Parameters<typeof log>[0]>;
```

### 🔹 Result

```ts 
string
```

👉 Ensures parameter is not undefined/null.

---

# 🔹 10. Combine Multiple Utility Types

```ts 
type AdvancedUser =
  Readonly<
    Partial<
      Omit<
        User,
        "id"
      >
    >
  >;
```

### 🔹 Result

```ts 
{
  readonly name?: string;
  readonly email?: string;
  readonly age?: number;
}
```

👉 Step-by-step transformation:

1. Remove `id`
2. Make remaining fields optional
3. Make everything readonly

---

# 🔹 11. Real-World Pattern: API DTO Transformation

```ts 
type UserDTO = Readonly<
  Omit<
    Required<User>,
    "password"
  >
>;
```

👉 Ensures:

* All fields required first
* Password removed
* Object becomes immutable

---

# 🔹 12. Why Combining Utilities is Powerful

✔ Reduces duplication
✔ Enables reusable type building blocks
✔ Improves readability in complex systems
✔ Allows safe transformation of data models
✔ Encourages declarative type design

---

# 🔹 13. Common Mistakes

### ❌ Over-nesting utilities

```ts 
Readonly<Partial<Omit<Required<User>, "id">>>
```

* Hard to read and maintain
* Prefer breaking into intermediate types

---

### ❌ Assuming runtime behavior

* Utility types exist **only at compile time**
* They do not modify actual JavaScript objects

---

# 🔹 14. Best Practices

* ✔ Break complex combinations into named types
* ✔ Prefer readability over extreme nesting
* ✔ Reuse combinations across the codebase
* ✔ Combine utilities intentionally, not excessively
* ✔ Document complex composed types

---

# 🚀 In Summary

Combining Utility Types:

* Lets you **compose powerful type transformations**
* Works like building blocks for advanced TypeScript design
* Includes combinations like `Partial`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`, etc.
* Enables highly expressive and reusable type systems
* Must be balanced with readability and maintainability

> Think of utility type composition as “Lego blocks for types” — each piece is simple, but together they create very powerful structures.

---

## 🧩 What are `T`, `K`, `U`, `V` in TypeScript? — Full Detail

### Generic Type Variables Explained Clearly

In TypeScript, symbols like `T`, `K`, `U`, and `V` are **generic type parameters**. They are placeholders for types, similar to how function parameters are placeholders for values.

They are not special keywords — they are just **conventions used to make generics readable and consistent**.

---

# 🔹 1. What are these symbols?

```ts 
function identity<T>(value: T): T {
  return value;
}
```

Here:

* `T` is a **type variable**
* It represents “any type passed in”

---

### 🔹 Meaning in simple terms

| Symbol | Meaning (Convention)      |
| ------ | ------------------------- |
| `T`    | Type (most common)        |
| `K`    | Key                       |
| `U`    | Union / second type       |
| `V`    | Value / second value type |

---

# 🔹 2. `T` — Type (Most Common Generic)

`T` stands for **Type** and is the default placeholder.

```ts 
function wrap<T>(value: T): T[] {
  return [value];
}
```

### 🔹 Example usage

```ts 
wrap<number>(10); // number[]
wrap<string>("hi"); // string[]
```

👉 `T` adapts to whatever type is passed.

---

# 🔹 3. `K` — Key Type

`K` is commonly used for **object keys**.

```ts 
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

### 🔹 Example

```ts 
const user = { id: 1, name: "Alice" };

getProperty(user, "name"); // OK
getProperty(user, "id");   // OK
// getProperty(user, "age"); // ❌ Error
```

👉 `K` ensures only valid keys of `T` are allowed.

---

# 🔹 4. `U` — Union or Second Type

`U` is often used when a second type is needed, especially in unions or transformations.

### 🔹 Example: Exclude

```ts 
type Result = Exclude<"a" | "b" | "c", "a">;
```

Internally:

```ts 
type Exclude<T, U> = T extends U ? never : T;
```

* `T` = full union
* `U` = type to remove

---

### 🔹 Example function

```ts 
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}
```

---

# 🔹 5. `V` — Value Type (Second Output Type)

`V` is often used for:

* return types
* mapped value types
* second generic output

### 🔹 Example

```ts 
type Pair<K, V> = {
  key: K;
  value: V;
};
```

---

### 🔹 Usage

```ts 
const pair: Pair<string, number> = {
  key: "age",
  value: 30
};
```

👉 `K` = key type, `V` = value type

---

# 🔹 6. How These Work Together

```ts 
function mapObject<T, K extends keyof T, V>(
  obj: T,
  transform: (value: T[K], key: K) => V
): Record<K, V> {
  const result = {} as Record<K, V>;

  for (const key in obj) {
    result[key] = transform(obj[key], key);
  }

  return result;
}
```

### 🔹 Meaning

* `T` → original object
* `K` → keys of object
* `V` → transformed value type

---

# 🔹 7. Why These Names Exist

They are **not required by TypeScript**, but they are conventions:

| Convention | Reason                          |
| ---------- | ------------------------------- |
| `T`        | Default generic type            |
| `K`        | Key of object                   |
| `V`        | Value type                      |
| `U`        | Second type (union/helper type) |
| `R`        | Return type                     |
| `E`        | Element type (arrays)           |

---

# 🔹 8. Common Patterns Using These

### 🔹 Array Element Type

```ts 
type First<T> = T extends (infer E)[] ? E : never;
```

---

### 🔹 Key-Value Mapping

```ts 
type Dict<K extends string, V> = {
  [P in K]: V;
};
```

---

### 🔹 Function with Multiple Types

```ts 
function combine<T, U, V>(a: T, b: U, c: V): T & U & V {
  return Object.assign({}, a, b, c);
}
```

---

# 🔹 9. Important Insight

These are just **labels**, not special behavior:

```ts
<T>   // could also be <Type>
<K>   // could be <Key>
<U>   // could be <Second>
<V>   // could be <Value>
```

👉 This also works:

```ts 
function identity<Type>(value: Type): Type {
  return value;
}
```

---

# 🔹 10. Best Practices

* ✔ Use `T`, `K`, `V`, `U` for readability
* ✔ Choose meaningful names for complex generics

  * Example: `TData`, `TKey`, `TValue`
* ✔ Keep consistency across codebase
* ✔ Use `K` only for object keys (`keyof T`)
* ✔ Avoid overusing single-letter generics in large APIs

---

# 🚀 In Summary

* `T`, `K`, `U`, `V` are **generic type variables**
* They act as placeholders for types
* They are **conventions, not rules**
* They help make TypeScript generics readable and reusable

👉 Think of them like:

* `T` = “Type”
* `K` = “Key”
* `V` = “Value”
* `U` = “Second Type”

> They are the building blocks of TypeScript’s type system — enabling reusable, flexible, and strongly typed code.


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

**[Day 16 — Mapped Types →](../Day-16-Mapped-Types/)**
