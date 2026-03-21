// ============================================================
// 🚀 DAY 06 — Functions in TypeScript
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. PARAMETER & RETURN TYPE ANNOTATIONS
// ─────────────────────────────────────────────

// All parameter and return types annotated
function add(a: number, b: number): number {
  return a + b;
}

// Arrow functions
const multiply = (a: number, b: number): number => a * b;

// Void return type — function doesn't return a value
function log(message: string, level: string = "INFO"): void {
  console.log(`[${level}] ${message}`);
}

// ─────────────────────────────────────────────
// 2. OPTIONAL PARAMETERS
// ─────────────────────────────────────────────

function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}
greet("Alice");           // "Hello, Alice!"
greet("Bob", "Hi");       // "Hi, Bob!"
// Optional params MUST come after required params

// ─────────────────────────────────────────────
// 3. DEFAULT PARAMETERS
// ─────────────────────────────────────────────

function createUser(
  name: string,
  role: "admin" | "user" | "viewer" = "user",
  active: boolean = true
): { name: string; role: string; active: boolean } {
  return { name, role, active };
}
createUser("Alice");                  // { name:"Alice", role:"user", active:true }
createUser("Bob", "admin");           // { name:"Bob", role:"admin", active:true }
createUser("Carol", "viewer", false); // { name:"Carol", role:"viewer", active:false }

// ─────────────────────────────────────────────
// 4. REST PARAMETERS
// ─────────────────────────────────────────────

function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4, 5); // 15

function log2(level: "INFO" | "WARN" | "ERROR", ...messages: string[]): void {
  messages.forEach(m => console.log(`[${level}] ${m}`));
}
log2("INFO", "Server started", "Port: 3000");

// ─────────────────────────────────────────────
// 5. FUNCTION TYPES
// ─────────────────────────────────────────────

// Inline function type
let formatter: (value: number) => string;
formatter = (n) => n.toFixed(2); // ✅
// formatter = (s: string) => s; // ❌ Wrong type

// Type alias for function type
type Predicate<T> = (value: T) => boolean;
type Transformer<T, U> = (value: T) => U;
type EventHandler<T extends Event> = (event: T) => void;

const isEven: Predicate<number>           = n => n % 2 === 0;
const toString: Transformer<number, string> = n => String(n);

// Function as parameter
function filter<T>(arr: T[], predicate: Predicate<T>): T[] {
  return arr.filter(predicate);
}
filter([1,2,3,4,5], isEven); // [2, 4]

// ─────────────────────────────────────────────
// 6. FUNCTION OVERLOADS
// Multiple signatures for a function that behaves differently
// based on the types of its arguments
// ─────────────────────────────────────────────

// Overload signatures (declarations only — no body)
function process(input: string): string;
function process(input: number): number;
function process(input: string[]): string[];

// Implementation signature (handles all overloads)
function process(input: string | number | string[]): string | number | string[] {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input * 2;
  } else {
    return input.map(s => s.toUpperCase());
  }
}

const s: string   = process("hello");   // "HELLO"
const n: number   = process(21);        // 42
const a: string[] = process(["a","b"]); // ["A","B"]

// More realistic overload example: getElementById
function getElementById(id: string): HTMLElement | null;
function getElementById(id: string, required: true): HTMLElement;
function getElementById(id: string, required: false): HTMLElement | null;
function getElementById(id: string, required?: boolean): HTMLElement | null {
  const el = document.getElementById(id);
  if (required && !el) throw new Error(`Element #${id} not found`);
  return el;
}

// ─────────────────────────────────────────────
// 7. THIS PARAMETER
// Explicitly type 'this' in functions
// ─────────────────────────────────────────────

interface Button {
  label: string;
  onClick: () => void;
}

function clickHandler(this: Button): void {
  console.log(`Button "${this.label}" was clicked`);
}

// 'this' parameter is erased at compile time — it's only for TypeScript
// TypeScript checks that the function is called with correct 'this' context

// ─────────────────────────────────────────────
// 8. GENERIC FUNCTIONS (preview — full Day 13-14)
// ─────────────────────────────────────────────

// Identity function — preserves the type
function identity<T>(value: T): T {
  return value;
}
const str = identity("hello");  // TypeScript infers: string
const num = identity(42);       // TypeScript infers: number

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user2 = { name: "Alice", age: 30 };
const name = getProperty(user2, "name"); // string
const age  = getProperty(user2, "age");  // number
// getProperty(user2, "invalid");         // ❌ not a key of user2

// ─────────────────────────────────────────────
// 9. CALLABLE INTERFACES
// Objects that can be called as functions
// ─────────────────────────────────────────────

interface Formatter {
  (value: number): string;     // call signature
  locale: string;              // also has properties!
  precision: number;
}

const fmt: Formatter = Object.assign(
  (n: number) => n.toFixed(fmt.precision),
  { locale: "en-US", precision: 2 }
);
fmt(3.14159); // "3.14"

// ─────────────────────────────────────────────
// 10. NEVER TYPE IN FUNCTIONS
// ─────────────────────────────────────────────

function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(x)}`);
}

type Shape = "circle" | "square" | "triangle";
function describeShape(shape: Shape): string {
  switch (shape) {
    case "circle":   return "A round shape";
    case "square":   return "A four-sided shape";
    case "triangle": return "A three-sided shape";
    default: return assertNever(shape); // ← exhaustiveness check!
  }
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Write a fully typed function 'formatDate' that accepts a Date and
// an optional format string ("short"|"long"|"iso"), returning a string.

// Exercise 2:
// Create function overloads for a 'convert' function:
// convert(value: number, to: "string"): string
// convert(value: string, to: "number"): number
// convert(value: boolean, to: "string"): string

// Exercise 3:
// Write a generic 'pipe' function:
// pipe(value, fn1, fn2, fn3) — applies each function in sequence
// The return type of each fn should match the input of the next.

// Exercise 4:
// Create a type-safe event system:
// type EventMap = { click: MouseEvent; keydown: KeyboardEvent; resize: UIEvent }
// function on<K extends keyof EventMap>(event: K, handler: (e: EventMap[K]) => void): void

// Exercise 5:
// Write a memoize function with proper generic types:
// function memoize<T extends unknown[], R>(fn: (...args: T) => R): (...args: T) => R
