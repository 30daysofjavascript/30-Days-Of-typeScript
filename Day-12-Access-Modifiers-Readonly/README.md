# 📘 Day 12 — Access Modifiers & Readonly

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 🔐 Access Modifiers Overview in TypeScript — Full Detail

Access modifiers control **where class members (properties and methods) can be accessed or modified**. They are a core part of TypeScript’s object-oriented system and help enforce **encapsulation, safety, and clean architecture**.

TypeScript provides four key modifiers:

* `public`
* `private`
* `protected`
* `readonly`

---

## 🔹 1. `public` — Accessible Everywhere

### 🔹 Meaning

> A `public` member can be accessed from anywhere: inside the class, outside the class, and in subclasses.

---

### 🔹 Example

```ts 
class User {
  public name: string = "Alice";
}
```

---

### 🔹 Usage

```ts 
const user = new User();
console.log(user.name); // ✔ allowed
```

---

### 🔹 Key Points

✔ Default access level in TypeScript
✔ No restriction on usage
✔ Used for API-like properties

---

## 🔹 2. `private` — Only Inside the Class

### 🔹 Meaning

> A `private` member can only be accessed inside the class where it is defined.

It is completely hidden from:

* Outside code
* Subclasses

---

### 🔹 Example

```ts 
class BankAccount {
  private balance: number = 1000;

  getBalance() {
    return this.balance;
  }
}
```

---

### 🔴 Invalid Access

```ts 
const account = new BankAccount();
// account.balance; ❌ Error
```

---

### 🔹 Key Points

✔ Strong encapsulation
✔ Prevents external modification
✔ Not accessible in subclasses

---

## 🔹 3. `protected` — Class + Subclasses

### 🔹 Meaning

> A `protected` member is accessible inside:

* The class itself
* Any subclass

But NOT accessible outside the class hierarchy.

---

### 🔹 Example

```ts 
class Animal {
  protected age: number = 5;
}
```

---

### 🔹 Subclass Access

```ts 
class Dog extends Animal {
  showAge() {
    console.log(this.age); // ✔ allowed
  }
}
```

---

### 🔴 Outside Access

```ts 
const dog = new Dog();
// dog.age; ❌ Error
```

---

### 🔹 Key Points

✔ Useful for inheritance
✔ Allows controlled sharing
✔ Not accessible externally

---

## 🔹 4. `readonly` — Immutable After Initialization

### 🔹 Meaning

> A `readonly` property can only be assigned once — either at declaration or in the constructor — and cannot be modified afterward.

---

### 🔹 Example

```ts 
class User {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
```

---

### 🔹 Usage

```ts 
const user = new User(1);

console.log(user.id); // ✔ allowed
// user.id = 2; ❌ Error
```

---

### 🔹 Key Points

✔ Prevents accidental mutation
✔ Ideal for IDs, constants
✔ Enforced at compile time

---

## 🔹 5. Combining Access Modifiers

You can combine `readonly` with others:

---

### 🔹 Example

```ts 
class Product {
  constructor(
    public readonly id: string,
    private price: number
  ) {}
}
```

---

### 🔹 Behavior

| Member | Access Level | Mutable |
| ------ | ------------ | ------- |
| id     | public       | ❌ no    |
| price  | private      | ✔ yes   |

---

## 🔹 6. Summary Table

| Modifier  | Accessible Inside Class | Subclasses | Outside Class | Can Modify |
| --------- | ----------------------- | ---------- | ------------- | ---------- |
| public    | ✔ Yes                   | ✔ Yes      | ✔ Yes         | ✔ Yes      |
| private   | ✔ Yes                   | ❌ No       | ❌ No          | ✔ Yes      |
| protected | ✔ Yes                   | ✔ Yes      | ❌ No          | ✔ Yes      |
| readonly  | ✔ Yes                   | ✔ Yes      | ✔ Yes         | ❌ No       |

---

## 🔹 7. Real-World Example

```ts 
class Employee {
  constructor(
    public readonly id: number,
    public name: string,
    protected salary: number,
    private ssn: string
  ) {}

  getDetails() {
    return `${this.name} earns ${this.salary}`;
  }
}
```

---

## 🔹 8. Why Access Modifiers Matter

They help you:

✔ Enforce encapsulation
✔ Protect sensitive data
✔ Define clean APIs
✔ Control inheritance behavior
✔ Prevent unintended mutations

---

## 🔹 9. Common Mistakes

### ❌ Expecting private members in subclass

```ts 
class A {
  private x = 10;
}

class B extends A {
  test() {
    // this.x ❌ not allowed
  }
}
```

---

### ❌ Thinking readonly means deeply immutable

```ts 
class User {
  readonly address = { city: "NY" };
}

user.address.city = "LA"; // ✔ allowed (shallow readonly only)
```

---

## 🔹 10. Best Practices

* ✔ Use `private` for internal state
* ✔ Use `protected` for extensible logic
* ✔ Use `readonly` for constants and IDs
* ✔ Avoid overusing `public`
* ✔ Design classes with encapsulation in mind

---

## 🚀 In Summary

TypeScript access modifiers:

* `public` → accessible everywhere
* `private` → only inside the class
* `protected` → class + subclasses
* `readonly` → immutable after initialization

They are essential for building **secure, maintainable, and well-structured object-oriented systems in TypeScript**.

---

## 🔒 Private Fields (ECMAScript `#private`) in TypeScript — Full Detail

JavaScript (and therefore TypeScript) supports a **true runtime privacy mechanism** using the `#` prefix. These are called **ECMAScript private fields**, and they are fundamentally different from TypeScript’s `private` keyword.

They provide **real encapsulation enforced by the JavaScript engine at runtime**, not just at compile time.

---

## 🔹 1. What Are `#private` Fields?

Private fields are class members defined with a `#` prefix:

```ts 
class User {
  #password: string = "secret";
}
```

---

### 🔹 Key Idea

> `#private` fields are completely inaccessible outside the class — even at runtime.

---

## 🔹 2. Important Difference: TypeScript `private` vs `#private`

This is critical:

| Feature          | TypeScript `private`      | JavaScript `#private`  |
| ---------------- | ------------------------- | ---------------------- |
| Enforcement      | Compile-time only         | Runtime (real privacy) |
| Visibility in JS | Exists as normal property | Truly hidden           |
| Bypass possible  | Yes (via any/casting)     | No                     |
| Security level   | Soft encapsulation        | Hard encapsulation     |

---

## 🔹 3. TypeScript `private` is NOT truly private

```ts 
class User {
  private password: string = "secret";
}
```

### 🔴 Compiles to JavaScript:

```js
class User {
  constructor() {
    this.password = "secret";
  }
}
```

👉 The property still exists at runtime.

---

## 🔹 4. True Private Fields with `#`

```ts 
class User {
  #password: string = "secret";

  checkPassword() {
    return this.#password;
  }
}
```

---

## 🔴 Invalid Access

```ts 
const user = new User();

console.log(user.#password); // ❌ Syntax Error
```

---

👉 This fails even before execution.

---

## 🔹 5. Why `#private` Exists

It was introduced in ECMAScript to ensure:

✔ True encapsulation
✔ Security for internal state
✔ No accidental external access
✔ Strong runtime guarantees

---

## 🔹 6. How It Works Internally

When using `#private`:

* Property is not stored like normal object keys
* It is tracked internally by the JavaScript engine
* Cannot be accessed via `Object.keys`, reflection, or bracket notation

---

## 🔹 7. Example with Multiple Private Fields

```ts 
class BankAccount {
  #balance: number = 0;
  #pin: string;

  constructor(pin: string) {
    this.#pin = pin;
  }

  deposit(amount: number) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

---

## 🔹 8. Invalid Attempts to Access

```ts 
const account = new BankAccount("1234");

account.#balance; // ❌ Syntax error
account["#balance"]; // ❌ does NOT work
```

---

## 🔹 9. Private Methods

You can also define private methods:

```ts 
class Logger {
  #format(msg: string) {
    return `[LOG]: ${msg}`;
  }

  log(message: string) {
    console.log(this.#format(message));
  }
}
```

---

## 🔹 10. `#private` vs `private` Behavior Comparison

### 🔹 TypeScript `private`

```ts 
class A {
  private x = 10;
}
```

* Still accessible in compiled JS
* Can be bypassed via casting

---

### 🔹 ECMAScript `#private`

```ts 
class A {
  #x = 10;
}
```

* Cannot be accessed at all
* Enforced by runtime
* No bypass possible

---

## 🔹 11. Common Error Pattern

### ❌ Mixing both styles

```ts 
class User {
  private #password = "123"; // ❌ invalid combination
}
```

👉 You must choose one system.

---

## 🔹 12. Inheritance and `#private`

Private fields are **not accessible in subclasses**.

```ts 
class Parent {
  #secret = "hidden";
}

class Child extends Parent {
  test() {
    // this.#secret ❌ Error
  }
}
```

---

👉 Even subclasses cannot access them.

---

## 🔹 13. Real-World Example: Secure Account

```ts 
class SecureAccount {
  #balance: number = 1000;

  deposit(amount: number) {
    this.#balance += amount;
  }

  withdraw(amount: number) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
    }
  }

  getBalance() {
    return this.#balance;
  }
}
```

---

## 🔹 14. Why Use `#private` Instead of `private`

Use `#private` when:

✔ You need real runtime security
✔ You want guaranteed encapsulation
✔ You are building libraries or frameworks
✔ You want to prevent any external access

---

## 🔹 15. Limitations of `#private`

* Cannot be accessed dynamically (`obj["#field"]`)
* Cannot be inspected easily
* Not compatible with all older environments
* Cannot be used in some reflective patterns

---

## 🔹 16. Best Practices

* ✔ Use `#private` for sensitive internal state
* ✔ Prefer for security-critical logic
* ✔ Avoid overusing in simple applications
* ✔ Keep public API clean and minimal
* ✔ Do not mix with TypeScript `private`

---

## 🚀 In Summary

ECMAScript `#private` fields in TypeScript:

* Provide **true runtime privacy** (not just compile-time safety)
* Are completely inaccessible outside the class
* Cannot be accessed even via JavaScript tricks
* Are enforced by the JavaScript engine itself
* Are different from TypeScript’s `private` keyword

👉 They represent the **strongest form of encapsulation available in modern TypeScript/JavaScript classes**.


---

## 🔒 Readonly Properties in TypeScript — Full Detail

Readonly properties in TypeScript are used to define class fields (or object properties) that can be **assigned only once** and then become **immutable**. They are a key tool for enforcing **data safety, predictable state, and functional-style immutability inside object-oriented code**.

---

## 🔹 1. What is a `readonly` Property?

A `readonly` property is a property that:

> Can be assigned only during initialization (or in the constructor) and cannot be changed afterward.

---

### 🔹 Basic Example

```ts 
class User {
  readonly id: number = 1;
}
```

---

## 🔹 2. How `readonly` Works

Once assigned:

* ✔ You can read the value freely
* ❌ You cannot reassign it

---

### 🔹 Example

```ts 
const user = new User();

console.log(user.id); // ✔ allowed
user.id = 2; // ❌ Error
```

---

## 🔹 3. Initialization Rules

A `readonly` property can be initialized in:

### ✔ 1. Declaration

```ts 
class Product {
  readonly name: string = "Laptop";
}
```

---

### ✔ 2. Constructor (most common)

```ts 
class Product {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
```

---

👉 After constructor execution, the value is locked.

---

## 🔹 4. Readonly in Constructor Parameters (Shorthand)

TypeScript allows a shortcut:

```ts 
class User {
  constructor(public readonly name: string) {}
}
```

---

### 🔹 Equivalent to:

```ts 
class User {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

---

## 🔹 5. Readonly vs Constant (`const`)

| Feature  | `const`        | `readonly`                                             |
| -------- | -------------- | ------------------------------------------------------ |
| Scope    | Variables      | Class/object properties                                |
| Reassign | ❌ No           | ❌ No                                                   |
| Mutation | Not applicable | Object properties still mutable unless deeply readonly |

---

### 🔹 Example

```ts 
const x = 10;
```

vs

```ts 
class A {
  readonly x = 10;
}
```

---

## 🔹 6. Important: Readonly is SHALLOW

Readonly does NOT make objects deeply immutable.

---

### 🔹 Example

```ts 
class User {
  readonly address = {
    city: "Delhi"
  };
}

const user = new User();

user.address.city = "Mumbai"; // ✔ allowed
user.address = { city: "Mumbai" }; // ❌ error
```

---

👉 Only the reference is protected, not nested values.

---

## 🔹 7. Readonly with Interfaces

Readonly can also be used in interfaces:

```ts 
interface User {
  readonly id: number;
  name: string;
}
```

---

### 🔹 Implementation

```ts 
const user: User = {
  id: 1,
  name: "Alice"
};

user.id = 2; // ❌ Error
```

---

## 🔹 8. Readonly Arrays

Arrays can also be readonly:

```ts 
const numbers: readonly number[] = [1, 2, 3];
```

---

### 🔴 Invalid operations

```ts 
numbers.push(4); // ❌ Error
numbers[0] = 10; // ❌ Error
```

---

## 🔹 9. ReadonlyArray<T>

Alternative syntax:

```ts 
const arr: ReadonlyArray<string> = ["a", "b"];
```

---

## 🔹 10. Why Use Readonly?

Readonly properties help you:

✔ Prevent accidental mutation
✔ Enforce immutability
✔ Improve code predictability
✔ Model fixed data (IDs, configs)
✔ Support functional programming patterns

---

## 🔹 11. Real-World Example

```ts 
class Order {
  constructor(
    public readonly orderId: string,
    public readonly createdAt: Date,
    public status: string
  ) {}
}
```

---

### 🔹 Usage

```ts 
const order = new Order("ORD123", new Date(), "pending");

order.status = "shipped"; // ✔ allowed
order.orderId = "NEW"; // ❌ error
```

---

## 🔹 12. Readonly in APIs and Domain Models

Common use cases:

* IDs (`userId`, `orderId`)
* timestamps (`createdAt`)
* configuration values
* constants inside objects
* immutable state models

---

## 🔹 13. Common Mistakes

### ❌ Expecting deep immutability

```ts 
class A {
  readonly obj = { x: 1 };
}

a.obj.x = 2; // ✔ allowed
```

---

### ❌ Trying to reassign readonly

```ts 
this.id = 10; // ❌ after initialization
```

---

### ❌ Confusing with `const`

`const` is for variables, not properties.

---

## 🔹 14. Best Practices

* ✔ Use readonly for IDs and immutable data
* ✔ Prefer readonly constructor parameters for brevity
* ✔ Combine with `private` for encapsulated immutability
* ✔ Avoid unnecessary mutability in domain models
* ✔ Use utility types like `Readonly<T>` when needed

---

## 🔹 15. When NOT to Use Readonly

Avoid `readonly` when:

* Values must change over time
* You are modeling mutable state (e.g., UI state, counters)
* You need dynamic updates

---

## 🚀 In Summary

Readonly properties in TypeScript:

* Can be assigned only once (init or constructor)
* Prevent reassignment after creation
* Are shallow (do not freeze nested objects)
* Work in classes, interfaces, and arrays
* Improve safety and predictability

👉 They are essential for building **reliable, immutable, and well-structured TypeScript systems**.


---

## 🔒 Readonly with Interfaces & Type Aliases in TypeScript — Full Detail

TypeScript allows you to make properties immutable not only in classes, but also in **interfaces and type aliases**. This is done using the `readonly` modifier, which enforces that a property can be assigned only once and cannot be changed afterward.

This feature is especially useful for defining **immutable data models, API responses, and configuration objects**.

---

## 🔹 1. Readonly in Interfaces

You can mark interface properties as `readonly` to prevent reassignment.

---

### 🔹 Basic Example

```ts 
interface User {
  readonly id: number;
  name: string;
}
```

---

### 🔹 Usage

```ts 
const user: User = {
  id: 1,
  name: "Alice"
};

user.name = "Bob"; // ✔ allowed
user.id = 2;       // ❌ Error
```

---

## 🔹 2. What Readonly Means in Interfaces

When a property is marked `readonly`:

✔ It can be assigned during object creation
✔ It cannot be modified afterward
✔ TypeScript enforces this at compile time

---

## 🔹 3. Readonly in Type Aliases

You can also use `readonly` in type aliases:

```ts 
type Product = {
  readonly id: string;
  name: string;
  price: number;
};
```

---

### 🔹 Usage

```ts 
const p: Product = {
  id: "P1",
  name: "Laptop",
  price: 1000
};

p.price = 1200; // ✔ allowed
p.id = "P2";    // ❌ Error
```

---

## 🔹 4. Readonly Arrays in Interfaces and Types

Arrays can also be made immutable.

---

### 🔹 Interface Example

```ts 
interface Data {
  readonly values: number[];
}
```

---

### 🔹 Type Alias Example

```ts 
type Data = {
  readonly values: ReadonlyArray<number>;
};
```

---

### 🔴 Usage

```ts 
const data: Data = {
values: [1, 2, 3]
};

data.values.push(4); // ❌ Error
data.values[0] = 10;  // ❌ Error
```

---

## 🔹 5. Important: Readonly is SHALLOW

Readonly only protects the property reference, not nested objects.

---

### 🔹 Example

```ts 
interface User {
  readonly profile: {
    name: string;
  };
}
```

---

### 🔹 Usage

```ts 
const user: User = {
  profile: {
    name: "Alice"
  }
};

user.profile = { name: "Bob" }; // ❌ Error
user.profile.name = "Bob";      // ✔ allowed
```

---

## 🔹 6. `Readonly<T>` Utility Type

TypeScript provides a built-in utility type:

```ts 
type User = {
  id: number;
  name: string;
};

type ReadonlyUser = Readonly<User>;
```

---

### 🔹 Equivalent Result

```ts 
type ReadonlyUser = {
  readonly id: number;
  readonly name: string;
};
```

---

### 🔹 Usage

```ts 
const user: ReadonlyUser = {
  id: 1,
  name: "Alice"
};

user.name = "Bob"; // ❌ Error
```

---

## 🔹 7. Deep vs Shallow Readonly

| Type              | Behavior                        |
| ----------------- | ------------------------------- |
| `readonly`        | Shallow (top-level only)        |
| `Readonly<T>`     | Also shallow                    |
| Deep immutability | Requires custom recursive types |

---

## 🔹 8. Real-World Example: API Response

```ts 
interface ApiResponse {
  readonly status: number;
  readonly data: {
    id: string;
    name: string;
  };
}
```

---

### 🔹 Usage

```ts 
const response: ApiResponse = {
  status: 200,
  data: {
    id: "U1",
    name: "Alice"
  }
};

response.status = 500;      // ❌ Error
response.data.name = "Bob"; // ✔ allowed
```

---

## 🔹 9. Why Use Readonly in Interfaces and Types?

✔ Prevent accidental mutation
✔ Ensure data consistency
✔ Model immutable domain objects
✔ Improve predictability of APIs
✔ Support functional programming patterns

---

## 🔹 10. Common Mistakes

### ❌ Thinking it makes deep immutability

```ts 
type T = {
  readonly obj: { x: number };
};

t.obj.x = 10; // ✔ still allowed
```

---

### ❌ Confusing with `const`

* `const` → variable cannot be reassigned
* `readonly` → property cannot be reassigned

---

### ❌ Expecting runtime enforcement

Readonly is only enforced at compile time.

---

## 🔹 11. Best Practices

* ✔ Use `readonly` for IDs, timestamps, configs
* ✔ Use `Readonly<T>` for whole immutable objects
* ✔ Combine with interfaces for API contracts
* ✔ Avoid overusing for highly dynamic objects
* ✔ Use deep readonly utilities if needed

---

## 🚀 In Summary

Readonly in interfaces and type aliases:

* Prevents reassignment of properties
* Works in interfaces, types, and arrays
* Is enforced at compile time only
* Is shallow (does not deeply freeze objects)
* Can be applied using `readonly` or `Readonly<T>`

👉 It is a core tool for building **safe, predictable, and immutable data structures in TypeScript**.

----

### Access Modifiers

| Modifier | Accessible In | Description |
|----------|--------------|-------------|
| `public` (default) | Everywhere | No restriction |
| `private` | Class body only | TypeScript compile-time check |
| `#field` | Class body only | JavaScript runtime enforcement |
| `protected` | Class + subclasses | Inherited access |
| `readonly` | After set in constructor | Cannot be reassigned |

```ts
class BankAccount {
  public owner: string;          // anyone can read/write
  private balance: number;       // compile-time private
  #pin: string;                  // runtime private (truly inaccessible)
  protected log: string[] = [];  // accessible in subclasses

  constructor(owner: string, balance: number, pin: string) {
    this.owner   = owner;
    this.balance = balance;
    this.#pin    = pin;
  }
}

// TypeScript 'private' vs JS '#private':
// TypeScript: compile-time only — (obj as any).balance still works at runtime
// JS #private: runtime enforcement — TRULY inaccessible outside class
```

### Readonly

```ts
class Config {
  readonly host: string;   // set once in constructor, then immutable
  readonly port: number = 3000; // initialized inline

  constructor(host: string) { this.host = host; }
}

// Readonly<T> — makes ALL properties readonly
const user: Readonly<User> = { id: 1, name: "Alice" };
// user.name = "Bob"; // ❌
```

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

**[Day 13 — Generics: Basics →](../Day-13-Generics-Basics/)**
