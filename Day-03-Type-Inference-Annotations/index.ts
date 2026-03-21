// ============================================================
// 🚀 DAY 03 — Type Inference & Annotations
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. TYPE INFERENCE — TypeScript Reads Your Mind
// TypeScript automatically determines types from:
// - Initial values
// - Function return expressions
// - Context (contextual typing)
// ─────────────────────────────────────────────

// Inferred from literal values
let str    = "hello";      // inferred: string
let num    = 42;           // inferred: number
let bool   = true;         // inferred: boolean
let arr    = [1, 2, 3];    // inferred: number[]
let obj    = { x: 1, y: 2 }; // inferred: { x: number; y: number }

// TypeScript still enforces the inferred type!
// str = 100;   // ❌ Error: Type 'number' is not assignable to type 'string'

// ─────────────────────────────────────────────
// 2. RETURN TYPE INFERENCE
// TypeScript infers the return type from the return statement
// ─────────────────────────────────────────────

// TypeScript infers return type: number
function addNumbers(a: number, b: number) {
  return a + b; // inferred return: number
}

// TypeScript infers return type: string
function buildName(first: string, last: string) {
  return `${first} ${last}`; // inferred return: string
}

// Multi-branch inference creates a union type
function getStatus(code: number) {
  if (code === 200) return "OK";        // string
  if (code === 404) return "Not Found"; // string
  return null;                          // null
}
// inferred return type: string | null

// Explicit return type annotation — always a good practice!
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

// ─────────────────────────────────────────────
// 3. WHEN TO ANNOTATE vs WHEN TO INFER
// ─────────────────────────────────────────────

// ── Let TypeScript infer (don't need annotation) ──────────
const name = "Alice";          // obvious from literal
const count = users.length ?? 0; // obvious from expression
const doubled = [1,2,3].map(n => n * 2); // inferred as number[]

// ── Always annotate these ─────────────────────────────────

// 1. Function parameters — TS can't infer from usage
function process(data: string): string { // ← annotate params
  return data.trim();
}

// 2. When initializing with a broad type
let status: "loading" | "success" | "error" = "loading"; // ← annotate

// 3. When the initial value doesn't match intended type
let userId: number | null = null;  // ← null initially, but will be number

// 4. Class properties
class User {
  id: number;        // ← must annotate (no initial value)
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// 5. Return type for complex/important functions (documentation)
function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

// ─────────────────────────────────────────────
// 4. CONTEXTUAL TYPING
// TypeScript infers types from the CONTEXT they're used in
// ─────────────────────────────────────────────

// Event listener — TS knows 'e' is MouseEvent from context
window.addEventListener("click", (e) => {
  console.log(e.clientX); // ✅ TypeScript knows e is MouseEvent!
  console.log(e.target);  // ✅ knows target is EventTarget
});

// Array callback — TS knows 'item' type from the array
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((item) => {
  // item is inferred as number — no annotation needed!
  console.log(item.toFixed(2));
});

// Object destructuring with types inferred from object
const point = { x: 10, y: 20 };
const { x, y } = point; // x and y are inferred as number

// ─────────────────────────────────────────────
// 5. WIDENING vs NARROWING
// ─────────────────────────────────────────────

// WIDENING — TypeScript makes the type more general for let
let widened = "hello"; // type: string (widened from literal "hello")
widened = "world";     // ✅ OK — it's a general string

// For const, TypeScript uses the LITERAL type
const narrow = "hello"; // type: "hello" (literal type — not just string!)
// narrow = "world";     // ❌ Can't reassign const anyway

// To prevent widening, use 'as const':
let notWidened = "loading" as const; // type: "loading"
// notWidened = "error"; // ❌ Error: Type '"error"' is not assignable to type '"loading"'

// as const on objects (all properties become readonly literals)
const config = {
  host: "localhost",
  port: 3000,
} as const;
// config.host = "x"; // ❌ Error: Cannot assign to 'host' (readonly)
// Type: { readonly host: "localhost"; readonly port: 3000 }

// ─────────────────────────────────────────────
// 6. SATISFIES OPERATOR (TypeScript 4.9+)
// Checks a value satisfies a type WITHOUT widening to that type
// ─────────────────────────────────────────────

type Colors = "red" | "blue" | "green";

const palette = {
  red:   [255, 0, 0],
  green: [0, 255, 0],
  blue:  [0, 0, 255],
} satisfies Record<Colors, number[]>;

// Without satisfies: palette.red would be typed as number[]
// With satisfies: TypeScript KNOWS palette.red is a tuple [255,0,0]!
console.log(palette.red[0]); // ✅ TypeScript knows this is a number

// ─────────────────────────────────────────────
// 7. THE typeof OPERATOR IN TYPES
// Use a value's type as a type annotation
// ─────────────────────────────────────────────

const defaultUser = {
  name: "Guest",
  role: "viewer",
  permissions: ["read"],
};

// typeof in type position = "the type of this value"
type DefaultUser = typeof defaultUser;
// Equivalent to: { name: string; role: string; permissions: string[] }

function createUser(user: DefaultUser): DefaultUser {
  return user;
}

// Very useful with functions
function createPoint(x: number, y: number) {
  return { x, y };
}
type Point = ReturnType<typeof createPoint>; // { x: number; y: number }

// ─────────────────────────────────────────────
// 8. DECLARATION FILES & LIB TYPES
// TypeScript ships with built-in type declarations
// ─────────────────────────────────────────────

// TypeScript KNOWS the types of:
// - DOM APIs: HTMLElement, Event, fetch(), etc.
// - Built-in objects: Array, Map, Set, Promise, etc.
// - Global values: Math, Date, JSON, etc.

const now: Date = new Date();
const html: HTMLElement | null = document.querySelector("div");
const map: Map<string, number> = new Map();

// Full IntelliSense support for all these!
map.set("key", 42);
console.log(map.get("key")); // TypeScript knows this returns number | undefined

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Which of these NEED explicit annotations and which can be inferred?
// a) let x = 5
// b) function fn(a, b) { return a + b; }
// c) let result;   // will be assigned later
// d) const pi = 3.14159;

// Exercise 2:
// What is the inferred return type of each function?
// function f1() { return Math.random() > 0.5 ? "yes" : null; }
// function f2(arr: number[]) { return arr.length > 0; }
// function f3(x: number) { if (x > 0) return x; }  // hint: 2 possibilities

// Exercise 3:
// Use `as const` to make this object's properties literal types:
// const STATUS = { PENDING: "pending", DONE: "done", ERROR: "error" };
// Then verify that STATUS.PENDING has type "pending", not just string.

// Exercise 4:
// Use `typeof` to create a type from this configuration object:
// const serverConfig = { host: "localhost", port: 8080, debug: true };

// Exercise 5:
// Explain the difference between these two:
// let a = "hello" as const;
// const b = "hello";
// Do they have the same type? What happens if you try to reassign?
const users = [{ id: 1 }, { id: 2 }]; // for exercise reference
