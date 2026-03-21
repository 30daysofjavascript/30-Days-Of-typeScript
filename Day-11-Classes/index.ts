// ============================================================
// 🚀 DAY 11 — Classes in TypeScript
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. BASIC CLASS
// ─────────────────────────────────────────────

class Person {
  // Property declarations (required in TS, unlike JS)
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age  = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  birthday(): void {
    this.age++;
    console.log(`Happy Birthday, ${this.name}! Now ${this.age}.`);
  }
}

const alice = new Person("Alice", 30);
console.log(alice.greet());

// ─────────────────────────────────────────────
// 2. PARAMETER SHORTHAND — Declare + Initialize in Constructor
// ─────────────────────────────────────────────

class Point {
  constructor(
    public x: number,    // auto-declares and assigns this.x
    public y: number,    // auto-declares and assigns this.y
    private label?: string // private and optional
  ) {}

  toString(): string {
    return `Point(${this.x}, ${this.y})`;
  }

  distanceTo(other: Point): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}

const p1 = new Point(0, 0);
const p2 = new Point(3, 4);
console.log(p2.toString());         // "Point(3, 4)"
console.log(p1.distanceTo(p2));     // 5

// ─────────────────────────────────────────────
// 3. INHERITANCE
// ─────────────────────────────────────────────

class Animal {
  constructor(
    public name: string,
    protected sound: string
  ) {}

  makeSound(): string {
    return `${this.name} says: ${this.sound}`;
  }

  toString(): string {
    return `[${this.constructor.name}: ${this.name}]`;
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name, "Woof"); // MUST call super first
  }

  // Override parent method
  makeSound(): string {
    return `${super.makeSound()}! 🐕`;
  }

  fetch(item: string): string {
    return `${this.name} fetches the ${item}!`;
  }
}

class Cat extends Animal {
  private indoor: boolean;

  constructor(name: string, indoor: boolean = true) {
    super(name, "Meow");
    this.indoor = indoor;
  }

  makeSound(): string {
    return this.indoor
      ? `${super.makeSound()} (indoor cat)`
      : `${super.makeSound()} (outdoor cat)`;
  }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.makeSound()); // "Rex says: Woof! 🐕"
console.log(rex.fetch("ball"));

// ─────────────────────────────────────────────
// 4. GETTERS & SETTERS
// ─────────────────────────────────────────────

class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  // Getter
  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }

  // Setter with validation
  set fahrenheit(f: number) {
    this._celsius = (f - 32) * 5/9;
  }

  get celsius(): number {
    return this._celsius;
  }

  set celsius(c: number) {
    if (c < -273.15) throw new RangeError("Below absolute zero!");
    this._celsius = c;
  }

  toString(): string {
    return `${this._celsius.toFixed(1)}°C / ${this.fahrenheit.toFixed(1)}°F`;
  }
}

const temp = new Temperature(100);
console.log(temp.toString());   // "100.0°C / 212.0°F"
temp.fahrenheit = 32;
console.log(temp.celsius);      // 0

// ─────────────────────────────────────────────
// 5. STATIC MEMBERS
// ─────────────────────────────────────────────

class Counter {
  private static count = 0;
  static readonly MAX = 100;

  private id: number;

  constructor() {
    Counter.count++;
    this.id = Counter.count;
  }

  getId(): number { return this.id; }

  static getCount(): number { return Counter.count; }
  static reset(): void { Counter.count = 0; }

  // Static factory method
  static create(): Counter {
    if (Counter.count >= Counter.MAX) {
      throw new Error("Maximum instances reached");
    }
    return new Counter();
  }
}

const c1 = Counter.create();
const c2 = Counter.create();
console.log(Counter.getCount()); // 2

// ─────────────────────────────────────────────
// 6. ABSTRACT CLASSES
// Cannot be instantiated directly — must be subclassed
// ─────────────────────────────────────────────

abstract class Shape {
  constructor(public color: string) {}

  // Abstract method — subclasses MUST implement
  abstract area(): number;
  abstract perimeter(): number;

  // Concrete method — shared by all subclasses
  describe(): string {
    return `A ${this.color} ${this.constructor.name} with area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }
  area(): number      { return Math.PI * this.radius ** 2; }
  perimeter(): number { return 2 * Math.PI * this.radius; }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }
  area(): number      { return this.width * this.height; }
  perimeter(): number { return 2 * (this.width + this.height); }
}

// new Shape("red"); // ❌ Cannot instantiate abstract class

const shapes: Shape[] = [new Circle("red", 5), new Rectangle("blue", 4, 6)];
shapes.forEach(s => console.log(s.describe()));

// ─────────────────────────────────────────────
// 7. IMPLEMENTING INTERFACES
// ─────────────────────────────────────────────

interface Serializable {
  serialize(): string;
}

interface Comparable<T> {
  compareTo(other: T): number; // -1, 0, or 1
}

class Version implements Serializable, Comparable<Version> {
  constructor(
    public major: number,
    public minor: number,
    public patch: number
  ) {}

  serialize(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  compareTo(other: Version): number {
    if (this.major !== other.major) return this.major > other.major ? 1 : -1;
    if (this.minor !== other.minor) return this.minor > other.minor ? 1 : -1;
    if (this.patch !== other.patch) return this.patch > other.patch ? 1 : -1;
    return 0;
  }

  static parse(s: string): Version {
    const [major, minor, patch] = s.split(".").map(Number);
    return new Version(major, minor, patch);
  }
}

const v1 = Version.parse("2.0.0");
const v2 = Version.parse("1.9.9");
console.log(v1.compareTo(v2)); // 1 — v1 is newer

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a BankAccount class with:
// - private balance, owner, transactions history
// - deposit(amount), withdraw(amount) — validate amounts
// - getStatement() — returns all transactions
// - static fromJSON(data) factory method

// Exercise 2:
// Create an abstract DataStructure<T> class with:
// abstract add(item: T): void
// abstract remove(): T | undefined
// abstract size(): number
// Then implement Stack<T> and Queue<T>.

// Exercise 3:
// Create an EventEmitter class:
// - on<K>(event: K, listener): void
// - off<K>(event: K, listener): void
// - emit<K>(event: K, ...args): void
// Bonus: make it generic over an event map type.

// Exercise 4:
// Implement a generic LinkedList<T> class with:
// append, prepend, delete, find, toArray, [Symbol.iterator]

// Exercise 5:
// Create a Singleton pattern in TypeScript with proper typing.
