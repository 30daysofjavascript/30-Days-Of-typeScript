// ============================================================
// 🚀 DAY 13 — Generics: Basics
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. THE PROBLEM GENERICS SOLVE
// Without generics, you either lose type safety or repeat code
// ─────────────────────────────────────────────

// Option 1: any — loses type safety
function firstAny(arr: any[]): any { return arr[0]; }
const n = firstAny([1, 2, 3]); // type: any — lost!

// Option 2: Overloads for every type — too verbose
function firstStr(arr: string[]): string  { return arr[0]; }
function firstNum(arr: number[]): number  { return arr[0]; }
// ... repeat for every type

// Option 3: GENERICS — one implementation, full type safety!
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
// TypeScript INFERS T from the argument!
const str = first(["a", "b", "c"]); // type: string ✅
const num = first([1, 2, 3]);        // type: number ✅
const bool = first([true, false]);   // type: boolean ✅
first([]);                            // type: undefined ✅

// ─────────────────────────────────────────────
// 2. GENERIC FUNCTIONS
// ─────────────────────────────────────────────

// Identity — returns same type it receives
function identity<T>(value: T): T { return value; }

// Last element
function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// Reverse array
function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

// Pair
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}
const p = pair("hello", 42); // type: [string, number]

// Map — transform each element
function mapArray<T, U>(arr: T[], fn: (item: T, i: number) => U): U[] {
  return arr.map(fn);
}
const lengths = mapArray(["a", "bc", "def"], s => s.length); // number[]
const doubled = mapArray([1, 2, 3], n => n * 2);              // number[]

// ─────────────────────────────────────────────
// 3. MULTIPLE TYPE PARAMETERS
// ─────────────────────────────────────────────

function zip<A, B>(arrA: A[], arrB: B[]): [A, B][] {
  return arrA.map((a, i) => [a, arrB[i]]);
}
zip([1, 2, 3], ["a", "b", "c"]); // [number, string][]

function mergeObjects<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...a, ...b };
}
const merged = mergeObjects({ name: "Alice" }, { age: 30 });
merged.name; // string ✅
merged.age;  // number ✅

// ─────────────────────────────────────────────
// 4. GENERIC CONSTRAINTS — extends
// Restrict what types can be used with a generic
// ─────────────────────────────────────────────

// T must have a .length property
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
getLength("hello");    // ✅ string has .length
getLength([1, 2, 3]);  // ✅ array has .length
// getLength(42);       // ❌ number has no .length

// T must be a key of U
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: "Alice", age: 30, active: true };
getProperty(user, "name");   // string ✅
getProperty(user, "age");    // number ✅
// getProperty(user, "email"); // ❌ not a key of user

// Constraint with interface
interface Identifiable { id: number | string; }

function findById<T extends Identifiable>(items: T[], id: T["id"]): T | undefined {
  return items.find(item => item.id === id);
}

// ─────────────────────────────────────────────
// 5. GENERIC INTERFACES
// ─────────────────────────────────────────────

interface Container<T> {
  value: T;
  transform<U>(fn: (val: T) => U): Container<U>;
  filter(pred: (val: T) => boolean): Container<T> | null;
}

interface Pair<A, B> {
  first: A;
  second: B;
  swap(): Pair<B, A>;
}

interface Repository<T, ID = number> {
  findById(id: ID): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(item: Omit<T, "id">): Promise<T>;
  update(id: ID, updates: Partial<T>): Promise<T | null>;
  delete(id: ID): Promise<boolean>;
}

// ─────────────────────────────────────────────
// 6. GENERIC CLASSES
// ─────────────────────────────────────────────

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean { return this.items.length === 0; }
  size(): number     { return this.items.length; }
  toArray(): T[]     { return [...this.items]; }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
console.log(numStack.pop()); // 3 — typed as number

const strStack = new Stack<string>();
strStack.push("hello");
// strStack.push(42); // ❌ not a string

// ─────────────────────────────────────────────
// 7. DEFAULT TYPE PARAMETERS
// ─────────────────────────────────────────────

interface Response<T = unknown> {   // T defaults to unknown
  data: T;
  status: number;
  message: string;
}

const response1: Response = { data: { name: "Alice" }, status: 200, message: "OK" };
// T is unknown — must check before using data

const response2: Response<{ name: string }> = {
  data: { name: "Alice" },
  status: 200,
  message: "OK"
};
response2.data.name; // string ✅ — typed properly

// ─────────────────────────────────────────────
// 8. GENERIC TYPE ALIASES
// ─────────────────────────────────────────────

type Maybe<T>    = T | null | undefined;
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
type Nullable<T> = T | null;
type AsyncResult<T> = Promise<Result<T>>;

// Using Result type
function divide(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: new Error("Division by zero") };
  return { ok: true, value: a / b };
}

const result = divide(10, 2);
if (result.ok) {
  console.log(result.value); // number ✅
} else {
  console.error(result.error.message); // string ✅
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Write a generic function 'compact<T>' that removes null/undefined from an array:
// compact([1, null, 2, undefined, 3]) → [1, 2, 3] with type number[]

// Exercise 2:
// Write a generic Queue<T> class (FIFO) with enqueue, dequeue, peek, isEmpty, size.

// Exercise 3:
// Write a generic 'groupBy<T, K extends string|number>' function:
// groupBy(users, u => u.department) → Record<string, User[]>

// Exercise 4:
// Write a type-safe EventEmitter<EventMap> class where EventMap is a
// record of event names to their payload types.

// Exercise 5:
// Write a generic 'retry<T>(fn: () => Promise<T>, times: number): Promise<T>'
// function that retries a failing promise N times.
