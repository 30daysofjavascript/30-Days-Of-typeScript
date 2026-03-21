// ============================================================
// 🚀 DAY 07 — Union & Intersection Types
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. UNION TYPES (|) — "Either This OR That"
// A value that can be ONE of several types
// ─────────────────────────────────────────────

let id: string | number;
id = "abc-123";  // ✅
id = 42;          // ✅
// id = true;     // ❌

// Union with null/undefined (nullable types)
let username: string | null    = null;
let middleName: string | undefined = undefined;

// Receiving different types from external sources
type ApiResponse = string | number | boolean | null;

// ─────────────────────────────────────────────
// 2. WORKING WITH UNION TYPES — Narrowing Required
// You must check the type before using type-specific methods
// ─────────────────────────────────────────────

function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();     // ✅ safe — id is string here
  } else {
    return id.toFixed(0);        // ✅ safe — id is number here
  }
}

// Common union patterns
function printLength(value: string | string[] | null): void {
  if (value === null) {
    console.log("No value");
  } else if (typeof value === "string") {
    console.log(`String length: ${value.length}`);
  } else {
    console.log(`Array length: ${value.length}`);
  }
}

// ─────────────────────────────────────────────
// 3. UNION WITH OBJECTS — Discriminated Unions (preview)
// ─────────────────────────────────────────────

type Circle    = { kind: "circle";    radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle  = { kind: "triangle";  base: number;  height: number };
type Shape = Circle | Rectangle | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {                    // ← discriminant property
    case "circle":    return Math.PI * shape.radius ** 2;
    case "rectangle": return shape.width * shape.height;
    case "triangle":  return 0.5 * shape.base * shape.height;
  }
}

// ─────────────────────────────────────────────
// 4. INTERSECTION TYPES (&) — "Both This AND That"
// Combines multiple types into one (all properties required)
// ─────────────────────────────────────────────

type HasId = { id: number };
type HasName = { name: string };
type HasTimestamps = { createdAt: Date; updatedAt: Date };

// Intersection combines ALL properties
type Entity = HasId & HasName & HasTimestamps;

const entity: Entity = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ─────────────────────────────────────────────
// 5. INTERSECTION FOR MIXINS
// ─────────────────────────────────────────────

interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Loggable {
  log(message: string): void;
  getLog(): string[];
}

interface Cacheable {
  cache(): void;
  isCached: boolean;
}

// A service that has ALL capabilities
type FullService = Serializable & Loggable & Cacheable;

// ─────────────────────────────────────────────
// 6. UNION vs INTERSECTION — KEY DIFFERENCE
// ─────────────────────────────────────────────

type A = { a: string };
type B = { b: number };

type AorB  = A | B;       // Must have a OR b (or both)
type AandB = A & B;       // Must have BOTH a AND b

const or1: AorB  = { a: "hello" };      // ✅ just A
const or2: AorB  = { b: 42 };           // ✅ just B
const or3: AorB  = { a: "hi", b: 1 };   // ✅ both

const and1: AandB = { a: "hello", b: 42 }; // ✅ both required
// const and2: AandB = { a: "hello" };     // ❌ missing b

// ─────────────────────────────────────────────
// 7. NULLABLE TYPES WITH UNIONS
// ─────────────────────────────────────────────

interface UserData {
  name: string;
  email: string;
  phone: string | null;  // could be null
  age?: number;           // could be undefined (optional)
}

function getPhoneDisplay(user: UserData): string {
  // Must handle null
  if (user.phone === null) return "No phone";
  return user.phone; // ✅ TypeScript knows it's string here
}

// ─────────────────────────────────────────────
// 8. EXTRACTING FROM UNIONS — Extract & Exclude
// ─────────────────────────────────────────────

type AllTypes = string | number | boolean | null | undefined;

type OnlyStrings   = Extract<AllTypes, string>;    // string
type NoNullables   = Exclude<AllTypes, null | undefined>; // string | number | boolean

type NumberOrString = Extract<AllTypes, number | string>; // number | string

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a union type 'Input' that can be string | number | boolean.
// Write a function 'coerceToString(input: Input): string'.

// Exercise 2:
// Create these types using intersection:
// Timestamp = { createdAt: Date; updatedAt: Date }
// Soft-deletable = { deletedAt: Date | null }
// AuditedEntity = Entity & Timestamp & SoftDeletable

// Exercise 3:
// A payment can be 'card' (with cardNumber, expiry), 'bank' (with iban),
// or 'crypto' (with walletAddress, currency). Model this with a union.

// Exercise 4:
// Using Extract and Exclude, create:
// - A type with only the object types from: string | number | { id: number } | boolean | { name: string }
// - A type with everything except string from that union

// Exercise 5:
// Write a function that accepts string | number | string[] | number[]
// and returns the sum (for numbers) or joined string (for strings).
