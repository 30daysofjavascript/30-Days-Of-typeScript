// ============================================================
// 🚀 DAY 24 — keyof, typeof & infer
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. keyof — Get Keys of a Type as a Union
// ─────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

type UserKeys = keyof User; // "id" | "name" | "email" | "active"
type UserValues = User[UserKeys]; // number | string | boolean

// keyof with index signatures:
type StringMapKeys = keyof Record<string, number>; // string | number
type ArrayKeys = keyof string[]; // "length" | "push" | "pop" | "map" | ...

// ─────────────────────────────────────────────
// 2. keyof PRACTICAL USES
// ─────────────────────────────────────────────

// Type-safe property getter
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "a@a.com", active: true };
const name: string = get(user, "name");    // ✅ string
const id:   number = get(user, "id");      // ✅ number
// get(user, "missing"); // ❌ not a key of User

// Type-safe property setter
function set<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}
set(user, "name", "Bob");    // ✅
// set(user, "name", 42);    // ❌ 42 is not string

// Transform all values to a specific type using keyof
function mapObject<T extends object, U>(
  obj: T,
  fn: (key: keyof T, value: T[keyof T]) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  (Object.keys(obj) as (keyof T)[]).forEach(key => {
    result[key] = fn(key, obj[key]);
  });
  return result;
}

const lengths = mapObject(user, (key, value) => String(value).length);
// { id: 1, name: 5, email: 10, active: 4 }

// ─────────────────────────────────────────────
// 3. typeof — Get the Type of a Value
// ─────────────────────────────────────────────

// In type position, typeof extracts the type of a variable
const config = {
  host: "localhost",
  port: 3000,
  ssl: false,
};

type Config = typeof config;
// { host: string; port: number; ssl: boolean }

function updateConfig(updates: Partial<typeof config>): typeof config {
  return { ...config, ...updates };
}

// typeof with functions
function createUser(name: string, email: string) {
  return { id: Math.random(), name, email, createdAt: new Date() };
}

type UserFromFactory = ReturnType<typeof createUser>;
// { id: number; name: string; email: string; createdAt: Date }

// typeof with classes
class UserService {
  findById(id: number): User | null { return null; }
  create(data: Omit<User, "id">): User { return {} as User; }
}

type UserServiceType = typeof UserService;        // the CLASS (constructor)
type UserServiceInstance = InstanceType<typeof UserService>; // the INSTANCE

// ─────────────────────────────────────────────
// 4. keyof typeof — Extract Keys from a Value
// Very common pattern for objects used as enums
// ─────────────────────────────────────────────

const STATUS = {
  ACTIVE:   "active",
  INACTIVE: "inactive",
  PENDING:  "pending",
  DELETED:  "deleted",
} as const;

type StatusKey   = keyof typeof STATUS;   // "ACTIVE" | "INACTIVE" | "PENDING" | "DELETED"
type StatusValue = typeof STATUS[StatusKey]; // "active" | "inactive" | "pending" | "deleted"

function setStatus(status: StatusValue): void {
  console.log(`Setting status to: ${status}`);
}
setStatus(STATUS.ACTIVE);  // ✅
setStatus("active");       // ✅ literal string
// setStatus("unknown");   // ❌

// ─────────────────────────────────────────────
// 5. infer — Extract Types from Generic Patterns
// ─────────────────────────────────────────────

// Return type of a function
type ReturnType3<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never;

// Parameter types of a function
type Parameters3<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

// First parameter type
type FirstParam<T extends (...args: any) => any> =
  T extends (first: infer F, ...rest: any) => any ? F : never;

// Promised type (unwrap)
type Awaited2<T> =
  T extends null | undefined ? T :
  T extends object & { then(onfulfilled: infer F): any }
    ? F extends (value: infer V) => any ? Awaited2<V> : never
    : T;

// Constructor return type
type Constructed<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never;

// Array element type
type Element<T> = T extends (infer E)[] ? E : never;

// Tuple to union
type TupleToUnion<T extends readonly any[]> =
  T extends readonly (infer U)[] ? U : never;

type Colors = TupleToUnion<["red", "green", "blue"]>; // "red" | "green" | "blue"

// ─────────────────────────────────────────────
// 6. ADVANCED infer PATTERNS
// ─────────────────────────────────────────────

// Extract specific positional argument types
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : [];
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type H = Head<[string, number, boolean]>; // string
type T = Tail<[string, number, boolean]>; // [number, boolean]
type L = Last<[string, number, boolean]>; // boolean

// Extract all method names from a class instance type
type MethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T];

type UserServiceMethods = MethodNames<UserService>;
// "findById" | "create"

// Extract all property names (non-methods)
type PropNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? never : K;
}[keyof T];

// ─────────────────────────────────────────────
// 7. COMBINING keyof + typeof + infer
// ─────────────────────────────────────────────

// Type-safe event system using literal types from object
const events = {
  USER_CREATED: "user.created",
  USER_UPDATED: "user.updated",
  USER_DELETED: "user.deleted",
  ORDER_PLACED: "order.placed",
} as const;

type EventName2 = typeof events[keyof typeof events];
// "user.created" | "user.updated" | "user.deleted" | "order.placed"

type EventKey = keyof typeof events;
// "USER_CREATED" | "USER_UPDATED" | "USER_DELETED" | "ORDER_PLACED"

// Extract handler return type
function withRetry<T extends (...args: any) => Promise<any>>(
  fn: T,
  retries: number
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>) => {
    let lastError: any;
    const attempt = async (): Promise<any> => {
      for (let i = 0; i < retries; i++) {
        try { return await fn(...args); }
        catch (e) { lastError = e; }
      }
      throw lastError;
    };
    return attempt() as ReturnType<T>;
  };
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Write a pick() function that takes an object and an array of keys
// and returns a new object with only those keys. Use keyof for full type safety.

// Exercise 2:
// Using typeof, create a type from a runtime-defined schema object:
// const schema = { name: "string", age: "number", active: "boolean" }
// Create a type 'InferSchema<T>' that maps schema strings to actual TS types.

// Exercise 3:
// Create a type 'Getters<T>' using keyof and infer that generates
// getter method names and their return types from an object type T.

// Exercise 4:
// Write 'infer'-based type 'PromisifyAll<T>' that converts all methods
// returning X to returning Promise<X>.

// Exercise 5:
// Create a type 'RecursiveKeyOf<T>' that generates all possible dot-notation
// paths through a nested object as a union of strings.
