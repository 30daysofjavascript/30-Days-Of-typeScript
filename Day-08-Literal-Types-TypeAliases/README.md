# 📘 Day 08 — Literal Types & Type Aliases

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Literal types — exact values as types ("north" | "south" | 1 | 2)
- How const vs let affects literal inference (widening)
- Type aliases for primitives, unions, functions, and objects
- as const assertion for preserving literal types
- satisfies operator (TypeScript 4.9+)
- Branded/opaque types for type-safe IDs
- Recursive type aliases (JSON type, linked lists, trees)
- Template literal types preview

---

## 🎯 Literal Types in TypeScript — Full Detail

Literal types allow you to define a type that represents **exact values instead of general categories**. Instead of saying a value is a `string` or `number`, you can restrict it to specific allowed values like `"north"`, `"south"`, `1`, or `2`.

This makes your code more **strict, predictable, and error-resistant**.

---

## 🔹 1. What Are Literal Types?

A literal type is a type that represents **one exact value**.

---

### 🔹 Example

```ts id="a1b2c3"
let direction: "north";
```

👉 Here, `direction` can ONLY be `"north"`.

---

## 🔹 2. String Literal Types

```ts id="d4e5f6"
type Direction = "north" | "south" | "east" | "west";
```

---

### 🔹 Usage

```ts id="g7h8i9"
let move: Direction;

move = "north"; // ✔ valid
move = "south"; // ✔ valid
// move = "up"; ❌ Error
```

---

## 🔹 3. Number Literal Types

```ts id="j1k2l3"
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
```

---

### 🔹 Usage

```ts id="m1n2o3"
let roll: Dice;

roll = 3; // ✔ valid
roll = 6; // ✔ valid
// roll = 7; ❌ Error
```

---

## 🔹 4. Boolean Literal Types

Boolean literals are less common but still possible.

```ts id="p1q2r3"
type IsEnabled = true;
```

👉 This means the value can ONLY be `true`.

---

## 🔹 5. Literal Types in Functions

```ts id="q3r4s5"
function setDirection(dir: "left" | "right") {
  console.log(dir);
}
```

---

### 🔹 Usage

```ts id="t1u2v3"
setDirection("left");
setDirection("right");
// setDirection("up"); ❌ Error
```

---

## 🔹 6. Why Literal Types Are Useful

Literal types help you:

* Restrict values to a fixed set
* Prevent invalid inputs
* Improve autocomplete
* Make APIs safer and self-documenting
* Replace “magic strings/numbers”

---

## 🔹 7. Literal Types in Objects

```ts id="v1w2x3"
type Car = {
  type: "electric" | "petrol" | "diesel";
};
```

---

### 🔹 Usage

```ts id="y1z2a3"
const myCar: Car = {
  type: "electric"
};
```

---

## 🔹 8. Literal Types in Arrays (Union Literals)

```ts id="b1c2d3"
type Colors = "red" | "green" | "blue";

let colorList: Colors[];
```

---

### 🔹 Usage

```ts id="e1f2g3"
colorList = ["red", "blue", "green"];
```

---

## 🔹 9. Literal Types with `as const`

The `as const` assertion converts values into **readonly literal types**.

---

### 🔹 Example

```ts id="h1i2j3"
const directions = ["north", "south", "east", "west"] as const;
```

---

### 🔹 Result Type

```ts id="k1l2m3"
readonly ["north", "south", "east", "west"]
```

---

## 🔹 10. Literal Types in Real-World APIs

```ts id="n1o2p3"
type Status = "loading" | "success" | "error";

function handleStatus(status: Status) {
  if (status === "success") {
    console.log("Done!");
  }
}
```

---

## 🔹 11. Discriminated Literal Types (Very Important)

Literal types are widely used in **discriminated unions**.

---

### 🔹 Example

```ts id="q1r2s3"
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

```ts id="t3u4v5"
function handle(res: Response) {
  if (res.status === "success") {
    console.log(res.data);
  } else {
    console.log(res.message);
  }
}
```

---

## 🔹 12. Literal Types vs General Types

| Feature      | Literal Types         | General Types |
| ------------ | --------------------- | ------------- |
| Flexibility  | Low (strict values)   | High          |
| Safety       | Very high             | Moderate      |
| Autocomplete | Excellent             | Basic         |
| Use case     | Fixed options, states | General data  |

---

## 🔹 13. Common Mistakes

### ❌ Using wrong value

```ts id="f1g2h3"
type Direction = "north" | "south";

let d: Direction = "up"; // ❌ Error
```

---

### ❌ Confusing string type with literal type

```ts id="i1j2k3"
let name: string = "Alice"; // any string allowed
let role: "admin" = "admin"; // only admin allowed
```

---

## 🔹 14. Best Practices

* ✔ Use literal types for fixed sets of values
* ✔ Prefer union of literals over plain strings
* ✔ Combine with discriminated unions for scalability
* ✔ Use `as const` for constant configurations
* ✔ Avoid overusing literals where flexibility is needed

---

## 🚀 In Summary

Literal types in TypeScript:

* Represent exact values like `"north"`, `1`, or `"success"`
* Restrict variables to a fixed set of allowed values
* Improve safety, readability, and autocomplete
* Are widely used in APIs, states, and configuration systems

👉 They are essential for building **strict, predictable, and error-proof TypeScript applications**.

---

## 📌 How `const` vs `let` Affects Literal Inference (Widening) in TypeScript — Full Detail

TypeScript doesn’t just look at values — it also decides **how specific (literal) or general (widened) a type should be**. One of the biggest factors affecting this is whether you use `const` or `let`.

This behavior is called **type widening**.

---

## 🔹 1. What is Type Widening?

Type widening is when TypeScript **expands a literal type into a broader type**.

---

### 🔹 Example

```ts id="a1b2c3"
let x = "hello";
```

👉 TypeScript infers:

```ts id="d4e5f6"
string
```

Instead of:

```ts id="g7h8i9"
"hello"
```

---

## 🔹 2. How `let` Affects Inference

Variables declared with `let` are **mutable**, meaning their value can change.

So TypeScript assumes:

> “This value might change later → use a general type.”

---

### 🔹 Example

```ts id="j1k2l3"
let direction = "north";
```

### 🔹 Inferred type:

```ts id="m1n2o3"
string
```

---

### 🔹 Why?

Because you can later do:

```ts id="p1q2r3"
direction = "south";
```

So TypeScript avoids locking it to `"north"`.

---

## 🔹 3. How `const` Affects Inference

Variables declared with `const` are **immutable bindings** (cannot be reassigned).

So TypeScript assumes:

> “This value will never change → keep it as a literal type.”

---

### 🔹 Example

```ts id="q3r4s5"
const direction = "north";
```

### 🔹 Inferred type:

```ts id="t1u2v3"
"north"
```

---

## 🔹 4. Key Difference (Core Idea)

| Keyword | Type Inference Result  | Reason           |
| ------- | ---------------------- | ---------------- |
| `let`   | widened type (string)  | value may change |
| `const` | literal type ("north") | value is fixed   |

---

## 🔹 5. Literal Widening in Numbers and Booleans

### 🔹 `let`

```ts id="v1w2x3"
let num = 10;
```

👉 Type:

```ts id="y1z2a3"
number
```

---

### 🔹 `const`

```ts id="b1c2d3"
const num = 10;
```

👉 Type:

```ts id="e1f2g3"
10
```

---

## 🔹 6. Boolean Example

### 🔹 `let`

```ts id="h1i2j3"
let isActive = true;
```

👉 Type:

```ts id="k1l2m3"
boolean
```

---

### 🔹 `const`

```ts id="n1o2p3"
const isActive = true;
```

👉 Type:

```ts id="q1r2s3"
true
```

---

## 🔹 7. Why This Matters

Literal inference affects:

* Union types
* Autocomplete
* API safety
* Type narrowing
* Discriminated unions

---

## 🔹 8. Problem With `let` (Loss of Precision)

```ts id="t3u4v5"
let status = "success";
```

👉 Becomes:

```ts id="w1x2y3"
string
```

So this becomes invalid:

```ts id="z1a2b3"
type Status = "success" | "error";

let status: Status = status; // ❌ loses literal precision
```

---

## 🔹 9. Fixing Widening with `as const`

You can prevent widening using `as const`.

---

### 🔹 Example

```ts id="c1d2e3"
const status = "success" as const;
```

👉 Type:

```ts id="f1g2h3"
"success"
```

---

## 🔹 10. Arrays and Widening Behavior

### 🔹 With `let`

```ts id="i1j2k3"
let colors = ["red", "blue"];
```

👉 Type:

```ts id="string[]"
```

---

### 🔹 With `const`

```ts id="l1m2n3"
const colors = ["red", "blue"];
```

👉 Still:

```ts id="string[]"
```

⚠️ Because arrays are mutable, TypeScript still widens elements.

---

### 🔹 Fix with `as const`

```ts id="o1p2q3"
const colors = ["red", "blue"] as const;
```

👉 Type:

```ts id="readonly ["red", "blue"]"
```

---

## 🔹 11. Object Widening

### 🔹 With `let`

```ts id="r1s2t3"
let config = {
  mode: "dev"
};
```

👉 Type:

```ts id="string"
```

---

### 🔹 With `const`

```ts id="u1v2w3"
const config = {
  mode: "dev"
};
```

👉 Type:

```ts id="{ mode: string }"
```

Still widened inside object.

---

### 🔹 With `as const`

```ts id="x1y2z3"
const config = {
  mode: "dev"
} as const;
```

👉 Type:

```ts id="a2b3c4"
{ readonly mode: "dev" }
```

---

## 🔹 12. When Widening is Useful

Widening is not always bad.

Use it when:

* Values will change
* You need flexibility
* You don’t need strict literals

---

## 🔹 13. When Literal Inference is Better

Literal types are better when:

* Working with unions
* Building APIs
* Using discriminated unions
* Defining constants

---

## 🔹 14. Summary Rule

### ✔ Use `let` when:

* Value changes over time
* You want general types (`string`, `number`)

### ✔ Use `const` when:

* Value should stay fixed
* You want literal inference

### ✔ Use `as const` when:

* You need strict literal types in objects/arrays

---

## 🚀 In Summary

* `let` → causes **type widening** (general types like `string`)
* `const` → preserves **literal types** (`"north"`, `10`, `true`)
* `as const` → locks values into **deep literal, readonly types**

👉 Understanding this behavior is essential for mastering **type safety, unions, and precise inference in TypeScript**.


---

## 🏷️ Type Aliases in TypeScript (Primitives, Unions, Functions, Objects) — Full Detail

A **type alias** in TypeScript is a way to give a **name to any type**. Instead of repeating complex type definitions everywhere, you can define them once and reuse them.

Type aliases are created using the `type` keyword.

---

## 🔹 1. What is a Type Alias?

A type alias is simply:

> “A name for a type”

---

### 🔹 Syntax

```ts id="a1b2c3"
type Name = TypeDefinition;
```

---

## 🔹 2. Type Aliases for Primitive Types

You can alias basic primitive types like `string`, `number`, and `boolean`.

---

### 🔹 Example

```ts id="d4e5f6"
type Username = string;
type Age = number;
type IsActive = boolean;
```

---

### 🔹 Usage

```ts id="g7h8i9"
let user: Username = "Alice";
let age: Age = 25;
let active: IsActive = true;
```

👉 This improves readability and meaning.

---

## 🔹 3. Type Aliases for Union Types

One of the most powerful uses of type aliases is defining unions.

---

### 🔹 Example

```ts id="j1k2l3"
type Status = "loading" | "success" | "error";
```

---

### 🔹 Usage

```ts id="m1n2o3"
let currentStatus: Status;

currentStatus = "loading";
currentStatus = "success";
// currentStatus = "failed"; ❌ Error
```

---

### 🔹 Another Example

```ts id="p1q2r3"
type ID = string | number;
```

---

## 🔹 4. Type Aliases for Object Types

You can define the shape of objects using type aliases.

---

### 🔹 Example

```ts id="q3r4s5"
type User = {
  name: string;
  age: number;
};
```

---

### 🔹 Usage

```ts id="t1u2v3"
const user: User = {
  name: "Alice",
  age: 25
};
```

---

## 🔹 5. Type Aliases for Functions

Type aliases can describe function signatures.

---

### 🔹 Example

```ts id="v1w2x3"
type Add = (a: number, b: number) => number;
```

---

### 🔹 Usage

```ts id="y1z2a3"
const add: Add = (a, b) => a + b;
```

---

## 🔹 6. Function Type with Optional Parameters

```ts id="b1c2d3"
type Log = (message: string, level?: string) => void;
```

---

### 🔹 Usage

```ts id="e1f2g3"
const log: Log = (msg, level) => {
  console.log(level ?? "info", msg);
};
```

---

## 🔹 7. Type Aliases vs Interfaces (Quick Insight)

| Feature    | Type Alias (`type`) | Interface (`interface`) |
| ---------- | ------------------- | ----------------------- |
| Primitives | ✔ Yes               | ❌ No                    |
| Unions     | ✔ Yes               | ❌ No                    |
| Functions  | ✔ Yes               | ✔ Yes                   |
| Objects    | ✔ Yes               | ✔ Yes                   |

---

## 🔹 8. Type Aliases for Complex Combinations

You can combine multiple concepts.

---

### 🔹 Example

```ts id="h1i2j3"
type ApiResponse = {
  data: string | null;
  status: "success" | "error";
};
```

---

## 🔹 9. Type Aliases with Generics (Advanced)

```ts id="k1l2m3"
type Box<T> = {
  value: T;
};
```

---

### 🔹 Usage

```ts id="n1o2p3"
const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 100 };
```

---

## 🔹 10. Type Aliases for Nested Objects

```ts id="q1r2s3"
type Address = {
  city: string;
  country: string;
};

type User = {
  name: string;
  address: Address;
};
```

---

## 🔹 11. Why Use Type Aliases?

Type aliases help you:

* Reduce repetition
* Improve readability
* Create reusable type definitions
* Simplify complex types
* Model real-world structures

---

## 🔹 12. Common Mistakes

### ❌ Overcomplicating simple types

```ts id="t3u4v5"
type A = string; // unnecessary alias
```

---

### ❌ Confusing with runtime values

```ts id="w1x2y3"
type Name = "Alice"; // type only, not a value
```

---

### ❌ Using type alias where interface is better (for extension-heavy models)

---

## 🔹 13. Best Practices

* ✔ Use type aliases for unions and primitives
* ✔ Use them for function signatures
* ✔ Use them for reusable object shapes
* ✔ Prefer interfaces for extendable object hierarchies
* ✔ Keep types readable and meaningful

---

## 🚀 In Summary

Type aliases in TypeScript:

* Are created using `type`
* Can represent primitives, unions, functions, and objects
* Improve readability and reusability
* Help model complex type systems cleanly

👉 They are a core tool for building **clear, reusable, and maintainable TypeScript type definitions**.


---

## 📌 `as const` Assertion in TypeScript — Preserving Literal Types (Full Detail)

The `as const` assertion is a powerful TypeScript feature used to **preserve the most specific (literal) type possible** for values. It prevents TypeScript from widening types and also makes objects and arrays **readonly**.

It is especially useful when working with:

* constant configuration objects
* fixed lists of values
* discriminated unions
* strict API contracts

---

## 🔹 1. What is `as const`?

`as const` tells TypeScript:

> “Do not widen this type. Keep it as literal and readonly.”

---

### 🔹 Syntax

```ts id="a1b2c3"
const value = expression as const;
```

---

## 🔹 2. Without `as const` (Type Widening)

```ts id="d4e5f6"
const direction = "north";
```

### 🔹 TypeScript infers:

```ts id="g7h8i9"
string
```

👉 Even though value is `"north"`, it becomes a general string.

---

## 🔹 3. With `as const` (Literal Preservation)

```ts id="j1k2l3"
const direction = "north" as const;
```

### 🔹 TypeScript infers:

```ts id="m1n2o3"
"north"
```

👉 Now the type is locked to the exact value.

---

## 🔹 4. Why `as const` Exists

It solves two main problems:

### ✔ Prevents type widening

### ✔ Makes values immutable (readonly)

---

## 🔹 5. `as const` with Strings

```ts id="p1q2r3"
const status = "success" as const;
```

👉 Type:

```ts id="q3r4s5"
"success"
```

---

## 🔹 6. `as const` with Numbers

```ts id="t1u2v3"
const code = 200 as const;
```

👉 Type:

```ts id="v1w2x3"
200
```

---

## 🔹 7. `as const` with Arrays

Without `as const`:

```ts id="y1z2a3"
const colors = ["red", "blue"];
```

👉 Type:

```ts id="string[]"
```

---

With `as const`:

```ts id="b1c2d3"
const colors = ["red", "blue"] as const;
```

👉 Type:

```ts id="readonly ["red", "blue"]"
```

---

### 🔥 Key difference:

* Without `as const` → general array
* With `as const` → fixed tuple of literal values

---

## 🔹 8. `as const` with Objects

Without `as const`:

```ts id="e1f2g3"
const config = {
  mode: "dev"
};
```

👉 Type:

```ts id="object with string property"
```

---

With `as const`:

```ts id="h1i2j3"
const config = {
  mode: "dev"
} as const;
```

👉 Type:

```ts id="k1l2m3"
{
  readonly mode: "dev";
}
```

---

## 🔹 9. Why This Is Powerful

Now the object can be used in strict type systems:

```ts id="n1o2p3"
type Mode = typeof config.mode;
```

👉 Result:

```ts id="q1r2s3"
"dev"
```

---

## 🔹 10. `as const` in Union Type Creation

One of the most powerful uses.

---

### 🔹 Example

```ts id="t3u4v5"
const directions = ["north", "south", "east", "west"] as const;

type Direction = typeof directions[number];
```

---

### 🔹 Result:

```ts id="w1x2y3"
"north" | "south" | "east" | "west"
```

---

## 🔹 11. `as const` in Discriminated Unions

```ts id="z1a2b3"
const success = {
  status: "success",
  data: "OK"
} as const;
```

---

### 🔹 Type:

```ts id="c1d2e3"
{
  readonly status: "success";
  readonly data: "OK";
}
```

---

## 🔹 12. Readonly Behavior

`as const` automatically makes:

* arrays → `readonly tuples`
* objects → `readonly properties`

---

### 🔹 Example

```ts id="f1g2h3"
const arr = [1, 2, 3] as const;
```

👉 You cannot do:

```ts id="i1j2k3"
arr.push(4); // ❌ Error
```

---

## 🔹 13. Real-World Use Cases

### ✔ Configuration constants

```ts id="l1m2n3"
const API = {
  baseUrl: "https://api.example.com",
  version: "v1"
} as const;
```

---

### ✔ Route definitions

```ts id="o1p2q3"
const routes = ["/home", "/about", "/contact"] as const;
```

---

### ✔ Redux action types

```ts id="r1s2t3"
const ACTIONS = {
  ADD: "add",
  REMOVE: "remove"
} as const;
```

---

## 🔹 14. `as const` vs Normal `const`

| Feature          | `const`                  | `as const`              |
| ---------------- | ------------------------ | ----------------------- |
| Value mutability | immutable binding        | immutable + readonly    |
| Type inference   | widened (string, number) | literal types           |
| Arrays           | string[]                 | readonly tuple          |
| Objects          | general object           | readonly literal object |

---

## 🔹 15. Common Mistakes

### ❌ Forgetting `as const` for unions

```ts id="u1v2w3"
const colors = ["red", "blue"]; // ❌ becomes string[]
```

---

### ❌ Assuming `const` prevents widening

```ts id="x1y2z3"
const value = "hello"; // still widened unless used carefully
```

---

## 🔹 16. Best Practices

* ✔ Use `as const` for fixed configuration values
* ✔ Use it to create union types from arrays
* ✔ Use it in discriminated unions
* ✔ Avoid overusing it for dynamic data
* ✔ Combine with `typeof` for powerful type inference

---

## 🚀 In Summary

`as const` in TypeScript:

* Preserves **exact literal types**
* Prevents type widening
* Makes objects and arrays **readonly**
* Enables creation of powerful union types
* Is essential for strict and predictable type systems

👉 It is one of the most important tools for building **highly precise, safe, and maintainable TypeScript codebases**.


---

## 🧠 The `satisfies` Operator in TypeScript — Full Detail

The `satisfies` operator is a relatively modern TypeScript feature that helps you **check whether a value matches a type without changing the inferred type of the value itself**.

It gives you the best of both worlds:

* ✔ Type validation (like annotations)
* ✔ Full type inference preservation (like no annotation)

---

## 🔹 1. What is `satisfies`?

The `satisfies` operator ensures:

> “This value must conform to a type, but keep its most specific inferred type.”

---

### 🔹 Syntax

```ts id="a1b2c3"
const value = expression satisfies Type;
```

---

## 🔹 2. Why `satisfies` Exists

Before `satisfies`, developers had a problem:

### ❌ Problem: Type annotation loses inference

```ts id="d4e5f6"
const config: Record<string, string> = {
  mode: "development",
  env: "local"
};
```

👉 Now everything becomes `string`, and you lose literal precision.

---

### ❌ Problem: `as` assertion bypasses safety

```ts id="g7h8i9"
const config = {
  mode: "development"
} as Record<string, string>;
```

👉 This removes type safety entirely.

---

## 🔹 3. The Solution: `satisfies`

```ts id="j1k2l3"
const config = {
  mode: "development",
  env: "local"
} satisfies Record<string, string>;
```

---

### 🔹 Result:

* ✔ Type is checked against `Record<string, string>`
* ✔ But actual type stays precise

---

## 🔹 4. Key Benefit of `satisfies`

| Feature        | `:` annotation | `as` assertion | `satisfies` |
| -------------- | -------------- | -------------- | ----------- |
| Type checking  | ✔ Yes          | ❌ Weak         | ✔ Yes       |
| Type safety    | ✔ Yes          | ❌ No           | ✔ Yes       |
| Type inference | ❌ Lost         | ✔ Preserved    | ✔ Preserved |

---

## 🔹 5. Basic Example

```ts id="m1n2o3"
type Role = "admin" | "user";

const user = {
  name: "Alice",
  role: "admin"
} satisfies { name: string; role: Role };
```

---

### 🔹 Inferred type:

```ts id="p1q2r3"
{
  name: "Alice";
  role: "admin";
}
```

👉 Notice: `"admin"` is preserved as a literal, not widened.

---

## 🔹 6. `satisfies` vs Type Annotation

### ❌ Using annotation

```ts id="q3r4s5"
const user: { role: "admin" | "user" } = {
  role: "admin"
};
```

👉 Type becomes:

```ts id="t1u2v3"
{ role: "admin" | "user" }
```

(loss of literal precision)

---

### ✔ Using `satisfies`

```ts id="v1w2x3"
const user = {
  role: "admin"
} satisfies { role: "admin" | "user" };
```

👉 Type remains:

```ts id="y1z2a3"
{ role: "admin" }
```

---

## 🔹 7. `satisfies` with Literal Types

```ts id="b1c2d3"
const status = "success" satisfies "success" | "error";
```

👉 Type stays:

```ts id="e1f2g3"
"success"
```

---

## 🔹 8. `satisfies` with Objects

```ts id="h1i2j3"
const config = {
  theme: "dark",
  version: 1
} satisfies {
  theme: "light" | "dark";
  version: number;
};
```

---

### 🔹 Result:

```ts id="k1l2m3"
{
  theme: "dark";
  version: 1;
}
```

---

## 🔹 9. `satisfies` with Arrays

```ts id="n1o2p3"
const colors = ["red", "blue"] satisfies string[];
```

👉 But inference keeps literals:

```ts id="q1r2s3"
("red" | "blue")[]
```

---

## 🔹 10. Real-World Use Case: Configuration Objects

```ts id="t3u4v5"
type Config = {
  mode: "dev" | "prod";
  debug: boolean;
};

const appConfig = {
  mode: "dev",
  debug: true
} satisfies Config;
```

---

### 🔹 Inferred type:

```ts id="w1x2y3"
{
  mode: "dev";
  debug: true;
}
```

---

## 🔹 11. Why This Is Powerful

Without `satisfies`, you lose either:

* Type safety OR
* Literal inference

With `satisfies`, you get both.

---

## 🔹 12. Common Mistakes

### ❌ Confusing with `as`

```ts id="z1a2b3"
const value = x as Type; // unsafe override
const value = x satisfies Type; // safe check
```

---

### ❌ Using when annotation is enough

Not every value needs `satisfies`.

---

### ❌ Using with incompatible types

```ts id="c1d2e3"
const x = 123 satisfies string; // ❌ error
```

---

## 🔹 13. Best Practices

* ✔ Use `satisfies` for configuration objects
* ✔ Use it to preserve literal types safely
* ✔ Prefer over `as` assertions
* ✔ Combine with `as const` for maximum precision
* ✔ Avoid overusing in simple variables

---

## 🚀 In Summary

The `satisfies` operator in TypeScript:

* Checks that a value matches a type
* Preserves the most specific inferred type
* Avoids unsafe type assertions
* Prevents type widening while keeping safety

👉 It is a modern, safe way to ensure **correct structure without losing type inference power**.

---

## 🏷️ Branded (Opaque) Types for Type-Safe IDs in TypeScript — Full Detail

Branded types (also called **opaque types**) are a TypeScript pattern used to create **stronger type safety for values that are structurally identical but semantically different**.

They are especially useful for things like:

* IDs (UserId, PostId, OrderId)
* Currency values
* Email strings
* Database keys
* External API identifiers

Without branding, TypeScript cannot distinguish between these even if they represent different meanings.

---

## 🔹 1. The Problem: Structural Typing

TypeScript uses **structural typing**, meaning:

> If two types have the same structure, they are considered compatible.

---

### 🔹 Example Problem

```ts id="a1b2c3"
type UserId = string;
type PostId = string;

let userId: UserId = "u123";
let postId: PostId = "p999";

userId = postId; // ❌ Allowed (but unsafe)
```

👉 Even though they represent different concepts, TypeScript treats them as the same type.

---

## 🔹 2. What is a Branded Type?

A branded type is a type that looks like a normal type but includes a **hidden marker (brand)** that makes it unique.

---

### 🔹 Basic Pattern

```ts id="d4e5f6"
type Brand<K, T> = K & { __brand: T };
```

---

## 🔹 3. Creating Type-Safe IDs (Branded Types)

### 🔹 Step 1: Define branded types

```ts id="g7h8i9"
type UserId = string & { __brand: "UserId" };
type PostId = string & { __brand: "PostId" };
```

---

## 🔹 4. Creating Values Safely

You cannot directly assign strings anymore.

---

### ❌ Unsafe

```ts id="j1k2l3"
const id: UserId = "u123"; // ❌ Error
```

---

### ✔ Safe way (type casting function)

```ts id="m1n2o3"
function createUserId(id: string): UserId {
  return id as UserId;
}
```

---

### 🔹 Usage

```ts id="p1q2r3"
const userId = createUserId("u123");
```

---

## 🔹 5. Why Branding Works

Branded types trick TypeScript into thinking:

> “Even though this is a string, it is NOT just any string.”

---

## 🔹 6. Preventing Cross-Type Assignment

```ts id="q3r4s5"
const userId = createUserId("u123");
const postId = "p456" as PostId;

userId = postId; // ❌ Error
```

---

## 🔹 7. Real-World Example: API IDs

```ts id="t1u2v3"
type UserId = string & { __brand: "UserId" };
type OrderId = string & { __brand: "OrderId" };
```

---

### 🔹 Usage

```ts id="v1w2x3"
function getUser(id: UserId) {
  return id;
}

const id = "123" as UserId;

getUser(id); // ✔ valid
```

---

## 🔹 8. Factory Functions (Best Practice)

```ts id="y1z2a3"
function UserId(id: string): UserId {
  return id as UserId;
}
```

---

### 🔹 Usage

```ts id="b1c2d3"
const id = UserId("u123");
```

---

## 🔹 9. Branded Types vs Normal Types

| Feature          | Normal Type (`string`) | Branded Type (`string & Brand`) |
| ---------------- | ---------------------- | ------------------------------- |
| Type safety      | ❌ weak                 | ✔ strong                        |
| Semantic meaning | ❌ none                 | ✔ explicit                      |
| Cross-assignment | ✔ allowed              | ❌ blocked                       |

---

## 🔹 10. Advanced Generic Branded Type

```ts id="e1f2g3"
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
```

---

## 🔹 11. Why Branded Types Are Important

They solve real-world problems:

* Prevent mixing IDs accidentally
* Improve API correctness
* Avoid runtime bugs
* Enforce domain rules at compile time
* Add semantic meaning to primitive types

---

## 🔹 12. Common Mistakes

### ❌ Using plain strings instead of branding

```ts id="h1i2j3"
type UserId = string; // ❌ unsafe
```

---

### ❌ Overusing branding unnecessarily

Not every string needs a brand.

---

### ❌ Forgetting controlled creation

Always use factory functions.

---

## 🔹 13. Best Practices

* ✔ Use branded types for IDs and domain values
* ✔ Use factory functions to create branded values
* ✔ Avoid direct type assertions everywhere
* ✔ Keep brand names descriptive
* ✔ Use sparingly for meaningful type safety

---

## 🚀 In Summary

Branded (opaque) types in TypeScript:

* Add a hidden marker to primitive types
* Prevent accidental mixing of similar values
* Are commonly used for IDs and domain-specific types
* Require controlled creation via factory functions
* Improve safety in large-scale applications

👉 They are a powerful technique for building **strongly-typed, domain-safe systems in TypeScript**.


---

## 🔁 Recursive Type Aliases in TypeScript — Full Detail

Recursive type aliases are types that **refer to themselves directly or indirectly**. They are essential for modeling **nested or infinitely deep structures** such as JSON data, trees, and linked lists.

They allow TypeScript to describe structures where the shape repeats at different levels.

---

## 🔹 1. What is a Recursive Type?

A recursive type is a type that is defined in terms of itself.

> “A type that contains itself as part of its definition.”

---

## 🔹 2. Why Recursive Types Are Needed

Real-world data is often nested:

* JSON objects (nested objects/arrays)
* File systems (folders inside folders)
* UI trees (DOM, menus)
* Linked lists
* Graph structures

Without recursion, these structures would be impossible to model cleanly.

---

## 🔹 3. Recursive Type Basics

### 🔹 Simple Example

```ts id="a1b2c3"
type Node = {
  value: string;
  next: Node | null;
};
```

---

### 🔹 Explanation

* Each `Node` points to another `Node`
* Or it ends with `null`

👉 This forms a **linked chain**

---

## 🔹 4. Recursive JSON Type (Very Important)

One of the most common real-world uses.

---

### 🔹 Definition

```ts id="d4e5f6"
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

---

### 🔹 What it means

A JSON value can be:

* primitive (string, number, boolean, null)
* array of JSON values
* object where values are JSON values

---

### 🔹 Example Usage

```ts id="g7h8i9"
const data: JSONValue = {
  name: "Alice",
  age: 25,
  tags: ["dev", "ts"],
  meta: {
    active: true,
    scores: [10, 20, 30]
  }
};
```

---

## 🔹 5. Recursive Tree Type

Trees are classic recursive structures.

---

### 🔹 Example: Binary Tree

```ts id="j1k2l3"
type TreeNode = {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
};
```

---

### 🔹 Explanation

Each node:

* has a value
* may have a left subtree
* may have a right subtree

---

### 🔹 Usage

```ts id="m1n2o3"
const tree: TreeNode = {
  value: 10,
  left: {
    value: 5
  },
  right: {
    value: 15
  }
};
```

---

## 🔹 6. Recursive Folder Structure Example

```ts id="p1q2r3"
type Folder = {
  name: string;
  children?: Folder[];
};
```

---

### 🔹 Usage

```ts id="q3r4s5"
const root: Folder = {
  name: "root",
  children: [
    {
      name: "src",
      children: [
        { name: "index.ts" as any }
      ]
    }
  ]
};
```

---

## 🔹 7. Recursive Linked List

```ts id="t1u2v3"
type ListNode = {
  value: number;
  next: ListNode | null;
};
```

---

### 🔹 Usage

```ts id="v1w2x3"
const list: ListNode = {
  value: 1,
  next: {
    value: 2,
    next: null
  }
};
```

---

## 🔹 8. How Recursion Works in Types

TypeScript evaluates recursively defined types **lazily**, meaning:

* It does not fully expand the type immediately
* It checks structure when needed

This prevents infinite type expansion.

---

## 🔹 9. Recursive Types with Generics

```ts id="y1z2a3"
type Tree<T> = {
  value: T;
  children?: Tree<T>[];
};
```

---

### 🔹 Usage

```ts id="b1c2d3"
const tree: Tree<string> = {
  value: "root",
  children: [
    { value: "child" }
  ]
};
```

---

## 🔹 10. Recursive Union Types

```ts id="e1f2g3"
type NestedNumber =
  | number
  | NestedNumber[];
```

---

### 🔹 Example

```ts id="h1i2j3"
const data: NestedNumber = [1, [2, [3, 4]]];
```

---

## 🔹 11. Real-World Use Cases

Recursive types are used in:

* JSON APIs
* AST (Abstract Syntax Trees)
* File systems
* UI component trees
* Menu systems
* Graph structures

---

## 🔹 12. Common Mistakes

### ❌ Infinite recursion thinking

```ts id="k1l2m3"
type A = A; // ❌ invalid / useless
```

---

### ❌ Forgetting base case

```ts id="n1o2p3"
type Node = {
  next: Node; // ❌ infinite loop without null/optional end
};
```

---

### ❌ Overcomplicating simple structures

Not every nested object needs recursion.

---

## 🔹 13. Best Practices

* ✔ Always include a **base case** (`null`, `undefined`, or optional property)
* ✔ Use recursion for truly nested structures
* ✔ Combine with generics for flexibility
* ✔ Keep recursive depth logically bounded
* ✔ Use for tree-like or graph-like data only

---

## 🚀 In Summary

Recursive type aliases in TypeScript:

* Allow types to reference themselves
* Are essential for modeling nested structures
* Power JSON, trees, linked lists, and graphs
* Require a base case to avoid infinite recursion
* Enable strongly typed representation of real-world hierarchical data

👉 They are a fundamental tool for building **advanced, structured, and deeply nested TypeScript models**.


---

## 🧵 Template Literal Types (Preview) in TypeScript — Full Detail

Template literal types are a powerful TypeScript feature that lets you **build new string types by combining existing types using template-like syntax** (similar to JavaScript template strings).

They allow you to create **pattern-based string types**, which are extremely useful for APIs, routing, event names, and structured strings.

---

## 🔹 1. What Are Template Literal Types?

Template literal types let you construct types like this:

```ts id="a1b2c3"
type Name = `prefix${string}suffix`;
```

Instead of working with plain strings, you define **string patterns at the type level**.

---

## 🔹 2. Basic Syntax

```ts id="d4e5f6"
type TypeName = `text${SomeType}text`;
```

Where `SomeType` can be:

* string literal
* union of strings
* number
* boolean (converted to string)
* other template literal types

---

## 🔹 3. Simple Example

```ts id="g7h8i9"
type Greeting = `hello ${string}`;
```

---

### 🔹 Usage

```ts id="j1k2l3"
let msg: Greeting;

msg = "hello world"; // ✔ valid
msg = "hello Alice";  // ✔ valid
// msg = "hi world"; ❌ Error
```

---

## 🔹 4. Union-Based Template Types

One of the most powerful features is combining unions.

---

### 🔹 Example

```ts id="m1n2o3"
type Direction = "left" | "right";

type Move = `move-${Direction}`;
```

---

### 🔹 Result

```ts id="p1q2r3"
"move-left" | "move-right"
```

---

## 🔹 5. Real-World Example: API Routes

```ts id="q3r4s5"
type Method = "GET" | "POST" | "PUT";

type Endpoint = `/api/${Method}/users`;
```

---

### 🔹 Result

```ts id="t1u2v3"
"/api/GET/users" | "/api/POST/users" | "/api/PUT/users"
```

---

## 🔹 6. Event Name Patterns

```ts id="v1w2x3"
type Event = "click" | "hover";

type DOMEvent = `on${Capitalize<Event>}`;
```

---

### 🔹 Result

```ts id="y1z2a3"
"onClick" | "onHover"
```

---

## 🔹 7. Template Literal with Multiple Parts

```ts id="b1c2d3"
type Status = "success" | "error";
type Service = "auth" | "payment";

type LogKey = `${Service}-${Status}`;
```

---

### 🔹 Result

```ts id="e1f2g3"
"auth-success" | "auth-error" | "payment-success" | "payment-error"
```

---

## 🔹 8. Why Template Literal Types Exist

They help you:

* Create **structured string patterns**
* Prevent invalid string values
* Improve autocomplete for string-based APIs
* Model dynamic keys safely
* Build scalable type-safe systems

---

## 🔹 9. Using Built-in String Manipulation Types

TypeScript provides helpers:

* `Uppercase<T>`
* `Lowercase<T>`
* `Capitalize<T>`
* `Uncapitalize<T>`

---

### 🔹 Example

```ts id="h1i2j3"
type Name = "user";

type Upper = Uppercase<Name>;
```

---

### 🔹 Result

```ts id="k1l2m3"
"USER"
```

---

## 🔹 10. Real-World Use Case: CSS Class Names

```ts id="n1o2p3"
type Size = "sm" | "md" | "lg";

type ButtonClass = `btn-${Size}`;
```

---

### 🔹 Result

```ts id="q1r2s3"
"btn-sm" | "btn-md" | "btn-lg"
```

---

## 🔹 11. Real-World Use Case: Redux Actions

```ts id="t3u4v5"
type Action = "add" | "remove" | "update";

type ActionType = `user/${Action}`;
```

---

### 🔹 Result

```ts id="w1x2y3"
"user/add" | "user/remove" | "user/update"
```

---

## 🔹 12. Combining with Generics

```ts id="z1a2b3"
type Route<T extends string> = `/api/${T}`;
```

---

### 🔹 Usage

```ts id="c1d2e3"
type UserRoute = Route<"users">;
```

---

### 🔹 Result

```ts id="f1g2h3"
"/api/users"
```

---

## 🔹 13. Common Mistakes

### ❌ Using invalid types inside templates

```ts id="i1j2k3"
type Bad = `hello ${object}`; // ❌ invalid
```

---

### ❌ Expecting runtime behavior

Template literal types exist only at compile time.

---

### ❌ Overcomplicating simple strings

Not every string needs pattern typing.

---

## 🔹 14. When to Use Template Literal Types

Use them when:

* You have structured string formats
* You are building APIs or routing systems
* You want strict event naming
* You are designing design systems (CSS classes)
* You need compile-time string validation

---

## 🔹 15. When NOT to Use Them

Avoid when:

* Strings are free-form user input
* Patterns are too complex or unnecessary
* Simpler union types are enough

---

## 🚀 In Summary

Template literal types in TypeScript:

* Build new string types using backtick syntax
* Combine unions, literals, and string transformations
* Enforce strict string patterns at compile time
* Improve safety for APIs, events, and routing systems

👉 They are a powerful feature for creating **structured, predictable, and type-safe string-based systems in TypeScript**.


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

**[Day 09 — Enums →](../Day-09-Enums/)**
