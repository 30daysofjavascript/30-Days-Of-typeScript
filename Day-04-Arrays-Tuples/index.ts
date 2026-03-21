// ============================================================
// 🚀 DAY 04 — Arrays & Tuples
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ARRAY TYPES — Two Syntax Options
// ─────────────────────────────────────────────

// Syntax 1: Type followed by [] (most common)
const numbers: number[]  = [1, 2, 3, 4, 5];
const strings: string[]  = ["a", "b", "c"];
const booleans: boolean[] = [true, false, true];

// Syntax 2: Generic Array<T> (equivalent, sometimes clearer)
const nums: Array<number> = [1, 2, 3];
const strs: Array<string> = ["x", "y", "z"];

// Arrays of objects
interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone",  price: 599 },
];

// ─────────────────────────────────────────────
// 2. TYPED ARRAY OPERATIONS
// TypeScript knows what methods exist and what they return
// ─────────────────────────────────────────────

// All array methods are typed
const doubled: number[] = numbers.map(n => n * 2);
const evens:   number[] = numbers.filter(n => n % 2 === 0);
const sum:     number   = numbers.reduce((acc, n) => acc + n, 0);
const first:   number | undefined = numbers.find(n => n > 3);

// TypeScript catches wrong types in callbacks
// numbers.map((n: string) => n); // ❌ 'n' is number, not string

// Push/pop maintain element type
numbers.push(6);    // ✅
// numbers.push("7"); // ❌ Can't push string to number[]

// ─────────────────────────────────────────────
// 3. READONLY ARRAYS
// Arrays that cannot be modified after creation
// ─────────────────────────────────────────────

const frozen: readonly number[] = [1, 2, 3];
// frozen.push(4);    // ❌ Property 'push' does not exist on readonly
// frozen[0] = 99;    // ❌ Index signature in type is readonly
// frozen.sort();     // ❌ Mutating methods not allowed

// ReadonlyArray<T> is equivalent
const frozenAlso: ReadonlyArray<string> = ["a", "b", "c"];

// For const + as const
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
// DAYS.push("Sat"); // ❌ Cannot push to readonly
// DAYS[0] = "Monday"; // ❌ Cannot assign to readonly
// Type: readonly ["Mon", "Tue", "Wed", "Thu", "Fri"]
// Each element has its LITERAL type!

// ─────────────────────────────────────────────
// 4. MULTI-DIMENSIONAL ARRAYS
// ─────────────────────────────────────────────

const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(matrix[1][2]); // 6 — TypeScript knows this is number

const grid: boolean[][] = [
  [true, false],
  [false, true],
];

// ─────────────────────────────────────────────
// 5. TUPLES — Fixed-Length, Fixed-Type Arrays
// Unlike arrays, each position has a specific type
// ─────────────────────────────────────────────

// Basic tuple: exactly [string, number]
let person: [string, number] = ["Alice", 30];
// person = ["Bob", 25];   // ✅
// person = [25, "Alice"]; // ❌ Wrong order
// person = ["Alice"];     // ❌ Wrong length

// Accessing tuple elements — TypeScript knows each element's type
const personName: string = person[0]; // ✅ TypeScript knows index 0 is string
const personAge: number  = person[1]; // ✅ TypeScript knows index 1 is number

// Destructuring tuples (very common pattern)
const [name, age] = person;
// name is typed as string, age as number — TypeScript infers!

// ─────────────────────────────────────────────
// 6. NAMED TUPLE ELEMENTS (TypeScript 4.0+)
// Give tuple elements descriptive names (docs only, no runtime effect)
// ─────────────────────────────────────────────

type Point2D = [x: number, y: number];
type RGB     = [red: number, green: number, blue: number];
type Entry   = [key: string, value: unknown, timestamp: Date];

const p: Point2D = [10, 20];
const red: RGB   = [255, 0, 0];

// Named tuples show labels in IDE tooltips for better DX!
function move(from: Point2D, to: Point2D): void {
  console.log(`Moving from [${from[0]}, ${from[1]}] to [${to[0]}, ${to[1]}]`);
}

// ─────────────────────────────────────────────
// 7. OPTIONAL TUPLE ELEMENTS
// ─────────────────────────────────────────────

type OptionalTuple = [string, number, boolean?]; // boolean is optional

const t1: OptionalTuple = ["hello", 1, true]; // ✅
const t2: OptionalTuple = ["hello", 1];        // ✅ boolean omitted
// const t3: OptionalTuple = ["hello"];          // ❌ number required

// ─────────────────────────────────────────────
// 8. REST ELEMENTS IN TUPLES
// ─────────────────────────────────────────────

type StringAndNumbers = [string, ...number[]];

const mixed1: StringAndNumbers = ["header", 1, 2, 3, 4, 5]; // ✅
const mixed2: StringAndNumbers = ["header"];                  // ✅ (0 numbers)

// Rest at beginning
type TailString = [...number[], string];
const ts1: TailString = [1, 2, 3, "end"]; // ✅
const ts2: TailString = ["end"];            // ✅

// ─────────────────────────────────────────────
// 9. REAL-WORLD TUPLE USE CASES
// ─────────────────────────────────────────────

// React useState returns a tuple [state, setter]
// function useState<T>(initial: T): [T, (value: T) => void];

// CSV row parsing
type CSVRow = [id: string, name: string, age: string, email: string];
function parseRow(row: string): CSVRow {
  const [id, name, age, email] = row.split(",");
  return [id, name, age, email];
}

// API response with status
type ApiResult<T> = [data: T | null, error: Error | null, loading: boolean];
function useData<T>(url: string): ApiResult<T> {
  // Simulating API call
  return [null, null, true];
}

// Coordinate systems
type Coordinate3D = [x: number, y: number, z: number];
type BoundingBox   = [topLeft: Point2D, bottomRight: Point2D];

// Return multiple values cleanly
function minMax(arr: number[]): [min: number, max: number] {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = minMax([3, 1, 4, 1, 5, 9]);
console.log(`min: ${min}, max: ${max}`);

// ─────────────────────────────────────────────
// 10. ARRAY vs TUPLE — WHEN TO USE WHICH
// ─────────────────────────────────────────────

// Use ARRAY when:
// ✅ All elements have the same type
// ✅ Length is variable
// ✅ Order doesn't convey meaning

// Use TUPLE when:
// ✅ Elements have DIFFERENT types
// ✅ Length is fixed and meaningful
// ✅ Position conveys meaning (first=x, second=y)
// ✅ Returning multiple values from a function

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Type these arrays correctly:
// const colors = ["red", "green", "blue"];
// const scores = [95, 87, 73, 91];
// const flags  = [true, false, true, false];

// Exercise 2:
// Create a type for a chess board: 8x8 grid of (piece | null)
// where piece is 'P' | 'R' | 'N' | 'B' | 'Q' | 'K' (uppercase = white, lowercase = black)

// Exercise 3:
// Create a function that takes a tuple of [firstName: string, lastName: string, age: number]
// and returns a formatted User object.

// Exercise 4:
// Using as const, create a readonly tuple of HTTP methods:
// ["GET", "POST", "PUT", "DELETE", "PATCH"]
// Then create a type HttpMethod from it.

// Exercise 5:
// Write a generic zip function that takes two arrays and returns an array of tuples:
// zip([1,2,3], ["a","b","c"]) → [[1,"a"], [2,"b"], [3,"c"]]
