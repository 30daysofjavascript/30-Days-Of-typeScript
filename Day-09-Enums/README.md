# 📘 Day 09 — Enums

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Numeric enums (auto-incremented values, with reverse mapping)
- String enums (preferred — readable, no reverse mapping gotchas)
- const enums — zero runtime cost (fully inlined at compile time)
- Bit flag enums using bitwise operations
- Enum merging with namespaces (add static methods to enums)
- Enums vs union types — when to use each
- Iterating over enum values

---

## 🔢 Numeric Enums in TypeScript — Full Detail

Numeric enums are one of the built-in features in TypeScript that allow you to define a set of **named numeric constants**. They are especially useful when you want readable names for numeric values while still keeping efficient numeric representation.

They also support:

* ✔ Auto-incremented values
* ✔ Reverse mapping (number → name)

---

## 🔹 1. What is a Numeric Enum?

A numeric enum is a collection of named constants where each member is assigned a number.

---

### 🔹 Basic Syntax

```ts id="a1b2c3"
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

---

### 🔹 Default Values

```ts id="d4e5f6"
Up = 0
Down = 1
Left = 2
Right = 3
```

👉 By default, enums start at `0` and increment automatically.

---

## 🔹 2. Using Numeric Enums

```ts id="g7h8i9"
let move: Direction = Direction.Up;
```

---

### 🔹 Output

```ts id="j1k2l3"
console.log(move); // 0
```

---

## 🔹 3. Auto-Increment Behavior

If you assign a value to the first member, the rest auto-increment from there.

---

### 🔹 Example

```ts id="m1n2o3"
enum Status {
  Pending = 1,
  InProgress,
  Completed
}
```

---

### 🔹 Result

```ts id="p1q2r3"
Pending = 1
InProgress = 2
Completed = 3
```

---

## 🔹 4. Custom Numeric Values

You can assign values manually.

```ts id="q3r4s5"
enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}
```

---

## 🔹 5. Reverse Mapping (Important Feature)

Numeric enums support **reverse mapping**, meaning:

> You can access the name using the value.

---

### 🔹 Example

```ts id="t1u2v3"
enum Direction {
  Up,
  Down
}
```

---

### 🔹 Usage

```ts id="v1w2x3"
console.log(Direction.Up);     // 0
console.log(Direction[0]);     // "Up"
```

---

### 🔥 Explanation

TypeScript generates:

```ts id="y1z2a3"
{
  0: "Up",
  1: "Down",
  Up: 0,
  Down: 1
}
```

👉 This is why reverse mapping works.

---

## 🔹 6. Real-World Example: Status Codes

```ts id="b1c2d3"
enum OrderStatus {
  Created = 1,
  Paid,
  Shipped,
  Delivered
}
```

---

### 🔹 Usage

```ts id="e1f2g3"
function getStatus(status: OrderStatus) {
  console.log(OrderStatus[status]);
}
```

---

## 🔹 7. Numeric Enums in Functions

```ts id="h1i2j3"
function move(direction: Direction) {
  if (direction === Direction.Up) {
    console.log("Moving up");
  }
}
```

---

## 🔹 8. Heterogeneous Enums (Avoid)

Mixing string and number values is possible but not recommended.

```ts id="k1l2m3"
enum Mixed {
  No = 0,
  Yes = "YES"
}
```

👉 This breaks consistency and should be avoided.

---

## 🔹 9. Enum Runtime Behavior

Enums exist at runtime (unlike types).

---

### 🔹 Compiled JavaScript

```ts id="n1o2p3"
enum Direction {
  Up,
  Down
}
```

➡ Compiles to:

```js
var Direction;
(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up";
  Direction[Direction["Down"] = 1] = "Down";
})(Direction || (Direction = {}));
```

---

## 🔹 10. Numeric Enum vs Literal Union

### 🔹 Enum

```ts id="q1r2s3"
enum Status {
  Success,
  Error
}
```

---

### 🔹 Literal Union

```ts id="t3u4v5"
type Status = "success" | "error";
```

---

### 🔹 Comparison

| Feature          | Numeric Enum | Literal Union |
| ---------------- | ------------ | ------------- |
| Runtime presence | ✔ Yes        | ❌ No          |
| Reverse mapping  | ✔ Yes        | ❌ No          |
| Type safety      | ✔ Good       | ✔ Excellent   |
| Readability      | Moderate     | High          |

---

## 🔹 11. When to Use Numeric Enums

Use numeric enums when:

* You need numeric values
* You want reverse mapping
* You need runtime representation
* You are working with legacy systems
* You need performance-efficient constants

---

## 🔹 12. When NOT to Use Them

Avoid when:

* You only need type-level safety
* String readability is more important
* You prefer simpler union types
* You don’t need runtime enums

---

## 🔹 13. Common Pitfalls

### ❌ Relying on implicit values too much

```ts id="w1x2y3"
enum A {
  A,
  B,
  C
}
```

👉 Can become confusing in large enums.

---

### ❌ Using enums instead of unions unnecessarily

---

### ❌ Mixing types

```ts id="z1a2b3"
enum Bad {
  A = 1,
  B = "two"
}
```

---

## 🔹 14. Best Practices

* ✔ Assign explicit values when clarity matters
* ✔ Use enums when runtime access is needed
* ✔ Prefer literal unions for simple cases
* ✔ Avoid heterogeneous enums
* ✔ Keep enums small and meaningful

---

## 🚀 In Summary

Numeric enums in TypeScript:

* Define named numeric constants
* Support auto-incremented values
* Provide reverse mapping (value → name)
* Exist at runtime
* Are useful for structured numeric data

👉 They are best used when you need **readable names for numbers with runtime behavior and reverse lookup capabilities**.

---

## 🔤 String Enums in TypeScript — Full Detail

String enums are a type of enum where each member is assigned a **string value instead of a number**. They are often preferred over numeric enums because they are **more readable, predictable, and safer**.

Unlike numeric enums, string enums **do not support reverse mapping**, which actually avoids a number of common pitfalls.

---

## 🔹 1. What is a String Enum?

A string enum is a collection of named constants where each value is a string.

---

### 🔹 Syntax

```ts id="a1b2c3"
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

---

## 🔹 2. Why String Enums Are Preferred

String enums are generally better because:

* ✔ More readable at runtime
* ✔ No confusion with numeric values
* ✔ Safer (no accidental reverse mapping)
* ✔ Easier debugging
* ✔ Better for APIs and logs

---

## 🔹 3. Using String Enums

```ts id="d4e5f6"
let move: Direction = Direction.Up;
```

---

### 🔹 Output

```ts id="g7h8i9"
console.log(move); // "UP"
```

---

## 🔹 4. No Auto-Increment

Unlike numeric enums, string enums **do NOT auto-increment**.

---

### ❌ Invalid

```ts id="j1k2l3"
enum Status {
  Pending = "PENDING",
  InProgress, // ❌ Error
}
```

👉 Every member must have an explicit value.

---

## 🔹 5. No Reverse Mapping (Important)

String enums do NOT support reverse mapping.

---

### 🔹 Example

```ts id="m1n2o3"
enum Direction {
  Up = "UP"
}
```

---

### 🔹 Usage

```ts id="p1q2r3"
Direction.Up;       // "UP"
Direction["UP"];    // ❌ undefined
```

---

### 🔥 Why this is good:

* Prevents confusing behavior
* Avoids unexpected lookups
* Keeps enums simple and predictable

---

## 🔹 6. Real-World Example: API Status

```ts id="q3r4s5"
enum ApiStatus {
  Success = "SUCCESS",
  Error = "ERROR",
  Loading = "LOADING"
}
```

---

### 🔹 Usage

```ts id="t1u2v3"
function handle(status: ApiStatus) {
  if (status === ApiStatus.Success) {
    console.log("Done!");
  }
}
```

---

## 🔹 7. Debugging Advantage

```ts id="v1w2x3"
console.log(ApiStatus.Success);
```

👉 Output:

```ts id="y1z2a3"
"SUCCESS"
```

✔ Human-readable
✔ Easy to understand logs

---

## 🔹 8. String Enum vs Numeric Enum

| Feature         | String Enum | Numeric Enum |
| --------------- | ----------- | ------------ |
| Value type      | string      | number       |
| Readability     | ✔ High      | ❌ Low        |
| Auto-increment  | ❌ No        | ✔ Yes        |
| Reverse mapping | ❌ No        | ✔ Yes        |
| Debugging       | ✔ Easy      | ❌ Hard       |
| Safety          | ✔ Higher    | Moderate     |

---

## 🔹 9. String Enums in APIs and Databases

String enums are ideal when working with:

* REST APIs
* GraphQL schemas
* Database values
* Logging systems
* External integrations

---

### 🔹 Example

```ts id="b1c2d3"
enum Role {
  Admin = "admin",
  User = "user",
  Guest = "guest"
}
```

---

## 🔹 10. Using String Enums in Objects

```ts id="e1f2g3"
const user = {
  role: Role.Admin
};
```

---

## 🔹 11. Comparing with Literal Unions

### 🔹 String Enum

```ts id="h1i2j3"
enum Status {
  Success = "success",
  Error = "error"
}
```

---

### 🔹 Literal Union

```ts id="k1l2m3"
type Status = "success" | "error";
```

---

### 🔹 Comparison

| Feature           | String Enum | Literal Union |
| ----------------- | ----------- | ------------- |
| Runtime existence | ✔ Yes       | ❌ No          |
| Type safety       | ✔ Good      | ✔ Excellent   |
| Flexibility       | Moderate    | High          |
| Simplicity        | Moderate    | ✔ Simple      |

---

## 🔹 12. Common Mistakes

### ❌ Forgetting to assign values

```ts id="n1o2p3"
enum Bad {
  A = "A",
  B // ❌ Error
}
```

---

### ❌ Expecting reverse mapping

```ts id="q1r2s3"
Direction["UP"]; // ❌ undefined
```

---

### ❌ Overusing enums instead of unions

Sometimes a simple union is better.

---

## 🔹 13. Best Practices

* ✔ Prefer string enums over numeric enums
* ✔ Use descriptive string values
* ✔ Use enums when runtime values are needed
* ✔ Prefer unions when runtime is not required
* ✔ Keep naming consistent (UP, DOWN, etc.)

---

## 🔹 14. When to Use String Enums

Use string enums when:

* You need readable runtime values
* You interact with APIs or external systems
* You want predictable behavior
* You want to avoid reverse mapping issues

---

## 🚀 In Summary

String enums in TypeScript:

* Use string values instead of numbers
* Are more readable and predictable
* Do NOT support reverse mapping (which avoids bugs)
* Are ideal for APIs, logs, and external systems

👉 They are generally the **preferred enum type** for building **clear, safe, and maintainable TypeScript applications**.


---

## ⚡ `const enum` in TypeScript — Zero Runtime Cost (Full Detail)

`const enum` is a special kind of enum in TypeScript that is **completely removed during compilation** and **inlined directly into the generated JavaScript**.

This means:

* ✔ No runtime object is created
* ✔ No extra memory usage
* ✔ Faster performance
* ✔ Values are replaced at compile time

---

## 🔹 1. What is a `const enum`?

A `const enum` is an enum where all usages are **replaced with literal values during compilation**.

---

### 🔹 Syntax

```ts id="a1b2c3"
const enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

---

## 🔹 2. How It Works

```ts id="d4e5f6"
const enum Direction {
  Up,
  Down
}

const move = Direction.Up;
```

---

### 🔹 Compiled JavaScript

```js id="q8w7e6"
const move = 0;
```

👉 The enum is completely removed and replaced with its value.

---

## 🔹 3. Why Use `const enum`?

### ✔ Zero runtime cost

No enum object exists in JavaScript.

### ✔ Better performance

No property lookup like `Direction.Up`.

### ✔ Smaller bundle size

Less generated code.

---

## 🔹 4. `const enum` vs Normal Enum

### 🔹 Normal Enum

```ts id="g7h8i9"
enum Direction {
  Up,
  Down
}

const move = Direction.Up;
```

---

### 🔹 Compiled Output

```js id="u7y6t5"
var Direction;
(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up";
  Direction[Direction["Down"] = 1] = "Down";
})(Direction || (Direction = {}));

const move = Direction.Up;
```

---

### 🔹 `const enum`

```ts id="j1k2l3"
const enum Direction {
  Up,
  Down
}

const move = Direction.Up;
```

---

### 🔹 Compiled Output

```js id="l9k8j7"
const move = 0;
```

---

### 🔹 Key Difference

| Feature         | Enum            | `const enum` |
| --------------- | --------------- | ------------ |
| Runtime object  | ✔ Yes           | ❌ No         |
| Performance     | Moderate        | ✔ High       |
| Bundle size     | Larger          | ✔ Smaller    |
| Reverse mapping | ✔ Yes (numeric) | ❌ No         |

---

## 🔹 5. `const enum` with Custom Values

```ts id="m1n2o3"
const enum Status {
  OK = 200,
  NotFound = 404
}

const code = Status.OK;
```

---

### 🔹 Compiles to:

```js id="z3x2c1"
const code = 200;
```

---

## 🔹 6. Using `const enum` in Functions

```ts id="p1q2r3"
const enum LogLevel {
  Info,
  Warn,
  Error
}

function log(level: LogLevel) {
  if (level === LogLevel.Error) {
    console.error("Error!");
  }
}
```

---

👉 Compiles to direct number comparisons.

---

## 🔹 7. When `const enum` is Perfect

Use `const enum` when:

* You need high performance
* You don’t need runtime enum access
* Values are fixed and known at compile time
* You want minimal JavaScript output

---

## 🔹 8. Limitations of `const enum`

### ❌ No runtime presence

```ts id="t1u2v3"
console.log(Direction); // ❌ Error (does not exist)
```

---

### ❌ No reverse mapping

```ts id="v1w2x3"
Direction[0]; // ❌ Not possible
```

---

### ❌ Cannot iterate

```ts id="y1z2a3"
Object.keys(Direction); // ❌ No object exists
```

---

## 🔹 9. Important Compiler Option

If you use `const enum`, be aware of:

```json id="b1c2d3"
{
  "compilerOptions": {
    "preserveConstEnums": true
  }
}
```

---

### 🔹 Behavior

* `false` (default) → enums are erased (normal behavior)
* `true` → keeps enum in output (disables inlining)

---

## 🔹 10. Pitfalls (Very Important)

### ❌ Not safe across library boundaries

If you publish a library with `const enum`, consumers may break if compiled differently.

---

### ❌ Issues with Babel / transpilers

Some tools do not support `const enum` properly.

---

### ❌ Debugging difficulty

Values are inlined:

```ts id="e1f2g3"
const level = 2;
```

👉 Harder to know what `2` represents.

---

## 🔹 11. Best Practices

* ✔ Use `const enum` in internal codebases
* ✔ Avoid exporting them in libraries
* ✔ Use for performance-critical paths
* ✔ Prefer string enums or unions for public APIs
* ✔ Keep values simple and meaningful

---

## 🔹 12. `const enum` vs Alternatives

| Option        | Runtime Cost | Safety | Debugging | Use Case    |
| ------------- | ------------ | ------ | --------- | ----------- |
| `enum`        | High         | ✔      | Medium    | General use |
| `const enum`  | Zero         | ✔      | ❌ Hard    | Performance |
| Literal union | Zero         | ✔✔     | ✔ Easy    | Type-only   |

---

## 🚀 In Summary

`const enum` in TypeScript:

* Is fully **inlined at compile time**
* Produces **zero runtime JavaScript code**
* Improves performance and reduces bundle size
* Does NOT support runtime features like reverse mapping
* Should be used carefully, especially in shared libraries

👉 It is ideal for **high-performance, internal constants where runtime access is not needed**.

---

## 🧩 Bit Flag Enums in TypeScript — Full Detail

Bit flag enums are a powerful pattern where enum values represent **individual bits in a number**. By using **bitwise operations**, you can combine multiple flags into a single value and efficiently store or check multiple boolean states.

This is commonly used for:

* permissions systems
* feature toggles
* configuration flags
* low-level optimizations

---

## 🔹 1. What Are Bit Flags?

Bit flags use numbers where each value is a **power of 2**, so each flag occupies a unique bit position.

---

### 🔹 Why powers of 2?

Because in binary:

| Decimal | Binary |
| ------- | ------ |
| 1       | 0001   |
| 2       | 0010   |
| 4       | 0100   |
| 8       | 1000   |

👉 Each flag uses a separate bit → no overlap.

---

## 🔹 2. Defining a Bit Flag Enum

```ts id="a1b2c3"
enum Permission {
  Read    = 1 << 0, // 0001
  Write   = 1 << 1, // 0010
  Execute = 1 << 2, // 0100
  Delete  = 1 << 3  // 1000
}
```

---

### 🔹 Explanation

* `1 << 0` = 1
* `1 << 1` = 2
* `1 << 2` = 4
* `1 << 3` = 8

👉 Each flag is a unique bit.

---

## 🔹 3. Combining Flags (Bitwise OR `|`)

You can combine multiple flags into one value.

```ts id="d4e5f6"
let userPermission = Permission.Read | Permission.Write;
```

---

### 🔹 Result

```ts id="g7h8i9"
0001 (Read)
0010 (Write)
-----
0011 (Combined = 3)
```

---

## 🔹 4. Checking Flags (Bitwise AND `&`)

To check if a flag exists:

```ts id="j1k2l3"
if (userPermission & Permission.Read) {
  console.log("Has read permission");
}
```

---

### 🔹 How it works

```ts id="m1n2o3"
0011 (user)
0001 (Read)
-----
0001 → truthy ✔
```

---

## 🔹 5. Removing Flags

Use bitwise AND with NOT (`~`) to remove a flag.

```ts id="p1q2r3"
userPermission = userPermission & ~Permission.Write;
```

---

### 🔹 Result

```ts id="q3r4s5"
0011
~0010
-----
0001 (Write removed)
```

---

## 🔹 6. Toggling Flags (XOR `^`)

```ts id="t1u2v3"
userPermission = userPermission ^ Permission.Execute;
```

👉 If flag exists → removed
👉 If not → added

---

## 🔹 7. Real-World Example: User Permissions

```ts id="v1w2x3"
enum Permission {
  Read    = 1 << 0,
  Write   = 1 << 1,
  Delete  = 1 << 2
}

let perms = Permission.Read | Permission.Write;
```

---

### 🔹 Check permission

```ts id="y1z2a3"
const canDelete = (perms & Permission.Delete) !== 0;
```

---

## 🔹 8. Utility Helper Functions (Best Practice)

```ts id="b1c2d3"
function hasPermission(value: number, perm: Permission): boolean {
  return (value & perm) === perm;
}

function addPermission(value: number, perm: Permission): number {
  return value | perm;
}

function removePermission(value: number, perm: Permission): number {
  return value & ~perm;
}
```

---

## 🔹 9. Advantages of Bit Flags

* ✔ Memory efficient (store many booleans in one number)
* ✔ Fast operations (bitwise is very fast)
* ✔ Compact representation
* ✔ Easy combination of multiple states

---

## 🔹 10. Disadvantages

* ❌ Less readable than plain booleans
* ❌ Harder to debug
* ❌ Requires understanding of bitwise logic
* ❌ Not ideal for beginners

---

## 🔹 11. Bit Flags vs Boolean Properties

### 🔹 Boolean Object

```ts id="e1f2g3"
type Permissions = {
  read: boolean;
  write: boolean;
  delete: boolean;
};
```

---

### 🔹 Bit Flag

```ts id="h1i2j3"
let perms = Permission.Read | Permission.Write;
```

---

### 🔹 Comparison

| Feature     | Boolean Object | Bit Flags |
| ----------- | -------------- | --------- |
| Readability | ✔ High         | ❌ Lower   |
| Performance | Moderate       | ✔ High    |
| Memory      | Higher         | ✔ Lower   |
| Scalability | Moderate       | ✔ High    |

---

## 🔹 12. Common Mistakes

### ❌ Not using powers of 2

```ts id="k1l2m3"
enum Bad {
  A = 1,
  B = 2,
  C = 3 // ❌ overlaps bits
}
```

---

### ❌ Forgetting parentheses

```ts id="n1o2p3"
if (userPermission & Permission.Read === Permission.Read) // ❌ wrong
```

---

### ✔ Correct

```ts id="q1r2s3"
if ((userPermission & Permission.Read) === Permission.Read)
```

---

### ❌ Using for simple cases

Bit flags are overkill for small apps.

---

## 🔹 13. Best Practices

* ✔ Always use powers of 2 (`1 << n`)
* ✔ Use helper functions for clarity
* ✔ Use meaningful enum names
* ✔ Add comments showing binary values
* ✔ Use in performance-critical or compact systems

---

## 🔹 14. Advanced Pattern: Combined Flags

```ts id="t3u4v5"
enum Permission {
  None    = 0,
  Read    = 1 << 0,
  Write   = 1 << 1,
  Execute = 1 << 2,
  All     = Read | Write | Execute
}
```

---

### 🔹 Usage

```ts id="w1x2y3"
let admin = Permission.All;
```

---

## 🚀 In Summary

Bit flag enums in TypeScript:

* Use **bitwise operations** to store multiple flags in one number
* Require values as **powers of 2**
* Use `|` to combine, `&` to check, `~` to remove, `^` to toggle
* Are highly efficient but less readable
* Are ideal for permissions, feature flags, and performance-critical systems

👉 They are a powerful technique for building **compact, fast, and scalable state representations**.


---

## 🧩 Enum Merging with Namespaces — Adding Static Methods to Enums (Full Detail)

TypeScript allows a powerful feature called **declaration merging**, where you can combine an `enum` with a `namespace`. This lets you **attach static utility methods and properties directly to an enum**, making your code more organized and expressive.

---

## 🔹 1. What is Enum + Namespace Merging?

In TypeScript:

> An `enum` and a `namespace` with the same name are **merged into a single entity**.

This allows you to treat enums like **objects with both values and methods**.

---

## 🔹 2. Basic Example

```ts id="a1b2c3"
enum Direction {
  Up,
  Down,
  Left,
  Right
}

namespace Direction {
  export function isVertical(dir: Direction): boolean {
    return dir === Direction.Up || dir === Direction.Down;
  }
}
```

---

## 🔹 Usage

```ts id="d4e5f6"
const move = Direction.Up;

console.log(Direction.isVertical(move)); // true
```

---

### 🔥 What happened?

* `Direction.Up` → enum value
* `Direction.isVertical()` → static method added via namespace

👉 Both are accessed using the same name.

---

## 🔹 3. Why Use Enum Merging?

It helps you:

* Group related logic with enum values
* Avoid scattered helper functions
* Improve readability and organization
* Mimic static methods (like in other languages)

---

## 🔹 4. Real-World Example: Status Enum

```ts id="g7h8i9"
enum Status {
  Success = "success",
  Error = "error",
  Loading = "loading"
}

namespace Status {
  export function isFinal(status: Status): boolean {
    return status === Status.Success || status === Status.Error;
  }
}
```

---

### 🔹 Usage

```ts id="j1k2l3"
if (Status.isFinal(Status.Success)) {
  console.log("Completed");
}
```

---

## 🔹 5. Adding Multiple Methods

```ts id="m1n2o3"
enum Role {
  Admin = "admin",
  User = "user"
}

namespace Role {
  export function isAdmin(role: Role): boolean {
    return role === Role.Admin;
  }

  export function fromString(value: string): Role | undefined {
    if (value === "admin") return Role.Admin;
    if (value === "user") return Role.User;
    return undefined;
  }
}
```

---

## 🔹 6. Adding Static Data

You can also attach constants.

```ts id="p1q2r3"
enum LogLevel {
  Info,
  Warn,
  Error
}

namespace LogLevel {
  export const labels = {
    [LogLevel.Info]: "INFO",
    [LogLevel.Warn]: "WARN",
    [LogLevel.Error]: "ERROR"
  };
}
```

---

### 🔹 Usage

```ts id="q3r4s5"
console.log(LogLevel.labels[LogLevel.Warn]); // "WARN"
```

---

## 🔹 7. How It Works Internally

TypeScript merges:

```ts id="t1u2v3"
enum A {}
namespace A {}
```

➡ Into one JavaScript object.

---

### 🔹 Compiled Output (Simplified)

```js id="k9l8m7"
var Direction;
(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up";
})(Direction || (Direction = {}));

(function (Direction) {
  function isVertical(dir) {
    return dir === Direction.Up;
  }
  Direction.isVertical = isVertical;
})(Direction || (Direction = {}));
```

---

👉 Both enum values and functions live on the same object.

---

## 🔹 8. Important Rules

### ✔ Same name required

```ts id="v1w2x3"
enum A {}
namespace A {} // ✔ merges
```

---

### ✔ Namespace must come AFTER enum

```ts id="y1z2a3"
enum A {}
namespace A {} // ✔ correct order
```

---

### ❌ Wrong order

```ts id="b1c2d3"
namespace A {}
enum A {} // ❌ does not merge
```

---

### ✔ Use `export` inside namespace

```ts id="e1f2g3"
namespace A {
  export function test() {}
}
```

---

## 🔹 9. Enum Merging vs Utility Functions

### ❌ Without merging

```ts id="h1i2j3"
function isAdmin(role: Role) {}
```

---

### ✔ With merging

```ts id="k1l2m3"
Role.isAdmin(role);
```

👉 Cleaner and more intuitive.

---

## 🔹 10. When to Use Enum Merging

Use it when:

* You want helper methods tied to enum values
* You need parsing/validation logic
* You want better organization
* You are building libraries or APIs

---

## 🔹 11. When NOT to Use It

Avoid when:

* Using `const enum` (cannot merge)
* You prefer functional style
* Logic becomes too large
* You are using modern alternatives (like unions + objects)

---

## 🔹 12. Common Pitfalls

### ❌ Trying with `const enum`

```ts id="n1o2p3"
const enum A {}
namespace A {} // ❌ not allowed
```

---

### ❌ Forgetting export

```ts id="q1r2s3"
namespace A {
  function test() {} // ❌ not accessible
}
```

---

### ❌ Overloading enums with too much logic

Keep it clean and focused.

---

## 🔹 13. Best Practices

* ✔ Keep methods small and relevant
* ✔ Use for parsing, validation, formatting
* ✔ Prefer string enums for readability
* ✔ Avoid overusing for complex logic
* ✔ Document helper methods clearly

---

## 🚀 In Summary

Enum + namespace merging in TypeScript:

* Combines enum values with static methods
* Uses declaration merging
* Creates a single object with values + utilities
* Improves organization and readability
* Works only with regular enums (not `const enum`)

👉 It’s a powerful pattern for building **clean, structured, and self-contained enum-based APIs**.


---

## ⚖️ Enums vs Union Types in TypeScript — When to Use Each (Full Detail)

Enums and union types are both used to represent **a fixed set of possible values**, but they work very differently in terms of **runtime behavior, type safety, and flexibility**.

Understanding when to use each is essential for writing clean and maintainable TypeScript code.

---

## 🔹 1. What is an Enum?

An enum is a **named collection of constants** that exists at **runtime**.

---

### 🔹 Example

```ts id="a1b2c3"
enum Status {
  Success = "success",
  Error = "error"
}
```

---

### 🔹 Usage

```ts id="d4e5f6"
let s: Status = Status.Success;
```

---

## 🔹 2. What is a Union Type?

A union type is a **type-level construct** that represents a value that can be one of several options.

---

### 🔹 Example

```ts id="g7h8i9"
type Status = "success" | "error";
```

---

### 🔹 Usage

```ts id="j1k2l3"
let s: Status = "success";
```

---

## 🔹 3. Core Difference

| Feature           | Enum              | Union Type |
| ----------------- | ----------------- | ---------- |
| Exists at runtime | ✔ Yes             | ❌ No       |
| Type-level only   | ❌ No              | ✔ Yes      |
| Reverse mapping   | ✔ (numeric enums) | ❌ No       |
| Flexibility       | Moderate          | ✔ High     |
| Simplicity        | Moderate          | ✔ Simple   |

---

## 🔹 4. Runtime vs Compile-Time

### 🔹 Enum (runtime object)

```ts id="m1n2o3"
console.log(Status.Success);
```

👉 Works because enum exists in JS.

---

### 🔹 Union (no runtime)

```ts id="p1q2r3"
type Status = "success" | "error";
```

👉 Removed completely during compilation.

---

## 🔹 5. When to Use Enums

Use enums when you need:

---

### ✔ 1. Runtime values

```ts id="q3r4s5"
enum LogLevel {
  Info,
  Warn,
  Error
}
```

---

### ✔ 2. Reverse mapping (numeric enums)

```ts id="t1u2v3"
LogLevel[0]; // "Info"
```

---

### ✔ 3. Grouping with methods (namespace merging)

```ts id="v1w2x3"
Status.isFinal(Status.Success);
```

---

### ✔ 4. Interoperability with external systems

APIs, databases, protocols.

---

### ✔ 5. Consistent constant naming

```ts id="y1z2a3"
Status.Success
```

---

## 🔹 6. When to Use Union Types

Use unions when you need:

---

### ✔ 1. Simplicity and readability

```ts id="b1c2d3"
type Status = "success" | "error";
```

---

### ✔ 2. Better type safety

```ts id="e1f2g3"
function handle(status: Status) {}
```

---

### ✔ 3. No runtime overhead

Union types disappear after compilation.

---

### ✔ 4. Literal inference and narrowing

```ts id="h1i2j3"
if (status === "success") {}
```

---

### ✔ 5. Flexible composition

```ts id="k1l2m3"
type Direction = "up" | "down";
type Action = `move-${Direction}`;
```

---

## 🔹 7. Real-World Comparison

### 🔹 Enum Approach

```ts id="n1o2p3"
enum Role {
  Admin = "admin",
  User = "user"
}
```

---

### 🔹 Union Approach

```ts id="q1r2s3"
type Role = "admin" | "user";
```

---

### 🔹 Usage Difference

```ts id="t3u4v5"
Role.Admin       // enum
"admin"          // union
```

---

## 🔹 8. Pros and Cons

### 🔹 Enums

✔ Pros:

* Runtime presence
* Can attach methods
* Better for external integration

❌ Cons:

* More verbose
* Extra JS output
* Less flexible

---

### 🔹 Union Types

✔ Pros:

* Lightweight (no runtime code)
* More flexible
* Better type inference
* Easier to compose

❌ Cons:

* No runtime representation
* Cannot attach methods directly

---

## 🔹 9. Modern TypeScript Trend

👉 Most modern TypeScript codebases prefer:

✔ **Union types + `as const` objects**

Instead of enums.

---

### 🔹 Example Alternative

```ts id="w1x2y3"
const Status = {
  Success: "success",
  Error: "error"
} as const;

type Status = typeof Status[keyof typeof Status];
```

---

## 🔹 10. Decision Guide

### ✔ Use Enum when:

* You need runtime access
* You need reverse mapping
* You want grouping with methods
* You integrate with external systems

---

### ✔ Use Union when:

* You want simplicity
* You want zero runtime cost
* You need flexible type composition
* You rely on type inference and narrowing

---

## 🔹 11. Common Mistakes

### ❌ Using enum unnecessarily

```ts id="z1a2b3"
enum Status {
  A,
  B
}
```

👉 Could be simpler with union.

---

### ❌ Using union when runtime is needed

```ts id="c1d2e3"
type Status = "success" | "error";

console.log(Status); // ❌ doesn't exist
```

---

## 🔹 12. Best Practices

* ✔ Prefer union types for most cases
* ✔ Use string enums when runtime is required
* ✔ Avoid numeric enums unless needed
* ✔ Combine unions with `as const` for flexibility
* ✔ Keep consistency across your codebase

---

## 🚀 In Summary

* **Enums** → runtime objects, structured constants, heavier
* **Union types** → compile-time only, flexible, lightweight

👉 Think of it like this:

* Enum = “named constant object”
* Union = “set of allowed values”

👉 In modern TypeScript:

* Prefer **union types** for most use cases
* Use **enums only when runtime behavior is required**

This balance helps you build **clean, efficient, and scalable TypeScript applications**.

---

## 🔄 Iterating Over Enum Values in TypeScript — Full Detail

Enums in TypeScript exist at runtime (except `const enum`), which means you can **iterate over their values**. However, the way you iterate depends on whether the enum is:

* Numeric enum
* String enum

Each behaves differently, especially due to **reverse mapping** in numeric enums.

---

## 🔹 1. Why Iterate Over Enums?

You may need iteration for:

* Rendering UI lists (dropdowns, menus)
* Validation
* Logging/debugging
* Mapping enum values to labels
* Processing all possible states

---

## 🔹 2. Example Enum

```ts id="a1b2c3"
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

---

## 🔹 3. Problem with Numeric Enums (Reverse Mapping)

Numeric enums generate **both keys and values**:

```ts id="d4e5f6"
console.log(Direction);
```

---

### 🔹 Output

```ts id="g7h8i9"
{
  0: "Up",
  1: "Down",
  2: "Left",
  3: "Right",
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
}
```

---

👉 This means iteration will include **duplicates**.

---

## 🔹 4. Iterating Numeric Enums (Correct Way)

### ✔ Using `Object.keys()`

```ts id="j1k2l3"
const keys = Object.keys(Direction).filter(key => isNaN(Number(key)));
```

---

### 🔹 Result

```ts id="m1n2o3"
["Up", "Down", "Left", "Right"]
```

---

### ✔ Using `Object.values()`

```ts id="p1q2r3"
const values = Object.values(Direction).filter(value => typeof value === "number");
```

---

### 🔹 Result

```ts id="q3r4s5"
[0, 1, 2, 3]
```

---

## 🔹 5. Clean Iteration Example

```ts id="t1u2v3"
for (const key of Object.keys(Direction)) {
  if (isNaN(Number(key))) {
    console.log(key, Direction[key as keyof typeof Direction]);
  }
}
```

---

## 🔹 6. Iterating String Enums (Much Simpler)

String enums do NOT have reverse mapping.

---

### 🔹 Example

```ts id="v1w2x3"
enum Status {
  Success = "success",
  Error = "error"
}
```

---

### ✔ Using `Object.values()`

```ts id="y1z2a3"
const values = Object.values(Status);
```

---

### 🔹 Result

```ts id="b1c2d3"
["success", "error"]
```

---

### ✔ Iteration

```ts id="e1f2g3"
for (const value of Object.values(Status)) {
  console.log(value);
}
```

---

👉 No filtering needed ✔

---

## 🔹 7. Iterating Keys of String Enum

```ts id="h1i2j3"
const keys = Object.keys(Status);
```

---

### 🔹 Result

```ts id="k1l2m3"
["Success", "Error"]
```

---

## 🔹 8. Using `Object.entries()`

Works for both types:

```ts id="n1o2p3"
for (const [key, value] of Object.entries(Status)) {
  console.log(key, value);
}
```

---

## 🔹 9. Helper Function (Best Practice)

### 🔹 Get enum keys

```ts id="q1r2s3"
function getEnumKeys<T extends object>(enumObj: T): (keyof T)[] {
  return Object.keys(enumObj).filter(k => isNaN(Number(k))) as (keyof T)[];
}
```

---

### 🔹 Get enum values

```ts id="t3u4v5"
function getEnumValues<T extends object>(enumObj: T): T[keyof T][] {
  return Object.values(enumObj).filter(v => typeof v !== "string" || isNaN(Number(v))) as T[keyof T][];
}
```

---

## 🔹 10. Iterating `const enum` (Important)

```ts id="w1x2y3"
const enum Direction {
  Up,
  Down
}
```

👉 ❌ Cannot iterate

---

### 🔹 Why?

Because `const enum` is removed at compile time → no runtime object.

---

## 🔹 11. Real-World Example: Dropdown Options

```ts id="z1a2b3"
enum Role {
  Admin = "admin",
  User = "user"
}

const options = Object.values(Role).map(role => ({
  label: role,
  value: role
}));
```

---

## 🔹 12. Common Mistakes

### ❌ Iterating numeric enums directly

```ts id="c1d2e3"
Object.keys(Direction); // includes numbers ❌
```

---

### ❌ Forgetting to filter

Leads to duplicate or incorrect values.

---

### ❌ Trying to iterate `const enum`

```ts id="f1g2h3"
Object.values(Direction); // ❌ doesn't exist
```

---

## 🔹 13. Best Practices

* ✔ Prefer string enums for easier iteration
* ✔ Always filter numeric enums
* ✔ Use `Object.values()` for clean iteration
* ✔ Avoid iterating `const enum`
* ✔ Create helper utilities for reuse

---

## 🔹 14. Alternative (Modern Pattern)

Instead of enums:

```ts id="i1j2k3"
const Status = ["success", "error"] as const;
```

---

### 🔹 Usage

```ts id="l1m2n3"
type Status = typeof Status[number];

for (const s of Status) {
  console.log(s);
}
```

---

👉 Much simpler and safer.

---

## 🚀 In Summary

Iterating enums in TypeScript depends on the type:

* **Numeric enums** → require filtering due to reverse mapping
* **String enums** → easy to iterate using `Object.values()`
* **Const enums** → cannot be iterated

👉 Best practice:

* Prefer **string enums** or **`as const` arrays** for clean iteration
* Be careful with numeric enums due to duplicate mappings

Mastering enum iteration helps you build **clean UI lists, safer logic, and maintainable code structures**.


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

**[Day 10 — Narrowing & Type Guards →](../Day-10-Narrowing-TypeGuards/)**
