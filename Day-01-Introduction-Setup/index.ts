// ============================================================
// 🚀 DAY 01 — Introduction to TypeScript & Setup
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS TYPESCRIPT?
// TypeScript is a SUPERSET of JavaScript that adds:
//   - Static typing (catch errors before running code)
//   - Better tooling (autocomplete, refactoring, navigation)
//   - Modern JavaScript features (compiled to any JS target)
//   - Self-documenting code (types as documentation)
//
// TypeScript compiles to plain JavaScript — browsers never see .ts files
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// 2. YOUR FIRST TYPE ANNOTATION
// Add a colon after a variable name to declare its type
// ─────────────────────────────────────────────

// JavaScript (no types — anything goes)
// let name = "Alice";
// name = 42;  // No error — but this is a bug!

// TypeScript (typed — prevents bugs at compile time)
let name: string = "Alice";
// name = 42;  // ❌ Error: Type 'number' is not assignable to type 'string'

let age: number = 30;
let isActive: boolean = true;

console.log(`${name} is ${age} years old. Active: ${isActive}`);

// ─────────────────────────────────────────────
// 3. TYPESCRIPT vs JAVASCRIPT — KEY DIFFERENCES
// ─────────────────────────────────────────────

// ── JavaScript Problem Example ────────────────
function jsAdd(a: any, b: any) {
  return a + b;
}
// In plain JS: jsAdd("5", 3) → "53" (string concat — silent bug!)
// In TS: we can prevent this with proper types

// ── TypeScript Solution ───────────────────────
function tsAdd(a: number, b: number): number {
  return a + b;
}
console.log(tsAdd(5, 3));     // ✅ 8
// console.log(tsAdd("5", 3)); // ❌ Compile error caught before running!

// ─────────────────────────────────────────────
// 4. THE COMPILATION PROCESS
// TypeScript → (tsc compiler) → JavaScript
//
// TypeScript code ONLY exists during development.
// At runtime, only JavaScript runs.
// TypeScript types are ERASED — they have no runtime cost!
// ─────────────────────────────────────────────

// This TypeScript:
let greeting: string = "Hello, TypeScript!";
console.log(greeting);

// Compiles to this JavaScript:
// let greeting = "Hello, TypeScript!";
// console.log(greeting);
// Notice: the ": string" type annotation is gone!

// ─────────────────────────────────────────────
// 5. PRIMITIVE TYPES (quick preview — full coverage Day 02)
// ─────────────────────────────────────────────

// The basic types mirror JavaScript's primitive types
let myString: string    = "hello";
let myNumber: number    = 42;
let myFloat: number     = 3.14;      // JS has one number type
let myBoolean: boolean  = true;
let myNull: null        = null;
let myUndefined: undefined = undefined;
let myBigInt: bigint    = 9007199254740991n;
let mySymbol: symbol    = Symbol("id");

// TypeScript's extra special type: any (avoid using it!)
let anything: any = "could be anything";
anything = 42;         // ✅ any disables type checking
anything = true;       // ✅ OK but defeats the purpose of TypeScript

// ─────────────────────────────────────────────
// 6. TYPE INFERENCE — TypeScript is smart!
// You don't always need to write types explicitly
// TypeScript can FIGURE OUT the type from the value
// ─────────────────────────────────────────────

// TypeScript INFERS these types automatically:
let inferredString = "hello";    // TypeScript knows this is string
let inferredNumber = 42;         // TypeScript knows this is number
let inferredBool   = true;       // TypeScript knows this is boolean

// Hover over a variable in VS Code to see the inferred type!
// inferredString = 99;  // ❌ Error even without explicit annotation!

// ─────────────────────────────────────────────
// 7. SIMPLE FUNCTION WITH TYPES
// ─────────────────────────────────────────────

// Parameter types + return type annotation
function greet(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old.`;
}

const message = greet("Alice", 30);
console.log(message); // "Hello, Alice! You are 30 years old."

// TypeScript catches wrong argument types:
// greet(42, "Alice"); // ❌ Error: arguments are in wrong type/order

// ─────────────────────────────────────────────
// 8. SIMPLE INTERFACE (preview — full coverage Day 05)
// An interface describes the shape of an object
// ─────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// TypeScript checks that the object matches the interface
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  isAdmin: false,
};

// Missing property:
// const badUser: User = { id: 2, name: "Bob" }; // ❌ Missing 'email' and 'isAdmin'

// Extra property:
// const extraUser: User = { id: 3, name: "Carol", email: "c@c.com", isAdmin: true, role: "dev" };
// ❌ Object literal may only specify known properties

function displayUser(u: User): void {
  console.log(`[${u.id}] ${u.name} <${u.email}> Admin: ${u.isAdmin}`);
}
displayUser(user);

// ─────────────────────────────────────────────
// 9. WHY TYPESCRIPT? — REAL BENEFITS
// ─────────────────────────────────────────────

// ✅ Catch bugs at COMPILE TIME, not runtime
// ✅ Autocomplete in your editor (IntelliSense)
// ✅ Fearless refactoring — TS tells you what breaks
// ✅ Self-documenting code — types ARE documentation
// ✅ Better team collaboration — types as contracts
// ✅ Works with all existing JavaScript libraries
// ✅ No runtime overhead — types are erased on compile

// ─────────────────────────────────────────────
// 10. tsconfig.json — PROJECT CONFIGURATION
// Every TypeScript project has a tsconfig.json
// Run: tsc --init  to create one
// ─────────────────────────────────────────────

// Example tsconfig.json (created with: tsc --init):
/*
{
  "compilerOptions": {
    "target": "ES2022",         // compile to this JS version
    "module": "commonjs",       // module system
    "strict": true,             // enable all strict checks (RECOMMENDED)
    "outDir": "./dist",         // output directory for compiled JS
    "rootDir": "./src",         // source TypeScript files
    "esModuleInterop": true,    // better module imports
    "skipLibCheck": true,       // skip type checking of .d.ts files
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
*/

// ─────────────────────────────────────────────
// 11. RUNNING TYPESCRIPT
// ─────────────────────────────────────────────

// Option 1: Compile then run
// $ tsc index.ts        → creates index.js
// $ node index.js       → runs compiled JS

// Option 2: ts-node (run directly, no compile step)
// $ npm install -g ts-node
// $ ts-node index.ts    → compiles and runs in memory

// Option 3: tsx (faster ts-node alternative)
// $ npm install -g tsx
// $ tsx index.ts

// Option 4: Deno (runs TypeScript natively)
// $ deno run index.ts

// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1:
// Add type annotations to these variables:
// let city = "New York";
// let population = 8_336_817;
// let isCapital = false;

// Exercise 2:
// Fix this function by adding parameter and return type annotations:
// function calculateArea(width, height) {
//   return width * height;
// }

// Exercise 3:
// Create an interface 'Product' with: id (number), name (string),
// price (number), inStock (boolean). Create a variable matching it.

// Exercise 4:
// What TypeScript errors do these cause and why?
// let x: number = "hello";
// let y: string = 42;
// function add(a: number, b: number): string { return a + b; }

// Exercise 5:
// Create a function 'formatPrice(amount: number, currency: string): string'
// that returns something like "$29.99" or "€14.50"
