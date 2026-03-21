// ============================================================
// 🚀 DAY 14 — Generics: Advanced
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. GENERIC CONSTRAINTS WITH keyof
// ─────────────────────────────────────────────

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

const users = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }];
const names = pluck(users, "name"); // string[]
const ages  = pluck(users, "age");  // number[]
// pluck(users, "email"); // ❌ not a key of user

// Pick specific keys from an object generically
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

const user = { id: 1, name: "Alice", email: "a@a.com", password: "secret" };
const safe = pick(user, ["id", "name", "email"]); // { id, name, email }
// safe.password; // ❌ not included

// ─────────────────────────────────────────────
// 2. CONDITIONAL TYPES IN GENERICS
// ─────────────────────────────────────────────

// UnwrapPromise — if T is a Promise, get the resolved type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type StrResult = UnwrapPromise<Promise<string>>; // string
type NumResult = UnwrapPromise<number>;           // number (not a Promise)

// FlattenArray
type FlattenArray<T> = T extends Array<infer U> ? U : T;
type Items = FlattenArray<string[]>; // string
type NotArr = FlattenArray<number>;  // number

// Return type extraction
type GetReturn<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;
type FnReturn = GetReturn<(x: number) => string>; // string

// ─────────────────────────────────────────────
// 3. INFER KEYWORD
// Extract types from other types
// ─────────────────────────────────────────────

// Extract first element type from tuple
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : never;

type First = Head<[string, number, boolean]>; // string
type Rest  = Tail<[string, number, boolean]>; // [number, boolean]

// Extract parameter types
type Parameters2<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

type FnParams = Parameters2<(a: string, b: number) => boolean>;
// [string, number]

// Extract constructor parameter types
type ConstructorParams<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

// ─────────────────────────────────────────────
// 4. RECURSIVE GENERICS
// ─────────────────────────────────────────────

// Deep readonly
type DeepReadonly<T> =
  T extends (infer U)[] ? ReadonlyArray<DeepReadonly<U>> :
  T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } :
  T;

// Deep partial
type DeepPartial<T> =
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

// Deep required
type DeepRequired<T> =
  T extends object ? { [K in keyof T]-?: DeepRequired<T[K]> } : T;

// Usage
type Config = {
  server: { host: string; port: number };
  db: { url: string; pool: { min: number; max: number } };
};

type ReadonlyConfig  = DeepReadonly<Config>;
type PartialConfig   = DeepPartial<Config>;

// ─────────────────────────────────────────────
// 5. MAPPED TYPE MODIFIERS IN GENERICS
// ─────────────────────────────────────────────

// Remove readonly from all properties
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// Remove optional from all properties
type Required2<T> = { [K in keyof T]-?: T[K] };

// Make specific keys optional, rest required
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// ─────────────────────────────────────────────
// 6. GENERIC UTILITY FUNCTIONS
// ─────────────────────────────────────────────

// Type-safe Object.fromEntries
function fromEntries<K extends string, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

// Omit at runtime (not just type level)
function omitKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(k => delete result[k]);
  return result as Omit<T, K>;
}

// Group array into record
function groupBy<T, K extends string | number>(
  items: T[],
  getKey: (item: T) => K
): Partial<Record<K, T[]>> {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) acc[key] = [];
    acc[key]!.push(item);
    return acc;
  }, {} as Partial<Record<K, T[]>>);
}

// ─────────────────────────────────────────────
// 7. HIGHER-ORDER GENERICS
// Generics that work on other generic types
// ─────────────────────────────────────────────

// A "functor" — transform inside a container
interface Functor<T> {
  map<U>(fn: (value: T) => U): Functor<U>;
}

// Monad-like Optional
class Optional<T> {
  private constructor(private readonly value: T | null) {}

  static of<T>(value: T | null | undefined): Optional<T> {
    return new Optional(value ?? null);
  }

  static empty<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  map<U>(fn: (value: T) => U): Optional<U> {
    return this.value !== null
      ? Optional.of(fn(this.value))
      : Optional.empty<U>();
  }

  flatMap<U>(fn: (value: T) => Optional<U>): Optional<U> {
    return this.value !== null ? fn(this.value) : Optional.empty<U>();
  }

  getOrElse(defaultValue: T): T {
    return this.value !== null ? this.value : defaultValue;
  }

  isPresent(): boolean { return this.value !== null; }
}

const opt = Optional.of("hello")
  .map(s => s.toUpperCase())
  .map(s => s.length)
  .getOrElse(0);
console.log(opt); // 5

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Write a generic 'mapValues<T, U>(obj: T, fn: (v: T[keyof T]) => U): Record<keyof T, U>'

// Exercise 2:
// Using infer, write:
// - FirstArg<T> — extracts type of first argument
// - PromiseType<T> — unwraps Promise<T> to T

// Exercise 3:
// Write a 'pipe' function with correct generic types:
// pipe(x)(fn1)(fn2)(fn3).value
// where each fn transforms the accumulated value

// Exercise 4:
// Implement a type-safe Builder<T> pattern that forces
// all required properties to be set before calling .build()

// Exercise 5:
// Write a generic Lens<S, A> type for composable property access and update.
