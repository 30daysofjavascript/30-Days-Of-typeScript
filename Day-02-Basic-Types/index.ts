// ============================================================
// 🚀 DAY 02 — Basic Types
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. STRING
// ─────────────────────────────────────────────
let firstName: string = "Alice";
let lastName: string  = 'Smith';
let template: string  = `Hello, ${firstName} ${lastName}!`;

// String methods work with full type safety
const upper: string   = firstName.toUpperCase();
const length: number  = firstName.length;

// ─────────────────────────────────────────────
// 2. NUMBER
// TypeScript (like JS) has ONE number type for int + float
// ─────────────────────────────────────────────
let integer: number  = 42;
let float: number    = 3.14159;
let negative: number = -100;
let hex: number      = 0xFF;    // 255 in hex
let binary: number   = 0b1010;  // 10 in binary
let octal: number    = 0o17;    // 15 in octal
let million: number  = 1_000_000; // underscore separator for readability

// Special number values
let inf: number     = Infinity;
let negInf: number  = -Infinity;
let notANum: number = NaN;

// ─────────────────────────────────────────────
// 3. BOOLEAN
// ─────────────────────────────────────────────
let isActive: boolean  = true;
let isDeleted: boolean = false;

// Common boolean patterns
const isAdult: boolean    = integer >= 18;
const hasPermission: boolean = isActive && !isDeleted;

// ─────────────────────────────────────────────
// 4. BIGINT
// For integers larger than Number.MAX_SAFE_INTEGER (2^53-1)
// ─────────────────────────────────────────────
const bigNumber: bigint     = 9007199254740991n;
const anotherBig: bigint    = BigInt("12345678901234567890");
const sumBig: bigint        = bigNumber + 1n;
// BigInt and number cannot be mixed:
// const mixed = bigNumber + 1; // ❌ Error

// ─────────────────────────────────────────────
// 5. SYMBOL
// Unique, immutable identifier — used as object keys
// ─────────────────────────────────────────────
const sym1: symbol = Symbol("description");
const sym2: symbol = Symbol("description");
console.log(sym1 === sym2); // false — every Symbol is unique!

// unique symbol — a more specific type for const symbols
const KEY: unique symbol = Symbol("key");

// ─────────────────────────────────────────────
// 6. NULL & UNDEFINED
// ─────────────────────────────────────────────
let nullValue: null        = null;
let undefinedValue: undefined = undefined;

// With strict mode, null/undefined are NOT assignable to other types
// let name2: string = null;      // ❌ Error with strictNullChecks
// let age2: number = undefined;  // ❌ Error with strictNullChecks

// To allow null, use union types (covered Day 07):
let maybeString: string | null      = null;
let maybeNumber: number | undefined = undefined;

// ─────────────────────────────────────────────
// 7. ANY — The Escape Hatch (use sparingly!)
// Disables ALL type checking for that value
// Avoid unless migrating from JavaScript
// ─────────────────────────────────────────────
let anything: any = "hello";
anything = 42;          // ✅ allowed but defeats TypeScript
anything = true;        // ✅ allowed
anything.nonExistent(); // ✅ no error — but will crash at runtime!

// any is contagious — it spreads
let num: number = anything; // ✅ TypeScript allows this — dangerous!

// ─────────────────────────────────────────────
// 8. UNKNOWN — Safer alternative to any
// Must check type before using — forces you to be safe
// ─────────────────────────────────────────────
let userInput: unknown = "could be anything";
userInput = 42;
userInput = { name: "Alice" };

// Can't use unknown without checking first:
// userInput.toUpperCase(); // ❌ Error: Object is of type 'unknown'
// let x: number = userInput; // ❌ Error

// ✅ Must narrow type first:
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // Safe!
}
if (typeof userInput === "number") {
  console.log(userInput * 2); // Safe!
}

// ─────────────────────────────────────────────
// 9. NEVER — A type that never occurs
// Used for:
// - Functions that always throw
// - Functions with infinite loops (never return)
// - Exhaustive checks in switch statements
// ─────────────────────────────────────────────

// A function that always throws never returns
function throwError(message: string): never {
  throw new Error(message);
}

// A function with an infinite loop never returns
function infiniteLoop(): never {
  while (true) {
    // ...
  }
}

// never in exhaustive checks (very useful with unions — Day 25)
type Direction = "north" | "south" | "east" | "west";
function handleDirection(dir: Direction): string {
  switch (dir) {
    case "north": return "Going North";
    case "south": return "Going South";
    case "east":  return "Going East";
    case "west":  return "Going West";
    default:
      // If you add a new Direction and forget to handle it,
      // this line catches the mistake at compile time!
      const exhaustiveCheck: never = dir;
      return exhaustiveCheck;
  }
}

// ─────────────────────────────────────────────
// 10. VOID — Return type for functions with no return value
// ─────────────────────────────────────────────
function logMessage(msg: string): void {
  console.log(msg);
  // return; // ✅ OK — can return undefined
  // return 42; // ❌ Error — can't return a value from void function
}

// void vs never:
// void — function returns (with undefined), just doesn't return a VALUE
// never — function NEVER returns at all (throws or infinite loop)

// ─────────────────────────────────────────────
// 11. OBJECT TYPE (basic)
// ─────────────────────────────────────────────

// Inline object type annotation
let person: { name: string; age: number; active: boolean } = {
  name: "Alice",
  age: 30,
  active: true,
};

// TypeScript catches wrong shapes:
// let person2: { name: string } = { name: "Bob", age: 25 }; // ❌ excess property

// Better to use interfaces (Day 05) or type aliases (Day 08) for reuse
// { name: string; age: number } is verbose for one-off use, fine for inline

// ─────────────────────────────────────────────
// 12. TYPE ASSERTIONS — Telling TS "trust me, I know the type"
// Use when you have more information than TypeScript
// ─────────────────────────────────────────────

// as syntax (preferred)
const input = document.getElementById("myInput") as HTMLInputElement;
// input.value  ✅ — TypeScript knows it's an HTMLInputElement now

// angle-bracket syntax (same thing, can't use in .tsx files)
// const input2 = <HTMLInputElement>document.getElementById("myInput");

// Non-null assertion operator ! — tells TS "this is definitely not null"
const element = document.getElementById("title")!; // I'm sure it exists
// element.textContent; ✅ no null check needed (but be careful!)

// Double assertion — only use as last resort
const value = ("hello" as unknown) as number; // ⚠️ very dangerous

// ─────────────────────────────────────────────
// 13. TYPE SUMMARY
// ─────────────────────────────────────────────
// string    — text
// number    — integers and floats
// boolean   — true/false
// bigint    — huge integers
// symbol    — unique identifiers
// null      — intentional absence
// undefined — unintentional absence / uninitialized
// any       — opt out of type checking (avoid!)
// unknown   — safe version of any (must check type first)
// never     — a type that never occurs (throws, infinite loops)
// void      — no return value

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// What type would TypeScript infer for each of these?
// a) let x = 100;
// b) let y = "hello" + " world";
// c) let z = 5 > 3;
// d) let w = null;

// Exercise 2:
// Fix these type errors:
// let price: number = "19.99";
// let isAvailable: boolean = 1;
// let count: string = undefined;

// Exercise 3:
// Write a function that takes an `unknown` value and returns
// its string representation. Handle: string, number, boolean, object.

// Exercise 4:
// Create a function that always throws a RangeError.
// What should its return type be?

// Exercise 5:
// When would you use `unknown` vs `any`? Write a code example
// demonstrating why `unknown` is safer.
