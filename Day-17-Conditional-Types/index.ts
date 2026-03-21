// ============================================================
// 🚀 DAY 17 — Conditional Types
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// Conditional types: T extends U ? X : Y
// Like ternary operators but at the type level!

// ─────────────────────────────────────────────
// 1. BASIC CONDITIONAL TYPE SYNTAX
// ─────────────────────────────────────────────

// T extends U ? TrueType : FalseType
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
type C = IsString<"hello">; // true  (string literal extends string)

type IsArray<T> = T extends any[] ? true : false;
type D = IsArray<number[]>;  // true
type E = IsArray<string>;    // false

// ─────────────────────────────────────────────
// 2. PRACTICAL CONDITIONAL TYPES
// ─────────────────────────────────────────────

// If T is a string, return number (its length type); else return T
type StringToNumber<T> = T extends string ? number : T;
type F = StringToNumber<string>;   // number
type G = StringToNumber<boolean>;  // boolean

// NonNullable — recreating the built-in
type MyNonNullable<T> = T extends null | undefined ? never : T;
type H = MyNonNullable<string | null | undefined>; // string

// Flatten arrays — if T is an array, get element type
type Flatten<T> = T extends Array<infer Item> ? Item : T;
type I = Flatten<string[]>; // string
type J = Flatten<number>;   // number

// ─────────────────────────────────────────────
// 3. THE infer KEYWORD — Extract Types from Patterns
// ─────────────────────────────────────────────

// Infer the return type of a function
type ReturnType2<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never;

type R1 = ReturnType2<() => string>;           // string
type R2 = ReturnType2<(x: number) => boolean>; // boolean
type R3 = ReturnType2<typeof fetch>;           // Promise<Response>

// Infer the element type of an array
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type K = ArrayElement<string[]>;      // string
type L = ArrayElement<(number|boolean)[]>; // number | boolean

// Infer the resolved value of a Promise
type UnwrapPromise<T> = T extends Promise<infer V> ? UnwrapPromise<V> : T;
type M = UnwrapPromise<Promise<string>>;            // string
type N = UnwrapPromise<Promise<Promise<number>>>;   // number

// Infer parameters of a function type
type Params<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

type P1 = Params<(a: string, b: number) => void>; // [string, number]

// Infer the type of a constructor's instance
type GetInstance<T extends new (...args: any) => any> =
  T extends new (...args: any) => infer I ? I : never;

// ─────────────────────────────────────────────
// 4. DISTRIBUTIVE CONDITIONAL TYPES
// When T is a union, the conditional type distributes over each member
// ─────────────────────────────────────────────

type ToArray<T> = T extends any ? T[] : never;
type Q = ToArray<string | number>;
// string[] | number[]  ← distributed! (NOT (string|number)[])

// This distribution behavior is automatic when T is a "bare type parameter"

// To PREVENT distribution, wrap in []
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type R_nd = ToArrayNonDist<string | number>;
// (string | number)[]  ← not distributed

// Useful distributive patterns:
type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void
    ? I : never;

type Inter = UnionToIntersection<{a: string} | {b: number}>;
// { a: string } & { b: number }

// ─────────────────────────────────────────────
// 5. NESTED CONDITIONAL TYPES
// ─────────────────────────────────────────────

type TypeName<T> =
  T extends string   ? "string"   :
  T extends number   ? "number"   :
  T extends boolean  ? "boolean"  :
  T extends bigint   ? "bigint"   :
  T extends symbol   ? "symbol"   :
  T extends null     ? "null"     :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  T extends any[]    ? "array"    :
  "object";

type S1 = TypeName<string>;     // "string"
type S2 = TypeName<42>;         // "number"
type S3 = TypeName<string[]>;   // "array"
type S4 = TypeName<{a: 1}>;     // "object"

// ─────────────────────────────────────────────
// 6. FILTERING WITH CONDITIONAL TYPES
// ─────────────────────────────────────────────

// Filter union to only assignable types
type Filter<T, U> = T extends U ? T : never;

type OnlyStrings  = Filter<string | number | boolean, string>; // string
type OnlyNumbers  = Filter<string | number | boolean, number>; // number

// Remove types from a union
type Remove<T, U> = T extends U ? never : T;
type WithoutNull = Remove<string | number | null | undefined, null | undefined>;
// string | number

// ─────────────────────────────────────────────
// 7. REAL-WORLD CONDITIONAL TYPE PATTERNS
// ─────────────────────────────────────────────

// If T has an 'id' property, make it required; otherwise add it
type WithId<T> = T extends { id: any }
  ? T & { id: Required<T>["id"] }
  : T & { id: number };

// Make a property required if another property is present
type RequireIf<T, K extends keyof T, Condition extends Partial<T>> =
  T extends Condition
    ? T & Required<Pick<T, K>>
    : T;

// Async version of any type
type Async<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : Promise<T>;

type AsyncFn = Async<(x: number) => string>;
// (...args: [number]) => Promise<string>

type AsyncValue = Async<number>;
// Promise<number>

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create IsEqual<A, B> — returns true if A and B are the same type, false otherwise.

// Exercise 2:
// Create UnboxPromise<T> — deeply unwraps Promise<Promise<Promise<T>>> to T.
// Test: UnboxPromise<Promise<Promise<string>>> → string

// Exercise 3:
// Create Promisify<T extends Record<string, (...args: any)=>any>>
// that converts all methods to return promises.

// Exercise 4:
// Create a type that checks if a type T has a specific method:
// HasMethod<T, M extends string> → true | false

// Exercise 5:
// Create OverloadUnion<T> that extracts all overload signatures
// from a function type as a union.
