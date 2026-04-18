# 📘 Day 11 — Classes in TypeScript

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Class property declarations and initialization
- Constructor parameter shorthand (public/private/readonly in params)
- Inheritance with extends and super
- Getters and setters with type checking
- Static properties and methods
- Abstract classes — define contracts for subclasses
- Implementing interfaces with implements
- Method overriding and the override keyword (TypeScript 4.3+)

## 🏗️ Class Property Declarations and Initialization in TypeScript — Full Detail

In TypeScript, class property declarations define **what data a class instance can hold**, and initialization controls **how those properties get their initial values**.

Because TypeScript adds static typing to JavaScript classes, it also enforces **strict rules about initialization**, especially when `strictPropertyInitialization` is enabled.

---

## 🔹 1. Basic Property Declaration

You can declare properties directly inside a class:

```ts 
class User {
  name: string;
  age: number;
}
```

---

### 🔹 Important

At this point:

* TypeScript knows the shape
* But values are NOT initialized yet

---

## 🔹 2. Initialization in Constructor

The most common and safe way is initializing in the constructor:

```ts 
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

---

## 🔹 3. Why Initialization Matters

If you don’t initialize properties, TypeScript throws an error:

```ts 
class User {
  name: string; // ❌ Error (strict mode)
}
```

---

### 🔹 Reason

TypeScript ensures:

> “Every property must be defined before it is used.”

---

## 🔹 4. Property Initialization at Declaration

You can initialize properties directly:

```ts 
class User {
  name: string = "Default";
  age: number = 0;
}
```

---

### ✔ When to use:

* Default values
* Simple classes
* No constructor logic needed

---

## 🔹 5. Optional Properties (`?`)

```ts 
class User {
  name?: string;
}
```

---

👉 Means:

* Property may be missing
* Type becomes `string | undefined`

---

## 🔹 6. Definite Assignment Assertion (`!`)

Sometimes TypeScript cannot detect initialization, but you guarantee it:

```ts 
class User {
  name!: string;

  initialize() {
    this.name = "Alice";
  }
}
```

---

### 🔹 Meaning

> “Trust me, this will be initialized before use.”

---

## 🔹 7. Readonly Properties

```ts 
class User {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
```

---

👉 Cannot be reassigned after initialization.

---

## 🔹 8. Parameter Properties (Shortcut)

TypeScript allows a shorthand:

```ts 
class User {
  constructor(public name: string, public age: number) {}
}
```

---

### ✔ This automatically:

* Declares properties
* Initializes them
* Assigns constructor values

---

## 🔹 9. Property Initialization Order

Initialization happens in this order:

1. Base class properties
2. Field initializers
3. Constructor body

---

```ts 
class A {
  x = 1;
  constructor() {
    console.log(this.x);
  }
}
```

---

## 🔹 10. Static Properties

Static properties belong to the class itself:

```ts 
class Counter {
  static count = 0;
}
```

---

### 🔹 Usage

```ts 
Counter.count++;
```

---

## 🔹 11. Complex Initialization Example

```ts 
class Product {
  id: number;
  name: string;
  price: number = 0;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

---

## 🔹 12. Strict Property Initialization (`strictPropertyInitialization`)

When enabled:

```json 
{
  "compilerOptions": {
    "strictPropertyInitialization": true
  }
}
```

---

### 🔴 Enforces:

* Every property must be initialized
* Either in constructor or inline

---

## 🔹 13. Common Mistakes

### ❌ Not initializing property

```ts 
class User {
  name: string; // ❌ error if strict mode
}
```

---

### ❌ Assuming undefined is allowed

```ts 
class User {
  name: string;
}
```

👉 Not automatically `undefined`.

---

### ❌ Overusing `!`

```ts 
name!: string;
```

👉 Can hide real initialization bugs.

---

## 🔹 14. Best Practices

* ✔ Prefer constructor initialization
* ✔ Use inline defaults for simple values
* ✔ Avoid excessive `!` assertions
* ✔ Use `readonly` when possible
* ✔ Enable strict mode for safety

---

## 🔹 15. Real-World Example

```ts 
class Car {
  readonly vin: string;
  model: string;
  year: number;

  constructor(vin: string, model: string, year: number) {
    this.vin = vin;
    this.model = model;
    this.year = year;
  }
}
```

---

## 🚀 In Summary

Class property declarations and initialization in TypeScript:

* Define structure of class instances
* Must be initialized before use (strict mode)
* Can be initialized via constructor, inline, or parameter properties
* Support optional and readonly modifiers
* Are enforced by TypeScript for safety

👉 They ensure your classes are **predictable, safe, and fully type-consistent from creation to usage**.

---

## 🏗️ Constructor Parameter Shorthand in TypeScript — `public`, `private`, `readonly` in Parameters (Full Detail)

TypeScript provides a powerful shortcut called **constructor parameter properties**. It allows you to **declare and initialize class properties directly in the constructor parameters**, using access modifiers like `public`, `private`, and `readonly`.

This removes repetitive code and makes classes much more concise.

---

## 🔹 1. What is Constructor Parameter Shorthand?

Instead of writing:

* property declaration
* constructor assignment

You can combine both in one step:

```ts 
class User {
  constructor(public name: string, public age: number) {}
}
```

---

## 🔹 2. Equivalent Long Form

The shorthand above is equivalent to:

```ts 
class User {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

---

👉 TypeScript automatically generates the properties and assignments.

---

## 🔹 3. `public` in Constructor Parameters

### 🔹 Example

```ts 
class User {
  constructor(public name: string) {}
}
```

---

### 🔹 What it means:

* Property is created automatically
* Accessible from outside the class
* Default visibility if no modifier is specified

---

### 🔹 Usage

```ts 
const user = new User("Alice");
console.log(user.name); // ✔ accessible
```

---

## 🔹 4. `private` in Constructor Parameters

### 🔹 Example

```ts 
class User {
  constructor(private password: string) {}
}
```

---

### 🔹 What it means:

* Property is created automatically
* Only accessible inside the class
* Not accessible outside

---

### 🔹 Usage

```ts 
const user = new User("secret");

// console.log(user.password); ❌ Error
```

---

### 🔹 Internal access

```ts 
class User {
  constructor(private password: string) {}

  checkPassword() {
    return this.password;
  }
}
```

---

## 🔹 5. `readonly` in Constructor Parameters

### 🔹 Example

```ts 
class User {
  constructor(public readonly id: number) {}
}
```

---

### 🔹 What it means:

* Property is initialized in constructor
* Cannot be modified later
* Still accessible publicly

---

### 🔹 Usage

```ts 
const user = new User(1);

console.log(user.id); // ✔ allowed
// user.id = 2; ❌ error
```

---

## 🔹 6. Combining Modifiers

You can combine access modifiers with `readonly`:

---

### 🔹 Example

```ts 
class Account {
  constructor(
    public readonly username: string,
    private balance: number
  ) {}
}
```

---

### 🔹 Behavior

| Property | Access Level | Mutable |
| -------- | ------------ | ------- |
| username | public       | ❌ no    |
| balance  | private      | ✔ yes   |

---

## 🔹 7. Why This Feature Exists

Constructor shorthand:

✔ Reduces boilerplate
✔ Improves readability
✔ Keeps class definitions compact
✔ Encourages clean OOP design

---

## 🔹 8. Real-World Example

```ts 
class Product {
  constructor(
    public readonly id: string,
    public name: string,
    private price: number
  ) {}

  getPrice() {
    return this.price;
  }
}
```

---

### 🔹 Usage

```ts 
const p = new Product("A1", "Laptop", 1000);

console.log(p.id);      // ✔ public
console.log(p.name);    // ✔ public
console.log(p.getPrice()); // ✔ via method
```

---

## 🔹 9. Common Mistakes

### ❌ Forgetting modifier

```ts 
class User {
  constructor(name: string) {} // ❌ no property created
}
```

---

### ❌ Expecting automatic property without modifier

You MUST use `public/private/readonly`.

---

### ❌ Trying to modify readonly

```ts 
class User {
  constructor(public readonly id: number) {}
}

const u = new User(1);
u.id = 2; // ❌ error
```

---

## 🔹 10. Access Level Summary

| Modifier | Declares Property | Accessible Outside | Mutable |
| -------- | ----------------- | ------------------ | ------- |
| public   | ✔ yes             | ✔ yes              | ✔ yes   |
| private  | ✔ yes             | ❌ no               | ✔ yes   |
| readonly | ✔ yes             | ✔ yes              | ❌ no    |

---

## 🔹 11. Best Practices

* ✔ Use shorthand to reduce boilerplate
* ✔ Prefer `readonly` for IDs and constants
* ✔ Use `private` for internal state
* ✔ Keep constructors clean and minimal
* ✔ Avoid overusing public properties

---

## 🔹 12. When NOT to Use It

Avoid shorthand when:

* You need complex initialization logic
* Property requires validation before assignment
* You want explicit separation of declaration and logic

---

## 🚀 In Summary

Constructor parameter shorthand in TypeScript:

* Combines declaration + initialization in one step
* Supports `public`, `private`, and `readonly` modifiers
* Reduces boilerplate significantly
* Improves readability and maintainability
* Works only in class constructors

👉 It is one of the most practical features for writing **clean, concise, and modern TypeScript classes**.

---

## 🧬 Inheritance with `extends` and `super` in TypeScript — Full Detail

Inheritance in TypeScript allows one class to **reuse and extend the behavior of another class**. It is a core concept of object-oriented programming (OOP) and is implemented using the keywords `extends` and `super`.

TypeScript builds on JavaScript’s inheritance model, but adds **type safety and strict structure**.

---

## 🔹 1. What is Inheritance?

Inheritance means:

> A class (child) can reuse properties and methods from another class (parent).

---

### 🔹 Basic Idea

* Parent class → defines shared logic
* Child class → extends and customizes it

---

## 🔹 2. Using `extends`

The `extends` keyword creates a relationship between two classes.

---

### 🔹 Example

```ts 
class Animal {
  move() {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}
```

---

### 🔹 Usage

```ts 
const dog = new Dog();

dog.move(); // inherited
dog.bark(); // own method
```

---

## 🔹 3. What Gets Inherited?

A child class inherits:

✔ Public methods
✔ Public properties
✔ Protected members

It does NOT inherit:

❌ Private members (direct access)

---

## 🔹 4. Using `super`

The `super` keyword is used to:

* Call the parent class constructor
* Access parent class methods

---

## 🔹 5. Calling Parent Constructor

```ts 
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // calls Animal constructor
  }
}
```

---

### 🔹 Usage

```ts 
const dog = new Dog("Buddy", "Labrador");

console.log(dog.name);  // inherited
console.log(dog.breed); // own property
```

---

## 🔹 6. Why `super()` is Required

TypeScript enforces:

> You must call `super()` before using `this` in a derived class.

---

### 🔴 Wrong Example

```ts 
class Dog extends Animal {
  constructor(name: string) {
    this.name = name; // ❌ Error
    super(name);
  }
}
```

---

### ✔ Correct

```ts 
class Dog extends Animal {
  constructor(name: string) {
    super(name);
    this.name = name;
  }
}
```

---

## 🔹 7. Using `super` to Call Parent Methods

```ts 
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  speak() {
    super.speak(); // call parent method
    console.log("Woof!");
  }
}
```

---

### 🔹 Output

```ts 
Animal sound
Woof!
```

---

## 🔹 8. Method Overriding

A child class can redefine parent methods:

```ts 
class Vehicle {
  start() {
    console.log("Starting vehicle");
  }
}

class Car extends Vehicle {
  start() {
    console.log("Starting car");
  }
}
```

---

👉 Child method overrides parent method.

---

## 🔹 9. Access Modifiers in Inheritance

### 🔹 `public`

Accessible everywhere.

---

### 🔹 `protected`

Accessible in:

* Class itself
* Child classes

```ts 
class Animal {
  protected move() {}
}

class Dog extends Animal {
  walk() {
    this.move(); // ✔ allowed
  }
}
```

---

### 🔹 `private`

Not accessible in child classes.

```ts 
class Animal {
  private secret() {}
}

class Dog extends Animal {
  test() {
    // this.secret(); ❌ not allowed
  }
}
```

---

## 🔹 10. Constructor Chaining

Inheritance always calls constructors in order:

1. Parent constructor
2. Child constructor

---

```ts 
class A {
  constructor() {
    console.log("A");
  }
}

class B extends A {
  constructor() {
    super();
    console.log("B");
  }
}
```

---

### 🔹 Output

```ts 
A
B
```

---

## 🔹 11. Real-World Example

```ts 
class User {
  constructor(public name: string) {}

  login() {
    console.log(`${this.name} logged in`);
  }
}

class Admin extends User {
  constructor(name: string, public role: string) {
    super(name);
  }

  deleteUser() {
    console.log(`${this.name} deleted a user`);
  }
}
```

---

### 🔹 Usage

```ts 
const admin = new Admin("Alice", "superadmin");

admin.login();
admin.deleteUser();
```

---

## 🔹 12. Why Use Inheritance?

✔ Code reuse
✔ Logical hierarchy
✔ Shared behavior
✔ Cleaner architecture

---

## 🔹 13. Common Mistakes

### ❌ Forgetting `super()`

```ts 
class B extends A {
  constructor() {
    // ❌ missing super()
  }
}
```

---

### ❌ Accessing `this` before `super()`

---

### ❌ Overusing inheritance

Deep inheritance chains make code hard to maintain.

---

## 🔹 14. Inheritance vs Composition

| Feature     | Inheritance         | Composition          |
| ----------- | ------------------- | -------------------- |
| Reuse type  | "is-a" relationship | "has-a" relationship |
| Flexibility | Lower               | Higher               |
| Complexity  | Can grow fast       | More controlled      |

---

👉 Modern TypeScript prefers composition in many cases.

---

## 🔹 15. Best Practices

* ✔ Keep inheritance shallow
* ✔ Use `super()` correctly
* ✔ Prefer `protected` over `private` for extensibility
* ✔ Avoid unnecessary inheritance chains
* ✔ Use composition when possible

---

## 🚀 In Summary

Inheritance in TypeScript using `extends` and `super`:

* Allows one class to reuse another class’s logic
* Requires `super()` to initialize the parent
* Supports method overriding
* Works with access modifiers (`public`, `protected`, `private`)
* Enables structured object-oriented design

👉 It is a key feature for building **scalable, reusable, and hierarchical class-based systems in TypeScript**.


---

## 🔐 Getters and Setters in TypeScript — with Type Checking (Full Detail)

Getters and setters allow you to **control how class properties are accessed and modified**. Instead of exposing raw fields directly, you can wrap them in logic that enforces validation, transformation, or security rules.

TypeScript adds strong typing on top of JavaScript getters and setters, making them safer and more predictable.

---

## 🔹 1. What Are Getters and Setters?

* **Getter** → runs when you *read* a property
* **Setter** → runs when you *write* a property

They look like properties, but behave like functions.

---

## 🔹 2. Basic Syntax

```ts 
class User {
  private _name: string = "";

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
```

---

## 🔹 3. How They Are Used

```ts 
const user = new User();

user.name = "Alice"; // setter
console.log(user.name); // getter
```

---

## 🔹 4. Why Use Getters and Setters?

They help you:

✔ Add validation logic
✔ Control access to private fields
✔ Transform data on read/write
✔ Maintain encapsulation
✔ Enforce type safety rules

---

## 🔹 5. Type Safety in Getters and Setters

TypeScript enforces:

* Getter must return a specific type
* Setter must accept a specific type

---

### 🔹 Example

```ts 
class Product {
  private _price: number = 0;

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
```

---

👉 Type mismatch causes compile-time errors.

---

## 🔹 6. Adding Validation in Setters

Setters are ideal for validation logic.

---

### 🔹 Example: Prevent negative values

```ts 
class Product {
  private _price: number = 0;

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }
}
```

---

## 🔹 7. Getter with Computed Values

Getters can compute values dynamically.

---

### 🔹 Example

```ts 
class Rectangle {
  constructor(public width: number, public height: number) {}

  get area(): number {
    return this.width * this.height;
  }
}
```

---

### 🔹 Usage

```ts 
const rect = new Rectangle(10, 5);

console.log(rect.area); // 50
```

---

## 🔹 8. Read-Only Computed Properties

If you only define a getter:

```ts 
class Circle {
  constructor(public radius: number) {}

  get diameter(): number {
    return this.radius * 2;
  }
}
```

👉 This becomes a **read-only property**.

---

## 🔹 9. Type Checking in Setters

TypeScript ensures type correctness at compile time:

```ts 
class User {
  private _age: number = 0;

  set age(value: number) {
    this._age = value;
  }
}
```

---

### 🔴 Invalid usage:

```ts 
user.age = "twenty"; // ❌ Error: string not assignable to number
```

---

## 🔹 10. Getters and Setters with Complex Types

```ts 
type Role = "admin" | "user";

class Account {
  private _role: Role = "user";

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }
}
```

---

## 🔹 11. Encapsulation Example

```ts 
class BankAccount {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set deposit(amount: number) {
    if (amount <= 0) {
      throw new Error("Invalid deposit");
    }
    this._balance += amount;
  }
}
```

---

## 🔹 12. Getter Without Setter (Read-Only Pattern)

```ts 
class User {
  private _id: number = 1;

  get id(): number {
    return this._id;
  }
}
```

---

👉 External code cannot modify `id`.

---

## 🔹 13. Setter Without Getter (Write-Only Pattern)

Rare, but possible:

```ts 
class Logger {
  private _log: string = "";

  set message(msg: string) {
    this._log = msg;
  }
}
```

---

## 🔹 14. Important Rules

✔ Getter must return a value
✔ Setter must accept exactly one parameter
✔ Getter/setter names must match
✔ Cannot overload getters/setters

---

## 🔹 15. Common Mistakes

### ❌ Returning wrong type

```ts 
get age(): string {
  return 25; // ❌ mismatch
}
```

---

### ❌ Multiple parameters in setter

```ts 
set age(value: number, extra: number) {} // ❌ invalid
```

---

### ❌ Infinite recursion

```ts 
get name() {
  return this.name; // ❌ causes stack overflow
}
```

---

👉 Correct:

```ts 
return this._name;
```

---

## 🔹 16. Best Practices

* ✔ Use private backing fields (`_name`, `_value`)
* ✔ Keep getters pure (no side effects)
* ✔ Use setters for validation only
* ✔ Prefer computed getters for derived values
* ✔ Avoid heavy logic in accessors

---

## 🔹 17. Real-World Example

```ts 
class Temperature {
  private _celsius: number = 0;

  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Below absolute zero");
    }
    this._celsius = value;
  }
}
```

---

## 🚀 In Summary

Getters and setters in TypeScript:

* Control how properties are accessed and modified
* Support strong type checking on input and output
* Enable validation, transformation, and encapsulation
* Allow computed properties via getters
* Improve safety and maintainability of class design

👉 They are a key tool for building **robust, secure, and well-encapsulated object-oriented systems in TypeScript**.


---

## 🧱 Static Properties and Methods in TypeScript — Full Detail

Static properties and methods belong to the **class itself**, not to instances of the class. This means you can access them without creating an object using `new`.

They are defined using the `static` keyword and are commonly used for **utility functions, shared state, and factory logic**.

---

## 🔹 1. What Does `static` Mean?

When you mark something as `static`:

> It belongs to the class, not to objects created from the class.

---

### 🔹 Example Concept

* Instance member → belongs to each object
* Static member → shared across all objects

---

## 🔹 2. Static Property Example

```ts 
class Counter {
  static count: number = 0;
}
```

---

### 🔹 Access

```ts 
console.log(Counter.count); // ✔ correct
```

---

### 🔴 Wrong usage:

```ts 
const c = new Counter();
console.log(c.count); // ❌ Error (not instance property)
```

---

## 🔹 3. Static Methods

Static methods are functions defined on the class itself.

---

### 🔹 Example

```ts 
class MathUtil {
  static add(a: number, b: number): number {
    return a + b;
  }
}
```

---

### 🔹 Usage

```ts 
console.log(MathUtil.add(2, 3)); // 5
```

---

## 🔹 4. Why Use Static Members?

Static members are useful when:

✔ Behavior doesn’t depend on instance state
✔ You need shared data across all instances
✔ You want utility/helper functions
✔ You want factory methods

---

## 🔹 5. Static vs Instance Members

| Feature     | Static           | Instance            |
| ----------- | ---------------- | ------------------- |
| Belongs to  | Class itself     | Object instance     |
| Access      | ClassName.member | object.member       |
| Uses `this` | Class context    | Object context      |
| Memory      | Shared           | Separate per object |

---

## 🔹 6. Static Properties with State

```ts 
class User {
  static totalUsers: number = 0;

  constructor() {
    User.totalUsers++;
  }
}
```

---

### 🔹 Usage

```ts 
new User();
new User();

console.log(User.totalUsers); // 2
```

---

👉 Shared counter across all instances.

---

## 🔹 7. Static Methods with Internal Logic

```ts 
class StringUtils {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
```

---

### 🔹 Usage

```ts 
console.log(StringUtils.capitalize("hello")); // "Hello"
```

---

## 🔹 8. Static and `this` Behavior

Inside static methods, `this` refers to the class, not the instance.

```ts 
class Example {
  static name = "ExampleClass";

  static show() {
    console.log(this.name);
  }
}
```

---

### 🔹 Output

```ts 
Example.show(); // "ExampleClass"
```

---

## 🔹 9. Static Factory Methods

Static methods are often used to create instances.

```ts 
class User {
  constructor(public name: string) {}

  static createGuest(): User {
    return new User("Guest");
  }
}
```

---

### 🔹 Usage

```ts 
const guest = User.createGuest();
```

---

## 🔹 10. Static Initialization Blocks (Advanced)

TypeScript supports JavaScript static blocks:

```ts 
class Config {
  static settings: Record<string, string>;

  static {
    Config.settings = {
      theme: "dark",
      language: "en"
    };
  }
}
```

---

## 🔹 11. Real-World Example

```ts 
class Logger {
  static logs: string[] = [];

  static log(message: string) {
    this.logs.push(message);
    console.log(message);
  }

  static getLogs() {
    return this.logs;
  }
}
```

---

### 🔹 Usage

```ts 
Logger.log("App started");
Logger.log("User logged in");

console.log(Logger.getLogs());
```

---

## 🔹 12. Static vs Singleton Pattern

Static members are often used for singleton-like behavior:

```ts 
class AppConfig {
  static instance = new AppConfig();

  private constructor() {}
}
```

---

👉 Ensures only one shared instance.

---

## 🔹 13. Access Modifiers with Static Members

Static members can also use:

* `public`
* `private`
* `protected`

---

### 🔹 Example

```ts 
class Secret {
  private static key = "12345";

  static getKey() {
    return this.key;
  }
}
```

---

## 🔹 14. Common Mistakes

### ❌ Accessing static via instance

```ts 
const obj = new MathUtil();
obj.add(1, 2); // ❌ error
```

---

### ❌ Using `this` incorrectly in static context

```ts 
class A {
  static value = 10;

  static test() {
    console.log(this.value); // ✔ correct
  }
}
```

---

### ❌ Expecting static to behave like instance

Static does NOT belong to objects.

---

## 🔹 15. Best Practices

* ✔ Use static for utility functions
* ✔ Use static for shared state
* ✔ Avoid overusing static (can reduce flexibility)
* ✔ Prefer instance methods for behavior tied to data
* ✔ Use factory methods for controlled instantiation

---

## 🔹 16. When NOT to Use Static

Avoid static when:

* Behavior depends on instance data
* You need polymorphism (inheritance overrides)
* You want dependency injection

---

## 🚀 In Summary

Static properties and methods in TypeScript:

* Belong to the class, not instances
* Are accessed via `ClassName.member`
* Are useful for shared state and utilities
* Cannot access instance properties directly
* Support encapsulation and factory patterns

👉 They are a powerful tool for building **utility-based, shared, and globally accessible class logic in TypeScript**.


---

## 🧩 Abstract Classes in TypeScript — Full Detail

Abstract classes are a feature that lets you define a **base class that cannot be instantiated directly**, but instead is meant to be **extended by other classes**. They are used to define a **contract + shared implementation** for subclasses.

Think of them as a middle ground between:

* Interfaces (pure contract, no implementation)
* Concrete classes (fully usable objects)

---

## 🔹 1. What is an Abstract Class?

An abstract class is a class that:

* Cannot be instantiated directly
* Can contain implemented methods
* Can contain abstract methods (no implementation)
* Is meant to be extended

---

### 🔹 Syntax

```ts 
abstract class Animal {
  abstract makeSound(): void;
}
```

---

## 🔹 2. Why Use Abstract Classes?

They help you:

✔ Define a shared blueprint
✔ Enforce structure in subclasses
✔ Provide shared logic
✔ Avoid duplication
✔ Combine abstraction + implementation

---

## 🔹 3. Cannot Be Instantiated

```ts 
abstract class Animal {}

const a = new Animal(); // ❌ Error
```

---

👉 Abstract classes are incomplete by design.

---

## 🔹 4. Abstract Methods

An abstract method has:

* No implementation
* Must be implemented by subclasses

---

### 🔹 Example

```ts 
abstract class Animal {
  abstract makeSound(): void;
}
```

---

## 🔹 5. Implementing Abstract Classes

Subclasses must implement all abstract methods.

---

### 🔹 Example

```ts 
class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
```

---

## 🔹 6. Using the Class

```ts 
const dog = new Dog();
dog.makeSound(); // Woof!
```

---

## 🔹 7. Abstract Class with Concrete Methods

Abstract classes can also include fully implemented methods.

---

### 🔹 Example

```ts 
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}
```

---

### 🔹 Usage

```ts 
class Cat extends Animal {
  makeSound(): void {
    console.log("Meow");
  }
}
```

---

👉 `move()` is inherited as-is.

---

## 🔹 8. Abstract Properties

You can also define abstract properties.

---

### 🔹 Example

```ts 
abstract class Vehicle {
  abstract speed: number;
}
```

---

### 🔹 Implementation

```ts 
class Car extends Vehicle {
  speed = 120;
}
```

---

## 🔹 9. Constructor in Abstract Classes

Abstract classes can have constructors.

---

### 🔹 Example

```ts 
abstract class Animal {
  constructor(public name: string) {}
}
```

---

### 🔹 Subclass

```ts 
class Dog extends Animal {
  makeSound() {
    console.log(this.name + " barks");
  }
}
```

---

## 🔹 10. Access Modifiers in Abstract Classes

Abstract classes support:

* `public`
* `protected`
* `private`

---

### 🔹 Example

```ts 
abstract class Animal {
  protected age: number = 0;
}
```

---

👉 `protected` is useful for shared subclass logic.

---

## 🔹 11. Real-World Example: Payment System

```ts 
abstract class Payment {
  constructor(public amount: number) {}

  abstract pay(): void;

  validate(): void {
    console.log("Validating payment...");
  }
}
```

---

### 🔹 Subclass

```ts 
class CreditCardPayment extends Payment {
  pay(): void {
    this.validate();
    console.log("Paid using credit card:", this.amount);
  }
}
```

---

## 🔹 12. Usage

```ts 
const payment = new CreditCardPayment(1000);
payment.pay();
```

---

## 🔹 13. Abstract Class vs Interface

| Feature                 | Abstract Class          | Interface                   |
| ----------------------- | ----------------------- | --------------------------- |
| Can have implementation | ✔ Yes                   | ❌ No                        |
| Can be instantiated     | ❌ No                    | ❌ No                        |
| Supports constructors   | ✔ Yes                   | ❌ No                        |
| Multiple inheritance    | ❌ No                    | ✔ Yes (implements multiple) |
| Use case                | Shared logic + contract | Pure structure              |

---

## 🔹 14. When to Use Abstract Classes

Use abstract classes when:

✔ You want shared behavior + structure
✔ You need base implementation
✔ You want controlled inheritance
✔ You need constructors or state

---

## 🔹 15. Common Mistakes

### ❌ Instantiating abstract class

```ts 
const a = new Animal(); // ❌ error
```

---

### ❌ Forgetting to implement abstract methods

```ts 
class Dog extends Animal {
  // ❌ missing makeSound()
}
```

---

### ❌ Overusing abstract classes

Use interfaces when no shared logic is needed.

---

## 🔹 16. Best Practices

* ✔ Use abstract classes for shared base behavior
* ✔ Keep abstract methods minimal
* ✔ Prefer interfaces for pure contracts
* ✔ Use `protected` for reusable internal logic
* ✔ Avoid deep inheritance chains

---

## 🚀 In Summary

Abstract classes in TypeScript:

* Cannot be instantiated directly
* Define both structure and shared behavior
* Contain abstract methods that must be implemented
* Support constructors and access modifiers
* Act as blueprints for related classes

👉 They are ideal for building **structured, extensible, and reusable object-oriented architectures in TypeScript**.

---

## 🧱 Implementing Interfaces with `implements` in TypeScript — Full Detail

In TypeScript, the `implements` keyword is used to ensure that a class **adheres to a specific structure defined by an interface**. It enforces a contract: if a class claims to implement an interface, it must provide all required properties and methods.

This is one of the key features that enables TypeScript to enforce **strong architectural consistency without runtime overhead**.

---

## 🔹 1. What Does `implements` Mean?

When a class uses `implements`, it means:

> “This class guarantees it follows the shape defined by this interface.”

---

### 🔹 Basic Syntax

```ts 
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  name: string = "Dog";

  makeSound(): void {
    console.log("Woof");
  }
}
```

---

## 🔹 2. Why Use `implements`?

It helps you:

✔ Enforce consistent class structure
✔ Catch missing methods/properties at compile time
✔ Improve code readability and maintainability
✔ Enable polymorphism safely
✔ Decouple design from implementation

---

## 🔹 3. What Happens if You Don’t Follow the Interface?

```ts 
interface Animal {
  name: string;
  makeSound(): void;
}

class Cat implements Animal {
  name = "Cat";
}
```

---

### 🔴 Error:

```
Class 'Cat' incorrectly implements interface 'Animal'.
Property 'makeSound' is missing.
```

---

👉 TypeScript enforces the contract strictly.

---

## 🔹 4. Implementing Multiple Interfaces

A class can implement multiple interfaces:

```ts 
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly() {
    console.log("Flying");
  }

  swim() {
    console.log("Swimming");
  }
}
```

---

## 🔹 5. Interfaces Define Shape, Not Implementation

Interfaces only describe structure:

```ts 
interface Vehicle {
  speed: number;
  move(): void;
}
```

---

### 🔹 Implementation

```ts 
class Car implements Vehicle {
  speed = 120;

  move() {
    console.log("Car is moving at", this.speed);
  }
}
```

---

## 🔹 6. `implements` vs `extends`

| Feature        | `implements` (Interface) | `extends` (Class)  |
| -------------- | ------------------------ | ------------------ |
| Inherits logic | ❌ No                     | ✔ Yes              |
| Enforces shape | ✔ Yes                    | ✔ Yes              |
| Multiple use   | ✔ Yes                    | ❌ No (single only) |
| Runtime impact | ❌ None                   | ✔ Yes              |

---

## 🔹 7. Type Checking Happens at Compile Time Only

Interfaces do NOT exist at runtime.

```ts 
interface User {
  name: string;
}
```

👉 This is erased in compiled JavaScript.

---

## 🔹 8. Optional Properties in Interfaces

```ts 
interface User {
  name: string;
  age?: number;
}
```

---

### 🔹 Implementation

```ts 
class Person implements User {
  name = "Alice";
}
```

---

## 🔹 9. Readonly Properties

```ts 
interface Config {
  readonly apiKey: string;
}
```

---

### 🔹 Implementation

```ts 
class AppConfig implements Config {
  readonly apiKey = "12345";
}
```

---

## 🔹 10. Method Implementation Requirements

Interfaces define method signatures:

```ts 
interface Logger {
  log(message: string): void;
}
```

---

### 🔹 Must match exactly:

```ts 
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}
```

---

## 🔹 11. Real-World Example: Service Layer

```ts 
interface PaymentService {
  pay(amount: number): boolean;
}
```

---

### 🔹 Implementation

```ts 
class StripePayment implements PaymentService {
  pay(amount: number): boolean {
    console.log("Processing payment:", amount);
    return true;
  }
}
```

---

## 🔹 12. Polymorphism with Interfaces

```ts 
function processPayment(service: PaymentService) {
  service.pay(100);
}
```

---

### 🔹 Usage

```ts 
processPayment(new StripePayment());
```

---

👉 Any class implementing the interface can be used interchangeably.

---

## 🔹 13. Common Mistakes

### ❌ Thinking `implements` adds runtime behavior

It does NOT.

---

### ❌ Forgetting required members

```ts 
class A implements B {
  // missing methods ❌
}
```

---

### ❌ Mismatched method signatures

```ts 
log(): string {} // ❌ wrong return type
```

---

## 🔹 14. Best Practices

* ✔ Use interfaces for contracts
* ✔ Use `implements` to enforce structure
* ✔ Keep interfaces small and focused
* ✔ Prefer composition over deep inheritance
* ✔ Use multiple interfaces for flexibility

---

## 🔹 15. When to Use `implements`

Use it when:

✔ You want consistent class structure
✔ You need interchangeable implementations
✔ You are designing scalable systems
✔ You want compile-time safety

---

## 🚀 In Summary

Using `implements` in TypeScript:

* Enforces that a class follows an interface contract
* Ensures required properties and methods exist
* Supports multiple interface implementation
* Works only at compile time (no runtime cost)
* Enables safe polymorphism and scalable architecture

👉 It is a foundational tool for building **clean, modular, and strongly-typed object-oriented systems in TypeScript**.


---

## 🔁 Method Overriding and the `override` Keyword in TypeScript — Full Detail

Method overriding is an object-oriented programming feature where a **child class provides its own implementation of a method that already exists in its parent class**.

TypeScript enhances this concept with the `override` keyword, which adds **compile-time safety and prevents accidental mistakes**.

---

## 🔹 1. What is Method Overriding?

Method overriding happens when:

> A subclass defines a method with the same name as a method in its parent class, replacing or extending its behavior.

---

### 🔹 Basic Example (Without TypeScript safety)

```ts 
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof!");
  }
}
```

---

### 🔹 Usage

```ts 
const dog = new Dog();
dog.speak(); // Woof!
```

---

## 🔹 2. Why Overriding is Useful

It allows you to:

✔ Customize inherited behavior
✔ Implement polymorphism
✔ Extend base functionality
✔ Replace generic logic with specific logic

---

## 🔹 3. Problem Without `override`

JavaScript-style overriding is unsafe in TypeScript because:

* You might accidentally misspell method names
* You might think you're overriding but you're not
* No compile-time warning exists

---

### 🔴 Example Problem

```ts 
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  speek() { // ❌ typo
    console.log("Woof!");
  }
}
```

👉 This creates a **new method instead of overriding**.

---

## 🔹 4. The `override` Keyword (TypeScript Feature)

TypeScript introduces `override` to solve this problem.

---

### 🔹 Syntax

```ts 
class Dog extends Animal {
  override speak() {
    console.log("Woof!");
  }
}
```

---

## 🔹 5. What `override` Does

It tells TypeScript:

> “This method must exist in the parent class.”

---

### ✔ Benefits:

* Prevents typos
* Ensures correct inheritance
* Improves readability
* Enables safer refactoring

---

## 🔹 6. Compile-Time Safety Example

```ts 
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  override speak() {
    console.log("Woof!");
  }
}
```

---

### 🔴 If method doesn’t exist:

```ts 
class Dog extends Animal {
  override bark() { // ❌ Error
    console.log("Woof!");
  }
}
```

---

## 🔹 7. Overriding with `super`

You can still call the parent method using `super`.

---

### 🔹 Example

```ts 
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  override speak() {
    super.speak(); // call parent method
    console.log("Woof!");
  }
}
```

---

### 🔹 Output

```ts 
Animal sound  
Woof!
```

---

## 🔹 8. Overriding in Real-World Design

```ts 
class Payment {
  process(amount: number) {
    console.log("Processing payment:", amount);
  }
}
```

---

### 🔹 Override in subclass

```ts 
class CardPayment extends Payment {
  override process(amount: number) {
    console.log("Card payment processing...");
    super.process(amount);
  }
}
```

---

## 🔹 9. `override` with Access Modifiers

You can combine `override` with modifiers:

```ts 
class Animal {
  protected move() {}
}

class Dog extends Animal {
  protected override move() {
    console.log("Dog moving");
  }
}
```

---

## 🔹 10. Rules of `override`

✔ Method must exist in parent class
✔ Signature must match (or be compatible)
✔ Cannot override non-existent methods
✔ Improves safety of inheritance

---

## 🔹 11. Method Signature Compatibility

You can slightly refine return types (covariance):

```ts 
class Animal {
  getName(): string {
    return "Animal";
  }
}

class Dog extends Animal {
  override getName(): "Dog" {
    return "Dog";
  }
}
```

---

## 🔹 12. Why `override` is Important

Without it:

* Silent bugs from typos
* Unsafe refactoring
* Hidden method creation

With it:

✔ Compile-time validation
✔ Safer inheritance
✔ Clear intent

---

## 🔹 13. Common Mistakes

### ❌ Forgetting `override`

```ts 
class Dog extends Animal {
  speak() {} // works but unsafe
}
```

---

### ❌ Using `override` incorrectly

```ts 
class Dog extends Animal {
  override bark() {} // ❌ method doesn't exist in parent
}
```

---

### ❌ Signature mismatch

```ts 
class Animal {
  speak(msg: string) {}
}

class Dog extends Animal {
  override speak() {} // ❌ missing parameter
}
```

---

## 🔹 14. Best Practices

* ✔ Always use `override` in subclasses
* ✔ Keep method signatures consistent
* ✔ Use `super` when extending behavior
* ✔ Avoid unnecessary overriding
* ✔ Prefer composition when logic becomes complex

---

## 🔹 15. Overriding vs Overloading

| Feature        | Overriding       | Overloading (TS workaround) |
| -------------- | ---------------- | --------------------------- |
| Inheritance    | Required         | Not required                |
| Purpose        | Replace behavior | Multiple signatures         |
| Runtime effect | Yes              | No                          |

---

## 🚀 In Summary

Method overriding in TypeScript:

* Allows subclasses to replace parent methods
* Uses the `override` keyword for safety
* Ensures compile-time validation of inheritance
* Works with `super` to extend behavior
* Prevents bugs caused by typos or incorrect signatures

👉 It is a critical feature for building **reliable, maintainable, and strongly-typed object-oriented systems in TypeScript**.


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

**[Day 12 — Access Modifiers & Readonly →](../Day-12-Access-Modifiers-Readonly/)**
