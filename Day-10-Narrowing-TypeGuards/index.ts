// ============================================================
// 🚀 DAY 10 — Narrowing & Type Guards
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS NARROWING?
// TypeScript narrows (refines) a union type to a more specific type
// inside conditional blocks based on runtime checks
// ─────────────────────────────────────────────

function printId(id: string | number): void {
  // Here id is string | number
  if (typeof id === "string") {
    // HERE id is narrowed to: string
    console.log(id.toUpperCase()); // ✅
  } else {
    // HERE id is narrowed to: number
    console.log(id.toFixed(2));    // ✅
  }
}

// ─────────────────────────────────────────────
// 2. typeof NARROWING
// Works with: string, number, boolean, bigint, symbol, function, undefined
// ─────────────────────────────────────────────

function processValue(value: string | number | boolean | null): string {
  if (typeof value === "string")  return `String: "${value}"`;
  if (typeof value === "number")  return `Number: ${value.toFixed(2)}`;
  if (typeof value === "boolean") return `Boolean: ${value}`;
  // TypeScript knows value is null here (all other types eliminated)
  return "null value";
}

// ─────────────────────────────────────────────
// 3. instanceof NARROWING
// Works with class instances
// ─────────────────────────────────────────────

class Dog { bark()  { return "Woof!"; } }
class Cat { meow()  { return "Meow!"; } }
class Fish { swim() { return "Splash!"; } }

type Pet = Dog | Cat | Fish;

function makeSound(pet: Pet): string {
  if (pet instanceof Dog)  return pet.bark();
  if (pet instanceof Cat)  return pet.meow();
  if (pet instanceof Fish) return pet.swim();
  // TypeScript knows this is unreachable if all cases handled
  const _: never = pet;
  return _;
}

// ─────────────────────────────────────────────
// 4. in NARROWING
// Check if a property exists in an object
// ─────────────────────────────────────────────

interface Admin   { role: "admin"; permissions: string[] }
interface Regular { role: "regular"; }
interface Guest   { sessionId: string }

type User = Admin | Regular | Guest;

function handleUser(user: User): void {
  if ("permissions" in user) {
    // narrowed to Admin
    console.log("Admin permissions:", user.permissions.join(", "));
  } else if ("role" in user) {
    // narrowed to Regular (Admin is already handled above)
    console.log("Regular user, role:", user.role);
  } else {
    // narrowed to Guest
    console.log("Guest session:", user.sessionId);
  }
}

// ─────────────────────────────────────────────
// 5. EQUALITY NARROWING
// Narrow by checking specific values
// ─────────────────────────────────────────────

function processInput(value: string | number, format: "hex" | "decimal"): string {
  if (format === "hex") {
    // format is narrowed to "hex"
    const n = typeof value === "string" ? parseInt(value) : value;
    return `0x${n.toString(16)}`;
  }
  // format is narrowed to "decimal"
  return String(value);
}

// Null checks narrow away null/undefined
function getLength(value: string | null | undefined): number {
  if (value == null) return 0; // handles both null AND undefined
  return value.length;         // value is string here
}

// ─────────────────────────────────────────────
// 6. CUSTOM TYPE GUARDS — is keyword
// User-defined functions that narrow types
// function name(param: Type): param is NarrowedType
// ─────────────────────────────────────────────

interface Bird { wings: number; fly(): void }
interface Fish2 { fins: number; swim(): void }
type Animal = Bird | Fish2;

// Custom type guard — returns boolean but TELLS TypeScript what it means
function isBird(animal: Animal): animal is Bird {
  return "wings" in animal;
}

function isFish(animal: Animal): animal is Fish2 {
  return "fins" in animal;
}

function move(animal: Animal): void {
  if (isBird(animal)) {
    animal.fly();  // ✅ TypeScript knows it's Bird
  } else {
    animal.swim(); // ✅ TypeScript knows it's Fish2
  }
}

// Generic type guard
function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const maybeNumbers: (number | null)[] = [1, null, 3, null, 5];
const definiteNumbers: number[] = maybeNumbers.filter(isNotNull);
// TypeScript knows definiteNumbers is number[] — not (number|null)[]!

// ─────────────────────────────────────────────
// 7. ASSERTION FUNCTIONS
// Like type guards, but throw instead of returning boolean
// ─────────────────────────────────────────────

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError(`Expected string, got ${typeof value}`);
  }
}

function processString(input: unknown): string {
  assertIsString(input);
  // After this point, TypeScript KNOWS input is string!
  return input.toUpperCase(); // ✅
}

// Assert non-null/undefined
function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`${name} must be defined`);
  }
}

// ─────────────────────────────────────────────
// 8. DISCRIMINATED UNIONS (Full Coverage)
// The most powerful narrowing technique
// Add a "kind" or "type" property to distinguish variants
// ─────────────────────────────────────────────

type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string[]; total: number };
type ErrorState   = { status: "error";   error: Error; retryable: boolean };
type EmptyState   = { status: "empty" };

type RequestState = LoadingState | SuccessState | ErrorState | EmptyState;

function renderUI(state: RequestState): string {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return `Found ${state.total} items: ${state.data.join(", ")}`;
    case "error":   return `Error: ${state.error.message} (retry: ${state.retryable})`;
    case "empty":   return "No data found";
    // TypeScript guarantees this is unreachable if all cases handled!
  }
}

// ─────────────────────────────────────────────
// 9. CONTROL FLOW ANALYSIS
// TypeScript tracks type through branches
// ─────────────────────────────────────────────

function controlFlowExample(value: string | number | null): string {
  if (value === null) {
    return "null"; // value is null
  }
  // value is string | number here (null eliminated)
  
  if (typeof value === "number") {
    return value.toFixed(2); // value is number
  }
  
  // value is string here (null and number both eliminated)
  return value.toUpperCase();
}

// TypeScript even tracks through early returns and throws:
function processUser(user: { name: string } | null): string {
  if (!user) throw new Error("User required"); // throws if null
  // TypeScript knows user is non-null here
  return user.name.toUpperCase();
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Write type guards for these types:
// - isString(value: unknown): value is string
// - isNumber(value: unknown): value is number
// - isArray<T>(value: unknown): value is T[]
// - isRecord(value: unknown): value is Record<string, unknown>

// Exercise 2:
// Create a discriminated union for a Result<T, E> type:
// Success<T> = { ok: true; value: T }
// Failure<E>  = { ok: false; error: E }
// Write a function that handles both cases.

// Exercise 3:
// Given these shapes:
// Circle { type: "circle"; radius: number }
// Square { type: "square"; side: number }
// Rectangle { type: "rect"; width: number; height: number }
// Write functions: area(shape), perimeter(shape), scale(shape, factor)

// Exercise 4:
// Write an assertion function assertNever(x: never) and use it in a
// switch statement to ensure exhaustive handling.

// Exercise 5:
// Write a filterByType generic function:
// filterByType<T>(arr: unknown[], guard: (v: unknown) => v is T): T[]
